<template>
  <div>
    <div
      style="position: fixed;right:0;top:50%;width:30px;height: 30px;cursor: pointer;"
      @click="showDialog"
    >
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="printer"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M820 436h-40c-4.4 0-8 3.6-8 8v40c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-40c0-4.4-3.6-8-8-8zm32-104H732V120c0-4.4-3.6-8-8-8H300c-4.4 0-8 3.6-8 8v212H172c-44.2 0-80 35.8-80 80v328c0 17.7 14.3 32 32 32h168v132c0 4.4 3.6 8 8 8h424c4.4 0 8-3.6 8-8V772h168c17.7 0 32-14.3 32-32V412c0-44.2-35.8-80-80-80zM360 180h304v152H360V180zm304 664H360V568h304v276zm200-140H732V500H292v204H160V412c0-6.6 5.4-12 12-12h680c6.6 0 12 5.4 12 12v292z"
        />
      </svg>
    </div>

    <PrintDialog
      v-model="dialog"
      @print="previewPdf($event)"
    />
  </div>
</template>
<script setup lang="js">
import PrintDialog from './PrintDialog.vue'
import {onBeforeMount, ref} from "vue";


const dialog = ref(true)

const instance = OpenApi
let app

onBeforeMount(async () => {
  await instance.ready()
  app = instance.Application
  instance.ApiEvent.AddApiEventListener('CurrentPageChange', data => {
    console.log('CurrentPageChange: ', data)
    currentPage = data
  })
})


let currentPage = 1;

const showDialog = async () => {
  dialog.value = true

}

// 删除选取
async function delSelection() {
  const selection = await app.ActiveDocument.ActiveWindow.Selection
  // Range 对象
  const range = await selection.Range
  range.SetRange(0, 0)
}

async function importLib() {
  function addScript(url) {
    return new Promise((resolve) => {
      var script = document.createElement('script');
      script.type = 'application/javascript';
      script.addEventListener('load', () => {
        resolve('script加载完毕')
      })
      script.src = url;
      document.head.appendChild(script);
    })
  }

  const p = []
  if (!window.PDFLib) {
    p.push(addScript('https://cdn.jsdelivr.net/npm/pdf-lib/dist/pdf-lib.js'))
  }
  if (!window.html2pdf) {
    p.push(addScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js'))
  }
  await Promise.all(p)
}


async function getPageArr(params) {
  const Count = await app.ActiveDocument.ActiveWindow.ActivePane.Pages.Count
  // const Count = 10;
  const res = []
  if (params === '全部') {
    for (let i = 1; i <= Count; i++) {
      res.push(i);
    }
  } else if (params === '当前页') {
    res.push(currentPage)
  } else {
    // 1-2,3,4-5
    const arr = params.split(',')
    for (let item of arr) {
      if (item.includes('-')) {
        const temArr = item.split("-").map(Number)
        for (let index = temArr[0]; index <= temArr[1]; index++) {
          res.push(index)
        }
      } else {
        res.push(+item)
      }
    }
  }
  return res;
}

async function dom2PdfUrl(pages, time = 500) {
  debugger
  const {PDFDocument} = PDFLib
  const mergedPdf = await PDFDocument.create()

  let byteArr = new Uint8Array()
  for (let i of pages) {
    await app.ActiveDocument.ActiveWindow.Selection.GoTo(app.Enum.WdGoToItem.wdGoToPage, app.Enum.WdGoToDirection.wdGoToAbsolute, i,)
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
    // 创建一个新的 PDF 文档
    const element = document.querySelector('.canvas-unit:not(.doc-pending-canvas-unit)')

    const svg = await dealZoom(element.cloneNode(true))
    delPageCorner(svg)
    // console.error(svg)
    const array = await html2pdf()
        .from(svg)
        .output('arraybuffer')

    byteArr = await mergePdfUint8Array(mergedPdf, array)
  }
  const blob = new Blob([byteArr], {type: 'application/pdf'})
  const url = URL.createObjectURL(blob)
  return url;

}


async function previewPdf(param) {
  if (iframeElement.id !== 'printIframe') {
    return
  }
  const pages = await getPageArr(param)
  await importLib()
  await delSelection()
  await dom2PdfUrl(pages)
  const url = await dom2PdfUrl(pages);
  print(url)
}


// 处理纸张缩放
async function dealZoom(div) {
  const Percentage = await app.ActiveDocument.ActiveWindow.View.Zoom.Percentage
  const value = Percentage / 100

  let {width, height} = div.style
  width = (+width.replace('px', '')) / value + 'px'
  height = (+height.replace('px', '')) / value + 'px'
  div.style.width = width
  div.style.height = height
  const svg = div.childNodes[0]
  const w = +svg.getAttribute('width') / value
  const h = +svg.getAttribute('height') / value
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  return svg
}

// 去掉svg的四个角
function delPageCorner(svg) {
  const pageCorner = svg.querySelector('#page-corner')
  pageCorner.parentElement.removeChild(pageCorner)
}


function print(src) {
  // const iframe = document.querySelector('iframe');
  const iframe = document.createElement('iframe');
  iframe.style.width = '100vw';
  iframe.style.height = '100vh';
  iframe.style.display = 'none';
  document.body.append(iframe);
  iframe.src = src
  // iframe.style.display = 'block'
  iframe.addEventListener('load', function () {
    // 内容加载完成后执行的操作
    console.log('iframe 内容已加载完成');
    iframe.contentWindow.print()
  });

}

async function mergePdfUint8Array(mergedPdf, pdf1Blob) {
  const {PDFDocument} = PDFLib
  // 获取要合并的 PDF 文件的 Blob 对象或文件对象
  // 将第一个 PDF 文件添加到合并的文档中
  const pdf1 = await PDFDocument.load(pdf1Blob)
  const [pdf1Page] = await mergedPdf.copyPages(pdf1, [0])
  mergedPdf.addPage(pdf1Page)
  // 生成合并后的 PDF 文件的 Blob 对象
  const mergedPdfBlob = await mergedPdf.save()
  return mergedPdfBlob
}


</script>

<style lang="less" scoped>
.web-office-iframe {
  //visibility: hidden;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
}
</style>

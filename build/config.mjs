/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import fs from 'fs-extra'
import minimist from 'minimist'
import alias from '@rollup/plugin-alias'

const argv = minimist(process.argv.slice(2))
const r = (p) => path.resolve(process.cwd(), p)
const mode = process.env.NODE_ENV
const isDev = process.env.NODE_ENV !== 'production'
const pluginDir = r('src/apps')
const cssSplit = !!argv.csssplit

const toUpperCamelCase = (str) => {
  if (typeof str !== 'string' || !str) {
    return ''
  }
  str = str.replace(/[^a-zA-Z0-9]/g, ' ')
  const words = str.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  return words.join('')
}

const pluginConfs = fs
  .readdirSync(pluginDir)
  .filter((dir) =>
    typeof argv.name === 'string' && argv.name
      ? argv.name.split('/').some((n) => dir.endsWith(n))
      : !0
  )
  .map((dir) => {
    const input = r(`./src/apps/${dir}/index.ts`) || r(`./src/apps/${dir}/index.js`)
    const isInputExist = fs.pathExistsSync(input)
    if (!isInputExist) {
      return
    }

    return {
      entry: input,
      formats: ['iife'],
      name: toUpperCamelCase(dir),
      fileName: (format, entryName) => {
        return `plugin.${toUpperCamelCase(dir)}.entry${!isDev ? '.[hash]' : ''}.js`
      },
      outDir: `dist/${dir}`
    }
  })
  .filter((c) => c)

export default pluginConfs.map((conf) => {
  return {
    mode,
    watch: isDev
      ? {
          include: r('./src/**')
        }
      : false,
    configFile: false,
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode)
    },
    build: {
      lib: {
        ...conf
      },
      sourcemap: !!isDev,
      terserOptions: {
        compress: {
          drop_debugger: !!isDev
        }
      },
      outDir: conf.outDir,
      minify: isDev ? false : 'terser',
      cssCodeSplit: cssSplit
    },
    plugins: [
      alias({
        entries: [{ find: '@', replacement: r('src') }]
      }),
      vue()
    ]
  }
})

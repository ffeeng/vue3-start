import {createApp} from 'vue'
import '@/styles/index.less'

// @ts-ignore
import App from './App.vue'
import {registerPlugin} from '@/utils/index'


// 插件定义
export default class Plugin {
  static readonly Name = 'Hello'

  private pluginApi: any
  private openApi: any
  private pluginView?: HTMLElement

  /**
   * 插件初始化
   * @param PLGUIN_API 插件保留参数（用于为插件提供服务的，非OpenApi的自定义接口）
   */
  constructor(PLGUIN_API: any = undefined) {
    // 订阅消息，并且实现messageGet方法
    PLGUIN_API && (this.pluginApi = PLGUIN_API = PLGUIN_API.subscribe(this))
    this.openApi = window.OpenApi
    console.log(this.openApi,'hello')
    this.mount()
  }

  messageGet() {}
  messagePush() {}

  mount() {
    const mountEl = document.createElement('div')
    mountEl.classList.add('__PLUGIN_Hello_container1__')
    createApp(App).mount(mountEl)
    // 将插件开发的dom，挂在到body下（根据插件需要，选择是否挂载）
    document.body.append(mountEl)
    this.pluginView = mountEl
  }

  unmount() {
    this.pluginView && this.pluginView.remove()
  }
}

registerPlugin(Plugin)

// AutoLoad 自动实例化
// 开发者需要注意如存在多次重复new Class的时候，绑定过的事件要解除绑定
const pluginInstance = new Plugin()

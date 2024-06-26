export function sum(a: number, b: number) {
  return a + b
}

export function registerPlugin(Plugin: any) {
  // 注册此插件到pluginMgr
  const PluginMgr =
    (window.__PLUGIN__ && window.__PLUGIN__.pluginMgr) || (window.APP && window.APP.pluginMgr)
  if (Plugin && PluginMgr && PluginMgr.addPlugin) {
    PluginMgr.addPlugin({
      pluginName: Plugin.Name,
      pluginObj: Plugin
    })
  }
}

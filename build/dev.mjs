import chokidar from 'chokidar'
import path from 'path'
import { build } from 'vite'
import confs from './config.mjs'

const r = (p) => path.resolve(process.cwd(), p)

const start = () => {
  confs.forEach(async (conf) => {
    await build(conf)
  })
}

chokidar.watch([r('src')], {}).on('change', (event, path) => {
  start()
})

start()

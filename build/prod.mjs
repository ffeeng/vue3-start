/// <reference types="vitest" />
import { build } from 'vite'
import confs from './config.mjs'

confs.forEach(async (conf) => {
  await build(conf)
})

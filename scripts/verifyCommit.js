// @ts-check
const pico = require('picocolors') 
const path = require('path')
const { readFileSync } = require('fs-extra') 

const msgPath = path.resolve('.git/COMMIT_EDITMSG')
const msg = readFileSync(msgPath, 'utf-8').trim()

const commitRE =
  /^(revert: )?(feat|fix|docs|style|refactor|perf|test|build|chore|types|release|revert)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${pico.bgRed(' ERROR ')} ${pico.red(
      `invalid commit message format.`
    )}\n\n` +
      pico.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
      ) +
      `    ${pico.green(`feat(print): weboffice打印插件能力`)}\n` +
      `    ${pico.green(`fix(download): 修复下载插件的bug#00001`)}\n\n`
  )
  process.exit(1)
}

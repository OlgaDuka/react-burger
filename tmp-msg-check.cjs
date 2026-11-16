const { execFileSync } = require('node:child_process')

const rev = process.argv[2] || 'HEAD'
const buf = execFileSync('git', ['cat-file', 'commit', rev], { maxBuffer: 10 * 1024 * 1024 })
const ascii = (text) =>
  JSON.stringify(text).replace(/[\u0080-\uffff]/g, (ch) => `\\u${ch.charCodeAt(0).toString(16)}`)

let decoded
try {
  decoded = new TextDecoder('utf-8', { fatal: true }).decode(buf)
  console.log(`[${rev}] valid UTF-8`)
} catch {
  decoded = null
  console.log(`[${rev}] NOT valid UTF-8`)
}

if (decoded) {
  console.log('utf8 :', ascii(decoded.split('\n').find((line) => line.startsWith('feat') || line.startsWith('fix') || line.startsWith('chore')) || decoded))
} else {
  const cp1251 = new TextDecoder('windows-1251').decode(buf)
  console.log('cp1251:', ascii(cp1251.split('\n').find((line) => line.length > 5) || cp1251))
}

const nonAscii = [...buf].filter((byte) => byte > 127).slice(0, 12)
console.log('non-ascii bytes:', nonAscii.map((b) => b.toString(16).padStart(2, '0')).join(' '))

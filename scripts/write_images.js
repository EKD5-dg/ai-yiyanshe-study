// 落地 compress_images.py 的产物：stdin 每行 "文件名<TAB>base64"。
// 绕这一层是因为本机 TSD 会加密 python 直接写出的二进制，node 写盘才是浏览器能读的明文。
// 用法：python scripts/compress_images.py | node scripts/write_images.js
import fs from 'node:fs'

const outDir = 'public/images'
let n = 0
for (const line of fs.readFileSync(0, 'utf8').split('\n')) {
  const tab = line.indexOf('\t')
  if (tab < 1) continue
  fs.writeFileSync(`${outDir}/${line.slice(0, tab)}`, Buffer.from(line.slice(tab + 1), 'base64'))
  n++
}
console.log(`wrote ${n} webp to ${outDir}`)

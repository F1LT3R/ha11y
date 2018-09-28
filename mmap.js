// Ar mmap, fs, someFile, fd, fdW, size, rxProt, priv, buffer, buffer2, wBuffer, coreStats;
const fs = require('fs')
const mmap = require('mmap-io')

const someFile = './test.html'
const fd = fs.openSync(someFile, 'r')
const fdW = fs.openSync(someFile, 'r+')
const {size} = fs.statSync(someFile)
const rxProt = mmap.PROT_READ | mmap.PROT_EXECUTE
const priv = mmap.MAP_SHARED
const buffer = mmap.map(size, rxProt, priv, fd)
// Const buffer2 = mmap.map(size, mmap.PROT_READ, priv, fd, 0, mmap.MADV_SEQUENTIAL)
const wBuffer = mmap.map(size, mmap.PROT_WRITE, priv, fdW)
mmap.advise(wBuffer, mmap.MADV_RANDOM)
mmap.sync(wBuffer)
mmap.sync(wBuffer, true)
mmap.sync(wBuffer, 0, size)
mmap.sync(wBuffer, 0, size, true)
mmap.sync(wBuffer, 0, size, true, false)
const coreStats = mmap.incore(buffer)
console.log(coreStats)

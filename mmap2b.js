const Shared = require('mmap-object')

const readOnlySharedObject = new Shared.Open('filename')
console.log(`My value is ${readOnlySharedObject.newKey}`)
console.log(`My other value is ${readOnlySharedObject.newProperty}`)


const Shared = require('mmap-object')

const sharedObject = new Shared.Create('filename')

sharedObject.newKey = 'a string value'
sharedObject.newProperty = Buffer.from('a buffer value, supporting Unicode™')
// SharedObject['uselessKey'] = 0

// // Erase a key
// delete sharedObject.uselessKey
sharedObject.close()

// Read a file
// const read_only_shared_object = new Shared.Open('filename')
// console.log(`My value is ${read_only_shared_object.new_key}`)
// console.log(`My other value is ${read_only_shared_object.new_property}`)

// read_only_shared_object.close()

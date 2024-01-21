const { error } = require('console');
const fs = require('fs');
const path = require('path');
const myStream = new fs.ReadStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf8',
});

myStream.on('readable', () => {
  const data = myStream.read();
  if (data !== null) console.log('\u001b[34m' + data + '\u001b[0m');
});
myStream.on('end', () => {
  console.log('\u001b[32m' + 'the file has been read' + '\u001b[0m');
});
myStream.on('error', (error) => {
  console.error('\u001b[31m' + error + '\u001b[0m');
});

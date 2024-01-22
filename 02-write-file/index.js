const fs = require('fs');
const readline = require('readline');
const path = require('path');
const myProcess = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const myStream = fs.WriteStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf8',
});
myProcess.setPrompt('\u001b[34m' + 'You can write here: ' + '\u001b[0m');
myProcess.prompt();
myProcess.on('line', (text) => {
  if (text.trim() === 'exit') {
    myProcess.close();
  } else {
    myStream.write(text + '\n');
    myProcess.prompt();
  }
});
myProcess.on('close', () => {
  myProcess.output.write('\u001b[32m' + 'Buy! Have a good day' + '\u001b[0m\n');
});
myProcess.on('error', (error) => {
  console.error('\u001b[31m' + error + '\u001b[0m');
});
myStream.on('error', (error) => {
  console.error('\u001b[31m' + error + '\u001b[0m');
});
// привет, проверяющий! прошу для проверки сохранения текста в файле text.txt перейти на любую другую вкладку (файл) и обратно,
// динамически обновления не видно при использовании fs.WriteStream (вместо fs.appendFile), но текст сохраняется) удачи!

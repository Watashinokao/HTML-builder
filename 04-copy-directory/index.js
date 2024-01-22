const fsPromises = require('fs/promises');
const path = require('path');
async function copyDir() {
  try {
    await fsPromises.mkdir(path.join(__dirname, 'files-copy'), {
      recursive: true,
    });
    const filesInCopyFolder = await fsPromises.readdir(
      path.join(__dirname, 'files-copy'),
      { withFileTypes: true },
    );
    for (const file of filesInCopyFolder) {
      await fsPromises.unlink(path.join(__dirname, 'files-copy', file.name));
    }
    const filesInFolder = await fsPromises.readdir(
      path.join(__dirname, 'files'),
      { withFileTypes: true },
    );
    for (const file of filesInFolder) {
      await fsPromises.copyFile(
        path.join(__dirname, 'files', file.name),
        path.join(__dirname, 'files-copy', file.name),
      );
    }
    console.log('\u001b[32m' + 'done' + '\u001b[0m');
  } catch (error) {
    console.error('\u001b[31m' + error + '\u001b[0m');
  }
}
copyDir();

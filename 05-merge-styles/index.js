const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');
const bundleFile = fs.WriteStream(
  path.join(__dirname, 'project-dist', 'bundle.css'),
  {
    encoding: 'utf8',
  },
);
async function mergeFiles() {
  try {
    const arrFilesStyle = await fsPromises.readdir(
      path.join(__dirname, 'styles'),
      { withFileTypes: true },
    );
    for (const file of arrFilesStyle) {
      if (file.isFile() && file.name.endsWith('.css')) {
        fs.readFile(
          path.join(__dirname, 'styles', file.name),
          (error, data) => {
            if (error) {
              console.error('\u001b[31m' + error + '\u001b[0m');
            } else {
              bundleFile.write(data + '\n');
            }
          },
        );
      }
    }
  } catch (error) {
    console.error('\u001b[31m' + error + '\u001b[0m');
  }
}
mergeFiles();

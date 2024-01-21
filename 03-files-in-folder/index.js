const fs = require('fs');
const path = require('path');
fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (error, files) => {
    if (error) {
      console.error('\u001b[31m' + error + '\u001b[0m');
    } else {
      files.forEach((item) => {
        if (item.isFile()) {
          fs.stat(
            path.join(__dirname, 'secret-folder', item.name),
            (error, stats) => {
              if (error) {
                console.error('\u001b[31m' + error + '\u001b[0m');
              } else {
                console.log(
                  '\u001b[34m' +
                    path.basename(item.name, path.extname(item.name)) +
                    '\u001b[0m' +
                    ' - ' +
                    '\u001b[35m' +
                    path.extname(item.name).replaceAll('.', '') +
                    '\u001b[0m' +
                    ' - ' +
                    '\u001b[36m' +
                    stats.size +
                    '\u001b[30m' +
                    'b' +
                    '\u001b[0m',
                );
              }
            },
          );
        }
      });
    }
  },
);

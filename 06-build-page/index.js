const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');
let template = null;
const bundleFile = fs.WriteStream(
  path.join(__dirname, 'project-dist', 'style.css'),
  {
    encoding: 'utf8',
  },
);
const indexFile = fs.WriteStream(
  path.join(__dirname, 'project-dist', 'index.html'),
  {
    encoding: 'utf8',
  },
);
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (error) => {
  if (error) {
    console.error('\u001b[31m' + error + '\u001b[0m');
  }
});
fs.readFile(
  path.join(__dirname, 'template.html'),
  { recursive: true, encoding: 'utf8' },
  (error, data) => {
    if (error) {
      console.error('\u001b[31m' + error + '\u001b[0m');
    } else {
      template = data;
    }
  },
);
setComponents();
mergeFilesStyle();
copyDir(
  path.join(__dirname, 'assets'),
  path.join(__dirname, 'project-dist', 'assets'),
);

async function setComponents() {
  try {
    const components = await fsPromises.readdir(
      path.join(__dirname, 'components'),
      {
        withFileTypes: true,
      },
    );
    for (const component of components) {
      const html = await fsPromises.readFile(
        path.join(__dirname, 'components', component.name),
        { recursive: true, encoding: 'utf8' },
        (error, data) => {
          if (error) {
            console.error('\u001b[31m' + error + '\u001b[0m');
          } else {
            return data;
          }
        },
      );
      template = template.replaceAll(
        `{{${path.basename(component.name, path.extname(component.name))}}}`,
        html,
      );
    }
    indexFile.write(template + '\n');
  } catch (error) {
    console.error('\u001b[31m' + error + '\u001b[0m');
  }
}

async function mergeFilesStyle() {
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
async function copyDir(pathFolder, pathCopyFolder) {
  try {
    await fsPromises.rm(pathCopyFolder, { recursive: true, force: true });
    const filesInFolder = await fsPromises.readdir(pathFolder, {
      withFileTypes: true,
    });
    await fsPromises.mkdir(pathCopyFolder, {
      recursive: true,
    });
    for (const file of filesInFolder) {
      if (file.isDirectory()) {
        let newPathFolder = path.join(
          pathFolder,
          path.basename(file.name, path.extname(file.name)),
        );
        let newPathCopyFolder = path.join(
          pathCopyFolder,
          path.basename(file.name, path.extname(file.name)),
        );
        await copyDir(newPathFolder, newPathCopyFolder);
      }
      if (file.isFile()) {
        await fsPromises.copyFile(
          path.join(pathFolder, file.name),
          path.join(pathCopyFolder, file.name),
        );
      }
    }
  } catch (error) {
    console.error('\u001b[31m' + error + '\u001b[0m');
  }
}

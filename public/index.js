const electron = require('electron');
const { app } = electron;

let window = null;

function createWindow() {
  if (window) return;
  window = new electron.BrowserWindow({
    webPreferences: {
      nodeIntegration: true // 允许渲染进程中使用node模块
    },
    backgroundColor: '#333544',
    minWidth: 450,
    minHeight: 350,
    height: 350,
    width: 450
  });
  window.loadFile('public/index.html').catch(console.error);
  window.on('close', () => window = null);
  window.webContents.on('crashed', () => console.error('crash'));
}
app.on('ready', () => createWindow());
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', createWindow)
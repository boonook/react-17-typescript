const { app, BrowserWindow,Menu } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
let mainWindow = null;
const baseURL = !app.isPackaged?'http://localhost:3000':`file://${__dirname}/build/index.html`;
//判断命令行脚本的第二参数是否含--debug
const debug = /--debug/.test(process.argv[2]);
function makeSingleInstance () {
    if (process.mas) return;
    app.requestSingleInstanceLock();
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}
function createWindow () {
    const windowOptions = {
        width: 1060,
        height: 800,
        transparent: true,
        //frame:false,
        // 显示关闭窗口，放大窗口，缩放功能
        maximizable: true,
        minimizable: true,
        resizable: true,
        webPreferences: {
            nodeIntegration: false,
            preload: __dirname + '/preload.js'
        }
    };
    mainWindow = new BrowserWindow(windowOptions);
    Menu.setApplicationMenu(null)
    mainWindow.loadURL(baseURL);
      if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
      }  
    // mainWindow.loadURL(path.join('file://', __dirname, '/build/index.html'));
    //接收渲染进程的信息
    const ipc = require('electron').ipcMain;
    ipc.on('min', function () {
        mainWindow.minimize();
    });
    ipc.on('max', function () {
        mainWindow.maximize();
    });
    ipc.on("login",function () {
        mainWindow.setSize(300, 400);
        mainWindow.center();
        mainWindow.setResizable(false);
    });
    ipc.on("other",function () {
        mainWindow.setSize(800, 600);
        mainWindow.center();
        mainWindow.setResizable(true);
    });
    //如果是--debug 打开开发者工具，窗口最大化，
    if (debug) {
        mainWindow.webContents.openDevTools();
        require('devtron').install();
    }

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}
makeSingleInstance();
//app主进程的事件和方法
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
module.exports = mainWindow;

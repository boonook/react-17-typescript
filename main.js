const { app, BrowserWindow,Menu } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');

/***********检测更新***************/
log = require('electron-log');
const { autoUpdater } = require('electron-updater');
autoUpdater.logger = log;
// 手动更新
// autoUpdater.autoDownload = false;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');
const feedURL = '存放electron下载的地址';
/***********检测更新***************/

let mainWindow = null;
let baseURL = '';
// const baseURL = !app.isPackaged?'http://localhost:3000':`file://${__dirname}/build/index.html`;
if (!app.isPackaged) {
    baseURL = 'http://localhost:3000';
  } else {
    baseURL = url.format({
        pathname: path.join(__dirname, './build/index.html'),
        protocol: 'file',
        slashes: true
    });
  }
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
        width: 300,
        height: 400,
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
    Menu.setApplicationMenu(null);
    mainWindow.loadURL(baseURL);
    //   if (isDev) {
    //     mainWindow.webContents.openDevTools({ mode: 'detach' });
    //   }  
    mainWindow.webContents.openDevTools({ mode: 'detach' });
    // mainWindow.loadURL(path.join('file://', __dirname, '/build/index.html'));
    //接收渲染进程的信息
    const ipc = require('electron').ipcMain;
    ipc.on('min', function () {
        mainWindow.minimize();
    });
    ipc.on('max', function () {
        mainWindow.maximize();
    });
    ///登录界面
    ipc.on("login",function () {
        mainWindow.setSize(300, 400);
        mainWindow.center();
        mainWindow.setMaximizable(false);
        mainWindow.setResizable(false);
        mainWindow.webContents.send('ping', 'pong');
    });
     ///其他界面
    ipc.on("other",function () {
        mainWindow.setSize(800, 600);
        mainWindow.center();
        mainWindow.setMaximizable(true);
        mainWindow.setResizable(true);
    });
    // 关闭窗口
    ipc.on('closeWindow', () => {
        mainWindow.close();
    });

    if(debug){
      mainWindow.webContents.openDevTools();
      require('devtron').install;
    }
    mainWindow.on('close',()=>{
      mainWindow = null;
    });
    ///与渲染层进行通讯
    mainWindow.webContents.on("did-finish-load",()=>{
        // console.log("did-finish-load");
        mainWindow.webContents.send('ping2', 'pong1111111111111111111');
    })
}

makeSingleInstance();
//app主进程的事件和方法
app.on('ready', () => {
    createWindow();
});
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

const checkForUpdates = () => {
    autoUpdater.setFeedURL(feedURL);
  
    autoUpdater.on('error', function (err) {
      sendStatusToWindow({ text: '检查更新出错' + err });
    });

    autoUpdater.on('checking-for-update', function () {
      sendStatusToWindow('正在检查更新……');
    });

    autoUpdater.on('update-available', function (info) {
      sendStatusToWindow({ online: info.version });
    });

    autoUpdater.on('update-not-available', function () {
      sendStatusToWindow({ text: '现在使用的就是最新版本，不用更新' });
    });

    // 监听下载进度事件
    autoUpdater.on('download-progress', function (progressObj) {
      win.webContents.send('downloadProgress', progressObj);
    });

    autoUpdater.on('update-downloaded', function () {
      sendStatusToWindow({ text: '下载完成，开始自动安装' });
      autoUpdater.quitAndInstall();
    });
  
    ipcMain.on('checkForUpdate', () => {
      if (process.env.NODE_ENV !== 'development') {
        // 执行自动检查更新
        autoUpdater.checkForUpdates();
      }
    });

    autoUpdater.checkForUpdatesAndNotify();
};

module.exports = mainWindow;

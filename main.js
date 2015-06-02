app = require("app");
var BrowserWindow = require("browser-window");

require("crash-reporter").start();

var mainwindow = null;

app.on('window-all-closed', function() {
    if(process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainwindow = new BrowserWindow({width:1000,height:800});

    mainwindow.loadUrl('file://'+__dirname+'/index.html');

    mainwindow.on('closed', function() {
        mainwindow = null;
    });
});

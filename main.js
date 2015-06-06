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

    var http = require("http");
    var qs = require("querystring");

    http.createServer(function(req, resp) {
        resp.writeHead(200, {"Content-Type": "text/html"});
        if(req.method == "POST") {
            var body = "";
            req.on("data", function(data) {
                body += data;
            });
            req.on("end", function() {
                var q = qs.parse(body);
                if(q.html !== undefined) {
                    mainwindow.webContents.executeJavaScript('set_content("'+escape(q.html)+'",'+(q.append?1:0)+')');
                } else {
                    console.log("NO MATCH: " + body);
                }
                resp.end("OK!");
            });
        } else {
            resp.end("send me a post request please");
        }
    }).listen(9999);
});

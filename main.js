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
    var fs = require("fs");
    http.createServer(function(req, resp) {
        resp.writeHead(200, {"Content-Type": "text/html"});
        if(req.method == "POST") {
            var body = "";
            req.on("data", function(data) {
                body += data;
            });
            req.on("end", function() {
                if(body.match(/html=/)) {
                    var output = body.substring(5);
                    var ofilename = "log/" + new Date().getTime() + ".html";
                    console.log(ofilename);
                    fs.writeFile(ofilename, output, function(err) {
                        if(err) {
                            return console.log("ERROR IN WRITING FILE " + ofilename);
                        }
                        mainwindow.loadUrl('file://'+__dirname+'/'+ofilename);
                    });
                }
                resp.end("OK!");
            });
        } else {
            resp.end("send me a post request please");
        }
    }).listen(9999);
});

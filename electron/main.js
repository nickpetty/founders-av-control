const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
//electron.crashReporter.start();

var mainWindow = null;

app.on('window-all-closed', function() {
  //if (process.platform != 'darwin') {
    app.quit();
  //}
});

app.on('ready', function() {
  // call python?
  var subpy = require('child_process').spawn('python', ['./web-based/main.py']);
  //var subpy = require('child_process').spawn('./dist/hello.exe');
  var rq = require('request-promise');
  var mainAddr = 'http://127.0.0.1:8080';

  var openWindow = function(){
    mainWindow = new BrowserWindow({width: 1024, height: 768});
    // mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.loadURL('http://127.0.0.1:8080');
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function() {
      mainWindow = null;
      subpy.kill('SIGINT');
    });
  };

  var startUp = function(){
    rq(mainAddr)
      .then(function(htmlString){
        console.log('server started!');
        openWindow();
      })
      .catch(function(err){
        //console.log('waiting for the server start...');
        startUp();
      });
  };

  // fire!
  startUp();
});
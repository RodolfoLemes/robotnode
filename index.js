var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module

const motor = require('./MotorControll')

http.listen(8080); //listen to port 8080

function handler (req, res) { //what to do on requests to port 8080
  fs.readFile(__dirname + '/public/rgb.html', function(err, data) { //read file rgb.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from rgb.html
    return res.end();
  });
}


process.on('SIGINT', function () { //on ctrl+c
    motor.shutdown(true)
    process.exit(); //exit completely
});
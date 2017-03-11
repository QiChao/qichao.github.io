var http = require("http");
var fs = require("fs");
var mime =require("mime");
var path = require("path");
var cache ={};


function serveStatic (response,cache,absPath) {
    // body...
    if (cache[absPath]) {
        sendFile(response,absPath,cache[absPath])
    }else{
        fs.exists(absPath,function(exists){
           
            if (exists) {
                fs.readFile(absPath,function(err,data){
                    response.writeHead(200,
                            {"Content-Type":mime.lookup(
                                    path.basename(absPath)
                                )}
                        )
                    response.end(data)
                })
            };
        })
    }
}


http.createServer(function (request,response) {

   var filePath = false;
   if(request.url == '/'){
    filePath = 'web/index.html';
   }else{
    filePath = './web' + request.url;
   }
   var absPath = './' + filePath;

   serveStatic(response,cache,absPath)
    console.log(absPath,request.url)
}).listen(8000);

console.log('Server running at http://127.0.0.1:8000/' )
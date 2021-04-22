var fs = require('fs');
const { promisify } = require('util');
var http = require("http");
var url = require("url");
var app = require('express')();

http.createServer(function(request, response){
    response.writeHead(200, {"Content-Type":"text/plain"});
    var params = url.parse(request.url,true).query;

    var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width" /><link rel="stylesheet" href="https://generic-carousel.timemice.com/text_based_slider/flickity.css" /><link rel="stylesheet" href="https://generic-carousel.timemice.com/text_based_slider/style.css" /></head><body><div class="sf-carousel" data-flickity='+"'"+'{"autoPlay": true}'+"'"+'>' + '\n';

    var htmlFooter = '\n' + '</div><script src="https://generic-carousel.timemice.com/text_based_slider/flickity.pkgd.js"></script></body></html>';


    var carouselData = JSON.parse(params.carouselData);


     for (var i = 0; i < carouselData.length; i++) {

        
     html += '\n' + '<div class="sf-carousel-cell sf-carousel-card"><img src="'+ carouselData[i].img +'" alt="No image found for carousel" style="width: 100%; height: 60%; object-fit: cover" /><div class="sf-carousel-container"><h4><b>'+ carouselData[i].title +'</b></h4><p>'+ carouselData[i].txt +'</p><a target="_blank" class="sf-carousel-button" href="'+ carouselData[i].url +'" ><div class="servicechat-admin-options" question="180" option="1">FIND OUT MORE</div></a></div></div>' + '\n';

        if (i === (carouselData.length - 1)){
          html += htmlFooter;
        }

    }


    console.log(params);

    
    var resetLocation = "https://generic-carousel.timemice.com/success";





    var fileName = Date.now();

    const path = __dirname + '/test.html';

    const existsPromise = promisify(fs.exists);

    existsPromise(path)
    .then((exists) => {
        if (exists) {
            fs.writeFileSync(path, html, 'utf8');
            console.log('File exists');
        } else {
            fs.writeFileSync(path, html, 'utf8');
            console.log('File wasnt existing');
        }
    });

    /*var file = fileName+".html"*/

    /*var stream = fs.createWriteStream(file);
    stream.once('open', function(fd) {
    stream.write(carouselData+"\n");
    stream.end();
    });

    app.get('/', (req, res) => {
      res.redirect('/foo/bar');
    });*/

    response.writeHead(301,{Location: resetLocation});
    response.end();

}).listen(process.env.PORT);
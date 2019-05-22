const https = require('https');
const http = require('http');

var BuscarHttpUrl = function(URL, response){

    console.log("Chamando... "+URL)
    let protoco;
    
    if(/http:/.exec(URL))
      protoco = http
    else if(/https:/.exec(URL))
      protoco = https

    protoco.get(URL, (resp) =>{
      let data = '';

      console.log("---Resposta do server começou");

      console.log(`---server status: ${resp.statusCode}`);
      console.log("---Response Headers: %j", resp.headers);

      //resp.setEnconding("UTF-8");

      resp.on('data', (chunk)=>{
        console.log(`--chunk-- ${chunk.length}`);
        data += chunk;

      })

      resp.on('end', ()=>{

        response(data);
      })
    }).on('error', (err)=>{
      console.log("Error: "+err.message)
    })
}


module.exports = BuscarHttpUrl

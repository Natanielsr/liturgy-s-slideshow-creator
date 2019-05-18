const http = require('http');

URL = 'http://liturgiadiaria.cnbb.org.br/app/user/user/UserView.php?ano=2019&mes=5&dia=19';

var BuscarLiturgia = function(response){
    http.get(URL, (resp) =>{
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

        let leituras = findTagValue('h3', data);
        let liturgia = {
          dia: findTagValue('h2', data)[0],
          leitura1: leituras[0],
          salmo:leituras[1],
          fraseSalmo:findTagValue("div class='refrao_salmo'", data)[0]
          .replace('R. ','').replace('<br />', ''),
          leitura2:leituras[2],
          evangelho:leituras[3]
        };
        console.log(liturgia);

        response(liturgia);
      })
    }).on('error', (err)=>{
      console.log("Error: "+err.message)
    })
}

function findTagValue(tagName, html) {

  let p2 = /(\w*)(\s)?/
  let tagFinal = p2.exec(tagName)[1];

  let strR = '<'+tagName+'(\\b[^>]*)?>(\\s+)?(.*?)</'+tagFinal+'>';
//  console.log(strR);
  let p = new RegExp(strR, "g");
  resultados = []
  let r;
  while ( (r = p.exec(html)) != null){

    let resultadoTratado = r ? r[3].replace(/\s\s+?/g, ' ').trim() : tagName+' NotFound';

    resultados.push(resultadoTratado);
  //  console.log(resultados);
  }

  return resultados;

}

module.exports = BuscarLiturgia

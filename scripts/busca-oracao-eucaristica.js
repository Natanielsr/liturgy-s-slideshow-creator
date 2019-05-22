const BuscaHttp = require('./utils/chamada-http')
const findTagValue = require('./utils/busca-tag')

let findTag = false
let oracao = []
let textoTag = '';
var BuscarOracaoEucatistica = function(numero, response){

    URL = 'https://sites.google.com/site/sagradaliturgia/oracao-eucaristica---'+numero;

    BuscaHttp(URL, (data) =>{

      var htmlparser = require("htmlparser2");
      var parser = new htmlparser.Parser({
        onopentag: function(name, attribs){
            if(name === "span"){
              //  console.log("JS! Hooray!");
                findTag = true;
            }
            else {
              findTag = false;
            }
        },
        ontext: function(text){
            if(findTag)
            {
              //console.log("-->", text);
              textoTag += text;
            }
        },
        onclosetag: function(tagname){
            if(tagname === "span"){
              //  console.log("That's it?!");
                oracao.push(textoTag);
                textoTag = '';
                findTag = false;
            }
        },
        onend: function(){
        //  console.log(oracao);
          let oracaoFiltrada = filtrarOracao(oracao);
        //  console.log('FILTRADA----------------');
          console.log(oracaoFiltrada);
          response(oracaoFiltrada);
        }
      }, {decodeEntities: true});
      parser.write(data);
      parser.end();

  })
}

function filtrarOracao(oracao){
  let filtrado = [];
  let reg = /T: /
  for (var i = 0; i < oracao.length; i++) {
    let p = oracao[i]
    if(reg.exec(p) != null){

      filtrado.push(p.replace(reg, ''));
    }
  }

  return filtrado;
}


module.exports = BuscarOracaoEucatistica

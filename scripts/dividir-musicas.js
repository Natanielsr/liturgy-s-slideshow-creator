var fs = require('fs');

let musicas = [];
let tamanhoMenorFrase = 1000;
let tamanhoMaiorFrase = 0;

var lerArquivo = function (){
  try {
    let path ='./resources/musicas.txt'
    console.log('>>Lendo '+path)
      var data = fs.readFileSync(path, 'utf8');
      //console.log(data.toString());
      return separarMusicas(data);

  } catch(e) {
      console.log('Error:', e.stack);
  }
}

function separarMusicas(data){

  let regFraseMusica = /[A-z]/
  let regFimMusica = /[-]+/

  let encontrouFrase = false
  let fimMusica = false;

  let estrofe = '';
  let titulo = null;
  let estrofes = [];
  data
  .split('\n')
  .forEach(function (line) {

    if(regFraseMusica.exec(line))
    {
      encontrouFrase = true;
      fimMusica = false;
    }
    else if(regFimMusica.exec(line)){
      encontrouFrase = false;
      fimMusica = true;
    }
    else {
      encontrouFrase = false;
    }

    if(encontrouFrase){
      if(!titulo)
        titulo = line+"\n";
      else
        estrofe += line+"\n";
    }
    else {
      if(estrofe){
        estrofes.push(estrofe);
        if(estrofe.length > tamanhoMaiorFrase)
          tamanhoMaiorFrase = estrofe.length
        else if(estrofe.length < tamanhoMenorFrase)
          tamanhoMenorFrase = estrofe.length

        estrofe = '';
      }
    }

    if(fimMusica){
      let musica = {
        titulo : titulo.trim(),
        estrofes : estrofes
      }
      musicas.push(musica);
      estrofes = [];
      estrofe = '';
      titulo = '';
    }
  })
  return {tamanhoMaiorFrase, tamanhoMenorFrase, musicas};
}

module.exports = lerArquivo;

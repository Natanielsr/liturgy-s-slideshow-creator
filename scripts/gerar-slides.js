var PptxGenJS = require("pptxgenjs");
let tamanhoMaximoFont = 30
let tamanhoMinimoFont = 20
var gerar = function (musicas){
  var pptx = new PptxGenJS();
  let numeroDeMusicas = musicas.length
  console.log('>> Numero de Musicas '+numeroDeMusicas);

  let contadorSlide = 1
  for (var i = 0; i < numeroDeMusicas; i++) {
    let musica = musicas[i];

    for (var j = 0; j < musica.estrofes.length; j++) {

    //  process.stdout.write('>>Gerando  Slide  '+contadorSlide+' Gerado...');
      let estrofe = musica.estrofes[j];

      var slide = pptx.addNewSlide();
      slide.addText(musica.titulo, { x:4, y:0.5, fontSize:18, color:'363636' });
      slide.addText(estrofe, { x:1., y:3, fontSize:calculaTamanhoFonte(estrofe.length), color:'363636' })

      process.stdout.write('>> Slide  '+contadorSlide+' Gerado com sucesso!');

      process.stdout.write('----------------------\n');
      contadorSlide ++;
    }

  }

  let path = './slide-result/slide'
  pptx.save(path);
  console.log('>> Slides salvos em '+path);
}

function calculaTamanhoFonte(tamanhoEstrofe){
  let tamanhoFonte = 18;

  tamanhoFonte = tamanhoMaximoFont - ((tamanhoEstrofe-41) / (343/(tamanhoMaximoFont-tamanhoMinimoFont)))
  process.stdout.write('>>> Tamanho da estrofe '+tamanhoEstrofe);
  process.stdout.write('>>> Tamanho da fonte '+tamanhoFonte);
  return tamanhoFonte;
}

module.exports = gerar;

var PptxGenJS = require("pptxgenjs");
let tamanhoMaximoFont = 44
let tamanhoMinimoFont = 23

let tamanhoMenorFrase;
let tamanhoMaiorFrase;

var gerar = function (liturgia,oracaoEucaristica, objMusicas){
  var pptx = new PptxGenJS();
  let musicas = objMusicas.musicas;
  tamanhoMenorFrase = objMusicas.tamanhoMenorFrase;
  tamanhoMaiorFrase = objMusicas.tamanhoMaiorFrase;

  var capaSlide = pptx.addNewSlide();
  capaSlide.addText(liturgia.dia, { x:'0%', y:'5%', w:'100%',align: 'center',
   fontSize:30, color:'8F1010', bold: true });
  capaSlide.addText(
    [{ text: liturgia.leitura1},
    {text:liturgia.salmo},
    {text:liturgia.fraseSalmo, options :{color: '8F1010'}},
    {text:liturgia.leitura2},
    {text:liturgia.evangelho}], { x:'5%', y:'15%', w: '90%', h:'85%',
    fontSize: 30, color:'363636', align: 'center' })

  let numeroDeMusicas = musicas.length;
  console.log('>> Numero de Musicas '+numeroDeMusicas);
  let contadorSlide = 1

  for (var i = 0; i < numeroDeMusicas; i++) {
    let musica = musicas[i];

    for (var j = 0; j < musica.estrofes.length; j++) {

    //  process.stdout.write('>>Gerando  Slide  '+contadorSlide+' Gerado...');
      let estrofe = musica.estrofes[j];

      AddSlideTexto(pptx, musica.titulo, estrofe);

    //  process.stdout.write('>> Slide  '+contadorSlide+' Gerado com sucesso!');

  //    process.stdout.write('----------------------\n');
      contadorSlide ++;
    }

    AddSlideDivisorio(pptx);

    if(musica.titulo == 'GLÓRIA'){ //salmo
      AddSlideTexto(pptx, 'Salmo', liturgia.fraseSalmo);
      AddSlideDivisorio(pptx);
    }

    if(musica.titulo == 'SANTO'){ //oracao eucaristica
      AddSlideDivisorioImagemPersonalizada(pptx, './resources/oracao-eucaristica.jpg')
      for (var k = 0; k < oracaoEucaristica.length; k++) {
        let oracao = oracaoEucaristica[k]
        AddSlideTexto(pptx, 'Oração Eucaristica', oracao);
        AddSlideDivisorioImagemPersonalizada(pptx, './resources/oracao-eucaristica.jpg')
      }
    }

  }

  let path = './slide-result/slide'
  pptx.save(path);
  console.log('>> Slides salvos em '+path);
}

function AddSlideTexto(pptx, titulo, conteudo){

  var slide = pptx.addNewSlide();
  slide.addText(titulo, { x:'0%', y:'5%', w:'100%',
   fontSize:20, color:'8F1010', bold:true, align: 'center' });

  slide.addText(conteudo, { x:'5%', y:'15%', w:'90%', h: '85%', fontSize:calculaTamanhoFonte(conteudo.length),
   color:'363636', align :'center'})

   console.log('>> Slide '+titulo+' Adicionado com sucesso!!!')
}

function AddSlideDivisorioImagemPersonalizada(pptx, caminhoImagem){
  var slideDivisorio = pptx.addNewSlide();
  slideDivisorio.addImage({
    w: '100%',
    h: '100%',
    path:caminhoImagem
  });

}
function AddSlideDivisorio(pptx){

  AddSlideDivisorioImagemPersonalizada(pptx, './resources/santa-terezinha.jpg')

}

function calculaTamanhoFonte(tamanhoEstrofe){
  let tamanhoFonte = 18;

  tamanhoFonte = tamanhoMaximoFont - ((tamanhoEstrofe-tamanhoMenorFrase) /
    (tamanhoMaiorFrase/(tamanhoMaximoFont-tamanhoMinimoFont)))
//  process.stdout.write('>>> Tamanho da estrofe '+tamanhoEstrofe);
//  process.stdout.write('>>> Tamanho da fonte '+tamanhoFonte);
  return tamanhoFonte;
}

module.exports = gerar;

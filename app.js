let readline = require('readline-sync')
var gerarSlide = require('./scripts/gerar-slides')
var dividirMusicas = require('./scripts/dividir-musicas')
var BuscarLiturgia = require('./scripts/liturgia-chamada-request')
var BuscarOracaoEucatistica = require('./scripts/busca-oracao-eucaristica')
var buscarArrayMusicas = require('./scripts/buscar-musicas');
var SalvarMusicas = require('./scripts/salvar-musicas');

////console.log(buscarArrayMusicas);
if(readline.question('Buscar Musicas por nome?') != "s"){
  montarSlides();
  return;
}

let nomeMusica = '';
let arrayNomes = []
while((nomeMusica = readline.question('Digite o nome da musica ou digite \'q\' para sair: ')) != 'q'){
  arrayNomes.push(nomeMusica);
}
console.log(arrayNomes);

let musicas = buscarArrayMusicas(arrayNomes)
      .then((musicas)=>{
          //console.log(musicas);
          SalvarMusicas(musicas).then(()=>{
            montarSlides();
          });
      });

function montarSlides(){
  let dia = 9;
  dia = readline.question('Digite o dia da litugia: ');
  let mes = 6
  mes = readline.question('Digite o mes da litugia: ');
  let ano = 2019
  ano = readline.question('Digite o ano da litugia: ');

  console.log(dia, mes ,ano)

  console.log('>Buscando liturgia do dia...');
  BuscarLiturgia(dia, mes, ano,function(liturgia){
    console.log('> Liturgia buscada com sucesso!');
    console.log('>Buscando oração eucaristica...');
    BuscarOracaoEucatistica(3, (oracao)=>{
      console.log('> oração eucaristica buscada com sucesso!');

      console.log('> Separando estrutura das musicas...')
      let musicas = dividirMusicas();
      console.log('> Musicas separadas com sucesso!');

      console.log('> Gerando Slides...');
      gerarSlide(liturgia, oracao, musicas)
      console.log('> Slides Gerados com sucesso!');
    })
  })
}


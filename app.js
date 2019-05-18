var gerarSlide = require('./scripts/gerar-slides')
var dividirMusicas = require('./scripts/dividir-musicas')
var BuscarLiturgia = require('./scripts/liturgia-chamada-request')


console.log('>Buscando liturgia do dia...');
BuscarLiturgia(function(liturgia){
  console.log('> Liturgia buscada com sucesso!');
  console.log('> Separando estrutura das musicas...')
  let musicas = dividirMusicas();
  console.log('> Musicas separadas com sucesso!');

  console.log('> Gerando Slides...');
  gerarSlide(liturgia, musicas)
  console.log('> Slides Gerados com sucesso!');
})

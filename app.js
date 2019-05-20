let readline = require('readline-sync')
var gerarSlide = require('./scripts/gerar-slides')
var dividirMusicas = require('./scripts/dividir-musicas')
var BuscarLiturgia = require('./scripts/liturgia-chamada-request')

let dia = 26
//readline.question('Digite o dia da litugia: ');
let mes = 5
//readline.question('Digite o mes da litugia: ');
let ano = 2019
//readline.question('Digite o ano da litugia: ');
console.log(dia, mes ,ano)

console.log('>Buscando liturgia do dia...');
BuscarLiturgia(dia, mes, ano,function(liturgia){
  console.log('> Liturgia buscada com sucesso!');
  console.log('> Separando estrutura das musicas...')
  let musicas = dividirMusicas();
  console.log('> Musicas separadas com sucesso!');

  console.log('> Gerando Slides...');
  gerarSlide(liturgia, musicas)
  console.log('> Slides Gerados com sucesso!');
})

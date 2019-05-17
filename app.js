var gerarSlide = require('./scripts/gerar-slides')
var dividirMusicas = require('./scripts/dividir-musicas')



console.log('> Separando estrutura das musicas...')
let musicas = dividirMusicas();
console.log('> Musicas separadas com sucesso!');
console.log('> Gerando Slides...');
gerarSlide(musicas)
console.log('> Slides Gerados com sucesso!');

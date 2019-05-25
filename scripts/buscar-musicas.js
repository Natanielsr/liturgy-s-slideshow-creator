const BuscaHttp = require('./utils/chamada-http')
const fetch = require('node-fetch');

const buscarArrayMusicas = async function (){
  let nomesMusicas = ['Comunidade Shalom Ressuscitou', 'Perdoa-me']
  for (var i = 0; i < nomesMusicas.length; i++) {
    let nome = nomesMusicas[i]
    console.log('>Buscando '+nome+'..........');
    console.log('');
    let letra =  await BuscarMusica(nome);
    console.log(letra);
    console.log('');
  }

}
async function BuscarMusica(trecho_busca){

  const idMusica = await buscarIdDaMusica(trecho_busca);
  const letra = await buscarLetraDaMusica(idMusica);

  return letra;

}

async function buscarIdDaMusica(trecho_busca){
    const trecho_formatado = trecho_busca.replace(/\s/, '%')
    URL = `https://api.vagalume.com.br/search.excerpt?q=${trecho_formatado}&limit=5`

    const response = await fetch(URL);
    const musicaJson = await response.json();

    //console.log(musicaJson);
    let musica = musicaJson.response.docs[0]
    console.log(musica.id)
    console.log(musica.url)
    console.log(musica.title)
    console.log(musica.band)

    return musica.id

}

async function buscarLetraDaMusica(id) {
    URL = `https://api.vagalume.com.br/search.php?apikey=660a4395f992ff67786584e238f501aa&musid=${id}`
    const response = await fetch(URL);
    const musicaJson = await response.json();
    let letra = musicaJson.mus[0].text;

    return letra;
}

module.exports = buscarArrayMusicas

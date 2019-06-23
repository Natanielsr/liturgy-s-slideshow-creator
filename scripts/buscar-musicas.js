const BuscaHttp = require('./utils/chamada-http')
const fetch = require('node-fetch');



const buscarArrayMusicas = async function (nomesMusicas){
  let musicas = [];

  //let nomesMusicas = ['Comunidade Shalom Ressuscitou', 'Perdoa-me']
  for (var i = 0; i < nomesMusicas.length; i++) {
    let nome = nomesMusicas[i]
    console.log('>Buscando '+nome+'..........');
    console.log('');
    let musica =  await BuscarMusica(nome);
    console.log('Musica Encontrada: "'+musica.title+'"');
   // console.log(musica.letra);
    console.log('');
    musicas.push(musica);

  }


  return musicas;
}


async function BuscarMusica(trecho_busca){

  const musica = await buscarIdDaMusica(trecho_busca);
  if(musica){
    musica.letra = await buscarLetraDaMusica(musica.id);
  }
  else
    return {title : trecho_busca, letra : ''}

  return musica;

}

async function buscarIdDaMusica(trecho_busca){
    const trecho_formatado = trecho_busca.replace(/\s/, '%')
    URL = `https://api.vagalume.com.br/search.excerpt?q=${trecho_formatado}&limit=5`

    try {
      const response = await fetch(URL);
      const musicaJson = await response.json();

      //console.log(musicaJson);
      let musica = musicaJson.response.docs[0]
      if(!musica)
      {
        console.log('Nao foi possivel achar "'+trecho_busca+'"');
        return null;
      }
      console.log(musica.id)
      console.log(musica.url)
      console.log(musica.title)
      console.log(musica.band)

      return musica;
    } catch (error) {
      
    }
}

async function buscarLetraDaMusica(id) {
    URL = `https://api.vagalume.com.br/search.php?apikey=660a4395f992ff67786584e238f501aa&musid=${id}`

    try {
      const response = await fetch(URL);
      const musicaJson = await response.json();
      let letra = musicaJson.mus[0].text;

      return letra;
    } catch (error) {
      return '';
    }
    
}

module.exports = buscarArrayMusicas

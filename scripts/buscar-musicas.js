const BuscaHttp = require('./utils/chamada-http')

var BuscarMusica = function(trecho_busca, response){

  buscarIdDaMusica(trecho_busca, (musicaId)=>{
    buscarLetraDaMusica(musicaId, (letra)=>{
      response(letra)
    })
  })

}

function buscarLetraDaMusica(id, response){
  URL = 'https://api.vagalume.com.br/search.php?apikey=660a4395f992ff67786584e238f501aa&musid='+id

  BuscaHttp(URL, (data) =>{
    //console.log(data);
    let musicaJson = JSON.parse(data);
    let letra = musicaJson.mus[0].text;

    //console.log(letra);
    response(letra);
  })
}

function buscarIdDaMusica(trecho_busca, response){

  let trecho_formatado = trecho_busca.replace(/\s/, '%')
  URL = 'https://api.vagalume.com.br/search.excerpt?q='+trecho_formatado+'&limit=5'

  BuscaHttp(URL, (data) =>{
    console.log(data);
    let musica = JSON.parse(data).response.docs[0]
    console.log(musica.id)
    console.log(musica.url)
    console.log(musica.title)
    console.log(musica.band)

    response(musica.id);
  })
}


module.exports = BuscarMusica

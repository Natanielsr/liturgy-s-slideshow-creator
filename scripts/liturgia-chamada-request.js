const BuscaHttp = require('./utils/chamada-http')
const findTagValue = require('./utils/busca-tag')
var BuscarLiturgia = function(dia, mes, ano, response){

    URL = 'http://liturgiadiaria.cnbb.org.br/app/user/user/UserView.php?ano='+ano+'&mes='+mes+'&dia='+dia;

    BuscaHttp(URL, (data) =>{
        let leituras = findTagValue('h3', data);
        let salmos = findTagValue("div class='refrao_salmo'", data);
        console.log(salmos);
        let liturgia = {
          dia: findTagValue('h2', data)[0],
          leitura1: leituras[0],
          salmo:leituras[1],
          fraseSalmo:salmos[0]
          .replace('Ou:', '').replace('R.',''),
          leitura2:leituras[2],
          evangelho:leituras[3]
        };
        console.log(liturgia);

        response(liturgia);
      })
}


module.exports = BuscarLiturgia

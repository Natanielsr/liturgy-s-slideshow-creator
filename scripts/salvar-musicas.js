const fs = require('fs');

const SalvarMusicas = (musicas)=> {
    return new Promise((resolve, reject) => {
        console.log("Salvando musicas em 'resources/musicas.txt' ....");
        let texto = '';
        for (let i = 0; i < musicas.length; i++) {
            const musica = musicas[i];
            texto += musica.title+'\n';
            texto += musica.letra+'\n';
            texto += '\n--------------------------------\n';
        }

        fs.writeFile("resources/musicas.txt", texto, (err) => {
            if (err){
                console.log(err);
                reject(err);
               
            }
            else{
                console.log("Arquivo salvo em 'resources/musicas.txt'");
                resolve();
            }
        });
    });

}

module.exports = SalvarMusicas
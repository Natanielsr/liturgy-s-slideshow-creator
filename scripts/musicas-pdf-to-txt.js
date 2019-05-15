const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('./resources/musicas.pdf');

pdf(dataBuffer).then(function(data) {

    // number of pages
    console.log(data.numpages);
    // number of rendered pages
    console.log(data.numrender);
    // PDF info
    console.log(data.info);
    // PDF metadata
    console.log(data.metadata);
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log(data.version);
    // PDF text
  //  console.log(data.text);
    let textoTratado = removerAcordes(data.text)
    console.log(textoTratado);

    fs.writeFile("resources/musicas.txt", textoTratado, (err) => {
      if (err)
        console.log(err);
      else
        console.log("Successfully Written to File.");
    });
});

function removerAcordes(text) {

  let regex1 = /(\s\s+)[A-G](#)?(\w+)?(\s\s+)/
  let regex2 = /(\s\s+)[A-G](#)?(\w+)?/

  let = resultString = '';
  text
  .split('\n')
  .forEach(function (line) {
      let r1 = regex1.exec(line);
      let r2 = regex2.exec(line);
      if(!r1)
        resultString += line+'\n';
  })

  return resultString;
}

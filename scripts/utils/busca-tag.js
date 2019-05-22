
let findTagValue = function (tagName, html) {

  let p2 = /(\w*)(\s)?/
  let tagFinal = p2.exec(tagName)[1];

  let strR = '<'+tagName+'(\\b[^>]*)?>(\\s+)?((.*)?(\\s+)?(.+)?)</'+tagFinal+'>';
  console.log(strR);
  let p = new RegExp(strR, "g");
  resultados = []
  let r;
  while ( (r = p.exec(html)) != null){
    //console.log(r.length);
    let resultadoTratado = r ?
      r[3]
      .replace(/\s\s+?/g, ' ')
      .replace(/<br \/>/g, '')
      .replace(/<br>/g, '')
      .trim() : tagName+' NotFound';

    resultados.push(resultadoTratado);
  //  console.log(resultados);
  }

  return resultados;

}

module.exports = findTagValue

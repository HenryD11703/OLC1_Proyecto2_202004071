const parser = require('../Gramatica/gramatica')
function main() {
  try{
    const texti = 'stringdeprueba;'
    const gramatica = parser.parse("21212; 121;   12; HOLA;"+ texti+"1+2; ID;")
    console.log(gramatica)
  }catch(e){
    console.log(e)
  }
}

main()
 
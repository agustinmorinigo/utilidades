// Propósito:  quita los acentos del texto dado por 'text'.
// Parámetros: 'text': un String.
// Resultado:  un String.
// Ejemplo:    removeAccents( 'Quién eres tú, Agustín?' ) -> 'Quien eres tu, Agustin?'
const removeAccents = ( text ) => {
  return String( text ).normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}


// Propósito:     agrega puntos al número dado por 'number'.
// Parámetros:    'number': un String o Number.
// Resultado:     un String.
// Observaciones: el parámetro 'number' puede ser un número entero '1000' o un decimal '1000.55'.
// Ejemplo:       addPoints( 1000000.55 ) -> '1.000.000,55'
const addPoints = ( number ) => {
  return Number( number ).toLocaleString( 'es' );
}


// Propósito:   capitalizar solo la primera letra de todo el texto dado por 'text'.
// Parámetros:  'text': un String.
// Resultado:   un String.
// Ejemplo:     capitalizeFirst( 'hola cómo estás?' ) -> 'Hola cómo estás?'
const capitalizeFirst = ( text ) => {
  return String( text ).trim().toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}


// Propósito:  capitalizar cada palabra del texto dado por 'text'.
// Parámetros: 'text': un String.
// Resultado:  un String.
// Ejemplo:    toCapitalize( 'HOLA CÓMO ESTÁS?' ) -> Hola Cómo Estás?
const toCapitalize = ( text ) => {
  return String( text ).trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}


// Propósito:      calcular el porcentaje de descuento entre los números dados por 'originalPrice' y 'finalPrice'.
// Parámetros:     * 'originalPrice': un Number.
//                 * 'finalPrice': un Number.
// Precondiciones: * Los parámetros deben ser de tipo Number si o si.
//                 * 'originalPrice' debe ser MAYOR que 'finalPrice'.
// Resultado:      un Number.
// Observaciones:  el resultado puede ser 19.66666666666.
// Ejemplo:        getDiscountBetween( 1000, 800 ) -> 20
const getDiscountBetween = ( originalPrice, finalPrice ) => {
  const percent = ( ( originalPrice - finalPrice ) / originalPrice ) * 100;
  return percent;
}


// Propósito: retornar en formato pesos argentinos al número dado por 'number'.
// Parámetros: 'number': un Number.
// Observaciones: Si 'number' tiene decimales como 10000.54315, se retorna '$10.000,54'.
// Resultado: un String.
// Ejemplo: toPesos( 10000 ) -> '$ 10.000'
const toPesos = ( number ) => {

  const options = {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0
  };
  
  return Number( number ).toLocaleString( 'es-ar', options );
  
};


// Propósito: Cancelar el evento 'eventType', del elemento 'HTMLElement'.
// Parámetros: * 'HTMLElement': un Nodo HTML.
            // * 'eventType': un String.
// Resultado: Ninguno.
const cancelEventOf = ( HTMLElement, eventType ) => {

  HTMLElement.addEventListener( eventType, e => {

    if (!e)
        if (window.event) e = window.event;
        else return;
    if (e.cancelBubble != null) e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    if (e.cancel != null) e.cancel = true;
    
  } );
  
}


// Propósito: Copiar en el portapapeles el texto dado por 'content'.
// Parámetros: 'content': un String.
// Resultado: Ninguno.
const copyToClipboard = ( content ) => {

  const input = document.createElement('input');
  input.setAttribute( 'value', content );
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  
}


// Propósito:     retornar una fecha formateada como 'DD de MM de AA' según la fecha dada por 'date'.
// Parámetros:    'date': un Date.
// Resultado:     un String.
// Observaciones: el parámetro 'date' debe ser de tipo Date si o si.
// Ejemplo:       getFormattedDateOf( new Date() ) -> '28 de junio de 2022'
const getFormattedDateOf = ( date ) => {

  const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
  };
  
  return date.toLocaleDateString( 'es-ES', options );
  
}


// Propósito: Retornar una fecha dada por 'date', en el formato dado por 'locale' y 'options'.
// Parámetros:
  // 'date': un Date.
  // 'locale': un String.
  // 'options': un Objeto.
// Observaciones: Para conocer cómo escribir los parámetros 'locale' y 'options', leer documentación de Intl.DateTimeFormat.
// Resultado: un String.
// Ejemplos:
  // format( new Date(), 'es' );                                      //  '5/1/2022'
  // format( new Date(), 'es', {dateStyle: 'long'} );                 //  '5 de enero de 2022'
  // format( new Date(), 'es', {timeStyle: 'short'} );                //  '14:58'
  // format( new Date(), 'en', {weekday: 'short', day: 'numeric'} );  //  '5 Wed'
const getDateOf = ( date, locale, options ) => {
  return new Intl.DateTimeFormat( locale, options ).format( date );
}


// Recuperar los datos de un formulario HTML ( cada input debe tener el atributo "name" ):
const data = Object.fromEntries( new FormData( event.target ) );


// Copiar un objeto correctamente en TODOS los niveles y romper la referencia en memoria:
const nuevaCopia = structuredClone( objetoACopiar );


// Agregar propiedades a un objeto de forma condicional:
let isReservedPerson = true;

const person = {
  name: 'Jane',
  ...( !isReservedPerson && { age: 28 } ) // Si es true, agrega el objeto, sino no agrega nada.
}


// Scroll hacia arriba, con animación suave:
const scrollToTop = () => {

  window.scrollTo({
    top: 0,
    behavior: 'smooth'  
  });

}


// Debouncer:
const input = document.getElementById('name');
let debounceTimer;
 
const debounce = ( callback, time ) => {
  window.clearTimeout( debounceTimer );
  debounceTimer = window.setTimeout( callback, time );
};

const handleInputChange = () => {
  console.log( 'Hola, cambió el input.' );
}
 
input.addEventListener( 'input', () => debounce(handleInputChange, 500), false );


// Recibe un string y retorna solamente los NÚMEROS de ese string. Ejemplo: getNumbersOf( '  $ 5.123.033,00  ' ) retorna '512303300';
const getNumbersOf = text => {

    if( typeof text !== 'string' ) {
        throw new Error( 'Solo se permite string.' );
    }

    return text.replace( /[^0-9]/gi, '' );

}

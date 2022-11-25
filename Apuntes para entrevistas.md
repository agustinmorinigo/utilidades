###################################### Programación Orientada a Objetos ( P.O.O ) ######################################

La P.O.O es un paradigma de programación. Un paradigma es como un "modelo", un "estilo" de programación que nos da una "guía" sobre cómo programar.
Con la P.O.O dejamos de pensar en la lógica pura de un programa, y empezamos a pensar en OBJETOS. Esto nos ayuda mucho en sistemas grandes, ya que en lugar de pensar en funciones, pensamos en las RELACIONES o INTERACCIONES entre los diferentes componentes del sistema.
En la P.O.O, un componentes es un OBJETO.

Un OBJETO es un grupo de MÉTODOS ( funciones ) y PROPIEDADES ( variables ). El cómo este construido un objeto depende mucho del problema al que nos enfrentemos.

La etapa en la que se define la forma de estos objetos se la denomina __MODELADO DE DATOS__
Ejemplo de modelado de datos:

class Animal {
    private edad;

    constructor(edad) {
        this.edad = edad;
    }

    envejecer() {
        this.edad += 1;
    }
}

Con las CLASES podemos crear INSTANCIAS de un OBJETO. 
En pocas palabras, una CLASE es como una "plantilla" o un "molde" para crear nuevos objetos.

Ejemplo:

const gato = new Animal( 2 );
const perro = new Animal( 3 );

Son DOS instancias DISTINTAS del objeto Animal. Los dos comparten la misma lógica, pero cada uno tiene su estado independiente.

## Los 4 PRINCIPIOS de la programación orientada a objetos:

### Encapsulación

La encapsulación busca que NADIE se meta donde no le llaman. Es decir, cada objeto es responsable de su propia información y de su propio estado. La única forma en la que este estado se puede modificar, es mediante los métodos de este objeto.
Por lo tanto, los atributos de un objeto deberían ser INACCESIBLES desde afuera, pudiendolos modificar solo, llamando a los métodos correspondientes de dicho objeto.
Con esto, logramos mantener a salvo al estado de usos indebidos que pueden ocasionar resultados inesperados.
Con esto, surgen métodos muy clásicos en los objetos, los "GETTERS" y los "SETTERS".

### Abstracción

Este concepto nos obliga a pensar en los objetos como "cajas negras". Conocemos la forma de interactuar con ellos, pero no sabemos cómo se conforman de forma interna. Un ejemplo de algo físico es un CELULAR. Nosotros sabemos cómo interactuar con el, qué botones tocar para llamada, mensajes, etc. pero no sabemos cómo funciona internamente. El cómo funciona el celular está ABSTRAIDO del usuario.
Con la abstracción conseguimos algo muy importante, y es el PODER de ser libres de a la hora de modificar la implementación. Desde FUERA de una clase, ningún objeto que la utilice debería tener conocimiento de cómo esta implementada por dentro.
Por ejemplo, si tenemos una clase "Repositorio", que se encarga de devolvernos datos de nuestros repos, desde fuera debería ser igual si estos datos vienen desde una DB, de un fichero txt, etc. 
Deberíamos poder ser capaz de MODIFICAR la implementación de esta clase, sin que los objetos que la utilizan esta clase se enteren. Con esto ganamos flexibilidad.

### Herencia

La herencia se basa en la REUTILIZACIÓN. Con la herencia podemos definir relaciones jerárquicas entre CLASES, de forma que métodos y propiedades en comunes pueden ser reutilizados. Por ejemplo:

class Animal {
    private edad;

    constructor(edad) {
        this.edad = edad;
    }

    envejecer() {
        this.edad += 1;
    }
}

class AnimalAcuatico extends Animal {
    private numeroAletas;

    nadar() {
        // aleteo aleteo.
    }
}

class AnimalTerrestre extends Animal {
    private numeroPatas;

    andar() {
        // correr correr.
    }
}

Las clases AnimalAcuatico y AnimalTerrestre HEREDAN los métodos y propiedades de su clase padre Animal. De esta forma, reutilizamos la lógica de Animal.

### Polimorfismo

Nos da la habilidad de procesar objetos, de distintas maneras. Por ejemplo, siguiendo el ejemplo anterior de animales, ahora agregaremos dos nuevas clases AnimalCuadrúpedo y AnimalBípedo. Ambas son HIJAS de AnimalTerrestre. 
Los dos nuevos objetos son capaces de andar(), entonces este método queremos poder REUTILIZARLO, ya que es común en ambos. Es por esto que la situamos en la clase padre AnimalTerrestre.

El "problema" que tenemos, es que un AnimalCuadrúpedo no anda igual que un AnimalBípedo. Debido a esto, necesitamos cambiar el método andar() para cada clase en particular, por que ambas clases quedarían así:

class AnimalCuadrúpedo extends AnimalTerrestre {
    andar() {
        console.log( 'Ando a cuatro patas.' );
    }
}

class AnimalBípedo extends AnimalTerrestre {
    andar() {
        console.log( 'Ando a dos patas.' );
    }
}





###################################### PROGRAMACIÓN FUNCIONAL ######################################

La programación funcional es un paradigma de programación. Cuando utilizamos este paradigma, estaremos trabajando principalmente con funciones. EVITAREMOS los datos mutables y también evitaremos compartir ESTADOS entre funciones.
En este paradigma, se DELEGA EL CONTROL DE FLUJOS a funciones.






###################################### CLEAN CODE ######################################

El clean code es un "concepto" que nos ayuda a escribir código más prolijo y escalable.
Un código limpio debe ser tan fácil de leer como si fuese un libro. TODO debemos escribir en inglés.
Principios generales del Clean Code:

- Nombre de variables: No deben ser abreviaturas. Deben describir BIEN lo que se quiere "representar". Por ejemplo, 'YYMMDD' es un MAL nombre, porque no describe nada, aunque se entiende. 'currentDate' es un buen nombre, porque se entiende que es una variable que almacena la fecha actual.

- Nombre de arrays: Debemos nombrarla en plural. Por ejemplo, 'fruits' o 'fruitNames'.

- Nombre de strings: Debe ser un sustantivo bien descriptivo. Por ejemplo, 'userName' o ''

- Nombre de numbers: Es importante elegir palabras que describan NÚMEROS, como 'amountOfCards', 'totalCards', 'minCards', 'maxCards', etc.

- Nombre de booleanos: Se deben usar PREFIJOS como 'is', 'has', 'can' va a ayudar mucho a saber que esa variable es un booleano. En otras palabras, el NOMBRE debe poder responder por SI o por NO. Por ejemplo 'isANumber' SI se puede responder con SI o NO. Pero 'aNumber' NO se puede responder con SI o NO y por lo tanto, es un mal nombre para un booleano.

- Nombre de clases y objetos: Deben ser sustantivos. Por ejemplo. 'Animal', 'User', 'Car', 'UserProfile', etc. Debemos evitar nombre genéricos como 'Data', 'Info'.

- Nombre de funciones: Deben empezar con un VERBO. Por ejemplo, 'handleSubmit', 'sendDataToDB', etc. El nombre de la función debe expresar lo que hace, pero NO decir cómo lo hace. Por ejemplo, 'updateUserIfNotExist', 'sendEmailIfIsValidForm'. Estos son MALOS nombres porque estan diciendo cómo lo hacen. Simplemente deben llamarse 'updateUser', 'sendEmail'. Si la función TRAE o ACCEDE A información, deben iniciar con 'get'. Si la función estable algún valor, debería llamarse 'set'.

Estamos escribiendo un código limpio cuando cada función hace exactamente lo que su nombre indica.

Una función solo debe cumplir una tarea. Debe ser lo más atómica e independiente posible.

Una función tampoco debe tener muchos parámetros. Máximo 3 o 4. Si supera ese límite, es mejor mandar un solo objeto con todos los "parámetros".

Como regla general, es bueno que una función no supere las 20 líneas de código. Si supera, es porque se puede crear otra función o porque la función no esta realizando solo una tarea.

Hay que evitar a toda costa la anidación de condicionales, bucles, etc.

Hay que priorizar las condiciones asertivas, es decir es decir que sean POSITIVAS a la hora de hacer evaluaciones. Es mucho más sencillo negar algo positivo, que hacer la negación de algo negativo. Por ejemplo, if( !canNotFormat ) es más dificil de comprender de if( canFormat ).

_Transparencia referencial_: Muchas veces encontramos funciones que dicen hacer una cosa, pero al final terminan haciendo muchas más. Una función cumple el principio de "transparencia referencial" si para un valor de entrada, produce SIEMPRE el mismo valor de salida.

_Principio 'DRY'_: Dry significa 'Don't repeat yourself', es decir, 'No te repitas a vos mismo'. Teniendo en cuenta que la duplicidad de código es la raíz de muchos problemas, debemos evitar duplicar. En lugar de eso, debemos crear funciones para evitar dichas repeticiones.

Hay que evitar el uso de comentarios: No comentar un código mal escrito, mejor reescribirlo.





###################################### PRINCIPIOS S.O.L.I.D ######################################

Son una serie de "normas" o "recomendaciones" que guían la forma de programar.
El fin de solid es hacer al código más mantenible, fácil de cambiar, fácil de agregar nuevas funcionalidades, etc.
SOLID se basa en la P.O.O.

_Single responsibility principle_: Este pricipio indica que cada clase debe tener una sola responsabilidad. 

_Open close principle_: Este principio dice que un software, clase o función debe quedarse ABIERTA para su extensión, pero CERRADA para su modificación. Con este principio, intentamos que la funcionalidad básica de nuestro sistema esté protegida, que no se pueda romper.
Entonces, si tenemos que añadir nuevas funcionalidades, en lugar de modificar nuestro código, hay que CREAR nuevo código. No modificar código existente que ya está funcionando en producción y puede ser estar utilizandose en múltiples lugares. Intentar modificar este código, puede derivar en muchos problemas.
Para lograr esto, lo más común es utilizar la HERENCIA y el POLIMORFISMO.

_Liskov substitution principle_: Este principio dice que toda clase que es HIJA de otra clase, debe poder utilizarse como fuera el mismo padre. 

_Interface segregation principle_: Este principio consiste en separar la interfaz en "pequeños trozos". En lugar de tener un componente o clase ENORME, pues deberíamos separar estos en pequeños pedazos, e ir usando esos pedazos donde corresponda.
Con esto nos evitamos muchos problemas. Por ejemplo, hay en lugares donde realmente se necesita al componente entero, pero otras donde simplemente van a necesitar un pequeño trozo de información de ese componente.

_Dependency inversion principle_: Este principio dice que los módulos de ALTO NIVEL, no deberían depender de los módulos de BAJO NIVEL. Ambos deberían depender de interfaces. Este principio se basa en la abstracción.
Por ejemplo, este principio nos permite NO depender de si nuestra base de datos usa una tecnología u otra, ya que nuestro código no depende de qué base de datos utilizamos, a el solo le sirve traer la información.





###################################### PATRONES DE DISEÑO ######################################

Los patrones de diseño son unas "técnicas" para resolver problemas comunes en el desarrollo de software.
Los patrones de diseño NO son una ley, son recomendaciones o guías para escribir mejor nuestro código.
Algunos de los patrones más conocidos son:

_Patrón 'Singleton'_:
Este patrón consiste en RESTRINGIR la instanciación de una clase a UNA sola vez. Es decir que una clase, solo se podrá instanciar una única vez. 
Si el sistema solo tiene UNA base datos, podemos usar Singleton.

_Patrón 'Decorator'_:
Este patrón permite agregar funcionalidades a un objeto, sin alterar el comportamiento de otras instancias de la clase a la que pertenece ese objeto.

_Patrón 'Mediator'_:
Este patrón define un objeto en el cual encapsula cómo otros objetos van a interactuar.
Este patrón es un 'patrón de comportamiento', ya que puede alterar cómo se ejecuta la aplicación.
Redux, implementa este patrón.

_Patrón 'Adapter'_:
Este patrón permite que un objeto que NO esta diseñado para funcionar con una interfaz, sea modificado para que este SI pueda funcionar con esta.

_Patrón 'MVC'_:
Este patrón se usa comúnmente para desarrollar interfaces de usuario, diviendo la lógica en 3 elementos interconectados.
El modelo, la vista y el controlador.
El modelo, contiene la lógica de negocio.
La vista, es la representación visual de los datos que se recolectan, es lo que verá el usuario.
El controlador se encarga de recibir los datos, transformarlos en algo útil. Recibe los datos del modelo.

_Patrón 'Flux'_:
Este patrón, a diferencia del MVC, cumple en SER un ciclo circular, donde el usuario dispara un evento desde la vista, este realiza unas acciones que luego actualizan el estado de nuestra APP.
Luego de que el estado fue actualizado, nuestra app se renderiza nuevamente.




################################### ALGORITMOS Y ESTRUCTURAS DE DATOS EN JAVASCRIPT ###################################

# Tipos de datos:

- undefined
- null
- boolean
- string
- symbol
- bigint
- number
- object

# Variables:
Las variables permiten a los ordenadores ALMACENAR y MANIPULAR datos de forma dinámica. Hacen esto usando una 'etiqueta' para apuntar a los datos en lugar de usar los datos en sí.





################################### COSAS DE JAVASCRIPT ###################################

- JavaScript es un lenguage dinámico, porque se puede cambiar los TIPOS de las variables, en tiempo de ejecución.
Si queremos evitar esto, y que JS sea un lenguaje estático, debemos utilizar TS.


- JavaScript es un lenguaje débil, porque no es TIPADO. Es decir, no hace falta tipar las varibles, funciones, etc. Se puede usar TypeScript para que sea un lenguaje 'fuerte'.


- Tipos de datos en JS:

# Primitivos
    undefined   ->  undefined
    true        ->  boolean
    1           ->  number
    "hola"      ->  string
    2n          ->  bigInt
    Symbol()    ->  symbol
    null        ->  object // Pero es un primitivo, funciona como un primitivo pero el typeof es 'object'. Es un Bug de JS.

# Objetos
    {}          ->  object
    []          ->  object
    new Map()   ->  object

# Funciones
function () {}  -> function  // Pero es realidad es un objeto, dentro funciona con Objetos.


JS tiene dos tipos de datos, los primitivos y los objetos.
La principal diferencia entre ambos, es que los primitivos se pasan y comparan por VALOR, y los objetos se pasan y comparan por REFERENCIA.
Los primitivos son inmutables, los objetos si se pueden mutar.







################################### COSAS DE REACT ###################################

__Qué es un state?__:
Un estado es una variable que se almacena en memoria, y que utiliza React para sus componentes.

__Qué es un hook?__:
Un hook es una función que permite crear o acceder al estado y a los ciclos de vida de un componente.
Los hooks deben ser llamados al inicio de un componente.
Nunca puede ser utilizado dentro de un condicional, o fuera de un componente o hook.

__En qué momento usarías useRef, useMemo, useCallback?__:

_useRef_: Es un hook que permite hacer referencia a un valor que NO es necesario para renderizar.
A diferencia de un 'state', si el valor al que está haciendo referencia el useRef se actualiza, NO dispará un nuevo render.

_useMemo_: Es un hook que sirve para almacenar en caché un cálculo costoso. Esto nos permite NO tener que volver a calcular lo mismo en cada renderizado, y solo lo volvemos a calcular cuando cambie un valor.

const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

_useCallback_: Es un hook que permite almacenar en caché la DEFINICIÓN de una función en un componente. 
Esto hace que NO se vuelva a crear la función en cada renderizado.

const cachedFn = useCallback(fn, dependencies)

_React.memo_: Esto hace que un componente NO se vuelva a renderizar si sus props no cambiaron.



__Qué es el Virtual DOM?__:
El DOM es una representación gráfica del documento HTML de nuestra APP.
El DOM posee una estructura de diagrama de árbol.
Al cambiar algún nodo de este DOM, todos sus nodos hijos serán renderizados nuevamente, hayan sido o no modificados.
Hacer cambios en el DOM es un proceso muy costoso para el navegador.
Acá es cuando entra en juego el Virtual DOM. El Virtual DOM es una representación del DOM en memoria, y lo que hace es actuar de intermediario entre nosotros y el navegador.
Hace esto para evitar que el DOM haga cambios muy grandes, y que solo cambie lo que realmente se tiene que volver a renderizar, de esta forma la app es mucho más rápida.
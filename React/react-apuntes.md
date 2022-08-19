## Petición AJAX:

const getUsers = () => {

    return ( new Promise( (resolve, reject) => {

        const url = `https://urlapi.com`;    

        // "creo" la petición.
        const xhr = new XMLHttpRequest();

        // abro la petición.
        xhr.open( 'GET', url, true ); // método, url, esAsíncrono?

        // on load.
        xhr.onload = () => {
            ( xhr.status === 200 ) 
                ? resolve( console.log(JSON.parse(xhr.responseText)) )
                : reject( Error(xhr.statusText) );
        };

        // opcional.
        xhr.onerror = ( error ) => reject( error );

        // ejecuto la petición.
        xhr.send();
        
        
    } ) );
    
}

getUsers()
    .then( 
        users => console.log( users ),
        error => console.log( error )
    );




## VIDEO 40 HABLA DE EXTENSIONES DE REACT PARA VSC.
- vscode-styled-components ( Para que te ayude con el autocompletado de CSS ).

## ATAJOS DE SNIPPETS DE REACT:

imr: import React from 'react';
sfc: crea el const Name = () => { return(); } export default Name;

## LAS IMÁGENES DE UN PROYECTO VAN DENTRO DE src/img/


## MANEJAR STATE GLOBAL:
Cuando un state va a pasar por más de un componente, siempre es recomendable poner ese state en el <App />
Ejemplo:

En "App.js":

const App = () => {

    const [ presupuesto, setPresupuesto ] = useState(0);

    const handleInput = e => {

        if( !Number( e.target.value.trim() ) ) {
            console.log( 'No es un número.' );
        } else {
            console.log( 'Es un número.' );
        }
        
    }

    return (
        <h1>Mi App</h1>
    );
    
}

export default App;


## FORMATEAR UN NÚMERO A DINERO:

const cantidad = 6000;

cantidad.toLocaleString( "en-US", {
    style: "currency",
    currency: "USD"
} ); // "$6,000.00" NO modifica a const cantidad.


## TRABAJAR CON FECHAS:

const gasto.fecha = Date.now(); // retorna números. Son milisegundos. 



## Retornar una fecha "20 de noviembre de 2021":
Ejemplo:

const fecha = new Date(); 
// "Sat Nov 20 2021 16:44:00 GTM-0600". Recibe también milisegundos. Por lo que puedo hacer new Date( gasto.fecha )// y retornará en formato de fecha, esos milisegundos.

const opciones = {
    year: "numeric",
    month: "long",
    day: "2-digit"
};

fecha.toLocaleDateString( "es-ES", opciones ); // "20 de noviembre de 2021".


## Styled Components:
- Para usar Styled Components, debemos ejecutar en la consola "npm install @emotion/react @emotion/styled"

- Una de las ventajas del styled component es que cuando se deja de usar al componente que tiene Styled Component, pues el css de ese componente se elimina. En cambio si los estilos de este componente eliminado están en una hoja de estilos global, pues el css de este componente se seguirá cargando innecesariamente.

Sintáxis:

const Title = style.h1`
    font-size: 50px;
    color: black;
    text-transform: uppercase;
`;

<Title>Hola Soy un título</Title> 
// A final de cuentas, se reemplaza <Title> por <h1>, ya que fue lo que escribimos en const Title.


Ejemplo de un componente con Styled Component:

import { useState } from 'react';
import styled from '@emotion/styled';
import ImagenCripto from './img/imagen-criptos.jpg';

const Heading = styled.h3` // Tiene sintáxis de componentes. La primer letra en mayúscula.
    font-family: "roboto";
    color: #fff;
    font-size: 30px;

    &::after {
        // Acá dentro puedo escribir código SASS.
    }
`;

const Image = styled.img`
    max-width: 100%;
    object-fit: cover;
    
    @media( min-width: 769px ) {
        max-width: 80%;
        border: 2px solid red;
    }
`;

const App = () => {

    return(
        <div>
            <Heading>Titulo de la App</Heading>
            <Image alt="imagen" src={ ImagenCripto } />
        </div>
    );

};

export default App;



## Custom hooks:
Los custom hooks sirven para re-utilizar una función.

También se puede crear la re-utilización de una función con un helper, pero la diferencia es que con un custom hook se pueden incorporar otros hooks como el useState, y de esta forma se puede por ejemplo, mantener el valor de una función, de forma persistente.

Por lo general, los hooks suelen ir dentro de src/hooks/ y la sintáxis de un archivo hook suele ser "useMiCustomHook.js". SIEMPRE empiezan con la palabra use, por convención.

Un custom hook va a retornar un ARRAY, o un OBJETO. Puede ser cualquiera de los dos.

La sintáxis de un hook es la MISMA que la de un componente. Ejemplo:

En "useSelectMonedas.js":

import React, { useState } from 'react';


const useSelectMonedas = () => {

    const [ state, setState ] = useState('');
    
    const selectMonedas = ( label, opciones ) => (
        <>
            <label>{ label }</label>

            <select>
                <option value=""> --Seleccione-- </option>

                {
                    opciones.map( opcion => (
                        <option
                            key={ opcion.id }
                            value={ opcion.id }
                        >
                            { opcion.text }
                        </option>
                    ));
                }
                
            </select>
        </>
    );
    
    return [ selectMonedas ];
    
};

export default useSelectMonedas;



Ahora en "Formulario.js", que utilizará el custom hook:

import useSelectMonedas from '../hooks/useSelectMonedas';

const Formulario = () => {

    const monedas = [
        { id: "USD", text: "Dólar Estadounidense" },
        { id: "ARS", text: "Peso argentino" },
        { id: "EUR", text: "Euro" },
    ];

    const [ SelectMonedas ] = useSelectMonedas( 'elegí tu moneda', monedas );

    return(
        <form>
            <SelectMonedas />
            <button type="submit">Cotizar</button>
        </form>
    );
    
}

export default Formulario;



## LIBRERÍA DE SPINNERS: "spinkit".


## Instalar Tailwind CSS en un proyecto de React:
Ejecutamos en la consola "npm install autoprefixer postcss tailwindcss".
Una vez que se instala, ejecutamos "npx tailwindcss init -p".

En el archivo que se creó "tailwind.config.js", dentro de module.exports = {} como primer key de esa llave, escribimos ( sin las comillas ): "purge: [ "index.html", "./src/**/*.js" ]".

Con esto estamos diciendo que el ARCHIVO principal es el index.html, y también estamos avisando que va a haber algunos componentes.

Ahora en el archivo "index.css", escribimos lo siguiente:
@tailwind base;
@tailwind components;
@tailwind utilities;

VIDEO 154.


## React Router Dom V6:
Para instalar React Router Dom, en la consola ejecutamos "npm i react-router-dom".

Ejemplo de uso:

En "App.js":

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import ClientsList from './components/ClientsList/ClientsList';
import Footer from './components/Footer/Footer';

const App = () => {

    return(

        <Navbar />
        
        <BrowserRouter>
            <Routes>

                // Ruta principal. Puede tener dentro, un grupo de rutas.
                // Cuando visite la página principal, esta ruta cargará el componente HomePage.
                <Route path="/" element={ <HomePage /> } >
                    <Route /> // Ruta hija. Es una ruta anidada.
                </Route>

                <Route path="/clients" element={ <ClientsList /> } > // Ruta principal.
                    <Route index element={ <UnComponente /> } /> // Ruta hija.
                    <Route path="new" element={ <NewClient /> } /> Esto crea la ruta "/clients/new"
                    <Route path="edit/:id" element={ <EditClient /> } /> Esto crea la ruta "/clients/edit/id"
                    <Route path=":id" element={ <ClientDetails /> } />
                </Route>

                <Route> // Ruta principal.
                    <Route /> // Ruta hija.
                </Route>

            </Routes>
        </BrowserRouter>

        <Footer />
        
    );

};

export default App;

Para que <UnComponente /> sea ruta hija y se visualize en /clients ( es decir en el componente <ClientsList /> ),
en <ClientsList /> hay que agregar <Outlet />, que representará la PARTE en donde se va a visualizar 
<UnComponente /> dentro de <ClientsList />.
IMPORTANTE: El componente <UnComponente /> se visualiza dentro de <Outlet />, porque en 
"<Route index element={ <UnComponente /> } />" este componente no tiene ninguna ruta o path asociada/o.

Entonces, "ClientsList.js" quedaría así:

import { Outlet, Link, NavLink } from 'react-router-dom';

const ClientsList = () => {

    return(

        <div>
            <h1>Desde ClientsList</h1>

            <div className="main-app">

                <div className="sidebar-container">
                    <!-- SIDEBAR -->
                    <Link to="/clients" >Clientes</Link>
                    <NavLink to="/clients/new" activeClassName="active" >Nuevo Cliente</NavLink>
                </div>

                <div className="router-outlet-container">
                    <Outlet />
                </div>
                
            </div>

        </div>
        
    );
    
}

export default ClientsList;


## Validación de formularios con Yup.

Yup es una librería que nos permite validar nuestros formularios de manera sencilla. Esta librería se acopla muy bien con Formik, por lo que podemos usar ambas para crear un robusto formulario.
Para saber bien las sintáxis de las validaciones de Yup, debemos dirigirnos a su documentación, que está bien completa y es sencilla de leer.

Ejemplo de uso de Yup. En "Formulario.js":

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
 
const Formulario = () => {

    const navigate = useNavigate();

    const initialValues = {
        name: '',
        email: '',
        phone: '',
        message: ''
    };

    const handleSubmit = async ( values: newClient ) => {

        // Esta función solo se ejecutará cuando el form haya pasado TODAS las validaciones de Yup, caso contrario NUNCA se ejecutará esta función.

        try {

            const url = 'http://localhost:4000/clientes'; // url de Json Server.

            const options = {
                method: 'POST',
                body: JSON.stringify( newClient ),
                headers: { 'Content-Type': 'application/json' }
            };
            
            const response = await fetch( url, options );
            const result = await response.json();
            console.log( result ); // Mostrará el newClient pero el de la base de datos de JSON SERVER.

        } catch( error ) {
            console.log( error );
        }

    };

    const schema = Yup.object().shape({
        name: Yup.string()
                 .min( 3, 'El nombre es muy corto' )
                 .max( 50, 'El nombre es muy largo' )
                 .required( 'El nombre es obligatorio' ),

        email: Yup.string()
                  .email( 'Correo inválido' )
                  .required( 'El correo es obligatorio' ),

        phone: Yup.number()
                  .positive( 'El número de teléfono debe ser un número entero positivo' )
                  .integer( 'Solo se admiten números enteros' )
                  .typeError( 'El número no es válido' ), // Si no pongo typeError, muestra un error raro.

        message: Yup.string()
    });

    return(
        <Formik
            initialValues={ initialValues }

            handleSubmit={ async ( values, { resetForm } ) => {
                await handleSubmit( values );
                resetForm();
                navigate( '/clientes' ); // Luego de crear un nuevo cliente, se redirecciona a /clientes.
            } }

            validationSchema={ schema }
        >
            { ({ errors, touched }) => (

                <Form>

                    <div>
                        <label htmlFor="myInput">Nombre</label>
                        <Field type="text" id="myInput" placeholder="Juan" name="name" />

                        {
                            ( errors.name && touched.name ) && <span>{ errors.name }</span>
                        }
                    </div>

                    <button type="submit">Enviar</button>
                    
                </Form>
                
            ) }
        </Formik>
    );
    
}

export default Formulario;



## Hook useParams: 
Sirve para TOMAR los valores que pasan por parámetro en la URL. Ejemplo:

import { useParams } from 'react-router-dom';

const clientDetails = () => {

    const params = useParams();

    console.log( params ); // { id: '1431griqoj4' }

    return(
        <p> clientDetails component </p>
    );
    

    
}

export default clientDetails;


## Cargar otros initialValues en Formik:

const Formulario = ({ client }) => {

    return (

    <Formik

        initialValues={{
            name: client?.name ?? "", // si no viene client.name, va a ser "". Si client?.name es undefined, agrega "".
            surname: client?.surname ?? "",
            phone: client?.phone ?? ""
        }}

        enableReinitialize={ true }

    >
        .....
    </Formik>
        
    );
    
}

Formulario.defaultProps = {
    client: {} // si client no trae nada, por defecto será un objeto vacío.
};

// las defaultProps sirven para asignar un valor por defecto a las props, cuando estas vienen sin valor. Funcionan igual que los parámetros por defectos en una función.

export default Formulario;


## VIDEO 185 explica cómo hacer el deploy de mi APP que utiliza JSON SERVER.

## Variables de entorno para desarrollo y para producción:
FIJARME CÓMO ES CON "create react app", porque en el video explica pero con Vite.



## Qué es NEXT JS?
Es una Framework de React que sirve para crear sitios y aplicaciones web. La principal ventaja de Next es que crea aplicaciones y sitios de gran perfomance, amigables al SEO y es fácil de configurar.

En JS puro, el código SIEMPRE corre del lado del cliente ( en el navegador ). En NEXT JS en cambio, el código corre tanto del lado del cliente, como del lado del servidor. 

Next JS soporta Server Side Rendering (SSR) y Static Site Generation (SSG).

Next JS incluye su propio routing, no vamos a usar React Router Dom.
También cuenta con funciones para OBTENER datos de una api, como getServerSideProps y getStaticProps

Para trabajar con el CSS, Next JS utiliza CSS MODULES.

## Creando un proyecto en NEXT JS ( Hay que tener instalado NodeJS ):

1- En el CMD, ejecutamos 'npx create-next-app@latest'. Cuando nos aparezca la pregunta, apretamos 'y'. Le ponemos un nombre al proyecto.

2- Ejecutamos los 2 comandos que muestra el CMD. En este caso 'cd nombreDelProyecto' y luego 'npm run dev'.
Abrimos el localhost que nos muestra el CMD ( 3000 por lo general ).


## La estructura de NEXT JS:

Dentro de la carpeta 'styles/' se depositan todos los archivos .css. 
En el archivo 'globals.css' irán los estilos globales de la APP.

Dentro de 'pages/' tenemos una carpeta llamada 'api/'. Esta carpeta sirve para probar algunas apis, pero podemos borrar la carpeta tranquilamente, si no la vamos a utilizar.

Dentro de la carpeta 'public/' van los archivos estáticos, como el 'favicon.ico', imágenes, carpeta 'img'.

Dentro de el archivo 'pages/index.js' hay un componente <Head></Head>, que es nativo de Next.
Este componente, funciona exactamente igual que la etiqueta <head></head> de HTML5.


## Routing en NEXT JS:

Para crear una nueva página con routing en Next JS, es tan simple como crear un nuevo archivo .js, en la carpeta 'pages/'. Al crear un archivo, next automáticamente crea el routing de este archivo.
Por convensión, los nombres de los archivos que están dentro de 'pages/' suelen escribirse en minúsculas. Por ejemplo, 'nosotros.js'. Pero el nombre de la constante del componente, SI es escribe en camel case. ( Nosotros ).

Ejemplo de cómo tiene que ser el archivo 'nosotros.js':

import Link from 'next/link';

const Nosotros = () => {

    return(
        <div>
            <h1>Desde nosotros</h1>

            <Link href="/"> Ir al inicio </Link> // Para que la página no recarge, se hace de esta forma.
        </div>
    );
    
}

export default Nosotros;

-----

Al haber creado este archivo, si nos dirigimos en el navegador a /nosotros veremos el h1 que tiene el componente Nosotros.


## Creando un archivo de layout principal

Al mismo nivel de 'pages/' y 'node_modules/' creamos una nueva carpeta llamada 'components/'. 
Dentro de esta nueva carpeta, creamos un archivo llamado 'Layout.js'.

En 'Layout.js':

import Head from 'next/head';

const Layout = ({ children, vistaActual }) => {

    return(
        <div>
            <Head>
                <title> GUITARRA APP - { vistaActual } </title>
            </Head>

            <header> NAVBAR </header>
            <section> { children } </section>
            <footer> FOOTER </footer>
        </div>
    );

}

export default Layout;



En 'pages/index.js':

import Layout from '../components/Layout';

const Home = () => {

    return(
        <Layout vistaActual="inicio">
            <h1> Desde la Home </h1>
        </Layout>
    );
    
}

export default Home;


En 'pages/nosotros.js':

import Layout from '../components/Layout';

const Nosotros = () => {

    return(
        <Layout vistaActual="nosotros">
            <h1> Desde nosotros </h1>
        </Layout>
    );
    
}

export default Nosotros;

----

Con esta estructura básica, tendremos un componente que siempre mostrará el header, un contenido dinámico y el footer.


COMPONENTES COMO EL HEADER, EL FOOTER Y DEMÁS, SE CREAN DENTRO DE LA CARPETA 'components/' que hemos creado.



## MÓDULOS DE CSS:

en 'styles/' debemos crear un archivo .css con la sintáxis 'Header.module.css'. Al tener ese .module, React le hace ciertas mejoras al archivo, como minificación, etc.

Ahora el componente 'Header.js' usará este archivo 'Header.module.css' de la siguiente manera:

import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {

    return(
        <header className={ styles.my-header }>
            <p className={ styles.my-parrafo }>SOY EL HEADER.</p> 
            // Si no existe .my-parrafo en .module.css, no pasa nada.
        </header>
    );

};

export default Header;


------

el archivo 'Header.module.css' tendrá algo así:

header {
    background-color: green;
    // Esto no funcionará, porque por "ley" para que los selectores en los módulos de CSS funcionen, deben ser selectores de ID o de CLASE.
}

.my-header {
    background-color: red;
}

.my-header p {
    color: #FFF; 
    // Este si va a funcionar, porque su padre es una clase.
}



## El componente Image de Next:
Este componente fue desarrollado por los ingenieros de Next, Vercel y Google.
Optimiza MUY bien las imágenes.

Ejemplo de uso, en 'Header.js':

import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Header.module.css';

const Header = () => {

    return(
        <header>

            <div>
                <Link href="/">
                    <Image src="/imagenes/logo.jpg" width={400} height={200} alt="logo" />

                    // Si la imagen que vamos a cargar está en el repo de nuestro proyecto, esa imagen SI O SÍ debe estar dentro de la carpeta 'public/' ya que cuando el código se compila, Next entiende que es ahí donde están las imágenes. Por eso es que en el src de este imagen, la url comienza con '/', porque es como si dijese 'public/imagenes/logo.jpg'. SIEMPRE va a leer lo que esté dentro de public/ .
                    En caso de que la imagen venga de internet, simplemente escribimos la url completa y listo.
                    Para que este componente funcione bien, es obligatorio asignarle un width y un height con esa sintáxis de JS. Los números son medidas en PX.
                </Link>
            </div>

            <nav>
                <Link href="/">Inicio</Link>
                <Link href="/nosotros">Nosotros</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/tienda">Tienda</Link>
            </nav>

        </header>
    );

};

export default Header;


## SI QUIERO USAR VARIABLES GLOBALES DE CSS, EN EL ARCHIVO 'globals.css' TENGO QUE CREAR EL :root {} Y DENTRO CREAR TODAS LAS VARIABLES QUE DESEO. CON ESO YA PUEDO ACCEDER DESDE CUALQUIER ARCHIVO .module.css;

## 198 A 202 HABLA SOBRE STRAPI Y CLOUDINARY. MIRARLOS CUANDO ESTÉ HACIENDO UN PROYECTO.


## Consultar API's en NEXT JS:

Para obtener datos de una API, Next JS ofrece 2 funciones:

getStaticProps: Utilizaremos esta función si la información no cambia. Por ejemplo, una página informativa, documentación, anuncios, etc.

getServerSideProps: Utilizaremos esta función si la información cambia constantemente.


Ejemplo de ambos, en 'blog.js ( Es un archivo dentro de pages/ por eso la minúscula )':

import Layout from '../components/layout';

const Blog = ({ data }) => { // pongo data porque es lo que puse que retorna el props de getServerSideProps();

    console.log( data ); // Este console.log() si se verá en la consola del navegador.

    return(
        <Layout pagina="Blog">
            <h1> Desde Blog </h1>
        </Layout>
    );
    
}

export async function getStaticProps() {

    // Cuando se ejecuta el comando 'npm run build', esta función se encarga de crear un ARCHIVO HTML ESTÁTICO con toda la info que retorna la API, y en vez de consultar a la API cada vez que la página se recarga, pues lee la información de este archivo y listo. Es por este motivo que esta función solo debemos usarla cuando sabemos que la info no va a cambiar.

    const url = 'link.com';
    const resp = await fetch( url );
    const data = await resp.json();

    return {
        props: { data: data } // puedo hacer { data } directamente.
    };

}

export async function getServerSideProps() {

    // Esta función getServerSideProps está corriendo en el SERVIDOR ( utilizando el server side rendering ), por este motivo, el console.log() de abajo, lo vamos a ver en LA CONSOLA donde hicimos el npm start, y NO en la consola del navegador ( Porque eso sería del lado del cliente ).

    // Los props que retorna esta función, se pueden utilizar en el component Blog de arriba, gracias al export que tiene esta función getServerSideProps.

    // Esta función hace una nueva petición, cada vez que la página se recarga ( como funcionan todas las requests normalmente ).

    const url = 'link.com';
    const resp = await fetch( url );
    const data = await resp.json();

    console.log( data );

    return {
        props: { data: data } // puedo hacer { data } directamente.
    };

}

export default Blog;


## SE PUEDE CREAR UNA CARPETA 'helpers/' AL MISMO NIVEL QUE 'components/' Y 'pages/'.

## Cargar imágenes de servidores externos en NEXT JS:

Supongamos que tenemos algo así:

const url = 'https://res.cloudinary.com/muchasletras.jpg';
<Image layout="responsive" width={ 800 } height={ 400 } src={ url } />

Si dejamos así sin hacer nada, esto dará un error. Next intenta proteger tu proyecto, y para esto te dice que debés registrar el dominio al que pertenece la imagen que deseas mostrar. 
Por este motivo, debemos hacer la siguiente configuración en el archivo 'next.config.js':

module.exports = {
    reactStrictMode: true,
    images: {
        domains: [ 'res.cloudinary.com' ] // Arreglo de dominios. Para saber cuál es el dominio de la imagen, podemos ver el error que nos muestra en el navegador, ya que ahí nos muestra el dominio entre ''.
    }
}

Una vez hecho esto, BAJAMOS LA TERMINAL, LA VOLVEMOS A LEVANTAR y listo.


## HEIGHT FIJO ULTRA MODERNO CON CSS:

.parrafo {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4; // LÍNEAS A MOSTRAR DEL PÁRRAFO.
    overflow: hidden;
}

Mostrará algo como:

fqijipfqejfpeq
fjqeifoeqjfeqio
fjqeiofjqeoifeq
jfiqpefjeqpifqe... // Agrega los 3 puntos automáticamente.


## Si pongo un <Image /> dentro de un <Link></Link>, la consola mostrará un error. Esto para porque el componente <Link></Link> convierte lo que esté dentro suyo, en un enlace. Y como a una imagen no se puede convertir en un enlace, da un error. Esto no ocurre acá por ejemplo <Link>Blog</Link> porque ese texto si se puede transformar en un enlace. Para solucionar esto, simplemente hay que meter a la <Image /> dentro de una etiqueta <a></a> y listo.


## Routing dinámico en NEXT JS:
Routing dinámico es cuando tenemos por ejemplo /blog/1 , /blog/2 , /blog/3 .

Nosotros habíamos creado dentro de 'pages/', un ARCHIVO llamado 'blog.js'. Pero como este archivo page va a tener routing dinámico, ya no nos sirve para tal fin. Para mostrar algo en la vista /blog/1 , tenemos que crear dentro de 'pages/' una CARPETA con el MISMO nombre que blog. Quedaría así 'pages/blog/'.
Ahora dentro de la nueva carpeta 'blog/', debemos crear un archivo con el siguiente nombre: '[id].js'.
El texto dentro de las [] puede ser cualquiera, por ejemplo [searchText], [term], [productId], etc.

TODO lo que escriba dentro de este nuevo archivo '[id].js' será lo que va a mostrar la vista /blog/1 .

Ejemplo del contenido de '[id].js':

import { useRouter } from 'next/router';

const BlogDetails = () => {

    const router = useRouter();

    console.log( router.query ); // { id: '2' } // es id por el nombre del archivo [id].js;

    return(
        <div>
            <h1> Este es el blog { router.query.id } </h1>
        </div>
    );
    
}

export default BlogDetails;


## Leer el ID de la página actual:

Una vez que tenemos el ID, la idea es consultar en una base de datos según ese ID. Para estas consultas, habíamos mencionado que Next nos ofrece dos formas. Para acceder a este ID desde una de de estas funciones, se hace de la siguiente manera:

En '[id].js':

const BlogDetails = ({ data }) => {

    console.log( data ); // Me a retornar la info del blog correspondiente, para dibujarlo en el HMTL.

    return(
        <div>
            <h1> Este es el blog dinámico </h1>
        </div>
    );
    
}

export async function getServerSideProps({ query: { id } }) {
    // como prop de esta función, viene el query. Lo de arriba es lo mismo que hacer props.query.id.

    const url = 'url.com/${ id }';
    const req = await fetch( url );
    const data = await req.json();

    return(
        props: { data }
    );

}

export default BlogDetails;

## getStaticProps con Routing Dinámico:
Cuando tenemos routing dinámico y queremos usar getStaticProps para obtener información de una API, es algo diferente.
Vamos a ver el mismo ejemplo que vimos arriba, pero usando getStaticProps.
Cuando usamos getStaticProps y tenemos routing dinámico, necesitamos usar además, la función getStaticPaths

En '[id].js':

const BlogDetails = ({ data }) => {

    console.log( data ); // Me a retornar la info del blog correspondiente, para dibujarlo en el HMTL.

    return(
        <div>
            <h1> Este es el blog dinámico </h1>
        </div>
    );
    
}

export async function getStaticPaths() {

    const url = 'http://localhost:4200/blogs'; // identifica TODAS las entradas de blogs/
    const req = await fetch( url );
    const resp = await req.json();
    const paths = resp.map( data => ({ params: { id: String( data.id ) } }) );

    return {
        paths,
        fallback: false
        // fallback: true 
        // permite retornar una serie de rutas que deben generarse estáticamente. Esto es conveniente cuando tenemos MILLONES de entradas
        // fallback: false // Se una cuando tenemos pocas entradas.
    };

    // paths retorna un array de objetos, donde CADA objeto corresponde a un valor de ruta dinámica, como blogs/1, blogs/2, etc. Retorna algo como:

    [
        { params: { id: 1 } },
        { params: { id: 2 } },
        { params: { id: 3 } },
        { params: { id: 4 } }
    ]
    
}

export async function getStaticProps({ params: { id } }) {

    const url = 'url.com/${ id }';
    const req = await fetch( url );
    const data = await req.json();

    return(
        props: { data }
    );

}



export default BlogDetails;


## Cómo maneja NEXT JS las variables de entorno:
Existen dos tipos de variales de entorno, en TODOS los proyecots, variables de entorno LOCAL y variables de entorno DE PRODUCCIÓN. 
NEXT JS usa UN solo archivo para meter allí tanto las variables de entorno local, como las variables de entorno de producción.
Además, existen otras 2 tipos de variables de entorno en NEXT, aquellas que funcionan en el SERVIDOR, y aquellas que funcionan en el CLIENTE.

SIEMPRE QUE AGREGAMOS O MODIFICAMOS VARIABLES DE ENTORNO, HAY QUE DAR DE BAJA EL SERVIDOR Y LUEGO VOLVER A LEVANTARLO.

Para poder declarar variables de entorno, debemos crear un archivo llamado '.env.local', en la raíz del proyecto, al mismo nivel que 'components/' o 'pages/'.

Una vez que creamos este archivo, dentro de '.env.local', podemos escribir lo siguiente:

API_URL=http://localhost:4200 // VARIABLE DISPONIBLE PARA ENTORNO LOCAL O DE DESARROLLO. PERO PARA FUNCIONES DEL SERVIDOR, COMO getStaticPaths(). Si intento usar esta variable en algún componente de NEXT ( es decir intento consumirla del lado del cliente o navegador ), no me va a funcionar.

NEXT_PUBLIC_API_URL=http://localhost:4200 // Esta variable al tener esa sintáxis de 'NEXT_PUBLIC_', SI puedo usarla dentro de un componente de NEXT, va a funcionar normal.






// USO DE VARIABLE PARA SERVIDOR.

export async function getStaticPaths() {

    const url = '${ process.env.API_URL }/blogs';
    // Así es como se invoca a la variable de entorno, en algún componente o función. Con 'process.env' accedo al archivo '.env.local'. NO hace falta importar nada.
    const req = await fetch( url );
    const resp = await req.json();
    const paths = resp.map( data => ({ params: { id: String( data.id ) } }) );

    return {
        paths,
        fallback: false
    };
    
}


// USOR DE VARIABLE PARA EL CLIENTE O NAVEGADOR.

const Blog = () => {

    const url = `${ process.env.NEXT_PUBLIC_API_URL }/blogs`;
    console.log( url ); // 'http://localhost:4200/blogs';
    
}

export default Blog;




### TRUCO DE CSS PARA QUE RESPETE LOS SALTOS DE LÍNEAS COMO ENVÍA EL CLIENTE: .texto { white-space: pre-wrap; }


## CREANDO UNA PÁGINA 404:
Para crear esta página como nosotros queramos, debemos crear un archivo llamado '404.js' dentro de 'pages/'.
Las constantes no se pueden llamar como números, por lo que debemos crear algo tipo 'const PageNotFound = () => {}'.

Listo, este es el único requisito. Dentro de este componente, podemos poner lo que nosotros queramos. Ejemplo:

Dentro de '404.js':

const PageNotFound = () => {

    return(
        <h1> PÁGINA NO ENCONTRADA. </h1>
    );
    
}

export default PageNotFound;


## Crear url's amigables al SEO: VER VIDEO 216. DEPENDE UN POCO DEL BACK.


## IMPORTANTE: Las funciones getServerSideProps y getStaticProps, SOLAMENTE se pueden usar en archivos dentro de 'pages/', es decir en páginas y urls dinámicas. NO pueden ser usadas en componentes.


## Múltiples consultas en NEXT JS:
Cuando tenemos que hacer más de una consulta en una misma page, podemos hacer lo siguiente:

export async function getServerSideProps() {

    const url1 = `${ process.env.API_URL1 }`;
    const url2 = `${ process.env.API_URL2 }`;

    const [ respUrl1, respUrl2 ] = await Promise.all([ fetch( url1 ), fetch( url2 ) ]);  
    // Hace las 2 consultas al mismo tiempo, es vez de hacer una y luego la otra.

    const [ dataResp1, dataResp2 ] = await Promise.all( respUrl1.json(), respUrl2.json() );

    return {
        props: { dataResp1, dataResp2 }
    };
    
}


## CSS a un bloque en específico:
Si queremos agregar una imagen que viene por api, pero como background-image, pues desde un archivo .module.css no puedo, ya que no puedo acceder a variables de JS desde un .css. Para ese caso, debemos hacer lo siguiente:

En un archivo 'Curso.js':

import Styles from '../styles/Curso.module.css';

const Curso = ({ curso }) => {

    const { imagen } = curso;

    return(
        <section>
        
            <div className="contenedor">
                <p> Hola soy un párrafo </p>
            </div>
        
        </section>

        <style jsx>{`

            section {
                background-color: red;
                background-image: url( ${ imagen } );
            }

            @media( min-width: 980px ) {
                background-color: blue;
            }

            // Este código solo vive en este componente. NO va a impactar en ningún otro lado.

        `}</style>
    );
    
}

export default Curso;


## Styled Components con Emotion:
Sirve para escribir styled components, pero es lo más moderno.
Para instalarlo, nos dirigimos al sitio oficial de Emotion ( emotion.sh/docs/introduction ), buscamos la sección de "styled", copiamos el código y lo ejecutamos en la consola. Es el código 'npm i @emotion/styled @emotion/core'.
Una vez que termine de instalar, ya podemos usar los Styled Components.

IMPORTANTE: PARA QUE NOS AYUDE ALGÚN AUTOCOMPLETADO CON EL CÓDIGO DE Styled Components, podemos instalar en VSC las extensiones 'vscode-styled-components', 'styled-components-snippets' y 'styled-snippets'.

Ejemplo, en 'Header.js':

import React from 'react';
import styled from '@emotion/styled'; // Esto me habilita usar Styled Components.

const HeaderStyle = styled.header` // .header es la ETIQUETA de html que va a crear esta constante.
    background-color: red;
    padding: 20px;
`;

const TitleStyle = styled.h1`
    font-size: 20px;
    color: #FFF;

    &:hover { // SE PUEDE ESCRIBIR CÓDIGO DE SASS.
        color: red;
    }
    
`;

const Header = ({ titulo }) => {

    return(
        <HeaderStyle> 
        // En el inspector, retorna un <header>, por styled.header
            <TitleStyle> Hola soy el header </TitleStyle>
            // En el inspector, retorna un <h1>. por styled.h1
        </HeaderStyle>
    );
    
}

export default Header;


## IMPORANTE: A TODAS LAS PROPS, SIEMPRE ES BUENA PRÁCTICA PONERLE SUS propTypes.


## CONTEXT:
Con Context API, podemos pasar STATES o FUNCIONES, desde el componente principal hacia cualquier hijo, sin necesidad de hacer puente entre componentes.
También se puede actualizar el STATE desde cualquier hijo ( o ejecutar una función que lo actualice ).

Context hace un poco más complicado la reutilización de componentes.


## Creando un Context:
Al usar Context, de ahora en más los datos fluyen DESDE este context.
Para crear uno o más context, debemos crear una carpeta dentro de 'src/' ( Es decir al mismo nivel que 'components/' ) que se llame 'context/'. Dentro de esta, vamos a escribir todos los context que queramos.

Para este ejemplo, vamos a crear un archivo llamado 'CategoriasContext.js', y tiene lo siguiente:

import React, { createContext, useState } from 'react';

export const CategoriasContext = createContext();

const CategoriasProvider = ( props ) => {

    const [ state, setState ] = useState( 'HOLA CÓMO ESTÁS?' );

    return( 
        <CategoriasContext.Provider
            value={{ state, setState }}
            // Todo lo que ponga en este value, es lo que va a estar disponible para TODOS los componentes.
        >
            { props.children }
        </CategoriasContext.Provider>
    );
    
}

export default CategoriasProvider;


Una vez que cree mi context, ahora el archivo principal ( 'App.js' ), va a consumir ese context de la siguiente forma:

import React from 'react';
import CategoriasProvider from './context/CategoriasContext';

const App = () => {

    return(
        <CategoriasProvider>

            <OtroContextProvider> // Si tengo otro o otros context, lo uso así.

                <Navbar /> // Se importa. Este y sus hijos ya pueden acceder al context.

                <MainContent /> // Se importa. Este y sus hijos ya pueden acceder al context.

                <Footer /> // Se importa. Este y sus hijos ya pueden acceder al context.

            </OtroContextProvider>
            
        </CategoriasProvider>
    );

}

export default App;


Ahora si por ejemplo, un componente llamado 'Formulario' necesita acceder a la información de este context, pues lo puede hacer de la siguiente manera:

En 'Formulario.js':

import React, { useContext } from 'react';
import { CategoriasContext } from '../context/CategoriasContext';

const Formulario = () => {

    const { state, setState } = useContext( CategoriasContext ); 
    // puedo desestructurar TODO lo que retorne el value de <CategoriasContext.Provider>

    console.log( state );

    return(
        <form>
            // Acá va mi form.
        </form>
    );
    
}


## Proyecto MERN completo:

setState({
    ...state,
    [e.target.name]: e.target.value
});


## EN EL VIDEO 354 HABLA SOBRE LOS TYPES, REDUCER Y ESO.

Normalmente, cuando una APP se torna un poco compleja, se suele crear una carpeta 'types/' dentro de 'src/', al mismo nivel que 'components/', y dentro de esta carpeta, un archivo 'types.js'.
Dentro de este archivo, se suele describir qué acciones se pueden/deben realizar.

Por ejemplo, en 'types.js':

export const SHOW_FORMULARIO_PROYECTO = 'SHOW_FORMULARIO_PROYECTO';

// Así es como se suele hacer normalmente. Siempre en mayúsculas, máximo dos o 3 palabras separadas con un '_'
Ahora, quién va a usar esta constante? Lo van a usar los dispatch de los useReducer(), para DESCRIBIR cuál es la acción que va a realizar ese dispatch. Se puede ver el ejemplo más abajo, en el archivo 'proyectoState.js'.
 


-----------



Si tenemos varios context, una buena práctica es separar en CARPETAS, todos los context de la siguiente manera por ejemplo.

En 'context/proyectos/' vamos a tener 3 archivos, 'proyectoContext.js', 'proyectoReducer.js', 'proyectoState.js'.


En 'proyectoContext.js': // Solamente CREA el context.

import { createContext } from 'react';

const proyectoContext = useContext();

export default proyectoContext;


En 'proyectoReducer.js':

import { SHOW_FORMULARIO_PROYECTO, GET_PROYECTS } from '../../types/types.js';

export default ( state, action ) => {

    switch( action.type ) {

        case SHOW_FORMULARIO_PROYECTO: 
            return {
                ...state, // este state sale de ProyectoState.
                showFormNewProyect: true
            }

        case GET_PROYECTS:
            return {
                ...state,
                proyectos: action.payload
            }

        default: 
            return state;

    }
    
}


En 'proyectoState.js':

import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { SHOW_FORMULARIO_PROYECTO, GET_PROYECTS } from '../../types/types.js';

const ProyectoState = props => {

    const initialState = {
        showFormNewProyect: false // Cuando se pasa a true, se abre un modal para agregar un nuevo proyecto 
    }

    // dispatch para ejecutar las acciones del reducer.
    const [ state, dispatch ] = useReducer( proyectoReducer, initialState );
    // el useReducer te retorna un state, y en el dispatch retorna las acciones que puede ejecutar el useReducer.

    // Serie de funciones para el CRUD.
    const showModalFn = () => {
        dispatch({ type: SHOW_FORMULARIO_PROYECTO });
    }
    // Esta función lo que hará a final de cuentas, será ejecutar el dispatch, y como el type es SHOW_FORMULARIO_PROYECTO, pues hará lo que esté descrito para SHOW_FORMULARIO_PROYECTO, en el reducer 'proyectoReduder'.


    // SIEMPRE LO QUE TOME MI FUNCIÓN COMO PARÁMETRO, SERÁ EL payload.
    const obtenerProyectos = proyectos => {

        dispatch({
            type: GET_PROYECTS,
            payload: proyectos
        });
        
    }


    return(
        <proyectoContext.Provider
            value={{
                showFormNewProyect: showFormNewProyect,
                showModalFn: showModalFn,
                obtenerProyectos: obtenerProyectos
            }}
        >
            { props.children }
        </proyectoContext.Provider>
    );
    
    
}

export default ProyectoState;


En 'App.js':

import React from 'react';
import ProyectoState from './context/proyectos/proyectoState';

const App = () => {

    return(
        <ProyectoState>
        
            <Router>
            
                <Header />

                <Main /> // Acá adentro está el <Switch></Switch>

                <Footer />
            
            </Router>
        
        </ProyectoState>
    );
    
}

export default App;


Ahora en algún componente que necesite usar el context:

En 'Sidebar.js':

import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Sidebar = () => {

    const proyectoContext = useContext( proyectoContext );

    const { showFormNewProyect, showModalFn } = proyectoContext; // puedo acceder a showFormNewProyect porque lo puse en el value de <proyectoContext.Provider>

    handleButtonClick = () => {
        showModalFn();
    }

    return(
        <aside>
            HOLA SOY EL SIDEBAR.
        </aside>
    );
    
}

export default Sidebar;



## Nota: En los videos que hace, PRIMERO agrega un nuevo elemento al STATE, y luego VUELVE a traer el nuevo STATE, no es que se hace automáticamente.


## Creando el BACKEND de la APP:
Cuando vamos a crear una app entera ( Es decir vamos a construir el Front y el Back ), en la raíz del proyecto se suelen crear 2 carpetas. 'client/' y 'server/'. Esto es para SEPARAR el front y el back. Dentro de 'client/' estará todo el código de React ( Simplemente hay que meter todas las carpetas en esta nueva carpeta ) y dentro 'server/' estará TODO el código del back.
Para el back, vamos a utilizar NodeJS, MongoDB y Express. ( Stack MERN ).

Una vez que creamos la carpeta 'server/', con el CMD nos posicionamos en esta, y ejecutamos 'npm init'. Esto nos creará un archivo 'package.json'. ANTES de que este archivo se cree, la consola nos hace algunas preguntas como 'package name', versión ( Damos enter nada más ), una descripción, entry points ( Damos enter nada más ), test command ( Damos enter nada más ), git repository ( Damos enter nada más ), keywords ( Damos enter nada más ), author y license ( Damos enter nada más ). Luego escribimos 'yes' cuando nos pide y listo.
Esto nos va a crear el package.json.

Luego, ejecutamos 'npm install -D nodemon'. Con -D hacemos que esta dependencia exista solamente en desarrollo 
( devDependencies en package.json ). Nodemon es un "LiveServer" del back. Cada cambio que haya en el servidor, lo veremos automáticamente.

Luego ejecutamos 'npm install express mongoose dotenv'. Express es el servidor que vamos a usar. Mongoose es el ORM de Mongo para que se vea un poco más amigable el entorno. Dotenv nos permite crear un archivo para declarar variables de entorno.


## Instalando dependencias y script de NPM:
Lo primero que debemos hacer es dentro de 'server/' crear un archivo 'index.js'.
Luego, dentro de 'package.json' hay una sección "scripts". Dentro de esta sección, debemos escribir lo siguiente:

"scripts": {
    // Por defecto viene "test": "adasfeqpf". Lo podemos borrar a esa línea.
    "start": "node .",
    "dev": "nodemon ."
}

La línea "start": "node ." sirve para cuando vamos a hacer el deploy de la APP. con el "." estamos diciendo que LEA el archivo 'server/index.js'. Debe llamarse así, porque sino el . no va a servir.

La línea "dev": "nodemon ." sirve para ver en desarrollo, los cambios en vivo que hagamos en 'index.js'

Para ver los cambios de index.js, abrimos el CMD en 'server/' y ejecutamos 'npm run dev'. Cuando demos enter, veremos lo que hayamos escrito en index.js, por ejemplo console.log( 'Hola.' );


## Creando el servidor de Express:
Lo primero que debemos hacer es dentro de 'server/' crear un archivo 'variables.env'. Dentro de este archivo vamos a escribir las variables de entorno.

En 'variables.env':


En 'index.js':

const express = require( 'express' ); // Importamos Express

// Crear el servidor.
const app = express();

// Puerto de la app.
const PORT = process.env.PORT || 4000;
// Es importante poner en máyuscula PORT, ya que Heroku lo identifica así. Estamos diciendo que si en 'variables.env' existe la variable o constante PORT, que tome ese valor o sino que tome como valor 4000. Puede ser cualquier número, excepto el 3000 porque pueden chocar los servidores de front y back.

// Arrancar la app o servidor.
app.listen( PORT, () => {
    console.log( 'El servidor está funcionando.' );
} );

Nuevamente, para ver los cambios de index.js, abrimos el CMD en 'server/' y ejecutamos 'npm run dev'. Cuando demos enter, veremos lo que hayamos escrito en index.js.


## Configurando MongoDB con MongoDB Atlas:
Ver video 381 Y 382.

Quedé en video 389.




## useReducer() explicación de Fernando Herrera:
- Un reducer es simplemente una FUNCIÓN.
- Un reducer SIEMPRE debe retornar un NUEVO ESTADO.
- Normalmente, recibe 2 argumentos, el initialState y la acción a ejecutar.
- Un reducer NO debe tener efectos secundarios.
- Un reducer NO puede tener tareas asíncronas.
- Un reducer NO puede llamar al localStorage o sessionStorage. Si bien son tareas síncronas, rompe la regla de que NO debe tener efectos secundarios. ¿Por qué no un useReducer no puede tener efectos secundarios? Porque esas tareas o efectos secundarios, pueden fallar. Si fallan, NO vamos a regresar un nuevo state, sino que vamos a regresar un error. Si re regresa un error, muy probablemente mi APP se rompa completamente.

¿Cuál es el sentido del useReducer? La idea es tener en UN SOLO LUGAR, TODAS LAS ACCIONES que modifican a mi STATE.

El useReducer y el useState son hermanos. Ambos se pueden usar para lo mismo, pero en distintas medidas. Si nuestra APP es bien sencilla, tranquilamente podemos usar useState. Pero si nuestra APP es bastante robusta y tiene varios o bastantes acciones que modifican mi state, entonces será una buena idea usar useReducer.


Ejemplo de un userReducer:

const initialState = [
    {
        id: 1,
        tarea: 'Comprar pan',
        done: false
    }
];

const tareasReducer = ( state = initialState, action ) => {

    switch( action?.type ) {

        case 'ADD':
            return [ ...state, action.payload ];

        case 'DELETE':
            return state.filter( tarea => tarea.id !== action.payload ); // .filter() retorna un NUEVO arreglo.
            // el payload es el id. Ej 'feqijgeqgjieqp23'

        case 'DONE':
            return state.map( tarea => 
                ( tarea.id === action.paylaod ) ? { ...tarea, done: !tarea.done } : tarea
            )

        default:
            return state;
    }
    
}

let tareas = tareasReducer(); // La primera vez que se carga el componente, el state toma el initialState.

const nuevaTarea = {
    id: afneqo431,
    tarea: 'Aprender React',
    done: false
};

const action = {
    type: 'ADD',
    payload: nuevaTarea // en el payload, se pone aquello que vamos a mandar al state 
};

tareas = todoReducer( tareas, action );



## Ejemplo de uso real del useReducer(), con localStorage incluido:

En 'App.js';

import React, { useReducer } from 'react';
import todoReducer from './reducer/todoReducer';

const initialState = [
    {
        id: tip1tj4,
        name: 'Aprender Java',
        done: false
    }
];

const init = () => {

    return JSON.parse( localStorage.getItem( 'todos' ) ) || []; // Si retorna null, retorna [].
    
}

export const todoApp = () => {

    // const [ tareas, dispatch ] = useReducer( todoReducer, initialState ); // Así se hace normalmente.

    const [ tareas, dispatch ] = useReducer( todoReducer, [], init );
    // Mi initialState es [] porque en realidad, lo que realmente va a ser mi initialState, será lo que RETORNE la función init 

    const handleSubmit = e => {

        e.preventDefault();

        const nuevaTarea = {
            id: gjqpigjrqip,
            name: 'mi nueva tarea',
            done: false
        };

        const action = {
            type: 'ADD',
            payload: nuevaTarea
        };

        dispatch( action );
        // El dispatch es la función que me permite interactuar con el reducer 'todoReducer'.
        // Este dispatch incluso puedo enviarlo a los hijos.
        
    }

    useEffect( () => {

        localStorage.setItem( 'todos', JSON.stringify( todos ) );
        
    }, [ tareas ] ); // INCLUYE EL ESTADO INICIAL, PORQUE EL useEffect SE EJECUTA AL MENOS UNA VEZ, ES DECIR CUANDO SE CREA EL COMPONENTE.

    return(
        <>
        
            <form onSubmit={ handleSubmit } >
                ...
            </form>

            {
                tareas.map( tarea => (<li key={ tarea.id }> { tarea.name } </li>) );
                // cada vez que cambie el reducer, esto se actualiza solo.
            }
            
        </>
    );
    
}

export default todoApp;


## Estructura de carpetas:

src/
    components/
        login/
            loginPage.js
        home/
            homePage.js
        list/
            list.js

    routers/
        AppRouter.js // router PRINCIPAL de la aplicación.
        HeroesRouter.js

    App.js
    index.js




En 'AppRouter.js':

import { Routes, Route, BrowserRouter } from 'react-router-dom';

export const AppRouter = () => {

    return(
        <BrowserRouter>

            <Navbar />

            <Routes>
                <Route path="/"       element={ <HomePage /> } />
                <Route path="/marvel" element={ <MarvelPage /> } />
                <Route path="/dc"     element={ <DcPage /> } />
                <Route path="/search" element={ <SearchPage| /> } />
            </Routes>

            <Footer />
            
        </BrowserRouter>
    );
    
};

En 'Navbar.js':
En la nueva versión de React Router Dom ( v6 ) ya NO se usa más activeClassName. 
Tampoco se usa el exact.
Ahora se hace de la siguiente manera:

<NavLink
    className={ ({ isActive }) => 'nav-item nav-link' + ( isActive ? 'active' : '' ) }
    to="/" // to="/marvel"
>
    Inicio
</NavLink>



## En la carpeta 'selectors/' suelen ir aquellos archivos que justamente SELECCIONAN cierta información de cierto lugar. Por lo general, los nombres de los archivos de esta carpeta suelen iniciar con 'get'. Ejemplo, 'getHeroById.js', 'getHeroes.js', 'getHeroByPublisher.js'.

## Sacar al usuario cuando escribe algo mal en la url:

import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

export const HeroPage = () => {

    const { heroId } = useParams();
    const navigate = useNavigate();

    const handleReturn = () => { // Es invocada en un onClick de un botón 'regresar'.
        navigate( -1 ); // Con esto literalmente volvemos a la página anterior, sin importar cuál era.
    }

    const hero = useMemo( () => getHeroById( heroId ), [ heroId ] );
    // Esta función solo se va a ejecutar cuando el heroId cambie. De otro modo se dispararía cada vez que cambie el state de este componente.

    if( !hero ) {
        return <Navigate to="/" />
    }

    return(
        <p>Hola soy el HeroPage</p>
    );
    
}


## types/types.js:

export const types = {
    login: '[auth] Login',
    logout: '[auth] Logout'
};


## Estructura básica de proyectos:

src/
	components/
		User/
			Form/
				Form.jsx
				Form.scss
			List/
				List.jsx
				List.scss
		Auth/
			Auth.js
			Auth.scss
		UI/
			Spinner/
				Spinner.jsx
				Spinner.scss
	pages/
		HomePage/
			HomePage.jsx
			HomePage.scss
		UserPage/
			Form.jsx
			List.jsx
	contexts/
		userContext.jsx
		authContext.jsx
	assets/
		images/
		icons/
		fonts/
	routes/
		root.jsx
		protectedRoute.jsx
	services/
		reducers/
			userReducer.jsx
			authReducer.jsx
		constants/
			dashboardConstants.jsx
		data/
			data.jsx
		utils/
			dateFormat.jsx
		helpers/
			index.js
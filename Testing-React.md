# TESTING EN REACT:

Qué hay que testear?

1- Funcionalidades "complejas".
2- Casos extremos de funcionalidades.
3- Cosas que sean fáciles de romper.
4- Componentes básicos de React:
    - Interraciones del usuario.
    - Render condicional.
    - Utils / Hooks.

Usualmente, se suele definir la "RUTA CRÍTICA" de la aplicación y eso es lo que se suele testear. La ruta crítica es la ruta inicial de la app, por la que el usuario va a estar interactuando el mayor tiempo y que puede provocar fallas.

Otra cosa importante, es que se suele empezar el testing por los componentes que MENOS dependencias tienen de otros componentes.


## Tipos de testing:

- Unit Testing.
- Integration Testing.
- End to end Testing.


## Buenas descripciones que se ponen en el método test(''):

Por lo general, empiezan con "should ..." o "on initial render, the pay button is disabled".


## Diferencia entre "React Testing Library" y "Jest":

Jest es un "Test runner", que es lo que nos permite correr o ejecutar nuestras pruebas y "React Testing Library" es una "colección" de utilidades que nos permite testear una app de React. Ambas son COMPLEMENTARIAS, no se pueden enfrentar o comparar.


## Pasos para hacer test a nuestra App de React:

- Instalamos "React Testing Library".
- Ejecutar también "npm install --save-dev @testing-library/jest-dom".
- Cuando termine, ya podemos comenzar a testear. Para crear los archivos de prueba, simplemente creamos un archivo hermano al componente que queremos testear, y la convensión es por ejemplo "Card.test.tsx". Sería, el nombre del componente .test.tsx.
- Cuando queremos correr nuestros tests, debemos ejecutar "npm run test".

Ejemplo de uso de un archivo "Note.test.js":

import '@testing-library/jest-dom/extend-except';
import { render } from '@testing-library/react';
import Note from './Note'; // Es el componente a testear.

// El método render nos permite RENDERIZAR un componente e inspeccionar qué es lo que está renderizando.

test( 'renders content', () => {

    const noteProps = {
        content: 'This is a test.'
    };

    const component = render( <Not note={noteProps} /> );
    component.getByText( 'This is a test.' );

    component.debug(); // TE MUESTRA EN LA CONSOLA LO QUE SE ESTÁ RENDERIZANDO EN ESE MOMENTO.
} );


// Los tests unitarios y de integración se pueden hacer en el mismo archivo "Note.test.js".

// EVITAR USAR "data-test-id".


## Coverage de los tests:

Si ejecutamos en la consola "npm test -- --coverage" nos mostrará una tabla indicando qué porcentaje de nuestro código tenemos cubierto con los tests.


## Configuraciones iniciales para testear con Vite:

Por defecto, Vite no viene con algún framework de pruebas.

- Instalamos "Jest" con npm viendo su documentación. Es algo como "npm install --save-dev jest".

- En el package.json, debemos agregar lo siguiente en en la propiedad "scripts":

"scripts": {
    ...
    ...
    "test": "jest --watchAll"
}

Esto es para poder ejecutar "npm run test".

- Ejecutamos "npm install --save-dev @types/jest". Esto nos sirve para que el VSC nos ayude a autocompletar lo que queremos escribir. 

- Estructura básica de una prueba:

En un archivo "DemoComponent.test.js":

describe( 'Pruebas en <DemoComponent />', () => {

    test( 'Prueba un mensaje', () => {

        const msg1 = 'Hola mundo     ';
        const msg2 = msg1.trim();
        
        except( msg1 ).toBe( msg2 ); // Va a fallar, porque NO son iguales. msg1 tiene espacios al final.
        
    } );
    
} );

-- El describe(); sirve para AGRUPAR pruebas que pertenecen al mismo "grupo". --
-- USUALMENTE, cada archivo solamente debe tener un describe(); y dentro si puede tener muchos test();

- Debemos instalar algunas cosas de Babel que necesita Jest. En su documentación, sección "Getting Started" lo explica. Ejecutamos esos comandos.

- Debemos instalar "React Testing Library". Para esto, nos vamos al sitio de Jest, en la sección "Framework guides" y "Testing React Apps". Instalamos el comando que nos muestra con npm. Algo como "npm install --save-dev @testing-library/react" 


## IMPORTANTE: Cuando ejecutamos "npm run test", el "Test Suite" de Jest EJECUTA el archivo que está testeando.

## Podemos elegir qué archivo queremos testear, aprentando W y luego P en la consola donde ejecutamos "npm run test" y luego escribimos una expresión regular o string para detectar ese archivo. Ahora el test solo estará mirando el archivo seleccionado y no TODOS.


## Métodos de JEST:

.toBe() : Compara VALORES, por ejemplo 1 === 1 retorna TRUE o pasa la prueba.

.toEqual() : Compara OBJETOS y ARRAYS. Si tienen mismas propiedades y valores, retorna TRUE o pasa la prueba.

.toBeFalsy() : Es true cuando el valor a evaluar es null o undefined o false, etc.


## Estructura de carpetas:

- Algunos crear un .test.tsx al lado del .tsx del componente que vamos a testear.

- Otra opción es crear una carpeta HERMANA a src/ llamada "test" o "__test__" y crear allí dentro la MISMA estrucutra de carpetas que en src/ pero solo de los tests. 


## INSTALACIÓN Y CONFIGURACIÓN DE Jest + React Testing Library en proyectos de React + Vite:

https://gist.github.com/Klerith/ca7e57fae3c9ab92ad08baadc6c26177


## Testear helpers, hooks u otras cosas que NO son componentes:

- La lógica es la misma que para componentes.

Por ejemplo, en "miProyecto/__tests__/helpers/getGifs.test.js":

import { getGifs } from '../../src/helpers/getGifs';

describe( 'Pruebas en getGifs()', () => {

    test( 'Debe retornar un arreglo de gifs', async() => {

        const gifs = await getGifs( 'One Punch' );

        except( gifs.length ).toBeGreaterThan( 0 ); // Espero que la respuesta sea mayor a 0.

        except( gifs[0] ).toEqual({
            id: except.any( String ),
            title: except.any( String )
            url: except.any( String )
        });
        
    } );
    
} );


## Hacer un mock completo de un Custom Hook para pruebas:

En "GifGrid.test.jsx": 

import { useFetchGifs } from '../../src/hooks/useFetchGifs';

// DEBEMOS PONER LA RUTA DEL "ELEMENTO" QUE QUEREMOS MOCKEAR. EN ESTE CASO ES EL useFetchGifs.
jest.mock( '../../src/hooks/useFetchGifs' );

// El hook funciona algo así:
const { images, isLoading } = useFetchGifs( category );

describe( 'Pruebas en <GifGrid />', () => {

    test( 'Debe mostrar el loading inicial', () => {

        // Lo establezco así porque es el loading inicial lo que quiero tester.
        useFetchGifs.mockReturnValue({ // Este objeto es lo que RETORNA el useFetchGifs(); 
            images: [],
            isLoading: true // Si lo pongo el false, la prueba NO pasa porque no aparecería el texto de "Cargando...".
        });
        
        render( <GifGrid category={ 'One Punch' } /> );
        expect( screen.getByText('Cargando...') );
        
    } );

    test( 'Debe mostrar los resultados obtenidos luego de ejecutar el hook useFetchGifs', () => {

        const gifs = [
            {
                id: 'ABC',
                title: 'Saitama',
                url: 'ur.com/jqeifpeqj'
            },
            {
                id: 'ABC2',
                title: 'Fernando',
                url: 'ur.com/jqeifpeqjFQEFEQ'
            },
        ];

        // Ahora simulamos que el custom hook terminó la petición y retorna lo que deba retornar.
        useFetchGifs.mockReturnValue({
            images: gifs,
            isLoading: false
        });

        render( <GifGrid category={ 'One Punch' } /> );
        expect( screen.getAllByRole('img').length ).toBe( 2 );
        
    } );
    
} );


## Pruebas sobre Custom Hooks:

Cuando testeamos un hook, lo que se suele evaluar son los ARGUMENTOS de entrada ( parámetros ) y lo que retorna ese hook.

import { renderHook, waitFor } from '@testing-library/react';
import { useFetchGifs } from '../../src/hooks/useFetchGifs';

// Este hook retorna algo como:
const { images, isLoading } = useFetchGifs( category );

describe( 'Pruebas en el hook useFetchGifs', () => {

    test( 'Debe de regresar el estado inicial del hook', () => {
    
        // renderHook() retorna un obj con result, dismount y rerender.
        const { result } = renderHook( () => useFetchGifs('One Punch') );

        const { images, isLoading } = result.current;

        // En el estado inicial, no tendré imágenes y el loading será true.
        expect( images.length ).toBe( 0 ); 
        expect( isLoading ).toBeTruthy();
        
    } );

    test( 'Debe retornar el estado final del hook, que sería un [] de imágenes y isLoading en false', async () => {

        const { result } = renderHook( () => useFetchgifs('One Punch') );

        // ESPERA a que se cumpla la condición dentro del waitFor().
        await waitFor(
            () => expect( result.current.images.length ).toBeGreaterThan( 0 ),
            {
                timeout: 3000 
                // Como segundo argumento podemos enviarle este obj con un timeout por si el await demora mucho, lanzamos un error. Por defecto es 1 segundo.
            }
        );

        const { images, isLoading } = result.current;

        expect( images.length ).toBeGreaterThan( 0 );
        expect( isLoading ).toBeFalsy();
        
    } );
    
} );


## Importante: Nosotro NO vamos a testear hooks nativos de React como useState, useEffect, useContext, etc. Siempre vamos a testear componentes, funciones helpers o hooks.


## Ejecutar funciones del customHook dentro de las pruebas:

import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../../src/hooks/useCounter';

describe( 'test en custom hook useCounter', () => {

    test( 'debe incrementar el contador', () => {

        const { result } = renderHook( () => useCounter(100) );
        const { counter, increment } = result.current;

        act( () => {

            // Esta función act() se utliza para ejecutar dentro funciones que modificar el estado de un hook.

            increment(); 
            // Por dentro, tiene algo así: 
            // const increment (value = 1) => setCounter( counter + 1 ); // counter y setCounter salen de un useState;
            
        } );

        expect( result.current.counter ).toBe(101); // No puedo usar counter porque eso NO se actualiza cuando cambia el state del useCounter.
        
    } );
    
} );


## Pruebas sobre un reducer:

import { todoReducer } from '../../src/reducers/todoReducer';

describe( 'Pruebas en el todoReducer', () => {

    const initialState = [
        {
            id: 1,
            description: 'Hacer la tarea de inglés',
            done: false
        }
    ];

    test( 'Debe regresar el estado inicial', () => {

        const newState = todoReducer( initialState, {} );
        expect( newState ).toBe( initialState );

        // Los objetos y arrays en JS son pasados por REFERENCIA. Como al todoReducer le pasamos una acción que no es válida o no existe, este reducer retornará el caso "default" y siempre retorna el state. Entonces es por esto que en este caso podemos usar toBe() y dará true, porque ambos estados "initialState" y "newState" son en realidad lo mismo.
        
    } );

    test( 'Debe de agregar una nueva tarea.', () => {

        const action = {
            type: 'ADD_TODO',
            payload: {
                id: 2,
                description: 'Nuevo todo',
                done: false
            }
        };

        const newState = todoReducer( initialState, action );

        expect( newState.length ).toBe( 2 );
        expect( newState ).toContain( action.payload );
        
    } );
    
} );


## Pruebas a un useContext:

import { render, screen } from '@testing-library/react';
import { UserContext } from '../../src/contexts/UserContext';
import { HomePage } from '../../src/pages/Home';

describe( 'Pruebas en HomePage y su useContext', () => {

    test( 'Debe mostrar el componente sin el usuario', () => {

        // El <HomePage /> CONSUME el UserContext. La única forma de que el context funcione en mis pruebas, es hacerlo de la siguiente manera:        
        render(
            <UserContext.Provider value={ user: null }>
                <HomePage />
            </UserContext.Provider>
        );

        const preTag = screen.getByLabelText( 'pre' );
        expect( preTag.innerHTML ).toBe( 'null' );
        
    } );

    test( 'Debe mostrar el componente CON el usuario', () => {

        const user = {
            name: 'Agusthxz',
            id: 'ASB321'
        }
              
        render(
            <UserContext.Provider value={{ user }}>
                <HomePage />
            </UserContext.Provider>
        );

        const preTag = screen.getByLabelText( 'pre' );
        expect( preTag.innerHTML ).toContain( `${ user.name }` );
        expect( preTag.innerHTML ).toContain( `${ user.id }` );
        
    } );
    
} );


## Pruebas de funciones del context:

import { render, screen, fireEvent } from '@testing-library/react';
import { UserContext } from '../../src/contexts/UserContext';
import { LoginPage } from '../../src/pages/Login';

describe( 'test en hook UserContext', () => {

    test( 'debe de llamar al setUser cuando se hace click en el botón', () => {

        const setUserMock = jest.fn();

        render(
            <UserContext.Provider value={{ user: null, setUser: setUserMock }}>
                <LoginPage />
            </UserContext.Provider>
        );

        const button = screen.getByRole( 'button' ); // Porque solo hay un botón.
        fireEvent.click( button ); // Cuando se ejecuta el onClick del botón, hace un setUser({
            email: 'sad@asd.com',
            id: '123',
            name: 'Juan'
        });

        expect( setUserMock ).toHaveBeenCalledWith({
            email: 'sad@asd.com',
            id: '123',
            name: 'Juan'
        });
        
    } );
    
} );


## Pruebas en "MainApp.jsx":

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MainApp } from '../../src/components/MainApp';

desribe( 'Pruebas en <MainApp />', () => {

    test( 'debe mostrar el <HomePage />', () => {

        render(
            <MemoryRouter>
                <MainApp />
            </MemoryRouter>

            // <MemoryRouter /> debemos usarlo porque <MainApp /> es hijo directo o indirecto de un <BrowserRouter />. Si no uso esto, va a fallar la prueba.
        );

        expect( screen.getByText('HomePage') ).toBeTruthy();
        
    } );
    
    test( 'debe mostrar el <LoginPage />', () => {

        render(
            <MemoryRouter initialEntries={ ['/login'] }> // Con esto simulo que me muevo a <LoginPage /> y puedo testear esa vista.
                <MainApp />
            </MemoryRouter>
        );

        expect( screen.getByText('LoginPage') ).toBeTruthy();
        
    } );
    
} );


## Fixtures:

- Dentro de __tests__ ( como hijo directo ) se suele crear una carpeta 'fixtures/' para poner allí dentro TODOS los mocks de nuestras pruebas.

- Dentro de esta carpeta 'fixtures/' van a ir archivos .js de acuerdo a lo que queremos mockear. Ejemplo:

En '__tests__/fixtures/authFixtures.js':

export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
};

export const demoUser = {
    uid: 'ABC123',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://foto.jpg'
}

Y luego en '__Tests__/auth/pages/LoginPage.test.jsx':

import { notAuthenticatedState } from '../../fixtures/authFixtures'; // Lo uso donde lo necesite


## React Testing Library de Developero:

El tiene en su estructura de carpetas, dentro de src/ un archivo 'setupTests.js' y dentro tiene solamente esto:
import '@testing-library/jest-dom'; Esto le habilita el '.toBeInTheDocument()'.
Este archivo Jest lo ejecuta al INICIO de las pruebas.

### screen.debug(); // Muestra lo que se está renderizando hasta el momento.
### screen.getByText( /free dictionary/i ); // recibe una RegEx o un string.

Tipos de queries:

screen.find... // Lo usamos para elementos que son ASÍNCRONOS. Tenemos findBy... findAllBy... , etc.
screen.get... // Lo usamos para elementos SÍNCRONOS. Tenemos getBy... getAllBy... , etc.
screen.query.. // Lo usamos para elementos que pueden estar o no en el DOM.

¿Cómo hay que hacer el testing? Hay que pensar en qué es lo que haría el usuario en mi app, y en base a eso hacer las distintas pruebas.

Si mis pruebas necesitan consultar alguna API, es una mala práctica desde las pruebas consultar directamente a la API. Debemos crear un Mock para esto. Mis pruebas deben ser independientes.

## Ejemplo completo con tips:

import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'Axios';
import App from './App';

// Este mock REEMPLAZA la implementación real de axios, por un objeto fake que la gente de Jest definió.
jest.mock( 'axios' )

console.log( axios ); // Si veo esto en la consola, serán cosas de Jest. Pero si comento el jest.mock( 'axios' ), veré lo que realmente trae el objeto axios.

describe( 'Testing on App component', () => {

    // Antes de que se ejecute cada test(); va a ejecutarse lo que esté dentro del beforeEach().
    beforeEach( () => {
        render( <App /> );
        axios.get.mockClear(); // Para limpiar mis mock en CADA prueba y asegurarme que cada mock funcione bien.
    } );

    test( 'should renders the form elements', () => {

        const inputEl = screen.getByLabelText( /name/i );
        const btnEl = screen.getByRole( 'button', { name: /enviar/i } );

        expect( inputEl ).toBeInTheDocument();
        expect( btnEl ).toBeInTheDocument();
        
    } );

    test( 'should search a word', async () => {

        // Acá hago el mock de lo que retornaría la api cuando se consulta desde el componente.
        // En el componente se hace algo como setWordMeaning( response.data[0].meanings[0].definitions[0].definition );
        axios.get.mockReturnValueOnce({ 
            data: [{
                meanings: [{
                    definitions: [{
                        definition: 'Construcción cubierta destinada a ser habitada'
                    }]
                }]
            }]
        });

        const inputEl = screen.getByLabelText(/name/i); // Obtengo el input type text.
        const btnEl = screen.getByRole( 'button', { name: /enviar/i } ); // Obtengo el botón submit.

        fireEvent.change( inputEl, {target: {value: 'casa'}} ); // Simulo que escribí casa en el input.
        fireEvent.click( btnEl ); // Simulo click en el botón submit.

        // Si comento este await, se vería el texto "loading".
        const wordMeaningEl = await screen.findByText( /Construcción cubierta destinada a ser habitada/i );
        // .findByText es para buscar elementos asíncronos. Retorna una promesa, por eso va el await.
        // El .findByText lo que hace es buscar repetidas veces un elemento que tenga el texto que le dijimos.
        // Lo intenta por 5 segundos. Si no lo encuentra, da un error.

        expect( wordMeaningEl ).toBeInTheDocument();
        
    } );

    test( 'should not exist loading message when the search has been finished', async () => {

        const expectedDefinition = 'Construcción cubierta destinada a ser habitada';

        // Esto se repite arriba, lo puedo meter en una función que retorne esto.
        axios.get.mockReturnValueOnce({ 
            data: [{
                meanings: [{
                    definitions: [{
                        definition: 'Construcción cubierta destinada a ser habitada'
                    }]
                }]
            }]
        });
        
        // Esto se repite arriba, lo puedo meter en una función que retorne esto.
        const inputEl = screen.getByLabelText(/name/i);
        const btnEl = screen.getByRole( 'button', { name: /enviar/i } );

        fireEvent.change( inputEl, {target: {value: 'casa'}} );
        fireEvent.click( btnEl );

        const loadingEl = screen.getByText( /loading/i );

        expect( loadingEl ).toBeInTheDocument(); // Antes de la petición SI estará el loading.

        await screen.findByText( expectedDefinition );

        // Por lo general usamos .query para "buscar" elementos que NO existen en el screen actualmente.
        const loadingElExcepted = screen.queryByText( /loading/i );

        excepted( loadingElExcepted ).not.toBeInTheDocument();
        
    } );
    
} );
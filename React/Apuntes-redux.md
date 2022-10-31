# Apuntes de Redux:

En react existe:
    - Redux ( Es el patrón en sí, común en muchos lenguajes o frameworks ).
    - React-Redux ( Una librería de Redux para React ).
    - Redux-Toolkit ( La mejor librería de Redux para React, ahorra mucho trabajo. Hoy en día se usa esta ).

La idea de trabajar con Redux NO es meter TODO en Redux, solo las acciones y/o estados que realmente se comparten en toda la aplicación.
Para acciones o estados que son común en una sola page, podemos user useContext + useReducer.

## Instalación:

1. Nos dirigimos al sitio oficial de "Redux Toolkit", pestaña "Quick Start".
2. Ejecutamos el comando que muestra, "npm install @reduxjs/toolkit react-redux". Listo, eso es todo.


## Uso:

A UN "state" en Redux Toolkit se lo conoce como un "slice", es decir un "trozo" o "pedazo" de mi store.
Redux Toolkit nos permite crear "MUTACIONES" del state, y el se encargará por detrás de crear las "inmutaciones" de ese
state. Eso significa que podemos usar counter++ o array.push, etc. Pero si lo evitamos mejor.

Esto es subjetivo, pero tenemos dos opciones para organizar la estructura de carpetas de Redux en nuestra app.

1-  src/
        redux/
            states/ // Carpeta donde declaro todos los states que va a manejar mi store de Redux.
                employees.jsx // Un "state" o "slice" de mi store.
                user.jsx // Un "state" o "slice" de mi store.
            store.jsx // Acá declaro el configureStore de Redux.

2-  src/
        store/
            slices/
                user/
                    userSlice.jsx
                employees/
                    employeesSlice.jsx
                jobs/
                    jobsSlice.jsx
                counter/
                    counterSlice.jsx
            store.jsx


// TODO lo de acá abajo, lo explican muy bien en la documentación.


## Creando el store:
El 'store.jsx' tiene lo siguiente:

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {},

});


## Usando el Provider:
En 'index.jsx' o 'App.jsx':

import { store } from './store/store';
import { Provider } from 'react-redux';

// En el return.
<Provider store={ store }>
    <App />
</Provider>


## Creando un slice para nuestro store.
En 'counterSlice.jsx':

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    counter = 0
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: { // Acá declaro todos mis acciones. Funciona igual que el useReducer.
        increment: ( state ) => {
            state.counter += 1;
        },
        decrement: ( state ) => {
            state.counter -= 1;
        },
        incrementByAmount: ( state, action ) => {
            state.counter += action.payload
        }
    }
});

// Tengo que EXPORTAR las acciones de este slice.
export const { increment, decrement, incrementByAmount } = counterSlice.actions;


## Declarando un reducer o slice a nuestro store.
En 'store.jsx':

import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './slices/counter'; // Tiene un index.js para hacer "barrel".

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
        employees: employeesSlice.reducer // No está importado. Lo que defina acá, es lo que después puedo tomar con el useSelector()
    },
});



## Usar valores del store y disparar acciones:

En algún componente que necesite leer o disparar acciones del store:

import { useSelector, useDispatch } from 'react-redux';
import { increment } from './store/slices/counter/counterSlice';

export const App = () => {

    // Usamos el custom hook useSelector() para SELECCIONAR a un slice del store.
    // const employees = useSelector( store => store.employees );
    const { counter } = useSelector( store => store.counter );


    const dispatch = useDispatch(); // Esta acción o dispatch ya está memorizado.



    return(
        <button
            onClick={ () => dispatch( increment() ) } // Como increment viene de un slide, ya sabe Redux a qué slide modificar. No hay que pasar otra cosa como anteriormente.
        >
            Aumentar
        </button>
    );
    
}



## Thunks:

Los thunks son una acción asíncrona ( peticiones HTTP para traer información, hacer POST, PATCH, PUT, DELETE, GET, etc. ) que disparará otra acción cuando la petición haya finalizado correcta o incorrectamente.
Es relativo, pero por lo general, CADA slice puede tener su propio "thunks". Esto se puede crear en el mismo archivo "pokemonSlice.ts". Sin embargo, es mejor crear un archivo hermano de "pokemonSlice.ts", llamado "thunks.ts" ( cada slice tendrá el "thunks.ts" con el mismo nombre ) o "pokemonThunks.ts", y tendrá algo como lo siguiente:

En "thunks.ts":

import { startLoadingPokemons, setPokemons } from './pokemonSlice';

export const getPokemons = ( page = 10 ) => {

    // un Thunk retorna una función.
    return async ( dispatch, getState ) => {

        // Disparo el evento para el "loading".
        dispatch( startLoadingPokemons() ); // dispatch sale del argumento de la función.

        // Ejecuto la petición.
        const resp = await fetch( `url.com/${ page * 10 }` );
        const data = await resp.json();
        
        // Disparo la acción para setear los pokemones con la respuesta de la API.
        dispatch( setPokemons({
            pokemons: data.result,
            page: page + 1,
            isLoading: false
        }) );
        
    }
    
}


El 'pokemonSlice.ts' luce así:

import { createSlice } from '@reduxjs/toolkit';

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        page: 0,
        pokemons: [],
        isLoading: false
    },
    reducers: {
        startLoadingPokemons: ( state, action ) => {
            state.isLoading = true;
        },
        setPokemons: ( state, action ) => {
            state.isLoading = false;
            state.page = action.payload.page;
            state.pokemons = action.payload.pokemons;
        }
    }
});



## Axios:

Fernando Herrera recomienda usar Axios, porque tiene cosas bastante buenas. Entre otras cosas, nos EVITA tener que andar haciendo .json();
Para usarlo, lo instalamos.
Luego se crea una carpeta 'api/' y dentro un archivo llamado por ejemplo "pokemonApi.ts", aunque esto puede variar.
Dentro de este archivo contiene lo siguiente:

import axios from 'axios';

// axios.create nos permite crear un estandar para evitar repetir código en cosas común que se repiten en todas las peticiones como baseUrl, headers, tokens, etc.
export const pokemonApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
});

Además, la respuesta que retorna el axios viene info bastante interesante como el estado de la petición, etc.
Ahora el la función "getPokemons", simplemente queda así:

import { pokemonApi } from '../../../api/pokemonApi';

export const getPokemons = ( page = 10 ) => {

    return async ( dispatch, getState ) => {

        dispatch( startLoadingPokemons() );

        const { data } = await pokemonApi.get( `/pokemon?page=${ page * 10 }` );

        dispatch( setPokemons({
            pokemons: data.result,
            page: page + 1
        }) );
        
    }
    
}



## Mostrar pokemons leyendo el store:

import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from './store/slices/pokemon';

export const PokemonApi = () => {

    const dispatch = useDispatch();
    const { isLoading, pokemons, page } = useSelector( store => store.pokemons );

    useEffect( () => {
        dispatch( getPokemons() );        
    }, [] );

    return(
        <div>
            Mi App
        </div>
    );
    
}




## RKT Query:

Es una forma de trabajar nuestras peticiones con Redux. NO es un reemplazo de Axios o Fetch. RKT Query ( entre otras cosas ) evita hacer posteos o traer información duplicada si esa petición ya se encuentra almacenada en el caché. Nos ayuda mucho a menejar la data, el loading, etc.

Para trabajar con RKT Query, vamos a crear dentro de redux/ una carpeta apis/ . Luego un archivo llamada por ejemplo "todosApi.ts":

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todosApi = createApi({
    
    reducerPath: 'todos',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com'
    }),

    endpoints: (builder) => ({
        
        getTodos: builder.query({
            query: () => '/todos'
        }),

        getTodo: builder.query({
            query: (todoId) => `/todos/${ todoId }`
        })
        
    })
    
});

// El 'createApi' nos crea CUSTOM HOOKS de los endpoints que hayamos creado. Si creamos el endpoint 'getTodos', entonces nos creará un custom hook 'useGetTodosQuery'. En este caso, termina en Query porque es un GET. Si fuese un POST, PUT, PATCH, DELETE, etc, sería 'usetGetTodosMutation'.
// Entonces acá simplemente lo que hago es exportar ese custom hook para usarlo en los lugares que necesite.
export const { useGetTodosQuery, useGetTodoQuery } = todosApi;


## Consumir el API mediante el custom hook creado por el 'createApi':

Primero debemos configurar el store para decirle que tiene disponible el RKT Query que creamos. Entonces, en 'store.js':

import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './slices/counter';
import { pokemonSlice } from './slices/pokemon';
import { todosApi } from './apis/todosApi';

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        pokemons: pokemonSlice.reducer,
        [todosApi.reducerPath]: todosApi.reducer
    },
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware().concat( todosApi.middleware ); // No se importa el getDefaultMiddleware.
});

// Un middleware es simplemente una función que se ejecuta ANTES que otra.



Ahora en cualquier componente que consumirá algún endpoint que creamos:

import { useGetTodosQuery, useGetTodoQuery } from './store/apis/todosApi';

export const TodoApp = () => {

    const { data, isLoading } = useGetTodosQuery(); // Retorna mucha info como loading, etc.
    const { data: todo } = useGetTodoQuery( 20048 );

    return(
        <div>
            Hola soy la app.
        </div>
    );
    
};
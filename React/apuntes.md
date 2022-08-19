## TYPESCRIPT + REACT + VITE:

Podemos crear un interface que sirva para manejar todos los estados ( todos los setState ) de mi componente.
Por convensión, el nombre de esta interface suele ser NombreDelComponenteState
Ejemplo:

En App.tsx:

interface AppState {
    tasks: Task[] | null,
    loading: boolean,
    tasksNumbers: number
}

interface Props {
    prop1: string,
    prop2: number,
    prop3: number[]
}

export default const App = ( {prop1}: Props ) => { // o props: Props

    const [ tasks, setTasks ] = useState<AppState['tasks']>( null );
    const [ isLoading, setIsLoading ] = useState<AppState['loading']>( true );
    const [ numerosDeTasks, setNumerosDeTasks ] = useState<AppState['tasksNumbers']>( 0 );

    const divRef = useRef<HTMLDivElement>( null ); // Si no le doy null, TS da error.

    return(
        <div ref="divRef">
            <h1> Hola soy la App </h1>
        </div>
    );

}



Para organizar los tipados, es bueno separarlos en dos:
Por un lado, los tipados correspondientes a la LÓGICA DE NEGOCIO de la app.
Por otro lado, los tipados de los states, props, etc.

Para esto, como hijo de src/ podemos crear un archivo "types.d.ts" y poner allí adentro todos los tipos de la lógica de negocio. El .d es solo por convensión, y significa .defintions. Quiere decir que en ese archivo solamente va a haber definiciones de tipo, no puede haber funciones, contantes, etc.

Por otro lado, los states o props de cada componente, es bueno dejarlo en el mismo archivo del compoente, o si es bastante, poner los tipados en un archivo hermano al archivo del componente. Por ejemplo, "Form.d.ts".



## useReducer con TS:

type FormReducerAction = {
    type: "change_value",
    payload: {
        inputName: string,
        inputValue: string
    }
} | {
    type: "clear"
}

const formReducer = ( state: FormState["inputValues"], action: FormReducerAction ) => {

    switch( action.type ) {
        case "change_value":
            const { inputName, inputValue } = action.payload

            return {
                ...state,
                [inputName]: inputValue
            }
        case "clear":
            return INITIAL_STATE; // es una const

        default: 
            return state;
    }
    
}

const Form = () => {
    const [ inputValues, dispatch ] = useReducer( formReducer, INITIAL_STATE ); // No hay que agregarle <Algo>.
}





## Fetching de datos:

export default const App = () => {

    const [ subs, setSubs ] = useState<AppState["subs"]>([]);

    useEffect( () => {

        const fetchSubs = (): Promise<SubsResponseFromApi> => {
            return fetch( 'http://localhost:4000/subs' ).then( resp => resp.json() )
        }       
        
        fetchSubs()
            .then( subs => {
                console.log( subs );
                setSubs( subs );
            } )
        
    }, [] );

    return(
        <h1>Hola soy la App</h1>
    );
    
}

los tipes AppState["subs"] y SubsResponseFromApi deben coincidir, sino en el setSubs va a dar un error. Así se hace.








NOTA: Midu crea una carpeta services/ y dentro archivos como "getAllSubs.ts", y ahí hace los o el fetch necesario.
En los componentes no deberíamos hacer peticiones. No debemos ver fetch o axios en los componentes.


useEffect( () => {
    getAllSubs().then( setSubs );
}, [] );






GENERALES:

## context: React volverá a renderizar los componentes leyendo el contexto también.
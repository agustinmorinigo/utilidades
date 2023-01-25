## Gatsby Head API:
Esta API nos permite escribir metadatos que ponemos en el <head> ( como el <title>, etc ) en CADA página de Gastby. 
Esto es muy beneficioso para el SEO.
Para usarla simplemente hacemos lo siguiente:

const AboutPage = () => {
  return (
    <main>
      <h1>About Me</h1>
      <p>Hi there! I'm the proud creator of this site, which I built with Gatsby.</p>
    </main>
  )
};

export const Head = () => <title>About Me</title> // ESTO ES.

export const Head = () => ( // O esto es equivalente.
  <>
    <title>About Me</title>
    <meta name="description" content="Your description" />
  </>
)

export default AboutPage;



## <Link> component:
"The Gatsby Link component provides a performance feature called preloading. This means that the resources for the linked page are requested when the link scrolls into view or when the mouse hovers on it. That way, when the user actually clicks on the link, the new page can load super quickly."

Uso:

import { Link } from 'gatsby';

const IndexPage = () => {
  return (
    <main>
      <h1>Welcome to my Gatsby site!</h1>
      <Link to="/about">About</Link>
      <p>I'm making this by following the Gatsby Tutorial.</p>
    </main>
  );
};

export const Head = () => <title>Home Page</title>;

export default IndexPage;



## Style components with CSS Modules:
Gatsby is automatically configured to handle CSS Modules - no extra setup necessary!

Es igual que con React. Creamos un archivo .module.css, y luego en un archivo .jsx o .tsx hacemos:

import { title } from './my-component.module.css';

const MyComponent = () => {
  return (
    <h1 className={title}>
      Super Sweet Title Page
    </h1>
  )
}

export default MyComponent;


¡¡¡IMPORTANTEE!!! : Gatsby nos permite utilizar 'kebab-case' con clases de CSS ( por ej. '.nav-link' ) y este transforma automáticamente a 'camel-case' cuando importamos dicha clase en JS, por lo que la clase anterior quedaría 'navLink'. Ej.:

En .module.css:

.nav-link-item {
  padding-right: 2rem;
}

En .tsx:

import { navLinkItem } from './layout.module.css';



## Add a plugin to your site:

1. Install the plugin using npm.
    npm install plugin-name

2. Configure the plugin in your site’s gatsby-config.js file.
    Your gatsby-config.js file contains information about your site, including configuration for plugins. You can add a plugin to the plugins array: plugins: ["plugin-name"],
    Note: After you make updates to your gatsby-config.js file, you’ll need to restart your gatsby develop process for your changes to be picked up.

3. Use the plugin features in your site, as needed.

NOTA: Documentación sobre las librerías: https://www.gatsbyjs.com/plugins




## Plugin 'gatsby-plugin-image': 
Nos permite trabajar con imágenes de manera responsive y seguir manteniendo el alto rendimiento y el buen puntaje.
gatsby-plugin-image exports a component called StaticImage, which you can use to load images from a remote URL or your local filesystem.

Para usarlo, debemos Hacer lo siguiente:

1- Ejecutar 'npm install gatsby-plugin-image gatsby-plugin-sharp gatsby-source-filesystem'.

2- add the gatsby-plugin-image and gatsby-plugin-sharp plugins to your gatsby-config.js file. (Don’t worry about gatsby-source-filesystem just yet. You’ll come back to it later.)

plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp"
],

3- Now that your plugins have been installed and configured, you can use the StaticImage component in your Gatsby site! You can use the StaticImage component similarly to the way you’d use an HTML <img> tag.

The StaticImage component expects the following props:

src (string): The URL to the image you want to load.
alt (string): The alt text to describe the image. This gets used by screen readers or if there’s a problem loading the image.

Uso:

import { StaticImage } from 'gatsby-plugin-image';

const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <StaticImage
        alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
        src="https://pbs.twimg.com/media/E1oMV3QVgAIr1NT?format=jpg&name=large"
      />
    </Layout>
  )
};

export const Head = () => <title>Home Page</title>;
export default IndexPage;



### Update the static image to use a photo from your local filesystem: ####

1- Download a photo to your computer, and move it into your project folder. To keep things organized, put it in the src/images directory.

2- Update the src prop in your home page to be a relative path to your file instead of a URL. (Make sure it matches the name of your image!)

<StaticImage
    alt="Clifford, a reddish-brown pitbull, dozing in a bean bag chair"
    src="../images/clifford.jpg"
/>




## Query for Data with GraphQL:

    ######### Use GraphiQL to explore the data layer and write GraphQL queries: ############
    When you start the local development server for your site, Gatsby automatically creates a special endpoint that lets you use an in-browser tool called GraphiQL. With GraphiQL, you can explore your site’s data and build GraphQL queries.

    Follow the steps below to open the GraphiQL interface:

    1- Start up your local development server by running gatsby develop.
    2- In a web browser, go to http://localhost:8000/___graphql. (That’s three underscores in the URL.)

    Con GraphiQL podemos ver todas las consultas que podemos hacer en nuestro sitio, y cómo construirlas. De esa forma, luego solo copiamos y pegamos esa consulta en nuestro código y listo.


    ######### Tipos de Queries: ############
    En Gastby las queries se separan en dos tipos. Queries en "building-block components" y queries en "page components".
    - Las "building-block components" serían los componentes normales, como un contenedor de listados, etc.
    - Las "page components" serían los componentes que representan páginas enteras, como el <HomePage /> o <AboutPage />.


        ######### Queries in building-block components: #########

        1- Miramos en GraphiQL la query que queremos hacer y la copiamos, quedaría algo como esto:

        query MyQuery {
        site {
            siteMetadata {
            title
            }
        }
        }

        2- El código es el siguiente. En 'src/components/Header.tsx':

        import { useStaticQuery, graphql } from 'gatsby';

        const Header = () => {

            const data = useStaticQuery( graphql`
                query {
                    site {
                        siteMetadata {
                            title
                        }
                    }
                }
            ` );

            return (
                <header>
                    <h1>{ data.site.siteMetadata.title }</h1>
                </header>
            );

        };

        export default Header;


        IMPORTANTE: Solo podemos llamar al 'useStaticQuery' una vez por archivo. Si necesitamos hacer varias consultas, debemos hacerlo todo en la misma query.
        Por ejemplo, si necesita datos tanto del campo 'site' como del campo 'siteBuildMetadata', podría realizar la siguiente llamada a useStaticQuery:

        const data = useStaticQuery(graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
                siteBuildMetadata {
                    buildTime
                }
            }
        `);


            ######### Custom Hooks con 'useStaticQuery': #########
            Si repetimos la misma query en varios componentes, podemos crear un custom hook de la siguiente forma:

            import { graphql, useStaticQuery } from "gatsby";

            const useSiteMetadata = () => {

                const data = useStaticQuery(graphql`
                    query {
                        site {
                            siteMetadata {
                                title
                            }
                        }
                    }
                `);

                return data.site.siteMetadata;
            
            }

            export default useSiteMetadata;



        ######### Queries in page components: #########

        Las queries en 'page components' cambian ligeranmente con respecto a las queries de 'building-block components'.
        Las queries en 'page components' se hacen FUERA del componente. Cuando se construye el sitio, Gatsby corre la petición y la respuesta es pasada como prop 'data' del componente. 
        Es MUY importante exportar la constante query. Quedaría algo así:

        import { graphql } from "gatsby";

        const HomePage = ({ data }) => {

            return (
                <p>
                    { data.site.siteMetadata.description }
                </p>
            );

        }

        export const query = graphql`
            query {
                site {
                    siteMetadata {
                        description
                    }
                }
            }
        `;

        export default HomePage;


        PRO TIP: El 'Gatsby Head API' también recibe el 'data' prop de las peticiones. Ejemplo:
        export const Head = ({ data }) => <title>{data.site.siteMetadata.title}</title>



### Agrengado algo de MDX.
MDX es código 'Markdown' que podemos utilizar para escribir datos estáticos como por ejemplo nuestro 'blogs'.

1- Para hacer esto, creamos una carpeta 'blog' como hermana de 'src' y dentro de esta, 3 archivos: 
'another-post.mdx', 'my-first-post.mdx' y 'yet-another-post.msx'.

2- Ahora debemos utilizar GraphiQL para poder leer estos archivos desde el código. Para esto, debemos tener instalado el 'gatsby-source-filesystem', que se instala con el siguiente comando:

'npm install gatsby-source-filesystem'

3- Luego, nos dirigimos al archivo 'gatsby-config.js' y configuramos lo siguiente:

module.exports = {
    .....,
    plugins: [
        "gatsby-plugin-image", // No hace falta
        "gatsby-plugin-sharp", // No hace falta
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: `blog`,
                path: `${__dirname}/blog`
            }
        }
    ]
};

NOTA: __dirname es una variable de Node.js que almacena la ruta absoluta del directorio que contiene el archivo que se está ejecutando actualmente.

4- Una vez hecho esto, volvemos a levantar el ambiente de desarrollo y en GraphiQL podremos ver los nuevos .mdx.
En GraphQL, hay un campo llamado 'allFile' que nos permite solitar datos sobre varios archivos a la vez. Por lo tanto, nuestra Query quedaría de la siguiente manera:

query MyQuery {
    allFile {
        nodes {
            name
        }
    }
};

La respuesta de esta query, sería algo como esto:

{
  "data": {
    "allFile": {
      "nodes": [
        {
          "name": "my-first-post"
        },
        {
          "name": "another-post"
        },
        {
          "name": "yet-another-post"
        }
      ]
    }
  },
  "extensions": {}
}

Listo, esa es la forma de hacer peticiones a archivos .mdx con Gastby.



### Transform Data to Use MDX:
Con Gatsby podemos crear archivos .mdx ( Markdown + JSX ) para leerlos con GraphQL.
MDX tiene bastantes ventajas. Es fácil de escribir y editar, La compilación se hace hasta un 25% más rápido y el código también se ejecuta más rápido.

En los blogs de arriba, vamos a agregar un poco de contenido para poder leerlos con GraphQL:
En 'my-first-post.mdx':

---
title: "My First Post"
date: "2021-07-23"
slug: "my-first-post"
---

This is my first blog post! Isn't it *great*?

Some of my **favorite** things are:

* Petting dogs
* Singing
* Eating potato-based foods

// HASTA ACÁ.

Todo lo que está encerrado en --- --- se lo llama "frontmatter". Sirve para agregar "metadata" adicional a cada archivo. NO se renderiza en la página o query.


### Render each post’s contents on the Blog page:

Para esto, debemos instalar los packages 'gatsby-plugin-mdx' y '@mdx-js/react'.
Este package nos provee dos campos 'allMdx' y 'mdx', para poder hacer las consultas con GraphQL.

Pasos:

1- Ejecutamos 'npm install gatsby-plugin-mdx @mdx-js/react'.

2- Agregar el plugin al 'gatsby-config.js':

plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    {
        resolve: `gatsby-source-filesystem`,
        options: {
        name: `blog`,
        path: `${__dirname}/blog/`,
        },
    },
    'gatsby-plugin-mdx', // ESTE ES.
],

3- Crear la query usando GraphiQL. Va a quedar algo así:

query MyQuery {
    allMdx {
        nodes {
            frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            }
        }
    }
}

Seguir leyendo acá: https://www.gatsbyjs.com/docs/tutorial/part-5/



### Create new routes dynamically with Gatsby’s File System Route API:
IMPORTANTE: When you build your Gatsby site, Gatsby creates a new route for each page component in your src/pages directory.

Pasos para crear una 'colección de rutas' dinámicamente:

1- Decide what type of node you want to create pages from.

2- Choose which field on that node to use in the route (the URL) for your pages.
Por ejemplo, para archivos .mdx se suele usar el campo 'slug' del 'frontmatter' de dicho archivo. Aún así, podemos usar cualquier campo.

Note: In this case, the slug field is a good choice because it’s human readable, which means the URLs for your blog posts will be easier for users to understand. But you can use any field in your routes, even if it contains special characters or whitespace, as Gatsby will “slugify” every route when using the File System Route API. For example, I ♥ Dogs will be converted to i-love-dogs.

3- Create a new page component in your src/pages directory using the following naming convention: {nodeType.field}.js.
Don’t forget to include the curly braces ({}) in your filenames to indicate the dynamic part of the route!

For example, if you wanted to create a separate page for each Product node, and you wanted to use the product’s name field in the URL, you’d create a new file at src/pages/{Product.name}.js. Then Gatsby would create those pages at routes like /water-bottle/ or /sweatshirt/ or /notebook/.

### IMPORTANTE: src/pages/index.js lives at the / route. ###

Ejemplo de cómo crear rutas dinámicas:

1- Creamos un archivo 'src/pages/{mdx.frontmatter__slug}.js'.

- '{}' es la convención para decirle a Gastby que estas rutas son dinámicas.
- 'mdx' son TODOS los nodos MDX del dataLayer registrados en Gatsby.
- 'frontmatter__slug' se utiliza para crear cada url en base a cada 'slug' de cada .mdx.

2- De esta forma, se nos crearán algunas páginas como estas:

Gatsby uses the MDX node with slug my-first-post to build a page that lives at the /my-first-post/ route.
Gatsby uses the MDX node with slug another-post to build a page that lives at the /another-post/ route.
Gatsby uses the MDX node with slug yet-another-post to build a page that lives at the /yet-another-post/ route.


### Pro Tip: Not sure which pages were created? Check out the 404 page when you run gatsby develop. (You can get to it by trying to access the URL for a page that doesn’t exist.) The bottom of the page lists the routes for all the pages Gatsby created for your site. (If you’re making changes to your routes, you’ll have to stop and restart your local development server for the list of pages on the 404 page to update.)


### Update route to include a /blog path parameter

Hasta ahora, nuestros blogs se "cargan" en la ruta base de la app, es decir 'localhost:8000/my-first-post'. Por una cuestión de organización y performance, sería mejor que estos se carguen bajo la ruta 'localhost:8000/blog/'.
Para hacer esto, solo debemos crear una CARPETA, dentro de src, llamada 'blog'. Quedaría así 'src/pages/blog'.
Dentro de esta nueva carpeta, crearemos dos nuevos archivos.

1- Un 'index.js': Este es el archivo que cargará cuando el usuario quiera ingresar a localhost:8000/blog.

2- Un '{mdx.frontmatter__slug}.js': Este es el archivo que cargará cuando el usuario quiera ingresar a localhost:8000/blog/my-first-post.
La lógica es igual a lo de arriba.


__Pro tip__
Gatsby almacena en caché información sobre el sitio, para luego cargar más rápido las 'subrequest'. Debido a esto, a veces cuando hacemos cambios en el sitio, puede que no se vean impactados.
Para resolver el problema, hay que parar el desarrollo, ejecutar 'gatsby clean' y volver a levantar el servidor.
Esto limpiará la caché de Gatsby.



## Render post contents in the blog post page template

Ahora que ya tenemos una página para cada BLOG creado con .mdx, vamos a renderizar el contenido de cada archivo.
Para esto, en la consulta de nuestro archivo '{mdx.frontmatter__slug}.js' debemos agregar 'Query Variables':

__Query Variables__: Las query variables son VARIABLES que podemos usar para darle información adicional a las peticiones que hacemos con GraphQL.
Para traer info de cada blog en particular, debemos utilizar una query variable para esto.
Podemos usar las query variables en GraphiQL también.

Así se usan las 'query variables':

query MyQuery($slug: String) { // SE DEBE DECLARAR QUÉ TIPO ES LA VARIABLE.
    mdx(frontmatter: { slug: { eq: $slug } }) {
        frontmatter {
            title
        }
    }
}

Debe iniciar con '$', luego el NOMBRE de la query variable y luego lo usamos donde necesitemos.

## Note: In Gatsby, query variables can only be used inside of page queries. (You can’t use them with the useStaticQuery hook.)

Cuando usamos el 'Gatsby’s File System Route API' este agrega automáticamente algunas props al componente.
Una de esas props es el 'id' del 'data layer node' usado para crear la página. Ese id también se puede capturar en la query de GraphQL.
Debido a esto, lo más conveniente es hacer la petición por id, y NO por slug.
La petición entonces, quedaría así:

query MyQuery($id: String) {
    mdx(id: { eq: $id }) {
        frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
        }
    }
}

__Tip:__ If you want to test out your query in GraphiQL, you’ll need to add an id key to the Query Variables section. You can copy one of the id values from running an allMdx query in GraphiQL.


Ahora agreguemos esta query al template:

import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const BlogPost = () => {
  return (
    <Layout pageTitle="Super Cool Blog Posts">
      <p>My blog post contents will go here (eventually).</p>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`

export const Head = () => <Seo title="Super Cool Blog Posts" />

export default BlogPost;



TODO el contenido .mdx que retorna la petición ( NO en formato .mdx, obviamente ), será pasado por prop al componente. La prop se llama 'children'. Quedaría así:

import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const BlogPost = ({ data, children }) => {
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>{data.mdx.frontmatter.date}</p>
      {children}
    </Layout>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />

export default BlogPost;



Lo último que debemos hacer, es actualizar nuestro blog/index.js, para linkear cada blog a su url correspondiente.
Debemos hacer lo siguiente:

import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      {
        data.allMdx.nodes.map(node => (
          <article key={node.id}>
            <h2>
              <Link to={`/blog/${node.frontmatter.slug}`}>
                {node.frontmatter.title}
              </Link>
            </h2>
            <p>Posted: {node.frontmatter.date}</p>
          </article>
        ))
      }
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC }}) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          slug
        }
        id
      }
    }
  }
`

export const Head = () => <Seo title="My Blog Posts" />

export default BlogPage



### Part 7: Add Dynamic Images from Data:

Hasta aquí, hemos cargado imágenes con el componente StaticImage.
Ahora, agregaremos imágenes dinámicas con el componente GatsbyImage.

¿Cuál es la diferencia entre ambos componentes?

The StaticImage component is for static image sources, like a hard-coded file path or remote URL. In other words, the source for your image is always going to be the same every time the component renders.

The GatsbyImage component is for dynamic image sources, like if the image source gets passed in as a prop.


### Add hero images to blog post frontmatter:
Para hacer esto vamos a hacer estos pasos.

1- Reorganizaremos la carpeta blog/ donde se encuentran todos nuestros archivos .mdx.
Vamos a crear sub-carpetas con el nombre de CADA archivo .mdx dentro de blog/.
Dentro de cada subcarpeta, crearemos un 'index.mdx' y allí copiamos y pegamos el contenido de cada archivo correspodiente.

La estructura nos quedaría algo así:
    blog/
        my-first-post/
            index.mdx
        another-post/
            index.mdx
        yet-another-post/
            index.mdx
    src/

2- Luego descargamos algunas imágenes y las ponemos dentro de cada 'sub-carpeta'.

3- Vamos a modificar cada 'frontmatter' de cada .mdx para agregar info sobre las imágenes que insertamos. Quedaría algo así:

---
title: "My First Post"
date: "2021-07-23"
slug: "my-first-post"
hero_image: "./christopher-ayme-ocZ-_Y7-Ptg-unsplash.jpg"
hero_image_alt: "A gray pitbull relaxing on the sidewalk with its tongue hanging out"
hero_image_credit_text: "Christopher Ayme"
hero_image_credit_link: "https://unsplash.com/photos/ocZ-_Y7-Ptg"
---

4- Ahora instalamos y configuramos 'gatsby-transformer-sharp':
Ejecutamos 'npm install gatsby-transformer-sharp' y agregamos "gatsby-transformer-sharp" en el array de plugins del 'gatsby-config.js'.

5- Abrimos GraphiQL para armar la query. Nos quedará algo así:

query ($id: String) {
  mdx(id: {eq: $id}) {
    frontmatter {
      title
      date(formatString: "MMMM D, YYYY")
      hero_image_alt
      hero_image_credit_link
      hero_image_credit_text
      hero_image {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
}

Pro tip: Cuando Gatsby construye el sitio, crea un "GraphQL Schema" para describir los diferentes tipos de datos en el 'data layer'. Gatsby detecta que el campo 'hero_image' es un 'File node' y como tiene una extensión de imagen, pues utilizará el plugin 'gatsby-transformer-sharp'.

La query retornará algo como esto:

{
  "data": {
    "mdx": {
      "frontmatter": {
        // ...
        "hero_image": {
          "childImageSharp": [
            {
              "gatsbyImageData": {
                "layout": "constrained",
                "backgroundColor": "#282828",
                "images": {
                  "fallback": {
                    "src": "/static/402ec135e08c3b799c16c08a82ae2dd8/68193/christopher-ayme-ocZ-_Y7-Ptg-unsplash.jpg",
                    "srcSet": "/static/402ec135e08c3b799c16c08a82ae2dd8/86d57/christopher-ayme-ocZ-_Y7-Ptg-unsplash.jpg 919w,\n/static/402ec135e08c3b799c16c08a82ae2dd8/075d8/christopher-ayme-ocZ-_Y7-Ptg-unsplash.jpg 1839w,\n/static/402ec135e08c3b799c16c08a82ae2dd8/68193/christopher-ayme-ocZ-_Y7-Ptg-unsplash.jpg 3677w",
                    "sizes": "(min-width: 3677px) 3677px, 100vw"
                  },
                  "sources": [
                    {
                      "srcSet": "/static/402ec135e08c3b799c16c08a82ae2dd8/6b4aa/christopher-ayme-ocZ-_Y7-Ptg-unsplash.webp 919w,\n/static/402ec135e08c3b799c16c08a82ae2dd8/0fe0b/christopher-ayme-ocZ-_Y7-Ptg-unsplash.webp 1839w,\n/static/402ec135e08c3b799c16c08a82ae2dd8/5d6d7/christopher-ayme-ocZ-_Y7-Ptg-unsplash.webp 3677w",
                      "type": "image/webp",
                      "sizes": "(min-width: 3677px) 3677px, 100vw"
                    }
                  ]
                },
                "width": 3677,
                "height": 2456
              }
            }
          ]
        }
      }
    }
  },
  "extensions": {}
}


If you take a closer look at the gatsbyImageData object on the hero_image.childImageSharp field, you’ll see that it contains a bunch of information about the hero image for that post: dimensions, file paths for the images at different sizes, fallback images to use as a placeholder while the image loads. All this data gets calculated by gatsby-plugin-sharp at build time. The gatsbyImageData object in your response has the same structure that the GatsbyImage component needs to render an image.

Note: You might have noticed that the gatsbyImageData field in GraphiQL accepts several arguments, like aspectRatio, formats, or width. You can use these arguments to pass in extra data about how you want the Sharp image processing library to create your optimized images.

These options are equivalent to the ones you would pass into the StaticImage component as props.

For more information, see the gatsby-plugin-image Reference Guide.



## Add hero image using GatsbyImage component

Para hacer esto, nos vamos al 'src/pages/blog/{mdx.frontmatter__slug}.js' y hacemos esto:

1- Reemplazamos la query actual por la que obtuvimos más arriba:

export const query = graphql`
  query($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;

2- import { GatsbyImage, getImage } from 'gatsby-plugin-image';

3- Usamos la función getImage para retornar el objeto 'gatsbyImageData' del campo 'hero_image':

const BlogPost = ({ data, children }) => {

  const image = getImage(data.mdx.frontmatter.hero_image);

  return (
    // ...
  );

}

Note: getImage is a helper function that takes in a File node or an ImageSharp node and returns the gatsbyImageData object for that node. You can use it to keep your code a little cleaner and easier to read.

Without the getImage helper function, you’d have to type out data.mdx.frontmatter.hero_image.childImageSharp.gatsbyImageData (which is longer, but gives you back the same data).

4- Use the GatsbyImage component from gatsby-plugin-image to render the hero image data. You should pass GatsbyImage two props:

image: the gatsbyImageData object for your hero_image field
alt: the alternative text for your image, from the hero_image_alt field

return (
  <Layout pageTitle={data.mdx.frontmatter.title}> // Layout es un component custom mio
    <p>Posted: {data.mdx.frontmatter.date}</p>
    <GatsbyImage image={image} alt={data.mdx.frontmatter.hero_image_alt} />
    {children}
  </Layout>
);


### Task: Add image credit after hero image

Pro Tip: Since the credit link goes to an external page (in other words, one that’s not part of your site), you can use the <a> HTML tag instead of the Gatsby Link component.

Remember, Gatsby’s Link component only gives performance benefits for internal links to other pages within your site.

 <p>
    Photo Credit:{" "}
    <a href={data.mdx.frontmatter.hero_image_credit_link}>
        {data.mdx.frontmatter.hero_image_credit_text}
    </a>
</p>

Syntax Hint: You might have noticed that there’s a {" "} after the “Photo Credit:” text <p> tag. That’s to make sure that a space gets rendered between the colon (:) and the link text.

Try removing the {" "} and see what happens. The paragraph text should end up being “Photo Credit:Author”.
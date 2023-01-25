########################### Cookies vs LocalStorage ###########################

En el frontend, tenemos dos opciones para guardar sesiones del usuario, 'Cookies' y 'LocalStorage'.

## Cookies:
- Una cookie es una pequeña porción de información que un servidor ENVÍA al navegador del usuario. El navegador puede almacenar la cookie y enviarla de vuelta al mismo servidor con solicitudes posteriores.
- Las cookies se envían en cada 'request', por lo que pueden empeorar el rendimiento de la app (sobre todo en los móviles).
- Después de recibir una solicitud HTTP, el servidor puede enviar uno o más headers 'Set-cookie' con la respuesta. El navegador generalmente almacenar la cookie para luego enviarla en los 'headers' de las peticiones que se hagan a ese mismo servidor. Se puede establecer una fecha o tiempo de "caducidad" de la cookie.
- Podemos restringir el acceso de terceros o ataques a las cookies, utilizando los atributos 'Secure' y 'HttpOnly'.
- Las cookies están destinadas a ser leídas por el servidor.
- Las cookies NO son accesibles con JS siempre y cuando se usen los atributos de seguridad.
- Las cookies pueden almacenar hasta 4kb de datos.

- Una cookie con el atributo 'Secure' solo se envía al servidor con una 'solicitud cifrada' a través del protocolo HTTPS. Nunca se enviará con HTTP ( excepto en LocalHost ), lo que significa que los "man-in-the-middle attakers" no podrán acceder a las cookies fácilmente. Los sitios inseguros ( con HTTP en la url ) NO pueden setear cookies con el atributo 'secure'.
Sin embargo, NO asumir que el atributo 'Secure' previene el acceso a información sensible en las cookies. Alguien que tiene acceso al Disco Duro ( O a JavaScript si el atributo 'HttpOnly' no fue seteado ), puede leer y modificar la información de las cookies.

- Una cookie con el atributo 'HttpOnly' es INACCESIBLE para 'document.cookie' en JS.


## LocalStorage:
- A diferencia de las cookies, el LocalStorage solo puede ser leído en el navegador.
- En el LS se puede almacenar hasta 5mb de datos.
- LS es POTENCIALMENTE vulnerable a los ataques XSS. Si un atacante puede inyectar JS a su sitio, puede robar los tokens del LS y utilizarlo para daños.
- LS es inmune a los ataques CSRF, ya que su contenido no se puede enviar automáticamente a ningún lado.



########################### HTTP, HTTPS, SSL Y TLS ###########################

## HTTP:
Es un PROTOCOLO de transferencia de HIPERTEXTO.
Cuando un usuario quiere visitar el sitio 'http://google.com.ar' hay 3 'sujetos' que entran en acción para realizar esta tarea. Estos son, Cliente -> Internet -> Servidor.
La info VIAJA desde el Cliente hasta el Servidor para informarle a este último que el Cliente desea visitar la página de Google. TODA la información pasa por 'Internet' y luego al 'Servidor'. 
El protocolo HTTP envía TODA la información del Cliente en texto PLANO ( es decir que se puede ver TODA la información sensible ). Esto es muy inseguro porque puede haber un hacker en la etapa de "Internet" espiando todo la información que enviamos a los servidores, y así robar todas nuestras contraseñas o información sensible.

## HTTPS:
Debido al problema de privacidad/seguridad que hay en HTTP, nace HTTPS. La S es de 'Secure'.
Es lo mismo que HTTP, pero con seguridad.
ENCRIPTA toda la información entre el cliente y el servidor, utilizando algoritmos matemáticos.
De esta forma, si un cliente envía 'Usuario: Juan123, Contraseña: 42351531', pues el hacker no podrá ver esto, en su lugar, verá algo como 'fgjqeipg4g208g4j2pi42jgp42' ( encriptación ).
Con HTTPS el hacker podrá seguir escuchando la información que fluye entre el Cliente y el Servidor, pero no entenderá el contenido por estar encriptado.

## SSL:
Es un PROTOCOLO usado para brindar seguridad en Internet.
Hace uso de la encriptación para proteger los datos.
Los sitios HTTPS deben utilizar este protocolo ( o el TLS ) para ser HTTPS.

## TLS:
Es la versión mejorada del SSL.
La función y finalidad del TLS, es la misma que la del SSL.
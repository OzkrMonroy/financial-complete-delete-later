# Indice
- [Modules](#Modules)
   - [Core Modules](#Core-Modules")
      - [Guards](#Guards)
      - [Interceptors](#Interceptors)
      - [Services](#Services)
   - [Shared Modules](#Shared-modules")
      - [Components](#Components)
      - [Directives](#Directives)
      - [Pipes](#Pipes)
      - [Models](#Models)
      - [Mocks](#Mocks)
- [Testing](#Testing)
   - [Testing con dependencia de servicios](#Testing-dependencia)
- [Descargar el proyecto](#Descargar)
- [Deploys](#Deploys)
   - [Commitizen](#Commitizen)
- [Buenas prácticas y código limpio](#Buenas-prácticas)
   - [Variables](#Variables)
   - [Uso de var, let y const](#var-let-const)
   - [Clases, funciones y métodos](#Clases-funciones-métodos)
      - [Clases](#Clases)
      - [Funciones](#Funciones)
      - [Comentarios](#Comentarios)
- [Librerías de terceros](#Librerías-terceros)
   - [PrimeNg](#PrimeNg)
   - [Tailwind](#Tailwind)
   - [ngx-mask](#ngx-mask)
   - [ngx-google-analytics](#google-analytics)
   - [angular-google-tag-manager](#google-tag-manager)
   - [ngx-captcha](#captcha)
   - [Redux](#Redux)
- [Plugins para VS Code](#Plugins-VSCode)
   - [Prittier (esbenp.prettier-vscode)](#Prittier)
   - [ESLint (dbaeumer.vscode-eslint)](#ESLint)
   - [Code Spell Checker (streetsidesoftware.code-spell-checker)](#Cod-spell-checker)
   - [Code Spell Checker Español (streetsidesoftware.code-spell-checker-spanish)](#Cod-spell-checker-spanish)
   - [Jasmine Test Explorer (hbenl.vscode-jasmine-test-adapter)](#Jasmine)
   - [Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)](#Tailwind)


# Modules <a name="Modules"></a>
## Core Modules <a name="Core-Modules"></a>
Este módulo sirve mayormente para declarar todos los servicios y en menor medida componentes u otros artefactos que se utilicen en TODA la aplicación, la idea es que en el app.module.ts solo estén importados los módulos necesarios para que la aplicación de angular pueda arrancar.

### Guards <a name="Guards"></a>
Los guards son un tipo de middleware que controla el acceso a las rutas. Una buena práctica de los guards es que tengan una única responsabilidad. Ejemplo de guard: SuccessOtpGuard, este es el guard encargado de proteger todas las rutas que necesitan una verificación exitosa de un token OTP.
```
    ng g guard core/guards/NUEVO-GUARD
```

### Interceptors <a name="Interceptors"></a>
Los interceptors también son otro tipo de middlewares, pero estos se ejecutan antes y/o después de cada llamada HTTP. Cada interceptor tiene que ser declarado en el provider del core.module.ts. Algunas de las buenas prácticas para los interceptors son que cada uno tenga una única responsabilidad y que cada interceptor tenga sus arreglos de excepciones. Ejemplo de interceptor: SpinnerInterceptor
```
    ng g interceptor core/interceptor/NUEVO-INTERCEPTOR
```

### Services <a name="Services"></a>
Los servicios son funciones para compartir información entre clases, ya que cada componente no debería de guardar información. Mayormente los servicios se utilizan para realizar llamadas HTTP, pero también son una buena solución si se desea guardar información de manera sencilla y compartirla a lo largo de la aplicación. Buenas prácticas para los servicios, cada servicio debe de ser de un solo tema, por ejemplo UserService, AutenticationService, ProductService, etc. Si un método trae información por HTTP, es utilizado más de una vez y no tiene parámetros, como por ejemplo getAllProducts, es buena idea guardar la información que esta llamada devuelve y que el método solo llame una vez al endPoint, si se va a guardar información se debe de encapsular los parámetros.
```
    ng g service core/services/NUEVO-SERVICIO
```

## Shared Modules <a name="Shared-modules"></a>
Dentro de esta carpeta estarán todos los componentes, pipes, directives, models y mocks reutilizables en la aplicación, los components, directives y pipes deben de ser pensados para poder ser compartidos hacia otras aplicaciones dentro de la incubadora. Esta deberá de ser el área de pruebas y refinamiento para luego ser trasladados hacia la librería compartida.

### Components <a name="Components"></a>
Estos son componentes reutilizables, por ejemplo podría ser un, custom input, una tarjeta, etc. Cada componente deberá de tener su propio módulo y el componente deberá de ser importado y exportado para poderse utilizar dentro de otros módulos. Buenas prácticas, es recomendable crear de primero el módulo y después el componente para que el CLI de Angular importe el componente dentro del nuevo módulo y no dentro del AppModule, el componente debe de ser configurable por medio de Inputs y debe de emitir información por medio de Outputs, Los componentes no debes de hacer llamadas a los servicios, todo lo que necesiten para funcionar deben de ser manejado por Inputs
```
    ng m component  shared/components/NUEVO-COMPONENTE
    ng c component  shared/components/NUEVO-COMPONENTE
```

### Directives <a name="Directives"></a>
Las directivas extienden las funcionalidades del HTML y son muy útiles para modificar el aspecto gráfico de los componentes de las librerías externas como PrimeNg, esta práctica es muy recomendable y para estos casos siempre se debería de hacer así, esto mejora la reutilización ya que al llamar a esa directiva dentro del componente de PrimeNg se modificará únicamente en ese componente, y si se necesita una variante se debe de crear una directiva para esa nueva variante, con eso se logra reutilizar el código y ser flexible.
```
    ng g directive shared/directives/NUEVA-DIRECTIVA
```

### Pipes <a name="Pipes"></a>
Los pipes son funciones muy simples para transformar data en el template. Pueden ser máscaras para dar formato con puntos desimales, formato de monedas, etc.
```
    ng g pipe shared/pipes/NUEVO-SERVICIO
``` 

### Models <a name="Models"></a>
Los modelos son interfaces de objetos, es muy importante no utilizar tipos any, en vez de eso hay que crear modelos. Buenas prácticas: si necesitamos crear una lista
```
    ng g pipe shared/pipes/NUEVO-SERVICIO
``` 

### Mocks <a name="Mocks"></a>
Los mocks son representaciones de los servicios del backend. Utilizamos la librería fakerJS para generar instancias con información falsa y de esta manera siempre que se quiera componentes que hagan uso de servicios del backend utilizaremos estos mocks. La creación de cada mock debe de ser manual dentro de la ruta /app/shared/mocks/NUEVO-MOCK

# Testing <a name="Testing"></a>
Únicamente realizamos test unitarios, los realizamos con Karma y Jasmine.
## Testing con dependencia de servicios <a name="Testing-dependencia"></a>
Para testear componentes que dependan de servicios debemos de mockear los servicios con la librería fake-js y para reutilizar estos mocks debemos de guardarlos en la carpeta /src/app/shared/moks/, en esta carpeta ya se encuentra un ejemplo de como se debe de crear un mock

# Descargar el proyecto <a name="Descargar"></a>
Al descargar este repositorio para dar inicio a un proyecto nuevo se deban de hacer los siguientes pasos:

1. Clonar el proyecto
```
$ git clone https://github.com/BancoIndustrial-Incubadora/BI-Skeleton-FrontEnd-New.git
```

2. Crear en github un nuevo repositorio para alojar el nuevo proyecto

3. Cambiar el origen del repositorio para que apunte al nuevo repositorio recién creado
```
$ git remote set-url origin new.git.url
```

4. Realizar un pull y un push a la rama dev
```
$ git pull origin dev
$ git push origin dev
```

5. Configurar las variables de ambiente, para ello hay que duplicar el archivo .env.example que se encuentra en la raíz del proyecto y cambiarle de nombre a .env y agregarle las variables de ambiente que se deseen, así mismo agregar las variables de ambiente a la los archivos /enviroments/enviroment.prod.ts y /enviroments/enviroment.ts de la siguiente manera
```
    enviromentExapleKey: process.env.NG_APP_ENVIROMENT_KEY_IN_ENV_FILE || ''
```

6. Instalar de forma global la librería commitizen
```
npm install -g commitizen
```

7. Instalar todas las dependencias del proyecto
```
npm install
```

8. Correr la aplicación
```
ng serve
```


# Deploys <a name="Deploys"></a>
Para realizar deploys utilizamos la herramienta de Husky para automatizar el flujo. El flujo de Husky es el siguiente:
1. Corrige los estilos con el linter
2. Realiza los test unitarios.
3. Agrega al área de staging los cambios realizados
4. Realiza un commit utilizando la herramienta commitizen para estandarizar los comentarios y nombres del commit.
5. Realiza un pull a la rama dev para actualizar todos los cambios

Si algún paso falla, el flujo se corta y no se realiza el commit.

Luego que se termine el flujo del commit se debe de realizar un push a la feature branch y pedir un pull request a la rama dev.

Los siguientes son los comandos para realizar un push:
```
npm run commit:dev
git push origin feature-branch
```

## Commitizen <a name="Commitizen"></a>
Comitizen es una herramienta para estandarización de commits a nivel de nombramiento y comentarios por medio de un proceso guiado en consola. Esto sirve para que sea más fácil encontrar qué cambios se realizaron dentro de cada commit.
El proceso es el siguiente:
1. Seleccionar el tipo de cambio, exiten 8 tipos distintos de cambios
    * Feat: Si se realizó una nueva funcionalidad
    * Fix: Si se corriguió un bug
    * Docs: Si se modificó la documentación
    * Style: Si se modificó el estilo del código, por ejemplo si se agregó un punto y coma, si se quitaron a agregaron comentarios, si se cambió la indentación. Esta no es una modificación de estilo de gráfico de CSS o HTML
    * Refactor: Si se hace una refactorización de código, la refactorización es un cambio a nivel de legibilidad, pero no de funcionalidad, la entrada y la salida de un código refactorizado siempre tiene que ser la misma
    * Perf: Mejora de performance
    * Test: si se agrega o modifica algún test.
    * Chore: Son cambios que mofican la manera en que se compila el proyecto o el agregar una nueva librería.

# Buenas prácticas y código limpio <a name="Buenas-prácticas"></a>
## Variables <a name="Variables"></a>
Nombramiento de variables
* Utilizar nombres significativos y pronunciables.
* Las variables deben estar en inglés. 
* Usar lowerCamelCase.
* No usar caracteres especiales y tampoco numéricos.
* Crear variable constante para valores inmutables. (Variables que no cambian de valor)
* Para variables tipo lista, utilizar plural.
* Variable tipo numérico, escoger palabras que describan números como prefijoMax, prefijoMin o prefijoTotal.

Nota: lowerCamelCase, cuando la primera letra de cada una de las palabras es mayúscula, con la excepción de que la primera letra es minúscula.
 
Ejemplo: ejemploDeLowerCamelCase
```javascript
// Incorrecto
let salary_monetario: number = 123.21;
let usernombre: string = 'Pedro';
let mascota: string[] = ['Toby', 'Perry'];

// Correcto
let moneyBalance: number = 245.76;
let userName: string = 'Pedro';
let pets: string[] = ['Toby', 'Perry'];
```

## Uso de var, let y const <a name="var-let-const"></a>
* No hacer uso de var para declaración de variables.
* Usar let cuando se va modificar el contenido.
* Usar const cuando nunca se modifica el contenido.
* Evitar utilizar los "Magic Numbers", en vez de eso se debe de crear una constante con un nombre explicativo en mayusculas en las declaraciones de los parámetros

```javascript
// Incorrecto
if( value < 150 ){
    ...
}

// Correcto
const MIN_ALLOWED_CREDIT_SCORE = 150;
if( value < MIN_ALLOWED_CREDIT_SCORE ){
    ...
}
```

## Clases, funciones y métodos <a name="Clases-funciones-métodos"></a>
### Clases <a name="Clases"></a>
Las clases y los objetos deben tener nombres formados por un sustantivo o frases de sustantivo como User, UserProfile, Account o AdressParser. Debemos evitar nombres genéricos como Manager, Processor, Data o Info.

Hay que ser cuidadosos a la hora de escoger estos nombres, ya que son el paso previo a la hora de definir la responsabilidad de la clase. Si escogemos nombres demasiado genéricos tendemos a crear clases con múltiples responsabilidades.

### Funciones <a name="Funciones"></a>
Requisitos de funciones:
* Las funciones y métodos deben de realizar una sola acción. 
* Si los argumentos son más de 3, se deberá enviar objeto serializado.
* No duplicar acciones y código.
* Utilizar una descripción corta del método.
* Utilizar un prefijo con base a la acción.
* Las funciones deben de tener un tamaño de líneas reducido.
* No hacer referencia al mismo concepto.

```javascript
// Correcto
getUser();
updateUser();
```

### Comentarios <a name="Comentarios"></a>
* Se recomientda no escribir comentarios, aún que algunas veces son útiles.
* Los comentarios no deben de explicar lo que el código hace, el código debe de ser autoexplicativo utilizando un código ordenado y un buen nombramiento de variables.
* Los comentarios deben de explicar por qué se utilizó esa implementación del código cuando se crea que no sea tan clara.

# Librerías de terceros <a name="Librerías-terceros"></a>
No deberíamos de instalar librerías de terceros sin analizar 
## PrimeNg <a name="PrimeNg"></a>
Es una librería de componentes gráficos, como por ejemplo, calendario, inputs, acordiones, etc.
## Tailwind <a name="Tailwind"></a>
Es un framework CSS enfocado a utilidades, la definición de la utilidades se hace por medio de clases en el html, pero para que el html se vea más limpio nosotros recomendamos utilizar la metodología BEM y utilizar las utilidades de tailwind con @apply en el archivo scss.

## ngx-mask <a name="ngx-mask"></a>
Esta librería tiene pipes para agregarle máscaras a al template.

## ngx-google-analytics <a name="google-analytics"></a>
Librería para el manejo de Google Analytics
## angular-google-tag-manager <a name="google-tag-manager"></a>
Librería para el manejo de Google Tag Manager

## ngx-captcha <a name="captcha"></a>
Librería para el manejo de Google Recaptcha

## Redux <a name="Redux"></a>
Esta librería no está incluída en el proyecto por que no siempre será necesario su uso ya que con los servicios de Angular se puede compartir información entre componentes, pero si queremos que esta información se actualice de manera reactiva Redux es la opción para ello.
# Plugins para VS Code <a name="Plugins-VSCode"></a>
Todas las configuraciones necesarias están dentro de la carpeta .vscode de ser necesario realizar más configuraciones buscar la manera de realizarlas dentro de esta carpeta o a nivel del proyecto y no de usuario, ya que esta configuración viaja por repositorio y a así todo el quipo se beneficiará de las configuraciones realizadas.
## Prittier (esbenp.prettier-vscode) <a name="Prittier"></a>
Formatea el código para que cumpla con los estándares

## ESLint (dbaeumer.vscode-eslint) <a name="ESLint"></a>
Plugin para poder visualizar en tiempo real si el código no cumple con el estándar

## Code Spell Checker (streetsidesoftware.code-spell-checker) <a name="Cod-spell-checker"></a>
Verifica si existen faltas de ortografía en inglés, muy útil al momento de nombrar variables, métodos y clases

## Code Spell Checker Español (streetsidesoftware.code-spell-checker-spanish) <a name="Cod-spell-checker-spanish"></a>
Add on de Code Spell Checker, verifica si hay faltas de ortografía en español

## Jasmine Test Explorer (hbenl.vscode-jasmine-test-adapter) <a name="Jasmine"></a>
Este plugin nos ahorra mucho tiempo a la hora de escribir tests unitarios ya que con él podemos seleccionar el test que estamos corriendo y correrlo sin necesidad de ejecutar todos los test del proyecto.

## Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss) <a name="Tailwind"></a>
Mejora la experiencia de desarrollo de Tailwind al agregarle snippets, autocompletador y linter.

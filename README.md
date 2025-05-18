# App de Películas

Esta es una app construida con React (Vite), para ver listado de peliculas existentes. Parte de un Code Challenge para Tenpo.

## NOTAS PRINCIPALES (LEER)

Este code challenge cumple todos los requerimientos de la app, pero hay un par de puntos que es importante explicar:

- No conseguí ninguna API pública que retorne 2000 elementos de golpe. Absolutamente todas están paginadas (con sentido). Asi que para renderizar los 2000 elementos solicitados, no tuve otra opción que implementar infinite scrolling. Así que los 2000 elementos no se van a renderizar de golpe, sino luego de hacer scroll varias veces.
- Estoy usando una API llamada TMDB (The Movie Database), la cual da error de CORS si se le manda algun custom header en el request de Preflight (para chequear CORS). Asi que el código que añade el token de login al request está implementado, pero comentado para evitar este error. Esto se puede encontrar en `src/api/tmdb`, línea 27.
- El API key para la API de TMDB está hardcodeado en el código para facilitar el review de esta prueba, pero normalmente se guardaría en un archivo .env

## Explicación general de las decisiones técnicas

- Para el fake login (código 200-OK + token-fake), decidí usar la librería MSW que permite interceptar llamadas HTTP y mockearlas. Esto es perfecto para simular este login, incluyendo su llamada a alguna API, sin que toda la lógica del login quede hardcodeado en el codigo.
- Para la persistencia del fake token, se está usando localStorage, ya que es lo más simple para lograr esto.
- Se tiene un auth context que es el encargado de todo de auth, incluyendo: login, logout y chequeo de token cuando la app se abre por primera vez.
- Para el contexto publico/privado, se crearon 2 components llamados PublicRoute y PrivateRoute. Cada uno tiene logica específica que permite acceder dependiendo de la autenticación del usuario. El home solo es accesible si se está logeado, y el login es solo accesible si no se está logeado.
- Para mostrar el listado de todas las cards, se está usando infinite scrolling que hace fetch de la siguiente página a medida que el usuario hace scroll. Cada card tiene su propio key siguiendo las mejores prácticas de React. Adiocionalmente, para evitar que cada card haga re-render cuando el padre haga re render (cada pagina nueva), está envuelto en un memo, de manera que no va a sufrir re-renders y asi mejora el rendimiento. Esto se pudiera seguir optimizando usando algun tipo de virtualización para solo renderizar lo que esté en el viewport en cada momento, pero con el objetivo de mantener la prueba simple no lo implementé.
- Para estilos, se tiene un "theme" mediante variables de CSS, y todos los components usan estas variables para tener estilos consistentes y fáciles de modificar. Adicionalmente, se está usando CSS modular, lo que permite que todo el CSS esté scoped solo a dicho componente, previniendo colisiones de nombres de clases.
- Para el manejo de rutas, se está utilizando React Router en modo declarativo, ya que es el caso más sencillo y directo, que cumple con los requisitos de esta prueba
- En general, el código lo mantuve lo más simple posible. Adicional, tiene comments para explicar ciertas secciones.

## Desarrollo

### Requisitos

- Node.js
- npm

### Instalación

Correr los siguientes comandos:

```
npm install
```

Luego:

```
npm run dev
```

## Funcionalidades

- Autenticación de usuario con login/logout.
- Ruta protegidas para usuarios autenticados
- Diseño responsivo con infinite scrolling

## Arquitectura

### Autenticación

- **Autenticación basada en tokens**: El usuario se logea y un mock de la api retorna un token.
- **Almacenamiento de token**: El token de autenticación es guardado en localStorage para persistencia.
- **Contexto Auth**: Un contexto centralizado, encargado de todo lo relacionado a autenticación de la aplicación
- **Manejo de rutas**:
  - `PrivateRoute`: componente que permite acceder solo a usuarios autenticados
  - `PublicRoute`: componente que permite acceder solo a usuario NO autenticados
- **MSW (Mock Service Worker)**: Usado para hacer mock del endpoint de login, simulando una llamada http verdadera que retorne codigo 200 y un token

### Estructura de carpetas

```
movies/
├── public/
├── src/
│   ├── api/               # Todo lo relacionado a API
│   ├── components/        # Components reusables
│   │   ├── button/        # Botón
│   │   ├── card/          # Card
│   │   ├── header/        # Header
│   │   ├── home/          # Componentes para el home page
│   │   ├── input/         # Input
│   │   ├── private-route/ # PrivateRoute
│   │   └── public-route/  # PublicRoute
│   ├── context/           # Contextos de la app
│   ├── hooks/             # Hooks reusables
│   ├── mocks/             # Mocks de MSW
│   ├── pages/             # Paginas o rutas principales
│   │   ├── home/          # Home
│   │   └── login/         # Login
│   ├── types/             # Definiciones de Typescript
│   └── utils/             # Utility functions
└── ...                    # Configuration files
```

### Estilos

- **Variables de CSS**: Para mantenerlo simple, decidí usar variables de CSS como definición para el "theme" de la app. Esto se puede encontrar en el archivo `styles.css`
- **CSS Modular**: CSS Modular, para evitar conflictos de estilo
- **Diseño responsive**: Todos los componentes son responsive

### Integración con API pública de TMDB

- **Limitaciones**:
  - 20 items por página máximo
  - No soporta custom headers, ya que da error de CORS
- **Infinite Scrolling**: Implementado para mostrar la lista de todos los elementos provenientes de la API a medida que se hace scroll.
- **Optimización de imagenes**: Con su tamaño adecuado y lazy loading

### Optimizaciones de rendimiento

- **Memoization**: Las tarjetas de las películas usan React.memo para evitar re-renders innecesarios.
- **Lazy Loading**: Imágenes cargan cuando lo necesitan

# API
Esta desarrollada con Node. El patrón de diseño hasta ahora
involucra versionamiento, es decir, las rutas tienen un prefijo
indicando su versión, e.g.:

```
GET /api/v1/me
PUT /api/v1/me
```

## Autenticación
El método primario es a través de Facebook, utilizando `passport`
(biblioteca para login) y `passport-facebook` (para hacer login con
facebook). La lógica se encuentra en `auth.js`. Si la API de facebook
cambia, ese es el archivo que necesita ajustarse.

## Carga de archivos
Utilizamos la biblioteca [multer](https://github.com/expressjs/multer)
como middleware para la carga de archivos. Aceptaremos máximo 4 fotos
en un arreglo de nombre `photos`. Para las pruebas unitarias implementé
la biblioteca [request](https://github.com/request/request).

Estructura de datos esperada por la API:
```javascript
{
    ...
    "photos": [
        <file1>,
        <file2>
    ],
    ...
}
```

## Notas
El front-end y back-end deben coordenar una ruta en común para la
recuperación de las fotos subidas.

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
(librería para login) y `passport-facebook` (para hacer login con
facebook). La lógica se encuentra en `auth.js`. Si la API de facebook
cambia, ese es el archivo que necesita ajustarse.

# Inventory — Proyecto de Gestión de Inventario

Resumen
- Aplicación simple para gestionar productos (registro y listado) usando Node.js + Express en el backend y páginas estáticas en `public/` para el frontend.

Estructura del proyecto
- `package.json`: dependencias y scripts.
- `public/`: contenido público servido por Express.
  - `index.html`: UI principal con formulario y tabla.
  - `css/`: estilos (styles.css).
  - `js/app.js`: lógica del frontend (fetch a la API para listar/guardar productos).
  - `img/`: imágenes usadas en la interfaz.
- `src/`: código del servidor.
  - `index.js`: punto de entrada del servidor (configura Express, middlewares y rutas).
  - `database.js`: configuración y función para conectar a SQL Server (`conectarDB`).
  - `routes/`:
    - `productos.routes.js`: rutas para productos (GET/POST) montadas en `/api` desde `index.js`.
  - `controllers/`:
    - `productos.controller.js`: recibe peticiones y usa el servicio para obtener/registrar productos.
  - `services/`:
    - `productos.service.js`: lógica que interactúa con la base de datos (queries SQL usando `mssql`).

Base de datos
- Usa SQL Server (conexión en `src/database.js`).
- Asegúrate de que la base `BodegaDB` y la tabla `Productos` existen con columnas: `Id` (PK, identity), `Nombre` (varchar), `Descripcion` (varchar), `Precio` (decimal), `Stock` (int).

Cómo ejecutar
1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar la app:

```bash
node src/index.js
# o si tienes script en package.json
npm start
```

3. Abrir en el navegador: http://localhost:3000

Configuración recomendada
- Usar variables de entorno para credenciales DB (instalar `dotenv`) en vez de hardcodear en `database.js`.
- Añadir un `.env.example` con las claves: `DB_USER`, `DB_PASSWORD`, `DB_SERVER`, `DB_NAME`.

Observaciones y mejoras sugeridas
- Seguridad y configuraciones
  - Mover credenciales a variables de entorno (`dotenv`).
  - Validar entradas del cliente en backend (`Joi` o `express-validator`) antes de ejecutar queries.
  - Usar transacciones cuando realices operaciones compuestas.

- Robustez y código
  - Añadir manejo centralizado de errores (middleware de errores en Express).
  - Añadir logs estructurados (p. ej. `winston`) en vez de `console.log`.
  - Controlar timeouts y reconexión de la pool de SQL Server.

- Base de datos
  - Considerar migraciones (p. ej. `migrate` o `knex`/`sequelize-cli`) para versionar el esquema.
  - Asegurar tipos: enviar `Precio` como número (decimal) desde frontend y en el servicio convertir/validar.

- Arquitectura y mantenimiento
  - Extraer modelos o DTOs si la aplicación crece (`models/`).
  - Separar configuración (`config/`) y utilidades (`utils/`).
  - Añadir pruebas unitarias para los servicios (mocha/jest) y pruebas de integración para endpoints.

- Frontend
  - Manejar errores visibles al usuario (notificaciones) cuando la petición falle.
  - Deshabilitar el botón submit mientras se procesa la petición.
  - Validar/normalizar `Precio` y `Stock` en frontend antes de enviar.

Pequeños ajustes que recomiendo ahora mismo
- Asegúrate de que las rutas en `src/routes/productos.routes.js` correspondan a lo que pide el frontend (`/api/productos`).
- En `public/js/app.js` convertir `Precio` a número antes de usar `toFixed`: `Number(p.Precio || 0).toFixed(2)`.

Notas finales
- La estructura actual es adecuada para una app pequeña/mediana: separación `routes/controllers/services` es clara y escalable.
- Si planeas ampliar (múltiples entidades, autenticación, tests), te recomiendo introducir `models/`, `config/`, migraciones y validaciones ahora para evitar deuda técnica.

Si quieres, puedo:
- Añadir `.env.example` y cambiar `database.js` para usar `dotenv`.
- Crear scripts de `npm` útiles (`start`, `dev` con `nodemon`).
- Implementar validación de entrada con `express-validator`.

---
Archivo creado: `README.md` en la raíz del proyecto.

# 📦 Gestión de Inventario - Bodega

Una aplicación web moderna para la gestión completa de inventario de productos, construida con Node.js en el backend y JavaScript modular en el frontend.

## ✨ Características

- **Gestión completa de productos**: Crear, leer, actualizar y eliminar productos
- **Interfaz moderna y responsive**: Diseño adaptativo con navegación intuitiva
- **Búsqueda en tiempo real**: Filtrar productos por nombre o descripción
- **Sistema de carrito**: Funcionalidad preparada para ventas
- **Arquitectura escalable**: Patrón MVC tanto en frontend como backend
- **Base de datos SQL Server**: Persistencia robusta con Microsoft SQL Server

## 🏗️ Arquitectura

### Backend (Node.js + Express)

El backend sigue una arquitectura modular organizada en capas:

- **server.js**: Punto de entrada del servidor con configuración de Express
- **database.js**: Configuración de conexión a SQL Server
- **controllers/**: Lógica de controladores que manejan las peticiones HTTP
- **routes/**: Definición de rutas API REST
- **services/**: Lógica de negocio e interacción con la base de datos
- **middleware/**: Validaciones y manejo global de errores
- **models/**: Estructuras de datos y validaciones
- **utils/**: Utilidades y funciones auxiliares

### Frontend (JavaScript Modular)

El frontend implementa el patrón MVC (Modelo-Vista-Controlador) usando módulos ES6:

- **main.js**: Punto de entrada que inicializa la aplicación
- **models/**: Gestión del estado de datos y lógica de negocio
- **services/**: Comunicación con la API del backend
- **views/**: Renderizado de componentes de interfaz
- **controllers/**: Coordinación entre modelos y vistas, manejo de eventos
- **utils/**: Utilidades como sistema de eventos

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js (versión 16 o superior)
- SQL Server (local o remoto)
- npm o yarn

### Pasos de Instalación

1. **Instalar dependencias**: Ejecutar el comando de instalación de paquetes
2. **Configurar base de datos**: Crear la base de datos BodegaDB y la tabla Productos en SQL Server
3. **Configurar conexión**: Establecer las credenciales de conexión en el archivo database.js
4. **Ejecutar aplicación**: Iniciar el servidor en modo desarrollo o producción
5. **Acceder**: Abrir el navegador en la dirección local del servidor

## 📡 API Endpoints

### Productos

La API REST proporciona los siguientes endpoints para gestión de productos:

- **GET /api/productos**: Obtener la lista completa de productos
- **POST /api/productos**: Crear un nuevo producto
- **DELETE /api/productos/:id**: Eliminar un producto específico por ID

## 🎨 Interfaz de Usuario

### Navegación Principal

- **Inventario**: Vista principal con listado de productos
- **Nuevo Producto**: Formulario para registrar productos
- **Carrito de Ventas**: Sistema de ventas (en desarrollo)

### Funcionalidades Implementadas

- ✅ Registro de productos con validación de formulario
- ✅ Listado dinámico de productos en tabla
- ✅ Búsqueda y filtrado en tiempo real
- ✅ Eliminación de productos con confirmación
- ✅ Indicadores visuales de nivel de stock
- ✅ Contador dinámico de productos
- 🔄 Carrito de compras (estructura preparada)

### Diseño Responsive

- **Desktop**: Layout de dos columnas con sidebar lateral
- **Tablet**: Diseño adaptativo que se ajusta al espacio
- **Móvil**: Layout de columna única optimizado para pantallas pequeñas

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js**: Entorno de ejecución de JavaScript
- **Express.js**: Framework web minimalista para Node.js
- **MSSQL**: Driver oficial para conexión con SQL Server
- **Morgan**: Middleware para logging de peticiones HTTP
- **Dotenv**: Gestión segura de variables de entorno

### Frontend
- **JavaScript ES6+**: Uso de módulos nativos y características modernas
- **CSS3**: Sistema de diseño con variables CSS, Flexbox y Grid
- **HTML5**: Estructura semántica y accesible
- **Fetch API**: Comunicación asíncrona con el backend

### Base de Datos
- **SQL Server**: Sistema de gestión de base de datos relacional de Microsoft

## 🔧 Configuración Avanzada

### Variables de Entorno

Para una configuración segura, se recomienda usar variables de entorno para:

- Credenciales de conexión a la base de datos
- Puerto del servidor
- Configuración del entorno (desarrollo/producción)

### Scripts Disponibles

- **npm run dev**: Modo desarrollo con recarga automática
- **npm start**: Modo producción

## 📁 Estructura de Archivos

### Backend
- **server.js**: Configuración principal del servidor Express
- **database.js**: Pool de conexiones y configuración de SQL Server
- **controllers/productos.controller.js**: Validación y respuesta a peticiones
- **services/productos.service.js**: Consultas y operaciones en base de datos
- **routes/productos.routes.js**: Definición de endpoints REST
- **middleware/**: Validaciones y manejo de errores
- **models/Producto.js**: Estructura y validaciones de datos

### Frontend
- **index.html**: Estructura HTML principal
- **css/base.css**: Variables CSS y estilos globales
- **css/componentes.css**: Estilos de componentes específicos
- **css/tablas.css**: Estilos para tablas de datos
- **js/main.js**: Inicialización de la aplicación MVC
- **js/models/ProductoModel.js**: Gestión del estado de productos
- **js/services/ProductoService.js**: Llamadas a la API
- **js/views/UI.js**: Renderizado de la interfaz
- **js/controllers/ProductoController.js**: Lógica de control y eventos
- **js/utils/EventEmitter.js**: Sistema de eventos desacoplados

## 🚀 Próximas Funcionalidades

- Sistema completo de carrito de compras
- Autenticación y gestión de usuarios
- Dashboard con estadísticas e informes
- Notificaciones automáticas de stock bajo
- Exportación de datos (PDF, Excel)
- API REST completa con operaciones PUT/PATCH
- Tests automatizados (unitarios e integración)
- Dockerización de la aplicación

## 🤝 Contribuir

1. Realizar fork del proyecto
2. Crear una rama para la nueva funcionalidad
3. Realizar commits descriptivos de los cambios
4. Hacer push a la rama creada
5. Abrir un Pull Request para revisión

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 📞 Soporte

Para soporte técnico o reportar problemas:

1. Revisar los issues existentes en el repositorio
2. Crear un nuevo issue con detalles del problema
3. Contactar al maintainer del proyecto

---

**Desarrollado para la gestión eficiente de inventarios**
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

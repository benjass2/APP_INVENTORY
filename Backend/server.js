//Principal
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const productosRoutes = require('./src/routes/productos.routes');
const manejadorErrores = require('./src/middleware/manejadorErrores');
const ventasRoutes = require('./src/routes/ventas.routes');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname,'../Frontend')));

// Rutas de productos montadas en /api/productos
app.use('/api/productos', productosRoutes);
app.use('/api/ventas',ventasRoutes);

app.use(manejadorErrores.manejadorErrores);
app.listen(3000, () => console.log(" 🟢 Servidor activo en http://localhost:3000  🟢"));
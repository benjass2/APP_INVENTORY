//Principal
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const productosRoutes = require('./routes/productos.routes');
const manejadorErrores = require('./middleware/manejadorErrores');
const ventasRoutes = require('./routes/ventas.routes');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname,'../public')));

// Rutas de productos montadas en /api/productos
app.use('/api/productos', productosRoutes);
app.use('/api/ventas',ventasRoutes);

app.use(manejadorErrores.manejadorErrores);
app.listen(3000, () => console.log(" 🟢 Servidor activo en http://localhost:3000  🟢"));
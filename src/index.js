//Principal
const express = require('express');
const app = express();
const productosRoutes = require('./routes/productos.routes');
const manejadorErrores = require('./middleware/manejadorErrores');

app.use(express.json());
app.use(express.static('public'));

// Rutas de productos montadas en /api/productos
app.use('/api/productos', productosRoutes);
app.use(manejadorErrores.manejadorErrores);
app.listen(3000, () => console.log(" 🟢 Servidor activo en http://localhost:3000  🟢"));
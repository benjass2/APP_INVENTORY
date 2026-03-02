//Principal
const express = require('express');
const app = express();
const productosRoutes = require('./routes/productos.routes');


app.use(express.json());
app.use(express.static('public'));

//Usamos las rutas
app.use('/api',productosRoutes);
app.listen(3000, () => console.log("🚀 Servidor en http://localhost:3000"));
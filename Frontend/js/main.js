import { ProductoModel } from './models/ProductoModel.js';
import { ProductoService } from './services/ProductoService.js';
import { ProductoController } from './controllers/ProductoController.js';
import { CarritoModel } from './models/CarritoModel.js';
import { CarritoController } from './controllers/CarritoController.js';
import { UI } from './views/UI.js';

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    const productoModel = new ProductoModel();
    const carritoModel = new CarritoModel();

    const productoController = new ProductoController(productoModel, ProductoService, UI);
    const carritoController = new CarritoController(carritoModel, productoModel);

    // Permitir que la venta recargue el inventario
    productoModel.on('recargar', () => productoController.cargarProductos());
});

window.toggleCarrito = () => {
    const panel = document.getElementById('carrito-panel');
    const overlay = document.getElementById('carrito-overlay');
    panel.classList.toggle('abierto');
    overlay.classList.toggle('visible');
};

// Router simple para navegación futura
window.router = (seccion) => {
    console.log("Navegando a:", seccion);
};
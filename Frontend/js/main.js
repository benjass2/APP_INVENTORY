import { ProductoModel } from './models/ProductoModel.js';
import { ProductoService } from './services/ProductoService.js';
import { ProductoController } from './controllers/ProductoController.js';
import { CarritoModel } from './models/CarritoModel.js';
import { CarritoController } from './controllers/CarritoController.js';
import { UI } from './views/UI.js';

document.addEventListener('DOMContentLoaded', () => {
    const productoModel = new ProductoModel();
    const carritoModel = new CarritoModel();

    const productoController = new ProductoController(productoModel, ProductoService, UI);
    const carritoController = new CarritoController(carritoModel, productoModel);

    productoModel.on('recargar', () => productoController.cargarProductos());

    // Router: conectar los botones del sidebar
    const navBtns = document.querySelectorAll('#nav-principal .nav-btn[data-section]');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const seccion = btn.getAttribute('data-section');
            cambiarSeccion(seccion);

            // Marcar activo
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});

function cambiarSeccion(seccion) {
    // Ocultar todas las secciones
    document.querySelectorAll('.view-section').forEach(s => s.style.display = 'none');

    // Mostrar la sección pedida
    const target = document.getElementById(`section-${seccion}`);
    if (target) target.style.display = 'block';
}

window.toggleCarrito = () => {
    const panel = document.getElementById('carrito-panel');
    const overlay = document.getElementById('carrito-overlay');
    panel.classList.toggle('abierto');
    overlay.classList.toggle('visible');
};


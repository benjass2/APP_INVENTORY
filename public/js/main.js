import { ProductoModel } from './models/ProductoModel.js';
import { ProductoService } from './services/ProductoService.js';
import { UI } from './views/UI.js';
import { ProductoController } from './controllers/ProductoController.js';

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    const model = new ProductoModel();
    const controller = new ProductoController(model, ProductoService, UI);
});

// Router simple para navegación futura
window.router = (seccion) => {
    console.log("Navegando a:", seccion);
};
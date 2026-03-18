import { CarritoUI } from '../views/CarritoUI.js';
import { VentaService } from '../services/VentaService.js';
import { UI } from '../views/UI.js';

export class CarritoController {
    constructor(carritoModel, productoModel) {
        this.carritoModel = carritoModel;
        this.productoModel = productoModel;

        this.contenedorItems = document.getElementById('carrito-items');
        this.totalEl = document.getElementById('carrito-total');
        this.badgeEl = document.getElementById('carrito-badge');

        this.init();
    }

    init() {
        // Reaccionar a cambios en el carrito
        this.carritoModel.on('carritoActualizado', (items) => {
            CarritoUI.renderCarrito(items, this.contenedorItems);
            CarritoUI.actualizarTotal(
                this.carritoModel.getTotal(),
                this.carritoModel.getTotalItems(),
                this.totalEl,
                this.badgeEl
            );
        });

        this.carritoModel.on('stockInsuficiente', (producto) => {
            UI.notificar(`Stock insuficiente para "${producto.Nombre}"`, 'error');
        });

        // Botón 🛒 en la tabla de productos (delegación de eventos)
        const tbody = document.querySelector('#tabla-productos tbody');
        if (tbody) {
            tbody.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-cart')) {
                    const id = parseInt(e.target.getAttribute('data-id'));
                    const producto = this.productoModel.productos.find(p => p.Id === id);
                    if (producto) this.carritoModel.agregarItem(producto);
                }
            });
        }

        // Controles dentro del panel del carrito
        if (this.contenedorItems) {
            this.contenedorItems.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));

                if (e.target.classList.contains('btn-quitar')) {
                    this.carritoModel.quitarItem(id);
                }

                if (e.target.classList.contains('btn-mas')) {
                    const item = this.carritoModel.getItems().find(i => i.producto.Id === id);
                    if (item) this.carritoModel.cambiarCantidad(id, item.cantidad + 1);
                }

                if (e.target.classList.contains('btn-menos')) {
                    const item = this.carritoModel.getItems().find(i => i.producto.Id === id);
                    if (item) this.carritoModel.cambiarCantidad(id, item.cantidad - 1);
                }
            });
        }

        // Botón vaciar carrito
        const btnVaciar = document.getElementById('btn-vaciar-carrito');
        if (btnVaciar) {
            btnVaciar.addEventListener('click', () => {
                if (confirm('¿Vaciar el carrito?')) this.carritoModel.vaciar();
            });
        }

        // Botón confirmar venta
        const btnConfirmar = document.getElementById('btn-confirmar-venta');
        if (btnConfirmar) {
            btnConfirmar.addEventListener('click', this.confirmarVenta.bind(this));
        }

        // Render inicial vacío
        CarritoUI.renderCarrito([], this.contenedorItems);
    }

    async confirmarVenta() {
        const items = this.carritoModel.getItems();
        const btn = document.getElementById('btn-confirmar-venta')
        btn.disabled = true;
        btn.textContent = 'Procesando....';
        if (items.length === 0) {
            UI.notificar('El carrito está vacío', 'error');
            return;
        }

        const res = await VentaService.registrarVenta(items);
        if (res.ok) {
            UI.notificar(' Venta registrada con éxito');
            this.carritoModel.vaciar();
            // Recargar productos para actualizar stock
            this.productoModel.emit('recargar');
        } else {
            const data = await res.json();
            UI.notificar('Error: ' + (data.error?.mensaje || 'No se pudo registrar la venta'), 'error');
        }
        
        btn.disabled = false;
        btn.textContent ='Confirmar Venta';
        
    }
}
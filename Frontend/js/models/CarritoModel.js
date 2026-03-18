import { EventEmitter } from "../utils/EventEmitter.js";

export class CarritoModel extends EventEmitter {
    constructor() {
        super();
        this.items = [];
        const guardar = sessionStorage.getItem('carrito');
        this.items = guardar ? JSON.parse(guardar) : [];
    }

    agregarItem(producto) {
        const existente = this.items.find(i => i.producto.Id === producto.Id);
        if (existente) {
            if (existente.cantidad < producto.Stock) {
                existente.cantidad++;
            } else {
                this.emit('stockInsuficiente', producto);
                return;
            }
        } else {
            if (producto.Stock <= 0) {
                this.emit('stockInsuficiente', producto);
                return;
            }
            this.items.push({ producto, cantidad: 1 });
        }
        this.guardarEnSession();    
        this.emit('carritoActualizado', this.items);

    }

    quitarItem(productoId) {
        this.items = this.items.filter(i => i.producto.Id !== productoId);
        this.guardarEnSession();
        this.emit('carritoActualizado', this.items);
    }

    cambiarCantidad(productoId, nuevaCantidad) {
        const item = this.items.find(i => i.producto.Id === productoId);
        if (!item) { return; }

        if (nuevaCantidad <= 0) {
            this.quitarItem(productoId);
            return;
        }

        if (nuevaCantidad > item.producto.Stock) {
            this.emit('stockInsuficiente', item.producto);
            return;
        }
        item.cantidad = nuevaCantidad;
        this.guardarEnSession();
        this.emit('carritoActualizado', this.items);
    }
    
    //Guardar el carrito en sessionStorage para mantenerlo entre recargas de página
    guardarEnSession(){
        sessionStorage.setItem('carrito', JSON.stringify(this.items));
    }

    vaciar() {
        this.items = [];
        this.emit('carritoActualizado', this.items);
    }

    getTotal() {
        return this.items.reduce((sum, i) => sum + i.producto.Precio * i.cantidad, 0);
    }

    getTotalItems() {
        return this.items.reduce((sum, i) => sum + i.cantidad, 0);
    }

    getItems() {
        return this.items;
    }

}
import { EventEmitter } from '../utils/EventEmitter.js';

export class ProductoModel extends EventEmitter {
    constructor() {
        super();
        this.productos = [];
        this.filtro = '';
    }

    async cargarProductos() {
        // Aquí se llamará al servicio
        // Por ahora, vacío
    }

    agregarProducto(producto) {
        this.productos.push(producto);
        this.emit('productosActualizados', this.productos);
    }

    eliminarProducto(id) {
        this.productos = this.productos.filter(p => p.Id != id);
        this.emit('productosActualizados', this.productos);
    }

    setProductos(productos) {
        this.productos = productos;
        this.emit('productosActualizados', this.productos);
    }

    getProductos() {
        return this.productos;
    }

    getProductosFiltrados() {
        if (!this.filtro) return this.productos;
        return this.productos.filter(p =>
            p.Nombre.toLowerCase().includes(this.filtro) ||
            (p.Descripcion && p.Descripcion.toLowerCase().includes(this.filtro))
        );
    }

    setFiltro(filtro) {
        this.filtro = filtro.toLowerCase();
        this.emit('filtroActualizado', this.getProductosFiltrados());
    }


}
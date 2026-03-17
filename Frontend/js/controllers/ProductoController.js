import { ProductoModel } from '../models/ProductoModel.js';
import { ProductoService } from '../services/ProductoService.js';
import { UI } from '../views/UI.js';

export class ProductoController {
    constructor(model, service, ui) {
        this.model = model;
        this.service = service;
        this.ui = ui;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.model.on('productosActualizados', (productos) => {
            this.ui.renderTabla(productos, document.querySelector('#tabla-productos tbody'));
            this.actualizarContador(productos.length);
        });
        this.model.on('filtroActualizado', (productosFiltrados) => {
            this.ui.renderTabla(productosFiltrados, document.querySelector('#tabla-productos tbody'));
            this.actualizarContador(productosFiltrados.length);
        });
        this.cargarProductos();
    }

    actualizarContador(cantidad) {
        const contador = document.getElementById('product-count');
        if (contador) {
            contador.textContent = `${cantidad} producto${cantidad !== 1 ? 's' : ''}`;
        }
    }

    async cargarProductos() {
        const productos = await this.service.listar();
        this.model.setProductos(productos);
    }

    setupEventListeners() {
        // Formulario de creación
        const form = document.getElementById('form-producto');
        if (form) {
            form.addEventListener('submit', this.crearProducto.bind(this));
        }

        // Eliminación
        const cuerpoTabla = document.querySelector('#tabla-productos tbody');
        if (cuerpoTabla) {
            cuerpoTabla.addEventListener('click', this.eliminarProducto.bind(this));
        }

        // Búsqueda
        const buscador = document.getElementById('buscar-producto');
        if (buscador) {
            buscador.addEventListener('input', this.filtrarProductos.bind(this));
        }
    }

    async crearProducto(e) {
        e.preventDefault();
        const data = {
            Nombre: document.getElementById('nombre').value,
            Descripcion: document.getElementById('descripcion').value,
            Precio: parseFloat(document.getElementById('precio').value),
            Stock: parseInt(document.getElementById('stock').value)
        };

        const res = await this.service.crear(data);
        if (res.ok) {
            document.getElementById('form-producto').reset();
            this.cargarProductos();
            this.ui.notificar("Producto registrado con éxito");
        } else {
            const errorData = await res.json();
            this.ui.notificar("Error: " + (errorData.error?.mensaje || "No se pudo guardar"), 'error');
        }
    }

    async eliminarProducto(e) {
        if (e.target.classList.contains('btn-delete')) {
            const id = e.target.getAttribute('data-id');
            if (confirm(`¿Eliminar producto #${id}?`)) {
                const resultado = await this.service.eliminar(id);
                this.ui.notificar(resultado.mensaje || resultado.error?.mensaje);
                this.cargarProductos();
            }
        }
    }

    filtrarProductos(e) {
        const texto = e.target.value;
        this.model.setFiltro(texto);
    }
}
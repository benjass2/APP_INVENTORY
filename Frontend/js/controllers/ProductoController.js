import { ProductoModel } from "../models/ProductoModel.js";
import { ProductoService } from "../services/ProductoService.js";
import { UI } from "../views/UI.js";

export class ProductoController {
  constructor(model, service, ui) {
    this.model = model;
    this.service = service;
    this.ui = ui;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.model.on("productosActualizados", (productos) => {
      this.ui.renderTabla(
        productos,
        document.querySelector("#tabla-productos tbody"),
      );
      this.actualizarContador(productos.length);
    });
    this.model.on("filtroActualizado", (productosFiltrados) => {
      this.ui.renderTabla(
        productosFiltrados,
        document.querySelector("#tabla-productos tbody"),
      );
      this.actualizarContador(productosFiltrados.length);
    });
    this.cargarProductos();
  }

  actualizarContador(cantidad) {
    const contador = document.getElementById("product-count");
    if (contador) {
      contador.textContent = `${cantidad} producto${cantidad !== 1 ? "s" : ""}`;
    }
  }

  async cargarProductos() {
    const productos = await this.service.listar();
    this.model.setProductos(productos);
  }

  setupEventListeners() {
    // Formulario de creación
    const form = document.getElementById("form-producto");
    if (form) {
      form.addEventListener("submit", this.crearProducto.bind(this));
    }

    // Eliminación — un solo listener para el tbody
    const cuerpoTabla = document.querySelector("#tabla-productos tbody");
    if (cuerpoTabla) {
      cuerpoTabla.addEventListener("click", this.manejarClickTabla.bind(this));
    }

    // Búsqueda
    const buscador = document.getElementById("buscar-producto");
    if (buscador) {
      buscador.addEventListener("input", this.filtrarProductos.bind(this));
    }

    // Modal de edición
    this.setupEdicion();
  }

  // UN solo manejador para todos los clicks de la tabla
  manejarClickTabla(e) {
    if (e.target.classList.contains("btn-delete")) {
      this.eliminarProducto(e);
    }
    if (e.target.classList.contains("btn-edit")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      const producto = this.model.productos.find((p) => p.Id === id);
      if (producto) this.abrirModal(producto);
    }
  }

  async crearProducto(e) {
    e.preventDefault();
    const data = {
      Nombre: document.getElementById("nombre").value,
      Descripcion: document.getElementById("descripcion").value,
      Precio: parseFloat(document.getElementById("precio").value),
      Stock: parseInt(document.getElementById("stock").value),
    };

    const res = await this.service.crear(data);
    if (res.ok) {
      document.getElementById("form-producto").reset();
      this.cargarProductos();
      this.ui.notificar("Producto registrado con éxito");
    } else {
      const errorData = await res.json();
      this.ui.notificar(
        "Error: " + (errorData.error?.mensaje || "No se pudo guardar"),
        "error",
      );
    }
  }

  async eliminarProducto(e) {
    const id = e.target.getAttribute("data-id");
    if (confirm(`¿Eliminar producto #${id}?`)) {
      const resultado = await this.service.eliminar(id);
      this.ui.notificar(resultado.mensaje || resultado.error?.mensaje);
      this.cargarProductos();
    }
  }

  setupEdicion() {
    const btnCancelar = document.getElementById("btn-cancelar-editar");
    const formEditar = document.getElementById("form-editar");

    if (btnCancelar) {
      btnCancelar.addEventListener("click", () => this.cerrarModal());
    }
    if (formEditar) {
      formEditar.addEventListener("submit", this.guardarEdicion.bind(this));
    }
  }

  abrirModal(producto) {
    document.getElementById("edit-id").value = producto.Id;
    document.getElementById("edit-nombre").value = producto.Nombre;
    document.getElementById("edit-descripcion").value = producto.Descripcion || "";
    document.getElementById("edit-precio").value = producto.Precio;
    document.getElementById("edit-stock").value = producto.Stock;
    document.getElementById("modal-editar").style.display = "flex";
  }

  cerrarModal() {
    document.getElementById("modal-editar").style.display = "none";
  }

  async guardarEdicion(e) {
    e.preventDefault();
    const id = document.getElementById("edit-id").value;
    const data = {
      Nombre: document.getElementById("edit-nombre").value,
      Descripcion: document.getElementById("edit-descripcion").value,
      Precio: parseFloat(document.getElementById("edit-precio").value),
      Stock: parseInt(document.getElementById("edit-stock").value),
    };

    const res = await this.service.actualizar(id, data);
    if (res.ok) {
      this.cerrarModal();
      this.cargarProductos();
      this.ui.notificar("Producto actualizado con éxito");
    } else {
      const err = await res.json();
      this.ui.notificar(
        "Error: " + (err.error?.mensaje || "No se pudo actualizar"),
        "error",
      );
    }
  }

  filtrarProductos(e) {
    const texto = e.target.value;
    this.model.setFiltro(texto);
  }
}
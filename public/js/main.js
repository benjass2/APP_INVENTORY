import { API } from './api.js';
import { UI } from './ui.js';

const form = document.getElementById('form-producto');
const cuerpoTabla = document.querySelector('#tabla-productos tbody');

// Función principal para refrescar la vista
async function refrescarInventario() {
    const productos = await API.listar();
    UI.renderTabla(productos, cuerpoTabla);
}

// Evento: Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', refrescarInventario);

// Evento: Crear Producto
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            Nombre: document.getElementById('nombre').value,
            Descripcion: document.getElementById('descripcion').value,
            Precio: parseFloat(document.getElementById('precio').value),
            Stock: parseInt(document.getElementById('stock').value)
        };

        const res = await API.crear(data);
        if (res.ok) {
            form.reset();
            refrescarInventario();
            UI.notificar("Producto registrado con éxito");
        } else {
            const errorData = await res.json();
            UI.notificar("Error: " + (errorData.error?.mensaje || "No se pudo guardar"), 'error');
        }
    });
}

// Evento: Eliminar (Delegación de eventos)
if (cuerpoTabla) {
    cuerpoTabla.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-delete')) {
            const id = e.target.getAttribute('data-id');
            
            if (confirm(`¿Eliminar producto #${id}?`)) {
                const resultado = await API.eliminar(id);
                UI.notificar(resultado.mensaje || resultado.error.mensaje);
                refrescarInventario();
            }
        }
    });
}

// Router Simple para navegación futura
window.router = (seccion) => {
    // Aquí puedes ocultar/mostrar elementos de tu index.html reestructurado
    console.log("Navegando a:", seccion);
};
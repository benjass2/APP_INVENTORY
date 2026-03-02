const form = document.getElementById('form-producto');
const cuerpoTabla = document.getElementById('#tabla-productos tbody');

//Obtener productos al cargar
async function cargarProductos() {
    try {
        const res = await fetch('api/productos');
        const productos = await res.json();
        cuerpoTabla.innerHTML = productos.map(p => `
            <tr>
                <td>${p.Id}</td>
                <td>${p.Nombre}</td>
                <td>${p.Descripcion}</td>
                <td>S/ ${p.Precio.toFixed(2)}</td>
                <td>${p.Stock}</td>
            </tr>
        `).join('');

    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

//Guardar producto
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        Nombre: document.getElementById('nombre').value,
        Descripcion: document.getElementById('descripcion').value,
        Precio: parseFloat(document.getElementById('precio').value),
        Stock: parseInt(document.getElementById('stock').value)
    };

    const res = await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        form.reset();
        cargarProductos();
    }
});
cargarProductos();
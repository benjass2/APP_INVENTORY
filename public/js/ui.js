export const UI = {
    renderTabla(productos, contenedor) {
        contenedor.innerHTML = productos.map(p => `
            <tr>
                <td>${p.Id}</td>
                <td>${p.Nombre}</td>
                <td>${p.Descripcion || ''}</td>
                <td>S/ ${p.Precio.toFixed(2)}</td>
                <td>${p.Stock}</td>
                <td>
                    <button class="btn-delete" data-id="${p.Id}">Eliminar</button>
                    <button class="btn-cart" data-id="${p.Id}">🛒</button>
                </td>
            </tr>
        `).join('');
    },

    //Muestra alertas rapidas
    notificar(mensaje,tipo = 'success'){
        alert(mensaje);
    }
};
export class UI {
    static renderTabla(productos, contenedor) {
        if (productos.length === 0) {
            contenedor.innerHTML = `
                <tr>
                    <td colspan="6" class="table-empty">
                        <div class="icon">📦</div>
                        <p>No hay productos registrados</p>
                    </td>
                </tr>
            `;
            return;
        }

        contenedor.innerHTML = productos.map(p => `
            <tr>
                <td>${p.Id}</td>
                <td>${p.Nombre}</td>
                <td>${p.Descripcion || ''}</td>
                <td>S/ ${p.Precio.toFixed(2)}</td>
                <td>
                    <span class="${this.getStockClass(p.Stock)}">${p.Stock}</span>
                </td>
                <td class="text-center">
                    <button class="btn-cart" data-id="${p.Id}" title="Agregar al carrito">🛒</button>
                    <button class="btn-delete" data-id="${p.Id}" title="Eliminar producto">🗑️</button>
                    <button class="btn-edit" data-id="${p.Id}" title="Editar producto">✏️</button>
                </td>
            </tr>
        `).join('');
    }

    static getStockClass(stock) {
        if (stock <= 5) return 'stock-low';
        if (stock <= 20) return 'stock-normal';
        return 'stock-high';
    }

    // Muestra alertas rápidas
    static notificar(mensaje, tipo = 'success') {
        alert(mensaje);
    }
}
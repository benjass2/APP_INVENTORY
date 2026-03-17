export class CarritoUI {
    static renderCarrito(items, contenedor) {
        if (items.length === 0) {
            contenedor.innerHTML = `
                <div class="carrito-vacio">
                    <span class="carrito-vacio-icon">🛒</span>
                    <p>Tu carrito está vacío</p>
                    <small>Agrega productos desde el inventario</small>
                </div>
            `;
            return;
        }

        contenedor.innerHTML = items.map(({ producto, cantidad }) => `
            <div class="carrito-item" data-id="${producto.Id}">
                <div class="carrito-item-info">
                    <span class="carrito-item-nombre">${producto.Nombre}</span>
                    <span class="carrito-item-precio">S/ ${Number(producto.Precio).toFixed(2)} c/u</span>
                </div>
                <div class="carrito-item-controls">
                    <button class="btn-cantidad btn-menos" data-id="${producto.Id}">−</button>
                    <span class="carrito-item-cantidad">${cantidad}</span>
                    <button class="btn-cantidad btn-mas" data-id="${producto.Id}">+</button>
                    <button class="btn-quitar" data-id="${producto.Id}" title="Quitar">✕</button>
                </div>
                <div class="carrito-item-subtotal">
                    S/ ${(producto.Precio * cantidad).toFixed(2)}
                </div>
            </div>
        `).join('');
    }

    static actualizarTotal(total, totalItems, totalEl, badgeEl) {
        if (totalEl) totalEl.textContent = `S/ ${total.toFixed(2)}`;
        if (badgeEl) {
            badgeEl.textContent = totalItems;
            badgeEl.style.display = totalItems > 0 ? 'inline-flex' : 'none';
        }
    }
}
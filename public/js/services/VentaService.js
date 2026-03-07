export class VentaService {
    static async registrarVenta(items) {
        const body = {
            items: items.map(({ producto, cantidad }) => ({
                ProductoId: producto.Id,
                Cantidad: cantidad,
                PrecioUnitario: producto.Precio
            }))
        };

        const res = await fetch('/api/ventas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        return res;
    }
}
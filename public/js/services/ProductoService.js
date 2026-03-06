// Servicio para interactuar con la API de productos
export class ProductoService {
    static async listar() {
        const res = await fetch('/api/productos');
        return await res.json();
    }

    static async eliminar(id) {
        const res = await fetch(`/api/productos/${id}`, { method: 'DELETE' });
        return await res.json();
    }

    static async crear(data) {
        const res = await fetch('/api/productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res;
    }
}
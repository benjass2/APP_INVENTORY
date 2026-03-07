const Venta = require('../Models/Venta');

const registrar = async(data)=>{
    const {items} = data;

    if (!items || !Array.isArray(items) || items.length === 0) {
        throw new Error('El carrito no puede estar vacío');
    }

    for (const item of items) {
        if (!item.ProductoId || !item.Cantidad || !item.PrecioUnitario) {
            throw new Error('Cada item debe tener ProductoId, Cantidad y PrecioUnitario');
        }
        if (item.Cantidad <= 0) {
            throw new Error('La cantidad debe ser mayor a 0');
        }
    }

    return Venta.crear(items);
};

module.exports = {registrar};
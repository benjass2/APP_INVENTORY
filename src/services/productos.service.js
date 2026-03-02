const Producto = require('../Models/Producto');

const obtenerTodos = () => Producto.get();

const registrar = async(data)=>{
    return Producto.create(data);
}

const eliminar = (id)=> Producto.deleteById(id);

//Exportamos
module.exports = {
    obtenerTodos,
    registrar,
    eliminar
}




const Producto = require('../Models/Producto');

const obtenerTodos = () => Producto.get();

const registrar = async(data)=>{
    //Validar datos
    if(!data.nombre || !data.precio || !data.cantidad){
        throw new Error("Todos los campos son obligatorios");
    }
    return Producto.create(data);
}

const eliminar = (id)=> Producto.deleteById(id);

//Exportamos
module.exports = {
    obtenerTodos,
    registrar,
    eliminar
}




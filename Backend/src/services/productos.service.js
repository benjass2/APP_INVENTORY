const Producto = require('../Models/Producto');

const obtenerTodos = () => Producto.get();

const registrar = async(data)=>{
    //Validar datos - corregir nombres de campos para coincidir con frontend
    if(!data.Nombre || !data.Precio || !data.Stock){
        throw new Error("Todos los campos son obligatorios");
    }
    return Producto.create(data);
}

const eliminar = (id)=> Producto.deleteById(id);

const actualizar = (id,data) =>{
    if(!data.Nombre || !data.Precio ||!data.Stock ===undefined){
        throw new Error ("Todos los campos son obligatorios");
    }
    return Producto.update(id,data);    
}

//Exportamos
module.exports = {
    obtenerTodos,
    registrar,
    eliminar,
    actualizar
}




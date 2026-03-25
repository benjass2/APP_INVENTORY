//Controlador solo sabe recibir y consulta la base de datos
const productosService = require('../services/productos.service');

const obtenerProductos = async(req,res,next)=>{
    try{
      const productos = await productosService.obtenerTodos();
      res.json(productos);
    }catch(error){
        next(error);
    }
}

const registrarProducto = async (req, res, next) => {
    try {
        await productosService.registrar(req.body);
        res.status(201).json({ mensaje: "Producto guardado con éxito" });
    } catch (error) {
        next(error);
    }
};

const eliminarProducto = async (req, res, next) => {
    const { id } = req.params;

    try {
        const rowsAffected = await productosService.eliminar(id);

        if (rowsAffected === 0) {
            return res.status(404).json({ error: { mensaje: "No se encontró el producto elegido" } });
        }
        res.json({ mensaje: "Producto eliminado con éxito" });
    } catch (error) {
        next(error);
    }
}

const actualizarProducto = async(req,res,next)=>{
    const {id} = req.params;
    try{
        const rowsAffected = await productosService.actualizar(id,req.body);
        if(rowsAffected===0){
            return res.status(404).json({ error: { mensaje: "Producto no encontrado" } });
        }
        res.json({mensaje:"Producto actualizado con exito"});

    }catch(error){
        next(error);
    }
}

module.exports ={
    obtenerProductos,
    registrarProducto,
    eliminarProducto,
    actualizarProducto
}












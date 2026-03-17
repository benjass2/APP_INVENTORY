const ventasService = require('../services/ventas.service');

const registrarVenta = async(req,res,next)=>{
    try {
        const ventaId = await ventasService.registrar(req.body);
        res.status(201).json({ mensaje: 'Venta registrada con éxito', ventaId });
    } catch (error) {
        next(error);
    }
};

module.exports = {registrarVenta};
const manejadorErrores = (err, req, res, next) => {
    console.log("ERROR DETECTADO", err.stack);

    res.status(err.status || 500).json({
        error: { mensaje: err.message || "Error interno en el servidor de la bodega", status: err.status || 500 }
    });
};

module.exports ={
    manejadorErrores
}
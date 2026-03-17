const validarID = (req,res,next) =>{
    const {id} = req.params;

    //Verificar si el ID es un numero
    if(isNaN(id)){
        return res.status(400).json({
            error:"El ID proporcionado no es valido.Debe ser un numero"
        })
    }
    
    //Si todo esta bien , llamamos a next() para que pase al controlador
    next();
}

module.exports = validarID;
//Controlador solo sabe recibir y consula la base de datos
const {getConexion,sql} = require('../database');

const getProducto =  async (req,res)=>{
    try {
        const pool = await getConexion();
        const result = await pool.request().query('SELECT * FROM Productos');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const crearProducto = async (req, res) => {
    const { Nombre, Precio, Stock } = req.body;
    try {
        const pool = await getConexion();
        await pool.request()
            .input('Nombre', sql.VarChar, Nombre)
            .input('Descripcion', sql.VarChar, req.body.Descripcion || '')
            .input('Precio', sql.Decimal(10, 2), Precio)
            .input('Stock', sql.Int, Stock)
            .query('INSERT INTO Productos (Nombre, Descripcion, Precio, Stock) VALUES (@Nombre, @Descripcion, @Precio, @Stock)');

        res.status(201).json({ mensaje: "Producto guardado con éxito" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//Exportamos
module.exports = {
    getProducto,
    crearProducto
}
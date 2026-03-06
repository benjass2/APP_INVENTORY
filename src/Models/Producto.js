const { ConnectionError } = require('mssql');
const {conectarDB,sql} = require('../database');

const Producto ={
    //Obtener todos los productos
    async get(){
        const pool = await conectarDB();
        const result = await pool.request().query('SELECT * FROM Productos');
        return result.recordset;
    },

    // Registrar un nuevo producto
    async create(nuevoProducto) {
        const { Nombre, Descripcion, Precio, Stock } = nuevoProducto;
        const pool = await conectarDB();
        await pool.request()
            .input('Nombre', sql.VarChar, Nombre)
            .input('Descripcion', sql.VarChar, Descripcion || '')
            .input('Precio', sql.Decimal(10, 2), Precio)
            .input('Stock', sql.Int, Stock)
            .query('INSERT INTO Productos (Nombre, Descripcion, Precio, Stock) VALUES (@Nombre, @Descripcion, @Precio, @Stock)');
        return true;
    },
    
    // Eliminar por ID
    async deleteById(id) {
        const pool = await conectarDB();
        const result = await pool.request()
            .input('Id', sql.Int, id)
            .query('DELETE FROM Productos WHERE Id = @Id');
        return result.rowsAffected[0]; // Devuelve cuántas filas se borraron
    }

};

module.exports = Producto;
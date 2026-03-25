const { conectarDB, sql } = require("../../database/database");

const Producto = {
  //Obtener todos los productos
  async get() {
    try {
      const pool = await conectarDB();
      const result = await pool.request().query("SELECT * FROM Productos");
      return result.recordset;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener productos");
    }
  },

  // Registrar un nuevo producto
  async create(nuevoProducto) {
    try {
      const { Nombre, Descripcion, Precio, Stock } = nuevoProducto;
      const pool = await conectarDB();
      await pool
        .request()
        .input("Nombre", sql.VarChar, Nombre)
        .input("Descripcion", sql.VarChar, Descripcion || "")
        .input("Precio", sql.Decimal(10, 2), Precio)
        .input("Stock", sql.Int, Stock)
        .query(
          "INSERT INTO Productos (Nombre, Descripcion, Precio, Stock) VALUES (@Nombre, @Descripcion, @Precio, @Stock)",
        );
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear el producto");
    }
  },

  // Eliminar por ID
  async deleteById(id) {
    try {
      const pool = await conectarDB();
      const result = await pool
        .request()
        .input("Id", sql.Int, id)
        .query("DELETE FROM Productos WHERE Id = @Id");
      return result.rowsAffected[0]; // Devuelve cuántas filas se borraron
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar el producto");
    }
  },

  //Actualizar por ID
  async update(id, datos) {
    try {
      const { Nombre, Descripcion, Precio, Stock } = datos;
      const pool = await conectarDB();
      const result = await pool
        .request()
        .input("Id", sql.Int, id)
        .input("Nombre", sql.VarChar, Nombre)
        .input("Descripcion", sql.VarChar, Descripcion || "")
        .input("Precio", sql.Decimal(10, 2), Precio)
        .input("Stock", sql.Int, Stock).query(`UPDATE Productos 
                SET Nombre=@Nombre, Descripcion=@Descripcion, 
                    Precio=@Precio, Stock=@Stock 
                WHERE Id=@Id`);
      return result.rowsAffected[0]; // cuántas filas se modificaron
    } catch (error) {
      console.error(error);
      throw new Error("Error al actualizar el producto");
    }
  },
};

module.exports = Producto;

const sql = require('mssql');

const dbConfig ={
    user: 'bodega_user', // El usuario que creamos en SSMS
    password: 'google321gmail', // La contraseña que le pusiste
    server: 'localhost', 
    database: 'BodegaDB',
    options: {
        encrypt: false, // Ponlo en false si es local
        trustServerCertificate: true // Necesario para conexiones locales
    }
}

async function getConexion(){
    try{
      const pool = await sql.connect(dbConfig);
      return pool;
    }catch(error){
        console.log("ERROR DE CONEXION A SQL SERVER,:" , error);
    }
}

module.exports = {
    sql,
    getConexion
}
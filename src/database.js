const sql = require('mssql');
require('dotenv').config();//Carga las variables del archivo .env

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

async function conectarDB() {
    try {
        const pool = await sql.connect(dbConfig);
        return pool;
    } catch (error) {
        console.log("ERROR DE CONEXION A SQL SERVER,:", error);
    }
}

module.exports = {
    sql,
    conectarDB
}
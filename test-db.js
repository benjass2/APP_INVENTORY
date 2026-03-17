const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

async function testConnection() {
    try {
        console.log('🔄 Intentando conectar a SQL Server...');
        await sql.connect(config);
        console.log('✅ Conexión exitosa a SQL Server');

        // Verificar si la tabla existe
        const tableResult = await sql.query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Productos'");
        if (tableResult.recordset.length > 0) {
            console.log('✅ La tabla Productos existe');

            // Contar productos
            const countResult = await sql.query('SELECT COUNT(*) as total FROM Productos');
            console.log(`📊 Total de productos: ${countResult.recordset[0].total}`);

            // Mostrar primeros 5 productos
            const productsResult = await sql.query('SELECT TOP 5 * FROM Productos ORDER BY Id');
            console.log('📋 Primeros 5 productos:');
            console.table(productsResult.recordset);

        } else {
            console.log('❌ La tabla Productos NO existe');
            console.log('💡 Creando la tabla Productos...');

            await sql.query(`
                CREATE TABLE Productos (
                    Id INT IDENTITY(1,1) PRIMARY KEY,
                    Nombre NVARCHAR(100) NOT NULL,
                    Descripcion NVARCHAR(255),
                    Precio DECIMAL(10,2) NOT NULL,
                    Stock INT NOT NULL DEFAULT 0,
                    FechaCreacion DATETIME2 DEFAULT GETDATE()
                )
            `);
            console.log('✅ Tabla Productos creada exitosamente');
        }

    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
        console.log('\n🔧 Verifica:');
        console.log('1. Que SQL Server esté ejecutándose');
        console.log('2. Que la base de datos BodegaDB exista');
        console.log('3. Que las credenciales en .env sean correctas');
    } finally {
        await sql.close();
    }
}

testConnection();
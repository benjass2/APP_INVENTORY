const { conectarDB, sql } = require('../../database/database');

const Venta = {
    async crear(items) {
        const pool = await conectarDB();
        const transaction = pool.transaction();
        await transaction.begin();

        try {
            // Calcular total
            const total = items.reduce((sum, i) => sum + i.PrecioUnitario * i.Cantidad, 0);

            // Insertar cabecera de venta
            const ventaResult = await transaction.request()
                .input('Total', sql.Decimal(10, 2), total)
                .query('INSERT INTO Ventas (Total) OUTPUT INSERTED.Id VALUES (@Total)');

            const ventaId = ventaResult.recordset[0].Id;

            // Insertar cada detalle y descontar stock
            for (const item of items) {
                await transaction.request()
                    .input('VentaId', sql.Int, ventaId)
                    .input('ProductoId', sql.Int, item.ProductoId)
                    .input('Cantidad', sql.Int, item.Cantidad)
                    .input('PrecioUnitario', sql.Decimal(10, 2), item.PrecioUnitario)
                    .query(`INSERT INTO DetalleVenta (VentaId, ProductoId, Cantidad, PrecioUnitario)
                            VALUES (@VentaId, @ProductoId, @Cantidad, @PrecioUnitario)`);

                // Descontar stock del producto
                await transaction.request()
                    .input('Cantidad', sql.Int, item.Cantidad)
                    .input('ProductoId', sql.Int, item.ProductoId)
                    .query('UPDATE Productos SET Stock = Stock - @Cantidad WHERE Id = @ProductoId');
            }

            await transaction.commit();
            return ventaId;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
};

module.exports = Venta;
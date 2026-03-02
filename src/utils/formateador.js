//No esta en uso por el momento

const formateador ={
    //Convierte un numero a formato monera perana
    toPEN: (amount) => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
        }).format(amount);
    },

    // Formatea fechas de SQL Server a algo legible (DD/MM/YYYY)
    formatDate: (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('es-PE');
    }
};

module.exports = formateador;

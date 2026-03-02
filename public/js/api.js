//Solo se encarga de hablar con el backend
export const API = {
    async listar(){
        const res = await fetch('/api/productos');
        return await res.json();
    },

    async eliminar(id){
        const res = await fetch(`/api/productos/${id}`, {method:'DELETE'});
        return await res.json(); 
    },

    async crear(data){
        const res = await fetch('/api/productos',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await res.json();
    }
};
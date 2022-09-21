(function() {

    let DB;

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();

        formulario.addEventListener('submit', validarCliente)
    })

    function conectarDB() {
        const abrirConexion = window.indexedDB.open('crm', 1);
    
        abrirConexion.onerror = () =>{
            console.log('Hubo un error');
        };
    
        abrirConexion.onsuccess = () => {
            DB = abrirConexion.result;
        } 
    }

    function validarCliente(e){
        e.preventDefault();

        //leer todos los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;
    
        if(nombre === '' || email === '' || telefono === '' || empresa === ''){
            imprimirAlerta('Todos los campos son obligatorios', 'error');

            return;
        }

        //crear un nuevo objeto con la informacion 
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        }

        crearNuevoCLiente(cliente);
    }

    function crearNuevoCLiente(cliente) {
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.add(cliente);

        transaction.onerror = () => {
            imprimirAlerta('Hubo un Error', 'error');
        };

        transaction.oncomplete = () => {
            imprimirAlerta('Cliente Agregado correctamente')

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
    }
})();
import { obtenerUsuarioAutenticado } from "./gestorLogin.js"


export function agregarAlCarrito(producto){

    let carrito = traerCarrito();

    if (!carrito) {
        crearCarrito();
        carrito = traerCarrito();
    }
    
    const productoExistente = carrito.productos.find(p => p.idProd === producto.id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.productos.push({
            idProd: producto.id,
            cantidad: 1
        });
    }

    actualizarCarrito(carrito);

}


export function crearCarrito(){
    
    const user = obtenerUsuarioAutenticado()

    const nuevoCarrito = {
        userID: user.id,
        productos: []
    };

    localStorage.setItem(`carrito_${user.id}`,  JSON.stringify(nuevoCarrito)
    );
}

export function traerCarrito() {
    const user = obtenerUsuarioAutenticado();

    return JSON.parse(localStorage.getItem(`carrito_${user.id}`))
}

export function actualizarCarrito(carrito){
    const user = obtenerUsuarioAutenticado();

    localStorage.setItem(
        `carrito_${user.id}`,
        JSON.stringify(carrito)
    );
}

export function vaciarCarrito(){
    const user = obtenerUsuarioAutenticado();

    const carritoVacio = {
        userID : user.id,
        productos: []
    };

    localStorage.setItem(
        `carrito_${user.id}`,
        JSON.stringify(carritoVacio)
    );
}


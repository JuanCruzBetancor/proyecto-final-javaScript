document.addEventListener('DOMContentLoaded', () =>{
    pintarProductos();
    if (localStorage.getItem('carrito')) {
        carrito = obtenerCarrito();
        pintarCarritoActualizado(carrito);
        actualizarCarrito(carrito);
        finalizarCompra(carrito);
    }
});
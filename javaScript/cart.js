let carrito = [];
const productoContenedor = document.getElementById('producto-contenedor');
productoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        validarProductoEnCarrito(e.target.id);
        Toastify({
            gravity: "bottom",
            text: "Producto agregado al carrito.",
            duration: 2000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    }
});

//sumar productos repetidos
const validarProductoEnCarrito = (productoId) =>{
    const productoRepetido = carrito.find(producto => producto.id == productoId);
    if (!productoRepetido) {
        const producto = nuestrosProductos.find(producto =>producto.id == productoId);
        carrito.push(producto);
        pintarProductoCarrito(producto);
        actualizarCarrito(carrito);
    } else {
        productoRepetido.cantidad++ ;
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`);
        cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`;
        actualizarCarrito(carrito);
    }
}

const pintarProductoCarrito = (producto) => {
    const contenedor = document.getElementById('contenedor-carrito');
    const div = document.createElement('div');
    div.classList.add('productoEnCarrito');
    div.innerHTML +=`
        <div class="orden-carrito">
        <div class="orden-boton">
        <h5>${producto.nombre}</h5>
        <p>Talle: ${producto.talle}</p>
        <p>Marca: ${producto.marca}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <p>precio: ${producto.precio}</p>
        <div data-bs-theme="dark">
            <p>Eliminar producto</p>
            <button type="button" class="btn-close btn-close1" aria-label="Close" value=${producto.id}></button>
        </div>
        </div>
        <div class="orden-img">
            <img src="${producto.imagen}"> 
        </div>
        </div>
    `
    contenedor.appendChild(div);
};
//Actualizar precio total.
const actualizarCarrito = (carrito) =>{
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    //Precio con descuento del 10 %.
    const totalDescuento = carrito.reduce((acc,item) => acc + (item.precio * item.cantidad * (0.90)),0)
    pintarTotales(totalCantidad, totalCompra, totalDescuento);
    carritoStorage(carrito);
    vaciarCarrito(carrito);
};



//Mostrar totales carrito
const pintarTotales = (totalCantidad, totalCompra, totalDescuento) =>{
    const cantidadCarrito = document.getElementById('cantidadCarrito');
    const precioTotalCarrito = document.getElementById('precioTotalCarrito');
    const precioTotalDescuento = document.getElementById('precioTotalDescuento')
    cantidadCarrito.innerText = totalCantidad;
    precioTotalCarrito.innerText = `$ ${totalCompra}`;
    precioTotalDescuento.innerText = `$ ${totalDescuento}`;
};

//Eliminar productos del carrito
const eliminarProductos = document.getElementById('staticBackdrop');

eliminarProductos.addEventListener('click', (e) =>{
    if (e.target.classList.contains('btn-close1')) {
        eliminarProductosCarrito (e.target.value);
        Toastify({
            gravity: "top",
            text: "Producto eliminado del carrito.",
            duration: 2000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    }
});

const eliminarProductosCarrito = (productoId) =>{
    const productoIndex = carrito.findIndex(producto => producto.id == productoId);
        carrito.splice(productoIndex, 1)
    pintarCarritoActualizado(carrito);
    //Actualizar total carrito.
    actualizarCarrito(carrito);
};

//volver a pintar productos despues de eliminar productos
const pintarCarritoActualizado = (carrito) =>{
    const contenedor = document.getElementById('contenedor-carrito');
    contenedor.innerHTML = '';
    carrito.forEach(producto => {
        const div = document.createElement('div');
    div.classList.add('productoEnCarrito');
    div.innerHTML +=`
        <div class="orden-carrito">
        <div class="orden-boton">
        <h5>${producto.nombre}</h5>
        <p>Talle: ${producto.talle}</p>
        <p>Marca: ${producto.marca}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <p>precio: ${producto.precio}</p>
        <div data-bs-theme="dark">
            <p>Eliminar producto</p>
            <button type="button" class="btn-close btn-close1" aria-label="Close" value=${producto.id}></button>
        </div>
        </div>
        <div class="orden-img">
            <img src="${producto.imagen}"> 
        </div>
        </div>
    `
    contenedor.appendChild(div);
    });
};

// //vaciar total carrito
const vaciarCarrito = (carrito) =>{
    const eliminarTodo = document.getElementById('eliminar-todo');
eliminarTodo.addEventListener('click', () =>{
    carrito.length = 0;
    actualizarCarrito(carrito)
    pintarCarritoActualizado(carrito);
    Swal.fire({
        icon: 'success',
        title: 'Buenas!!',
        text: 'El carrito fue vaciado con exitó!',
    })
})
} 

// almacenando datos de carrito en el localStorage en formato JSON.
const carritoStorage = (carrito) =>{
    localStorage.setItem('carrito', JSON.stringify(carrito));
};
//obtener datos carrito.
const obtenerCarrito = () =>{
    const obtenerCarritoStorage = JSON.parse(localStorage.getItem('carrito'));
    return obtenerCarritoStorage;
};

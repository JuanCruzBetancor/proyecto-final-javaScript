let carrito = [];
const productoContenedor = document.getElementById('producto-contenedor');
productoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        validarProductoEnCarrito(e.target.id);
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
        <h5>${producto.nombre}</h5>
        <p>Talle: ${producto.talle}</p>
        <p>Marca: ${producto.marca}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <p>precio: ${producto.precio}</p>
        <div data-bs-theme="dark">
            <p>Eliminar producto</p>
            <button type="button" class="btn-close btn-close1" aria-label="Close" value=${producto.id}></button>
        </div>
    `
    contenedor.appendChild(div);
};
//Actualizar precio total.
const actualizarCarrito = (carrito) =>{
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    pintarTotales(totalCantidad, totalCompra);
    carritoStorage(carrito);
};

//Mostrar totales carrito
const pintarTotales = (totalCantidad, totalCompra) =>{
    const cantidadCarrito = document.getElementById('cantidadCarrito');
    const precioTotalCarrito = document.getElementById('precioTotalCarrito');

    cantidadCarrito.innerText = totalCantidad;
    precioTotalCarrito.innerText = totalCompra;
};

//Eliminar productos del carrito
const eliminarProductos = document.getElementById('staticBackdrop');

eliminarProductos.addEventListener('click', (e) =>{
    if (e.target.classList.contains('btn-close1')) {
        eliminarProductosCarrito(e.target.value);
    }
});

const eliminarProductosCarrito = (productoId) =>{
    const productoIndex = carrito.findIndex(producto => producto.id == productoId);
    carrito.splice(productoIndex, 1);
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
        <h5>${producto.nombre}</h5>
        <p>Talle: ${producto.talle}</p>
        <p>Marca: ${producto.marca}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <p>precio: ${producto.precio}</p>
        <div data-bs-theme="dark">
            <p>Eliminar producto</p>
            <button type="button" class="btn-close btn-close1" aria-label="Close" value=${producto.id}></button>
        </div>
    `
    contenedor.appendChild(div);
    });
    
};

// almacenando datos de carrito en el localStorage en formato JSON.
const carritoStorage = (carrito) =>{
    localStorage.setItem('carrito', JSON.stringify(carrito));
};
//obtener datos carrito.
const obtenerCarrito = () =>{
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    return carritoStorage;
};


const carritoCompra = [];
//lista ordenada por precio
const ordenarMenorMayor = () =>{
    nuestrosProductos.sort((a, b) => a.precio - b.precio);
    mostrarListaProductos()
};

//mostrar lista de productos
const mostrarListaProductos = () => {
    const listaOrdenada = nuestrosProductos.map(productos => {
    return '- ' +productos.nombre+  '- Talle: '+productos.talle+ '-  Precio: $'+productos.precio
    })
    alert('Lista de productos:'+'\n\n' +listaOrdenada.join('\n\n'))
    comprarProductos(listaOrdenada)
};

const comprarProductos = (listaOrdenada) => {
    let productoNombre = '';
    let cantidadSolicitada = 0;
    let seguirComprando;
    do {
        productoNombre = prompt('¿Que producto desea comprar?'+'\n\n'+listaOrdenada.join('\n\n'));
        cantidadSolicitada = parseInt(prompt('¿Que cantidad desea?'));
        cantidadSolicitada = cantidadIngresada(cantidadSolicitada);
        const producto = nuestrosProductos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase())
        if (producto) {
            agregarCarrito(producto, producto.id, cantidadSolicitada); 
        } else {
            alert('El producto seleccionado no se encuentra!');
        }
        seguirComprando = confirm('Desea seguir comprando');
        console.log(producto)
    } while (seguirComprando);
    confirmarCompra()
}

const agregarCarrito = (producto, productoId, cantidadSolicitada) =>{
    const productoRepetido = carritoCompra.find(producto => producto.id === productoId);
    if (productoRepetido) {
        productoRepetido.cantidad += cantidadSolicitada;
    }else{
        producto.cantidad += cantidadSolicitada;
        carritoCompra.push(producto);
    }
    console.log(carritoCompra)
}

//eliminar producto del carrito
const eliminarProducto = (productoNombre) =>{
    carritoCompra.forEach((productos, index) => {
        if (productos.nombre.toLowerCase() === productoNombre) {
            if (productos.cantidad > 1){
                productos.cantidad--
            }
            else{
                carritoCompra.splice(index, 1)
            }
        } 
    } )
    confirmarCompra()
    console.log(carritoCompra)
}


//validar que el cliente ingrese una cantidad valida
const cantidadIngresada = (cantidadSolicitada) => {
    while (Number.isNaN(cantidadSolicitada) || cantidadSolicitada <= 0) {
        if (cantidadSolicitada <= 0) {
            alert('Debe ingresar una cantidad válida.')
        } else {
            alert('Debe agregar un número.')
        }
        cantidadSolicitada = parseInt(prompt('¿Cuántos productos queres comprar?'));
    }
    return cantidadSolicitada;
}

//Confirmar compra y eliminar producto del carrito
confirmarCompra = () => {
    const productosCarrito = carritoCompra.map(productos => {
        return '- ' +productos.nombre+  '- Talle: '+productos.talle+ '-  cantidad: '+productos.cantidad
    })
    const confirmar = confirm('Checkout: '
    +'\n\n' +productosCarrito.join('\n') 
    +'\n\n Para finalizar su compre presione ACEPTAR, sino para eliminar productos precione CANCELAR. ' 
    );
    if (confirmar) {
        finalizarCompra(productosCarrito);
    } else {
        const productoNoDeseado =prompt ('Ingrese el nombre del producto no deseado:');
        eliminarProducto(productoNoDeseado);
    }
}

//finalizar compra
const finalizarCompra = (productosCarrito) =>{
    const cantidadTotal = carritoCompra.reduce((acc, elemento) => acc + elemento.cantidad, 0)
    const precioTotal = carritoCompra.reduce((acc, elemento) => acc + (elemento.precio * elemento.cantidad), 0)
    alert('Detalle de su compra: '
    +'\n\n'+productosCarrito.join('\n')
    +'\n\nTotal de productos a comprar: '+cantidadTotal
    +'\n\nTotal de su compra es: $'+precioTotal
    );
    const totalConDescuento = descuentoCompra(precioTotal);
    alert ('Recuerde que con su compra mayor a 3500 tiene un descuento del 10%, el total de su compra es $'+totalConDescuento
    +'\n\nGracias por su compra lo esperamos pronto!'
    )
};

//realizar descuento en compras mayores o iguales a $35000 del 10% de descuento.
const descuentoCompra = (precioTotal) => {
    let totalConDescuento = 0;
    if (precioTotal >= 35000) {
    totalConDescuento = precioTotal * 0.90;
    return totalConDescuento;
    } else {
    return precioTotal;
}
}
ordenarMenorMayor()
//simulador de compra interactivo
alert('Hola simule su compra de articulos deportivos y recuerde que con su compra superior o igual a $35.000 le realizaremos un 10% de descuento.')
const comprarProductos = () => {
    let productos = '';
    let precio = 0;
    let cantidad = 0;
    let totalCompra = 0;
    let seguirComprando = false;
    do {
        productos = parseInt (prompt('Bienvenido! ingrese el numero del producto que desea comprar: 1-Campera Puma $16.500, 2-Zapatillas Puma $20.500, 3-Zapatillas nike $22.000, 4-Zapatillas addidas $24.000 . '));
        productos = productoSeleccionado(productos);
        cantidad = parseInt(prompt('Que cantidad desea comprar:'));
        cantidad = cantidadSolicitada(cantidad);
        switch (productos) {
            case 1:
                precio = 16500;
                break;
            case 2:
                precio = 20500;
                break;
            case 3:
                precio = 22000;
                break;
            case 4:
                precio = 24000;
                break;
            default:
                alert('El producto seleccionado no se encuentra en el catalogo.');
                break;
        }
        totalCompra += precio * cantidad;
        seguirComprando = confirm('¿Desea agregar mas productos al carrito?');
    } while (seguirComprando);
    alert('El total de su compra es: $'+totalCompra);
    const totalConDescuento = descuentoCompra(totalCompra);
    alert('Estimado cliente recuerde que si la compra es mayor a $35.000 realizamos un descuento del 10%. Su compra tiene un total de $'+totalConDescuento+' muchas gracias por elegirnos y lo esperamos pronto!');
}

//validar que el cliente seleccione un producto.
const productoSeleccionado = (productos) => {
    while (Number.isNaN(productos) || (productos <= 0) || (productos >=5)) {
        if ((productos >= 0) || (productos >= 5)) {
            alert('Debe ingresar un numero válido en el catalogo.')
        }
            else {
            alert('Debe agregar un número del 1 al 4: 1-Campera Puma $16.500, 2-Zapatillas Puma $20.500, 3-Zapatillas nike $22.000, 4-Zapatillas addidas $24.000.')
        }
        productos = parseInt(prompt('¿Que producto desea del 1 al 4 : 1-Campera Puma $16.500, 2-Zapatillas Puma $20.500, 3-Zapatillas nike $22.000, 4-Zapatillas addidas $24.000?'));
    }
    return productos;
}

//validar que el cliente ingrese una cantidad valida
const cantidadSolicitada = (cantidad) => {
    while (Number.isNaN(cantidad) || cantidad <= 0) {
        if (cantidad <= 0) {
            alert('Debe ingresar una cantidad válida.')
        } else {
            alert('Debe agregar un número.')
        }
        cantidad = parseInt(prompt('¿Cuántos productos queres comprar?'));
    }

    return cantidad;
}

//realizar descuento en compras mayores o iguales a $35000 del 10% de descuento.
const descuentoCompra = (totalCompra) => {
        let totalConDescuento = 0;
        if (totalCompra >= 35000) {
        totalConDescuento = totalCompra * 0.90;
        return totalConDescuento;
        } else {
        return totalCompra;
    }
}
comprarProductos();

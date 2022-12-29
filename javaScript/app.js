
const pintarProductos= () => {
    const contenedor = document.getElementById('producto-contenedor');
    nuestrosProductos.forEach(productos =>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('style');
        div.innerHTML += `
            <img src="${productos.imagen}">
            <div class="card-body">
            <h5 class="card-title">${productos.nombre}</h5>
            <p class="card-text">Talle: ${productos.talle}.</p>
            <p class="card-text">Precio: $${productos.precio}.</p>
            <a href="#" id="${productos.id}" class="btn btn-primary agregar">Comprar</a>
        </div>`
        contenedor.appendChild(div);
        ordenarMenorMayor(nuestrosProductos);
    });
}
//Ordene los productos de menor a mayor.
const ordenarMenorMayor = (nuestrosProductos) =>{
    nuestrosProductos.sort((a, b) => a.precio - b.precio);
};
pintarProductos();


let productosGlobal = [];

async function mostrarProductos(filtro = 'todos') {
    const res = await fetch('/api/products');
    const productos = await res.json();
    productosGlobal = productos;

    // Depuración: muestra las secciones en consola
    console.log('Secciones:', productos.map(p => p.seccion));

    let productosFiltrados = productos;
    if (filtro !== 'todos') {
        productosFiltrados = productos.filter(
            p => (p.categoria || '').trim().toLowerCase() === filtro.trim().toLowerCase()
        );
    }

    const contenedor = document.getElementById('listaProductos');
    contenedor.innerHTML = productosFiltrados.map(p =>
        `<div class="producto">
            <img src="${p.imagenUrl}" alt="${p.nombre}" style="max-width:150px;max-height:150px;">
            <h4>${p.nombre}</h4>
            <p class="descripcion">${p.descripcion}</p>
            <span class="origen">Origen: ${p.origen}</span>
            <span class="existencia">Existencia: ${p.existencia}</span>
            <span class="seccion">Sección: ${p.seccion || ''}</span>
            <p class="precio"><strong>Precio: $${p.precio}</strong></p>
            <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
        </div>`
    ).join('');
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarCarrito() {
    const divCarrito = document.getElementById('carrito');
    if (!divCarrito) return;
    if (carrito.length === 0) {
        divCarrito.innerHTML = "<h3>Carrito vacío</h3>";
        return;
    }
    divCarrito.innerHTML = `
        <h3>Carrito</h3>
        <ul>
            ${carrito.map(item => `<li>${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}</li>`).join('')}
        </ul>
        <button onclick="vaciarCarrito()">Vaciar carrito</button>
    `;
}

function agregarAlCarrito(id) {
    fetch(`/api/products/${id}`)
        .then(res => res.json())
        .then(producto => {
            const existente = carrito.find(item => item.id === producto.id);
            if (existente) {
                existente.cantidad += 1;
            } else {
                carrito.push({ ...producto, cantidad: 1 });
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
        });
}

function vaciarCarrito() {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function filtrarProductos(seccion) {
    mostrarProductos(seccion);
}

window.addEventListener('DOMContentLoaded', () => {
    const usuario = localStorage.getItem('usuario');
    const bienvenida = document.getElementById('bienvenida');
    if (usuario && bienvenida) {
        bienvenida.textContent = `¡Bienvenido, ${usuario}!`;
    }
    mostrarProductos(); // Asegúrate de llamar aquí tu función para mostrar productos
    mostrarCarrito();
    const selectCategoria = document.getElementById('categoria');
    if (selectCategoria) {
        selectCategoria.addEventListener('change', function() {
            const valor = this.value || 'todos';
            filtrarProductos(valor);
        });
    }
});
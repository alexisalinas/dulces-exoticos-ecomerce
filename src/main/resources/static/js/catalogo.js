const productosEjemplo = [
    {
        id: 1,
        nombre: "KitKat Japonés Té Verde",
        descripcion: "Delicioso chocolate KitKat sabor té verde, importado de Japón.",
        precio: 55,
        imagenUrl: "https://m.media-amazon.com/images/I/61wQK4rHnGL._AC_SL1000_.jpg"
    },
    {
        id: 2,
        nombre: "Dulces Pulparindo",
        descripcion: "Tradicional dulce mexicano de tamarindo, picante y dulce.",
        precio: 25,
        imagenUrl: "https://m.media-amazon.com/images/I/81w6v7n1pGL._AC_SL1500_.jpg"
    },
    {
        id: 3,
        nombre: "Pocky Fresa",
        descripcion: "Galletas japonesas cubiertas de chocolate sabor fresa.",
        precio: 40,
        imagenUrl: "https://m.media-amazon.com/images/I/71w8nQwQpGL._AC_SL1500_.jpg"
    },
    {
        id: 4,
        nombre: "Haribo Goldbears",
        descripcion: "Gomitas de osito clásicas, importadas de Alemania.",
        precio: 35,
        imagenUrl: "https://m.media-amazon.com/images/I/81n1kQwQpGL._AC_SL1500_.jpg"
    }
];

let carrito = [];

function cargarProductos() {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = productosEjemplo.map(p => `
        <div class="producto">
            <img src="${p.imagenUrl}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>${p.descripcion}</p>
            <p class="precio">$${p.precio}</p>
            <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
        </div>
    `).join('');
}

function agregarAlCarrito(id) {
    const producto = productosEjemplo.find(p => p.id === id);
    const item = carrito.find(p => p.id === id);
    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    mostrarCarrito();
}

function mostrarCarrito() {
    const div = document.getElementById('carrito');
    if (carrito.length === 0) {
        div.innerHTML = '<h3>Carrito</h3><p>El carrito está vacío.</p>';
        return;
    }
    div.innerHTML = `
        <h3>Carrito</h3>
        ${carrito.map(item =>
            `<div>
                ${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}
                <button onclick="quitarDelCarrito(${item.id})">Quitar</button>
            </div>`
        ).join('')}
        <p><b>Total: $${carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)}</b></p>
        <button onclick="finalizarCompra()">Finalizar compra</button>
        <button onclick="vaciarCarrito()">Vaciar carrito</button>
    `;
}

function quitarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    mostrarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}

function finalizarCompra() {
    alert('¡Gracias por tu compra! (Aquí puedes conectar con tu backend)');
    carrito = [];
    mostrarCarrito();
}

// Inicializa
cargarProductos();
mostrarCarrito();

window.addEventListener('DOMContentLoaded', () => {
    const usuario = localStorage.getItem('usuario');
    const bienvenida = document.getElementById('bienvenida');
    if (usuario) {
        bienvenida.textContent = `Bienvenido, ${usuario}`;
        document.querySelector('.login-btn').textContent = "Cerrar sesión";
        document.querySelector('.login-btn').onclick = () => {
            localStorage.removeItem('usuario');
            window.location.reload();
        };
    } else {
        bienvenida.textContent = "";
    }
});
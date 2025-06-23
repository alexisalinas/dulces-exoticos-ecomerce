let dulces = [
    // Ejemplo inicial, luego puedes cargar desde tu backend
    {
        id: 1,
        nombre: "KitKat Japonés Té Verde",
        descripcion: "Delicioso chocolate KitKat sabor té verde.",
        precio: 55,
        existencia: 10,
        imagenUrl: "https://m.media-amazon.com/images/I/61wQK4rHnGL._AC_SL1000_.jpg"
    }
];

async function mostrarDulces() {
    const contenedor = document.getElementById('listaDulces');
    const res = await fetch('/api/products');
    const dulces = await res.json();

    if (dulces.length === 0) {
        contenedor.innerHTML = "<p>No tienes dulces registrados.</p>";
        return;
    }
    contenedor.innerHTML = dulces.map(d =>
        `<div class="dulce">
            <img src="${d.imagenUrl}" alt="${d.nombre}">
            <div>
                <h4>${d.nombre}</h4>
                <p>${d.descripcion}</p>
                <p>Precio: $${d.precio}</p>
                <p>Existencia: ${d.existencia ?? 'N/A'}</p>
                <button onclick="eliminarDulce(${d.id})">Eliminar</button>
            </div>
        </div>`
    ).join('');
}

document.getElementById('formAgregar').addEventListener('submit', async function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const existencia = parseInt(document.getElementById('existencia').value);
    const imagenUrl = document.getElementById('imagenUrl').value;
    const categoria = document.getElementById('categoria').value; // <-- cambia "seccion" a "categoria"

    const nuevoDulce = {
        nombre,
        descripcion,
        precio,
        existencia,
        imagenUrl,
        origen: "nacional",
        categoria // <-- usa "categoria" aquí
    };

    const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoDulce)
    });
    const text = await response.text();
    console.log('Status:', response.status, 'Respuesta:', text);
    if (response.ok) {
        mostrarDulces();
        this.reset();
    } else {
        alert('Error al guardar el dulce: ' + text);
    }
});

async function eliminarDulce(id) {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    mostrarDulces();
}

// Inicializa
mostrarDulces();

window.addEventListener('DOMContentLoaded', () => {
    const vendedor = localStorage.getItem('vendedor');
    const bienvenida = document.getElementById('bienvenida-vendedor');
    if (vendedor) {
        bienvenida.textContent = `Bienvenido, ${vendedor}`;
    } else {
        // Si no está logueado, redirige al login de vendedor
        window.location.href = "login-vendedor.html";
    }
});

// Código para el formulario de agregar dulce
const formAgregar = `
    <form id="formAgregar">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required>

        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" required></textarea>

        <label for="precio">Precio:</label>
        <input type="number" id="precio" name="precio" step="0.01" required>

        <label for="existencia">Existencia:</label>
        <input type="number" id="existencia" name="existencia" required>

        <label for="imagenUrl">URL de la imagen:</label>
        <input type="text" id="imagenUrl" name="imagenUrl" required>

        <label for="categoria">Sección/Categoría:</label>
        <select id="categoria" name="categoria" required>
            <option value="">Selecciona una</option>
            <option value="dulce">Dulce</option>
            <option value="picante">Picante</option>
            <option value="amargo">Amargo</option>
            <option value="agrio">Agrio</option>
            <option value="inexplicable">Inexplicable</option>
        </select>

        <button type="submit">Agregar Dulce</button>
    </form>
`;

document.getElementById('formularioAgregar').innerHTML = formAgregar;
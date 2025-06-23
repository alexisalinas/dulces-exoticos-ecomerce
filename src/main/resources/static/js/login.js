const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const toggleBtn = document.getElementById('toggleBtn');
const formTitle = document.getElementById('formTitle');
const messageDiv = document.getElementById('message');

// Alternar entre login y registro
toggleBtn.addEventListener('click', () => {
    if (loginForm.style.display !== 'none') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        formTitle.textContent = 'Crear Cuenta';
        toggleBtn.textContent = '¿Ya tienes cuenta? Inicia sesión';
        messageDiv.textContent = '';
    } else {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        formTitle.textContent = 'Iniciar Sesión';
        toggleBtn.textContent = '¿No tienes cuenta? Regístrate';
        messageDiv.textContent = '';
    }
});

// Login
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
    });

    const result = await response.json();
    if (result.success) {
        localStorage.setItem('usuario', result.nombre || username);
        localStorage.setItem('rol', result.rol);
        if (result.rol === "VENDEDOR") {
            window.location.href = "vendedor.html";
        } else {
            window.location.href = "index.html";
        }
    } else {
        messageDiv.style.color = 'red';
        messageDiv.textContent = 'Usuario o contraseña incorrectos.';
    }
});

// Registro
registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    // Aquí conecta con tu backend
    messageDiv.style.color = 'green';
    messageDiv.textContent = '¡Registro simulado!';
    toggleBtn.click();
});
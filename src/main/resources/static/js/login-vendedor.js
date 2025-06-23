const loginFormV = document.getElementById('loginFormVendedor');
const messageV = document.getElementById('messageV');

// Credenciales aleatorias (puedes cambiarlas)
const USUARIO_VENDEDOR = "vendedor1";
const PASSWORD_VENDEDOR = "dulces2024";

loginFormV.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('usernameV').value;
    const password = document.getElementById('passwordV').value;

    if (username === USUARIO_VENDEDOR && password === PASSWORD_VENDEDOR) {
        localStorage.setItem('vendedor', username);
        window.location.href = "vendedor.html";
    } else {
        messageV.style.color = 'red';
        messageV.textContent = 'Usuario o contraseña incorrectos.';
    }
});
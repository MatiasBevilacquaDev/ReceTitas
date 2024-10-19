document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });

            const result = await response.json();

            if (result.success) {
                // Si el login es exitoso, redirige al usuario a index.html
                window.sessionStorage.setItem(
                    "session",
                    JSON.stringify({ id: result.id})
                );
                window.location.href="/recetas"
            } else {
                // Muestra un mensaje de error si el login falla
                alert(result.message);
            }
        } catch (error) {
            console.error('Error durante el login:', error);
            alert('Error al intentar iniciar sesión. Inténtalo de nuevo.');
        }
    });
});

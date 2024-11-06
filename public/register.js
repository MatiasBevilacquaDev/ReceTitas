document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;

        window.location.href = "/login";

        try {
            const response = await fetch('/register-sv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });
        } catch (error) {
            console.error('Error durante el registro:', error);
            alert('Error al intentar registrarse. Inténtalo de nuevo.');
        }
    });
});
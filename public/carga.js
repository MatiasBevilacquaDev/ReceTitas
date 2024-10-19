document.addEventListener('DOMContentLoaded', function() {
    validarSession();
});

document.getElementById('recipeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const ingredients = document.getElementById('ingredients').value;
    const preparation = document.getElementById('preparation').value;
    const user_id = JSON.parse(window.sessionStorage.getItem('session')).id;

    console.log('Enviando datos:', { name, ingredients, preparation, user_id });

    fetch('/agregar-receta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, ingredients, preparation, user_id })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Red error: ' + response.statusText);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('resultado').textContent = 'Ocurrió un error al intentar agregar la receta.';
        });

    document.getElementById('recipeForm').reset();
});

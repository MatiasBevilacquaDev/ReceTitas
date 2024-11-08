document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const recetasContainer = document.getElementById('recetas-container');

    let recetas = [];

    fetch('http://localhost:3000/recetasMostrar')
        .then(response => response.json())
        .then(data => {
            recetas = data.recetas;
            displayRecetas(recetas);
        })
        .catch(error => console.error('Error fetching recetas:', error));

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredRecetas = recetas.filter(receta => {
            return (
                receta.name.toLowerCase().includes(searchTerm) ||
                receta.ingredients.toLowerCase().includes(searchTerm) ||
                receta.preparation.toLowerCase().includes(searchTerm)
            );
        });
        displayRecetas(filteredRecetas);
    });

    function displayRecetas(recetas) {
        recetasContainer.innerHTML = '';
        recetas.forEach(receta => {
            const recetaElement = document.createElement('div');
            recetaElement.classList.add('receta');
            recetaElement.innerHTML = `
                <h2>${receta.name}</h2>
                <p>Ingredientes: ${receta.ingredients}</p>
                <p>Preparación: ${receta.preparation}</p>
            `;
            recetasContainer.appendChild(recetaElement);
        });
    }
});
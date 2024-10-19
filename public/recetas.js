document.addEventListener('DOMContentLoaded', function() {
    fetch('/recetasMostrar')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const recetasContainer = document.getElementById('recetas-container');
                data.recetas.forEach(receta => {
                    const recetaDiv = document.createElement('div');
                    recetaDiv.classList.add('receta');
                    recetaDiv.innerHTML = `
                        <div class="Nombre">${receta.name}</div>
                        <div class="Ingredientes">${receta.ingredients}</div>
                        <div class="Preparacion">${receta.preparation}</div>                    `;
                    recetasContainer.appendChild(recetaDiv);
                });
            } else {
                console.error('Error al cargar las recetas:', data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.addEventListener('DOMContentLoaded', function() {
    const rol = validarAdmin();
    fetch('/recetas-admin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const recetasContainer = document.getElementById('recetas-container');
                recetasContainer.innerHTML = '';
                console.log(data.recetas);
                data.recetas.forEach(receta => {
                    const recetaDiv = document.createElement('div');
                    recetaDiv.classList.add('receta');
                    recetaDiv.innerHTML = `
                        <div class="receta-id">ID Receta: ${receta.id}</div>
                        <div class="receta-name">Nombre: ${receta.name}</div>
                        <div class="receta-ingredients">Ingredientes: ${receta.ingredients}</div>
                        <div class="receta-preparation">Preparación: ${receta.preparation}</div>
                        <div class="recetas-actions">
                            <button class="btn-anular" data-id="${receta.id}">Anular</button>
                        </div>
                    `;
                    recetasContainer.appendChild(recetaDiv);
                });

                const anularButtons = document.querySelectorAll('.btn-anular');
                anularButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const recetaId = this.getAttribute('data-id');
                        fetch(`/borrar-receta/${recetaId}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    this.closest('.receta').remove(); // Eliminar la receta del DOM
                                } else {
                                    console.error('Error al anular la receta:', data.message);
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    });
                });
            } else {
                console.error('Error al cargar las recetas:', data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
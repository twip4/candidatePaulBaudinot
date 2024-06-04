window.onload = function() {
    const pageLang = document.documentElement.lang || 'en';
    fetch('recipe.json')
        .then((res) => res.json())
        .then(data => {
            let ingredientsHtml = '<h3>Ingrédients</h3><div class="row">';
            for (let ingredient of data.ingredients) {
                console.log(pageLang);
                let name;
                if (pageLang in ingredient.translated_name[0]) {
                    name = ingredient.translated_name[0][pageLang];
                } else {
                    name = ingredient.name;
                }

                ingredientsHtml += '<div class="col-md-4">';
                ingredientsHtml += '<div class="ingredient-item">';
                ingredientsHtml += '<div class="ingredient-picture">';
                ingredientsHtml += `<img src="pictures/${ingredient.picture}" alt="${ingredient.name}">`;
                ingredientsHtml += '</div>';
                ingredientsHtml += '<div class="ingredient-info">';
                ingredientsHtml += `<span>${ingredient.quantity} ${ingredient.unit}</span>`;
                ingredientsHtml += `<span> de ${name}</span>`;
                ingredientsHtml += '</div>';
                ingredientsHtml += '</div>';
                ingredientsHtml += '</div>';
            }
            ingredientsHtml += '</div>';

            let timingHtml = `<div class="time-box">`;
            timingHtml += `<div class="time_total"><span>Temps total</span><div>${data.timing.total.quantity > 60 ? MinutesToHours(data.timing.total.quantity) : data.timing.total.quantity + ' ' + data.timing.total.unit}</div></div>`;
            timingHtml += `<div class="time_details"><div><span>Temps de préparation</span><p>${data.timing.preparation.quantity > 60 ? MinutesToHours(data.timing.preparation.quantity) : data.timing.preparation.quantity + ' ' + data.timing.preparation.unit}</p></div>`;
            timingHtml += `<div><span>Temps de repos</span><p>${data.timing.rest.quantity > 60 ? MinutesToHours(data.timing.rest.quantity) : data.timing.rest.quantity + ' ' + data.timing.rest.unit}</p></div>`;
            timingHtml += `<div><span>Temps de cuisson</span><p>${data.timing.cooking.quantity > 60 ? MinutesToHours(data.timing.cooking.quantity) : data.timing.cooking.quantity + ' ' + data.timing.cooking.unit}</p></div></div>`;
            timingHtml += `</div>`;

            let stepsHtml = '<h3>Étapes</h3>';
            for (let step of data.steps) {
                stepsHtml += '<div class="step-item">';
                stepsHtml += `<span>${step.order})</span>`;
                stepsHtml += '<div>';
                for (let ingredient of step.ingredients) {
                    stepsHtml += `<img src="pictures/${data.ingredients.find(ingredientObj => ingredientObj.id === ingredient).picture}" alt="${data.ingredients.find(ingredientObj => ingredientObj.id === ingredient).name}">`;
                }
                stepsHtml += '</div>';
                stepsHtml += `<p>${step.description}</p>`;
                stepsHtml += '</div>';
            }

            const container = document.querySelector('.container');

            container.innerHTML = container.innerHTML.replace('REPLACEME', ingredientsHtml + timingHtml + stepsHtml);
        })
        .catch((error) =>
            console.error("Unable to fetch data:", error)
        );
};

function MinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if(remainingMinutes === 0) {
        return `${hours}h`;
    }
    return `${hours}h${remainingMinutes}`;
}
window.onload = function() {
    const pageLang = document.documentElement.lang || 'en';
    fetch('recipe.json')
        .then((res) => res.json())
        .then(data => { console.log(data) })
        .catch((error) =>
            console.error("Unable to fetch data:", error)
        );
};
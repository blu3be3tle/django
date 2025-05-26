document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    let searchInput = document.getElementById('searchInput');
    let searchBtn = document.getElementById('searchBtn');
    let mealItemsDiv = document.getElementById('mealItems');
    let notFound = document.getElementById('notFound');
    let detailsCard = document.getElementById('detailsCard');
    let detailsImage = document.getElementById('detailsImage');
    let detailsTitle = document.getElementById('detailsTitle');
    let detailsCategory = document.getElementById('detailsCategory');
    let detailsArea = document.getElementById('detailsArea');
    let detailsDescription = document.getElementById('detailsDescription');


    async function fetchMeals(query) {

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        const meals = data.meals || [];
        displayMeals(meals);

    }


    function displayMeals(meals) {
        mealItemsDiv.innerHTML = '';
        notFound.style.display = meals.length == 0 ? 'block' : 'none';
        for (let i = 0; i < meals.length; i++) {
            let meal = meals[i];
            let card = document.createElement('div');
            card.className = 'col-md-3 mb-4 meal-card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="card bg-secondary text-white">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => showDetails(meal));
            mealItemsDiv.appendChild(card);
        }
    }

    function showDetails(meal) {
        detailsCard.style.display = 'block';
        detailsImage.src = meal.strMealThumb;
        detailsImage.alt = meal.strMeal;
        detailsTitle.textContent = meal.strMeal;
        detailsCategory.textContent = `Category: ${meal.strCategory || 'N/A'}`;
        detailsArea.textContent = `Area: ${meal.strArea || 'N/A'}`;
        detailsDescription.textContent = `Description: ${meal.strInstructions ? meal.strInstructions.slice(0, 200) + '...' : 'No description available'}`;
    }


    searchBtn.addEventListener('click', () => {
        let searchTerm = searchInput.value.trim();
        if (searchTerm) {
            detailsCard.style.display = 'none';
            fetchMeals(searchTerm);
        }
    });
});
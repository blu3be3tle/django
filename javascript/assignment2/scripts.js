document.addEventListener('DOMContentLoaded', () => {
    let foodItemsDiv = document.getElementById('foodItems');
    let searchInput = document.getElementById('searchInput');
    let searchBtn = document.getElementById('searchBtn');
    let notFound = document.getElementById('notFound');
    let selectedItemsList = document.getElementById('selectedItems');
    let itemCountSpan = document.getElementById('itemCount');
    let modalBody = document.getElementById('modalBody');

    let selectedItems = [];
    let itemCount = 0;


    async function fetchFoodItems(query = '') {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        const meals = data.meals || [];
        displayFoodItems(meals);

    }


    function displayFoodItems(meals) {
        foodItemsDiv.innerHTML = '';
        notFound.style.display = meals.length == 0 ? 'block' : 'none';

        for (let i = 0; i < meals.length; i++) {
            let meal = meals[i];
            let shortInstructions = meal.strInstructions ? meal.strInstructions.slice(0, 15) + '...' : 'No details...';
            let card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                <div class="card bg-light text-black">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">Category: ${meal.strCategory || 'N/A'}</p>
                        <p class="card-text">Details: ${shortInstructions}</p>
                        <button class="btn btn-outline-dark me-2 add-to-group" data-name="${meal.strMeal}">Add to Group</button>
                        <button class="btn btn-outline-success details-btn" data-json='${JSON.stringify(meal)}'>Details</button>
                    </div>
                </div>
            `;
            foodItemsDiv.appendChild(card);
        }


        let addButtons = document.getElementsByClassName('add-to-group');
        for (let btn of addButtons) {
            btn.addEventListener('click', function () {
                addToGroup(this.dataset.name);
            });
        }
        let detailsButtons = document.getElementsByClassName('details-btn');
        for (let btn of detailsButtons) {
            btn.addEventListener('click', function () {
                showDetails(JSON.parse(this.dataset.json));
            });
        }
    }


    function addToGroup(name) {
        if (selectedItems.length >= 7) {
            alert('Cannot add more than 7 items!');
            return;
        }
        selectedItems.push(name);
        itemCount++;
        itemCountSpan.textContent = itemCount;
        let li = document.createElement('li');
        li.className = 'list-group-item bg-secondary text-white';
        li.textContent = name;
        selectedItemsList.appendChild(li);
    }


    function showDetails(meal) {
        modalBody.innerHTML = `
            <img src="${meal.strMealThumb}" class="img-fluid mb-3" alt="${meal.strMeal}">
            <p><strong>Name:</strong> ${meal.strMeal}</p>
            <p><strong>Category:</strong> ${meal.strCategory || 'N/A'}</p>
            <p><strong>Instructions:</strong> ${meal.strInstructions || 'No instructions'}</p>
            <p><strong>Area:</strong> ${meal.strArea || 'N/A'}</p>
            <p><strong>Ingredient 1:</strong> ${meal.strIngredient1 || 'N/A'}</p>
        `;
        let modal = new bootstrap.Modal(document.getElementById('detailsModal'));
        modal.show();
    }


    searchBtn.addEventListener('click', function () {
        let searchTerm = searchInput.value.trim();
        fetchFoodItems(searchTerm);
    });


    fetchFoodItems();
});
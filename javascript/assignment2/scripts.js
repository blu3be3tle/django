document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    let productItemsDiv = document.getElementById('productItems');
    let searchInput = document.getElementById('searchInput');
    let searchBtn = document.getElementById('searchBtn');
    let notFound = document.getElementById('notFound');
    let selectedItemsList = document.getElementById('selectedItems');
    let itemCountSpan = document.getElementById('itemCount');
    let modalBody = document.getElementById('modalBody');

    let selectedItems = [];
    let itemCount = 0;

    // Fetch products from api
    async function fetchProducts(query = '') {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        let products = data.products || [];
        if (query) {
            products = products.filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
        }
        displayProducts(products);

    }

    // Display products
    function displayProducts(products) {
        productItemsDiv.innerHTML = '';
        notFound.style.display = products.length == 0 ? 'block' : 'none';
        for (let i = 0; i < products.length; i++) {
            let product = products[i];
            let shortDescription = product.description ? product.description.slice(0, 15) + '...' : 'No details...';
            let card = document.createElement('div');
            card.className = 'col-md-6 mb-4';
            card.innerHTML = `
                <div class="card bg-light text-black">
                    <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">Category: ${product.category || 'N/A'}</p>
                        <p class="card-text">Details: ${shortDescription}</p>
                        <button class="btn btn-outline-dark me-2 add-to-group" data-name="${product.title}">Add to Group</button>
                        <button class="btn btn-outline-success details-btn" data-json='${JSON.stringify(product)}'>Details</button>
                    </div>
                </div>
            `;
            productItemsDiv.appendChild(card);
        }

        // Add event listeners
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

    // Add to Group
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

    // Show details in modal
    function showDetails(product) {
        modalBody.innerHTML = `
            <img src="${product.thumbnail}" class="img-fluid mb-3" alt="${product.title}">
            <p><strong>Name:</strong> ${product.title}</p>
            <p><strong>Category:</strong> ${product.category || 'N/A'}</p>
            <p><strong>Description:</strong> ${product.description || 'No description'}</p>
            <p><strong>Price:</strong> $${product.price || 'N/A'}</p>
            <p><strong>Brand:</strong> ${product.brand || 'N/A'}</p>
        `;
        let modal = new bootstrap.Modal(document.getElementById('detailsModal'));
        modal.show();
    }

    // Search functionality
    searchBtn.addEventListener('click', function () {
        let searchTerm = searchInput.value.trim();
        fetchProducts(searchTerm);
    });

    // Load Default Items
    fetchProducts();
});
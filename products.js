

let products = JSON.parse(localStorage.getItem("products")) || [];

// Check if products exist
if (!products) {
    console.error("No products found in localStorage");
}

// Retrieve cart items from localStorage
let checkoutItems = JSON.parse(localStorage.getItem('checkout')) || [];

// Display cart count
document.querySelector('[counter]').textContent = checkoutItems.length || 0;

// Show spinner
function showSpinner() {
    document.getElementById("loadingSpinner").style.display = "block";
}

// Hide spinner
function hideSpinner() {
    document.getElementById("loadingSpinner").style.display = "none";
}

// Add to cart function
function addToCart(product) {
    checkoutItems.push(product);
    localStorage.setItem('checkout', JSON.stringify(checkoutItems));
    document.querySelector('[counter]').textContent = checkoutItems.length;
}

// Function to redirect to the cart page
function redirectToCart() {
    // Redirect to the cart page (replace "cart.html" with your actual cart page URL)
    window.location.href = "../pages/cart.html";
}

// Example function to display products
function displayProducts(products) {
    const content = document.getElementById('product-container');
    if (!content) return;

    content.innerHTML = ''; // Clear previous content
    let modalContainer = document.getElementById("artworkModals");
    modalContainer.innerHTML = ''; // Clear previous modals

    products.forEach(product => {
        content.innerHTML += `
            <div class="col-lg-3 col-md-6">
                <div class="framework rounded-1">
                    <img src='${product.artwork_Img}'>
                    <div class="textContent text-center">
                        <h4 class="mt-3">${product.artwork_Name}</h4>
                        <h5>By: ${product.artwork_Artist}</h5>
                        <h5>Price: $${product.artwork_Price}</h5>
                        <div class="btn-card mb-2">
                            <button class="shattered-glass-button" data-bs-toggle="modal" data-bs-target="#modal${product.id}">${product.button_View}</button>
                            <button type="button" class="shattered-glass-button" onclick='addToCart(${JSON.stringify(product)})'>${product.button_Add}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        modalContainer.innerHTML += `
        <div class="modal fade text-center" id="modal${product.id}" tabindex="-1" aria-labelledby="modalLabel${product.id}" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalLabel${product.id}">${product.artwork_Name} by ${product.artwork_Artist}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <img class="modal-img" src="${product.artwork_Img}" alt="${product.artwork_Name}" class="img-fluid">
                <p>${product.artwork_Description}</p>
                <p><strong>Price:</strong> $${product.artwork_Price}</p>
                <p><strong>Theme:</strong> ${product.artwork_Theme}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#modal${products[(product.id + 1) % products.length].id}">Next</button>
                <a href="products.html" class="btn btn-secondary">Go to Products Page</a>
              </div>
            </div>
          </div>
        </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    showSpinner();
    displayProducts(products);
    hideSpinner();
});

// Search function
document.getElementById('searchInput').addEventListener('input', function() {
    showSpinner();
    const searchTerm = this.value.toLowerCase();
    const filteredProducts = products.filter(product => {
        return product.artwork_Name.toLowerCase().includes(searchTerm) ||
               product.artwork_Artist.toLowerCase().includes(searchTerm);
    });
    displayProducts(filteredProducts);
    hideSpinner();
});

// Sort function
document.getElementById('sortSelect').addEventListener('change', function() {
    showSpinner();
    const sortBy = this.value;
    let sortedProducts;
    if (sortBy === 'default') {
        sortedProducts = products.slice().sort((a, b) => a.id - b.id);
    } else if (sortBy === 'name') {
        sortedProducts = products.slice().sort((a, b) => a.artwork_Name.localeCompare(b.artwork_Name));
    } else if (sortBy === 'priceDes') {
        sortedProducts = products.slice().sort((a, b) => b.artwork_Price - a.artwork_Price);
    } else if (sortBy === 'priceAsc') {
        sortedProducts = products.slice().sort((a, b) => a.artwork_Price - b.artwork_Price);
    }
    displayProducts(sortedProducts);
    hideSpinner();
});

//   Date on footer
document.querySelector("[current-year]").textContent =
  new Date().getUTCFullYear();
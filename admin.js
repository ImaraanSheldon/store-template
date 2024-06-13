  
let products = JSON.parse(localStorage.getItem("products")) || [];

function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

function displayProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="text" class="form-control" id="productImg${index}" value="${product.artwork_Img}" required></td>
            <td><input type="text" class="form-control" id="productName${index}" value="${product.artwork_Name}" required></td>
            <td><input type="text" class="form-control" id="productArtist${index}" value="${product.artwork_Artist}" required></td>
            <td><input type="number" class="form-control" id="productPrice${index}" value="${product.artwork_Price}" required></td>
            <td><textarea class="form-control" id="productDescription${index}" required>${product.artwork_Description}</textarea></td>
            <td><input type="text" class="form-control" id="productTheme${index}" value="${product.artwork_Theme}" required></td>
            <td><input type="text" class="form-control" id="productTarget${index}" value="${product.artwork_Target}" required></td>
            <td class="d-flex py-4">
                <button class="btn btn-success me-1" onclick="updateProduct(${index})">Update</button>
                <button class="btn btn-danger" onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
        productList.appendChild(row);
    });
}

function addProduct(img, name, artist, price, description, theme, target) {
    const newProduct = {
        id: products.length + 1,
        artwork_Img: img,
        artwork_Name: name,
        artwork_Artist: artist,
        artwork_Description: description,
        artwork_Price: parseFloat(price),
        artwork_Theme: theme,
        artwork_Target: target,
        button_View: "View Artwork",
        button_Add: "Add to Cart",
    };
    products.push(newProduct);
    saveProducts();
    displayProducts();
}

function updateProduct(index) {
    const productImg = document.getElementById(`productImg${index}`).value.trim();
    const productName = document.getElementById(`productName${index}`).value.trim();
    const productArtist = document.getElementById(`productArtist${index}`).value.trim();
    const productPrice = document.getElementById(`productPrice${index}`).value.trim();
    const productDescription = document.getElementById(`productDescription${index}`).value.trim();
    const productTheme = document.getElementById(`productTheme${index}`).value.trim();
    const productTarget = document.getElementById(`productTarget${index}`).value.trim();

    if (!productName || !productArtist || !productPrice || !productDescription || !productTheme || !productTarget) {
        alert("Please fill in all fields.");
        return;
    }

    products[index].artwork_Img = productImg;
    products[index].artwork_Name = productName;
    products[index].artwork_Artist = productArtist;
    products[index].artwork_Price = parseFloat(productPrice);
    products[index].artwork_Description = productDescription;
    products[index].artwork_Theme = productTheme;
    products[index].artwork_Target = productTarget;

    saveProducts();
    displayProducts();
}

function deleteProduct(index) {
    if (confirm("Are you sure you want to delete this product?")) {
        products.splice(index, 1);
        saveProducts();
        displayProducts();
    }
}

document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const productImg = document.getElementById("productImg").value.trim();
    const productName = document.getElementById("productName").value.trim();
    const productArtist = document.getElementById("productArtist").value.trim();
    const productPrice = document.getElementById("productPrice").value.trim();
    const productDescription = document.getElementById("productDescription").value.trim();
    const productTheme = document.getElementById("productTheme").value.trim();
    const productTarget = document.getElementById("productTarget").value.trim();

    if (!productImg || !productName || !productArtist || !productPrice || !productDescription || !productTheme || !productTarget) {
        alert("Please fill in all fields.");
        return;
    }

    addProduct(productImg, productName, productArtist, productPrice, productDescription, productTheme, productTarget);
    
    $('#addProductModal').modal('hide');
    document.getElementById("productForm").reset();
});

displayProducts();
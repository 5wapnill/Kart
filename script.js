let catagories = ['Smartphone', 'Laptop', 'Automobile', 'Watch'];
let catContainer = document.querySelector('.catagories');
const totalProducts = ['smartphones', 'laptops', 'motorcycle', 'mens-watches'];
let cart = document.querySelector('.cartBtn');
let all = [];
let allProducts = []; // Store all products for cart access

showCatagories();
showProducts();
showCartButton(all);

// Cart elements
const cartPage = document.querySelector('.cartPage');
const cartItemsContainer = document.querySelector('.cartItems');
const totalElement = document.querySelector('.total');
const closeCart = document.querySelector('.closeCart');

// Toggle cart visibility
cart.addEventListener('click', () => {
    cartPage.classList.add('active');
    renderCartItems();
});

closeCart.addEventListener('click', () => {
    cartPage.classList.remove('active');
});

function cartQuantity(all) {
    for (let i = 0; i < all.length - 1; i++) {
        for (let j = i + 1; j < all.length; j++) {
            if (all[i].id === all[j].id) {
                all.splice(i, 1);
                i--;
                break;
            }
        }
    }
}

function showCartButton(all) {
    if (all.length == 0) {
        cart.style.display = 'none';
    }
    else {
        cart.style.display = 'flex';
        let totalItem = 0;
        const cartQuantity = document.querySelector('.cartQuantity');
        cartQuantity.innerHTML = '';
        all.forEach(item => {
            totalItem += item.quantity;
        })
        cartQuantity.innerText = totalItem;
    }
}

// function to show svg per catagory
function showCatagories() {
    catagories.forEach((item, index) => {
        const cat = document.createElement('div');
        cat.className = 'cat';
        cat.innerHTML = `
        <a href="#${totalProducts[index]}">
            <img src="assets/svg/${item}.svg" width="40vw">
            <h5>${item}</h5>
        </a>
    `;
        catContainer.append(cat);
    });
}

// function to load product card + add to cart function
function showProducts() {
    const Products = document.querySelector('.products');
    Products.innerHTML = '';

    totalProducts.forEach(category => {
        // adding section per catagory
        const section = document.createElement('div');
        section.id = category.toLowerCase();
        section.className = 'product-section';

        // adding heading per catagory
        const heading = document.createElement('h2');
        heading.className = 'section-heading';
        heading.textContent = category;
        section.appendChild(heading);

        // adding inner section per catagory
        const productContainer = document.createElement('div');
        productContainer.className = 'product-container';
        section.appendChild(productContainer);

        // loading product card
        fetch(`https://dummyjson.com/products/category/${category}?limit=6`)
            .then(res => res.json())
            .then(data => {
                data.products.forEach(product => {
                    // Store product for cart access
                    allProducts.push(product);
                    
                    const pContainer = document.createElement('div');
                    pContainer.className = 'pdiv';
                    pContainer.innerHTML = `
                        <img src="${product.images[0]}"/>
                        <div class="title">
                        ${product.title.toUpperCase()}
                        </div>
                        <div class="price">
                        ${Math.floor(product.price * 90)}₹
                        </div>
                        <div class="atc" id="${product.id}">Add to cart</div>
                    `;
                    productContainer.appendChild(pContainer);

                    // add to cart button function 
                    atcFunction(pContainer);
                });
            });
        Products.appendChild(section);
    });
}

// function for add-to-cart button 
function atcFunction(pContainer) {
    const atc = pContainer.querySelector('.atc');
    const id = atc.id;

    atc.addEventListener('click', function(e) {
        if (e.target.classList.contains('plus')) {
            updateCartItem(id, 1);
        } else if (e.target.classList.contains('minus')) {
            updateCartItem(id, -1);
        } else {
            updateCartItem(id, 1);
        }
    });
}

// Update cart item function
function updateCartItem(id, change) {
    // Find existing item
    let item = all.find(item => item.id === id);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            // Remove item if quantity is 0 or less
            all = all.filter(i => i.id !== id);
        }
    } else if (change > 0) {
        // Add new item
        all.push({ id, quantity: 1 });
    }
    
    // Update UI
    showCartButton(all);
    updateProductCardButton(id);
    
    // Update cart page if open
    if (cartPage.classList.contains('active')) {
        renderCartItems();
    }
}

// Update product card button display
function updateProductCardButton(id) {
    const button = document.querySelector(`.atc[id="${id}"]`);
    if (!button) return;
    
    const item = all.find(i => i.id === id);
    const quantity = item ? item.quantity : 0;
    
    if (quantity <= 0) {
        button.innerHTML = 'Add to Cart';
        button.style.backgroundColor = 'rgba(189, 189, 189, 0.342)';
        button.style.color = 'black';
    } else {
        button.innerHTML = `
            <div class="inDiv minus">-</div>
            <div class="inDiv">${quantity}</div>
            <div class="inDiv plus">+</div>
        `;
        button.style.backgroundColor = 'black';
        button.style.color = 'white';
    }
}

// Function to render cart items
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    // Group items by ID
    const groupedItems = {};
    all.forEach(item => {
        if (groupedItems[item.id]) {
            groupedItems[item.id].quantity += item.quantity;
        } else {
            groupedItems[item.id] = {...item};
        }
    });
    
    // Render each item
    Object.values(groupedItems).forEach(item => {
        const product = allProducts.find(p => p.id == item.id);
        if (!product) return;
        
        const itemTotal = Math.floor(product.price * 90) * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cartItem';
        cartItem.innerHTML = `
            <img src="${product.images[0]}" alt="${product.title}">
            <div class="cartItemInfo">
                <div class="cartItemTitle">${product.title}</div>
                <div class="cartItemPrice">${Math.floor(product.price * 90)}₹ × ${item.quantity}</div>
                <div class="cartItemControls">
                    <button class="removeItem" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="addItem" data-id="${item.id}">+</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    totalElement.textContent = `Total: ${total}₹`;
    
    // Add event listeners to control buttons
    document.querySelectorAll('.addItem').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            updateCartItem(id, 1);
        });
    });
    
    document.querySelectorAll('.removeItem').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            updateCartItem(id, -1);
        });
    });
}
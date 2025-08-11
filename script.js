let catagories = ['Smartphone', 'Laptop', 'Automobile', 'Watch'];
let catContainer = document.querySelector('.catagories');
const totalProducts = ['smartphones', 'laptops', 'motorcycle', 'mens-watches'];
// const totalProducts = ['smartphones'];

showCatagories();
showProducts();




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

function showProducts() {
    const Products = document.querySelector('.products');
    Products.innerHTML = '';

    totalProducts.forEach(category => {
        const section = document.createElement('div');
        section.id = category.toLowerCase();
        section.className = 'product-section';
        
        const heading = document.createElement('h2');
        heading.className = 'section-heading';
        heading.textContent = category;
        section.appendChild(heading);

        const productContainer = document.createElement('div');
        productContainer.className = 'product-container';
        section.appendChild(productContainer);

        fetch(`https://dummyjson.com/products/category/${category}?limit=6`)
            .then(res => res.json())
            .then(data => {
                data.products.forEach(product => {
                    const pContainer = document.createElement('div');
                    pContainer.className = 'pdiv';
                    pContainer.innerHTML = `
                        <img src="${product.images[0]}"/>
                        <div class="title">
                        ${product.title.toUpperCase()}
                        </div>
                        <div class="price">
                        ${Math.floor(product.price*90)}₹
                        </div>
                        <div class="atc" data-id="${product.id}">Add to cart</div>
                    `;
                    productContainer.appendChild(pContainer);

                    atcFunction(pContainer);
                });
            });
        Products.appendChild(section);
    });
}

function atcFunction(pContainer) {
    
                    const atc = pContainer.querySelector('.atc');
                    let quantity = 0;

                    atc.addEventListener('click', function(e) {
                        const clickedElement = e.target;
                        
                        if (clickedElement.classList.contains('plus')) {
                            updateCart(this, quantity + 1);
                        } 
                        else if (clickedElement.classList.contains('minus')) {
                            updateCart(this, quantity - 1);
                        }
                        else if (quantity === 0) {
                            updateCart(this, 1);
                        }
                    });

                    function updateCart(button, qty) {
                        quantity = qty;
                        if(quantity <= 0) {
                            button.innerHTML = 'Add to Cart';
                            atc.style.backgroundColor = 'rgba(189, 189, 189, 0.342)';
                            atc.style.color = 'black';
                        } else {
                            button.innerHTML = `
                                <div class="inDiv minus">-</div>
                                <div class="inDiv">${quantity}</div>
                                <div class="inDiv plus">+</div>
                            `;
                            atc.style.backgroundColor = 'black';
                            atc.style.color = 'white';
                            
                        }
                    }
}
let catagories = ['Smartphone', 'Laptop', 'Automobile', 'Watch'];
let catContainer = document.querySelector('.catagories');
let searchbar = document.querySelector(".searchBar");
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
            searchbar.placeholder = `eg. ${data.products[0].title}`;

            data.products.forEach(product => {
                const pContainer = document.createElement('div');
                pContainer.className = 'pdiv';
                pContainer.innerHTML = `
                    <img src="${product.images[0]}"/>
                    <div class = "title">
                    ${product.title.toUpperCase()}
                    </div>
                    <div class = "price">
                    ${Math.floor(product.price*90)}₹
                    </div>
                    <button>Add to cart</button>
                `;
                productContainer.appendChild(pContainer);
            });
        });
    Products.appendChild(section);
});
}
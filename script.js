let catagories = ['Smartphone', 'Laptop', 'Automobile', 'Watch'];
let catContainer = document.querySelector('.catagories');
let searchbar = document.querySelector(".searchBar");
const totalProducts = ['smartphones', 'laptops', 'motorcycle', 'mens-watches'];

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

    fetch(`https://dummyjson.com/products/category/${category}?limit=4`)
        .then(res => res.json())
        .then(data => {
            searchbar.placeholder = `eg. ${data.products[0].title}`;

            data.products.forEach(product => {
                const pContainer = document.createElement('div');
                pContainer.className = 'pdiv';
                pContainer.innerHTML = `
                    <img src="${product.images[0]}"/>
                    ${product.title}
                    <br>
                    ${product.price}$
                `;
                productContainer.appendChild(pContainer);
            });
        });
    Products.appendChild(section);
});
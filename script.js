let catagories = ['Smartphone', 'Laptop', 'Automobile', 'Watch'];
let catContainer = document.querySelector('.catagories');


let searchbar = document.querySelector(".searchBar");

catagories.forEach(item => {
    const cat = document.createElement('div');
    cat.className = 'cat';
    cat.innerHTML =
    `
    <img src="assets/svg/${item}.svg" width="40vw">
    <h5>${item}</h5>
    `;
    catContainer.append(cat);
});

// trying to fetch data and create element
const Products = document.querySelector('.products');

const totalProducts = ['Smartphones', 'Laptops', 'Motorcycle'];

totalProducts.forEach(item => {

fetch(`https://dummyjson.com/products/category/${item}?limit=3`)
    .then(res => res.json())
    .then(result => {
        data = result;
        searchbar.placeholder = `eg. ${data.products[0].title}`;
        
        data.products.forEach(item => {
            const pContainer = document.createElement('div');
            pContainer.className = 'pdiv';
            pContainer.innerHTML =
            `
            <img src="${item.images[0]}"/>
            ${item.title}
            <br>
            ${item.price}$
            `
            Products.append(pContainer);
        })
    });
});
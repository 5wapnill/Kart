let searchbar = document.querySelector(".searchBar");
console.log(searchbar);
searchbar.placeholder = 'ram'



let catagories = ['Smartphone','Laptop','Automobile','Watch'];
let catContainer = document.querySelector('.catagories');

catagories.forEach(item => {
    const cat = document.createElement('div');
    cat.className = 'cat';
    cat.innerHTML = 
    `
    <img src="assets/svg/${item}.svg" width="100vw">
    <h3>${item}</h3>
    `;
    catContainer.append(cat);
});
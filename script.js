let catagories = ['Smartphone','Laptop','Automobile','Watch'];
let catContainer = document.querySelector('.catagories');


let searchbar = document.querySelector(".searchBar");
console.log(searchbar);
searchbar.placeholder = `eg. `




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
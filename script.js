const container = document.querySelector('.product-container');
// https://course-api.com/javascript-store-products/
const productsApi = "https://course-api.com/javascript-store-products";
const searchInput = document.querySelector('.search-input');
const rangeInput = document.querySelector('.range-input');

const items = [];
const fetchProducts = async() => {
    container.innerHTML = `<div class="loading"></div>`;
    try{ 
        const res =  await fetch(productsApi);
        const data =  await res.json();
        items.push(...data);
        renderHTML(data)
    }catch(error){

        container.innerHTML = `<p>Somthing went wrong</p>`;
    }
}

fetchProducts();

function capitalString(word){
    const words = word.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    
    words.join(" ");
    return words;
}

function renderHTML(data){
  const products = data.map((product) => {
    const {id , name:title , price } = product.fields;
    const {url : img} = product.fields.image[0];
    const formatPrice = price / 100;
    return `<div class="product">
            <div class="product-image">
            <img src=${img} alt="">
          </div>
            <div class="product-detail">
            <h5 class="product-name">${capitalString(title)}</h5>
            <p class="price">$${formatPrice}</p>
            </div>
        </div>`
  }).join("");
  container.innerHTML = products;
}



function filterData(e){
    if(e.type == "change") document.querySelector('.range-value').innerHTML = `$${e.target.value}`;    
  const filterItems = items.filter(item => item.fields.name.toLowerCase().indexOf(e.target.value) !== -1 || item.fields.price <=  e.target.value * 100);
  if(e.target.value) {
      if(filterItems.length > 0)
      renderHTML(filterItems);
      else container.innerHTML = '<h3>No Product found !!!</h3>';
  }
  else renderHTML(items);
//   console.log(items)
}

function renderSideBar(){
    console.log(items)
    const category = [...new Set(items.map(item => item.company))];
    console.log(category)

}

renderSideBar();



searchInput.addEventListener('keyup' , filterData);
rangeInput.addEventListener('change' , filterData)
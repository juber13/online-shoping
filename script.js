const container = document.querySelector('.product-container');
const slider = document.querySelector('.frame');
// https://course-api.com/javascript-store-products/
const productsApi = "https://course-api.com/javascript-store-products";
const searchInput = document.querySelector('.search-input');
const rangeInput = document.querySelector('.range-input');

const items = [];
const fetchProducts = async() => {
    container.innerHTML = `<div class="loading" margin-right:"5rem"></div>`;
    try{ 
        const res =  await fetch(productsApi);
        const data =  await res.json();
        items.push(...data);
        renderHTML(data)
    }catch(error){
        container.innerHTML = `<p>Somthing went wrong</p>`;
    }
    renderSidebar(items)
    renderCarousel(items);    
}

fetchProducts();

function capitalString(word){
    const words = word.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
}

function renderHTML(data){
    const products = data.map((product) => {
    const {id , name:title , price } = product.fields;
    const colors = product.fields.colors.map(color => `<div class="color-box" style="background-color:${color}"></div>`).join('');
    const {url : img} = product.fields.image[0];
    const formatPrice = price / 100;
    return `<div class="product">
            <div class="product-image"><img src=${img} alt=""></div>
            <div class="product-detail">
            <div class="color-container"><span class="color-text">Available Colors </span>${colors}</div>
            <div class="product-title"><h5 class="product-name">${capitalString(title)}</h5></div>
             <div><p class="price">$${formatPrice}</p></div>
            </div>
        </div>`
  }).join("");
  container.innerHTML = products;
}


function filterData(e){
    console.log(e.target.value);
    if(e.type == "change") document.querySelector('.range-value').innerHTML = `$${e.target.value}`;    
     const filterItems = items.filter(item => item.fields.name.toLowerCase().indexOf(e.target.value) !== -1 || 
                                      item.fields.price <=  e.target.value * 100);
    if(e.target.value) {
      if(filterItems.length > 0) renderHTML(filterItems); 
      else container.innerHTML = '<div><span style="font-size:100px";>&#128524;</span><h3>No Product found !!!</h3></div>';
    }

    else renderHTML(items);
}


var index = 0;
function renderCarousel(data){
    const newDatas = data.slice(0,4);
    const displayImages = newDatas.map(data => data.fields.image[0].url);
    console.log(displayImages);
    setInterval(() => {
    const displayImage = `<img src=${displayImages[index]} alt="images"}>`;
    slider.innerHTML = displayImage;
    index++;
    if(index >= displayImages.length) index = 0;
    },2000)
}

const categoriesList = document.querySelector('.side-bar-items');
function renderSidebar(data){
  const allCategory = data.map(item => item.fields.company);
  const category = ["All", ...allCategory.filter((item , index) => allCategory.indexOf(item) === index)];
  categoriesList.innerHTML = category.map(cat => `<li style="cursor:pointer" value=${cat}>${cat}</li>`).join("");

  categoriesList.addEventListener("click" , (e) => {
    const selectedCategories = e.target.innerText;
    selectedCategories === "All" ? renderHTML(items) : renderHTML(data.filter(item => item.fields.company.toLowerCase().indexOf(selectedCategories) !== -1));
  })
}





searchInput.addEventListener('keyup' , filterData);
rangeInput.addEventListener('change' , filterData)
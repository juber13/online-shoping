const productContainer = document.querySelector('.single-product');
const url = "https://course-api.com/javascript-store-single-product";
console.log(url)

const fetchProduct = async() => {
    try{
        productContainer.innerHTML = `<h2>Loding...</h2>`;
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const data = await fetch(`${url}?id=${id}`);
        const res = await data.json();
        return res;
    }catch(error){
        productContainer.innerHTML = `<h2>Somthing went wrong!!</h2>`;
    }
}


const displayProducts = (product) => {
    const colors = product.fields.colors.map(color => `<div class="color-box" style="background-color:${color}"></div>`).join('');

    console.log(colors);
   productContainer.innerHTML = `<div class="product-wrapper">
                                <div class="image-container"><img src=${product.fields.image[0].url} alt="" /></div>
                                <div class="product-info">
                                    <h3>Product Name : ${product.fields.name.toUpperCase()}</h3>
                                    <h4>Compnay : ${product.fields.company}</h4>
                                    <span>Price :<strong>$${product.fields.price / 100}</strong></span>
                                    <div class="color-container"><span class="color-text">Available Colors </span>${colors}</div>
                                    <p>${product.fields.description}</p>
                                    <button class="btn">Add to cart</button>
                                </div>
                          </div>`
}

const start = async() => {
  const data = await fetchProduct();
  displayProducts(data);
}

start();
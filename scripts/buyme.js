import { products } from "../data/products.js";
import { addToCart } from "../data/cart.js";
import { renderCategoryButtons, categoryButtonsHtml } from "../data/categories.js";
import { searchJs } from "./search.js";
import { animateProducts, sumQuantity, currencies } from "../data/utils.js";
import { landingCategory } from "../data/landing.js";

const productContainer = document.querySelector('.js-products-container');
const landingView = document.querySelector('.landing-view');
const back = document.querySelector('.bckbtn');
const catButtons = document.querySelector('.category-buttons');


sumQuantity();
categoryButtonsHtml();

//Event delegation
document.addEventListener('DOMContentLoaded', ()=>{
  document.addEventListener('click',function(event){
    if(event.target.classList.contains('js-add-to-cart-btn')){
      
      const productDiv = event.target.closest(".product-details");
      const qtyInput = productDiv.querySelector(".quantity");
      const quantity = parseInt(qtyInput.value) || 1;
      const productId = event.target.dataset.productId;
  
      const productData = {
        productId: productId,
        quantity: quantity,
        deliveryOptionId: '1'
      };
      if(!productId) return;
  
      addToCart(productId,productData);
      sumQuantity();
    } 
  });
});

searchJs();
renderCategoryButtons();

window.handleCategory = function(id){ 
 
  window.savedScrollY = window.scrollY;
  
  let matchingId; 
  landingCategory.forEach(cat =>{
    if(cat.id === id){
      matchingId = id;    
    }
    else{
      return;
    }
  });
  
  let landingId;
  let fashionId;
  const beautyArray = [];
  let beautyId;
  products.forEach(product =>{
    if(matchingId === product.ldId){
      landingId = product.ldId;
    }
    if(matchingId === product.category){
      fashionId = product.category;
    }
    if(['makeup', 'haircare', 'skincare'].includes(product.ldId)){
      beautyArray.push(product);
    }
  }); 
  beautyArray.forEach(product =>{
    if(matchingId === 'beauty'){
      if(product.ldId === 'haircare' || 'makeup' || 'skincare'){
        beautyId = product.ldId;
      }
    }
  });

  if(fashionId){
    productContainer.innerHTML = generateProductsHtml(fashionId);
  }
  if(beautyId){
    productContainer.innerHTML = generateProductsHtml(beautyId);
     
  }
  if(landingId){
    productContainer.innerHTML = generateProductsHtml(landingId);
  }
 
  productContainer.style.display = "grid";
  animateProducts();
  landingView.style.display = "none";
  back.style.display = "flex";
  catButtons.style.display = "grid";
  window.scrollTo({top: 0, behavior: "smooth"}); 
}

function generateProductsHtml(landingId){
  let productsHTML = '';    
  products.forEach(product =>{
    if(landingId === product.ldId || landingId === product.category){
      productsHTML += `
      <div class="product-details" data-product-id="${product.id}">   
        <div>
            <img src="images/Products/${product.image}.jpg" class="product-image"
            loading="lazy" alt="">
        </div> 
        <div class="name-rating-price">      
          <div>
            <p class="product-name">${product.name}</p>
          </div>
          <div class="rating-div">
            <span class="rating">Rating ${(product.rating/10).toFixed(1)}</span><br>
            <img src="images/ratings/rating-${product.rating}.png" alt="" class="rating-stars">
          </div>
          <div>            
            <span class="qty">Quantity</span>: <input type="number" min="0" value="1" class="quantity"
            data-product-id="${product.id}">
            <br>
              <span class="price">Price</span>: <h4 class="price-dollar" 
              data-product-id="${product.id}">$${(product.priceCents/100).toFixed(2)}</h4>
          </div>
          <div>
            <button class="add-to-cart-btn js-add-to-cart-btn" 
            data-product-id = "${product.id}" >Add To Cart</button>
          </div>
        </div>       
      </div>
      `;  
    }         
  });  
  return productsHTML;  
}









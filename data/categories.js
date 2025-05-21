import { products } from "./products.js";
import { animateProducts } from "./utils.js";

const categories = [
  {
    category: 'Electronics',
    id: '1'
  },
  {
    category: 'Phones',
    id: '2'
  },
  {
    category: 'Fashion',
    id: '3'
  },
  {
    category: 'Computing',
    id: '4'
  },
  {
    category: 'Home',
    id: '5'
  },
  {
    category: 'Others',
    id: '6'
  },

];


export function categoryButtonsHtml(){
  let btnHTML = '';
  const categoryButtons = document.querySelector('.category-buttons');
  categories.forEach((cat)=>{
    btnHTML += `
    <button class="btn" data-cat-id ="${cat.id}">${cat.category}</button>
    `;
  });
  categoryButtons.innerHTML = btnHTML;
}

export function renderCategoryButtons (){  

  const categoryBtns = document.querySelectorAll('.btn');
  const backBtn = document.querySelector('.bckbtn');
  document.addEventListener('DOMContentLoaded',()=>{
    categoryBtns.forEach((btn)=>{
      btn.addEventListener('click',()=>{ 
        const catId = btn.dataset.catId;   
        categoryActionBtn(catId);
        backBtn.style.display = "flex";
      });
    });
  });

  const productList = document.getElementById('productList');
  const productContainer = document.querySelector('.js-products-container');
  const landingView = document.querySelector('.landing-view');
  const catButtons = document.querySelector('.category-buttons');

  backBtn.onclick = function(){    
    productList.style.display = "none";
    landingView.style.display = "block";
    productContainer.style.display = "none"
    catButtons.style.display = "none";
    backBtn.style.display = "none";
    setTimeout(()=>{
      window.scrollTo(0, window.savedScrollY);
    },0);
  }


  function categoryActionBtn(catId){  
    let categoryHTML = '';
    
    let category;
    categories.forEach((cat)=>{
      if(cat.id === catId){
        category = cat.category;
      }
    });    
    
    if(!catId){
      console.log('no match');
      return;
    }
    
    products.forEach((product)=>{
      let matchingProduct;
      if(category === product.category){
        matchingProduct = product;
      }
      if(matchingProduct){    
    
        categoryHTML  += `
          <div class="product-details" data-product-id="${product.id}">   
            <div>
              <img src="images/Products/${matchingProduct.image}.jpg" class="product-image"
               loading="lazy" alt="">
            </div> 
            <div class="name-rating-price">      
            <div>
            <p class="product-name">${matchingProduct.name}</p>
            </div>
            <div class="rating-div">
              <span class="rating">Rating ${(matchingProduct.rating/10).toFixed(1)}</span><br>
              <img src="images/ratings/rating-${matchingProduct.rating}.png" alt="" class="rating-stars">
            </div>
            <div>            
              Quantity: <input type="number" min="0" value="1" class="quantity"
              data-product-id=""${matchingProduct.id}>
              <br>
              <span class="price">Price</span>: <h4 class="price-dollar">$${(matchingProduct.priceCents/100).toFixed(2)}</h4>
            </div>
            <div>
              <button class="add-to-cart-btn js-add-to-cart-btn" 
              data-product-id = "${matchingProduct.id}" >Add To Cart</button>
            </div>
          </div>   
         </div>
        `;
      }else{    
        productList.style.display = "none";
      }     
    }); 
    productList.style.display = "grid";
    productContainer.style.display = "none"; 
    productList.innerHTML = categoryHTML;  
    window.scrollTo({top: 0, behavior: "smooth"}); 
    animateProducts();
    
  }
}








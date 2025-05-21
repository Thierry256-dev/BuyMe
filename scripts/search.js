import { products } from "../data/products.js";
import { animateProducts } from "../data/utils.js";

export function searchJs(){

  document.addEventListener('DOMContentLoaded',()=>{
    const fuse = new Fuse(products, {
      keys: ["name", "tags"],
      threshold: 0.4
    });
    
    const searchInput = document.getElementById('searchBox');
    const productList = document.getElementById('productList');
    const landingView = document.querySelector('.landing-view');
    const back = document.querySelector('.bckbtn');
    const catButtons = document.querySelector('.category-buttons');
    const productContainer = document.querySelector('.js-products-container');
    
    searchInput.addEventListener('input', ()=>{    
    
      productContainer.style.display = "none";
      const query = searchInput.value.trim();
      productList.innerHTML = "";
    
      if(query === "") {
        productList.style.display = "none";
        landingView.style.display = "block";
        document.querySelector('.footer-section').style.display = "none";
        back.style.display = "none";
        catButtons.style.display = "none";
        return
      };
    
      const matched = fuse.search(query);
    
      if(matched.length > 0){
        matched.forEach(result => {
          productList.style.display = "grid";
          const product = result.item;
          const card = document.createElement("div");
          card.innerHTML = `
          <div class="searched-product product-details" data-product-id="${product.id}">
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
                Quantity: <input type="number" min="0" value="1" class="quantity"
                data-product-id=""${product.id}>
                <br>
                <span class="price">Price</span>: $<h4 class="price-dollar"
                data-product-id = "${product.id}">${(product.priceCents/100).toFixed(2)}</h4>
              </div>
              <div>              
                <button class="add-to-cart-btn js-add-to-cart-btn" 
                data-product-id = "${product.id}" >Add To Cart</button>
              </div>
            </div>        
          </div>  
          `;
          productList.appendChild(card);
          landingView.style.display = "none"; 
          document.querySelector('.footer-section').style.display = "none"; 
          back.style.display = "flex"; 
          catButtons.style.display = "grid";
          window.scrollTo({top: 0, behavior: "smooth"});
          animateProducts();             
        });    
      }else{
        productList.innerHTML = "<p>No products Related to your search!<p/>";     
        landingView.style.display = "none";
        back.style.display = "flex";
        catButtons.style.display = "none";    
      }
    });
  });

}



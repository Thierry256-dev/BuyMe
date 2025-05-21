import { cart } from "./cart.js";
import { products } from "./products.js";

export function animateProducts(){
  const productDetails = document.querySelectorAll('.product-details');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  },{
    threshold: 0.1
  });

  productDetails.forEach(product =>{
    observer.observe(product);
  });
}

export function sumQuantity(){
  
  const cartCount = document.querySelector('.js-cart-count');
  let cartQuantity = 0;
  cart.forEach((cartItem)=>{
    cartQuantity += Number(cartItem.quantity);
  }); 

  cartCount.innerHTML = cartQuantity;
}

export const currencies = [{
  id: 'usd',
  rate: 1,  
  symbol: '$'
},{
  id: 'ugx',
  rate : 3619.64,
  symbol: 'Shs'
},{
  id: 'rwf',
  rate: 1407.92,
  symbol: 'RWF'
},{
  id: 'ksh',
  rate: 127.68,
  symbol: 'Ksh'
},{
  id: 'tzs',
  rate: 2775.81,
  symbol: 'Tzs'
}];

export function convertCurrency(newPrice, product){     
  
  const price = (product.priceCents/100).toFixed(2);
  newPrice = Math.round(price * currency.rate).toFixed(0);
  
 
}

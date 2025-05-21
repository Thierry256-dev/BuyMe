import { products } from "../data/products.js";
import { cart, removeFromCart, updateDeliveryOption, saveToStorage } from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryoptions.js";
import { currencies } from "../data/utils.js";

renderSummary();
function renderSummary(){
    
  let checkoutHTML= '';
  let orderDetails = document.querySelector('.order-details');
  
  cart.forEach((cartProduct)=>{
  
    const productId = cartProduct.productId;
    let matchingProduct;
    products.forEach((product)=>{
      if(productId === product.id){
        matchingProduct = product;
      }
    });

    const deliveryOptionId = cartProduct.deliveryOptionId;
    
    //console.log(deliveryOptionId);
    const deliveryOption = deliveryOptions.find((option)=>
       option.deliveryOptionId == deliveryOptionId);
    /*if(deliveryOption){
      console.log(deliveryOption?.deliveryDays);
     
    }else{
      console.warn('No delivery option found for ID:', deliveryOptionId);
    }
    console.log(typeof deliveryOptionId, deliveryOptionId);
    console.log(deliveryOptions);*/
    const today = dayjs();
    const deliveryDay = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDay.format('dddd, MMMM D');     
    checkoutHTML +=`
    <div class="item-summary js-cart-item-container-${matchingProduct.id}"
    data-matching-product-id="${matchingProduct.id}">
      <div class="item">
        <div>
          <span class="delivery-day-head">${dateString}</span>
          <img src="images/Products/${matchingProduct.image}.jpg" alt="">
        </div>
        <div class="item-name">
          ${matchingProduct.name} 
        </div>
        <div class="quantity-div">
          Quantity: <input type="number" min="0" value=${cartProduct.quantity} class="quantity"
          data-product-id="${matchingProduct.id}" data-product-quantity="${matchingProduct.quantity}">  
        </div>
        <div>
          <span class="delete-link" 
          data-product-id="${matchingProduct.id}">Delete Item</span>
        </div>
      </div>
      <div class="shipment">
        <div>
          <span class="shipping-date">Choose A delivery Option</span>
        </div>
        ${renderDeliveryHTML(matchingProduct, cartProduct)} 
        <div>
          <hr>
          <span class="price">Cost</span>: $<span class="price-dollar"> ${(matchingProduct.priceCents/100 * cartProduct.quantity).toFixed(2)}</span> 
        </div>
      </div>
    </div>  
  `;
  });
  
  function renderDeliveryHTML(matchingProduct, cartProduct) {
    let html= '';
    
    deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs();
    const deliveryDay = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDay.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents === 0 ? 'FREE SHIPPING' : `${(deliveryOption.priceCents/100).toFixed(2)}`;
    const isChecked = deliveryOption.deliveryOptionId === cartProduct.deliveryOptionId;
    
      html += `
      <div  data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.deliveryOptionId}" class="delivery-options">        
        <div class="js-shipping-price-content">
         <div><span class="day">$</span></div>
         <div class="js-shipping-price"><span class="day">${priceString}</span></div>
        </div>
        <div class="radio-and-day">
          <div>
            <input type="radio" ${isChecked? 'checked' : ''}
            name="delivery-option-${matchingProduct.id}" class="delivery-option-input">
          </div>
          <div>
            <span class="delivery-day">${dateString}</span>
          </div>         
        </div>                
      </div>
        
    `; 
    });
    return html
  }
  orderDetails.innerHTML = checkoutHTML; 

  sumQuantity();
  function sumQuantity(){
    const cartCount = document.querySelector('.js-cart-count');
    let cartQuantity = 0;
    cart.forEach((cartItem)=>{
      cartQuantity += Number(cartItem.quantity);
    }); 
    cartCount.textContent = cartQuantity + ' Item(s)';
  }

  const deleteLinks = document.querySelectorAll('.delete-link');
  deleteLinks.forEach((link)=>{
    link.onclick = function() {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      sumQuantity();
      cartMessage();
      renderPaymentSummary();
      
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
    };
  });

  document.querySelectorAll('.delivery-options')
  .forEach((option)=>{
    option.addEventListener('click',()=>{
    const {productId, deliveryOptionId} = option.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    renderSummary();
    renderPaymentSummary();
  });
 });

 document.querySelectorAll('.quantity')
 .forEach((inputElement)=>{
   inputElement.addEventListener('input',function (){
    const productId = inputElement.dataset.productId;
    cart.forEach((cartItem)=>{
      if(cartItem.productId === productId){
        cartItem.quantity = inputElement.value;
      }
    });
    renderSummary();
    saveToStorage();
    renderPaymentSummary();
   });
 });
  
}

renderPaymentSummary();
export function renderPaymentSummary(){
 
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

   const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.deliveryOptionId === deliveryOptionId){
        deliveryOption = option;
      }

    });

    productPriceCents += matchingProduct.priceCents * cartItem.quantity;
    shippingPriceCents += deliveryOption.priceCents;

  });

 const totalBeforeTaxCents = productPriceCents;
 const estimatedTax = Math.round(totalBeforeTaxCents * 0.1);
 const orderTotal = Math.round(totalBeforeTaxCents + estimatedTax);
 const totalPayment = Math.round(orderTotal + shippingPriceCents);

 
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
    
  });

  let paymentSummaryHTML = '';
  const paymentContainer = document.querySelector('.amount-section');

  paymentSummaryHTML += `
    <div>
      Order Total Before Tax
    </div>
    <div>
     $${totalBeforeTaxCents/100}
    </div>
    <div>
      Tax(10%)
    </div>
    <div>
      $${estimatedTax/100}
    </div>
    <div>
      Order Total After Tax
    </div>
    <div>
      $${orderTotal/100}
    </div>
    <div>
      Shipping Fee
    </div>
    <div>
      $${shippingPriceCents/100}
    </div>    
    <div><span class="total-payment">
      Total Payment</span>
      <select id="conversion">
        <option  value="usd">USD</option>
        <option  value="ugx">UGX</option>
        <option  value="rwf">RWF</option>
        <option  value="ksh">KSH</option>
        <option  value="tzs">TZS</option>
      </select>
    </div>
    <div>
      <span class="total-price">$${totalPayment/100}</span>      
    </div>
  `;
  paymentContainer.innerHTML = paymentSummaryHTML;  
  convertCur(totalPayment);
 
}

const message = document.querySelector('.message');
const clearCartBtn = document.querySelector('.clear-cart-btn');
clearCartBtn.onclick= function(){
  localStorage.clear(); 
  document.querySelector('.checkout').remove();
  message.style.display = "flex";
  document.querySelector('.js-cart-count').textContent = `0 Item(s)`;
}

function convertCur(totalPayment){
  document.addEventListener('DOMContentLoaded', ()=>{
    const conversion = document.getElementById('conversion');  
  
    const priceString = document.querySelector('.total-price');       
    conversion.addEventListener('change', function(){     
      
      let newPrice;
      let symb;
      const selected = this.value;
      currencies.forEach(currency =>{
        if(currency.id === selected && currency.id !== 'usd'){
          symb = currency.symbol;            
          const price = totalPayment/100;
          newPrice = Math.round(price * currency.rate).toFixed(0);
          
        }else if(currency.id === selected && currency.id === 'usd'){
          symb = currency.symbol;                        
          newPrice = totalPayment/100;            
        }
      });
      priceString.textContent = `${symb}.${newPrice}`;                   
    });    
  
  });
}

cartMessage();
function cartMessage(){    
  if(cart.length === 0){
    document.querySelector('.checkout').style.display = "none";
    message.style.display = "flex";
  }
}



export let cart;
loadFromStorage();
export function loadFromStorage(){
 cart = JSON.parse(localStorage.getItem('cart'));
 if(!cart){
  cart = [];  
 }
}

export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, productData){

  let matchingItem;

  cart.forEach((cartItem) =>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
    
  });

  if(matchingItem){
    matchingItem.quantity += 1;
  }
  else{
    cart.push(productData);
    
  }

  saveToStorage();

}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    } 
  });
  cart = newCart;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }   
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}



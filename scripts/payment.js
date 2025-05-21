import { paymentOptions } from "../data/paymentOptions.js";

renderPaymentMethod();
function renderPaymentMethod(){
  let payMethodHTML = '';
  paymentOptions.forEach(option =>{
    payMethodHTML +=`
      <div class="pay-div" data-option-id="${option.optionId}">
        <img src="images/payment/${option.image}" alt="${option.paymethod}"  class="${option.class} js-img">
        <p>${option.paymethod}</p>
      </div>
    `;    
  });
  const payMethodContainer = document.querySelector('.payment-options');
  payMethodContainer.innerHTML = payMethodHTML;
 
    
}



document.addEventListener('DOMContentLoaded',()=>{
  const divs = document.querySelectorAll('.pay-div');
  const mobilePay = document.querySelector('.mobile-pay');
  const mobileId = mobilePay.id;
  const binancePay = document.querySelector('.binance-pay');
  const binanceId = binancePay.id; 

  divs.forEach(div =>{
    
    div.addEventListener('click', ()=>{
      const optId = div.dataset.optionId;
      if(optId === mobileId){
        mobilePay.style.display = "flex";
        binancePay.style.display = "none";
      }else if(optId === binanceId){
        binancePay.style.display = "flex"
        mobilePay.style.display = "none";
      }else{
        mobilePay.style.display = "none";
        binancePay.style.display = "none";
      } 
    });
  });
});

const submit = document.getElementById('submit');
const ok = document.getElementById('ok');
const customAlert = document.getElementById('customAlert');
const mainContent = document.querySelector('.main-content');
const body1 = document.querySelector('.body1');

function warn (){
  customAlert.style.display = "block";
  mainContent.classList.add("blur");
  body1.classList.add("background");
}
warn();

submit.onclick = function(){
  const wait = document.querySelector('.wait');
  wait.style.display = "block";
  setTimeout(()=>{
    wait.style.display = "none"
  }, 4000);
}
ok.onclick = function (){
  customAlert.style.display = "none";
  mainContent.classList.remove("blur");
  body1.classList.remove("background");
}
const showSidebar = document.querySelector(`.menu`);
const closeSlidebar = document.querySelector(`.closeSideBar`);
const cartjs = document.querySelector(`.shoppingCart`);
const cancelCart = document.querySelector(`.fa-xmark`);

document.addEventListener('DOMContentLoaded', () => {
    updateCart(); // Update the cart display on page load
});

showSidebar.addEventListener('click',()=>{
    const sideBar = document.querySelector(`.sidebar`);
    sideBar.style.display = `flex`;
    setTimeout(() => sideBar.style.opacity = '1', 50);
});

closeSlidebar.addEventListener('click',()=>{
    const sideBar = document.querySelector(`.sidebar`);
    sideBar.style.opacity = '0';
    setTimeout(() => sideBar.style.display = `none`, 400);
    
});

const closeBar = () =>{
    const sideBar = document.querySelector(`.sidebar`);
    sideBar.style.opacity = '0';
    setTimeout(() => sideBar.style.display = `none`, 400);
};


      


const reviewBtn = document.getElementById(`reviewBtn`);

reviewBtn.addEventListener(`click`,(e)=>{
    e.preventDefault();

    


    let parms = {
        name: document.getElementById(`name`).value,
        email: document.getElementById(`email`).value,
        message: document.getElementById(`message`).value,
    }

    const name = document.getElementById(`name`).value;
    const email = document.getElementById(`email`).value;
    const message = document.getElementById(`message`).value;

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const namePattern = /^[a-zA-Z\s-]+$/;

    if (!name || !email || !message) {
        alert("Please fill out all fields before submitting.");
        return;
    }else if (!emailPattern.test(email.trim())) {
        alert('Please enter a valid email address.')}
        else if(!namePattern.test(name)){
            alert('your name cannot be a number');
        }

    emailjs.send(`service_mg5z9j9`,`template_rhcxky9`,parms).then(alert(`Email has been sent!`));

    

    name.value= ``;
    email.value = '';
    message.value = '';


});


// i will need localStorage to get my cart details across the html pages
// cart design too big for mobile phone
// add checkout page
// form validation is needed











const cartBtn = document.querySelectorAll(`#add-to-cart`);

let cart = JSON.parse(localStorage.getItem('cart')) || [];


cartBtn.forEach(button =>{
    button.addEventListener(`click`, e =>{


        
        let products = e.target.closest(`.product-item`);

        let productName = products.querySelector(`#product`).firstChild.textContent.trim();
        let productPrice = parseFloat(products.querySelector(`#price`).textContent);
        let productImage = products.querySelector(`img`).src;
        let productQuantity = parseInt(products.querySelector(`input`).value);

        

        console.log(productImage);

        if (productQuantity < 1 || isNaN(productQuantity)) {
            alert('Quantity must be a number and at least 1.');
            updateCart();
            return;
        }

        let existingProduct = cart.find(item => item.name === productName);
        
        if(existingProduct){
            existingProduct.quantity += productQuantity;

        }else{

            let cartItem ={
                name:productName,
                price:productPrice,
                image:productImage,
                quantity:productQuantity
            };
            
    
            cart.push(cartItem);
    
            console.log(cart);
            
            
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();

    })
});

function updateCart(){

    const cartDetails = document.getElementById(`details`);
    const cartCount = document.getElementById(`cartCount`);
    let totalPrice = 0;
    let totalItems = 0;
    cartDetails.innerHTML = "";
    cart.forEach(item =>{

        


      const divForCart = document.createElement(`div`);
      const img = document.createElement(`img`);
      const  p = document.createElement(`p`);
      const span = document.createElement(`span`);
      const input = document.createElement(`input`);
      const button =  document.createElement(`button`);
      
      
  
      divForCart.classList.add(`cartDetails`);
  
      img.src = item.image;
      img.style.width = `100`;
      img.height = `100`;
      img.style.border = `2px solid 
      #333`;
  
      p.id = `myP`;
      p.textContent = `${item.name} - `;
      span.textContent = ` ₦${item.price.toFixed(2)} `;
  
      span.id = `cartPrice`;
      
      input.type = `number`;
      input.value = item.quantity;
      input.min = 1;
      input.addEventListener(`change`, (e) => updateQuantity(item.name, e.target.value));

      button.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
      //button.innerHTML = `remove`;
      button.style.fontSize =`10px`;
      button.style.padding=`4px 6px`;
      button.addEventListener(`click`, () => removeFromCart(item.name));
      
  
     
  
      
      
      p.appendChild(span);
      p.appendChild(input);
      p.appendChild(button); 
      

      divForCart.appendChild(img);
      divForCart.appendChild(p);

      cartDetails.appendChild(divForCart);

      console.log(cart);

      totalPrice += item.price * item.quantity;
      totalItems += item.quantity; // Sum up all quantities
      

    });
      // Display Total Price
      
      const message = document.createElement(`p`);
      message.textContent = `Total Price = ₦${totalPrice.toFixed(2)}`;
      cartDetails.appendChild(message);
      cartCount.textContent = totalItems;
      cartCount.style.display = `block`;
      localStorage.setItem("cart", JSON.stringify(cart));

      
    

}

cartjs.addEventListener(`click`,()=>{

    const cart = document.querySelector(`.cart`);
    cart.classList.toggle("cartjs");
    cart.style.transition = `0.4s`;

    cancelCart.addEventListener(`click`,()=>{

        if(cancelCart){
            const cart = document.querySelector(`.cart`);
            cart.classList.remove("cartjs");
        }
        updateCart();
    
    });

    
});

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem("cart", JSON.stringify(cart)); 
    updateCart();
}

function updateQuantity(productName, newQuantity) {
    let product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity = parseInt(newQuantity) || 1; // Prevent invalid values
    }
    updateCart();
}


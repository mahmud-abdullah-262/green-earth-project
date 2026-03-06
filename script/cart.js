

let products = [];
let cart = []
const cartContainer = document.getElementById('cart-container');
const totalItemCount = document.getElementById('total-Item');
const totalPriceCount = document.getElementById('total-price');

const allProductUrl = 'https://openapi.programming-hero.com/api/plants';
const loadProducts = async () => {
  const res = await fetch(allProductUrl)
  const data = await res.json();
  products = data.plants;
}

const addToCart = (id) => {

  if(cart.some(item => item.id === id)){
    changeUnite('plus', id)
  } else {
    const cartTree = products.find(tree => tree.id === id);
 cart.push({
  ...cartTree,
  unitInCart: 1,
  inStock: 5
 })
  }

 updateCart()

 
}

const updateCart = () =>{
  renderCartItem()
  updatePrice()
}

const renderCartItem = () => {
  cartContainer.innerHTML = ''
  cart.forEach(item => {
    cartContainer.innerHTML += `
    <div class="flex justify-between items-center font-bold bg-green-100 px-2 py-2 gap-2 rounded-2xl text-green-600">
          
          <p onclick="deleteItem(${item.id})" class="cursor-pointer"> ${item.name} <br> ${item.price}</p>
          <p>${item.unitInCart}</p>
          <div class="flex flex-col gap-1">
          <i onclick="changeUnite('plus', ${item.id})" class="fa-solid fa-circle-plus"></i>
          <i onclick="changeUnite('minus', ${item.id})" class="fa-solid fa-circle-minus"></i>
          </div>
        </div>
    `

  })
}

const changeUnite = (action, id) => {

 
 cart = cart.map(item => {
  


 if(item.id === id){


  let unitInCart = item.unitInCart;
  console.log(item)
        if(action === 'plus' && item.unitInCart < item.inStock){
          unitInCart++
        } else if(action === 'minus' && item.unitInCart > 1){
          unitInCart--
        }
 return {
    ...item,
    unitInCart: unitInCart ,
  }

 }
 
 
 console.log(item)
 return item;

 })
updateCart()
}

const updatePrice = () => {
let totalPrice = 0;
  let totalUnit = 0;

cart.forEach(item => {
  
   totalPrice += item.price * item.unitInCart;
   totalUnit += item.unitInCart;

 

 
});

  totalItemCount.innerText = totalUnit;
  totalPriceCount.innerText = totalPrice;
}


const deleteItem = (id) => {
  cart = cart.filter(item => item.id !== id)
 
  updateCart()
 
}
loadProducts()




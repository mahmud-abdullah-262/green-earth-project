const loadCategory = () =>{
const url = 'https://openapi.programming-hero.com/api/categories';
fetch(url)
.then(response => response.json())
.then(data => displayCategory(data.categories))

}
const displayCategory = (arrey) => {
  const categoryContainer = document.getElementById('category-container');
  categoryContainer.innerHTML = '';


  arrey.forEach(item => {
    const category = document.createElement('div');
    category.classList.add( 'bg-base-200', 'text-green-400', 'w-full', 'text-left', 'p-4', 'cursor-pointer', 'rounded-xl', 'shadow-sm', 'font-bold', 'category-btn' );
    category.id = `catagroy-id-${item.id}`
    category.setAttribute("onclick", `loadTrees('${item.id}')`)
    category.innerHTML = `${item.category_name}
    `
    categoryContainer.appendChild(category)
  });
  
}

const loadAllTrees = () => {
  const url = 'https://openapi.programming-hero.com/api/plants';
  fetch(url)
  .then(res => res.json())
  .then(data => {
    spinner(true)
    removeActive();
    document.getElementById('all-tree-btn').classList.add('bg-green-600', 'text-white')
    displayTress(data.plants)
  } )

}
const loadTrees = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => {
    spinner(true)
    removeActive()
    const categoryBtn = document.getElementById(`catagroy-id-${id}`)
    categoryBtn.classList.add('bg-green-600', 'text-white')
    
    displayTress(data.plants)
  } )
}

const displayTress = (trees) =>{
  
  const treeContainer = document.getElementById('tree-container');
  treeContainer.innerHTML = '';

  trees.forEach(tree => {
    const newTree = document.createElement('div');
    newTree.classList.add('card', 'bg-white', 'p-4', 'space-y-2', 'shadow-sm',);
    // newTree.setAttribute("onclick", `loadTreeDetails(${tree.id})`)
    newTree.innerHTML = `

    <div class="h-50 overflow-hidden">  
    <img class="rounded-xl h-full w-full object-cover" src="${tree.image}" alt=""> </div>
        <h1 onclick="loadTreeDetails(${tree.id})" class="font-bold text-gray-800 cursor-pointer">${tree.name}</h1>
        <p>${tree.description}</p>

        <div id="catagory-price" class="flex justify-between font-bold">
          <p id="catagory" class="badge bg-green-300 text-white p-2">${tree.category}</p>
          <p id="price">${tree.price}</p>
           </div>

        <div onclick="addToCart('${tree.name}', ${tree.price})" class="add-to-cart btn bg-green-600 rounded-full text-white">
          <p>Add to cart</p>
    `
    treeContainer.append(newTree)
    spinner(false)
  })
}

const loadTreeDetails = (id) =>{
 const url = `https://openapi.programming-hero.com/api/plant/${id}`;
 fetch(url).then(res => res.json()).then(data => displayTreeDetails(data.plants))
}

const displayTreeDetails = (treeDetails) => {
  const modal = document.getElementById('tree_detiles');
  modal.showModal();

  modal.innerHTML = `
  <div class="modal-box">
    <img src="${treeDetails.image}" alt="">
    <h3 class="text-2xl font-bold text-green-600 mt-6">${treeDetails.name}</h3>
    <p class="py-4 text-gray-600">${treeDetails.description}</p>
    <div class="flex justify-between items-center">
      <p class="bg-green-400 font-bold text-white p-2 rounded-xl">${treeDetails.category}</p>
    <p class="font-bold text-gray-600">Price: ৳${treeDetails.price}</p>
    </div>
    
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
  `
}  

const addToCart = (treeName, price) => {
  const cartContainer = document.getElementById('cart-container');
  const emptyMsg = document.getElementById('empty-msg');

  if(emptyMsg){
    emptyMsg.classList.add('hidden')
  }

  const newItem = document.createElement('div');
  newItem.classList.add('cart', 'bg-green-100', 'rounded-xl', 'p-2');
  newItem.innerHTML = `
  <h1 class="font-bold">${treeName}</h1>
          <p>৳${price} x 1</p>
  `;
  cartContainer.append(newItem);

  let totalPrice = Number(document.getElementById('total-price').innerText);
  console.log(totalPrice)
  totalPrice = totalPrice + price;
  console.log(totalPrice)

  document.getElementById('total-price').innerText = totalPrice;


}

const removeActive = () => {
  const activeBtn = document.querySelectorAll('.category-btn');
  activeBtn.forEach(btn => {
    btn.classList.remove('bg-green-600', 'text-white')
  })
}


const spinner = (status) => {
  if (status === true){
    document.getElementById('spinner').classList.remove('hidden')
    document.getElementById('tree-container').classList.add('hidden')
  } else{
     document.getElementById('spinner').classList.add('hidden');
    document.getElementById('tree-container').classList.remove('hidden')
  }
}

loadCategory()
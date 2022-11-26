import { productsList } from './products/product-list.mjs';

const body = document.body;
const wrapper = body.appendChild(document.createElement('div'));
wrapper.classList.add('wrapper');
const header = wrapper.appendChild(document.createElement('header'));
header.textContent = 'BOOK STORE: THE BEST BOOKS FOR THE BEST DEVELOPERS'
const main = wrapper.appendChild(document.createElement('main'));

let productsIncart = [];

const mainContainer = main.appendChild(document.createElement('div'));
mainContainer.classList.add('main_container')

const catalog = new DocumentFragment();
const productsContainer = document.createElement('div');
productsContainer.classList.add('products_container');
catalog.append(productsContainer);



const renderProducts = () => {
  productsList.reduce((acc, product) => {
    const card = document.createElement('div');
    productsContainer.append(card);
    card.classList.add('card');

    card.innerHTML += `
      <div class="product_wrapper">
          <img src="${product.cover}" class="product_image" draggable="true" alt="${product.description}">
          <div class="product_info">
              <div class="product_title">${product.title}</div>
              <div class="product_author">${product.author}</div>
              <div class="product_price">${product.price}</div>
              <div class="product_description">${product.description}
                <div class="btn_close" data-action="closedescription"></div>
              </div>
          </div>
      </div>
      <div class="btn_wrapper">
          <button class="btn" data-action="addtocart">add to cart</button>
          <button class="btn" data-action="showmore">show more</button>
      </div>
    `
    
    card.addEventListener('click', (event) => {
      const action = event.target.dataset.action;
  
      if (action === 'showmore') {
        const div = event.target.parentNode.closest('.card').firstElementChild.lastElementChild.lastElementChild;
        console.log('div', div);
        div.style.display = 'block';
      }
  
      if (action === 'addtocart') {
        const bookTitle = event.target.parentNode.closest('.card').firstElementChild.lastElementChild.firstElementChild.textContent;
        console.log('bookTitle', bookTitle);
        console.log('cart', productsIncart);
        if (!productsIncart.includes(bookTitle)) productsIncart.push(bookTitle);
        updateCart();
      }
  
      if (action === 'closedescription') {
        const div = event.target.parentNode.closest('.card').firstElementChild.lastElementChild.lastElementChild;
        div.style.display = 'none';
      }
    });
  }, 0)
}

renderProducts();

const cart = new DocumentFragment();
const cartContainer = document.createElement('div');
cartContainer.textContent = 'Shopping cart';
cartContainer.classList.add('cart_container');

const cartItems = cartContainer.appendChild(document.createElement('div'));
cartItems.classList.add('cart_items');

const cartSubtotal = cartContainer.appendChild(document.createElement('div'));
cartSubtotal.classList.add('cart_subtotal');

const btnConfirm = cartContainer.appendChild(document.createElement('button'));
btnConfirm.textContent = 'Confirm Order';
btnConfirm.classList.add('btn', 'btn_confirm');
btnConfirm.onclick = () => { location.href=`form.html` }


cart.append(cartContainer);

const updateCart = () => {
  renderCartProducts();
  renderSubtotal();
}

const renderCartProducts = () => {
  cartItems.innerHTML = '';
  productsList.reduce((acc, product) => {
    if (!productsIncart.includes(product.title)) return;

    cartItems.innerHTML += `
      <div class="cart_item">
        <div class="cart_title">${product.title}</div>
        <div class="cart_author">${product.author}</div>
        <div class="cart_price">$${product.price}</div>
        <div class="cart_item_btn" data-action="removefromcart"></div>
      </div>
    `

    cartItems.addEventListener('click', (event) => {
      const action = event.target.dataset.action;

      if (action === 'removefromcart') {
        const title = event.target.parentNode.closest('.cart_item').firstElementChild.textContent;
        console.log(title);
        productsIncart = productsIncart.filter(el => el !== title);
        updateCart();
      }
    });
  }, 0)
};

const renderSubtotal = () => {
  let totalPrice = 0;

  productsList.reduce((acc, product) => {
    if (!productsIncart.includes(product.title)) return;
    totalPrice += +product.price;
  }, 0)

  cartSubtotal.textContent = `Total: ${totalPrice.toFixed(2)}`;
};

renderSubtotal();

mainContainer.append(catalog);
mainContainer.append(cart);

const dragElements = document.querySelectorAll('.product_image');
const dragElementsArr = Array.from(dragElements)
dragElementsArr.reduce((acc, el) => {
  el.addEventListener('dragstart', (event) => {
    event.currentTarget.classList.add('dragging');
    event.dataTransfer.clearData();
    event.dataTransfer.setData('text/plain', event.target.closest('.product_wrapper').lastElementChild.firstElementChild.textContent);
  })
  el.addEventListener("dragend", (event) =>
    event.currentTarget.classList.remove('dragging')
  );
}, 0)


const dragTarget = document.querySelector(".cart_container");
dragTarget.addEventListener('dragover', (event) => {
  event.preventDefault();
});
dragTarget.addEventListener('drop', (event) => {
  event.preventDefault();
  const bookTitle = event.dataTransfer.getData("text");
  if (!productsIncart.includes(bookTitle)) productsIncart.push(bookTitle);
  updateCart();
});

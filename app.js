import { productsList } from './products/product-list.mjs';

const body = document.body;
const wrapper = body.appendChild(document.createElement('div'));
wrapper.classList.add('wrapper');
const header = wrapper.appendChild(document.createElement('header'));
const main = wrapper.appendChild(document.createElement('main'));
const footer = wrapper.appendChild(document.createElement('footer'));

const div = header.appendChild(document.createElement('div'));
div.textContent = 'Dear student, please check back on Frida – Nov, 25th. Thank you for understanding!';

const mainContainer = main.appendChild(document.createElement('div'));
mainContainer.classList.add('main_container')

const catalog = new DocumentFragment();
const productsContainer = document.createElement('div');
productsContainer.classList.add('products_container');
catalog.append(productsContainer);

const productsIncart = [];

const renderProducts = () => {
  productsList.reduce((acc, product) => {
    const card = document.createElement('div');
    productsContainer.append(card);
    card.classList.add('card');

    card.innerHTML += `
      <div class="product_wrapper">
          <img src="${product.cover}" class="product_image" alt="${product.description}">
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
        div.style.display = 'block';
      }
  
      if (action === 'addtocart') {
        const title = event.target.parentNode.closest('.card').firstElementChild.lastElementChild.firstElementChild.textContent;
        console.log(title);
        productsIncart.push(title)
        console.log(shoppingCart);
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
cartContainer.textContent = 'Shopping cart area';
cartContainer.classList.add('cart_container');
const cartItems = cartContainer.appendChild(document.createElement('div'));
cartItems.classList.add('cart_items');

cart.append(cartContainer);

mainContainer.append(catalog);
mainContainer.append(cart);

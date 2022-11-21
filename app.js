import { productsList } from './products/product-list.mjs';

const body = document.body;

const wrapper = body.appendChild(document.createElement('div'));
wrapper.classList.add('wrapper');

const header = wrapper.appendChild(document.createElement('header'));
const main = wrapper.appendChild(document.createElement('main'));
const footer = wrapper.appendChild(document.createElement('footer'));

const div = header.appendChild(document.createElement('div'));
div.innerHTML = 'Dear student, please check back on Wednesday – Nov, 23rd. Thank you for understanding!';

const mainContainer = main.appendChild(document.createElement('div'));
mainContainer.classList.add('main_container')

const catalog = new DocumentFragment();
const productsContainer = document.createElement('div');
productsContainer.classList.add('products_container');
catalog.append(productsContainer);

const renderProducts = () => {
  productsList.reduce((acc, product) => {
    productsContainer.innerHTML += `
      <div class="card">
        <div class="product_wrapper">
            <img src="${product.cover}" class="product_image" alt="${product.description}">
            <div class="product_info">
                <div class="product_title">${product.title}</div>
                <div class="product_author">${product.author}</div>
                <div class="product_price">${product.price}</div>
                <div class="product_description">${product.description}</div>
                <div class="btn_close" data-action="closedescription"></div>
            </div>
        </div>
        <div class="btn_wrapper">
            <button class="btn" data-action="addtocart">add to cart</button>
            <button class="btn" data-action="showmore">show more</button>
        </div>
      </div>
    `
  }, 0)
}

renderProducts(); 

const cart = new DocumentFragment();
const cartContainer = document.createElement('div');
cartContainer.textContent = 'Shopping cart area';
cartContainer.classList.add('cart_container');

const cartState = [];

// if cartState.length
// productsList.reduce((acc, product) => {
//   if ( !shoppingCart.includes(product.title) ) return;

//   Object.entries(product).reduce((acc, [key, value]) => {
//     if ( !['title', 'author', 'price'].includes(key) ) return;
//     const productInCart = document.createElement('div');
//     productInCart.classList.add('cart_container');
//     const btnRemoveFromCart = document.createElement('div');
//     btnRemoveFromCart.classList.add('btn_close');
//     btnRemoveFromCart.dataset.action = 'removefromcart';
  
//     const node = document.createElement('p');
//     node.textContent = value;
//     node.classList.add(`cart_${key}`);
  
//     productInCart.append(node);
//     cartContainer.append(productInCart);
//   })
// }, 0)

cart.append(cartContainer);

mainContainer.append(catalog);
mainContainer.append(cart);


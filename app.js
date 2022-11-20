import { productsList } from './products/product-list.mjs';

const body = document.body;

const wrapper = body.appendChild(document.createElement('div'));
wrapper.classList.add('wrapper');

const header = wrapper.appendChild(document.createElement('header'));
const main = wrapper.appendChild(document.createElement('main'));
const footer = wrapper.appendChild(document.createElement('footer'));

const div = header.appendChild(document.createElement('div'));
div.innerHTML = 'Welcome to the JS book shop';

const mainContainer = main.appendChild(document.createElement('div'));
mainContainer.classList.add('main_container')

const catalog = new DocumentFragment();
const productsContainer = document.createElement('div');
productsContainer.classList.add('products_container');
catalog.append(productsContainer);

productsList.reduce((acc, product) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.addEventListener('click', (event) => {
    console.log(event.target.dataset.action);
    const action = event.target.dataset.action;
    if (action === 'showmore') {
      const div = event.target.parentNode.closest('.card').firstChild.lastChild.lastChild;
      console.log(div);
      div.style.display = 'block';
    }

    if (action === 'closedescription') {
      const div = event.target.parentNode.closest('.card').firstChild.lastChild.lastChild;
      console.log(div);
      div.style.display = 'none';
    }
  });

  const productWrapper = card.appendChild(document.createElement('div'));
  productWrapper.classList.add('product_wrapper');

  const image = new Image();
  image.src = product.cover;
  image.classList.add('product_image');
  image.alt = product.description;
  productWrapper.append(image); 

  const productInfo = document.createElement('div');
  productInfo.classList.add('product_info');

  Object.entries(product).reduce((acc, [key, value]) => {
    if (key === 'cover') return;
    const node = document.createElement('div');
    node.textContent = value;
    node.classList.add(`product_${key}`);

    if (key === 'description') {
      const btnCloseDescr = node.appendChild(document.createElement('div'));
      btnCloseDescr.classList.add('btn-close');
      btnCloseDescr.textContent = 'x';
      btnCloseDescr.dataset.action = 'closedescription';
    };

    productInfo.append(node);
  }, 0)
  
  productWrapper.append(productInfo);
  card.append(productWrapper);

  const btnWrapper = card.appendChild(document.createElement('div'));
  btnWrapper.classList.add('btn_wrapper');
  
  const btnAddToCart = btnWrapper.appendChild(document.createElement('button'));
  btnAddToCart.classList.add('btn', 'btn_show_more');
  btnAddToCart.textContent = 'add to cart';
  btnAddToCart.dataset.action = 'addtocart';

  const btnShowMore = btnWrapper.appendChild(document.createElement('button'));
  btnShowMore.classList.add('btn', 'btn_add_to_cart');
  btnShowMore.textContent = 'show more';
  btnShowMore.dataset.action = 'showmore';

  productsContainer.append(card);
}, 0)

const cart = new DocumentFragment();
const cartContainer = document.createElement('div');
cartContainer.textContent = 'Shopping cart area';
cartContainer.classList.add('cart_container');
cart.append(cartContainer);

mainContainer.append(catalog);
mainContainer.append(cart);

const shoppingCart = [];

const CART_KEY = 'foodieCart';

function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

window.FoodieCart = { getCart, saveCart };

const cartContent = document.querySelector('#cart-content');

function formatPrice(price) {
  return `৳ ${Number(price).toLocaleString()}`;
}

function renderCart() {
  const cart = getCart();

  if (!cart.length) {
    cartContent.innerHTML = `
      <div class="empty-cart">
        <span aria-hidden="true">🛒</span>
        <h2>Your cart is empty</h2>
        <p>Add something delicious from our menu to get started.</p>
        <a class="button button-primary" href="../index.html#menu">Browse Menu <span aria-hidden="true">→</span></a>
      </div>`;
    return;
  }

  const items = cart.map((item, index) => `
    <article class="cart-item">
      <div class="item-details"><h2>${item.name}</h2><p>Price: ${formatPrice(item.price)}</p></div>
      <div class="quantity-controls" aria-label="Quantity for ${item.name}">
        <button type="button" data-action="decrease" data-index="${index}" aria-label="Decrease ${item.name} quantity">−</button>
        <span>${item.quantity}</span>
        <button type="button" data-action="increase" data-index="${index}" aria-label="Increase ${item.name} quantity">+</button>
      </div>
      <strong class="item-subtotal">${formatPrice(item.price * item.quantity)}</strong>
      <button class="remove-item" type="button" data-action="remove" data-index="${index}">Remove</button>
    </article>`).join('');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartContent.innerHTML = `<div class="cart-list">${items}</div><div class="cart-total"><span>Total</span><strong>${formatPrice(total)}</strong></div><div class="cart-actions"><a class="button button-primary" href="checkout.html">Proceed to Checkout <span aria-hidden="true">→</span></a></div>`;
}

if (cartContent) {
  cartContent.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const cart = getCart();
    const index = Number(button.dataset.index);
    const item = cart[index];
    if (!item) return;

    if (button.dataset.action === 'increase') item.quantity += 1;
    if (button.dataset.action === 'decrease') item.quantity -= 1;
    if (button.dataset.action === 'remove' || item.quantity < 1) cart.splice(index, 1);

    saveCart(cart);
    renderCart();
  });

  document.querySelector('#year').textContent = new Date().getFullYear();
  renderCart();
}
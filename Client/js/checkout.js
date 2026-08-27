const CART_KEY = 'foodieCart';
const ORDER_API_URL = 'http://localhost:5000/api/orders';
const checkoutContent = document.querySelector('#checkout-content');
let isSubmitting = false;

function isValidCartItem(item) { return item && typeof item.name === 'string' && item.name.trim() && Number.isFinite(Number(item.price)) && Number.isInteger(Number(item.quantity)) && Number(item.quantity) > 0; }
function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    return Array.isArray(cart) ? cart.filter(isValidCartItem).map((item) => ({ name: item.name.trim(), price: Number(item.price), quantity: Number(item.quantity) })) : [];
  } catch { return []; }
}
function formatPrice(price) { return `৳ ${Number(price).toLocaleString()}`; }
function getTotal(cart) { return cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0); }
function createSummary(cart) {
  const summary = document.createElement('section');
  summary.className = 'order-summary checkout-card';
  summary.setAttribute('aria-labelledby', 'order-summary-title');
  summary.innerHTML = '<h2 id="order-summary-title">Order Summary</h2><div class="summary-heading"><span>Item</span><span>Price</span><span>Qty</span><span>Subtotal</span></div>';
  const itemList = document.createElement('div'); itemList.className = 'summary-items';
  cart.forEach((item) => {
    const row = document.createElement('div'); row.className = 'summary-item';
    [item.name, formatPrice(item.price), item.quantity, formatPrice(Number(item.price) * Number(item.quantity))].forEach((value) => { const cell = document.createElement('span'); cell.textContent = value; row.append(cell); });
    itemList.append(row);
  });
  summary.append(itemList);
  const total = document.createElement('div'); total.className = 'checkout-total'; total.innerHTML = `<span>Total</span><strong>${formatPrice(getTotal(cart))}</strong>`; summary.append(total);
  return summary;
}
function createForm() {
  const form = document.createElement('form'); form.className = 'checkout-form checkout-card'; form.noValidate = true;
  form.innerHTML = '<h2>Delivery Details</h2><p class="form-intro">Tell us where to bring your fresh order.</p><div class="form-message" role="alert" aria-live="assertive"></div><label for="customer-name">Customer name</label><input id="customer-name" name="name" type="text" autocomplete="name" required><label for="phone">Phone</label><input id="phone" name="phone" type="tel" autocomplete="tel" required><label for="address">Delivery address</label><textarea id="address" name="address" rows="4" autocomplete="street-address" required></textarea><button class="button button-primary place-order" type="submit">Place Order <span aria-hidden="true">→</span></button>';
  form.addEventListener('submit', submitOrder); return form;
}
function showMessage(form, message, type = '') { const messageBox = form.querySelector('.form-message'); messageBox.textContent = message; messageBox.className = `form-message ${type}`; }
async function submitOrder(event) {
  event.preventDefault(); if (isSubmitting) return;
  const form = event.currentTarget; const formData = new FormData(form);
  const name = formData.get('name').trim(); const phone = formData.get('phone').trim(); const address = formData.get('address').trim(); const cart = getCart();
  if (!cart.length) { renderCheckout(); return; }
  const token = localStorage.getItem('foodieToken');
  if (!token) { showMessage(form, 'Please log in first.', 'error'); return; }
  if (!name || !phone || !address) { showMessage(form, 'Please complete your name, phone number, and delivery address.', 'error'); return; }
  isSubmitting = true; const button = form.querySelector('button[type="submit"]'); button.disabled = true; button.textContent = 'Placing order…'; showMessage(form, '');
  try {
    const items = cart.map((item) => ({ ...item, subtotal: item.price * item.quantity }));
    const response = await fetch(ORDER_API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ name, phone, address, items, total: getTotal(cart) }) });
    const data = await response.json().catch(() => ({}));
    if (response.status !== 201) throw new Error(data.message || data.error || 'We could not place your order. Please try again.');
    localStorage.removeItem(CART_KEY); showMessage(form, 'Your order has been placed successfully! Redirecting to your orders…', 'success'); setTimeout(() => { window.location.href = 'orders.html'; }, 1800);
  } catch (error) {
    showMessage(form, error.message || 'Unable to reach the ordering service. Please try again.', 'error'); isSubmitting = false; button.disabled = false; button.innerHTML = 'Place Order <span aria-hidden="true">→</span>';
  }
}
function renderEmptyCart() { checkoutContent.innerHTML = '<div class="empty-cart"><span aria-hidden="true">🛒</span><h2>Your cart is empty</h2><p>Add something delicious from our menu before checking out.</p><a class="button button-primary" href="../index.html#menu">Browse Menu <span aria-hidden="true">→</span></a></div>'; }
function renderCheckout() { const cart = getCart(); checkoutContent.replaceChildren(); if (!cart.length) { renderEmptyCart(); return; } const layout = document.createElement('div'); layout.className = 'checkout-layout'; layout.append(createSummary(cart), createForm()); checkoutContent.append(layout); }
document.querySelector('#year').textContent = new Date().getFullYear();
renderCheckout();
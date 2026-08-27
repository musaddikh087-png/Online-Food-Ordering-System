const ORDERS_API_URL = 'http://localhost:5000/api/orders';
const ordersContent = document.querySelector('#orders-content');

function formatPrice(value) { const price = Number(value); return `৳ ${Number.isFinite(price) ? price.toLocaleString() : '0'}`; }
function formatDate(value) { const date = new Date(value); return Number.isNaN(date.getTime()) ? 'Date unavailable' : new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(date); }
function createState({ icon, title, message, error = false, showMenuLink = false }) {
  const state = document.createElement('div'); state.className = `orders-state${error ? ' orders-state-error' : ''}`;
  const iconElement = document.createElement('span'); iconElement.className = 'state-icon'; iconElement.setAttribute('aria-hidden', 'true'); iconElement.textContent = icon;
  const heading = document.createElement('h2'); heading.textContent = title;
  const text = document.createElement('p'); text.textContent = message;
  state.append(iconElement, heading, text);
  if (showMenuLink) { const link = document.createElement('a'); link.className = 'button button-primary'; link.href = '../index.html#menu'; link.innerHTML = 'Browse the Menu <span aria-hidden="true">→</span>'; state.append(link); }
  return state;
}
function createOrderCard(order) {
  const card = document.createElement('article'); card.className = 'order-card';
  const header = document.createElement('div'); header.className = 'order-header'; const details = document.createElement('div');
  const label = document.createElement('span'); label.className = 'order-label'; label.textContent = 'Order ID';
  const id = document.createElement('strong'); id.className = 'order-id'; id.textContent = order._id || order.id || 'Unavailable';
  const date = document.createElement('p'); date.className = 'order-date'; date.textContent = formatDate(order.createdAt); details.append(label, id, date);
  const status = document.createElement('span'); status.className = 'status'; status.textContent = order.status || 'Pending'; header.append(details, status);
  const body = document.createElement('div'); body.className = 'order-body'; const headings = document.createElement('div'); headings.className = 'items-heading';
  ['Items', 'Price', 'Quantity', 'Subtotal'].forEach((text) => { const heading = document.createElement('span'); heading.textContent = text; headings.append(heading); }); body.append(headings);
  const items = Array.isArray(order.items) ? order.items : [];
  items.forEach((item) => { const row = document.createElement('div'); row.className = 'order-item'; [item.name || 'Item unavailable', formatPrice(item.price), item.quantity ?? 0, formatPrice(item.subtotal ?? Number(item.price) * Number(item.quantity))].forEach((text) => { const cell = document.createElement('span'); cell.textContent = text; row.append(cell); }); body.append(row); });
  const total = document.createElement('div'); total.className = 'order-total'; const totalLabel = document.createElement('span'); totalLabel.textContent = 'Order Total'; const totalValue = document.createElement('strong'); totalValue.textContent = formatPrice(order.total); total.append(totalLabel, totalValue);
  card.append(header, body, total); return card;
}
async function loadOrders() {
  ordersContent.replaceChildren(); ordersContent.setAttribute('aria-busy', 'true'); const loading = document.createElement('div'); loading.className = 'loading-state'; loading.innerHTML = '<span class="loading-spinner" aria-hidden="true"></span><span>Loading your orders…</span>'; ordersContent.append(loading);
  try {
    const token = localStorage.getItem('foodieToken');
    const response = await fetch(ORDERS_API_URL, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }); const data = await response.json().catch(() => ({}));
    if (!response.ok) { if (response.status === 401) throw new Error('authentication'); throw new Error(data.message || 'We could not load your orders. Please try again.'); }
    const orders = Array.isArray(data.orders) ? data.orders : []; ordersContent.replaceChildren();
    if (!orders.length) { ordersContent.append(createState({ icon: '🍽️', title: 'No orders yet', message: 'Your order history will appear here after you place an order.', showMenuLink: true })); return; }
    const list = document.createElement('div'); list.className = 'orders-list'; orders.forEach((order) => list.append(createOrderCard(order))); ordersContent.append(list);
  } catch (error) {
    ordersContent.replaceChildren(); const isAuthenticationError = error.message === 'authentication';
    ordersContent.append(createState({ icon: isAuthenticationError ? '🔒' : '⚠️', title: isAuthenticationError ? 'Orders need authentication' : 'Unable to load orders', message: isAuthenticationError ? 'Please log in to view your order history.' : error.message || 'Unable to reach the ordering service. Please try again.', error: true, showMenuLink: !isAuthenticationError }));
  } finally { ordersContent.setAttribute('aria-busy', 'false'); }
}
document.querySelector('#year').textContent = new Date().getFullYear();
loadOrders();
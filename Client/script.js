// Mobile navigation menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

// Close the mobile menu after choosing a link.
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Add food from the existing menu cards to the persistent cart.
const toast = document.querySelector('.toast');
document.querySelectorAll('.add-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.food-card');
    const name = button.dataset.food;
    const price = Number(card.querySelector('.food-bottom strong').textContent.replace(/[^0-9.]/g, ''));
    const cart = FoodieCart.getCart();
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    FoodieCart.saveCart(cart);
    toast.textContent = `${name} added to your cart!`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  });
});

// Keep the footer copyright year current.
document.querySelector('#year').textContent = new Date().getFullYear();

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

// Simple visual feedback only; this does not add items to a real cart.
const toast = document.querySelector('.toast');
document.querySelectorAll('.add-cart').forEach((button) => {
  button.addEventListener('click', () => {
    toast.textContent = `${button.dataset.food} is ready to add to your cart!`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  });
});

// Keep the footer copyright year current.
document.querySelector('#year').textContent = new Date().getFullYear();

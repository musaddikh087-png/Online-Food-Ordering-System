const registerForm = document.getElementById('register-form');

if (registerForm) {
  const message = document.getElementById('form-message');
  const registerButton = document.getElementById('register-button');

  const showMessage = (text, type) => {
    message.textContent = text;
    message.className = `form-message ${type}`;
    message.hidden = false;
  };

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = registerForm.elements.name.value.trim();
    const email = registerForm.elements.email.value.trim();
    const password = registerForm.elements.password.value;
    const confirmPassword = registerForm.elements.confirmPassword.value;

    if (password !== confirmPassword) {
      showMessage('Passwords do not match.', 'error');
      return;
    }

    registerButton.disabled = true;
    registerButton.textContent = 'Creating account...';

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      showMessage(data.message || 'Registration successful. Redirecting to login...', 'success');
      registerForm.reset();
      window.setTimeout(() => { window.location.href = 'login.html'; }, 1200);
    } catch (error) {
      showMessage(error.message || 'Unable to reach the server. Please try again.', 'error');
      registerButton.disabled = false;
      registerButton.innerHTML = 'Create account <span aria-hidden="true">→</span>';
    }
  });
}
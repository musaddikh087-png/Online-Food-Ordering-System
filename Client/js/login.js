const loginForm = document.getElementById('login-form');

if (loginForm) {
  const message = document.getElementById('form-message');
  const loginButton = document.getElementById('login-button');

  const showMessage = (text, type) => {
    message.textContent = text;
    message.className = `form-message ${type}`;
    message.hidden = false;
  };

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = loginForm.elements.email.value.trim();
    const password = loginForm.elements.password.value;
    loginButton.disabled = true;
    loginButton.textContent = 'Logging in...';

    try {
      const response = await fetch(window.FOODIE_API_CONFIG.endpoints.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please try again.');
      }

      if (!data.token) {
        throw new Error('Login did not return an authentication token.');
      }

      localStorage.setItem('foodieToken', data.token);
      if (data.user) localStorage.setItem('foodieUser', JSON.stringify(data.user));

      showMessage(data.message || 'Login successful. Redirecting...', 'success');
      window.setTimeout(() => { window.location.href = '../index.html'; }, 900);
    } catch (error) {
      showMessage(error.message || 'Unable to reach the server. Please try again.', 'error');
      loginButton.disabled = false;
      loginButton.innerHTML = 'Log in <span aria-hidden="true">→</span>';
    }
  });
}

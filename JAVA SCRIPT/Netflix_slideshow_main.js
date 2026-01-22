document.addEventListener('DOMContentLoaded', () => {

  function sendToPasswordPage(emailInputId) {
    const emailInput = document.getElementById(emailInputId);
    if (!emailInput) {
      console.error(`Element with ID "${emailInputId}" not found.`);
      return;
    }

    const email = emailInput.value.trim();
    let registeredEmails = JSON.parse(localStorage.getItem('registeredEmails')) || [];

    // Reset input style
    emailInput.style.border = '';

    if (email === '') {
      emailInput.placeholder = 'Please enter your email';
      emailInput.style.border = '2px solid red';
      emailInput.focus();
      return;
    } else if (!email.endsWith('@gmail.com')) {
      emailInput.value = '';
      emailInput.placeholder = 'Email must end with @gmail.com';
      emailInput.style.border = '2px solid red';
      emailInput.focus();
      return;
    } else if (registeredEmails.includes(email)) {
      // Email already registered
      emailInput.value = '';
      emailInput.placeholder = 'This email is registered. Redirecting...';
      emailInput.style.border = '2px solid red';
      emailInput.focus();

      setTimeout(() => {
        window.location.href = 'Sign_in.html';
      }, 1500); // Redirect after 1.5s
      return;
    } else {
      // New email, save it as the only registered email
      localStorage.setItem('registeredEmails', JSON.stringify([email]));
      localStorage.setItem('currentEmail', email);
      window.location.href = 'password.html';
    }
  }

  // Hook buttons
  window.validateEmail = () => sendToPasswordPage('email');
  window.validateEmailBottom = () => sendToPasswordPage('email2');

  // =========================
  // FAQ TOGGLE
  // =========================
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const icon = q.querySelector('.toggle-icon');
      if (!answer || !icon) return;

      if (answer.style.display === 'block') {
        answer.style.display = 'none';
        icon.textContent = '+';
      } else {
        answer.style.display = 'block';
        icon.textContent = '−';
      }
    });
  });

});

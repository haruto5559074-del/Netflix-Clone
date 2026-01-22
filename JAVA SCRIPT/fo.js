document.addEventListener('DOMContentLoaded', () => {

  const container = document.querySelector('.container');
  const forgotPasswordCard = container.children[0];
  const forgotEmailCard = container.children[1];

  // Hide both sections initially
  forgotPasswordCard.style.display = 'none';
  forgotEmailCard.style.display = 'none';

  // =========================
  // Step choice buttons
  // =========================
  const stepDiv = document.createElement('div');
  stepDiv.className = 'step';
  stepDiv.innerHTML = `
    <h2 style="margin-bottom:16px; opacity:0; transform:translateY(-20px)">Recover Account</h2>
    <p style="margin-bottom:20px; opacity:0; transform:translateY(-20px)">Choose what you want to recover:</p>
    <button id="recoverPasswordBtn" class="btn" style="
        opacity:0; 
        transform:translateY(50px); 
        display:block; 
        width:220px; 
        padding:16px; 
        font-size:16px; 
        margin-bottom:16px;
    ">Recover Password</button>
    <button id="recoverEmailBtn" class="btn" style="
        opacity:0; 
        transform:translateY(50px); 
        display:block; 
        width:220px; 
        padding:16px; 
        font-size:16px;
    ">Recover Email</button>
  `;
  container.parentNode.insertBefore(stepDiv, container);

  const recoverPasswordBtn = document.getElementById('recoverPasswordBtn');
  const recoverEmailBtn = document.getElementById('recoverEmailBtn');

  // =========================
  // Hover effect
  // =========================
  const style = document.createElement('style');
  style.innerHTML = `
    .btn:hover {
      transform: scale(1.05);
      box-shadow: 7 15px 40px rgba(229, 9, 20, 0.4);
      transition: all 0.3s ease-in-out;
    }
  `;
  document.head.appendChild(style);

  // =========================
  // Animate initial step buttons
  // =========================
  setTimeout(() => {
    const elems = stepDiv.querySelectorAll('h2, p, button');
    elems.forEach((el) => {
      el.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    });
  }, 200);

  // =========================
  // Animation helpers
  // =========================
  function showSection(section) {
    section.style.display = 'block';
    section.style.opacity = 0;
    section.style.transform = 'translateX(50px) translateY(30px) rotateZ(-4deg) scale(0.95)';
    section.style.transition = 'all 0.7s cubic-bezier(0.23, 1, 0.32, 1)';
    requestAnimationFrame(() => {
      section.style.opacity = 1;
      section.style.transform = 'translateX(0) translateY(0) rotateZ(0deg) scale(1)';
    });
  }

  function hideStep() {
    stepDiv.style.transition = 'all 0.5s ease-in-out';
    stepDiv.style.opacity = 0;
    stepDiv.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      stepDiv.style.display = 'none';
    }, 500);
  }

  // =========================
  // Accounts helpers
  // =========================
  function getAccounts() {
    return JSON.parse(localStorage.getItem('registeredAccounts')) || [];
  }
  function findAccountByEmail(email) {
    return getAccounts().find(acc => acc.email.toLowerCase() === email.toLowerCase());
  }
  function findAccountByPassword(password) {
    return getAccounts().find(acc => acc.password === password);
  }

  // =========================
  // Button actions
  // =========================
  recoverPasswordBtn.addEventListener('click', () => {
    hideStep();
    setTimeout(() => showSection(forgotPasswordCard), 500);
  });

  recoverEmailBtn.addEventListener('click', () => {
    hideStep();
    setTimeout(() => showSection(forgotEmailCard), 500);
  });

  // =========================
  // FORGOT PASSWORD LOGIC
  // =========================
  const findPasswordBtn = document.getElementById('findPasswordBtn');
  const emailInput = document.getElementById('email');
  const emailResult = document.getElementById('emailResult');

  findPasswordBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    emailResult.textContent = '';
    emailInput.style.border = '';

    if (email === '') {
      emailResult.textContent = 'Please enter your email.';
      emailResult.className = 'msg error';
      emailInput.style.border = '2px solid red';
      emailInput.focus();
      return;
    }

    const account = findAccountByEmail(email);
    if (!account) {
      emailResult.textContent = 'No account found with this email.';
      emailResult.className = 'msg error';
      emailInput.style.border = '2px solid red';
      emailInput.focus();
    } else {
      emailResult.textContent = `Your password is: ${account.password} (demo)`;
      emailResult.className = 'msg success';
      emailInput.style.border = '2px solid green';
    }
  });

  // =========================
  // FORGOT EMAIL LOGIC
  // =========================
  const findEmailBtn = document.getElementById('findEmailBtn');
  const passwordInput = document.getElementById('password');
  const passwordResult = document.getElementById('passwordResult');

  findEmailBtn.addEventListener('click', () => {
    const password = passwordInput.value.trim();
    passwordResult.textContent = '';
    passwordInput.style.border = '';

    if (password === '') {
      passwordResult.textContent = 'Please enter your password.';
      passwordResult.className = 'msg error';
      passwordInput.style.border = '2px solid red';
      passwordInput.focus();
      return;
    }

    const account = findAccountByPassword(password);
    if (!account) {
      passwordResult.textContent = 'No account found with this password.';
      passwordResult.className = 'msg error';
      passwordInput.style.border = '2px solid red';
      passwordInput.focus();
    } else {
      passwordResult.textContent = `The email linked to this password is: ${account.email} (demo)`;
      passwordResult.className = 'msg success';
      passwordInput.style.border = '2px solid green';
    }
  });

});

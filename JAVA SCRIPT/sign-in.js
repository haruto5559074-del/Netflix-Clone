const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const continueBtn = document.getElementById('continueBtn');
const pwToggle = document.querySelector('.pw-toggle');

pwToggle.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type');
  passwordInput.setAttribute('type', type === 'password' ? 'text' : 'password');
  pwToggle.textContent = type === 'password' ? 'Hide' : 'Show';
  passwordInput.focus();
});

let registeredAccounts = JSON.parse(localStorage.getItem('registeredAccounts')) || [];
continueBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  if(!email||!password){alert("Please enter both email and password.");return;}
  const account = registeredAccounts.find(acc=>acc.email===email&&acc.password===password);
  if(account){window.location.href='get_started.html';}else{alert("Incorrect email or password. Try again.");}
});

// Sparks
const sparkContainer = document.getElementById("spark-container");
function createSpark(){
  const spark=document.createElement("div");
  spark.classList.add("spark");
  spark.style.left=Math.random()*100+"vw";
  spark.style.animationDuration=(3+Math.random()*3)+"s";
  sparkContainer.appendChild(spark);
  setTimeout(()=>spark.remove(),5000);
}
setInterval(createSpark,200);
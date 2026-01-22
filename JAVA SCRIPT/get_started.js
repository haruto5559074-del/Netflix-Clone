const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const searchIcon = document.getElementById('searchIcon');
const searchBox = document.getElementById('searchBox');

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});

searchIcon.addEventListener('click', () => {
  searchBox.classList.toggle('active');
  if(searchBox.classList.contains('active')) searchBox.focus();
});
const profileCircle = document.getElementById('profileCircle');
profileCircle.addEventListener('click', () => {
    window.location.href = 'profile.html'; // link to profile page
});
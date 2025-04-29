// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Dark mode toggle (example)
const toggle = document.createElement('button');
toggle.textContent = '🌙';
toggle.style.position = 'fixed';
toggle.style.bottom = '20px';
toggle.style.right = '20px';
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
document.body.appendChild(toggle);

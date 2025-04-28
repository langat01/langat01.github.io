// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const icon = themeToggle.querySelector('i');
  
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

// 3D Card Tilt Effect
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const x = e.clientX - card.getBoundingClientRect().left;
    const y = e.clientY - card.getBoundingClientRect().top;
    const centerX = card.offsetWidth / 2;
    const centerY = card.offsetHeight / 2;
    const angleX = (y - centerY) / 20;
    const angleY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});

// Typing Animation
function typeWriter(element, text, i = 0) {
  if (i < text.length) {
    element.innerHTML += text.charAt(i);
    i++;
    setTimeout(() => typeWriter(element, text, i), 100);
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Typing effect
  const tagline = document.querySelector('.tagline');
  if (tagline) {
    tagline.innerHTML = '';
    typeWriter(tagline, tagline.textContent);
  }
  
  // Initialize particle.js if on homepage
  if (document.querySelector('.hero')) {
    particlesJS("particles-js", {
      /* Particle.js config from earlier */
    });
  }
});

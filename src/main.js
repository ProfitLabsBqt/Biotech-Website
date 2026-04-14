// src/main.js

document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Sticky Navbar implementation
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
      
      // If we scroll past the dark hero section, change logo to dark version if needed
      // Currently using a unified logo, but we can manage nav text colors dynamically
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Logic
  const toggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  // Basic toggle - assumes user will add appropriate CSS for mobile dropdown
  if(toggle) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // --- Cinematic Scroll Intersection Observers ---
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-text');

  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // WhatsApp Inquiry Redirection
  const form = document.getElementById('contactForm');
  if(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const phone = document.getElementById('contactPhone').value;
      const type = document.getElementById('contactType').value;
      const message = document.getElementById('contactMessage').value;
      
      const whatsappNumber = '919713828279';
      const text = `Hello Biotech Fuels,\n\nI am interested in ${type}.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
      
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      
      window.open(whatsappUrl, '_blank');
      
      form.reset();
    });
  }
});

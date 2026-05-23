// src/main.js

document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sticky Navbar implementation
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Mobile Menu Logic
  const toggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      toggle.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        toggle.classList.remove('active');
      });
    });
  }

  // --- Scroll Intersection Observers ---
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-text');
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
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

  // --- Interactive Process Timeline Observer ---
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px"
  };

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, timelineOptions);

  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });

  // --- Technical Specifications Tab Logic ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update active button
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update active panel
      tabPanels.forEach(panel => {
        if (panel.id === targetTab) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // --- B2B Inquiry Builder Widget Logic ---
  const calcProduct = document.getElementById('calc-product');
  const calcPackaging = document.getElementById('calc-packaging');
  const calcVolumeSlider = document.getElementById('calc-volume-slider');
  const calcVolumeVal = document.getElementById('calc-volume-val');
  const calcVolumeUnit = document.getElementById('calc-volume-unit');
  const calcSummaryText = document.getElementById('calc-summary-text');
  const calcApplyBtn = document.getElementById('calc-apply-btn');

  // Form Elements to target
  const contactType = document.getElementById('contactType');
  const contactMessage = document.getElementById('contactMessage');

  if (calcProduct && calcVolumeSlider && calcPackaging) {
    const updateCalculator = () => {
      const product = calcProduct.value;
      const packaging = calcPackaging.value;
      let volume = parseInt(calcVolumeSlider.value, 10);
      
      let unit = "Liters";
      if (product === "Premium Rice DDGS") {
        unit = "Metric Tons (MT)";
        // Set DDGS ranges if not already adjusted
        if (calcVolumeSlider.max > 5000) {
          calcVolumeSlider.min = 10;
          calcVolumeSlider.max = 2000;
          calcVolumeSlider.step = 10;
          calcVolumeSlider.value = 100;
          volume = 100;
        }
      } else {
        unit = "Liters";
        // Set Ethanol ranges if not already adjusted
        if (calcVolumeSlider.max <= 2000) {
          calcVolumeSlider.min = 5000;
          calcVolumeSlider.max = 500000;
          calcVolumeSlider.step = 5000;
          calcVolumeSlider.value = 50000;
          volume = 50000;
        }
      }

      // Sync packaging options availability based on product selection
      const options = calcPackaging.options;
      if (product === "Premium Rice DDGS") {
        options[1].disabled = true;  // Disable Drums for DDGS
        options[2].disabled = false; // Enable PP Bags for DDGS
        if (packaging === "HDPE Drums") {
          calcPackaging.value = "50kg PP Bags";
        }
      } else {
        options[1].disabled = false; // Enable Drums for Ethanol
        options[2].disabled = true;  // Disable PP Bags for Ethanol
        if (packaging === "50kg PP Bags") {
          calcPackaging.value = "Bulk Tanker";
        }
      }

      // Format volume with commas
      const formattedVolume = volume.toLocaleString();
      calcVolumeVal.textContent = formattedVolume;
      calcVolumeUnit.textContent = unit;

      // Update visual summary text
      calcSummaryText.textContent = `${formattedVolume} ${unit} of ${product} in ${calcPackaging.value}`;
    };

    // Listeners
    calcProduct.addEventListener('change', updateCalculator);
    calcPackaging.addEventListener('change', updateCalculator);
    calcVolumeSlider.addEventListener('input', updateCalculator);

    // Initial setup
    updateCalculator();

    // Apply button integration
    if (calcApplyBtn) {
      calcApplyBtn.addEventListener('click', () => {
        const product = calcProduct.value;
        const packaging = calcPackaging.value;
        const volume = parseInt(calcVolumeSlider.value, 10).toLocaleString();
        const unit = calcVolumeUnit.textContent;

        // Auto-select Form Inquiry Type
        if (product === "Pharma-Grade Ethanol") {
          contactType.value = "Pharma-Grade Ethanol";
        } else {
          contactType.value = "Premium Rice DDGS Supply";
        }

        // Auto-fill Message Textarea
        contactMessage.value = `Dear sales team, we would like to request a quotation for:\n- Product: ${product}\n- Volume Required: ${volume} ${unit}\n- Packaging Type: ${packaging}\n\nPlease get in touch regarding commercial terms.`;

        // Smooth scroll to contact form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          
          // Flash the contact form container to draw attention
          const formCard = document.querySelector('.sf-form');
          if (formCard) {
            formCard.style.boxShadow = '0 0 30px rgba(141, 198, 63, 0.4)';
            setTimeout(() => {
              formCard.style.boxShadow = '';
            }, 1500);
          }
        }
      });
    }
  }

  // --- WhatsApp Inquiry Redirection ---
  const form = document.getElementById('contactForm');
  if (form) {
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

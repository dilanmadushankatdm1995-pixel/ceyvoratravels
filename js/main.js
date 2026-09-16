/**
 * Ceyvora Travels - Sri Lanka Luxury Tourism Agency
 * Main JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initStickyHeader();
  initFaqAccordions();
  initGalleryLightbox();
  initGalleryFiltering();
  initPackingChecklist();
  initBookingForm();
  initLeafletMap();
  handleUrlParams();
});

/* ==========================================================================
   1. Mobile Navigation & Drawer
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const closeBtn = document.querySelector('.mobile-close-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-nav-overlay');

  if (!toggleBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   2. Sticky Header Effect
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
      header.classList.remove('scrolled');
      header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
    }
  });
}

/* ==========================================================================
   3. FAQ Accordion Toggle
   ========================================================================== */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Photo Gallery Filtering
   ========================================================================== */
function initGalleryFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  const galleryItems = document.querySelectorAll('.gallery-item[data-category]');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Photo Gallery Lightbox Modal
   ========================================================================== */
function initGalleryLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxCredit = lightbox.querySelector('.lightbox-credit');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.getAttribute('data-title') || (item.querySelector('h4') ? item.querySelector('h4').innerText : 'Sri Lanka');
      const credit = item.getAttribute('data-credit') || (item.querySelector('p') ? item.querySelector('p').innerText : 'Ceyvora Travels');

      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = title;
      }
      if (lightboxTitle) lightboxTitle.innerText = title;
      if (lightboxCredit) lightboxCredit.innerText = credit;

      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   6. Interactive Sri Lanka Map (Leaflet.js)
   ========================================================================== */
function initLeafletMap() {
  const mapElement = document.getElementById('sri-lanka-map');
  if (!mapElement || typeof L === 'undefined') return;

  // Center coordinate of Sri Lanka
  const map = L.map('sri-lanka-map', {
    scrollWheelZoom: false
  }).setView([7.8731, 80.7718], 7.5);

  // CartoDB Voyager or OSM Tile Layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // Key Sri Lanka Tourist Destination Markers
  const destinations = [
    {
      name: "Sigiriya Rock Fortress",
      coords: [7.9570, 80.7603],
      category: "Heritage & Ancient Culture",
      desc: "5th-century palace fortress towering 200m above emerald jungles.",
      link: "destinations.html#sigiriya"
    },
    {
      name: "Kandy (Temple of the Tooth)",
      coords: [7.2906, 80.6337],
      category: "Sacred Cultural Capital",
      desc: "Sri Lanka's spiritual heart and home to the sacred Buddha relic.",
      link: "destinations.html#kandy"
    },
    {
      name: "Ella & Nine Arches Bridge",
      coords: [6.8667, 81.0466],
      category: "Hill Country & Tea Trails",
      desc: "Misty highlands, scenic railway viaducts, and panoramic hikes.",
      link: "destinations.html#ella"
    },
    {
      name: "Galle Dutch Fort",
      coords: [6.0329, 80.2168],
      category: "Colonial Coastal Heritage",
      desc: "UNESCO World Heritage fortress with cobblestone lanes & ocean ramparts.",
      link: "destinations.html#galle"
    },
    {
      name: "Mirissa & Southern Coast",
      coords: [5.9482, 80.4578],
      category: "Beaches & Whale Watching",
      desc: "Palm-fringed crescent beach and prime spot for Blue Whale safaris.",
      link: "destinations.html#mirissa"
    },
    {
      name: "Yala National Park",
      coords: [6.3725, 81.5218],
      category: "Wildlife & Safari",
      desc: "Highest leopard density in Asia, wild elephants, and sloth bears.",
      link: "destinations.html#yala"
    },
    {
      name: "Nuwara Eliya (Little England)",
      coords: [6.9497, 80.7891],
      category: "Tea Estates & Waterfalls",
      desc: "Cool climate, manicured tea plantations, and colonial estates.",
      link: "destinations.html#nuwara-eliya"
    },
    {
      name: "Trincomalee & Pigeon Island",
      coords: [8.5874, 81.2152],
      category: "East Coast & Marine Reserve",
      desc: "Clear turquoise waters, marble beaches, and vibrant coral reefs.",
      link: "destinations.html#trincomalee"
    },
    {
      name: "Colombo Headquarters",
      coords: [6.9271, 79.8612],
      category: "Capital & Ceyvora Head Office",
      desc: "Vibrant metropolis and Ceyvora Travels 24/7 Island Service Desk.",
      link: "contact.html"
    }
  ];

  destinations.forEach(dest => {
    const popupContent = `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 190px; padding: 4px;">
        <span style="font-size: 11px; text-transform: uppercase; color: #d4a373; font-weight: 700; display: block; margin-bottom: 3px;">${dest.category}</span>
        <h4 style="font-family: 'Playfair Display', serif; margin: 0 0 6px 0; color: #0b2545; font-size: 16px;">${dest.name}</h4>
        <p style="margin: 0 0 10px 0; font-size: 12px; color: #64748b; line-height: 1.4;">${dest.desc}</p>
        <a href="${dest.link}" style="display: inline-block; background: #0b2545; color: #ffffff; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; text-decoration: none;">Explore Details &rarr;</a>
      </div>
    `;

    L.marker(dest.coords).addTo(map).bindPopup(popupContent);
  });
}

/* ==========================================================================
   7. Interactive Packing Checklist (Local Storage UX)
   ========================================================================== */
function initPackingChecklist() {
  const checklist = document.querySelectorAll('.checklist-grid input[type="checkbox"]');
  if (!checklist.length) return;

  checklist.forEach((box, index) => {
    const key = `ceyvora_check_${index}`;
    if (localStorage.getItem(key) === 'true') {
      box.checked = true;
    }

    box.addEventListener('change', () => {
      localStorage.setItem(key, box.checked);
    });
  });
}

/* ==========================================================================
   8. Booking & Inquiry Form Validation & Confirmation
   ========================================================================== */
function initBookingForm() {
  const bookingForm = document.getElementById('ceyvora-booking-form');
  const modal = document.getElementById('booking-confirmation-modal');

  if (!bookingForm) return;

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Required fields check
    const requiredInputs = bookingForm.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
      const formGroup = input.closest('.form-group');
      if (!input.value.trim()) {
        isValid = false;
        if (formGroup) formGroup.classList.add('has-error');
      } else {
        if (formGroup) formGroup.classList.remove('has-error');
      }
    });

    // Email format validation
    const emailInput = bookingForm.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const formGroup = emailInput.closest('.form-group');
      if (!emailRegex.test(emailInput.value.trim())) {
        isValid = false;
        if (formGroup) formGroup.classList.add('has-error');
      }
    }

    if (!isValid) {
      alert('Please fill in all required fields marked with an asterisk (*).');
      return;
    }

    // Extract form data for confirmation recap
    const fullName = bookingForm.querySelector('#guest-name')?.value || 'Valued Guest';
    const email = emailInput?.value || '';
    const phone = bookingForm.querySelector('#guest-phone')?.value || '';
    const selectedTour = bookingForm.querySelector('#tour-package')?.selectedOptions[0]?.text || 'Bespoke Custom Itinerary';
    const travelDate = bookingForm.querySelector('#travel-date')?.value || 'To be scheduled';
    const guests = bookingForm.querySelector('#guest-count')?.value || '2';

    // Generate unique confirmation reference code
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const bookingRef = `CEY-2026-${randomCode}`;

    if (modal) {
      const refElement = modal.querySelector('.booking-ref-code');
      const nameElement = modal.querySelector('.confirm-guest-name');
      const tourElement = modal.querySelector('.confirm-tour');
      const dateElement = modal.querySelector('.confirm-date');
      const guestsElement = modal.querySelector('.confirm-guests');

      if (refElement) refElement.innerText = bookingRef;
      if (nameElement) nameElement.innerText = fullName;
      if (tourElement) tourElement.innerText = selectedTour;
      if (dateElement) dateElement.innerText = travelDate;
      if (guestsElement) guestsElement.innerText = `${guests} Travelers`;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      const closeModalBtn = modal.querySelector('.modal-close-btn');
      if (closeModalBtn) {
        closeModalBtn.onclick = () => {
          modal.classList.remove('open');
          document.body.style.overflow = '';
          bookingForm.reset();
        };
      }
    } else {
      alert(`Thank you, ${fullName}! Your inquiry (${bookingRef}) has been received. Our senior Ceylon tour curator will contact you within 12 hours.`);
      bookingForm.reset();
    }
  });
}

/* ==========================================================================
   9. URL Parameters Handler (Dynamic Pre-selection)
   ========================================================================== */
function handleUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const packageParam = urlParams.get('package');
  const tourSelect = document.getElementById('tour-package');

  if (packageParam && tourSelect) {
    for (let i = 0; i < tourSelect.options.length; i++) {
      if (tourSelect.options[i].value.toLowerCase().includes(packageParam.toLowerCase())) {
        tourSelect.selectedIndex = i;
        break;
      }
    }
  }
}

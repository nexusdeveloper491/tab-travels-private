/**
 * VISIT SUNDERBANS (TAB TRAVELS) - Interactive JavaScript
 * High-end editorial safari application with live estimation & WhatsApp routing
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileDrawer();
  initItineraryTabs();
  initIlishMenuTabs();
  initCostCalculator();
  initBackToTop();
  initForms();
});

/* ================= HEADER & SCROLL BEHAVIOR ================= */
function initHeader() {
  const header = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-item-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#') && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          navLinks.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        }
      }
    });
  });
}

/* ================= MOBILE SLIDEOUT DRAWER ================= */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');

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
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

function scrollToCalculator() {
  const calcSection = document.getElementById('calculator');
  if (calcSection) {
    calcSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ================= TOUR PACKAGE FILTERING ================= */
function filterPackages(category) {
  const buttons = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.luxury-tour-card');

  buttons.forEach(btn => {
    if (btn.getAttribute('data-filter') === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
      card.style.animation = 'fadeIn 0.35s ease-out';
    } else {
      card.style.display = 'none';
    }
  });
}

/* ================= ITINERARY TABS SWITCHER ================= */
function initItineraryTabs() {
  const tabButtons = document.querySelectorAll('.itin-nav-pill');
  const panels = document.querySelectorAll('.itinerary-viewport');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetId = this.getAttribute('data-itin');
      
      tabButtons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      this.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ================= ILISH FESTIVAL MENU TABS ================= */
function initIlishMenuTabs() {
  const menuBtns = document.querySelectorAll('.menu-pill-btn');
  const menuContents = document.querySelectorAll('.menu-content-card');

  menuBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const dayId = this.getAttribute('data-day');
      
      menuBtns.forEach(b => b.classList.remove('active'));
      menuContents.forEach(c => c.classList.remove('active'));

      this.classList.add('active');
      const targetContent = document.getElementById(dayId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* ================= LIVE COST ESTIMATOR ================= */
function initCostCalculator() {
  calculateTourCost();
}

function changeQty(inputId, delta) {
  const input = document.getElementById(inputId);
  if (!input) return;
  let val = parseInt(input.value) || 0;
  val = Math.max(parseInt(input.min) || 0, Math.min(parseInt(input.max) || 100, val + delta));
  input.value = val;
  calculateTourCost();
}

function calculateTourCost() {
  const tourTypeEl = document.getElementById('calcTourType');
  const roomTypeEl = document.getElementById('calcRoomType');
  const adultsEl = document.getElementById('calcAdults');
  const kidsEl = document.getElementById('calcKids');

  if (!tourTypeEl || !roomTypeEl || !adultsEl || !kidsEl) return;

  const tourType = tourTypeEl.value;
  const roomType = roomTypeEl.value;
  const adults = parseInt(adultsEl.value) || 1;
  const kids = parseInt(kidsEl.value) || 0;
  
  let adultPrice = 5500;
  let kidPrice = 2800;
  let totalCost = 0;

  if (tourType === '2N3D') {
    if (roomType === 'standard') {
      adultPrice = 5500;
      kidPrice = 2800;
    } else if (roomType === 'deluxe') {
      adultPrice = 6500;
      kidPrice = 3300;
    } else if (roomType === 'premium') {
      adultPrice = 7500;
      kidPrice = 3800;
    }
    totalCost = (adults * adultPrice) + (kids * kidPrice);
  } else if (tourType === '1N2D') {
    if (roomType === 'standard') {
      adultPrice = 4000;
      kidPrice = 2000;
    } else {
      adultPrice = 4500;
      kidPrice = 2300;
    }
    totalCost = (adults * adultPrice) + (kids * kidPrice);
  } else if (tourType === '1DAY') {
    if (adults <= 4) {
      totalCost = 16000;
    } else {
      totalCost = 16000 + ((adults - 4) * 1400);
    }
    totalCost += (kids * 800);
    adultPrice = Math.round(totalCost / (adults || 1));
  } else if (tourType === 'ILISH') {
    if (roomType === 'standard' || roomType === 'deluxe') {
      adultPrice = 8000;
    } else {
      adultPrice = 9000;
    }
    kidPrice = 4500;
    totalCost = (adults * adultPrice) + (kids * kidPrice);
  }

  const totalDisplay = document.getElementById('calcDisplayTotal');
  const perHeadDisplay = document.getElementById('calcPerHeadText');

  if (totalDisplay) {
    totalDisplay.textContent = `₹${totalCost.toLocaleString('en-IN')}`;
  }
  if (perHeadDisplay) {
    perHeadDisplay.textContent = `Approx ₹${adultPrice.toLocaleString('en-IN')} per adult (${adults} Adult${adults > 1 ? 's' : ''}${kids > 0 ? `, ${kids} Child` : ''})`;
  }
}

function sendCalculatedQuoteToWhatsApp() {
  const tourSelect = document.getElementById('calcTourType');
  const tourText = tourSelect.options[tourSelect.selectedIndex].text;
  const roomSelect = document.getElementById('calcRoomType');
  const roomText = roomSelect.options[roomSelect.selectedIndex].text;
  const adults = document.getElementById('calcAdults').value;
  const kids = document.getElementById('calcKids').value;
  const total = document.getElementById('calcDisplayTotal').textContent;

  const msg = `*Safari Estimate - TAB Travels (Visit Sunderbans)*
- Tour Plan: ${tourText}
- Accommodation: ${roomText}
- Party Size: ${adults} Adults, ${kids} Children
- Estimated Total: ${total}

Kindly check date availability and send the official PDF itinerary and payment instructions.`;

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/919038055530?text=${encoded}`, '_blank');
}

/* ================= FAQ ACCORDION ================= */
function toggleFaq(btn) {
  const item = btn.parentElement;
  const allItems = document.querySelectorAll('.accordion-item');

  allItems.forEach(i => {
    if (i !== item) {
      i.classList.remove('active');
    }
  });

  item.classList.toggle('active');
}

/* ================= ITINERARY MODALS ================= */
const modalData = {
  '2N3D': {
    title: 'Sundarban 2 Nights 3 Days Classic Safari',
    body: `
      <div class="modal-body-wrapper">
        <p class="lead-modal"><strong>Route: Kolkata ↔ Godkhali ↔ Sajnekhali ↔ Sudhanyakhali ↔ Dobanki Canopy Walk</strong></p>
        <div class="modal-day-entry">
          <h5>🗓️ Day 1: Departure & Gosaba Heritage Island</h5>
          <p>08:00 AM AC Car/Van departure from Kolkata to Godkhali. Board private safari cruiser, navigate river delta to Gosaba Island. Explore Sir Daniel Hamilton Bungalow and Rabindranath Tagore Bungalow. Check in at Pakhiralay / Dayapur Island eco-resort. Fresh Bengali lunch, creek birdwatching cruise, evening Santhal tribal folk dance & musical show with snacks, followed by grand dinner.</p>
        </div>
        <div class="modal-day-entry">
          <h5>🗓️ Day 2: Full Day Deep Forest & Watchtowers</h5>
          <p>06:30 AM early morning boat safari with onboard hot breakfast. Forest clearance at Sajnekhali Tiger Reserve & Museum. Climb Sudhanyakhali Watch Tower overlooking freshwater pond for Royal Bengal Tigers, spotted deer, and wild boars. Experience the 500m Dobanki Canopy Walk 20ft above ground. Cruise narrow Pirkhali & Gazikhali creeks. Lunch and evening tea onboard. Campfire and dinner at resort.</p>
        </div>
        <div class="modal-day-entry">
          <h5>🗓️ Day 3: Village Life, Pure Honey & Return</h5>
          <p>Morning village walk to Rangabelia Handicraft center to collect pure Sundarban honey. Return boat cruise to Godkhali with farewell lunch onboard. AC vehicle transfer back to Kolkata by 5:30 PM.</p>
        </div>
        <div class="modal-inclusions-card">
          <strong>Key Inclusions:</strong> AC Road Transfers (Kolkata↔Godkhali), 2 Nights Eco-Resort Stay, 3 Days Boat Safari, All Meals (Breakfast, Lunch, Evening Snacks, Dinner), Forest Entry Permits, Guide Fees, and Santhal Tribal Dance Program.
        </div>
      </div>
    `
  },
  '1N2D': {
    title: 'Sundarban 1 Night 2 Days Express Safari',
    body: `
      <div class="modal-body-wrapper">
        <p class="lead-modal"><strong>A refreshing weekend wildlife retreat from Kolkata.</strong></p>
        <div class="modal-day-entry">
          <h5>🗓️ Day 1: Kolkata to Eco-Resort & Creeks</h5>
          <p>08:00 AM pickup from Kolkata. Arrival at Godkhali, boat transfer, visit Hamilton & Tagore heritage bungalows, check in at Dayapur resort, village tour, bird sanctuary boat cruise, and evening cultural show.</p>
        </div>
        <div class="modal-day-entry">
          <h5>🗓️ Day 2: Sajnekhali, Sudhanyakhali, Dobanki & Return</h5>
          <p>Full-day jungle safari covering Sajnekhali Watch Tower, Sudhanyakhali Tiger Reserve, and Dobanki Canopy Walk. Hot breakfast and lunch served onboard while cruising creeks. Return to Godkhali and back in Kolkata by 8:00 PM.</p>
        </div>
      </div>
    `
  },
  '1DAY': {
    title: 'Sundarban 1 Day Express Exclusive Safari',
    body: `
      <div class="modal-body-wrapper">
        <p class="lead-modal"><strong>Exclusive same-day safari with private AC vehicle & exclusive boat.</strong></p>
        <p><strong>05:00 AM:</strong> Early morning departure from Kolkata in dedicated private AC car.<br>
        <strong>08:30 AM:</strong> Arrival at Godkhali, board private boat with hot breakfast & tea.<br>
        <strong>10:00 AM:</strong> Sajnekhali Watch Tower & Museum clearance.<br>
        <strong>12:00 PM:</strong> Sudhanyakhali Watch Tower & sweet-water pond exploration.<br>
        <strong>02:00 PM:</strong> Freshly prepared Bengali lunch served on cruise while navigating creeks.<br>
        <strong>04:30 PM:</strong> Disembark at Godkhali and drive back to Kolkata by 8:00 PM.</p>
      </div>
    `
  },
  'ILISH': {
    title: 'Sundarban Hilsa Festival (ইলিশ উৎসব ২০২৬)',
    body: `
      <div class="modal-body-wrapper">
        <p class="lead-modal"><strong>3 Days / 2 Nights Gourmet Safari with Unlimited River Hilsa!</strong></p>
        <p>Experience the royal taste of Queen Hilsa: <em>Ilish Paturi, Doi Ilish, Hilsa Bhapa, Ilish Bhaja with Monsoon Khichuri, Prawn Malai Curry, and Crab Masala</em>, along with comprehensive boat safaris, Sajnekhali, Sudhanyakhali, Dobanki Canopy walk, and tribal folk nights.</p>
        <p><strong>Tariff:</strong> ₹8,000 (Triple Sharing) | ₹9,000 (Double Sharing) per head all-inclusive.</p>
      </div>
    `
  },
  'LUXURY': {
    title: 'Sundarban Luxury Houseboat & Private Cruiser',
    body: `
      <div class="modal-body-wrapper">
        <p class="lead-modal"><strong>Ultimate VIP Mangrove Cruise with Luxury Cabins & Private Chef.</strong></p>
        <p>Sail aboard a boutique double-decker wooden safari cruiser featuring private air-conditioned cabins with attached modern toilets, panoramic sun viewing deck, dedicated wildlife naturalist, multi-course gourmet Bengali & continental cuisine, and customized creek routes.</p>
      </div>
    `
  },
  'EAST': {
    title: 'Kolkata, Sikkim, Darjeeling & Eastern India Tours',
    body: `
      <div class="modal-body-wrapper">
        <p class="lead-modal"><strong>Curated expeditions across Eastern India by TAB Travels.</strong></p>
        <ul>
          <li><strong>Kolkata City Tours:</strong> 1-Day, 2-Day & 3-Day heritage tours + Ganga River Cruise.</li>
          <li><strong>Durga Puja Parikrama:</strong> Bonedi Rajbari & Gramer Bangla Pujo special parikrama.</li>
          <li><strong>Bengal Getaways:</strong> Gangasagar, Shantiniketan Bolpur, Bishnupur, and Dooars jungle safari.</li>
          <li><strong>Sikkim & North East:</strong> Gangtok, Tsomgo Lake, Silk Route, Darjeeling, Kaziranga National Park & Meghalaya (Shillong, Cherrapunji, Dawki).</li>
        </ul>
      </div>
    `
  }
};

function showItineraryModal(key) {
  const modal = document.getElementById('itinModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  if (modalData[key]) {
    modalTitle.textContent = modalData[key].title;
    modalBody.innerHTML = modalData[key].body;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeItineraryModal() {
  const modal = document.getElementById('itinModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ================= BACK TO TOP ================= */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ================= FORM SUBMISSION & WHATSAPP ROUTING ================= */
function initForms() {
  // Hero Embedded Horizontal Search Dock
  const dockForm = document.getElementById('heroQuickSearchForm');
  if (dockForm) {
    dockForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const tour = document.getElementById('dockTourSelect').value;
      const date = document.getElementById('dockDateInput').value;
      const guests = document.getElementById('dockGuestsSelect').value;
      const phone = document.getElementById('dockPhoneInput').value;

      const msg = `*Sundarban Quick Booking Check - TAB Travels*
- Selected Tour: ${tour}
- Target Date: ${date}
- Group Size: ${guests}
- Contact Phone: ${phone}

Please confirm availability and share tariff quote.`;

      const encoded = encodeURIComponent(msg);
      window.open(`https://wa.me/919038055530?text=${encoded}`, '_blank');
      dockForm.reset();
    });
  }

  // Main Inquiry Form
  const mainForm = document.getElementById('mainInquiryForm');
  if (mainForm) {
    mainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formFullName').value;
      const phone = document.getElementById('formPhone').value;
      const email = document.getElementById('formEmail').value;
      const pkg = document.getElementById('formPackageChoice').value;
      const date = document.getElementById('formTravelDate').value || 'Flexible';
      const guests = document.getElementById('formGuestCount').value;
      const notes = document.getElementById('formSpecialReq').value || 'None';

      const statusMsg = document.getElementById('formStatusMsg');
      if (statusMsg) {
        statusMsg.className = 'form-status-msg success';
        statusMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Inquiry submitted! Opening WhatsApp chat for instant confirmation...';
      }

      const msg = `*New Tour Booking Request - TAB Travels*
- Full Name: ${name}
- Phone: ${phone}
- Email: ${email}
- Tour Package: ${pkg}
- Travel Date: ${date}
- Travelers: ${guests}
- Dietary / Special Notes: ${notes}

Looking forward to your swift confirmation!`;

      const encoded = encodeURIComponent(msg);
      setTimeout(() => {
        window.open(`https://wa.me/919038055530?text=${encoded}`, '_blank');
      }, 500);
    });
  }
}

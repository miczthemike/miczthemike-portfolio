/**
 * The Island Palms Homestay - Interactive Hospitality Application
 * Location: Boulevard St, Lucap, Alaminos City, Pangasinan
 */

(function () {
  'use strict';

  // --- State Management ---
  const state = {
    checkIn: '',
    checkOut: '',
    nights: 1,
    adults: 2,
    children: 0,
    selectedRoomId: 'palm-bliss',
    selectedAddons: {},
    currentStep: 1,
    selectedPaymentMethod: 'gcash',
    bookingRef: '',
    paymentType: 'deposit', // 'deposit', 'full', 'cash'
    rooms: [
      {
        id: 'palm-bliss',
        name: 'Palm Bliss Couple Room',
        category: 'couple',
        price: 1850,
        originalPrice: 2300,
        discount: '20% OFF',
        maxGuests: 2,
        bedConfig: '1 Queen Bed',
        size: '22 m²',
        rating: '4.95',
        reviewsCount: 142,
        badge: 'Top Pick for Couples',
        badgeClass: 'badge-featured',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
        shortDesc: 'Thoughtfully designed sanctuary with hotel-grade queen mattress, natural rattan accents, and private en-suite hot rain shower.',
        amenities: [
          { icon: 'fa-solid fa-wifi', text: 'Fiber Wi-Fi (200 Mbps)' },
          { icon: 'fa-solid fa-snowflake', text: 'Silent Inverter A/C' },
          { icon: 'fa-solid fa-shower', text: 'Pressurized Hot Shower' },
          { icon: 'fa-solid fa-tv', text: '43" Smart TV (Netflix)' },
          { icon: 'fa-solid fa-mug-hot', text: 'Complimentary Local Coffee' },
          { icon: 'fa-solid fa-lock', text: 'Digital Keyless Lock' }
        ],
        longDesc: 'Ideal for couples seeking peace and relaxation after a day on the islands. Features a plush 10-inch pocket-spring queen bed, quiet Daikin inverter air-conditioner, ambient warm coastal lighting, dedicated vanity desk, and modern en-suite bathroom with glass enclosure. Enjoy complimentary morning Pangasinan brewed coffee.'
      },
      {
        id: 'deluxe-seaview',
        name: 'Deluxe Sea-View Suite',
        category: 'seaview',
        price: 2950,
        originalPrice: 3600,
        discount: '18% OFF',
        maxGuests: 4,
        bedConfig: '1 King Bed + 1 Daybed',
        size: '34 m²',
        rating: '4.98',
        reviewsCount: 118,
        badge: 'Panoramic Wharf View',
        badgeClass: 'badge-ocean',
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
        shortDesc: 'Wake up to the gentle sea breeze with an ocean-facing private terrace overlooking Lucap waters and the Hundred Islands horizon.',
        amenities: [
          { icon: 'fa-solid fa-water', text: 'Private Sea-View Balcony' },
          { icon: 'fa-solid fa-bed', text: 'Luxury King Bed' },
          { icon: 'fa-solid fa-wine-glass', text: 'Mini Bar & Refrigerator' },
          { icon: 'fa-solid fa-tv', text: '50" 4K Smart TV' },
          { icon: 'fa-solid fa-couch', text: 'Cozy Daybed Lounge' },
          { icon: 'fa-solid fa-shirt', text: 'Plush Bathrobes & Slippers' }
        ],
        longDesc: 'Our premier luxury retreat. Features private double glass doors opening directly onto your private terrace overlooking Lucap Wharf harbor. Soak in golden Pangasinan sunsets from your outdoor armchairs. Includes king-size luxury bed, convertible daybed, espresso and tea station, and spacious designer bath.'
      },
      {
        id: 'barkada-quad',
        name: 'Barkada / Family Quad Room',
        category: 'barkada',
        price: 3800,
        originalPrice: 4700,
        discount: '20% OFF',
        maxGuests: 8,
        bedConfig: '2 Queen Double Bunks',
        size: '42 m²',
        rating: '4.92',
        reviewsCount: 96,
        badge: 'Barkada Favorite',
        badgeClass: 'badge-green',
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
        shortDesc: 'Engineered specifically for groups and big families. Sturdy solid mahogany double bunks with privacy curtains and dual vanity stations.',
        amenities: [
          { icon: 'fa-solid fa-users', text: 'Fits 4 to 8 Guests' },
          { icon: 'fa-solid fa-sink', text: 'Dual Vanity & Double Shower' },
          { icon: 'fa-solid fa-vault', text: 'Individual Luggage Lockers' },
          { icon: 'fa-solid fa-plug', text: 'Bedside USB-C Ports' },
          { icon: 'fa-solid fa-dice', text: 'Board Games & Cards' },
          { icon: 'fa-solid fa-utensils', text: 'Dining Nook & Mini Fridge' }
        ],
        longDesc: 'The ultimate group basecamp! Custom handcrafted solid mahogany queen-over-queen bunks fitted with heavy sound-dampening privacy curtains and personal reading lights. Never fight over bathroom time thanks to dual vanity sinks and double shower stalls. Perfect for barkadas exploring the islands together.'
      },
      {
        id: 'coastal-garden',
        name: 'Coastal Garden Family Loft',
        category: 'pet',
        price: 3200,
        originalPrice: 3900,
        discount: '18% OFF',
        maxGuests: 5,
        bedConfig: '2 Queen Beds',
        size: '36 m²',
        rating: '4.89',
        reviewsCount: 74,
        badge: 'Pet-Friendly Staycation',
        badgeClass: 'badge-featured',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        shortDesc: 'Ground-floor paradise with private patio opening directly into our palm courtyard. Certified pet-friendly with outdoor rinse area.',
        amenities: [
          { icon: 'fa-solid fa-paw', text: 'Pet-Friendly Room' },
          { icon: 'fa-solid fa-tree', text: 'Direct Garden Patio' },
          { icon: 'fa-solid fa-snowflake', text: 'Inverter Dual A/C' },
          { icon: 'fa-solid fa-kitchen-set', text: 'Microwave & Kettle Station' },
          { icon: 'fa-solid fa-door-open', text: 'Zero Stairs Luggage Access' },
          { icon: 'fa-solid fa-wifi', text: 'High-Speed Fiber Wi-Fi' }
        ],
        longDesc: 'Bring your fur-babies along! This ground floor suite opens onto a breezy private patio framed by areca palms. Quick ground-level access means no stairs for elders, toddlers, or pets. Features two queen beds, convenient kitchenette prep nook with microwave, and outdoor post-beach wash station.'
      }
    ],
    addonsCatalog: [
      {
        id: 'boat-small',
        category: 'boat',
        name: 'Motorized Boat: Small (1-5 pax)',
        price: 1400,
        unit: 'per boat',
        icon: 'fa-solid fa-ship',
        desc: 'Official Lucap Wharf island-hopping banca day tour to Governor\'s, Quezon, Marcos & Children\'s Island. Free wharf boarding escort.'
      },
      {
        id: 'boat-medium',
        category: 'boat',
        name: 'Motorized Boat: Medium (6-10 pax)',
        price: 1800,
        unit: 'per boat',
        icon: 'fa-solid fa-ship',
        desc: 'Ideal for barkadas. Certified LGU outrigger banca with licensed boatman and guide. Covers 4 major islands + caves.'
      },
      {
        id: 'boat-large',
        category: 'boat',
        name: 'Motorized Boat: Large (11-15 pax)',
        price: 2000,
        unit: 'per boat',
        icon: 'fa-solid fa-ship',
        desc: 'Spacious outrigger banca for big family reunions. Includes covered deck, safety vests for all ages, and wharf queue priority.'
      },
      {
        id: 'snorkeling-gear',
        category: 'activity',
        name: 'Snorkeling Mask & Vest Set',
        price: 150,
        unit: 'per set',
        icon: 'fa-solid fa-mask-snorkel',
        desc: 'Sanitized tempered-glass dive mask with dry-top snorkel and USCG approved life vest. Inspected before every rental.',
        hasQty: true,
        qty: 2
      },
      {
        id: 'giant-clam',
        category: 'activity',
        name: 'Giant Clam Sanctuary & Coral Pass',
        price: 400,
        unit: 'per person',
        icon: 'fa-solid fa-fish-fins',
        desc: 'Guided snorkeling session over hundred-year-old giant Tridacna clams in the marine reserve. Includes licensed sanctuary guide.',
        hasQty: true,
        qty: 2
      },
      {
        id: 'pilgrim-zipline',
        category: 'activity',
        name: 'Pilgrim Island 56ft Christ Statue & Zipline',
        price: 250,
        unit: 'per person',
        icon: 'fa-solid fa-person-hiking',
        desc: 'Ascend the 562-step pilgrimage stair path to the 56-foot statue with 360° archipelago views, plus optional island zipline pass.',
        hasQty: true,
        qty: 1
      },
      {
        id: 'bued-mangrove',
        category: 'activity',
        name: 'Bued Mangrove Eco-Park Excursion',
        price: 100,
        unit: 'per person',
        icon: 'fa-solid fa-tree',
        desc: 'Stroll along the 800-meter elevated bamboo walkway over lush mangrove estuaries. 6-minute tricycle ride from homestay.',
        hasQty: true,
        qty: 2
      },
      {
        id: 'sunset-bike',
        category: 'activity',
        name: 'Lucap Boulevard Sunset Bicycle / E-Scooter',
        price: 100,
        unit: 'per hour',
        icon: 'fa-solid fa-bicycle',
        desc: 'Cruise along the scenic Boulevard coastline during golden hour. Complete with basket and safety helmet.',
        hasQty: true,
        qty: 2
      },
      {
        id: 'bbq-setup',
        category: 'food',
        name: 'Fresh Seafood Paluto & Charcoal BBQ Kit',
        price: 250,
        unit: 'per setup',
        icon: 'fa-solid fa-fire-burner',
        desc: 'Bring fresh catch from Lucap market! Includes 2 sacks of local coconut charcoal, tongs, grill grates, and outdoor prep table. FREE for 2+ nights!'
      },
      {
        id: 'picnic-basket',
        category: 'food',
        name: 'Packed Island Picnic Lunch Basket',
        price: 220,
        unit: 'per meal',
        icon: 'fa-solid fa-basket-shopping',
        desc: 'Packed in banana leaves: Pork adobo flakes, salted duck egg with tomatoes, garlic rice, sweet Alaminos mango, and cold bottled water.',
        hasQty: true,
        qty: 2
      }
    ]
  };

  // --- Helper Functions ---
  const formatCurrency = (amount) => {
    return '₱' + Math.round(amount).toLocaleString('en-PH');
  };

  const showToast = (message, icon = 'fa-solid fa-circle-check') => {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  };

  const getTodayDateString = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const calculateNights = (inDate, outDate) => {
    if (!inDate || !outDate) return 1;
    const d1 = new Date(inDate);
    const d2 = new Date(outDate);
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  // --- Initialization ---
  function initDates() {
    state.checkIn = getTodayDateString(1); // Tomorrow
    state.checkOut = getTodayDateString(2); // Day after tomorrow
    state.nights = calculateNights(state.checkIn, state.checkOut);

    const checkInInput = document.getElementById('checkInInput');
    const checkOutInput = document.getElementById('checkOutInput');
    const nightsCountDisplay = document.getElementById('nightsCountDisplay');

    if (checkInInput && checkOutInput) {
      checkInInput.min = getTodayDateString(0);
      checkInInput.value = state.checkIn;

      checkOutInput.min = getTodayDateString(1);
      checkOutInput.value = state.checkOut;

      if (nightsCountDisplay) {
        nightsCountDisplay.textContent = `${state.nights} Night${state.nights > 1 ? 's' : ''}`;
      }

      checkInInput.addEventListener('change', (e) => {
        state.checkIn = e.target.value;
        const nextDay = new Date(state.checkIn);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayStr = nextDay.toISOString().split('T')[0];
        checkOutInput.min = nextDayStr;
        if (state.checkOut <= state.checkIn) {
          state.checkOut = nextDayStr;
          checkOutInput.value = state.checkOut;
        }
        state.nights = calculateNights(state.checkIn, state.checkOut);
        if (nightsCountDisplay) {
          nightsCountDisplay.textContent = `${state.nights} Night${state.nights > 1 ? 's' : ''}`;
        }
        updateRoomPrices();
        updatePlannerSummary();
        showToast(`Dates updated: ${state.nights} night${state.nights > 1 ? 's' : ''} stay`);
      });

      checkOutInput.addEventListener('change', (e) => {
        state.checkOut = e.target.value;
        state.nights = calculateNights(state.checkIn, state.checkOut);
        if (nightsCountDisplay) {
          nightsCountDisplay.textContent = `${state.nights} Night${state.nights > 1 ? 's' : ''}`;
        }
        updateRoomPrices();
        updatePlannerSummary();
        showToast(`Stay updated: ${state.nights} night${state.nights > 1 ? 's' : ''}`);
      });
    }

    const guestsSelect = document.getElementById('guestsSelect');
    if (guestsSelect) {
      guestsSelect.addEventListener('change', (e) => {
        state.adults = parseInt(e.target.value, 10) || 2;
        showToast(`Guest count updated to ${state.adults} guests`);
      });
    }
  }

  // --- Room Showcase Rendering & Filtering ---
  function renderRooms(filter = 'all') {
    const container = document.getElementById('roomsContainer');
    if (!container) return;

    container.innerHTML = '';

    const filteredRooms = state.rooms.filter(room => {
      if (filter === 'all') return true;
      if (filter === 'couple') return room.category === 'couple';
      if (filter === 'seaview') return room.category === 'seaview';
      if (filter === 'barkada') return room.category === 'barkada';
      if (filter === 'pet') return room.category === 'pet';
      return true;
    });

    filteredRooms.forEach(room => {
      const roomCard = document.createElement('article');
      roomCard.className = 'room-card';
      roomCard.id = `room-card-${room.id}`;

      const totalStayCost = room.price * state.nights;

      roomCard.innerHTML = `
        <div class="room-image-wrap">
          <img src="${room.image}" alt="${room.name}" loading="lazy">
          <div class="room-tag-badges">
            <span class="room-badge ${room.badgeClass}">${room.badge}</span>
            <span class="room-badge badge-green"><i class="fa-solid fa-tag"></i> ${room.discount} DIRECT</span>
          </div>
          <button type="button" class="room-quick-view-btn" data-room-id="${room.id}">
            <i class="fa-solid fa-expand"></i> Specs
          </button>
        </div>

        <div class="room-card-body">
          <div class="room-header-row">
            <h3 class="room-title">${room.name}</h3>
            <span style="font-size: 0.85rem; font-weight: 700; color: #f59e0b; display: inline-flex; align-items: center; gap: 4px;">
              <i class="fa-solid fa-star"></i> ${room.rating}
            </span>
          </div>

          <div class="room-meta-specs">
            <span class="meta-spec-item"><i class="fa-solid fa-user-group"></i> Max ${room.maxGuests} Guests</span>
            <span class="meta-spec-item"><i class="fa-solid fa-bed"></i> ${room.bedConfig}</span>
            <span class="meta-spec-item"><i class="fa-solid fa-ruler-combined"></i> ${room.size}</span>
          </div>

          <p class="room-desc">${room.shortDesc}</p>

          <div class="room-amenities-tags">
            ${room.amenities.slice(0, 4).map(a => `
              <span class="amenity-chip"><i class="${a.icon}"></i> ${a.text}</span>
            `).join('')}
          </div>

          <div class="room-card-footer">
            <div class="room-price-box">
              <div class="price-original-row">
                <span class="price-original">${formatCurrency(room.originalPrice)}</span>
                <span class="direct-save-pill">Save ₱${(room.originalPrice - room.price).toLocaleString()}</span>
              </div>
              <div class="price-current-row">
                <span class="room-currency">₱</span>
                <span class="room-amount" data-room-rate="${room.price}">${room.price.toLocaleString()}</span>
                <span class="price-period">/ night</span>
              </div>
              <div class="room-estimated-total" id="est-${room.id}">
                Est: ${formatCurrency(totalStayCost)} for ${state.nights} night${state.nights > 1 ? 's' : ''}
              </div>
            </div>

            <button type="button" class="btn btn-primary btn-book-room" data-room-id="${room.id}">
              <i class="fa-solid fa-calendar-check"></i> Book Direct
            </button>
          </div>
        </div>
      `;

      container.appendChild(roomCard);
    });

    // Attach listeners
    container.querySelectorAll('.btn-book-room').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const roomId = e.currentTarget.getAttribute('data-room-id');
        openBookingModal(roomId);
      });
    });

    container.querySelectorAll('.room-quick-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const roomId = e.currentTarget.getAttribute('data-room-id');
        openQuickViewModal(roomId);
      });
    });
  }

  function updateRoomPrices() {
    state.rooms.forEach(room => {
      const estElem = document.getElementById(`est-${room.id}`);
      if (estElem) {
        const total = room.price * state.nights;
        estElem.textContent = `Est: ${formatCurrency(total)} for ${state.nights} night${state.nights > 1 ? 's' : ''}`;
      }
    });
  }

  function initRoomFilterButtons() {
    const filterButtons = document.querySelectorAll('.room-filter-pill');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterButtons.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const filterVal = e.currentTarget.getAttribute('data-filter');
        renderRooms(filterVal);
      });
    });
  }

  // --- Add-on & Tour Planner ---
  function renderAddons() {
    const boatsContainer = document.getElementById('boatAddonsGrid');
    const activitiesContainer = document.getElementById('activityAddonsGrid');
    const foodContainer = document.getElementById('foodAddonsGrid');

    if (!boatsContainer || !activitiesContainer || !foodContainer) return;

    boatsContainer.innerHTML = '';
    activitiesContainer.innerHTML = '';
    foodContainer.innerHTML = '';

    state.addonsCatalog.forEach(addon => {
      const card = document.createElement('div');
      card.className = `addon-card ${state.selectedAddons[addon.id] ? 'selected' : ''}`;
      card.id = `addon-card-${addon.id}`;
      card.setAttribute('data-addon-id', addon.id);

      const qty = state.selectedAddons[addon.id]?.qty || addon.qty || 1;
      const isSelected = !!state.selectedAddons[addon.id];

      card.innerHTML = `
        <div class="addon-top-row">
          <div style="display:flex; align-items:center; gap: 8px;">
            <i class="${addon.icon}" style="color: var(--palm-600); font-size: 1.1rem;"></i>
            <h4 class="addon-name">${addon.name}</h4>
          </div>
          <div class="addon-check-indicator">
            <i class="fa-solid fa-check"></i>
          </div>
        </div>

        <p class="addon-desc">${addon.desc}</p>

        <div class="addon-bottom-row">
          <div class="addon-price">
            ${formatCurrency(addon.price)} <span>/ ${addon.unit}</span>
          </div>

          ${addon.hasQty ? `
            <div class="addon-qty-control" onclick="event.stopPropagation()">
              <button type="button" class="qty-btn btn-qty-minus" data-id="${addon.id}">-</button>
              <span class="qty-value" id="qty-${addon.id}">${qty}</span>
              <button type="button" class="qty-btn btn-qty-plus" data-id="${addon.id}">+</button>
            </div>
          ` : ''}
        </div>
      `;

      card.addEventListener('click', () => {
        toggleAddon(addon.id);
      });

      if (addon.hasQty) {
        const plusBtn = card.querySelector('.btn-qty-plus');
        const minusBtn = card.querySelector('.btn-qty-minus');

        if (plusBtn) {
          plusBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            changeAddonQty(addon.id, 1);
          });
        }
        if (minusBtn) {
          minusBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            changeAddonQty(addon.id, -1);
          });
        }
      }

      if (addon.category === 'boat') {
        boatsContainer.appendChild(card);
      } else if (addon.category === 'activity') {
        activitiesContainer.appendChild(card);
      } else if (addon.category === 'food') {
        foodContainer.appendChild(card);
      }
    });

    updatePlannerSummary();
  }

  function toggleAddon(addonId) {
    const addon = state.addonsCatalog.find(a => a.id === addonId);
    if (!addon) return;

    if (state.selectedAddons[addonId]) {
      delete state.selectedAddons[addonId];
      showToast(`Removed "${addon.name}" from tour plan`);
    } else {
      // If selecting a boat, deselect other boats (since groups usually need 1 boat)
      if (addon.category === 'boat') {
        state.addonsCatalog.filter(a => a.category === 'boat').forEach(b => {
          delete state.selectedAddons[b.id];
          const bCard = document.getElementById(`addon-card-${b.id}`);
          if (bCard) bCard.classList.remove('selected');
        });
      }
      state.selectedAddons[addonId] = {
        id: addon.id,
        qty: addon.qty || 1
      };
      showToast(`Added "${addon.name}" to tour plan!`);
    }

    const card = document.getElementById(`addon-card-${addonId}`);
    if (card) {
      if (state.selectedAddons[addonId]) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    }

    updatePlannerSummary();
  }

  function changeAddonQty(addonId, delta) {
    const addon = state.addonsCatalog.find(a => a.id === addonId);
    if (!addon) return;

    if (!state.selectedAddons[addonId]) {
      state.selectedAddons[addonId] = { id: addon.id, qty: addon.qty || 1 };
      const card = document.getElementById(`addon-card-${addonId}`);
      if (card) card.classList.add('selected');
    }

    let newQty = (state.selectedAddons[addonId].qty || 1) + delta;
    if (newQty < 1) newQty = 1;
    if (newQty > 20) newQty = 20;

    state.selectedAddons[addonId].qty = newQty;
    const qtyElem = document.getElementById(`qty-${addonId}`);
    if (qtyElem) qtyElem.textContent = newQty;

    updatePlannerSummary();
  }

  function updatePlannerSummary() {
    const listContainer = document.getElementById('plannerSelectedItems');
    const roomEstLine = document.getElementById('plannerRoomEst');
    const addonsTotalLine = document.getElementById('plannerAddonsTotal');
    const grandTotalLine = document.getElementById('plannerGrandTotal');
    const addAllToBookingBtn = document.getElementById('addAllToBookingBtn');

    if (!listContainer) return;

    const selectedRoom = state.rooms.find(r => r.id === state.selectedRoomId) || state.rooms[0];
    const roomTotal = selectedRoom.price * state.nights;

    const selectedKeys = Object.keys(state.selectedAddons);

    if (selectedKeys.length === 0) {
      listContainer.innerHTML = `
        <div class="summary-empty-msg">
          <i class="fa-solid fa-umbrella-beach" style="font-size: 1.8rem; color: var(--sand-400); margin-bottom: 8px; display: block;"></i>
          No add-on tours selected yet.<br>Click any experience above to add it to your stay.
        </div>
      `;
    } else {
      listContainer.innerHTML = '';
      selectedKeys.forEach(key => {
        const itemState = state.selectedAddons[key];
        const addon = state.addonsCatalog.find(a => a.id === key);
        if (!addon) return;

        const qty = itemState.qty || 1;
        let lineCost = addon.price * (addon.hasQty ? qty : 1);

        // Special promo: Seafood BBQ Kit is free for 2+ nights!
        let promoText = '';
        if (addon.id === 'bbq-setup' && state.nights >= 2) {
          lineCost = 0;
          promoText = '<span style="color: var(--sunset-600); font-size: 0.75rem; font-weight: 700;"> (FREE with 2+ nights stay!)</span>';
        }

        const row = document.createElement('div');
        row.className = 'summary-item-row';
        row.innerHTML = `
          <div class="summary-item-left">
            <i class="fa-solid fa-check-circle"></i>
            <div>
              <div class="summary-item-name">${addon.name} ${promoText}</div>
              <div class="summary-item-sub">${addon.hasQty ? `${qty} set(s) × ${formatCurrency(addon.price)}` : addon.unit}</div>
            </div>
          </div>
          <div class="summary-item-price">${formatCurrency(lineCost)}</div>
        `;
        listContainer.appendChild(row);
      });
    }

    // Calculate totals
    let addonsSum = 0;
    selectedKeys.forEach(key => {
      const itemState = state.selectedAddons[key];
      const addon = state.addonsCatalog.find(a => a.id === key);
      if (addon) {
        if (addon.id === 'bbq-setup' && state.nights >= 2) {
          // free
        } else {
          addonsSum += addon.price * (addon.hasQty ? (itemState.qty || 1) : 1);
        }
      }
    });

    const grandTotal = roomTotal + addonsSum;

    if (roomEstLine) {
      roomEstLine.textContent = formatCurrency(roomTotal);
    }
    if (addonsTotalLine) {
      addonsTotalLine.textContent = formatCurrency(addonsSum);
    }
    if (grandTotalLine) {
      grandTotalLine.textContent = formatCurrency(grandTotal);
    }

    if (addAllToBookingBtn) {
      addAllToBookingBtn.innerHTML = `
        <i class="fa-solid fa-cart-plus"></i> Lock In Stay & Tours (${formatCurrency(grandTotal)})
      `;
    }
  }

  // --- Direct Booking Modal (Multi-Step Checkout) ---
  function openBookingModal(roomId = null) {
    if (roomId) {
      state.selectedRoomId = roomId;
    }
    state.currentStep = 1;

    const modal = document.getElementById('bookingModal');
    if (!modal) return;

    // Populate fields
    const modalRoomSelect = document.getElementById('modalRoomSelect');
    if (modalRoomSelect) {
      modalRoomSelect.innerHTML = state.rooms.map(r => `
        <option value="${r.id}" ${r.id === state.selectedRoomId ? 'selected' : ''}>
          ${r.name} (${formatCurrency(r.price)}/night)
        </option>
      `).join('');

      modalRoomSelect.addEventListener('change', (e) => {
        state.selectedRoomId = e.target.value;
        updateModalCalculations();
      });
    }

    const modalCheckIn = document.getElementById('modalCheckIn');
    const modalCheckOut = document.getElementById('modalCheckOut');
    const modalGuests = document.getElementById('modalGuests');

    if (modalCheckIn) modalCheckIn.value = state.checkIn;
    if (modalCheckOut) modalCheckOut.value = state.checkOut;
    if (modalGuests) modalGuests.value = state.adults;

    if (modalCheckIn) {
      modalCheckIn.addEventListener('change', (e) => {
        state.checkIn = e.target.value;
        state.nights = calculateNights(state.checkIn, state.checkOut);
        updateModalCalculations();
      });
    }

    if (modalCheckOut) {
      modalCheckOut.addEventListener('change', (e) => {
        state.checkOut = e.target.value;
        state.nights = calculateNights(state.checkIn, state.checkOut);
        updateModalCalculations();
      });
    }

    updateModalCalculations();
    showStep(1);

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function updateModalCalculations() {
    const selectedRoom = state.rooms.find(r => r.id === state.selectedRoomId) || state.rooms[0];
    const roomSubtotal = selectedRoom.price * state.nights;
    const regularSubtotal = selectedRoom.originalPrice * state.nights;
    const directDiscount = regularSubtotal - roomSubtotal;

    // Add-ons
    let addonsTotal = 0;
    const addonNames = [];
    Object.keys(state.selectedAddons).forEach(k => {
      const a = state.addonsCatalog.find(x => x.id === k);
      if (a) {
        const qty = state.selectedAddons[k].qty || 1;
        let price = a.price * (a.hasQty ? qty : 1);
        if (a.id === 'bbq-setup' && state.nights >= 2) {
          price = 0;
        }
        addonsTotal += price;
        addonNames.push(`${a.name} (${a.hasQty ? `${qty}x` : '1x'})`);
      }
    });

    const grandTotal = roomSubtotal + addonsTotal;
    const depositAmount = Math.round(grandTotal * 0.5);

    // Update Step 1 summary box
    const modalStayDuration = document.getElementById('modalStayDuration');
    const modalRoomTotalDisplay = document.getElementById('modalRoomTotalDisplay');
    const modalAddonsTotalDisplay = document.getElementById('modalAddonsTotalDisplay');
    const modalGrandTotalDisplay = document.getElementById('modalGrandTotalDisplay');
    const modalDiscountPill = document.getElementById('modalDiscountPill');

    if (modalStayDuration) {
      modalStayDuration.textContent = `${state.nights} Night${state.nights > 1 ? 's' : ''} (${state.checkIn} to ${state.checkOut})`;
    }
    if (modalRoomTotalDisplay) {
      modalRoomTotalDisplay.textContent = formatCurrency(roomSubtotal);
    }
    if (modalAddonsTotalDisplay) {
      modalAddonsTotalDisplay.textContent = formatCurrency(addonsTotal);
    }
    if (modalGrandTotalDisplay) {
      modalGrandTotalDisplay.textContent = formatCurrency(grandTotal);
    }
    if (modalDiscountPill) {
      modalDiscountPill.textContent = `Direct Promo: Save ${formatCurrency(directDiscount)}`;
    }

    // Step 2 payment displays
    const depositAmtDisplay = document.getElementById('depositAmtDisplay');
    const fullAmtDisplay = document.getElementById('fullAmtDisplay');
    if (depositAmtDisplay) depositAmtDisplay.textContent = formatCurrency(depositAmount);
    if (fullAmtDisplay) fullAmtDisplay.textContent = formatCurrency(grandTotal);

    // Return calculated summary
    return {
      roomName: selectedRoom.name,
      roomSubtotal,
      addonsTotal,
      grandTotal,
      depositAmount,
      directDiscount,
      addonNames
    };
  }

  function showStep(stepNumber) {
    state.currentStep = stepNumber;

    // Step panels
    const step1 = document.getElementById('bookingStep1');
    const step2 = document.getElementById('bookingStep2');
    const step3 = document.getElementById('bookingStep3');

    if (step1) step1.classList.toggle('active', stepNumber === 1);
    if (step2) step2.classList.toggle('active', stepNumber === 2);
    if (step3) step3.classList.toggle('active', stepNumber === 3);

    // Indicators
    const ind1 = document.getElementById('stepInd1');
    const ind2 = document.getElementById('stepInd2');
    const ind3 = document.getElementById('stepInd3');

    if (ind1 && ind2 && ind3) {
      ind1.className = `step-indicator-item ${stepNumber === 1 ? 'active' : 'done'}`;
      ind2.className = `step-indicator-item ${stepNumber === 2 ? 'active' : (stepNumber > 2 ? 'done' : '')}`;
      ind3.className = `step-indicator-item ${stepNumber === 3 ? 'active' : ''}`;
    }

    // Footer buttons
    const btnModalBack = document.getElementById('btnModalBack');
    const btnModalNext = document.getElementById('btnModalNext');
    const btnModalSubmit = document.getElementById('btnModalSubmit');

    if (btnModalBack) btnModalBack.style.display = (stepNumber === 1 || stepNumber === 3) ? 'none' : 'inline-flex';
    if (btnModalNext) btnModalNext.style.display = (stepNumber === 1) ? 'inline-flex' : 'none';
    if (btnModalSubmit) btnModalSubmit.style.display = (stepNumber === 2) ? 'inline-flex' : 'none';

    // If step 3, populate confirmation
    if (stepNumber === 3) {
      populateConfirmation();
    }
  }

  function populateConfirmation() {
    const calc = updateModalCalculations();
    const guestName = document.getElementById('guestFullName')?.value.trim() || 'Valued Guest';
    const guestPhone = document.getElementById('guestPhone')?.value.trim() || '+63 9XX XXX XXXX';
    const guestEmail = document.getElementById('guestEmail')?.value.trim() || 'guest@example.com';
    const guestRequests = document.getElementById('guestNotes')?.value.trim() || 'Standard check-in';

    // Generate unique Ref ID
    if (!state.bookingRef) {
      state.bookingRef = 'IPH-' + Math.floor(10000 + Math.random() * 90000);
    }

    const refDisplay = document.getElementById('bookingRefDisplay');
    if (refDisplay) refDisplay.textContent = state.bookingRef;

    const summaryBox = document.getElementById('confirmSummaryDetails');
    if (summaryBox) {
      summaryBox.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.88rem; margin-bottom: 14px;">
          <div><strong>Guest Name:</strong> ${guestName}</div>
          <div><strong>Mobile:</strong> ${guestPhone}</div>
          <div><strong>Check-in:</strong> ${state.checkIn} (2:00 PM)</div>
          <div><strong>Check-out:</strong> ${state.checkOut} (12:00 PM)</div>
          <div><strong>Duration:</strong> ${state.nights} Night${state.nights > 1 ? 's' : ''}</div>
          <div><strong>Guests:</strong> ${state.adults} Adults</div>
          <div><strong>Room:</strong> ${calc.roomName}</div>
          <div><strong>Payment Option:</strong> ${state.selectedPaymentMethod.toUpperCase()} (${state.paymentType === 'cash' ? 'Pay upon Check-in' : (state.paymentType === 'deposit' ? '50% Deposit' : 'Full Payment')})</div>
        </div>

        ${calc.addonNames.length > 0 ? `
          <div style="font-size: 0.84rem; padding-top: 10px; border-top: 1px dashed var(--sand-300); margin-bottom: 10px;">
            <strong>Included Island Tours & Add-ons:</strong>
            <ul style="margin: 4px 0 0 18px; color: var(--palm-800);">
              ${calc.addonNames.map(name => `<li>${name}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1.5px solid var(--sand-300); font-weight: 800; font-size: 1.1rem; color: var(--palm-900);">
          <span>Total Booking Amount:</span>
          <span>${formatCurrency(calc.grandTotal)}</span>
        </div>
      `;
    }

    // Format pre-filled messages
    const formattedMessage = `Hi The Island Palms Homestay! I would like to confirm my direct booking:
Booking Reference: ${state.bookingRef}
Guest: ${guestName} (${guestPhone})
Room: ${calc.roomName}
Dates: ${state.checkIn} to ${state.checkOut} (${state.nights} nights, ${state.adults} guests)
Tours/Add-ons: ${calc.addonNames.length > 0 ? calc.addonNames.join(', ') : 'None'}
Total: ${formatCurrency(calc.grandTotal)}
Payment Method: ${state.selectedPaymentMethod.toUpperCase()} (${state.paymentType})
Notes: ${guestRequests}

Looking forward to our stay at The Island Palms Homestay in Lucap!`;

    // Setup Messenger button
    const btnMessenger = document.getElementById('btnConfirmMessenger');
    if (btnMessenger) {
      btnMessenger.onclick = () => {
        const encoded = encodeURIComponent(formattedMessage);
        window.open(`https://m.me/theislandpalmshomestay?text=${encoded}`, '_blank');
      };
    }

    // Setup WhatsApp button
    const btnWhatsApp = document.getElementById('btnConfirmWhatsApp');
    if (btnWhatsApp) {
      btnWhatsApp.onclick = () => {
        const encoded = encodeURIComponent(formattedMessage);
        window.open(`https://wa.me/639491661887?text=${encoded}`, '_blank');
      };
    }

    // Setup Copy button
    const btnCopy = document.getElementById('btnCopySummary');
    if (btnCopy) {
      btnCopy.onclick = () => {
        navigator.clipboard.writeText(formattedMessage).then(() => {
          showToast('Reservation details copied to clipboard!');
        }).catch(() => {
          showToast('Please manually copy the booking text.');
        });
      };
    }

    // Setup Print Voucher
    const btnPrint = document.getElementById('btnPrintVoucher');
    if (btnPrint) {
      btnPrint.onclick = () => {
        window.print();
      };
    }
  }

  function initBookingModalLogic() {
    // Modal Close
    const closeBtn = document.getElementById('modalCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeBookingModal);

    const modal = document.getElementById('bookingModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeBookingModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeBookingModal();
        closeQuickViewModal();
      }
    });

    // Step navigation buttons
    const btnNext = document.getElementById('btnModalNext');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        const nameInput = document.getElementById('guestFullName');
        const phoneInput = document.getElementById('guestPhone');

        if (!nameInput.value.trim()) {
          nameInput.focus();
          showToast('Please enter your full name', 'fa-solid fa-triangle-exclamation');
          return;
        }
        if (!phoneInput.value.trim() || phoneInput.value.trim().length < 8) {
          phoneInput.focus();
          showToast('Please enter a valid mobile number', 'fa-solid fa-triangle-exclamation');
          return;
        }

        showStep(2);
      });
    }

    const btnBack = document.getElementById('btnModalBack');
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        if (state.currentStep === 2) {
          showStep(1);
        }
      });
    }

    const btnSubmit = document.getElementById('btnModalSubmit');
    if (btnSubmit) {
      btnSubmit.addEventListener('click', () => {
        showStep(3);
        showToast('Reservation provisional hold generated! Reference: ' + state.bookingRef);
      });
    }

    // Payment Option selector
    const paymentOptions = document.querySelectorAll('.payment-card-option');
    paymentOptions.forEach(card => {
      card.addEventListener('click', (e) => {
        paymentOptions.forEach(c => c.classList.remove('selected'));
        const target = e.currentTarget;
        target.classList.add('selected');
        state.selectedPaymentMethod = target.getAttribute('data-payment-method');

        // Switch instructions
        const gcashBox = document.getElementById('gcashInstructions');
        const mayaBox = document.getElementById('mayaInstructions');
        const bankBox = document.getElementById('bankInstructions');
        const cashBox = document.getElementById('cashInstructions');

        if (gcashBox) gcashBox.style.display = state.selectedPaymentMethod === 'gcash' ? 'block' : 'none';
        if (mayaBox) mayaBox.style.display = state.selectedPaymentMethod === 'maya' ? 'block' : 'none';
        if (bankBox) bankBox.style.display = state.selectedPaymentMethod === 'bank' ? 'block' : 'none';
        if (cashBox) cashBox.style.display = state.selectedPaymentMethod === 'cash' ? 'block' : 'none';

        if (state.selectedPaymentMethod === 'cash') {
          state.paymentType = 'cash';
        } else {
          state.paymentType = 'deposit';
        }
      });
    });

    // Copy Account Numbers
    document.querySelectorAll('.btn-copy-account').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const num = e.currentTarget.getAttribute('data-copy-num');
        if (num) {
          navigator.clipboard.writeText(num).then(() => {
            showToast(`Account ${num} copied!`);
          });
        }
      });
    });
  }

  // --- Quick View Modal ---
  function openQuickViewModal(roomId) {
    const room = state.rooms.find(r => r.id === roomId);
    if (!room) return;

    let qvModal = document.getElementById('quickViewModal');
    if (!qvModal) {
      qvModal = document.createElement('div');
      qvModal.id = 'quickViewModal';
      qvModal.className = 'modal-overlay';
      document.body.appendChild(qvModal);
    }

    qvModal.innerHTML = `
      <div class="booking-modal-card quick-view-modal-card">
        <div class="modal-header-top">
          <button type="button" class="modal-close-btn" id="qvCloseBtn"><i class="fa-solid fa-xmark"></i></button>
          <div class="eyebrow-pill light" style="margin-bottom: 6px;">${room.badge}</div>
          <h3 class="modal-header-title">${room.name}</h3>
          <p class="modal-header-sub"><i class="fa-solid fa-location-dot"></i> Boulevard St, Lucap, Pangasinan</p>
        </div>

        <div class="modal-scroll-body">
          <img src="${room.image}" alt="${room.name}" style="border-radius: var(--radius-md); width: 100%; height: 260px; object-fit: cover; margin-bottom: 20px;">

          <div class="room-meta-specs" style="margin-bottom: 18px;">
            <span class="meta-spec-item"><i class="fa-solid fa-user-group"></i> Max ${room.maxGuests} Guests</span>
            <span class="meta-spec-item"><i class="fa-solid fa-bed"></i> ${room.bedConfig}</span>
            <span class="meta-spec-item"><i class="fa-solid fa-ruler-combined"></i> ${room.size}</span>
            <span class="meta-spec-item"><i class="fa-solid fa-tag"></i> ${room.discount}</span>
          </div>

          <p style="font-size: 0.96rem; line-height: 1.65; color: var(--text-secondary); margin-bottom: 22px;">
            ${room.longDesc}
          </p>

          <h4 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; margin-bottom: 12px; color: var(--text-primary);">
            Room Amenities & Inclusions:
          </h4>
          <div class="room-amenities-tags" style="margin-bottom: 24px;">
            ${room.amenities.map(a => `
              <span class="amenity-chip" style="font-size: 0.85rem; padding: 6px 12px;"><i class="${a.icon}"></i> ${a.text}</span>
            `).join('')}
          </div>

          <div style="background: var(--palm-50); border: 1px solid var(--palm-100); border-radius: var(--radius-md); padding: 16px; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted); text-decoration: line-through;">${formatCurrency(room.originalPrice)}</div>
              <div style="font-size: 1.6rem; font-weight: 900; color: var(--palm-900); font-family: var(--font-heading);">${formatCurrency(room.price)} <span style="font-size: 0.85rem; font-weight: 500;">/ night</span></div>
            </div>
            <button type="button" class="btn btn-primary" id="qvBookBtn">
              <i class="fa-solid fa-calendar-check"></i> Book This Room
            </button>
          </div>
        </div>
      </div>
    `;

    qvModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    qvModal.querySelector('#qvCloseBtn').onclick = closeQuickViewModal;
    qvModal.querySelector('#qvBookBtn').onclick = () => {
      closeQuickViewModal();
      openBookingModal(room.id);
    };
    qvModal.onclick = (e) => {
      if (e.target === qvModal) closeQuickViewModal();
    };
  }

  function closeQuickViewModal() {
    const qvModal = document.getElementById('quickViewModal');
    if (qvModal) {
      qvModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // --- FAQ Accordion ---
  function initFaqAccordion() {
    const faqCards = document.querySelectorAll('.faq-card');
    faqCards.forEach(card => {
      const trigger = card.querySelector('.faq-trigger');
      const content = card.querySelector('.faq-content');

      if (trigger && content) {
        trigger.addEventListener('click', () => {
          const isOpen = card.classList.contains('open');

          // Close all other cards for a clean accordion experience
          faqCards.forEach(c => {
            c.classList.remove('open');
            const cnt = c.querySelector('.faq-content');
            if (cnt) cnt.style.maxHeight = null;
          });

          if (!isOpen) {
            card.classList.add('open');
            content.style.maxHeight = content.scrollHeight + 'px';
          }
        });
      }
    });
  }

  // --- Interactive Map Hotspots ---
  function initInteractiveMap() {
    const placeCards = document.querySelectorAll('.place-item-card');
    const mapPins = document.querySelectorAll('.map-svg-pin');

    placeCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const placeId = card.getAttribute('data-place');
        mapPins.forEach(pin => {
          if (pin.getAttribute('data-pin') === placeId) {
            pin.style.transform = 'scale(1.35)';
            pin.style.filter = 'drop-shadow(0 6px 12px rgba(0,0,0,0.35))';
          } else {
            pin.style.transform = 'scale(1)';
            pin.style.filter = 'none';
          }
        });
      });

      card.addEventListener('mouseleave', () => {
        mapPins.forEach(pin => {
          pin.style.transform = 'scale(1)';
          pin.style.filter = 'none';
        });
      });

      card.addEventListener('click', () => {
        const placeName = card.querySelector('.place-name')?.textContent || '';
        showToast(`Route to ${placeName}: follow Boulevard St straight east to wharf!`, 'fa-solid fa-person-walking');
      });
    });
  }

  // --- Navigation & Mobile Drawer ---
  function initNavigation() {
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    });

    const mobileToggle = document.getElementById('mobileMenuToggle');
    const drawer = document.getElementById('mobileDrawer');
    const drawerClose = document.getElementById('drawerCloseBtn');

    if (mobileToggle && drawer) {
      mobileToggle.addEventListener('click', () => {
        drawer.classList.add('active');
      });
    }

    if (drawerClose && drawer) {
      drawerClose.addEventListener('click', () => {
        drawer.classList.remove('active');
      });
    }

    // Close drawer when clicking any link inside
    drawer?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('active');
      });
    });

    // Quick reserve form submit action
    const reserveForm = document.getElementById('quickReserveForm');
    if (reserveForm) {
      reserveForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const roomTypeSelect = document.getElementById('roomTypeSelect');
        const selectedType = roomTypeSelect ? roomTypeSelect.value : 'all';

        // Scroll to rooms section
        const roomsSection = document.getElementById('rooms');
        if (roomsSection) {
          roomsSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Apply room filter if not all
        if (selectedType !== 'all') {
          const filterBtn = document.querySelector(`.room-filter-pill[data-filter="${selectedType}"]`);
          if (filterBtn) {
            filterBtn.click();
          }
        }

        showToast(`Showing availability for ${state.nights} night${state.nights > 1 ? 's' : ''}!`);
      });
    }

    // Connect top Book Now CTA
    document.querySelectorAll('.btn-trigger-booking').forEach(btn => {
      btn.addEventListener('click', () => {
        openBookingModal();
      });
    });

    // Connect Add All to Booking from Tour Planner
    const addAllToBookingBtn = document.getElementById('addAllToBookingBtn');
    if (addAllToBookingBtn) {
      addAllToBookingBtn.addEventListener('click', () => {
        openBookingModal(state.selectedRoomId);
      });
    }
  }

  // --- Main Bootstrapping ---
  document.addEventListener('DOMContentLoaded', () => {
    initDates();
    renderRooms('all');
    initRoomFilterButtons();
    renderAddons();
    initBookingModalLogic();
    initFaqAccordion();
    initInteractiveMap();
    initNavigation();
  });

})();

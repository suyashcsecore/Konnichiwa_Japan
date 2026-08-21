// Interactive Leaflet Map for Japan Disposal Points

import { NEARBY_DISPOSAL_POINTS } from './data.js';

export class WasteDropoffMap {
  constructor(options = {}) {
    this.options = options;
    this.map = null;
    this.markers = [];
    this.currentLanguage = options.currentLanguage || 'en';
    this.activeFilter = 'all';
    this.currentLocation = [35.6595, 139.7005]; // Tokyo Shibuya Station default center

    this.initMap();
    this.bindEvents();
  }

  initMap() {
    const mapElement = document.getElementById('disposal-map-container');
    if (!mapElement || typeof L === 'undefined') return;

    this.map = L.map('disposal-map-container', {
      center: this.currentLocation,
      zoom: 15,
      zoomControl: true,
      scrollWheelZoom: false
    });

    // Clean light CartoDB Positron / OSM tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.map);

    // Add user marker
    const userIcon = L.divIcon({
      className: 'user-pin-marker',
      html: `
        <div class="user-pulse-dot"></div>
        <div class="user-marker-label">📍 ${this.currentLanguage === 'ja' ? '現在地 (渋谷)' : 'Your Location'}</div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    L.marker(this.currentLocation, { icon: userIcon }).addTo(this.map);

    this.renderMarkers();
    this.renderLocationCards();
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    this.renderMarkers();
    this.renderLocationCards();
  }

  setCenter(lat, lng) {
    if (!this.map) return;
    this.currentLocation = [lat, lng];
    this.map.setView([lat, lng], 15, { animate: true });
    this.renderMarkers();
  }

  renderMarkers() {
    if (!this.map) return;

    // Clear previous markers
    this.markers.forEach(m => this.map.removeLayer(m));
    this.markers = [];

    const filtered = this.activeFilter === 'all'
      ? NEARBY_DISPOSAL_POINTS
      : NEARBY_DISPOSAL_POINTS.filter(p => p.type === this.activeFilter);

    const isJa = this.currentLanguage === 'ja';

    filtered.forEach((pt) => {
      const typeIcons = {
        combini: '🏪',
        supermarket: '🛒',
        ewaste: '🔋',
        bulky: '🛋️'
      };
      const iconChar = typeIcons[pt.type] || '📍';
      const pinColor = pt.type === 'combini' ? '#0077b6' : pt.type === 'supermarket' ? '#2a9d8f' : pt.type === 'ewaste' ? '#e63946' : '#590d22';

      const customIcon = L.divIcon({
        className: 'custom-dropoff-pin',
        html: `
          <div class="pin-bubble" style="background:${pinColor}">
            <span>${iconChar}</span>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -32]
      });

      const name = isJa ? pt.nameJa : pt.nameEn;
      const typeName = isJa ? pt.typeNameJa : pt.typeNameEn;
      const hours = isJa ? pt.openHoursJa : pt.openHoursEn;
      const address = isJa ? pt.addressJa : pt.addressEn;
      const items = isJa ? pt.acceptedItemsJa : pt.acceptedItemsEn;

      const popupHtml = `
        <div class="map-popup-card">
          <div class="map-popup-header">
            <span class="popup-type-tag" style="background:${pinColor}20; color:${pinColor}">
              ${iconChar} ${typeName}
            </span>
            <span class="popup-reward-badge">+${pt.rewardPoints} pts</span>
          </div>
          <h4 class="popup-title">${name}</h4>
          <p class="popup-address">📍 ${address} (${pt.distanceKm} km)</p>
          <p class="popup-hours">⏰ ${hours}</p>
          <div class="popup-items">
            <strong>${isJa ? '回収品目:' : 'Accepted:'}</strong>
            <div class="popup-tags">
              ${items.map(it => `<span class="popup-tag">${it}</span>`).join('')}
            </div>
          </div>
          <button class="popup-nav-btn" onclick="window.open('https://maps.google.com/?q=${pt.lat},${pt.lng}', '_blank')">
            <span>🗺️</span> <span>${isJa ? 'Googleマップで経路案内' : 'Get Directions'}</span>
          </button>
        </div>
      `;

      const marker = L.marker([pt.lat, pt.lng], { icon: customIcon })
        .bindPopup(popupHtml, { maxWidth: 300 })
        .addTo(this.map);

      this.markers.push(marker);
    });
  }

  renderLocationCards() {
    const listContainer = document.getElementById('map-locations-list');
    if (!listContainer) return;

    const filtered = this.activeFilter === 'all'
      ? NEARBY_DISPOSAL_POINTS
      : NEARBY_DISPOSAL_POINTS.filter(p => p.type === this.activeFilter);

    const isJa = this.currentLanguage === 'ja';
    listContainer.innerHTML = '';

    filtered.forEach((pt, index) => {
      const typeIcons = {
        combini: '🏪',
        supermarket: '🛒',
        ewaste: '🔋',
        bulky: '🛋️'
      };
      const iconChar = typeIcons[pt.type] || '📍';
      const name = isJa ? pt.nameJa : pt.nameEn;
      const typeName = isJa ? pt.typeNameJa : pt.typeNameEn;
      const hours = isJa ? pt.openHoursJa : pt.openHoursEn;
      const items = isJa ? pt.acceptedItemsJa : pt.acceptedItemsEn;

      const card = document.createElement('div');
      card.className = 'location-summary-card glass-card';
      card.innerHTML = `
        <div class="loc-card-header">
          <div class="loc-type-icon">${iconChar}</div>
          <div class="loc-title-group">
            <h4 class="loc-title">${name}</h4>
            <span class="loc-badge">${typeName}</span>
          </div>
          <div class="loc-dist">${pt.distanceKm} km</div>
        </div>
        <div class="loc-meta">
          <span>⏰ ${hours}</span>
          <span class="loc-pts">+${pt.rewardPoints} pts</span>
        </div>
        <div class="loc-tags">
          ${items.slice(0, 3).map(it => `<span class="loc-tag">${it}</span>`).join('')}
          ${items.length > 3 ? `<span class="loc-tag-more">+${items.length - 3}</span>` : ''}
        </div>
      `;

      card.addEventListener('click', () => {
        if (this.map && this.markers[index]) {
          this.map.setView([pt.lat, pt.lng], 16, { animate: true });
          this.markers[index].openPopup();
        }
      });

      listContainer.appendChild(card);
    });
  }

  bindEvents() {
    const filterButtons = document.querySelectorAll('.map-filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.getAttribute('data-filter') || 'all';
        this.renderMarkers();
        this.renderLocationCards();
      });
    });
  }
}

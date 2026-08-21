// Main Application Controller - GomiGuide AI (スマート分別 AI)

import { WASTE_CATEGORIES, MUNICIPAL_SCHEDULES } from './data.js';
import { SakuraEngine } from './sakura-petals.js';
import { AIWasteClassifier } from './ai-classifier.js';
import { GamificationEngine } from './gamification.js';
import { WasteDropoffMap } from './map.js';

class AppController {
  constructor() {
    this.currentLanguage = 'en';
    this.selectedWard = 'shibuya';
    this.sakuraEngine = null;
    this.classifier = null;
    this.gamification = null;
    this.mapEngine = null;
    this.countdownInterval = null;

    this.init();
  }

  init() {
    // 1. Initialize Sakura background canvas
    this.sakuraEngine = new SakuraEngine('sakura-canvas');

    // 2. Initialize Gamification Engine
    this.gamification = new GamificationEngine({
      currentLanguage: this.currentLanguage
    });

    // 3. Initialize AI Vision Classifier
    this.classifier = new AIWasteClassifier({
      currentLanguage: this.currentLanguage,
      onClassificationComplete: (item, category) => {
        this.gamification.addPoints(50, `Sorted: ${item.nameEn}`);
        if (this.sakuraEngine) this.sakuraEngine.burst(25);
      }
    });

    // 4. Initialize Leaflet Map
    this.mapEngine = new WasteDropoffMap({
      currentLanguage: this.currentLanguage
    });

    // 5. Setup Event Listeners & Schedules
    this.bindGlobalEvents();
    this.renderMunicipalSchedule();
    this.startCountdownTimer();
    this.initNotificationCenter();
  }

  bindGlobalEvents() {
    // Language Switcher
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    if (langToggleBtn) {
      langToggleBtn.addEventListener('click', () => {
        this.currentLanguage = this.currentLanguage === 'en' ? 'ja' : 'en';
        this.updateLanguageUI();
      });
    }

    // Ward Selector
    const wardSelector = document.getElementById('ward-select');
    if (wardSelector) {
      wardSelector.addEventListener('change', (e) => {
        this.selectedWard = e.target.value;
        this.renderMunicipalSchedule();
        const wardData = MUNICIPAL_SCHEDULES[this.selectedWard];
        if (wardData && this.mapEngine) {
          this.mapEngine.setCenter(wardData.lat, wardData.lng);
        }
      });
    }

    // CTA Jump buttons
    const heroScanBtn = document.getElementById('hero-scan-cta');
    if (heroScanBtn) {
      heroScanBtn.addEventListener('click', () => {
        const sec = document.getElementById('scanner-section');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const heroScheduleBtn = document.getElementById('hero-schedule-cta');
    if (heroScheduleBtn) {
      heroScheduleBtn.addEventListener('click', () => {
        const sec = document.getElementById('schedule-section');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Floating Sakura Burst on hero stamp click
    const sealStamp = document.querySelector('.hero-seal-stamp');
    if (sealStamp && this.sakuraEngine) {
      sealStamp.addEventListener('click', () => {
        this.sakuraEngine.burst(40);
      });
    }

    // Mobile nav hamburger toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
      });
    }
  }

  updateLanguageUI() {
    const isJa = this.currentLanguage === 'ja';

    // Toggle button text
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    if (langToggleBtn) {
      langToggleBtn.innerHTML = isJa 
        ? `<span>🌐</span> <strong>English</strong>` 
        : `<span>🌐</span> <strong>日本語</strong>`;
    }

    // Update all elements with data-i18n-en / data-i18n-ja
    document.querySelectorAll('[data-i18n-en]').forEach((elem) => {
      const textEn = elem.getAttribute('data-i18n-en');
      const textJa = elem.getAttribute('data-i18n-ja');
      elem.textContent = isJa ? textJa : textEn;
    });

    document.querySelectorAll('[data-i18n-placeholder-en]').forEach((elem) => {
      const textEn = elem.getAttribute('data-i18n-placeholder-en');
      const textJa = elem.getAttribute('data-i18n-placeholder-ja');
      elem.placeholder = isJa ? textJa : textEn;
    });

    // Notify sub-modules
    if (this.classifier) this.classifier.setLanguage(this.currentLanguage);
    if (this.gamification) this.gamification.setLanguage(this.currentLanguage);
    if (this.mapEngine) this.mapEngine.setLanguage(this.currentLanguage);

    this.renderMunicipalSchedule();
  }

  renderMunicipalSchedule() {
    const wardData = MUNICIPAL_SCHEDULES[this.selectedWard] || MUNICIPAL_SCHEDULES.shibuya;
    const isJa = this.currentLanguage === 'ja';

    const wardTitle = document.getElementById('schedule-ward-title');
    const bagRuleText = document.getElementById('schedule-bag-rule');
    const netRuleText = document.getElementById('schedule-net-rule');
    const scheduleGrid = document.getElementById('schedule-grid-container');

    if (wardTitle) wardTitle.textContent = isJa ? wardData.nameJa : wardData.nameEn;
    if (bagRuleText) bagRuleText.textContent = isJa ? wardData.bagRuleJa : wardData.bagRuleEn;
    if (netRuleText) netRuleText.textContent = isJa ? wardData.netRuleJa : wardData.netRuleEn;

    if (!scheduleGrid) return;
    scheduleGrid.innerHTML = '';

    const scheduleKeys = ['burnable', 'plastic', 'pet', 'cans', 'glass', 'paper', 'nonburnable'];

    scheduleKeys.forEach((key) => {
      const cat = WASTE_CATEGORIES[key];
      const sched = wardData.schedule[key];
      if (!cat || !sched) return;

      const catName = isJa ? cat.nameJa : cat.nameEn;
      const days = isJa ? sched.daysJa : sched.daysEn;

      const card = document.createElement('div');
      card.className = 'schedule-day-card glass-card';
      card.style.borderTop = `4px solid ${cat.color}`;

      card.innerHTML = `
        <div class="sched-card-top">
          <span class="sched-icon" style="background:${cat.bgColor}; color:${cat.color}">${cat.icon}</span>
          <span class="sched-symbol-badge" style="color:${cat.color}; border: 1px solid ${cat.color}40">${cat.symbol}</span>
        </div>
        <h4 class="sched-cat-name">${catName}</h4>
        <div class="sched-day-badge" style="background:${cat.bgColor}; color:${cat.color}">
          <span>🗓️ ${days}</span>
        </div>
        <div class="sched-time-meta">
          <span>⏰ ${sched.time}</span>
        </div>
      `;

      scheduleGrid.appendChild(card);
    });
  }

  startCountdownTimer() {
    if (this.countdownInterval) clearInterval(this.countdownInterval);

    const updateCountdown = () => {
      const countdownElem = document.getElementById('next-pickup-countdown');
      if (!countdownElem) return;

      const now = new Date();
      // Target next morning 08:00 AM
      const nextMorning = new Date();
      nextMorning.setHours(8, 0, 0, 0);
      if (now.getHours() >= 8) {
        nextMorning.setDate(nextMorning.getDate() + 1);
      }

      const diffMs = nextMorning - now;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

      const isJa = this.currentLanguage === 'ja';
      const formattedTime = `${hours.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;

      countdownElem.innerHTML = `
        <span class="countdown-badge">🔥 ${isJa ? '次の回収まで' : 'Next Collection in'}:</span>
        <span class="countdown-digits">${formattedTime}</span>
      `;
    };

    updateCountdown();
    this.countdownInterval = setInterval(updateCountdown, 1000);
  }

  initNotificationCenter() {
    const testNotifyBtn = document.getElementById('trigger-sample-notification-btn');
    if (testNotifyBtn) {
      testNotifyBtn.addEventListener('click', () => {
        this.triggerSmartNotification();
      });
    }

    const permissionBtn = document.getElementById('request-push-perm-btn');
    if (permissionBtn) {
      permissionBtn.addEventListener('click', async () => {
        if ('Notification' in window) {
          const perm = await Notification.requestPermission();
          alert(this.currentLanguage === 'ja' 
            ? `通知設定を更新しました (状態: ${perm})` 
            : `Notification permission updated (Status: ${perm})`);
        } else {
          alert('Web notifications are not supported in this browser.');
        }
      });
    }
  }

  triggerSmartNotification() {
    const isJa = this.currentLanguage === 'ja';
    const wardData = MUNICIPAL_SCHEDULES[this.selectedWard] || MUNICIPAL_SCHEDULES.shibuya;
    const wardName = isJa ? wardData.nameJa : wardData.nameEn;

    const messagesEn = [
      {
        title: `🔔 Tomorrow is Plastic Recycling Day (${wardName})`,
        body: `Remember to rinse bento trays and remove bottle caps. Place out before 8:00 AM!`
      },
      {
        title: `🦅 Crow Warning: Yellow Net Placement Required`,
        body: `Heavy crow activity reported around Shibuya. Please ensure the yellow protection net covers all bags securely.`
      },
      {
        title: `🛋️ Bulky Waste Pickup Confirmed for Friday`,
        body: `Please affix your 400-yen 'A-Ticket' sticker onto your wooden shelf and leave at curbside.`
      }
    ];

    const messagesJa = [
      {
        title: `🔔 明日は資源プラスチックの収集日です (${wardName})`,
        body: `弁当容器は水洗いし、ペットボトルのキャップは外してください。朝8時までに排出してください！`
      },
      {
        title: `🦅 カラス被害注意報：防鳥ネットの徹底を`,
        body: `近隣集積所でのカラス被害が多発しています。黄色いネットをおもりで隙間なく被せてください。`
      },
      {
        title: `🛋️ 粗大ごみ戸別収集（金曜日）のお知らせ`,
        body: `有料粗大ごみ処理券（A券）を家具の目立つ位置に貼り付け、指定場所にお出しください。`
      }
    ];

    const pool = isJa ? messagesJa : messagesEn;
    const sample = pool[Math.floor(Math.random() * pool.length)];

    // Play subtle pleasant chime
    if (this.classifier) {
      this.classifier.playSuccessChime();
    }

    // Render interactive floating toast alert
    const toast = document.createElement('div');
    toast.className = 'smart-notification-toast animate-slide-in';
    toast.innerHTML = `
      <div class="toast-left-stripe"></div>
      <div class="toast-icon">🇯🇵</div>
      <div class="toast-content">
        <div class="toast-title">${sample.title}</div>
        <div class="toast-body">${sample.body}</div>
        <div class="toast-time">${isJa ? 'たった今 • スマート分別 AI' : 'Just now • GomiGuide AI Japan'}</div>
      </div>
      <button class="toast-close-btn" aria-label="Close">&times;</button>
    `;

    document.body.appendChild(toast);

    toast.querySelector('.toast-close-btn').addEventListener('click', () => {
      toast.remove();
    });

    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 6000);

    // Also trigger native browser notification if granted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(sample.title, {
        body: sample.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/3299/3299942.png'
      });
    }
  }
}

// Bootstrap once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.GomiApp = new AppController();
});

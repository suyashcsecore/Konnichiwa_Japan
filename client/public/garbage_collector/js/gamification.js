// Gamification, Eco-Points & Sakura Tree Growth Engine

import { GAMIFICATION_DATA } from './data.js';

export class GamificationEngine {
  constructor(options = {}) {
    this.options = options;
    this.currentLanguage = options.currentLanguage || 'en';
    this.points = parseInt(localStorage.getItem('gomi_eco_points') || GAMIFICATION_DATA.initialPoints.toString(), 10);
    this.badges = JSON.parse(localStorage.getItem('gomi_badges') || JSON.stringify(GAMIFICATION_DATA.badges));
    this.sakuraTreeCanvas = document.getElementById('sakura-tree-svg');
    this.pointsDisplay = document.querySelectorAll('.user-eco-points-count');
    this.levelDisplay = document.getElementById('user-level-badge');
    this.treeGrowthStatus = document.getElementById('tree-growth-status');
    this.badgeGrid = document.getElementById('badges-grid');
    this.leaderboardList = document.getElementById('leaderboard-list');
    this.rewardsGrid = document.getElementById('rewards-catalog-grid');
    this.voucherModal = document.getElementById('voucher-modal');

    this.init();
  }

  init() {
    this.updatePointsUI();
    this.renderSakuraTree();
    this.renderBadges();
    this.renderLeaderboard();
    this.renderRewardsCatalog();
    this.bindEvents();
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    this.updatePointsUI();
    this.renderSakuraTree();
    this.renderBadges();
    this.renderLeaderboard();
    this.renderRewardsCatalog();
  }

  bindEvents() {
    if (this.voucherModal) {
      const closeBtn = this.voucherModal.querySelector('.modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          this.voucherModal.classList.remove('active');
        });
      }
      this.voucherModal.addEventListener('click', (e) => {
        if (e.target === this.voucherModal) {
          this.voucherModal.classList.remove('active');
        }
      });
    }
  }

  addPoints(amount = 50, reason = "Waste properly sorted") {
    this.points += amount;
    localStorage.setItem('gomi_eco_points', this.points.toString());
    this.updatePointsUI();
    this.renderSakuraTree();
    this.checkBadgesUnlock();

    // Show floating toast
    this.showPointFloatToast(`+${amount} Eco Points! 🌸`);
  }

  updatePointsUI() {
    this.pointsDisplay.forEach(elem => {
      elem.textContent = this.points.toLocaleString();
    });

    const level = Math.floor(this.points / 250) + 1;
    if (this.levelDisplay) {
      this.levelDisplay.textContent = this.currentLanguage === 'ja' ? `Lv.${level} エコ市民` : `Lv.${level} Eco Citizen`;
    }
  }

  renderSakuraTree() {
    const container = document.getElementById('sakura-tree-container');
    if (!container) return;

    // Tree stages based on points: 0-300: Sapling, 301-600: Sprouting, 601-900: Budding, 901-1400: Half Bloom, 1401+: Full Grand Sakura
    let stage = 1;
    let stageNameEn = "Sprouting Seedling";
    let stageNameJa = "若木の芽生え";
    let flowerCount = 12;

    if (this.points >= 1400) {
      stage = 5;
      stageNameEn = "Full Bloom Grand Sakura 🌸";
      stageNameJa = "満開の大桜 🌸";
      flowerCount = 48;
    } else if (this.points >= 900) {
      stage = 4;
      stageNameEn = "70% Blooming Cherry Tree 🌸";
      stageNameJa = "七分咲きの桜 🌸";
      flowerCount = 34;
    } else if (this.points >= 600) {
      stage = 3;
      stageNameEn = "Budding Sakura Tree 🌿";
      stageNameJa = "つぼみ芽吹く桜 🌿";
      flowerCount = 22;
    } else if (this.points >= 300) {
      stage = 2;
      stageNameEn = "Growing Young Sapling 🌱";
      stageNameJa = "すくすく育つ若木 🌱";
      flowerCount = 14;
    }

    if (this.treeGrowthStatus) {
      this.treeGrowthStatus.textContent = this.currentLanguage === 'ja' ? stageNameJa : stageNameEn;
    }

    // Generate Dynamic SVG Sakura Tree
    let flowersSvg = '';
    const flowerCoords = [
      { x: 150, y: 70 }, { x: 130, y: 85 }, { x: 175, y: 80 }, { x: 110, y: 110 },
      { x: 195, y: 105 }, { x: 90, y: 135 }, { x: 215, y: 130 }, { x: 145, y: 120 },
      { x: 165, y: 100 }, { x: 125, y: 145 }, { x: 180, y: 140 }, { x: 75, y: 160 },
      { x: 230, y: 155 }, { x: 105, y: 175 }, { x: 200, y: 170 }, { x: 150, y: 150 },
      { x: 135, y: 60 }, { x: 170, y: 65 }, { x: 150, y: 95 }, { x: 95, y: 95 },
      { x: 205, y: 90 }, { x: 60, y: 140 }, { x: 240, y: 135 }, { x: 120, y: 100 },
      { x: 185, y: 115 }, { x: 80, y: 115 }, { x: 220, y: 110 }, { x: 160, y: 130 },
      { x: 140, y: 165 }, { x: 170, y: 160 }, { x: 110, y: 155 }, { x: 190, y: 150 },
      { x: 150, y: 40 }, { x: 130, y: 45 }, { x: 170, y: 45 }, { x: 115, y: 70 },
      { x: 190, y: 70 }, { x: 50, y: 160 }, { x: 250, y: 155 }, { x: 150, y: 180 },
      { x: 85, y: 175 }, { x: 215, y: 175 }, { x: 130, y: 190 }, { x: 170, y: 190 },
      { x: 100, y: 135 }, { x: 200, y: 135 }, { x: 150, y: 110 }, { x: 160, y: 75 }
    ];

    const activeFlowers = flowerCoords.slice(0, flowerCount);

    flowersSvg = activeFlowers.map((f, i) => {
      const scale = 0.85 + (i % 3) * 0.2;
      const rot = (i * 37) % 360;
      const pinkShade = i % 2 === 0 ? '#ffb3c6' : '#ff758f';
      return `
        <g transform="translate(${f.x}, ${f.y}) rotate(${rot}) scale(${scale})" class="sakura-flower-node animate-pulse-slow">
          <circle cx="0" cy="0" r="4" fill="#fff" />
          <path d="M 0,-10 C 4,-7 4,-3 0,0 C -4,-3 -4,-7 0,-10" fill="${pinkShade}" opacity="0.95" />
          <path d="M 10,0 C 7,4 3,4 0,0 C 3,-4 7,-4 10,0" fill="${pinkShade}" opacity="0.95" />
          <path d="M 0,10 C -4,7 -4,3 0,0 C 4,3 4,7 0,10" fill="${pinkShade}" opacity="0.95" />
          <path d="M -10,0 C -7,-4 -3,-4 0,0 C -3,4 -7,4 -10,0" fill="${pinkShade}" opacity="0.95" />
          <circle cx="0" cy="0" r="2.5" fill="#ff4d6d" />
        </g>
      `;
    }).join('');

    container.innerHTML = `
      <svg viewBox="0 0 300 300" class="sakura-tree-svg-graphic" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#590d22" />
            <stop offset="50%" stop-color="#800f2f" />
            <stop offset="100%" stop-color="#590d22" />
          </linearGradient>
          <radialGradient id="canopyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(255, 179, 198, 0.45)" />
            <stop offset="70%" stop-color="rgba(255, 204, 217, 0.2)" />
            <stop offset="100%" stop-color="rgba(255, 255, 255, 0)" />
          </radialGradient>
        </defs>

        <!-- Soft Sakura Canopy Aura -->
        <circle cx="150" cy="120" r="${75 + stage * 10}" fill="url(#canopyGlow)" class="animate-pulse-slow" />

        <!-- Hill mound -->
        <path d="M 40,280 Q 150,250 260,280 L 260,300 L 40,300 Z" fill="#2d6a4f" opacity="0.85" />
        <path d="M 70,280 Q 150,260 230,280" stroke="#52b788" stroke-width="4" stroke-linecap="round" fill="none" />

        <!-- Tree Trunk & Branches -->
        <path d="M 142,270 Q 146,210 144,170 Q 135,140 120,110 Q 110,90 95,80" stroke="url(#trunkGrad)" stroke-width="12" stroke-linecap="round" fill="none" />
        <path d="M 158,270 Q 154,210 156,170 Q 165,140 180,110 Q 195,90 210,80" stroke="url(#trunkGrad)" stroke-width="12" stroke-linecap="round" fill="none" />
        <path d="M 150,170 Q 150,120 150,65" stroke="url(#trunkGrad)" stroke-width="8" stroke-linecap="round" fill="none" />
        <path d="M 130,130 Q 100,120 80,135" stroke="url(#trunkGrad)" stroke-width="6" stroke-linecap="round" fill="none" />
        <path d="M 170,130 Q 200,120 225,135" stroke="url(#trunkGrad)" stroke-width="6" stroke-linecap="round" fill="none" />
        <path d="M 140,90 Q 115,80 100,65" stroke="url(#trunkGrad)" stroke-width="4" stroke-linecap="round" fill="none" />
        <path d="M 160,90 Q 185,80 200,65" stroke="url(#trunkGrad)" stroke-width="4" stroke-linecap="round" fill="none" />

        <!-- Blossoms Cluster -->
        ${flowersSvg}
      </svg>
    `;
  }

  renderBadges() {
    if (!this.badgeGrid) return;
    const isJa = this.currentLanguage === 'ja';
    this.badgeGrid.innerHTML = '';

    this.badges.forEach((b) => {
      const card = document.createElement('div');
      card.className = `badge-item-card ${b.unlocked ? 'unlocked' : 'locked'}`;
      card.innerHTML = `
        <div class="badge-icon-wrap">
          <span class="badge-symbol">${b.icon}</span>
          ${b.unlocked ? '<span class="badge-status-check">✓</span>' : '<span class="badge-lock-icon">🔒</span>'}
        </div>
        <div class="badge-title">${isJa ? b.nameJa : b.nameEn}</div>
        <div class="badge-desc">${isJa ? b.descriptionJa : b.descriptionEn}</div>
      `;
      this.badgeGrid.appendChild(card);
    });
  }

  checkBadgesUnlock() {
    let unlockedAny = false;
    if (this.points >= 1000 && !this.badges[3].unlocked) {
      this.badges[3].unlocked = true;
      unlockedAny = true;
      this.showBadgeUnlockedToast(this.badges[3]);
    }
    if (this.points >= 1200 && !this.badges[4].unlocked) {
      this.badges[4].unlocked = true;
      unlockedAny = true;
      this.showBadgeUnlockedToast(this.badges[4]);
    }
    if (unlockedAny) {
      localStorage.setItem('gomi_badges', JSON.stringify(this.badges));
      this.renderBadges();
    }
  }

  renderLeaderboard() {
    if (!this.leaderboardList) return;
    const isJa = this.currentLanguage === 'ja';
    this.leaderboardList.innerHTML = '';

    GAMIFICATION_DATA.leaderboard.forEach((item, idx) => {
      const row = document.createElement('div');
      row.className = `leaderboard-row ${idx === 0 ? 'rank-1-gold' : ''}`;
      const wardTitle = isJa ? item.wardJa : item.wardEn;
      const rankBadge = idx === 0 ? '🥇 1st' : idx === 1 ? '🥈 2nd' : idx === 2 ? '🥉 3rd' : `#${item.rank}`;

      row.innerHTML = `
        <div class="leaderboard-rank">${rankBadge}</div>
        <div class="leaderboard-avatar">${item.avatar}</div>
        <div class="leaderboard-info">
          <div class="leaderboard-name">${wardTitle}</div>
          <div class="leaderboard-sub">${item.users.toLocaleString()} ${isJa ? '名の参加住民' : 'Active Sorters'}</div>
        </div>
        <div class="leaderboard-score">
          <strong>${item.points.toLocaleString()}</strong>
          <span>pts</span>
        </div>
      `;
      this.leaderboardList.appendChild(row);
    });
  }

  renderRewardsCatalog() {
    if (!this.rewardsGrid) return;
    const isJa = this.currentLanguage === 'ja';
    this.rewardsGrid.innerHTML = '';

    GAMIFICATION_DATA.rewardsCatalog.forEach((reward) => {
      const canAfford = this.points >= reward.pointsCost;
      const card = document.createElement('div');
      card.className = `reward-card ${canAfford ? 'affordable' : 'locked'}`;

      card.innerHTML = `
        <div class="reward-header">
          <span class="reward-icon">${reward.icon}</span>
          <span class="reward-cost-tag">${reward.pointsCost} pts</span>
        </div>
        <div class="reward-title">${isJa ? reward.titleJa : reward.titleEn}</div>
        <div class="reward-sponsor" style="color: ${reward.sponsorColor}">
          <span>🏢 ${reward.sponsor}</span>
        </div>
        <button class="reward-claim-btn ${canAfford ? 'btn-claim' : 'btn-disabled'}" ${canAfford ? '' : 'disabled'}>
          ${canAfford 
            ? (isJa ? 'ポイントで交換する' : 'Redeem Reward')
            : (isJa ? `あと ${reward.pointsCost - this.points} pts 必要` : `Need ${reward.pointsCost - this.points} more pts`)}
        </button>
      `;

      if (canAfford) {
        card.querySelector('.reward-claim-btn').addEventListener('click', () => {
          this.claimReward(reward);
        });
      }

      this.rewardsGrid.appendChild(card);
    });
  }

  claimReward(reward) {
    if (this.points < reward.pointsCost) return;
    this.points -= reward.pointsCost;
    localStorage.setItem('gomi_eco_points', this.points.toString());
    this.updatePointsUI();
    this.renderSakuraTree();
    this.renderRewardsCatalog();

    // Show Voucher Popup
    this.showVoucherModal(reward);
  }

  showVoucherModal(reward) {
    if (!this.voucherModal) return;
    const isJa = this.currentLanguage === 'ja';
    const code = 'GOMI-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.floor(Math.random() * 8999 + 1000);

    const titleElem = this.voucherModal.querySelector('.voucher-title');
    const descElem = this.voucherModal.querySelector('.voucher-desc');
    const codeElem = this.voucherModal.querySelector('.voucher-code');

    if (titleElem) titleElem.textContent = isJa ? reward.titleJa : reward.titleEn;
    if (descElem) descElem.textContent = isJa 
      ? `以下のバーコードまたは引換コードをお近くの提携店舗レジにてご提示ください（有効期限: 30日間）。`
      : `Present this barcode or redemption code at designated convenience stores or municipal counters. Valid for 30 days.`;
    if (codeElem) codeElem.textContent = code;

    this.voucherModal.classList.add('active');
  }

  showPointFloatToast(text) {
    const toast = document.createElement('div');
    toast.className = 'point-float-toast animate-float-fade';
    toast.textContent = text;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2800);
  }

  showBadgeUnlockedToast(badge) {
    const isJa = this.currentLanguage === 'ja';
    const toast = document.createElement('div');
    toast.className = 'badge-unlocked-modal animate-scale-up';
    toast.innerHTML = `
      <div class="toast-sparkle">🏆</div>
      <div class="toast-content">
        <h4>${isJa ? '新バッジ獲得！' : 'New Badge Unlocked!'}</h4>
        <p>${badge.icon} <strong>${isJa ? badge.nameJa : badge.nameEn}</strong></p>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }
}

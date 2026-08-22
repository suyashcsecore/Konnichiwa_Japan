// AI Waste Classifier & Vision Engine

import { WASTE_CATEGORIES, SAMPLE_WASTE_ITEMS, SEARCH_DATABASE } from './data.js';

export class AIWasteClassifier {
  constructor(options = {}) {
    this.options = options;
    this.currentStream = null;
    this.isScanning = false;
    this.audioCtx = null;
    this.onClassificationComplete = options.onClassificationComplete || (() => {});
    this.currentLanguage = options.currentLanguage || 'en';

    this.initElements();
    this.bindEvents();
  }

  initElements() {
    this.cameraVideo = document.getElementById('camera-video');
    this.cameraCanvas = document.getElementById('camera-canvas');
    this.scanOverlay = document.getElementById('scan-overlay');
    this.scanHud = document.getElementById('scan-hud');
    this.scanStatusText = document.getElementById('scan-status-text');
    this.scanProgressBar = document.querySelector('.hud-progress-fill');
    this.previewImg = document.getElementById('preview-image');
    this.uploadDropzone = document.getElementById('upload-dropzone');
    this.fileInput = document.getElementById('file-input');
    this.cameraStartBtn = document.getElementById('camera-start-btn');
    this.cameraSnapBtn = document.getElementById('camera-snap-btn');
    this.cameraSwitchBtn = document.getElementById('camera-switch-btn');
    this.searchQueryInput = document.getElementById('search-query-input');
    this.searchSuggestions = document.getElementById('search-suggestions');
    this.presetGrid = document.getElementById('preset-grid');
    this.resultContainer = document.getElementById('classification-result');
  }

  bindEvents() {
    // Camera trigger
    if (this.cameraStartBtn) {
      this.cameraStartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleCamera();
      });
    }
    if (this.cameraSnapBtn) {
      this.cameraSnapBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.captureSnapshot();
      });
    }

    // Drag and Drop / File upload
    if (this.uploadDropzone && this.fileInput) {
      this.uploadDropzone.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON' && !e.target.closest('#camera-start-btn')) {
          this.fileInput.click();
        }
      });

      this.fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) this.handleUploadedFile(file);
      });

      this.uploadDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        this.uploadDropzone.classList.add('drag-active');
      });

      this.uploadDropzone.addEventListener('dragleave', () => {
        this.uploadDropzone.classList.remove('drag-active');
      });

      this.uploadDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        this.uploadDropzone.classList.remove('drag-active');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          this.handleUploadedFile(e.dataTransfer.files[0]);
        }
      });
    }

    // Search bar autocomplete
    if (this.searchQueryInput) {
      this.searchQueryInput.addEventListener('input', (e) => {
        this.handleSearchInput(e.target.value);
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box-wrapper')) {
          if (this.searchSuggestions) this.searchSuggestions.classList.remove('active');
        }
      });
    }

    // Render Preset Items
    this.renderPresets();
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    this.renderPresets();
  }

  renderPresets() {
    if (!this.presetGrid) return;
    this.presetGrid.innerHTML = '';

    SAMPLE_WASTE_ITEMS.forEach((item) => {
      const card = document.createElement('div');
      card.className = `preset-card ${item.visualClass}`;
      const category = WASTE_CATEGORIES[item.primaryCategory] || {};
      const name = this.currentLanguage === 'ja' ? item.nameJa : item.nameEn;
      const catName = this.currentLanguage === 'ja' ? category.nameJa : category.nameEn;

      card.innerHTML = `
        <div class="preset-emoji">${item.image}</div>
        <div class="preset-info">
          <div class="preset-name">${name}</div>
          <div class="preset-badge" style="background:${category.bgColor}; color:${category.color}; border: 1px solid ${category.color}40">
            <span>${category.icon}</span> ${catName}
          </div>
        </div>
        <button class="preset-try-btn" aria-label="Analyze item">
          <span>${this.currentLanguage === 'ja' ? 'AIスキャン' : 'Scan Item'}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      `;

      card.addEventListener('click', () => {
        this.analyzePresetItem(item);
      });

      this.presetGrid.appendChild(card);
    });
  }

  handleSearchInput(query) {
    if (!this.searchSuggestions) return;
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      this.searchSuggestions.classList.remove('active');
      this.searchSuggestions.innerHTML = '';
      return;
    }

    const matches = SEARCH_DATABASE.filter((item) => {
      return item.nameEn.toLowerCase().includes(cleanQuery) ||
             item.nameJa.includes(cleanQuery) ||
             item.mark.toLowerCase().includes(cleanQuery);
    }).slice(0, 6);

    if (matches.length === 0) {
      this.searchSuggestions.innerHTML = `
        <div class="search-no-result">
          ${this.currentLanguage === 'ja' ? '該当する品目が見つかりませんでした。写真撮影をお試しください。' : 'No exact match found. Try snapping a photo with AI scanner!'}
        </div>
      `;
      this.searchSuggestions.classList.add('active');
      return;
    }

    this.searchSuggestions.innerHTML = matches.map((item) => {
      const cat = WASTE_CATEGORIES[item.category] || {};
      const name = this.currentLanguage === 'ja' ? item.nameJa : item.nameEn;
      const catName = this.currentLanguage === 'ja' ? cat.nameJa : cat.nameEn;
      return `
        <div class="suggestion-item" data-id="${item.nameEn}">
          <div class="suggestion-icon">${cat.icon || '🗑️'}</div>
          <div class="suggestion-text">
            <span class="suggestion-title">${name}</span>
            <span class="suggestion-cat" style="color: ${cat.color}">${catName} [${item.mark}]</span>
          </div>
          <span class="suggestion-action">${this.currentLanguage === 'ja' ? '詳細を見る →' : 'View →'}</span>
        </div>
      `;
    }).join('');

    this.searchSuggestions.classList.add('active');

    this.searchSuggestions.querySelectorAll('.suggestion-item').forEach((elem, idx) => {
      elem.addEventListener('click', () => {
        const matchedItem = matches[idx];
        this.searchSuggestions.classList.remove('active');
        this.searchQueryInput.value = this.currentLanguage === 'ja' ? matchedItem.nameJa : matchedItem.nameEn;
        this.analyzeSearchItem(matchedItem);
      });
    });
  }

  async toggleCamera() {
    if (this.currentStream) {
      this.stopCamera();
    } else {
      await this.startCamera();
    }
  }

  async startCamera() {
    try {
      this.cameraStartBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        <span>${this.currentLanguage === 'ja' ? 'カメラ停止' : 'Stop Camera'}</span>
      `;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      this.currentStream = stream;
      this.cameraVideo.srcObject = stream;
      this.cameraVideo.style.display = 'block';
      if (this.previewImg) this.previewImg.style.display = 'none';
      if (this.cameraSnapBtn) this.cameraSnapBtn.style.display = 'inline-flex';
      this.cameraVideo.play();
    } catch (err) {
      console.warn('Camera stream inaccessible, switching to fallback mode:', err);
      alert(this.currentLanguage === 'ja' 
        ? 'カメラへのアクセスが許可されていないか、利用できません。写真アップロードまたはプリセットをご利用ください。' 
        : 'Camera access denied or unavailable. Please use the Upload or Preset test library below.');
      this.stopCamera();
    }
  }

  stopCamera() {
    if (this.currentStream) {
      this.currentStream.getTracks().forEach(track => track.stop());
      this.currentStream = null;
    }
    if (this.cameraVideo) {
      this.cameraVideo.style.display = 'none';
      this.cameraVideo.srcObject = null;
    }
    if (this.cameraSnapBtn) this.cameraSnapBtn.style.display = 'none';
    if (this.cameraStartBtn) {
      this.cameraStartBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        <span>${this.currentLanguage === 'ja' ? 'カメラ起動' : 'Open Camera'}</span>
      `;
    }
  }

  captureSnapshot() {
    if (!this.cameraVideo || !this.currentStream) return;
    const canvas = this.cameraCanvas;
    // Compress image significantly to bypass strict API payload limits
    canvas.width = 224;
    canvas.height = 224;
    const ctx = canvas.getContext('2d');
    
    // Maintain aspect ratio while scaling down
    const videoRatio = (this.cameraVideo.videoWidth || 640) / (this.cameraVideo.videoHeight || 480);
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    if (videoRatio > 1) {
      drawHeight = canvas.width / videoRatio;
    } else {
      drawWidth = canvas.height * videoRatio;
    }
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.cameraVideo, (canvas.width - drawWidth) / 2, (canvas.height - drawHeight) / 2, drawWidth, drawHeight);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.5);

    this.stopCamera();
    if (this.previewImg) {
      this.previewImg.src = dataUrl;
      this.previewImg.style.display = 'block';
    }

    this.runRealScan(dataUrl, 'Camera Snapshot');
  }

  handleUploadedFile(file) {
    if (!file.type.startsWith('image/')) {
      alert(this.currentLanguage === 'ja' ? '画像ファイル(JPG, PNG, WebP)を選択してください。' : 'Please select an image file (JPG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 224;
        canvas.height = 224;
        const ctx = canvas.getContext('2d');
        
        const imgRatio = img.width / img.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        if (imgRatio > 1) {
          drawHeight = canvas.width / imgRatio;
        } else {
          drawWidth = canvas.height * imgRatio;
        }
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, (canvas.width - drawWidth) / 2, (canvas.height - drawHeight) / 2, drawWidth, drawHeight);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.5);
        
        if (this.previewImg) {
          this.previewImg.src = dataUrl;
          this.previewImg.style.display = 'block';
        }
        if (this.cameraVideo) this.cameraVideo.style.display = 'none';

        this.runRealScan(dataUrl, file.name);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  analyzePresetItem(item) {
    if (this.previewImg) {
      this.previewImg.src = '';
      this.previewImg.style.display = 'none';
    }
    this.runScanSimulation(item, item.nameEn);
  }

  analyzeSearchItem(searchItem) {
    const matchedCategory = WASTE_CATEGORIES[searchItem.category] || WASTE_CATEGORIES.burnable;
    const synthesizedItem = {
      id: 'search-' + Math.random().toString(36).substring(7),
      nameEn: searchItem.nameEn,
      nameJa: searchItem.nameJa,
      image: matchedCategory.icon || '🔍',
      visualClass: 'search-card',
      primaryCategory: searchItem.category,
      confidence: 0.97,
      composition: [
        {
          partEn: `${searchItem.nameEn} Body`,
          partJa: `${searchItem.nameJa} 本体`,
          category: searchItem.category,
          mark: searchItem.mark
        }
      ],
      prepStepsEn: [
        `Identify category: ${matchedCategory.nameEn} (${matchedCategory.symbol}).`,
        `Inspect item for food contamination, liquid, or residue. Clean if necessary.`,
        `Verify municipal bag type: ${matchedCategory.bagTypeEn}.`,
        `Put out during designated ${matchedCategory.nameEn} collection window (${matchedCategory.scheduleFrequency}).`
      ],
      prepStepsJa: [
        `分別区分：${matchedCategory.nameJa}（マーク：${matchedCategory.symbol}）`,
        `汚れや残液がある場合は水洗いして綺麗に落とします。`,
        `指定袋の確認：${matchedCategory.bagTypeJa}`,
        `地域の収集日程（${matchedCategory.scheduleFrequency}）の朝に指定集積所へ出します。`
      ],
      designatedBag: matchedCategory.bagTypeEn,
      proTipEn: `Always follow local ward guidelines. Never place unwashed recyclable containers into collection nets.`,
      proTipJa: `地域の分別ルールを遵守してください。汚れた容器は可燃ごみとして処理される場合があります。`
    };

    this.runScanSimulation(synthesizedItem, searchItem.nameEn);
  }

  async runRealScan(imageBase64, sourceLabel) {
    if (this.isScanning) return;
    this.isScanning = true;

    // Scroll smoothly to scanner box
    const scannerSection = document.getElementById('scanner-section');
    if (scannerSection) {
      scannerSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (this.scanOverlay) this.scanOverlay.classList.add('active');
    if (this.scanHud) this.scanHud.style.display = 'flex';

    if (this.scanStatusText) this.scanStatusText.textContent = this.currentLanguage === 'ja' ? 'AIサーバーへ送信中...' : 'Sending to AI Server...';
    if (this.scanProgressBar) this.scanProgressBar.style.width = '20%';

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const city = urlParams.get('city');

      const response = await fetch('/api/garbage/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageBase64, city })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP Error ${response.status}`);
      }

      if (this.scanProgressBar) this.scanProgressBar.style.width = '80%';
      const data = await response.json();
      
      if (this.scanProgressBar) this.scanProgressBar.style.width = '100%';
      this.playSuccessChime();

      // Convert the Grok result into a format expected by the UI
      const categoryObj = WASTE_CATEGORIES[data.analyzed.category] || WASTE_CATEGORIES.burnable;
      const synthesizedItem = {
        id: 'grok-' + Math.random().toString(36).substring(7),
        nameEn: data.analyzed.nameEn,
        nameJa: data.analyzed.nameJa,
        image: categoryObj.icon || '🗑️',
        visualClass: 'search-card',
        primaryCategory: data.analyzed.category,
        confidence: data.analyzed.confidence || 0.95,
        composition: [
          {
            partEn: `${data.analyzed.nameEn} Body`,
            partJa: `${data.analyzed.nameJa} 本体`,
            category: data.analyzed.category,
            mark: categoryObj.symbol
          }
        ],
        prepStepsEn: data.analyzed.instructionsEn 
          ? [data.analyzed.instructionsEn]
          : [
          `Identify category: ${categoryObj.nameEn} (${categoryObj.symbol}).`,
          `Inspect item for food contamination, liquid, or residue. Clean if necessary.`,
          `Verify municipal bag type: ${categoryObj.bagTypeEn}.`,
          `Put out during designated ${categoryObj.nameEn} collection window (${categoryObj.scheduleFrequency}).`
        ],
        prepStepsJa: data.analyzed.instructionsJa
          ? [data.analyzed.instructionsJa]
          : [
          `分別区分：${categoryObj.nameJa}（マーク：${categoryObj.symbol}）`,
          `汚れや残液がある場合は水洗いして綺麗に落とします。`,
          `指定袋の確認：${categoryObj.bagTypeJa}`,
          `地域の収集日程（${categoryObj.scheduleFrequency}）の朝に指定集積所へ出します。`
        ],
        designatedBag: categoryObj.bagTypeEn,
        collectionDay: data.analyzed.collectionDay || categoryObj.scheduleFrequency,
        disposalMethod: data.analyzed.disposalMethod || 'Place in designated area',
        specialBagRequired: data.analyzed.specialBagRequired ? 'Yes (Special Bag Required)' : 'No (Use standard transparent bag)',
        proTipEn: `Analyzed by Grok AI. Always follow local ward guidelines.`,
        proTipJa: `Grok AIによる解析です。地域の分別ルールを遵守してください。`
      };

      setTimeout(() => {
        this.isScanning = false;
        if (this.scanOverlay) this.scanOverlay.classList.remove('active');
        if (this.scanHud) this.scanHud.style.display = 'none';
        this.displayClassificationResult(synthesizedItem);
      }, 500);

    } catch (err) {
      console.error(err);
      alert((this.currentLanguage === 'ja' ? 'AIスキャンエラー: ' : 'AI Scan Error: ') + err.message);
      this.isScanning = false;
      if (this.scanOverlay) this.scanOverlay.classList.remove('active');
      if (this.scanHud) this.scanHud.style.display = 'none';
    }
  }

  runScanSimulation(itemData, sourceLabel) {
    if (this.isScanning) return;
    this.isScanning = true;

    // Scroll smoothly to scanner box
    const scannerSection = document.getElementById('scanner-section');
    if (scannerSection) {
      scannerSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (this.scanOverlay) this.scanOverlay.classList.add('active');
    if (this.scanHud) this.scanHud.style.display = 'flex';

    let progress = 0;
    const stagesEn = [
      'Extracting image features...',
      'Detecting Japanese recycling symbols (プラ / PET / 缶)...',
      'Segmenting material layers & components...',
      'Cross-referencing municipal environmental database...',
      'Finalizing disposal protocol!'
    ];
    const stagesJa = [
      '画像特徴量を抽出中...',
      '識別マーク (プラ・PET・缶・不燃) をスキャン中...',
      '素材・構成パーツ（本体/フタ/ラベル）を分解判定...',
      '東京都・各自治体廃棄物基準データベースと照合...',
      '分別・排出プロトコルを生成完了！'
    ];

    const stages = this.currentLanguage === 'ja' ? stagesJa : stagesEn;
    let stageIdx = 0;

    const interval = setInterval(() => {
      progress += 4;
      if (this.scanProgressBar) this.scanProgressBar.style.width = `${Math.min(progress, 100)}%`;

      if (progress % 20 === 0 && stageIdx < stages.length) {
        if (this.scanStatusText) this.scanStatusText.textContent = stages[stageIdx];
        stageIdx++;
        this.playBeepSound(440 + stageIdx * 110, 0.05);
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          this.isScanning = false;
          if (this.scanOverlay) this.scanOverlay.classList.remove('active');
          if (this.scanHud) this.scanHud.style.display = 'none';
          this.playSuccessChime();
          this.displayClassificationResult(itemData);
        }, 350);
      }
    }, 45);
  }

  displayClassificationResult(item) {
    const category = WASTE_CATEGORIES[item.primaryCategory] || WASTE_CATEGORIES.burnable;
    const isJa = this.currentLanguage === 'ja';
    const itemName = isJa ? item.nameJa : item.nameEn;
    const catName = isJa ? category.nameJa : category.nameEn;
    const catDesc = isJa ? category.descriptionJa : category.descriptionEn;
    const prepSteps = isJa ? item.prepStepsJa : item.prepStepsEn;
    const proTip = isJa ? item.proTipJa : item.proTipEn;

    if (!this.resultContainer) return;

    this.resultContainer.innerHTML = `
      <div class="result-card-inner glass-card animate-scale-up">
        <div class="result-header" style="border-bottom: 2px solid ${category.color}25">
          <div class="result-header-left">
            <div class="result-category-pill" style="background: ${category.bgColor}; color: ${category.color}; border: 1.5px solid ${category.color}">
              <span class="category-pill-icon">${category.icon}</span>
              <span class="category-pill-text">${catName}</span>
              <span class="category-pill-badge">${category.symbol}</span>
            </div>
            <h2 class="result-item-title">${itemName}</h2>
            <div class="result-confidence-bar">
              <span class="confidence-tag">${isJa ? 'AI判定信頼度' : 'AI Confidence'}: <strong>${Math.round(item.confidence * 100)}%</strong></span>
              <span class="confidence-match-pill">${isJa ? '✓ 日本標準分別適合' : '✓ Japan Waste Standard Verified'}</span>
            </div>
          </div>
          <div class="result-category-big-badge" style="background: ${category.bgColor}; color: ${category.color}">
            <div class="big-badge-symbol">${category.symbol}</div>
            <div class="big-badge-icon">${category.icon}</div>
          </div>
        </div>

        <div class="result-body-grid">
          <!-- Left Column: Decomposition & Bag requirements -->
          <div class="result-col">
            <h3 class="result-section-heading">
              <span>🧩</span> ${isJa ? '素材・パーツ分解診断' : 'Component Breakdown & Separation'}
            </h3>
            <div class="decomposition-list">
              ${item.composition.map(comp => {
                const compCat = WASTE_CATEGORIES[comp.category] || category;
                const partName = isJa ? comp.partJa : comp.partEn;
                const compCatName = isJa ? compCat.nameJa : compCat.nameEn;
                return `
                  <div class="decomp-item">
                    <div class="decomp-part">
                      <span class="decomp-dot" style="background:${compCat.color}"></span>
                      <strong>${partName}</strong>
                    </div>
                    <div class="decomp-action">
                      <span class="decomp-badge" style="background:${compCat.bgColor}; color:${compCat.color}; border: 1px solid ${compCat.color}50">
                        ${compCat.icon} ${compCatName} [${comp.mark}]
                      </span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="bag-requirement-card" style="border-left: 4px solid ${category.color}">
              <div class="bag-title">
                <span>🏙️</span> <strong>${isJa ? '自治体のルール' : 'City Rules'}</strong>
              </div>
              <p class="bag-text">
                <strong>${isJa ? '収集日' : 'Collection Day'}:</strong> ${item.collectionDay || category.scheduleFrequency || 'N/A'}<br/>
                <strong>${isJa ? '廃棄方法' : 'Disposal Method'}:</strong> ${item.disposalMethod || (isJa ? '指定集積所へ' : 'Place in designated area')}<br/>
                <strong>${isJa ? '専用袋' : 'Special Bag'}:</strong> ${item.specialBagRequired || (isJa ? category.bagTypeJa : category.bagTypeEn) || 'N/A'}
              </p>
            </div>
          </div>

          <!-- Right Column: Step-by-Step Disposal Preparation -->
          <div class="result-col">
            <h3 class="result-section-heading">
              <span>📋</span> ${isJa ? '正しい排出前ステップ (排出手順)' : 'Disposal Preparation Protocol'}
            </h3>
            <div class="prep-step-list">
              ${prepSteps.map((step, idx) => `
                <div class="prep-step-item">
                  <div class="step-number" style="background: ${category.color}; color: #fff;">${idx + 1}</div>
                  <div class="step-content">
                    <p class="step-text">${step}</p>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="pro-tip-box">
              <div class="pro-tip-header">
                <span>💡</span> <strong>${isJa ? '日本の分別マナー豆知識' : 'Japan Sorting Etiquette'}</strong>
              </div>
              <p class="pro-tip-text">${proTip}</p>
            </div>
          </div>
        </div>

        <div class="result-actions-footer">
          <div class="result-btn-group" style="width: 100%; justify-content: space-between;">
            <button id="copy-instructions-btn" class="btn btn-secondary-action">
              <span>📋</span> <span id="copy-btn-text">${isJa ? 'ルールをコピー' : 'Copy Rules'}</span>
            </button>
            <button id="check-schedule-btn" class="btn btn-crimson-action">
              <span>📅</span> <span>${isJa ? '地域のごみ収集日' : 'Collection Day'}</span>
            </button>
            <button id="find-dropoff-btn" class="btn btn-outline-action">
              <span>📍</span> <span>${isJa ? '近くの回収BOX' : 'Drop-offs'}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.resultContainer.classList.add('visible');
    this.resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Hook internal buttons
    const copyBtn = document.getElementById('copy-instructions-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        this.copyInstructions(item, category, copyBtn);
      });
    }

    const scheduleBtn = document.getElementById('check-schedule-btn');
    if (scheduleBtn) {
      scheduleBtn.addEventListener('click', () => {
        const scheduleSec = document.getElementById('schedule-section');
        if (scheduleSec) scheduleSec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const dropoffBtn = document.getElementById('find-dropoff-btn');
    if (dropoffBtn) {
      dropoffBtn.addEventListener('click', () => {
        const mapSec = document.getElementById('map-section');
        if (mapSec) mapSec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Fire callback for gamification reward points
    this.onClassificationComplete(item, category);
  }

  copyInstructions(item, category, btnElement) {
    const isJa = this.currentLanguage === 'ja';
    const textToCopy = isJa
      ? `品名: ${item.nameJa}\n区分: ${category.nameJa}\n\n【分別手順】\n${item.prepStepsJa.join('\n')}\n\n収集日: ${item.collectionDay || category.scheduleFrequency || 'N/A'}\n廃棄方法: ${item.disposalMethod || '指定集積所へ'}\n専用袋: ${item.specialBagRequired || category.bagTypeJa || 'N/A'}`
      : `Item: ${item.nameEn}\nCategory: ${category.nameEn}\n\n[Preparation Steps]\n${item.prepStepsEn.join('\n')}\n\nCollection Day: ${item.collectionDay || category.scheduleFrequency || 'N/A'}\nDisposal Method: ${item.disposalMethod || 'Place in designated area'}\nSpecial Bag: ${item.specialBagRequired || category.bagTypeEn || 'N/A'}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      const textSpan = btnElement.querySelector('#copy-btn-text');
      if (textSpan) {
        const originalText = textSpan.innerText;
        textSpan.innerText = isJa ? 'コピーしました！' : 'Copied!';
        setTimeout(() => {
          textSpan.innerText = originalText;
        }, 2000);
      }
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  playBeepSound(freq = 520, duration = 0.08) {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // Audio context may be restricted before user gesture
    }
  }

  playSuccessChime() {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Japanese bright pentatonic chord)
      notes.forEach((freq, i) => {
        setTimeout(() => this.playBeepSound(freq, 0.18), i * 75);
      });
    } catch (e) {}
  }
}

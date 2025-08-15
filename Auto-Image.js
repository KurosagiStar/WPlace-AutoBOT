<script>
(async () => {
  // ========================= CONFIG =========================
  const CONFIG = {
    COOLDOWN_DEFAULT: 31000,
    TRANSPARENCY_THRESHOLD: 100,
    WHITE_THRESHOLD: 250,
    LOG_INTERVAL: 10,
    CHARGE_PAINT_LATENCY_MS: 120, // pequeño delay por pixel pintado
    MAX_PALETTE: 256,
    THEME: {
      primary: '#000000',
      secondary: '#111111',
      accent: '#222222',
      text: '#ffffff',
      highlight: '#775ce3',
      success: '#00ff00',
      error: '#ff0000',
      warning: '#ffaa00'
    }
  };

  // ========================= I18N =========================
  const MISSING = {
    minimize: "Minimizar",
    width: "Ancho",
    height: "Alto",
    keepAspect: "Mantener proporción",
    apply: "Aplicar",
    cancel: "Cancelar"
  };

  const addMissing = (obj) => Object.keys(MISSING).forEach(k => { if(!obj[k]) obj[k] = MISSING[k]; });

   const TEXTS = {
    pt: {
      title: "WPlace Auto-Image",
      initBot: "Iniciar Auto-BOT",
      uploadImage: "Upload da Imagem",
      resizeImage: "Redimensionar Imagem",
      selectPosition: "Selecionar Posição",
      startPainting: "Iniciar Pintura",
      stopPainting: "Parar Pintura",
      checkingColors: "🔍 Verificando cores disponíveis...",
      noColorsFound: "❌ Abra a paleta de cores no site e tente novamente!",
      colorsFound: "✅ {count} cores disponíveis encontradas",
      loadingImage: "🖼️ Carregando imagem...",
      imageLoaded: "✅ Imagem carregada com {count} pixels válidos",
      imageError: "❌ Erro ao carregar imagem",
      selectPositionAlert: "Pinte o primeiro pixel na localização onde deseja que a arte comece!",
      waitingPosition: "👆 Aguardando você pintar o pixel de referência...",
      positionSet: "✅ Posição definida com sucesso!",
      positionTimeout: "❌ Tempo esgotado para selecionar posição",
      startPaintingMsg: "🎨 Iniciando pintura...",
      paintingProgress: "🧱 Progresso: {painted}/{total} pixels...",
      noCharges: "⌛ Sem cargas. Aguardando {time}...",
      paintingStopped: "⏹️ Pintura interrompida pelo usuário",
      paintingComplete: "✅ Pintura concluída! {count} pixels pintados.",
      paintingError: "❌ Erro durante a pintura",
      missingRequirements: "❌ Carregue uma imagem e selecione uma posição primeiro",
      progress: "Progresso",
      pixels: "Pixels",
      charges: "Cargas",
      estimatedTime: "Tempo estimado",
      initMessage: "Clique em 'Iniciar Auto-BOT' para começar",
      waitingInit: "Aguardando inicialização...",
      resizeSuccess: "✅ Imagem redimensionada para {width}x{height}",
      paintingPaused: "⏸️ Pintura pausada na posição X: {x}, Y: {y}"
    },
    en: {
      title: "WPlace Auto-Image",
      initBot: "Start Auto-BOT",
      uploadImage: "Upload Image",
      resizeImage: "Resize Image",
      selectPosition: "Select Position",
      startPainting: "Start Painting",
      stopPainting: "Stop Painting",
      checkingColors: "🔍 Checking available colors...",
      noColorsFound: "❌ Open the color palette on the site and try again!",
      colorsFound: "✅ {count} available colors found",
      loadingImage: "🖼️ Loading image...",
      imageLoaded: "✅ Image loaded with {count} valid pixels",
      imageError: "❌ Error loading image",
      selectPositionAlert: "Paint the first pixel at the location where you want the art to start!",
      waitingPosition: "👆 Waiting for you to paint the reference pixel...",
      positionSet: "✅ Position set successfully!",
      positionTimeout: "❌ Timeout for position selection",
      startPaintingMsg: "🎨 Starting painting...",
      paintingProgress: "🧱 Progress: {painted}/{total} pixels...",
      noCharges: "⌛ No charges. Waiting {time}...",
      paintingStopped: "⏹️ Painting stopped by user",
      paintingComplete: "✅ Painting complete! {count} pixels painted.",
      paintingError: "❌ Error during painting",
      missingRequirements: "❌ Load an image and select a position first",
      progress: "Progress",
      pixels: "Pixels",
      charges: "Charges",
      estimatedTime: "Estimated time",
      initMessage: "Click 'Start Auto-BOT' to begin",
      waitingInit: "Waiting for initialization...",
      resizeSuccess: "✅ Image resized to {width}x{height}",
      paintingPaused: "⏸️ Painting paused at position X: {x}, Y: {y}"
    },
    fr: {
      title: "WPlace Auto-Image",
      initBot: "Démarrer Auto-BOT",
      uploadImage: "Télécharger l'image",
      resizeImage: "Redimensionner l'image",
      selectPosition: "Sélectionner la position",
      startPainting: "Commencer la peinture",
      stopPainting: "Arrêter la peinture",
      checkingColors: "🔍 Vérification des couleurs disponibles...",
      noColorsFound: "❌ Ouvrez la palette de couleurs sur le site et réessayez !",
      colorsFound: "✅ {count} couleurs disponibles trouvées",
      loadingImage: "🖼️ Chargement de l'image...",
      imageLoaded: "✅ Image chargée avec {count} pixels valides",
      imageError: "❌ Erreur lors du chargement de l'image",
      selectPositionAlert: "Peignez le premier pixel à l’endroit où vous souhaitez commencer l’art !",
      waitingPosition: "👆 En attente que vous peigniez le pixel de référence...",
      positionSet: "✅ Position définie avec succès !",
      positionTimeout: "❌ Temps écoulé pour la sélection de la position",
      startPaintingMsg: "🎨 Début de la peinture...",
      paintingProgress: "🧱 Progression : {painted}/{total} pixels...",
      noCharges: "⌛ Pas de charges. Attente de {time}...",
      paintingStopped: "⏹️ Peinture arrêtée par l’utilisateur",
      paintingComplete: "✅ Peinture terminée ! {count} pixels peints.",
      paintingError: "❌ Erreur pendant la peinture",
      missingRequirements: "❌ Veuillez d'abord télécharger une image et sélectionner une position",
      progress: "Progression",
      pixels: "Pixels",
      charges: "Charges",
      estimatedTime: "Temps estimé",
      initMessage: "Cliquez sur 'Démarrer Auto-BOT' pour commencer",
      waitingInit: "En attente de l'initialisation...",
      resizeSuccess: "✅ Image redimensionnée à {width}x{height}",
      paintingPaused: "⏸️ Peinture en pause à la position X : {x}, Y : {y}"
    },
    ru: {
      title: "WPlace Auto-Image",
      initBot: "Запустить Auto-BOT",
      uploadImage: "Загрузить Изображение",
      resizeImage: "Изменить Размер",
      selectPosition: "Выбрать Позицию",
      startPainting: "Начать Рисование",
      stopPainting: "Завершить Рисование",
      checkingColors: "🔍 Проверка доступных цветов...",
      noColorsFound: "❌ Откройте палитру цветов на сайте и попробуйте снова!",
      colorsFound: "✅ {count} найдено доступных цветов",
      loadingImage: "🖼️ Загрузка изображения...",
      imageLoaded: "✅ Изображение загружено с {count} допустимых пикселей",
      imageError: "❌ Ошибка загрузки изображения",
      selectPositionAlert: "Нарисуйте первый пиксель в том месте, где вы хотите, чтобы начинался арт.!",
      waitingPosition: "👆 Ждем, когда вы нарисуете опорный пиксель...",
      positionSet: "✅ Положение установлено успешно!",
      positionTimeout: "❌ Время ожидания выбора позиции вышло",
      startPaintingMsg: "🎨 Начинаем рисовать...",
      paintingProgress: "🧱 Прогресс: {painted}/{total} пикселей...",
      noCharges: "⌛ Нет зарядов. ожидание {time}...",
      paintingStopped: "⏹️ Рисование остановлено пользователем",
      paintingComplete: "✅ Рисование завершено! {count} пикселей нарисовано.",
      paintingError: "❌ Ошибка во время рисование",
      missingRequirements: "❌ Сначала загрузите изображение и выберите позицию",
      progress: "Прогресс",
      pixels: "Пиксели",
      charges: "Заряды",
      estimatedTime: "Предположительное время",
      initMessage: "Нажмите «Запустить Auto-BOT», чтобы начать",
      waitingInit: "Ожидание инициализации...",
      resizeSuccess: "✅ Изображение изменено до {width}x{height}",
      paintingPaused: "⏸️ Рисование приостановлено на позиции X: {x}, Y: {y}"
    },
    nl: {
      title: "WPlaats Auto-Afbeelding",
      initBot: "Start Auto-BOT",
      uploadImage: "Upload Afbeelding",
      resizeImage: "Formaat Afbeelding Wijzigen",
      selectPosition: "Selecteer Positie",
      startPainting: "Start Schilderen",
      stopPainting: "Stop Schilderen",
      checkingColors: "🔍 Beschikbare kleuren controleren...",
      noColorsFound: "❌ Open het kleurenpalet op de site en probeer het opnieuw!",
      colorsFound: "✅ {count} beschikbare kleuren gevonden",
      loadingImage: "🖼️ Afbeelding laden...",
      imageLoaded: "✅ Afbeelding geladen met {count} geldige pixels",
      imageError: "❌ Fout bij het laden van de afbeelding",
      selectPositionAlert: "Schilder de eerste pixel op de locatie waar je de afbeelding wilt laten beginnen!",
      waitingPosition: "👆 Wacht tot je de referentiepixel schildert...",
      positionSet: "✅ Positie succesvol ingesteld!",
      positionTimeout: "❌ Time-out voor positieselectie",
      startPaintingMsg: "🎨 Schilderen starten...",
      paintingProgress: "🧱 Voortgang: {geschilderd}/{totaal} pixels...",
      noCharges: "⌛ Geen kosten. Wachten {time}...",
      paintingStopped: "⏹️ Schilderen gestopt door gebruiker",
      paintingComplete: "✅ Schilderen voltooid! {count} pixels geschilderd.",
      paintingError: "❌ Fout tijdens het schilderen",
      missingRequirements: "❌ Laad een afbeelding en selecteer eerst een positie",
      progress: "Voortgang",
      pixels: "Pixels",
      charges: "Kosten",
      estimatedTime: "Geschatte tijd",
      initMessage: "Klik op 'Start Auto-BOT' om te beginnen",
      waitingInit: "Wachten op initialisatie...",
      resizeSuccess: "✅ Afbeelding verkleind naar {breedte} x {hoogte}",
      paintingPaused: "⏸️ Schilderen gepauzeerd op positie X: {x}, Y: {y}"
    },
    uk: {
      title: "WPlace Auto-Image",
      initBot: "Запустити бота",
      uploadImage: "Завантажити зображення",
      resizeImage: "Змінити розмір зображення",
      selectPosition: "Вибрати позицію",
      startPainting: "Почати малювання",
      stopPainting: "Зупинити малювання",
      checkingColors: "🔍 Перевірка доступних кольорів...",
      noColorsFound: "❌ Відкрийте палітру кольорів на сайті та спробуйте ще раз!",
      colorsFound: "✅ Знайдено {count} доступних кольорів",
      loadingImage: "🖼️ Завантаження зображення...",
      imageLoaded: "✅ Зображення завантажено з {count} коректними пікселями",
      imageError: "❌ Помилка завантаження зображення",
      selectPositionAlert: "Намалюйте перший піксель у місці, з якого має початися арт!",
      waitingPosition: "👆 Очікування, поки ви намалюєте контрольний піксель...",
      positionSet: "✅ Позицію успішно встановлено!",
      positionTimeout: "❌ Час очікування вибору позиції вичерпано",
      startPaintingMsg: "🎨 Початок малювання...",
      paintingProgress: "🧱 Прогрес: {painted}/{total} пікселів...",
      noCharges: "⌛ Немає зарядів. Очікування {time}...",
      paintingStopped: "⏹️ Малювання зупинено користувачем",
      paintingComplete: "✅ Малювання завершено! Намальовано {count} пікселів.",
      paintingError: "❌ Помилка під час малювання",
      missingRequirements: "❌ Спочатку завантажте зображення та виберіть позицію",
      progress: "Прогрес",
      pixels: "Пікселі",
      charges: "Заряди",
      estimatedTime: "Орієнтовний час",
      initMessage: "Натисніть «Запустити бота», щоб почати",
      waitingInit: "Очікування запуску...",
      resizeSuccess: "✅ Зображення змінено до {width}x{height}",
      paintingPaused: "⏸️ Малювання призупинено на позиції X: {x}, Y: {y}"
    }
  };

  Object.values(TEXTS).forEach(addMissing);

  // ========================= STATE =========================
  const state = {
    running: false,
    imageLoaded: false,
    processing: false,
    totalPixels: 0,
    paintedPixels: 0,
    availableColors: [],
    currentCharges: 0,
    cooldown: CONFIG.COOLDOWN_DEFAULT,
    imageData: null,
    stopFlag: false,
    colorsChecked: false,
    startPosition: null,
    selectingPosition: false,
    region: null,
    minimized: false,
    lastPosition: { x: 0, y: 0 },
    estimatedTime: 0,
    language: 'en'
  };

  // ========================= UTILS =========================
  function detectLanguage() {
    try {
      const userLang = (navigator.language || 'en').split('-')[0];
      state.language = TEXTS[userLang] ? userLang : 'en';
    } catch { state.language = 'en'; }
  }

  const Utils = {
    sleep: (ms) => new Promise(r => setTimeout(r, ms)),

    // Pythagorean distance
    colorDistance: (a, b) => {
      const dr = a[0] - b[0], dg = a[1] - b[1], db = a[2] - b[2];
      return Math.sqrt(dr*dr + dg*dg + db*db);
    },

    createImageUploader: () => new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/png,image/jpeg,image/webp';
      input.onchange = () => {
        const file = input.files && input.files[0];
        if (!file) return reject(new Error('No file selected'));
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.onerror = reject;
        fr.readAsDataURL(file);
      };
      input.click();
    }),

    // Lee colores por estilo computado; ignora slots "vacíos" y ids prohibidos
    extractAvailableColors: () => {
      const nodes = document.querySelectorAll('[id^="color-"]');
      const out = [];
      nodes.forEach(el => {
        // si tiene un <svg> adentro, lo ignoramos (ocupado/bloqueado)
        if (el.querySelector && el.querySelector('svg')) return;

        const id = parseInt(String(el.id || '').replace('color-', ''), 10);
        if (!Number.isFinite(id) || id === 0 || id === 5) return;

        const bg = getComputedStyle(el).backgroundColor; // "rgb(r, g, b)" o "rgba(...)"
        const m = bg && bg.match(/\d+(\.\d+)?/g);
        if (!m || m.length < 3) return;

        const rgb = [Number(m[0]), Number(m[1]), Number(m[2])];
        if (rgb.some(v => Number.isNaN(v))) return;

        out.push({ id, rgb });
      });
      // corta a un máximo razonable
      return out.slice(0, CONFIG.MAX_PALETTE);
    },

    formatTime: (ms) => {
      if (!Number.isFinite(ms) || ms < 0) ms = 0;
      const s = Math.floor(ms / 1000);
      const days = Math.floor(s / 86400);
      const hours = Math.floor((s % 86400) / 3600);
      const minutes = Math.floor((s % 3600) / 60);
      const seconds = s % 60;
      const parts = [];
      if (days) parts.push(`${days}d`);
      if (hours || days) parts.push(`${hours}h`);
      if (minutes || hours || days) parts.push(`${minutes}m`);
      parts.push(`${seconds}s`);
      return parts.join(' ');
    },

    showAlert: (message, type = 'info') => {
      const alert = document.createElement('div');
      const bg = ({error: CONFIG.THEME.error, success: CONFIG.THEME.success,
                   warning: CONFIG.THEME.warning, info: CONFIG.THEME.accent}[type]) || CONFIG.THEME.accent;
      Object.assign(alert.style, {
        position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
        padding: '12px 16px', background: bg, color: CONFIG.THEME.text,
        borderRadius: '6px', zIndex: 10000, boxShadow: '0 3px 10px rgba(0,0,0,0.3)'
      });
      alert.textContent = message;
      document.body.appendChild(alert);
      setTimeout(() => { alert.style.opacity = '0'; alert.style.transition = 'opacity .4s';
        setTimeout(() => alert.remove(), 400); }, 2500);
    },

    /**
     * Estima tiempo restante:
     * - Puedes pintar hasta `currentCharges` pixeles ya.
     * - El resto requiere recargar 1 carga cada `cooldown` (aprox).
     */
    calculateEstimatedTime: (remainingPixels, currentCharges, cooldown) => {
      if (remainingPixels <= 0) return 0;
      const nowPixels = Math.min(remainingPixels, Math.max(0, currentCharges));
      const laterPixels = Math.max(0, remainingPixels - nowPixels);

      const nowMs = nowPixels * CONFIG.CHARGE_PAINT_LATENCY_MS;
      // Cada pixel pendiente ≈ 1 ciclo de cooldown + latencia de pintado
      const laterMs = laterPixels * (Math.max(cooldown, 1000) + CONFIG.CHARGE_PAINT_LATENCY_MS);
      return nowMs + laterMs;
    },

    isWhitePixel: (r, g, b) => (
      r >= CONFIG.WHITE_THRESHOLD &&
      g >= CONFIG.WHITE_THRESHOLD &&
      b >= CONFIG.WHITE_THRESHOLD
    ),

    t: (key, params = {}) => {
      const lang = TEXTS[state.language] || TEXTS.en;
      let text = lang[key] || (TEXTS.en[key] || key);
      for (const [k, v] of Object.entries(params)) text = text.replace(`{${k}}`, v);
      return text;
    },

    // Debounce sencillo
    debounce(fn, wait) {
      let t;
      return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
      };
    }
  };

  // ========================= API =========================
  const WPlaceService = {
    async paintPixelInRegion(regionX, regionY, pixelX, pixelY, color, signal) {
      const url = `https://backend.wplace.live/s0/pixel/${regionX}/${regionY}`;
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
          credentials: 'include',
          body: JSON.stringify({ coords: [pixelX, pixelY], colors: [color] }),
          signal
        });
        if (!res.ok) return false;
        const data = await res.json().catch(() => ({}));
        return data && data.painted === 1;
      } catch { return false; }
    },

    async getCharges() {
      try {
        const res = await fetch('https://backend.wplace.live/me', { credentials: 'include' });
        if (!res.ok) throw new Error('me failed');
        const data = await res.json().catch(() => ({}));
        return {
          charges: Number(data?.charges?.count) || 0,
          cooldown: Number(data?.charges?.cooldownMs) || CONFIG.COOLDOWN_DEFAULT
        };
      } catch {
        return { charges: 0, cooldown: CONFIG.COOLDOWN_DEFAULT };
      }
    }
  };

  // ========================= IMAGE =========================
  class ImageProcessor {
    constructor(imageSrc) {
      this.imageSrc = imageSrc;
      this.img = new Image();
      this.img.crossOrigin = 'anonymous';
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
      this.previewCanvas = document.createElement('canvas');
      this.previewCtx = this.previewCanvas.getContext('2d');
    }

    async load() {
      return new Promise((resolve, reject) => {
        this.img.onload = () => {
          this.canvas.width = this.img.width;
          this.canvas.height = this.img.height;
          this.ctx.drawImage(this.img, 0, 0);
          resolve();
        };
        this.img.onerror = () => reject(new Error('image load error'));
        this.img.src = this.imageSrc;
      });
    }

    getPixelData() {
      return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    }

    getDimensions() {
      return { width: this.canvas.width, height: this.canvas.height };
    }

    resize(newWidth, newHeight) {
      const t = document.createElement('canvas');
      t.width = newWidth; t.height = newHeight;
      const tx = t.getContext('2d');
      tx.imageSmoothingEnabled = false;
      tx.drawImage(this.img, 0, 0, newWidth, newHeight);

      this.canvas.width = newWidth; this.canvas.height = newHeight;
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.drawImage(t, 0, 0);
      return this.getPixelData();
    }

    generatePreview(newWidth, newHeight) {
      this.previewCanvas.width = newWidth;
      this.previewCanvas.height = newHeight;
      this.previewCtx.imageSmoothingEnabled = false;
      this.previewCtx.drawImage(this.img, 0, 0, newWidth, newHeight);
      return this.previewCanvas.toDataURL();
    }
  }

  function findClosestColor(rgb, palette) {
    if (!palette || !palette.length) return 1; // fallback seguro
    let best = palette[0], bestDist = Utils.colorDistance(rgb, palette[0].rgb);
    for (let i = 1; i < palette.length; i++) {
      const d = Utils.colorDistance(rgb, palette[i].rgb);
      if (d < bestDist) { best = palette[i]; bestDist = d; }
    }
    return best.id;
  }

  // ========================= UI =========================
  let updateStats; // se asigna más abajo (debounced)
  let controller = null; // AbortController para parar

  async function createUI() {
    detectLanguage();

    // Font Awesome (opcional)
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fontAwesome);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn { from { transform: translateY(8px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      #wplace-image-bot-container{position:fixed;top:20px;right:20px;width:300px;background:${CONFIG.THEME.primary};
        border:1px solid ${CONFIG.THEME.accent};border-radius:8px;box-shadow:0 5px 15px rgba(0,0,0,.5);z-index:9998;
        font-family:Segoe UI,Roboto,sans-serif;color:${CONFIG.THEME.text};animation:slideIn .25s ease-out;overflow:hidden}
      .wplace-header{padding:12px 15px;background:${CONFIG.THEME.secondary};color:${CONFIG.THEME.highlight};font-size:16px;
        font-weight:600;display:flex;justify-content:space-between;align-items:center;user-select:none;cursor:move}
      .wplace-content{padding:15px}
      .wplace-controls{display:flex;flex-direction:column;gap:8px;margin-bottom:10px}
      .wplace-btn{padding:10px;border:none;border-radius:6px;font-weight:600;cursor:pointer;display:flex;align-items:center;
        justify-content:center;gap:8px;transition:transform .15s}
      .wplace-btn:hover{transform:translateY(-2px)}
      .wplace-btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important}
      .wplace-btn-primary{background:${CONFIG.THEME.accent};color:#fff}
      .wplace-btn-upload{background:${CONFIG.THEME.secondary};color:#fff;border:1px dashed ${CONFIG.THEME.text}}
      .wplace-btn-start{background:${CONFIG.THEME.success};color:#fff}
      .wplace-btn-stop{background:${CONFIG.THEME.error};color:#fff}
      .wplace-btn-select{background:${CONFIG.THEME.highlight};color:#000}
      .wplace-stats{background:${CONFIG.THEME.secondary};padding:10px;border-radius:6px;margin:10px 0}
      .wplace-stat-item{display:flex;justify-content:space-between;padding:4px 0;font-size:13px}
      .wplace-progress{width:100%;background:${CONFIG.THEME.secondary};border-radius:4px;margin:8px 0;overflow:hidden}
      .wplace-progress-bar{height:10px;background:${CONFIG.THEME.highlight};transition:width .25s}
      .wplace-status{padding:8px;border-radius:4px;text-align:center;font-size:13px;background:rgba(255,255,255,.07)}
      .wplace-minimized .wplace-content{display:none}
      .resize-container{display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:${CONFIG.THEME.primary};
        padding:20px;border-radius:8px;z-index:10000;box-shadow:0 0 20px rgba(0,0,0,.5);max-width:90%;max-height:90%;overflow:auto}
      .resize-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);display:none;z-index:9999}
      .resize-preview{max-width:100%;max-height:300px;margin:10px 0;border:1px solid ${CONFIG.THEME.accent}}
      .wplace-header-btn{background:none;border:none;color:${CONFIG.THEME.text};opacity:.8;cursor:pointer}
      .wplace-header-btn:hover{opacity:1}
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.id = 'wplace-image-bot-container';
    container.innerHTML = `
      <div class="wplace-header">
        <div><i class="fas fa-image"></i> ${Utils.t('title')}</div>
        <button id="minimizeBtn" class="wplace-header-btn" title="${Utils.t('minimize')}"><i class="fas fa-minus"></i></button>
      </div>
      <div class="wplace-content">
        <div class="wplace-controls">
          <button id="initBotBtn" class="wplace-btn wplace-btn-primary"><i class="fas fa-robot"></i>${Utils.t('initBot')}</button>
          <button id="uploadBtn" class="wplace-btn wplace-btn-upload" disabled><i class="fas fa-upload"></i>${Utils.t('uploadImage')}</button>
          <button id="resizeBtn" class="wplace-btn wplace-btn-primary" disabled><i class="fas fa-expand"></i>${Utils.t('resizeImage')}</button>
          <button id="selectPosBtn" class="wplace-btn wplace-btn-select" disabled><i class="fas fa-crosshairs"></i>${Utils.t('selectPosition')}</button>
          <button id="startBtn" class="wplace-btn wplace-btn-start" disabled><i class="fas fa-play"></i>${Utils.t('startPainting')}</button>
          <button id="stopBtn" class="wplace-btn wplace-btn-stop" disabled><i class="fas fa-stop"></i>${Utils.t('stopPainting')}</button>
        </div>
        <div class="wplace-progress"><div id="progressBar" class="wplace-progress-bar" style="width:0%"></div></div>
        <div class="wplace-stats"><div id="statsArea"><div class="wplace-stat-item"><div>${Utils.t('initMessage')}</div></div></div></div>
        <div id="statusText" class="wplace-status">${Utils.t('waitingInit')}</div>
      </div>
    `;

    const resizeOverlay = document.createElement('div');
    resizeOverlay.className = 'resize-overlay';

    const resizeContainer = document.createElement('div');
    resizeContainer.className = 'resize-container';
    resizeContainer.innerHTML = `
      <h3 style="margin-top:0">${Utils.t('resizeImage')}</h3>
      <div class="resize-controls">
        <label>${Utils.t('width')}: <span id="widthValue">0</span>px
          <input type="range" id="widthSlider" class="resize-slider" min="10" max="500" value="100">
        </label>
        <label>${Utils.t('height')}: <span id="heightValue">0</span>px
          <input type="range" id="heightSlider" class="resize-slider" min="10" max="500" value="100">
        </label>
        <label><input type="checkbox" id="keepAspect" checked> ${Utils.t('keepAspect')}</label>
        <img id="resizePreview" class="resize-preview" src="">
        <div style="display:flex;gap:10px">
          <button id="confirmResize" class="wplace-btn wplace-btn-primary"><i class="fas fa-check"></i>${Utils.t('apply')}</button>
          <button id="cancelResize" class="wplace-btn wplace-btn-stop"><i class="fas fa-times"></i>${Utils.t('cancel')}</button>
        </div>
      </div>
    `;

    document.body.appendChild(container);
    document.body.appendChild(resizeOverlay);
    document.body.appendChild(resizeContainer);

    // Drag
    const header = container.querySelector('.wplace-header');
    let pos1=0,pos2=0,pos3=0,pos4=0;
    header.onmousedown = (e) => {
      if (e.target.closest('#minimizeBtn')) return;
      e.preventDefault(); pos3=e.clientX; pos4=e.clientY;
      document.onmouseup = () => { document.onmouseup=null; document.onmousemove=null; };
      document.onmousemove = (ev) => {
        ev.preventDefault();
        pos1 = pos3 - ev.clientX; pos2 = pos4 - ev.clientY; pos3 = ev.clientX; pos4 = ev.clientY;
        container.style.top = (container.offsetTop - pos2) + "px";
        container.style.left = (container.offsetLeft - pos1) + "px";
      };
    };

    // Refs
    const initBotBtn = container.querySelector('#initBotBtn');
    const uploadBtn = container.querySelector('#uploadBtn');
    const resizeBtn = container.querySelector('#resizeBtn');
    const selectPosBtn = container.querySelector('#selectPosBtn');
    const startBtn = container.querySelector('#startBtn');
    const stopBtn = container.querySelector('#stopBtn');
    const minimizeBtn = container.querySelector('#minimizeBtn');
    const statusText = container.querySelector('#statusText');
    const progressBar = container.querySelector('#progressBar');
    const statsArea = container.querySelector('#statsArea');

    const widthSlider = resizeContainer.querySelector('#widthSlider');
    const heightSlider = resizeContainer.querySelector('#heightSlider');
    const widthValue = resizeContainer.querySelector('#widthValue');
    const heightValue = resizeContainer.querySelector('#heightValue');
    const keepAspect = resizeContainer.querySelector('#keepAspect');
    const resizePreview = resizeContainer.querySelector('#resizePreview');
    const confirmResize = resizeContainer.querySelector('#confirmResize');
    const cancelResize = resizeContainer.querySelector('#cancelResize');

    minimizeBtn.addEventListener('click', () => {
      state.minimized = !state.minimized;
      container.classList.toggle('wplace-minimized', state.minimized);
      minimizeBtn.innerHTML = state.minimized ? '<i class="fas fa-expand"></i>' : '<i class="fas fa-minus"></i>';
    });

    window.updateUI = (messageKey, type = 'default', params = {}) => {
      const message = Utils.t(messageKey, params);
      statusText.textContent = message;
      statusText.style.animation = 'none'; void statusText.offsetWidth;
      statusText.style.animation = 'slideIn .2s ease-out';
    };

    // Debounced stats
    updateStats = Utils.debounce(async () => {
      if (!state.colorsChecked) return;
      const { charges, cooldown } = await WPlaceService.getCharges();
      state.currentCharges = Math.floor(charges);
      state.cooldown = cooldown;

      const progress = state.totalPixels > 0 ?
        Math.round((state.paintedPixels / state.totalPixels) * 100) : 0;
      const remaining = Math.max(0, state.totalPixels - state.paintedPixels);
      state.estimatedTime = Utils.calculateEstimatedTime(remaining, state.currentCharges, state.cooldown);

      progressBar.style.width = `${progress}%`;
      statsArea.innerHTML = `
        <div class="wplace-stat-item"><div><i class="fas fa-image"></i> ${Utils.t('progress')}</div><div>${progress}%</div></div>
        <div class="wplace-stat-item"><div><i class="fas fa-paint-brush"></i> ${Utils.t('pixels')}</div><div>${state.paintedPixels}/${state.totalPixels}</div></div>
        <div class="wplace-stat-item"><div><i class="fas fa-bolt"></i> ${Utils.t('charges')}</div><div>${state.currentCharges}</div></div>
        ${state.imageLoaded ? `<div class="wplace-stat-item"><div><i class="fas fa-clock"></i> ${Utils.t('estimatedTime')}</div><div>${Utils.formatTime(state.estimatedTime)}</div></div>` : ''}
      `;
    }, 1500);

    function openResizeDialog(processor) {
      const { width, height } = processor.getDimensions();
      const aspect = width / height;

      // Reset listeners (evita duplicarlos si reabres el diálogo)
      const newWidthSlider = widthSlider.cloneNode(true);
      const newHeightSlider = heightSlider.cloneNode(true);
      widthSlider.parentNode.replaceChild(newWidthSlider, widthSlider);
      heightSlider.parentNode.replaceChild(newHeightSlider, heightSlider);

      const _widthSlider = resizeContainer.querySelector('#widthSlider');
      const _heightSlider = resizeContainer.querySelector('#heightSlider');

      _widthSlider.value = width; _heightSlider.value = height;
      widthValue.textContent = width; heightValue.textContent = height;
      resizePreview.src = processor.generatePreview(width, height);

      const updatePreview = () => {
        const w = parseInt(_widthSlider.value, 10);
        const h = parseInt(_heightSlider.value, 10);
        widthValue.textContent = w; heightValue.textContent = h;
        resizePreview.src = processor.generatePreview(w, h);
      };

      _widthSlider.addEventListener('input', () => {
        if (keepAspect.checked) {
          const w = parseInt(_widthSlider.value, 10);
          _heightSlider.value = Math.max(1, Math.round(w / aspect));
        }
        updatePreview();
      });
      _heightSlider.addEventListener('input', () => {
        if (keepAspect.checked) {
          const h = parseInt(_heightSlider.value, 10);
          _widthSlider.value = Math.max(1, Math.round(h * aspect));
        }
        updatePreview();
      });

      confirmResize.onclick = () => {
        const newW = parseInt(_widthSlider.value, 10);
        const newH = parseInt(_heightSlider.value, 10);
        const newPixels = state.imageData.processor.resize(newW, newH);

        let totalValid = 0;
        for (let y = 0; y < newH; y++) {
          for (let x = 0; x < newW; x++) {
            const i = (y * newW + x) * 4;
            const r = newPixels[i], g = newPixels[i+1], b = newPixels[i+2], a = newPixels[i+3];
            if (a < CONFIG.TRANSPARENCY_THRESHOLD) continue;
            if (Utils.isWhitePixel(r, g, b)) continue;
            totalValid++;
          }
        }

        state.imageData.pixels = newPixels;
        state.imageData.width = newW;
        state.imageData.height = newH;
        state.imageData.totalPixels = totalValid;
        state.totalPixels = totalValid;
        state.paintedPixels = 0;
        state.lastPosition = { x: 0, y: 0 };

        updateStats();
        updateUI('resizeSuccess', 'success', { width: newW, height: newH });
        closeResizeDialog();
      };

      cancelResize.onclick = closeResizeDialog;

      resizeOverlay.style.display = 'block';
      resizeContainer.style.display = 'block';
    }
    function closeResizeDialog() {
      resizeOverlay.style.display = 'none';
      resizeContainer.style.display = 'none';
    }

    // === Listeners ===
    initBotBtn.addEventListener('click', async () => {
      updateUI('checkingColors');
      let palette = Utils.extractAvailableColors();
      if (!palette.length) {
        Utils.showAlert(Utils.t('noColorsFound'), 'error');
        updateUI('noColorsFound', 'error');
        return;
      }
      state.availableColors = palette;
      state.colorsChecked = true;

      uploadBtn.disabled = false;
      selectPosBtn.disabled = false;
      initBotBtn.disabled = true;
      initBotBtn.style.display = 'none';

      updateUI('colorsFound', 'success', { count: palette.length });
      updateStats();
    });

    uploadBtn.addEventListener('click', async () => {
      try {
        updateUI('loadingImage');
        const src = await Utils.createImageUploader();
        const processor = new ImageProcessor(src);
        await processor.load();

        const { width, height } = processor.getDimensions();
        const pixels = processor.getPixelData();

        let totalValid = 0;
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const r = pixels[i], g = pixels[i+1], b = pixels[i+2], a = pixels[i+3];
            if (a < CONFIG.TRANSPARENCY_THRESHOLD) continue;
            if (Utils.isWhitePixel(r, g, b)) continue;
            totalValid++;
          }
        }

        state.imageData = { width, height, pixels, totalPixels: totalValid, processor };
        state.totalPixels = totalValid;
        state.paintedPixels = 0;
        state.imageLoaded = true;
        state.lastPosition = { x: 0, y: 0 };

        resizeBtn.disabled = false;
        if (state.startPosition) startBtn.disabled = false;

        updateStats();
        updateUI('imageLoaded', 'success', { count: totalValid });
      } catch {
        updateUI('imageError', 'error');
      }
    });

    resizeBtn.addEventListener('click', () => {
      if (state.imageLoaded && state.imageData?.processor) openResizeDialog(state.imageData.processor);
    });

    selectPosBtn.addEventListener('click', async () => {
      if (state.selectingPosition) return;
      state.selectingPosition = true;
      state.startPosition = null;
      state.region = null;
      startBtn.disabled = true;

      Utils.showAlert(Utils.t('selectPositionAlert'), 'info');
      updateUI('waitingPosition');

      const originalFetch = window.fetch;
      let timeoutId;

      window.fetch = async (url, options) => {
        const isPaintPost = (typeof url === 'string') &&
          url.includes('https://backend.wplace.live/s0/pixel/') &&
          options?.method?.toUpperCase() === 'POST';

        if (!isPaintPost) return originalFetch(url, options);

        try {
          const response = await originalFetch(url, options);
          const clone = response.clone();
          const data = await clone.json().catch(() => ({}));

          if (data?.painted === 1) {
            const m = String(url).match(/\/pixel\/(\d+)\/(\d+)/);
            if (m && m.length >= 3) state.region = { x: parseInt(m[1], 10), y: parseInt(m[2], 10) };

            const body = JSON.parse(options.body || '{}');
            if (body?.coords && Array.isArray(body.coords)) {
              state.startPosition = { x: Number(body.coords[0]) || 0, y: Number(body.coords[1]) || 0 };
              state.lastPosition = { x: 0, y: 0 };
              if (state.imageLoaded) startBtn.disabled = false;

              window.fetch = originalFetch;
              state.selectingPosition = false;
              clearTimeout(timeoutId);
              updateUI('positionSet', 'success');
            }
          }
          return response;
        } catch (e) {
          return originalFetch(url, options);
        }
      };

      timeoutId = setTimeout(() => {
        if (state.selectingPosition) {
          window.fetch = originalFetch;
          state.selectingPosition = false;
          updateUI('positionTimeout', 'error');
          Utils.showAlert(Utils.t('positionTimeout'), 'error');
        }
      }, 120000);
    });

    startBtn.addEventListener('click', async () => {
      if (!state.imageLoaded || !state.startPosition || !state.region) {
        updateUI('missingRequirements', 'error'); return;
      }
      controller?.abort();
      controller = new AbortController();

      state.running = true;
      state.stopFlag = false;

      startBtn.disabled = true;
      stopBtn.disabled = false;
      uploadBtn.disabled = true;
      selectPosBtn.disabled = true;
      resizeBtn.disabled = true;

      updateUI('startPaintingMsg', 'success');
      try {
        await processImage(controller.signal);
      } catch {
        updateUI('paintingError', 'error');
      } finally {
        state.running = false;
        stopBtn.disabled = true;

        if (!state.stopFlag) {
          uploadBtn.disabled = false;
          selectPosBtn.disabled = false;
          resizeBtn.disabled = false;
          startBtn.disabled = true;
        } else {
          startBtn.disabled = false; // permitir reanudar
        }
      }
    });

    stopBtn.addEventListener('click', () => {
      state.stopFlag = true;
      controller?.abort();
      stopBtn.disabled = true;
      updateUI('paintingStopped', 'warning');
    });
  }

  // ========================= CORE LOOP =========================
  async function processImage(signal) {
    const { width, height, pixels } = state.imageData;
    const { x: startX, y: startY } = state.startPosition;
    const { x: regionX, y: regionY } = state.region;

    // Pre-carga de charges
    const init = await WPlaceService.getCharges();
    state.currentCharges = init.charges;
    state.cooldown = init.cooldown;
    await updateStats();

    for (let y = state.lastPosition.y; y < height; y++) {
      for (let x = (y === state.lastPosition.y ? state.lastPosition.x : 0); x < width; x++) {
        if (state.stopFlag) {
          state.lastPosition = { x, y };
          updateUI('paintingPaused', 'warning', { x, y });
          await updateStats();
          return;
        }

        const idx = (y * width + x) * 4;
        const r = pixels[idx], g = pixels[idx+1], b = pixels[idx+2], a = pixels[idx+3];
        if (a < CONFIG.TRANSPARENCY_THRESHOLD) continue;
        if (Utils.isWhitePixel(r, g, b)) continue;

        const colorId = findClosestColor([r, g, b], state.availableColors);

        // Sin cargas -> esperar cooldown
        while (state.currentCharges < 1) {
          updateUI('noCharges', 'warning', { time: Utils.formatTime(state.cooldown) });
          await Utils.sleep(state.cooldown);
          const res = await WPlaceService.getCharges();
          state.currentCharges = res.charges; state.cooldown = res.cooldown;
          await updateStats();
        }

        const pixelX = startX + x;
        const pixelY = startY + y;

        // pintar con reintentos básicos
        let success = false;
        for (let attempt = 0; attempt < 3 && !success; attempt++) {
          success = await WPlaceService.paintPixelInRegion(regionX, regionY, pixelX, pixelY, colorId, signal);
          if (!success) await Utils.sleep(200 + attempt * 200);
        }

        // Contabilidad y progreso
        if (success) {
          state.paintedPixels++;
          state.currentCharges = Math.max(0, state.currentCharges - 1);

          if (state.paintedPixels % CONFIG.LOG_INTERVAL === 0) {
            state.estimatedTime = Utils.calculateEstimatedTime(
              Math.max(0, state.totalPixels - state.paintedPixels),
              state.currentCharges, state.cooldown
            );
            updateUI('paintingProgress', undefined, {
              painted: state.paintedPixels, total: state.totalPixels
            });
            await updateStats();
          }
        }

        // pequeña pausa para no saturar
        await Utils.sleep(CONFIG.CHARGE_PAINT_LATENCY_MS);
      }
    }

    updateUI('paintingComplete', 'success', { count: state.paintedPixels });
    state.lastPosition = { x: 0, y: 0 };
    await updateStats();
  }

  // ========================= BOOT =========================
  createUI();
})();
</script>

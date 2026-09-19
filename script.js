(() => {
  const STAGE_W = 1920;
  const STAGE_H = 1080;
  const SAFE_BOTTOM = 72; // espaço do contador e da barra de progresso
  // Itens de texto que entram em cascata dentro do slide
  const REVEAL_ITEMS = '.steps li, .problem, .rule, .howto-row, .plat-card, .plat-tip, .group-card, ' +
    '.flow-step, .skill-row, .agenda li, .compare, .info-card, .pkg, .deep > div, .bio-facts li, ' +
    '.timebar-seg, .mini-flow li, .evidence-col';

  const stage = document.querySelector('.stage');
  const slides = [...document.querySelectorAll('.slide')];
  const counter = document.querySelector('.counter');
  const progress = document.querySelector('.progress');
  const total = slides.length;
  let current = 1;

  const pad = (n) => String(n).padStart(2, '0');

  function parseHash(hash) {
    const n = Number.parseInt(hash.replace('#', ''), 10);
    return Number.isInteger(n) && n >= 1 && n <= total ? n : 1;
  }

  function show(n) {
    const previous = current;
    current = Math.min(Math.max(n, 1), total);
    slides.forEach((s) => s.classList.remove('is-leaving'));
    if (previous !== current) {
      stage.dataset.dir = current > previous ? 'next' : 'prev';
      const leaving = slides[previous - 1];
      leaving.classList.add('is-leaving');
      leaving.addEventListener('animationend', () => leaving.classList.remove('is-leaving'), { once: true });
    }
    slides.forEach((s, i) => s.classList.toggle('is-active', i === current - 1));
    const active = slides[current - 1];
    active.querySelectorAll(REVEAL_ITEMS).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.setProperty('--i', String(Math.min(i, 8)));
    });
    stage.dataset.theme = active.classList.contains('slide--dark') ? 'dark' : 'light';
    counter.textContent = `${pad(current)} / ${pad(total)}`;
    progress.style.width = `${(current / total) * 100}%`;
    document.body.dataset.current = String(current);
    if (location.hash !== `#${current}`) history.replaceState(null, '', `#${current}`);
  }

  function fit() {
    const scale = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
    stage.style.setProperty('--scale', String(scale));
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.();
  }

  // Modo ?check: lista os slides com texto fora da área útil.
  function findOverflow() {
    const bad = [];
    slides.forEach((slide, i) => {
      slides.forEach((s) => s.classList.toggle('is-active', s === slide));
      const box = slide.getBoundingClientRect();
      const scale = box.width / STAGE_W;
      const bottomLimit = box.bottom - SAFE_BOTTOM * scale;
      const leaves = [...slide.querySelectorAll('*')].filter(
        (el) => el.children.length === 0 && !el.closest('[data-bleed]')
      );
      const escaped = leaves.some((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) return false;
        return r.left < box.left - 1 || r.right > box.right + 1 ||
          r.top < box.top - 1 || r.bottom > bottomLimit + 1;
      });
      if (escaped) bad.push(i + 1);
    });
    show(current);
    return bad;
  }

  document.querySelector('.home-btn').addEventListener('click', () => show(1));

  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) show(current + 1);
    else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) show(current - 1);
    else if (e.key === 'Home') show(1);
    else if (e.key === 'End') show(total);
    else if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    else return;
    e.preventDefault();
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('a, button')) return;
    show(e.clientX > window.innerWidth / 2 ? current + 1 : current - 1);
  });

  window.addEventListener('hashchange', () => show(parseHash(location.hash)));
  window.addEventListener('resize', fit);

  fit();
  current = parseHash(location.hash); // primeira exibição sem transição de saída
  show(current);

  // Modo ?export: slide no estado final, sem controles (usado para gerar o Keynote)
  const params = new URLSearchParams(location.search);
  if (params.has('export')) {
    document.body.classList.add('is-export');
    if (params.has('arial')) document.body.classList.add('is-export-arial'); // fontes padrão (Arial / Courier New)
    if (params.has('notext')) document.body.classList.add('is-notext'); // só as formas, para o fundo do PPTX
    if (params.has('extract')) document.fonts.ready.then(extractText);
  }

  // Modo ?export&extract: mede cada bloco de texto de todos os slides e grava o resultado
  // (JSON em base64) num <script id="export-data">, para gerar o PPTX editável.
  function extractText() {
    const isInline = (el) => ['inline', 'contents'].includes(getComputedStyle(el).display);
    const px = (v) => Number.parseFloat(v) || 0;
    const result = slides.map((slide) => {
      slides.forEach((s) => s.classList.toggle('is-active', s === slide));
      const box = slide.getBoundingClientRect();
      const scale = box.width / STAGE_W;
      const blocks = new Map();
      const blockOf = (node) => {
        let el = node.parentElement;
        while (el !== slide && isInline(el)) el = el.parentElement;
        return el;
      };
      const entry = (el) => {
        if (!blocks.has(el)) blocks.set(el, { runs: [], rects: [] });
        return blocks.get(el);
      };
      const walker = document.createTreeWalker(slide, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
      while (walker.nextNode()) {
        const n = walker.currentNode;
        if (n.nodeType === 1) {
          if (n.tagName === 'BR') entry(blockOf(n)).runs.push({ br: true });
          continue;
        }
        const parent = n.parentElement;
        const cs = getComputedStyle(parent);
        const pre = cs.whiteSpace.startsWith('pre');
        let text = pre ? n.textContent : n.textContent.replace(/\s+/g, ' ');
        if (!text) continue;
        const range = document.createRange();
        range.selectNodeContents(n);
        const rects = [...range.getClientRects()].filter((r) => r.width > 0 && r.height > 0);
        if (!rects.length && !pre) continue;
        if (cs.textTransform === 'uppercase') text = text.toUpperCase();
        const b = entry(blockOf(n));
        b.rects.push(...rects);
        b.runs.push({
          text,
          size: px(cs.fontSize) / scale,
          weight: Number.parseInt(cs.fontWeight, 10),
          italic: cs.fontStyle === 'italic',
          mono: /courier|mono|menlo/i.test(cs.fontFamily),
          color: cs.color,
          spacing: cs.letterSpacing === 'normal' ? 0 : px(cs.letterSpacing) / scale,
          pre,
        });
      }
      const out = [];
      blocks.forEach((b, el) => {
        if (!b.rects.length || !b.runs.some((r) => r.text && r.text.trim())) return;
        const cs = getComputedStyle(el);
        const er = el.getBoundingClientRect();
        const contentLeft = er.left + px(cs.borderLeftWidth) + px(cs.paddingLeft);
        const contentRight = er.right - px(cs.borderRightWidth) - px(cs.paddingRight);
        const left = Math.min(...b.rects.map((r) => r.left));
        const top = Math.min(...b.rects.map((r) => r.top));
        const bottom = Math.max(...b.rects.map((r) => r.bottom));
        const firstSize = b.runs.find((r) => r.size).size * scale;
        const lh = cs.lineHeight === 'normal' ? firstSize * 1.2 : px(cs.lineHeight);
        const firstH = b.rects[0].height;
        const align = ['center', 'right', 'end'].includes(cs.textAlign) ? (cs.textAlign === 'end' ? 'right' : cs.textAlign) : 'left';
        const x = align === 'left' ? left : contentLeft;
        out.push({
          x: (x - box.left) / scale,
          y: (top - (lh - firstH) / 2 - box.top) / scale,
          w: (contentRight - x) / scale + 4,
          h: (bottom - top + (lh - firstH)) / scale,
          lineHeight: lh / scale,
          align,
          runs: b.runs,
        });
      });
      return { index: slides.indexOf(slide) + 1, blocks: out };
    });
    show(current);
    const tag = document.createElement('script');
    tag.type = 'application/json';
    tag.id = 'export-data';
    tag.textContent = btoa(unescape(encodeURIComponent(JSON.stringify(result))));
    document.body.appendChild(tag);
  }

  if (new URLSearchParams(location.search).has('check')) {
    document.body.classList.add('is-checking');
    document.fonts.ready.then(() => {
      document.body.dataset.overflow = findOverflow().join(',');
      document.body.dataset.checked = 'true';
    });
  }
})();

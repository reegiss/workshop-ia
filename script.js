(() => {
  const STAGE_W = 1920;
  const STAGE_H = 1080;
  const SAFE_BOTTOM = 72; // espaço do contador e da barra de progresso
  // Itens de texto que entram em cascata dentro do slide
  const REVEAL_ITEMS = '.steps li, .problem, .rule, .howto-row, .plat-card, .plat-tip, .group-card, ' +
    '.flow-step, .skill-row, .agenda li, .compare, .info-card, .pkg, .deep > div, .bio-facts li';

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
    if (e.target.closest('a')) return;
    show(e.clientX > window.innerWidth / 2 ? current + 1 : current - 1);
  });

  window.addEventListener('hashchange', () => show(parseHash(location.hash)));
  window.addEventListener('resize', fit);

  fit();
  current = parseHash(location.hash); // primeira exibição sem transição de saída
  show(current);

  if (new URLSearchParams(location.search).has('check')) {
    document.body.classList.add('is-checking');
    document.fonts.ready.then(() => {
      document.body.dataset.overflow = findOverflow().join(',');
      document.body.dataset.checked = 'true';
    });
  }
})();

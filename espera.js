// Tela de espera: contagem regressiva e globo de termos de IA.
// Uso: espera.html?min=10 (padrão) ou espera.html?ate=14:00
// ?giro=N adianta a rotação em N segundos (útil para conferir quadros diferentes)

(function () {
  const stage = document.querySelector('.wait');
  const label = document.getElementById('wait-label');
  const time = document.getElementById('wait-time');
  const globe = document.getElementById('globe');

  // Escala o palco 1920×1080 para caber na janela
  function fit() {
    const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.transform = `scale(${s})`;
  }
  window.addEventListener('resize', fit);
  fit();

  // Contagem regressiva até um instante absoluto
  const params = new URLSearchParams(location.search);
  let target;
  const until = params.get('ate');
  if (until && /^\d{1,2}:\d{2}$/.test(until)) {
    const [h, m] = until.split(':').map(Number);
    target = new Date();
    target.setHours(h, m, 0, 0);
  } else {
    const min = Number(params.get('min'));
    target = new Date(Date.now() + (Number.isFinite(min) && params.has('min') ? min : 10) * 60000);
  }

  const pad = (n) => String(n).padStart(2, '0');
  function tick() {
    const left = Math.max(0, Math.ceil((target - Date.now()) / 1000));
    const h = Math.floor(left / 3600);
    const m = Math.floor((left % 3600) / 60);
    const s = left % 60;
    time.textContent = h ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
    stage.classList.toggle('is-last', left > 0 && left <= 60);
    stage.classList.toggle('is-done', left === 0);
    label.textContent = left === 0 ? 'Vamos começar' : 'Começamos em';
  }
  tick();
  setInterval(tick, 250);

  // Globo: termos numa esfera de Fibonacci, girando no eixo Y com inclinação fixa no X
  const ours = ['SDD', 'TDD', 'spec', 'plano', 'evidência', 'skills'];
  const terms = [
    'agentes', 'LLM', 'RAG', 'MCP', 'context engineering', 'prompt engineering',
    'embeddings', 'fine-tuning', 'evals', 'guardrails', 'alucinação', 'tokens',
    'multimodal', 'reasoning', 'chain-of-thought', 'vibe coding', 'Copilot', 'subagentes',
    'tool use', 'function calling', 'vector DB', 'transformers', 'open weights', 'AI safety',
    'janela de contexto', 'inferência', 'LoRA', 'agentic workflows', 'Claude', 'GPT', 'Gemini',
  ];
  // Espalha os termos do workshop pelo globo, em vez de agrupá-los num polo
  ours.forEach((word, i) => terms.splice(3 + i * 6, 0, word));

  const R = 370;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const points = terms.map((word, i) => {
    const y = 1 - (i / (terms.length - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const a = i * golden;
    const el = document.createElement('span');
    el.textContent = word;
    if (ours.includes(word)) el.classList.add('is-ours');
    globe.appendChild(el);
    return { el, x: Math.cos(a) * r * R, y: y * R, z: Math.sin(a) * r * R };
  });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const speed = reduced ? 0.03 : 0.22; // radianos por segundo
  const tilt = -0.32;
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);
  const start = performance.now() - (Number(params.get('giro')) || 0) * 1000;

  // Linhas da esfera: contorno, paralelos e meridianos, desenhados num canvas atrás dos termos
  const canvas = document.createElement('canvas');
  const SIZE = 840;
  const DPR = 2;
  canvas.width = SIZE * DPR;
  canvas.height = SIZE * DPR;
  globe.prepend(canvas);
  const ctx = canvas.getContext('2d');
  ctx.scale(DPR, DPR);
  ctx.translate(SIZE / 2, SIZE / 2);

  const STEPS = 72;
  const lines = [];
  for (const lat of [-60, -30, 0, 30, 60]) {
    const phi = (lat * Math.PI) / 180;
    lines.push(Array.from({ length: STEPS + 1 }, (_, i) => {
      const t = (i / STEPS) * Math.PI * 2;
      return [Math.cos(phi) * Math.cos(t) * R, Math.sin(phi) * R, Math.cos(phi) * Math.sin(t) * R];
    }));
  }
  for (let lon = 0; lon < 180; lon += 30) {
    const l = (lon * Math.PI) / 180;
    lines.push(Array.from({ length: STEPS + 1 }, (_, i) => {
      const t = (i / STEPS) * Math.PI * 2;
      return [Math.cos(t) * Math.cos(l) * R, Math.sin(t) * R, Math.cos(t) * Math.sin(l) * R];
    }));
  }

  function frame(now) {
    const a = ((now - start) / 1000) * speed;
    const ca = Math.cos(a);
    const sa = Math.sin(a);
    // Gira no eixo Y, inclina no X; d vai de 0 (atrás) a 1 (na frente)
    const project = (px, py, pz) => {
      const x = px * ca + pz * sa;
      const z1 = -px * sa + pz * ca;
      const y = py * ct - z1 * st;
      const z = py * st + z1 * ct;
      return { x, y, d: (z / R + 1) / 2 };
    };

    ctx.clearRect(-SIZE / 2, -SIZE / 2, SIZE, SIZE);
    ctx.lineWidth = 1.5;
    for (const line of lines) {
      let prev = project(...line[0]);
      for (let i = 1; i < line.length; i++) {
        const cur = project(...line[i]);
        ctx.strokeStyle = `rgba(61, 143, 224, ${(0.05 + ((prev.d + cur.d) / 2) * 0.3).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(cur.x, cur.y);
        ctx.stroke();
        prev = cur;
      }
    }
    ctx.strokeStyle = 'rgba(61, 143, 224, 0.55)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, Math.PI * 2);
    ctx.stroke();

    for (const p of points) {
      const { x, y, d } = project(p.x, p.y, p.z);
      const scale = 0.5 + d * 0.8;
      p.el.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${scale.toFixed(3)})`;
      p.el.style.opacity = (0.25 + d * 0.75).toFixed(3);
      p.el.style.zIndex = Math.round(d * 100);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // Seta, espaço ou clique: vai para o deck
  function goDeck() { location.href = 'index.html'; }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') goDeck();
  });
  document.addEventListener('click', goDeck);
})();

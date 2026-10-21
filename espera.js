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

  function frame(now) {
    const a = ((now - start) / 1000) * speed;
    const ca = Math.cos(a);
    const sa = Math.sin(a);
    for (const p of points) {
      const x = p.x * ca + p.z * sa;
      const z1 = -p.x * sa + p.z * ca;
      const y = p.y * ct - z1 * st;
      const z = p.y * st + z1 * ct;
      const d = (z / R + 1) / 2; // 0 atrás, 1 na frente
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

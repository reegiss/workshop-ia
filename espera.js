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
  // Cada letra é um ponto da esfera: a palavra segue o paralelo do seu centro e se curva com o globo.
  // As palavras correm em faixas de latitude: numa faixa todas derivam juntas, com folgas
  // aleatórias entre elas, e a oscilação é menor que o vão entre faixas. Assim o giro não parece
  // um bloco rígido e as palavras não se atropelam.
  const MAX_LAT = 1.0; // ~57°: perto dos polos o paralelo é curto demais para uma palavra
  const LANES = 7; // vão de 0,33 rad (~120px) entre faixas: folga até perto da borda, onde a perspectiva aperta
  const rand = (min, max) => min + Math.random() * (max - min);
  const words = [];
  function buildWords() {
    const family = getComputedStyle(document.documentElement).getPropertyValue('--font');
    const measure = document.createElement('canvas').getContext('2d');
    const lanes = Array.from({ length: LANES }, (_, k) => {
      const lat = -MAX_LAT + (k * 2 * MAX_LAT) / (LANES - 1);
      return { lat, length: 2 * Math.PI * R * Math.cos(lat), used: 0, items: [] };
    });

    terms.forEach((word) => {
      const isOurs = ours.includes(word);
      measure.font = `${isOurs ? 800 : 700} 32px ${family}`;
      const letters = [...word];
      // 1,15×: na frente a letra cresce até 1,2×, e o espaçamento precisa acompanhar
      const widths = letters.map((ch) => measure.measureText(ch).width * 1.15);
      const width = widths.reduce((sum, w) => sum + w, 0);
      let s = -width / 2;
      const chars = [];
      letters.forEach((ch, k) => {
        const mid = s + widths[k] / 2;
        s += widths[k];
        if (ch === ' ') return;
        const el = document.createElement('span');
        el.textContent = ch;
        if (isOurs) el.classList.add('is-ours');
        globe.appendChild(el);
        chars.push({ el, mid });
      });
      // Vai para a faixa mais vazia, em proporção ao comprimento do paralelo
      const lane = lanes.reduce((best, l) => ((l.used + width) / l.length < (best.used + width) / best.length ? l : best));
      lane.used += width;
      lane.items.push({ chars, width });
    });

    for (const lane of lanes) {
      const r = R * Math.cos(lane.lat);
      // Divide a sobra da faixa em folgas de tamanhos aleatórios, sempre positivas
      const weights = lane.items.map(() => rand(0.6, 1.4));
      const total = weights.reduce((sum, w) => sum + w, 0);
      const free = lane.length - lane.used;
      const drift = rand(-0.04, 0.04); // rad/s a mais ou a menos que o globo, igual na faixa toda
      let pos = rand(0, lane.length);
      lane.items.forEach((item, k) => {
        words.push({
          chars: item.chars,
          lat: lane.lat,
          lon: (pos + item.width / 2) / r,
          drift,
          wobble: rand(0.02, 0.05), // amplitude da oscilação na latitude
          rate: rand(0.15, 0.4),
          phase: rand(0, Math.PI * 2),
        });
        pos += item.width + (free * weights[k]) / total;
      });
    }
  }

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

    const t = (now - start) / 1000;
    const pace = speed / 0.22; // com movimento reduzido, a deriva também desacelera
    for (const w of words) {
      const lat = Math.max(-MAX_LAT, Math.min(MAX_LAT, w.lat + w.wobble * Math.sin(w.rate * t * pace + w.phase)));
      const lon = w.lon + w.drift * t * pace;
      const r = Math.cos(lat);
      const py = Math.sin(lat) * R;
      for (const c of w.chars) {
        const l = lon - c.mid / (R * r); // arco percorrido no paralelo, da esquerda para a direita
        drawChar(c.el, l, project(Math.cos(l) * r * R, py, Math.sin(l) * r * R));
      }
    }
    requestAnimationFrame(frame);

    function drawChar(el, l, { x, y, d }) {
      // Direção de leitura no paralelo, projetada: dá a inclinação e o achatamento da letra
      const tx0 = Math.sin(l);
      const tz0 = -Math.cos(l);
      const tx = tx0 * ca + tz0 * sa;
      const ty = -(-tx0 * sa + tz0 * ca) * st;
      const len = Math.max(0.05, Math.hypot(tx, ty));
      const angle = Math.atan(ty / (tx || 1e-6));
      const flat = tx < 0 ? -len : len; // atrás do globo a letra aparece espelhada, como vista por dentro
      const scale = 0.6 + d * 0.6;
      el.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${angle.toFixed(3)}rad) scale(${(flat * scale).toFixed(3)}, ${scale.toFixed(3)})`;
      el.style.opacity = (0.12 + d * 0.88).toFixed(3);
      el.style.zIndex = Math.round(d * 100);
    }
  }
  // Mede as letras com a fonte já carregada; sem ela, as larguras sairiam da fonte reserva
  document.fonts.ready.then(() => {
    buildWords();
    requestAnimationFrame(frame);
  });

  // Seta, espaço ou clique: vai para o deck
  function goDeck() { location.href = 'index.html'; }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') goDeck();
  });
  document.addEventListener('click', goDeck);
})();

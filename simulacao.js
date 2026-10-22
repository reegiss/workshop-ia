// Simulação do laboratório: o uso das skills no exemplo dos slides, batida a batida.
// Uso: simulacao.html?etapa=1|2|3 (padrão 1). ?fim mostra a etapa já concluída.
// → / espaço / clique avança · ← volta · 1, 2, 3 vão para a etapa · Esc volta ao deck

(function () {
  const stage = document.querySelector('.sim');
  const term = document.getElementById('term');
  const skillEl = document.getElementById('sim-skill');
  const stageBtns = [...document.querySelectorAll('.sim-stage')];
  const evItems = [...document.querySelectorAll('.ev-list li')];

  function fit() {
    const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.transform = `scale(${s})`;
  }
  window.addEventListener('resize', fit);
  fit();

  // Roteiro. Cada batida é um bloco: you (seu pedido), agent (resposta, com arquivo opcional)
  // ou shell (comando que você roda). ev marca a evidência que a batida produz.
  const STAGE_SKILL = { 1: 'brainstorming', 2: 'writing-plans', 3: 'test-driven-development' };
  const SESSION = {
    2: '… mesma sessão · design aprovado e spec salva na etapa 1',
    3: '… mesma sessão · plano com 3 tarefas salvo na etapa 2',
  };
  const BEATS = [
    // Etapa 1 · Esclarecer
    { s: 1, who: 'you', text:
      'Use a skill /brainstorming para esta história. Faça no máximo 3 perguntas e não implemente nada ainda.\n' +
      'Recorte: uma função pura (sem UI, rede ou ViewModel) que ordena por nome e filtra por nome ou código; ' +
      'busca vazia devolve todas. Tipo e função em Sources/Domain; testes XCTest em Tests/DomainTests.\n' +
      'História: como cliente que quer trazer investimentos de outro banco, quero escolher o banco de origem numa lista.\n' +
      'Exemplo: {"code": "001", "institutionType": "1", "name": "Banco do Brasil", "cnpj": "00000000000191"}' },
    { s: 1, who: 'agent', skill: 'brainstorming', lines: [
      'Li o recorte e o exemplo. Vou fazer até 3 perguntas, uma por vez.',
      'Pergunta 1 de 3: a ordem por nome deve ignorar maiúsculas e acentos?',
      'Por exemplo, “Banco Ágil” vem antes de “Banco do Brasil”?',
    ] },
    { s: 1, who: 'you', text: 'Sim, ignora os dois.' },
    { s: 1, who: 'agent', lines: [
      'Pergunta 2 de 3: na busca por código, “00” encontra “001” só pelo começo,',
      'ou também “100”, que contém “00”?',
    ] },
    { s: 1, who: 'you', text: 'Só pelo começo do código.' },
    { s: 1, who: 'agent', lines: [
      'Pergunta 3 de 3: uma busca só com espaços conta como vazia e devolve todas?',
    ] },
    { s: 1, who: 'you', text: 'Conta como vazia.' },
    { s: 1, who: 'agent', lines: [
      'Design proposto: `filterAndSort(institutions, query:)`',
      '· ordena por nome, sem diferenciar maiúsculas nem acentos;',
      '· filtra: o nome contém o texto, ou o código começa com ele;',
      '· busca vazia ou só com espaços devolve todas, ordenadas;',
      '· sem dependências externas, sem tela e sem rede.',
      'Aprova?',
    ] },
    { s: 1, who: 'you', text: 'Aprovado.', ev: 'req' },
    { s: 1, who: 'agent', lines: [
      { t: '✓ Spec salva em docs/superpowers/specs/2026-10-21-lista-de-bancos-design.md', c: 'ok' },
      { t: '✓ Commit local feito. Nada implementado ainda.', c: 'ok' },
    ] },

    // Etapa 2 · Planejar
    { s: 2, who: 'you', text:
      'Use a skill /writing-plans para criar o plano a partir do design aprovado. No máximo 3 tarefas, ' +
      'cada uma começando por um teste. A Tarefa 1 deve ser: ordenar por nome.' },
    { s: 2, who: 'agent', skill: 'writing-plans', lines: [
      'Plano em 3 tarefas, cada uma começando por um teste:',
    ], file: { path: 'docs/superpowers/plans/2026-10-21-lista-de-bancos.md', code: [
      '### Tarefa 1 · Ordenar por nome',
      '- teste: três bancos fora de ordem → ordenados',
      '### Tarefa 2 · Filtrar por nome',
      '- teste: “brasil” → “Banco do Brasil”',
      '### Tarefa 3 · Código e busca vazia',
      '- teste: “00” → “001”; “” → todas',
    ] } },
    { s: 2, who: 'agent', ev: 'plan', lines: [
      'Revisei o plano contra a spec: cobre ordem, acentos, código e busca vazia.',
      'Nada de tela nem de rede.',
      { t: '✓ Plano salvo · commit local.', c: 'ok' },
      'Começo pela Tarefa 1?',
    ] },

    // Etapa 3 · Vermelho, depois verde
    { s: 3, who: 'you', text:
      'Execute somente a Tarefa 1 do plano usando a skill /test-driven-development. Escreva o teste primeiro ' +
      'e pare para eu rodá-lo e ver que falha. Depois implemente o mínimo para passar. ' +
      'Faça commit local e não faça push.' },
    { s: 3, who: 'agent', skill: 'test-driven-development', lines: [
      'Primeiro o teste, e só ele:',
    ], file: { path: 'Tests/DomainTests/FilterAndSortTests.swift', code: [
      'import XCTest',
      '@testable import Domain',
      '',
      'final class FilterAndSortTests: XCTestCase {',
      '    func testOrdenaPorNome() {',
      '        let itau = Institution(code: "341", name: "Itaú Unibanco")',
      '        let brasil = Institution(code: "001", name: "Banco do Brasil")',
      '        let agil = Institution(code: "121", name: "Banco Ágil")',
      '',
      '        let result = filterAndSort([itau, brasil, agil], query: "")',
      '',
      '        XCTAssertEqual(result.map(\\.name),',
      '                       ["Banco Ágil", "Banco do Brasil", "Itaú Unibanco"])',
      '    }',
      '}',
    ] }, after: [
      'Parei aqui. Rode `swift test`: ele deve falhar, porque `filterAndSort` ainda não existe.',
    ] },
    { s: 3, who: 'shell', cmd: 'swift test', ev: 'red', out: [
      { t: 'Building for debugging...', c: 'dim' },
      { t: "error: cannot find 'Institution' in scope", c: 'err' },
      { t: "error: cannot find 'filterAndSort' in scope", c: 'err' },
      { t: '✗ o teste não compila: vermelho', c: 'err' },
    ] },
    { s: 3, who: 'you', text: 'Falhou como esperado. Pode implementar o mínimo.' },
    { s: 3, who: 'agent', lines: [
      'O mínimo para a Tarefa 1, só a ordenação:',
    ], file: { path: 'Sources/Domain/InstitutionSearch.swift', code: [
      'import Foundation',
      '',
      'struct Institution: Equatable {',
      '    let code: String',
      '    let name: String',
      '}',
      '',
      'func filterAndSort(_ institutions: [Institution], query: String) -> [Institution] {',
      '    institutions.sorted {',
      '        $0.name.compare($1.name, options: [.caseInsensitive, .diacriticInsensitive])',
      '            == .orderedAscending',
      '    }',
      '}',
    ] }, after: [
      'O filtro fica para a Tarefa 2. Rode `swift test` de novo.',
    ] },
    { s: 3, who: 'shell', cmd: 'swift test', ev: 'green', out: [
      { t: "Test Case 'FilterAndSortTests.testOrdenaPorNome' passed (0.002 seconds)", c: 'dim' },
      { t: 'Executed 1 test, with 0 failures (0 unexpected) in 0.002 seconds', c: 'ok' },
    ] },
    { s: 3, who: 'you', text: 'Passou. Está pronto?' },
    { s: 3, who: 'agent', skill: 'verification-before-completion', ev: 'done', lines: [
      'Antes de dizer “pronto”, a evidência:',
      '· `swift test`: Executed 1 test, with 0 failures (a saída acima);',
      '· escopo: só a Tarefa 1; filtro e código seguem nas tarefas 2 e 3.',
      { t: '✓ Tarefa 1 pronta. Revise o diff e faça o commit local.', c: 'ok' },
    ] },
    { s: 3, who: 'shell', cmd: 'git diff --stat', out: [
      { t: ' Sources/Domain/InstitutionSearch.swift     | 13 +++++++++++++' },
      { t: ' Tests/DomainTests/FilterAndSortTests.swift | 15 +++++++++++++++' },
      { t: ' 2 files changed, 28 insertions(+)' },
    ] },
    { s: 3, who: 'shell', cmd: 'git add -A && git commit -m "feat: ordena instituições por nome"', out: [
      { t: '[workshop/seu-nome 3f2a1c9] feat: ordena instituições por nome' },
      { t: ' 2 files changed, 28 insertions(+)' },
      { t: '# commit só local: nada de push', c: 'dim' },
    ] },
  ];

  const first = (s) => BEATS.findIndex((b) => b.s === s);
  const last = (s) => BEATS.length - 1 - [...BEATS].reverse().findIndex((b) => b.s === s);

  // Texto com `código` entre crases, já escapado
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const rich = (t) => esc(t).replace(/`([^`]+)`/g, '<code>$1</code>');

  function build(beat) {
    const blk = document.createElement('div');
    blk.className = `blk-${beat.who}`;
    if (beat.who === 'you') {
      const p = document.createElement('p');
      p.className = 'typed';
      p.textContent = beat.text;
      blk.appendChild(p);
      return blk;
    }
    if (beat.who === 'shell') {
      const cmd = document.createElement('p');
      cmd.className = 'cmd typed';
      cmd.textContent = beat.cmd;
      blk.appendChild(cmd);
      beat.out.forEach((o, i) => {
        const p = document.createElement('p');
        p.className = `ln${o.c ? ` out-${o.c}` : ''}`;
        p.textContent = o.t;
        p.style.setProperty('--i', String(i));
        blk.appendChild(p);
      });
      return blk;
    }
    const box = document.createElement('div');
    let i = 0;
    const add = (item) => {
      const { t, c } = typeof item === 'string' ? { t: item, c: '' } : item;
      const p = document.createElement('p');
      p.className = `ln${c ? ` ln-${c}` : ''}`;
      p.innerHTML = rich(t);
      p.style.setProperty('--i', String(i++));
      box.appendChild(p);
    };
    if (beat.skill) add({ t: `Usando a skill ${beat.skill}`, c: 'skill' });
    (beat.lines || []).forEach(add);
    if (beat.file) {
      const f = document.createElement('div');
      f.className = 'file ln';
      f.style.setProperty('--i', String(i++));
      const path = document.createElement('div');
      path.className = 'file-path';
      path.textContent = beat.file.path;
      const pre = document.createElement('pre');
      pre.textContent = beat.file.code.join('\n');
      f.append(path, pre);
      box.appendChild(f);
    }
    (beat.after || []).forEach(add);
    blk.appendChild(box);
    return blk;
  }

  // Digitação do seu texto ou do comando; finish() completa na hora
  let anim = null;
  function type(el, onDone) {
    const full = el.textContent;
    const step = Math.max(1, Math.ceil(full.length / 50));
    let n = 0;
    el.textContent = '';
    const timer = setInterval(() => {
      n = Math.min(full.length, n + step);
      el.textContent = full.slice(0, n);
      if (n === full.length) finish();
    }, 20);
    function finish() {
      clearInterval(timer);
      el.textContent = full;
      anim = null;
      onDone?.();
    }
    anim = { finish };
  }

  let pos = 0;
  function render(animate) {
    anim?.finish();
    const s = BEATS[pos].s;
    term.textContent = '';
    if (SESSION[s]) {
      const p = document.createElement('p');
      p.className = 'blk-session';
      p.textContent = SESSION[s];
      term.appendChild(p);
    }
    let blk;
    for (let i = first(s); i <= pos; i++) {
      blk = build(BEATS[i]);
      term.appendChild(blk);
    }
    const cursor = document.createElement('p');
    cursor.className = 'term-cursor';
    cursor.textContent = '›';
    term.appendChild(cursor);

    if (animate) {
      const typed = blk.querySelector('.typed');
      if (typed) {
        blk.querySelectorAll('.ln').forEach((p) => { p.style.visibility = 'hidden'; });
        type(typed, () => {
          blk.querySelectorAll('.ln').forEach((p) => { p.style.visibility = ''; });
          blk.classList.add('is-new');
        });
      } else {
        blk.classList.add('is-new');
      }
    }

    stageBtns.forEach((b) => {
      const n = Number(b.dataset.stage);
      b.classList.toggle('is-current', n === s);
      b.classList.toggle('is-past', n < s);
    });
    let skill = STAGE_SKILL[s];
    for (let i = first(s); i <= pos; i++) if (BEATS[i].skill) skill = BEATS[i].skill;
    skillEl.textContent = skill;
    const reached = new Set(BEATS.slice(0, pos + 1).map((b) => b.ev).filter(Boolean));
    evItems.forEach((li) => li.classList.toggle('is-on', reached.has(li.dataset.ev)));
  }

  function go(n, animate) {
    pos = Math.min(Math.max(n, 0), BEATS.length - 1);
    render(animate);
  }

  function next() {
    if (anim) { anim.finish(); return; } // primeiro toque completa a digitação
    if (pos < BEATS.length - 1) go(pos + 1, true);
  }

  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (['ArrowRight', ' ', 'PageDown'].includes(e.key)) next();
    else if (['ArrowLeft', 'PageUp'].includes(e.key)) go(pos - 1, false);
    else if (['1', '2', '3'].includes(e.key)) go(first(Number(e.key)), true);
    else if (e.key === 'Escape') location.href = `index.html#${16 + BEATS[pos].s}`;
    else return;
    e.preventDefault();
  });
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.sim-stage');
    if (btn) go(first(Number(btn.dataset.stage)), true);
    else next();
  });

  const params = new URLSearchParams(location.search);
  const etapa = [1, 2, 3].includes(Number(params.get('etapa'))) ? Number(params.get('etapa')) : 1;
  document.fonts.ready.then(() => go(params.has('fim') ? last(etapa) : first(etapa), !params.has('fim')));
})();

/* =============================================
   POPUP FRANQUEABILIDADE — Franchising Factory
   ============================================= */

(function () {

  const STEPS = [
    // STEP 0 — dados do lead
    {
      type: 'lead',
      title: 'Descubra se seu negócio pode virar franquia',
      subtitle: 'Preencha os dados abaixo para iniciar o diagnóstico gratuito de franqueabilidade.',
      fields: [
        { id: 'nome',      label: 'Seu nome completo',       type: 'text',  placeholder: 'Ex: João Silva',            required: true },
        { id: 'empresa',   label: 'Nome da empresa/marca',   type: 'text',  placeholder: 'Ex: Studio Fit',            required: true },
        { id: 'whatsapp',  label: 'WhatsApp',                type: 'tel',   placeholder: '(11) 99999-9999',           required: true },
        { id: 'email',     label: 'E-mail',                  type: 'email', placeholder: 'voce@empresa.com',          required: true },
        { id: 'instagram', label: 'Instagram da marca',      type: 'text',  placeholder: '@suamarca',                 required: false },
        { id: 'site',      label: 'Site (se tiver)',         type: 'url',   placeholder: 'https://suamarca.com.br',   required: false },
        { id: 'segmento',  label: 'Segmento de atuação',     type: 'select',
          options: ['Selecione...','Estética & Beleza','Saúde & Bem-estar','Alimentação','Educação','Serviços','Varejo','Tecnologia','Fitness','Outro'],
          required: true },
      ]
    },

    // STEPS 1–10 — perguntas de franqueabilidade
    {
      type: 'quiz',
      num: 1,
      category: 'Maturidade do Negócio',
      question: 'Há quanto tempo seu negócio está em operação?',
      tip: 'Franquias sólidas geralmente têm pelo menos 2 anos de operação comprovada.',
      options: [
        { label: 'Menos de 1 ano',        score: 0 },
        { label: 'Entre 1 e 2 anos',      score: 5 },
        { label: 'Entre 2 e 5 anos',      score: 8 },
        { label: 'Mais de 5 anos',        score: 10 },
      ]
    },
    {
      type: 'quiz',
      num: 2,
      category: 'Padronização de Processos',
      question: 'Seus processos operacionais estão documentados e padronizados?',
      tip: 'Franquias dependem de manuais claros para que qualquer franqueado replique a operação.',
      options: [
        { label: 'Não temos nada documentado',                 score: 0 },
        { label: 'Temos anotações básicas',                    score: 3 },
        { label: 'Temos parte dos processos documentados',     score: 6 },
        { label: 'Temos manual completo de operações',         score: 10 },
      ]
    },
    {
      type: 'quiz',
      num: 3,
      category: 'Replicabilidade',
      question: 'Seu modelo de negócio poderia ser aberto em outra cidade sem sua presença diária?',
      tip: 'A replicabilidade é o coração do franchising — o modelo precisa funcionar sem o fundador.',
      options: [
        { label: 'Não, depende totalmente de mim',             score: 0 },
        { label: 'Parcialmente, ainda preciso acompanhar',     score: 4 },
        { label: 'Sim, com treinamento adequado',              score: 8 },
        { label: 'Sim, já tenho unidades funcionando sem mim', score: 10 },
      ]
    },
    {
      type: 'quiz',
      num: 4,
      category: 'Lucratividade',
      question: 'Qual a margem de lucro líquida da sua operação atual?',
      tip: 'Para viabilizar royalties e suporte da rede, a margem deve ser suficientemente alta.',
      options: [
        { label: 'Abaixo de 10%',          score: 2 },
        { label: 'Entre 10% e 20%',        score: 5 },
        { label: 'Entre 20% e 35%',        score: 8 },
        { label: 'Acima de 35%',           score: 10 },
      ]
    },
    {
      type: 'quiz',
      num: 5,
      category: 'Diferenciação Competitiva',
      question: 'O que diferencia seu negócio dos concorrentes?',
      tip: 'Franquias de sucesso têm um diferencial claro que justifica a escolha do consumidor.',
      options: [
        { label: 'Ainda não identificamos um diferencial claro',           score: 0 },
        { label: 'Temos algumas vantagens, mas não bem definidas',         score: 4 },
        { label: 'Temos diferenciais claros de produto ou atendimento',    score: 7 },
        { label: 'Somos referência no segmento com proposta única',        score: 10 },
      ]
    },
    {
      type: 'quiz',
      num: 6,
      category: 'Marca Registrada',
      question: 'Sua marca está registrada ou em processo de registro no INPI?',
      tip: 'O registro da marca é obrigatório para proteger a rede de franquias juridicamente.',
      options: [
        { label: 'Não, ainda não fizemos isso',                  score: 0 },
        { label: 'Estamos consultando sobre o processo',         score: 3 },
        { label: 'Registro em andamento no INPI',                score: 7 },
        { label: 'Marca já registrada no INPI',                  score: 10 },
      ]
    },
    {
      type: 'quiz',
      num: 7,
      category: 'Capacidade de Treinamento',
      question: 'Em quanto tempo você consegue treinar alguém para operar seu negócio?',
      tip: 'O tempo de onboarding afeta diretamente a velocidade de expansão da rede.',
      options: [
        { label: 'Mais de 6 meses',           score: 3 },
        { label: 'Entre 3 e 6 meses',         score: 6 },
        { label: 'Entre 1 e 3 meses',         score: 8 },
        { label: 'Menos de 1 mês',            score: 10 },
      ]
    },
    {
      type: 'quiz',
      num: 8,
      category: 'Validação de Mercado',
      question: 'Você já recebeu pedidos de pessoas querendo abrir uma unidade igual à sua?',
      tip: 'A demanda espontânea por franquias é um forte indicador de potencial de expansão.',
      options: [
        { label: 'Nunca recebi esse tipo de interesse',        score: 2 },
        { label: 'Algumas pessoas já perguntaram',             score: 5 },
        { label: 'Recebo pedidos com certa frequência',        score: 8 },
        { label: 'Tenho uma lista de interessados esperando',  score: 10 },
      ]
    },
    {
      type: 'quiz',
      num: 9,
      category: 'Saúde Financeira',
      question: 'Sua empresa tem capital de giro e demonstrativos financeiros organizados?',
      tip: 'A boa gestão financeira é essencial para sustentar a expansão e a rede de franqueados.',
      options: [
        { label: 'Não temos controle financeiro estruturado',           score: 0 },
        { label: 'Temos controle básico de entradas e saídas',          score: 4 },
        { label: 'Temos DRE e fluxo de caixa atualizados',              score: 7 },
        { label: 'Contabilidade completa com indicadores de gestão',    score: 10 },
      ]
    },
    {
      type: 'quiz',
      num: 10,
      category: 'Expansão Atual',
      question: 'Você já opera mais de uma unidade ou tem planos concretos de expansão?',
      tip: 'Ter mais de uma unidade funcionando é a prova mais sólida de replicabilidade.',
      options: [
        { label: 'Só tenho 1 unidade, sem planos definidos',           score: 2 },
        { label: 'Só tenho 1 unidade, mas quero expandir',             score: 5 },
        { label: 'Tenho 2 ou 3 unidades operando',                     score: 8 },
        { label: 'Já tenho mais de 3 unidades ou licenciados',         score: 10 },
      ]
    },

    // STEP 11 — resultado
    { type: 'result' }
  ];

  let currentStep = 0;
  let answers = {};
  let leadData = {};
  let totalScore = 0;

  function calcScore() {
    return Object.values(answers).reduce((sum, s) => sum + s, 0);
  }

  function getResult(score) {
    const max = 100;
    const pct = Math.round((score / max) * 100);
    if (pct >= 80) return {
      label: '🏆 Alta Franqueabilidade',
      color: '#2d8a4e',
      bg: '#e8f8ee',
      msg: `Parabéns, <strong>${leadData.nome ? leadData.nome.split(' ')[0] : 'empreendedor'}</strong>! Seu negócio tem alto potencial de franquia. Com a estruturação adequada, você está a poucos passos de construir uma rede de sucesso. <strong>Nossa equipe vai entrar em contato para apresentar o próximo passo.</strong>`,
      cta: 'Quero iniciar a formatação'
    };
    if (pct >= 60) return {
      label: '✅ Boa Franqueabilidade',
      color: '#1a6fa8',
      bg: '#e8f2fb',
      msg: `Ótimos indicadores, <strong>${leadData.nome ? leadData.nome.split(' ')[0] : 'empreendedor'}</strong>! Seu negócio tem potencial real, mas ainda há pontos a fortalecer antes da expansão. <strong>Vamos agendar uma consultoria para mapear o caminho.</strong>`,
      cta: 'Quero uma consultoria gratuita'
    };
    if (pct >= 40) return {
      label: '⚠️ Franqueabilidade em Desenvolvimento',
      color: '#b07a00',
      bg: '#fff8e0',
      msg: `Seu negócio tem base para crescer, <strong>${leadData.nome ? leadData.nome.split(' ')[0] : 'empreendedor'}</strong>! Mas precisamos trabalhar alguns pilares fundamentais antes de avançar para o franchising. <strong>Uma análise de franqueabilidade vai revelar exatamente o que priorizar.</strong>`,
      cta: 'Quero uma análise de franqueabilidade'
    };
    return {
      label: '🔧 Negócio em Estruturação',
      color: '#c0392b',
      bg: '#fdecea',
      msg: `<strong>${leadData.nome ? leadData.nome.split(' ')[0] : 'Empreendedor'}</strong>, ainda há trabalho a fazer, mas isso não é um problema — é uma oportunidade! O franchising começa com boas fundações. <strong>Nossa equipe pode te guiar desde o início para fazer certo desde o começo.</strong>`,
      cta: 'Quero entender por onde começar'
    };
  }

  /* ---- HTML ---- */
  function buildModal() {
    const el = document.createElement('div');
    el.id = 'ff-overlay';
    el.innerHTML = `
      <div id="ff-modal">
        <button id="ff-close" aria-label="Fechar">&times;</button>
        <div id="ff-inner"></div>
      </div>
    `;
    document.body.appendChild(el);
    document.getElementById('ff-close').onclick = closeModal;
    el.addEventListener('click', e => { if (e.target === el) closeModal(); });
    renderStep();
  }

  function renderStep() {
    const step = STEPS[currentStep];
    const inner = document.getElementById('ff-inner');
    if (!inner) return;

    if (step.type === 'lead') {
      inner.innerHTML = renderLead(step);
      inner.querySelector('#ff-lead-form').addEventListener('submit', submitLead);
    } else if (step.type === 'quiz') {
      inner.innerHTML = renderQuiz(step);
      inner.querySelectorAll('.ff-opt').forEach(btn => {
        btn.addEventListener('click', () => selectOption(btn));
      });
      if (currentStep > 1) {
        inner.querySelector('#ff-back').addEventListener('click', () => { currentStep--; renderStep(); });
      }
    } else {
      const finalScore = calcScore();
      saveLead({ ...leadData, score: finalScore, date: new Date().toLocaleDateString('pt-BR') });
      inner.innerHTML = renderResult();
      inner.querySelector('#ff-cta-btn').addEventListener('click', () => {
        window.open('https://calendly.com/rafaelestevez', '_blank');
      });
      inner.querySelector('#ff-restart').addEventListener('click', () => {
        currentStep = 0; answers = {}; leadData = {}; renderStep();
      });
    }
  }

  function renderProgress() {
    const quizSteps = 10;
    const done = Math.max(0, currentStep - 1);
    const pct = Math.round((done / quizSteps) * 100);
    return `
      <div class="ff-progress-wrap">
        <div class="ff-progress-bar" style="width:${pct}%"></div>
      </div>
      <p class="ff-progress-label">Pergunta ${done} de ${quizSteps}</p>
    `;
  }

  function renderLead(step) {
    return `
      <div class="ff-hero-badge">✦ Diagnóstico Gratuito</div>
      <h2 class="ff-title">${step.title}</h2>
      <p class="ff-sub">${step.subtitle}</p>
      <form id="ff-lead-form" autocomplete="on" novalidate>
        <div class="ff-fields">
          ${step.fields.map(f => {
            if (f.type === 'select') {
              return `<div class="ff-field ff-field-full">
                <label>${f.label}${f.required ? ' <span class="req">*</span>' : ''}</label>
                <select id="ff-${f.id}" name="${f.id}" ${f.required ? 'required' : ''}>
                  ${f.options.map(o => `<option>${o}</option>`).join('')}
                </select>
              </div>`;
            }
            return `<div class="ff-field ${f.id === 'empresa' || f.id === 'email' || f.id === 'segmento' ? 'ff-field-full' : ''}">
              <label for="ff-${f.id}">${f.label}${f.required ? ' <span class="req">*</span>' : ''}</label>
              <input type="${f.type}" id="ff-${f.id}" name="${f.id}" placeholder="${f.placeholder}" ${f.required ? 'required' : ''}>
            </div>`;
          }).join('')}
        </div>
        <button type="submit" class="ff-btn-primary">Iniciar Diagnóstico →</button>
        <p class="ff-privacy">🔒 Seus dados são confidenciais e nunca serão vendidos.</p>
      </form>
    `;
  }

  function renderQuiz(step) {
    const selected = answers[step.num];
    return `
      ${currentStep > 1 ? renderProgress() : ''}
      <div class="ff-category">${step.category}</div>
      <h2 class="ff-title">${step.question}</h2>
      <p class="ff-tip">💡 ${step.tip}</p>
      <div class="ff-options">
        ${step.options.map((opt, i) => `
          <button class="ff-opt${selected === opt.score && selected !== undefined ? ' selected' : ''}" data-score="${opt.score}" data-idx="${i}">
            <span class="ff-opt-letter">${String.fromCharCode(65 + i)}</span>
            ${opt.label}
          </button>
        `).join('')}
      </div>
      <div class="ff-nav">
        ${currentStep > 1 ? '<button id="ff-back" class="ff-btn-back">← Anterior</button>' : '<span></span>'}
        <button id="ff-next" class="ff-btn-primary" disabled>Próxima →</button>
      </div>
    `;
  }

  function renderResult() {
    const score = calcScore();
    const res = getResult(score);
    const pct = Math.round((score / 100) * 100);
    return `
      <div class="ff-result-header">
        <div class="ff-result-badge" style="background:${res.bg};color:${res.color}">${res.label}</div>
        <h2 class="ff-title">Resultado do Diagnóstico</h2>
        ${leadData.empresa ? `<p class="ff-sub">Empresa: <strong>${leadData.empresa}</strong></p>` : ''}
      </div>
      <div class="ff-score-ring-wrap">
        <svg viewBox="0 0 120 120" class="ff-score-ring">
          <circle cx="60" cy="60" r="52" fill="none" stroke="#f0f0f0" stroke-width="12"/>
          <circle cx="60" cy="60" r="52" fill="none" stroke="${res.color}" stroke-width="12"
            stroke-dasharray="${2 * Math.PI * 52}" stroke-dashoffset="${2 * Math.PI * 52 * (1 - pct / 100)}"
            stroke-linecap="round" transform="rotate(-90 60 60)" class="ff-ring-anim"/>
          <text x="60" y="56" text-anchor="middle" font-size="24" font-weight="700" fill="${res.color}">${pct}%</text>
          <text x="60" y="72" text-anchor="middle" font-size="10" fill="#888">Franqueável</text>
        </svg>
      </div>
      <p class="ff-result-msg">${res.msg}</p>
      <div class="ff-breakdown">
        ${STEPS.filter(s => s.type === 'quiz').map(s => {
          const sc = answers[s.num] ?? 0;
          const pctBar = Math.round((sc / 10) * 100);
          return `<div class="ff-breakdown-item">
            <span class="ff-breakdown-label">${s.category}</span>
            <div class="ff-breakdown-bar"><div style="width:${pctBar}%;background:${res.color}"></div></div>
            <span class="ff-breakdown-score">${sc}/10</span>
          </div>`;
        }).join('')}
      </div>
      <button id="ff-cta-btn" class="ff-btn-primary">${res.cta} →</button>
      <button id="ff-restart" class="ff-btn-ghost">Refazer o diagnóstico</button>
    `;
  }

  /* ---- Supabase config ---- */
  const SUPA_URL  = 'https://riutcbwillvqjrpaefkb.supabase.co';
  const SUPA_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpdXRjYndpbGx2cWpycGFlZmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NDk0MzksImV4cCI6MjA5MDMyNTQzOX0.WR69xD-_dvkG7dN2EkwerPw0Su8vcStNgnha8Ky0grA';

  async function saveLeadSupabase(data) {
    const tier = data.score >= 80 ? 'Alta' : data.score >= 60 ? 'Boa' : data.score >= 40 ? 'Média' : 'Baixa';
    try {
      await fetch(SUPA_URL + '/rest/v1/ff_leads', {
        method: 'POST',
        headers: {
          'apikey': SUPA_KEY,
          'Authorization': 'Bearer ' + SUPA_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          nome: data.nome || '',
          empresa: data.empresa || '',
          whatsapp: data.whatsapp || '',
          email: data.email || '',
          instagram: data.instagram || '',
          site: data.site || '',
          segmento: data.segmento || '',
          score: data.score || 0,
          franqueabilidade: tier,
          respostas: data.respostas || null,
          data_br: data.date || new Date().toLocaleDateString('pt-BR')
        })
      });
    } catch (e) { /* falha silenciosa — fallback localStorage abaixo */ }
  }

  function saveLead(data) {
    /* fallback local (garante que o painel antigo continue funcionando) */
    const leads = JSON.parse(localStorage.getItem('ff-leads') || '[]');
    leads.push(data);
    localStorage.setItem('ff-leads', JSON.stringify(leads));
    /* salva no Supabase (assíncrono, não bloqueia o fluxo) */
    saveLeadSupabase(data);
    emailLead(data);
    notifyNewLead(data);
  }

  /* ---- Envio por e-mail via Formspree ---- */
  function emailLead(data) {
    const score = data.score || 0;
    const tier  = score >= 80 ? 'Alta (≥80)' : score >= 60 ? 'Boa (≥60)' : score >= 40 ? 'Média (≥40)' : 'Baixa (<40)';
    fetch('https://formsubmit.co/ajax/rafaelestevez1975@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: '🏭 Novo Lead — Franchising Factory: ' + (data.nome || 'Lead'),
        _template: 'table',
        _captcha: 'false',
        Nome: data.nome || '—',
        Empresa: data.empresa || '—',
        WhatsApp: data.whatsapp || '—',
        Email: data.email || '—',
        Instagram: data.instagram || '—',
        Site: data.site || '—',
        Segmento: data.segmento || '—',
        Pontuacao: score + '/100',
        Franqueabilidade: tier,
        Data: data.date || new Date().toLocaleDateString('pt-BR'),
        _replyto: data.email || ''
      })
    }).catch(() => {});
  }

  /* ---- Notificação push via ntfy.sh (sem dados pessoais) ---- */
  function notifyNewLead(data) {
    const topic = localStorage.getItem('ff-ntfy-topic') || 'ff-leads-franchising-factory';
    const score = data.score || 0;
    const tier  = score >= 80 ? 'Alta' : score >= 60 ? 'Boa' : score >= 40 ? 'Media' : 'Baixa';
    fetch('https://ntfy.sh/' + topic, {
      method: 'POST',
      headers: {
        'Title': 'Novo Lead — Franchising Factory',
        'Priority': score >= 60 ? 'high' : 'default',
        'Tags': 'briefcase,chart_with_upwards_trend',
        'Content-Type': 'text/plain'
      },
      body: 'Novo lead recebido! Pontuacao: ' + score + '/100 (' + tier + '). Acesse o Painel Adm para ver os detalhes.'
    }).catch(() => {});

    /* Notificação local no browser (se permitido) */
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Novo Lead — Franchising Factory', {
        body: 'Novo lead recebido! Pontuação: ' + score + '/100. Acesse o Painel Adm.',
        icon: 'https://static.wixstatic.com/media/feb376_693663dfe7fe48c3ac3d533f74b20bb7~mv2.png'
      });
    }
  }

  function submitLead(e) {
    e.preventDefault();
    const form = e.target;
    let valid = true;
    form.querySelectorAll('[required]').forEach(f => {
      f.classList.remove('ff-invalid');
      if (!f.value || f.value === 'Selecione...') {
        f.classList.add('ff-invalid');
        valid = false;
      }
    });
    if (!valid) { form.querySelector('.ff-invalid').focus(); return; }
    ['nome','empresa','whatsapp','email','instagram','site','segmento'].forEach(id => {
      const el = document.getElementById('ff-' + id);
      if (el) leadData[id] = el.value;
    });
    currentStep = 1;
    renderStep();
  }

  function selectOption(btn) {
    const step = STEPS[currentStep];
    const score = parseInt(btn.dataset.score);
    answers[step.num] = score;
    document.querySelectorAll('.ff-opt').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const nextBtn = document.getElementById('ff-next');
    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.onclick = () => {
        currentStep++;
        if (currentStep >= STEPS.length) currentStep = STEPS.length - 1;
        renderStep();
      };
    }
  }

  function closeModal() {
    const ov = document.getElementById('ff-overlay');
    if (ov) { ov.classList.add('ff-hide'); setTimeout(() => ov.remove(), 300); }
    sessionStorage.setItem('ff-closed', '1');
  }

  function openModal() {
    if (document.getElementById('ff-overlay')) return;
    currentStep = 0; answers = {}; leadData = {};
    buildModal();
    requestAnimationFrame(() => document.getElementById('ff-overlay').classList.add('ff-visible'));
  }

  /* ---- Trigger: botão fixo + auto após 8s ---- */
  function addTriggerButton() {
    const btn = document.createElement('button');
    btn.id = 'ff-trigger';
    btn.innerHTML = '🔍 É sua empresa<br><strong>franqueável?</strong>';
    btn.addEventListener('click', openModal);
    document.body.appendChild(btn);
  }

  document.addEventListener('DOMContentLoaded', () => {
    addTriggerButton();
    if (!sessionStorage.getItem('ff-closed')) {
      setTimeout(openModal, 8000);
    }
  });

  window.ffOpenModal = openModal;

})();

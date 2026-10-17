/* =========================================================
   非遗文化交流平台 · 交互脚本
   ========================================================= */
(function () {
  'use strict';

  const $ = (sel, scope) => (scope || document).querySelector(sel);
  const $$ = (sel, scope) => Array.from((scope || document).querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = new Intl.NumberFormat('zh-CN');

  /* ---------------------------------------------------------
     1. 非遗项目数据（界面演示用示例数据）
     --------------------------------------------------------- */
  const PATTERN = {
    '传统美术': 'lines',
    '传统技艺': 'glaze',
    '传统音乐': 'rings',
    '传统戏剧': 'diamond',
    '民俗': 'dots'
  };

  const HERITAGE = [
    {
      id: 'su-xiu', name: '苏绣', cat: '传统美术', region: '江苏 · 苏州',
      level: '国家级', acc: '#8e2a22', images: 1260, videos: 84, models: 6,
      heir: '李秀英', years: 32, apprentices: 18, status: '活跃传承',
      desc: '以针代笔、以线晕色。双面绣正反异色，一根丝线可劈成 64 丝，针脚细密如画。',
      tags: ['双面绣', '针法图谱', '桑蚕丝', '非遗工坊']
    },
    {
      id: 'tang-sancai', name: '唐三彩烧制技艺', cat: '传统技艺', region: '河南 · 洛阳',
      level: '国家级', acc: '#a8874a', images: 980, videos: 62, models: 12,
      heir: '高建军', years: 28, apprentices: 9, status: '活跃传承',
      desc: '低温铅釉二次烧成，釉色在窑变中自然流淌，黄、绿、白交织成独特的开片纹理。',
      tags: ['釉色纹理', '窑变', '开片', '3D 器物']
    },
    {
      id: 'xuan-zhi', name: '宣纸制作技艺', cat: '传统技艺', region: '安徽 · 泾县',
      level: '世界级', acc: '#7d6a4f', images: 640, videos: 118, models: 3,
      heir: '汪明德', years: 41, apprentices: 26, status: '活跃传承',
      desc: '青檀皮与沙田稻草经 72 道工序，捞纸、晒纸全凭手感，纸寿千年而不腐。',
      tags: ['72 道工序', '捞纸', '人类非遗', '8K 影像']
    },
    {
      id: 'gu-qin', name: '古琴艺术', cat: '传统音乐', region: '北京',
      level: '世界级', acc: '#5a4636', images: 520, videos: 96, models: 4,
      heir: '陈知远', years: 36, apprentices: 14, status: '活跃传承',
      desc: '七弦十三徽，泛音如天、按音如地、散音如人。琴曲三千，打谱者代不乏人。',
      tags: ['人类非遗', '减字谱', '斫琴', '多视角教学']
    },
    {
      id: 'miao-yin', name: '苗族银饰锻造', cat: '传统技艺', region: '贵州 · 黔东南',
      level: '国家级', acc: '#5c6b73', images: 1120, videos: 57, models: 9,
      heir: '龙阿朵', years: 24, apprentices: 21, status: '活跃传承',
      desc: '錾刻、拉丝、编结，一件盛装银冠需银 4 公斤、经三十余道工序、耗时三个月。',
      tags: ['錾刻', '拉丝', '银冠', '苗年']
    },
    {
      id: 'jian-zhi', name: '蔚县剪纸', cat: '传统美术', region: '河北 · 张家口',
      level: '国家级', acc: '#b0432f', images: 2380, videos: 73, models: 2,
      heir: '王秀兰', years: 29, apprentices: 32, status: '活跃传承',
      desc: '全国唯一以「阴刻为主、重彩点染」的剪纸，刀工与染色并重，一张可叠刻六十层。',
      tags: ['阴刻', '点染', '窗花', 'AR 引导']
    },
    {
      id: 'jingtailan', name: '景泰蓝制作技艺', cat: '传统技艺', region: '北京',
      level: '国家级', acc: '#2f5d7c', images: 760, videos: 48, models: 5,
      heir: '张同禄', years: 45, apprentices: 11, status: '活跃传承',
      desc: '掐丝、点蓝、烧蓝、磨光、镀金，铜胎上的丝线如笔线，釉料在炉火中重现宝石光。',
      tags: ['掐丝', '点蓝', '缠枝莲', '大师课']
    },
    {
      id: 'pi-ying', name: '华县皮影戏', cat: '传统戏剧', region: '陕西 · 渭南',
      level: '世界级', acc: '#8a5a3b', images: 890, videos: 132, models: 7,
      heir: '吕崇德', years: 39, apprentices: 5, status: '濒危预警',
      desc: '一口叙说千古事，双手对舞百万兵。牛皮雕刻、碗碗腔伴唱，光影之间自有乾坤。',
      tags: ['人类非遗', '牛皮雕刻', '碗碗腔', '濒危项目']
    },
    {
      id: 'longjing', name: '龙井茶炒制技艺', cat: '传统技艺', region: '浙江 · 杭州',
      level: '国家级', acc: '#4a6b4f', images: 540, videos: 39, models: 1,
      heir: '戚国英', years: 31, apprentices: 17, status: '活跃传承',
      desc: '抖、搭、拓、甩、扣、抓、压、磨、推、扣，十大手法全凭掌心温度与力度。',
      tags: ['十大手法', '明前茶', '研学线路', '体验预约']
    },
    {
      id: 'jingdezhen', name: '景德镇手工制瓷', cat: '传统技艺', region: '江西 · 景德镇',
      level: '国家级', acc: '#3f6357', images: 1560, videos: 105, models: 14,
      heir: '曹文斌', years: 34, apprentices: 23, status: '活跃传承',
      desc: '拉坯、利坯、施釉、画青花、装匣入窑，七十二道工序，火候差一分，成色差十分。',
      tags: ['拉坯', '青花', '柴窑', '陶艺体验']
    },
    {
      id: 'kun-qu', name: '昆曲', cat: '传统戏剧', region: '江苏 · 昆山',
      level: '世界级', acc: '#6b4a6e', images: 430, videos: 88, models: 0,
      heir: '沈丽华', years: 27, apprentices: 12, status: '活跃传承',
      desc: '水磨调一唱三叹，身段、唱腔、念白三者合一，被称为「百戏之祖」。',
      tags: ['人类非遗', '水磨腔', '身段', '数字孪生']
    },
    {
      id: 'la-ran', name: '苗族蜡染', cat: '传统技艺', region: '贵州 · 丹寨',
      level: '国家级', acc: '#34526b', images: 1010, videos: 66, models: 3,
      heir: '杨阿妹', years: 22, apprentices: 40, status: '活跃传承',
      desc: '蜂蜡为笔、靛蓝为墨，冰纹在染缸里自然生成，每一匹布都是孤品。',
      tags: ['蜂蜡', '冰纹', '助农计划', '公众募集']
    }
  ];

  const WARNINGS = [
    { name: '冀南皮影戏', meta: '河北 · 传统戏剧', count: 2, tag: '预警中', cls: 'red' },
    { name: '黔东南苗族古歌', meta: '贵州 · 民俗', count: 3, tag: '关注', cls: 'gold' },
    { name: '徽州木雕', meta: '安徽 · 传统美术', count: 6, tag: '正常', cls: 'ok' },
    { name: '敦煌曲子戏', meta: '甘肃 · 传统戏剧', count: 4, tag: '正常', cls: 'ok' }
  ];

  /* ---------------------------------------------------------
     2. 页头 / 导航 / 滚动
     --------------------------------------------------------- */
  const header = $('#siteHeader');
  const toTop = $('#toTop');
  const nav = $('#nav');
  const navToggle = $('#navToggle');

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 16);
    toTop.classList.toggle('is-show', y > 720);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // 当前区块高亮
  const navLinks = $$('.nav a');
  const sectionIds = navLinks.map((a) => a.getAttribute('href').slice(1));
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((a) => a.classList.toggle('is-current', a.getAttribute('href') === '#' + id));
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* ---------------------------------------------------------
     3. 滚动浮现 & 数字增长
     --------------------------------------------------------- */
  const revealEls = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  const counters = $$('.num[data-target]');
  const animateCount = (el) => {
    const target = Number(el.dataset.target) || 0;
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) {
      el.textContent = fmt.format(target) + suffix;
      return;
    }
    const duration = 1500;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt.format(Math.round(target * ease)) + (t === 1 ? suffix : '');
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => countObserver.observe(el));
  } else {
    counters.forEach(animateCount);
  }

  /* ---------------------------------------------------------
     4. 提示条
     --------------------------------------------------------- */
  const toastEl = $('#toast');
  let toastTimer = 0;

  function toast(message) {
    if (!message) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toastEl.classList.remove('is-show'), 2800);
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-toast]');
    if (btn) toast(btn.dataset.toast);
  });

  /* ---------------------------------------------------------
     5. 资源检索
     --------------------------------------------------------- */
  const grid = $('#heritageGrid');
  const emptyState = $('#emptyState');
  const resultCount = $('#resultCount');
  const searchInput = $('#heritageSearch');
  const searchClear = $('#searchClear');
  const searchBtn = $('#searchBtn');
  const modeHint = $('#modeHint');
  const dropzone = $('#dropzone');
  const filtersEl = $('#filters');
  const searchRow = $('.search-row');

  const state = { mode: 'cat', cat: 'all', level: 'all', query: '', pinned: null };

  const MODE_TEXT = {
    cat: {
      hint: '按非遗类别、地域与级别精准筛选，逐级定位项目与传承人。',
      placeholder: '例如：刺绣、唐三彩、贵州……'
    },
    semantic: {
      hint: '用自然语言描述需求，例如「想找一门在家就能学的手艺」「适合送给长辈的礼物」，系统解析意图后匹配资源。',
      placeholder: '例如：有没有适合零基础学的刺绣？'
    },
    image: {
      hint: '上传图片后，系统通过图像识别比对数据库，快速定位同款或同类非遗项目及传承人。'
    }
  };

  function cardTemplate(item) {
    const pattern = PATTERN[item.cat] || 'lines';
    const levelText = item.level === '世界级' ? '人类非遗' : '国家级';
    return `
      <article class="card" role="button" tabindex="0" data-id="${item.id}" aria-label="查看 ${item.name} 数字档案">
        <div class="card__art" data-pattern="${pattern}" style="--acc:${item.acc}">
          <span class="card__badge">${levelText}</span>
          <span class="card__art-name">${item.name}</span>
        </div>
        <div class="card__body">
          <div class="card__top">
            <h4>${item.name}</h4>
            <span class="card__level">${item.level}</span>
          </div>
          <p class="card__meta">${item.region} · ${item.cat}</p>
          <p class="card__desc">${item.desc}</p>
          <div class="card__stats">
            <span>4K 图像 ${fmt.format(item.images)}</span>
            <span>8K 影像 ${item.videos}</span>
            <span>3D ${item.models}</span>
          </div>
          <div class="card__foot">
            <span>传承人 ${item.heir}</span>
            <span class="card__more">查看档案 →</span>
          </div>
        </div>
      </article>`;
  }

  function matches(item) {
    if (state.pinned) return item.id === state.pinned;
    if (state.cat !== 'all' && item.cat !== state.cat) return false;
    if (state.level !== 'all' && item.level !== state.level) return false;
    const q = state.query.trim().toLowerCase();
    if (!q) return true;
    const haystack = [item.name, item.cat, item.region, item.heir, item.desc, item.tags.join(' ')]
      .join(' ').toLowerCase();
    const parts = q.split(/\s+/).filter(Boolean);
    return parts.every((part) => haystack.includes(part));
  }

  function render() {
    const list = HERITAGE.filter(matches);
    grid.innerHTML = list.map(cardTemplate).join('');
    resultCount.textContent = String(list.length);
    const isEmpty = list.length === 0;
    emptyState.hidden = !isEmpty;
    grid.hidden = isEmpty;

    if (state.pinned) {
      const item = HERITAGE.find((h) => h.id === state.pinned);
      if (item) {
        const card = grid.querySelector(`[data-id="${item.id}"]`);
        if (card) card.classList.add('is-hit');
      }
    }
    searchClear.hidden = !searchInput.value;
  }

  render();

  // 检索方式切换
  $$('.mode-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      state.mode = tab.dataset.mode;
      $$('.mode-tab').forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      modeHint.textContent = MODE_TEXT[state.mode].hint;

      const imageMode = state.mode === 'image';
      searchRow.style.display = imageMode ? 'none' : '';
      filtersEl.style.display = imageMode ? 'none' : '';
      dropzone.hidden = !imageMode;

      if (state.mode === 'cat' || state.mode === 'semantic') {
        searchInput.placeholder = MODE_TEXT[state.mode].placeholder;
      }
      state.pinned = null;
      render();
    });
  });

  // 关键词
  searchInput.addEventListener('input', () => {
    state.query = searchInput.value;
    state.pinned = null;
    render();
  });
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      state.query = searchInput.value;
      state.pinned = null;
      render();
      toast(`检索「${searchInput.value || '全部'}」，匹配 ${resultCount.textContent} 个项目`);
    }
  });
  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    state.query = '';
    state.pinned = null;
    render();
    searchInput.focus();
  });
  searchBtn.addEventListener('click', () => {
    state.query = searchInput.value;
    state.pinned = null;
    render();
    if (!state.query.trim()) {
      toast('已展示全部非遗项目，可按类别与级别继续筛选');
    } else {
      toast(`语义解析完成：匹配 ${resultCount.textContent} 个相关项目`);
    }
  });

  // 类别 / 级别
  $$('.chip-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.cat !== undefined ? 'cat' : 'level';
      const value = type === 'cat' ? btn.dataset.cat : btn.dataset.level;
      state[type] = value;
      state.pinned = null;
      $$(`.chip-btn[data-${type}]`).forEach((b) => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      render();
    });
  });

  // 图像检索示例
  $$('#dropSamples button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = HERITAGE.find((h) => h.id === btn.dataset.sample);
      if (!item) return;
      state.pinned = item.id;
      state.query = '';
      searchInput.value = '';
      modeHint.textContent = `识别完成：图片特征匹配「${item.name}」（置信度 ${(93 + Math.random() * 5).toFixed(1)}%）`;
      render();
      toast(`已定位 1 个高度相似项目：${item.name}`);
    });
  });

  // 重置
  const resetAll = () => {
    state.cat = 'all';
    state.level = 'all';
    state.query = '';
    state.pinned = null;
    searchInput.value = '';
    $$('.chip-btn').forEach((b) => {
      const isAll = b.dataset.cat === 'all' || b.dataset.level === 'all';
      b.classList.toggle('is-active', isAll);
      b.setAttribute('aria-pressed', String(isAll));
    });
    if (state.mode === 'image') {
      modeHint.textContent = MODE_TEXT.image.hint;
    } else {
      modeHint.textContent = MODE_TEXT[state.mode].hint;
    }
    render();
  };
  $('#resetFilters').addEventListener('click', resetAll);
  $('#emptyReset').addEventListener('click', resetAll);

  /* ---------------------------------------------------------
     6. 项目详情弹窗
     --------------------------------------------------------- */
  const modal = $('#modal');
  const modalTitle = $('#modalTitle');
  const modalKicker = $('#modalKicker');
  const modalDesc = $('#modalDesc');
  const modalFacts = $('#modalFacts');
  const modalTags = $('#modalTags');
  let lastFocused = null;

  function openModal(item) {
    lastFocused = document.activeElement;
    modalKicker.textContent = `${item.cat} · ${item.level} · 数字档案`;
    modalTitle.textContent = item.name;
    modalDesc.textContent = item.desc;

    const facts = [
      ['项目编号', `ICH-${item.id.toUpperCase().replace(/-/g, '')}`],
      ['所在地', item.region],
      ['代表性传承人', `${item.heir}（${item.years} 年）`],
      ['在册学徒', `${item.apprentices} 人`],
      ['数字资源', `${fmt.format(item.images)} 张图像 / ${item.videos} 段影像`],
      ['存续状态', item.status]
    ];
    modalFacts.innerHTML = facts
      .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`)
      .join('');
    modalTags.innerHTML = item.tags.map((t) => `<span>${t}</span>`).join('');

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal__close').focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const item = HERITAGE.find((h) => h.id === card.dataset.id);
    if (item) openModal(item);
  });
  grid.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.card');
    if (!card) return;
    e.preventDefault();
    const item = HERITAGE.find((h) => h.id === card.dataset.id);
    if (item) openModal(item);
  });

  modal.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) closeModal();
  });
  $('#modalPlay').addEventListener('click', () => {
    toast('正在加载 8K 超高清技艺影像，请稍候（演示）');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!modal.hidden) closeModal();
      if (nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
    // 简易焦点约束
    if (e.key === 'Tab' && !modal.hidden) {
      const focusables = $$('button, [href], input, select', modal).filter((el) => !el.disabled);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ---------------------------------------------------------
     7. 濒危预警列表
     --------------------------------------------------------- */
  const warnList = $('#warnList');
  if (warnList) {
    warnList.innerHTML = WARNINGS.map((w) => `
      <li class="warn__item">
        <span class="warn__name">${w.name}<small>${w.meta}</small></span>
        <span class="warn__count"><b>${w.count}</b> 人</span>
        <span class="warn__tag warn__tag--${w.cls}">${w.tag}</span>
      </li>`).join('');
  }

  /* ---------------------------------------------------------
     8. 数字指纹生成
     --------------------------------------------------------- */
  const fpBtn = $('#fpBtn');
  const fpOut = $('#fpOut');
  const fpMeta = $('#fpMeta');
  let fpRunning = false;

  const randomHash = () => {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 64; i += 1) hash += chars[Math.floor(Math.random() * chars.length)];
    return hash;
  };

  fpBtn.addEventListener('click', () => {
    if (fpRunning) return;
    fpRunning = true;
    fpBtn.disabled = true;
    fpBtn.textContent = '正在上链存证…';
    fpMeta.hidden = true;

    const hash = randomHash();
    const label = 'SHA-256';
    const blockHeight = fmt.format(2481600 + Math.floor(Math.random() * 900));

    fpOut.innerHTML = '<span class="fp-line">指纹类型 ' + label + '</span><br><span class="fp-hash"></span>';
    const hashEl = $('.fp-hash', fpOut);

    const finish = () => {
      fpOut.innerHTML =
        `<span class="fp-line">指纹类型 ${label} · 区块高度 ${blockHeight}</span><br>` +
        `<span class="fp-hash">${hash}</span>`;
      fpMeta.hidden = false;
      fpBtn.disabled = false;
      fpBtn.textContent = '重新生成数字指纹';
      fpRunning = false;
      toast('数字指纹已写入联盟链，信息不可篡改');
    };

    if (reduceMotion) {
      finish();
      return;
    }

    let i = 0;
    const timer = window.setInterval(() => {
      i += 4;
      hashEl.textContent = hash.slice(0, i);
      if (i >= hash.length) {
        window.clearInterval(timer);
        finish();
      }
    }, 22);
  });

  /* ---------------------------------------------------------
     9. 交易模式切换
     --------------------------------------------------------- */
  $$('.trade-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      $$('.trade-tab').forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      $$('.trade-panel').forEach((panel) => {
        panel.classList.toggle('is-active', panel.dataset.panel === tab.dataset.trade);
      });
    });
  });

  /* ---------------------------------------------------------
     10. 公众募集进度
     --------------------------------------------------------- */
  const fundProgress = $('#fundProgress');
  const fundJoin = $('#fundJoin');
  let joined = false;

  if (fundJoin && fundProgress) {
    fundJoin.addEventListener('click', () => {
      if (joined) return;
      joined = true;
      const pct = 72;
      fundProgress.style.setProperty('--p', pct + '%');
      const fill = $('.progress__fill', fundProgress);
      fill.style.animation = 'none';
      fill.style.width = pct + '%';
      $('.progress__meta b', fundProgress).textContent = '720';
      $('.progress__pct', fundProgress).textContent = pct + '%';
      fundJoin.textContent = '已参与 · 查看订单';
      fundJoin.classList.remove('btn--primary');
      fundJoin.classList.add('btn--ghost');
      toast('已锁定 1 条蜡染围巾，募集结束后由工坊统一生产（演示）');
    });
  }

  /* ---------------------------------------------------------
     11. 线下预约
     --------------------------------------------------------- */
  const bookForm = $('#bookForm');
  const bookMsg = $('#bookMsg');
  const bookDate = $('#bookDate');

  // 本地时区的今天（避免 toISOString 的 UTC 偏移误差）
  const localToday = () => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  if (bookDate) {
    bookDate.min = localToday();
  }

  if (bookForm) {
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const project = $('#bookProject');
      const people = $('#bookPeople');
      const phone = $('#bookPhone');
      const fields = [project, bookDate, people, phone];
      fields.forEach((f) => f.classList.remove('is-invalid'));

      let error = '';
      if (!project.value) {
        error = '请选择想体验的非遗项目。';
        project.classList.add('is-invalid');
      } else if (!bookDate.value) {
        error = '请选择体验日期。';
        bookDate.classList.add('is-invalid');
      } else if (bookDate.value < localToday()) {
        error = '体验日期不能早于今天，请重新选择。';
        bookDate.classList.add('is-invalid');
      } else if (!/^1[3-9]\d{9}$/.test(phone.value.trim().replace(/[\s-]/g, ''))) {
        error = '请填写 11 位手机号，用于接收预约确认与签到码。';
        phone.classList.add('is-invalid');
      }

      if (error) {
        bookMsg.textContent = error;
        bookMsg.classList.add('is-error');
        return;
      }

      bookMsg.classList.remove('is-error');
      bookMsg.textContent =
        `预约成功：${project.value} · ${bookDate.value} · ${people.value}。` +
        '确认短信与签到码将发送至您的手机，请留意。';
      toast('预约已提交，系统正在匹配可用工坊与传承人时间');
      bookForm.reset();
      bookDate.min = localToday();
    });
  }

  /* ---------------------------------------------------------
     12. 社区话题点击
     --------------------------------------------------------- */
  $$('#topicChips li').forEach((chip) => {
    chip.addEventListener('click', () => {
      toast(`已进入「${chip.textContent}」社群，本周新增 36 条讨论（演示）`);
    });
  });

  /* ---------------------------------------------------------
     13. 细节：外链锚点平滑滚动（兼容旧浏览器）
     --------------------------------------------------------- */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
      try {
        history.replaceState(null, '', id);
      } catch (err) {
        /* file:// 等环境可能拒绝修改历史记录，忽略即可 */
      }
    });
  });
})();

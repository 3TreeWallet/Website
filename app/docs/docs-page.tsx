'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLang, type Lang } from '../i18n';
import { SIDEBAR, SECTIONS, GLOSSARY, type Block, type DocSection } from './docs-content';
import './docs.css';

/* ── 工具函数 ─────────────────────────────────────────────── */
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function copyAddr(addr: string, onDone: () => void) {
  navigator.clipboard.writeText(addr).then(onDone, () => { /* fallback */ });
}

/* ── 内容块渲染 ───────────────────────────────────────────── */
function RenderBlock({ block, t, onCopy }: { block: Block; t: (s: string) => string; onCopy: () => void }) {
  switch (block.type) {
    case 'p':
      return <p className="docs-p" dangerouslySetInnerHTML={{ __html: t(block.text) }} />;
    case 'h3':
      return <h3 className="docs-h3">{t(block.text)}</h3>;
    case 'h4':
      return <h4 className="docs-h4">{t(block.text)}</h4>;
    case 'ul':
      return (
        <ul className="docs-ul">
          {block.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: t(item) }} />
          ))}
        </ul>
      );
    case 'tip':
      return <div className="docs-tip" dangerouslySetInnerHTML={{ __html: t(block.text) }} />;
    case 'warn':
      return <div className="docs-warn" dangerouslySetInnerHTML={{ __html: t(block.text) }} />;
    case 'steps':
      return (
        <ol className="docs-steps">
          {block.items.map((s, i) => (
            <li key={i}>
              <strong>{t(s.title)}</strong>
              <span>{t(s.desc)}</span>
            </li>
          ))}
        </ol>
      );
    case 'table':
      return (
        <div style={{ overflowX: 'auto' }}>
          <table className="docs-table">
            <thead>
              <tr>{block.headers.map((h, i) => <th key={i}>{t(h)}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} className={ci === row.length - 1 ? 'mono' : ''}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'contracts':
      return (
        <div>
          {block.items.map((c, i) => (
            <div className="docs-contract-card" key={i}>
              <span className="docs-contract-chain">{c.chain}</span>
              <span className="docs-contract-addr">{c.addr}</span>
              <button className="docs-copy-btn" type="button" aria-label="Copy address" onClick={() => copyAddr(c.addr, onCopy)} title="Copy">
                <svg viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </button>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

/* ── 术语表渲染 ───────────────────────────────────────────── */
function GlossaryGrid({ t }: { t: (s: string) => string }) {
  return (
    <div className="docs-glossary-grid">
      {GLOSSARY.map((term) => (
        <div className="docs-term" key={term.name}>
          <div className="docs-term-name">
            {t(term.name)}
            <span className="tag">{t(term.tag)}</span>
          </div>
          <div className="docs-term-def">{t(term.def)}</div>
        </div>
      ))}
    </div>
  );
}

/* ── 语言切换 ─────────────────────────────────────────────── */
function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <span className="lang" role="group" aria-label="Language">
      {(['zh', 'en'] as const).map((l) => (
        <button key={l} type="button" className={lang === l ? 'on' : ''} aria-pressed={lang === l}
          onClick={() => setLang(l)}>
          {l === 'zh' ? '中' : 'EN'}
        </button>
      ))}
    </span>
  );
}

/* ── 主组件 ───────────────────────────────────────────────── */
export default function DocsPage() {
  const { lang, setLang, t } = useLang();
  const [activeId, setActiveId] = useState<string>(SECTIONS[0]?.id ?? '');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [toastText, setToastText] = useState('');
  const [toastShow, setToastShow] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* 搜索过滤：匹配标题或内容文本 */
  const filterMatch = useCallback((section: DocSection, keyword: string): boolean => {
    if (!keyword) return true;
    const kw = keyword.toLowerCase();
    if (section.title.toLowerCase().includes(kw)) return true;
    if (section.desc.toLowerCase().includes(kw)) return true;
    for (const block of section.blocks) {
      if (block.type === 'p' && block.text.toLowerCase().includes(kw)) return true;
      if (block.type === 'h3' && block.text.toLowerCase().includes(kw)) return true;
      if (block.type === 'ul' && block.items.some((i) => i.toLowerCase().includes(kw))) return true;
      if (block.type === 'tip' && block.text.toLowerCase().includes(kw)) return true;
      if (block.type === 'warn' && block.text.toLowerCase().includes(kw)) return true;
      if (block.type === 'steps' && block.items.some((s) => s.title.toLowerCase().includes(kw) || s.desc.toLowerCase().includes(kw))) return true;
    }
    return false;
  }, []);

  const visibleSections = search.trim()
    ? SECTIONS.filter((s) => filterMatch(s, search.trim()))
    : SECTIONS;

  /* 滚动监听：IntersectionObserver 追踪当前可见 section */
  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* 侧边栏点击：关闭移动端菜单 */
  const handleNav = useCallback((id: string) => {
    scrollTo(id);
    setSidebarOpen(false);
  }, []);

  /* 移动端：点击遮罩关闭侧边栏 */
  const closeSidebar = () => setSidebarOpen(false);

  /* toast 清理 */
  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  /* 复制后显示 toast */
  const showToast = useCallback((text: string) => {
    setToastText(text);
    setToastShow(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastShow(false), 1800);
  }, []);

  /* 合约地址复制按钮的反馈：toast 文案走词典 */
  const onCopy = useCallback(() => showToast(t('已复制到剪贴板')), [showToast, t]);

  return (
    <>
      {/* ── 顶部导航 ── */}
      <header className="docs-nav">
        <div className="wrap docs-nav-in">
          <Link className="brand" href="/" aria-label="3Tree Home">
            <span className="logo-box">
              <img className="logo-img" src="/logo.png?v=2" alt="3Tree" />
            </span>
            <span className="docs-nav-title">3Tree</span>
          </Link>
          <span className="docs-nav-sep" />
          <span className="docs-nav-sub">{t('帮助中心')}</span>
          <div className="docs-nav-right">
            <LangSwitch lang={lang} setLang={setLang} />
            <Link className="docs-home-btn" href="https://3tree.xyz">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M3 12l9-8 9 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t('官网首页')}
            </Link>
            <a className="docs-home-btn" href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t('联系我们')}
            </a>
            <button className="docs-toc-btn" type="button" aria-label="Toggle menu"
              onClick={() => setSidebarOpen((v) => !v)}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h10M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── 主体 ── */}
      <div className="docs-body">
        {/* 遮罩 */}
        <button type="button" aria-label="Close menu" className={`docs-overlay${sidebarOpen ? ' open' : ''}`} onClick={closeSidebar} />

        {/* 侧边栏 */}
        <aside className={`docs-sidebar${sidebarOpen ? ' open' : ''}`} ref={sidebarRef}>
          {/* 搜索 */}
          <div className="docs-search">
            <input className="docs-search-input" type="text" placeholder={t('搜索文档…')}
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          {/* 目录 */}
          {SIDEBAR.map((group) => (
            <div className="docs-sidebar-group" key={group.heading}>
              <div className="docs-sidebar-heading">{t(group.heading)}</div>
              {group.items
                .filter((item) => !search.trim() || visibleSections.some((s) => s.id === item.id))
                .map((item) => (
                  <a key={item.id} href={`#${item.id}`} className={`docs-sidebar-link${activeId === item.id ? ' active' : ''}`}
                    onClick={(e) => { e.preventDefault(); handleNav(item.id); }}>
                    {t(item.title)}
                  </a>
                ))}
            </div>
          ))}
        </aside>

        {/* 内容区 */}
        <div className="docs-content" ref={contentRef}>
          {visibleSections.length === 0 && search.trim() ? (
            <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text-3)' }}>
              <p style={{ fontSize: 16 }}>{t('未找到匹配的文档内容')}</p>
              <p style={{ fontSize: 14, marginTop: 8 }}>{t('请尝试其他关键词')}</p>
            </div>
          ) : (
            visibleSections.map((section) => (
              <section className="docs-section" key={section.id} id={section.id}>
                <h2 className="docs-section-title">{t(section.title)}</h2>
                <p className="docs-section-desc">{t(section.desc)}</p>
                {section.blocks.map((block, i) => (
                  <RenderBlock key={i} block={block} t={t} onCopy={onCopy} />
                ))}
                {/* 术语表 section 特殊渲染 */}
                {section.id === 'glossary' && <GlossaryGrid t={t} />}
              </section>
            ))
          )}
        </div>
      </div>

      {/* ── 联系我们 ── */}
      <section className="docs-contact" id="contact">
        <div className="wrap">
          <h2 className="docs-contact-title">{t('联系我们')}</h2>
          <p className="docs-contact-desc">{t('如有问题或建议，欢迎通过以下渠道联系我们')}</p>
          <div className="docs-contact-links">
            <a href="https://t.me/threetreewallet" target="_blank" rel="noopener noreferrer" className="docs-contact-item">
              <span className="docs-contact-label">Telegram</span>
              <span className="docs-contact-value">@threetreewallet</span>
            </a>
            <a href="https://x.com/3treewallet" target="_blank" rel="noopener noreferrer" className="docs-contact-item">
              <span className="docs-contact-label">X (Twitter)</span>
              <span className="docs-contact-value">@3treewallet</span>
            </a>
            <a href="mailto:su@3tree.xyz" className="docs-contact-item">
              <span className="docs-contact-label">{t('邮箱')}</span>
              <span className="docs-contact-value">su@3tree.xyz</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 页脚 ── */}
      <footer className="docs-footer">
        <div className="wrap docs-footer-in">
          <span>{t('© 2026 3Tree · 本站不托管资产、不索取助记词、不提供投资建议。')}</span>
          <span>
            <a href="https://x.com/3treewallet" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>X @3treewallet</a>
            {' · '}
            <a href="mailto:su@3tree.xyz" style={{ color: 'var(--blue)' }}>su@3tree.xyz</a>
          </span>
        </div>
      </footer>

      {/* ── Toast ── */}
      <div className={`toast${toastShow ? ' show' : ''}`} role="status">{toastText}</div>
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useLang } from '../app/i18n';

const COOKIE_KEY = '3tree_cookie_consent';

const TEXT = {
  zh: {
    title: '3Tree Cookies',
    body: '我们的网站和在线服务使用 Cookie 及其他追踪技术来提升网站性能、进行分析、协助营销工作，以及投放定向广告并衡量其效果。点击"接受 Cookie"即表示您同意使用所有这些 Cookie 和技术。如需管理设置，请点击"Cookie 设置"。更多信息请参阅我们的 Cookie 政策。您可以通过点击网站页脚的"您的隐私选择"来更改偏好设置。',
    accept: '接受 Cookie',
    settings: 'Cookie 设置',
    policy: 'Cookie 政策',
  },
  en: {
    title: '3Tree Cookies',
    body: 'Our site and online services use cookies and other tracking technologies to enhance the performance of our site, conduct analytics, assist in our marketing efforts, and serve targeted advertisements and measure their effectiveness. By clicking "Accept Cookies", you agree to the use of all of these cookies and technologies. To manage your settings for these cookies and technologies, click "Cookie Settings." Please review our Cookie Policy for more information about our use of cookies and other tracking technologies. You can change your preferences by clicking "Your Privacy Choices" from the footer of our website.',
    accept: 'Accept Cookies',
    settings: 'Cookie Settings',
    policy: 'Cookie Policy',
  },
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  /* 文案语言跟随全站切换器（app/i18n.ts 的 useLang）：访客切成中文，
     弹窗立刻跟着变中文，多标签页也靠 store 的 storage 事件同步。
     刻意不读 navigator.language：全站默认英文是产品决定，若按浏览器语言
     选文案，中文环境的访客首帧会是「站内英文 + 弹窗中文」的错位。 */
  const { lang } = useLang();

  useEffect(() => {
    // 已同意过则不显示
    if (localStorage.getItem(COOKIE_KEY) === 'accepted') return;

    // 延迟显示，避免与页面加载动画冲突
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  };

  const t = TEXT[lang];

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: '16px 16px calc(16px + env(safe-area-inset-bottom))',
        background: 'rgba(14, 28, 46, 0.97)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        animation: 'cookieSlideUp 0.35s ease-out',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: 18, flex: 'none' }}></span>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.65,
              color: 'rgba(255, 255, 255, 0.72)',
            }}
          >
            <strong style={{ color: '#ffffff', fontSize: 14 }}>{t.title}</strong>
            <br />
            {t.body}
            {' '}
            <a
              href="/privacy"
              style={{ color: '#7ab3ff', textDecoration: 'underline', textUnderlineOffset: 2 }}
            >
              {t.policy}
            </a>
            .
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button
            onClick={() => setVisible(false)}
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.18)',
              background: 'transparent',
              color: 'rgba(255,255,255,0.72)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {t.settings}
          </button>
          <button
            onClick={handleAccept}
            style={{
              padding: '8px 22px',
              borderRadius: 999,
              border: 'none',
              background: '#2a7fff',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {t.accept}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes cookieSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

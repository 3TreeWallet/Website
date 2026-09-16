import type { Metadata } from 'next';
import './globals.css';
import CookieConsent from '../components/CookieConsent';

/* ── JSON-LD 结构化数据：让 Google 识别为 SoftwareApplication ── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '3Tree',
  alternateName: ['3Tree Wallet', '3Tree钱包', '三棵树钱包', '3T钱包'],
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Android',
  description:
    '3Tree is an open-source, transparent multi-chain self-custody wallet supporting 103 mainnets including Bitcoin, Ethereum, BNB Chain, Solana, TRON, TON, Sui, Aptos and more. Keys encrypted on-device only.',
  url: 'https://3tree.xyz',
  downloadUrl: 'https://3tree.xyz',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Organization',
    name: '3Tree',
    url: 'https://3tree.xyz',
  },
  datePublished: '2024-01-01',
  softwareVersion: '3.8.2',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '120',
    bestRating: '5',
    worstRating: '1',
  },
} as const;

export const metadata: Metadata = {
  metadataBase: new URL('https://3tree.xyz'),
  /* 页面正文语言由客户端切换器决定（见 app/i18n.ts 的 useLang），
     SSR 无法预知访客选了哪种；站内默认英文，所以元信息也以英文在前、中文并列写进描述，
     再用 hreflang 告诉爬虫：同一个 URL 同时提供 en 与 zh-CN 两种呈现。 */
  title: {
    default: '3Tree — Open Source & Transparent｜Root Your Assets',
    template: '%s｜3Tree',
  },
  description:
    '3Tree (3Tree钱包/三棵树钱包/3T钱包) is an open-source, transparent multi-chain self-custody wallet protecting your Web3 assets: storage, transfers and swaps across 103 mainnets (Bitcoin, Ethereum, BNB Chain, Solana, TRON, TON, Sui, Aptos and more) in one app, keys encrypted on-device only — never uploaded, never custodied. Android is available now; iOS is coming soon. / 3Tree 是面向个人与团队的多链钱包，开源透明，保护你的 Web3 资产：103 条主网的存储、转账与闪兑集成于同一应用，私钥仅在设备本地加密保存，不上传、不托管。Android 版可直接下载，iOS 版即将到来。',
  keywords: [
    '3Tree',
    '3Tree wallet',
    '3Tree钱包',
    '三棵树钱包',
    '3T钱包',
    'self-custody wallet',
    'multi-chain wallet',
    'crypto wallet',
    'Web3 wallet',
    'open source wallet',
    'non-custodial wallet',
    'Bitcoin wallet',
    'Ethereum wallet',
    'TRON wallet',
    'Solana wallet',
    'BNB Chain wallet',
    'DeFi wallet',
    'crypto wallet APK',
    '多链钱包',
    '自持钱包',
    '自托管钱包',
    '加密钱包',
    '开源钱包',
    '去中心化钱包',
    'APK 下载',
    'APK download',
  ],
  alternates: { canonical: '/', languages: { en: '/', 'zh-CN': '/' } },
  openGraph: {
    title: '3Tree — Root Your Assets, Secure Roots, Boundless Chains',
    description:
      'Open Source & Transparent, protecting your Web3 assets — cross-chain storage, transfers and swaps, keys encrypted on-device, no custody, no mnemonic requests. Android is available now; iOS is coming soon. / 开源透明，保护你的 Web3 资产：跨链存储、转账与闪兑，私钥在设备本地加密，不托管、不索取助记词。',
    url: 'https://3tree.xyz',
    siteName: '3Tree',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/logo.png?v=2', width: 512, height: 512, alt: '3Tree' }],
  },
  twitter: {
    card: 'summary',
    title: '3Tree — Root Your Assets',
    description: 'Open Source & Transparent, protecting your Web3 assets · Android download · iOS coming soon / 开源透明，保护你的 Web3 资产',
    images: ['/logo.png?v=2'],
    site: '@3treewallet',
  },
  icons: { icon: '/logo.png?v=2', apple: '/logo.png?v=2' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 不加载外部字体：v3 版式走系统字体栈（见 globals.css 的 --font），
            构建与访问都不依赖第三方字体服务。
            lang 属性由 useLang 在客户端改写（默认 en），切到中文后读屏与搜索引擎拿到的语言才对得上。 */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" />
        {/* Google Search Console 站点验证 */}
        <meta name="google-site-verification" content="fNnJ8sruZ2oaJ9g9H4VZnmBrOAtBaDReSJS-cH1DRjM" />
        {/* JSON-LD 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8PM4W6CBC7" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-8PM4W6CBC7');`,
          }}
        />
      </head>
      <body>
        {children}
        {/* Cookie 同意弹窗：全站悬挂，localStorage 记住选择 */}
        <CookieConsent />
      </body>
    </html>
  );
}

'use client';

import { useEffect, useRef, useState, type ReactElement, type ReactNode, type SyntheticEvent } from 'react';
import release from './release.json';
import { useLang, type Lang } from './i18n';

/* ── 官方入口：唯一可信的三个主机，写在这里以免各处手抄跑偏 ─────────────
   3tree.xyz      本站（下载入口、校验值公示）
   su.3tree.xyz   分发节点（APK 与 version.json，应用内更新读的就是这一份）
   help.3tree.xyz 使用文档                                                    */
const LINKS = {
  apk: release.apkUrl,
  manifest: 'https://su.3tree.xyz/version.json',
  docs: 'https://help.3tree.xyz',
  terms: '/terms',
  privacy: '/privacy',
  x: 'https://x.com/3treewallet',
  mail: 'mailto:su@3tree.xyz',
};

/* 安装包文件名与分发主机：从直链现推，不在页面里再抄一份写死的字符串——
   闸口不允许源码出现 APK 文件名字面量，就是为了让这里只能跟着清单走 */
const APK_FILE = LINKS.apk.split('/').pop() || '';
const APK_HOST = (() => {
  try {
    return new URL(LINKS.apk).host;
  } catch {
    return 'su.3tree.xyz';
  }
})();

/* 体积为什么写进发布清单而不是运行时 HEAD：分发节点默认不给跨源响应头，
   拉一下只会每加载一次刷两条 CORS 报错。闸口会拿本地 APK 实测值校它。
   只算数字，回退文案交给 t() —— 模块级常量里拿不到语言。 */
const SIZE_MB = release.sizeBytes ? `${(release.sizeBytes / (1024 * 1024)).toFixed(1)} MB` : '';

/* 校验命令行：与校验区公示值配套，供用户在本机复算。
   回退名用英文：这串会直接进终端，而且 check_site_i18n 要求源码里的中文字面量均已接入词典。 */
const VERIFY_CMD = `shasum -a 256 ${APK_FILE || 'package.apk'}`;

/* 导航项：桌面与移动端共用一份，避免两处改漏 */
const NAV_ITEMS: ReadonlyArray<readonly [string, string]> = [
  ['网络支持', '#networks'],
  ['核心能力', '#caps'],
  ['应用内一览', '#inside'],
  ['安全机制', '#security'],
  ['校验公示', '#verify'],
  ['常见问题', '#faq'],
  ['使用文档', LINKS.docs],
];

/* 事实来源：ChainConfig.Chains.builtinAll（24 条主网）与 family 字段。
   TON / XRP 的发送已在 TonService.send / XrpService.send 落地，不再是只读展示。 */
type Net = { name: string; sym: string; fam: string };
const MAINNETS: Net[] = [
  { name: 'Bitcoin', sym: 'BTC', fam: 'UTXO · BIP84' },
  { name: 'Ethereum', sym: 'ETH', fam: 'EVM · 1' },
  { name: 'BNB Chain', sym: 'BNB', fam: 'EVM · 56' },
  { name: 'Base', sym: 'ETH', fam: 'EVM · 8453' },
  { name: 'Arbitrum One', sym: 'ETH', fam: 'EVM · 42161' },
  { name: 'Optimism', sym: 'ETH', fam: 'EVM · 10' },
  { name: 'Polygon', sym: 'POL', fam: 'EVM · 137' },
  { name: 'Avalanche', sym: 'AVAX', fam: 'EVM · 43114' },
  { name: 'Linea', sym: 'ETH', fam: 'EVM · 59144' },
  { name: 'opBNB', sym: 'BNB', fam: 'EVM · 204' },
  { name: 'Unichain', sym: 'ETH', fam: 'EVM · 130' },
  { name: 'World Chain', sym: 'ETH', fam: 'EVM · 480' },
  { name: 'HyperEVM', sym: 'HYPE', fam: 'EVM · 999' },
  { name: 'X Layer', sym: 'OKB', fam: 'EVM · 196' },
  { name: 'Robinhood Chain', sym: 'ETH', fam: 'EVM · 4663' },
  { name: 'HashKey Chain', sym: 'HSK', fam: 'EVM · 177' },
  { name: 'Plasma', sym: 'XPL', fam: 'EVM · 9745' },
  { name: 'Tron', sym: 'TRX', fam: 'TRON · TRC-20' },
  { name: 'Solana', sym: 'SOL', fam: 'SOLANA · SPL' },
  { name: 'Dogecoin', sym: 'DOGE', fam: 'UTXO · P2PKH' },
  { name: 'TON', sym: 'TON', fam: 'TON · V3R2' },
  { name: 'XRP', sym: 'XRP', fam: 'XRPL · classic' },
  { name: 'Aptos', sym: 'APT', fam: 'APTOS · ed25519' },
  { name: 'Sui', sym: 'SUI', fam: 'SUI · MIST' },
];

/* 六项核心能力：功能事实与 App 保持一致，表述为书面语 */
type Cap = { no: string; title: string; text: string; bullets: string[] };
const CAPS: Cap[] = [
  {
    no: '01',
    title: '密钥仅存储于本地',
    text: '助记词与私钥在本机加密存储，不上传、不托管、不代签。您需要妥善备份的是助记词，而不是把密码交给任何人。',
    bullets: ['一套助记词派生全部链地址', '多钱包管理与批量子地址（单次最多 100 个）', '导出与备份均提供明确的风险提示'],
  },
  {
    no: '02',
    title: '资产总览，分链核算',
    text: '主链币、代币与 NFT 集中于同一界面，切换网络即切换余额、历史与计价口径，各链数据独立核算。',
    bullets: ['代币管理与自定义添加（按链校验地址格式）', '交易记录查询与区块浏览器跳转', '总资产估值随当前网络切换'],
  },
  {
    no: '03',
    title: '闪兑与行情',
    text: '内置聚合报价与行情榜单，下单前即可查看路由、滑点与预计到账数量；对报价不满意时可切换其他聚合源。',
    bullets: ['多家聚合器报价横向对比', '滑点与到期时间可自定义', '热门币种与行情同屏查看'],
  },
  {
    no: '04',
    title: '收付款与费率',
    text: '支持扫码收付、地址簿与批量转账；转账前实时估算费用。TRON 用户可一键跳转能量与带宽租赁，显著降低 TRC-20 单笔成本。',
    bullets: ['转账费率实时估算，广播前可见', 'TRON 能量与带宽租赁入口', '批量转账逐笔估价、签名与广播'],
  },
  {
    no: '05',
    title: 'DApp 浏览器',
    text: '内置浏览器连接链上应用，每次连接与每条签名请求均需逐笔确认，会话权限可随时撤销。',
    bullets: ['连接与签名请求逐项核对', '会话可撤销，缓存可清理', '内置常用站点与活动页'],
  },
  {
    no: '06',
    title: '多签金库',
    text: '团队与国库可创建链上多签：须经多位签署人共同确认方可执行，提案、确认与撤销的每一步骤均记录在链上。',
    bullets: ['规则由合约保管，而非应用本身', '提案、确认、撤销全流程链上可见', '适用于社区金库与公司资金'],
  },
];

/* 四项底层安全机制：图标路径与文案同行维护，避免视觉与表述脱节 */
type Sec = { t: string; d: string; paths: string[] };
const SECURITY: Sec[] = [
  {
    t: '签名前充分知情',
    d: '费用、滑点、合约地址与收款人信息均在确认页完整列示。无法确认的交易可以拒绝签名 —— 这是自持钱包的最后一道防线。',
    paths: ['M4 6h16M4 12h10M4 18h7'],
  },
  {
    t: '安装来源自校验',
    d: '应用启动时自动核对自身包名与签名证书指纹。经重新打包、冒名的仿冒副本无法运行，官方证书指纹固化于代码之中。',
    paths: ['M12 3l7 3v6c0 4-3 7.4-7 9-4-1.6-7-5-7-9V6l7-3Z'],
  },
  {
    t: '更新双重校验',
    d: '应用内更新要求 versionCode 严格高于本机版本，并依次校验 APK SHA-256 与签名证书 SHA-256，任一不符即中止安装。',
    paths: [
      'M4 12a8 8 0 0 1 13.7-5.6M20 12a8 8 0 0 1-13.7 5.6',
      'M18 3v4h-4M6 21v-4h4',
    ],
  },
  {
    t: '公示与校验同源',
    d: '本页公示的两项校验值与应用读取的版本清单由发版流程逐字段比对，二者必须完全一致；任何分叉都将阻止发布。',
    paths: ['M5 12.5l4.2 4.2L19 7'],
  },
];

/* 常见问题：答案里的安装包文件名同样从直链推导，不在文案里复写 */
const FAQS: { q: string; a: string }[] = [
  {
    q: '私钥与助记词存储在何处？',
    a: '仅存储于您本机的加密存储区域。官网与应用均不设账户、不上传助记词、不托管资产。任何以「找回助记词」「KYC 验证」「空投授权」为理由索取助记词的行为，均为诈骗。',
  },
  {
    q: '如何确认下载的 APK 为官方原版？',
    a: '下载后在终端执行 {0}，将输出结果与本页公示的 APK SHA-256 比对；再比对签名证书 SHA-256，确认安装包由官方密钥签名。两项均一致后，方可继续安装。',
  },
  {
    q: 'iOS 版何时发布？',
    a: '即将到来。在此之前，任何声称「iOS 内测」「描述文件」「测试邀请」的渠道均非官方渠道 —— 官方 iOS 版的发布仅有一次，即正式发布。',
  },
  {
    q: '新版本会主动提醒吗？',
    a: '会。应用启动时与「我的 - 检查更新」入口均会读取版本清单；检测到新版本时将展示更新说明并直接下载，下载完成后先校验安装包再发起安装，全程无需前往其他渠道重新安装。',
  },
  {
    q: '支持哪些网络？',
    a: '24 条主网开箱即用，另有 10 条测试网用于开发联调，EVM 网络支持自定义添加；全部主网均可查看余额与历史并完成发送。',
  },
  {
    q: '手机丢失后，资产能否找回？',
    a: '可以，前提是您已离线备份助记词 —— 使用任意兼容 BIP39 的钱包导入助记词，即可重新派生全部地址。未备份助记词则无法恢复，这也是我们将备份列为安装第三步的原因。',
  },
];

/* 林冠剪影：确定性种子生成三层针叶树，服务器与客户端渲染结果一致（不用随机数） */
type FirLayer = { cls: string; color: string; count: number; min: number; max: number; seed: number; depth: number };
const FIR_LAYERS: FirLayer[] = [
  { cls: 'tl-back', color: '#7fb0ea', count: 16, min: 26, max: 46, seed: 7, depth: 0.12 },
  { cls: 'tl-mid', color: '#4a86d6', count: 13, min: 40, max: 68, seed: 23, depth: 0.26 },
  { cls: 'tl-front', color: '#1f4f96', count: 10, min: 62, max: 104, seed: 41, depth: 0.46 },
];

function rand(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function firLayer(cfg: FirLayer): ReactElement[] {
  const trees: ReactElement[] = [];
  for (let i = 0; i < cfg.count; i++) {
    const r1 = rand(cfg.seed + i * 3.1);
    const r2 = rand(cfg.seed + i * 7.7);
    const h = cfg.min + r2 * (cfg.max - cfg.min);
    trees.push(
      <use
        key={i}
        href="#fir"
        x={(-40 + r1 * 1240).toFixed(1)}
        y={(300 - h).toFixed(1)}
        width={(h * 0.52).toFixed(1)}
        height={h.toFixed(1)}
        fill={cfg.color}
        opacity={(0.55 + r1 * 0.45).toFixed(2)}
      />,
    );
  }
  return trees;
}

const FIR_TREES: ReactElement[][] = FIR_LAYERS.map((cfg) => firLayer(cfg));

/* logo 加载失败时退到内置树形图标（与 App 图标同构），页面不留破图 */
function onLogoError(e: SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.closest('.logo-box')?.classList.add('img-failed');
}

function LogoBox() {
  return (
    <span className="logo-box">
      <img className="logo-img" src="/logo.png?v=2" alt="3Tree Logo" onError={onLogoError} />
      <span className="logo-fallback" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 3l4 6h-2.4l3 5H7.4l3-5H8l4-6Z" fill="#fff" />
          <path d="M11 17h2v4h-2z" fill="#fff" />
        </svg>
      </span>
    </span>
  );
}

/* 手风琴条目：内层测高后写 inline maxHeight，才能对动画给到真实高度 */
function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () => setHeight(el.scrollHeight);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [open, a]);

  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-q" type="button" aria-expanded={open} onClick={onToggle}>
        {q}
      </button>
      <div className="faq-a" style={{ maxHeight: open ? height : 0 }}>
        <div ref={innerRef}>
          <p>{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ── 语言切换：中英双按钮。桌面放在导航里，移动端收进抽屉底部 ──────────
   不用下拉菜单：两项选择用 segmented control 少一次点击，也能一眼看出当前语言。 */
function LangSwitch({
  lang,
  setLang,
  label,
  onPick,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  label: string;
  onPick?: () => void;
}) {
  return (
    <span className="lang" role="group" aria-label={label}>
      {(['zh', 'en'] as const).map((l) => (
        <button
          key={l}
          type="button"
          className={lang === l ? 'on' : ''}
          aria-pressed={lang === l}
          onClick={() => {
            setLang(l);
            onPick?.();
          }}
        >
          {l === 'zh' ? '中' : 'EN'}
        </button>
      ))}
    </span>
  );
}

/* ── 链标：24 条主网各一枚内联 SVG 圆章 ─────────────────────────────
   为什么不用官方位图：一是各家 logo 授权与尺寸不统一，二是页面会因此多 24 个请求。
   配色取各家品牌色，但闸口钉死了「绿通道不得同时压过红与蓝 12 以上」，所以
   Solana 的绿尾、Robinhood 的品牌绿、opBNB / Hyperliquid 的绿一律换成蓝紫系——
   宁可离原品牌差一点，也不让官网出现绿。 */
type Glyph = { d: string; mode?: 'fill' | 'stroke' | 'bg'; w?: number };
type Mark = { bg: string; txt?: string; glyph?: Glyph[] };

const MARKS: Record<string, Mark> = {
  Bitcoin: {
    bg: '#f7931a',
    glyph: [
      { d: 'M9.4 6.6h4.3a2.5 2.5 0 0 1 0 5H9.4z', mode: 'stroke' },
      { d: 'M9.4 11.6h4.9a2.5 2.5 0 0 1 0 5H9.4z', mode: 'stroke' },
      { d: 'M9.4 6.6v10', mode: 'stroke' },
      { d: 'M11 4.6v2M13.4 4.6v2M11 16.6v2.8M13.4 16.6v2.8', mode: 'stroke' },
    ],
  },
  Ethereum: {
    bg: '#627eea',
    glyph: [{ d: 'M12 2.8l6.3 9.7L12 16.1 5.7 12.5z' }, { d: 'M12 17.5l6.3-3.7L12 21.2 5.7 13.8z' }],
  },
  'BNB Chain': {
    bg: '#f0b90b',
    glyph: [
      { d: 'M12 2.6l3.5 3.5L12 9.6 8.5 6.1z' },
      { d: 'M6.1 8.5l3.5 3.5-3.5 3.5L2.6 12z' },
      { d: 'M17.9 8.5l3.5 3.5-3.5 3.5-3.5-3.5z' },
      { d: 'M12 14.4l3.5 3.5L12 21.4l-3.5-3.5z' },
    ],
  },
  Base: {
    bg: '#0052ff',
    glyph: [
      { d: 'M12 3.2a8.8 8.8 0 1 1 0 17.6 8.8 8.8 0 0 1 0-17.6z' },
      { d: 'M12.2 4.8h3v14.4h-3z', mode: 'bg' },
    ],
  },
  'Arbitrum One': {
    bg: '#28a0f0',
    glyph: [
      { d: 'M12 3.4l7.8 4.5v9L12 21.4l-7.8-4.5v-9z', mode: 'stroke' },
      { d: 'M9.5 16.4l2.5-7 2.5 7', mode: 'stroke' },
      { d: 'M10.6 13.6h4.4', mode: 'stroke' },
    ],
  },
  Optimism: { bg: '#ff0420', txt: 'OP' },
  Polygon: {
    bg: '#8247e5',
    glyph: [
      { d: 'M12 3.6l7.2 4.2v8.4L12 20.4l-7.2-4.2V7.8z', mode: 'stroke' },
      { d: 'M12 8.4l3.4 2v3.2L12 15.6l-3.4-2v-3.2z', mode: 'stroke' },
    ],
  },
  Avalanche: {
    bg: '#e84142',
    glyph: [{ d: 'M12 4.4l7.8 14.6H4.2z' }, { d: 'M12 11.8l3.6 6.6H8.4z', mode: 'bg' }],
  },
  Linea: { bg: '#141414', glyph: [{ d: 'M5.5 12h13', mode: 'stroke', w: 2.6 }] },
  opBNB: { bg: '#f0b90b', txt: 'op' },
  Unichain: { bg: '#ff007a', glyph: [{ d: 'M8 4.6v9.2a4 4 0 0 0 8 0V4.6', mode: 'stroke', w: 2.2 }] },
  'World Chain': {
    bg: '#000000',
    glyph: [
      { d: 'M12 3.4a8.6 8.6 0 1 1 0 17.2 8.6 8.6 0 0 1 0-17.2z' },
      { d: 'M6.8 9.3h10.4v2H6.8z', mode: 'bg' },
      { d: 'M8.8 13.1h6.4v2H8.8z', mode: 'bg' },
    ],
  },
  HyperEVM: { bg: '#0e2a4f', txt: 'H' },
  'X Layer': { bg: '#000000', glyph: [{ d: 'M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4', mode: 'stroke', w: 2.4 }] },
  'Robinhood Chain': {
    /* 品牌绿按闸口换成品牌蓝，羽毛形状保留 */
    bg: '#2a7fff',
    glyph: [
      { d: 'M5.6 18.4C5.6 11.6 11.2 6 18 6c0 6.8-5.6 12.4-12.4 12.4z', mode: 'stroke' },
      { d: 'M8.4 15.6l7.6-7.6', mode: 'stroke' },
    ],
  },
  'HashKey Chain': { bg: '#1e40af', txt: 'HSK' },
  Plasma: {
    bg: '#7c3aed',
    glyph: [{ d: 'M12 3.6c3.2 3.8 5.2 6.3 5.2 8.9a5.2 5.2 0 1 1-10.4 0c0-2.6 2-5.1 5.2-8.9z', mode: 'stroke' }],
  },
  Tron: {
    bg: '#eb0029',
    glyph: [
      { d: 'M3.6 6.8L12 3.6l8.4 3.2L12 20.4z', mode: 'stroke' },
      { d: 'M3.6 6.8L12 10.2l8.4-3.4', mode: 'stroke' },
      { d: 'M12 10.2v10.2', mode: 'stroke' },
    ],
  },
  Solana: {
    /* 官方渐变里的绿尾换成紫，只留品牌主色 */
    bg: '#9945ff',
    glyph: [
      { d: 'M7.4 4.6h12.2l-3.2 3.4H4.2z' },
      { d: 'M4.2 10.3h12.2l3.2 3.4H7.4z' },
      { d: 'M7.4 16h12.2l-3.2 3.4H4.2z' },
    ],
  },
  Dogecoin: {
    bg: '#c2a633',
    glyph: [
      { d: 'M9 5.2h3.4a6.8 6.8 0 0 1 0 13.6H9z', mode: 'stroke' },
      { d: 'M6.8 12h9.4', mode: 'stroke' },
    ],
  },
  TON: { bg: '#0098ea', glyph: [{ d: 'M4.2 7.2L12 3.8l7.8 3.4L12 20.4z' }] },
  XRP: {
    bg: '#23292f',
    glyph: [
      { d: 'M4 5.2l5.6 6.8L4 18.8', mode: 'stroke', w: 2 },
      { d: 'M20 5.2l-5.6 6.8L20 18.8', mode: 'stroke', w: 2 },
    ],
  },
  Aptos: {
    bg: '#1a1a1a',
    glyph: [
      { d: 'M6.4 19.2L10.6 4.8', mode: 'stroke', w: 2.2 },
      { d: 'M11.6 19.2L15.8 4.8', mode: 'stroke', w: 2.2 },
      { d: 'M16.8 19.2l2-6.8', mode: 'stroke', w: 2.2 },
    ],
  },
  Sui: {
    bg: '#4da2ff',
    glyph: [
      { d: 'M4 9.6c2.7-2.3 5.3-2.3 8 0s5.3 2.3 8 0', mode: 'stroke', w: 2 },
      { d: 'M4 15.2c2.7-2.3 5.3-2.3 8 0s5.3 2.3 8 0', mode: 'stroke', w: 2 },
    ],
  },
};

const FALLBACK_MARK: Mark = { bg: 'var(--blue)' };

function ChainMark({ name, size = 22 }: { name: string; size?: number }) {
  const m = MARKS[name] || FALLBACK_MARK;
  return (
    <span
      className={`mark${m.txt ? ' txt' : ''}`}
      style={{
        width: size,
        height: size,
        background: m.bg,
        /* 字母章没有图形可缩放，字号跟着圆章直径走；三字母缩写再收一档才装得下 */
        fontSize: m.txt ? Math.max(7, Math.round(size * (m.txt.length > 2 ? 0.3 : 0.38))) : undefined,
      }}
      aria-hidden="true"
    >
      {m.txt ? (
        <b>{m.txt}</b>
      ) : (
        <svg viewBox="0 0 24 24">
          {(m.glyph || []).map((g) => (
            <path
              key={g.d}
              d={g.d}
              fill={g.mode === 'stroke' ? 'none' : g.mode === 'bg' ? m.bg : '#fff'}
              stroke={g.mode === 'stroke' ? '#fff' : 'none'}
              strokeWidth={g.w || 1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>
      )}
    </span>
  );
}

/* 描边图标：能力卡与安全区共用一套画法，线宽统一才像一家出品 */
function GlyphIcon({ g, size = 22 }: { g: Glyph[]; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      {g.map((p) => (
        <path
          key={p.d}
          d={p.d}
          stroke="currentColor"
          strokeWidth={p.w || 1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

/* 六项能力各配一枚图标，编号只作为次序提示，视觉锚点交给图形 */
const CAP_ICONS: Record<string, Glyph[]> = {
  '01': [
    { d: 'M15.2 3.6a5.4 5.4 0 1 1-4.1 8.9L4.6 19v2.4h2.6l.9-.9h2.2v-2.2h2.2l.9-.9a5.4 5.4 0 0 0 1.8-13.8z' },
    { d: 'M16.9 8.6a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2z' },
  ],
  '02': [{ d: 'M12 3.6v8.4h8.4A8.4 8.4 0 0 0 12 3.6z' }, { d: 'M20.2 14.4A8.4 8.4 0 1 1 9.6 3.8' }],
  '03': [{ d: 'M4 8.6h13.4l-3.6-3.6M20 15.4H6.6l3.6 3.6' }],
  '04': [
    { d: 'M4 4h6.2v6.2H4zM13.8 4H20v6.2h-6.2zM4 13.8h6.2V20H4z' },
    { d: 'M13.8 13.8h2.6v2.6h-2.6zM17.4 17.4H20V20h-2.6z' },
  ],
  '05': [
    { d: 'M12 3.6a8.4 8.4 0 1 0 0 16.8 8.4 8.4 0 0 0 0-16.8z' },
    { d: 'M3.7 12h16.6' },
    { d: 'M12 3.6c2.2 2.4 3.4 5.3 3.4 8.4s-1.2 6-3.4 8.4c-2.2-2.4-3.4-5.3-3.4-8.4S9.8 6 12 3.6z' },
  ],
  '06': [
    { d: 'M4.4 5.4h15.2v13.2H4.4z' },
    { d: 'M12 9.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6z' },
    { d: 'M12 6.2v2.4M12 15.4v2.4M6.6 12h2.6M14.8 12h2.6' },
  ],
};

/* ── 应用内一览：三台抽象化的手机界面 ──────────────────────────────
   为什么画而不用截图：真截图会带上真实地址与余额，而且版本一迭代就过期。
   抽象图形只表达版式与信息层级，既不漏用户数据，也不需要随发版更新。 */
type MockKind = 'portfolio' | 'swap' | 'approval';

const INSIDE: { kind: MockKind; t: string; d: string }[] = [
  { kind: 'portfolio', t: '资产总览', d: '主链币、代币与 NFT 同屏，切换网络即切换口径' },
  { kind: 'swap', t: '闪兑下单', d: '路由、滑点与预计到账在下单前可见' },
  { kind: 'approval', t: 'DApp 连接确认', d: '每一笔签名请求逐条列示，可拒绝' },
];

const MOCK_TOKENS = [
  { c: '#f7931a', w: 76 },
  { c: '#627eea', w: 88 },
  { c: '#0098ea', w: 62 },
  { c: '#9945ff', w: 82 },
];

const CARD = 'rgba(16,44,84,.10)';

function MockPortfolio() {
  return (
    <>
      <rect x="30" y="48" width="58" height="9" rx="4.5" fill="#d9e4f0" />
      <circle cx="200" cy="53" r="10" fill="#e8f1ff" />
      <rect x="30" y="72" width="180" height="84" rx="16" fill="#2a7fff" />
      <rect x="46" y="90" width="52" height="7" rx="3.5" fill="rgba(255,255,255,.55)" />
      <rect x="46" y="106" width="104" height="15" rx="7.5" fill="#ffffff" />
      <rect x="46" y="132" width="34" height="7" rx="3.5" fill="rgba(255,255,255,.45)" />
      {MOCK_TOKENS.map((tk, i) => {
        const y = 182 + i * 54;
        return (
          <g key={tk.c}>
            <circle cx="44" cy={y} r="13" fill={tk.c} />
            <rect x="66" y={y - 8} width="46" height="8" rx="4" fill="#cfdcea" />
            <rect x="66" y={y + 3} width="30" height="6" rx="3" fill="#e3ebf4" />
            <rect x={206 - tk.w} y={y - 8} width={tk.w} height="8" rx="4" fill="#9fb3c9" />
            <rect x={220 - tk.w} y={y + 3} width={tk.w - 14} height="6" rx="3" fill="#dfe7f0" />
          </g>
        );
      })}
      <rect x="30" y="414" width="180" height="36" rx="18" fill="#ffffff" stroke={CARD} />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={66 + i * 36} cy={432} r={i === 0 ? 6 : 4.5} fill={i === 0 ? '#2a7fff' : '#c3d2e2'} />
      ))}
    </>
  );
}

function MockSwap() {
  return (
    <>
      <rect x="30" y="48" width="44" height="9" rx="4.5" fill="#d9e4f0" />
      <rect x="30" y="74" width="180" height="94" rx="16" fill="#ffffff" stroke={CARD} />
      <circle cx="54" cy="102" r="13" fill="#f7931a" />
      <rect x="76" y="97" width="52" height="9" rx="4.5" fill="#cfdcea" />
      <rect x="150" y="95" width="44" height="12" rx="6" fill="#9fb3c9" />
      <rect x="46" y="132" width="80" height="7" rx="3.5" fill="#e3ebf4" />
      <rect x="30" y="192" width="180" height="94" rx="16" fill="#ffffff" stroke={CARD} />
      <circle cx="54" cy="220" r="13" fill="#627eea" />
      <rect x="76" y="215" width="46" height="9" rx="4.5" fill="#cfdcea" />
      <rect x="150" y="213" width="44" height="12" rx="6" fill="#9fb3c9" />
      <rect x="46" y="250" width="80" height="7" rx="3.5" fill="#e3ebf4" />
      <circle cx="120" cy="181" r="17" fill="#2a7fff" />
      <path
        d="M115 174v13M111 183l4 4 4-4M125 188v-13M121 179l4-4 4 4"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <rect x="30" y="302" width="180" height="80" rx="16" fill="#ffffff" stroke={CARD} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="46" y={320 + i * 22} width={52 - i * 6} height="7" rx="3.5" fill="#dfe7f0" />
          <rect x={194 - (48 - i * 4)} y={320 + i * 22} width={48 - i * 4} height="7" rx="3.5" fill="#cfdcea" />
        </g>
      ))}
      <rect x="30" y="398" width="180" height="44" rx="22" fill="#2a7fff" />
      <rect x="94" y="416" width="52" height="9" rx="4.5" fill="#ffffff" />
    </>
  );
}

function MockApproval() {
  return (
    <>
      <rect x="30" y="48" width="70" height="9" rx="4.5" fill="#d9e4f0" />
      <circle cx="200" cy="53" r="10" fill="#e8f1ff" />
      <rect x="30" y="74" width="180" height="66" rx="16" fill="#ffffff" stroke={CARD} />
      <circle cx="58" cy="107" r="15" fill="#e8f1ff" />
      <path
        d="M58 99.4a7.6 7.6 0 1 0 0 15.2 7.6 7.6 0 0 0 0-15.2zM50.8 107h14.4M58 99.8c1.9 2.1 2.9 4.6 2.9 7.2s-1 5.1-2.9 7.2c-1.9-2.1-2.9-4.6-2.9-7.2s1-5.1 2.9-7.2z"
        stroke="#2a7fff"
        strokeWidth="1.2"
        fill="none"
      />
      <rect x="82" y="97" width="80" height="9" rx="4.5" fill="#cfdcea" />
      <rect x="82" y="113" width="52" height="7" rx="3.5" fill="#e3ebf4" />
      <rect x="30" y="152" width="180" height="192" rx="16" fill="#ffffff" stroke={CARD} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="46" y={174 + i * 42} width={54 + ((i * 15) % 30)} height="8" rx="4" fill="#cfdcea" />
          <rect x="150" y={174 + i * 42} width="44" height="8" rx="4" fill="#9fb3c9" />
          {i < 3 && <rect x="46" y={196 + i * 42} width="148" height="1" fill="rgba(16,44,84,.08)" />}
        </g>
      ))}
      <rect x="30" y="356" width="180" height="44" rx="12" fill="#fdf4e6" />
      <circle cx="53" cy="378" r="8" fill="rgba(224,149,42,.35)" />
      <rect x="70" y="374" width="112" height="7" rx="3.5" fill="#e6c79a" />
      <rect x="30" y="414" width="86" height="40" rx="20" fill="#ffffff" stroke="rgba(16,44,84,.18)" />
      <rect x="52" y="430" width="42" height="8" rx="4" fill="#9fb3c9" />
      <rect x="124" y="414" width="86" height="40" rx="20" fill="#2a7fff" />
      <rect x="146" y="430" width="42" height="8" rx="4" fill="#ffffff" />
    </>
  );
}

function PhoneMock({ kind }: { kind: MockKind }) {
  return (
    <svg className="phone" viewBox="0 0 240 480" aria-hidden="true">
      <rect x="6" y="6" width="228" height="468" rx="34" fill="#ffffff" stroke="rgba(16,44,84,.16)" />
      <rect x="14" y="14" width="212" height="452" rx="27" fill="#f6f9fd" />
      <rect x="98" y="25" width="44" height="7" rx="3.5" fill="#d9e4f0" />
      {kind === 'portfolio' ? <MockPortfolio /> : kind === 'swap' ? <MockSwap /> : <MockApproval />}
    </svg>
  );
}

/* hero 右侧三屏：带真实币种 logo（public/tokens/，取自 App 内置图标）与可读数字的展示图。
   数字跨屏自洽：首页四行代币 USD 合计 = 总资产；闪兑支付额 = 余额，汇率乘除对得上；
   确认页法币值按首页 ETH 单价折算。地址用缩写形式，不指向任何真实资产。 */
const HERO_TOKENS = [
  { sym: 'BTC', name: 'Bitcoin', amt: '0.1852', usd: '12,004.20', img: '/tokens/btc.png' },
  { sym: 'ETH', name: 'Ethereum', amt: '2.8410', usd: '8,412.60', img: '/tokens/eth.png' },
  { sym: 'USDT', name: 'Tether', amt: '4,208.50', usd: '4,208.50', img: '/tokens/usdt.png' },
  { sym: 'TRX', name: 'TRON', amt: '11,940.0', usd: '2,030.20', img: '/tokens/trx.png' },
];

function HeroShotFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg className="phone hero-shot" viewBox="0 0 240 480" role="img" aria-label={label}>
      <rect x="6" y="6" width="228" height="468" rx="34" fill="#ffffff" stroke="rgba(16,44,84,.16)" />
      <rect x="14" y="14" width="212" height="452" rx="27" fill="#f6f9fd" />
      <text x="30" y="36" className="mono" fontSize="9" fill="#7c90b8">9:41</text>
      <rect x="184" y="28" width="20" height="9" rx="2.5" fill="none" stroke="#c3d2e2" />
      <rect x="186" y="30" width="14" height="5" rx="1.5" fill="#9fb3c9" />
      {children}
    </svg>
  );
}

function HeroShotHome({ t }: { t: (s: string) => string }) {
  const acts = [
    { label: t('发送'), d: 'M0 4V-4M-3.4 -0.6L0 -4L3.4 -0.6' },
    { label: t('接收'), d: 'M0 -4V4M-3.4 0.6L0 4L3.4 0.6' },
    { label: t('闪兑'), d: 'M-4 -2H4M1.6 -4.4L4 -2L1.6 0.4M4 2H-4M-1.6 -0.4L-4 2L-1.6 4.4' },
    { label: t('发现'), d: 'M0 -4.6A4.6 4.6 0 1 0 0 4.6A4.6 4.6 0 1 0 0 -4.6M-2.6 2.6L2.6 -2.6' },
  ];
  return (
    <HeroShotFrame label="3Tree portfolio screen">
      <image href="/logo.png?v=2" x="26" y="46" width="20" height="20" rx="6" />
      <text x="52" y="61" fontSize="12" fontWeight="700" fill="#0e1c2e">3Tree</text>
      <rect x="148" y="47" width="66" height="19" rx="9.5" fill="#e8f1ff" />
      <text x="156" y="60" fontSize="8.5" fill="#1d54a4">{t('主钱包 1')}</text>
      <text x="26" y="92" fontSize="9" fill="#7c90b8">{t('总资产')} (USD)</text>
      <text x="90" y="92" fontSize="8.5" fill="#2a7fff">{t('今日')} +3.24%</text>
      <text x="26" y="117" className="mono" fontSize="22" fontWeight="700" fill="#0e1c2e">$26,655.50</text>
      {acts.map((a, i) => (
        <g key={a.label}>
          <circle cx={48 + i * 48} cy="158" r="15" fill="#e8f1ff" />
          <path
            d={a.d}
            transform={`translate(${48 + i * 48} 158)`}
            stroke="#2a7fff"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <text x={48 + i * 48} y="186" textAnchor="middle" fontSize="8.5" fill="#4d5d72">{a.label}</text>
        </g>
      ))}
      <rect x="24" y="198" width="192" height="174" rx="14" fill="#ffffff" stroke="#e2eaf3" />
      {HERO_TOKENS.map((tk, i) => {
        const y = 222 + i * 42;
        return (
          <g key={tk.sym}>
            <image href={tk.img} x="38" y={y - 12} width="21" height="21" rx="10.5" />
            <text x="67" y={y - 2} fontSize="10.5" fontWeight="700" fill="#0e1c2e">{tk.sym}</text>
            <text x="67" y={y + 10} fontSize="7.5" fill="#7c90b8">{tk.name}</text>
            <text x="202" y={y - 2} textAnchor="end" className="mono" fontSize="9.5" fill="#0e1c2e">{tk.amt}</text>
            <text x="202" y={y + 10} textAnchor="end" fontSize="8" fill="#7c90b8">${tk.usd}</text>
            {i < 3 && <rect x="38" y={y + 21} width="164" height="1" fill="rgba(16,44,84,.06)" />}
          </g>
        );
      })}
      <rect x="24" y="412" width="192" height="42" rx="14" fill="#ffffff" stroke="#e2eaf3" />
      {[t('资产'), t('探索'), t('我的')].map((lb, i) => (
        <g key={lb}>
          <text
            x={56 + i * 64}
            y="438"
            textAnchor="middle"
            fontSize="8.5"
            fontWeight={i === 0 ? 700 : 400}
            fill={i === 0 ? '#2a7fff' : '#7c90b8'}
          >
            {lb}
          </text>
          {i === 0 && <circle cx={56 + i * 64} cy="424" r="1.8" fill="#2a7fff" />}
        </g>
      ))}
    </HeroShotFrame>
  );
}

function HeroShotSwap({ t }: { t: (s: string) => string }) {
  return (
    <HeroShotFrame label="3Tree swap screen">
      <text x="26" y="60" fontSize="13" fontWeight="700" fill="#0e1c2e">{t('闪兑')}</text>
      <rect x="146" y="46" width="68" height="19" rx="9.5" fill="#e8f1ff" />
      <text x="154" y="59" fontSize="8.5" fill="#1d54a4">Ethereum</text>
      <rect x="24" y="78" width="192" height="80" rx="14" fill="#ffffff" stroke="#e2eaf3" />
      <text x="38" y="97" fontSize="8" fill="#7c90b8">{t('支付')}</text>
      <text x="202" y="97" textAnchor="end" fontSize="8" fill="#7c90b8">{t('余额')} 4,208.50</text>
      <image href="/tokens/usdt.png" x="38" y="112" width="26" height="26" rx="13" />
      <text x="72" y="130" fontSize="11.5" fontWeight="700" fill="#0e1c2e">USDT</text>
      <text x="202" y="132" textAnchor="end" className="mono" fontSize="17" fontWeight="700" fill="#0e1c2e">4,208.50</text>
      <circle cx="120" cy="172" r="14" fill="#2a7fff" />
      <path
        d="M-5 -2.5H5M2.5 -5L5 -2.5L2.5 0M5 3H-5M-2.5 0.5L-5 3L-2.5 5.5"
        transform="translate(120 172)"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <text x="142" y="176" fontSize="8" fill="#4d5d72">1 ETH ≈ 1,482.6 USDT</text>
      <rect x="24" y="190" width="192" height="80" rx="14" fill="#ffffff" stroke="#e2eaf3" />
      <text x="38" y="209" fontSize="8" fill="#7c90b8">{t('接收')}</text>
      <text x="202" y="209" textAnchor="end" fontSize="8" fill="#7c90b8">{t('预估到账')}</text>
      <image href="/tokens/eth.png" x="38" y="224" width="26" height="26" rx="13" />
      <text x="72" y="242" fontSize="11.5" fontWeight="700" fill="#0e1c2e">ETH</text>
      <text x="202" y="244" textAnchor="end" className="mono" fontSize="17" fontWeight="700" fill="#0e1c2e">2.8386</text>
      <rect x="24" y="284" width="192" height="86" rx="14" fill="#ffffff" stroke="#e2eaf3" />
      {[
        [t('价格影响'), '0.12%'],
        [t('网络费用'), '≈ $0.62'],
        [t('流动性费用'), '0.30%'],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="38" y={306 + i * 22} fontSize="8.5" fill="#7c90b8">{k}</text>
          <text x="202" y={306 + i * 22} textAnchor="end" className="mono" fontSize="9" fill="#0e1c2e">{v}</text>
        </g>
      ))}
      <rect x="24" y="386" width="192" height="44" rx="22" fill="#2a7fff" />
      <text x="120" y="413" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff">{t('开始闪兑')}</text>
      <text x="120" y="450" textAnchor="middle" fontSize="7.5" fill="#7c90b8">{t('报价由聚合器实时返回')}</text>
    </HeroShotFrame>
  );
}

function HeroShotConfirm({ t }: { t: (s: string) => string }) {
  return (
    <HeroShotFrame label="3Tree transfer review screen">
      <text x="26" y="60" fontSize="13" fontWeight="700" fill="#0e1c2e">{t('转账确认')}</text>
      <rect x="24" y="76" width="192" height="82" rx="14" fill="#ffffff" stroke="#e2eaf3" />
      <text x="38" y="95" fontSize="8" fill="#7c90b8">{t('收款地址')}</text>
      <image href="/tokens/eth.png" x="38" y="104" width="22" height="22" rx="11" />
      <text x="68" y="119" className="mono" fontSize="10.5" fontWeight="600" fill="#0e1c2e">0x7f3a…9c4b21</text>
      <text x="38" y="146" fontSize="8" fill="#7c90b8">{t('网络')}</text>
      <text x="202" y="146" textAnchor="end" fontSize="8.5" fill="#1d54a4">Ethereum</text>
      <rect x="24" y="170" width="192" height="72" rx="14" fill="#ffffff" stroke="#e2eaf3" />
      <text x="38" y="189" fontSize="8" fill="#7c90b8">{t('金额')}</text>
      <text x="38" y="213" className="mono" fontSize="17" fontWeight="700" fill="#0e1c2e">0.8500 ETH</text>
      <text x="38" y="232" fontSize="8.5" fill="#7c90b8">≈ $2,516.97</text>
      <rect x="24" y="254" width="192" height="44" rx="14" fill="#ffffff" stroke="#e2eaf3" />
      <text x="38" y="280" fontSize="8.5" fill="#7c90b8">{t('矿工费')} (Gas)</text>
      <text x="202" y="280" textAnchor="end" className="mono" fontSize="9" fill="#0e1c2e">0.00021 ETH ≈ $0.62</text>
      <rect x="24" y="310" width="192" height="54" rx="12" fill="#fdf4e6" />
      <circle cx="45" cy="337" r="9" fill="rgba(224,149,42,.28)" />
      <text x="45" y="341" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b97a1a">!</text>
      <text x="62" y="331" fontSize="8" fill="#8a5a12">{t('请核对收款地址，')}</text>
      <text x="62" y="345" fontSize="8" fill="#8a5a12">{t('交易上链后不可撤销。')}</text>
      <rect x="24" y="380" width="88" height="44" rx="22" fill="#ffffff" stroke="rgba(16,44,84,.18)" />
      <text x="68" y="407" textAnchor="middle" fontSize="10.5" fill="#0e1c2e">{t('拒绝')}</text>
      <rect x="128" y="380" width="88" height="44" rx="22" fill="#2a7fff" />
      <text x="172" y="407" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#ffffff">{t('确认并签名')}</text>
      <text x="120" y="448" textAnchor="middle" fontSize="7.5" fill="#7c90b8">{t('由本机私钥签名，不经过任何服务器')}</text>
    </HeroShotFrame>
  );
}

/* hero 三屏轮换组：按首页 / 闪兑 / 确认的顺序轮番移到最前面 */
const HERO_SHOTS = [HeroShotHome, HeroShotSwap, HeroShotConfirm];

/* 「根深，则链远」：三棵树对应私钥、协议与资产，配图走 public/about-forest.jpg */
const ROOTS = [
  { k: '根 · 私钥', v: '助记词与私钥只存在于这台设备，离线也能签名。' },
  { k: '干 · 协议', v: '103 条主网各自原生适配，签名与费用模型互不套用。' },
  { k: '冠 · 资产', v: '余额、代币、NFT 与合约权限，都长在你自己手里。' },
];

export default function WalletSite() {
  const { lang, setLang, t, tf } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [toastText, setToastText] = useState('');
  const [toastShow, setToastShow] = useState(false);
  const [copiedKey, setCopiedKey] = useState('');
  /* hero 三图轮播：当前排在最前面的那张，定时 +1 取模切换槽位 */
  const [hpFront, setHpFront] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const treesRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const okTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* 轮播节拍：3 秒换一张到最前；prefers-reduced-motion 下不启动，
     三图停在首帧的叠放状态（与下方 CSS 的 reduce 块一致） */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setHpFront((f) => (f + 1) % 3), 3000);
    return () => clearInterval(id);
  }, []);

  /* 揭示：进入视口才淡入上移 */
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.rv'));
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('in');
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* 雪：视口内才跑，页面隐藏与退出视口时停掉，省电也省 CPU */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    type Flake = { x: number; y: number; r: number; vy: number; amp: number; sp: number; ph: number; a: number };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let flakes: Flake[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let running = false;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(rect.width, 1);
      h = Math.max(rect.height, 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = w < 640 ? 46 : w < 1024 ? 70 : 96;
      flakes = [];
      for (let i = 0; i < target; i++) {
        const depth = Math.random();
        flakes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.8 + depth * 2.4,
          vy: 0.22 + depth * 0.85,
          amp: 8 + depth * 26,
          sp: 0.004 + Math.random() * 0.012,
          ph: Math.random() * Math.PI * 2,
          a: 0.32 + depth * 0.55,
        });
      }
    };

    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.y += f.vy;
        f.ph += f.sp;
        if (f.y - f.r > h) {
          f.y = -f.r;
          f.x = Math.random() * w;
        }
        let x = f.x + Math.sin(f.ph) * f.amp * 0.35 + Math.sin(t * 0.00022 + i) * 6;
        if (x > w + 10) x = -10;
        if (x < -10) x = w + 10;
        ctx.beginPath();
        ctx.arc(x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${f.a.toFixed(3)})`;
        ctx.fill();
      }
      if (running) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || !visible) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    build();
    start();

    let rt: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (rt) clearTimeout(rt);
      rt = setTimeout(() => build(), 180);
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            visible = e.isIntersecting;
            if (visible) start();
            else stop();
          });
        },
        { threshold: 0 },
      );
      io.observe(canvas);
    }

    return () => {
      stop();
      if (rt) clearTimeout(rt);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      io?.disconnect();
    };
  }, []);

  /* 视差：滚动让林层错速下移，指针横向移动让林层轻微横移 */
  useEffect(() => {
    const hero = heroRef.current;
    const trees = treesRef.current;
    if (!hero || !trees) return;
    const layers = Array.from(trees.querySelectorAll<HTMLElement>('.tree-layer'));
    const bg = hero.querySelector<HTMLElement>('.hero-bg img');
    let ticking = false;
    let raf = 0;

    const apply = () => {
      ticking = false;
      const y = window.pageYOffset || document.documentElement.scrollTop;
      const hh = hero.offsetHeight || 1;
      if (y > hh) return;
      const p = y / hh;
      layers.forEach((layer) => {
        const d = parseFloat(layer.dataset.depth || '0.2') || 0.2;
        layer.style.marginTop = `${(-p * 60 * d).toFixed(2)}px`;
      });
      if (bg) bg.style.marginTop = `${(p * 34).toFixed(2)}px`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(apply);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      layers.forEach((layer) => {
        const d = parseFloat(layer.dataset.depth || '0.2') || 0.2;
        layer.style.setProperty('--px', `${(-dx * 26 * d).toFixed(2)}px`);
      });
    };
    const fine = typeof window.matchMedia === 'function' && window.matchMedia('(pointer: fine)').matches;
    if (fine) hero.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      if (fine) hero.removeEventListener('mousemove', onMove);
    };
  }, []);

  /* 复制提示的定时器在卸载时清掉，避免离开页面后仍触发 setState */
  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      if (okTimer.current) clearTimeout(okTimer.current);
    },
    [],
  );

  async function copyText(key: string, text: string) {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      ok = false;
    }
    setToastText(ok ? t('已复制到剪贴板') : t('复制失败，请手动选择文本'));
    setToastShow(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastShow(false), 1800);
    if (ok) {
      setCopiedKey(key);
      if (okTimer.current) clearTimeout(okTimer.current);
      okTimer.current = setTimeout(() => setCopiedKey(''), 1800);
    }
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* SECTION: nav */}
      <header className="nav">
        <div className="wrap nav-in">
          <a className="brand" href="#top" aria-label={t('3Tree 首页')}>
            <LogoBox />
            <span className="brand-txt">
              3Tree
              <small>OPEN SOURCE & TRANSPARENT</small>
            </span>
          </a>
          <nav className="nav-links">
            {NAV_ITEMS.map(([label, href]) => (
              <a key={href} href={href}>
                {t(label)}
              </a>
            ))}
          </nav>
          <LangSwitch lang={lang} setLang={setLang} label={t('切换语言')} />
          <button
            className="burger"
            type="button"
            aria-label={t('打开菜单')}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className={`mobile${menuOpen ? ' open' : ''}`}>
          {NAV_ITEMS.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {t(label)}
            </a>
          ))}
          <div className="mobile-lang">
            <LangSwitch lang={lang} setLang={setLang} label={t('切换语言')} onPick={closeMenu} />
          </div>
        </div>
      </header>

      <main id="top">
        {/* SECTION: hero */}
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <symbol id="fir" viewBox="0 0 52 100">
            <path d="M26 0 L38 27 H32 L44 57 H37 L52 100 H0 L15 57 H8 L20 27 H14 Z" />
          </symbol>
        </svg>
        <section className="hero" ref={heroRef}>
          <div className="hero-bg">
            <img
              src="/hero-forest.jpg"
              alt={t('雪松森林与雪地小径')}
              onError={(e) => e.currentTarget.parentElement?.classList.add('img-failed')}
            />
          </div>
          <div className="hero-scrim" />
          <div className="hero-glow" />
          <div className="hero-trees" ref={treesRef}>
            {FIR_LAYERS.map((cfg, li) => (
              <div key={cfg.cls} className={`tree-layer ${cfg.cls}`} data-depth={cfg.depth}>
                <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
                  {FIR_TREES[li]}
                  <rect x="0" y="288" width="1200" height="12" fill={cfg.color} opacity="0.5" />
                </svg>
              </div>
            ))}
          </div>
          <div className="hero-mist" />
          <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />
          <div className="wrap">
            <div className="hero-grid">
              <div>
                <span className="eyebrow rise d1">Root Your Assets</span>
                <h1 className="rise d2">
                  {t('资产自持，')}
                  <span className="thin">{t('私钥')}</span>
                  <em>{t('在握')}</em>
                </h1>
                <p className="lead rise d3">
                  {t(
                    '103 条主网的存储、转账与闪兑集成于同一应用：私钥仅在设备本地加密保存，不上传、不托管，每一笔交易均由您本人签名确认。',
                  )}
                </p>
                <div className="hero-cta rise d4">
                  <a className="btn btn-p" href="#download">
                    {tf('下载 Android APK v{0}', release.versionName)}
                  </a>
                  <a className="btn btn-g" href="#verify">
                    {t('核对校验值')}
                  </a>
                </div>
                <div className="hero-note rise d5">{t('iOS · 即将到来')}</div>
              </div>
              <div className="hero-side rise d5">
                <div className="hero-phones">
                  {HERO_SHOTS.map((Shot, i) => (
                    <div key={i} className={`hp slot-${(i - hpFront + 3) % 3}`}>
                      <Shot t={t} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="scroll-hint rise d6">
              <i />
              {t('向下浏览')}
            </div>
          </div>
        </section>

        {/* SECTION: marquee */}
        <div className="marq" aria-hidden="true">
          <div className="marq-track">
            {['a', 'b'].map((dup) =>
              MAINNETS.map((n) => (
                <span className="chip" key={`${dup}-${n.name}`}>
                  <ChainMark name={n.name} size={17} />
                  <span>{n.name}</span>
                </span>
              )),
            )}
          </div>
        </div>

        {/* SECTION: stats —— 四个核心数字：跑马灯下方通栏横排 */}
        <div className="stats-bar">
          <div className="wrap">
            <div className="stats-row">
              <div className="sbar-item">
                <b>103</b>
                <span>{t('支持主网')}</span>
              </div>
              <div className="sbar-item">
                <b>8</b>
                <span>{t('非 EVM 公链')}</span>
              </div>
              <div className="sbar-item">
                <b>12</b>
                <span>{t('界面语言')}</span>
              </div>
              <div className="sbar-item">
                <b>0</b>
                <span>{t('资产托管')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: networks */}
        <section id="networks">
          <div className="wrap">
            <div className="rv">
              <span className="eyebrow">01 — Networks</span>
              <h2 className="sec-title" style={{ marginTop: 14 }}>
                {t('覆盖八类链生态')}
              </h2>
              <p className="sec-desc">
                {t(
                  '各条网络的地址派生、签名算法与费用模型差异显著，3Tree 为每类网络单独实现原生适配，而非简单套用 EVM 方案。16 条 EVM 网络共享统一的交互体验，8 条非 EVM 主链各自遵循原生协议。',
                )}
              </p>
            </div>
            <div className="net-grid rv">
              {MAINNETS.map((n) => (
                <div className="net" key={n.name}>
                  <div className="net-top">
                    <ChainMark name={n.name} size={26} />
                    <span className="net-name">{n.name}</span>
                    <span className="net-sym">{n.sym}</span>
                  </div>
                  <div className="net-meta">{n.fam}</div>
                </div>
              ))}
            </div>
            <p className="net-more rv">
              {t('另有')} <b>{t('10 条测试网')}</b>
              {t('用于开发联调；EVM 网络支持自定义添加。')}
            </p>
          </div>
        </section>

        <div className="divider" />

        {/* SECTION: capabilities */}
        <section id="caps">
          <div className="wrap">
            <div className="rv">
              <span className="eyebrow">02 — Capabilities</span>
              <h2 className="sec-title" style={{ marginTop: 14 }}>
                {t('六项核心能力')}
              </h2>
              <p className="sec-desc">
                {t(
                  '自持是前提，易用是日常。资产管理、闪兑、收付款、DApp 浏览器与多签金库均在同一应用内完成，无需在多个应用之间迁移私钥。',
                )}
              </p>
            </div>
            <div className="caps rv">
              {CAPS.map((c) => (
                <article className="cap" key={c.no}>
                  <div className="cap-head">
                    <span className="cap-icon">
                      <GlyphIcon g={CAP_ICONS[c.no] || []} />
                    </span>
                    <span className="cap-no">{c.no}</span>
                  </div>
                  <h3>{t(c.title)}</h3>
                  <p>{t(c.text)}</p>
                  <ul>
                    {c.bullets.map((b) => (
                      <li key={b}>{t(b)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: inside —— 三个最常用的界面，用抽象手机图代替截图 */}
        <section id="inside" className="inside-wrap">
          <div className="wrap">
            <div className="rv">
              <span className="eyebrow">03 — Inside</span>
              <h2 className="sec-title" style={{ marginTop: 14 }}>
                {t('应用内一览')}
              </h2>
              <p className="sec-desc">
                {t('三个最常用的界面：资产总览、闪兑下单与 DApp 连接确认，共用同一套设计语言。')}
              </p>
            </div>
            <div className="phones rv">
              {INSIDE.map((m) => (
                <figure className="phone-card" key={m.kind}>
                  <PhoneMock kind={m.kind} />
                  <figcaption>
                    <b>{t(m.t)}</b>
                    <span>{t(m.d)}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: security */}
        <section id="security" className="sec-wrap">
          <div className="wrap">
            <div className="rv">
              <span className="eyebrow">04 — Security</span>
              <h2 className="sec-title" style={{ marginTop: 14 }}>
                {t('四项底层安全机制')}
              </h2>
              <p className="sec-desc">
                {t(
                  '安全机制贯穿使用全程：签名前充分披露交易信息、安装包来源可自主校验、更新链路完整可验、分发渠道唯一。',
                )}
              </p>
            </div>
            <div className="sec-list rv">
              {SECURITY.map((s) => (
                <div className="sec-item" key={s.t}>
                  <h3>
                    <svg viewBox="0 0 24 24" fill="none">
                      {s.paths.map((d) => (
                        <path
                          key={d}
                          d={d}
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      ))}
                    </svg>
                    {t(s.t)}
                  </h3>
                  <p>{t(s.d)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: verify */}
        <section id="verify">
          <div className="wrap">
            <div className="rv">
              <span className="eyebrow">05 — Verify</span>
              <h2 className="sec-title" style={{ marginTop: 14 }}>
                {t('核对无误后再安装')}
              </h2>
              <p className="sec-desc">
                {t(
                  '以下两项校验值与应用内更新所读取的完全同源：客户端据此判定安装包真伪，您据此确认下载文件未被替换。',
                )}
              </p>
            </div>
            <div className="verify">
              <div className="rv" style={{ display: 'grid', gap: 16 }}>
                <div className="hash-card">
                  <h4>APK SHA-256</h4>
                  <div className="hash-val">{release.sha256}</div>
                  <div className="copy-row">
                    <button className="btn btn-g btn-s" type="button" onClick={() => copyText('apk', release.sha256)}>
                      {t('复制校验值')}
                    </button>
                    <span className={`copy-ok${copiedKey === 'apk' ? ' show' : ''}`}>{t('已复制到剪贴板')}</span>
                  </div>
                </div>
                <div className="hash-card">
                  <h4>{t('签名证书 SHA-256')}</h4>
                  <div className="hash-val">{release.certSha256}</div>
                  <div className="copy-row">
                    <button
                      className="btn btn-g btn-s"
                      type="button"
                      onClick={() => copyText('cert', release.certSha256)}
                    >
                      {t('复制校验值')}
                    </button>
                    <span className={`copy-ok${copiedKey === 'cert' ? ' show' : ''}`}>{t('已复制到剪贴板')}</span>
                  </div>
                </div>
              </div>
              <div className="rv">
                <dl className="spec-list">
                  <div>
                    <dt>{t('版本')}</dt>
                    <dd>v{release.versionName}</dd>
                  </div>
                  <div>
                    <dt>{t('安装包')}</dt>
                    <dd>{APK_FILE}</dd>
                  </div>
                  <div>
                    <dt>{t('体积')}</dt>
                    <dd>{SIZE_MB || t('见 version.json')}</dd>
                  </div>
                  <div>
                    <dt>{t('分发主机')}</dt>
                    <dd>{APK_HOST}</dd>
                  </div>
                  <div>
                    <dt>{t('系统要求')}</dt>
                    <dd>{t('Android 8.0 及以上')}</dd>
                  </div>
                </dl>
                <div className="cmd">{VERIFY_CMD}</div>
                <div className="copy-row" style={{ marginTop: 12 }}>
                  <button className="btn btn-g btn-s" type="button" onClick={() => copyText('cmd', VERIFY_CMD)}>
                    {t('复制校验命令')}
                  </button>
                  <span className={`copy-ok${copiedKey === 'cmd' ? ' show' : ''}`}>{t('已复制到剪贴板')}</span>
                </div>
                <p style={{ marginTop: 18, fontSize: 14, color: 'var(--text-3)' }}>
                  {t('机器可读的版本清单位于 version.json，应用内更新读取的即为该文件。')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* SECTION: download */}
        <section id="download">
          <div className="wrap">
            <div className="rv">
              <span className="eyebrow">Download</span>
              <h2 className="sec-title" style={{ marginTop: 14 }}>
                {t('下载与安装')}
              </h2>
              <p className="sec-desc">
                {t('官网直连官方分发节点，所下载的安装包与应用内更新校验的文件完全一致。')}
              </p>
            </div>
            <div className="dl-grid">
              <div className="dl-card rv">
                <span className="dl-badge and" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4.6 9.4h14.8v8.2a2 2 0 0 1-2 2H6.6a2 2 0 0 1-2-2zM8.6 4.2L7.2 2.6M15.4 4.2l1.4-1.6M5.4 6.6a8 8 0 0 1 13.2 0z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M9 6.2h.01M15 6.2h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </span>
                <h3>{t('Android 版')}</h3>
                <p>{t('Android 8.0+ · 官方签名 APK · 应用内自动检查更新')}</p>
                <a className="btn btn-p" href={LINKS.apk}>
                  {tf('下载 v{0}', release.versionName)}
                </a>
              </div>
              <div className="dl-card off rv">
                <span className="dl-badge ios" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.5z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path d="M14.6 5.4c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.7 1.4-.6.7-1 1.8-.9 2.8 1 .1 2.1-.5 2.7-1.3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3>{t('iOS 版')}</h3>
                <p>
                  {t('适配进行中。任何以「iOS 描述文件」或「测试邀请」名义提供的安装方式均非官方渠道，请勿安装。')}
                </p>
                <span className="btn btn-g" style={{ cursor: 'default' }}>
                  {t('即将到来 · Coming Soon')}
                </span>
              </div>
            </div>
            <div className="steps rv">
              <div className="step">
                <b>STEP 01</b>
                <p>{t('下载并打开 APK；系统询问安装权限时，先核对 SHA-256 校验值，再允许本次安装。')}</p>
              </div>
              <div className="step">
                <b>STEP 02</b>
                <p>{t('创建新钱包，或导入已有的助记词与私钥。')}</p>
              </div>
              <div className="step">
                <b>STEP 03</b>
                <p>{t('立即离线备份助记词。它是恢复资产的唯一途径，3Tree 无法协助找回。')}</p>
              </div>
            </div>
            <div className="warn rv">
              <h4>{t('唯一官方入口')}</h4>
              <p>
                {t(
                  '官方渠道仅限本站 3tree.xyz 与分发节点 su.3tree.xyz。应用市场镜像、网盘链接或群组转发的安装包均非官方发布；仿冒钱包可能导致资产直接被盗，后果不可逆。',
                )}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: contact */}
        <section id="connect" className="sec-wrap">
          <div className="wrap">
            <div className="rv">
              <span className="eyebrow">06 — Connect</span>
              <h2 className="sec-title" style={{ marginTop: 14 }}>
                {t('支持与联系')}
              </h2>
              <p className="sec-desc">
                {t(
                  '更新日志、功能说明与常见问题均发布于文档站；产品反馈与重要公告请关注 X。官方不会主动私信，也不会以任何理由索取助记词。',
                )}
              </p>
            </div>
            <div className="contact rv">
              <a href={LINKS.docs} target="_blank" rel="noopener noreferrer">
                <span>{t('使用文档')}</span>
                <b>help.3tree.xyz</b>
              </a>
              <a href={LINKS.x} target="_blank" rel="noopener noreferrer">
                <span>{t('X（Twitter）')}</span>
                <b>@3treewallet</b>
              </a>
              <a href={LINKS.mail}>
                <span>{t('邮件联系')}</span>
                <b>su@3tree.xyz</b>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION: faq */}
        <section id="faq">
          <div className="wrap">
            <div className="rv">
              <span className="eyebrow">07 — FAQ</span>
              <h2 className="sec-title" style={{ marginTop: 14 }}>
                {t('常见问题')}
              </h2>
              <p className="sec-desc">
                {t('以下为咨询频率最高的六个问题。若任何表述存在疑问，建议确认清楚后再转入资产 —— 自持的前提是您已完全理解。')}
              </p>
            </div>
            <div className="faq rv">
              {FAQS.map((f, i) => (
                <FaqItem
                  key={f.q}
                  q={t(f.q)}
                  a={tf(f.a, VERIFY_CMD)}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
            {/* 六个问答没覆盖到的：直接给文档站完整说明，不在站内再堆一份 */}
            <p className="faq-more rv">
              {t('还有疑问？完整的产品说明与操作步骤都在帮助文档里。')}{' '}
              <a href={LINKS.docs} target="_blank" rel="noopener noreferrer">
                {t('前往帮助文档')} →
              </a>
            </p>
          </div>
        </section>

        {/* SECTION: about —— 图片带：雪原针叶林，只作意象，不承载数据 */}
        <section id="about" className="about">
          <div className="about-img">
            <img
              src="/about-forest.jpg"
              alt={t('晨光中的雪原针叶林')}
              loading="lazy"
              onError={(e) => e.currentTarget.parentElement?.classList.add('img-failed')}
            />
          </div>
          <div className="wrap about-in rv">
            <span className="eyebrow">About</span>
            <h2 className="sec-title" style={{ marginTop: 14 }}>
              {t('根深，则链远')}
            </h2>
            <p className="sec-desc">
              {t('三棵树是 3Tree 的名字来源：根、干、冠。根是私钥，干是协议，冠是你在其上生长的一切。')}
            </p>
            <ul className="roots">
              {ROOTS.map((r) => (
                <li key={r.k}>
                  <b>{t(r.k)}</b>
                  <span>{t(r.v)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* SECTION: footer */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-about">
              <a className="brand" href="#top">
                <LogoBox />
                <span className="brand-txt">
                  3Tree
                  <small>PROTECTING WEB3 ASSETS</small>
                </span>
              </a>
              <p>{t('Secure Roots, Boundless Chains. 开源透明，保护你的 Web3 资产：私钥本地加密存储，资产完全自主掌控。')}</p>
            </div>
            <div>
              <h5>{t('产品')}</h5>
              <ul>
                <li>
                  <a href="#download">{t('下载 Android APK')}</a>
                </li>
                <li>
                  <a href="#download">{t('iOS 即将到来')}</a>
                </li>
                <li>
                  <a href="#networks">{t('支持的网络')}</a>
                </li>
                <li>
                  <a href="#verify">{t('安装包校验值')}</a>
                </li>
              </ul>
            </div>
            <div>
              <h5>{t('资源')}</h5>
              <ul>
                <li>
                  <a href={LINKS.docs} target="_blank" rel="noopener noreferrer">
                    {t('使用文档')}
                  </a>
                </li>
                <li>
                  <a href={LINKS.x} target="_blank" rel="noopener noreferrer">
                    X @3treewallet
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5>{t('法律')}</h5>
              <ul>
                <li>
                  <a href={LINKS.terms}>{t('服务条款')}</a>
                </li>
                <li>
                  <a href={LINKS.privacy}>{t('隐私政策')}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="foot-legal">
            <p className="foot-disclaimer">
              {t('重要声明：目前 3Tree 未在任何司法辖区接受监管，也未获得相关监管机构的许可。3Tree 不提供包括但不限于新加坡金融管理局依据《2019 年支付服务法案》所管辖的任何金融及支付服务。')}
            </p>
          </div>
          <div className="foot-bottom">
            <span>© 2026 ThreeTree PTE. LTD. · {t('All rights reserved')}</span>
            <span>v{release.versionName} · OPEN SOURCE, BY DESIGN</span>
          </div>
        </div>
      </footer>

      <div className={`toast${toastShow ? ' show' : ''}`} role="status">
        {toastText}
      </div>
    </>
  );
}

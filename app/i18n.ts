import { useCallback, useEffect, useSyncExternalStore } from 'react';

/* 官网双语：简体中文是源语言（与 App 的 i18n 约定一致 —— key 就是中文原文），
   英文是这份词典。词典缺 key 时回退中文，页面不会出现空串。
   带 {0}/{1} 的句子走 tf()，占位符在两种语言里位置可以不同。 */

export type Lang = 'zh' | 'en';

const STORAGE_KEY = 'lang3tree';

export const EN: Record<string, string> = {
  /* nav */
  '3Tree 首页': '3Tree home',
  网络支持: 'Networks',
  核心能力: 'Capabilities',
  安全机制: 'Security',
  校验公示: 'Verification',
  常见问题: 'FAQ',
  '下载 APK': 'Download',
  '下载 Android APK': 'Download Android APK',
  打开菜单: 'Open menu',
  切换语言: 'Switch language',

  /* hero */
  雪松森林与雪地小径: 'Cedar forest and a snowy path',
  '资产自持，': 'Own your assets,',
  私钥: 'your keys',
  在握: 'in your hands',
  '103 条主网的存储、转账与闪兑集成于同一应用：私钥仅在设备本地加密保存，不上传、不托管，每一笔交易均由您本人签名确认。':
    'Storage, transfers and swaps across 103 mainnets in one app: keys are encrypted on this device only — never uploaded, never custodied — and every transaction is signed by you.',
  '下载 Android APK v{0}': 'Download Android APK v{0}',
  核对校验值: 'Verify checksums',
  'iOS · 即将到来': 'iOS · Coming soon',
  支持主网: 'Mainnets supported',
  '非 EVM 公链': 'Non-EVM chains',
  界面语言: 'UI languages',
  资产托管: 'Assets custodied',
  向下浏览: 'Scroll to explore',

  /* networks */
  覆盖八类链生态: 'Eight chain families, natively supported',
  '各条网络的地址派生、签名算法与费用模型差异显著，3Tree 为每类网络单独实现原生适配，而非简单套用 EVM 方案。16 条 EVM 网络共享统一的交互体验，8 条非 EVM 主链各自遵循原生协议。':
    'Address derivation, signing algorithms and fee models differ sharply across families. 3Tree implements each natively instead of shoehorning everything into EVM: 16 EVM networks share one interaction model, while 8 non-EVM chains follow their native protocols.',
  另有: 'Plus',
  '10 条测试网': '10 testnets',
  '用于开发联调；EVM 网络支持自定义添加。': ' for development; EVM networks can be added manually.',

  /* capabilities */
  六项核心能力: 'Six core capabilities',
  '自持是前提，易用是日常。资产管理、闪兑、收付款、DApp 浏览器与多签金库均在同一应用内完成，无需在多个应用之间迁移私钥。':
    'Self-custody is the premise; ease of use is the daily reality. Asset management, swaps, payments, the DApp browser and the multisig vault all live in one app — no moving keys between apps.',
  密钥仅存储于本地: 'Keys never leave this device',
  '助记词与私钥在本机加密存储，不上传、不托管、不代签。您需要妥善备份的是助记词，而不是把密码交给任何人。':
    'Mnemonics and private keys are encrypted and stored on this device. Nothing is uploaded, custodied or signed on your behalf. What you must back up is the mnemonic — never hand a password to anyone.',
  一套助记词派生全部链地址: 'One mnemonic derives every chain address',
  '多钱包管理与批量子地址（单次最多 100 个）': 'Multi-wallet management and batch sub-addresses (up to 100 at a time)',
  导出与备份均提供明确的风险提示: 'Export and backup flows carry explicit risk warnings',
  '资产总览，分链核算': 'One portfolio, per-chain accounting',
  '主链币、代币与 NFT 集中于同一界面，切换网络即切换余额、历史与计价口径，各链数据独立核算。':
    'Native coins, tokens and NFTs share one interface; switching networks switches balances, history and pricing basis, with each chain accounted separately.',
  '代币管理与自定义添加（按链校验地址格式）': 'Token management with custom additions (address format validated per chain)',
  交易记录查询与区块浏览器跳转: 'Transaction history with block-explorer links',
  总资产估值随当前网络切换: 'Total valuation follows the active network',
  闪兑与行情: 'Swaps and market data',
  '内置聚合报价与行情榜单，下单前即可查看路由、滑点与预计到账数量；对报价不满意时可切换其他聚合源。':
    "Built-in aggregated quotes and market rankings: routing, slippage and expected output are shown before you commit; switch aggregators if a quote doesn't satisfy you.",
  多家聚合器报价横向对比: 'Side-by-side quotes from multiple aggregators',
  滑点与到期时间可自定义: 'Adjustable slippage and quote expiry',
  热门币种与行情同屏查看: 'Trending coins and market data on one screen',
  收付款与费率: 'Payments and fees',
  '支持扫码收付、地址簿与批量转账；转账前实时估算费用。TRON 用户可一键跳转能量与带宽租赁，显著降低 TRC-20 单笔成本。':
    'Scan-to-pay, address book and batch transfers; fees are estimated in real time before broadcast. TRON users can jump to energy & bandwidth rental to cut TRC-20 costs sharply.',
  '转账费率实时估算，广播前可见': 'Transfer fees estimated live, visible before broadcast',
  'TRON 能量与带宽租赁入口': 'One-tap TRON energy & bandwidth rental',
  '批量转账逐笔估价、签名与广播': 'Batch transfers priced, signed and broadcast per item',
  'DApp 浏览器': 'DApp browser',
  '内置浏览器连接链上应用，每次连接与每条签名请求均需逐笔确认，会话权限可随时撤销。':
    'The built-in browser connects to on-chain apps; every connection and every signature request needs explicit confirmation, and session permissions can be revoked at any time.',
  连接与签名请求逐项核对: 'Connections and signature requests reviewed item by item',
  '会话可撤销，缓存可清理': 'Sessions revocable, cache clearable',
  内置常用站点与活动页: 'Curated sites and campaign pages built in',
  多签金库: 'Multisig vault',
  '团队与国库可创建链上多签：须经多位签署人共同确认方可执行，提案、确认与撤销的每一步骤均记录在链上。':
    'Teams and treasuries can create on-chain multisigs: execution requires multiple signers, and every proposal, confirmation and revocation is recorded on-chain.',
  '规则由合约保管，而非应用本身': 'Rules live in the contract, not in the app',
  '提案、确认、撤销全流程链上可见': 'Proposals, confirmations and revocations fully on-chain',
  适用于社区金库与公司资金: 'Fits community treasuries and company funds',

  /* security */
  四项底层安全机制: 'Four security foundations',
  '安全机制贯穿使用全程：签名前充分披露交易信息、安装包来源可自主校验、更新链路完整可验、分发渠道唯一。':
    'Security runs through the whole lifecycle: full disclosure before signing, a verifiable install origin, an auditable update path and a single distribution channel.',
  签名前充分知情: 'Full disclosure before signing',
  '费用、滑点、合约地址与收款人信息均在确认页完整列示。无法确认的交易可以拒绝签名 —— 这是自持钱包的最后一道防线。':
    "Fees, slippage, contract addresses and recipients are listed in full on the confirmation screen. Any transaction you can't verify can be refused — the last line of defence for a self-custody wallet.",
  安装来源自校验: 'Install origin self-check',
  '应用启动时自动核对自身包名与签名证书指纹。经重新打包、冒名的仿冒副本无法运行，官方证书指纹固化于代码之中。':
    'On launch the app verifies its own package name and signing-certificate fingerprint. Repackaged or impersonating copies cannot run; the official fingerprint is baked into the code.',
  更新双重校验: 'Double-checked updates',
  '应用内更新要求 versionCode 严格高于本机版本，并依次校验 APK SHA-256 与签名证书 SHA-256，任一不符即中止安装。':
    'In-app updates require a strictly higher versionCode and verify the APK SHA-256 and the certificate SHA-256 in turn; any mismatch aborts the install.',
  公示与校验同源: 'One source of truth for checksums',
  '本页公示的两项校验值与应用读取的版本清单由发版流程逐字段比对，二者必须完全一致；任何分叉都将阻止发布。':
    'The two checksums published here and the manifest read by the app are compared field by field in the release pipeline and must match exactly; any fork blocks the release.',

  /* verify */
  核对无误后再安装: 'Verify before you install',
  '以下两项校验值与应用内更新所读取的完全同源：客户端据此判定安装包真伪，您据此确认下载文件未被替换。':
    'The two checksums below come from the same source as the manifest the app reads for updates: the client uses them to judge authenticity, you use them to confirm the file was not swapped.',
  复制校验值: 'Copy checksum',
  '签名证书 SHA-256': 'Certificate SHA-256',
  版本: 'Version',
  安装包: 'Package',
  体积: 'Size',
  '见 version.json': 'See version.json',
  分发主机: 'Distribution host',
  系统要求: 'Requirements',
  'Android 8.0 及以上': 'Android 8.0 or later',
  复制校验命令: 'Copy verify command',
  已复制到剪贴板: 'Copied to clipboard',
  '复制失败，请手动选择文本': 'Copy failed — please select the text manually',
  '机器可读的版本清单位于 version.json，应用内更新读取的即为该文件。':
    'The machine-readable manifest lives in version.json — the exact file the in-app updater reads.',

  /* download */
  下载与安装: 'Download & install',
  '官网直连官方分发节点，所下载的安装包与应用内更新校验的文件完全一致。':
    'The site links straight to the official distribution node; the package you download here is byte-identical to the one the in-app updater verifies.',
  'Android 版': 'Android',
  'Android 8.0+ · 官方签名 APK · 应用内自动检查更新':
    'Android 8.0+ · officially signed APK · automatic in-app updates',
  '下载 v{0}': 'Download v{0}',
  'iOS 版': 'iOS',
  '即将到来 · Coming Soon': 'Coming soon',
  '适配进行中。任何以「iOS 描述文件」或「测试邀请」名义提供的安装方式均非官方渠道，请勿安装。':
    'Adaptation in progress. Any install offered as an "iOS profile" or "test invitation" is not an official channel — do not install it.',
  '下载并打开 APK；系统询问安装权限时，先核对 SHA-256 校验值，再允许本次安装。':
    'Download and open the APK; when the system asks for install permission, check the SHA-256 checksum first, then allow this install.',
  '创建新钱包，或导入已有的助记词与私钥。': 'Create a new wallet, or import an existing mnemonic or private key.',
  '立即离线备份助记词。它是恢复资产的唯一途径，3Tree 无法协助找回。':
    'Back up the mnemonic offline right away. It is the only way to recover assets — 3Tree cannot retrieve it for you.',
  唯一官方入口: 'The only official channels',
  '官方渠道仅限本站 3tree.xyz 与分发节点 su.3tree.xyz。应用市场镜像、网盘链接或群组转发的安装包均非官方发布；仿冒钱包可能导致资产直接被盗，后果不可逆。':
    'Official channels are limited to this site (3tree.xyz) and the distribution node (su.3tree.xyz). App-store mirrors, cloud-drive links or installers forwarded in groups are not official releases; a counterfeit wallet can steal assets irreversibly.',

  /* connect */
  支持与联系: 'Support & contact',
  '更新日志、功能说明与常见问题均发布于文档站；产品反馈与重要公告请关注 X。官方不会主动私信，也不会以任何理由索取助记词。':
    'Changelogs, feature docs and the FAQ live on the docs site; product feedback and announcements go out on X. The team never messages first and never asks for your mnemonic, for any reason.',
  使用文档: 'Documentation',
  'X（Twitter）': 'X (Twitter)',
  邮件联系: 'Email',

  /* faq */
  '以下为咨询频率最高的六个问题。若任何表述存在疑问，建议确认清楚后再转入资产 —— 自持的前提是您已完全理解。':
    "The six questions we're asked most. If anything is unclear, get it clarified before moving assets in — self-custody presumes you fully understand.",
  '私钥与助记词存储在何处？': 'Where are my keys and mnemonic stored?',
  '仅存储于您本机的加密存储区域。官网与应用均不设账户、不上传助记词、不托管资产。任何以「找回助记词」「KYC 验证」「空投授权」为理由索取助记词的行为，均为诈骗。':
    'Only in the encrypted storage area on your device. Neither the site nor the app has accounts, uploads mnemonics or custodies assets. Anyone asking for your mnemonic to "recover your wallet", "complete KYC" or "claim an airdrop" is running a scam.',
  '如何确认下载的 APK 为官方原版？': 'How do I confirm the APK is the official build?',
  '下载后在终端执行 {0}，将输出结果与本页公示的 APK SHA-256 比对；再比对签名证书 SHA-256，确认安装包由官方密钥签名。两项均一致后，方可继续安装。':
    'After downloading, run {0} in a terminal and compare the output with the APK SHA-256 published on this page; then compare the certificate SHA-256 to confirm the package was signed with the official key. Only proceed when both match.',
  'iOS 版何时发布？': 'When does iOS ship?',
  '即将到来。在此之前，任何声称「iOS 内测」「描述文件」「测试邀请」的渠道均非官方渠道 —— 官方 iOS 版的发布仅有一次，即正式发布。':
    'Coming soon. Until then, any channel claiming an "iOS beta", "profile" or "test invitation" is unofficial — the official iOS release will happen exactly once, as a public launch.',
  '新版本会主动提醒吗？': 'Will I be notified about new versions?',
  '会。应用启动时与「我的 - 检查更新」入口均会读取版本清单；检测到新版本时将展示更新说明并直接下载，下载完成后先校验安装包再发起安装，全程无需前往其他渠道重新安装。':
    'Yes. The app checks the manifest on launch and via "Me → Check for updates"; when a new version is found it shows release notes and downloads directly, verifying the package before installing — no side-loading from other channels needed.',
  '支持哪些网络？': 'Which networks are supported?',
  '24 条主网开箱即用，另有 10 条测试网用于开发联调，EVM 网络支持自定义添加；全部主网均可查看余额与历史并完成发送。':
    '24 mainnets work out of the box, plus 10 testnets for development; EVM networks can be added manually. Balances, history and sending are available on every mainnet.',
  '手机丢失后，资产能否找回？': 'If I lose my phone, can I recover my assets?',
  '可以，前提是您已离线备份助记词 —— 使用任意兼容 BIP39 的钱包导入助记词，即可重新派生全部地址。未备份助记词则无法恢复，这也是我们将备份列为安装第三步的原因。':
    'Yes — provided you backed up the mnemonic offline. Import it into any BIP39-compatible wallet and every address is re-derived. Without a backup there is no recovery, which is why backup is step three of installation.',
  '还有疑问？完整的产品说明与操作步骤都在帮助文档里。':
    'Still have questions? Full product guides and step-by-step instructions live in the help docs.',
  前往帮助文档: 'Open the help docs',

  /* inside-the-app module */
  应用内一览: 'App tour',
  '三个最常用的界面：资产总览、闪兑下单与 DApp 连接确认，共用同一套设计语言。':
    "The three screens you'll live in — portfolio overview, swap ordering and DApp connection approval — share one design language.",
  资产总览: 'Portfolio',
  '主链币、代币与 NFT 同屏，切换网络即切换口径': 'Coins, tokens and NFTs on one screen; switching networks switches the basis',
  闪兑下单: 'Swap',
  '路由、滑点与预计到账在下单前可见': 'Routing, slippage and expected output before you commit',
  'DApp 连接确认': 'DApp approval',
  '每一笔签名请求逐条列示，可拒绝': 'Every signature request itemised — and refuseable',

  /* about band */
  '根深，则链远': 'Deep roots, boundless chains',
  '三棵树是 3Tree 的名字来源：根、干、冠。根是私钥，干是协议，冠是你在其上生长的一切。':
    'Three trees give 3Tree its name: root, trunk, crown. The root is your key, the trunk the protocol, the crown everything you grow on top.',
  晨光中的雪原针叶林: 'Snowy conifer forest at first light',
  '根 · 私钥': 'Root — your keys',
  '助记词与私钥只存在于这台设备，离线也能签名。':
    'The mnemonic and the keys exist only on this device — signing works offline.',
  '干 · 协议': 'Trunk — the protocols',
  '103 条主网各自原生适配，签名与费用模型互不套用。':
    '103 mainnets adapted natively; signing and fee models are never cross-applied.',
  '冠 · 资产': 'Crown — your assets',
  '余额、代币、NFT 与合约权限，都长在你自己手里。':
    'Balances, tokens, NFTs and contract permissions all grow in your own hands.',

  /* footer */
  'Secure Roots, Boundless Chains. 开源透明，保护你的 Web3 资产：私钥本地加密存储，资产完全自主掌控。':
    'Secure Roots, Boundless Chains. Open Source & Transparent, protecting your Web3 assets: keys encrypted locally, assets entirely under your control.',
  产品: 'Product',
  资源: 'Resources',
  'iOS 即将到来': 'iOS coming soon',
  支持的网络: 'Supported networks',
  安装包校验值: 'Package checksums',
  '© 2026 3Tree · 本站不托管资产、不索取助记词、不提供投资建议。':
    '© 2026 3Tree · This site custodies no assets, never asks for mnemonics and gives no investment advice.',

  /* ── docs: nav & UI ── */
  帮助中心: 'Help Center',
  官网首页: 'Home',
  '搜索文档…': 'Search docs…',
  未找到匹配的文档内容: 'No matching documentation found',
  请尝试其他关键词: 'Please try different keywords',
  联系我们: 'Contact Us',
  '如有问题或建议，欢迎通过以下渠道联系我们': 'If you have any questions or suggestions, feel free to contact us through the following channels',
  邮箱: 'Email',

  /* ── docs: sidebar ── */
  入门: 'Getting Started',
  功能: 'Features',
  参考: 'Reference',
  快速开始: 'Getting Started',
  钱包管理: 'Wallet Management',
  资产管理: 'Asset Management',
  闪兑: 'Flash Swap',
  跨链桥: 'Cross-Chain Bridge',
  子地址: 'Sub-Addresses',
  个人中心: 'Profile & Settings',
  术语表: 'Glossary',
  合约地址: 'Contract Addresses',

  /* ── docs: section titles & descriptions ── */
  '从下载安装到完成第一笔交易，只需三步即可开始使用 3Tree 钱包。':
    'From downloading the app to completing your first transaction — get started with 3Tree in three steps.',
  '了解如何创建、导入和管理多个钱包，以及子地址的派生机制。':
    'Learn how to create, import and manage multiple wallets, and how sub-addresses are derived.',
  '查看余额、管理代币、收发资产与查询交易历史。':
    'View balances, manage tokens, send and receive assets, and check transaction history.',
  '在同一链上快速兑换不同代币，多家聚合器比价，下单前可查看完整路由信息。':
    'Quickly swap between tokens on the same chain with aggregated quotes from multiple providers; review the full routing before you commit.',
  '将资产从一条链转移到另一条链，自动选择最优桥接路径。':
    'Transfer assets from one chain to another with automatically selected bridge routes.',
  '从同一组助记词派生多个独立地址，用于资产隔离与隐私管理。':
    'Derive multiple independent addresses from the same mnemonic for asset isolation and privacy.',
  '创建和管理链上多签金库，多人在场方可执行交易，适用于团队资金与社区国库。':
    'Create and manage on-chain multi-sig vaults — transactions require multiple signers, ideal for team treasuries and community funds.',
  '内置浏览器连接链上应用，支持 EIP-1193 Provider 与 TronWeb 注入。':
    'Built-in browser connecting to on-chain apps, with EIP-1193 Provider and TronWeb injection.',
  '网络管理、授权管理、安全设置与检查更新等配置入口。':
    'Network management, approval management, security settings and update checks.',
  '3Tree 的四项底层安全设计：签名前充分知情、安装来源自校验、更新双重校验、公示与校验同源。':
    "3Tree's four security foundations: full disclosure before signing, install origin self-check, double-checked updates, and one source of truth for checksums.",
  '3Tree 支持 103 条主网和 10 条测试网，覆盖 8 类链生态。':
    '3Tree supports 103 mainnets and 10 testnets, covering 8 chain families.',
  '加密货币与区块链常用术语速查。':
    'Quick reference for common cryptocurrency and blockchain terminology.',
  '3Tree 闪兑与跨链功能涉及的聚合器合约地址，以及多签金库合约地址。':
    'Aggregator contract addresses used by 3Tree swap and bridge, plus the multi-sig vault contract.',

  /* ── docs: getting-started ── */
  '3Tree 目前提供 Android 版本（APK），要求 Android 8.0 及以上。请仅从官方渠道下载：<strong>3tree.xyz</strong> 或分发节点 <strong>su.3tree.xyz</strong>。任何应用市场镜像、网盘链接或群组转发的安装包均非官方发布。':
    '3Tree currently offers an Android APK requiring Android 8.0 or later. Download only from official channels: <strong>3tree.xyz</strong> or the distribution node <strong>su.3tree.xyz</strong>. App-store mirrors, cloud-drive links or installers forwarded in groups are not official.',
  '⚠️ 任何以「找回助记词」「KYC 验证」「空投授权」为理由索取助记词的行为，均为诈骗。3Tree 团队永远不会主动联系您索取任何信息。':
    '⚠️ Anyone asking for your mnemonic to "recover your wallet", "complete KYC" or "claim an airdrop" is running a scam. The 3Tree team will never contact you unsolicited to ask for anything.',
  '界面概览': 'Interface overview',
  '3Tree 的主界面分为三个核心 Tab：<strong>资产</strong>（查看余额、代币与 NFT）、<strong>探索 / DApp</strong>（浏览链上应用与活动页）、<strong>我的</strong>（设置、安全与钱包管理）。顶部可快速切换当前网络，底部导航栏在各功能间切换。':
    'The main interface has three core tabs: <strong>Assets</strong> (balances, tokens & NFTs), <strong>Explore / DApp</strong> (on-chain apps & campaigns), and <strong>Me</strong> (settings, security & wallet management). Switch networks at the top; navigate between features via the bottom bar.',

  /* ── docs: steps (getting-started) ── */
  '下载安装包': 'Download the APK',
  '前往 3tree.xyz 下载最新 APK，在终端执行 shasum -a 256 核对 SHA-256 校验值，确认与官网公示一致后再安装。':
    'Go to 3tree.xyz to download the latest APK. Run shasum -a 256 in a terminal and compare the output with the checksums published on the site before installing.',
  '创建或导入钱包': 'Create or import a wallet',
  '打开应用后选择「创建新钱包」生成一组新助记词；或选择「导入钱包」，通过助记词、私钥或 Keystore 导入已有钱包。':
    'After opening the app, tap "Create new wallet" to generate a fresh mnemonic; or tap "Import wallet" to bring in an existing mnemonic, private key or Keystore.',
  '备份助记词': 'Back up the mnemonic',
  '立即将助记词抄写到纸上并离线保存。助记词是恢复资产的唯一途径，3Tree 无法协助找回。':
    'Write down the mnemonic on paper and store it offline immediately. The mnemonic is the only way to recover assets — 3Tree cannot retrieve it for you.',

  /* ── docs: wallet ── */
  '创建新钱包': 'Creating a new wallet',
  '选择「创建新钱包」后，应用会生成一组 12 个单词的助记词（遵循 BIP39 标准）。请务必在离线环境下将助记词抄写到纸上，至少保存两份副本于不同位置。':
    'After tapping "Create new wallet", the app generates a 12-word mnemonic (BIP39 standard). Write it down on paper in an offline environment and keep at least two copies in separate locations.',
  '💡 助记词等同于钱包的「主密钥」。任何人拿到您的助记词，即可完全控制该钱包下的所有资产。':
    '💡 The mnemonic is the master key to your wallet. Anyone who has it can fully control all assets under that wallet.',
  '导入钱包': 'Importing a wallet',
  '3Tree 支持三种方式导入已有钱包：': '3Tree supports three import methods:',
  '<strong>助记词导入</strong>：输入 12 或 24 个单词的助记词短语，自动派生全部链地址。这是最推荐的导入方式。':
    '<strong>Mnemonic import</strong>: Enter a 12- or 24-word mnemonic phrase; all chain addresses are derived automatically. This is the recommended method.',
  '<strong>私钥导入</strong>：输入单条链的私钥（如以太坊的 0x… 格式私钥或 TRON 的 hex 格式私钥），仅导入该链的地址。':
    '<strong>Private key import</strong>: Enter a single chain\'s private key (e.g. Ethereum 0x… format or TRON hex format); only that chain\'s address is imported.',
  '<strong>Keystore 导入</strong>：导入 JSON 格式的 Keystore 文件并输入对应密码。':
    '<strong>Keystore import</strong>: Import a JSON Keystore file and enter the corresponding password.',
  '多钱包管理': 'Multi-wallet management',
  '3Tree 支持创建多个独立钱包。每个钱包拥有独立的助记词和地址体系。在首页点击钱包名称可切换钱包，也可进入「选择钱包与地址」页面统一管理所有钱包。':
    '3Tree supports multiple independent wallets, each with its own mnemonic and address scheme. Tap the wallet name on the home screen to switch, or go to the wallet selection page to manage all wallets.',
  '每个助记词钱包支持派生最多 50 个子地址。子地址共享同一组助记词，但拥有不同的链上地址，适合用于资产隔离或隐私管理。':
    'Each mnemonic wallet supports up to 50 sub-addresses. Sub-addresses share the same mnemonic but have different on-chain addresses — useful for asset isolation and privacy.',
  'EVM 链子地址派生路径：m/44\'/60\'/0\'/0/n': 'EVM sub-address derivation path: m/44\'/60\'/0\'/0/n',
  'TRON 链子地址派生路径：m/44\'/195\'/0\'/0/n': 'TRON sub-address derivation path: m/44\'/195\'/0\'/0/n',
  '仅助记词钱包支持子地址派生，私钥 / Keystore 导入的钱包不支持': 'Only mnemonic wallets support sub-address derivation; private key / Keystore imports do not',
  '在「选择钱包与地址」页可逐个添加或批量添加（单次最多 100 个）': 'Add sub-addresses one by one or in batch (up to 100 at a time) on the wallet selection page',
  '钱包设置': 'Wallet settings',
  '在当前钱包组底部可进入「钱包设置」，支持重命名钱包、查看助记词（需生物识别验证）、导出私钥等操作。':
    'Tap the settings button at the bottom of the current wallet group to rename the wallet, view the mnemonic (biometric auth required), export private keys, and more.',

  /* ── docs: asset ── */
  '首页展示当前网络下的主链币余额、代币列表与 NFT 集合。切换网络即切换余额、历史与计价口径，各链数据独立核算。总资产估值会随当前网络自动更新。':
    'The home screen shows native coin balance, token list and NFT collection for the current network. Switching networks switches balances, history and pricing — each chain is accounted separately. Total valuation updates automatically.',
  '代币管理': 'Token management',
  '点击「管理代币」可查看当前链的代币列表，支持添加自定义代币。添加时需输入合约地址，应用会按链校验地址格式（EVM 为 0x… 开头，TRON 为 T… 开头）。':
    'Tap "Manage tokens" to view the token list for the current chain and add custom tokens. You\'ll need to enter the contract address; the app validates the format per chain (EVM: 0x…, TRON: T…).',
  '收款': 'Receiving',
  '点击「收款」展示当前网络的地址二维码，可复制地址或分享二维码给付款方。不同网络的地址格式不同，请确认收款网络后再分享。':
    'Tap "Receive" to display a QR code of your address on the current network. You can copy the address or share the QR code. Address formats differ across networks — confirm the network before sharing.',
  '转账': 'Sending',
  '点击「转账」后输入收款地址、选择代币并填写金额。应用会实时估算手续费，广播前可在确认页完整查看费用、收款人信息与 calldata。':
    'Tap "Send", enter the recipient address, select a token and enter the amount. Fees are estimated in real time; the confirmation page shows fees, recipient details and calldata before broadcast.',
  '支持扫码收款 / 付款（扫描对方地址二维码）': 'Scan-to-pay (scan the recipient\'s QR code)',
  '支持地址簿：常用地址可保存备注，免去每次粘贴': 'Address book: save notes for frequent addresses',
  '支持批量转账：逐笔估价、签名与广播': 'Batch transfers: priced, signed and broadcast per item',
  'TRON 用户可在转账页一键跳转能量与带宽租赁，显著降低 TRC-20 单笔成本': 'TRON users can jump to energy & bandwidth rental from the send page to cut TRC-20 costs sharply',
  '交易历史': 'Transaction history',
  '在资产详情页可查看当前代币的交易记录。每笔交易均可跳转至对应的区块浏览器查看详情。交易列表按时间倒序排列，混合本地记录与链上历史。':
    'View transaction records for the current token on the asset detail page. Each transaction links to the corresponding block explorer. The list is sorted by time (newest first), combining local records and on-chain history.',

  /* ── docs: swap ── */
  '什么是闪兑': 'What is a flash swap',
  '闪兑（Swap）是指在同一条链上将一种代币兑换为另一种代币。例如在 Ethereum 上将 ETH 兑换为 USDC，或在 BNB Chain 上将 BNB 兑换为 BUSD。闪兑不涉及跨链操作，资产始终在同一链上。':
    'A flash swap exchanges one token for another on the same chain — e.g. ETH → USDC on Ethereum or BNB → BUSD on BNB Chain. No cross-chain transfer is involved; assets stay on the same chain.',
  '聚合器报价': 'Aggregator quotes',
  '3Tree 集成了两家闪兑聚合器，自动比价并选择最优报价：': '3Tree integrates two swap aggregators and automatically picks the best quote:',
  '<strong>LI.FI</strong>：跨链与同链闪兑均支持，路由覆盖主流 DEX': '<strong>LI.FI</strong>: supports both cross-chain and same-chain swaps, routing through major DEXes',
  '<strong>KyberSwap</strong>：仅支持同链闪兑，作为第二比价源提供竞争报价': '<strong>KyberSwap</strong>: same-chain swaps only, providing competitive second-source quotes',
  '💡 当两家聚合器都返回报价时，应用会自动选择到账量更优的那一个。您也可以在报价详情中手动切换聚合源。':
    '💡 When both aggregators return quotes, the app automatically selects the one with the better output. You can also switch sources manually in the quote details.',
  '滑点设置': 'Slippage settings',
  '滑点是指交易执行时价格可能偏离报价的幅度。在闪兑页点击右上角设置图标，可自定义滑点容忍度（默认 0.5%）和报价到期时间。滑点设置过低可能导致交易失败，过高则可能遭受三明治攻击。':
    'Slippage is the difference between the quoted price and the execution price. Tap the settings icon on the swap page to customize slippage tolerance (default 0.5%) and quote expiry. Too low may cause failures; too high may expose you to sandwich attacks.',
  '使用步骤': 'Steps',
  '选择代币对': 'Select the token pair',
  '在闪兑页选择源代币（From）和目标代币（To），可点击切换按钮互换方向。': 'On the swap page, select the source token (From) and target token (To). Tap the swap button to reverse direction.',
  '输入金额': 'Enter the amount',
  '输入要兑换的源代币数量，应用会实时显示预计到账量和汇率。': 'Enter the amount of source tokens to swap; the app shows the estimated output and exchange rate in real time.',
  '查看报价详情': 'Review quote details',
  '展开报价详情可查看路由路径、聚合源、滑点和手续费估算。': 'Expand the quote details to see the routing path, aggregator source, slippage and fee estimate.',
  '确认并签名': 'Confirm and sign',
  '首次兑换某代币时需要先进行 ERC-20 授权（Approve），之后再执行兑换交易。每步均需生物识别或密码确认。':
    'The first time you swap a particular token, an ERC-20 approval is required first, followed by the swap transaction. Each step requires biometric or password confirmation.',
  '⚠️ 闪兑仅支持有内置代币定义的链（如 ETH、BSC、TRX 等主网），自定义 EVM 网络无法使用闪兑功能。':
    '⚠️ Flash swap only supports chains with built-in token definitions (e.g. ETH, BSC, TRX mainnets). Custom EVM networks cannot use the swap feature.',

  /* ── docs: bridge ── */
  '什么是跨链桥': 'What is a cross-chain bridge',
  '跨链桥（Bridge）是将资产从一条区块链转移到另一条区块链的方式。例如将 Ethereum 上的 ETH 转移到 Arbitrum，或将 BNB Chain 上的 USDT 转移到 TRON。跨链操作涉及两条不同的链，需要通过桥接协议完成。':
    'A cross-chain bridge transfers assets from one blockchain to another — e.g. ETH from Ethereum to Arbitrum, or USDT from BNB Chain to TRON. Cross-chain operations involve two different chains and require a bridge protocol.',
  '桥接路由': 'Bridge routing',
  '3Tree 的跨链能力由以下聚合器承担：': '3Tree\'s cross-chain capability is provided by:',
  '<strong>LI.FI</strong>：承担 EVM 链之间的跨链桥接（如 ETH ↔ BSC ↔ Arbitrum ↔ Base 等）':
    '<strong>LI.FI</strong>: handles cross-chain bridging between EVM chains (e.g. ETH ↔ BSC ↔ Arbitrum ↔ Base)',
  '<strong>deBridge</strong>：承担涉及 TRON 的跨链桥接（如 ETH ↔ TRON、BSC ↔ TRON）':
    '<strong>deBridge</strong>: handles cross-chain bridging involving TRON (e.g. ETH ↔ TRON, BSC ↔ TRON)',
  '💡 当您在闪兑页选择的 From 和 To 分属不同链时，应用会自动切换到跨链模式。此时 KyberSwap 会被置灰（它仅支持同链），跨链报价由 LI.FI 或 deBridge 提供。':
    '💡 When the From and To tokens are on different chains, the app automatically switches to cross-chain mode. KyberSwap is greyed out (same-chain only); bridge quotes come from LI.FI or deBridge.',
  '选择不同链': 'Select different chains',
  '在闪兑页将 From 和 To 切换到不同的链（如 From 选 Ethereum，To 选 Arbitrum），页面自动进入跨链模式。':
    'On the swap page, set From and To to different chains (e.g. From = Ethereum, To = Arbitrum). The page enters cross-chain mode automatically.',
  '查看桥接报价': 'Review bridge quotes',
  '应用会显示桥接路径、预计到账时间、手续费和桥接协议。不同路径的时间和费用可能差异较大。':
    'The app shows the bridge path, estimated arrival time, fees and bridge protocol. Times and costs can vary significantly across paths.',
  '确认交易详情后签名。跨链交易通常需要更长的等待时间（几分钟到几十分钟不等），请耐心等待。':
    'Review the transaction details and sign. Cross-chain transactions usually take longer (minutes to tens of minutes) — please be patient.',
  '⚠️ 跨链交易一旦发起不可撤回。请仔细核对目标链和收款地址，确保选择正确的网络。':
    '⚠️ Cross-chain transactions cannot be reversed once initiated. Double-check the target chain and recipient address.',

  /* ── docs: subaddr ── */
  '什么是子地址': 'What are sub-addresses',
  '子地址（Sub-address）是从同一组助记词通过不同派生路径生成的独立地址。每个子地址在链上表现为完全不同的账户，拥有独立的余额和交易历史，但它们都受同一组助记词控制。':
    'A sub-address is an independent address derived from the same mnemonic via a different derivation path. Each sub-address appears as a completely separate account on-chain with its own balance and history, but all are controlled by the same mnemonic.',
  '使用场景': 'Use cases',
  '<strong>资产隔离</strong>：将长期持有的资产与日常交易资产分开存放': '<strong>Asset isolation</strong>: separate long-term holdings from daily trading funds',
  '<strong>隐私保护</strong>：不同场景使用不同地址收款，避免地址关联': '<strong>Privacy</strong>: use different addresses for different scenarios to avoid linkage',
  '<strong>多身份管理</strong>：在同一钱包中管理不同用途的资金': '<strong>Multi-identity</strong>: manage funds for different purposes within one wallet',
  '添加子地址': 'Adding sub-addresses',
  '在「选择钱包与地址」页面，每组助记词底部有三个操作：': 'At the bottom of each mnemonic group on the wallet selection page, there are three actions:',
  '<strong>添加子地址</strong>：逐个派生新的子地址': '<strong>Add sub-address</strong>: derive new sub-addresses one by one',
  '<strong>批量添加</strong>：一次性派生多个子地址（通过 BatchSubWalletSheet 弹层设置数量，支持全屏生成动画）':
    '<strong>Batch add</strong>: derive multiple sub-addresses at once (set quantity via the batch sheet, with a full-screen generation animation)',
  '<strong>钱包设置</strong>：进入当前钱包的设置页': '<strong>Wallet settings</strong>: enter the current wallet\'s settings page',
  '💡 批量添加功能可精确落到被点击的那组钱包，不会误将地址派生到其他钱包组。每个钱包最多支持 50 个子地址。':
    '💡 Batch add targets the exact wallet group you tapped — addresses won\'t be derived into the wrong group. Each wallet supports up to 50 sub-addresses.',

  /* ── docs: multisig ── */
  '什么是多签金库': 'What is a multi-sig vault',
  '多签金库（Multi-Sig Vault）是一种智能合约钱包，要求多个人共同签名才能执行交易。例如一个 3-of-5 的多签金库有 5 个成员，任何交易必须至少 3 个人确认后才能执行。多签金库的规则由链上合约保管，而非应用本身。':
    'A multi-sig vault is a smart-contract wallet requiring multiple signers to execute transactions. For example, a 3-of-5 vault has 5 members and any transaction needs at least 3 confirmations. Rules are enforced by the on-chain contract, not the app.',
  '创建金库': 'Creating a vault',
  '在「多签金库」页面点击「创建金库」，选择链（支持所有 EVM 链），设置成员地址列表和签名阈值（threshold）。部署交易需要一笔 gas 费。':
    'On the multi-sig page, tap "Create vault", select a chain (any EVM chain), set the member address list and signature threshold. Deployment requires a gas fee.',
  '成员数量上限 50 人': 'Up to 50 members',
  '阈值（threshold）表示执行交易所需的最少确认数': 'The threshold is the minimum number of confirmations needed to execute',
  '部署后金库地址上链可查，任何人可通过地址导入': 'After deployment the vault address is on-chain and anyone can import it by address',
  '提案与执行': 'Proposals and execution',
  '金库的每笔交易都以「提案」形式进行。完整流程如下：': 'Every vault transaction is a "proposal". The full workflow:',
  '提交提案': 'Submit a proposal',
  '任一成员发起交易提案，指定目标地址、金额和 calldata。提案提交后上链记录。': 'Any member initiates a transaction proposal specifying the target address, amount and calldata. The proposal is recorded on-chain.',
  '成员确认': 'Member confirmation',
  '其他成员在待决列表中查看提案详情，逐一确认（签名）。确认数达到阈值后即可执行。': 'Other members review the proposal in the pending list and confirm (sign) one by one. Execution is available once confirmations reach the threshold.',
  '执行交易': 'Execute the transaction',
  '任一成员点击「执行」，将交易广播到链上。执行结果（成功或失败）同样记录在链上。': 'Any member taps "Execute" to broadcast the transaction on-chain. The result (success or failure) is also recorded on-chain.',
  '管理操作': 'Management operations',
  '金库成员可以通过提案进行以下管理操作：': 'Vault members can perform these management operations via proposals:',
  '<strong>添加成员</strong>（addOwner）：增加新的签署人': '<strong>Add member</strong> (addOwner): add a new signer',
  '<strong>移除成员</strong>（removeOwner）：移除某个签署人': '<strong>Remove member</strong> (removeOwner): remove a signer',
  '<strong>替换成员</strong>（replaceOwner）：将一个成员替换为另一个地址': '<strong>Replace member</strong> (replaceOwner): swap one member for another address',
  '<strong>修改阈值</strong>（changeRequirement）：调整执行交易所需的最少确认数': '<strong>Change threshold</strong> (changeRequirement): adjust the minimum confirmations needed',
  '<strong>ERC-20 转账</strong>（transfer）：从金库转出 ERC-20 代币': '<strong>ERC-20 transfer</strong> (transfer): send ERC-20 tokens out of the vault',
  '💡 所有管理操作的 calldata selector 均由应用现算（与合约字节码对应），杜绝 UI 字面量抄错导致的盲签风险。':
    '💡 All management operation selectors are computed on the fly (matching the contract bytecode), preventing blind signing from UI typo.',
  '导入金库': 'Importing a vault',
  '如果您知道一个已部署的多签金库地址，可以在「多签金库」页面通过地址导入。应用会自动从链上读取成员列表和阈值信息。同链同地址的金库只保留一条记录，重复导入会更新链上读回的最新信息。':
    'If you know a deployed vault address, import it on the multi-sig page. The app reads the member list and threshold from the chain. Same chain + same address keeps only one record; re-importing updates to the latest on-chain info.',

  /* ── docs: dapp ── */
  '概述': 'Overview',
  '3Tree 内置了一个 WebView 浏览器，可以直接访问链上 DApp（去中心化应用）。浏览器会注入钱包 Provider，使 DApp 能够请求连接、签名和交易——所有请求均需您在原生确认弹层中逐项核对后才会执行。':
    '3Tree has a built-in WebView browser for accessing on-chain DApps. The browser injects a wallet Provider so DApps can request connections, signatures and transactions — all requests go through a native confirmation overlay for you to review item by item.',
  'EVM 链支持': 'EVM chain support',
  '在 EVM 链上，浏览器注入 EIP-1193 兼容的 Provider，支持以下方法：': 'On EVM chains, the browser injects an EIP-1193 compatible Provider supporting:',
  '<strong>eth_requestAccounts</strong>：请求连接钱包，返回当前地址': '<strong>eth_requestAccounts</strong>: request wallet connection, returns current address',
  '<strong>eth_chainId</strong>：返回当前链 ID': '<strong>eth_chainId</strong>: returns the current chain ID',
  '<strong>wallet_switchEthereumChain</strong>：请求切换到指定链': '<strong>wallet_switchEthereumChain</strong>: request switching to a specified chain',
  '<strong>personal_sign</strong>：签名一条消息': '<strong>personal_sign</strong>: sign a message',
  '<strong>eth_signTypedData_v4</strong>：EIP-712 类型化数据签名': '<strong>eth_signTypedData_v4</strong>: EIP-712 typed data signing',
  '<strong>eth_sendTransaction</strong>：发送交易（需原生确认）': '<strong>eth_sendTransaction</strong>: send a transaction (requires native confirmation)',
  '兼容 wagmi、web3-react、RainbowKit 等主流前端栈。同时支持 EIP-6963 多 Provider 发现协议。':
    'Compatible with wagmi, web3-react, RainbowKit and other mainstream frontend stacks. Also supports EIP-6963 multi-Provider discovery.',
  'TRON 链支持': 'TRON chain support',
  '在 TRON 链上，浏览器注入 window.tronWeb 和 window.tronLink 对象，提供地址查询、交易签名等能力。涉及私钥操作的方法（如签名和发送交易）会转回原生确认闸口。':
    'On TRON, the browser injects window.tronWeb and window.tronLink objects for address queries, transaction signing, etc. Methods involving private key operations (signing, sending) are routed back to the native confirmation gate.',
  '安全确认': 'Security confirmation',
  '每次 DApp 请求连接或签名时，3Tree 都会弹出原生确认弹层，完整展示：':
    'Every time a DApp requests connection or signing, 3Tree shows a native confirmation overlay with:',
  '请求来源的 DApp 域名和图标': 'The requesting DApp\'s domain and icon',
  '签名类型（消息签名 / 类型化数据 / 交易）': 'Signature type (message / typed data / transaction)',
  '交易的完整 calldata 解码（如代币转账会显示目标地址和金额）': 'Full calldata decoding (e.g. token transfers show target address and amount)',
  'gas 费用估算': 'Gas fee estimate',
  '您可以逐条核对后选择「确认」或「拒绝」。会话权限可以随时在菜单中撤销。':
    'Review each item and choose "Confirm" or "Reject". Session permissions can be revoked from the menu at any time.',
  '探索页与精选位': 'Explore page and featured banners',
  'DApp 页顶部有精选运营位（由 ops.json 远端清单驱动），展示当前活动与推荐 DApp。下方提供分类浏览（DeFi、NFT、工具等）和最近访问记录。您也可以直接在地址栏输入任意 URL 访问。':
    'The DApp page features curated banners at the top (driven by the remote ops.json manifest) showing current campaigns and recommended DApps. Below: category browsing (DeFi, NFT, Tools, etc.) and recent visits. You can also enter any URL directly.',
  '💡 活动页与普通浏览器页共用同一套 BrowserScreen，但活动模式会隐藏地址栏、按活动清单限制可切换的链，并对清单外的合约地址亮红条告警。':
    '💡 Campaign pages share the same BrowserScreen as regular browser pages, but campaign mode hides the address bar, restricts chain switching to the campaign\'s list, and shows a red warning bar for contracts outside the list.',

  /* ── docs: profile ── */
  '网络管理': 'Network management',
  '在「我的 → 网络管理」中可以查看全部已配置的网络列表，包括 103 条主网、10 条测试网和用户自定义的 EVM 网络。每个网络显示原生币符号和 Chain ID。点击网络可切换为当前活跃网络。':
    'In "Me → Network management" you can view all configured networks: 103 mainnets, 10 testnets and user-added custom EVM networks. Each shows the native symbol and Chain ID. Tap to switch.',
  '自定义 EVM 网络': 'Custom EVM networks',
  '支持手动添加自定义 EVM 网络。添加时需要填写：网络名称、RPC URL、Chain ID 和原生币符号。应用会为自定义网络生成渐变色标。注意：自定义网络无法使用闪兑功能（聚合器不支持）。':
    'You can add custom EVM networks manually. Required fields: network name, RPC URL, Chain ID and native symbol. The app generates a gradient badge for custom networks. Note: custom networks cannot use flash swap (aggregators don\'t support them).',
  '授权管理': 'Approval management',
  '在「我的 → 授权管理」中可以查看和管理 ERC-20 代币的合约授权。当您在 DApp 中进行闪兑或交易时，某些合约会被授权动用您的代币。授权管理页可以按链查看当前所有有效授权，并支持一键撤销。':
    'In "Me → Approval management" you can view and manage ERC-20 token approvals. When you swap or trade via DApps, certain contracts are approved to spend your tokens. The page shows all active approvals per chain with one-click revoke.',
  '⚠️ 定期检查并撤销不再使用的授权是重要的安全习惯。过期的授权可能被恶意合约利用。':
    '⚠️ Regularly reviewing and revoking unused approvals is an important security habit. Stale approvals can be exploited by malicious contracts.',
  '安全设置': 'Security settings',
  '安全设置包括：': 'Security settings include:',
  '<strong>生物识别</strong>：启用指纹 / 面容识别来保护签名操作': '<strong>Biometrics</strong>: enable fingerprint / face recognition for signing operations',
  '<strong>剪贴板清理</strong>：应用退到后台时自动清理剪贴板中的地址，防止剪贴板劫持': '<strong>Clipboard clearing</strong>: automatically clear addresses from clipboard when the app goes to the background',
  '<strong>修改密码</strong>：修改本地加密存储的密码': '<strong>Change password</strong>: change the local encryption storage password',
  '检查更新': 'Check for updates',
  '在「我的 → 检查更新」中手动检查是否有新版本。应用启动时也会自动检查。更新流程要求 versionCode 严格高于本机版本，并依次校验 APK SHA-256 与签名证书 SHA-256，任一不符即中止安装。':
    'In "Me → Check for updates" you can manually check for new versions. The app also checks automatically on launch. The update process requires a strictly higher versionCode and verifies APK SHA-256 and certificate SHA-256 in sequence.',

  /* ── docs: security ── */
  '费用、滑点、合约地址与收款人信息均在确认页完整列示。无法确认的交易可以拒绝签名——这是自持钱包的最后一道防线。多签金库的提案详情同样完整展示 calldata 解码结果。':
    'Fees, slippage, contract addresses and recipient info are fully shown on the confirmation page. Any transaction can be refused — the last line of defence for a self-custody wallet. Multi-sig vault proposals also show full calldata decoding.',
  '应用启动时自动核对自身包名与签名证书指纹。经重新打包、冒名的仿冒副本无法运行。官方证书指纹固化于代码之中，不依赖任何远程配置。':
    'On launch the app verifies its own package name and signing-certificate fingerprint. Repackaged copies cannot run. The official fingerprint is baked into the code with no remote dependency.',
  '应用内更新要求 versionCode 严格高于本机版本，并依次校验 APK SHA-256 与签名证书 SHA-256，任一不符即中止安装。更新来源为唯一的版本清单 version.json，与官网公示同源。':
    'In-app updates require a strictly higher versionCode and verify APK SHA-256 and certificate SHA-256 in sequence; any mismatch aborts the install. Updates come from a single manifest (version.json), the same source as the website.',
  '官网公示的 APK SHA-256 和签名证书 SHA-256 与应用读取的版本清单由发版流程逐字段比对，二者必须完全一致。任何分叉都将阻止发布。':
    'The checksums published on the website and those in the app\'s manifest are compared field by field in the release pipeline and must match exactly. Any fork blocks the release.',
  '密钥存储': 'Key storage',
  '助记词与私钥仅存储在本机的加密存储区域（Android Keystore），不上传、不托管、不代签。3Tree 服务端不持有任何用户密钥，也无法恢复您的助记词。':
    'Mnemonics and private keys are stored only in the device\'s encrypted storage (Android Keystore) — never uploaded, custodied or signed on your behalf. 3Tree\'s servers hold no user keys and cannot recover your mnemonic.',

  /* ── docs: networks ── */
  '主网列表': 'Mainnet list',
  '以下 103 条主网开箱即用，全部支持余额查看、交易历史与发送：':
    'The following 103 mainnets work out of the box, all supporting balance viewing, transaction history and sending:',
  '网络': 'Network',
  '原生币': 'Native coin',
  '类型': 'Type',
  '测试网': 'Testnets',
  '10 条测试网用于开发联调：Ethereum Sepolia、BNB Chain Testnet、Polygon Amoy、Optimism Sepolia、Arbitrum Sepolia、Base Sepolia、Avalanche Fuji、Solana Devnet、Tron Nile 和 Arc Testnet。':
    '10 testnets for development: Ethereum Sepolia, BNB Chain Testnet, Polygon Amoy, Optimism Sepolia, Arbitrum Sepolia, Base Sepolia, Avalanche Fuji, Solana Devnet, Tron Nile and Arc Testnet.',
  'EVM 网络支持自定义添加。在「我的 → 网络管理」中可添加任意 EVM 兼容网络，需填写 RPC URL、Chain ID 和原生币符号。':
    'EVM networks can be added manually. In "Me → Network management" you can add any EVM-compatible network with RPC URL, Chain ID and native symbol.',
  '自定义网络': 'Custom network',

  /* ── docs: glossary ── */
  '基础概念': 'Fundamentals',
  '以下为加密货币领域最常见的术语，了解这些概念有助于更安全地使用钱包。':
    'The most common terms in cryptocurrency — understanding them helps you use wallets more safely.',

  /* ── docs: glossary terms ── */
  '助记词 (Mnemonic)': 'Mnemonic',
  '基础': 'Fundamentals',
  '一组 12 或 24 个英文单词，按 BIP39 标准生成，是钱包的最高权限凭证。任何人拿到助记词即可完全控制对应钱包的全部资产。':
    'A set of 12 or 24 English words generated per the BIP39 standard; the highest-authority credential for a wallet. Anyone with the mnemonic has full control of all assets.',
  '私钥 (Private Key)': 'Private Key',
  '一条随机生成的 256 位数字，用于对交易进行数字签名。每个地址对应一条私钥。助记词可以派生出多条私钥。':
    'A randomly generated 256-bit number used to digitally sign transactions. Each address corresponds to one private key. A mnemonic can derive multiple private keys.',
  '区块链 (Blockchain)': 'Blockchain',
  '一个去中心化的分布式账本，由一系列按时间顺序排列的「区块」组成。每个区块包含一批交易记录，并通过密码学与前一个区块链接。':
    'A decentralized distributed ledger consisting of a series of time-ordered "blocks". Each block contains transaction records and is cryptographically linked to the previous one.',
  'Gas 费': 'Gas Fee',
  '交易': 'Transaction',
  '在区块链上执行交易或合约调用时需要支付的手续费。Gas 费以该链的原生币支付（如 ETH、BNB），费用高低取决于网络拥堵程度和交易复杂度。':
    'The fee paid to execute a transaction or contract call on a blockchain. Gas is paid in the chain\'s native coin (e.g. ETH, BNB); the cost depends on network congestion and transaction complexity.',
  '智能合约 (Smart Contract)': 'Smart Contract',
  '部署在区块链上的程序代码，按照预设规则自动执行。多签金库、DEX、借贷协议等都以智能合约形式运行。':
    'Program code deployed on a blockchain that executes automatically according to predefined rules. Multi-sig vaults, DEXes and lending protocols all run as smart contracts.',
  'DEX (去中心化交易所)': 'DEX',
  'Decentralized Exchange，无需中心化中介即可进行代币兑换的链上协议。常见 DEX 包括 Uniswap、PancakeSwap、Raydium 等。闪兑功能的路由最终会到达 DEX 执行。':
    'Decentralized Exchange — an on-chain protocol for token swaps without a centralized intermediary. Common DEXes include Uniswap, PancakeSwap and Raydium. Flash swap routing ultimately executes on DEXes.',
  '代币标准': 'Token Standard',
  'Ethereum 上最常见的代币标准。定义了代币的转账、授权、余额查询等统一接口。USDT、USDC、UNI 等都是 ERC-20 代币。':
    'The most common token standard on Ethereum. Defines unified interfaces for transfers, approvals and balance queries. USDT, USDC and UNI are all ERC-20 tokens.',
  'TRON 链上的代币标准，功能与 ERC-20 类似。USDT-TRC20 是最常见的跨链稳定币转账格式之一。':
    'The token standard on TRON, functionally similar to ERC-20. USDT-TRC20 is one of the most common formats for cross-chain stablecoin transfers.',
  'NFT (非同质化代币)': 'NFT',
  'Non-Fungible Token，每个代币都是独一无二的，不可互换。常用于数字艺术、游戏道具、会员凭证等场景。':
    'Non-Fungible Token — each token is unique and non-interchangeable. Commonly used for digital art, game items and membership credentials.',
  'DApp (去中心化应用)': 'DApp',
  '应用': 'Application',
  'Decentralized Application，后端逻辑运行在区块链上的应用程序。用户通过钱包（如 3Tree 的内置浏览器）连接 DApp 并进行交互。':
    'Decentralized Application — an app whose backend logic runs on a blockchain. Users connect to DApps through a wallet (e.g. 3Tree\'s built-in browser).',
  '多签 (Multi-Signature)': 'Multisig',
  '安全': 'Security',
  '要求多个私钥中的若干个共同签名才能执行交易的机制。例如 3-of-5 多签需要 5 个成员中至少 3 人确认。常用于团队资金管理。':
    'A mechanism requiring multiple private keys to co-sign before a transaction executes. For example, a 3-of-5 multisig needs at least 3 of 5 members to confirm. Commonly used for team fund management.',
  '跨链桥 (Bridge)': 'Bridge',
  '将资产从一条区块链转移到另一条区块链的协议。跨链桥通过锁定源链资产并在目标链铸造对应资产来实现转移。':
    'A protocol that transfers assets from one blockchain to another. Bridges lock assets on the source chain and mint corresponding assets on the target chain.',
  '滑点 (Slippage)': 'Slippage',
  '交易执行时的实际价格与预期报价之间的偏差。网络拥堵或流动性不足时滑点可能增大。设置合理的滑点容忍度可以避免交易失败或遭受价格损失。':
    'The deviation between the actual execution price and the expected quote. Slippage can increase during network congestion or low liquidity. Setting reasonable slippage tolerance helps avoid failed transactions or price losses.',
  '授权 (Approve)': 'Approval',
  'ERC-20 代币在进行闪兑或 DApp 交互前，需要先「授权」目标合约动用一定数量的代币。授权后该合约可以在不再次确认的情况下转走已授权额度的代币。':
    'Before swapping or interacting with a DApp, ERC-20 tokens must first "approve" a contract to spend a certain amount. After approval, the contract can transfer up to the approved amount without further confirmation.',
  'RPC 节点': 'RPC node',
  '基础设施': 'Infrastructure',
  'Remote Procedure Call 节点，是应用与区块链通信的中间层。应用通过 RPC 节点查询余额、广播交易和读取合约数据。3Tree 为每条链配置了多个公共 RPC 节点。':
    'Remote Procedure Call nodes are the middleware layer between apps and blockchains. Apps use RPC nodes to query balances, broadcast transactions and read contract data. 3Tree configures multiple public RPC nodes per chain.',
  '区块浏览器 (Block Explorer)': 'Block Explorer',
  '用于查看区块链上交易、地址和区块信息的网站。如 Etherscan（以太坊）、BscScan（BNB Chain）、Tronscan（TRON）等。3Tree 中的交易记录均可跳转到对应浏览器查看。':
    'A website for viewing transactions, addresses and blocks on a blockchain. Examples: Etherscan (Ethereum), BscScan (BNB Chain), Tronscan (TRON). Transaction records in 3Tree link directly to the corresponding explorer.',
  'EVM (以太坊虚拟机)': 'EVM',
  'Ethereum Virtual Machine，以太坊的智能合约运行环境。许多其他链（如 BSC、Arbitrum、Base）也兼容 EVM，因此可以复用以太坊的工具和开发框架。':
    'Ethereum Virtual Machine — the smart-contract runtime for Ethereum. Many other chains (BSC, Arbitrum, Base, etc.) are EVM-compatible, reusing Ethereum\'s tools and development frameworks.',
  '自持钱包 (Self-Custody Wallet)': 'Self-Custody Wallet',
  '用户自己保管私钥和助记词的钱包类型。与交易所账户（托管型）不同，自持钱包的资产安全完全由用户自己负责。3Tree 是一款自持钱包。':
    'A wallet type where the user holds their own private keys and mnemonic. Unlike exchange accounts (custodial), self-custody wallets place full responsibility for asset security on the user. 3Tree is a self-custody wallet.',
  '每条 EVM 链的唯一标识数字。例如 Ethereum 主网的 Chain ID 为 1，BNB Chain 为 56。Chain ID 用于防止交易在不同链之间被重放。':
    'A unique identifier number for each EVM chain. For example, Ethereum mainnet\'s Chain ID is 1, BNB Chain\'s is 56. Chain IDs prevent transactions from being replayed across different chains.',
  '一种加密存储私钥的 JSON 文件格式，常见于以太坊生态。导入 Keystore 时需要同时提供对应的密码才能解密出私钥。':
    'A JSON file format for encrypted private key storage, common in the Ethereum ecosystem. Importing a Keystore requires the corresponding password to decrypt the private key.',

  /* ── docs: contracts ── */
  '多签金库合约': 'Multi-sig vault contract',
  '3Tree 多签金库使用部署上链的 MultiSigWallet 合约。每次创建金库时会部署一份新的合约实例，因此没有统一的合约地址。合约源码与 ABI 可在项目文档中查看。':
    '3Tree multi-sig vaults use the on-chain MultiSigWallet contract. Each vault creation deploys a new contract instance, so there is no single contract address. Source code and ABI are available in the project documentation.',
  '聚合器路由': 'Aggregator routing',
  '闪兑与跨链的报价通过聚合器 API 获取，交易路由到各链上的 DEX 流动性池执行。以下是主要聚合器的信息：':
    'Swap and bridge quotes are fetched via aggregator APIs; transactions are routed through DEX liquidity pools on each chain. Key aggregators:',
  '<strong>LI.FI</strong>：同链闪兑 + EVM 跨链桥接，路由覆盖主流 DEX（Uniswap、1inch、Paraswap 等）':
    '<strong>LI.FI</strong>: same-chain swap + EVM cross-chain bridging, routing through major DEXes (Uniswap, 1inch, Paraswap, etc.)',
  '<strong>KyberSwap</strong>：仅同链闪兑，使用 aggregator-api.kyberswap.com 端点':
    '<strong>KyberSwap</strong>: same-chain swaps only, using the aggregator-api.kyberswap.com endpoint',
  '<strong>deBridge</strong>：涉及 TRON 的跨链桥接': '<strong>deBridge</strong>: cross-chain bridging involving TRON',
  '💡 聚合器不会将资产发送到 3Tree 的任何地址。所有交易路由均通过各链上的 DEX 合约执行，您可以在交易详情中查看完整的路由路径和中间合约地址。':
    '💡 Aggregators never send assets to any 3Tree address. All transaction routing executes through DEX contracts on each chain; you can view the full routing path and intermediate contract addresses in the transaction details.',

  /* ── footer: legal & company ── */
  法律: 'Legal',
  服务条款: 'Terms of Service',
  隐私政策: 'Privacy Policy',
  'All rights reserved': 'All rights reserved',
  'ThreeTree PTE. LTD.': 'ThreeTree PTE. LTD.',
  '重要声明：目前 3Tree 未在任何司法辖区接受监管，也未获得相关监管机构的许可。3Tree 不提供包括但不限于新加坡金融管理局依据《2019 年支付服务法案》所管辖的任何金融及支付服务。':
    'Important notice: 3Tree is not currently regulated or licensed by any regulatory authority in any jurisdiction. 3Tree does not provide any financial or payment services including but not limited to those regulated by the Monetary Authority of Singapore under the Payment Services Act 2019.',

  /* ── legal pages: shared ── */
  返回首页: 'Back to Home',
  '最后更新：2024 年 8 月': 'Last updated: August 2024',

  /* ── legal pages: TOS ── */
  '一、定义与接受': '1. Definitions & Acceptance',
  '本服务条款（以下简称"条款"）适用于您使用 3Tree 钱包应用程序（以下简称"应用"或"3Tree"）的所有行为。下载、安装或使用本应用即表示您已阅读、理解并同意受本条款约束。如果您不同意本条款的任何内容，请勿使用本应用。':
    'These Terms of Service (the "Terms") govern your use of the 3Tree wallet application (the "App" or "3Tree"). By downloading, installing, or using the App, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, please do not use the App.',
  '3Tree 由 ThreeTree PTE. LTD.（以下简称"我们"或"公司"）开发与运营。':
    '3Tree is developed and operated by ThreeTree PTE. LTD. ("we" or "the Company").',
  '本条款构成您与公司之间关于 3Tree 使用的具有法律约束力的协议。公司保留随时更新本条款的权利，更新后的条款将在应用内或官网发布后立即生效，无需额外通知。如果您不接受更新后的条款，应立即停止使用 3Tree。继续使用即视为接受修改后的条款。':
    'These Terms constitute a legally binding agreement between you and the Company regarding your use of 3Tree. The Company reserves the right to update these Terms at any time. Updated Terms take effect immediately upon posting in the App or on the website, without additional notice. If you do not accept the updated Terms, you should immediately stop using 3Tree. Continued use constitutes acceptance of the modified Terms.',
  '<strong>如果您未满 18 周岁，或不具备完全民事行为能力，请在父母或法定监护人的指导下使用 3Tree。</strong>':
    '<strong>If you are under 18 years of age or lack full legal capacity, please use 3Tree under the guidance of a parent or legal guardian.</strong>',
  '二、服务性质与范围': '2. Nature & Scope of Services',
  '<strong>3Tree 是一款非托管（self-custody）加密货币钱包。</strong>这意味着：':
    '<strong>3Tree is a self-custody cryptocurrency wallet.</strong> This means:',
  '您的私钥和助记词仅在您的设备上本地加密存储，我们从不上传、存储或访问您的私钥、助记词或任何敏感信息。':
    'Your private keys and mnemonic are encrypted and stored locally on your device only. We never upload, store, or access your private keys, mnemonic, or any sensitive information.',
  '我们不托管您的资产，不对您的资产安全承担保管责任。资产安全完全由您自行负责。':
    'We do not custody your assets and bear no responsibility for their safekeeping. Asset security is entirely your responsibility.',
  '我们不控制您的交易，无法冻结、逆转或干预任何链上操作。':
    'We do not control your transactions and cannot freeze, reverse, or interfere with any on-chain operations.',
  '我们不提供任何金融、投资或交易建议。':
    'We do not provide any financial, investment, or trading advice.',
  '2.1 具体服务功能': '2.1 Specific Service Functions',
  '<strong>创建或导入钱包：</strong>使用 3Tree 生成新钱包或导入兼容的第三方钱包。':
    '<strong>Create or Import Wallets:</strong> Use 3Tree to generate new wallets or import compatible third-party wallets.',
  '<strong>转账与收款：</strong>使用私钥对交易进行电子签名，在相应区块链上修改账本。实际转账和收款操作发生在区块链系统上，而非 3Tree 内部。':
    '<strong>Transfer and Receipt:</strong> Use private keys to electronically sign transactions, modifying the ledger on the corresponding blockchain. Actual transfer and receipt operations occur on the blockchain system, not within 3Tree.',
  '<strong>数字资产管理：</strong>添加、存储和删除 3Tree 支持的数字代币。':
    '<strong>Digital Asset Management:</strong> Add, store, and remove digital tokens supported by 3Tree.',
  '<strong>行情查看：</strong>查看 3Tree 支持的数字代币汇率信息。':
    '<strong>Market View:</strong> View exchange rate information for digital tokens supported by 3Tree.',
  '<strong>浏览 DApp：</strong>通过 3Tree 提供的链接访问去中心化应用（包括公司自有和第三方 DApp）。':
    '<strong>Browse DApps:</strong> Access decentralized applications (including Company-owned and third-party DApps) through links provided by 3Tree.',
  '<strong>交易记录：</strong>3Tree 通过区块链系统复制您的全部或部分交易记录。但区块链系统上维护的交易记录应被视为权威来源。':
    '<strong>Transaction Records:</strong> 3Tree copies your full or partial transaction records via the blockchain system. However, transaction records maintained on the blockchain system shall be regarded as the authoritative source.',
  '<strong>代币闪兑：</strong>用户可通过第三方智能合约或去中心化交易所（DEX）进行代币兑换。3Tree 仅作为界面工具促进用户与第三方的交互。':
    '<strong>Token Swapping:</strong> Users may engage in token swaps through third-party smart contracts or decentralized exchanges (DEXs). 3Tree serves solely as an interface tool to facilitate user interaction with third parties.',
  '<strong>质押服务：</strong>访问质押服务时，第三方可能代表您在相应区块链网络上质押您的数字资产。3Tree 不对质押服务产生的任何问题负责。':
    '<strong>Staking Services:</strong> When accessing staking services, third parties may stake your digital assets on your behalf on applicable blockchain networks. 3Tree is not responsible for any issues arising from the use of staking services.',
  '2.2 第三方内容与服务': '2.2 Third-Party Content & Services',
  '3Tree 中集成的 DApp 包括公司自有和第三方平台提供的服务。对于第三方 DApp，3Tree 仅作为区块链浏览器，帮助用户访问这些 DApp。':
    'DApps integrated in 3Tree include services provided by both the Company and third-party platforms. For third-party DApps, 3Tree serves solely as a blockchain browser to help users access these DApps.',
  '您可能需要通过第三方提供商创建单独账户才能使用其服务。':
    'You may need to create separate accounts with third-party providers to use their services.',
  '您对第三方内容和服务的使用是自愿的，受本条款约束，但也可能受第三方提供商另行规定的条款和条件管辖。':
    'Your use of third-party content and services is voluntary and subject to these Terms, but may also be governed by separate terms and conditions imposed by the respective third-party providers.',
  '您有责任了解这些第三方服务的条款和条件，包括其隐私政策下如何处理您的信息。':
    'It is your responsibility to understand the terms and conditions of these third-party services, including how your information is handled under their privacy policies.',
  '3Tree 不验证、控制或认可第三方内容或服务，对其使用产生的损失不承担责任。访问此类内容和服务的风险由您自行承担。':
    '3Tree does not verify, control, or endorse third-party content or services and assumes no liability for losses arising from their use. Access to such content and services is at your own risk.',
  '三、用户须知与责任': '3. User Acknowledgments & Responsibilities',
  '3.1 非托管特性——我们无法提供的服务': '3.1 Self-Custody Nature — Services We Cannot Provide',
  '与区块链的去中心化特性一致，为保护用户数字代币安全，3Tree 以去中心化模式运营，不提供以下服务：':
    'In alignment with the decentralized nature of blockchain and to protect users\' digital tokens, 3Tree operates in a decentralized model and does not provide the following services:',
  '存储用户的钱包密码、私钥、助记词或 Keystore。':
    'Storing users\' wallet passwords, private keys, mnemonics, or Keystores.',
  '恢复用户的钱包密码、私钥、助记词或 Keystore。':
    'Recovering users\' wallet passwords, private keys, mnemonics, or Keystores.',
  '冻结钱包。': 'Freezing wallets.',
  '挂失钱包。': 'Reporting wallets as lost.',
  '恢复钱包。': 'Restoring wallets.',
  '撤销交易。': 'Reversing transactions.',
  '因此，用户需自行负责保管包含 3Tree 的设备，并备份 3Tree、钱包密码、助记词、私钥和 Keystore。在以下情况下，公司无法恢复钱包或获取这些凭证：':
    'Therefore, users are responsible for safeguarding devices containing 3Tree and backing up 3Tree, wallet passwords, mnemonics, private keys, and Keystores. The Company cannot restore wallets or retrieve these credentials in the following circumstances:',
  '丢失设备；': 'Losing your device;',
  '未备份即删除 3Tree；': 'Deleting 3Tree without backup;',
  '未备份即删除钱包；': 'Deleting a wallet without backup;',
  '钱包被盗；': 'Wallet being stolen;',
  '忘记钱包密码、私钥、助记词或 Keystore。': 'Forgetting wallet password, private key, mnemonic, or Keystore.',
  '同样，如果用户在交易中操作失误（如输入错误的转账地址），公司也无法取消交易。':
    'Similarly, if a user makes an operational error during a transaction (e.g., entering an incorrect transfer address), the Company cannot cancel the transaction.',
  '3.2 您的责任': '3.2 Your Responsibilities',
  '<strong>妥善保管助记词和私钥。</strong>助记词是恢复钱包的唯一方式。丢失助记词意味着永久失去资产访问权，我们无法为您恢复。':
    '<strong>Safeguarding your mnemonic and private keys.</strong> The mnemonic is the only way to recover your wallet. Losing it means permanently losing access to your assets — we cannot recover it for you.',
  '<strong>不要向任何人透露助记词或私钥。</strong>任何索取助记词的行为均为诈骗，3Tree 团队永远不会主动联系您索要助记词。':
    '<strong>Never sharing your mnemonic or private keys with anyone.</strong> Any request for your mnemonic is a scam. The 3Tree team will never contact you to ask for it.',
  '<strong>自行核实交易信息。</strong>在签名和广播交易前，请仔细确认交易内容、目标地址和金额。':
    '<strong>Verifying transaction details yourself.</strong> Before signing and broadcasting, carefully confirm the transaction content, destination address, and amount.',
  '<strong>安全存储备份。</strong>创建或导入钱包时，建议安全地备份钱包凭证（钱包密码、私钥、助记词、Keystore）。避免使用截图、电子邮件、备忘录、短信、微信、QQ 等电子方式备份。建议将助记词和 Keystore 手写在纸质笔记本上，并考虑将电子备份存储在安全的密码管理器中。':
    '<strong>Securely storing backups.</strong> When creating or importing a wallet, it is recommended to securely back up wallet credentials (wallet password, private key, mnemonic, Keystore). Avoid using screenshots, emails, notes, SMS, WeChat, QQ, or other electronic methods. It is recommended to write down your mnemonic and Keystore on a physical notebook, and consider storing electronic backups in a secure password manager.',
  '<strong>确保网络安全。</strong>仅在安全的网络环境中使用 3Tree。确保您的设备未被越狱或 root，以最大限度降低安全风险。':
    '<strong>Ensuring network security.</strong> Use 3Tree only in a secure network environment. Ensure your device has not been jailbroken or rooted to minimize security risks.',
  '<strong>警惕欺诈行为。</strong>警惕非 3Tree 官方渠道的欺诈活动。如发现此类活动，请及时向我们举报。':
    '<strong>Being vigilant against fraud.</strong> Be vigilant against fraudulent activities that do not originate from 3Tree\'s official channels. If you detect such activities, please report them to us promptly.',
  '<strong>遵守适用法律。</strong>您需确保使用本应用的行为符合您所在司法辖区的法律法规。':
    '<strong>Complying with applicable laws.</strong> You must ensure your use of the App complies with the laws and regulations of your jurisdiction.',
  '3.3 转账须知': '3.3 Transfer Guidelines',
  '<strong>不可逆交易：</strong>您理解区块链交易本质上是"不可逆的"。使用 3Tree 的转账功能时，您需对操作失误的后果承担全部责任，例如输入错误的地址或选择不合适的交易节点。':
    '<strong>Irreversible Transactions:</strong> You understand that blockchain transactions are inherently "irreversible." When using 3Tree\'s transfer function, you are solely responsible for the consequences of operational errors, such as entering an incorrect address or selecting an unsuitable transaction node.',
  '<strong>转账失败原因：</strong>以下情况可能导致交易失败或超时：钱包余额不足、矿工费不足、智能合约代码执行失败、超出限额、技术故障、区块链网络拥堵、被识别为高风险的地址等。':
    '<strong>Causes of Transfer Failures:</strong> The following circumstances may result in transaction failures or timeout errors: insufficient wallet balance, insufficient miner fees, smart contract code execution failure, exceeding limits, technical failures, blockchain network congestion, addresses identified as high-risk, etc.',
  '<strong>交易完成：</strong>一旦您使用 3Tree 完成转账，公司即已履行该特定服务的义务。公司不对后续争议或问题承担责任。':
    '<strong>Completion of Service:</strong> Once you have completed a transfer using 3Tree, the Company has fulfilled its obligations for that specific service. The Company is not liable for any subsequent disputes or issues.',
  '3.4 服务费用与税务义务': '3.4 Service Fees & Tax Obligations',
  '<strong>服务费：</strong>目前 3Tree 不收取服务费或手续费。如未来收费，将另行说明或公告。':
    '<strong>Service Fees:</strong> Currently, 3Tree does not charge service or handling fees. If charges are introduced in the future, they will be outlined separately or publicly announced.',
  '<strong>矿工费：</strong>通过 3Tree 进行转账时，您必须支付矿工费，金额由您自行决定。这些费用由相应区块链系统收取。':
    '<strong>Miner Fees:</strong> When conducting transfers via 3Tree, you must pay miner fees, the amount of which is determined by you. These fees are collected by the respective blockchain system.',
  '<strong>税务义务：</strong>您对通过 3Tree 进行的交易产生的所有税费负全部责任。':
    '<strong>Tax Obligations:</strong> You are solely responsible for all taxes and fees incurred from transactions conducted via 3Tree.',
  '四、风险提示': '4. Risk Warnings',
  '4.1 数字代币领域的风险': '4.1 Risks in the Digital Token Domain',
  '您承认并理解，数字代币的法律法规框架仍在发展中，该领域存在重大风险，包括但不限于不可赎回性和技术不稳定性。此外，数字代币的价格波动远高于其他金融资产。我们强烈建议您在决定持有或处置任何数字代币之前评估您的财务状况和风险承受能力。':
    'You acknowledge and understand that the legal and regulatory frameworks governing digital tokens are still under development, and this field carries significant risks, including non-redeemability and technological instability. Additionally, the price volatility of digital tokens is much higher than that of other financial assets. We strongly recommend that you assess your financial condition and risk tolerance before deciding to hold or dispose of any digital tokens.',
  '4.2 交易失败风险': '4.2 Transaction Failure Risk',
  '如果您或您的交易对手未能遵守本条款或未能遵循网站或交易/支付页面上的指示、提示或规则，3Tree 不保证代币转账成功，也不对此类失败的后果负责。一旦款项已收到 3Tree 钱包或第三方钱包中，您承认区块链交易是不可逆的。您和您的交易对手需对交易产生的任何风险和后果承担全部责任。':
    'If you or your counterparty fails to comply with these Terms or fails to follow the instructions, prompts, or rules provided on the website or transaction/payment pages, 3Tree does not guarantee the successful transfer of tokens and is not responsible for any consequences of such failures. Once payment has been received in a 3Tree wallet or a third-party wallet, you acknowledge that blockchain transactions are irreversible. You and your counterparty are solely responsible for any risks and consequences arising from your transactions.',
  '4.3 第三方 DApp 风险': '4.3 Third-Party DApp Risks',
  '使用 3Tree 集成的第三方 DApp 服务或进行交易时，我们建议您仔细阅读本条款和 3Tree 的提示。了解交易对手和产品信息，谨慎评估风险后再进行操作。您在第三方 DApp 上执行的任何交易都是您的个人行为，任何具有约束力的合同关系都在您与交易对手之间建立。3Tree 对您交易产生的任何风险、责任、损失或费用不承担责任。':
    'When using third-party DApp services or conducting transactions integrated within 3Tree, we advise you to carefully read these Terms and 3Tree\'s prompts. Familiarize yourself with the counterparties and product information and cautiously evaluate risks before proceeding. Any transaction you perform on a third-party DApp is your personal action, and any binding contractual relationship is established between you and your counterparty. 3Tree bears no responsibility for any risks, liabilities, losses, or costs resulting from your transactions.',
  '4.4 交易对手风险': '4.4 Counterparty Risk',
  '在交易过程中，您应独立验证交易对手是否具有完全民事行为能力，并自行决定是否与交易对手进行交易或向其转账。您承担与这些决策相关的所有风险。':
    'During transactions, you should independently verify whether your counterparty possesses full legal capacity and make your own decision about whether to transact or transfer funds to the counterparty. You assume all risks related to these decisions.',
  '4.5 转账错误处理': '4.5 Error Handling in Transfers',
  '如果您在转账过程中遇到"交易失败"或"打包超时"等错误，您应通过官方区块链系统或其他区块链查询工具确认交易状态，以避免重复转账。由此产生的任何损失或费用将由您自行承担。':
    'If you encounter errors such as "transaction failure" or "packaging timeout" during a transfer, you should confirm the transaction status using the official blockchain system or other blockchain query tools to avoid duplicate transfers. Any resulting losses or costs will be your sole responsibility.',
  '4.6 钱包与凭证存储': '4.6 Wallet & Credential Storage',
  '在 3Tree 中创建或导入钱包后，您的 Keystore、私钥、助记词及相关信息仅存储在您的设备上，而非 3Tree 或公司的服务器上。如果您未能保存或备份钱包凭证，随后丢失设备，您的数字代币将丢失，公司无法为您找回。同样，如果这些凭证在导出、存储或备份过程中泄露，或您的存储设备或服务器被黑客攻击或入侵，您的数字代币可能丢失，公司将无法恢复。':
    'After creating or importing a wallet in 3Tree, your Keystore, private keys, mnemonic, and related information are stored exclusively on your device and not on 3Tree or the Company\'s servers. If you fail to save or back up your wallet credentials and subsequently lose your device, your digital tokens will be lost, and the Company cannot retrieve them. Similarly, if these credentials are leaked during export, storage, or backup, or if your storage device or server is hacked or compromised, your digital tokens may be lost, and the Company will not be able to recover them.',
  '五、知识产权': '5. Intellectual Property',
  '3Tree 应用的部分源代码以开源方式发布（具体许可证见应用内说明或代码仓库）。3Tree 名称、Logo 及相关品牌标识的知识产权归 ThreeTree PTE. LTD. 所有。未经书面许可，不得将品牌标识用于商业推广或误导性用途。':
    'Some source code of the 3Tree App is released as open source (see in-app license or code repository for details). The 3Tree name, Logo, and related brand marks are the intellectual property of ThreeTree PTE. LTD. Brand marks may not be used for commercial promotion or misleading purposes without written permission.',
  '3Tree 中展示的所有内容（包括但不限于本条款、公告、文章、视频、音频文件、图片、文档、信息、资料、商标或标识）的知识产权归公司或第三方权利人所有。用户仅被允许为持有和管理数字代币的目的使用 3Tree 应用及其内容。未经公司或相关第三方权利人事先书面同意，任何人不得使用、修改、反向工程、复制、公开传播、更改、分发、发布或公开分享该应用或其内容。':
    'The intellectual property rights of all content displayed within 3Tree (including but not limited to these Terms, announcements, articles, videos, audio files, images, documents, information, materials, trademarks, or logos) are owned by the Company or third-party rights holders. Users are only permitted to use the 3Tree App and its content for the purpose of holding and managing digital tokens. Without prior written consent from the Company or relevant third-party rights holders, no person may use, modify, reverse engineer, copy, publicly disseminate, alter, distribute, publish, or publicly share the App or its content.',
  '六、合法使用承诺': '6. Your Commitment to Lawful Use',
  '6.1 遵守法律法规': '6.1 Compliance with Laws and Regulations',
  '您必须遵守您所在国家或地区的法律法规。您不得将 3Tree 用于任何非法目的或以任何非法方式使用。':
    'You must comply with the laws and regulations of the country or region in which you reside. You may not use 3Tree for any unlawful purposes or in any illegal manner.',
  '6.2 禁止行为': '6.2 Prohibited Activities',
  '您不得使用 3Tree 从事非法或犯罪活动，包括但不限于：':
    'You are prohibited from using 3Tree to engage in illegal or criminal activities, including but not limited to:',
  '从事任何非法或犯罪行为，如洗钱、非法集资等；':
    'Engaging in any unlawful or criminal acts, such as money laundering, illegal fundraising, etc.;',
  '使用自动化程序、软件、引擎、网络爬虫、网络分析工具、数据挖掘工具或类似工具访问公司服务、收集或处理公司提供的内容，或干扰或试图干扰其他用户访问公司服务；':
    'Using automated programs, software, engines, web crawlers, web analytics tools, data mining tools, or similar tools to access the Company\'s services, collect or process the content provided by the Company, or interfere with or attempt to interfere with other users\' access to the Company\'s services;',
  '提供赌博信息或诱导他人参与赌博；':
    'Providing gambling information or inducing others to participate in gambling;',
  '未经授权访问他人的 3Tree 钱包以窃取数字代币；':
    'Gaining unauthorized access to another person\'s 3Tree wallet to steal digital tokens;',
  '进行交易偏离交易对手声明的条款或具有欺诈性质；':
    'Conducting transactions that deviate from the declared terms of the counterparty or that are fraudulent;',
  '执行损害或可能损害 3Tree 服务系统或数据的行为；':
    'Performing actions that damage or may potentially damage 3Tree\'s service systems or data;',
  '从事公司合理认为不适当的任何其他非法行为。':
    'Engaging in any other illegal actions or behaviors that the Company has reasonable grounds to deem inappropriate.',
  '6.3 赔偿': '6.3 Indemnification',
  '您承认并同意，如果您违反适用法律（包括但不限于海关或税务法规）或本条款导致公司遭受任何损失、受到第三方索赔或面临行政机关处罚，您将赔偿公司，包括合理的律师费。':
    'You acknowledge and agree that if your violation of applicable laws (including but not limited to customs or tax regulations) or these Terms results in the Company suffering any loss, being subject to claims from third parties, or facing penalties from administrative authorities, you will indemnify the Company, including reasonable attorney fees.',
  '七、服务变更、中断与终止': '7. Service Changes, Interruption & Termination',
  '7.1 服务变更': '7.1 Service Changes',
  '您同意公司可自行决定暂时提供某些服务功能、暂停特定功能或在未来引入新功能以维持其独立商业运营。只要您继续使用公司提供的服务，即视为接受服务的任何增加、减少或变更。':
    'You agree that the Company may, in its sole discretion, temporarily provide certain service functionalities, suspend specific functionalities, or introduce new functionalities in the future to maintain its independent business operations. As long as you continue to use the services provided by the Company, any addition, reduction, or change to the services will be considered accepted by you.',
  '7.2 服务中断': '7.2 Service Interruption',
  '您理解公司可能在以下情况下暂停服务：':
    'You understand that the Company may suspend services under the following circumstances:',
  '设备维护、区块链系统修复、升级、故障或通信中断等技术原因；':
    'Technical reasons such as device maintenance, blockchain system repairs, upgrades, failures, or communication interruptions;',
  '不可抗力事件，包括但不限于台风、地震、海啸、洪水、停电、战争、恐怖袭击、病毒、恶意软件、黑客攻击、系统不稳定或政府行为；':
    'Force majeure events, including but not limited to typhoons, earthquakes, tsunamis, floods, power outages, wars, terrorist attacks, viruses, malware, hacking, system instability, or government actions;',
  '超出公司控制或合理预期的其他情况。':
    'Other situations beyond the Company\'s control or reasonable anticipation.',
  '7.3 终止': '7.3 Termination',
  '如果您从事以下行为，公司可单方面暂停或终止您对 3Tree 部分或全部功能的访问：':
    'If you engage in any of the following, the Company may unilaterally suspend or terminate your access to certain or all functionalities of 3Tree:',
  '使用 3Tree 从事非法或犯罪活动；':
    'Using 3Tree for illegal or criminal activities;',
  '干扰其他用户正常使用 3Tree；':
    'Interfering with the normal use of 3Tree by other users;',
  '冒充公司工作人员或管理层；':
    'Impersonating Company staff or management;',
  '攻击、渗透、更改或以其他方式威胁公司计算机系统的正常运行；':
    'Attacking, infiltrating, altering, or otherwise threatening the normal operation of the Company\'s computer systems;',
  '使用 3Tree 传播垃圾广告；':
    'Using 3Tree to disseminate spam advertisements;',
  '散布谣言或诋毁公司或 3Tree；':
    'Spreading rumors or defaming the Company or 3Tree;',
  '从事任何违法行为、违反本条款或公司合理认为应暂停功能的行为。':
    'Committing any illegal acts, violating these Terms, or engaging in activities that the Company reasonably believes warrant suspension of functionalities.',
  '7.4 钱包信息访问': '7.4 Access to Wallet Information',
  '如果您与公司的服务关系发生变更、中断或终止，您仍有权在合理时间内导出您的钱包信息。':
    'If your service relationship with the Company is altered, interrupted, or terminated, you will retain the right to export your wallet information within a reasonable timeframe.',
  '八、免责声明与责任限制': '8. Disclaimers & Limitation of Liability',
  '8.1 责任范围': '8.1 Scope of Responsibility',
  '公司仅负责履行本条款中明确规定的义务。':
    'The Company is only responsible for fulfilling the obligations explicitly outlined in these Terms.',
  '8.2 服务可用性': '8.2 Service Availability',
  '您承认并同意，在法律允许的范围内，公司基于现有技术能力和条件提供 3Tree 服务。公司对以下原因造成的服务中断不承担责任：':
    'You acknowledge and agree that, to the extent permitted by law, the Company provides 3Tree services based on existing technological capabilities and conditions. The Company assumes no liability for service disruptions caused by the following:',
  '3Tree 的系统维护或升级；': 'System maintenance or upgrades for 3Tree;',
  '不可抗力事件；': 'Force majeure events;',
  '您的设备硬件、软件、通信线路或电源故障；':
    'Failures in your device\'s hardware, software, communication lines, or power supply;',
  '您的不当操作或通过未经授权或未批准的方式使用公司服务；':
    'Your improper operations or use of the Company\'s services through unauthorized or unapproved methods;',
  '病毒、恶意软件或恶意程序攻击；网络拥堵；系统不稳定；系统或设备故障；通信中断；停电；银行问题；政府行为；':
    'Virus, malware, or malicious program attacks; network congestion; system instability; system or equipment failures; communication interruptions; power outages; banking issues; government actions;',
  '任何其他非公司原因造成的情况。':
    'Any other causes not attributable to the Company.',
  '8.3 免责情形': '8.3 Exclusions of Liability',
  '公司对以下情况不承担责任：': 'The Company assumes no responsibility for the following:',
  '用户因丢失设备、未备份即删除 3Tree、未备份即删除钱包、钱包被盗或忘记钱包密码、私钥、助记词或 Keystore 导致的数字代币损失；':
    'Loss of digital tokens resulting from users losing their devices, deleting 3Tree without backup, deleting wallets without backup, wallets being stolen, or forgetting wallet passwords, private keys, mnemonics, or Keystores;',
  '用户泄露钱包密码、私钥、助记词或 Keystore；出借、转让或授权他人使用其设备或 3Tree 钱包；或从非官方来源下载 3Tree 应用或使用不安全方式操作应用导致的数字代币损失；':
    'Loss of digital tokens resulting from users disclosing wallet passwords, private keys, mnemonics, or Keystores; lending, transferring, or authorizing others to use their devices or 3Tree wallets; or downloading the 3Tree App from non-official sources or using unsafe methods to operate the App;',
  '因用户操作失误导致的数字代币损失，包括但不限于输入错误的转账地址或选择不合适的交易节点服务器；':
    'Loss of digital tokens due to user operational errors, including but not limited to entering incorrect transfer addresses or selecting unsuitable transaction node servers;',
  '因用户对区块链技术的错误或理解偏差导致的数字代币损失；':
    'Loss of digital tokens resulting from user errors or misunderstandings of blockchain technology;',
  '3Tree 用于复制区块链交易数据的区块链系统延迟、不稳定或其他问题导致的交易记录偏差。':
    'Deviations in transaction records caused by delays, instability, or other issues with the blockchain system that 3Tree uses to replicate blockchain transaction data.',
  '8.4 责任上限': '8.4 Limitation of Liability',
  '在任何情况下，公司对违反本条款的总责任不超过以下较高者：A. 0.1 以太币或 B. 100 美元。':
    'In any case, the total liability of the Company for breach of these Terms shall not exceed the higher of: A. 0.1 Ether or B. 100 USD.',
  '8.5 不提供保证': '8.5 No Guarantees',
  '公司不提供以下保证：': 'The Company does not provide the following guarantees:',
  '公司提供的服务将完全满足您的要求；':
    'The services provided by the Company will fully meet your requirements;',
  '通过公司服务获得的任何技术、产品、服务或信息将符合您的期望；':
    'Any technology, products, services, or information obtained through the Company\'s services will meet your expectations;',
  '从第三方交易所检索的数字代币市场数据或交易信息的时效性、准确性、完整性或可靠性；':
    'The timeliness, accuracy, completeness, or reliability of digital token market data or trading information retrieved from third-party exchanges;',
  '您通过 3Tree 进行交易的相关方将履行与您的协议中的义务。':
    'The parties involved in your transactions via 3Tree will fulfill their obligations under the agreements made with you.',
  '3Tree 仅作为管理数字代币和显示交易信息的工具。公司不提供法律、税务或投资建议。您应自行寻求法律、税务或投资专业人士的指导。公司不对您在使用服务过程中产生的任何投资损失或数据丢失承担责任。':
    '3Tree serves solely as a tool for managing digital tokens and displaying transaction information. The Company does not provide legal, tax, or investment advice. You should seek guidance from legal, tax, or investment professionals independently. The Company assumes no responsibility for any investment losses or data losses incurred during your use of the services.',
  '九、监管声明': '9. Regulatory Notice',
  '<strong>重要声明：</strong>目前 3Tree 未在任何司法辖区接受监管，也未获得相关监管机构的许可。3Tree 不提供包括但不限于新加坡金融管理局依据《2019 年支付服务法案》所管辖的任何金融及支付服务。':
    '<strong>Important notice:</strong> 3Tree is not currently regulated or licensed by any regulatory authority in any jurisdiction. 3Tree does not provide any financial or payment services including but not limited to those regulated by the Monetary Authority of Singapore under the Payment Services Act 2019.',
  '本应用仅作为技术工具，帮助用户与区块链网络进行交互。我们不构成金融服务提供商、交易所或资产管理机构。':
    'The App serves solely as a technical tool to help users interact with blockchain networks. We are not a financial services provider, exchange, or asset management institution.',
  '十、完整协议与法律适用': '10. Entire Agreement & Governing Law',
  '本条款由 3Tree 服务条款、3Tree 隐私政策及公司不时发布的其他规则组成。如果本条款的任何部分被有管辖权的法院认定为无效或不可执行，其余条款仍具有完全效力。':
    'These Terms consist of the 3Tree Terms of Service, 3Tree Privacy Policy, and other rules published by the Company from time to time. If any part of these Terms is deemed invalid or unenforceable by a court with jurisdiction, the remaining provisions shall remain in full force and effect.',
  '本条款的任何翻译版本仅为方便用户提供。如中文版与非中文版之间存在冲突，以中文版为准。':
    'Any translated version of these Terms is provided solely for the convenience of users. In the event of a conflict between the Chinese version and a non-Chinese version, the Chinese version shall prevail.',
  '您作为境外用户，有责任充分了解并遵守使用公司服务时适用于您所在司法辖区的所有法律、法规和规则。':
    'As an overseas user, you are responsible for fully understanding and complying with all laws, regulations, and rules applicable to your jurisdiction while using the Company\'s services.',
  '十一、条款修改': '11. Modifications',
  '我们保留随时修改本条款的权利。修改后的条款将在应用内或官网上发布后立即生效。您继续使用本应用即视为接受修改后的条款。建议您定期查阅本条款以了解最新内容。':
    'We reserve the right to modify these Terms at any time. Modified Terms take effect immediately upon posting in the App or on the website. Your continued use constitutes acceptance. We recommend reviewing these Terms periodically.',
  '本条款自 2024 年 8 月起生效。': 'These Terms are effective as of August 2024.',
  '十二、联系我们': '12. Contact Us',
  '如对本条款有任何疑问，请通过以下方式联系我们：': 'If you have any questions about these Terms, please contact us:',

  /* ── legal pages: Privacy ── */
  '本隐私政策说明 3Tree 钱包（以下简称"应用"）如何收集、使用和保护您的信息。3Tree 由 ThreeTree PTE. LTD. 开发与运营。':
    'This Privacy Policy explains how the 3Tree wallet (the "App") collects, uses, and protects your information. 3Tree is developed and operated by ThreeTree PTE. LTD.',
  '<strong>核心原则：3Tree 是一款非托管钱包，您的私钥和助记词仅在您的设备上本地加密存储，我们从不收集、上传或访问这些信息。</strong>':
    '<strong>Core principle: 3Tree is a self-custody wallet. Your private keys and mnemonic are encrypted and stored locally on your device only — we never collect, upload, or access this information.</strong>',
  '本隐私政策是您与公司之间关于 3Tree 隐私保护的具有法律约束力的协议。公司保留随时更新本政策的权利，更新后的政策将在应用内或官网发布后立即生效。':
    'This Privacy Policy is a legally binding agreement between you and the Company regarding 3Tree privacy protection. The Company reserves the right to update this Policy at any time. Updated policies take effect immediately upon posting in the App or on the website.',
  '二、我们不收集的信息': '2. Information We Do NOT Collect',
  '以下信息我们<strong>不会</strong>收集或存储：': 'We do <strong>NOT</strong> collect or store:',
  '助记词、私钥或任何钱包恢复信息；': 'Mnemonics, private keys, or any wallet recovery information;',
  '账户注册信息（3Tree 无需注册账号）；': 'Account registration information (3Tree requires no account);',
  '身份验证材料（KYC）；': 'Identity verification materials (KYC);',
  '交易签名密钥；': 'Transaction signing keys;',
  '设备上的任何个人文件；': 'Any personal files on your device;',
  '钱包密码（即创建/导入钱包时设置的密码）。作为去中心化应用，3Tree 不在您的设备或公司服务器上存储钱包密码。如果您丢失钱包密码，需使用私钥或助记词重置。':
    'Wallet passwords (i.e., passwords set when creating/importing wallets). As a decentralized application, 3Tree does not store wallet passwords on your device or on Company servers. If you lose your wallet password, you must use your private key or mnemonic to reset it.',
  '三、我们可能收集的信息': '3. Information We May Collect',
  '为提供和改进服务，以下信息可能在您使用应用时产生：':
    'To provide and improve the service, the following information may be generated during use:',
  '3.1 设备信息': '3.1 Device Information',
  '应用可能收集设备型号、操作系统版本和应用版本号，仅用于崩溃报告和功能兼容性分析。这些信息不关联您的钱包地址或身份信息。我们可能通过设备唯一序列号将您与您的钱包关联。':
    'The App may collect device model, OS version, and app version for crash reporting and compatibility analysis. This information is not linked to your wallet address or identity. We may associate you with your wallet by the unique serial number of your mobile device.',
  '3.2 使用数据': '3.2 Usage Data',
  '我们可能收集匿名化的功能使用统计（如哪些功能被使用、使用频率），用于产品改进。这些数据不包含您的钱包地址、交易内容或任何可识别个人身份的信息。':
    'We may collect anonymized feature usage statistics (which features are used, frequency) for product improvement. This data does not include your wallet address, transaction content, or any personally identifiable information.',
  '3.3 崩溃日志': '3.3 Crash Logs',
  '应用发生崩溃时，可能自动生成包含错误堆栈信息的日志。这些日志不包含私钥、助记词或交易签名。':
    'When the App crashes, logs containing error stack information may be automatically generated. These logs do not contain private keys, mnemonics, or transaction signatures.',
  '3.4 个人信息': '3.4 Personal Information',
  '个人信息是指以电子或其他方式记录的能够识别用户的任何信息，无论是单独还是与其他数据结合，包括但不限于自然人的姓名、出生日期、身份证号码、生物特征信息、地址、电话号码、银行账户详情、电子邮件地址、钱包地址、移动设备信息、操作记录、交易历史等。公司仅在用户同意的情况下收集个人信息，并将严格保密，除非法律另有要求或用户另有同意。':
    'Personal information refers to any information recorded electronically or otherwise that can identify a user, either independently or when combined with other data, including but not limited to a natural person\'s name, date of birth, ID number, biometric information, address, phone number, bank account details, email address, wallet address, mobile device information, operational records, transaction history, etc. The Company will collect personal information only with the user\'s consent and will strictly maintain confidentiality unless otherwise required by law or agreed upon by the user.',
  '四、我们如何使用您的信息': '4. How We Use Your Information',
  '我们可能将您的信息用于以下目的：': 'We may use your information for the following purposes:',
  '及时向您推送重要通知，如软件更新、服务条款和本政策的更新；':
    'Promptly pushing important notifications to you, such as software updates, updates to Terms of Service and this Policy;',
  '为您提供便捷安全的数字代币管理方式；':
    'Providing you with a convenient and secure way to manage digital tokens;',
  '处理您的反馈；': 'Processing your feedback;',
  '进行内部审计、数据分析和研究等，以提升我们的服务；':
    'Conducting internal audits, data analysis, and research to enhance our services;',
  '根据法律法规和监管要求，配合监管机构的工作；':
    'Cooperating with regulatory authorities in accordance with laws, regulations, and regulatory requirements;',
  '管理用户的使用行为。': 'Managing users\' usage behaviors.',
  '五、您如何控制自己的信息': '5. How You Control Your Information',
  '您对自己的个人信息拥有以下权利：': 'You have the following rights regarding your personal information:',
  '<strong>访问权：</strong>您可以随时查看应用中存储的个人信息；':
    '<strong>Right to Access:</strong> You can view personal information stored in the App at any time;',
  '<strong>更正权：</strong>当您发现个人信息有误时，可以要求更正；':
    '<strong>Right to Rectification:</strong> You can request correction when you find errors in your personal information;',
  '<strong>删除权：</strong>在特定情况下，您可以要求删除您的个人信息；':
    '<strong>Right to Erasure:</strong> Under certain circumstances, you can request deletion of your personal information;',
  '<strong>撤回同意权：</strong>您可以随时撤回之前给予的同意。':
    '<strong>Right to Withdraw Consent:</strong> You can withdraw previously given consent at any time.',
  '请注意，由于 3Tree 的去中心化特性，某些信息（如区块链上的交易记录）一旦广播即无法删除或修改。':
    'Please note that due to the decentralized nature of 3Tree, certain information (such as transaction records on the blockchain) cannot be deleted or modified once broadcast.',
  '六、我们可能共享或转移的信息': '6. Information We May Share or Transfer',
  '我们不会与任何第三方共享您的个人信息，以下情况除外：':
    'We will not share your personal information with any third party, except in the following circumstances:',
  '获得您的明确同意；': 'With your explicit consent;',
  '根据法律法规、法律程序、政府要求或监管机构的强制性要求；':
    'In accordance with laws, regulations, legal procedures, mandatory requirements from government authorities or regulatory bodies;',
  '为保护公司或公众的权利、财产或安全所合理必要的情况下。':
    'When reasonably necessary to protect the rights, property, or safety of the Company or the public.',
  '如果公司终止运营，将及时停止收集您的个人信息，在 3Tree 上发布公告，并在合理期限内删除或匿名化处理我们持有的您的个人信息。':
    'If the Company terminates operations, it will stop collecting your personal information in time, post an announcement on 3Tree, and delete or anonymize your personal information held by us within a reasonable period.',
  '七、我们如何自动收集数据': '7. How We Automatically Collect Data',
  '当您使用 3Tree 时，我们可能通过以下技术自动收集某些信息：':
    'When you use 3Tree, we may automatically collect certain information through the following technologies:',
  '<strong>日志文件：</strong>记录您的使用活动，如访问时间、使用的功能等；':
    '<strong>Log Files:</strong> Recording your usage activities, such as access time, features used, etc.;',
  '<strong>Cookie 和类似技术：</strong>用于记住您的偏好设置；':
    '<strong>Cookies and Similar Technologies:</strong> Used to remember your preferences;',
  '<strong>设备标识符：</strong>用于识别您的设备，提供个性化服务。':
    '<strong>Device Identifiers:</strong> Used to identify your device and provide personalized services.',
  '这些技术收集的信息不包含您的私钥、助记词或钱包密码。':
    'Information collected by these technologies does not include your private keys, mnemonics, or wallet passwords.',
  '八、第三方服务': '8. Third-Party Services',
  '应用为实现功能会连接以下第三方服务，这些服务可能各自收集数据：':
    'The App connects to the following third-party services to function, each of which may collect data:',
  '<strong>公共 RPC 节点：</strong>用于查询链上余额和广播交易。您的公开地址和查询内容可能被节点运营方记录；':
    '<strong>Public RPC nodes:</strong> Used to query on-chain balances and broadcast transactions. Your public address and queries may be logged by node operators;',
  '<strong>行情数据源（如 CoinGecko）：</strong>用于显示代币价格。查询时可能传递您关注的代币标识；':
    '<strong>Market data sources (e.g. CoinGecko):</strong> Used to display token prices. Token identifiers you query may be transmitted;',
  '<strong>闪兑聚合器（如 LI.FI、KyberSwap、deBridge）：</strong>用于获取报价和执行跨链交易。交易路由信息可能被聚合器记录；':
    '<strong>Swap aggregators (e.g. LI.FI, KyberSwap, deBridge):</strong> Used to fetch quotes and execute cross-chain trades. Routing information may be logged by aggregators;',
  '<strong>区块浏览器：</strong>应用内跳转至 Etherscan、Tronscan 等浏览器时，受其各自隐私政策约束；':
    '<strong>Block explorers:</strong> When navigating to Etherscan, Tronscan, etc., you are subject to their respective privacy policies;',
  '<strong>第三方 DApp：</strong>通过 3Tree 访问的第三方 DApp 有各自的隐私政策，公司不对这些第三方的隐私实践负责。':
    '<strong>Third-Party DApps:</strong> Third-party DApps accessed through 3Tree have their own privacy policies. The Company is not responsible for the privacy practices of these third parties.',
  '建议您查阅各服务的隐私政策。我们不对第三方服务的隐私实践负责。':
    'We recommend reviewing the privacy policies of each service. We are not responsible for the privacy practices of third-party services.',
  '九、数据安全': '9. Data Security',
  '我们采取以下措施保护您的信息：': 'We take the following measures to protect your information:',
  '私钥和助记词使用设备本地加密存储，不上传至任何服务器；':
    'Private keys and mnemonics are encrypted and stored locally on your device, never uploaded to any server;',
  '应用通信使用 HTTPS/TLS 加密；': 'App communications use HTTPS/TLS encryption;',
  '安装包经过数字签名，防止篡改；': 'Installation packages are digitally signed to prevent tampering;',
  '部分源代码开源，接受社区安全审查；': 'Some source code is open source and subject to community security review;',
  '我们可能采取数据安全保护技术、提高内部合规水平、为员工提供安全培训、为访问相关数据设置安全权限，以保护您的个人信息。':
    'We may adopt data security protection techniques, improve internal compliance levels, provide security training for our staff, and set security authority for access to relevant data to protect your personal information.',
  '我们将在"钱包指南"栏目中向您发送信息安全相关消息，并更新有关钱包使用和信息保护的文章供您参考。':
    'We will send you information security-related messages in the "Wallet Guide" section and update articles concerning wallet use and information protection for your reference.',
  '十、未成年人保护': '10. Protection of Minors',
  '以下特别条款适用于未满 18 周岁的未成年人：':
    'The following special provisions apply to minors who are under the age of 18:',
  '未成年人不得在父母或监护人的指导下使用 3Tree；':
    'Minors shall not use 3Tree without guidance from their parents or guardians;',
  '父母和监护人应在阅读本政策、3Tree 服务条款及其他相关规则后，对未成年人使用 3Tree 提供指导；':
    'Parents and guardians shall provide guidance to minors on using 3Tree after reading this Policy, 3Tree Terms of Service, and other relevant rules;',
  '3Tree 将根据国家法律法规确保未成年人个人信息的保密性和安全性。':
    '3Tree will ensure the confidentiality and security of minors\' personal information in accordance with national laws and regulations.',
  '十一、儿童隐私': '11. Children\'s Privacy',
  '本应用不面向 18 岁以下未成年人。我们不会故意收集未成年人的个人信息。如果您发现未成年人使用了本应用并提供了个人信息，请联系我们，我们将采取措施删除相关信息。':
    'The App is not intended for users under 18. We do not knowingly collect personal information from minors. If you discover a minor has used the App and provided personal information, please contact us and we will take steps to delete it.',
  '十二、隐私政策更新': '12. Privacy Policy Updates',
  '我们可能不时更新本隐私政策。更新后的政策将在应用内或官网上发布。重大变更时，我们会通过应用内通知提醒您。建议您定期查阅本政策。':
    'We may update this Privacy Policy from time to time. Updated policies will be posted in the App or on the website. For significant changes, we will notify you via in-app notice. We recommend reviewing this policy periodically.',
  '本政策自 2024 年 8 月起生效。': 'This Policy is effective as of August 2024.',
  '如对本隐私政策有任何疑问或需要行使您的数据权利，请通过以下方式联系我们：':
    'If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us:',

  /* ── hero: 屏内展示图（带真实 logo 与数字的三屏） ── */
  '主钱包 1': 'Main Wallet 1',
  总资产: 'Total Balance',
  今日: 'Today',
  发送: 'Send',
  接收: 'Receive',
  发现: 'Discover',
  资产: 'Assets',
  探索: 'Explore',
  我的: 'Profile',
  支付: 'You pay',
  余额: 'Balance',
  预估到账: 'Estimated received',
  价格影响: 'Price impact',
  网络费用: 'Network fee',
  流动性费用: 'LP fee',
  开始闪兑: 'Start Swap',
  '报价由聚合器实时返回': 'Quotes are streamed live from aggregators',
  转账确认: 'Transfer Review',
  收款地址: 'Recipient',
  金额: 'Amount',
  矿工费: 'Gas fee',
  '请核对收款地址，': 'Please verify the recipient address —',
  '交易上链后不可撤销。': 'on-chain transfers cannot be reversed.',
  拒绝: 'Reject',
  '由本机私钥签名，不经过任何服务器': 'Signed locally by your key — never through a server',

  /* ── docs: FAQ ── */
  '常见问题解答': 'FAQ',
  '3Tree 钱包常见问题：安全性、支持的网络、闪兑与跨链、助记词与私钥等。':
    'Frequently asked questions about 3Tree wallet: security, supported networks, swap & bridge, mnemonic and private keys.',
  '3Tree 钱包安全吗？': 'Is 3Tree wallet safe?',
  '3Tree 是一款自持钱包（非托管钱包），私钥和助记词仅存储在您的设备本地，使用 Android Keystore 加密保存。3Tree 服务器不收集、不上传、不托管任何用户密钥数据。每一笔交易均由您的设备本地签名，无需将私钥发送给任何第三方。':
    '3Tree is a self-custody (non-custodial) wallet. Private keys and mnemonics are stored only on your device, encrypted with Android Keystore. 3Tree servers never collect, upload or custody any user key data. Every transaction is signed locally on your device — no need to send private keys to any third party.',
  '3Tree 支持哪些区块链？': 'Which blockchains does 3Tree support?',
  '3Tree 目前支持 103 条主网，覆盖 8 类链生态：':
    '3Tree currently supports 103 mainnets, covering 8 chain families:',
  '<strong>EVM 链</strong>：Ethereum、BNB Chain、Base、Arbitrum、Optimism、Polygon、Avalanche、Linea、opBNB 等':
    '<strong>EVM chains</strong>: Ethereum, BNB Chain, Base, Arbitrum, Optimism, Polygon, Avalanche, Linea, opBNB and more',
  '<strong>UTXO 链</strong>：Bitcoin (BTC)、Dogecoin (DOGE)':
    '<strong>UTXO chains</strong>: Bitcoin (BTC), Dogecoin (DOGE)',
  '<strong>TRON</strong>：支持 TRC-20 代币转账与闪兑':
    '<strong>TRON</strong>: TRC-20 token transfers and flash swaps',
  '<strong>Solana</strong>：支持 SPL 代币与 NFT':
    '<strong>Solana</strong>: SPL tokens and NFTs',
  '<strong>TON</strong>：支持 TON 原生转账':
    '<strong>TON</strong>: native TON transfers',
  '<strong>XRP Ledger</strong>：支持 XRP 发送':
    '<strong>XRP Ledger</strong>: XRP sending',
  '<strong>Aptos</strong>：支持 APT 代币管理':
    '<strong>Aptos</strong>: APT token management',
  '<strong>Sui</strong>：支持 SUI 代币管理':
    '<strong>Sui</strong>: SUI token management',
  '此外还支持 10 条测试网用于开发联调，EVM 网络支持自定义添加。':
    'Plus 10 testnets for development; EVM networks can be added manually.',
  '什么是闪兑？和跨链桥有什么区别？': 'What is flash swap? How is it different from a bridge?',
  '<strong>闪兑</strong>（Swap）是指在同一条链上将一种代币兑换为另一种代币，例如在 Ethereum 上将 ETH 换成 USDT。闪兑通过聚合器（如 KyberSwap、LI.FI）自动寻找最优报价路径。':
    '<strong>Flash swap</strong> (Swap) means exchanging one token for another on the same chain — e.g. swapping ETH for USDT on Ethereum. The aggregator (KyberSwap, LI.FI) automatically finds the best quote route.',
  '<strong>跨链桥</strong>（Bridge）是将资产从一条区块链转移到另一条区块链，例如将 Ethereum 上的 ETH 转到 BNB Chain。3Tree 使用 LI.FI 和 deBridge 等跨链协议实现资产跨链转移。':
    'A <strong>bridge</strong> transfers assets from one blockchain to another — e.g. moving ETH from Ethereum to BNB Chain. 3Tree uses cross-chain protocols like LI.FI and deBridge.',
  '助记词丢了怎么办？': 'What if I lose my mnemonic?',
  '助记词是钱包的最高权限凭证，一旦丢失且没有其他备份，资产将<strong>无法恢复</strong>。3Tree 作为自持钱包，不存储用户的助记词，因此无法协助找回。请务必在创建钱包时将助记词抄写到纸上，并保存在至少两个不同的安全位置。':
    'The mnemonic is the ultimate credential for your wallet. Once lost with no backup, your assets <strong>cannot be recovered</strong>. As a self-custody wallet, 3Tree does not store user mnemonics and cannot help recover them. Be sure to write down your mnemonic on paper and keep it in at least two different secure locations when creating your wallet.',
  '⚠️ 任何声称能帮您「找回助记词」或「恢复钱包」的人都是骗子。3Tree 团队永远不会主动联系您索取任何信息。':
    '⚠️ Anyone claiming they can "recover your mnemonic" or "restore your wallet" is a scammer. The 3Tree team will never contact you to request any information.',
  '3Tree 是开源的吗？': 'Is 3Tree open source?',
  '是的，3Tree 是一款开源钱包。您可以在 GitHub 上查看完整的源代码。开源意味着任何人都可以审计代码，确认应用确实如所述那样处理用户数据与密钥。':
    'Yes, 3Tree is an open-source wallet. You can view the full source code on GitHub. Open source means anyone can audit the code and verify that the app handles user data and keys exactly as described.',
  '如何从其他钱包迁移到 3Tree？': 'How do I migrate from another wallet to 3Tree?',
  '如果您已有其他钱包（如 MetaMask、Trust Wallet、TokenPocket 等），只需将助记词导出并在 3Tree 中选择「导入钱包」即可。3Tree 支持 BIP39 标准的 12 或 24 个单词的助记词，导入后会自动派生全部链的地址。迁移完成后，建议在原钱包中撤销对旧设备的授权。':
    'If you already have another wallet (such as MetaMask, Trust Wallet, TokenPocket, etc.), simply export your mnemonic and choose "Import wallet" in 3Tree. 3Tree supports BIP39 standard 12- or 24-word mnemonics and will automatically derive all chain addresses upon import. After migration, consider revoking approvals on the old wallet.',
  '3Tree 收费吗？': 'Does 3Tree charge fees?',
  '3Tree 应用本身完全免费，不收取任何服务费或订阅费。使用闪兑和跨链功能时，您需要支付区块链网络的 Gas 费（矿工费），这是支付给区块链网络的费用，与 3Tree 无关。':
    'The 3Tree app is completely free — no service fees or subscriptions. When using swap and bridge features, you need to pay the blockchain network gas fee (miner fee), which goes to the network and has nothing to do with 3Tree.',
  '手机丢了怎么办？': 'What if I lose my phone?',
  '如果您的手机丢失或损坏，只要您已离线备份了助记词，就可以在任意兼容 BIP39 的钱包中导入助记词并重新派生全部地址，恢复对资产的访问。如果您没有备份助记词，资产将无法恢复。':
    'If your phone is lost or damaged, as long as you have backed up your mnemonic offline, you can import it into any BIP39-compatible wallet to re-derive all addresses and regain access to your assets. Without a mnemonic backup, your assets cannot be recovered.',
  '什么是多签金库？': 'What is a multi-sig vault?',
  '多签金库（Multi-Sig Vault）是一种需要多个私钥共同签名才能执行交易的钱包机制。例如 3-of-5 多签意味着 5 个成员中至少需要 3 人确认才能发起交易。多签金库适合团队资金管理、项目金库、DAO 治理等场景，防止单人掌控全部资产。':
    'A multi-sig vault requires multiple private keys to co-sign before a transaction can be executed. For example, a 3-of-5 multi-sig means at least 3 out of 5 members must confirm to initiate a transaction. Multi-sig vaults are ideal for team fund management, project treasuries, DAO governance and other scenarios where no single person should control all assets.',
  '3Tree 支持哪些语言？': 'Which languages does 3Tree support?',
  '3Tree 目前支持 12 种界面语言，包括简体中文、繁体中文、英语、日语、韩语、西班牙语、葡萄牙语、俄语、土耳其语、越南语、泰语和印尼语。您可以在「我的 → 语言设置」中切换。':
    '3Tree currently supports 12 interface languages: Simplified Chinese, Traditional Chinese, English, Japanese, Korean, Spanish, Portuguese, Russian, Turkish, Vietnamese, Thai and Indonesian. You can switch languages in "Me → Language settings".',
};

export function tr(lang: Lang, s: string): string {
  return lang === 'en' ? (EN[s] ?? s) : s;
}

/** 占位符替换：{0}、{1}…，两种语言里位置可以不同。 */
export function tf(lang: Lang, s: string, ...args: (string | number)[]): string {
  return tr(lang, s).replace(/\{(\d+)\}/g, (m, i) => {
    const v = args[Number(i)];
    return v === undefined ? m : String(v);
  });
}

const TITLES: Record<Lang, string> = {
  zh: '3Tree — 开源透明，保护你的 Web3 资产｜Root Your Assets',
  en: '3Tree — Open Source & Transparent｜Root Your Assets',
};

/**
 * 当前语言 + 切换器。
 *
 * 默认英文：官网面向国际访客，首帧与 SSR 输出统一为 'en'（getServerSnapshot），
 * 否则英文访客一打开就是一整页水合错位；React 会在水合完成后自动切到
 * getSnapshot，那时才读 localStorage 里用户上次手动选的那一种。
 * 语言存在模块级 store 里，多标签页通过 storage 事件互相跟随。
 */
const listeners = new Set<() => void>();
let cached: Lang | null = null;

function detect(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'zh' || saved === 'en') return saved;
  } catch {
    /* 隐私模式下 localStorage 会抛，落回默认英文即可 */
  }
  /* 不猜浏览器语言：默认英文是产品决定（官网定位国际访客），
     一旦掺入 navigator.language，「第一次打开是中文还是英文」就变成随环境变的，
     要中文的访客点一下切换器就行，而且选择会被记住。 */
  return 'en';
}

function getLang(): Lang {
  if (cached === null) cached = detect();
  return cached;
}

function getServerLang(): Lang {
  return 'en';
}

function subscribeLang(cb: () => void): () => void {
  const first = listeners.size === 0;
  listeners.add(cb);
  if (first) window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0) window.removeEventListener('storage', onStorage);
  };
}

/* 另一个标签页改了语言：storage 事件里重读并刷新缓存，再通知本页订阅者。
   不能直接把 cb 绑到事件上——那样 cached 还是旧值，重渲染也切不过去。 */
function onStorage(e: StorageEvent): void {
  if (e.key !== STORAGE_KEY) return;
  if (e.newValue !== 'zh' && e.newValue !== 'en') return;
  cached = e.newValue;
  listeners.forEach((fn) => fn());
}

/** 切语言：写回 store 与 localStorage，再通知所有订阅者。模块级函数，引用恒定。 */
export function setLang(l: Lang): void {
  cached = l;
  try {
    window.localStorage.setItem(STORAGE_KEY, l);
  } catch {
    /* 写不进去就不持久化，本次会话仍生效 */
  }
  listeners.forEach((cb) => cb());
}

export function useLang(): {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (s: string) => string;
  tf: (s: string, ...a: (string | number)[]) => string;
} {
  const lang = useSyncExternalStore(subscribeLang, getLang, getServerLang);

  /* 同步 <html lang> 与 <title>：只动 DOM，不动 state，搜索引擎与读屏拿到的语言才对得上 */
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = TITLES[lang];
  }, [lang]);

  const t = useCallback((s: string) => tr(lang, s), [lang]);
  const tff = useCallback((s: string, ...a: (string | number)[]) => tf(lang, s, ...a), [lang]);
  return { lang, setLang, t, tf: tff };
}

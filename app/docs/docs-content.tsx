/**
 * 3Tree 帮助中心 · 文档内容数据
 *
 * 中文为源语言（与 App i18n 约定一致：key 即中文原文）。
 * 侧边栏分组 + 各 section 内容均在此定义，由 docs-page.tsx 消费渲染。
 */

/* ── 类型定义 ─────────────────────────────────────────────── */
export type Block =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'h4'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'tip'; text: string }
  | { type: 'warn'; text: string }
  | { type: 'steps'; items: { title: string; desc: string }[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'contracts'; items: { chain: string; addr: string }[] };

export interface DocSection {
  id: string;
  title: string;
  desc: string;
  blocks: Block[];
}

export interface SidebarGroup {
  heading: string;
  items: { id: string; title: string }[];
}

/* ── 侧边栏分组 ──────────────────────────────────────────── */
export const SIDEBAR: SidebarGroup[] = [
  {
    heading: '入门',
    items: [
      { id: 'getting-started', title: '快速开始' },
      { id: 'wallet', title: '钱包管理' },
      { id: 'asset', title: '资产管理' },
    ],
  },
  {
    heading: '功能',
    items: [
      { id: 'swap', title: '闪兑' },
      { id: 'bridge', title: '跨链桥' },
      { id: 'subaddr', title: '子地址' },
      { id: 'multisig', title: '多签金库' },
      { id: 'dapp', title: 'DApp 浏览器' },
      { id: 'profile', title: '个人中心' },
    ],
  },
  {
    heading: '参考',
    items: [
      { id: 'security', title: '安全机制' },
      { id: 'networks', title: '支持的网络' },
      { id: 'glossary', title: '术语表' },
      { id: 'contracts', title: '合约地址' },
    ],
  },
  {
    heading: '常见问题',
    items: [
      { id: 'faq', title: '常见问题解答' },
    ],
  },
];

/* ── 各 section 内容 ──────────────────────────────────────── */
export const SECTIONS: DocSection[] = [
  /* ═══ 快速开始 ═══ */
  {
    id: 'getting-started',
    title: '快速开始',
    desc: '从下载安装到完成第一笔交易，只需三步即可开始使用 3Tree 钱包。',
    blocks: [
      { type: 'h3', text: '下载与安装' },
      { type: 'p', text: '3Tree 目前提供 Android 版本（APK），要求 Android 8.0 及以上。请仅从官方渠道下载：<strong>3tree.xyz</strong> 或分发节点 <strong>su.3tree.xyz</strong>。任何应用市场镜像、网盘链接或群组转发的安装包均非官方发布。' },
      { type: 'steps', items: [
        { title: '下载安装包', desc: '前往 3tree.xyz 下载最新 APK，在终端执行 shasum -a 256 核对 SHA-256 校验值，确认与官网公示一致后再安装。' },
        { title: '创建或导入钱包', desc: '打开应用后选择「创建新钱包」生成一组新助记词；或选择「导入钱包」，通过助记词、私钥或 Keystore 导入已有钱包。' },
        { title: '备份助记词', desc: '立即将助记词抄写到纸上并离线保存。助记词是恢复资产的唯一途径，3Tree 无法协助找回。' },
      ]},
      { type: 'warn', text: '⚠️ 任何以「找回助记词」「KYC 验证」「空投授权」为理由索取助记词的行为，均为诈骗。3Tree 团队永远不会主动联系您索取任何信息。' },
      { type: 'h3', text: '界面概览' },
      { type: 'p', text: '3Tree 的主界面分为三个核心 Tab：<strong>资产</strong>（查看余额、代币与 NFT）、<strong>探索 / DApp</strong>（浏览链上应用与活动页）、<strong>我的</strong>（设置、安全与钱包管理）。顶部可快速切换当前网络，底部导航栏在各功能间切换。' },
    ],
  },

  /* ═══ 钱包管理 ═══ */
  {
    id: 'wallet',
    title: '钱包管理',
    desc: '了解如何创建、导入和管理多个钱包，以及子地址的派生机制。',
    blocks: [
      { type: 'h3', text: '创建新钱包' },
      { type: 'p', text: '选择「创建新钱包」后，应用会生成一组 12 个单词的助记词（遵循 BIP39 标准）。请务必在离线环境下将助记词抄写到纸上，至少保存两份副本于不同位置。' },
      { type: 'tip', text: '💡 助记词等同于钱包的「主密钥」。任何人拿到您的助记词，即可完全控制该钱包下的所有资产。' },
      { type: 'h3', text: '导入钱包' },
      { type: 'p', text: '3Tree 支持三种方式导入已有钱包：' },
      { type: 'ul', items: [
        '<strong>助记词导入</strong>：输入 12 或 24 个单词的助记词短语，自动派生全部链地址。这是最推荐的导入方式。',
        '<strong>私钥导入</strong>：输入单条链的私钥（如以太坊的 0x… 格式私钥或 TRON 的 hex 格式私钥），仅导入该链的地址。',
        '<strong>Keystore 导入</strong>：导入 JSON 格式的 Keystore 文件并输入对应密码。',
      ]},
      { type: 'h3', text: '多钱包管理' },
      { type: 'p', text: '3Tree 支持创建多个独立钱包。每个钱包拥有独立的助记词和地址体系。在首页点击钱包名称可切换钱包，也可进入「选择钱包与地址」页面统一管理所有钱包。' },
      { type: 'h3', text: '子地址' },
      { type: 'p', text: '每个助记词钱包支持派生最多 50 个子地址。子地址共享同一组助记词，但拥有不同的链上地址，适合用于资产隔离或隐私管理。' },
      { type: 'ul', items: [
        'EVM 链子地址派生路径：m/44\'/60\'/0\'/0/n',
        'TRON 链子地址派生路径：m/44\'/195\'/0\'/0/n',
        '仅助记词钱包支持子地址派生，私钥 / Keystore 导入的钱包不支持',
        '在「选择钱包与地址」页可逐个添加或批量添加（单次最多 100 个）',
      ]},
      { type: 'h3', text: '钱包设置' },
      { type: 'p', text: '在当前钱包组底部可进入「钱包设置」，支持重命名钱包、查看助记词（需生物识别验证）、导出私钥等操作。' },
    ],
  },

  /* ═══ 资产管理 ═══ */
  {
    id: 'asset',
    title: '资产管理',
    desc: '查看余额、管理代币、收发资产与查询交易历史。',
    blocks: [
      { type: 'h3', text: '资产总览' },
      { type: 'p', text: '首页展示当前网络下的主链币余额、代币列表与 NFT 集合。切换网络即切换余额、历史与计价口径，各链数据独立核算。总资产估值会随当前网络自动更新。' },
      { type: 'h3', text: '代币管理' },
      { type: 'p', text: '点击「管理代币」可查看当前链的代币列表，支持添加自定义代币。添加时需输入合约地址，应用会按链校验地址格式（EVM 为 0x… 开头，TRON 为 T… 开头）。' },
      { type: 'h3', text: '收款' },
      { type: 'p', text: '点击「收款」展示当前网络的地址二维码，可复制地址或分享二维码给付款方。不同网络的地址格式不同，请确认收款网络后再分享。' },
      { type: 'h3', text: '转账' },
      { type: 'p', text: '点击「转账」后输入收款地址、选择代币并填写金额。应用会实时估算手续费，广播前可在确认页完整查看费用、收款人信息与 calldata。' },
      { type: 'ul', items: [
        '支持扫码收款 / 付款（扫描对方地址二维码）',
        '支持地址簿：常用地址可保存备注，免去每次粘贴',
        '支持批量转账：逐笔估价、签名与广播',
        'TRON 用户可在转账页一键跳转能量与带宽租赁，显著降低 TRC-20 单笔成本',
      ]},
      { type: 'h3', text: '交易历史' },
      { type: 'p', text: '在资产详情页可查看当前代币的交易记录。每笔交易均可跳转至对应的区块浏览器查看详情。交易列表按时间倒序排列，混合本地记录与链上历史。' },
    ],
  },

  /* ═══ 闪兑 ═══ */
  {
    id: 'swap',
    title: '闪兑',
    desc: '在同一链上快速兑换不同代币，多家聚合器比价，下单前可查看完整路由信息。',
    blocks: [
      { type: 'h3', text: '什么是闪兑' },
      { type: 'p', text: '闪兑（Swap）是指在同一条链上将一种代币兑换为另一种代币。例如在 Ethereum 上将 ETH 兑换为 USDC，或在 BNB Chain 上将 BNB 兑换为 BUSD。闪兑不涉及跨链操作，资产始终在同一链上。' },
      { type: 'h3', text: '聚合器报价' },
      { type: 'p', text: '3Tree 集成了两家闪兑聚合器，自动比价并选择最优报价：' },
      { type: 'ul', items: [
        '<strong>LI.FI</strong>：跨链与同链闪兑均支持，路由覆盖主流 DEX',
        '<strong>KyberSwap</strong>：仅支持同链闪兑，作为第二比价源提供竞争报价',
      ]},
      { type: 'tip', text: '💡 当两家聚合器都返回报价时，应用会自动选择到账量更优的那一个。您也可以在报价详情中手动切换聚合源。' },
      { type: 'h3', text: '滑点设置' },
      { type: 'p', text: '滑点是指交易执行时价格可能偏离报价的幅度。在闪兑页点击右上角设置图标，可自定义滑点容忍度（默认 0.5%）和报价到期时间。滑点设置过低可能导致交易失败，过高则可能遭受三明治攻击。' },
      { type: 'h3', text: '使用步骤' },
      { type: 'steps', items: [
        { title: '选择代币对', desc: '在闪兑页选择源代币（From）和目标代币（To），可点击切换按钮互换方向。' },
        { title: '输入金额', desc: '输入要兑换的源代币数量，应用会实时显示预计到账量和汇率。' },
        { title: '查看报价详情', desc: '展开报价详情可查看路由路径、聚合源、滑点和手续费估算。' },
        { title: '确认并签名', desc: '首次兑换某代币时需要先进行 ERC-20 授权（Approve），之后再执行兑换交易。每步均需生物识别或密码确认。' },
      ]},
      { type: 'warn', text: '⚠️ 闪兑仅支持有内置代币定义的链（如 ETH、BSC、TRX 等主网），自定义 EVM 网络无法使用闪兑功能。' },
    ],
  },

  /* ═══ 跨链桥 ═══ */
  {
    id: 'bridge',
    title: '跨链桥',
    desc: '将资产从一条链转移到另一条链，自动选择最优桥接路径。',
    blocks: [
      { type: 'h3', text: '什么是跨链桥' },
      { type: 'p', text: '跨链桥（Bridge）是将资产从一条区块链转移到另一条区块链的方式。例如将 Ethereum 上的 ETH 转移到 Arbitrum，或将 BNB Chain 上的 USDT 转移到 TRON。跨链操作涉及两条不同的链，需要通过桥接协议完成。' },
      { type: 'h3', text: '桥接路由' },
      { type: 'p', text: '3Tree 的跨链能力由以下聚合器承担：' },
      { type: 'ul', items: [
        '<strong>LI.FI</strong>：承担 EVM 链之间的跨链桥接（如 ETH ↔ BSC ↔ Arbitrum ↔ Base 等）',
        '<strong>deBridge</strong>：承担涉及 TRON 的跨链桥接（如 ETH ↔ TRON、BSC ↔ TRON）',
      ]},
      { type: 'tip', text: '💡 当您在闪兑页选择的 From 和 To 分属不同链时，应用会自动切换到跨链模式。此时 KyberSwap 会被置灰（它仅支持同链），跨链报价由 LI.FI 或 deBridge 提供。' },
      { type: 'h3', text: '使用步骤' },
      { type: 'steps', items: [
        { title: '选择不同链', desc: '在闪兑页将 From 和 To 切换到不同的链（如 From 选 Ethereum，To 选 Arbitrum），页面自动进入跨链模式。' },
        { title: '查看桥接报价', desc: '应用会显示桥接路径、预计到账时间、手续费和桥接协议。不同路径的时间和费用可能差异较大。' },
        { title: '确认并签名', desc: '确认交易详情后签名。跨链交易通常需要更长的等待时间（几分钟到几十分钟不等），请耐心等待。' },
      ]},
      { type: 'warn', text: '⚠️ 跨链交易一旦发起不可撤回。请仔细核对目标链和收款地址，确保选择正确的网络。' },
    ],
  },

  /* ═══ 子地址 ═══ */
  {
    id: 'subaddr',
    title: '子地址',
    desc: '从同一组助记词派生多个独立地址，用于资产隔离与隐私管理。',
    blocks: [
      { type: 'h3', text: '什么是子地址' },
      { type: 'p', text: '子地址（Sub-address）是从同一组助记词通过不同派生路径生成的独立地址。每个子地址在链上表现为完全不同的账户，拥有独立的余额和交易历史，但它们都受同一组助记词控制。' },
      { type: 'h3', text: '使用场景' },
      { type: 'ul', items: [
        '<strong>资产隔离</strong>：将长期持有的资产与日常交易资产分开存放',
        '<strong>隐私保护</strong>：不同场景使用不同地址收款，避免地址关联',
        '<strong>多身份管理</strong>：在同一钱包中管理不同用途的资金',
      ]},
      { type: 'h3', text: '添加子地址' },
      { type: 'p', text: '在「选择钱包与地址」页面，每组助记词底部有三个操作：' },
      { type: 'ul', items: [
        '<strong>添加子地址</strong>：逐个派生新的子地址',
        '<strong>批量添加</strong>：一次性派生多个子地址（通过 BatchSubWalletSheet 弹层设置数量，支持全屏生成动画）',
        '<strong>钱包设置</strong>：进入当前钱包的设置页',
      ]},
      { type: 'tip', text: '💡 批量添加功能可精确落到被点击的那组钱包，不会误将地址派生到其他钱包组。每个钱包最多支持 50 个子地址。' },
    ],
  },

  /* ═══ 多签金库 ═══ */
  {
    id: 'multisig',
    title: '多签金库',
    desc: '创建和管理链上多签金库，多人在场方可执行交易，适用于团队资金与社区国库。',
    blocks: [
      { type: 'h3', text: '什么是多签金库' },
      { type: 'p', text: '多签金库（Multi-Sig Vault）是一种智能合约钱包，要求多个人共同签名才能执行交易。例如一个 3-of-5 的多签金库有 5 个成员，任何交易必须至少 3 个人确认后才能执行。多签金库的规则由链上合约保管，而非应用本身。' },
      { type: 'h3', text: '创建金库' },
      { type: 'p', text: '在「多签金库」页面点击「创建金库」，选择链（支持所有 EVM 链），设置成员地址列表和签名阈值（threshold）。部署交易需要一笔 gas 费。' },
      { type: 'ul', items: [
        '成员数量上限 50 人',
        '阈值（threshold）表示执行交易所需的最少确认数',
        '部署后金库地址上链可查，任何人可通过地址导入',
      ]},
      { type: 'h3', text: '提案与执行' },
      { type: 'p', text: '金库的每笔交易都以「提案」形式进行。完整流程如下：' },
      { type: 'steps', items: [
        { title: '提交提案', desc: '任一成员发起交易提案，指定目标地址、金额和 calldata。提案提交后上链记录。' },
        { title: '成员确认', desc: '其他成员在待决列表中查看提案详情，逐一确认（签名）。确认数达到阈值后即可执行。' },
        { title: '执行交易', desc: '任一成员点击「执行」，将交易广播到链上。执行结果（成功或失败）同样记录在链上。' },
      ]},
      { type: 'h3', text: '管理操作' },
      { type: 'p', text: '金库成员可以通过提案进行以下管理操作：' },
      { type: 'ul', items: [
        '<strong>添加成员</strong>（addOwner）：增加新的签署人',
        '<strong>移除成员</strong>（removeOwner）：移除某个签署人',
        '<strong>替换成员</strong>（replaceOwner）：将一个成员替换为另一个地址',
        '<strong>修改阈值</strong>（changeRequirement）：调整执行交易所需的最少确认数',
        '<strong>ERC-20 转账</strong>（transfer）：从金库转出 ERC-20 代币',
      ]},
      { type: 'tip', text: '💡 所有管理操作的 calldata selector 均由应用现算（与合约字节码对应），杜绝 UI 字面量抄错导致的盲签风险。' },
      { type: 'h3', text: '导入金库' },
      { type: 'p', text: '如果您知道一个已部署的多签金库地址，可以在「多签金库」页面通过地址导入。应用会自动从链上读取成员列表和阈值信息。同链同地址的金库只保留一条记录，重复导入会更新链上读回的最新信息。' },
    ],
  },

  /* ═══ DApp 浏览器 ═══ */
  {
    id: 'dapp',
    title: 'DApp 浏览器',
    desc: '内置浏览器连接链上应用，支持 EIP-1193 Provider 与 TronWeb 注入。',
    blocks: [
      { type: 'h3', text: '概述' },
      { type: 'p', text: '3Tree 内置了一个 WebView 浏览器，可以直接访问链上 DApp（去中心化应用）。浏览器会注入钱包 Provider，使 DApp 能够请求连接、签名和交易——所有请求均需您在原生确认弹层中逐项核对后才会执行。' },
      { type: 'h3', text: 'EVM 链支持' },
      { type: 'p', text: '在 EVM 链上，浏览器注入 EIP-1193 兼容的 Provider，支持以下方法：' },
      { type: 'ul', items: [
        '<strong>eth_requestAccounts</strong>：请求连接钱包，返回当前地址',
        '<strong>eth_chainId</strong>：返回当前链 ID',
        '<strong>wallet_switchEthereumChain</strong>：请求切换到指定链',
        '<strong>personal_sign</strong>：签名一条消息',
        '<strong>eth_signTypedData_v4</strong>：EIP-712 类型化数据签名',
        '<strong>eth_sendTransaction</strong>：发送交易（需原生确认）',
      ]},
      { type: 'p', text: '兼容 wagmi、web3-react、RainbowKit 等主流前端栈。同时支持 EIP-6963 多 Provider 发现协议。' },
      { type: 'h3', text: 'TRON 链支持' },
      { type: 'p', text: '在 TRON 链上，浏览器注入 window.tronWeb 和 window.tronLink 对象，提供地址查询、交易签名等能力。涉及私钥操作的方法（如签名和发送交易）会转回原生确认闸口。' },
      { type: 'h3', text: '安全确认' },
      { type: 'p', text: '每次 DApp 请求连接或签名时，3Tree 都会弹出原生确认弹层，完整展示：' },
      { type: 'ul', items: [
        '请求来源的 DApp 域名和图标',
        '签名类型（消息签名 / 类型化数据 / 交易）',
        '交易的完整 calldata 解码（如代币转账会显示目标地址和金额）',
        'gas 费用估算',
      ]},
      { type: 'p', text: '您可以逐条核对后选择「确认」或「拒绝」。会话权限可以随时在菜单中撤销。' },
      { type: 'h3', text: '探索页与精选位' },
      { type: 'p', text: 'DApp 页顶部有精选运营位（由 ops.json 远端清单驱动），展示当前活动与推荐 DApp。下方提供分类浏览（DeFi、NFT、工具等）和最近访问记录。您也可以直接在地址栏输入任意 URL 访问。' },
      { type: 'tip', text: '💡 活动页与普通浏览器页共用同一套 BrowserScreen，但活动模式会隐藏地址栏、按活动清单限制可切换的链，并对清单外的合约地址亮红条告警。' },
    ],
  },

  /* ═══ 个人中心 ═══ */
  {
    id: 'profile',
    title: '个人中心',
    desc: '网络管理、授权管理、安全设置与检查更新等配置入口。',
    blocks: [
      { type: 'h3', text: '网络管理' },
      { type: 'p', text: '在「我的 → 网络管理」中可以查看全部已配置的网络列表，包括 103 条主网、10 条测试网和用户自定义的 EVM 网络。每个网络显示原生币符号和 Chain ID。点击网络可切换为当前活跃网络。' },
      { type: 'h3', text: '自定义 EVM 网络' },
      { type: 'p', text: '支持手动添加自定义 EVM 网络。添加时需要填写：网络名称、RPC URL、Chain ID 和原生币符号。应用会为自定义网络生成渐变色标。注意：自定义网络无法使用闪兑功能（聚合器不支持）。' },
      { type: 'h3', text: '授权管理' },
      { type: 'p', text: '在「我的 → 授权管理」中可以查看和管理 ERC-20 代币的合约授权。当您在 DApp 中进行闪兑或交易时，某些合约会被授权动用您的代币。授权管理页可以按链查看当前所有有效授权，并支持一键撤销。' },
      { type: 'warn', text: '⚠️ 定期检查并撤销不再使用的授权是重要的安全习惯。过期的授权可能被恶意合约利用。' },
      { type: 'h3', text: '安全设置' },
      { type: 'p', text: '安全设置包括：' },
      { type: 'ul', items: [
        '<strong>生物识别</strong>：启用指纹 / 面容识别来保护签名操作',
        '<strong>剪贴板清理</strong>：应用退到后台时自动清理剪贴板中的地址，防止剪贴板劫持',
        '<strong>修改密码</strong>：修改本地加密存储的密码',
      ]},
      { type: 'h3', text: '检查更新' },
      { type: 'p', text: '在「我的 → 检查更新」中手动检查是否有新版本。应用启动时也会自动检查。更新流程要求 versionCode 严格高于本机版本，并依次校验 APK SHA-256 与签名证书 SHA-256，任一不符即中止安装。' },
    ],
  },

  /* ═══ 安全机制 ═══ */
  {
    id: 'security',
    title: '安全机制',
    desc: '3Tree 的四项底层安全设计：签名前充分知情、安装来源自校验、更新双重校验、公示与校验同源。',
    blocks: [
      { type: 'h3', text: '签名前充分知情' },
      { type: 'p', text: '费用、滑点、合约地址与收款人信息均在确认页完整列示。无法确认的交易可以拒绝签名——这是自持钱包的最后一道防线。多签金库的提案详情同样完整展示 calldata 解码结果。' },
      { type: 'h3', text: '安装来源自校验' },
      { type: 'p', text: '应用启动时自动核对自身包名与签名证书指纹。经重新打包、冒名的仿冒副本无法运行。官方证书指纹固化于代码之中，不依赖任何远程配置。' },
      { type: 'h3', text: '更新双重校验' },
      { type: 'p', text: '应用内更新要求 versionCode 严格高于本机版本，并依次校验 APK SHA-256 与签名证书 SHA-256，任一不符即中止安装。更新来源为唯一的版本清单 version.json，与官网公示同源。' },
      { type: 'h3', text: '公示与校验同源' },
      { type: 'p', text: '官网公示的 APK SHA-256 和签名证书 SHA-256 与应用读取的版本清单由发版流程逐字段比对，二者必须完全一致。任何分叉都将阻止发布。' },
      { type: 'h3', text: '密钥存储' },
      { type: 'p', text: '助记词与私钥仅存储在本机的加密存储区域（Android Keystore），不上传、不托管、不代签。3Tree 服务端不持有任何用户密钥，也无法恢复您的助记词。' },
    ],
  },

  /* ═══ 支持的网络 ═══ */
  {
    id: 'networks',
    title: '支持的网络',
    desc: '3Tree 支持 103 条主网和 10 条测试网，覆盖 8 类链生态。',
    blocks: [
      { type: 'h3', text: '主网列表' },
      { type: 'p', text: '以下 103 条主网开箱即用，全部支持余额查看、交易历史与发送：' },
      { type: 'table', headers: ['网络', '原生币', '类型', 'Chain ID'], rows: [
        ['Bitcoin', 'BTC', 'UTXO · BIP84', '—'],
        ['Ethereum', 'ETH', 'EVM', '1'],
        ['BNB Chain', 'BNB', 'EVM', '56'],
        ['Solana', 'SOL', 'SOLANA · SPL', '—'],
        ['Tron', 'TRX', 'TRON · TRC-20', '—'],
        ['Robinhood Chain', 'ETH', 'EVM (L3)', '4663'],
        ['Base', 'ETH', 'EVM (L2)', '8453'],
        ['Dogecoin', 'DOGE', 'UTXO · P2PKH', '—'],
        ['Optimism', 'ETH', 'EVM (L2)', '10'],
        ['Arbitrum One', 'ETH', 'EVM (L2)', '42161'],
        ['Polygon', 'POL', 'EVM', '137'],
        ['Avalanche', 'AVAX', 'EVM', '43114'],
        ['HyperEVM', 'HYPE', 'EVM', '999'],
        ['X Layer', 'OKB', 'EVM (zkL2)', '196'],
        ['opBNB', 'BNB', 'EVM (L2)', '204'],
        ['Unichain', 'ETH', 'EVM (L2)', '130'],
        ['TON', 'TON', 'TON · V3R2', '—'],
        ['XRP', 'XRP', 'XRPL · classic', '—'],
        ['Aptos', 'APT', 'APTOS · ed25519', '—'],
        ['Sui', 'SUI', 'SUI · MIST', '—'],
        ['World Chain', 'ETH', 'EVM (L2)', '480'],
        ['Linea', 'ETH', 'EVM (zkL2)', '59144'],
        ['HashKey Chain', 'HSK', 'EVM (L2)', '177'],
        ['Plasma', 'XPL', 'EVM (L1)', '9745'],
      ]},
      { type: 'h3', text: '测试网' },
      { type: 'p', text: '10 条测试网用于开发联调：Ethereum Sepolia、BNB Chain Testnet、Polygon Amoy、Optimism Sepolia、Arbitrum Sepolia、Base Sepolia、Avalanche Fuji、Solana Devnet、Tron Nile 和 Arc Testnet。' },
      { type: 'h3', text: '自定义网络' },
      { type: 'p', text: 'EVM 网络支持自定义添加。在「我的 → 网络管理」中可添加任意 EVM 兼容网络，需填写 RPC URL、Chain ID 和原生币符号。' },
    ],
  },

  /* ═══ 术语表 ═══ */
  {
    id: 'glossary',
    title: '术语表',
    desc: '加密货币与区块链常用术语速查。',
    blocks: [
      { type: 'h3', text: '基础概念' },
      { type: 'p', text: '以下为加密货币领域最常见的术语，了解这些概念有助于更安全地使用钱包。' },
    ],
  },

  /* ═══ 合约地址 ═══ */
  {
    id: 'contracts',
    title: '合约地址',
    desc: '3Tree 闪兑与跨链功能涉及的聚合器合约地址，以及多签金库合约地址。',
    blocks: [
      { type: 'h3', text: '多签金库合约' },
      { type: 'p', text: '3Tree 多签金库使用部署上链的 MultiSigWallet 合约。每次创建金库时会部署一份新的合约实例，因此没有统一的合约地址。合约源码与 ABI 可在项目文档中查看。' },
      { type: 'h3', text: '聚合器路由' },
      { type: 'p', text: '闪兑与跨链的报价通过聚合器 API 获取，交易路由到各链上的 DEX 流动性池执行。以下是主要聚合器的信息：' },
      { type: 'ul', items: [
        '<strong>LI.FI</strong>：同链闪兑 + EVM 跨链桥接，路由覆盖主流 DEX（Uniswap、1inch、Paraswap 等）',
        '<strong>KyberSwap</strong>：仅同链闪兑，使用 aggregator-api.kyberswap.com 端点',
        '<strong>deBridge</strong>：涉及 TRON 的跨链桥接',
      ]},
      { type: 'tip', text: '💡 聚合器不会将资产发送到 3Tree 的任何地址。所有交易路由均通过各链上的 DEX 合约执行，您可以在交易详情中查看完整的路由路径和中间合约地址。' },
    ],
  },

  /* ═══ 常见问题解答 ═══ */
  {
    id: 'faq',
    title: '常见问题解答',
    desc: '3Tree 钱包常见问题：安全性、支持的网络、闪兑与跨链、助记词与私钥等。',
    blocks: [
      { type: 'h3', text: '3Tree 钱包安全吗？' },
      { type: 'p', text: '3Tree 是一款自持钱包（非托管钱包），私钥和助记词仅存储在您的设备本地，使用 Android Keystore 加密保存。3Tree 服务器不收集、不上传、不托管任何用户密钥数据。每一笔交易均由您的设备本地签名，无需将私钥发送给任何第三方。' },
      { type: 'h3', text: '3Tree 支持哪些区块链？' },
      { type: 'p', text: '3Tree 目前支持 103 条主网，覆盖 8 类链生态：' },
      { type: 'ul', items: [
        '<strong>EVM 链</strong>：Ethereum、BNB Chain、Base、Arbitrum、Optimism、Polygon、Avalanche、Linea、opBNB 等',
        '<strong>UTXO 链</strong>：Bitcoin (BTC)、Dogecoin (DOGE)',
        '<strong>TRON</strong>：支持 TRC-20 代币转账与闪兑',
        '<strong>Solana</strong>：支持 SPL 代币与 NFT',
        '<strong>TON</strong>：支持 TON 原生转账',
        '<strong>XRP Ledger</strong>：支持 XRP 发送',
        '<strong>Aptos</strong>：支持 APT 代币管理',
        '<strong>Sui</strong>：支持 SUI 代币管理',
      ]},
      { type: 'p', text: '此外还支持 10 条测试网用于开发联调，EVM 网络支持自定义添加。' },
      { type: 'h3', text: '什么是闪兑？和跨链桥有什么区别？' },
      { type: 'p', text: '<strong>闪兑</strong>（Swap）是指在同一条链上将一种代币兑换为另一种代币，例如在 Ethereum 上将 ETH 换成 USDT。闪兑通过聚合器（如 KyberSwap、LI.FI）自动寻找最优报价路径。' },
      { type: 'p', text: '<strong>跨链桥</strong>（Bridge）是将资产从一条区块链转移到另一条区块链，例如将 Ethereum 上的 ETH 转到 BNB Chain。3Tree 使用 LI.FI 和 deBridge 等跨链协议实现资产跨链转移。' },
      { type: 'h3', text: '助记词丢了怎么办？' },
      { type: 'p', text: '助记词是钱包的最高权限凭证，一旦丢失且没有其他备份，资产将<strong>无法恢复</strong>。3Tree 作为自持钱包，不存储用户的助记词，因此无法协助找回。请务必在创建钱包时将助记词抄写到纸上，并保存在至少两个不同的安全位置。' },
      { type: 'warn', text: '⚠️ 任何声称能帮您「找回助记词」或「恢复钱包」的人都是骗子。3Tree 团队永远不会主动联系您索取任何信息。' },
      { type: 'h3', text: '3Tree 是开源的吗？' },
      { type: 'p', text: '是的，3Tree 是一款开源钱包。您可以在 GitHub 上查看完整的源代码。开源意味着任何人都可以审计代码，确认应用确实如所述那样处理用户数据与密钥。' },
      { type: 'h3', text: '如何从其他钱包迁移到 3Tree？' },
      { type: 'p', text: '如果您已有其他钱包（如 MetaMask、Trust Wallet、TokenPocket 等），只需将助记词导出并在 3Tree 中选择「导入钱包」即可。3Tree 支持 BIP39 标准的 12 或 24 个单词的助记词，导入后会自动派生全部链的地址。迁移完成后，建议在原钱包中撤销对旧设备的授权。' },
      { type: 'h3', text: '3Tree 收费吗？' },
      { type: 'p', text: '3Tree 应用本身完全免费，不收取任何服务费或订阅费。使用闪兑和跨链功能时，您需要支付区块链网络的 Gas 费（矿工费），这是支付给区块链网络的费用，与 3Tree 无关。' },
      { type: 'h3', text: '手机丢了怎么办？' },
      { type: 'p', text: '如果您的手机丢失或损坏，只要您已离线备份了助记词，就可以在任意兼容 BIP39 的钱包中导入助记词并重新派生全部地址，恢复对资产的访问。如果您没有备份助记词，资产将无法恢复。' },
      { type: 'h3', text: '什么是多签金库？' },
      { type: 'p', text: '多签金库（Multi-Sig Vault）是一种需要多个私钥共同签名才能执行交易的钱包机制。例如 3-of-5 多签意味着 5 个成员中至少需要 3 人确认才能发起交易。多签金库适合团队资金管理、项目金库、DAO 治理等场景，防止单人掌控全部资产。' },
      { type: 'h3', text: '3Tree 支持哪些语言？' },
      { type: 'p', text: '3Tree 目前支持 12 种界面语言，包括简体中文、繁体中文、英语、日语、韩语、西班牙语、葡萄牙语、俄语、土耳其语、越南语、泰语和印尼语。您可以在「我的 → 语言设置」中切换。' },
    ],
  },
];

/* ── 术语表数据（单独渲染为卡片网格） ──────────────────── */
export interface GlossaryTerm {
  name: string;
  tag: string;
  def: string;
}

export const GLOSSARY: GlossaryTerm[] = [
  { name: '助记词 (Mnemonic)', tag: '基础', def: '一组 12 或 24 个英文单词，按 BIP39 标准生成，是钱包的最高权限凭证。任何人拿到助记词即可完全控制对应钱包的全部资产。' },
  { name: '私钥 (Private Key)', tag: '基础', def: '一条随机生成的 256 位数字，用于对交易进行数字签名。每个地址对应一条私钥。助记词可以派生出多条私钥。' },
  { name: '区块链 (Blockchain)', tag: '基础', def: '一个去中心化的分布式账本，由一系列按时间顺序排列的「区块」组成。每个区块包含一批交易记录，并通过密码学与前一个区块链接。' },
  { name: 'Gas 费', tag: '交易', def: '在区块链上执行交易或合约调用时需要支付的手续费。Gas 费以该链的原生币支付（如 ETH、BNB），费用高低取决于网络拥堵程度和交易复杂度。' },
  { name: '智能合约 (Smart Contract)', tag: '基础', def: '部署在区块链上的程序代码，按照预设规则自动执行。多签金库、DEX、借贷协议等都以智能合约形式运行。' },
  { name: 'DEX (去中心化交易所)', tag: '交易', def: 'Decentralized Exchange，无需中心化中介即可进行代币兑换的链上协议。常见 DEX 包括 Uniswap、PancakeSwap、Raydium 等。闪兑功能的路由最终会到达 DEX 执行。' },
  { name: 'ERC-20', tag: '代币标准', def: 'Ethereum 上最常见的代币标准。定义了代币的转账、授权、余额查询等统一接口。USDT、USDC、UNI 等都是 ERC-20 代币。' },
  { name: 'TRC-20', tag: '代币标准', def: 'TRON 链上的代币标准，功能与 ERC-20 类似。USDT-TRC20 是最常见的跨链稳定币转账格式之一。' },
  { name: 'NFT (非同质化代币)', tag: '代币标准', def: 'Non-Fungible Token，每个代币都是独一无二的，不可互换。常用于数字艺术、游戏道具、会员凭证等场景。' },
  { name: 'DApp (去中心化应用)', tag: '应用', def: 'Decentralized Application，后端逻辑运行在区块链上的应用程序。用户通过钱包（如 3Tree 的内置浏览器）连接 DApp 并进行交互。' },
  { name: '多签 (Multi-Signature)', tag: '安全', def: '要求多个私钥中的若干个共同签名才能执行交易的机制。例如 3-of-5 多签需要 5 个成员中至少 3 人确认。常用于团队资金管理。' },
  { name: '跨链桥 (Bridge)', tag: '交易', def: '将资产从一条区块链转移到另一条区块链的协议。跨链桥通过锁定源链资产并在目标链铸造对应资产来实现转移。' },
  { name: '滑点 (Slippage)', tag: '交易', def: '交易执行时的实际价格与预期报价之间的偏差。网络拥堵或流动性不足时滑点可能增大。设置合理的滑点容忍度可以避免交易失败或遭受价格损失。' },
  { name: '授权 (Approve)', tag: '交易', def: 'ERC-20 代币在进行闪兑或 DApp 交互前，需要先「授权」目标合约动用一定数量的代币。授权后该合约可以在不再次确认的情况下转走已授权额度的代币。' },
  { name: 'RPC 节点', tag: '基础设施', def: 'Remote Procedure Call 节点，是应用与区块链通信的中间层。应用通过 RPC 节点查询余额、广播交易和读取合约数据。3Tree 为每条链配置了多个公共 RPC 节点。' },
  { name: '区块浏览器 (Block Explorer)', tag: '基础设施', def: '用于查看区块链上交易、地址和区块信息的网站。如 Etherscan（以太坊）、BscScan（BNB Chain）、Tronscan（TRON）等。3Tree 中的交易记录均可跳转到对应浏览器查看。' },
  { name: 'EVM (以太坊虚拟机)', tag: '基础设施', def: 'Ethereum Virtual Machine，以太坊的智能合约运行环境。许多其他链（如 BSC、Arbitrum、Base）也兼容 EVM，因此可以复用以太坊的工具和开发框架。' },
  { name: '自持钱包 (Self-Custody Wallet)', tag: '安全', def: '用户自己保管私钥和助记词的钱包类型。与交易所账户（托管型）不同，自持钱包的资产安全完全由用户自己负责。3Tree 是一款自持钱包。' },
  { name: 'Chain ID', tag: '基础设施', def: '每条 EVM 链的唯一标识数字。例如 Ethereum 主网的 Chain ID 为 1，BNB Chain 为 56。Chain ID 用于防止交易在不同链之间被重放。' },
  { name: 'Keystore', tag: '安全', def: '一种加密存储私钥的 JSON 文件格式，常见于以太坊生态。导入 Keystore 时需要同时提供对应的密码才能解密出私钥。' },
];

'use client';

import Link from 'next/link';
import { useLang } from './i18n';
import './legal.css';

/* ── 服务条款内容（中文源语言，通过 t() 翻译） ─────────────── */
const TOS_BLOCKS = [
  {
    h: '一、定义与接受',
    body: `<p>本服务条款（以下简称"条款"）适用于您使用 3Tree 钱包应用程序（以下简称"应用"或"3Tree"）的所有行为。下载、安装或使用本应用即表示您已阅读、理解并同意受本条款约束。如果您不同意本条款的任何内容，请勿使用本应用。</p>
<p>3Tree 由 ThreeTree PTE. LTD.（以下简称"我们"或"公司"）开发与运营。</p>
<p>本条款构成您与公司之间关于 3Tree 使用的具有法律约束力的协议。公司保留随时更新本条款的权利，更新后的条款将在应用内或官网发布后立即生效，无需额外通知。如果您不接受更新后的条款，应立即停止使用 3Tree。继续使用即视为接受修改后的条款。</p>
<p><strong>如果您未满 18 周岁，或不具备完全民事行为能力，请在父母或法定监护人的指导下使用 3Tree。</strong></p>`,
  },
  {
    h: '二、服务性质与范围',
    body: `<p><strong>3Tree 是一款非托管（self-custody）加密货币钱包。</strong>这意味着：</p>
<ul>
<li>您的私钥和助记词仅在您的设备上本地加密存储，我们从不上传、存储或访问您的私钥、助记词或任何敏感信息。</li>
<li>我们不托管您的资产，不对您的资产安全承担保管责任。资产安全完全由您自行负责。</li>
<li>我们不控制您的交易，无法冻结、逆转或干预任何链上操作。</li>
<li>我们不提供任何金融、投资或交易建议。</li>
</ul>
<h3>2.1 具体服务功能</h3>
<ul>
<li><strong>创建或导入钱包：</strong>使用 3Tree 生成新钱包或导入兼容的第三方钱包。</li>
<li><strong>转账与收款：</strong>使用私钥对交易进行电子签名，在相应区块链上修改账本。实际转账和收款操作发生在区块链系统上，而非 3Tree 内部。</li>
<li><strong>数字资产管理：</strong>添加、存储和删除 3Tree 支持的数字代币。</li>
<li><strong>行情查看：</strong>查看 3Tree 支持的数字代币汇率信息。</li>
<li><strong>浏览 DApp：</strong>通过 3Tree 提供的链接访问去中心化应用（包括公司自有和第三方 DApp）。</li>
<li><strong>交易记录：</strong>3Tree 通过区块链系统复制您的全部或部分交易记录。但区块链系统上维护的交易记录应被视为权威来源。</li>
<li><strong>代币闪兑：</strong>用户可通过第三方智能合约或去中心化交易所（DEX）进行代币兑换。3Tree 仅作为界面工具促进用户与第三方的交互。</li>
<li><strong>质押服务：</strong>访问质押服务时，第三方可能代表您在相应区块链网络上质押您的数字资产。3Tree 不对质押服务产生的任何问题负责。</li>
</ul>
<h3>2.2 第三方内容与服务</h3>
<p>3Tree 中集成的 DApp 包括公司自有和第三方平台提供的服务。对于第三方 DApp，3Tree 仅作为区块链浏览器，帮助用户访问这些 DApp。</p>
<ul>
<li>您可能需要通过第三方提供商创建单独账户才能使用其服务。</li>
<li>您对第三方内容和服务的使用是自愿的，受本条款约束，但也可能受第三方提供商另行规定的条款和条件管辖。</li>
<li>您有责任了解这些第三方服务的条款和条件，包括其隐私政策下如何处理您的信息。</li>
<li>3Tree 不验证、控制或认可第三方内容或服务，对其使用产生的损失不承担责任。访问此类内容和服务的风险由您自行承担。</li>
</ul>`,
  },
  {
    h: '三、用户须知与责任',
    body: `<h3>3.1 非托管特性——我们无法提供的服务</h3>
<p>与区块链的去中心化特性一致，为保护用户数字代币安全，3Tree 以去中心化模式运营，不提供以下服务：</p>
<ul>
<li>存储用户的钱包密码、私钥、助记词或 Keystore。</li>
<li>恢复用户的钱包密码、私钥、助记词或 Keystore。</li>
<li>冻结钱包。</li>
<li>挂失钱包。</li>
<li>恢复钱包。</li>
<li>撤销交易。</li>
</ul>
<p>因此，用户需自行负责保管包含 3Tree 的设备，并备份 3Tree、钱包密码、助记词、私钥和 Keystore。在以下情况下，公司无法恢复钱包或获取这些凭证：</p>
<ul>
<li>丢失设备；</li>
<li>未备份即删除 3Tree；</li>
<li>未备份即删除钱包；</li>
<li>钱包被盗；</li>
<li>忘记钱包密码、私钥、助记词或 Keystore。</li>
</ul>
<p>同样，如果用户在交易中操作失误（如输入错误的转账地址），公司也无法取消交易。</p>
<h3>3.2 您的责任</h3>
<ul>
<li><strong>妥善保管助记词和私钥。</strong>助记词是恢复钱包的唯一方式。丢失助记词意味着永久失去资产访问权，我们无法为您恢复。</li>
<li><strong>不要向任何人透露助记词或私钥。</strong>任何索取助记词的行为均为诈骗，3Tree 团队永远不会主动联系您索要助记词。</li>
<li><strong>自行核实交易信息。</strong>在签名和广播交易前，请仔细确认交易内容、目标地址和金额。</li>
<li><strong>安全存储备份。</strong>创建或导入钱包时，建议安全地备份钱包凭证（钱包密码、私钥、助记词、Keystore）。避免使用截图、电子邮件、备忘录、短信、微信、QQ 等电子方式备份。建议将助记词和 Keystore 手写在纸质笔记本上，并考虑将电子备份存储在安全的密码管理器中。</li>
<li><strong>确保网络安全。</strong>仅在安全的网络环境中使用 3Tree。确保您的设备未被越狱或 root，以最大限度降低安全风险。</li>
<li><strong>警惕欺诈行为。</strong>警惕非 3Tree 官方渠道的欺诈活动。如发现此类活动，请及时向我们举报。</li>
<li><strong>遵守适用法律。</strong>您需确保使用本应用的行为符合您所在司法辖区的法律法规。</li>
</ul>
<h3>3.3 转账须知</h3>
<ul>
<li><strong>不可逆交易：</strong>您理解区块链交易本质上是"不可逆的"。使用 3Tree 的转账功能时，您需对操作失误的后果承担全部责任，例如输入错误的地址或选择不合适的交易节点。</li>
<li><strong>转账失败原因：</strong>以下情况可能导致交易失败或超时：钱包余额不足、矿工费不足、智能合约代码执行失败、超出限额、技术故障、区块链网络拥堵、被识别为高风险的地址等。</li>
<li><strong>交易完成：</strong>一旦您使用 3Tree 完成转账，公司即已履行该特定服务的义务。公司不对后续争议或问题承担责任。</li>
</ul>
<h3>3.4 服务费用与税务义务</h3>
<ul>
<li><strong>服务费：</strong>目前 3Tree 不收取服务费或手续费。如未来收费，将另行说明或公告。</li>
<li><strong>矿工费：</strong>通过 3Tree 进行转账时，您必须支付矿工费，金额由您自行决定。这些费用由相应区块链系统收取。</li>
<li><strong>税务义务：</strong>您对通过 3Tree 进行的交易产生的所有税费负全部责任。</li>
</ul>`,
  },
  {
    h: '四、风险提示',
    body: `<h3>4.1 数字代币领域的风险</h3>
<p>您承认并理解，数字代币的法律法规框架仍在发展中，该领域存在重大风险，包括但不限于不可赎回性和技术不稳定性。此外，数字代币的价格波动远高于其他金融资产。我们强烈建议您在决定持有或处置任何数字代币之前评估您的财务状况和风险承受能力。</p>
<h3>4.2 交易失败风险</h3>
<p>如果您或您的交易对手未能遵守本条款或未能遵循网站或交易/支付页面上的指示、提示或规则，3Tree 不保证代币转账成功，也不对此类失败的后果负责。一旦款项已收到 3Tree 钱包或第三方钱包中，您承认区块链交易是不可逆的。您和您的交易对手需对交易产生的任何风险和后果承担全部责任。</p>
<h3>4.3 第三方 DApp 风险</h3>
<p>使用 3Tree 集成的第三方 DApp 服务或进行交易时，我们建议您仔细阅读本条款和 3Tree 的提示。了解交易对手和产品信息，谨慎评估风险后再进行操作。您在第三方 DApp 上执行的任何交易都是您的个人行为，任何具有约束力的合同关系都在您与交易对手之间建立。3Tree 对您交易产生的任何风险、责任、损失或费用不承担责任。</p>
<h3>4.4 交易对手风险</h3>
<p>在交易过程中，您应独立验证交易对手是否具有完全民事行为能力，并自行决定是否与交易对手进行交易或向其转账。您承担与这些决策相关的所有风险。</p>
<h3>4.5 转账错误处理</h3>
<p>如果您在转账过程中遇到"交易失败"或"打包超时"等错误，您应通过官方区块链系统或其他区块链查询工具确认交易状态，以避免重复转账。由此产生的任何损失或费用将由您自行承担。</p>
<h3>4.6 钱包与凭证存储</h3>
<p>在 3Tree 中创建或导入钱包后，您的 Keystore、私钥、助记词及相关信息仅存储在您的设备上，而非 3Tree 或公司的服务器上。如果您未能保存或备份钱包凭证，随后丢失设备，您的数字代币将丢失，公司无法为您找回。同样，如果这些凭证在导出、存储或备份过程中泄露，或您的存储设备或服务器被黑客攻击或入侵，您的数字代币可能丢失，公司将无法恢复。</p>`,
  },
  {
    h: '五、知识产权',
    body: `<p>3Tree 应用的部分源代码以开源方式发布（具体许可证见应用内说明或代码仓库）。3Tree 名称、Logo 及相关品牌标识的知识产权归 ThreeTree PTE. LTD. 所有。未经书面许可，不得将品牌标识用于商业推广或误导性用途。</p>
<p>3Tree 中展示的所有内容（包括但不限于本条款、公告、文章、视频、音频文件、图片、文档、信息、资料、商标或标识）的知识产权归公司或第三方权利人所有。用户仅被允许为持有和管理数字代币的目的使用 3Tree 应用及其内容。未经公司或相关第三方权利人事先书面同意，任何人不得使用、修改、反向工程、复制、公开传播、更改、分发、发布或公开分享该应用或其内容。</p>`,
  },
  {
    h: '六、合法使用承诺',
    body: `<h3>6.1 遵守法律法规</h3>
<p>您必须遵守您所在国家或地区的法律法规。您不得将 3Tree 用于任何非法目的或以任何非法方式使用。</p>
<h3>6.2 禁止行为</h3>
<p>您不得使用 3Tree 从事非法或犯罪活动，包括但不限于：</p>
<ul>
<li>从事任何非法或犯罪行为，如洗钱、非法集资等；</li>
<li>使用自动化程序、软件、引擎、网络爬虫、网络分析工具、数据挖掘工具或类似工具访问公司服务、收集或处理公司提供的内容，或干扰或试图干扰其他用户访问公司服务；</li>
<li>提供赌博信息或诱导他人参与赌博；</li>
<li>未经授权访问他人的 3Tree 钱包以窃取数字代币；</li>
<li>进行交易偏离交易对手声明的条款或具有欺诈性质；</li>
<li>执行损害或可能损害 3Tree 服务系统或数据的行为；</li>
<li>从事公司合理认为不适当的任何其他非法行为。</li>
</ul>
<h3>6.3 赔偿</h3>
<p>您承认并同意，如果您违反适用法律（包括但不限于海关或税务法规）或本条款导致公司遭受任何损失、受到第三方索赔或面临行政机关处罚，您将赔偿公司，包括合理的律师费。</p>`,
  },
  {
    h: '七、服务变更、中断与终止',
    body: `<h3>7.1 服务变更</h3>
<p>您同意公司可自行决定暂时提供某些服务功能、暂停特定功能或在未来引入新功能以维持其独立商业运营。只要您继续使用公司提供的服务，即视为接受服务的任何增加、减少或变更。</p>
<h3>7.2 服务中断</h3>
<p>您理解公司可能在以下情况下暂停服务：</p>
<ul>
<li>设备维护、区块链系统修复、升级、故障或通信中断等技术原因；</li>
<li>不可抗力事件，包括但不限于台风、地震、海啸、洪水、停电、战争、恐怖袭击、病毒、恶意软件、黑客攻击、系统不稳定或政府行为；</li>
<li>超出公司控制或合理预期的其他情况。</li>
</ul>
<h3>7.3 终止</h3>
<p>如果您从事以下行为，公司可单方面暂停或终止您对 3Tree 部分或全部功能的访问：</p>
<ul>
<li>使用 3Tree 从事非法或犯罪活动；</li>
<li>干扰其他用户正常使用 3Tree；</li>
<li>冒充公司工作人员或管理层；</li>
<li>攻击、渗透、更改或以其他方式威胁公司计算机系统的正常运行；</li>
<li>使用 3Tree 传播垃圾广告；</li>
<li>散布谣言或诋毁公司或 3Tree；</li>
<li>从事任何违法行为、违反本条款或公司合理认为应暂停功能的行为。</li>
</ul>
<h3>7.4 钱包信息访问</h3>
<p>如果您与公司的服务关系发生变更、中断或终止，您仍有权在合理时间内导出您的钱包信息。</p>`,
  },
  {
    h: '八、免责声明与责任限制',
    body: `<h3>8.1 责任范围</h3>
<p>公司仅负责履行本条款中明确规定的义务。</p>
<h3>8.2 服务可用性</h3>
<p>您承认并同意，在法律允许的范围内，公司基于现有技术能力和条件提供 3Tree 服务。公司对以下原因造成的服务中断不承担责任：</p>
<ul>
<li>3Tree 的系统维护或升级；</li>
<li>不可抗力事件；</li>
<li>您的设备硬件、软件、通信线路或电源故障；</li>
<li>您的不当操作或通过未经授权或未批准的方式使用公司服务；</li>
<li>病毒、恶意软件或恶意程序攻击；网络拥堵；系统不稳定；系统或设备故障；通信中断；停电；银行问题；政府行为；</li>
<li>任何其他非公司原因造成的情况。</li>
</ul>
<h3>8.3 免责情形</h3>
<p>公司对以下情况不承担责任：</p>
<ul>
<li>用户因丢失设备、未备份即删除 3Tree、未备份即删除钱包、钱包被盗或忘记钱包密码、私钥、助记词或 Keystore 导致的数字代币损失；</li>
<li>用户泄露钱包密码、私钥、助记词或 Keystore；出借、转让或授权他人使用其设备或 3Tree 钱包；或从非官方来源下载 3Tree 应用或使用不安全方式操作应用导致的数字代币损失；</li>
<li>因用户操作失误导致的数字代币损失，包括但不限于输入错误的转账地址或选择不合适的交易节点服务器；</li>
<li>因用户对区块链技术的错误或理解偏差导致的数字代币损失；</li>
<li>3Tree 用于复制区块链交易数据的区块链系统延迟、不稳定或其他问题导致的交易记录偏差。</li>
</ul>
<h3>8.4 责任上限</h3>
<p>在任何情况下，公司对违反本条款的总责任不超过以下较高者：A. 0.1 以太币或 B. 100 美元。</p>
<h3>8.5 不提供保证</h3>
<p>公司不提供以下保证：</p>
<ul>
<li>公司提供的服务将完全满足您的要求；</li>
<li>通过公司服务获得的任何技术、产品、服务或信息将符合您的期望；</li>
<li>从第三方交易所检索的数字代币市场数据或交易信息的时效性、准确性、完整性或可靠性；</li>
<li>您通过 3Tree 进行交易的相关方将履行与您的协议中的义务。</li>
</ul>
<p>3Tree 仅作为管理数字代币和显示交易信息的工具。公司不提供法律、税务或投资建议。您应自行寻求法律、税务或投资专业人士的指导。公司不对您在使用服务过程中产生的任何投资损失或数据丢失承担责任。</p>`,
  },
  {
    h: '九、监管声明',
    body: `<p><strong>重要声明：</strong>目前 3Tree 未在任何司法辖区接受监管，也未获得相关监管机构的许可。3Tree 不提供包括但不限于新加坡金融管理局依据《2019 年支付服务法案》所管辖的任何金融及支付服务。</p>
<p>本应用仅作为技术工具，帮助用户与区块链网络进行交互。我们不构成金融服务提供商、交易所或资产管理机构。</p>`,
  },
  {
    h: '十、完整协议与法律适用',
    body: `<p>本条款由 3Tree 服务条款、3Tree 隐私政策及公司不时发布的其他规则组成。如果本条款的任何部分被有管辖权的法院认定为无效或不可执行，其余条款仍具有完全效力。</p>
<p>本条款的任何翻译版本仅为方便用户提供。如中文版与非中文版之间存在冲突，以中文版为准。</p>
<p>您作为境外用户，有责任充分了解并遵守使用公司服务时适用于您所在司法辖区的所有法律、法规和规则。</p>`,
  },
  {
    h: '十一、条款修改',
    body: `<p>我们保留随时修改本条款的权利。修改后的条款将在应用内或官网上发布后立即生效。您继续使用本应用即视为接受修改后的条款。建议您定期查阅本条款以了解最新内容。</p>
<p>本条款自 2024 年 8 月起生效。</p>`,
  },
  {
    h: '十二、联系我们',
    body: `<p>如对本条款有任何疑问，请通过以下方式联系我们：</p>
<ul>
<li>邮箱：<a href="mailto:su@3tree.xyz">su@3tree.xyz</a></li>
<li>Telegram：<a href="https://t.me/threetreewallet" target="_blank" rel="noopener noreferrer">@threetreewallet</a></li>
<li>X（Twitter）：<a href="https://x.com/3treewallet" target="_blank" rel="noopener noreferrer">@3treewallet</a></li>
</ul>`,
  },
];

/* ── 隐私政策内容 ─────────────────────────────────────────── */
const PRIVACY_BLOCKS = [
  {
    h: '一、概述',
    body: `<p>本隐私政策说明 3Tree 钱包（以下简称"应用"）如何收集、使用和保护您的信息。3Tree 由 ThreeTree PTE. LTD. 开发与运营。</p>
<p><strong>核心原则：3Tree 是一款非托管钱包，您的私钥和助记词仅在您的设备上本地加密存储，我们从不收集、上传或访问这些信息。</strong></p>
<p>本隐私政策是您与公司之间关于 3Tree 隐私保护的具有法律约束力的协议。公司保留随时更新本政策的权利，更新后的政策将在应用内或官网发布后立即生效。</p>`,
  },
  {
    h: '二、我们不收集的信息',
    body: `<p>以下信息我们<strong>不会</strong>收集或存储：</p>
<ul>
<li>助记词、私钥或任何钱包恢复信息；</li>
<li>账户注册信息（3Tree 无需注册账号）；</li>
<li>身份验证材料（KYC）；</li>
<li>交易签名密钥；</li>
<li>设备上的任何个人文件；</li>
<li>钱包密码（即创建/导入钱包时设置的密码）。作为去中心化应用，3Tree 不在您的设备或公司服务器上存储钱包密码。如果您丢失钱包密码，需使用私钥或助记词重置。</li>
</ul>`,
  },
  {
    h: '三、我们可能收集的信息',
    body: `<p>为提供和改进服务，以下信息可能在您使用应用时产生：</p>
<h3>3.1 设备信息</h3>
<p>应用可能收集设备型号、操作系统版本和应用版本号，仅用于崩溃报告和功能兼容性分析。这些信息不关联您的钱包地址或身份信息。我们可能通过设备唯一序列号将您与您的钱包关联。</p>
<h3>3.2 使用数据</h3>
<p>我们可能收集匿名化的功能使用统计（如哪些功能被使用、使用频率），用于产品改进。这些数据不包含您的钱包地址、交易内容或任何可识别个人身份的信息。</p>
<h3>3.3 崩溃日志</h3>
<p>应用发生崩溃时，可能自动生成包含错误堆栈信息的日志。这些日志不包含私钥、助记词或交易签名。</p>
<h3>3.4 个人信息</h3>
<p>个人信息是指以电子或其他方式记录的能够识别用户的任何信息，无论是单独还是与其他数据结合，包括但不限于自然人的姓名、出生日期、身份证号码、生物特征信息、地址、电话号码、银行账户详情、电子邮件地址、钱包地址、移动设备信息、操作记录、交易历史等。公司仅在用户同意的情况下收集个人信息，并将严格保密，除非法律另有要求或用户另有同意。</p>`,
  },
  {
    h: '四、我们如何使用您的信息',
    body: `<p>我们可能将您的信息用于以下目的：</p>
<ul>
<li>及时向您推送重要通知，如软件更新、服务条款和本政策的更新；</li>
<li>为您提供便捷安全的数字代币管理方式；</li>
<li>处理您的反馈；</li>
<li>进行内部审计、数据分析和研究等，以提升我们的服务；</li>
<li>根据法律法规和监管要求，配合监管机构的工作；</li>
<li>管理用户的使用行为。</li>
</ul>`,
  },
  {
    h: '五、您如何控制自己的信息',
    body: `<p>您对自己的个人信息拥有以下权利：</p>
<ul>
<li><strong>访问权：</strong>您可以随时查看应用中存储的个人信息；</li>
<li><strong>更正权：</strong>当您发现个人信息有误时，可以要求更正；</li>
<li><strong>删除权：</strong>在特定情况下，您可以要求删除您的个人信息；</li>
<li><strong>撤回同意权：</strong>您可以随时撤回之前给予的同意。</li>
</ul>
<p>请注意，由于 3Tree 的去中心化特性，某些信息（如区块链上的交易记录）一旦广播即无法删除或修改。</p>`,
  },
  {
    h: '六、我们可能共享或转移的信息',
    body: `<p>我们不会与任何第三方共享您的个人信息，以下情况除外：</p>
<ul>
<li>获得您的明确同意；</li>
<li>根据法律法规、法律程序、政府要求或监管机构的强制性要求；</li>
<li>为保护公司或公众的权利、财产或安全所合理必要的情况下。</li>
</ul>
<p>如果公司终止运营，将及时停止收集您的个人信息，在 3Tree 上发布公告，并在合理期限内删除或匿名化处理我们持有的您的个人信息。</p>`,
  },
  {
    h: '七、我们如何自动收集数据',
    body: `<p>当您使用 3Tree 时，我们可能通过以下技术自动收集某些信息：</p>
<ul>
<li><strong>日志文件：</strong>记录您的使用活动，如访问时间、使用的功能等；</li>
<li><strong>Cookie 和类似技术：</strong>用于记住您的偏好设置；</li>
<li><strong>设备标识符：</strong>用于识别您的设备，提供个性化服务。</li>
</ul>
<p>这些技术收集的信息不包含您的私钥、助记词或钱包密码。</p>`,
  },
  {
    h: '八、第三方服务',
    body: `<p>应用为实现功能会连接以下第三方服务，这些服务可能各自收集数据：</p>
<ul>
<li><strong>公共 RPC 节点：</strong>用于查询链上余额和广播交易。您的公开地址和查询内容可能被节点运营方记录；</li>
<li><strong>行情数据源（如 CoinGecko）：</strong>用于显示代币价格。查询时可能传递您关注的代币标识；</li>
<li><strong>闪兑聚合器（如 LI.FI、KyberSwap、deBridge）：</strong>用于获取报价和执行跨链交易。交易路由信息可能被聚合器记录；</li>
<li><strong>区块浏览器：</strong>应用内跳转至 Etherscan、Tronscan 等浏览器时，受其各自隐私政策约束；</li>
<li><strong>第三方 DApp：</strong>通过 3Tree 访问的第三方 DApp 有各自的隐私政策，公司不对这些第三方的隐私实践负责。</li>
</ul>
<p>建议您查阅各服务的隐私政策。我们不对第三方服务的隐私实践负责。</p>`,
  },
  {
    h: '九、数据安全',
    body: `<p>我们采取以下措施保护您的信息：</p>
<ul>
<li>私钥和助记词使用设备本地加密存储，不上传至任何服务器；</li>
<li>应用通信使用 HTTPS/TLS 加密；</li>
<li>安装包经过数字签名，防止篡改；</li>
<li>部分源代码开源，接受社区安全审查；</li>
<li>我们可能采取数据安全保护技术、提高内部合规水平、为员工提供安全培训、为访问相关数据设置安全权限，以保护您的个人信息。</li>
</ul>
<p>我们将在"钱包指南"栏目中向您发送信息安全相关消息，并更新有关钱包使用和信息保护的文章供您参考。</p>`,
  },
  {
    h: '十、未成年人保护',
    body: `<p>以下特别条款适用于未满 18 周岁的未成年人：</p>
<ul>
<li>未成年人不得在父母或监护人的指导下使用 3Tree；</li>
<li>父母和监护人应在阅读本政策、3Tree 服务条款及其他相关规则后，对未成年人使用 3Tree 提供指导；</li>
<li>3Tree 将根据国家法律法规确保未成年人个人信息的保密性和安全性。</li>
</ul>`,
  },
  {
    h: '十一、儿童隐私',
    body: `<p>本应用不面向 18 岁以下未成年人。我们不会故意收集未成年人的个人信息。如果您发现未成年人使用了本应用并提供了个人信息，请联系我们，我们将采取措施删除相关信息。</p>`,
  },
  {
    h: '十二、隐私政策更新',
    body: `<p>我们可能不时更新本隐私政策。更新后的政策将在应用内或官网上发布。重大变更时，我们会通过应用内通知提醒您。建议您定期查阅本政策。</p>
<p>本政策自 2024 年 8 月起生效。</p>`,
  },
  {
    h: '十三、联系我们',
    body: `<p>如对本隐私政策有任何疑问或需要行使您的数据权利，请通过以下方式联系我们：</p>
<ul>
<li>邮箱：<a href="mailto:su@3tree.xyz">su@3tree.xyz</a></li>
<li>Telegram：<a href="https://t.me/threetreewallet" target="_blank" rel="noopener noreferrer">@threetreewallet</a></li>
<li>X（Twitter）：<a href="https://x.com/3treewallet" target="_blank" rel="noopener noreferrer">@3treewallet</a></li>
</ul>`,
  },
];

/* ── Terms of Service – English ─────────────────────────────── */
const TOS_BLOCKS_EN: Block[] = [
  {
    h: '1. Definitions and Acceptance',
    body: `<p>These Terms of Service (these "Terms") apply to your use of the 3Tree Wallet application (the "App" or "3Tree"). By downloading, installing, or using the App, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use the App.</p>
<p>3Tree is developed and operated by ThreeTree PTE. LTD. ("we", "us", or the "Company").</p>
<p>These Terms constitute a legally binding agreement between you and the Company regarding your use of 3Tree. The Company reserves the right to update these Terms at any time. Updated Terms take effect immediately upon publication within the App or on the official website, without additional notice. If you do not accept the updated Terms, you should cease using 3Tree immediately. Continued use constitutes acceptance of the modified Terms.</p>
<p><strong>If you are under 18 years of age or lack full civil capacity, please use 3Tree under the guidance of a parent or legal guardian.</strong></p>`,
  },
  {
    h: '2. Nature and Scope of Service',
    body: `<p><strong>3Tree is a non-custodial (self-custody) cryptocurrency wallet.</strong> This means:</p>
<ul>
<li>Your private keys and mnemonic phrases are encrypted and stored only on your device. We never upload, store, or access your private keys, mnemonic phrases, or any sensitive information.</li>
<li>We do not custody your assets and bear no custodial responsibility for asset security. Asset security is entirely your own responsibility.</li>
<li>We do not control your transactions and cannot freeze, reverse, or interfere with any on-chain operations.</li>
<li>We do not provide any financial, investment, or trading advice.</li>
</ul>
<h3>2.1 Specific Service Features</h3>
<ul>
<li><strong>Create or Import Wallet:</strong> Generate a new wallet or import compatible third-party wallets using 3Tree.</li>
<li><strong>Transfer and Receive:</strong> Use private keys to electronically sign transactions, modifying the ledger on the corresponding blockchain. Actual transfers and receipts occur on the blockchain system, not within 3Tree.</li>
<li><strong>Digital Asset Management:</strong> Add, store, and delete digital tokens supported by 3Tree.</li>
<li><strong>Market Data:</strong> View exchange rate information for digital tokens supported by 3Tree.</li>
<li><strong>Browse DApps:</strong> Access decentralized applications (including Company-owned and third-party DApps) via links provided by 3Tree.</li>
<li><strong>Transaction Records:</strong> 3Tree copies all or part of your transaction records through the blockchain system. However, records maintained on the blockchain system shall be considered the authoritative source.</li>
<li><strong>Token Swaps:</strong> Users may exchange tokens through third-party smart contracts or decentralized exchanges (DEX). 3Tree serves only as an interface tool facilitating interactions between users and third parties.</li>
<li><strong>Staking Services:</strong> When accessing staking services, third parties may stake your digital assets on the corresponding blockchain networks on your behalf. 3Tree is not responsible for any issues arising from staking services.</li>
</ul>
<h3>2.2 Third-Party Content and Services</h3>
<p>DApps integrated in 3Tree include services provided by Company-owned and third-party platforms. For third-party DApps, 3Tree serves only as a blockchain browser to help users access these DApps.</p>
<ul>
<li>You may need to create a separate account with third-party providers to use their services.</li>
<li>Your use of third-party content and services is voluntary and subject to these Terms, but may also be governed by separate terms and conditions set by third-party providers.</li>
<li>You are responsible for understanding the terms and conditions of these third-party services, including how they process your information under their privacy policies.</li>
<li>3Tree does not verify, control, or endorse third-party content or services and bears no responsibility for losses resulting from their use. You access such content and services at your own risk.</li>
</ul>`,
  },
  {
    h: '3. User Responsibilities',
    body: `<h3>3.1 Non-Custodial Nature — Services We Cannot Provide</h3>
<p>Consistent with the decentralized nature of blockchain and to protect users' digital token security, 3Tree operates in a decentralized manner and does not provide the following services:</p>
<ul>
<li>Storing users' wallet passwords, private keys, mnemonic phrases, or Keystores.</li>
<li>Recovering users' wallet passwords, private keys, mnemonic phrases, or Keystores.</li>
<li>Freezing wallets.</li>
<li>Reporting lost wallets.</li>
<li>Restoring wallets.</li>
<li>Reversing transactions.</li>
</ul>
<p>Therefore, users are solely responsible for safeguarding devices containing 3Tree and for backing up 3Tree, wallet passwords, mnemonic phrases, private keys, and Keystores. The Company cannot restore wallets or obtain these credentials if:</p>
<ul>
<li>You lose your device;</li>
<li>You delete 3Tree without backup;</li>
<li>You delete a wallet without backup;</li>
<li>Your wallet is stolen;</li>
<li>You forget your wallet password, private key, mnemonic phrase, or Keystore.</li>
</ul>
<p>Similarly, if a user makes an operational error in a transaction (such as entering an incorrect transfer address), the Company cannot cancel the transaction.</p>
<h3>3.2 Your Responsibilities</h3>
<ul>
<li><strong>Safeguard your mnemonic phrase and private keys.</strong> The mnemonic phrase is the only way to recover your wallet. Losing it means permanent loss of asset access, and we cannot help you recover it.</li>
<li><strong>Never reveal your mnemonic phrase or private key to anyone.</strong> Any request for your mnemonic phrase is a scam. The 3Tree team will never proactively contact you to ask for your mnemonic phrase.</li>
<li><strong>Verify transaction information independently.</strong> Before signing and broadcasting a transaction, carefully confirm the transaction content, target address, and amount.</li>
<li><strong>Store backups securely.</strong> When creating or importing a wallet, it is recommended to securely back up wallet credentials (wallet password, private key, mnemonic phrase, Keystore). Avoid using screenshots, emails, notes apps, SMS, WeChat, QQ, or other electronic methods for backup. It is recommended to write down mnemonic phrases and Keystores by hand on a paper notebook and consider storing electronic backups in a secure password manager.</li>
<li><strong>Ensure network security.</strong> Only use 3Tree in secure network environments. Ensure your device has not been jailbroken or rooted to minimize security risks.</li>
<li><strong>Be vigilant against fraud.</strong> Be wary of fraudulent activities from non-official 3Tree channels. If you discover such activities, please report them to us promptly.</li>
<li><strong>Comply with applicable laws.</strong> You must ensure that your use of this App complies with the laws and regulations of your jurisdiction.</li>
</ul>
<h3>3.3 Transfer Notices</h3>
<ul>
<li><strong>Irreversible transactions:</strong> You understand that blockchain transactions are inherently "irreversible." When using 3Tree's transfer function, you bear full responsibility for the consequences of operational errors, such as entering an incorrect address or selecting an inappropriate transaction node.</li>
<li><strong>Transfer failure causes:</strong> The following situations may cause transactions to fail or time out: insufficient wallet balance, insufficient gas fees, smart contract code execution failures, exceeding limits, technical failures, blockchain network congestion, addresses identified as high-risk, etc.</li>
<li><strong>Transaction completion:</strong> Once you complete a transfer using 3Tree, the Company has fulfilled its obligation for that specific service. The Company bears no responsibility for subsequent disputes or issues.</li>
</ul>
<h3>3.4 Service Fees and Tax Obligations</h3>
<ul>
<li><strong>Service fees:</strong> Currently, 3Tree does not charge service fees or commissions. If fees are introduced in the future, separate notice will be provided.</li>
<li><strong>Gas fees:</strong> When transferring via 3Tree, you must pay gas fees, the amount of which is determined by you. These fees are charged by the corresponding blockchain system.</li>
<li><strong>Tax obligations:</strong> You bear full responsibility for all taxes and fees arising from transactions conducted through 3Tree.</li>
</ul>`,
  },
  {
    h: '4. Risk Disclosures',
    body: `<h3>4.1 Digital Token Risks</h3>
<p>You acknowledge and understand that the legal and regulatory framework for digital tokens is still evolving, and significant risks exist in this field, including but not limited to non-redeemability and technical instability. Additionally, digital token prices are far more volatile than other financial assets. We strongly advise you to assess your financial situation and risk tolerance before deciding to hold or dispose of any digital tokens.</p>
<h3>4.2 Transaction Failure Risk</h3>
<p>If you or your counterparty fails to comply with these Terms or follow the instructions, prompts, or rules on the website or transaction/payment page, 3Tree does not guarantee successful token transfer and is not responsible for the consequences of such failures. Once funds have been received in the 3Tree wallet or a third-party wallet, you acknowledge that blockchain transactions are irreversible. You and your counterparty bear full responsibility for any risks and consequences arising from the transaction.</p>
<h3>4.3 Third-Party DApp Risk</h3>
<p>When using third-party DApp services or conducting transactions integrated with 3Tree, we recommend that you carefully read these Terms and 3Tree's prompts. Understand the counterparty and product information, assess risks prudently before operating. Any transaction you execute on third-party DApps is your personal action, and any binding contractual relationship is established between you and the counterparty. 3Tree bears no responsibility for any risks, liabilities, losses, or costs arising from your transactions.</p>
<h3>4.4 Counterparty Risk</h3>
<p>During transactions, you should independently verify whether the counterparty has full civil capacity and decide on your own whether to transact with or transfer funds to the counterparty. You bear all risks associated with these decisions.</p>
<h3>4.5 Transfer Error Handling</h3>
<p>If you encounter errors such as "transaction failed" or "broadcast timeout" during a transfer, you should verify the transaction status through the official blockchain system or other blockchain query tools to avoid duplicate transfers. Any losses or costs arising therefrom shall be borne by you.</p>
<h3>4.6 Wallet and Credential Storage</h3>
<p>After creating or importing a wallet in 3Tree, your Keystore, private key, mnemonic phrase, and related information are stored only on your device, not on 3Tree or Company servers. If you fail to save or back up wallet credentials and subsequently lose your device, your digital tokens will be lost and the Company cannot recover them. Similarly, if these credentials are leaked during export, storage, or backup, or if your storage device or server is hacked or compromised, your digital tokens may be lost and the Company will be unable to restore them.</p>`,
  },
  {
    h: '5. Intellectual Property',
    body: `<p>Portions of the 3Tree App's source code are published under open-source licenses (see in-App instructions or code repository for specific license terms). Intellectual property rights in the 3Tree name, logo, and related brand identifiers belong to ThreeTree PTE. LTD. Without written permission, brand identifiers may not be used for commercial promotion or misleading purposes.</p>
<p>Intellectual property rights in all content displayed in 3Tree (including but not limited to these Terms, announcements, articles, videos, audio files, images, documents, information, materials, trademarks, or logos) belong to the Company or third-party rights holders. Users are only permitted to use the 3Tree App and its content for the purpose of holding and managing digital tokens. Without prior written consent from the Company or relevant third-party rights holders, no one may use, modify, reverse-engineer, copy, publicly disseminate, alter, distribute, publish, or publicly share the App or its content.</p>`,
  },
  {
    h: '6. Lawful Use Commitment',
    body: `<h3>6.1 Compliance with Laws and Regulations</h3>
<p>You must comply with the laws and regulations of your country or region. You may not use 3Tree for any illegal purpose or in any illegal manner.</p>
<h3>6.2 Prohibited Activities</h3>
<p>You may not use 3Tree to engage in illegal or criminal activities, including but not limited to:</p>
<ul>
<li>Engaging in any illegal or criminal activities such as money laundering or illegal fundraising;</li>
<li>Using automated programs, software, engines, web crawlers, web analytics tools, data mining tools, or similar tools to access Company services, collect or process content provided by the Company, or interfere with other users' access to Company services;</li>
<li>Providing gambling information or inducing others to participate in gambling;</li>
<li>Unauthorized access to others' 3Tree wallets to steal digital tokens;</li>
<li>Conducting transactions that deviate from the counterparty's stated terms or are fraudulent in nature;</li>
<li>Performing acts that damage or may damage 3Tree's service systems or data;</li>
<li>Engaging in any other illegal activities that the Company reasonably deems inappropriate.</li>
</ul>
<h3>6.3 Indemnification</h3>
<p>You acknowledge and agree that if you violate applicable laws (including but not limited to customs or tax regulations) or these Terms causing the Company to suffer any losses, face third-party claims, or encounter administrative penalties, you shall indemnify the Company, including reasonable attorney fees.</p>`,
  },
  {
    h: '7. Service Changes, Interruption, and Termination',
    body: `<h3>7.1 Service Changes</h3>
<p>You agree that the Company may, at its discretion, temporarily provide certain service features, suspend specific features, or introduce new features in the future to maintain its independent commercial operations. As long as you continue to use services provided by the Company, you are deemed to accept any additions, reductions, or changes to services.</p>
<h3>7.2 Service Interruption</h3>
<p>You understand that the Company may suspend services under the following circumstances:</p>
<ul>
<li>Technical reasons such as equipment maintenance, blockchain system repairs, upgrades, failures, or communication interruptions;</li>
<li>Force majeure events including but not limited to typhoons, earthquakes, tsunamis, floods, power outages, wars, terrorist attacks, viruses, malware, hacking attacks, system instability, or government actions;</li>
<li>Other situations beyond the Company's control or reasonable expectation.</li>
</ul>
<h3>7.3 Termination</h3>
<p>The Company may unilaterally suspend or terminate your access to some or all features of 3Tree if you:</p>
<ul>
<li>Use 3Tree to engage in illegal or criminal activities;</li>
<li>Interfere with other users' normal use of 3Tree;</li>
<li>Impersonate Company staff or management;</li>
<li>Attack, penetrate, alter, or otherwise threaten the normal operation of the Company's computer systems;</li>
<li>Use 3Tree to spread spam advertisements;</li>
<li>Spread rumors or defame the Company or 3Tree;</li>
<li>Engage in any unlawful acts, violate these Terms, or commit acts the Company reasonably deems worthy of feature suspension.</li>
</ul>
<h3>7.4 Wallet Information Access</h3>
<p>If your service relationship with the Company changes, is interrupted, or is terminated, you still have the right to export your wallet information within a reasonable time.</p>`,
  },
  {
    h: '8. Disclaimers and Limitation of Liability',
    body: `<h3>8.1 Scope of Responsibility</h3>
<p>The Company is only responsible for fulfilling obligations explicitly stated in these Terms.</p>
<h3>8.2 Service Availability</h3>
<p>You acknowledge and agree that, to the extent permitted by law, the Company provides 3Tree services based on existing technical capabilities and conditions. The Company bears no responsibility for service interruptions caused by:</p>
<ul>
<li>System maintenance or upgrades of 3Tree;</li>
<li>Force majeure events;</li>
<li>Failures in your device hardware, software, communication lines, or power supply;</li>
<li>Your improper operations or use of Company services through unauthorized or unapproved means;</li>
<li>Virus, malware, or malicious program attacks; network congestion; system instability; system or equipment failures; communication interruptions; power outages; banking issues; government actions;</li>
<li>Any other circumstances not attributable to the Company.</li>
</ul>
<h3>8.3 Exemptions</h3>
<p>The Company bears no responsibility for:</p>
<ul>
<li>Digital token losses caused by users losing devices, deleting 3Tree without backup, deleting wallets without backup, wallet theft, or forgetting wallet passwords, private keys, mnemonic phrases, or Keystores;</li>
<li>Digital token losses caused by users leaking wallet passwords, private keys, mnemonic phrases, or Keystores; lending, transferring, or authorizing others to use their devices or 3Tree wallets; or downloading the 3Tree App from unofficial sources or operating the App through insecure methods;</li>
<li>Digital token losses caused by user operational errors, including but not limited to entering incorrect transfer addresses or selecting inappropriate transaction node servers;</li>
<li>Digital token losses caused by users' errors or misunderstandings about blockchain technology;</li>
<li>Transaction record discrepancies caused by blockchain system delays, instability, or other issues used by 3Tree to replicate blockchain transaction data.</li>
</ul>
<h3>8.4 Liability Cap</h3>
<p>In no event shall the Company's total liability for breach of these Terms exceed the greater of: A. 0.1 ETH or B. 100 USD.</p>
<h3>8.5 No Warranties</h3>
<p>The Company makes no warranties that:</p>
<ul>
<li>Services provided by the Company will fully meet your requirements;</li>
<li>Any technology, products, services, or information obtained through Company services will meet your expectations;</li>
<li>The timeliness, accuracy, completeness, or reliability of digital token market data or trading information retrieved from third-party exchanges;</li>
<li>Counterparties with whom you transact through 3Tree will fulfill their obligations under agreements with you.</li>
</ul>
<p>3Tree serves only as a tool for managing digital tokens and displaying transaction information. The Company does not provide legal, tax, or investment advice. You should seek guidance from legal, tax, or investment professionals on your own. The Company bears no responsibility for any investment losses or data losses you incur during use of the services.</p>`,
  },
  {
    h: '9. Regulatory Statement',
    body: `<p><strong>Important Statement:</strong> Currently, 3Tree is not regulated in any jurisdiction and has not obtained licenses from relevant regulatory authorities. 3Tree does not provide any financial or payment services regulated by, including but not limited to, the Monetary Authority of Singapore under the Payment Services Act 2019.</p>
<p>This App functions solely as a technical tool to help users interact with blockchain networks. We do not constitute a financial service provider, exchange, or asset management institution.</p>`,
  },
  {
    h: '10. Entire Agreement and Governing Law',
    body: `<p>These Terms consist of the 3Tree Terms of Service, the 3Tree Privacy Policy, and other rules issued by the Company from time to time. If any part of these Terms is determined by a court of competent jurisdiction to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>
<p>Any translated versions of these Terms are provided for convenience only. In the event of a conflict between the Chinese version and any non-Chinese version, the Chinese version shall prevail.</p>
<p>As an overseas user, you are responsible for fully understanding and complying with all laws, regulations, and rules applicable in your jurisdiction when using Company services.</p>`,
  },
  {
    h: '11. Amendments to Terms',
    body: `<p>We reserve the right to modify these Terms at any time. Modified Terms take effect immediately upon publication within the App or on the official website. Your continued use of this App constitutes acceptance of the modified Terms. We recommend that you review these Terms periodically to stay informed of the latest content.</p>
<p>These Terms are effective from August 2024.</p>`,
  },
  {
    h: '12. Contact Us',
    body: `<p>If you have any questions about these Terms, please contact us through the following channels:</p>
<ul>
<li>Email: <a href="mailto:su@3tree.xyz">su@3tree.xyz</a></li>
<li>Telegram: <a href="https://t.me/threetreewallet" target="_blank" rel="noopener noreferrer">@threetreewallet</a></li>
<li>X (Twitter): <a href="https://x.com/3treewallet" target="_blank" rel="noopener noreferrer">@3treewallet</a></li>
</ul>`,
  },
];

/* ── Privacy Policy – English ───────────────────────────────── */
const PRIVACY_BLOCKS_EN: Block[] = [
  {
    h: '1. Overview',
    body: `<p>This Privacy Policy explains how 3Tree Wallet (the "App") collects, uses, and protects your information. 3Tree is developed and operated by ThreeTree PTE. LTD.</p>
<p><strong>Core principle: 3Tree is a non-custodial wallet. Your private keys and mnemonic phrases are encrypted and stored only on your device. We never collect, upload, or access this information.</strong></p>
<p>This Privacy Policy is a legally binding agreement between you and the Company regarding privacy protection for 3Tree. The Company reserves the right to update this Policy at any time. Updated Policies take effect immediately upon publication within the App or on the official website.</p>`,
  },
  {
    h: '2. Information We Do Not Collect',
    body: `<p>The following information is <strong>not</strong> collected or stored by us:</p>
<ul>
<li>Mnemonic phrases, private keys, or any wallet recovery information;</li>
<li>Account registration information (3Tree requires no account registration);</li>
<li>Identity verification materials (KYC);</li>
<li>Transaction signing keys;</li>
<li>Any personal files on your device;</li>
<li>Wallet passwords (the password set when creating/importing a wallet). As a decentralized application, 3Tree does not store wallet passwords on your device or Company servers. If you lose your wallet password, you need to reset it using your private key or mnemonic phrase.</li>
</ul>`,
  },
  {
    h: '3. Information We May Collect',
    body: `<p>To provide and improve services, the following information may be generated during your use of the App:</p>
<h3>3.1 Device Information</h3>
<p>The App may collect device model, operating system version, and App version number, used solely for crash reporting and feature compatibility analysis. This information is not linked to your wallet address or identity. We may associate you with your wallet through a unique device serial number.</p>
<h3>3.2 Usage Data</h3>
<p>We may collect anonymized feature usage statistics (such as which features are used and usage frequency) for product improvement. This data does not contain your wallet address, transaction content, or any personally identifiable information.</p>
<h3>3.3 Crash Logs</h3>
<p>When the App crashes, logs containing error stack information may be generated automatically. These logs do not contain private keys, mnemonic phrases, or transaction signatures.</p>
<h3>3.4 Personal Information</h3>
<p>Personal information refers to any information recorded electronically or otherwise that can identify a user, whether alone or combined with other data, including but not limited to natural person's name, date of birth, ID number, biometric information, address, phone number, bank account details, email address, wallet address, mobile device information, operation records, transaction history, etc. The Company collects personal information only with user consent and will keep it strictly confidential unless otherwise required by law or consented to by the user.</p>`,
  },
  {
    h: '4. How We Use Your Information',
    body: `<p>We may use your information for the following purposes:</p>
<ul>
<li>To promptly push important notifications to you, such as software updates and changes to Terms of Service and this Policy;</li>
<li>To provide you with convenient and secure digital token management methods;</li>
<li>To process your feedback;</li>
<li>To conduct internal audits, data analysis, and research to improve our services;</li>
<li>To cooperate with regulatory authorities in accordance with laws, regulations, and supervisory requirements;</li>
<li>To manage user behavior on the platform.</li>
</ul>`,
  },
  {
    h: '5. How You Control Your Information',
    body: `<p>You have the following rights regarding your personal information:</p>
<ul>
<li><strong>Right of access:</strong> You may view personal information stored in the App at any time;</li>
<li><strong>Right of correction:</strong> When you find errors in your personal information, you may request corrections;</li>
<li><strong>Right of deletion:</strong> Under specific circumstances, you may request deletion of your personal information;</li>
<li><strong>Right to withdraw consent:</strong> You may withdraw previously given consent at any time.</li>
</ul>
<p>Please note that due to 3Tree's decentralized nature, certain information (such as transaction records on the blockchain) cannot be deleted or modified once broadcast.</p>`,
  },
  {
    h: '6. Information We May Share or Transfer',
    body: `<p>We do not share your personal information with any third parties except in the following situations:</p>
<ul>
<li>With your explicit consent;</li>
<li>In accordance with laws, regulations, legal processes, government requirements, or mandatory requirements of regulatory authorities;</li>
<li>Where reasonably necessary to protect the rights, property, or safety of the Company or the public.</li>
</ul>
<p>If the Company ceases operations, it will promptly stop collecting your personal information, publish an announcement on 3Tree, and delete or anonymize your personal information held by us within a reasonable period.</p>`,
  },
  {
    h: '7. How We Automatically Collect Data',
    body: `<p>When you use 3Tree, we may automatically collect certain information through the following technologies:</p>
<ul>
<li><strong>Log files:</strong> Recording your usage activities such as access time and features used;</li>
<li><strong>Cookies and similar technologies:</strong> Used to remember your preference settings;</li>
<li><strong>Device identifiers:</strong> Used to identify your device and provide personalized services.</li>
</ul>
<p>Information collected through these technologies does not include your private keys, mnemonic phrases, or wallet passwords.</p>`,
  },
  {
    h: '8. Third-Party Services',
    body: `<p>The App connects to the following third-party services for functionality, which may each collect data independently:</p>
<ul>
<li><strong>Public RPC nodes:</strong> Used to query on-chain balances and broadcast transactions. Your public address and query content may be logged by node operators;</li>
<li><strong>Market data sources (e.g., CoinGecko):</strong> Used to display token prices. Token identifiers you follow may be transmitted during queries;</li>
<li><strong>Swap aggregators (e.g., LI.FI, KyberSwap, deBridge):</strong> Used to obtain quotes and execute cross-chain transactions. Transaction routing information may be logged by aggregators;</li>
<li><strong>Block explorers:</strong> When the App redirects to Etherscan, Tronscan, or other browsers, they are subject to their respective privacy policies;</li>
<li><strong>Third-party DApps:</strong> Third-party DApps accessed through 3Tree have their own privacy policies, and the Company is not responsible for these third parties' privacy practices.</li>
</ul>
<p>We recommend reviewing each service's privacy policy. We are not responsible for the privacy practices of third-party services.</p>`,
  },
  {
    h: '9. Data Security',
    body: `<p>We take the following measures to protect your information:</p>
<ul>
<li>Private keys and mnemonic phrases are stored using device-local encryption and are never uploaded to any server;</li>
<li>App communications use HTTPS/TLS encryption;</li>
<li>Installation packages are digitally signed to prevent tampering;</li>
<li>Portions of source code are open-sourced for community security review;</li>
<li>We may employ data security protection technologies, enhance internal compliance, provide security training for employees, and set access permissions for relevant data to protect your personal information.</li>
</ul>
<p>We will send you information security-related messages through the "Wallet Guide" section and update articles about wallet usage and information protection for your reference.</p>`,
  },
  {
    h: '10. Protection of Minors',
    body: `<p>The following special provisions apply to minors under 18 years of age:</p>
<ul>
<li>Minors may not use 3Tree without guidance from a parent or guardian;</li>
<li>Parents and guardians should provide guidance on minors' use of 3Tree after reading this Policy, the 3Tree Terms of Service, and other relevant rules;</li>
<li>3Tree will ensure the confidentiality and security of minors' personal information in accordance with national laws and regulations.</li>
</ul>`,
  },
  {
    h: '11. Children\'s Privacy',
    body: `<p>This App is not intended for minors under 18. We do not knowingly collect personal information from minors. If you discover that a minor has used this App and provided personal information, please contact us and we will take measures to delete the relevant information.</p>`,
  },
  {
    h: '12. Privacy Policy Updates',
    body: `<p>We may update this Privacy Policy from time to time. Updated Policies will be published within the App or on the official website. For material changes, we will remind you through in-App notifications. We recommend that you review this Policy periodically.</p>
<p>This Policy is effective from August 2024.</p>`,
  },
  {
    h: '13. Contact Us',
    body: `<p>If you have any questions about this Privacy Policy or need to exercise your data rights, please contact us through the following channels:</p>
<ul>
<li>Email: <a href="mailto:su@3tree.xyz">su@3tree.xyz</a></li>
<li>Telegram: <a href="https://t.me/threetreewallet" target="_blank" rel="noopener noreferrer">@threetreewallet</a></li>
<li>X (Twitter): <a href="https://x.com/3treewallet" target="_blank" rel="noopener noreferrer">@3treewallet</a></li>
</ul>`,
  },
];

type Block = { h: string; body: string };

function LegalPage({ title, titleEn, blocks, blocksEn }: { title: string; titleEn: string; blocks: Block[]; blocksEn: Block[] }) {
  const { t, lang } = useLang();
  const isEn = lang === 'en';
  const displayTitle = isEn ? titleEn : t(title);
  const currentBlocks = isEn ? blocksEn : blocks;
  return (
    <div className="legal">
      <nav className="legal-nav">
        <div className="wrap legal-nav-in">
          <Link className="legal-back" href="/">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t('返回首页')}
          </Link>
          <span className="legal-title">{displayTitle}</span>
        </div>
      </nav>
      <article className="legal-body">
        <h1>{displayTitle}</h1>
        <p className="legal-updated">{isEn ? 'Last updated: August 2024' : t('最后更新：2024 年 8 月')}</p>
        {currentBlocks.map((b) => (
          <section key={b.h}>
            <h2>{isEn ? b.h : t(b.h)}</h2>
            <div dangerouslySetInnerHTML={{ __html: isEn ? b.body : t(b.body) }} />
          </section>
        ))}
      </article>
      <footer className="legal-footer">
        © 2026 ThreeTree PTE. LTD. · All rights reserved
      </footer>
    </div>
  );
}

export { LegalPage, TOS_BLOCKS, TOS_BLOCKS_EN, PRIVACY_BLOCKS, PRIVACY_BLOCKS_EN };

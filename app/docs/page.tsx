import DocsPage from './docs-page';

/* ── 帮助中心 JSON-LD：FAQPage + WebPage 双重结构化数据 ── */
const docsJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '3Tree Help Center — 帮助中心',
    description: '3Tree 钱包完整使用文档与常见问题解答。',
    url: 'https://help.3tree.xyz',
    isPartOf: { '@type': 'WebSite', name: '3Tree', url: 'https://3tree.xyz' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: '3Tree 钱包安全吗？', acceptedAnswer: { '@type': 'Answer', text: '3Tree 是一款自持钱包（非托管钱包），私钥和助记词仅存储在您的设备本地，使用 Android Keystore 加密保存。3Tree 服务器不收集、不上传、不托管任何用户密钥数据。' } },
      { '@type': 'Question', name: '3Tree 支持哪些区块链？', acceptedAnswer: { '@type': 'Answer', text: '3Tree 目前支持 103 条主网，覆盖 8 类链生态：EVM 链（Ethereum、BNB Chain、Base、Arbitrum 等）、UTXO 链（Bitcoin、Dogecoin）、TRON、Solana、TON、XRP Ledger、Aptos、Sui。' } },
      { '@type': 'Question', name: '什么是闪兑？和跨链桥有什么区别？', acceptedAnswer: { '@type': 'Answer', text: '闪兑（Swap）是在同一条链上将一种代币兑换为另一种代币，通过聚合器自动寻找最优报价。跨链桥（Bridge）是将资产从一条区块链转移到另一条区块链。' } },
      { '@type': 'Question', name: '助记词丢了怎么办？', acceptedAnswer: { '@type': 'Answer', text: '助记词是钱包的最高权限凭证，一旦丢失且没有备份，资产将无法恢复。3Tree 作为自持钱包不存储用户助记词，无法协助找回。请务必离线备份助记词。' } },
      { '@type': 'Question', name: '3Tree 是开源的吗？', acceptedAnswer: { '@type': 'Answer', text: '是的，3Tree 是一款开源钱包，可以在 GitHub 上查看完整源代码。' } },
      { '@type': 'Question', name: '如何从其他钱包迁移到 3Tree？', acceptedAnswer: { '@type': 'Answer', text: '将助记词从原钱包导出，在 3Tree 中选择「导入钱包」即可。支持 BIP39 标准的 12 或 24 个单词助记词。' } },
      { '@type': 'Question', name: '3Tree 收费吗？', acceptedAnswer: { '@type': 'Answer', text: '3Tree 应用完全免费，不收取服务费或订阅费。使用闪兑和跨链时需支付区块链网络 Gas 费，这是支付给网络的费用，与 3Tree 无关。' } },
      { '@type': 'Question', name: '手机丢了怎么办？', acceptedAnswer: { '@type': 'Answer', text: '只要已离线备份助记词，就可以在任意兼容 BIP39 的钱包中导入并恢复资产。未备份则无法恢复。' } },
      { '@type': 'Question', name: '什么是多签金库？', acceptedAnswer: { '@type': 'Answer', text: '多签金库是需多个私钥共同签名才能执行交易的钱包机制，适合团队资金管理和 DAO 治理。' } },
    ],
  },
];

export const metadata = {
  title: '帮助中心 — 3Tree 钱包使用文档与常见问题 | 3Tree Help Center',
  description:
    '3Tree 钱包完整使用文档与常见问题解答（FAQ）：快速开始、钱包管理、闪兑与跨链桥、多签金库、DApp 浏览器、103 条主网支持、术语表与合约地址。/ Complete 3Tree wallet documentation and FAQ: getting started, wallet management, swap & bridge, multisig vault, DApp browser, 103 mainnets, glossary and contract addresses.',
  keywords: [
    '3Tree 帮助中心', '3Tree FAQ', '3Tree 常见问题',
    '3Tree wallet help', '3Tree wallet FAQ', 'crypto wallet help',
    '多链钱包教程', '自持钱包使用教程', '加密钱包常见问题',
    '闪兑教程', '跨链桥教程', '多签金库教程',
    '助记词备份', '加密钱包安全', 'Web3 钱包使用指南',
  ],
};

export default function DocsRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(docsJsonLd) }}
      />
      <DocsPage />
    </>
  );
}

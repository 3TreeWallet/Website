import { LegalPage, PRIVACY_BLOCKS, PRIVACY_BLOCKS_EN } from '../legal-content';

export const metadata = {
  title: '隐私政策 — 3Tree Wallet Privacy Policy',
  description:
    '3Tree 钱包隐私政策。私钥仅存本地、不收集用户数据、无需注册账户。了解我们如何保护你的隐私。/ 3Tree wallet privacy policy: keys stored locally, no data collection, no account required.',
  keywords: ['3Tree 隐私政策', '3Tree Privacy Policy', 'crypto wallet privacy', '自托管钱包隐私'],
};

export default function PrivacyRoute() {
  return <LegalPage title="隐私政策" titleEn="Privacy Policy" blocks={PRIVACY_BLOCKS} blocksEn={PRIVACY_BLOCKS_EN} />;
}

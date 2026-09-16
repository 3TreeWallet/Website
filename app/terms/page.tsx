import { LegalPage, TOS_BLOCKS, TOS_BLOCKS_EN } from '../legal-content';

export const metadata = {
  title: '服务条款 — 3Tree Wallet Terms of Service',
  description:
    '3Tree 钱包服务条款。了解使用 3Tree 自托管多链钱包的权利、义务与免责条款。/ Terms of Service for 3Tree self-custody multi-chain wallet.',
  keywords: ['3Tree 服务条款', '3Tree Terms of Service', 'crypto wallet legal'],
};

export default function TermsRoute() {
  return <LegalPage title="服务条款" titleEn="Terms of Service" blocks={TOS_BLOCKS} blocksEn={TOS_BLOCKS_EN} />;
}

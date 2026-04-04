import clsx from 'clsx';
import NextImage from 'next/image';

import Container from '@/components/ui/Container';
import SITE_METADATA from '@/data/siteMetadata';

import LogoAndRepo from './LogoAndRepo';
import FooterMeta from './FooterMeta';
import FooterNav from './FooterNav';
import FooterBottom from './FooterBottom';

const Footer: React.FC = () => {
  return (
    <Container as="footer" className="mt-8 mb-4 md:mt-16">
      <div
        className={clsx([
          'grid grid-cols-1 gap-x-8 gap-y-8 py-8 md:grid-cols-2 xl:grid-cols-3',
          'border-t border-gray-200 dark:border-gray-700',
        ])}
      >
        <div className="col-span-1 space-y-4 xl:col-span-2">
          <LogoAndRepo />
          <div className="text-gray-500 italic dark:text-gray-400">{SITE_METADATA.description}</div>
          <div className="pt-4">
            <div className="flex gap-8 py-1.5 md:gap-20">
              <div className="flex items-center">
                <NextImage
                  src="/static/images/footer/footer-mascot.jpg"
                  alt="Footer mascot"
                  width={1440}
                  height={1080}
                  className="h-24 w-auto rounded-md object-contain"
                />
              </div>
              <FooterMeta />
            </div>
          </div>
        </div>
        <FooterNav />
      </div>
      <FooterBottom />
    </Container>
  );
};

export default Footer;

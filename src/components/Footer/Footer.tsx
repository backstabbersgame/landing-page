'use client';

import React from 'react';

import styles from './Footer.module.scss';
import Image from 'next/image';
import { Button } from '@backstabbersgame/design-system';
import {
  Bag,
  Chats,
  HourglassLow,
  InstagramLogo,
  Question,
  ShoppingCart,
  Sword,
  ThumbsUp,
  TiktokLogo,
  Truck,
  UsersThree,
  YoutubeLogo,
} from '@phosphor-icons/react/dist/ssr';
import useBreakpoint from 'src/hooks/useBreakpoint';
import footerContent from 'src/content/footer.json';

const footer = footerContent;
const Footer = () => {
  const { currentBreakpoint } = useBreakpoint();
  const isMobile = currentBreakpoint === 'mobile';
  const isMobileOrTablet = isMobile || currentBreakpoint === 'tablet';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <section className={styles.footer}>
      <div className={styles['footer-container']}>
        <div className={styles['footer-content']}>
          <div className={styles.logo}>
            {isMobileOrTablet ? (
              <Image
                src={`${basePath}${footer.logo.mobile}`}
                alt={footer.logo.alt}
                width={172.7}
                height={48}
              />
            ) : (
              <Image
                src={`${basePath}${footer.logo.desktop}`}
                alt={footer.logo.alt}
                width={158.82}
                height={169}
              />
            )}
          </div>
          <div className={styles.right}>
            {footer.sections.map((section) => (
              <section
                key={section.title}
                className={styles[section.className]}
              >
                <h4 className={styles.h4}>{section.title}</h4>
                <div className={styles.links}>
                  {section.links.map((link, idx) => (
                    <Button
                      key={idx}
                      variant='link'
                      className={styles.button}
                    >
                      {link.icon === 'Chats' && <Chats size={24} />}
                      {link.icon === 'Bag' && <Bag size={24} />}
                      {link.icon === 'Truck' && <Truck size={24} />}
                      {link.icon === 'Sword' && <Sword size={24} />}
                      {link.icon === 'HourglassLow' && (
                        <HourglassLow size={24} />
                      )}
                      {link.icon === 'ShoppingCart' && (
                        <ShoppingCart size={24} />
                      )}
                      {link.icon === 'UsersThree' && <UsersThree size={24} />}
                      {link.icon === 'ThumbsUp' && <ThumbsUp size={24} />}
                      {link.icon === 'Question' && <Question size={24} />}
                      {link.icon === 'InstagramLogo' && (
                        <InstagramLogo size={24} />
                      )}
                      {link.icon === 'YoutubeLogo' && <YoutubeLogo size={24} />}
                      {link.icon === 'TiktokLogo' && <TiktokLogo size={24} />}
                      {link.label}
                    </Button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
        <section className={styles.brand}>
          <div className={styles['brand-buttons']}>
            {footer.legal.map((item, idx) => (
              <Button
                key={idx}
                className={styles['brand-btn']}
                variant='link'
              >
                {item}
              </Button>
            ))}
          </div>
          <span className={styles.copyright}>{footer.copyright}</span>
        </section>
      </div>
    </section>
  );
};

export default Footer;

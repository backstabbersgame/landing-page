'use client';

import React from 'react';
import styles from './Newsletter.module.scss';
import { Button, InputText } from '@backstabbersgame/design-system';
import Image from 'next/image';
import useBreakpoint from 'src/hooks/useBreakpoint';
import newsletterContent from 'src/content/newsletter.json';

const newsletter = newsletterContent;

const Newsletter = () => {
  const { currentBreakpoint } = useBreakpoint();
  const isMobile = currentBreakpoint === 'mobile';

  const imageSrc = isMobile
    ? newsletter.image.mobile
    : newsletter.image.desktop;
  const imageWidth = isMobile ? 320 : 620;
  const imageHeight = isMobile ? 285 : 394;

  return (
    <section className={styles.newsletter}>
      <div className={styles['newsletter-container']}>
        <div className={styles['newsletter-content']}>
          <div className={styles['newsletter-title']}>
            <h1 className={styles.header}>
              {newsletter.title.replace(/\\n/g, '\n')}
            </h1>
            <p className={styles.p}>
              {newsletter.description.replace(/\\n/g, '\n')}
            </p>
          </div>
          <InputText
            placeholder={newsletter.emailPlaceholder}
            className={styles.email}
          />

          <Button
            variant='secondary'
            className={styles.btn}
          >
            {newsletter.buttonLabel}
            <Image
              width={24}
              height={24}
              src={newsletter.buttonIcon.src}
              alt={newsletter.buttonIcon.alt}
              className={styles.icon}
            />
          </Button>
        </div>
        <Image
          width={imageWidth}
          height={imageHeight}
          src={imageSrc}
          alt={newsletter.image.alt}
          className={styles.dealer}
        />
      </div>
    </section>
  );
};

export default Newsletter;

'use client';

import React from 'react';

import Image from 'next/image';
import styles from './About.module.scss';
import { Button } from '@backstabbersgame/design-system';
import useBreakpoint from 'src/hooks/useBreakpoint';
import aboutContent from 'src/content/about.json';

const about = aboutContent;

const About = () => {
  const { currentBreakpoint } = useBreakpoint();
  const isMobile = currentBreakpoint === 'mobile';
  const isMobileOrTablet = isMobile || currentBreakpoint === 'tablet';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <>
      <section className={styles.about} id='about'>
        <div className={styles['about-container']}>
          <header className={styles['about-header']}>
            <Image
              width={isMobileOrTablet ? 24 : 32}
              height={isMobileOrTablet ? 24 : 32}
              src={`${basePath}${about.icon}`}
              alt={about.iconAlt}
            />
            <div className={styles['section-title']}>
              <h2 className={styles['section-title-one']}>
                {about.titleOne.replace(/\\n/g, '\n')}&nbsp;
              </h2>
              <h2 className={styles['section-title-two']}>
                {about.titleTwo.replace(/\\n/g, '\n')}
              </h2>
              <h2>{about.titleThree}</h2>
            </div>
          </header>
          <div className={styles['about-content']}>
            <div className={styles.picture}>
              <Image
                width={isMobile ? 356.64 : 524}
                height={isMobile ? 237.56 : 288}
                src={`${basePath}${about.picture}`}
                alt={about.pictureAlt}
              />
            </div>
            <div className={styles['about-side']}>
              <p className={styles['about-p']}>
                {about.description.replace(/\\n/g, '\n')}
                <strong>{about.companyName}</strong>
                {about.descriptionAfterCompany.replace(/\\n/g, '\n')}
              </p>
              {/* <div className={styles['about-data']}>
                {about.data.map((item, index) => (
                  <div
                    key={index}
                    className={styles.data}
                  >
                    <h2>{item.value}</h2>
                    <h4>{item.label}</h4>
                  </div>
                ))}
              </div>
              <Button
                variant='secondary'
                className={styles.btn}
              >
                {about.buttonLabel}
              </Button> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

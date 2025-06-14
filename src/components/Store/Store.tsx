'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Store.module.scss';
import useBreakpoint from '../../hooks/useBreakpoint';
import storeContent from '../../content/store.json';

const store = storeContent;

const Store = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const { currentBreakpoint } = useBreakpoint();
  const isMobile = currentBreakpoint === 'mobile';
  const isMobileOrTablet = isMobile || currentBreakpoint === 'tablet';

  const collectiblesSrc = isMobile
    ? store.collectibles.image.mobile
    : store.collectibles.image.desktop;
  const collectiblesWidth = isMobile ? 320 : 632;
  const collectiblesHeight = isMobile ? 210 : 418;

  const boardgamesSrc = isMobile
    ? store.boardgames.image.mobile
    : store.boardgames.image.desktop;
  const boardgamesWidth = isMobile ? 320 : 632;
  const boardgamesHeight = isMobile ? 210 : 418;

  return (
    <>
      <section
        className={styles.store}
        id='store'
      >
        <div className={styles['store-container']}>
          <header className={styles['store-header']}>
            <Image
              width={isMobileOrTablet ? 24 : 32}
              height={isMobileOrTablet ? 24 : 32}
              src={`${basePath}${store.icon}`}
              alt={store.iconAlt}
            />
            <div className={styles['section-title']}>
              <h2 className={styles['section-title-one']}>
                {store.titleOne.replace(/\\n/g, '\n')}&nbsp;
              </h2>
              <h2 className={styles['section-title-two']}>
                {store.titleTwo.replace(/\\n/g, '\n')}
              </h2>
              <h2>{store.titleThree}</h2>
            </div>
          </header>
          <div className={styles['store-content']}>
            <div className={styles['store-merch']}>
              <Image
                width={boardgamesWidth}
                height={boardgamesHeight}
                src={`${basePath}${boardgamesSrc}`}
                alt={store.boardgames.image.alt}
                className={styles.merch}
              />
              <Image
                width={collectiblesWidth}
                height={collectiblesHeight}
                src={`${basePath}${collectiblesSrc}`}
                alt={store.collectibles.image.alt}
                className={styles.merch}
              />
            </div>
            <div className={styles['store-payments']}>
              {!isMobileOrTablet && <hr className={styles.line} />}
              {store.payments.map((payment, index) => (
                <React.Fragment key={payment.title}>
                  <div className={styles.payment}>
                    <Image
                      width={24}
                      height={24}
                      src={`${basePath}${payment.icon}`}
                      alt={payment.iconAlt}
                    />
                    <div>
                      <p className={styles.p}>{payment.title}</p>
                      {/* <p className={styles.subp}>{payment.subtitle}</p> */}
                    </div>
                  </div>
                  {index !== store.payments.length - 1 && (
                    <hr className={styles.line} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Store;

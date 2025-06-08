'use client';

import React from 'react';
import styles from './Home.module.scss';
import Hero from '../../components/Hero/Hero';
import Game from '../../components/Game/Game';
import About from 'src/components/About/About';
import Store from 'src/components/Store/Store';
import Newsletter from 'src/components/Newsletter/Newsletter';
import Contact from 'src/components/Contact/Contact';
import Header from 'src/components/Header/Header';
import Footer from 'src/components/Footer/Footer';

const Home = () => {
  return (
    <>
      <div className={styles.stars}>
        <div className={styles['hero-section']}>
          <Header />
          <Hero />
        </div>
      </div>
      <Game />
      <div className={styles.gradient}>
        <About />
        <Store />
      </div>
      <Contact />
      <Newsletter />
      <Footer />
    </>
  );
};
export default Home;

'use client';

import React, { useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import styles from './Newsletter.module.scss';
import { Button, InputText } from '@backstabbersgame/design-system';
import Image from 'next/image';
import useBreakpoint from '../../hooks/useBreakpoint';
import newsletterContent from '../../content/newsletter.json';
import { validateEmail } from '../../utils/validateEmail';

const newsletter = newsletterContent;

const Newsletter = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const { currentBreakpoint } = useBreakpoint();
  const isMobile = currentBreakpoint === 'mobile';

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const imageSrc = isMobile
    ? newsletter.image.mobile
    : newsletter.image.desktop;
  const imageWidth = isMobile ? 320 : 620;
  const imageHeight = isMobile ? 285 : 394;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');

    if (!email.trim() || !validateEmail(email)) {
      setError(newsletter.message.invalid);
      return;
    }

    try {
      await addDoc(collection(db, 'subscribers'), {
        email,
        createdAt: Timestamp.now(),
      });
      setStatus('success');
      setEmail('');
      setError('');
    } catch (error) {
      console.error('Erro ao salvar e-mail:', error);
      setStatus('error');
    }
  };

  return (
    <section
      className={styles.newsletter}
      id='newsletter'
    >
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
          <form
            onSubmit={handleSubmit}
            noValidate
          >
            <InputText
              placeholder={newsletter.emailPlaceholder}
              className={styles.email}
              type='email'
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
                setStatus('idle');
              }}
              error={error ? error : ''}
            />
            <Button
              variant='secondary'
              className={styles.btn}
              type='submit'
            >
              {newsletter.buttonLabel}
              <Image
                width={24}
                height={24}
                src={`${basePath}${newsletter.buttonIcon.src}`}
                alt={newsletter.buttonIcon.alt}
                className={styles.icon}
              />
            </Button>
            <div className={styles['status-container']}>
              <p
                className={`${styles.message} ${
                  status === 'success' ? styles.success : ''
                } ${status === 'error' ? styles.error : ''}`}
              >
                {status === 'success' && newsletter.message.success}
                {status === 'error' && newsletter.message.error}
              </p>
            </div>
          </form>
        </div>
        <Image
          width={imageWidth}
          height={imageHeight}
          src={`${basePath}${imageSrc}`}
          alt={newsletter.image.alt}
          className={styles.dealer}
        />
      </div>
    </section>
  );
};

export default Newsletter;

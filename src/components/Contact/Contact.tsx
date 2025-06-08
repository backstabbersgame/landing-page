'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Contact.module.scss';
import useBreakpoint from 'src/hooks/useBreakpoint';
import {
  Button,
  InputSelect,
  InputText,
  InputTextArea,
  Upload,
} from '@backstabbersgame/design-system';
import {
  At,
  Heart,
  InstagramLogo,
  TiktokLogo,
  YoutubeLogo,
} from '@phosphor-icons/react/dist/ssr';
import contactContent from 'src/content/contact.json';
// import ContactForm from '../ContactForm/ContactForm';

const contact = contactContent;

const Contact = () => {
  const { currentBreakpoint } = useBreakpoint();
  const isMobile = currentBreakpoint === 'mobile';
  const isMobileOrTablet = isMobile || currentBreakpoint === 'tablet';
  const [value, setValue] = useState('');
  const options = contact.selectOptions;

  return (
    <section className={styles.contact}>
      <div className={styles['contact-container']}>
        <header className={styles['contact-header']}>
          <Image
            width={isMobileOrTablet ? 24 : 32}
            height={isMobileOrTablet ? 24 : 32}
            src={contact.icon}
            alt={contact.iconAlt}
          />
          <div className={styles['section-title']}>
            <h2 className={styles.header}>
              {contact.title.replace(/\\n/g, '\n')}
            </h2>
            <p className={styles.p}>
              {contact.description.replace(/\\n/g, '\n')}
            </p>
          </div>
        </header>
        <section className={styles['contact-form']}>
          {/* <ContactForm /> */}
          {/* <div className={styles['contact-inputs']}>
            <div className={styles['contact-inputs-1']}>
              <InputText
                placeholder={contact.placeholders.name}
                className={styles.nome}
              />
              <InputText
                placeholder={contact.placeholders.email}
                className={styles.email}
              />
            </div>
            <div className={styles['contact-inputs-2']}>
              <InputSelect
                options={options}
                className={styles.eusou}
              />
              <InputText
                placeholder={contact.placeholders.subject}
                className={styles.assunto}
              />
            </div>
          </div>
          <InputTextArea
            placeholder={contact.placeholders.message}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={styles.mensagem}
          />
          <Upload className={styles.upload} />
          <div className={styles['submit-container']}>
            <Button
              className={styles.submit}
              arrowRight
            >
              {contact.submitLabel}
            </Button>
          </div> */}
        </section>
        <section className={styles.community}>
          <div>
            <Heart
              size={24}
              className={styles.heart}
            />
            <h4 className={styles.h4}>{contact.communityTitle}</h4>
          </div>
          <Button
            variant='secondary'
            className={styles['community-btn']}
          >
            {contact.communityButton}
          </Button>
        </section>
        <section className={styles.socials}>
          <div className={styles['socials-header']}>
            <At
              size={24}
              className={styles.at}
            />
            <h4 className={styles.h4}>{contact.socialsTitle}</h4>
          </div>
          <div className={styles.links}>
            {contact.socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                className={styles['social-link']}
              >
                {social.icon === 'InstagramLogo' && (
                  <InstagramLogo
                    size={24}
                    className={styles.instagram}
                  />
                )}
                {social.icon === 'YoutubeLogo' && (
                  <YoutubeLogo
                    size={24}
                    className={styles.youtube}
                  />
                )}
                {social.icon === 'TiktokLogo' && (
                  <TiktokLogo
                    size={24}
                    className={styles.tiktok}
                  />
                )}
              </a>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Contact;

import React from 'react';
import styles from './VerticalButton.module.scss';
import { CaretRight } from '@phosphor-icons/react/dist/ssr';

const VerticalButton = () => {
  return (
    <button className={styles.btn}>
      <CaretRight size={24} />
    </button>
  );
};

export default VerticalButton;

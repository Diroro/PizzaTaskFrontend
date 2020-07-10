import * as React from 'react';
import s from './Footer.module.css';

export const Footer: React.FC<{}> = () => {
  return (
    <footer className={s.footer}>
      This application was made only for testing and self-development purposes. It's impossible to
      create a real order here. All images and descriptions were just googled.
    </footer>
  );
};

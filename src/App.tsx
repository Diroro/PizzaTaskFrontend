import React from 'react';
import {HeaderContainer} from './features/Header/Header.container';
import {Footer} from './features/Footer/Footer.component';
import s from './App.module.css';
import {RouterContainer} from './router/Router.container';

export const App: React.FC<{}> = () => {
  return (
    <div className={s.app}>
      <HeaderContainer />
      <main className={s.main}>
        <RouterContainer />
      </main>
      <Footer />
    </div>
  );
};

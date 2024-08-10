// src/components/Header/Header.tsx
import React from 'react';
import styles from './index.module.scss';
import logo from  "../../assets/images/header/logo.svg"
import LoginForm from "../LoginModal";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Tik Tok" />
        <span>Tik Tok</span>
      </div>
      <div className={styles.userInfo}>
        <span>Hello, chen xi!</span>
        <img src={logo} alt="Profile" />
      </div>
      <LoginForm open={false} cancel={()=>{}}></LoginForm>
    </header>
  );
};

export default Header;

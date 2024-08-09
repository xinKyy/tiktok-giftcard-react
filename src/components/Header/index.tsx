// src/components/Header/Header.tsx
import React from 'react';
import styles from './index.module.scss';
import LoginForm from "../LoginModal";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7330417489756553222~c5_1080x1080.jpeg?lk3s=a5d48078&nonce=48965&refresh_token=5b1b5237575d5bd85ed9b408cbe9befc&x-expires=1723388400&x-signature=3q9KSyV47SlDRl5HpNOweBe%2Bl2k%3D&shp=a5d48078&shcp=81f88b70" alt="Tik Tok" />
        <span>Tik Tok</span>
      </div>
      <div className={styles.userInfo}>
        <span>Hello, chen xi!</span>
        <img src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7330417489756553222~c5_1080x1080.jpeg?lk3s=a5d48078&nonce=48965&refresh_token=5b1b5237575d5bd85ed9b408cbe9befc&x-expires=1723388400&x-signature=3q9KSyV47SlDRl5HpNOweBe%2Bl2k%3D&shp=a5d48078&shcp=81f88b70" alt="Profile" />
      </div>
      <LoginForm open={true} cancel={()=>{}}></LoginForm>
    </header>
  );
};

export default Header;

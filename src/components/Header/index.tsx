// src/components/Header/Header.tsx
import React from 'react';
import styles from './index.module.scss';
import logo from  "../../assets/images/header/logo.svg"
import {useLogin} from "../../provider/loginContext";

const Header: React.FC = () => {

  const { userInfo, setOpenLoginModal} = useLogin()

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Tik Tok" />
        <span>Tik Tok</span>
      </div>
      <div className={styles.userInfo}>
        {
          userInfo && <span onClick={()=>setOpenLoginModal(true)}>Hello, {userInfo.email}</span>
        }
      </div>
    </header>
  );
};

export default Header;

// src/components/LoginForm/LoginForm.tsx
import React, {useState} from 'react';
import styles from './index.module.scss';
import {Modal} from "antd";

const LoginForm = (props:{
  open:boolean,
  cancel:()=>void,
}) => {

  const [isRegis, setIsRegis] = useState(false);

  return (
    <Modal title={null} footer={null} open={props.open} onCancel={props.cancel}>
      <div className={styles.loginForm}>
        <div className={styles.logo}>
        </div>
        <h2>Welcom</h2>
        <p>Welcom back! Please enter your details.</p>
        <form>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" placeholder="Please enter your email" />
          </div>
          {
            isRegis && <div className={styles.inputGroupWithButton}>
              <div className={styles.inputGroup}>
                <label>captcha</label>
                <input type="text" placeholder="Please enter your captcha" />
              </div>
              <button type="button" className={styles.captchaButton}>sent</button>
            </div>
          }
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input type="password" placeholder="Please enter your password" />
          </div>
          <div className={styles.forgotPassword}>
            <a href="/forgot-password">Forgot password</a>
          </div>
          <button type="submit" className={styles.loginButton}>Log in</button>
        </form>
        <div className={styles.signupLink}>
          <p>Already have an account? <a onClick={()=>setIsRegis(!isRegis)}>{
            isRegis ? "Sign up" : "Log in"
          }</a></p>
        </div>
      </div>
    </Modal>
  );
};

export default LoginForm;

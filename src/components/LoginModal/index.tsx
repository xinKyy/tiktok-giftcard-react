// src/components/LoginForm/LoginForm.tsx
import React, {useState} from 'react';
import styles from './index.module.scss';
import {Button, Form, Input, Modal} from "antd";
import {useLogin} from "../../provider/loginContext";
import {APILogin} from "../../api";

const LoginForm = () => {
  const {openLoginModal, setOpenLoginModal, setUserInfo} = useLogin()
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const onSubmit = () =>{
    const v = form.getFieldsValue();
    setLoading(true);
    APILogin({
      email: v.email,
      password: v.password,
      referralCode: v.referralCode,
    }).then(resp =>{
      if(resp.data){
        if(resp.data.user){
          localStorage.setItem("token", resp.data.user.token)
          localStorage.setItem("id", resp.data.user.id)
        }
        const user = {
          email: v.email,
          referralCode: v.referralCode
        }
        localStorage.setItem("userInfo", JSON.stringify(user))
        setUserInfo(user)
        setOpenLoginModal(false);
      }
    }).finally(()=>{
      setLoading(false);
    })
  }

  return (
    <Modal title={null} footer={null} open={openLoginModal} onCancel={()=>setOpenLoginModal(false)}>
      <div className={styles.loginForm}>
        <div className={styles.logo}>
        </div>
        <h2>Welcome</h2>
        <p>Oh, we need some information from you to facilitate sending appointment information</p>
        <Form autoComplete={"off"} form={form} onFinish={onSubmit}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <Form.Item rules={[
              {
                required:true,
                message:"Please enter your email address!"
              },
              {
                type: "email",
                message: "The input is not a valid email address!",
              },
            ]} name={"email"}>
              <Input type="email" placeholder="Please enter your email" />
            </Form.Item>
          </div>
          {
            // isRegis && <div className={styles.inputGroupWithButton}>
            //   <div className={styles.inputGroup}>
            //     <label>captcha</label>
            //     <input type="text" placeholder="Please enter your captcha" />
            //   </div>
            //   <button type="button" className={styles.captchaButton}>sent</button>
            // </div>
          }

          <div className={styles.inputGroup}>
            <label>Password   <span className={styles.des}>(First login is considered as registration.)</span></label>
            <Form.Item rules={[
              {
                required:true,
                message:"Please enter your password!"
              },
            ]} name={"password"}>
              <Input type={"password"} placeholder="Please enter referral code!" />
            </Form.Item>
          </div>

          <div className={styles.inputGroup}>
            <label>Referral Code</label>
            <Form.Item name={"referralCode"}>
              <Input placeholder="Please enter referral code!" />
            </Form.Item>
          </div>
          {/*<div className={styles.forgotPassword}>*/}
          {/*  <a href="/forgot-password">Forgot password</a>*/}
          {/*</div>*/}
          <Button loading={loading} htmlType={"submit"} className={styles.loginButton}>Log in</Button>
        </Form>
        {/*<div className={styles.signupLink}>*/}
        {/*  <p>Already have an account? <a onClick={()=>setIsRegis(!isRegis)}>{*/}
        {/*    isRegis ? "Sign up" : "Log in"*/}
        {/*  }</a></p>*/}
        {/*</div>*/}
      </div>
    </Modal>
  );
};

export default LoginForm;

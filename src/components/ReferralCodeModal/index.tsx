import {Button, Input, Modal} from "antd";
import styles from './index.module.scss'
import {useLogin} from "../../provider/loginContext";
import SizeBox from "../SizeBox";
import {useEffect, useState} from "react";


const ReferralCodeModal = ({callback}:{
  callback:()=>void
}) =>{
  const {openReferralCodeModal, setOpenReferralCodeModal} = useLogin()

  const [code, setCode] = useState("");

  const submit = () =>{
    localStorage.setItem("referralCode", code)
    callback()
    setOpenReferralCodeModal(false)
  }

  const skip = () =>{
    localStorage.setItem("referralCode", "SKIP")
    callback()
    setOpenReferralCodeModal(false)
  }

  return <Modal title={null} footer={null} open={openReferralCodeModal} onCancel={()=>{
    setOpenReferralCodeModal(false)
    setCode("")
  }}>
    <div className={styles.referralCodeForm}>
      <label htmlFor="referralCode" className={styles.label}>Please enter your referral code:</label>
      <Input value={code} onChange={(e)=>{
        setCode(e.target.value)
      }} type="text" id="referralCode" className={styles.input} placeholder="Please input referral code" />
      <div className={styles.button_wrap}>
        <Button onClick={skip} type={"default"} className={styles.skip_button}>Skip</Button>
        <SizeBox w={30}></SizeBox>
        <Button onClick={submit} className={styles.button}>Submit</Button>
      </div>
    </div>
  </Modal>
}

export default ReferralCodeModal;

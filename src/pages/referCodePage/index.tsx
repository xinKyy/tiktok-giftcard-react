import styles from "./index.module.scss"
import backIcon from "../../assets/images/home/back-icon.svg";
import {Input, Select, Table} from "antd";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import SizeBox from "../../components/SizeBox";
import CommonBtn from "../../components/CommonBtn";
import NumberInput from "../../components/NumberInput";

const ReferCodePage = () =>{
    const navigate = useNavigate()
    const cancel = () =>{
        navigate('/');
    }

    return <div className={styles.confirmPage}>
        <div onClick={cancel} className={styles.back}>
            <img src={backIcon}></img> 戻る
        </div>
        <SizeBox h={20}></SizeBox>
        <SecondUserReferCodeWrap></SecondUserReferCodeWrap>
    </div>
}

const FirstUserReferCodeWrap = () =>{
    const [loading, setLoading] = useState();
    const [referCodeValue, setReferCodeValue] = useState<string>();
    const [amount, setAmount] = useState<number>(1);

    return <div>
        <div>
            <div className={styles.refer_code_title_wrap}>
                <span>*</span>输入你要生成的个数
            </div>
            <div className={styles.flex_wrap}>
                <NumberInput max={100} amount={amount} setAmount={(number)=>setAmount(number)}></NumberInput>
                {
                    amount && <CommonBtn loading={loading} className={styles.btn}>开始生成</CommonBtn>
                }
            </div>
        </div>

        <SizeBox h={50}></SizeBox>

        <div>
            <div className={styles.refer_code_title_wrap}>
               输入你自定义邀请码
            </div>
            <div className={styles.flex_wrap}>
                <Input value={referCodeValue} onChange={(e)=>{setReferCodeValue(e.target.value)}} className={styles.refer_input_wrap}></Input>
                {
                    referCodeValue && <CommonBtn loading={loading} className={styles.btn}>确定</CommonBtn>
                }
            </div>
        </div>
    </div>
}

const SecondUserReferCodeWrap = () =>{
    const [loading, setLoading] = useState();
    const [referCodeValue, setReferCodeValue] = useState<string>();
    return <div>
        <div>
            <div className={styles.refer_code_title_wrap}>
                <span>*</span>您的邀请码
            </div>
            <div className={styles.flex_wrap}>
                <Input value={referCodeValue} onChange={(e)=>{setReferCodeValue(e.target.value)}} className={styles.refer_input_wrap}></Input>
                {
                    referCodeValue && <CommonBtn loading={loading} className={styles.btn}>确定</CommonBtn>
                }
            </div>
        </div>
        <SizeBox h={50}></SizeBox>
        <div>
            <div className={styles.refer_code_title_wrap}>
                您的专属邀请码
            </div>
            <Input value={"XINK"} disabled className={styles.refer_input_wrap}></Input>
        </div>
    </div>
}

export default ReferCodePage

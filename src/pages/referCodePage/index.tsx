import styles from "./index.module.scss"
import backIcon from "../../assets/images/home/back-icon.svg";
import {Input, message, Select, Table} from "antd";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import SizeBox from "../../components/SizeBox";
import CommonBtn from "../../components/CommonBtn";
import NumberInput from "../../components/NumberInput";
import {APIGenerateCode} from "../../api";
import copy from 'copy-to-clipboard';
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
        <FirstUserReferCodeWrap></FirstUserReferCodeWrap>
    </div>
}

const FirstUserReferCodeWrap = () =>{
    const [loading, setLoading] = useState(false);
    const [diyLoading, setDiyLoading] = useState(false);
    const [referCodeValue, setReferCodeValue] = useState<string>();
    const [amount, setAmount] = useState<number>(1);
    const [numCodeList, setNumCodeList] = useState<string[]>([]);
    const [diyCodeList, setDiyCodeList] = useState<string[]>([]);

    const generateCodeByNum = async () =>{
        setLoading(true);
        try{
            const resp = await APIGenerateCode({num:amount});
            if(resp.data.data){
                const data = resp.data.data
                setNumCodeList(data)
            }
        } catch (e){
            console.log(e)
        }
        setLoading(false);
    }

    const generateCodeByDiy = async () =>{
        setDiyLoading(true);
        try{
            const resp = await APIGenerateCode({codes:referCodeValue});
            if(resp.data.data){
                const data = resp.data.data
                setDiyCodeList(data)
                setReferCodeValue("")
            }
        } catch (e){
            console.log(e)
        }
        setDiyLoading(false);
    }

    const onCopy = (item:string) =>{
        copy(item);
        message.success("Copy success")
    }

    return <div>
        <div>
            <div className={styles.refer_code_title_wrap}>
                输入你自定义邀请码(多个使用逗号分隔)
            </div>
            <div className={styles.flex_wrap}>
                <Input value={referCodeValue} onChange={(e)=>{setReferCodeValue(e.target.value)}} className={styles.refer_input_wrap}></Input>
                {
                    referCodeValue && <CommonBtn loading={diyLoading} onClick={generateCodeByDiy} className={styles.btn}>生成</CommonBtn>
                }
            </div>

            {
                diyCodeList.length > 0 &&
              <div className={styles.code_wrap}>
                  {
                      diyCodeList.map(item=>{
                          return  <div onClick={()=>onCopy(item)} className={styles.item}>{item}</div>
                      })
                  }
                  {
                      diyCodeList && diyCodeList.length > 0 && <CommonBtn onClick={()=>onCopy(diyCodeList.join(","))}  style={{
                          height:"45px",
                          lineHeight:"25px",
                      }} >复制全部</CommonBtn>
                  }
              </div>
            }
        </div>
        <SizeBox h={50}></SizeBox>
        <div>
            <div className={styles.refer_code_title_wrap}>
                <span></span>输入你要生成的个数
            </div>
            <div className={styles.flex_wrap}>
                <NumberInput max={100} amount={amount} setAmount={(number)=>setAmount(number)}></NumberInput>
                {
                    amount && <CommonBtn loading={loading} onClick={generateCodeByNum}  className={styles.btn}>开始生成</CommonBtn>
                }
            </div>

            <div className={styles.code_wrap}>
                {
                    numCodeList.map(item=>{
                        return  <div onClick={()=>onCopy(item)} className={styles.item}>{item}</div>
                    })
                }
                {
                    numCodeList && numCodeList.length > 0 && <CommonBtn onClick={()=>onCopy(numCodeList.join(","))}  style={{
                        height:"45px",
                    lineHeight:"25px",
                    }} >复制全部</CommonBtn>
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

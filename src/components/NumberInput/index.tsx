import { Input } from "antd";
import {ChangeEvent} from "react";
import styles from "./index.module.scss"
interface NumberInputProps {
  amount: number,
  setAmount: (amount: number) => void
}

const NumberInput = (props: NumberInputProps) => {
  const {amount, setAmount} = props;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && value !== "") {
      if (/^\d*$/.test(value)) {
        setAmount(parseInt(value))
      }
    }
  }
  return <div className={styles.number_input_wrapper}>
    <div
      onClick={()=>setAmount(amount - 1)} className={styles.sub_icon}>
      <div></div>
    </div>
    <Input value={amount} onChange={onChange} className={styles.input_wrapper}></Input>
    <div onClick={()=>setAmount(amount + 1)} className={styles.add_icon}><div></div></div>
  </div>
}

export default NumberInput

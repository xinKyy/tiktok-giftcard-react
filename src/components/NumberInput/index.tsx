import {Input, message} from "antd";
import {ChangeEvent} from "react";
import styles from "./index.module.scss"
class NumberInputProps {
  amount: number = 1;
  max?:number = 99;
  setAmount: (amount: number) => void = () =>{}
}

const NumberInput = (props: NumberInputProps) => {
  const {amount, setAmount, max} = props;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && value !== "") {
      if (/^\d*$/.test(value)) {
        const v = parseInt(value)
        if(v > max!){
            return message.info("選択した数量がオプションの数を超えています。")
        }
        setAmount(v)
      }
    }
  }

  const sub = () =>{
      setAmount(amount > 0 ? amount - 1 : 0)
  }

  const add = () =>{
      const newAmount = amount + 1
      if(newAmount > 99){
          return message.info("選択した数量がオプションの数を超えています。")
      }
      setAmount(newAmount)
  }

  return <div className={styles.number_input_wrapper}>
    <div
      onClick={sub} className={styles.sub_icon}>
      <div></div>
    </div>
    <Input value={amount} onChange={onChange} className={styles.input_wrapper}></Input>
    <div onClick={add} className={styles.add_icon}><div></div></div>
  </div>
}

export default NumberInput

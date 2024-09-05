import {Button} from "antd";
import React, {JSX} from "react";
import styles from "./index.module.scss"


interface Props {
    onClick?:()=>any,
    loading?:boolean,
    children?:JSX.Element | string,
    className?:string,
    style?:React.CSSProperties
}

const CommonBtn = (props:Props) =>{
    return <>
        <Button onClick={props.onClick} style={props.style} loading={props.loading} className={`${styles.bookAllButton} ${props.className}`}>
            {props.children}
        </Button>
    </>
}

export default CommonBtn

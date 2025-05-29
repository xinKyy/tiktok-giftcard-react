import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useLogin} from "../../provider/loginContext";

function PaymentComponent() {
  const { id } = useParams()
  const { setOrderConfirm } = useLogin()
    useEffect(() => {
        setOrderConfirm([])
    }, []);
  return (
    <div style={{ minHeight: '100vh', background:"#FAFAFA", display:"flex", justifyContent:"center", alignItems:"center" }}>
      <pp-checkout style={{
        width: '100%',
        height: '100%',
      }} accessToken={id} locale="ja"></pp-checkout>
    </div>
  );
}

export default PaymentComponent;

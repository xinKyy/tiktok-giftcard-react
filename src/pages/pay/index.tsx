import React, {useEffect} from 'react';

function PaymentComponent() {
  return (
    <div style={{ minHeight: '100vh', background:"#FAFAFA", display:"flex", justifyContent:"center", alignItems:"center" }}>
      <pp-checkout style={{
        width: '100%',
        height: '100%',
      }} accessToken={"your_access_token"} locale="ja"></pp-checkout>
    </div>
  );
}

export default PaymentComponent;

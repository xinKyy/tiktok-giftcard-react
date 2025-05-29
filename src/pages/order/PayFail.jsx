import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './PayFail.module.css';

// 红色叉号SVG
const FailIcon = () => (
  <svg width="100" height="100" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="512" cy="512" r="409" fill="#232020" stroke="#FE2C55" strokeWidth="40" />
    <path d="M352 352L672 672M672 352L352 672" stroke="#FE2C55" strokeWidth="60" strokeLinecap="round"/>
  </svg>
);

const PayFail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count === 0) {
      navigate('/');
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.centerBox}>
        <FailIcon />
        <div className={styles.title}>お支払いに失敗しました！</div>
        <div className={styles.desc}>ご注文内容を再度ご確認ください。</div>
        <div className={styles.actionRow}>
          <button className={styles.btn} onClick={() => navigate('/')}>トップに戻る</button>
          <span className={styles.count}>{count}秒後に自動的に移動します</span>
        </div>
      </div>
    </div>
  );
};

export default PayFail;

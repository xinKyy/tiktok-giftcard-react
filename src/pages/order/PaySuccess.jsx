import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './PaySuccess.module.css';
import checkedIcon from '../../assets/images/home/checked-icon.svg';

const PaySuccess = () => {
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
        <img src={checkedIcon} alt="success" className={styles.icon} />
        <div className={styles.title}>お支払いが完了しました！</div>
        <div className={styles.desc}>購入記録ページでご注文内容を確認できます。</div>
        <div className={styles.actionRow}>
          <button className={styles.btn} onClick={() => navigate('/')}>トップに戻る</button>
          <span className={styles.count}>{count} 秒後に自動的に移動します</span>
        </div>
      </div>
    </div>
  );
};

export default PaySuccess;

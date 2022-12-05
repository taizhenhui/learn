import React from 'react';
import styles from './profile.less';
import router from 'umi'
export default function Page() {
  return (
    <div>
      <h1 className={styles.title}>个人中心</h1>
      <button onClick={ ()=> router.goBack() }>返回</button>
    </div>
  );
}

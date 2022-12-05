import React from 'react';
import styles from './index.less';
// umi是一个集成环境，里面集成了react全家桶
import { Link } from 'umi'
export default function Page() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Link to='/profile'>个人中心</Link>
    </div>
  );
}

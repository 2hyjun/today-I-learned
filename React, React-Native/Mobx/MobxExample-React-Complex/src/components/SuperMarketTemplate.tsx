import * as React from 'react';
import './SuperMarketTemplate.css';

const SuperMarketTemplate: React.FunctionComponent<any> = ({ items, basket, total }) => {
  return (
    <div className='SuperMarketTemplate'>
      <div className='item-wrapper'>
        <h2>상품</h2>
        {items}
      </div>
      <div className='basketwrapper'>
        <h2>장바구니</h2>
        {basket}
        {total}
      </div>
    </div>
  );
};

export default SuperMarketTemplate;

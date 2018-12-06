import * as React from 'react';
import './BasketItem.css';
import { IMarketItem } from 'types';
import { observer } from 'mobx-react';

interface IProps {
  item: IMarketItem;
  onTake?: (name: string) => void;
}

const BasketItem: React.FunctionComponent<IProps> = ({ item, onTake }) => {
  console.log(`${item.name} re-rendered`)
    return (
      <div className='BasketItem'>
        <div className='name'>{item.name}</div>
        <div className='price'>{item.price}원</div>
        <div className='count'>{item.count}</div>
        <div className='return' onClick={() => onTake && onTake(name)}>
          갖다놓기
        </div>
      </div>
    );
};

export default observer(BasketItem);

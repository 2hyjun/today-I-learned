import * as React from 'react';
import ShopItem from './ShopItem';
import { inject, observer } from 'mobx-react';
import MarketStore from 'stores/market';

const items = [
  {
    name: '생수',
    price: 850,
  },
  {
    name: '신라면',
    price: 900,
  },
  {
    name: '포카칩',
    price: 1500,
  },
  {
    name: '새우깡',
    price: 1000,
  },
];

const ShopItemList: React.FunctionComponent<any> = ({ onPut }) => {
  const itemList = items.map((item) => <ShopItem {...item} key={item.name} onPut={onPut} />);
  return <div>{itemList}</div>;
};

export default inject(({ market, counter }) => ({
  onPut: (name: string, price: number) => {
    market.put(name, price);
    counter.setCount(1);
  },
}))(observer(ShopItemList));

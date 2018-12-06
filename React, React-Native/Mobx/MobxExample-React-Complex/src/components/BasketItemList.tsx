import * as React from 'react';
import BasketItem from './BasketItem';
import { observer, inject } from 'mobx-react';
import MarketStore from 'stores/market';
import { IMarketItem } from 'types';

interface IProps {
  items?: IMarketItem[];
  total?: number;
  onTake?: (name: string) => void;
}

const BasketItemList: React.FunctionComponent<IProps> = ({ items, onTake }) => {
  const itemList = items && items.map(item => (
    <BasketItem item={item} key={item.name} onTake={onTake} />
  ));
  return <div>{itemList}</div>;
}

export default inject(({ market }: { market: MarketStore }) => ({
  items: market.selectedItems,
  onTake: market.take,
}))(observer(BasketItemList));

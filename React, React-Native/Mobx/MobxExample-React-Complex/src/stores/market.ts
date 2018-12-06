import { observable, action, computed } from 'mobx';
import { IMarketItem } from 'types';
import RootStore from 'stores';

export default class MarketStore {
  @observable public selectedItems: IMarketItem[] = [];
  private root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
  }

  @action
  public put = (name: string, price: number) => {
    // 존재하는지 검사
    const exist = this.selectedItems.find((item) => item.name === name);
    const { number: count } = this.root.counter;
    if (!exist) {
      this.selectedItems.push({
        name,
        price,
        count,
      });
      return;
    }
    // 존재한다면 count 증가
    exist.count += count;
  };

  @action
  public take = (name: string) => {
    const itemToTakeIndex = this.selectedItems.findIndex((item) => item.name === name);
    if (itemToTakeIndex !== -1) {
      this.selectedItems[itemToTakeIndex].count--;
      this.selectedItems[itemToTakeIndex].count === 0 && this.selectedItems.splice(itemToTakeIndex, 1);
    }
  };

  @computed
  public get total() {
    return this.selectedItems.reduce((prev, cur) => {
      return prev + cur.price * cur.count;
    }, 0);
  }
}

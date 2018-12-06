import { observable, action } from 'mobx';
import RootStore from 'stores';

export default class CounterStore {
  @observable public number = 1;
  private root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
  }

  @action public increase = () => {
    this.number++;
  };

  @action public decrease = () => {
    if (this.number > 1) {
      this.number--;
    }
  };

  @action public setCount = (v: number) => {
    console.log('* action setCount called!');
    this.number = v;
  };
}

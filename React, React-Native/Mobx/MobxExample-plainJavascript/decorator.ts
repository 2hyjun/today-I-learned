import { observable, computed, autorun, action, transaction } from 'mobx';

class GS25 {
  @observable
  basket: Array<{ name: string; price: number }> = [];

  @computed
  get total() {
    console.log('계산중입니다..!');
    // Reduce 함수로 배열 내부의 객체의 price 총합 계산
    // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    return this.basket.reduce((prev, curr) => prev + curr.price, 0);
  }

  @action
  select(name: string, price: number) {
    this.basket.push({ name, price });
  }
}

const gs25 = new GS25();
autorun(() => gs25.total);

autorun(() => {
  if (gs25.basket.length > 0) {
    // 새로운 데이터가 추가될 때 알림
    console.log('*** new Data:');
    console.log(gs25.basket[gs25.basket.length - 1].name, gs25.basket[gs25.basket.length - 1].price);
  }
});

// 데이터가 추가될때 마다 autorun이 실행되지 않고, transaction으로 묶어서 처리.
transaction(() => {
  gs25.select('물', 800);
  gs25.select('물', 800);
  gs25.select('포카칩', 1500);
});

console.log(gs25.total);

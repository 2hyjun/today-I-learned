import { decorate, observable, computed, autorun, action } from 'mobx';

class GS25 {
  basket: Array<{ name: string; price: number }> = [];

  get total() {
    console.log('계산중입니다..!');
    // Reduce 함수로 배열 내부의 객체의 price 총합 계산
    // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    return this.basket.reduce((prev, curr) => prev + curr.price, 0);
  }

  select(name: string, price: number) {
    this.basket.push({ name, price });
  }
}

decorate(GS25, {
  basket: observable,
  total: computed,
  select: action,
});

const gs25 = new GS25();
autorun(() => gs25.total);
gs25.select('물', 800);
console.log(gs25.total);
gs25.select('물', 800);
console.log(gs25.total);
gs25.select('포카칩', 1500);
console.log(gs25.total);

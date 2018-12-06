const { observable, reaction, computed, autorun } = require('mobx');

const calculator = observable({
  a: 1,
  b: 2,
});

const sum = computed(() => {
  console.log('계산중입니다.');
  return calculator.a + calculator.b;
});

sum.observe(() => calculator.a); // a 값을 주시
sum.observe(() => calculator.b); // b 값을 주시

//**** 여러번 조회해도 computed 안의 함수를 다시 호출하지 않지만..
console.log(sum.value);
console.log(sum.value);
// caching 됨!

// 내부의 값이 바뀌면 다시 호출 함
calculator.a = 20;
console.log(sum.value);

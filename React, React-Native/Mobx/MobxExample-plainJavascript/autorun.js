const { observable, reaction, computed, autorun } = require('mobx');

// Observable State 만들기
const calculator = observable({
  a: 1,
  b: 2,
});

// computed 로 특정 값 캐싱
const sum = computed(() => {
  console.log('계산중이예요!');
  return calculator.a + calculator.b;
});

// autorun은 함수 내에서 조회하는 값을 자동으로 주시함.
autorun(() => {
  console.log(`a 값이 ${calculator.a} 로 바뀌었네요!`);
  // 자동으로 calculator.a 값을 주시
});

autorun(() => {
  console.log(`b 값이 ${calculator.b} 로 바뀌었네요!`);
  // 자동으로 calculator.b 값을 주시
});

autorun(() => sum.get()); // su

calculator.a = 10;
calculator.b = 20;

// 여러번 조회해도 computed 안의 함수를 다시 호출하지 않지만..
console.log(sum.value);
console.log(sum.value);

calculator.a = 20;

// 내부의 값이 바뀌면 다시 호출 함.
console.log(sum.value);

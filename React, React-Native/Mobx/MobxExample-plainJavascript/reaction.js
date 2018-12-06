const { observable, reaction, computed, autorun } = require('mobx');

// ** Obseravable State 만들기
/**
 * 이렇게 Observable State 를 만들고나면 MobX 가 이 객체를 "관찰 할 수" 있어서 변화가 일어나면 바로 탐지해낼수있습니다.
 */

const calculator = observable({
  a: 1,
  b: 2,
});

// **** 특정 값이 바뀔 때 특정 작업 하기!

reaction(
  () => calculator.a,
  (value, reaction) => {
    console.log(`a 값이 ${value}로 바뀌었네요!`);
  },
);

reaction(
  () => calculator.b,
  (value) => {
    console.log(`b 값이 ${value}로 바뀌었네요!`);
  },
);

calculator.a = 10;
calculator.b = 20;

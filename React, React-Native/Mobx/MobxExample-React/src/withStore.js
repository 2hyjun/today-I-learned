import React from 'react';
import { observer, inject } from 'mobx-react';

/**
 * inject 함수는 mobx-react 에 있는 함수로서,
 * 컴포넌트에서 스토어에 접근할 수 있게 해줍니다.
 * 정확히는, 스토어에 있는 값을 컴포넌트의 props 로 "주입"을 해줍니다.
 */

// 파라미터를 활용해 특정 값만 넣어주는 것도 가능!
@inject((stores) => ({
  number: stores.counter.number,
  increase: stores.counter.increase,
  decrease: stores.counter.decrease,
}))
@observer
class Counter extends React.Component {
  render() {
    const { number, increase, decrease } = this.props;
    return (
      <div>
        <h1>{number}</h1>
        <button onClick={increase}>+1</button>
        <button onClick={decrease}>-1</button>
      </div>
    );
  }
}

// @inject('counter')
// @observer
// class Counter extends React.Component {
//   render() {
//     const { counter } = this.props;
//     return (
//       <div>
//         <h1>{counter.number}</h1>
//         <button onClick={counter.increase}>+1</button>
//         <button onClick={counter.decrease}>-1</button>
//       </div>
//     );
//   }
// }

export default Counter;

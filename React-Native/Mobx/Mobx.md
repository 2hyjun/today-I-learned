# MobX

# 4 가지 개념

### 1. Observerble State

`Oberserble State`: 관찰하려는 State.
이 State 가 변화하면 `reaction`과 `computations`가 일어난다.

> Observables allow you to **subscribe** for their changes.

관찰하려는 class property 에 `@observable` decorator 를 붙이면, `observer`가 변화를 추적할 수 있다.
그 값이 변하면, `observer`는 자동으로 업데이트 된다.

### Example

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class Dice extends Component {
    @observable
    value = 1;

    render() {
        return (
            <div style={this.styles.container}>
                <div style={this.styles.result}>Result: {this.value}</div>
                <button onClick={this.handleRoll}>ROLL</button>
            </div>
        );
    }

    handleRoll = () => {
        this.value = Math.floor(Math.random() * 6) + 1;
    };

    styles = {
        container: {
            padding: '16px 0px',
        },
        result: {
            fontSize: 22,
            marginBottom: 10,
        },
    };
}
ReactDOM.render(<Dice />, document.getElementById('dice'));
```

### 2. Compututed Value

`Compututed Value`: Observable State 의 변화에 따른 값.
`observables`에서 파생된 값으로, `observables`가 업데이트되면 자동으로 업데이트된다.

```jsx
@computed get computedValue() {
  return this.value > 3 ? 'WIN' : 'LOOSE'
}

render() {
  return (
    <div style={this.styles.container}>
      <div style={this.styles.result}>Result: {this.value}</div>
      <div style={this.styles.result}>Computed Result: {this.computedValue}</div>
      <button onClick={this.handleRoll}>ROLL</button>
    </div>
  )
}
```

### 3. Reactions

`Reactions`: `Observable State`의 변화에 따른 부가적인 변화.
`computed value`와 비슷하지만 다른점은
새로운 값을 만들어서 리턴하는 대신, `side-effect`를 생산한다. (예: network requests, patching dom)..

`MobX`는 3 가지의 `reaction` 함수를 지원한다. `when`, `autorun` and `reaction`.

#### when

> `when(predicate: () => boolean, effect?: () => void, options?)`

`predicate`, `effect` 두 함수를 받는다. `predicate`는 `boolean`을 리턴하는 함수로, 리턴값이 `true`가 되면 `effect`함수를 실행한다.

```jsx
class MyResource {
    constructor() {
        when(
            // once...
            () => !this.isVisible,
            // ... then
            () => this.dispose(),
        );
    }

    @computed
    get isVisible() {
        // indicate whether this item is visible
    }

    dispose() {
        // dispose
    }
}
```

만약 `when`에 `effect` 함수가 인수로 전달되지 않으면 `when`은 `Promise`를 반환한다.

```js
async function() {
    await when(() => that.isVisible)
    // etc..
}
```

#### autorun

> `autorun(() => void)`

`observed value`가 업데이트 될때 마다 항상 자동으로 실행됨.

```jsx
const age = observable.box(10);

const dispose = autorun(
    () => {
        if (age.get() < 0) throw new Error('Age should not be negative');
        console.log('Age', age.get());
    },
    {
        onError(e) {
            window.alert('Please enter a valid age');
        },
        delay: 300,
    },
);
```

#### reaction

> `reaction(() => data, (data, reaction) => { sideEffect }, options?)`

### 4. Actions

`Actions`: `Observable State`가 사용자가 지정한 것을 포함한 모든 변경사항.
`observable state`가 변경되는 모든 함수에 사용하자. 퍼포먼스 차이 크다!

# Tutorial

https://maksimivanov.com/posts/react-native-mobx-tutorial/
https://hyunseob.github.io/2017/10/07/hello-mobx/

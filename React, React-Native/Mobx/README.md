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

# Mobx & React 최적화

#### 1. observer 사용
> observable 변수를 렌더링하는 **모든 컴포넌트에 observer를 붙이자.**

 MobX에서는 `observer`라는 함수 혹은 데코레이터를, `Observable` 데이터를 렌더하는 **모든 컴포넌트에 **선언하는 걸 추천한다. MobX에서 이를 최적화하기 때문이다.
 
 만약 자식 컴포넌트에서 `Observable` 값을 표시하면서 자식 컴포넌트와 부모 컴포넌트가 동시에 observer를 가지고 있다고 해도, 해당 데이터는 자식 컴포넌트에만 다시 렌더링된다. 그러니까 **정말 필요한 컴포넌트만 반응(렌더)을 하도록 만든다고 한다.**

#### 2. 리스트를 렌더링하는 컴포넌트가 있다면, 해당 컴포넌트에는 리스트 데이터만 props로 넣자.

리스트를 렌더링할때는 특히 신경을 써야한다.

```jsx
@observer
class MyComponent extends Component {
  render() {
    const { todos, user } = this.props;
    return (
      <div>
        {user.name}
        <ul>
          {todos.map((todo) => (
            <TodoView todo={todo} key={todo.id} />
          ))}
        </ul>
      </div>
    );
  }
}
```

다음과 같은 코드는, user.name이 변경되어도 리스트 전체를 다시 렌더링되기 때문에 비효율적이다.
따라서 `{user.name}`과 `<ul> ... </ul>`를 분리하자.

```jsx
@observer class MyComponent extends Component {
    render() {
        const {todos, user} = this.props;
        return (<div>
            {user.name}
            <TodosView todos={todos} />
        </div>)
    }
}

@observer class TodosView extends Component {
    render() {
        const {todos} = this.props;
        return <ul>
            {todos.map(todo => <TodoView todo={todo} key={todo.id} />)}
        </ul>)
    }
}
```
#####실수노트
```jsx
const BasketItemList: React.FunctionComponent<IProps> = ({ items, onTake }) => {
  const itemList = items && items.map(item => (
    <BasketItem item={item} key={item.name} onTake={onTake} />
  ));
  return <div>{itemList}</div>;
}

export default inject(({ market }: { market: MarketStore }) => ({
  items: market.selectedItems,
  total: market.total, // <- 사용되지 않는 Props
  onTake: market.take,  
}))(observer(BasketItemList));
```

BasketItemList는 total props를 받는 데, render하는데 사용되지 않는다.
하지만, **total props가 바뀌면, BasketItemList는 전체가 리렌더링된다.**
따라서 total props는 빼주어야함.

---

#### 3. 세부참조는 최대한 늦게!
> 세부참조(역참조): 특정 객체의 내부의 값을 조회.

```jsx
const itemList = items.map(item => (
    <BasketItem
      name={item.name}
      price={item.price}
      count={item.count}
      key={item.name}
      onTake={onTake}
    />
  ));
```
여기서 `item`의 `name`, `price`, `count`를 조회하는 것이 세부참조이다.
세부참조는 최대한 뒤로 늦추는 것이 좋다.
따라서, 위 처럼 `BasketItem` Component에 props로 전달하기 전에 세부참조를 하여 props를 찢어서 넘기는 것이 아니라,
`item` 객체를 통채로 전달하고 `BasketItem` Component 내에서 세부참조가 이루어져야 바람직하다.

```jsx
const itemList = items.map(item => (
  <BasketItem
    item={item}
    key={item.name}
    onTake={onTake}
  />
));
```
---

#### 4. 함수는 미리 바인딩하고, 파라미터는 내부에서 넣어주기.
컴포넌트에 함수를 전달해줄 때에는 **미리 바인딩을 하는 것**이 좋다.
혹은 파라미터가 유동적이라면, **파라미터를 넣는 작업은 함수를 넣는 컴포넌트가 아니라, 받는 함수에서 이루어져야한다.**

> **예 1)**
예를들어서 다음과 같은 코드는 썩 좋은 코드가 아닙니다.
```jsx
  render() {
    return <MyWidget onClick={() => { alert('hi') }} />
  }
```
그 대신에 이렇게 하는것이 좋습니다.

```jsx
  render() {
    return <MyWidget onClick={this.handleClick} />
  }

  handleClick = () => {
    alert('hi')
  }
```

```jsx
const ShopItemList = ({ onPut }) => {
  const itemList = items.map(item => (
    <ShopItem {...item} key={item.name}
      onPut={() => onPut(item.name, item.price)} // <- NOT GOOD!
    />
  ));
  return <div>{itemList}</div>;
};
```

```jsx
const ShopItemList = ({ onPut }) => {
  const itemList = items.map(item => (
    <ShopItem {...item} key={item.name} onPut={onPut}/> // <- 함수 그대로 전달하고, 
  ));
  return <div>{itemList}</div>;
};

const ShopItem = ({ name, price, onPut }) => {
  return (
    <div
      className="ShopItem"
      onClick={() => onPut(name, price)} // 받아서 사용할 때 파라미터 전달
    > 
      <h4>{name}</h4>
      <div>{price}원</div>
    </div>
  );
};
```

최적화 참고 링크
https://hyunseob.github.io/2017/10/18/mobx-with-react/
https://velog.io/@velopert/MobX-3-%EC%8B%AC%ED%99%94%EC%A0%81%EC%9D%B8-%EC%82%AC%EC%9A%A9-%EB%B0%8F-%EC%B5%9C%EC%A0%81%ED%99%94-%EB%B0%A9%EB%B2%95-tnjltay61n#%EC%9A%B0%EB%A6%AC%EA%B0%80-%EB%A7%8C%EB%93%A0-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%A5%BC-%EA%B0%9C%EC%84%A0%EC%8B%9C%ED%82%A4%EA%B8%B0

# MobX

# 4가지 개념

### 1. Observerble State
`Oberserble State`:  관찰하려는 State. 
이 State가 변화하면 `reaction`과 `computations`가 일어난다.
### 2. Computations
`Computations`:  Observable State의 변화에 따른 값.
이 computation은 필요한 경우에만 업데이트 된다.
### 3. Actions
`Actions`: `Observable State`가 사용자가 지정한 것을 포함한 모든 변경사항.
### 4. Reactions
`Reactions`: `Observable State`의 변화에 따른 부가적인 변화.

import * as React from 'react';
import DevTools from 'mobx-react-devtools';

import Counter from 'components/Counter';
import SuperMarket from 'components/SuperMarket';

class App extends React.Component {
  public render() {
    return (
      <div>
        <Counter />
        <hr />
        <SuperMarket />
        {process.env.NODE_ENV === 'development' && <DevTools />}
      </div>
    );
  }
}

export default App;

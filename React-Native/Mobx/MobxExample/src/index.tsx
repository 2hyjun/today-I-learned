import React from 'react';
import appStore from './store/appStore';

import Main from './containers/Main';

export default class App extends React.Component {
    public render() {
        return <Main store={appStore} />;
    }
}

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';

import Background from '../../components/Background';
import TodoList from '../../components/TodoList';
import { AppStore } from '../../store/appStore';

interface IProps {
    store: AppStore;
}

@observer
export default class Main extends React.Component<IProps> {
    private setColor(r: number, g: number, b: number) {
        this.props.store.backgroundColor.color = { r, g, b };
    }

    public render() {
        const { backgroundColor, todos } = this.props.store;
        const backgroundColorString = backgroundColor.getBackgroundString;
        const complementaryColorString = backgroundColor.complementarayColor;
        const { color } = backgroundColor;
        return (
            <Background backgroundColor={backgroundColorString} color={color} onColorChange={(r, g, b) => this.setColor(r, g, b)}>
                <TodoList list={todos.list} addTodo={todos.addTodo()} />
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
    },
});

import React from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import TodoItemModel from '../../models/TodoItemModel';

import TodoItem from '../TodoItem';

interface IProps {
    list: TodoItemModel[];
    addTodo: (title: string) => void;
    finishItem: (index: number) => void;
    fontColor: string;
}

@observer
export default class TodoList extends React.Component<IProps> {
    @observable
    private _todo = '';

    constructor(props: IProps) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
    }

    private set todo(value: string) {
        this._todo = value;
    }

    private get todo() {
        return this._todo;
    }

    private renderItem({ item, index }: { item: TodoItemModel; index: number }) {
        return <TodoItem onPress={() => this.props.finishItem(index)} title={item.title} finished={item.finished} fontColor={this.props.fontColor} />;
    }

    public render() {
        return (
            <View>
                <FlatList data={this.props.list} extraData={this.props} renderItem={this.renderItem} />;
            </View>
        );
    }
}

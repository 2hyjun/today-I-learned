import { observable, action, computed } from 'mobx';

import TodoItemModel from './TodoItemModel';

export default class TodoListModel {
    @observable
    private _list: TodoItemModel[] = [];

    public get list() {
        return this._list;
    }

    @computed
    public get unfinishedTodoCount() {
        return this._list.filter(todo => !todo.finished).length;
    }

    public addTodo(title: string): void {
        this._list.push(new TodoItemModel(title));
    }
}

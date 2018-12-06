import { observable } from 'mobx';

import TodoListModel from '../models/TodoListModel';
import BackgroundModel from '../models/BackgroundModel';

export class AppStore {
    @observable
    private _todos = new TodoListModel();

    @observable
    private _backgroundColor = new BackgroundModel();

    public get todos() {
        return this._todos;
    }

    public get backgroundColor() {
        return this._backgroundColor;
    }
}

const appStore = new AppStore();

export default appStore;

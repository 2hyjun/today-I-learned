import { observable, computed, action } from 'mobx';

export default class TodoItemModel {
    @observable
    private _title: string;

    @observable
    private _finished: boolean = false;

    constructor(title: string) {
        this._title = title;
    }

    public get title() {
        return this._title;
    }

    public set title(_title: string) {
        this._title = _title;
    }

    public get finished() {
        return this._finished;
    }

    public set finished(_finished: boolean) {
        this._finished = _finished;
    }
}

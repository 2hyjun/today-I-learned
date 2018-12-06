import { observable, action, computed } from 'mobx';

export interface IColor {
    r: number;
    g: number;
    b: number;
}

export default class BackgroundModel {
    @observable
    private _r: number = 255;

    @observable
    private _g: number = 255;

    @observable
    private _b: number = 255;

    @computed
    public get getBackgroundString(): string {
        return `rgb(${this._r}, ${this._g}, ${this._b})`;
    }

    @computed
    public get complementarayColor(): string {
        return `rgb(${255 - this._r}, ${255 - this._g}, ${255 - this._b})`;
    }

    public get color(): IColor {
        return {
            r: this._r,
            g: this._g,
            b: this._b,
        };
    }

    public set color(color: IColor) {
        this._r = color.r;
        this._g = color.g;
        this._b = color.b;
    }
}

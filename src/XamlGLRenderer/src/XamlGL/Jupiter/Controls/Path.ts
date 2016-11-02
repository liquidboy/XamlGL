import { Shape } from "./../Shape";
// import { Thickness } from "./../DataTypes/Thickness";
// import { CornerRadius } from "./../DataTypes/CornerRadius";
// import { HorizontalAlignment } from "./../DataTypes/HorizontalAlignment";
// import { VerticalAlignment } from "./../DataTypes/VerticalAlignment";

export class Path extends Shape {

    private _data: string;
    private _scale: number;
    private _isSmooth: boolean;

    get Data(): string { return this._data; }
    get Scale(): number { return this._scale; }
    get IsSmooth(): boolean { return this._isSmooth; }

    set Data(value: string) { this._data = value; }
    set Scale(value: number) { this._scale = value; }
    set IsSmooth(value: boolean) { this._isSmooth = value; }

    constructor() {
        super();

        this._data = "";
        this._scale = 1;
        this._isSmooth = false;
    }
}
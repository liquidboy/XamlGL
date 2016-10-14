import { Shape } from "./../Jupiter/Shape";
// import { Thickness } from "./../DataTypes/Thickness";
// import { CornerRadius } from "./../DataTypes/CornerRadius";
// import { HorizontalAlignment } from "./../DataTypes/HorizontalAlignment";
// import { VerticalAlignment } from "./../DataTypes/VerticalAlignment";

export class Path extends Shape {

    private _data: string;

    get Data(): string { return this._data; }

    set Data(value: string) { this._data = value; }

    constructor() {
        super();

        this._data = "";
    }
}
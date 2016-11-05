import * as Jupiter from "./../Core";
import { Orientation } from "./../../DataTypes/Orientation";

export class ScrollBar extends Jupiter.View {
    private _orientation: Orientation;
    private _largeChange: number;
    private _maximum: number;
    private _minimum: number;
    private _smallChange: number;
    private _value: number;

    get Orientation(): Orientation { return this._orientation; }
    get LargeChange(): number { return this._largeChange; }
    get Maximum(): number { return this._maximum; }
    get Minimum(): number { return this._minimum; }
    get SmallChange(): number { return this._smallChange; }
    get Value(): number { return this._value; }

    set Orientation(value: Orientation) { this._orientation = value; }
    set LargeChange(value: number) { this._largeChange = value; }
    set Maximum(value: number) { this._maximum = value; }
    set Minimum(value: number) { this._minimum = value; }
    set SmallChange(value: number) { this._smallChange = value; }
    set Value(value: number) { this._value = value; }
}
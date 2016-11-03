import * as Jupiter from "./../Core";
import { Orientation } from "./../../DataTypes/Orientation";

export class TimePicker extends Jupiter.View {
    private _orientation: Orientation;

    get Orientation(): Orientation { return this._orientation; }

    set Orientation(value: Orientation) { this._orientation = value; }
}
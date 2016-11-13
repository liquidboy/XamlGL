import * as Jupiter from "./../Core";
import { Orientation } from "./../../DataTypes/Orientation";
import { EventDispatcher } from "./../../Events/EventDispatcher";
import { IEvent } from "./../../Events/IEvent";
import { IEventArgs } from "./../../Events/IEventArgs";

export class ScrollBar extends Jupiter.View {
    private _orientation: Orientation;
    private _largeChange: number;
    private _maximum: number;
    private _minimum: number;
    private _smallChange: number;
    private _value: number;
    private _valueChanged: EventDispatcher<ScrollBar, IEventArgs> = new EventDispatcher<ScrollBar, IEventArgs>();
    
    get Orientation(): Orientation { return this._orientation; }
    get LargeChange(): number { return this._largeChange; }
    get Maximum(): number { return this._maximum; }
    get Minimum(): number { return this._minimum; }
    get SmallChange(): number { return this._smallChange; }
    get Value(): number { return this._value; }
    public get ValueChanged(): IEvent<ScrollBar, IEventArgs> { return this._valueChanged; }

    set Orientation(value: Orientation) { this._orientation = value; }
    set LargeChange(value: number) { this._largeChange = value; }
    set Maximum(value: number) { this._maximum = value; }
    set Minimum(value: number) { this._minimum = value; }
    set SmallChange(value: number) { this._smallChange = value; }
    set Value(value: number) {
        if (value !== this._value) {
            this._value = value;
            this._valueChanged.dispatch(this, null);
        }
    }
}
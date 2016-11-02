import { Button } from "./Button";
import { IEventArgs } from "./../../Events/IEventArgs";
import { EventDispatcher } from "./../../Events/EventDispatcher";
import { IEvent } from "./../../Events/IEvent";

export class ToggleButton  extends Button {
    private _IsChecked: boolean = false;
    private _IsThreeState: boolean = false;
    private _checked: EventDispatcher<ToggleButton, IEventArgs> = new EventDispatcher<ToggleButton, IEventArgs>();
    private _unchecked: EventDispatcher<ToggleButton, IEventArgs> = new EventDispatcher<ToggleButton, IEventArgs>();
    private _indeterminate: EventDispatcher<ToggleButton, IEventArgs> = new EventDispatcher<ToggleButton, IEventArgs>();

    get IsChecked(): boolean { return this._IsChecked; }
    get IsThreeState(): boolean { return this._IsThreeState; }
    get Checked(): IEvent<ToggleButton, IEventArgs> { return this._checked; }
    get Unchecked(): IEvent<ToggleButton, IEventArgs> { return this._unchecked; }
    get Indeterminate(): IEvent<ToggleButton, IEventArgs> { return this._indeterminate; }

    set IsChecked(value: boolean) { this._IsChecked = value; }
    set IsThreeState(value: boolean) { this._IsThreeState = value; }
}
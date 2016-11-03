import { Button } from "./Button";
import { IEventArgs } from "./../../Events/IEventArgs";
import { EventDispatcher } from "./../../Events/EventDispatcher";
import { IEvent } from "./../../Events/IEvent";

export class ToggleSwitch  extends Button {
    private _IsChecked: boolean = false;
    private _IsThreeState: boolean = false;
    private _checked: EventDispatcher<ToggleSwitch, IEventArgs> = new EventDispatcher<ToggleSwitch, IEventArgs>();
    private _unchecked: EventDispatcher<ToggleSwitch, IEventArgs> = new EventDispatcher<ToggleSwitch, IEventArgs>();
    private _indeterminate: EventDispatcher<ToggleSwitch, IEventArgs> = new EventDispatcher<ToggleSwitch, IEventArgs>();

    get IsChecked(): boolean { return this._IsChecked; }
    get IsThreeState(): boolean { return this._IsThreeState; }
    get Checked(): IEvent<ToggleSwitch, IEventArgs> { return this._checked; }
    get Unchecked(): IEvent<ToggleSwitch, IEventArgs> { return this._unchecked; }
    get Indeterminate(): IEvent<ToggleSwitch, IEventArgs> { return this._indeterminate; }

    set IsChecked(value: boolean) { this._IsChecked = value; }
    set IsThreeState(value: boolean) { this._IsThreeState = value; }
}
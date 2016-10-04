import { UserControl } from "./UserControl";
import { IFrameworkElement } from "./IFrameworkElement";
import { IEventArgs } from "./../Events/IEventArgs";
import { EventDispatcher } from "./../Events/EventDispatcher";
import { IEvent } from "./../Events/IEvent";

export class Page extends UserControl {
    private _content: IFrameworkElement;
    private _contentChanged: EventDispatcher<IFrameworkElement, IEventArgs> = new EventDispatcher<IFrameworkElement, IEventArgs>();

    get Content(): IFrameworkElement { return this._content; }
    get ContentChanged(): IEvent<IFrameworkElement, IEventArgs> { return this._contentChanged; }

    set Content(value: IFrameworkElement) {
        this._content = value; this._contentChanged.dispatch(this, null);
    }

}
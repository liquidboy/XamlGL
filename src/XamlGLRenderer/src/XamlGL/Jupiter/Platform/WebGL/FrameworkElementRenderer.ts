import { IFrameworkElementRenderer, VisualElementChangedEventArgs } from "./../IFrameworkElementRenderer";
import { FrameworkElement } from "./../../FrameworkElement";
// import { EventList } from "./../../../Events/EventList";
import { IEvent } from "./../../../Events/IEvent";
import { EventDispatcher } from "./../../../Events/EventDispatcher";
// import { IEventArgs } from "./../../../Events/IEventArgs";

export class FrameworkElementRenderer implements IFrameworkElementRenderer {

    private _elementChanged: EventDispatcher<FrameworkElementRenderer, VisualElementChangedEventArgs> =
    new EventDispatcher<FrameworkElementRenderer, VisualElementChangedEventArgs>();
    private _element: FrameworkElement;

    get ElementChanged(): IEvent<FrameworkElementRenderer, VisualElementChangedEventArgs> { return this._elementChanged; }
    get Element(): FrameworkElement { return this._element; };

    set Element(value: FrameworkElement) {
        this._element = value;

        // 1. instantiate packager
        // 2. package.load

    };
}
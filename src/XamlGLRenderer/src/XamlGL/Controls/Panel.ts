import { FrameworkElement } from "./../Jupiter/FrameworkElement";
import { UIElementCollection } from "./../Jupiter/UIElementCollection";
import { IEventArgs } from "./../Events/IEventArgs";
import { EventDispatcher } from "./../Events/EventDispatcher";
import { IEvent } from "./../Events/IEvent";

export class Panel extends FrameworkElement {
    private _children: UIElementCollection;
    private _background: string;
    private _childAdded: EventDispatcher<FrameworkElement, IEventArgs> = new EventDispatcher<FrameworkElement, IEventArgs>();
    private _childRemoved: EventDispatcher<FrameworkElement, IEventArgs> = new EventDispatcher<FrameworkElement, IEventArgs>();

    get Children(): UIElementCollection { return this._children; }
    get Background(): string { return this._background; }
    get ChildAdded(): IEvent<FrameworkElement, IEventArgs> { return this._childAdded; }
    get ChildRemoved(): IEvent<FrameworkElement, IEventArgs> { return this._childRemoved; }

    set Children(value: UIElementCollection) { this._children = value; }
    set Background(value: string) { this._background = value; }

    constructor() {
        super();
        this._children = new UIElementCollection();
    }
}
import { UIElement } from "./UIElement";
import { IFrameworkElement } from "./IFrameworkElement";
import { IControlRenderer } from "./Platform/IControlRenderer";
import { IEventArgs } from "./../Events/IEventArgs";
import { EventDispatcher } from "./../Events/EventDispatcher";
import { IEvent } from "./../Events/IEvent";

export class FrameworkElement extends UIElement implements IFrameworkElement {
    private _width: number;
    private _height: number;
    private _renderer: IControlRenderer;

    // private _childAdded: EventDispatcher<FrameworkElement, IEventArgs> = new EventDispatcher<FrameworkElement, IEventArgs>();
    // private _childRemoved: EventDispatcher<FrameworkElement, IEventArgs> = new EventDispatcher<FrameworkElement, IEventArgs>();
    private _propertyChanged: EventDispatcher<FrameworkElement, IEventArgs> = new EventDispatcher<FrameworkElement, IEventArgs>();
    private _focusChanged: EventDispatcher<FrameworkElement, IEventArgs> = new EventDispatcher<FrameworkElement, IEventArgs>();

    get Width(): number { return this._width; }
    get Height(): number { return this._height; }
    get Renderer(): IControlRenderer { return this._renderer; }

    set Width(value: number) { this._width = value; }
    set Height(value: number) { this._height = value; }
    set Renderer(value: IControlRenderer) { this._renderer = value; }

    // get ChildAdded(): IEvent<FrameworkElement, IEventArgs> { return this._childAdded; }
    // get ChildRemoved(): IEvent<FrameworkElement, IEventArgs> { return this._childRemoved; }
    get PropertyChanged(): IEvent<FrameworkElement, IEventArgs> { return this._propertyChanged; }
    get FocusChanged(): IEvent<FrameworkElement, IEventArgs> { return this._focusChanged; }
}

// in xamarin.forms this is "VisualElement" (thou it can be confusing because Xamarin also introduced a 
// "View" that is higher than VE and is what sits behind a UI control 
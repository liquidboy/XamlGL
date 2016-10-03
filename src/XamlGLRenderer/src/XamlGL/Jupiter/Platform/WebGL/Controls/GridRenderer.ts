import { IControlRenderer } from "./../../IControlRenderer";
import { Renderer } from "./../Renderer";
import { IFrameworkElementRenderer, VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
import { FrameworkElement } from "./../../../FrameworkElement";
import { IEventArgs } from "./../../../../Events/IEventArgs";
import { IEvent } from "./../../../../Events/IEvent";
import { EventDispatcher } from "./../../../../Events/EventDispatcher";

export class GridRenderer implements IControlRenderer {
    private _godRenderer: Renderer;
    private _element: FrameworkElement;
    private _elementChanged: EventDispatcher<GridRenderer, VisualElementChangedEventArgs> =
    new EventDispatcher<GridRenderer, VisualElementChangedEventArgs>();

    get GodRenderer(): Renderer { return this._godRenderer; }
    get Element(): FrameworkElement { return this._element; }
    get ElementChanged(): IEvent<GridRenderer, VisualElementChangedEventArgs> { return this._elementChanged; }

    set GodRenderer(value: Renderer) { this._godRenderer = value; }
    set Element(value: FrameworkElement) { this._element = value; }
}
﻿import { IControlRenderer } from "./../../IControlRenderer";
import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
import { FrameworkElement } from "./../../../FrameworkElement";
import { IEventArgs } from "./../../../../Events/IEventArgs";
import { IEvent } from "./../../../../Events/IEvent";
import { EventDispatcher } from "./../../../../Events/EventDispatcher";

export class BaseRenderer implements IControlRenderer {
    private _godRenderer: Renderer;
    private _element: FrameworkElement;
    private _elementChanged: EventDispatcher<BaseRenderer, IEventArgs> =
    new EventDispatcher<BaseRenderer, IEventArgs>();

    get GodRenderer(): Renderer { return this._godRenderer; }
    get Element(): FrameworkElement { return this._element; }
    get ElementChanged(): IEvent<BaseRenderer, IEventArgs> { return this._elementChanged; }

    set GodRenderer(value: Renderer) { this._godRenderer = value; }
    set Element(value: FrameworkElement) {
        this._element = value;
        // 1. set FrameworkElement propertychanged/focuschanged
        // 2. instantiate packager and do a Load
        //      ->  renderer.Element.ChildAdded
        //      ->  renderer.Element.ChildRemoved
        // 3. call OnElementChanged

    }
}
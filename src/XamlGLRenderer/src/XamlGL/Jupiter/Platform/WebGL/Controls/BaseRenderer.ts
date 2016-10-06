import { IControlRenderer } from "./../../IControlRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
import { FrameworkElement } from "./../../../FrameworkElement";
import { Panel } from "./../../../../Controls/Panel";
import { IEventArgs } from "./../../../../Events/IEventArgs";
import { IEvent } from "./../../../../Events/IEvent";
import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
// import { Page } from "./../../../Page";

export class BaseRenderer implements IControlRenderer {

    // this is equvalent to the IVisualElementRenderer in xamarin, question is should
    // i introduce a clear separation between FrameworkElement & VisualElement or keep it
    // all in FrameworkElement (which is what im doing right now)
    // moto : keep it simple till you need the complexity

    private _element: FrameworkElement;
    private _elementChanged: EventDispatcher<BaseRenderer, IEventArgs> =
    new EventDispatcher<BaseRenderer, IEventArgs>();

    get Element(): FrameworkElement { return this._element; }
    get ElementChanged(): IEvent<BaseRenderer, IEventArgs> { return this._elementChanged; }
    get ParentWidth(): number {
        // if !(this._element.Parent instanceof Panel) {  }
        if (this._element.Parent !== null) {
            return this._element.Parent.Width === 0 ? this._element.Parent.CalculatedWidth : this._element.Parent.Width;
        }
        return null;
    }
    get ParentHeight(): number {
        if (this._element.Parent !== null) {
            return this._element.Parent.Height === 0 ? this._element.Parent.CalculatedHeight: this._element.Parent.Height;
        }
        return null;
    }

    set Element(value: FrameworkElement) {
        this._element = value;
        this._element.Renderer = this;  // <-- HELP : this leads to a circular reference due to above lines reference

        // 1. set FrameworkElement propertychanged/focuschanged (VERenderer.SetElement)
        this._element.PropertyChanged.subscribe(this.OnPropertyChanged);
        this._element.FocusChanged.subscribe(this.OnFocusChanged);

        // 2. instantiate packager and do a Load
        //      ->  renderer.Element.ChildAdded
        //      ->  renderer.Element.ChildRemoved
        if (value instanceof Panel) {
            ConsoleHelper.Log("BaseRenderer.Element : value was a panel");
            let castPanel: Panel = <Panel>this._element;
            castPanel.ChildAdded.subscribe(this.OnChildAdded);
            castPanel.ChildRemoved.subscribe(this.OnChildRemoved);
        } else {
            ConsoleHelper.Log("BaseRenderer.Element : value was a native element");
        }

        // 3. call OnElementChanged


        //

    }

    private OnPropertyChanged(): void {
        // todo
        ConsoleHelper.Log("Platform.OnPropertyChanged");
    }
    private OnFocusChanged(): void {
        // todo
        ConsoleHelper.Log("Platform.OnFocusChanged");
    }
    private OnChildAdded(): void {
        // todo
        ConsoleHelper.Log("Platform.OnChildAdded");
    }
    private OnChildRemoved(): void {
        // todo
        ConsoleHelper.Log("Platform.OnChildRemoved");
    }

    Draw(): void {
        // consoleHelper.Log("BaseRenderer.Draw");
    }
}
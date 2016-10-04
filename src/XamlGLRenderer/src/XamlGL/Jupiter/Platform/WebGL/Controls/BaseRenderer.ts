import { IControlRenderer } from "./../../IControlRenderer";
import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
import { FrameworkElement } from "./../../../FrameworkElement";
import { Panel } from "./../../../../Controls/Panel";
import { IEventArgs } from "./../../../../Events/IEventArgs";
import { IEvent } from "./../../../../Events/IEvent";
import { EventDispatcher } from "./../../../../Events/EventDispatcher";

export class BaseRenderer implements IControlRenderer {

    // this is equvalent to the IVisualElementRenderer in xamarin, question is should
    // I introduce a clear separation between FrameworkElement & VisualElement or keep it
    // all in FrameworkElement (which is what im doing right now)
    // moto : keep it simple till you need the complexity

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
        // 1. set FrameworkElement propertychanged/focuschanged (VERenderer.SetElement)
        this._element.PropertyChanged.subscribe(this.OnPropertyChanged);
        this._element.FocusChanged.subscribe(this.OnFocusChanged);
        
        // 2. instantiate packager and do a Load
        //      ->  renderer.Element.ChildAdded
        //      ->  renderer.Element.ChildRemoved
        if (value instanceof Panel) {
            console.log("BaseRenderer.Element : value was a panel");
            let castPanel = <Panel>this._element;
            castPanel.ChildAdded.subscribe(this.OnChildAdded);
            castPanel.ChildRemoved.subscribe(this.OnChildRemoved);
        }

        // 3. call OnElementChanged
    }
    
    private OnPropertyChanged(): void {
        // todo
        console.log("Platform.OnPropertyChanged");
    }
    private OnFocusChanged(): void {
        // todo
        console.log("Platform.OnFocusChanged");
    }
    private OnChildAdded(): void {
        // todo
        console.log("Platform.OnChildAdded");
    }
    private OnChildRemoved(): void {
        // todo
        console.log("Platform.OnChildRemoved");
    }

}
import { UIElement } from "./UIElement";
import { IFrameworkElement } from "./IFrameworkElement";
import { IControlRenderer } from "./Platform/IControlRenderer";
import { IEventArgs } from "./../Events/IEventArgs";
import { EventDispatcher } from "./../Events/EventDispatcher";
import { IEvent } from "./../Events/IEvent";
import { Thickness } from "./../DataTypes/Thickness";
import { HorizontalAlignment } from "./../DataTypes/HorizontalAlignment";
import { VerticalAlignment } from "./../DataTypes/VerticalAlignment";
import { DockPosition } from "./../DataTypes/DockPosition";

export class FrameworkElement extends UIElement implements IFrameworkElement {
    private _width: number;
    private _height: number;
    private _margin: Thickness;
    private _renderer: IControlRenderer;
    private _horizontalAlignment: HorizontalAlignment;
    private _verticalAlignment: VerticalAlignment;
    private _parent: FrameworkElement;
    private _calculatedX: number; // <- normally updated from a *renderer
    private _calculatedY: number; // <- normally updated from a *renderer
    private _calculatedWidth: number; // <- normally updated from a *renderer
    private _calculatedHeight: number; // <- normally updated from a *renderer
    private _blurAmount: number;
    private _hasToolTip: boolean = false;
    private _tooltipDockPosition: DockPosition = DockPosition.Top;

    // private _childAdded: EventDispatcher<FrameworkElement, IEventArgs> = new EventDispatcher<FrameworkElement, IEventArgs>();
    // private _childRemoved: EventDispatcher<FrameworkElement, IEventArgs> = new EventDispatcher<FrameworkElement, IEventArgs>();
    private _propertyChanged: EventDispatcher<FrameworkElement, IEventArgs> = new EventDispatcher<FrameworkElement, IEventArgs>();
    private _focusChanged: EventDispatcher<FrameworkElement, IEventArgs> = new EventDispatcher<FrameworkElement, IEventArgs>();

    get Width(): number { return this._width; }
    get Height(): number { return this._height; }
    get Margin(): Thickness { return this._margin; }
    get Renderer(): IControlRenderer { return this._renderer; }
    get HorizontalAlignment(): HorizontalAlignment { return this._horizontalAlignment; }
    get VerticalAlignment(): VerticalAlignment { return this._verticalAlignment; }
    get Parent(): FrameworkElement { return this._parent; }
    get CalculatedX(): number { return this._calculatedX; }
    get CalculatedY(): number { return this._calculatedY; }
    get CalculatedWidth(): number { return this._calculatedWidth; }
    get CalculatedHeight(): number { return this._calculatedHeight; }
    get BlurAmount(): number { return this._blurAmount; }
    get HasToolTip(): boolean { return this._hasToolTip; }
    get TooltipDockPosition(): DockPosition { return this._tooltipDockPosition; }

    set Width(value: number) { this._width = value; }
    set Height(value: number) { this._height = value; }
    set Margin(value: Thickness) { this._margin = value; }
    set Renderer(value: IControlRenderer) { this._renderer = value; }
    set HorizontalAlignment(value: HorizontalAlignment) { this._horizontalAlignment = value; }
    set VerticalAlignment(value: VerticalAlignment) { this._verticalAlignment = value; }
    set Parent(value: FrameworkElement) { this._parent = value; }
    set CalculatedX(value: number) { this._calculatedX = value; }
    set CalculatedY(value: number) { this._calculatedY = value; }
    set CalculatedWidth(value: number) { this._calculatedWidth = value; }
    set CalculatedHeight(value: number) { this._calculatedHeight = value; }
    set BlurAmount(value: number) { this._blurAmount = value; }
    set HasToolTip(value: boolean) { this._hasToolTip = value; }
    set TooltipDockPosition(value: DockPosition) { this._tooltipDockPosition = value; }

    // get ChildAdded(): IEvent<FrameworkElement, IEventArgs> { return this._childAdded; }
    // get ChildRemoved(): IEvent<FrameworkElement, IEventArgs> { return this._childRemoved; }
    get PropertyChanged(): IEvent<FrameworkElement, IEventArgs> { return this._propertyChanged; }
    get FocusChanged(): IEvent<FrameworkElement, IEventArgs> { return this._focusChanged; }
}

// in xamarin.forms this is "VisualElement" (thou it can be confusing because Xamarin also introduced a 
// "View" that is higher than VE and is what sits behind a UI control 
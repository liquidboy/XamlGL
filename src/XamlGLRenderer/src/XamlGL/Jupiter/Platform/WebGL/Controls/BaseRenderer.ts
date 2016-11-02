import { IControlRenderer } from "./../../IControlRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
import { FrameworkElement } from "./../../../FrameworkElement";
import { IFrameworkElement } from "./../../../IFrameworkElement";
import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";
import { Point } from "./../../../../DataTypes/Point";
import { DockPosition } from "./../../../../DataTypes/DockPosition";
import { Panel } from "./../../../Controls/Panel";
import { IRenderer } from "./../../IRenderer";
import { IEventArgs } from "./../../../../Events/IEventArgs";
import { IEvent } from "./../../../../Events/IEvent";
import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
// import { Page } from "./../../../Page";
import { StackPanel } from "./../../../Controls/StackPanel";
import { Orientation } from "./../../../../DataTypes/Orientation";
import { ToolTip } from "./../../../Controls/ToolTip";
import { RendererHelper } from "./../../../../utils/RendererHelper";

export class BaseRenderer implements IControlRenderer {

    // this is equvalent to the IVisualElementRenderer in xamarin, question is should
    // i introduce a clear separation between FrameworkElement & VisualElement or keep it
    // all in FrameworkElement (which is what im doing right now)
    // moto : keep it simple till you need the complexity
    private _tooltip: ToolTip = null;
    private _element: FrameworkElement;
    private _elementChanged: EventDispatcher<BaseRenderer, IEventArgs> =
    new EventDispatcher<BaseRenderer, IEventArgs>();
    private _pixiElement: PIXI.DisplayObject;
    private _pixiElementMask = new PIXI.Graphics();
    private _scale: number = 1;

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
    get PixiElement(): PIXI.DisplayObject { return this._pixiElement; }
    get PixiElementMask(): PIXI.Graphics { return this._pixiElementMask; }
    get Scale(): number { return this._scale; }

    set Element(value: FrameworkElement) {

        // clear
        if (value === null && this._element instanceof Panel) {
            let castPanel: Panel = <Panel>this._element;
            castPanel.ChildAdded.unsubscribe(this.OnChildAdded);
            castPanel.ChildRemoved.unsubscribe(this.OnChildRemoved);

            this._element.Renderer = null;
            this._element.PropertyChanged.unsubscribe(this.OnPropertyChanged);
            this._element.FocusChanged.unsubscribe(this.OnFocusChanged);
            this._element = null;

            return;
        }

        // set
        this._element = value;
        this._element.Renderer = this;  // <-- HELP : this leads to a circular reference due to above lines reference

        // 1. set FrameworkElement propertychanged/focuschanged (VERenderer.SetElement)
        this._element.PropertyChanged.subscribe(this.OnPropertyChanged);
        this._element.FocusChanged.subscribe(this.OnFocusChanged);

        // 2. instantiate packager and do a Load
        //      ->  renderer.Element.ChildAdded
        //      ->  renderer.Element.ChildRemoved
        if (value instanceof Panel) {
            // consoleHelper.Log("BaseRenderer.Element : value was a panel");
            let castPanel: Panel = <Panel>this._element;
            castPanel.ChildAdded.subscribe(this.OnChildAdded);
            castPanel.ChildRemoved.subscribe(this.OnChildRemoved);
        } else {
            // consoleHelper.Log("BaseRenderer.Element : value was a native element");
        }

        // 3. call OnElementChanged


        //

    }
    set PixiElement(value: PIXI.DisplayObject) { this._pixiElement = value; }
    set PixiElementMask(value: PIXI.Graphics) { this._pixiElementMask = value; }
    set Scale(value: number) { this._scale = value; }

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
    InitializeResources(): void {
        // todo : fill 
    }
    Draw(r: IRenderer, args: IEventArgs): void {
        // consoleHelper.Log("BaseRenderer.Draw");
    }
    RefreshUI(): void {
        // todo : fill with actual pixi draw stuff that is idempotent
    }
    Clear(): void {
        // todo : fill
    }
    public IsBeingHitWithPointer(r: IRenderer, args: IEventArgs): void {
        RendererHelper.SetCursorToPointer(r);
    }
    public IsNotBeingHitWithPointer(r: IRenderer, args: IEventArgs): void {
        RendererHelper.SetCursorToAuto(r);
    }
    public CalculateYHeight(backingControl: IFrameworkElement): void {
        if (backingControl.Height !== null && backingControl.Height > 0) {
            this.Element.CalculatedHeight = backingControl.Height;
            if (backingControl.VerticalAlignment === VerticalAlignment.Bottom) {
                this.Element.CalculatedY = this.ParentHeight - backingControl.Height;
            } else if (backingControl.VerticalAlignment === VerticalAlignment.Center) {
                this.Element.CalculatedY = (this.Element.Parent.CalculatedHeight - backingControl.Height) / 2;
            } else if (backingControl.VerticalAlignment === VerticalAlignment.Stretch) {
                this.Element.CalculatedHeight = this.ParentHeight;
                this.Element.CalculatedY = 0;
            } else if (backingControl.VerticalAlignment === VerticalAlignment.Top) {
                this.Element.CalculatedY = 0;
            }
        } else {
            if (backingControl.VerticalAlignment === VerticalAlignment.Stretch) {
                this.Element.CalculatedHeight = this.ParentHeight;
                this.Element.CalculatedY = 0;
            } else if (backingControl.VerticalAlignment === VerticalAlignment.Top) {
                this.Element.CalculatedY = 0;
            }
        }
    }

    public CalculateXWidth(backingControl: IFrameworkElement): void {
       if (backingControl.Width !== null && backingControl.Width > 0) {
           this.Element.CalculatedWidth = backingControl.Width;
           this.Element.CalculatedX = 0;
           if (backingControl.HorizontalAlignment === HorizontalAlignment.Left) {
               this.Element.CalculatedX = 0;
           } else if (backingControl.HorizontalAlignment === HorizontalAlignment.Right) {
               this.Element.CalculatedX = this.ParentWidth - backingControl.Width;
            } else if (backingControl.HorizontalAlignment === HorizontalAlignment.Stretch) {
               this.Element.CalculatedWidth = this.ParentWidth;
               this.Element.CalculatedX = this.ParentWidth - backingControl.Width;
            } else if (backingControl.HorizontalAlignment === HorizontalAlignment.Center) {
               this.Element.CalculatedX = (this.Element.Parent.CalculatedWidth - backingControl.Width) / 2;
            }
        } else {
           if (backingControl.HorizontalAlignment === HorizontalAlignment.Stretch) {
               this.Element.CalculatedWidth = this.ParentWidth;
               this.Element.CalculatedX = 0;
           } else if (backingControl.HorizontalAlignment === HorizontalAlignment.Left) {
               this.Element.CalculatedX = 0;
           }
        }
    }

    public UpdateCalculatedValuesUsingMargin(backingControl: IFrameworkElement): void {
       if (backingControl.Margin !== null || backingControl.Margin !== undefined) {
           if (backingControl.HorizontalAlignment === HorizontalAlignment.Left) {
               this.Element.CalculatedX += this.Element.Margin.Left;
           } else if (backingControl.HorizontalAlignment === HorizontalAlignment.Right) {
               this.Element.CalculatedX -= this.Element.Margin.Right;
           } else if (backingControl.HorizontalAlignment === HorizontalAlignment.Stretch) {
               this.Element.CalculatedX += this.Element.Margin.Left;
               this.Element.CalculatedWidth -= (this.Element.Margin.Right + this.Element.Margin.Left);
           } else if (backingControl.HorizontalAlignment === HorizontalAlignment.Center) {
               this.Element.CalculatedX += this.Element.Margin.Left;
               this.Element.CalculatedWidth -= (this.Element.Margin.Right + this.Element.Margin.Left);
           }

           if (backingControl.VerticalAlignment === VerticalAlignment.Top) {
               this.Element.CalculatedY += this.Element.Margin.Top;
           } else if (backingControl.VerticalAlignment === VerticalAlignment.Bottom) {
               this.Element.CalculatedY -= this.Element.Margin.Bottom;
           } else if (backingControl.VerticalAlignment === VerticalAlignment.Stretch) {
               this.Element.CalculatedY += this.Element.Margin.Top;
               this.Element.CalculatedHeight -= (this.Element.Margin.Top + this.Element.Margin.Bottom);
           } else if (backingControl.VerticalAlignment === VerticalAlignment.Center) {
               this.Element.CalculatedY += this.Element.Margin.Top;
           }
       }
    }

    public GetAllParentMarginTops(ctl: FrameworkElement): number {
        let runningTop: number = ctl.Margin.Top;
        if (ctl instanceof Panel) {
            runningTop += this.GetAllParentMarginTops(ctl.Parent);
        }
        return runningTop;
    }


    public CalculateCurrentAvailableSlot(): Point {
        // determine starting SLOT if the parent is a PANEL that lays out its children
        let parentXStart: number = 0;
        let parentYStart: number = 0;
        if (this.Element.Parent instanceof StackPanel) {
            let sp: StackPanel = <StackPanel>this.Element.Parent;
            if (sp.Orientation === Orientation.Horizontal) {
                parentXStart += sp.CurrentItemRenderXY;
            } else {
                parentYStart += sp.CurrentItemRenderXY;
            }
        }
        return new Point(parentXStart, parentYStart);
    }

    public IncrementNextAvailableSlot(): void {
        // tell the parent stackpanel the next available slot
        if (this.Element.Parent instanceof StackPanel) {
            let sp: StackPanel = <StackPanel>this.Element.Parent;
            if (sp.Orientation === Orientation.Horizontal) {
                sp.CurrentItemRenderXY += this.Element.CalculatedWidth
                    + ((this.Element.Margin === undefined) ? 0 : (this.Element.Margin.Right + this.Element.Margin.Left));
            } else {
                sp.CurrentItemRenderXY += this.Element.CalculatedHeight
                    + ((this.Element.Margin === undefined) ? 0 : (this.Element.Margin.Top + this.Element.Margin.Bottom));
            }
        }
    }

    public GeneralShowTooltip(position: DockPosition, backgroundColor: string, borderColor: string, x: number, y: number, width: number,
        height: number): void {
        if (this._tooltip === null) {
            this._tooltip = new ToolTip();
        }
        let buttonParent: Panel = <Panel>this.Element.Parent;
        this._tooltip.ShowToolTip(x, y, width, height, position);
        this._tooltip.TooltipBackground = backgroundColor;
        this._tooltip.TooltipBorder = borderColor;
        if (this.Element.Parent instanceof Panel) {
            buttonParent.Platform.SetCurrent(this._tooltip, buttonParent);
            buttonParent.Platform.LoadDynamicControl(this._tooltip);
        }
    }

    public GeneralHideTooltip(): void {
        if (this._tooltip !== null || this._tooltip !== undefined) {
            let buttonParent: Panel = <Panel>this.Element.Parent;
            this._tooltip.Renderer.Clear();
            buttonParent.Platform.UnsetCurrent(this._tooltip, buttonParent);
            // parentContainer.removeChild(this._tooltip);
            this._tooltip = null;
        }
    }
}
import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { ScrollBar } from "./../../../Controls/ScrollBar";
// import { StackPanel } from "./../../../../Controls/StackPanel";
// import { RendererHelper } from "./../../../../utils/RendererHelper";
// import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
// import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";
import { Orientation } from "./../../../../DataTypes/Orientation";
// import { Point } from "./../../../../DataTypes/Point";
// import { TextWrapping } from "./../../../../DataTypes/TextWrapping";
// import { TextWrappingAlign } from "./../../../../DataTypes/TextWrappingAlign";
import { IRenderer } from "./../../IRenderer";
import { IEventArgs } from "./../../../../Events/IEventArgs";
import { RendererHelper } from "./../../../../utils/RendererHelper";

export class ScrollBarRenderer extends BaseRenderer implements IControlRenderer {
    private _pixiElementTrack: PIXI.Graphics;
    private _pixiElementThumb: PIXI.Graphics;
    private _peThumb: PIXI.Graphics;
    private _scrollBarEl: ScrollBar;
    private _thumbPressed: boolean = false;
    Draw(r: IRenderer, args: IEventArgs): void {
        super.Draw(r, args);

        if (!this.Element.IsDirty || !this._thumbPressed) {
            return;
        }
        //if (r.Pointer.hitTestSprite(this.PixiElement)) {  // no need to check for this as we are using thumbpressed state
            console.log(this._scrollBarEl.Name);
            let newX: number = r.Pointer.x;
            let newY: number = r.Pointer.y;
        
            this._peThumb.y = 0;
            this._peThumb.x = 0;

            if (this._scrollBarEl.Orientation === Orientation.Horizontal) {
                if (newX <= this.PixiElement.parent.x + (this._peThumb.width / 2)) {
                    this._peThumb.x = 0;                    
                } else if (newX >= (this.PixiElement.parent.x + this._scrollBarEl.CalculatedWidth - this._peThumb.width)) {
                    this._peThumb.x = this._scrollBarEl.CalculatedWidth - this._peThumb.width;
                } else {
                    this._peThumb.x = newX - this.PixiElement.parent.x - (this._peThumb.width / 2);
                }
            } else if (this._scrollBarEl.Orientation === Orientation.Vertical) {
                if (newY <= this.PixiElement.parent.y + (this._peThumb.height / 2)) {
                    this._peThumb.y = 0;
                } else if (newY >= (this.PixiElement.parent.y + this._scrollBarEl.CalculatedHeight - this._peThumb.height)) {
                    this._peThumb.y = this._scrollBarEl.CalculatedHeight - this._peThumb.height;
                } else {
                    this._peThumb.y = newY - this.PixiElement.parent.y - (this._peThumb.height / 2);
                }
            }
        //}



        // this.Element.IsDirty = false;
    }
    InitializeResources(): void {
        super.InitializeResources();
        ConsoleHelper.Log("ScrollBarRenderer.InitializeResources");

        this._scrollBarEl = <ScrollBar>this.Element;
        if (this.PixiElement === undefined) {
            this.PixiElement = new PIXI.Container();
            this._pixiElementTrack = new PIXI.Graphics();
            this._pixiElementThumb = new PIXI.Graphics();
        }

        let parentContainer: PIXI.Container = <PIXI.Container>super.Element.Parent.Renderer.PixiElement;

        // this.PixiElement = text;

        // calculate y position
        this.CalculateYHeight(this._scrollBarEl);

        // calculate X position
        this.CalculateXWidth(this._scrollBarEl);

        // take margin into account
        this.UpdateCalculatedValuesUsingMargin(this._scrollBarEl);

        // size container
        (<PIXI.Container>this.PixiElement).height = this.Element.CalculatedHeight;
        (<PIXI.Container>this.PixiElement).width = this.Element.CalculatedWidth;

        // determine starting SLOT if the parent is a PANEL that lays out its children
        // let parentXYStart: Point = this.CalculateCurrentAvailableSlot();

        if (this._scrollBarEl.Orientation === Orientation.Horizontal) {

            // track
            this._pixiElementTrack.beginFill(RendererHelper.HashToColorNumber("#FFFFFFFF"), 0.4);
            this._pixiElementTrack.drawRect(0, 0, this._scrollBarEl.CalculatedWidth, this._scrollBarEl.CalculatedHeight);
            this._pixiElementTrack.endFill();

            // thumb
            this._pixiElementThumb.beginFill(RendererHelper.HashToColorNumber("#FFFFFFFF"), 0.9);
            this._peThumb = this._pixiElementThumb.drawRect(0, 0, 20, this._scrollBarEl.CalculatedHeight);
            this._pixiElementThumb.endFill();
        } else {
            // track
            this._pixiElementTrack.beginFill(RendererHelper.HashToColorNumber("#FFFFFFFF"), 0.4);
            this._pixiElementTrack.drawRect(0, 0, this._scrollBarEl.CalculatedWidth, this._scrollBarEl.CalculatedHeight);
            this._pixiElementTrack.endFill();

            // thumb
            this._pixiElementThumb.beginFill(RendererHelper.HashToColorNumber("#FFFFFFFF"), 0.9);
            this._peThumb = this._pixiElementThumb.drawRect(0, 0, this._scrollBarEl.CalculatedWidth, 20);
            this._pixiElementThumb.endFill();
        }

        // tell the parent stackpanel the next available slot
        this.IncrementNextAvailableSlot();



        // now render in container
        let cont: PIXI.Container = <PIXI.Container>this.PixiElement;
        cont.addChild(this._pixiElementTrack);
        cont.addChild(this._pixiElementThumb);


        // render on stage
        if (this.Element.Parent.Renderer === undefined) { // root panel (top of visual tree)
            this.Element.Platform.Renderer.PixiStage.addChild(this.PixiElement);
        } else {
            if (this.Element.Parent.Renderer.PixiElement && this.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                parentContainer = <PIXI.Container>this.Element.Parent.Renderer.PixiElement;
                parentContainer.addChild(this.PixiElement);
            }
        }


        this.Element.Platform.Renderer.Draw.subscribe(this.Draw.bind(this));
        this.Element.Platform.Renderer.PointerPressed.subscribe((r: IRenderer, args: IEventArgs) => {
            if (r.Pointer.hitTestSprite(this._pixiElementThumb)) {
                this._thumbPressed = true;
                //this.Element.IsDirty = true;
                RendererHelper.TinkInstance.makeDraggable(this._peThumb);
            }
        });
        this.Element.Platform.Renderer.PointerReleased.subscribe((r: IRenderer, args: IEventArgs) => {
            if (this._thumbPressed) {
                if (r.Pointer.hitTestSprite(this._pixiElementTrack)) {
                    // console.log(this.PixiElement.parent.x);
                    // this._peThumb.moveTo(, 0);
                    // this._peThumb.x = r.Pointer.x - this.PixiElement.parent.x; // - (this._scrollBarEl.Width / 2);
                    RendererHelper.TinkInstance.makeUndraggable(this._peThumb);
                }
            }
            this._thumbPressed = false;
            //this.Element.IsDirty = false;
        });


    }
    RefreshUI(): void {
        // todo : fill with actual pixi draw stuff that is idempotent
    }
    Clear(): void {
        ConsoleHelper.Log("ScrollBarRenderer.Clear");

        let containerMain: PIXI.Container = null;
        let pc: PIXI.Container =  <PIXI.Container>this.Element.Parent.Renderer.PixiElement;

        if (this.PixiElement !== undefined) {
            containerMain = <PIXI.Container>this.PixiElement;
            // this.Element.Platform.Renderer.PixiStage.removeChild(containerMain);
            pc.removeChild(this.PixiElement);
            this.PixiElement = null;
        }
    }
}
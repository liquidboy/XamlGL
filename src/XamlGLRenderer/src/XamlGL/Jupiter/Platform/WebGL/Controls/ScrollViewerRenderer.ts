﻿import { IControlRenderer } from "./../../IControlRenderer";
import { BaseScrollRenderer } from "./BaseScrollRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { ScrollViewer } from "./../../../Controls/ScrollViewer";
// import { StackPanel } from "./../../../Controls/StackPanel";
// import { ScrollBar } from "./../../../Controls/ScrollBar";
import { Panel } from "./../../../Controls/Panel";
// import { StackPanelRenderer } from "./StackPanelRenderer";
// import { RendererHelper } from "./../../../../utils/RendererHelper";
// import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
// import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";
// import { Orientation } from "./../../../../DataTypes/Orientation";
// import { Thickness } from "./../../../../DataTypes/Thickness";
import { Point } from "./../../../../DataTypes/Point";
// import { TextWrapping } from "./../../../../DataTypes/TextWrapping";
// import { TextWrappingAlign } from "./../../../../DataTypes/TextWrappingAlign";
import { IRenderer } from "./../IRenderer";
import { IEventArgs } from "./../../../../Events/IEventArgs";
import { RendererHelper } from "./../../../../utils/RendererHelper";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
// import { IEvent } from "./../../../../Events/IEvent";

export class ScrollViewerRenderer extends BaseScrollRenderer implements IControlRenderer {
    private _scrollViewerEl: ScrollViewer;
    Draw(r: IRenderer, args: IEventArgs): void {
        super.Draw(r, args);

        if (!this.Element.IsDirty) {
            return;
        }
        // if (r.Pointer.hitTestSprite(this.PixiElement)) {  // no need to check for this as we are using thumbpressed state
            // console.log(this._scrollBarEl.Name);
        // let newX: number = r.Pointer.x - this._scrollViewerEl.CalculatedX;
        // let newY: number = r.Pointer.y - this._scrollViewerEl.CalculatedY;

            // console.log(this._scrollBarEl.CalculatedY);

            // console.log(this._scrollBarEl.Value);

        // }




        // this.Element.IsDirty = false;
    }
    InitializeResources(): void {

        super.InitializeResources();
        ConsoleHelper.Log("ScrollViewerRenderer.InitializeResources");

        this._scrollViewerEl = <ScrollViewer>this.Element;
        if (this.PixiElement === undefined) {
            this.PixiElement = new PIXI.Container();
            this.PixiElementMask = new PIXI.Graphics();
            this.PixiElement.mask = this.PixiElementMask;
        }


        // this.PixiElement = text;

        // calculate y position
        this.CalculateYHeight(this._scrollViewerEl);

        // calculate X position
        this.CalculateXWidth(this._scrollViewerEl);

        // take margin into account
        this.UpdateCalculatedValuesUsingMargin(this._scrollViewerEl);

        // determine starting SLOT if the parent is a PANEL that lays out its children
        let parentXYStart: Point = this.CalculateCurrentAvailableSlot();

        // position container
        this.PixiElement.position.set(this.Element.CalculatedX + parentXYStart.X, this.Element.CalculatedY + parentXYStart.Y);

        // size container
        (<PIXI.Container>this.PixiElement).height = this.Element.CalculatedHeight;
        (<PIXI.Container>this.PixiElement).width = this.Element.CalculatedWidth;


        // determine starting SLOT if the parent is a PANEL that lays out its children
        // let parentXYStart: Point = this.CalculateCurrentAvailableSlot();

        // mask
        this.PixiElementMask.clear();
        this.PixiElementMask.beginFill(RendererHelper.HashToColorNumber("#FF000000"), 1);
        this.PixiElementMask.drawRect(0, 0, this._scrollViewerEl.CalculatedWidth, this._scrollViewerEl.CalculatedHeight);
        this.PixiElementMask.endFill();

        // now render in container
        // let cont: PIXI.Container = <PIXI.Container>this.PixiElement;


        // tell the parent stackpanel the next available slot
        this.IncrementNextAvailableSlot();

        // render graphics (DisplayObject) on PIXI stage
        let parentContainer: PIXI.Container = null;
        if (this.Element.Parent.Renderer === undefined) { // root panel (top of visual tree)
            this.Element.Platform.Renderer.PixiStage.addChild(this.PixiElementMask);
            this.Element.Platform.Renderer.PixiStage.addChild(this.PixiElement);
        } else {
            if (this.Element.Parent.Renderer.PixiElement && this.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                parentContainer = <PIXI.Container>this.Element.Parent.Renderer.PixiElement;
                parentContainer.addChild(this.PixiElementMask);
                parentContainer.addChild(this.PixiElement);
            }
        }

        // scrollbar needs to be here so as to render above the top bits
        this.InitScrollbar(<Panel>this._scrollViewerEl.Content, this._scrollViewerEl.CalculatedWidth, this._scrollViewerEl.CalculatedHeight, 300);

        // this._scrollViewerEl.Content

        // this.Element.Platform.Renderer.Draw.subscribe(this.Draw.bind(this));
        // this.Element.Platform.Renderer.PointerPressed.subscribe((r: IRenderer, args: IEventArgs) => {
        //    if (r.Pointer.hitTestSprite(this._pixiElementTrack)) {
        //        this._thumbPressed = true;
        //        //this.Element.IsDirty = true;
        //        rendererHelper.TinkInstance.makeDraggable(this._peThumb);
        //    }
        // });
        // this.Element.Platform.Renderer.PointerReleased.subscribe((r: IRenderer, args: IEventArgs) => {
        //    if (this._thumbPressed) {
        //        if (r.Pointer.hitTestSprite(this._pixiElementTrack) || r.Pointer.hitTestSprite(this._peThumb)) {
        //            // console.log(this.PixiElement.parent.x);
        //            // this._peThumb.moveTo(, 0);
        //            // this._peThumb.x = r.Pointer.x - this.PixiElement.parent.x; // - (this._scrollBarEl.Width / 2);
        //            rendererHelper.TinkInstance.makeUndraggable(this._peThumb);
        //        }
        //    }
        //    this._thumbPressed = false;
        //    //this.Element.IsDirty = false;
        // });


    }
    RefreshUI(): void {
        // todo : fill with actual pixi draw stuff that is idempotent
    }
    Clear(): void {
        ConsoleHelper.Log("ScrollViewerRenderer.Clear");

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
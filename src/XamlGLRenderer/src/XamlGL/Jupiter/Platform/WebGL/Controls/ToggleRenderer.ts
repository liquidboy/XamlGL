import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
import { IRenderer } from "./../../IRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
import { FrameworkElementCollection } from "./../../../FrameworkElementCollection";
import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
// import { Path } from "./../../../../Controls/Path";
// import { PathGeometry } from "./../../../../Controls/PathGeometry";
import { CheckBox } from "./../../../../Controls/CheckBox";
import { RadioButton } from "./../../../../Controls/RadioButton";
// import { StackPanel } from "./../../../../Controls/StackPanel";
// import { PathGeometry } from "./../../../../Controls/PathGeometry";
// import { PathFigure } from "./../../../../Controls/PathFigure";
// import { LineSegment } from "./../../../../Controls/LineSegment";
// import { BezierSegment } from "./../../../../Controls/BezierSegment";
// import { QuadraticBezierSegment } from "./../../../../Controls/QuadraticBezierSegment";
// import { ArcSegment } from "./../../../../Controls/ArcSegment";
// import { RendererHelper } from "./../../../../utils/RendererHelper";
// import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
// import { FillRule } from "./../../../../DataTypes/FillRule";
// import { SweepDirection } from "./../../../../DataTypes/SweepDirection";
// import { Size } from "./../../../../DataTypes/Size";
// import { Orientation } from "./../../../../DataTypes/Orientation";
// import { IRenderer } from "./../../IRenderer";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
import { RendererHelper } from "./../../../../utils/RendererHelper";
import { GroupingHelper } from "./../../../../utils/GroupingHelper";
import { MiniPathLanguageHelper } from "./../../../../utils/MiniPathLanguageHelper";
import { Point } from "./../../../../DataTypes/Point";

export class ToggleRenderer extends BaseRenderer implements IControlRenderer {
    private _topGraphicsLayer: PIXI.Graphics;
    // private _isPressed: boolean = false;

    Draw(): void {
        super.Draw();
        ConsoleHelper.Log("ToggleRenderer.Draw");

        let checkboxEl: CheckBox = <CheckBox>this.Element;
        if (this.PixiElement === undefined) {
            this.PixiElement = new PIXI.Container();
        }

        if (!checkboxEl.IsDirty) {
            return;
        }

        // calculate y position
        this.CalculateYHeight(checkboxEl);

        // calculate X position
        this.CalculateXWidth(checkboxEl);

        // take margin into account
        this.UpdateCalculatedValuesUsingMargin(checkboxEl);

        // size container
        (<PIXI.Container>this.PixiElement).height = this.Element.CalculatedHeight;
        (<PIXI.Container>this.PixiElement).width = this.Element.CalculatedWidth;


        let bottomGraphicsLayer: PIXI.Graphics = new PIXI.Graphics();
        bottomGraphicsLayer.beginFill(RendererHelper.HashToColorNumber("#FFFFFFFF"), 0.5);
        bottomGraphicsLayer.lineStyle(2, RendererHelper.HashToColorNumber("#FFFFFFFF"), 0.8);
        MiniPathLanguageHelper.parse(checkboxEl.UncheckedPath, bottomGraphicsLayer);
        bottomGraphicsLayer.endFill();

        this._topGraphicsLayer = new PIXI.Graphics();
        this._topGraphicsLayer.beginFill(RendererHelper.HashToColorNumber(checkboxEl.Foreground), 1);
        MiniPathLanguageHelper.parse(checkboxEl.CheckedPath, this._topGraphicsLayer);
        this._topGraphicsLayer.alpha = checkboxEl.IsChecked ? 1 : 0;
        this._topGraphicsLayer.endFill();


        // determine starting SLOT if the parent is a PANEL that lays out its children
        let parentXYStart: Point = this.CalculateCurrentAvailableSlot();

        // position bits
        bottomGraphicsLayer.x = 0;
        bottomGraphicsLayer.y = 0;
        this._topGraphicsLayer.x = checkboxEl.CheckedPadding.Left;
        this._topGraphicsLayer.y = checkboxEl.CheckedPadding.Top;
        if (checkboxEl.CheckedScale !== 1) {
            this._topGraphicsLayer.scale = new PIXI.Point(checkboxEl.CheckedScale, checkboxEl.CheckedScale);
        }


        // position/size container
        this.PixiElement.position.set(this.Element.CalculatedX + parentXYStart.X,
            this.Element.CalculatedY + parentXYStart.Y + this.Element.Parent.Margin.Top);

        // now render in container
        (<PIXI.Container>this.PixiElement).addChild(bottomGraphicsLayer);
        (<PIXI.Container>this.PixiElement).addChild(this._topGraphicsLayer);

        // tell the parent stackpanel the next available slot
        this.IncrementNextAvailableSlot();

        // render graphics (DisplayObject) on PIXI stage
        let parentContainer: PIXI.Container = null;
        if (this.Element.Parent.Renderer === undefined) { // root panel (top of visual tree)
            this.Element.Platform.Renderer.PixiStage.addChild(this.PixiElement);
        } else {
            if (this.Element.Parent.Renderer.PixiElement && this.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                parentContainer = <PIXI.Container>this.Element.Parent.Renderer.PixiElement;
                parentContainer.addChild(this.PixiElement);
            }
        }

        this.Element.Platform.Renderer.Draw.subscribe((r: IRenderer, args: IEventArgs) => {
            if (r.Pointer.hitTestSprite(this.PixiElement)) {
                this.IsBeingHitWithPointer(r, args);
            } else {
                this.IsNotBeingHitWithPointer(r, args);
            }
        });
        this.Element.Platform.Renderer.PointerTapped.subscribe((r: IRenderer, args: IEventArgs) => {
            if (r.Pointer.hitTestSprite(this.PixiElement)) {
                ConsoleHelper.Log("CheckBoxRenderer.PointerTapped");

                if (this.Element instanceof RadioButton) {
                    let rb: RadioButton = <RadioButton>this.Element;
                    rb.IsChecked = true;
                    if (rb.Grouping !== null && rb.Grouping.length > 0) {
                        let rbGroup: FrameworkElementCollection = GroupingHelper.GetElementsByGrouping(rb.Grouping);
                        rbGroup.forEach((x: CheckBox) => {
                            if (x.UniqueID !== rb.UniqueID) {
                                x.IsChecked = false;
                                x.Renderer.QuickDraw();
                            }
                        });
                    }
                } else {
                    checkboxEl.IsChecked = !checkboxEl.IsChecked;
                }

                this.QuickDraw();
                // this._topGraphicsLayer.alpha = checkboxEl.IsChecked? 1:0;
            }
        });


        checkboxEl.IsDirty = false;

    }
    QuickDraw(): void {
        this._topGraphicsLayer.alpha = (<CheckBox>this.Element).IsChecked ? 1 : 0;
    }
    Clear(): void {
        ConsoleHelper.Log("CheckBoxRenderer.Clear");

        let containerMain: PIXI.Container = null;

        if (this.PixiElement !== undefined) {
            containerMain = <PIXI.Container>this.PixiElement;
            this.Element.Platform.Renderer.PixiStage.removeChild(containerMain);
            this.PixiElement = null;
        }
    }
}


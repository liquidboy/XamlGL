import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
import { IRenderer } from "./../../IRenderer";
import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
// import { Grid } from "./../../../Controls/Grid";
import { StackPanel } from "./../../../Controls/StackPanel";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { RendererHelper } from "./../../../../utils/RendererHelper";
// import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
// import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";


export class StackPanelRenderer extends BaseRenderer implements IControlRenderer {
    private _stackPanelEl: StackPanel = <StackPanel>this.Element;
    private _parentContainer: PIXI.Container;
    Draw(r: IRenderer, args: IEventArgs): void {
        super.Draw(r,args);
        // fill from Draw
    }
    InitializeResources(): void {
        super.InitializeResources();
        ConsoleHelper.Log("StackPanelRenderer.InitializeResources");
        // console.log(super.Element);
        this._stackPanelEl = <StackPanel>this.Element;

        this._parentContainer = new PIXI.Container();
        super.PixiElement = this._parentContainer;

        if (!this._stackPanelEl.IsDirty) {
            return;
        }

        // calculate y position
        this.CalculateYHeight(this._stackPanelEl);

        // calculate X position
        this.CalculateXWidth(this._stackPanelEl);

        // take margin into account
        this.UpdateCalculatedValuesUsingMargin(this._stackPanelEl);

        // position/size container
        this._parentContainer.position.set(this.Element.CalculatedX + this._stackPanelEl.OffsetX, this.Element.CalculatedY + this._stackPanelEl.OffsetY);
        this._parentContainer.height = super.Element.CalculatedHeight;
        this._parentContainer.width = super.Element.CalculatedWidth;

        // set background if its available
        if (this._stackPanelEl.Background !== undefined) {
            let rectangle: PIXI.Graphics = new PIXI.Graphics();
            rectangle.beginFill(RendererHelper.HashToColorNumber(this._stackPanelEl.Background));
            rectangle.drawRect(0, 0, super.Element.CalculatedWidth, super.Element.CalculatedHeight);
            rectangle.endFill();
            this._parentContainer.addChild(rectangle);
        }

        if (super.Element.Parent.Renderer === undefined) { // root panel (top of visual tree)
            super.Element.Platform.Renderer.PixiStage.addChild(this._parentContainer);
        } else {
            if (super.Element.Parent.Renderer.PixiElement && super.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                let parentContainer: PIXI.Container = <PIXI.Container>super.Element.Parent.Renderer.PixiElement;
                parentContainer.addChild(this._parentContainer);
            }
        }

        this._stackPanelEl.IsDirty = false;
    }
    RefreshUI(): void {
        // todo : fill with actual pixi draw stuff that is idempotent
    }
    Clear(): void {
        ConsoleHelper.Log("StackPanelRenderer.Clear");
        if (this.Element.Parent.Renderer === undefined) { // root panel (top of visual tree)
            this.Element.Platform.Renderer.PixiStage.removeChild(this.PixiElement);
        } else {
            if (this.Element.Parent.Renderer.PixiElement && this.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                let parentContainer: PIXI.Container = <PIXI.Container>this.Element.Parent.Renderer.PixiElement;
                parentContainer.removeChild(this.PixiElement);
            }
        }
    }
    UpdateOffset(x: number, y:number): void {
        this._stackPanelEl.OffsetX = x;
        this._stackPanelEl.OffsetY = y;

        let newY: number = this.Element.CalculatedY === undefined ? 0 : this.Element.CalculatedY;
        newY += this._stackPanelEl.OffsetY;

        let newX: number = this.Element.CalculatedX === undefined ? 0 : this.Element.CalculatedX;
        newX += this._stackPanelEl.OffsetX;

        // console.log(this._stackPanelEl.OffsetY );
        this._parentContainer.position.set(newX, newY);
    }
}
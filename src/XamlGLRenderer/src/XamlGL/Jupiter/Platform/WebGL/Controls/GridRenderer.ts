import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { Grid } from "./../../../../Controls/Grid";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { RendererHelper } from "./../../../../utils/RendererHelper";
// import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
// import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";
import { IRenderer } from "./../../IRenderer";
import { IEventArgs } from "./../../../../Events/IEventArgs";
import { Point } from "./../../../../DataTypes/Point";

export class GridRenderer extends BaseRenderer implements IControlRenderer {
    Draw(): void {
        super.Draw();
        ConsoleHelper.Log("GridRenderer.Draw");
        // console.log(super.Element);
        let gridEl: Grid = <Grid>super.Element;

        let containerGrid: PIXI.Container = new PIXI.Container();
        this.PixiElement = containerGrid;

        if (!gridEl.IsDirty) {
            return;
        }

        // calculate y position
        this.CalculateYHeight(gridEl);

        // calculate X position
        this.CalculateXWidth(gridEl);

        // take margin into account
        this.UpdateCalculatedValuesUsingMargin(gridEl);
        
        // Important : doing this is failing, the height can't be set like this
        // size container
        // containerGrid.height = this.Element.CalculatedHeight;
        // containerGrid.width = this.Element.CalculatedWidth;

        // determine starting SLOT if the parent is a PANEL that lays out its children
        let parentXYStart: Point = this.CalculateCurrentAvailableSlot();

        // position container
        containerGrid.position.set(this.Element.CalculatedX + parentXYStart.X, this.Element.CalculatedY + parentXYStart.Y);

        // set background if its available
        if (gridEl.Background !== undefined) {
            let widthToUse: number = (gridEl.Width === null || gridEl.Width === 0) ? this.ParentWidth : gridEl.Width;
            let heightToUse: number = (gridEl.Height === null || gridEl.Height === 0) ? this.ParentHeight : gridEl.Height;

            if (this.Element.CalculatedHeight > 0 && heightToUse > this.Element.CalculatedHeight) heightToUse = this.Element.CalculatedHeight;
            if (this.Element.CalculatedWidth > 0 && widthToUse > this.Element.CalculatedWidth) widthToUse = this.Element.CalculatedWidth;

            let rectangle: PIXI.Graphics = new PIXI.Graphics();
            rectangle.beginFill(RendererHelper.HashToColorNumber(gridEl.Background));
            rectangle.drawRect(0, 0, widthToUse, heightToUse);
            rectangle.endFill();

            // now render in container
            containerGrid.addChild(rectangle);

        }

        // tell the parent stackpanel the next available slot
        this.IncrementNextAvailableSlot();

        if (super.Element.Parent.Renderer === undefined) { // root panel (top of visual tree)
            super.Element.Platform.Renderer.PixiStage.addChild(containerGrid);
        } else {
            if (super.Element.Parent.Renderer.PixiElement && super.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                let parentContainer: PIXI.Container = <PIXI.Container>super.Element.Parent.Renderer.PixiElement;
                parentContainer.addChild(containerGrid);
            }
        }

        // update the UI based on interaction events and the render DRAW loop
        this.Element.Platform.Renderer.Draw.subscribe((r: IRenderer, args: IEventArgs) => {
            // console.log(this.Element.Parent.Parent.Renderer.Scale);
            if (this.Element && this.Element.Parent && this.Element.Parent.Renderer) {
                let scale: number = this.Element.Parent.Renderer.Scale;
                if (scale !== undefined) {
                    containerGrid.scale.set(scale, scale);
                }
            }
        });

        gridEl.IsDirty = false;
    }
    Clear(): void {
        ConsoleHelper.Log("GridRenderer.Clear");
        if (this.Element.Parent.Renderer === undefined) { // root panel (top of visual tree)
            this.Element.Platform.Renderer.PixiStage.removeChild(this.PixiElement);
        } else {
            if (this.Element.Parent.Renderer.PixiElement && this.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                let parentContainer: PIXI.Container = <PIXI.Container>this.Element.Parent.Renderer.PixiElement;
                parentContainer.removeChild(this.PixiElement);
            }
        }
    }
}
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
import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";


export class GridRenderer extends BaseRenderer implements IControlRenderer {
    Draw(): void {
        super.Draw();
        ConsoleHelper.Log("GridRenderer.Draw");
        // console.log(super.Element);
        let gridEl: Grid = <Grid>super.Element;

        let containerGrid: PIXI.Container = new PIXI.Container();
        super.PixiElement = containerGrid;

        // super.Element.CalculatedY = 0;
        // super.Element.CalculatedX = 0;

        if (!gridEl.IsDirty) {
            return;
        }

        // calculate y position
        if (gridEl.Height !== null && gridEl.Height > 0) {
            super.Element.CalculatedHeight = gridEl.Height;
            if (gridEl.VerticalAlignment === VerticalAlignment.Bottom) {
                super.Element.CalculatedY = super.ParentHeight - gridEl.Height;
            } else if (gridEl.VerticalAlignment === VerticalAlignment.Center) {
                ConsoleHelper.Log("todo : implement GridRenderer.Draw  -> VerticalAlignment Center");
            } else if (gridEl.VerticalAlignment === VerticalAlignment.Stretch) {
                super.Element.CalculatedHeight = super.ParentHeight;
                super.Element.CalculatedY = 0;
            } else if (gridEl.VerticalAlignment === VerticalAlignment.Top) {
                super.Element.CalculatedY = 0;
            }
        } else {
            if (gridEl.VerticalAlignment === VerticalAlignment.Stretch) {
                super.Element.CalculatedHeight = super.ParentHeight;
                super.Element.CalculatedY = 0;
            }
        }

        // calculate X position
        if (gridEl.Width !== null && gridEl.Width > 0) {
            super.Element.CalculatedWidth = gridEl.Width;
            if (gridEl.HorizontalAlignment === HorizontalAlignment.Left) {
                super.Element.CalculatedX = 0;
            } else if (gridEl.HorizontalAlignment === HorizontalAlignment.Right) {
                super.Element.CalculatedX = super.ParentWidth - gridEl.Width;
            } else if (gridEl.HorizontalAlignment === HorizontalAlignment.Stretch) {
                super.Element.CalculatedWidth = super.ParentWidth;
                super.Element.CalculatedX = super.ParentWidth - gridEl.Width;
            } else if (gridEl.HorizontalAlignment === HorizontalAlignment.Center) {
                ConsoleHelper.Log("todo : implement GridRenderer.Draw  -> HorizontalAlignment Center");
                // super.Element.CalculatedX = 0;
            }
        } else {
            if (gridEl.HorizontalAlignment === HorizontalAlignment.Stretch) {
                super.Element.CalculatedWidth = super.ParentWidth;
                super.Element.CalculatedX = 0;
            }
        }

        // take margin into account
        if (gridEl.Margin !== null || gridEl.Margin !== undefined) {
            if (gridEl.HorizontalAlignment === HorizontalAlignment.Left) {
                super.Element.CalculatedX += super.Element.Margin.Left;
            } else if (gridEl.HorizontalAlignment === HorizontalAlignment.Right) {
                super.Element.CalculatedX -= super.Element.Margin.Right;
            }

            if (gridEl.VerticalAlignment === VerticalAlignment.Top) {
                super.Element.CalculatedY += super.Element.Margin.Top;
            } else if (gridEl.VerticalAlignment === VerticalAlignment.Bottom) {
                super.Element.CalculatedY -= super.Element.Margin.Bottom;
            }
        }

        // position/size container
        containerGrid.position.set(super.Element.CalculatedX, super.Element.CalculatedY);
        containerGrid.height = super.Element.CalculatedHeight;
        containerGrid.width = super.Element.CalculatedWidth;

        // set background if its available
        if (gridEl.Background !== undefined) {
            let widthToUse: number = (gridEl.Width === null || gridEl.Width === 0) ? super.ParentWidth : gridEl.Width;
            let heightToUse: number = (gridEl.Height === null || gridEl.Height === 0) ? super.ParentHeight : gridEl.Height;
            let rectangle: PIXI.Graphics = new PIXI.Graphics();
            rectangle.beginFill(RendererHelper.HashToColorNumber(gridEl.Background));
            rectangle.drawRect(0, 0, widthToUse, heightToUse);
            rectangle.endFill();
            containerGrid.addChild(rectangle);
        }

        if (super.Element.Parent.Renderer === undefined) { // root panel (top of visual tree)
            super.Element.Platform.Renderer.PixiStage.addChild(containerGrid);
        } else {
            if (super.Element.Parent.Renderer.PixiElement && super.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                let parentContainer: PIXI.Container = <PIXI.Container>super.Element.Parent.Renderer.PixiElement;
                parentContainer.addChild(containerGrid);
            }
        }

        gridEl.IsDirty = false;
    }
}
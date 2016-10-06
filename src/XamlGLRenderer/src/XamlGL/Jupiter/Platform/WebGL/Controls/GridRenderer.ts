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

        let containerX: number = 0;
        let containerY: number = 0;

        if (gridEl.Width !== null) {
            containerGrid.width = gridEl.Width;
            if (gridEl.HorizontalAlignment === HorizontalAlignment.Left) {
                containerX = 0;
            } else if (gridEl.HorizontalAlignment === HorizontalAlignment.Right) {
                containerX = super.Element.Parent.Width - gridEl.Width;
            } else if (gridEl.HorizontalAlignment === HorizontalAlignment.Stretch) {
                containerGrid.width = super.Element.Parent.Width;
                containerX = super.Element.Parent.Width - gridEl.Width;
            } else if (gridEl.HorizontalAlignment === HorizontalAlignment.Center) {
                ConsoleHelper.Log("todo : implement GridRenderer.Draw  -> HorizontalAlignment Center");
            }
        }

        if (gridEl.Height !== null) {
            containerGrid.height = gridEl.Height;
            if (gridEl.VerticalAlignment === VerticalAlignment.Bottom) {
                containerY = super.Element.Parent.Height - gridEl.Height;
            } else if (gridEl.VerticalAlignment === VerticalAlignment.Center) {
                ConsoleHelper.Log("todo : implement GridRenderer.Draw  -> VerticalAlignment Center");
            } else if (gridEl.VerticalAlignment === VerticalAlignment.Stretch) {
                containerGrid.width = super.Element.Parent.Width;
                containerY = 0;
            } else if (gridEl.VerticalAlignment === VerticalAlignment.Top) {
                containerY = 0;
            }
        }

        containerGrid.position.set(containerX, containerY);

        if (gridEl.Background !== undefined) {

            let rectangle: PIXI.Graphics = new PIXI.Graphics();
            rectangle.beginFill(RendererHelper.HashToColorNumber(gridEl.Background)); // 0x66CCFF);
            rectangle.drawRect(0, 0, gridEl.Width, gridEl.Height);
            rectangle.endFill();
            containerGrid.addChild(rectangle);
        }

        super.Element.Platform.Renderer.PixiStage.addChild(containerGrid);
    }
}
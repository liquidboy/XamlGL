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

export class GridRenderer extends BaseRenderer implements IControlRenderer {
    Draw(): void {
        super.Draw();
        ConsoleHelper.Log("GridRenderer.Draw");
        console.log(super.Element);
        let gridEl: Grid = <Grid>super.Element;
        let containerGrid: PIXI.Container = new PIXI.Container();

        if (gridEl.Background !== undefined) {
            let rectangle: PIXI.Graphics = new PIXI.Graphics();
            rectangle.beginFill(RendererHelper.HashToColorNumber(gridEl.Background)); // 0x66CCFF);
            rectangle.drawRect(0, 0, super.Element.Width, super.Element.Height);
            rectangle.endFill();
            containerGrid.addChild(rectangle);
        }

        super.Element.Platform.Renderer.PixiStage.addChild(containerGrid);
    }
}
import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { Rectangle } from "./../../../../Controls/Rectangle";

import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { RendererHelper } from "./../../../../utils/RendererHelper";

export class ToolTipRenderer extends BaseRenderer implements IControlRenderer {
    Draw(): void {
        super.Draw();
        ConsoleHelper.Log("ToolTipRenderer.Draw");
        // super.Element.Platform.Renderer.PixiRenderer

        let rectEl: Rectangle = <Rectangle>super.Element;

        if (!rectEl.IsDirty) {
            return;
        }

        // calculate y position
        this.CalculateYHeight(rectEl);

        // calculate X position
        this.CalculateXWidth(rectEl);

        // take margin into account
        this.UpdateCalculatedValuesUsingMargin(rectEl);

        let container: PIXI.Container = new PIXI.Container();
        container.x = rectEl.Margin.Left;
        container.y = rectEl.Margin.Top;


        let rectangle: PIXI.Graphics = new PIXI.Graphics();
        rectangle.lineStyle(rectEl.BorderThickness.Left, RendererHelper.HashToColorNumber(rectEl.BorderBrush), 1);
        rectangle.beginFill(RendererHelper.HashToColorNumber(rectEl.Background)); // 0x66CCFF);
        rectangle.drawRect(0, 0, super.Element.Width, super.Element.Height);
        rectangle.endFill();
        container.addChild(rectangle);

        var triangle = new PIXI.Graphics();
        triangle.beginFill(RendererHelper.HashToColorNumber(rectEl.Background));
        triangle.drawPolygon([
            0, 12,
            -12, 0,
            12, 0
        ]);
        triangle.endFill();
        triangle.x = this.Element.Width/2;
        triangle.y = this.Element.Height;
        container.addChild(triangle);
        
        super.Element.Platform.Renderer.PixiStage.addChild(container);

        rectEl.IsDirty = false;
    }
}
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


        let containerMain: PIXI.Container = new PIXI.Container();
        containerMain.x = rectEl.Margin.Left;
        containerMain.y = rectEl.Margin.Top;

        // bottom

        let container: PIXI.Container = new PIXI.Container();
        container.x = 0;
        container.y = 5;

        let rectangle: PIXI.Graphics = new PIXI.Graphics();
        rectangle.lineStyle(rectEl.BorderThickness.Left, RendererHelper.HashToColorNumber(rectEl.BorderBrush), 1);
        rectangle.beginFill(RendererHelper.HashToColorNumber(rectEl.Background)); // 0x66CCFF);
        rectangle.drawRoundedRect(0, 0, super.Element.Width, super.Element.Height, rectEl.CornerRadius.BottomLeft);
        rectangle.endFill();
        rectangle.boundsPadding = 5;
        container.addChild(rectangle);

        var triangle: PIXI.Graphics = new PIXI.Graphics();
        triangle.beginFill(RendererHelper.HashToColorNumber(rectEl.Background));
        triangle.drawPolygon([
            0, 12,
            -12, 0,
            12, 0
        ]);
        triangle.endFill();
        triangle.x = this.Element.Width/2;
        triangle.y = this.Element.Height;
        triangle.boundsPadding = 5;
        container.addChild(triangle);
        containerMain.addChild(container);


        // top
        let container2: PIXI.Container = new PIXI.Container();
        container2.x = 0;
        container2.y = 0;

        let rectangle2: PIXI.Graphics = new PIXI.Graphics();
        rectangle2.lineStyle(rectEl.BorderThickness.Left, RendererHelper.HashToColorNumber(rectEl.BorderBrush), 1);
        rectangle2.beginFill(RendererHelper.HashToColorNumber("#FFFFFFFF"));
        rectangle2.drawRoundedRect(0, 5, super.Element.Width, super.Element.Height-5, rectEl.CornerRadius.BottomLeft);
        rectangle2.endFill();
        rectangle2.boundsPadding = 5;
        container2.addChild(rectangle2);

        var triangle2: PIXI.Graphics = new PIXI.Graphics();
        triangle2.beginFill(RendererHelper.HashToColorNumber("#FFFFFFFF"));
        triangle2.drawPolygon([
            0, 12,
            -12, 0,
            12, 0
        ]);
        triangle2.endFill();
        triangle2.x = this.Element.Width / 2;
        triangle2.y = this.Element.Height;
        triangle2.boundsPadding = 5;
        container2.addChild(triangle2);
        containerMain.addChild(container2);


        // var dropShadowFilter = new PIXI.filters.BlurFilter();
        // dropShadowFilter.blur = 1;
        // containerMain.filters = [dropShadowFilter];
        
        super.Element.Platform.Renderer.PixiStage.addChild(containerMain);


        rectEl.IsDirty = false;
    }
}
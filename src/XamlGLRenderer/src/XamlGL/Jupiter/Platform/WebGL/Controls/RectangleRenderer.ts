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

export class RectangleRenderer extends BaseRenderer implements IControlRenderer {
    Draw(): void {
        super.Draw();
        ConsoleHelper.Log("RectangleRenderer.Draw");

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

        let rectangle: PIXI.Graphics = new PIXI.Graphics();
        rectangle.lineStyle(rectEl.BorderThickness.Left, RendererHelper.HashToColorNumber(rectEl.BorderBrush), 1);
        rectangle.beginFill(RendererHelper.HashToColorNumber(rectEl.Background)); // 0x66CCFF);
        rectangle.drawRect(0, 0, super.Element.Width, super.Element.Height);
        rectangle.endFill();
        rectangle.x = rectEl.Margin.Left;
        rectangle.y = rectEl.Margin.Top;
        this.Element.Platform.Renderer.PixiStage.addChild(rectangle);

        rectEl.IsDirty = false;
    }
    RefreshUI(): void {
        // todo : fill with actual pixi draw stuff that is idempotent
    }
    Clear(): void {
        ConsoleHelper.Log("RectangleRenderer.Clear");

        if (this.PixiElement !== undefined) {
            this.Element.Platform.Renderer.PixiStage.removeChild(this.PixiElement);
            this.PixiElement = null;
        }
    }
}
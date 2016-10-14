import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { ToolTip } from "./../../../../Controls/ToolTip";
import { DockPosition } from "./../../../../DataTypes/DockPosition";

import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { RendererHelper } from "./../../../../utils/RendererHelper";

export class ToolTipRenderer extends BaseRenderer implements IControlRenderer {
    Draw(): void {
        super.Draw();
        ConsoleHelper.Log("ToolTipRenderer.Draw");

        let rectEl: ToolTip = <ToolTip>super.Element;

        if (!rectEl.IsDirty) {
            return;
        }

        // calculate y position
        this.CalculateYHeight(rectEl);

        // calculate X position
        this.CalculateXWidth(rectEl);

        // take margin into account
        this.UpdateCalculatedValuesUsingMargin(rectEl);


        let containerMain: PIXI.Container = null;

        if (this.PixiElement === undefined) {
            containerMain = new PIXI.Container();
            containerMain.x = rectEl.Margin.Left;
            containerMain.y = rectEl.Margin.Top;
            this.PixiElement = containerMain;
        } else {
            containerMain = <PIXI.Container>this.PixiElement;
        }

        // bottom

        let container: PIXI.Container = new PIXI.Container();
        container.x = 0;
        container.y = 5;

        let rectangle: PIXI.Graphics = new PIXI.Graphics();
        rectangle.lineStyle(rectEl.BorderThickness.Left, RendererHelper.HashToColorNumber(rectEl.BorderBrush), 1);
        rectangle.beginFill(RendererHelper.HashToColorNumber(rectEl.Background));
        rectangle.drawRoundedRect(0, 0, this.Element.Width, this.Element.Height, rectEl.CornerRadius.BottomLeft);
        rectangle.endFill();
        rectangle.boundsPadding = 5;
        container.addChild(rectangle);

        var triangle: PIXI.Graphics = new PIXI.Graphics();
        triangle.beginFill(RendererHelper.HashToColorNumber(rectEl.Background));
        if (rectEl.DockPosition === DockPosition.Top) {
            triangle.drawPolygon([0, 12, -12, 0, 12, 0]);
            triangle.y = this.Element.Height;
            triangle.x = this.Element.Width / 2;
        } else if (rectEl.DockPosition === DockPosition.Bottom) {
            triangle.drawPolygon([0, -12, -12, 0, 12, 0]);
            triangle.y = 0;
            triangle.x = this.Element.Width / 2;
        } else if (rectEl.DockPosition === DockPosition.Right) {
            triangle.drawPolygon([-12, 0, 0, -12, 0, 12]);
            triangle.y = this.Element.Height /2;
            triangle.x = 0;
        } else if (rectEl.DockPosition === DockPosition.Left) {
            triangle.drawPolygon([12, 0, 0, -12, 0, 12]);
            triangle.y = this.Element.Height / 2;
            triangle.x = this.Element.Width;
        }
        triangle.endFill();


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
        if (rectEl.DockPosition === DockPosition.Top) {
            rectangle2.drawRoundedRect(0, 5, super.Element.Width, super.Element.Height - 5, rectEl.CornerRadius.BottomLeft);
        } else if (rectEl.DockPosition === DockPosition.Bottom) {
            rectangle2.drawRoundedRect(0, 10, super.Element.Width, super.Element.Height - 5, rectEl.CornerRadius.BottomLeft);
        } else if (rectEl.DockPosition === DockPosition.Right) {
            rectangle2.drawRoundedRect(5, 5, super.Element.Width, super.Element.Height , rectEl.CornerRadius.BottomLeft);
        } else if (rectEl.DockPosition === DockPosition.Left) {
            rectangle2.drawRoundedRect(-5, 5, super.Element.Width, super.Element.Height, rectEl.CornerRadius.BottomLeft);
        }
        rectangle2.endFill();
        rectangle2.boundsPadding = 5;
        container2.addChild(rectangle2);

        var triangle2: PIXI.Graphics = new PIXI.Graphics();
        triangle2.beginFill(RendererHelper.HashToColorNumber("#FFFFFFFF"));
        if (rectEl.DockPosition === DockPosition.Top) {
            triangle2.drawPolygon([0, 12, -12, 0, 12, 0]);
            triangle2.x = this.Element.Width / 2;
            triangle2.y = this.Element.Height;
        } else if (rectEl.DockPosition === DockPosition.Bottom) {
            triangle2.drawPolygon([0, -12, -12, 0, 12, 0]);
            triangle2.x = this.Element.Width / 2;
            triangle2.y = 12;
        } else if (rectEl.DockPosition === DockPosition.Right) {
            triangle2.drawPolygon([-12, 0, 0, -12, 0, 12]);
            triangle2.x = 7;
            triangle2.y = (this.Element.Height / 2) + 5;
        } else if (rectEl.DockPosition === DockPosition.Left) {
            triangle2.drawPolygon([12, 0, 0, -12, 0, 12]);
            triangle2.x = this.Element.Width - 6;
            triangle2.y = (this.Element.Height / 2) + 5;
        }
        triangle2.endFill();
        triangle2.boundsPadding = 5;
        container2.addChild(triangle2);
        containerMain.addChild(container2);


        var dropShadowFilter: PIXI.filters.BlurFilter = new PIXI.filters.BlurFilter();
        dropShadowFilter.blur = 0.5;
        containerMain.filters = [dropShadowFilter];

        this.Element.Platform.Renderer.PixiStage.addChild(containerMain);


        rectEl.IsDirty = false;
    }
    Clear(): void {
        ConsoleHelper.Log("ToolTipRenderer.Clear");

        let containerMain: PIXI.Container = null;

        if (this.PixiElement !== undefined) {
            containerMain = <PIXI.Container>this.PixiElement;
            this.Element.Platform.Renderer.PixiStage.removeChild(containerMain);
        }
    }
}
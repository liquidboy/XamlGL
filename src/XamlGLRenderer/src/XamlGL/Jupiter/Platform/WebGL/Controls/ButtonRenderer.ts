import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { Button } from "./../../../../Controls/Button";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { RendererHelper } from "./../../../../utils/RendererHelper";
// import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
// import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";


export class ButtonRenderer extends BaseRenderer implements IControlRenderer {
    Draw(): void {
        super.Draw();
        ConsoleHelper.Log("GridRenderer.Draw");
        // console.log(super.Element);
        let buttonEl: Button = <Button>super.Element;

        let containerGrid: PIXI.Container = new PIXI.Container();
        super.PixiElement = containerGrid;

        if (!buttonEl.IsDirty) {
            return;
        }

        // calculate y position
        this.CalculateYHeight(buttonEl);

        // calculate X position
        this.CalculateXWidth(buttonEl);

        // take margin into account
        this.UpdateCalculatedValuesUsingMargin(buttonEl);

        // position/size container
        containerGrid.position.set(super.Element.CalculatedX, super.Element.CalculatedY);
        containerGrid.height = super.Element.CalculatedHeight;
        containerGrid.width = super.Element.CalculatedWidth;

        // set background if its available
        if (buttonEl.Background !== undefined) {
            let widthToUse: number = (buttonEl.Width === null || buttonEl.Width === 0) ? super.ParentWidth : buttonEl.Width;
            let heightToUse: number = (buttonEl.Height === null || buttonEl.Height === 0) ? super.ParentHeight : buttonEl.Height;
            let rectangle: PIXI.Graphics = new PIXI.Graphics();
            if (buttonEl.BorderThickness !== null && buttonEl.BorderThickness.Left > 0) {
                rectangle.lineStyle(buttonEl.BorderThickness.Left, RendererHelper.HashToColorNumber(buttonEl.BorderBrush), 1);
            }
            rectangle.beginFill(RendererHelper.HashToColorNumber(buttonEl.Background));
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

        buttonEl.IsDirty = false;
    }
}
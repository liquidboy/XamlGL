import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { Text } from "./../../../../Controls/Text";
// import { RendererHelper } from "./../../../../utils/RendererHelper";
import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";

export class TextRenderer extends BaseRenderer implements IControlRenderer {
    Draw(): void {
        super.Draw();
        ConsoleHelper.Log("TextRenderer.Draw");

        let textEl: Text = <Text>super.Element;

        if (!textEl.IsDirty) {
            return;
        }

        // calculate y position
        if (textEl.Height !== null && textEl.Height > 0) {
            super.Element.CalculatedHeight = textEl.Height;
            if (textEl.VerticalAlignment === VerticalAlignment.Bottom) {
                super.Element.CalculatedY = super.Element.Parent.CalculatedHeight - textEl.Height;
            } else if (textEl.VerticalAlignment === VerticalAlignment.Center) {
                super.Element.CalculatedY = (super.Element.Parent.CalculatedHeight - textEl.Height) / 2;
            } else if (textEl.VerticalAlignment === VerticalAlignment.Stretch) {
                super.Element.CalculatedY = 0;
            } else if (textEl.VerticalAlignment === VerticalAlignment.Top) {
                super.Element.CalculatedY = 0;
            }
        } else {
            if (textEl.VerticalAlignment === VerticalAlignment.Stretch) {
                super.Element.CalculatedHeight = super.Element.Parent.CalculatedHeight;
                super.Element.CalculatedY = 0;
            }
        }

        // calculate X position
        if (textEl.Width !== null && textEl.Width > 0) {
            super.Element.CalculatedWidth = textEl.Width;
            if (textEl.HorizontalAlignment === HorizontalAlignment.Left) {
                super.Element.CalculatedX = 0;
            } else if (textEl.HorizontalAlignment === HorizontalAlignment.Right) {
                super.Element.CalculatedX = super.Element.Parent.CalculatedWidth - textEl.Width;
            } else if (textEl.HorizontalAlignment === HorizontalAlignment.Stretch) {
                super.Element.CalculatedX = super.Element.Parent.CalculatedWidth - textEl.Width;
            } else if (textEl.HorizontalAlignment === HorizontalAlignment.Center) {
                super.Element.CalculatedX = (super.Element.Parent.CalculatedWidth - textEl.Width) / 2;
            }
        } else {
            if (textEl.HorizontalAlignment === HorizontalAlignment.Stretch) {
                super.Element.CalculatedWidth = super.Element.Parent.CalculatedWidth;
                super.Element.CalculatedX = 0;
            }
        }

        let parentContainer: PIXI.Container = <PIXI.Container>super.Element.Parent.Renderer.PixiElement;

        let text: PIXI.Text = new PIXI.Text(
            textEl.Text,
            { font: "20px sans-serif", fill: textEl.Color }
        );
        text.position.set(50, 50);
        parentContainer.addChild(text);

        textEl.IsDirty = false;
    }
}
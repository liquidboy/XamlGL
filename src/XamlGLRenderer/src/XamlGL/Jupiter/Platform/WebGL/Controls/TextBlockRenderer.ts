import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { TextBlock } from "./../../../../Controls/TextBlock";
// import { RendererHelper } from "./../../../../utils/RendererHelper";
import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";

export class TextBlockRenderer extends BaseRenderer implements IControlRenderer {
    Draw(): void {
        super.Draw();
        ConsoleHelper.Log("TextRenderer.Draw");

        let textEl: TextBlock = <TextBlock>super.Element;

        if (!textEl.IsDirty) {
            return;
        }

        let parentContainer: PIXI.Container = <PIXI.Container>super.Element.Parent.Renderer.PixiElement;
        let text: PIXI.Text = new PIXI.Text(
            textEl.Text,
            { font: `${textEl.FontSize}px ${textEl.FontFamily}`, fill: textEl.Color }
        );
        
        // calculate y position
        if (textEl.Height !== null && textEl.Height > 0) {
            this.Element.CalculatedHeight = textEl.Height;
            if (textEl.VerticalAlignment === VerticalAlignment.Bottom) {
                this.Element.CalculatedY = this.Element.Parent.CalculatedHeight - textEl.Height;
            } else if (textEl.VerticalAlignment === VerticalAlignment.Center) {
                this.Element.CalculatedY = (this.Element.Parent.CalculatedHeight - textEl.Height) / 2;
            } else if (textEl.VerticalAlignment === VerticalAlignment.Stretch) {
                this.Element.CalculatedY = 0;
            } else if (textEl.VerticalAlignment === VerticalAlignment.Top) {
                this.Element.CalculatedY = 0;
            }
        } else {
            if (textEl.VerticalAlignment === VerticalAlignment.Stretch) {
                this.Element.CalculatedHeight = this.Element.Parent.CalculatedHeight;
                this.Element.CalculatedY = 0;
            } else if (textEl.VerticalAlignment === VerticalAlignment.Top) {
                this.Element.CalculatedY = 0;
            } else if (textEl.VerticalAlignment === VerticalAlignment.Bottom) {
                this.Element.CalculatedY = this.Element.Parent.CalculatedHeight - text.height;
            } else if (textEl.VerticalAlignment === VerticalAlignment.Center) {
                this.Element.CalculatedY = (this.Element.Parent.CalculatedHeight - text.height) / 2;
            } 
        }

        // calculate X position
        if (textEl.Width !== null && textEl.Width > 0) {
            this.Element.CalculatedWidth = textEl.Width;
            if (textEl.HorizontalAlignment === HorizontalAlignment.Left) {
                this.Element.CalculatedX = 0;
            } else if (textEl.HorizontalAlignment === HorizontalAlignment.Right) {
                this.Element.CalculatedX = this.Element.Parent.CalculatedWidth - textEl.Width;
            } else if (textEl.HorizontalAlignment === HorizontalAlignment.Stretch) {
                this.Element.CalculatedX = this.Element.Parent.CalculatedWidth - textEl.Width;
            } else if (textEl.HorizontalAlignment === HorizontalAlignment.Center) {
                this.Element.CalculatedX = (this.Element.Parent.CalculatedWidth - textEl.Width) / 2;
            }
        } else {
            if (textEl.HorizontalAlignment === HorizontalAlignment.Stretch) {
                this.Element.CalculatedWidth = super.Element.Parent.CalculatedWidth;
                this.Element.CalculatedX = 0;
            } else if (textEl.HorizontalAlignment === HorizontalAlignment.Right) {
                this.Element.CalculatedX = this.Element.Parent.CalculatedWidth - text.width;
            } else if (textEl.HorizontalAlignment === HorizontalAlignment.Left) {
                this.Element.CalculatedX = 0;
            } else if (textEl.HorizontalAlignment === HorizontalAlignment.Center) {
                this.Element.CalculatedX = (this.Element.Parent.CalculatedWidth - text.width) / 2;
            } 
        }

        // take margin into account
        if (textEl.Margin !== null || textEl.Margin !== undefined) {
            if (textEl.HorizontalAlignment === HorizontalAlignment.Left) {
                super.Element.CalculatedX += super.Element.Margin.Left;
            } else if (textEl.HorizontalAlignment === HorizontalAlignment.Right) {
                super.Element.CalculatedX -= super.Element.Margin.Right;
            }

            if (textEl.VerticalAlignment === VerticalAlignment.Top) {
                super.Element.CalculatedY += super.Element.Margin.Top;
            } else if (textEl.VerticalAlignment === VerticalAlignment.Bottom) {
                super.Element.CalculatedY -= super.Element.Margin.Bottom;
            }
        }

        //position text
        text.position.set(this.Element.CalculatedX, this.Element.CalculatedY);
        parentContainer.addChild(text);

        textEl.IsDirty = false;
    }
}
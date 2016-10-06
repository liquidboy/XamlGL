import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { Image } from "./../../../../Controls/Image";
// import { RendererHelper } from "./../../../../utils/RendererHelper";
import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";

export class ImageRenderer extends BaseRenderer implements IControlRenderer {
    Draw(): void {
        super.Draw();
        ConsoleHelper.Log("ImagetRenderer.Draw");

        let imageEl: Image = <Image>super.Element;

        // calculate y position
        if (imageEl.Height !== null && imageEl.Height > 0) {
            super.Element.CalculatedHeight = imageEl.Height;
            if (imageEl.VerticalAlignment === VerticalAlignment.Bottom) {
                super.Element.CalculatedY = super.Element.Parent.CalculatedHeight - imageEl.Height;
            } else if (imageEl.VerticalAlignment === VerticalAlignment.Center) {
                super.Element.CalculatedY = (super.Element.Parent.CalculatedHeight - imageEl.Height) / 2;
            } else if (imageEl.VerticalAlignment === VerticalAlignment.Stretch) {
                super.Element.CalculatedY = 0;
            } else if (imageEl.VerticalAlignment === VerticalAlignment.Top) {
                super.Element.CalculatedY = 0;
            }
        } else {
            if (imageEl.VerticalAlignment === VerticalAlignment.Stretch) {
                super.Element.CalculatedHeight = super.Element.Parent.CalculatedHeight;
                super.Element.CalculatedY = 0;
            }
        }
        
        // calculate X position
        if (imageEl.Width !== null && imageEl.Width > 0) {
            super.Element.CalculatedWidth = imageEl.Width;
            if (imageEl.HorizontalAlignment === HorizontalAlignment.Left) {
                super.Element.CalculatedX = 0;
            } else if (imageEl.HorizontalAlignment === HorizontalAlignment.Right) {
                super.Element.CalculatedX = super.Element.Parent.CalculatedWidth - imageEl.Width;
            } else if (imageEl.HorizontalAlignment === HorizontalAlignment.Stretch) {
                super.Element.CalculatedX = super.Element.Parent.CalculatedWidth - imageEl.Width;
            } else if (imageEl.HorizontalAlignment === HorizontalAlignment.Center) {
                super.Element.CalculatedX = (super.Element.Parent.CalculatedWidth - imageEl.Width) / 2;
            }
        } else {
            if (imageEl.HorizontalAlignment === HorizontalAlignment.Stretch) {
                super.Element.CalculatedWidth = super.Element.Parent.CalculatedWidth;
                super.Element.CalculatedX = 0;
            }
        }

        super.Element.Platform.Renderer.InitializeResource("glitter1", "/assets/glitter-1.jpg")
            .load(() => {
                // todo: if parent is panel we need to get the pixi container from it and use that
                super.Element.Platform.Renderer.ShowResource("glitter1", super.Element.Platform.Renderer.PixiStage,
                    super.Element.CalculatedX, super.Element.CalculatedY, super.Element.CalculatedWidth, super.Element.CalculatedHeight);
            });
    }
}
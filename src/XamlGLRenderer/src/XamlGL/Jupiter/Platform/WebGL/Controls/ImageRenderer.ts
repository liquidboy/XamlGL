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
import { StackPanel } from "./../../../../Controls/StackPanel";
// import { RendererHelper } from "./../../../../utils/RendererHelper";
import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";
import { Orientation } from "./../../../../DataTypes/Orientation";

export class ImageRenderer extends BaseRenderer implements IControlRenderer {
    Draw(): void {
        super.Draw();
        ConsoleHelper.Log("ImagetRenderer.Draw");

        let imageEl: Image = <Image>super.Element;

        if (!imageEl.IsDirty) {
            return;
        }

        // calculate y position
        if (imageEl.Height !== null && imageEl.Height > 0) {
            super.Element.CalculatedHeight = imageEl.Height;
            super.Element.CalculatedY = 0;
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
            super.Element.CalculatedX = 0;
            if (imageEl.HorizontalAlignment === HorizontalAlignment.Left) {
                super.Element.CalculatedX = 0;
            } else if (imageEl.HorizontalAlignment === HorizontalAlignment.Right) {
                super.Element.CalculatedX = super.Element.Parent.CalculatedWidth - imageEl.Width;
            } else if (imageEl.HorizontalAlignment === HorizontalAlignment.Stretch) {
                // super.Element.CalculatedX = super.Element.Parent.CalculatedWidth - imageEl.Width;
                super.Element.CalculatedX = 0;
            } else if (imageEl.HorizontalAlignment === HorizontalAlignment.Center) {
                super.Element.CalculatedX = (super.Element.Parent.CalculatedWidth - imageEl.Width) / 2;
            }
        } else {
            if (imageEl.HorizontalAlignment === HorizontalAlignment.Stretch) {
                super.Element.CalculatedWidth = super.Element.Parent.CalculatedWidth;
                super.Element.CalculatedX = 0;
            }
        }

        super.Element.Platform.Renderer.InitializeResource(imageEl.UniqueID, imageEl.SourceUrl)
            .load((loader: any, object: any) => {
                // determine container to use
                let parentXStart: number = 0;
                let parentYStart: number = 0;
                
                if (this.Element.Parent instanceof StackPanel) {
                    // get from the parent stackpanel the next slot available to render in
                    let sp: StackPanel = <StackPanel>this.Element.Parent;
                    if (sp.Orientation === Orientation.Horizontal) {
                        parentXStart += sp.CurrentItemRenderXY;
                    } else {
                        parentYStart += sp.CurrentItemRenderXY;
                    }
                }

                // render in the next available slot
                let parentContainer: PIXI.Container = <PIXI.Container>super.Element.Parent.Renderer.PixiElement;
                super.Element.Platform.Renderer.ShowResource(
                    imageEl.UniqueID,
                    parentContainer,
                    super.Element.CalculatedX + parentXStart,
                    super.Element.CalculatedY + parentYStart,
                    super.Element.CalculatedWidth,
                    super.Element.CalculatedHeight);

                if (this.Element.Parent instanceof StackPanel) {
                    // tell the parent stackpanel the next available slot
                    let sp: StackPanel = <StackPanel>this.Element.Parent;
                    if (sp.Orientation === Orientation.Horizontal) {
                        sp.CurrentItemRenderXY += this.Element.CalculatedWidth
                            + ((this.Element.Margin === undefined) ? 0: (this.Element.Margin.Right + this.Element.Margin.Left));
                    } else {
                        sp.CurrentItemRenderXY += this.Element.CalculatedHeight
                            + ((this.Element.Margin === undefined) ? 0 : (this.Element.Margin.Top + this.Element.Margin.Bottom));
                    }
                }

            });

       

        imageEl.IsDirty = false;
    }
}
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
// import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
// import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";
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
        this.CalculateYHeight(imageEl);

        // calculate X position
        this.CalculateXWidth(imageEl);

        // take margin into account
        this.UpdateCalculatedValuesUsingMargin(imageEl);

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
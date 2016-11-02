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
// import { StackPanel } from "./../../../../Controls/StackPanel";
// import { RendererHelper } from "./../../../../utils/RendererHelper";
// import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
import { Point } from "./../../../../DataTypes/Point";
// import { Orientation } from "./../../../../DataTypes/Orientation";
import { IRenderer } from "./../../IRenderer";
import { IEventArgs } from "./../../../../Events/IEventArgs";

export class ImageRenderer extends BaseRenderer implements IControlRenderer {
    Draw(r: IRenderer, args: IEventArgs): void {
        super.Draw(r,args);
        // fill from Draw
    }
    InitializeResources(): void {
        super.InitializeResources();
        ConsoleHelper.Log("ImagetRenderer.InitializeResources");

        let imageEl: Image = <Image>super.Element;
        let imageContainer: PIXI.Container = null;

        if (!imageEl.IsDirty) {
            return;
        }

        if (this.PixiElement === undefined) {
            imageContainer = new PIXI.Container();
            this.PixiElement = imageContainer;
        } else {
            imageContainer = <PIXI.Container>this.PixiElement;
        }

        // calculate y position
        this.CalculateYHeight(imageEl);

        // calculate X position
        this.CalculateXWidth(imageEl);

        // take margin into account
        this.UpdateCalculatedValuesUsingMargin(imageEl);

        super.Element.Platform.Renderer.InitializeResource(imageEl.UniqueID, imageEl.SourceUrl)
            .load((loader: any, object: any) => {

                // determine starting SLOT if the parent is a PANEL that lays out its children
                let parentXYStart: Point = this.CalculateCurrentAvailableSlot();

                // render in the next available slot
                // let parentContainer: PIXI.Container = <PIXI.Container>super.Element.Parent.Renderer.PixiElement;
                super.Element.Platform.Renderer.LoadResource(
                    imageEl.UniqueID,
                    imageContainer, // parentContainer
                    super.Element.CalculatedX + parentXYStart.X,
                    super.Element.CalculatedY + parentXYStart.Y,
                    super.Element.CalculatedWidth,
                    super.Element.CalculatedHeight);

                // tell the parent stackpanel the next available slot
                this.IncrementNextAvailableSlot();

                // this.Element.Platform.Renderer.PixiRenderer.render(parentContainer);
                let parentContainer: PIXI.Container = <PIXI.Container>super.Element.Parent.Renderer.PixiElement;
                parentContainer.addChild(imageContainer);
            });

        // this.Element.Platform.Renderer.Render.subscribe((r: IRenderer, args: IEventArgs) => {
        //    // this.Element.Platform.Renderer.PixiRenderer.render(parentContainer);
        // });

        imageEl.IsDirty = false;
    }
    RefreshUI(): void {
        // todo : fill with actual pixi draw stuff that is idempotent
    }
    Clear(): void {
        ConsoleHelper.Log("ImageRenderer.Clear");

        if (this.PixiElement !== undefined) {
            let parentContainer: PIXI.Container = <PIXI.Container>super.Element.Parent.Renderer.PixiElement;
            parentContainer.removeChild(this.PixiElement);
            this.PixiElement = null;
        }
    }
}

// http://www.html5gamedevs.com/topic/10866-best-way-to-load-image-from-url/
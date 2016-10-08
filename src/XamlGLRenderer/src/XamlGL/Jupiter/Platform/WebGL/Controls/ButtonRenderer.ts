import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
import { IRenderer } from "./../../IRenderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { Button } from "./../../../../Controls/Button";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { RendererHelper } from "./../../../../utils/RendererHelper";
// import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
// import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";


export class ButtonRenderer extends BaseRenderer implements IControlRenderer {
    private _scaleToUse: number = 1.0;
    private _blurToUse: number = 0;
    private _isPressed: boolean = false;

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
        let background: PIXI.Graphics = null;
        let blurFilter: PIXI.filters.BlurFilter = null;
        if (buttonEl.Background !== undefined) {
            let widthToUse: number = (buttonEl.Width === null || buttonEl.Width === 0) ? super.ParentWidth : buttonEl.Width;
            let heightToUse: number = (buttonEl.Height === null || buttonEl.Height === 0) ? super.ParentHeight : buttonEl.Height;

            // background
            // let background: PIXI.Graphics = new PIXI.Graphics();
            background = new PIXI.Graphics();

            if (buttonEl.BorderThickness !== null && buttonEl.BorderThickness.Left > 0) {
                background.lineStyle(buttonEl.BorderThickness.Left, RendererHelper.HashToColorNumber(buttonEl.BorderBrush), 1);
            }
            background.beginFill(RendererHelper.HashToColorNumber(buttonEl.Background), 1);
            if (buttonEl.CornerRadius.TopLeft > 0) {
                background.drawRoundedRect(0, 0, widthToUse, heightToUse, buttonEl.CornerRadius.TopLeft);
            } else {
                background.drawRect(0, 0, widthToUse, heightToUse);
            }
            background.boundsPadding = buttonEl.BlurAmount;
            background.endFill();

            // generate sprite from graphics displayobject so we can set anchor correctly and do a scale
            var texture: PIXI.Texture = background.generateTexture(this.Element.Platform.Renderer.PixiRenderer);
            var backgroundSprite: PIXI.Sprite = new PIXI.Sprite(texture);
            backgroundSprite.anchor.set(0.5, 0.5); // now we can scale and it will do it around the center of button
            backgroundSprite.setTransform(buttonEl.Width/2, buttonEl.Height/2);

            // now render
            // containerGrid.addChild(background);
            containerGrid.addChild(backgroundSprite);

            // filters
            if (buttonEl.BlurAmount > 0) {
                blurFilter = new PIXI.filters.BlurFilter();
                this._blurToUse = buttonEl.BlurAmount;
                blurFilter.blur = 0;
                // background.filters = [filter];
                backgroundSprite.filters = [blurFilter];
                // background.boundsPadding = buttonEl.BlurAmount;
            }
        }

        if (this.Element.Parent.Renderer === undefined) { // root panel (top of visual tree)
            this.Element.Platform.Renderer.PixiStage.addChild(containerGrid);
        } else {
            if (this.Element.Parent.Renderer.PixiElement && this.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                let parentContainer: PIXI.Container = <PIXI.Container>this.Element.Parent.Renderer.PixiElement;
                parentContainer.addChild(containerGrid);
            }
        }

        this.Element.Platform.Renderer.Draw.subscribe((r: IRenderer, args: IEventArgs) => {
            // consoleHelper.Log("Button Draw");
            if (r.Pointer.hitTestSprite(containerGrid)) {
                backgroundSprite.alpha = 1;
                this._scaleToUse = this._isPressed ? 0.98 : 1.02;
                this._blurToUse = buttonEl.BlurAmount;
                r.Pointer.cursor = "pointer";
            } else {
                backgroundSprite.alpha = 0.95;
                this._scaleToUse = 1.0;
                this._blurToUse = 1.0;
                r.Pointer.cursor = "auto";
            }
            blurFilter.blur = this._blurToUse;
            backgroundSprite.scale.set(this._scaleToUse, this._scaleToUse);
        });

        this.Element.Platform.Renderer.PointerTapped.subscribe((r: IRenderer, args: IEventArgs) => {
            if (r.Pointer.hitTestSprite(containerGrid)) {
                ConsoleHelper.Log("Button Tapped");
            }
        });

        this.Element.Platform.Renderer.PointerPressed.subscribe((r: IRenderer, args: IEventArgs) => {
            if (r.Pointer.hitTestSprite(containerGrid)) {
                this._isPressed = true;
            }
        });

        this.Element.Platform.Renderer.PointerReleased.subscribe((r: IRenderer, args: IEventArgs) => {
            if (r.Pointer.hitTestSprite(containerGrid)) {
                this._isPressed = false;
            }
        });


        buttonEl.IsDirty = false;
    }
}
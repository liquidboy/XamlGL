import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
import { IRenderer } from "./../../IRenderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { Button } from "./../../../../Controls/Button";
// import { Panel } from "./../../../../Controls/Panel";
// import { Rectangle } from "./../../../../Controls/Rectangle";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { RendererHelper } from "./../../../../utils/RendererHelper";
// import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
import { Point } from "./../../../../DataTypes/Point";
// import { Thickness } from "./../../../../DataTypes/Thickness";
// import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
// import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";
// import { CornerRadius } from "./../../../../DataTypes/CornerRadius";
// import { StackPanel } from "./../../../../Controls/StackPanel";
// import { Orientation } from "./../../../../DataTypes/Orientation";
import { DockPosition } from "./../../../../DataTypes/DockPosition";

export class ButtonRenderer extends BaseRenderer implements IControlRenderer {
    private _blurToUse: number = 0;
    private _isPressed: boolean = false;
    Draw(): void {
        super.Draw();
        // fill from Draw
    }
    InitializeResources(): void {
        super.InitializeResources();
        ConsoleHelper.Log("ButtonRenderer.InitializeResources");
        // console.log(super.Element);
        let buttonEl: Button = <Button>super.Element;

        if (this.PixiElement === undefined) {
            this.PixiElement = new PIXI.Container();
        }

        if (!buttonEl.IsDirty) {
            return;
        }

        // calculate y position
        this.CalculateYHeight(buttonEl);

        // calculate X position
        this.CalculateXWidth(buttonEl);

        // take margin into account
        this.UpdateCalculatedValuesUsingMargin(buttonEl);

        // size container
        (<PIXI.Container>this.PixiElement).height = this.Element.CalculatedHeight;
        (<PIXI.Container>this.PixiElement).width = this.Element.CalculatedWidth;



        // set background if its available
        let background: PIXI.Graphics = null;
        let blurFilter: PIXI.filters.BlurFilter = null;
        if (buttonEl.Background !== undefined) {
            let widthToUse: number = (buttonEl.Width === null || buttonEl.Width === 0) ? this.ParentWidth : buttonEl.Width;
            let heightToUse: number = (buttonEl.Height === null || buttonEl.Height === 0) ? this.ParentHeight : buttonEl.Height;

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
            background.boundsPadding = buttonEl.BlurAmount * 2 ;
            background.endFill();

            // generate sprite from graphics displayobject so we can set anchor correctly and do a scale
            var texture: PIXI.Texture = background.generateTexture(this.Element.Platform.Renderer.PixiRenderer);
            var backgroundSprite: PIXI.Sprite = new PIXI.Sprite(texture);
            backgroundSprite.anchor.set(0.5, 0.5); // now we can scale and it will do it around the center of button
            backgroundSprite.setTransform(buttonEl.Width/2, buttonEl.Height/2);

            // filters
            if (buttonEl.BlurAmount > 0) {
                blurFilter = new PIXI.filters.BlurFilter();
                this._blurToUse = buttonEl.BlurAmount;
                blurFilter.blur = 0;
                // background.filters = [filter];
                backgroundSprite.filters = [blurFilter];
                // background.boundsPadding = buttonEl.BlurAmount;
            }

            // determine starting SLOT if the parent is a PANEL that lays out its children
            let parentXYStart: Point = this.CalculateCurrentAvailableSlot();

            // position/size container
            this.PixiElement.position.set(this.Element.CalculatedX + parentXYStart.X, this.Element.CalculatedY + parentXYStart.Y);

            // now render in container
            (<PIXI.Container>this.PixiElement).addChild(backgroundSprite);

            // tell the parent stackpanel the next available slot
            this.IncrementNextAvailableSlot();
        }

        // render graphics (DisplayObject) on PIXI stage
        let parentContainer: PIXI.Container = null;
        if (this.Element.Parent.Renderer === undefined) { // root panel (top of visual tree)
            this.Element.Platform.Renderer.PixiStage.addChild(this.PixiElement);
        } else {
            if (this.Element.Parent.Renderer.PixiElement && this.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                parentContainer = <PIXI.Container>this.Element.Parent.Renderer.PixiElement;
                parentContainer.addChild(this.PixiElement);
            }
        }

        // update the UI based on interaction events and the render DRAW loop
        this.Element.Platform.Renderer.Draw.subscribe((r: IRenderer, args: IEventArgs) => {
            if (r.Pointer.hitTestSprite(this.PixiElement)) {
                this.IsBeingHitWithPointer(r, args);
                backgroundSprite.alpha = 1;
                this.Scale = this._isPressed ? 0.98 : 1.02;
                this._blurToUse = buttonEl.BlurAmount;
                // rendererHelper.SetCursorToPointer(r);
                this.ShowTooltip(r, buttonEl, parentContainer, this.PixiElement);
            } else {
                this.IsNotBeingHitWithPointer(r, args);
                backgroundSprite.alpha = 0.95;
                this.Scale = 1.0;
                this._blurToUse = 1.0;
                this.HideTooltip(buttonEl);
                // rendererHelper.SetCursorToAuto(r);
            }
            if (buttonEl.BlurAmount > 0) {
                blurFilter.blur = this._blurToUse;
            }
            backgroundSprite.scale.set(this.Scale, this.Scale);
            // parentContainer.rotation += 0.001;
            // console.log(this._cursorToUse);
        });


        this.Element.Platform.Renderer.PointerTapped.subscribe((r: IRenderer, args: IEventArgs) => {
            if (r.Pointer.hitTestSprite(this.PixiElement)) {
                ConsoleHelper.Log("ButtonRenderer.Draw.Tapped");
            }
        });

        this.Element.Platform.Renderer.PointerPressed.subscribe((r: IRenderer, args: IEventArgs) => {
            if (r.Pointer.hitTestSprite(this.PixiElement)) {
                this._isPressed = true;
            }
        });

        this.Element.Platform.Renderer.PointerReleased.subscribe((r: IRenderer, args: IEventArgs) => {
            if (r.Pointer.hitTestSprite(this.PixiElement)) {
                this._isPressed = false;
            }
        });

        buttonEl.IsDirty = false;
    }
    RefreshUI(): void {
        // todo : fill with actual pixi draw stuff that is idempotent
    }
    ShowTooltip(r: IRenderer, buttonEl: Button, parentContainer: PIXI.Container, containerGrid: PIXI.DisplayObject): void {
        if (!buttonEl.HasToolTip || buttonEl.IsTooltipVisible) {
            return;
        }

        let pt00ContainerGrid: PIXI.Point = containerGrid.toGlobal(new PIXI.Point(0, 0));

        buttonEl.IsTooltipVisible = true;
        let tooltipHeight: number = buttonEl.TooltipHeight > 0 ? buttonEl.TooltipHeight : 80;
        let tooltipWidth: number = buttonEl.TooltipWidth > 0 ? buttonEl.TooltipWidth: 120;

        let topStart: number = 0;
        let leftStart: number = 0;
        if (buttonEl.TooltipDockPosition === DockPosition.Top) {
            topStart = pt00ContainerGrid.y - tooltipHeight - 20;
            leftStart = pt00ContainerGrid.x - ((tooltipWidth - buttonEl.Width) / 2);
        } else if (buttonEl.TooltipDockPosition === DockPosition.Bottom) {
            topStart = pt00ContainerGrid.y + buttonEl.Height + 10;
            leftStart = pt00ContainerGrid.x - ((tooltipWidth - buttonEl.Width) / 2);
        } else if (buttonEl.TooltipDockPosition === DockPosition.Left) {
            topStart = pt00ContainerGrid.y - ((tooltipHeight - buttonEl.Height) / 2);
            leftStart = pt00ContainerGrid.x - tooltipWidth - 15;
        } else if (buttonEl.TooltipDockPosition === DockPosition.Right) {
            topStart = pt00ContainerGrid.y - ((tooltipHeight - buttonEl.Height) / 2);
            leftStart = pt00ContainerGrid.x + buttonEl.Width + 15;
        }

        if (buttonEl.HasToolTip) {
            this.GeneralShowTooltip(
                buttonEl.TooltipDockPosition,
                buttonEl.TooltipBackground,
                buttonEl.TooltipBorder,
                leftStart,
                topStart,
                tooltipWidth,
                tooltipHeight);
        } else {
            eval(buttonEl.ClickStr);
        }
    }
    HideTooltip(buttonEl: Button): void {
        if (!buttonEl.HasToolTip || !buttonEl.IsTooltipVisible) {
            return;
        }
        this.GeneralHideTooltip();
        buttonEl.IsTooltipVisible = false;
    }

    Clear(): void {
        ConsoleHelper.Log("ButtonRenderer.Clear");

        let containerMain: PIXI.Container = null;

        if (this.PixiElement !== undefined) {
            containerMain = <PIXI.Container>this.PixiElement;
            this.Element.Platform.Renderer.PixiStage.removeChild(containerMain);
        }
    }
}
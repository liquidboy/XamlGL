﻿import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { TextBlock } from "./../../../Controls/TextBlock";
// import { StackPanel } from "./../../../../Controls/StackPanel";
// import { Panel } from "./../../../Controls/Panel";
// import { RendererHelper } from "./../../../../utils/RendererHelper";
import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";
// import { Orientation } from "./../../../../DataTypes/Orientation";
import { Point } from "./../../../../DataTypes/Point";
import { TextWrapping } from "./../../../../DataTypes/TextWrapping";
import { TextWrappingAlign } from "./../../../../DataTypes/TextWrappingAlign";
import { IRenderer } from "./../IRenderer";
import { IEventArgs } from "./../../../../Events/IEventArgs";

export class TextBlockRenderer extends BaseRenderer implements IControlRenderer {
    Draw(r: IRenderer, args: IEventArgs): void {
        super.Draw(r,args);
        // fill from Draw
    }
    InitializeResources(): void {
        super.InitializeResources();
        ConsoleHelper.Log("TextBlockRenderer.InitializeResources");

        let textEl: TextBlock = <TextBlock>super.Element;

        if (!textEl.IsDirty) {
            return;
        }

        let parentContainer: PIXI.Container = <PIXI.Container>super.Element.Parent.Renderer.PixiElement;
        let text: PIXI.Text = new PIXI.Text(
            textEl.Text,
            {
                fontSize: textEl.FontSize,
                fontFamily: `${textEl.FontFamily}`,
                fill: textEl.Color,
                wordWrap: (textEl.TextWrapping === TextWrapping.Wrap) ? true : false,
                wordWrapWidth: textEl.Width,
                align: TextWrappingAlign[textEl.TextWrappingAlign].toLowerCase()
            }
        );
        // this.PixiElement = text;

        // calculate y position
        this.CalculateYHeight(textEl);
        if (textEl.Height !== null && textEl.Height > 0) {
            if (textEl.VerticalAlignment === VerticalAlignment.Center) {
                this.Element.CalculatedY = (textEl.Height - text.height) / 2;
            }
        } else {
            if (textEl.VerticalAlignment === VerticalAlignment.Bottom) {
                this.Element.CalculatedY = this.Element.Parent.CalculatedHeight - text.height;
            } else if (textEl.VerticalAlignment === VerticalAlignment.Center) {
                this.Element.CalculatedY = (this.Element.Parent.CalculatedHeight - text.height) / 2;
            }
        }
        
        // calculate X position
        this.CalculateXWidth(textEl);
        if (textEl.Width !== null && textEl.Width > 0) {
            if (textEl.HorizontalAlignment === HorizontalAlignment.Center) {
                this.Element.CalculatedX = (textEl.Width - text.width) / 2;
            }
        } else {
            if (textEl.HorizontalAlignment === HorizontalAlignment.Right) {
                this.Element.CalculatedX = this.Element.Parent.CalculatedWidth - text.width;
            } else if (textEl.HorizontalAlignment === HorizontalAlignment.Center) {
                console.log(textEl.Width);
                this.Element.CalculatedX = (this.Element.Parent.CalculatedWidth - text.width) / 2;
            }
        }

        // take margin into account
        this.UpdateCalculatedValuesUsingMargin(textEl);

        // determine starting SLOT if the parent is a PANEL that lays out its children
        let parentXYStart: Point = this.CalculateCurrentAvailableSlot();

        // position text
        text.position.set(this.Element.CalculatedX + parentXYStart.X, this.Element.CalculatedY + parentXYStart.Y);
        
        parentContainer.addChild(text);
        this.Element.CalculatedHeight = text.height;
        this.Element.CalculatedWidth = text.width;

        // tell the parent stackpanel the next available slot
        this.IncrementNextAvailableSlot();

        // // update the UI based on interaction events and the render DRAW loop
        // this.Element.Platform.Renderer.Draw.subscribe((r: IRenderer, args: IEventArgs) => {
        //    // console.log(this.Element.Parent.Parent.Renderer.Scale);
        //    let scale: number = this.Element.Parent.Renderer.Scale;
        //    text.scale.set(scale, scale);
        // });


        textEl.IsDirty = false;
    }
    RefreshUI(): void {
        // todo : fill with actual pixi draw stuff that is idempotent
    }
    Clear(): void {
        ConsoleHelper.Log("TextBlockRenderer.Clear");

        let containerMain: PIXI.Container = null;
        let pc: PIXI.Container =  <PIXI.Container>this.Element.Parent.Renderer.PixiElement;

        if (this.PixiElement !== undefined) {
            containerMain = <PIXI.Container>this.PixiElement;
            // this.Element.Platform.Renderer.PixiStage.removeChild(containerMain);
            pc.removeChild(this.PixiElement);
            this.PixiElement = null;
        }
    }
}
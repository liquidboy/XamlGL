import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
import { IRenderer } from "./../../IRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElementCollection } from "./../../../FrameworkElementCollection";
import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
// import { Path } from "./../../../../Controls/Path";
// import { PathGeometry } from "./../../../../Controls/PathGeometry";
import { TextBox } from "./../../../../Controls/TextBox";
// import { StackPanel } from "./../../../../Controls/StackPanel";
// import { PathGeometry } from "./../../../../Controls/PathGeometry";
// import { PathFigure } from "./../../../../Controls/PathFigure";
// import { LineSegment } from "./../../../../Controls/LineSegment";
// import { BezierSegment } from "./../../../../Controls/BezierSegment";
// import { QuadraticBezierSegment } from "./../../../../Controls/QuadraticBezierSegment";
// import { ArcSegment } from "./../../../../Controls/ArcSegment";
// import { RendererHelper } from "./../../../../utils/RendererHelper";
// import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
// import { FillRule } from "./../../../../DataTypes/FillRule";
// import { SweepDirection } from "./../../../../DataTypes/SweepDirection";
// import { Size } from "./../../../../DataTypes/Size";
// import { Orientation } from "./../../../../DataTypes/Orientation";
// import { IRenderer } from "./../../IRenderer";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
import { RendererHelper } from "./../../../../utils/RendererHelper";
// import { GroupingHelper } from "./../../../../utils/GroupingHelper";
// import { MiniPathLanguageHelper } from "./../../../../utils/MiniPathLanguageHelper";
import { Point } from "./../../../../DataTypes/Point";
import { TextWrapping } from "./../../../../DataTypes/TextWrapping";
import { TextWrappingAlign } from "./../../../../DataTypes/TextWrappingAlign";
import { KeyPressedEventArgs } from "./../../../../Events/KeyPressedEventArgs";

export class TextBoxRenderer extends BaseRenderer implements IControlRenderer {
    private _topGraphicsLayer: PIXI.Graphics;
    private _bottomGraphicsLayer: PIXI.Graphics;
    // private _isFocused: boolean = false;

    Draw(): void {
        super.Draw();
        ConsoleHelper.Log("TextBoxRenderer.Draw");

        let textBoxEl: TextBox = <TextBox>this.Element;
        if (this.PixiElement === undefined) {
            this.PixiElement = new PIXI.Container();
        }

        if (!textBoxEl.IsDirty) {
            return;
        }

        // calculate y position
        this.CalculateYHeight(textBoxEl);

        // calculate X position
        this.CalculateXWidth(textBoxEl);

        // take margin into account
        this.UpdateCalculatedValuesUsingMargin(textBoxEl);

        // size container
        (<PIXI.Container>this.PixiElement).height = this.Element.CalculatedHeight;
        (<PIXI.Container>this.PixiElement).width = this.Element.CalculatedWidth;

        // start top
        this._topGraphicsLayer = new PIXI.Graphics();
        this._topGraphicsLayer.width = textBoxEl.CalculatedWidth;
        this._topGraphicsLayer.beginFill(RendererHelper.HashToColorNumber("#FFFFFFFF"), 1);

        // text
        let text: PIXI.Text = new PIXI.Text(
            textBoxEl.Text,
            {
                font: `${textBoxEl.FontSize}px ${textBoxEl.FontFamily}`,
                fill: textBoxEl.Color,
                wordWrap: (textBoxEl.TextWrapping === TextWrapping.Wrap) ? true : false,
                wordWrapWidth: textBoxEl.CalculatedWidth,
                align: TextWrappingAlign[textBoxEl.TextWrappingAlign].toLowerCase()
            }
        );
        this._topGraphicsLayer.addChild(text);
        
        // end top
        this._topGraphicsLayer.endFill();


        // start bottom
        this._bottomGraphicsLayer = new PIXI.Graphics();
        this._bottomGraphicsLayer.width = textBoxEl.CalculatedWidth;
        this._bottomGraphicsLayer.beginFill(RendererHelper.HashToColorNumber("#FFFFFFFF"), 0.8);

        // cursor
        let cursor: PIXI.Graphics = this._bottomGraphicsLayer.drawRect(text.x + text.width, text.y + text.height, textBoxEl.FontSize, 3);

        // end bottom
        this._bottomGraphicsLayer.endFill();


        // determine starting SLOT if the parent is a PANEL that lays out its children
        let parentXYStart: Point = this.CalculateCurrentAvailableSlot();

        // position bits
        this._bottomGraphicsLayer.x = 0;
        this._bottomGraphicsLayer.y = 0;
        this._topGraphicsLayer.x = 0;
        this._topGraphicsLayer.y = 0;

        // position/size container
        this.PixiElement.position.set(this.Element.CalculatedX + parentXYStart.X,
            this.Element.CalculatedY + parentXYStart.Y + this.Element.Parent.Margin.Top);

        // now render in container
        (<PIXI.Container>this.PixiElement).addChild(this._bottomGraphicsLayer);
        (<PIXI.Container>this.PixiElement).addChild(this._topGraphicsLayer);

        // tell the parent stackpanel the next available slot
        this.IncrementNextAvailableSlot();

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

        this.Element.Platform.Renderer.Key.subscribe((r: IRenderer, args: IEventArgs) => {
            if (r.Pointer.hitTestSprite(this.PixiElement)) {
                text.text += (<KeyPressedEventArgs>args).Code;
                // console.LogPad((<KeyPressedEventArgs>args).Code, 20);
            }
        });
        this.Element.Platform.Renderer.Draw.subscribe((r: IRenderer, args: IEventArgs) => {
            if (r.Pointer.hitTestSprite(this.PixiElement)) {
                this.IsBeingHitWithPointer(r, args);
                cursor.position.set(text.x + text.width - 65 , text.y);
            } else {
                this.IsNotBeingHitWithPointer(r, args);
            }
        });
        this.Element.Platform.Renderer.PointerTapped.subscribe((r: IRenderer, args: IEventArgs) => {
            if (r.Pointer.hitTestSprite(this.PixiElement)) {
                ConsoleHelper.Log("TextBoxRenderer.PointerTapped");

                this.RefreshUI();
            }
        });


        textBoxEl.IsDirty = false;

    }
    RefreshUI(): void {
        // this._topGraphicsLayer.alpha = (<CheckBox>this.Element).IsChecked ? 1 : 0;
    }
    Clear(): void {
        ConsoleHelper.Log("TextBoxRenderer.Clear");

        let containerMain: PIXI.Container = null;

        if (this.PixiElement !== undefined) {
            containerMain = <PIXI.Container>this.PixiElement;
            this.Element.Platform.Renderer.PixiStage.removeChild(containerMain);
            this.PixiElement = null;
        }
    }
}


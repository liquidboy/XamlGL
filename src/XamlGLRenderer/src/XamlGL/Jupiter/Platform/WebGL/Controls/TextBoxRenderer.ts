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
    private _text: PIXI.Text;
    private _cursorPoint: Point = new Point(0, 0);
    private _currentCursorPositionXLength: number = 0;
    // private _localWindowLength: number = 30;
    // private _isFocused: boolean = false;

    Draw(): void {
        super.Draw();
        ConsoleHelper.Log("TextBoxRenderer.Draw");

        let textBoxEl: TextBox = <TextBox>this.Element;
        if (this.PixiElement === undefined) {
            this.PixiElement = new PIXI.Container();
            this.PixiElementMask = new PIXI.Graphics();
            this.PixiElement.mask = this.PixiElementMask;
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
        this._text = new PIXI.Text(
            textBoxEl.Text,
            {
                font: `${textBoxEl.FontSize}px ${textBoxEl.FontFamily}`,
                fill: textBoxEl.Color,
                wordWrap: (textBoxEl.TextWrapping === TextWrapping.Wrap) ? true : false,
                wordWrapWidth: textBoxEl.CalculatedWidth,
                align: TextWrappingAlign[textBoxEl.TextWrappingAlign].toLowerCase()
            }
        );
        this._currentCursorPositionXLength = textBoxEl.Text.length;

        // mask
        this.PixiElementMask.clear();
        this.PixiElementMask.beginFill(RendererHelper.HashToColorNumber("#FF000000"), 1);
        this.PixiElementMask.drawRect(0, 0, textBoxEl.CalculatedWidth, textBoxEl.FontSize + 5);
        this.PixiElementMask.endFill();

        this._topGraphicsLayer.addChild(this._text);

        // end top
        this._topGraphicsLayer.endFill();


        // start bottom
        this._bottomGraphicsLayer = new PIXI.Graphics();
        this._bottomGraphicsLayer.width = textBoxEl.CalculatedWidth;
        this._bottomGraphicsLayer.height = textBoxEl.CalculatedHeight;
        this._bottomGraphicsLayer.beginFill(RendererHelper.HashToColorNumber("#FFFFFFFF"), 0.8);

        // cursor
        // let cursor: PIXI.Graphics = this._bottomGraphicsLayer.drawRect(text.x + text.width, text.y + text.height - 20, 3, 18);
        let cursor: PIXI.Graphics = this._bottomGraphicsLayer.drawRect(0, 0, 3, 18);
        cursor.alpha = 0;

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
            this.Element.Platform.Renderer.PixiStage.addChild(this.PixiElementMask);
            this.Element.Platform.Renderer.PixiStage.addChild(this.PixiElement);
        } else {
            if (this.Element.Parent.Renderer.PixiElement && this.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                parentContainer = <PIXI.Container>this.Element.Parent.Renderer.PixiElement;
                parentContainer.addChild(this.PixiElementMask);
                parentContainer.addChild(this.PixiElement);
            }
        }

        this.Element.Platform.Renderer.Key.subscribe((r: IRenderer, args: IEventArgs) => {
            if (textBoxEl.HasFocus) {
                // let kc: number = parseInt((<KeyPressedEventArgs>args).KeyCode);
                let k: string = (<KeyPressedEventArgs>args).Key;
                // consoleHelper.LogPad(kc.toString(), 20);

                if (k.length === 1) { // an acceptable single char
                    if (this._currentCursorPositionXLength === this._text.text.length) {
                        // this._text.text += k;
                        this.UpdateText(this._text.text + k);
                        this._currentCursorPositionXLength = this._text.text.length;
                    } else {
                        let start: string = this._text.text.substr(0, this._currentCursorPositionXLength);
                        let end: string = this._text.text.substr(this._currentCursorPositionXLength, this._text.text.length);
                        // this._text.text = start + k + end;
                        this.UpdateText(start + k + end);
                        this._currentCursorPositionXLength++;
                    }
                } else {
                    switch (k) {
                        case "Backspace":
                            if (this._currentCursorPositionXLength === 0) {
                                // if you are a the start of the line

                            } else if (this._currentCursorPositionXLength >= this._text.text.length) {
                                // if you are a the end of the line
                                // this._text.text = this._text.text.substr(0, this._currentCursorPositionXLength - 1);
                                this.UpdateText(this._text.text.substr(0, this._currentCursorPositionXLength - 1));
                                this._currentCursorPositionXLength = this._text.text.length;
                            } else {
                                // if you are somewhere in the line 
                                let start: string = this._text.text.substr(0, this._currentCursorPositionXLength - 1);
                                let end: string = this._text.text.substr(this._currentCursorPositionXLength, this._text.text.length);
                                // this._text.text = start + end;
                                this.UpdateText(start + end);
                                this._currentCursorPositionXLength--;
                            }
                            break;
                        case "Delete":
                            if (this._currentCursorPositionXLength === 0) {
                                // if you are a the start of the line

                            } else if (this._currentCursorPositionXLength === this._text.text.length) {
                                // if you are a the end of the line
                                // this._text.text = this._text.text.substr(0, this._currentCursorPositionXLength - 1);
                                this.UpdateText(this._text.text.substr(0, this._currentCursorPositionXLength - 1));
                                this._currentCursorPositionXLength = this._text.text.length;
                            } else {
                                // if you are somewhere in the line 
                                let start: string = this._text.text.substr(0, this._currentCursorPositionXLength);
                                let end: string = this._text.text.substr(this._currentCursorPositionXLength + 1, this._text.text.length);
                                // this._text.text = start + end;
                                this.UpdateText(start + end);
                            }
                            break;
                        case "Enter":
                            if (textBoxEl.AcceptsReturn) {
                                // this._text.text += "\n";
                                this.UpdateText(this._text.text + "\n");
                                this._currentCursorPositionXLength = this._text.text.length;
                            }
                            break;
                        case "ArrowLeft":
                            this._currentCursorPositionXLength--;
                            if (this._currentCursorPositionXLength < 0) {
                                this._currentCursorPositionXLength = 0;
                            }
                            textBoxEl.IsDirty = true;
                            break;
                        case "ArrowRight":
                            this._currentCursorPositionXLength++;
                            if (this._currentCursorPositionXLength > this._text.text.length) {
                                this._currentCursorPositionXLength = this._text.text.length;
                            }
                            textBoxEl.IsDirty = true;
                            break;
                        case "End":
                            this._currentCursorPositionXLength = this._text.text.length;
                            textBoxEl.IsDirty = true;
                            break;
                        case "Home":
                            this._currentCursorPositionXLength = 0;
                            textBoxEl.IsDirty = true;
                            break;
                        default:
                            console.log(k);
                    }
                }

                this.UpdateCursorPosition();
            }
        });
        this.Element.Platform.Renderer.Draw.subscribe((r: IRenderer, args: IEventArgs) => {
            if (r.Pointer.hitTestSprite(this.PixiElement)) {
                this.IsBeingHitWithPointer(r, args);
            } else {
                this.IsNotBeingHitWithPointer(r, args);
            }

            if (textBoxEl.HasFocus && textBoxEl.IsDirty) {
                cursor.alpha = 1;
                cursor.position.set(this._cursorPoint.X, this._cursorPoint.Y);
                textBoxEl.IsDirty = false;
            }
        });
        this.Element.Platform.Renderer.PointerTapped.subscribe((r: IRenderer, args: IEventArgs) => {
            if (r.Pointer.hitTestSprite(this.PixiElement)) {
                ConsoleHelper.Log("TextBoxRenderer.PointerTapped");
                this._currentCursorPositionXLength = this._text.text.length;
                this.UpdateCursorPosition();
                textBoxEl.HasFocus = !textBoxEl.HasFocus;
                this.RefreshUI();
            }
        });


        textBoxEl.IsDirty = false;

    }
    UpdateText(newText: string): void {
        this._text.text = newText;
    }
    UpdateCursorPosition(): void {
        let textBoxEl: TextBox = <TextBox>this.Element;
        let pos: TextMetrics = this._text.context.measureText(this._text.text.substr(0, this._currentCursorPositionXLength));
        let newX: number = pos.width % this._text.width;
        let newY: number = Math.floor(pos.width / this._text.width) * textBoxEl.FontSize;
        this._cursorPoint.update(newX, this._text.y + newY);
        textBoxEl.IsDirty = true;
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

// hint : https://github.com/pixijs/pixi.js/issues/418
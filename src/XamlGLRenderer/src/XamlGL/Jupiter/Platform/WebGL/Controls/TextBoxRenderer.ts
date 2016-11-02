import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
import { IRenderer } from "./../../IRenderer";
import { IEventArgs } from "./../../../../Events/IEventArgs";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { TextBox } from "./../../../Controls/TextBox";
import { RendererHelper } from "./../../../../utils/RendererHelper";
import { Point } from "./../../../../DataTypes/Point";
import { TextWrapping } from "./../../../../DataTypes/TextWrapping";
import { TextWrappingAlign } from "./../../../../DataTypes/TextWrappingAlign";
import { KeyPressedEventArgs } from "./../../../../Events/KeyPressedEventArgs";

export class TextBoxRenderer extends BaseRenderer implements IControlRenderer {
    private _topGraphicsLayer: PIXI.Graphics;
    private _borderbackground: PIXI.Graphics;
    private _bottomGraphicsLayer: PIXI.Graphics;
    private _text: PIXI.Text;
    private _cursor: PIXI.Graphics;
    private _cursorPoint: Point = new Point(0, 0);
    private _currentCursorPositionXLength: number = 0;
    private _textBoxEl: TextBox;
    // private _localWindowLength: number = 30;
    // private _isFocused: boolean = false;
    Draw(r: IRenderer, args: IEventArgs): void {
        super.Draw(r,args);
        if (r.Pointer.hitTestSprite(this.PixiElement)) {
            this.IsBeingHitWithPointer(r, args);
        } else {
            this.IsNotBeingHitWithPointer(r, args);
        }

        if (this._textBoxEl.HasFocus && this._textBoxEl.IsDirty) {
            this._cursor.alpha = 1;
            this._cursor.position.set(this._cursorPoint.X, this._cursorPoint.Y);
            this._textBoxEl.IsDirty = false;
        }
    }
    InitializeResources(): void {
        super.InitializeResources();
        ConsoleHelper.Log("TextBoxRenderer.InitializeResources");

        this._textBoxEl = <TextBox>this.Element;
        if (this.PixiElement === undefined) {
            this.PixiElement = new PIXI.Container();
            this.PixiElementMask = new PIXI.Graphics();
            this.PixiElement.mask = this.PixiElementMask;
        }

        if (!this._textBoxEl.IsDirty) {
            return;
        }

        // calculate y position
        this.CalculateYHeight(this._textBoxEl);

        // calculate X position
        this.CalculateXWidth(this._textBoxEl);

        // take margin into account
        this.UpdateCalculatedValuesUsingMargin(this._textBoxEl);

        // size container
        (<PIXI.Container>this.PixiElement).height = this.Element.CalculatedHeight;
        (<PIXI.Container>this.PixiElement).width = this.Element.CalculatedWidth;

        // start top
        this._topGraphicsLayer = new PIXI.Graphics();
        this._topGraphicsLayer.width = this._textBoxEl.CalculatedWidth;
        this._topGraphicsLayer.beginFill(RendererHelper.HashToColorNumber("#FFFFFFFF"), 1);

        // text
        this._text = new PIXI.Text(
            this._textBoxEl.Text,
            {
                font: `${this._textBoxEl.FontSize}px ${this._textBoxEl.FontFamily}`,
                fill: this._textBoxEl.Color,
                wordWrap: (this._textBoxEl.TextWrapping === TextWrapping.Wrap) ? true : false,
                wordWrapWidth: this._textBoxEl.CalculatedWidth,
                align: TextWrappingAlign[this._textBoxEl.TextWrappingAlign].toLowerCase()
            }
        );
        this._currentCursorPositionXLength = this._textBoxEl.Text.length;

        // mask
        this.PixiElementMask.clear();
        this.PixiElementMask.beginFill(RendererHelper.HashToColorNumber("#FF000000"), 1);
        this.PixiElementMask.drawRect(0, 0, this._textBoxEl.CalculatedWidth, this._textBoxEl.CalculatedHeight);
        this.PixiElementMask.endFill();

        this._topGraphicsLayer.addChild(this._text);

        // end top
        this._topGraphicsLayer.endFill();



        // middle
        this._borderbackground = new PIXI.Graphics();
        this._borderbackground.width = this._textBoxEl.CalculatedWidth;
        this._borderbackground.height = this._textBoxEl.CalculatedHeight;
        this._borderbackground.lineStyle(4, RendererHelper.HashToColorNumber("#FFFFFFFF"), 1);
        this._borderbackground.beginFill(RendererHelper.HashToColorNumber("#FF000000"), 0.5);
        let border: PIXI.Graphics = this._borderbackground.drawRect(0, 0, this._textBoxEl.CalculatedWidth, this._textBoxEl.CalculatedHeight);
        
        this._borderbackground.endFill();
        console.log(this._textBoxEl.CalculatedWidth);



        // start bottom
        this._bottomGraphicsLayer = new PIXI.Graphics();
        this._bottomGraphicsLayer.width = this._textBoxEl.CalculatedWidth;
        this._bottomGraphicsLayer.height = this._textBoxEl.CalculatedHeight;
        this._bottomGraphicsLayer.beginFill(RendererHelper.HashToColorNumber("#FFFFFFFF"), 0.8);

        // cursor
        // let cursor: PIXI.Graphics = this._bottomGraphicsLayer.drawRect(text.x + text.width, text.y + text.height - 20, 3, 18);
        this._cursor = this._bottomGraphicsLayer.drawRect(5, 5, 3, 18);
        this._cursor.alpha = 0;

        // end bottom
        this._bottomGraphicsLayer.endFill();


        // determine starting SLOT if the parent is a PANEL that lays out its children
        let parentXYStart: Point = this.CalculateCurrentAvailableSlot();

        // position bits
        this._bottomGraphicsLayer.x = 5;
        this._bottomGraphicsLayer.y = 5;
        this._borderbackground.x = 0;
        this._borderbackground.y = 0;
        this._topGraphicsLayer.x = 5;
        this._topGraphicsLayer.y = 5;

        // position/size container
        this.PixiElement.position.set(this.Element.CalculatedX + parentXYStart.X,
            this.Element.CalculatedY + parentXYStart.Y + this.Element.Parent.Margin.Top);

        // now render in container
        let cont = <PIXI.Container>this.PixiElement;
        cont.addChild(this._borderbackground);
        cont.addChild(this._bottomGraphicsLayer);
        cont.addChild(this._topGraphicsLayer);

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
            if (this._textBoxEl.HasFocus) {
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
                                this.UpdateText(this._text.text.substr(1, this._text.text.length - 1));
                                this._currentCursorPositionXLength = 0;
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
                            if (this._textBoxEl.AcceptsReturn) {
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
                            this._textBoxEl.IsDirty = true;
                            break;
                        case "ArrowRight":
                            this._currentCursorPositionXLength++;
                            if (this._currentCursorPositionXLength > this._text.text.length) {
                                this._currentCursorPositionXLength = this._text.text.length;
                            }
                            this._textBoxEl.IsDirty = true;
                            break;
                        case "End":
                            this._currentCursorPositionXLength = this._text.text.length;
                            this._textBoxEl.IsDirty = true;
                            break;
                        case "Home":
                            this._currentCursorPositionXLength = 0;
                            this._textBoxEl.IsDirty = true;
                            break;
                        default:
                            console.log(k);
                    }
                }

                this.UpdateCursorPosition();
            }
        });
        this.Element.Platform.Renderer.Draw.subscribe(this.Draw.bind(this));
        this.Element.Platform.Renderer.PointerTapped.subscribe((r: IRenderer, args: IEventArgs) => {
            if (r.Pointer.hitTestSprite(this.PixiElement)) {
                ConsoleHelper.Log("TextBoxRenderer.PointerTapped");
                this._currentCursorPositionXLength = this._text.text.length;
                this.UpdateCursorPosition();
                this._textBoxEl.HasFocus = !this._textBoxEl.HasFocus;
                this.RefreshUI();
            }
        });


        this._textBoxEl.IsDirty = false;

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
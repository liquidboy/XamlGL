﻿import * as Jupiter from "./../Core";
import { TextWrapping } from "./../../DataTypes/TextWrapping";
import { TextWrappingAlign } from "./../../DataTypes/TextWrappingAlign";

export class TextBlock extends Jupiter.View {
    private _text: string;
    private _stretch: Jupiter.Stretch;
    private _color: string;
    private _fontFamily: string;
    private _fontSize: number;
    private _textWrapping: TextWrapping = TextWrapping.NoWrap;
    private _textWrappingAlign: TextWrappingAlign = TextWrappingAlign.Left;

    get Text(): string { return this._text; }
    get Stretch(): Jupiter.Stretch { return this._stretch; }
    get Color(): string { return this._color; }
    get FontSize(): number { return this._fontSize; }
    get FontFamily(): string { return this._fontFamily; }
    get TextWrapping(): TextWrapping { return this._textWrapping; }
    get TextWrappingAlign(): TextWrappingAlign { return this._textWrappingAlign; }

    set Text(value: string) { this._text = value; }
    set Stretch(value: Jupiter.Stretch) { this._stretch = value; }
    set Color(value: string) { this._color = value; }
    set FontSize(value: number) { this._fontSize = value; }
    set FontFamily(value: string) { this._fontFamily = value; }
    set TextWrapping(value: TextWrapping) { this._textWrapping = value; }
    set TextWrappingAlign(value: TextWrappingAlign) { this._textWrappingAlign = value; }
}
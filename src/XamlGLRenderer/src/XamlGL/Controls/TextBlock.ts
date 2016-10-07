import * as Jupiter from "./../Jupiter/Core";
import { Thickness } from "./../DataTypes/Thickness";

export class TextBlock extends Jupiter.View {
    private _text: string;
    private _stretch: Jupiter.Stretch;
    private _color: string;

    get Text(): string { return this._text; }
    get Stretch(): Jupiter.Stretch { return this._stretch; }
    get Color(): string { return this._color; }

    set Text(value: string) { this._text = value; }
    set Stretch(value: Jupiter.Stretch) { this._stretch = value; }
    set Color(value: string) { this._color = value; }
}
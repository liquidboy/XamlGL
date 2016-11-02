import { Panel } from "./Panel";
import { Thickness } from "./../../DataTypes/Thickness";
import { CornerRadius } from "./../../DataTypes/CornerRadius";

export class Button  extends Panel {
    private _borderThickness: Thickness;
    private _borderBrush: string;
    private _cornerRadius: CornerRadius;
    private _clickStr: string;

    get BorderThickness(): Thickness { return this._borderThickness; }
    get BorderBrush(): string { return this._borderBrush; }
    get CornerRadius(): CornerRadius { return this._cornerRadius; }
    get ClickStr(): string { return this._clickStr; }

    set BorderThickness(value: Thickness) { this._borderThickness = value; }
    set BorderBrush(value: string) { this._borderBrush = value; }
    set CornerRadius(value: CornerRadius) { this._cornerRadius = value; }
    set ClickStr(value: string) { this._clickStr = value; }
}
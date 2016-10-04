import { Panel } from "./Panel";
import { Thickness } from "./../DataTypes/Thickness";
import { CornerRadius } from "./../DataTypes/CornerRadius";

export class Rectangle  extends Panel {
    private _borderThickness: Thickness;
    private _borderBrush: string;
    private _cornerRadius: CornerRadius;

    get BorderThickness(): Thickness { return this._borderThickness; }
    get BorderBrush(): string { return this._borderBrush; }
    get CornerRadius(): CornerRadius { return this._cornerRadius; }

    set BorderThickness(value: Thickness) { this._borderThickness = value; }
    set BorderBrush(value: string) { this._borderBrush = value; }
    set CornerRadius(value: CornerRadius) { this._cornerRadius = value; }
}
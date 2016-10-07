import { Panel } from "./Panel";
import { Thickness } from "./../DataTypes/Thickness";
import { CornerRadius } from "./../DataTypes/CornerRadius";
import { Orientation } from "./../DataTypes/Orientation";

export class StackPanel  extends Panel {
    private _borderThickness: Thickness;
    private _borderBrush: string;
    private _cornerRadius: CornerRadius;
    private _currentItemRenderXY: number = 0;
    private _orientation: Orientation;

    get BorderThickness(): Thickness { return this._borderThickness; }
    get BorderBrush(): string { return this._borderBrush; }
    get CornerRadius(): CornerRadius { return this._cornerRadius; }
    get CurrentItemRenderXY(): number { return this._currentItemRenderXY; }
    get Orientation(): Orientation { return this._orientation; }

    set BorderThickness(value: Thickness) { this._borderThickness = value; }
    set BorderBrush(value: string) { this._borderBrush = value; }
    set CornerRadius(value: CornerRadius) { this._cornerRadius = value; }
    set CurrentItemRenderXY(value: number) { this._currentItemRenderXY = value; }
    set Orientation(value: Orientation) { this._orientation = value; }
}
import { Panel } from "./Panel";
import { Thickness } from "./../../DataTypes/Thickness";
import { CornerRadius } from "./../../DataTypes/CornerRadius";
import { HorizontalAlignment } from "./../../DataTypes/HorizontalAlignment";
import { VerticalAlignment } from "./../../DataTypes/VerticalAlignment";

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

    constructor() {
        super();

        this.BorderThickness = new Thickness(0);
        this.BorderBrush = "#FFFFFFFF";
        this.HorizontalAlignment = HorizontalAlignment.Center;
        this.VerticalAlignment = VerticalAlignment.Center;
        this.Background = "#FFFFFFFF";
        this.Margin = new Thickness(0);
        this.CornerRadius = new CornerRadius(0);
    }
}
import { Panel } from "./Panel";
import { Thickness } from "./../DataTypes/Thickness";
import { CornerRadius } from "./../DataTypes/CornerRadius";
import { HorizontalAlignment } from "./../DataTypes/HorizontalAlignment";
import { VerticalAlignment } from "./../DataTypes/VerticalAlignment";
import { DockPosition } from "./../DataTypes/DockPosition";

export class ToolTip extends Panel {
    private _borderThickness: Thickness;
    private _cornerRadius: CornerRadius;
    private _dockPosition: DockPosition;

    get BorderThickness(): Thickness { return this._borderThickness; }
    get CornerRadius(): CornerRadius { return this._cornerRadius; }
    get DockPosition(): DockPosition { return this._dockPosition; }

    set BorderThickness(value: Thickness) { this._borderThickness = value; }
    set CornerRadius(value: CornerRadius) { this._cornerRadius = value; }
    set DockPosition(value: DockPosition) { this._dockPosition = value; }

    constructor() {
        super();

        this.BorderThickness = new Thickness(0);
        this.HorizontalAlignment = HorizontalAlignment.Center;
        this.VerticalAlignment = VerticalAlignment.Center;
        this.TooltipBackground = "#FF000000";
        this.TooltipBorder = "#FFFFFFFF";
        this.Margin = new Thickness(0);
        this.CornerRadius = new CornerRadius(0);
        this.DockPosition = DockPosition.Top;
    }

    ShowToolTip(pointerX: number, pointerY: number, width: number, height: number, dockPosition: DockPosition): void {
        this.Width = this.CalculatedWidth = width;
        this.Height = this.CalculatedHeight = height;
        this.Margin.Left = pointerX ;
        this.Margin.Top = pointerY ;
        this.CornerRadius = new CornerRadius(1);
        this.DockPosition = dockPosition;
    }
}
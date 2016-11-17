import * as Jupiter from "./../Core";
import { Orientation } from "./../../DataTypes/Orientation";
import { UIElement } from "./../UIElement";
import { UIElementCollection } from "./../UIElementCollection";
import { Thickness } from "./../../DataTypes/Thickness";
import { CornerRadius } from "./../../DataTypes/CornerRadius";

export class ListView extends Jupiter.View {
    private _orientation: Orientation;
    private _content: UIElement = null;
    private _children: UIElementCollection;
    private _borderThickness: Thickness;
    private _borderBrush: string;
    private _cornerRadius: CornerRadius;

    get Orientation(): Orientation { return this._orientation; }
    get Content(): UIElement { return this._content; }
    get Children(): UIElementCollection { return this._children; }
    get BorderThickness(): Thickness { return this._borderThickness; }
    get BorderBrush(): string { return this._borderBrush; }
    get CornerRadius(): CornerRadius { return this._cornerRadius; }

    set Orientation(value: Orientation) { this._orientation = value; }
    set Content(value: UIElement) { this._content = value; }
    set Children(value: UIElementCollection) { this._children = value; }
    set BorderThickness(value: Thickness) { this._borderThickness = value; }
    set BorderBrush(value: string) { this._borderBrush = value; }
    set CornerRadius(value: CornerRadius) { this._cornerRadius = value; }

    constructor() {
        super();
        this._children = new UIElementCollection();
    }
}
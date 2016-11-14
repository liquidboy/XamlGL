import * as Jupiter from "./../Core";
import { Orientation } from "./../../DataTypes/Orientation";
import { UIElement } from "./../UIElement";
import { UIElementCollection } from "./../UIElementCollection";

export class ListView extends Jupiter.View {
    private _orientation: Orientation;
    private _content: UIElement = null;
    private _children: UIElementCollection;

    get Orientation(): Orientation { return this._orientation; }
    get Content(): UIElement { return this._content; }
    get Children(): UIElementCollection { return this._children; }

    set Orientation(value: Orientation) { this._orientation = value; }
    set Content(value: UIElement) { this._content = value; }
    set Children(value: UIElementCollection) { this._children = value; }

    constructor() {
        super();
        this._children = new UIElementCollection();
    }
}
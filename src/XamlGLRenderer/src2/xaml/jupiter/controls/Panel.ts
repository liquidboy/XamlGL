import { FrameworkElement } from "./../FrameworkElement";
import { UIElementCollection } from "./../UIElementCollection";
import { IChildrensElement } from "../IChildrensElement";

export class Panel extends FrameworkElement implements IChildrensElement {

    private _children: UIElementCollection;
    private _background: string;
    private _foreground: string;
    private _offsetX: number = 0;
    private _offsetY: number = 0;

    get Children(): UIElementCollection { return this._children; }
    get Background(): string { return this._background; }
    get Foreground(): string { return this._foreground; }
    get OffsetX(): number { return this._offsetX; }
    get OffsetY(): number { return this._offsetY; }

    set Children(value: UIElementCollection) { this._children = value; }
    set Background(value: string) { this._background = value; }
    set Foreground(value: string) { this._foreground = value; }
    set OffsetX(value: number) { this._offsetX = value; }
    set OffsetY(value: number) { this._offsetY = value; }

    constructor() {
        super();
        this._children = new UIElementCollection();
    }
}
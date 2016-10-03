import { FrameworkElement } from "./../Jupiter/FrameworkElement";
import { UIElementCollection } from "./../Jupiter/UIElementCollection";
export class Panel extends FrameworkElement {
    private _children: UIElementCollection;
    private _background: string;

    get Children(): UIElementCollection { return this._children; }
    get Background(): string { return this._background; }

    set Children(value: UIElementCollection) { this._children = value; }
    set Background(value: string) { this._background = value; }

    constructor() {
        super();
        this._children = new UIElementCollection();
    }
}
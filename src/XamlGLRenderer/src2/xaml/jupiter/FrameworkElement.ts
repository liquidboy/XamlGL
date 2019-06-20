import { UIElement } from "./UIElement";
import { IFrameworkElement } from "./IFrameworkElement";

export class FrameworkElement extends UIElement implements IFrameworkElement {
    private _width: number;
    private _height: number;
    
    private _parent: FrameworkElement;
    
    get Width(): number { return this._width; }
    get Height(): number { return this._height; }
    get Parent(): FrameworkElement { return this._parent; }

    set Width(value: number) { this._width = value; }
    set Height(value: number) { this._height = value; }
    
    set Parent(value: FrameworkElement) { this._parent = value; }
    
    constructor() {
        super();
    }
}
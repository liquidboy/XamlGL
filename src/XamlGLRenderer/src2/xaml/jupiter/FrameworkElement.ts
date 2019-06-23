import { UIElement } from "./UIElement";
import { IFrameworkElement } from "./IFrameworkElement";

export class FrameworkElement extends UIElement implements IFrameworkElement {
    private _width: number;
    private _height: number;

    get Width(): number { return this._width; }
    get Height(): number { return this._height; }
    
    set Width(value: number) { this._width = value; }
    set Height(value: number) { this._height = value; }

    constructor() {
        super();
    }
}

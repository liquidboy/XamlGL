import { DependencyObject } from "./DependencyObject";
import { IUIElement } from "./IUIElement";

export class UIElement extends DependencyObject implements IUIElement {

    private _isVisible: boolean;

    get IsVisible(): boolean { return this._isVisible; }

    set IsVisible(value: boolean) { this._isVisible = value; }

    // constructor() { }
}


// in xamarin.forms this is a  "Element"
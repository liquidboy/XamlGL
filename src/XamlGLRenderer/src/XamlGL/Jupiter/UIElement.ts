import { DependencyObject } from "./DependencyObject";
import { IUIElement } from "./IUIElement";
import { IPlatform } from "./Platform/IPlatform";

export class UIElement extends DependencyObject implements IUIElement {

    private _isVisible: boolean;
    private _platform: IPlatform;

    get IsVisible(): boolean { return this._isVisible; }
    get Platform(): IPlatform { return this._platform; }

    set IsVisible(value: boolean) { this._isVisible = value; }
    set Platform(value: IPlatform) { this._platform = value; }

    // constructor() { }
}


// in xamarin.forms this is a  "Element"
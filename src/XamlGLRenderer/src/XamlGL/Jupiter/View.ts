import { FrameworkElement } from "./FrameworkElement";
import { IView } from "./IView";
// import { Thickness } from "./../DataTypes/Thickness";
// import { HorizontalAlignment } from "./../DataTypes/HorizontalAlignment";
// import { VerticalAlignment } from "./../DataTypes/VerticalAlignment";


export class View extends FrameworkElement implements IView {
    private _background: string;
    private _backgroundAlpha: number = 1;

    get Background(): string { return this._background; }
    get BackgroundAlpha(): number { return this._backgroundAlpha; }

    set Background(value: string) { this._background = value; }
    set BackgroundAlpha(value: number) { this._backgroundAlpha = value; }
}

// xamarin introduced this layer, otherwise in the UWP world a control would implement directly the 
// frameworkElement. So in the xamarin world View + VisualElement ~= FrameworkElement
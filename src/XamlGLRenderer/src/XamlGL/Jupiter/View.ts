import { FrameworkElement } from "./FrameworkElement";
import { IView, HorizontalAlignment, VerticalAlignment } from "./IView";
import { Thickness } from "./../DataTypes/Thickness";


export class View extends FrameworkElement implements IView {

    private _horizontalAlignment: HorizontalAlignment;
    private _verticalAlignment: VerticalAlignment;
    private _margin: Thickness;

    get HorizontalAlignment(): HorizontalAlignment { return this._horizontalAlignment; }
    get VerticalAlignment(): VerticalAlignment { return this._verticalAlignment; }
    get Margin(): Thickness { return this._margin; }

    set HorizontalAlignment(value: HorizontalAlignment) { this._horizontalAlignment = value; }
    set VerticalAlignment(value: VerticalAlignment) { this._verticalAlignment = value; }
    set Margin(value: Thickness) { this._margin = value; }
}

// xamarin introduced this layer, otherwise in the UWP world a control would implement directly the 
// frameworkElement. So in the xamarin world View + VisualElement ~= FrameworkElement
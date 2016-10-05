import { FrameworkElement } from "./FrameworkElement";
import { IView } from "./IView";
// import { Thickness } from "./../DataTypes/Thickness";
// import { HorizontalAlignment } from "./../DataTypes/HorizontalAlignment";
// import { VerticalAlignment } from "./../DataTypes/VerticalAlignment";


export class View extends FrameworkElement implements IView {

}

// xamarin introduced this layer, otherwise in the UWP world a control would implement directly the 
// frameworkElement. So in the xamarin world View + VisualElement ~= FrameworkElement
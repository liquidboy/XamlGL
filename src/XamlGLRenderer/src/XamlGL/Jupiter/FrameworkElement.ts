import { UIElement } from "./UIElement";
import { IFrameworkElement } from "./IFrameworkElement";

export class FrameworkElement extends UIElement implements IFrameworkElement {

}

// in xamarin.forms this is "VisualElement" (thou it can be confusing because Xamarin also introduced a 
// "View" that is higher than VE and is what sits behind a UI control 
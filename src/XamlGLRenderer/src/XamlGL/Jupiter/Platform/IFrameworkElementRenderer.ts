import { FrameworkElement } from "./../FrameworkElement";
import { IEventArgs } from "./../../Events/IEventArgs";
import { IEvent } from "./../../Events/IEvent";
export interface IFrameworkElementRenderer {
    Element: FrameworkElement;
    ElementChanged: IEvent<IFrameworkElementRenderer, IEventArgs>;
}

export class VisualElementChangedEventArgs implements IEventArgs {
    constructor(public OldElement: FrameworkElement, public NewElement: FrameworkElement) { }
}
import { IRenderer } from "./IRenderer";
import { FrameworkElement } from "./../FrameworkElement";
import { IEventArgs } from "./../../Events/IEventArgs";
import { IEvent } from "./../../Events/IEvent";

export interface IControlRenderer {
    GodRenderer: IRenderer;

    Element: FrameworkElement;
    ElementChanged: IEvent<IControlRenderer, IEventArgs>;
}
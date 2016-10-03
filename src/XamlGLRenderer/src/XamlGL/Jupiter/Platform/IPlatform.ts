import { IRenderer } from "./IRenderer";
import { IUIElement } from "./../IUIElement";
import { IFrameworkElementRenderer } from "./IFrameworkElementRenderer";
import { IFrameworkElement } from "./../IFrameworkElement";

export interface IPlatform {
    Renderer: IRenderer;

    SetCurrent(content: IUIElement): void;
    CreateControlRenderer(element: IFrameworkElement): IFrameworkElementRenderer;
}
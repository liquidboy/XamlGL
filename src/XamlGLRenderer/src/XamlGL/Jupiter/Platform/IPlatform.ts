import { IRenderer } from "./IRenderer";
// import { IUIElement } from "./../IUIElement";
import { IControlRenderer } from "./IControlRenderer";
import { IFrameworkElement } from "./../IFrameworkElement";
import { FrameworkElement } from "./../FrameworkElement";

export interface IPlatform {
    Renderer: IRenderer;

    Draw(): void;
    SetCurrent(content: FrameworkElement): void;
    CreateControlRenderer(element: IFrameworkElement): IControlRenderer;
}
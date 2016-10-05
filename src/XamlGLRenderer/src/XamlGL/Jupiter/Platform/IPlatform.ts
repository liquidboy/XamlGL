import { IRenderer } from "./IRenderer";
// import { IUIElement } from "./../IUIElement";
import { IControlRenderer } from "./IControlRenderer";
import { IFrameworkElement } from "./../IFrameworkElement";
import { FrameworkElement } from "./../FrameworkElement";

export interface IPlatform {
    Renderer: IRenderer;

    DrawAll(content: FrameworkElement): void;
    Draw(content: IFrameworkElement): void;
    SetCurrent(content: FrameworkElement): void;
    CreateControlRenderer(element: IFrameworkElement): IControlRenderer;
}
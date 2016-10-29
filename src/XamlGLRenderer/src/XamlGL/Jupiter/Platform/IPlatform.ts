import { IRenderer } from "./IRenderer";
// import { IUIElement } from "./../IUIElement";
import { IControlRenderer } from "./IControlRenderer";
import { IFrameworkElement } from "./../IFrameworkElement";
import { FrameworkElement } from "./../FrameworkElement";

export interface IPlatform {
    Renderer: IRenderer;

    InitAll(content: FrameworkElement): void;
    DrawAll(content: FrameworkElement): void;
    Draw(content: IFrameworkElement): void;
    SetCurrent(content: FrameworkElement, parent: IFrameworkElement): void;
    UnsetCurrent(content: FrameworkElement, parent: FrameworkElement): void;
    CreateControlRenderer(element: IFrameworkElement): IControlRenderer;
}
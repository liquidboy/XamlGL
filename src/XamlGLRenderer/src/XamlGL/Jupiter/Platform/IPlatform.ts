import { IRendererBase } from "./IRendererBase";
// import { IUIElement } from "./../IUIElement";
import { IControlRenderer } from "./IControlRenderer";
import { IFrameworkElement } from "./../IFrameworkElement";
import { FrameworkElement } from "./../FrameworkElement";

export interface IPlatform {
    Renderer: IRendererBase;

    InitializeResources(content: FrameworkElement): void;
    LoadDynamicControl(content: IFrameworkElement): void;
    SetCurrent(content: FrameworkElement, parent: IFrameworkElement): void;
    UnsetCurrent(content: FrameworkElement, parent: FrameworkElement): void;
    CreateControlRenderer(element: IFrameworkElement): IControlRenderer;
}
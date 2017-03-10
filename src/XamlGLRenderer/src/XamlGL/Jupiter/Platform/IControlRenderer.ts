// import { IRenderer } from "./IRenderer";
import { FrameworkElement } from "./../FrameworkElement";
import { IEventArgs } from "./../../Events/IEventArgs";
import { IRendererBase } from "./../../Jupiter/Platform/IRendererBase";
import { IEvent } from "./../../Events/IEvent";

export interface IControlRenderer {
    Element: FrameworkElement;
    ElementChanged: IEvent<IControlRenderer, IEventArgs>;
    InitializeResources(): void;
    Draw(r: IRendererBase, args: IEventArgs): void;
    RefreshUI(): void;
    Clear(): void;
    ParentHeight: number;
    ParentWidth: number;
    PixiElement: PIXI.DisplayObject;
    Scale: number;
}
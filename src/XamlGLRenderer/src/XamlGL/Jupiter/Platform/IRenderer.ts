/// <reference path="../../../../typings/globals/pixi.js/index.d.ts" />
import { IEventArgs } from "./../../Events/IEventArgs";
import { IEvent } from "./../../Events/IEvent";

export interface IRenderer {
    UniqueID: string;
    PixiStage: PIXI.Container;
    PixiRenderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    Pointer: any;
    Border: string;
    BackgroundColor: number;

    ShowLoading(): void;
    HideLoading(): void;
    // loadResourceImage(url: string): PIXI.loaders.Loader;
    ShowResource(key: string, container: PIXI.Container, x: number, y: number, width: number, height: number): void;
    HideResource(key: string, container: PIXI.Container): void;
    InitializeLoadingResource(url: string): PIXI.loaders.Loader;
    InitializeResource(key: string, url: string): PIXI.loaders.Loader;
    Resize(width: number, height: number): void;
    ResizeFull(): void;
    Draw: IEvent<IRenderer, IEventArgs>;
}
import { IEventArgs } from "../../../Events/IEventArgs";
import { IEvent } from "../../../Events/IEvent";
import { IRendererBase } from "../IRendererBase";

export interface IRenderer extends IRendererBase {

    PixiStage: PIXI.Container;
    PixiRenderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    LoadResource(key: string, container: PIXI.Container, x: number, y: number, width: number, height: number): void;
    ShowResource(key: string, container: PIXI.Container, x: number, y: number, width: number, height: number): void;
    HideResource(key: string, container: PIXI.Container): void;
    InitializeLoadingResource(url: string): PIXI.loaders.Loader;
    InitializeResource(key: string, url: string): PIXI.loaders.Loader;
}

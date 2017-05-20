import { IEventArgs } from "../../../Events/IEventArgs";
import { IEvent } from "../../../Events/IEvent";
import { IRendererBase } from "../IRendererBase";

export interface IRenderer extends IRendererBase {

    PixiStage: HTMLElement;
    PixiRenderer: any;
    LoadResource(key: string, container: HTMLElement, x: number, y: number, width: number, height: number): void;
    ShowResource(key: string, container: HTMLElement, x: number, y: number, width: number, height: number): void;
    HideResource(key: string, container: HTMLElement): void;
    InitializeLoadingResource(url: string): any;
    InitializeResource(key: string, url: string): any;
}

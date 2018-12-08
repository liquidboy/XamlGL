import { IEventArgs } from "./../../Events/IEventArgs";
import { IEvent } from "./../../Events/IEvent";

export interface IRendererBase {
    UniqueID: string;
    Pointer: any;
    Border: string;
    BackgroundColor: number;
    ShowLoading(): void;
    HideLoading(): void;
    Resize(width: number, height: number): void;
    ResizeFull(): void;
    ResizeFullWidth(height:number): void;
    Draw: IEvent<IRendererBase, IEventArgs>;
    Key: IEvent<IRendererBase, IEventArgs>;
    PointerPressed: IEvent<IRendererBase, IEventArgs>;
    PointerReleased: IEvent<IRendererBase, IEventArgs>;
    PointerTapped: IEvent<IRendererBase, IEventArgs>;
    Clear(): void;



    PixiStage: any;
    PixiRenderer: any;
    LoadResource(key: string, container: any, x: number, y: number, width: number, height: number): void;
    ShowResource(key: string, container: any, x: number, y: number, width: number, height: number): void;
    HideResource(key: string, container: any): void;
    InitializeLoadingResource(url: string): any;
    InitializeResource(key: string, url: string): any;
}

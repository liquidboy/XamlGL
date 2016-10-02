/// <reference path="../../../../typings/globals/pixi.js/index.d.ts" />

export interface IRenderer {
    UniqueID: string;
    PixiStage: PIXI.Container;
    PixiRenderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    Border: string;
    BackgroundColor: number;

    LoadingAnimation(): void;
    LoadAppDomain(): void;
    Resize(width: number, height: number): void;
    ResizeFull(): void;
}
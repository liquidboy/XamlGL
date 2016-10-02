/// <reference path="../../../../typings/globals/pixi.js/index.d.ts" />

export interface IRenderer {
    UniqueID: string;
    PixiStage: PIXI.Container;
    PixiRenderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

    LoadingAnimation(): void;
    LoadAppDomain(): void;
}
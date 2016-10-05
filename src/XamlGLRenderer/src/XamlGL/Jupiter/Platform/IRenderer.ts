﻿/// <reference path="../../../../typings/globals/pixi.js/index.d.ts" />

export interface IRenderer {
    UniqueID: string;
    PixiStage: PIXI.Container;
    PixiRenderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    Border: string;
    BackgroundColor: number;

    ShowLoading(x: number, y: number, width: number, height: number): void;
    HideLoading(): void;
    LoadResourceImage(url: string): PIXI.loaders.Loader;
    InitializeLoadingResource(url: string): PIXI.loaders.Loader;
    Resize(width: number, height: number): void;
    ResizeFull(): void;
}
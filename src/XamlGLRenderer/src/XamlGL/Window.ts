/// <reference path="../../typings/globals/pixi.js/index.d.ts" />

import { Renderer } from "./Renderer";
import { VisualTree } from "./VisualTree";

export class Window {

    private _renderer: Renderer;
    get Renderer(): Renderer { return this._renderer; }

    private _visualTree: VisualTree;


    constructor(width: number, height: number, antialias: boolean, transparent: boolean) {
        this._renderer = new Renderer(width, height, antialias, transparent);

        this.InitializeShell();
        this.InitializeVisualTree();
    }

    private InitializeShell(): void {
        this._renderer.PixiRenderer.view.style.border = "1px solid lightgray";
        this._renderer.PixiRenderer.backgroundColor = 0xf9f9f9;
    }

    private InitializeVisualTree(): void {
        this._visualTree = new VisualTree();
    }


    public Resize(w: number, h: number): void {
        this._renderer.PixiRenderer.autoResize = true;
        this._renderer.PixiRenderer.resize(w, h);
    }

    public ResizeFullWindow(): void {
        this._renderer.PixiRenderer.view.style.position = "absolute";
        this._renderer.PixiRenderer.view.style.display = "block";
        this._renderer.PixiRenderer.view.style.border = "0";
        this._renderer.PixiRenderer.autoResize = true;
        this._renderer.PixiRenderer.resize(window.innerWidth, window.innerHeight);
    }


    set IsLoading(value: boolean) {
        if (value) {
            PIXI.loader
                .add("assets/silverlight_anims.jpg")
                .load(this.Renderer.LoadingAnimation.bind(this.Renderer))
                .load(this.Renderer.LoadAppDomain);

            // this._window.ResizeFullWindow();
        }
    }

}

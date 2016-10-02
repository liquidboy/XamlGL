/// <reference path="../../../../typings/globals/pixi.js/index.d.ts" />

import { Guid } from "./../../DataTypes/Guid";
import { IRenderer } from "./IRenderer";
import { Dictionary } from "../../../Libs/typescript-collections/src/lib/index";

export class Renderer implements IRenderer {

    private _uniqueId: string;
    private _stage: PIXI.Container;
    private _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    private _resourceIds: Dictionary<string, string>;

    get UniqueID(): string { return this.UniqueID; }
    get PixiStage(): PIXI.Container { return this._stage; }
    get PixiRenderer(): PIXI.WebGLRenderer | PIXI.CanvasRenderer { return this._renderer; }

    set Border(value: string) { this.PixiRenderer.view.style.border = value; }
    set BackgroundColor(value: number) { this.PixiRenderer.backgroundColor = value; }

    constructor(width: number, height: number, antialias: boolean, transparent: boolean, htmlCanvasHost: JQuery) {
        this._uniqueId = Guid.newGuid();
        this._resourceIds = new Dictionary<string, string>();
        this._stage = new PIXI.Container();
        this._renderer = RendererFactory.GetRenderer(width, height, antialias, transparent);

        htmlCanvasHost.append(this.PixiRenderer.view);
    }

    public Resize(width: number, height: number): void {
        this.PixiRenderer.autoResize = true;
        this.PixiRenderer.resize(width, height);
    }

    public ResizeFull(): void {
        this.PixiRenderer.view.style.position = "absolute";
        this.PixiRenderer.view.style.display = "block";
        this.PixiRenderer.view.style.border = "0";
        this.Resize(window.innerWidth, window.innerHeight);
    }

    public ShowLoading(): void {
        let resourceId: string = this._resourceIds.getValue("loading");
        let rect: PIXI.Rectangle = new PIXI.Rectangle(0, 0, 165, 165);
        let texture: PIXI.Texture = PIXI.loader.resources[resourceId].texture;
        texture.frame = rect;
        let blueDots: PIXI.Sprite = new PIXI.Sprite(texture);
        blueDots.x = 170;
        blueDots.y = 170;
        this._stage.addChild(blueDots);
        this._renderer.render(this._stage);
    }

    public InitializeLoadingResource(url: string): PIXI.loaders.Loader {
        this._resourceIds.setValue("loading", url);
        return this.LoadResourceImage(url);
    }
    public LoadResourceImage(url: string): PIXI.loaders.Loader {
        return PIXI.loader.add(url);
    }
}


export class RendererFactory {

    private static _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

    public static GetRenderer(width: number, height: number, antialias: boolean, transparent: boolean)
        : PIXI.WebGLRenderer | PIXI.CanvasRenderer {

        this._renderer = PIXI.autoDetectRenderer(
            width,
            height,
            {
                antialias: antialias,
                transparent: transparent,
                resolution: 1
            }
        );

        return this._renderer;
    }
}
/// <reference path="../../../../typings/globals/pixi.js/index.d.ts" />

import { Guid } from "./../../DataTypes/Guid";
import { IRenderer } from "./IRenderer";
import { Dictionary } from "../../../Libs/typescript-collections/src/lib/index";

export class Renderer implements IRenderer {

    private _uniqueId: string;
    private _stage: PIXI.Container;
    private _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    private _resourceIds: Dictionary<string, RendererResource>;

    get UniqueID(): string { return this.UniqueID; }
    get PixiStage(): PIXI.Container { return this._stage; }
    get PixiRenderer(): PIXI.WebGLRenderer | PIXI.CanvasRenderer { return this._renderer; }

    set Border(value: string) { this.PixiRenderer.view.style.border = value; }
    set BackgroundColor(value: number) { this.PixiRenderer.backgroundColor = value; }

    constructor(width: number, height: number, antialias: boolean, transparent: boolean, htmlCanvasHost: JQuery) {
        this._uniqueId = Guid.newGuid();
        this._resourceIds = new Dictionary<string, RendererResource>();
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

    public ShowLoading(x: number, y: number, width: number, height: number): void {
        let resource: RendererResource = this._resourceIds.getValue("loading");
        if (resource.Sprite === null) {
            let resourceId: string = resource.Url;
            let rect: PIXI.Rectangle = new PIXI.Rectangle(0, 0, width, height);
            let texture: PIXI.Texture = PIXI.loader.resources[resourceId].texture;
            texture.frame = rect;
            resource.Sprite = new PIXI.Sprite(texture);
        }
        resource.Sprite.x = x;
        resource.Sprite.y = y;
        this._stage.addChild(resource.Sprite);
        this._renderer.render(this._stage);
    }

    public HideLoading(): void {
        let resource: RendererResource = this._resourceIds.getValue("loading");
        if (resource.Sprite !== null) {
            this._stage.removeChild(resource.Sprite);
            this._renderer.render(this._stage);
        }
    }

    public InitializeLoadingResource(url: string): PIXI.loaders.Loader {
        this._resourceIds.setValue("loading", new RendererResource(url));
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

export class RendererResource {
    Sprite: PIXI.Sprite = null;

    constructor(public Url: string) { }
}
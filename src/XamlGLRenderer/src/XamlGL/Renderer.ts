/// <reference path="../../typings/globals/pixi.js/index.d.ts" />

import { Guid } from "./DataTypes/Guid";

export class Renderer {

    private _uniqueId: string;
    private _stage: PIXI.Container;
    private _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    
    get UniqueID(): string { return this.UniqueID; }
    get PixiStage(): PIXI.Container { return this._stage; }
    get PixiRenderer(): PIXI.WebGLRenderer | PIXI.CanvasRenderer { return this._renderer; }
    
    constructor(width: number, height: number, antialias: boolean, transparent: boolean) {
        this._uniqueId = Guid.newGuid();
        this._stage = new PIXI.Container();
        this._renderer = RendererFactory.GetRenderer(width, height, antialias, transparent);
    }

    public LoadingAnimation(): void {
        let rect: PIXI.Rectangle = new PIXI.Rectangle(0, 0, 165, 165);
        let texture: PIXI.Texture = PIXI.loader.resources["assets/silverlight_anims.jpg"].texture;
        texture.frame = rect;
        let blueDots: PIXI.Sprite = new PIXI.Sprite(texture);
        blueDots.x = 170;
        blueDots.y = 170;
        this._stage.addChild(blueDots);
        this._renderer.render(this._stage);
    }

    public LoadAppDomain(): void {
        // todo : fill
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
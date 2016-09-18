/// <reference path="../../typings/globals/pixi.js/index.d.ts" />

import { ViewManager } from "./ViewManager"

export class Renderer {

    private _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    private _stage: PIXI.Container;

    constructor() {

    }

    public Start(): void {
        console.log(PIXI); // todo : remove and find a better way for debugging stuff
        
        ViewManager.RenderView("pixi-home", PIXI, (jqView: JQuery) => {    
            this.InitPixi(jqView.find(".pixi-canvas"));
        });
    }

    public InitPixi(pixiHostElement: JQuery) {
        this._stage = new PIXI.Container();
        this._renderer = PIXI.autoDetectRenderer(
            512,
            512,
            {
                antialias: false,
                transparent: false,
                resolution: 1
            }
        );

        this._renderer.view.style.border = "1px solid lightgray";
        this._renderer.backgroundColor = 0xf9f9f9;

        pixiHostElement.append(this._renderer.view);
        
        PIXI.loader
            .add("assets/silverlight_anims.jpg")
            .load(this.LoadingAnimation.bind(this))
            .load(this.LoadAppDomain);
    }

    public Resize(w: number, h: number) {
        this._renderer.autoResize = true;
        this._renderer.resize(w, h);
    }

    public LoadingAnimation(): void{
        let rect = new PIXI.Rectangle(0, 0, 165, 165);
        let texture = PIXI.loader.resources["assets/silverlight_anims.jpg"].texture;
        texture.frame = rect;
        let blueDots = new PIXI.Sprite(texture);
        blueDots.x = 170;
        blueDots.y = 170;
        this._stage.addChild(blueDots);
        this._renderer.render(this._stage);
    }

    public LoadAppDomain(): void { }
}

/// <reference path="../../typings/globals/pixi.js/index.d.ts" />

import { ViewManager } from "./ViewManager"

export class Renderer {

    private _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

    constructor() {

    }

    public Start(): void {
        console.log(PIXI); // todo : remove and find a better way for debugging stuff
        
        ViewManager.RenderView("pixi-home", PIXI, (jqView: JQuery) => {    
            this.InitPixi(jqView.find(".pixi-canvas"));
        });
    }

    public InitPixi(pixiHostElement: JQuery) {
        this._renderer = PIXI.autoDetectRenderer(
            512,
            512,
            {
                antialias: false,
                transparent: true,
                resolution: 1
            });

        this._renderer.view.style.border = "1px solid whitesmoke";

        pixiHostElement.append(this._renderer.view);

        let stage = new PIXI.Container();

        this._renderer.render(stage);
    }

    public Resize(w: number, h: number) {
        this._renderer.autoResize = true;
        this._renderer.resize(w, h);
    }
}

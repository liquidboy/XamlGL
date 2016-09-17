/// <reference path="../../typings/globals/pixi.js/index.d.ts" />

import { ViewManager } from "./ViewManager"

export class Renderer {

    constructor() {

    }

    public Start(): void {
        console.log(PIXI); // todo : remove and find a better way for debugging stuff
        
        ViewManager.RenderView("pixi-home", PIXI, (jqView: JQuery) => {    
            let renderer = PIXI.autoDetectRenderer(500, 500);
            jqView.find(".pixi-canvas").append(renderer.view);
            let stage = new PIXI.Container();
            renderer.render(stage);
        });
        


    }
}

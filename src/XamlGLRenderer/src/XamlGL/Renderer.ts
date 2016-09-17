/// <reference path="../../typings/globals/pixi.js/index.d.ts" />
/// <reference path="../../typings/globals/jquery/index.d.ts" />
/// <reference path="../../typings/globals/rivets/index.d.ts" />

import { ViewManager } from "./ViewManager"

export class Renderer {

    constructor() {

    }

    public Start(): void {
        console.log(PIXI); // todo : remove and find a better way for debugging stuff

        ViewManager.RenderView("pixi-home", PIXI);
    }
}

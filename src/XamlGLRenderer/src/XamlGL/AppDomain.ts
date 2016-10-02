/// <reference path="../../typings/globals/pixi.js/index.d.ts" />

import { Window } from "./Jupiter/Window";
import { ViewManager } from "./ViewManager";

export class AppDomain {

    private _window: Window;

    public Start(): void {
        console.log(PIXI); // todo : remove and find a better way for debugging stuff

        ViewManager.RenderView("pixi-home", PIXI, (jqView: JQuery) => {
            this.InitPixi(jqView.find(".pixi-canvas"));
        });
    }

    private InitPixi(pixiHostElement: JQuery): void {
        this._window = new Window(512, 512, false, false);
        pixiHostElement.append(this._window.Platform.Renderer.PixiRenderer.view);
        this._window.IsLoading = true;
    }
}

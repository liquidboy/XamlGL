import { IPlatform } from "./../IPlatform";

import { Renderer } from "./Renderer";
// import { Page } from "./../../Page";

export class Platform implements IPlatform {

    private _renderer: Renderer;

    get Renderer(): Renderer { return this._renderer; }

    constructor(width: number, height: number, antialias: boolean, transparent: boolean, htmlCanvasHost: JQuery) {
        this._renderer = new Renderer(width, height, antialias, transparent, htmlCanvasHost);
    }
}
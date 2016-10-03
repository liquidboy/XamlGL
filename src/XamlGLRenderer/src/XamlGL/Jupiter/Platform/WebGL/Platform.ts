import { IPlatform } from "./../IPlatform";

import { Renderer } from "./Renderer";
import { IUIElement } from "./../../IUIElement";
import { IFrameworkElement } from "./../../IFrameworkElement";
import { IFrameworkElementRenderer } from "./../IFrameworkElementRenderer";
import { Grid } from "./../../../Controls/Grid";
import { Image } from "./../../../Controls/Image";
import { RendererHelper } from "./../../../utils/RendererHelper";

export class Platform implements IPlatform {

    private _godRenderer: Renderer;

    get Renderer(): Renderer { return this._godRenderer; }

    constructor(width: number, height: number, antialias: boolean, transparent: boolean, htmlCanvasHost: JQuery) {
        this._godRenderer = new Renderer(width, height, antialias, transparent, htmlCanvasHost);
        console.log("Platform:constructor");
    }

    public SetCurrent(content: IUIElement): void {
        console.log("Platform:SetCurrent");
        content.Platform = this;
    }

    public CreateControlRenderer(element: IFrameworkElement): IFrameworkElementRenderer {
        return RendererHelper.FrameworkElementToRenderer(element);
    }

}
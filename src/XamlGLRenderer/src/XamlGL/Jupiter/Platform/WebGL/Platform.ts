import { IPlatform } from "./../IPlatform";

import { Renderer } from "./Renderer";
// import { IUIElement } from "./../../IUIElement";
import { IFrameworkElement } from "./../../IFrameworkElement";
import { FrameworkElement } from "./../../FrameworkElement";
// import { IFrameworkElementRenderer } from "./../IFrameworkElementRenderer";
import { IControlRenderer } from "./../IControlRenderer";
// import { Grid } from "./../../../Controls/Grid";
// import { Image } from "./../../../Controls/Image";
import { RendererHelper } from "./../../../utils/RendererHelper";

export class Platform implements IPlatform {

    private _godRenderer: Renderer;

    get Renderer(): Renderer { return this._godRenderer; }

    constructor(width: number, height: number, antialias: boolean,
        transparent: boolean, htmlCanvasHost: JQuery) {
        this._godRenderer = new Renderer(width, height, antialias, transparent, htmlCanvasHost);
        console.log("Platform:constructor");
    }

    public SetCurrent(content: FrameworkElement): void {
        console.log("Platform:SetCurrent");
        content.Platform = this;

        let fe: IControlRenderer = this.CreateControlRenderer(content);
        fe.Element = content;
    }

    public CreateControlRenderer(element: IFrameworkElement): IControlRenderer {
        return RendererHelper.FrameworkElementToRenderer(element);
    }

}
import { IPlatform } from "./../IPlatform";

import { Renderer } from "./Renderer";
// import { IUIElement } from "./../../IUIElement";
import { IFrameworkElement } from "./../../IFrameworkElement";
import { FrameworkElement } from "./../../FrameworkElement";
import { IUIElement } from "./../../IUIElement";
// import { IFrameworkElementRenderer } from "./../IFrameworkElementRenderer";
import { IControlRenderer } from "./../IControlRenderer";
import { Panel } from "./../../../Controls/Panel";
// import { Image } from "./../../../Controls/Image";
import { RendererHelper } from "./../../../utils/RendererHelper";
import { ConsoleHelper } from "./../../../utils/ConsoleHelper";

export class Platform implements IPlatform {

    private _godRenderer: Renderer;


    get Renderer(): Renderer { return this._godRenderer; }

    constructor(width: number, height: number, antialias: boolean,
        transparent: boolean, htmlCanvasHost: JQuery) {
        this._godRenderer = new Renderer(width, height, antialias, transparent, htmlCanvasHost);
        ConsoleHelper.Log("Platform:constructor");
    }

    public SetCurrent(content: FrameworkElement, parent: FrameworkElement): void {
        // consoleHelper.LogSection("Platform:SetCurrent");

        content.Platform = this;
        content.Parent = parent;

        // process root
        let fe: IControlRenderer = this.CreateControlRenderer(content);
        fe.Element = content;

        // process each child and so on
        if (content instanceof Panel) {
            let panel: Panel = <Panel>content;
            // panel.Children.reverse(); // <==== xaml is rendered from bottom to top
            panel.Children.forEach((x: IUIElement) => {
                this.SetCurrent.call(this, x, content);
            });
        }

        // now draw layer
        // fe.Draw();
    }

    public DrawAll(content: FrameworkElement): void {
        // consoleHelper.LogSectionHeader("Platform:DrawAll");
        // console.log(content);
        content.Renderer.Draw();
        if (content instanceof Panel) {
            let panel: Panel = <Panel>content;
            // panel.Children.reverse(); // <==== xaml is rendered from bottom to top
            panel.Children.forEach((x: IUIElement) => {
                this.DrawAll(<FrameworkElement>x);
            });
        }
    }

    public Draw(content: IFrameworkElement): void {
        ConsoleHelper.LogSectionHeader("Platform:Draw");
        RendererHelper.DrawPanel(<Panel>content, false);
    }

    public CreateControlRenderer(element: IFrameworkElement): IControlRenderer {
        return RendererHelper.FrameworkElementToRenderer(element);
    }

}
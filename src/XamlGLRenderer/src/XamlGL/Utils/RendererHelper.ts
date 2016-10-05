import { IFrameworkElement } from "./../Jupiter/IFrameworkElement";
import { IUIElement } from "./../Jupiter/IUIElement";
import { IControlRenderer } from "./../Jupiter/Platform/IControlRenderer";
import { DefaultRenderer } from "./../Jupiter/Platform/WebGL/Controls/DefaultRenderer";

import { Grid } from "./../Controls/Grid";
import { GridRenderer } from "./../Jupiter/Platform/WebGL/Controls/GridRenderer";

import { Image } from "./../Controls/Image";
import { ImageRenderer } from "./../Jupiter/Platform/WebGL/Controls/ImageRenderer";

import { Rectangle } from "./../Controls/Rectangle";
import { RectangleRenderer } from "./../Jupiter/Platform/WebGL/Controls/RectangleRenderer";

import { Panel } from "./../Controls/Panel";
import { ConsoleHelper } from "./ConsoleHelper";

export class RendererHelper {
    public static FrameworkElementToRenderer(element: IFrameworkElement): IControlRenderer {
        if (element instanceof Grid) {
            return new GridRenderer();
        } else if (element instanceof Image) {
            return new ImageRenderer();
        } else if (element instanceof Rectangle) {
            return new RectangleRenderer();
        } else {
            return new DefaultRenderer();
        }
    }
    public static DrawPanel(panel: Panel): void {
        ConsoleHelper.Log("RendererHelper.DrawPanel");
        panel.Renderer.Draw();

        panel.Children.forEach((uielement: IUIElement) => {
            if (uielement instanceof Panel) {
                this.DrawPanel(uielement);
            } else {
                ConsoleHelper.Log("??");
            }
        });

        // todo : itterate panel and attem to render
    }
}
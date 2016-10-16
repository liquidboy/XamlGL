import { IFrameworkElement } from "./../Jupiter/IFrameworkElement";
import { IUIElement } from "./../Jupiter/IUIElement";
import { IControlRenderer } from "./../Jupiter/Platform/IControlRenderer";
import { DefaultRenderer } from "./../Jupiter/Platform/WebGL/Controls/DefaultRenderer";

import { Grid } from "./../Controls/Grid";
import { GridRenderer } from "./../Jupiter/Platform/WebGL/Controls/GridRenderer";

import { StackPanel } from "./../Controls/StackPanel";
import { StackPanelRenderer } from "./../Jupiter/Platform/WebGL/Controls/StackPanelRenderer";

import { Image } from "./../Controls/Image";
import { ImageRenderer } from "./../Jupiter/Platform/WebGL/Controls/ImageRenderer";

import { Rectangle } from "./../Controls/Rectangle";
import { RectangleRenderer } from "./../Jupiter/Platform/WebGL/Controls/RectangleRenderer";

import { Panel } from "./../Controls/Panel";
import { ConsoleHelper } from "./ConsoleHelper";

import { TextBlock } from "./../Controls/TextBlock";
import { TextBlockRenderer } from "./../Jupiter/Platform/WebGL/Controls/TextBlockRenderer";

import { Button } from "./../Controls/Button";
import { ButtonRenderer } from "./../Jupiter/Platform/WebGL/Controls/ButtonRenderer";

import { ToolTip } from "./../Controls/ToolTip";
import { ToolTipRenderer } from "./../Jupiter/Platform/WebGL/Controls/ToolTipRenderer";

import { Path } from "./../Controls/Path";
import { PathRenderer } from "./../Jupiter/Platform/WebGL/Controls/PathRenderer";

import { CheckBox } from "./../Controls/CheckBox";
import { CheckBoxRenderer } from "./../Jupiter/Platform/WebGL/Controls/CheckBoxRenderer";

export class RendererHelper {
    public static FrameworkElementToRenderer(element: IFrameworkElement): IControlRenderer {

        if (element instanceof Grid) {
            return new GridRenderer();
        } else if (element instanceof ToolTip) {
            return new ToolTipRenderer();
        } else if (element instanceof StackPanel) {
            return new StackPanelRenderer();
        } else if (element instanceof Image) {
            return new ImageRenderer();
        } else if (element instanceof Rectangle) {
            return new RectangleRenderer();
        } else if (element instanceof TextBlock) {
            return new TextBlockRenderer();
        } else if (element instanceof CheckBox) {
            return new CheckBoxRenderer();
        } else if (element instanceof Button) {
            return new ButtonRenderer();
        } else if (element instanceof Path) {
            return new PathRenderer();
        } else {
            return new DefaultRenderer();
        }
    }
    public static DrawPanel(panel: Panel, processChildren: boolean): void {
        ConsoleHelper.Log("RendererHelper.DrawPanel");
        panel.Renderer.Draw();

        if (processChildren) {
            panel.Children.forEach((uielement: IUIElement) => {
                if (uielement instanceof Panel) {
                    this.DrawPanel(uielement, processChildren);
                } else {
                    ConsoleHelper.Log("??");
                }
            });
        }

        // todo : itterate panel and attem to render
    }
    public static HashToColorNumber(hashedColor: string): any {
        // #FFC9006E
        return Number.parseInt("0x" + hashedColor.substring(3, 9));
    }
}
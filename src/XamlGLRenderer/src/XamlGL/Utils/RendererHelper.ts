import { IFrameworkElement } from "./../Jupiter/IFrameworkElement";
import { IControlRenderer } from "./../Jupiter/Platform/IControlRenderer";
import { DefaultRenderer } from "./../Jupiter/Platform/WebGL/Controls/DefaultRenderer";

import { Grid } from "./../Controls/Grid";
import { GridRenderer } from "./../Jupiter/Platform/WebGL/Controls/GridRenderer";

import { Image } from "./../Controls/Image";
import { ImageRenderer } from "./../Jupiter/Platform/WebGL/Controls/ImageRenderer";

import { Rectangle } from "./../Controls/Rectangle";
import { RectangleRenderer } from "./../Jupiter/Platform/WebGL/Controls/RectangleRenderer";

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
}
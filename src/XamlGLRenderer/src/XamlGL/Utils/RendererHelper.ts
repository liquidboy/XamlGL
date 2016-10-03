import { IFrameworkElement } from "./../Jupiter/IFrameworkElement";
import { IFrameworkElementRenderer } from "./../Jupiter/Platform/IFrameworkElementRenderer";
import { DefaultRenderer } from "./../Jupiter/Platform/WebGL/Controls/DefaultRenderer";

import { Grid } from "./../Controls/Grid";
import { GridRenderer } from "./../Jupiter/Platform/WebGL/Controls/GridRenderer";

import { Image } from "./../Controls/Image";
import { ImageRenderer } from "./../Jupiter/Platform/WebGL/Controls/ImageRenderer";

export class RendererHelper {
    public static FrameworkElementToRenderer(element: IFrameworkElement): IFrameworkElementRenderer {
        if (element instanceof Grid) {
            return new GridRenderer();
        }
        else if (element instanceof Image) {
            return new ImageRenderer();
        } else {
            return new DefaultRenderer();
        }
    }
}
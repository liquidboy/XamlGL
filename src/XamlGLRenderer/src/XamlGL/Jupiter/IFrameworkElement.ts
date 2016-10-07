import { Thickness } from "./../DataTypes/Thickness";
import { HorizontalAlignment } from "./../DataTypes/HorizontalAlignment";
import { VerticalAlignment } from "./../DataTypes/VerticalAlignment";
import { IControlRenderer } from "./Platform/IControlRenderer";

export interface IFrameworkElement {
    Width: number;
    Height: number;
    Parent: IFrameworkElement;
    Margin: Thickness;
    Renderer: IControlRenderer;
    HorizontalAlignment: HorizontalAlignment;
    VerticalAlignment: VerticalAlignment;
    CalculatedX: number; // <- normally updated from a *renderer
    CalculatedY: number; // <- normally updated from a *renderer
    CalculatedWidth: number; // <- normally updated from a *renderer
    CalculatedHeight: number; // <- norma
}
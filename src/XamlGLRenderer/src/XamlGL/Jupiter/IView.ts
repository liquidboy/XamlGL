import { Thickness } from "./../DataTypes/Thickness";
import { HorizontalAlignment } from "./../DataTypes/HorizontalAlignment";
import { VerticalAlignment } from "./../DataTypes/VerticalAlignment";

export interface IView {
    HorizontalAlignment: HorizontalAlignment;
    VerticalAlignment: VerticalAlignment;
    Margin: Thickness;
}
import { Thickness } from "./../DataTypes/Thickness";
import { DockPosition } from "./../DataTypes/DockPosition";

export interface ITooltip {
    HasToolTip: boolean;
    TooltipDockPosition: DockPosition;
    IsTooltipVisible: boolean;
    TooltipMargin: Thickness;
    TooltipWidth: number;
    TooltipHeight: number;
    TooltipBackground: string;
    TooltipBorder: string;
}
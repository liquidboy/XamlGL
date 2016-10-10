import { IControlRenderer } from "./../../IControlRenderer";
import { GridRenderer } from "./GridRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { ToolTip } from "./../../../../Controls/ToolTip";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { RendererHelper } from "./../../../../utils/RendererHelper";
// import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
// import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";
import { IRenderer } from "./../../IRenderer";
import { IEventArgs } from "./../../../../Events/IEventArgs";
import { Point } from "./../../../../DataTypes/Point";

export class ToolTipRenderer extends GridRenderer implements IControlRenderer {
    Draw(): void {
        super.Draw();
        ConsoleHelper.Log("ToolTipRenderer.Draw");
        // console.log(super.Element);
        let toolTipEl: ToolTip = <ToolTip>super.Element;

        if (!toolTipEl.IsDirty) {
            return;
        }
        

        toolTipEl.IsDirty = false;
    }
}
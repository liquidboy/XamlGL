import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { CheckBox } from "./../../../../Controls/CheckBox";
// import { StackPanel } from "./../../../../Controls/StackPanel";
// import { PathGeometry } from "./../../../../Controls/PathGeometry";
// import { PathFigure } from "./../../../../Controls/PathFigure";
// import { LineSegment } from "./../../../../Controls/LineSegment";
// import { BezierSegment } from "./../../../../Controls/BezierSegment";
// import { QuadraticBezierSegment } from "./../../../../Controls/QuadraticBezierSegment";
// import { ArcSegment } from "./../../../../Controls/ArcSegment";
// import { RendererHelper } from "./../../../../utils/RendererHelper";
// import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
// import { FillRule } from "./../../../../DataTypes/FillRule";
// import { SweepDirection } from "./../../../../DataTypes/SweepDirection";
// import { Size } from "./../../../../DataTypes/Size";
// import { Orientation } from "./../../../../DataTypes/Orientation";
// import { IRenderer } from "./../../IRenderer";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { RendererHelper } from "./../../../../utils/RendererHelper";
// import { MiniPathLanguageHelper } from "./../../../../utils/MiniPathLanguageHelper";
// import { Point } from "./../../../../DataTypes/Point";

export class CheckBoxRenderer extends BaseRenderer implements IControlRenderer {
    Draw(): void {
        super.Draw();
        ConsoleHelper.Log("CheckBoxRenderer.Draw");

        let checkboxEl: CheckBox = <CheckBox>super.Element;
        // let parentContainer: PIXI.Container = <PIXI.Container>super.Element.Parent.Renderer.PixiElement;

        if (!checkboxEl.IsDirty) {
            return;
        }

        // calculate y position
        this.CalculateYHeight(checkboxEl);

        // calculate X position
        this.CalculateXWidth(checkboxEl);

        // take margin into account
        this.UpdateCalculatedValuesUsingMargin(checkboxEl);







        // determine starting SLOT if the parent is a PANEL that lays out its children
        // let parentXYStart: Point = this.CalculateCurrentAvailableSlot();







        // tell the parent stackpanel the next available slot
        this.IncrementNextAvailableSlot();

        checkboxEl.IsDirty = false;
    }

}


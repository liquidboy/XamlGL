import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { ListView } from "./../../../Controls/ListView";
// import { StackPanel } from "./../../../../Controls/StackPanel";
// import { RendererHelper } from "./../../../../utils/RendererHelper";
// import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
// import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";
// import { Orientation } from "./../../../../DataTypes/Orientation";
import { Point } from "./../../../../DataTypes/Point";
// import { TextWrapping } from "./../../../../DataTypes/TextWrapping";
// import { TextWrappingAlign } from "./../../../../DataTypes/TextWrappingAlign";
import { IRenderer } from "./../IRenderer";
import { IEventArgs } from "./../../../../Events/IEventArgs";

export class TimePickerRenderer extends BaseRenderer implements IControlRenderer {
    Draw(r: IRenderer, args: IEventArgs): void {
        super.Draw(r,args);
        // fill from Draw
    }
    InitializeResources(): void {
        super.InitializeResources();
        ConsoleHelper.Log("TimePickerRenderer.InitializeResources");

        let listViewEl: ListView = <ListView>super.Element;

        if (!listViewEl.IsDirty) {
            return;
        }

        let parentContainer: PIXI.Container = <PIXI.Container>super.Element.Parent.Renderer.PixiElement;

        // this.PixiElement = text;

        // calculate y position
        this.CalculateYHeight(listViewEl);

        // calculate X position
        this.CalculateXWidth(listViewEl);

        // take margin into account
        this.UpdateCalculatedValuesUsingMargin(listViewEl);

        // determine starting SLOT if the parent is a PANEL that lays out its children
        let parentXYStart: Point = this.CalculateCurrentAvailableSlot();






        // tell the parent stackpanel the next available slot
        this.IncrementNextAvailableSlot();



        listViewEl.IsDirty = false;
    }
    RefreshUI(): void {
        // todo : fill with actual pixi draw stuff that is idempotent
    }
    Clear(): void {
        ConsoleHelper.Log("TimePickerRenderer.Clear");

        let containerMain: PIXI.Container = null;
        let pc: PIXI.Container =  <PIXI.Container>this.Element.Parent.Renderer.PixiElement;

        if (this.PixiElement !== undefined) {
            containerMain = <PIXI.Container>this.PixiElement;
            // this.Element.Platform.Renderer.PixiStage.removeChild(containerMain);
            pc.removeChild(this.PixiElement);
            this.PixiElement = null;
        }
    }
}
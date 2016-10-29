import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
// import { Renderer } from "./../Renderer";
// import { IRenderer } from "./../../IRenderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
// import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";

export class DefaultRenderer extends BaseRenderer implements IControlRenderer {
    InitializeResources(): void {
        super.InitializeResources();
        // fill from Draw

    }
    Draw(): void {
        super.Draw();
        if (!this.Element.IsDirty && !this.IsAlwaysDirty) {
            return;
        }
        // consoleHelper.Log("DefaultRenderer.Draw");     

        this.Element.IsDirty = false;

    }
    RefreshUI(): void {
        // todo : fill with actual pixi draw stuff that is idempotent
    }
}
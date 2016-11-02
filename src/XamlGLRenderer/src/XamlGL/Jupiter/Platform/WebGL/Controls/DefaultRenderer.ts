import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";

export class DefaultRenderer extends BaseRenderer implements IControlRenderer {
    Draw(): void {
        super.Draw();
        // fill from Draw
    }
    InitializeResources(): void {
        super.InitializeResources();
        ConsoleHelper.Log("DefaultRenderer.InitializeResources");

        let defaultEl: FrameworkElement = <FrameworkElement>super.Element;

        if (!defaultEl.IsDirty) {
            return;
        }

        defaultEl.IsDirty = false;

    }
    RefreshUI(): void {
        // todo : fill with actual pixi draw stuff that is idempotent
    }
}
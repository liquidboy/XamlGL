import { IFrameworkElement } from "./../Jupiter/IFrameworkElement";
import { IUIElement } from "./../Jupiter/IUIElement";
import { IControlRenderer } from "./../Jupiter/Platform/IControlRenderer";
import { DefaultRenderer } from "./../Jupiter/Platform/WebGL/Controls/DefaultRenderer";
import { EventDispatcher } from "./../Events/EventDispatcher";
import { IEvent } from "./../Events/IEvent";
import { IEventArgs } from "./../Events/IEventArgs";
import { IRendererBase } from "./../Jupiter/Platform/IRendererBase";
import { KeyPressedEventArgs } from "./../Events/KeyPressedEventArgs";

import { Grid } from "./../Jupiter/Controls/Grid";
import { GridRenderer } from "./../Jupiter/Platform/WebGL/Controls/GridRenderer";

import { StackPanel } from "./../Jupiter/Controls/StackPanel";
import { StackPanelRenderer } from "./../Jupiter/Platform/WebGL/Controls/StackPanelRenderer";

import { Image } from "./../Jupiter/Controls/Image";
import { ImageRenderer } from "./../Jupiter/Platform/WebGL/Controls/ImageRenderer";

import { Rectangle } from "./../Jupiter/Controls/Rectangle";
import { RectangleRenderer } from "./../Jupiter/Platform/WebGL/Controls/RectangleRenderer";

import { Panel } from "./../Jupiter/Controls/Panel";
import { ConsoleHelper } from "./ConsoleHelper";

import { TextBlock } from "./../Jupiter/Controls/TextBlock";
import { TextBlockRenderer } from "./../Jupiter/Platform/WebGL/Controls/TextBlockRenderer";

import { TextBox } from "./../Jupiter/Controls/TextBox";
import { TextBoxRenderer } from "./../Jupiter/Platform/WebGL/Controls/TextBoxRenderer";

import { Button } from "./../Jupiter/Controls/Button";
import { ButtonRenderer } from "./../Jupiter/Platform/WebGL/Controls/ButtonRenderer";

import { ToolTip } from "./../Jupiter/Controls/ToolTip";
import { ToolTipRenderer } from "./../Jupiter/Platform/WebGL/Controls/ToolTipRenderer";

import { Path } from "./../Jupiter/Controls/Path";
import { PathRenderer } from "./../Jupiter/Platform/WebGL/Controls/PathRenderer";

import { CheckBox } from "./../Jupiter/Controls/CheckBox";
import { ToggleRenderer } from "./../Jupiter/Platform/WebGL/Controls/ToggleRenderer";

import { RadioButton } from "./../Jupiter/Controls/RadioButton";

import { ScrollBar } from "./../Jupiter/Controls/ScrollBar";
import { ScrollBarRenderer } from "./../Jupiter/Platform/WebGL/Controls/ScrollBarRenderer";

import { ListView } from "./../Jupiter/Controls/ListView";
import { ListViewRenderer } from "./../Jupiter/Platform/WebGL/Controls/ListViewRenderer";

import { DropdownList } from "./../Jupiter/Controls/DropdownList";
import { DropdownListRenderer } from "./../Jupiter/Platform/WebGL/Controls/DropdownListRenderer";

import { ScrollViewer } from "./../Jupiter/Controls/ScrollViewer";
import { ScrollViewerRenderer } from "./../Jupiter/Platform/WebGL/Controls/ScrollViewerRenderer";


declare var TinkLib: any;
declare var PIXI: any;

export class RendererHelper {
    // one draw for the entire APP
    private static _draw: EventDispatcher<RendererHelper, IEventArgs> = new EventDispatcher<RendererHelper, IEventArgs>();
    static get Draw(): IEvent<RendererHelper, IEventArgs> { return this._draw; }

    // one keyboard event for the entire APP
    private static _keyPressed: EventDispatcher<RendererHelper, IEventArgs> = new EventDispatcher<RendererHelper, IEventArgs>();
    static get KeyPressed(): IEvent<RendererHelper, IEventArgs> { return this._keyPressed; }

    public static TinkInstance: any = null; // one instance of Tink for the entire APP
    public static TinkPointer: any = null; // one pointer for the entire APP
    public static InitializeTink(pixiRendererView: any): void {
        console.log("RendererHelper.InitializeTink");
        if (this.TinkInstance === null) {
            this.TinkInstance = new TinkLib(PIXI, pixiRendererView);
            this.TinkPointer = this.TinkInstance.makePointer();
            this.TinkPointer.visible = true;
            this.RenderLoop();
            this.ListenToKeyboard();
        }
    }
    // one renderloop for the entire APP
    private static RenderLoop(): void {
        // console.log("RendererHelper.RenderLoop");
        this.TinkInstance.update();
        this._draw.dispatch(this, null);
        window.requestAnimationFrame(this.RenderLoop.bind(this));
    }
    // on keyboardloop for the entire APP
    private static ListenToKeyboard(): void {
        let key: any = {};
        key.code = null;

        key.downHandler = (event: any) => {

            let arg: KeyPressedEventArgs = new KeyPressedEventArgs();
            arg.KeyCode = event.keyCode;
            arg.Key = event.key;
            this._keyPressed.dispatch(null, arg);
            if (arg.Key === "Backspace" || arg.Key === "Home" || arg.Key === "End") {
                event.preventDefault();
            }
        };
        key.upHandler = (event: any) => {
            let arg: KeyPressedEventArgs = new KeyPressedEventArgs();
            arg.KeyCode = event.keyCode;
            arg.Key = event.key;
            // console.log(event);
            this._keyPressed.dispatch(null, arg);
            // event.preventDefault();
        };

        window.addEventListener(
            "keydown", key.downHandler.bind(key), false
         );
        // window.addEventListener(
        //    "keyup", key.upHandler.bind(key), false
        // );
    }

    private static _cursorToAutoTimer = 0;
    private static _currentCursor = "auto";
    public static SetCursorToAuto(r: IRendererBase): void {
        if (this._currentCursor === "auto") {
            clearTimeout(this._cursorToAutoTimer);
            return;
        }
        if (this._cursorToAutoTimer > 0) {
            return;
            // clearTimeout(this._cursorToAutoTimer);
        }
        // console.log("clear");
        this._cursorToAutoTimer = setTimeout(() => {
            this._currentCursor = r.Pointer.cursor = "auto"; this._cursorToAutoTimer = 0;
        }, 200);
    }
    public static SetCursorToPointer(r: IRendererBase): void {
        if (this._cursorToAutoTimer > 0) {
            clearTimeout(this._cursorToAutoTimer);
        }
        // console.log("auto");
        this._currentCursor = r.Pointer.cursor = "pointer";
        this._cursorToAutoTimer = 0;
    }

    public static FrameworkElementToRenderer(element: IFrameworkElement): IControlRenderer {

        if (element instanceof Grid) {
            return new GridRenderer();
        } else if (element instanceof ToolTip) {
            return new ToolTipRenderer();
        } else if (element instanceof StackPanel) {
            return new StackPanelRenderer();
        } else if (element instanceof Image) {
            return new ImageRenderer();
        } else if (element instanceof Rectangle) {
            return new RectangleRenderer();
        } else if (element instanceof TextBlock) {
            return new TextBlockRenderer();
        } else if (element instanceof TextBox) {
            return new TextBoxRenderer();
        } else if (element instanceof RadioButton) {
            return new ToggleRenderer();
        } else if (element instanceof CheckBox) {
            return new ToggleRenderer();
        } else if (element instanceof Button) {
            return new ButtonRenderer();
        } else if (element instanceof Path) {
            return new PathRenderer();
        } else if (element instanceof ScrollBar) {
            return new ScrollBarRenderer();
        } else if (element instanceof ListView) {
            return new ListViewRenderer();
        } else if (element instanceof DropdownList) {
            return new DropdownListRenderer();
        } else if (element instanceof ScrollViewer) {
            return new ScrollViewerRenderer();
        } else {
            return new DefaultRenderer();
        }
    }
    public static LoadDynamicControl(panel: Panel, processChildren: boolean): void {
        ConsoleHelper.Log("RendererHelper.LoadDynamicControl");
        panel.Renderer.InitializeResources(); // draw();

        if (processChildren) {
            panel.Children.forEach((uielement: IUIElement) => {
                if (uielement instanceof Panel) {
                    this.LoadDynamicControl(uielement, processChildren);
                } else {
                    ConsoleHelper.Log("??");
                }
            });
        }

        // todo : itterate panel and attem to render
     }
    public static HashToColorNumber(hashedColor: string): any {
        // #FFC9006E
        return Number.parseInt("0x" + hashedColor.substring(3, 9));
    }
}
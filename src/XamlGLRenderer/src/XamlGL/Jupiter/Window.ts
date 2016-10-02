import { VisualTree } from "./../VisualTree";
import { UIElement } from "./UIElement";
import { EventList } from "./../Events/EventList";
import { IEventArgs } from "./../Events/IEventArgs";
import { IEvent } from "./../Events/IEvent";
import { Platform } from "./../Jupiter/Platform/PlatformWebGL";
import { IPlatform } from "./../Jupiter/Platform/IPlatform";

export class Window {

    private _events: EventList<Window, WindowEventArgs> = new EventList<Window, WindowEventArgs>();
    private _content: UIElement;
    private _isVisible: boolean;
    private _visualTree: VisualTree;
    private _platform: IPlatform;

    get Content(): UIElement { return this._content; }
    get IsVisible(): boolean { return this._isVisible; }
    get Platform(): IPlatform { return this._platform; }

    get Activated(): IEvent<Window, WindowEventArgs> { return this._events.get("Activated"); }
    get Closed(): IEvent<Window, WindowEventArgs> { return this._events.get("Closed"); }
    get SizeChanged(): IEvent<Window, WindowEventArgs> { return this._events.get("SizeChanged"); }
    get VisibilityChanged(): IEvent<Window, WindowEventArgs> { return this._events.get("VisibilityChanged"); }


    constructor(width: number, height: number, antialias: boolean, transparent: boolean, htmlCanvasHost: JQuery) {

        this._platform = new Platform(width, height, antialias, transparent, htmlCanvasHost);

        this.InitializeShell();
        this.InitializeVisualTree();
    }

    private InitializeShell(): void {
        this.Platform.Renderer.Border = "1px solid lightgray";
        this.Platform.Renderer.BackgroundColor = 0xf9f9f9;
    }

    private InitializeVisualTree(): void {
        this._visualTree = new VisualTree();
    }

    public Resize(width: number, height: number): void {
        this.Platform.Renderer.Resize(width, height);
    }

    public ResizeFullWindow(): void {
        this.Platform.Renderer.ResizeFull();
    }


    set IsLoading(value: boolean) {
        if (value) {
            this.Platform.Renderer.InitializeLoadingResource("assets/silverlight_anims.jpg")
                .load(() => {
                    // this.Platform.Renderer.ResizeFull();
                    this.Platform.Renderer.ShowLoading(160,160,165,165);
                    this.Activate();

                    // setTimeout(() => {
                    //    this.Platform.Renderer.HideLoading();

                    //    setTimeout(() => {
                    //        this.Platform.Renderer.ShowLoading(20,20,165,165);
                    //    }, 3000);

                    // }, 3000);

                });

            // this.ResizeFullWindow();
        }
    }

    private dispatch(name: string): void {
        this._events.get(name).dispatch(this, new WindowEventArgs());
    }

    public Activate(): void { this.dispatch("Activated"); }
    public Close(): void { this.dispatch("Closed");  }
    public SetTitleBar(value: UIElement): void {
        // todo: window title  
    }

}

export class WindowEventArgs implements IEventArgs {
    // constructor() { }
}
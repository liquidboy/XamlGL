import { Page } from "./../../Page";
import { IPlatformPage } from "./../IPlatformPage";
import { Platform } from "./Platform";
import { IPlatform } from "./../IPlatform";
import { UIElement } from "./../../UIElement";
import { EventList } from "./../../../Events/EventList";
import { IEventArgs } from "./../../../Events/IEventArgs";
import { IEvent } from "./../../../Events/IEvent";


export class PlatformPage extends Page implements IPlatformPage {

    private _events: EventList<PlatformPage, WindowEventArgs> = new EventList<PlatformPage, WindowEventArgs>();
    private _content: UIElement;

    private _antialias: boolean;
    private _transparent: boolean;
    private _htmlCanvasHost: JQuery;

    get Content(): UIElement { return this._content; }


    set Content(value: UIElement) { this._content = value; }

    get Activated(): IEvent<PlatformPage, WindowEventArgs> { return this._events.get("Activated"); }
    get Closed(): IEvent<PlatformPage, WindowEventArgs> { return this._events.get("Closed"); }
    get SizeChanged(): IEvent<PlatformPage, WindowEventArgs> { return this._events.get("SizeChanged"); }
    get VisibilityChanged(): IEvent<PlatformPage, WindowEventArgs> { return this._events.get("VisibilityChanged"); }



    constructor(width: number,height: number, antialias: boolean, transparent: boolean, htmlCanvasHost: JQuery) {
        super();
        this.Width = width;
        this.Height = height;
        this._antialias = antialias;
        this._transparent = transparent;
        this._htmlCanvasHost = htmlCanvasHost;

        this.Platform = this.CreatePlatform();

        this.InitializeShell();
    }

    public CreatePlatform(): IPlatform {
        return new Platform(this.Width, this.Height, this._antialias,
            this._transparent, this._htmlCanvasHost);
    }

    private InitializeShell(): void {
        this.Platform.Renderer.Border = "1px solid lightgray";
        this.Platform.Renderer.BackgroundColor = 0xf9f9f9;
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
                    this.Platform.Renderer.ShowLoading(160, 160, 165, 165);
                    this.Activate();
                });
        } else {
            this.Platform.Renderer.HideLoading();
        }
    }

    private dispatch(name: string): void {
        this._events.get(name).dispatch(this, new WindowEventArgs());
    }

    public Activate(): void { this.dispatch("Activated"); }
    public Close(): void { this.dispatch("Closed"); }
    public SetTitleBar(value: UIElement): void {
        // todo: window title  
    }
}

export class WindowEventArgs implements IEventArgs {
    // constructor() { }
}
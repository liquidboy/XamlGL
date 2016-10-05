import { Page } from "./../../Page";
import { IPlatformPage } from "./../IPlatformPage";
import { Platform } from "./Platform";
import { IPlatform } from "./../IPlatform";
import { UIElement } from "./../../UIElement";
import { FrameworkElement } from "./../../FrameworkElement";
import { IFrameworkElement } from "./../../IFrameworkElement";
import { EventList } from "./../../../Events/EventList";
import { IEventArgs } from "./../../../Events/IEventArgs";
import { IEvent } from "./../../../Events/IEvent";
import { XamlMarkup } from "./../../../Reader/XamlMarkup";
import { XamlHelper } from "./../../../utils/XamlHelper";
import { ConsoleHelper } from "./../../../utils/ConsoleHelper";

export class PlatformPage extends Page implements IPlatformPage {

    private _events: EventList<PlatformPage, WindowEventArgs> = new EventList<PlatformPage, WindowEventArgs>();

    private _antialias: boolean;
    private _transparent: boolean;
    private _htmlCanvasHost: JQuery;
    private _xaml: XamlMarkup;

    get Activated(): IEvent<PlatformPage, WindowEventArgs> { return this._events.get("Activated"); }
    get Closed(): IEvent<PlatformPage, WindowEventArgs> { return this._events.get("Closed"); }
    get SizeChanged(): IEvent<PlatformPage, WindowEventArgs> { return this._events.get("SizeChanged"); }
    get VisibilityChanged(): IEvent<PlatformPage, WindowEventArgs> { return this._events.get("VisibilityChanged"); }

    constructor(width: number, height: number, antialias: boolean, transparent: boolean,
        htmlCanvasHost: JQuery, xaml: XamlMarkup) {
        super();

        this.ContentChanged.subscribe(this.DoContentChanged);

        this.Width = width;
        this.Height = height;
        this._antialias = antialias;
        this._transparent = transparent;
        this._htmlCanvasHost = htmlCanvasHost;
        this._xaml = xaml;

        this.Platform = this.CreatePlatform();
        this.Content = XamlHelper.XamlMarkupToUIElement(xaml);

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

    private DoContentChanged(obj: IFrameworkElement, ea: IEventArgs): void {
        ConsoleHelper.Log("PlatformPage.DoContentChanged");
        let pp: PlatformPage = <PlatformPage>obj;
        pp.Platform.SetCurrent(<FrameworkElement>pp.Content);
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
/// <reference path="../../../typings/globals/pixi.js/index.d.ts" />


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
    private _htmlCanvasHost: JQuery;

    get Content(): UIElement { return this._content; }
    get IsVisible(): boolean { return this._isVisible; }
    get Platform(): IPlatform { return this._platform; }

    get Activated(): IEvent<Window, WindowEventArgs> { return this._events.get("Activated"); }
    get Closed(): IEvent<Window, WindowEventArgs> { return this._events.get("Closed"); }
    get SizeChanged(): IEvent<Window, WindowEventArgs> { return this._events.get("SizeChanged"); }
    get VisibilityChanged(): IEvent<Window, WindowEventArgs> { return this._events.get("VisibilityChanged"); }


    constructor(width: number, height: number, antialias: boolean, transparent: boolean, htmlCanvasHost: JQuery) {

        this._platform = new Platform(width, height, antialias, transparent);
        this._htmlCanvasHost = htmlCanvasHost;
        this.InitializePixi();

        this.InitializeShell();
        this.InitializeVisualTree();
    }

    private InitializeShell(): void {
        this.Platform.Renderer.PixiRenderer.view.style.border = "1px solid lightgray";
        this.Platform.Renderer.PixiRenderer.backgroundColor = 0xf9f9f9;
    }

    private InitializeVisualTree(): void {
        this._visualTree = new VisualTree();
    }

    private InitializePixi(): void {
        this._htmlCanvasHost.append(this.Platform.Renderer.PixiRenderer.view);
    }

    public Resize(w: number, h: number): void {
        this.Platform.Renderer.PixiRenderer.autoResize = true;
        this.Platform.Renderer.PixiRenderer.resize(w, h);
    }

    public ResizeFullWindow(): void {
        this.Platform.Renderer.PixiRenderer.view.style.position = "absolute";
        this.Platform.Renderer.PixiRenderer.view.style.display = "block";
        this.Platform.Renderer.PixiRenderer.view.style.border = "0";
        this.Platform.Renderer.PixiRenderer.autoResize = true;
        this.Platform.Renderer.PixiRenderer.resize(window.innerWidth, window.innerHeight);
    }


    set IsLoading(value: boolean) {
        if (value) {
            PIXI.loader
                .add("assets/silverlight_anims.jpg")
                .load(this.Platform.Renderer.LoadingAnimation.bind(this.Platform.Renderer))
                .load(this.Platform.Renderer.LoadAppDomain)
                .load(() => { this.Activate(); });

            // this._window.ResizeFullWindow();
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
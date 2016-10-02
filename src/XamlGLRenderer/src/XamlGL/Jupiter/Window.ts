/// <reference path="../../../typings/globals/pixi.js/index.d.ts" />

import { Renderer } from "./../Renderer";
import { VisualTree } from "./../VisualTree";
import { UIElement } from "./UIElement";
import { EventList } from "./../Events/EventList";
import { IEventArgs } from "./../Events/IEventArgs";
import { IEvent } from "./../Events/IEvent";

export class Window {

    private _events: EventList<Window, WindowEventArgs> = new EventList<Window, WindowEventArgs>();
    private _content: UIElement;
    private _renderer: Renderer;
    private _isVisible: boolean;
    private _visualTree: VisualTree;

    get Content(): UIElement { return this._content; }
    get Renderer(): Renderer { return this._renderer; }
    get IsVisible(): boolean { return this.IsVisible; }

    get Activated(): IEvent<Window, WindowEventArgs> { return this._events.get("Activated"); }
    get Closed(): IEvent<Window, WindowEventArgs> { return this._events.get("Closed"); }
    get SizeChanged(): IEvent<Window, WindowEventArgs> { return this._events.get("SizeChanged"); }
    get VisibilityChanged(): IEvent<Window, WindowEventArgs> { return this._events.get("VisibilityChanged"); }


    constructor(width: number, height: number, antialias: boolean, transparent: boolean) {
        this._renderer = new Renderer(width, height, antialias, transparent);

        this.InitializeShell();
        this.InitializeVisualTree();
    }

    private InitializeShell(): void {
        this._renderer.PixiRenderer.view.style.border = "1px solid lightgray";
        this._renderer.PixiRenderer.backgroundColor = 0xf9f9f9;
    }

    private InitializeVisualTree(): void {
        this._visualTree = new VisualTree();
    }


    public Resize(w: number, h: number): void {
        this._renderer.PixiRenderer.autoResize = true;
        this._renderer.PixiRenderer.resize(w, h);
    }

    public ResizeFullWindow(): void {
        this._renderer.PixiRenderer.view.style.position = "absolute";
        this._renderer.PixiRenderer.view.style.display = "block";
        this._renderer.PixiRenderer.view.style.border = "0";
        this._renderer.PixiRenderer.autoResize = true;
        this._renderer.PixiRenderer.resize(window.innerWidth, window.innerHeight);
    }


    set IsLoading(value: boolean) {
        if (value) {
            PIXI.loader
                .add("assets/silverlight_anims.jpg")
                .load(this.Renderer.LoadingAnimation.bind(this.Renderer))
                .load(this.Renderer.LoadAppDomain)
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
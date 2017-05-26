﻿import { Guid } from "./../../../DataTypes/Guid";
import { IRenderer } from "./IRenderer";
import { HtmlPlatformPage } from "./PlatformPage";
// import { FrameworkElement } from "./../../FrameworkElement";
import { Dictionary } from "../../../../Libs/typescript-collections/src/lib/index";
import { ConsoleHelper } from "./../../../Utils/ConsoleHelper";
import { IEventArgs } from "./../../../Events/IEventArgs";
import { EventDispatcher } from "./../../../Events/EventDispatcher";
import { IEvent } from "./../../../Events/IEvent";
import { RendererHelper } from "./../../../Utils/RendererHelper";

// declare var TinkLib: any;

export class Renderer implements IRenderer {

    private _uniqueId: string;
    private _stage: HTMLElement;
    private _renderer: any;
    // private _tink: any;
    // private _tinkPointer: any;
    private _resourceIds: Dictionary<string, RendererResource>;
    private _draw: EventDispatcher<Renderer, IEventArgs> = new EventDispatcher<Renderer, IEventArgs>();
    private _key: EventDispatcher<Renderer, IEventArgs> = new EventDispatcher<Renderer, IEventArgs>();
    private _pointerPressed: EventDispatcher<Renderer, IEventArgs> = new EventDispatcher<Renderer, IEventArgs>();
    private _pointerReleased: EventDispatcher<Renderer, IEventArgs> = new EventDispatcher<Renderer, IEventArgs>();
    private _pointerTapped: EventDispatcher<Renderer, IEventArgs> = new EventDispatcher<Renderer, IEventArgs>();

    get UniqueID(): string { return this.UniqueID; }
    get PixiStage(): HTMLElement { return this._stage; }
    get Pointer(): any { return RendererHelper.TinkPointer; }
    get PixiRenderer(): any { return this._renderer; }
    get Draw(): IEvent<Renderer, IEventArgs> { return this._draw; }
    get Key(): IEvent<Renderer, IEventArgs> { return this._key; }
    get PointerPressed(): IEvent<Renderer, IEventArgs> { return this._pointerPressed; }
    get PointerReleased(): IEvent<Renderer, IEventArgs> { return this._pointerReleased; }
    get PointerTapped(): IEvent<Renderer, IEventArgs> { return this._pointerTapped; }

    set Border(value: string) { this.PixiRenderer.view.style.border = value; }
    set BackgroundColor(value: number) { this.PixiRenderer.backgroundColor = value; }

    constructor(width: number, height: number, antialias: boolean, transparent: boolean, htmlCanvasHost: JQuery) {
        ConsoleHelper.Log("Renderer.constructor");
        this._uniqueId = Guid.newGuid();
        this._resourceIds = new Dictionary<string, RendererResource>();
        this._stage = new HTMLElement();
        this._renderer = RendererFactory.GetRenderer(width, height, antialias, transparent);

        htmlCanvasHost.append(this.PixiRenderer.view);
        this.InitializeTink();
        // this.RenderLoop.call(this);
    }

    public Resize(width: number, height: number): void {
        this.PixiRenderer.autoResize = true;
        this.PixiRenderer.resize(width, height);
    }

    public ResizeFull(): void {
        this.ResizeFullWidth(window.innerHeight);
    }

    public Clear(): void {
        // todo: cleanup renderer
    }

    public ResizeFullWidth(height: number): void {
        this.PixiRenderer.view.style.position = "absolute";
        this.PixiRenderer.view.style.display = "block";
        this.PixiRenderer.view.style.border = "0";
        this.Resize(window.innerWidth, height);
        document.body.style.overflow = "hidden";

        let win: any = window;
        let pp: HtmlPlatformPage = win.PlatformPage;
        pp.Width = window.innerWidth;
        pp.Height = height;
    }

    public InitializeResource(key: string, url: string): PIXI.loaders.Loader {
        let rr: RendererResource = this._resourceIds.getValue(key);
        if (rr === undefined) {
            this._resourceIds.setValue(key, new RendererResource(url));
            return this.LoadResourceImage(url);
        } else {
            return null;
        }
    }

    private InitializeTink(): void {
        RendererHelper.InitializeTink(this.PixiRenderer.view);
        RendererHelper.TinkPointer.press = () => this._pointerPressed.dispatch(this, null);
        RendererHelper.TinkPointer.release = () => this._pointerReleased.dispatch(this, null);
        RendererHelper.TinkPointer.tap = () => this._pointerTapped.dispatch(this, null);
        RendererHelper.Draw.subscribe(() => {
            this._draw.dispatch(this, null);
            this._renderer.render(this.PixiStage); // this is a HUGE resource drain (CPU) .... 
        });
        RendererHelper.KeyPressed.subscribe((o: any,a: IEventArgs) => {
            this._key.dispatch(this, a);
        });

    }

    private LoadResourceImage(url: string): any {
        return PIXI.loader.add(url);
    }

    public LoadResource(key: string, container: HTMLElement, x: number, y: number, width: number, height: number): void {
        let resource: RendererResource = this._resourceIds.getValue(key);
        if (resource.Sprite === null) {
            let resourceId: string = resource.Url;
            let rect: PIXI.Rectangle = new PIXI.Rectangle(0, 0, width, height);
            let texture: PIXI.Texture = PIXI.loader.resources[resourceId].texture;
            texture.frame = rect;
            resource.Sprite = new PIXI.Sprite(texture);
        }
        resource.Sprite.x = x;
        resource.Sprite.y = y;
        //container.addChild(resource.Sprite);
    }

    public ShowResource(key: string, container: HTMLElement, x: number, y: number, width: number, height: number): void {
        this.LoadResource(key, container, x, y, width, height);
        this._renderer.render(container);
    }


    public HideResource(key: string, container: HTMLElement): void {
        let resource: RendererResource = this._resourceIds.getValue(key);
        if (resource.Sprite !== null) {
            //container.removeChild(resource.Sprite);
            this._renderer.render(container);
        }
    }

    // loading
    private _loadingBackground: HTMLElement = null;
    private _loadingText: HTMLElement = null;
    public ShowLoading(): void {
        if (this._loadingBackground === null) {
            this._loadingBackground = new HTMLElement();
            // this._loadingBackground.beginFill(0xF9F9F9);
            // this._loadingBackground.drawRect(0, 0, this._renderer.width, this._renderer.height);
            // this._loadingBackground.endFill();

            //// this._stage.addChild(this._loadingBackground);
        }
        if (this._loadingText === null) {
            //this._loadingText = HTMLElement(
            //    "loading...",
            //    { font: "20px sans-serif", fill: "black" }
            //);
            //this._loadingText.position.set(((this._renderer.width - 90) / 2), (((this._renderer.height - 22) / 2) + 90));
            //// this._stage.addChild(this._loadingText);
        }
        // this.ShowResource("loading", this._stage, ((this._renderer.width - 165) / 2), ((this._renderer.height - 165) / 2), 165, 165);
    }

    public HideLoading(): void {
        if (this._loadingBackground !== null) {
            this._stage.removeChild(this._loadingBackground);
            this._loadingBackground = null;
        }
        if (this._loadingText !== null) {
            this._stage.removeChild(this._loadingText);
            this._loadingText = null;
        }
        //this.HideResource("loading", this._stage);
    }

    public InitializeLoadingResource(url: string): any {
        return this.InitializeResource("loading", url);
    }
}


export class RendererFactory {

    private static _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

    public static GetRenderer(width: number, height: number, antialias: boolean, transparent: boolean)
        : PIXI.WebGLRenderer | PIXI.CanvasRenderer {

        this._renderer = PIXI.autoDetectRenderer(
            width,
            height,
            {
                antialias: antialias,
                transparent: transparent,
                resolution: 1
            }
        );

        return this._renderer;
    }
}

export class RendererResource {
    Sprite: PIXI.Sprite = null;

    constructor(public Url: string) { }
}
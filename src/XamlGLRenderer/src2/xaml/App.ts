﻿import { XamlMarkup } from "./reader/XamlMarkup";
import { XamlParser } from "./reader/XamlParser";
import { IFrameworkElement, FrameworkElement, UIElement, UIElementCollection } from "./jupiter/Core";
import { Panel, Scene, Camera, Material } from "./jupiter/controls/Core";
import { SceneMouseWheelZoom } from "./extensions/SceneMouseWheelZoom";

export class App {
    private _canvas: any;
    private _engine: BABYLON.Engine;
    //private scene: BABYLON.Scene;
    //private camera: BABYLON.FreeCamera;
    private light: BABYLON.Light;
    private xamlMarkup: XamlMarkup;
    private _rootElement: IFrameworkElement;

    constructor() {

    }

    public Start(xaml: XamlMarkup, canvasElement: string): void {
        this.xamlMarkup = xaml;
        this._canvas = document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);

        // Listen for browser/canvas resize events
        window.addEventListener("resize", () => {
            this._engine.resize();
        });

        this.BuildVisualTree();
        this.RenderScene();
    }

    private BuildVisualTree(): void {
        this._rootElement = XamlParser.XamlMarkupToUIElement(this.xamlMarkup);
        console.log(this._rootElement);
    }

    private RenderScene(): void {
        let vt: Panel = this._rootElement as Panel;

        //initialize all the nodes
        if (vt.Children) this.ProcessChildren(vt.Children);
    }

    private ProcessChildren(col : UIElementCollection): void {
        col.forEach((k: string, v: UIElement) => {
            if (v instanceof Scene) {
                let s: Scene = v as Scene;
                s.Initialize(this._engine, this._canvas, col.getValue(s.CameraName), col.getValue(s.LightName));
                SceneMouseWheelZoom.Install(s);
            } else if (v instanceof Camera) {
                let c: Camera = v as Camera;
                c.Initialize(col.getValue(c.SceneName) as Scene, this._canvas);
            } else {
                let o: any = v;
                if (o.Initialize != null) o.Initialize(col.getValue(o.SceneName) as Scene);
                if (o.InitializeWithMaterial != null) o.InitializeWithMaterial(col.getValue(o.SceneName) as Scene,
                    col.getValue(o.MaterialName) as Material);
            }
        });
    }
}

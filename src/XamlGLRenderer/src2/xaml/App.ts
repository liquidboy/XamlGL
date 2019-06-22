import { XamlMarkup } from "./reader/XamlMarkup";
import { XamlParser } from "./reader/XamlParser";
import { IFrameworkElement, UIElement, UIElementCollection, IChildrensElement, AnimatableUIElement, IAnimatableUIElement, IRender } from "./jupiter/Core";
import { Panel, Scene, Camera, Material } from "./jupiter/controls/Core";

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
        //console.log(this._rootElement);
    }

    private RenderScene(): void {
        if (this._rootElement instanceof Panel) {
            let vt: Panel = this._rootElement as Panel;

            //initialize all the nodes
            if (vt.Children) this.InitializeChildren(vt.Children);

            //animate nodes
            if (vt.Children) this.AnimateChildren(vt.Children);
            
            //debugging
            //console.log(vt.Children.getValue("box2"));
        }
    }

    private AnimateChildren(col : UIElementCollection): void {
        col.forEach((k: string, v: UIElement) => {
            if (v instanceof AnimatableUIElement) {
                let animateableCHild: IAnimatableUIElement = v as IAnimatableUIElement;
                animateableCHild.StartAnimation();
            }
        });
    }

    private InitializeChildren(col: UIElementCollection): void {
        col.forEach((k: string, v: UIElement) => {
            if (v instanceof Scene) {
                let s: Scene = v as Scene;
                s.InitializeScene(this._engine, this._canvas, col.getValue(s.CameraName), col.getValue(s.LightName), col.getValue(s.GroundName));
            } else if (v instanceof Camera) {
                let c: Camera = v as Camera;
                c.InitializeCamera(col.getValue(c.SceneName) as Scene, this._canvas);
            } else {
                let renderObject: any = v;
                if (renderObject.InitializeWithMaterial && renderObject.MaterialName)
                    renderObject.InitializeWithMaterial(col.getValue(renderObject.SceneName) as Scene,
                        col.getValue(renderObject.MaterialName) as Material);
                else if (renderObject.Initialize)
                    renderObject.Initialize(col.getValue(renderObject.SceneName) as Scene);
            }

            if (v instanceof Panel) {
                let childWithChildren: IChildrensElement = v as IChildrensElement;
                if (childWithChildren.Children.size() > 0) {
                    this.InitializeChildren(childWithChildren.Children);
                };
            }
        });
    }
}

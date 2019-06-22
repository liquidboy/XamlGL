import { XamlMarkup } from "./reader/XamlMarkup";
import { XamlParser } from "./reader/XamlParser";
import { IFrameworkElement, UIElement, UIElementCollection, IChildrensElement, AnimatableUIElement, IAnimatableUIElement, IRender } from "./jupiter/Core";
import { Panel, Scene, Camera, Material } from "./jupiter/controls/Core";
import { Container } from "inversify";
import { VisualTree } from "../services/VisualTree";
import { DIContainer } from "./Core";

export class App {
    private xamlMarkup: XamlMarkup;
    private _rootElement: IFrameworkElement;

    constructor() {

    }

    public Start(xaml: XamlMarkup, canvasElement: string): void {
        this.xamlMarkup = xaml;
        let _canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        let _engine = new BABYLON.Engine(_canvas, true);

        // Listen for browser/canvas resize events
        window.addEventListener("resize", () => {
            _engine.resize();
        });

        this.InitializeDIContainer(_canvas, _engine);
        this.BuildVisualTree();
        this.RenderScene();
        
    }

    private InitializeDIContainer(rootCanvas: HTMLCanvasElement, rootEngine: BABYLON.Engine): void {
        DIContainer.bind<VisualTree>(VisualTree).to(VisualTree).inSingletonScope();
        DIContainer.bind("rootCanvas").toConstantValue(rootCanvas);
        DIContainer.bind("rootEngine").toConstantValue(rootEngine);
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
            v.Initialize();

            if (v instanceof Panel) {
                let childWithChildren: IChildrensElement = v as IChildrensElement;
                if (childWithChildren.Children.size() > 0) {
                    this.InitializeChildren(childWithChildren.Children);
                };
            }
        });
    }
}

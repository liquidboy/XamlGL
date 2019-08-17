import { XamlMarkup } from "./reader/XamlMarkup";
import { XamlParser } from "./reader/XamlParser";
import { IFrameworkElement, UIElement, UIElementCollection, IChildrensElement, AnimatableUIElement, IAnimatableUIElement } from "./jupiter/Core";
import { Panel } from "./jupiter/controls/Core";
import { VisualTree } from "../services/VisualTree";
import { DIContainer, DisplayMode, Worker } from "./Core";

export class App {
    private xamlMarkup: XamlMarkup;
    private _rootElement: IFrameworkElement;

    constructor() {

    }

    public Start(xaml: XamlMarkup, canvasElement: string, displayMode: DisplayMode): void {
        if (displayMode == DisplayMode.CodeMode) return; //just codeeditor view
        this.xamlMarkup = xaml;
        let _canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        let _engine = new BABYLON.Engine(_canvas, true);

        // Listen for browser/canvas resize events
        window.addEventListener("resize", () => {
            _engine.resize();
        });

        Worker.Init();
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

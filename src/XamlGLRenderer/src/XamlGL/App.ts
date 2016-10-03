import { Window } from "./Jupiter/Window";
import { ViewManager } from "./ViewManager";
import { Application } from "./Jupiter/Application";

export class App extends Application {

    private _window: Window;

    constructor() {
        super();
        this.OnLaunched.subscribe(this.Launched.bind(this));
        this.OnActivated.subscribe(this.Activated.bind(this));
    }

    public Start(): void {
        console.log(PIXI); // todo : remove and find a better way for debugging stuff

        ViewManager.RenderView("pixi-home", PIXI, (jqView: JQuery) => {
            this.SetupWindow(jqView.find(".pixi-canvas"));
            this.SetupApplication(); // important : needs to be done AFTER "SetupWindow" as PIXI & Window needs to be setup
        });
    }

    private Activated(): void {
        this._window.IsLoading = true;
    }

    private Launched(): void {
        this._window.IsLoading = false;
    }

    private SetupWindow(htmlCanvasHost: JQuery): void {
        this._window = new Window(512, 512, false, false, htmlCanvasHost);
    }
}

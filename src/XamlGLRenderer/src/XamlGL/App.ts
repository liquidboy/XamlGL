import { Window } from "./Jupiter/Window";
import { ViewManager } from "./ViewManager";
import { Application } from "./Jupiter/Application";

export class App extends Application {

    private _window: Window;

    constructor() {
        super();
        this.LoadedApplication.subscribe(() => { this._window.IsLoading = false; });
    }

    public Start(): void {
        console.log(PIXI); // todo : remove and find a better way for debugging stuff

        ViewManager.RenderView("pixi-home", PIXI, (jqView: JQuery) => {
            this.CreateWindow(jqView.find(".pixi-canvas"));
        });
    }

    private CreateWindow(htmlCanvasHost: JQuery): void {
        this._window = new Window(512, 512, false, false, htmlCanvasHost);
        this._window.IsLoading = true;
    }
}

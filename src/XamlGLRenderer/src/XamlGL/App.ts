//import { PlatformPage } from "./Jupiter/Platform/Html/PlatformPage";
import { PlatformPage } from "./Jupiter/Platform/WebGL/PlatformPage";
import { ViewManager } from "./ViewManager";
import { Application } from "./Jupiter/Application";
import { XamlMarkup } from "./Reader/XamlMarkup";

export class App extends Application {

    private _platformPage: PlatformPage;
    private _jqView: JQuery;

    constructor() {
        super();
        this.OnLaunched.subscribe(this.Launched.bind(this));
        this.OnActivated.subscribe(this.Activated.bind(this));
    }

    public Start(xaml: XamlMarkup): void {
        // console.log(PIXI); // todo : remove and find a better way for debugging stuff

        ViewManager.RenderView("pixi-home", PIXI, (jqView: JQuery) => {
            this._jqView = jqView;
            this.SetupWindow(jqView.find(".pixi-canvas"), xaml);
            this.SetupApplication(); // important : needs to be done AFTER "SetupWindow" as PIXI & Window needs to be setup
        });
    }

    private Activated(): void {
        this._platformPage.IsLoading = true;
    }

    private Launched(): void {
        this._platformPage.IsLoading = false;
    }

    private SetupWindow(htmlCanvasHost: JQuery, xaml: XamlMarkup): void {
        this._platformPage = new PlatformPage(512, 512, true, false, htmlCanvasHost, xaml);
    }
}

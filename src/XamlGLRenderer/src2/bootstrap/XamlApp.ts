/// <reference path="../../node_modules/babylonjs/babylon.module.d.ts" />
import * as XamlGLCore from "../Xaml/Core";

export class XamlApp {
    public Start(canvasElement: string): void {
        this.Configure();

        // let url: string = document.body.getAttribute("xamlgl-app");
        let xaml: string = this.parseQueryString(location.search).xaml;

        if (!xaml) {
            console.warn("No application specified.");
            return;
        }

        // todo: move this XAML stuff into the AppDomain
        let xm: XamlGLCore.XamlMarkup = XamlGLCore.XamlReader.LoadUri(
            `/xaml/${xaml}`,
            (el: any) => {
                console.log(xm.rootElement);

                let app: XamlGLCore.App = new XamlGLCore.App();
                app.Start(xm, canvasElement);
            });


    }

    public Configure(): void {
        //XamlGLCore.ViewManager.Configure("content");

        // keep VIEW stuff outside of the AppDomain ??!! [not sure if i want to or not]

        //window["rivets"].configure({
        //    prefix: "rv",
        //    preloadData: true,
        //    rootInterface: ".",
        //    templateDelimiters: ["{", "}"],
        //    handler: function (target: any, event: any, binding: any): void {
        //        this.call(target, event, binding.view.models);
        //    }
        //});
    }

    private parseQueryString(url: string): any {
        var urlParams: any = {};
        url.replace(
            new RegExp("([^?=&]+)(=([^&]*))?", "g"),
            function ($0: any, $1: any, $2: any, $3: any): string {
                return urlParams[$1] = $3;
            }
        );

        return urlParams;
    }
}

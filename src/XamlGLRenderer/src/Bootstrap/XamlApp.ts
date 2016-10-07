/// <reference path="../../typings/globals/rivets/index.d.ts" />

import * as XamlGLCore from "./../XamlGL/Core";

export class XamlApp {



    private parseQueryString(url: string): any {
        var urlParams = {};
        url.replace(
            new RegExp("([^?=&]+)(=([^&]*))?", "g"),
            function ($0, $1, $2, $3): string {
                return urlParams[$1] = $3;
            }
        );

        return urlParams;
    }
    public Start(): void {
        this.Configure();
        
        let url: string = document.body.getAttribute("xamlgl-app");
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
                app.Start(xm);
            });


    }

    public Configure(): void {
        XamlGLCore.ViewManager.Configure("content");

        // keep VIEW stuff outside of the AppDomain ??!! [not sure if i want to or not]
        rivets.configure({
            prefix: "rv",
            preloadData: true,
            rootInterface: ".",
            templateDelimiters: ["{", "}"],
            handler: function (target: any, event: any, binding: any): void {
                this.call(target, event, binding.view.models);
            }
        });
    }
}

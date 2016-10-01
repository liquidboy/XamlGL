/// <reference path="../../typings/globals/rivets/index.d.ts" />

import * as XamlGLCore from "./../XamlGL/Core";

export class XamlApp {

    public Start(): void {
        this.Configure();

        let url: string = document.body.getAttribute("xamlgl-app");

        if (!url) {
            console.warn("No application specified.");
            return;
        }

        let app: XamlGLCore.AppDomain = new XamlGLCore.AppDomain();
        app.Start();
        // todo: move this XAML stuff into the AppDomain
        let xm: XamlGLCore.XamlMarkup = XamlGLCore.XamlReader.LoadUri(
            "/xaml/image-silverlight.xap",
            (el: any) => { console.log(xm.rootElement); });

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

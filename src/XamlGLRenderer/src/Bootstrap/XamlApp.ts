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
        let xm: XamlGLCore.XamlMarkup = XamlGLCore.XamlReader.LoadUri(
            "/xaml/rectangle-shape.xap",
            (el: any) => { console.log(xm.rootElement); });

    }

    public Configure(): void {
        XamlGLCore.ViewManager.Configure("content");

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

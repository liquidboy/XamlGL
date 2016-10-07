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

        // todo: move this XAML stuff into the AppDomain
        let xm: XamlGLCore.XamlMarkup = XamlGLCore.XamlReader.LoadUri(
            // "/xaml/sample-1.xap",
            // "/xaml/sample-2.xap",
            // "/xaml/sample-3.xap",
            // "/xaml/sample-4.xap",
            // "/xaml/sample-5.xap",
            // "/xaml/sample-6.xap",
            // "/xaml/sample-7.xap",
            // "/xaml/sample-8.xap",
            // "/xaml/sample-9.xap",
            // "/xaml/sample-10.xap",
            // "/xaml/sample-11.xap",
            // "/xaml/sample-12.xap",
            // "/xaml/sample-13.xap",
            // "/xaml/sample-14.xap",
            // "/xaml/sample-15.xap",
            // "/xaml/sample-16.xap",
            // "/xaml/sample-17.xap",
            // "/xaml/sample-18.xap",
            // "/xaml/sample-19.xap",
            // "/xaml/sample-20.xap",
            "/xaml/sample-21.xap",
            (el: any) => { console.log(xm.rootElement); });

        let app: XamlGLCore.App = new XamlGLCore.App();
        app.Start(xm);
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

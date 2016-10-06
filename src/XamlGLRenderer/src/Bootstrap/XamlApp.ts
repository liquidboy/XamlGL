﻿/// <reference path="../../typings/globals/rivets/index.d.ts" />

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
            // "/xaml/grid-1.xap",
            // "/xaml/grid-2.xap",
            // "/xaml/grid-3.xap",
            // "/xaml/grid-4.xap",
            // "/xaml/grid-5.xap",
            // "/xaml/rectangle-shape.xap",
            // "/xaml/image-silverlight-1.xap",
            // "/xaml/image-silverlight-2.xap",
            // "/xaml/image-silverlight-3.xap",
            // "/xaml/image-silverlight-4.xap",
            // "/xaml/image-silverlight-5.xap",
            // "/xaml/image-silverlight-6.xap",
            "/xaml/image-silverlight-7.xap",
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

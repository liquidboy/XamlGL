/// <reference path="../../node_modules/babylonjs/babylon.module.d.ts" />

import "reflect-metadata";  // <--- needs to be done before xaml framework is imported because they use it
import * as XamlGLCore from "../Xaml/Core";
import { editor, Position } from "monaco-editor";

export class XamlApp {
    public Start(canvasElement: string, editor: editor.ICodeEditor): void {
        this.Configure();
        this.ConfigureEditor(editor);

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

    public ConfigureEditor(editor: editor.ICodeEditor): void {
        //let codeEditorEl = document.getElementById(codeElement) as HTMLElement;
        //let rrr = require;
        //let codeEditor = monaco.editor.create(codeEditorEl);

        editor.setValue("function hello() {\n\talert('Hello world!');\n}");
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

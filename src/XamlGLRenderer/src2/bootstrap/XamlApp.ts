/// <reference path="../../node_modules/babylonjs/babylon.module.d.ts" />
/// <reference path="../../node_modules/monaco-editor/monaco.d.ts" />

import "reflect-metadata";  // <--- needs to be done before xaml framework is imported because they use it
import * as XamlGLCore from "../Xaml/Core";
//import { editor, Position } from "monaco-editor";

export class XamlApp {

    //public Start(canvasElement: string, editor: editor.ICodeEditor): void {
    public Start(renderElement: string, renderDetailsLayerElement: string, editorElement: string, editorLinkElement: string): void {
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
                console.log(xm.RootElement);

                let displayModeAsString: string = this.parseQueryString(location.search).d;
                let displayMode: XamlGLCore.DisplayMode = XamlGLCore.DisplayMode.RenderMode;
                if (displayModeAsString !== undefined) displayMode = parseInt(displayModeAsString);

                let app: XamlGLCore.App = new XamlGLCore.App();
                app.Start(xm, renderElement, displayMode);

                this.ConfigureEditorLink(editorLinkElement);
                if (displayMode === XamlGLCore.DisplayMode.CodeMode) {
                    this.HideRenderStack(renderElement, renderDetailsLayerElement);
                    this.ConfigureEditor(editorElement, editorLinkElement, xm.RawData);
                }
            });
    }

    public ConfigureEditor(codeEditorElement: string, string, data: string): void {
        let codeEditorEl = document.getElementById(codeEditorElement) as HTMLElement;
        let editor = monaco.editor.create(codeEditorEl);
        let xamlModel = monaco.editor.createModel(data, "html");
        //editor.setValue("function hello() {\n\talert('Hello world!');\n}");
        editor.setModel(xamlModel);
        //monaco.editor.setModelLanguage(text)
        //https://github.com/Microsoft/monaco-editor/issues/539
        //https://stackoverflow.com/questions/49431915/adding-a-padding-to-monaco-editor-area-lines-content?rq=1
    }

    public ConfigureEditorLink(xamlCodeEditorLinkElement: string): void {
        let aXamlCodeEditorLink = document.getElementById(xamlCodeEditorLinkElement) as HTMLAnchorElement;
        aXamlCodeEditorLink.href = `${location.search}&d=1`;
    }

    public HideRenderStack(canvasElement: string, canvasDetailsLayerElement: string) {
        let canvasEl = document.getElementById(canvasElement) as HTMLElement;
        let canvasDetailsLayerEl = document.getElementById(canvasDetailsLayerElement) as HTMLElement;

        canvasEl.style.display = "none";
        canvasDetailsLayerEl.style.display = "none";
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

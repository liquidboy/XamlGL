/// <reference path="../../node_modules/babylonjs/babylon.module.d.ts" />
/// <reference path="../../node_modules/monaco-editor/monaco.d.ts" />

import "reflect-metadata";  // <--- needs to be done before xaml framework is imported because they use it
import * as XamlGLCore from "../Xaml/Core";
//import { SharedWorker } from "../Xaml/Core";
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

                let worker: XamlGLCore.SharedWorker = XamlGLCore.DIContainer.get(XamlGLCore.SharedWorker);
                XamlGLCore.CodeEditor.ConfigureEditorLink(editorLinkElement);
                if (displayMode === XamlGLCore.DisplayMode.CodeMode) {
                    this.HideRenderStack(renderElement, renderDetailsLayerElement);
                    XamlGLCore.CodeEditor.ConfigureEditor(editorElement, editorLinkElement, xm.RawData, worker);
                    //this.ConfigureEditor(editorElement, editorLinkElement, xm.RawData);
                }
            });
    }

    //public ConfigureEditor(codeEditorElement: string, string, data: string): void {
    //    let codeEditorEl = document.getElementById(codeEditorElement) as HTMLElement;
    //    let editor = monaco.editor.create(codeEditorEl);
    //    let xamlModel = monaco.editor.createModel(data, "html");
    //    //editor.setValue("function hello() {\n\talert('Hello world!');\n}");
    //    editor.setModel(xamlModel);
    //    xamlModel.onDidChangeContent((e: monaco.editor.IModelContentChangedEvent) => {
    //        console.log(e);
    //    });
    //    editor.onDidChangeCursorPosition((e: monaco.editor.ICursorPositionChangedEvent) => {
    //        //console.log(xamlModel.getWordAtPosition(e.position));
    //        console.log(this.getValueAtPosition(xamlModel, e.position));
    //        //console.log(this.getAttributeNameAtPosition(xamlModel, e.position));
    //        console.log(this.findTagAtPosition(xamlModel, "attribute.name.html", e.position));
    //        console.log(this.findTagAtPosition(xamlModel, "tag.html", e.position));
    //    });

    //    //monaco.editor.setModelLanguage(text)
    //    //https://stackoverflow.com/questions/49449401/monaco-editor-hoverprovider-get-the-word-mouse-hovers-over
    //    //https://github.com/Microsoft/monaco-editor/issues/539
    //    //https://stackoverflow.com/questions/49431915/adding-a-padding-to-monaco-editor-area-lines-content?rq=1
    //}

    //private findTagAtPosition(model, typeToSearchFor, position): any {
    //    let lineNumber = position.lineNumber;
    //    let column = position.column;
    //    return this.findTagAtLineColumn(model, typeToSearchFor, lineNumber, column);
    //}

    //private findTagAtLineColumn(model, typeToSearchFor, lineNumber, column): any {
    //    let data: any = this.getTokensAtLine(lineNumber, model);
    //    let dataLength: number = data.tokens1.length;

    //    let tokenIndex = this.getTokenIndex(data, column);
    //    let tokenType = data.tokens1[tokenIndex].type;

    //    let associatedAttributeNameTokenIndex = null;
    //    let associatedAttributeNameToken = null;
    //    for (let i = tokenIndex - 1; i >= 0; i--) {
    //        let t = data.tokens1[i];
    //        if (t.type === typeToSearchFor) {
    //            associatedAttributeNameToken = t;
    //            associatedAttributeNameTokenIndex = i;
    //            break;
    //        }
    //    }

    //    if (associatedAttributeNameToken === null)
    //        return this.findTagAtLineColumn(model, typeToSearchFor, lineNumber - 1, column);

    //    let tokenText = this.getTokenText(model, lineNumber, associatedAttributeNameTokenIndex, data);

    //    return {
    //        associatedAttributeNameToken: associatedAttributeNameToken,
    //        associatedAttributeNameTokenIndex: associatedAttributeNameTokenIndex,
    //        tokenText: tokenText,
    //        tokenType: tokenType
    //    };
    //}
    //private getTokenIndex(data, column): number {
    //    let dataLength: number = data.tokens1.length;
    //    let tokenIndex = 0;
    //    for (let i = dataLength - 1; i >= 0; i--) {
    //        let t = data.tokens1[i];
    //        if (column - 1 >= t.offset) {
    //            tokenIndex = i;
    //            break;
    //        }
    //    }
    //    return tokenIndex;
    //}

    //private getTokenText(model, lineNumber, index, data) {
    //    let lineContent: any = model.getLineContent(lineNumber);
    //    let dataLength: number = data.tokens1.length;
    //    let tokenText = '';
    //    if (index < dataLength) {
    //        let tokenStartIndex = data.tokens1[index].offset;
    //        let tokenEndIndex = index + 1 < dataLength ? data.tokens1[index + 1].offset : lineContent.length;
    //        tokenText = lineContent.substring(tokenStartIndex, tokenEndIndex);
    //    }
    //    return tokenText;
    //}

    //private getValueAtPosition(model, position): any {
    //    let data: any = this.getTokensAtLine(position.lineNumber, model);
    //    let dataLength: number = data.tokens1.length;

    //    let tokenIndex = this.getTokenIndex(data, position.column);
    //    let tokenType = data.tokens1[tokenIndex].type;

    //    return {
    //        tokenType: tokenType,
    //        tokenText: this.getTokenText(model, position.lineNumber, tokenIndex, data)
    //    }
    //}


    //private  getTokensAtLine(lineNumber, model): any {
    //    let tokenizationSupport = model._tokens.tokenizationSupport;
    //    let state = tokenizationSupport.getInitialState();

    //    for (let i = 1; i < lineNumber; i++) {
    //        let tokenizationResult = tokenizationSupport.tokenize(model.getLineContent(i), state, 0);
    //        state = tokenizationResult.endState;
    //    }

    //    let stateBeforeLine = state;
    //    let tokenizationResult1 = tokenizationSupport.tokenize(model.getLineContent(lineNumber), stateBeforeLine, 0);
    //    let tokenizationResult2 = tokenizationSupport.tokenize2(model.getLineContent(lineNumber), stateBeforeLine, 0);

    //    return {
    //        startState: stateBeforeLine,
    //        tokens1: tokenizationResult1.tokens,
    //        tokens2: tokenizationResult2.tokens,
    //        endState: tokenizationResult1.endState
    //    };
    //}

    //private getAttributeNameAtPosition(model, position): any {
    //    let data: any = this.getTokensAtLine(position.lineNumber, model);
    //    let dataLength: number = data.tokens1.length;

    //    let token1Index = 0;
    //    for (let i = dataLength - 1; i >= 0; i--) {
    //        let t = data.tokens1[i];
    //        if (position.column - 1 >= t.offset) {
    //            token1Index = i;
    //            break;
    //        }
    //    }

    //    let associatedAttributeNameTokenIndex = null;
    //    let associatedAttributeNameToken = null;
    //    for (let i = token1Index - 1; i >= 0; i--) {
    //        let t = data.tokens1[i];
    //        if (t.type === "attribute.name.html") {
    //            associatedAttributeNameToken = t;
    //            associatedAttributeNameTokenIndex = i;
    //            break;
    //        }
    //    }

    //    if (associatedAttributeNameTokenIndex !== null) associatedAttributeNameToken = data.tokens1[associatedAttributeNameTokenIndex];
    //    if (associatedAttributeNameToken === null) return "[error not found]";

    //    let lineContent: any;
    //    if (associatedAttributeNameTokenIndex >= 0) {
    //        lineContent = model.getLineContent(position.lineNumber);
    //    } else {
    //        lineContent = model.getLineContent(position.lineNumber - 1);
    //    }

    //    let tokenText = '';
    //    if (associatedAttributeNameTokenIndex < dataLength) {
    //        let tokenStartIndex = data.tokens1[associatedAttributeNameTokenIndex].offset;
    //        let tokenEndIndex = associatedAttributeNameTokenIndex + 1 < dataLength ? data.tokens1[associatedAttributeNameTokenIndex + 1].offset : lineContent.length;
    //        tokenText = lineContent.substring(tokenStartIndex, tokenEndIndex);
    //    }
    //    return tokenText;
    //}

    //public ConfigureEditorLink(xamlCodeEditorLinkElement: string): void {
    //    let aXamlCodeEditorLink = document.getElementById(xamlCodeEditorLinkElement) as HTMLAnchorElement;
    //    aXamlCodeEditorLink.href = `${location.search}&d=1`;
    //}

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

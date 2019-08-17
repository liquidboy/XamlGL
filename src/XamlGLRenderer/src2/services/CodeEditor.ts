import { injectable } from  "inversify";
import { Dictionary } from "../libs/typescript-collections/src/lib";
import { UIElement } from "../Xaml/jupiter/Core";

@injectable()
export class CodeEditor {

    constructor() {
    
    }

    public static ConfigureEditor(codeEditorElement: string, string, data: string): void {
        let codeEditorEl = document.getElementById(codeEditorElement) as HTMLElement;
        let editor = monaco.editor.create(codeEditorEl);
        let xamlModel = monaco.editor.createModel(data, "html");
        //editor.setValue("function hello() {\n\talert('Hello world!');\n}");
        editor.setModel(xamlModel);
        xamlModel.onDidChangeContent((e: monaco.editor.IModelContentChangedEvent) => {
            console.log(e);
        });
        editor.onDidChangeCursorPosition((e: monaco.editor.ICursorPositionChangedEvent) => {
            ////console.log(xamlModel.getWordAtPosition(e.position));
            //console.log(this.getValueAtPosition(xamlModel, e.position));
            ////console.log(this.getAttributeNameAtPosition(xamlModel, e.position));
            //console.log(this.findTagAtPosition(xamlModel, "attribute.name.html", e.position));
            //console.log(this.findTagAtPosition(xamlModel, "tag.html", e.position));
            console.log(this.GetValueAtPosition(xamlModel, e.position));
        });

        //monaco.editor.setModelLanguage(text)
        //https://stackoverflow.com/questions/49449401/monaco-editor-hoverprovider-get-the-word-mouse-hovers-over
        //https://github.com/Microsoft/monaco-editor/issues/539
        //https://stackoverflow.com/questions/49431915/adding-a-padding-to-monaco-editor-area-lines-content?rq=1
    }

    private static GetValueAtPosition(xamlModel: monaco.editor.ITextModel, position: monaco.Position): any {
        let valueObj = this.getValueAtPosition(xamlModel, position);
        if (valueObj.tokenType === "attribute.value.html") {
            let typeObj = this.findTagAtPosition(xamlModel, "attribute.name.html", position);
            let classObj = this.findTagAtPosition(xamlModel, "tag.html", position)
            let xName = this.findXNameAttribute(xamlModel, classObj.tokenLinePosition, classObj.associatedAttributeNameTokenIndex);

            return {
                IsValue: true,
                Value: valueObj.tokenText,
                Attribute: typeObj.tokenText,
                Class: classObj.tokenText,
                XName: xName
            }
        }
        return {
            IsValue: false
        };
    }

    public static ConfigureEditorLink(xamlCodeEditorLinkElement: string): void {
        let aXamlCodeEditorLink = document.getElementById(xamlCodeEditorLinkElement) as HTMLAnchorElement;
        aXamlCodeEditorLink.href = `${location.search}&d=1`;
    }

    private static findXNameAttribute(model, lineToStartFrom: number, positionOnLineToStartFrom: number): any {
        let data: any = this.getTokensAtLine(lineToStartFrom, model);
        let dataLength: number = data.tokens1.length;

        for (let i = positionOnLineToStartFrom; i <= dataLength - 1; i++) {
            let t = data.tokens1[i];
            
            if (t.type === "attribute.name.html") {
                let tokenText = this.getTokenText(model, lineToStartFrom, i, data);
                if (tokenText === "x") {
                    let found = true;
                    let j = i;
                    j++; j++;
                    if (j > dataLength - 1) break;
                    let x = data.tokens1[j];
                    if (x.type === "attribute.name.html") {
                        let tokenTextX = this.getTokenText(model, lineToStartFrom, j, data);
                        if (tokenTextX === "Name") {
                            let found2 = true
                            j++; j++;
                            if (j > dataLength - 1) break;
                            x = data.tokens1[j];
                            if (x.type === "attribute.value.html") {
                                return this.getTokenText(model, lineToStartFrom, j, data);
                                break;
                            }
                        }
                    }   
                }
            }
        }
        return null;
    }

    private static findTagAtPosition(model, typeToSearchFor, position): any {
        let lineNumber = position.lineNumber;
        let column = position.column;
        return this.findTagAtLineColumn(model, typeToSearchFor, lineNumber, column);
    }

    private static findTagAtLineColumn(model, typeToSearchFor, lineNumber, column): any {
        let data: any = this.getTokensAtLine(lineNumber, model);
        let dataLength: number = data.tokens1.length;

        let tokenIndex = this.getTokenIndex(data, column);
        let tokenType = data.tokens1[tokenIndex].type;

        let associatedAttributeNameTokenIndex = null;
        let associatedAttributeNameToken = null;

        if (tokenType === typeToSearchFor) {
            associatedAttributeNameTokenIndex = tokenIndex;
            associatedAttributeNameToken = data.tokens1[tokenIndex];
        } else {
            for (let i = tokenIndex - 1; i >= 0; i--) {
                let t = data.tokens1[i];
                if (t.type === typeToSearchFor) {
                    associatedAttributeNameToken = t;
                    associatedAttributeNameTokenIndex = i;
                    break;
                }
            }
        }

        if (associatedAttributeNameToken === null)
            return this.findTagAtLineColumn(model, typeToSearchFor, lineNumber - 1, column);

        let tokenText = this.getTokenText(model, lineNumber, associatedAttributeNameTokenIndex, data);

        return {
            associatedAttributeNameToken: associatedAttributeNameToken,
            associatedAttributeNameTokenIndex: associatedAttributeNameTokenIndex,
            tokenText: tokenText,
            tokenType: associatedAttributeNameToken.type,
            tokenLinePosition: lineNumber
        };
    }
    private static getTokenIndex(data, column): number {
        let dataLength: number = data.tokens1.length;
        let tokenIndex = 0;
        for (let i = dataLength - 1; i >= 0; i--) {
            let t = data.tokens1[i];
            if (column - 1 >= t.offset) {
                tokenIndex = i;
                break;
            }
        }
        return tokenIndex;
    }

    private static getTokenText(model, lineNumber, index, data) {
        let lineContent: any = model.getLineContent(lineNumber);
        let dataLength: number = data.tokens1.length;
        let tokenText = '';
        if (index < dataLength) {
            let tokenStartIndex = data.tokens1[index].offset;
            let tokenEndIndex = index + 1 < dataLength ? data.tokens1[index + 1].offset : lineContent.length;
            tokenText = lineContent.substring(tokenStartIndex, tokenEndIndex);
        }
        return tokenText;
    }

    private static getValueAtPosition(model, position): any {
        let data: any = this.getTokensAtLine(position.lineNumber, model);
        let dataLength: number = data.tokens1.length;

        let tokenIndex = this.getTokenIndex(data, position.column);
        let tokenType = data.tokens1[tokenIndex].type;

        return {
            tokenType: tokenType,
            tokenText: this.getTokenText(model, position.lineNumber, tokenIndex, data)
        }
    }


    private static getTokensAtLine(lineNumber, model): any {
        let tokenizationSupport = model._tokens.tokenizationSupport;
        let state = tokenizationSupport.getInitialState();

        for (let i = 1; i < lineNumber; i++) {
            let tokenizationResult = tokenizationSupport.tokenize(model.getLineContent(i), state, 0);
            state = tokenizationResult.endState;
        }

        let stateBeforeLine = state;
        let tokenizationResult1 = tokenizationSupport.tokenize(model.getLineContent(lineNumber), stateBeforeLine, 0);
        let tokenizationResult2 = tokenizationSupport.tokenize2(model.getLineContent(lineNumber), stateBeforeLine, 0);

        return {
            startState: stateBeforeLine,
            tokens1: tokenizationResult1.tokens,
            tokens2: tokenizationResult2.tokens,
            endState: tokenizationResult1.endState
        };
    }

    private static getAttributeNameAtPosition(model, position): any {
        let data: any = this.getTokensAtLine(position.lineNumber, model);
        let dataLength: number = data.tokens1.length;

        let token1Index = 0;
        for (let i = dataLength - 1; i >= 0; i--) {
            let t = data.tokens1[i];
            if (position.column - 1 >= t.offset) {
                token1Index = i;
                break;
            }
        }

        let associatedAttributeNameTokenIndex = null;
        let associatedAttributeNameToken = null;
        for (let i = token1Index - 1; i >= 0; i--) {
            let t = data.tokens1[i];
            if (t.type === "attribute.name.html") {
                associatedAttributeNameToken = t;
                associatedAttributeNameTokenIndex = i;
                break;
            }
        }

        if (associatedAttributeNameTokenIndex !== null) associatedAttributeNameToken = data.tokens1[associatedAttributeNameTokenIndex];
        if (associatedAttributeNameToken === null) return "[error not found]";

        let lineContent: any;
        if (associatedAttributeNameTokenIndex >= 0) {
            lineContent = model.getLineContent(position.lineNumber);
        } else {
            lineContent = model.getLineContent(position.lineNumber - 1);
        }

        let tokenText = '';
        if (associatedAttributeNameTokenIndex < dataLength) {
            let tokenStartIndex = data.tokens1[associatedAttributeNameTokenIndex].offset;
            let tokenEndIndex = associatedAttributeNameTokenIndex + 1 < dataLength ? data.tokens1[associatedAttributeNameTokenIndex + 1].offset : lineContent.length;
            tokenText = lineContent.substring(tokenStartIndex, tokenEndIndex);
        }
        return tokenText;
    }


}
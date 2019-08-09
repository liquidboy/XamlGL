/// <reference path="./../../../node_modules/@types/jquery/index.d.ts" />
﻿let parser: DOMParser = new DOMParser();

export class XamlMarkup {
    private rootElement: HTMLElement;
    private rawData: string;

    constructor() {
        
    }

    LoadRootViaUri(uri: string, done: Function): void {
        $.get(uri).done((data) => {
            if (done) done.call(this, data);
        });
    }
    LoadRoot(data: string, done: (xamlDom: HTMLElement)=> void): void {
        var doc = parser.parseFromString(data, "text/xml");
        if (done) {
            this.rawData = data;
            this.rootElement = doc.documentElement;
            done.call(this, doc.documentElement);
        }
    }

    get RawData(): string { return this.rawData; }
    get RootElement(): HTMLElement { return this.rootElement; }
}
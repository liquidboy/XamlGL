/// <reference path="../../../typings/globals/jquery/index.d.ts" />

let parser: DOMParser = new DOMParser();

export class XamlMarkup {
    rootElement: HTMLElement;

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
            this.rootElement = doc.documentElement;
            done.call(this, doc.documentElement);
        }
    }


}
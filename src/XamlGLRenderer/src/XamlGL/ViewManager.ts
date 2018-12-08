﻿export class ViewManager {

    public static ContentElementId: string;  // found in index.html this is the root element that gets replaced with the view
    private static _isReady: boolean = false;

    public static Configure(contentId: string): void {
        this.ContentElementId = contentId;
        this._isReady = true;
    }

    public static RenderView(view: string, model: any, done: Function): void {
        if (!this._isReady) {
            console.warn("ViewManager: you tried to render a view BUT the ViewManager was not ready!");
            return;
        }

        let jqContent :JQuery = $(`#${this.ContentElementId}`);

        $.get(`/views/${view}.html?v=2`).done((data: string) => {
            jqContent.html(data);
            window["rivets"].bind($(`.${view}`), { model: model });
            if (done) { done.call(this, jqContent); }
        });
    }
}

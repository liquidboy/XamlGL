import { XamlMarkup } from "./XamlMarkup"

export class XamlReader {
    private static _xm: XamlMarkup;

    public static LoadUri(uri: any, done: Function): XamlMarkup {
        if (!this._xm) this._xm = new XamlMarkup();
        this._xm.LoadRootViaUri(uri,
            (data) => {
                if (done) {
                    this._xm.LoadRoot( data,
                        (xamlDom: HTMLElement) => { if (done) done.call(this); }
                    );
                }
            });
        return this._xm;
    }
}
import { BitmapSource } from "./BitmapSource";
export class BitmapImage extends BitmapSource {
    private _uri: string;

    get Uri(): string { return this._uri; }

    set Uri(value: string) { this._uri = value; }

    constructor(uri: string) {
        super();
        this._uri = uri;
    }
}
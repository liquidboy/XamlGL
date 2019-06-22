import { UIElement } from "../UIElement";
import { KeyFrames } from "./Core";

export class Animation extends UIElement {
    private _keyFrames: KeyFrames;

    get KeyFrames(): KeyFrames { return this._keyFrames; }

    set KeyFrames(value: KeyFrames) { this._keyFrames = value; }

    constructor() {
        super();
        this._keyFrames = new KeyFrames();
    }

}
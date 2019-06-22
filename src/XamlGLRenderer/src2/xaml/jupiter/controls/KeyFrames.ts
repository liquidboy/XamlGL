import { UIElement } from "../UIElement";
import { KeyFrameCollection } from "./Core";

export class KeyFrames extends UIElement {
    private _keyFrames: KeyFrameCollection;
    
    get KeyFrames(): KeyFrameCollection { return this._keyFrames; }
    
    set KeyFrames(value: KeyFrameCollection) { this._keyFrames = value; }
   
    constructor() {
        super();
        this._keyFrames = new KeyFrameCollection();
    }

    public LoadFromNode(node: any): void {

    }
}
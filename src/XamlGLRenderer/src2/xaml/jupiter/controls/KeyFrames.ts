import { UIElement } from "../UIElement";
import { KeyFrameCollection } from "./Core";
import { KeyFrame } from "./KeyFrame";

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

    public GetArray(): any[] {
        var keys = [];
        this._keyFrames.forEach((kf: KeyFrame) => {
            keys.push({
                frame: kf.Frame,
                value: kf.Value
            });
        });
        return keys;
    }
}
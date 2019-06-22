import { UIElement } from "../UIElement";
import { KeyFrames } from "./Core";

export class Animation extends UIElement {
    private _keyFrames: KeyFrames;
    private _dataType: number;
    private _loopMode: number;
    private _enableBlending: boolean;
    private _targetProperty: string;
    private _fps: number;

    get KeyFrames(): KeyFrames { return this._keyFrames; }
    get DataType(): number { return this._dataType; }
    get LoopMode(): number { return this._loopMode; }
    get EnableBlending(): boolean { return this._enableBlending; }
    get TargetProperty(): string { return this._targetProperty; }
    get FPS(): number { return this._fps; }

    set KeyFrames(value: KeyFrames) { this._keyFrames = value; }

    constructor() {
        super();
        this._keyFrames = new KeyFrames();
    }

    public LoadFromNode(node: any): void {
        try { this._targetProperty = node.attributes["TargetProperty"].value; } catch { }
        try { this._dataType = eval(`${node.attributes["DataType"].value}`); } catch (e) { }
        try { this._loopMode= eval(`${node.attributes["LoopMode"].value}`); } catch (e) { }
        try { this._enableBlending = node.attributes["EnableBlending"].value.toLowerCase() === 'true'; } catch (e) { }
        try { this._fps = parseInt(node.attributes["FPS"].value); } catch { }
    }
}
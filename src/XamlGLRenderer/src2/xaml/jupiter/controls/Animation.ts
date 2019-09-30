import { UIElement } from "../UIElement";
import { KeyFrames, Animations } from "./Core";
import { ISetValue } from "./ISetValue";

export class Animation extends UIElement implements ISetValue {

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
    set DataType(value: number) { this._dataType = value; }
    set LoopMode(value: number) { this._loopMode = value; }
    set EnableBlending(value: boolean) { this._enableBlending = value; }
    set TargetProperty(value: string) { this._targetProperty = value; }
    set FPS(value: number) { this._fps = value; }

    constructor() {
        super();
        this._keyFrames = new KeyFrames();
    }

    public Initialize(): void {
        this.CreateCtrl();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        //try { this._targetProperty = node.attributes["TargetProperty"].value; } catch { }
        //try { this._dataType = eval(`${node.attributes["DataType"].value}`); } catch (e) { }
        //try { this._loopMode= eval(`${node.attributes["LoopMode"].value}`); } catch (e) { }
        //try { this._enableBlending = node.attributes["EnableBlending"].value.toLowerCase() === 'true'; } catch (e) { }
        //try { this._fps = parseInt(node.attributes["FPS"].value); } catch { }


        this.UpdatePropertyByNode(node, "TargetProperty", "TargetProperty");
        this.UpdatePropertyByNodeAndFunction(node, "EnableBlending", "EnableBlending", this.ConvertToBoolean);
        this.UpdatePropertyByNodeAndFunction(node, "FPS", "FPS", parseInt);
        this.UpdatePropertyByNodeAndFunction(node, "DataType", "DataType", eval);
        this.UpdatePropertyByNodeAndFunction(node, "LoopMode", "LoopMode", eval);
    }

    SetValue(propertyName: string, value: any): void {
        switch (propertyName) {
            case "TargetProperty": this.UpdatePropertyByValue(propertyName, value, null); break;
            case "EnableBlending": this.UpdatePropertyByValue(propertyName, value, this.ConvertToBoolean); break;
            case "FPS": this.UpdatePropertyByValue(propertyName, value, parseInt); break;
            case "DataType":
            case "LoopMode": this.UpdatePropertyByValue(propertyName, value, eval); break;
        }
        this.RefreshCtrlProperty(propertyName);
    }

    RefreshCtrlProperty(propertyName: string): void {
        switch (propertyName) {
            case "LoopMode": if (this.HasValue(this.LoopMode)) this.Ctrl.loopMode = this.LoopMode; break;
            case "DataType": if (this.HasValue(this.DataType)) this.Ctrl.dataType = this.DataType; break;
            case "FPS": if (this.HasValue(this.FPS)) this.Ctrl.framePerSecond = this.FPS; break;
            case "TargetProperty": if (this.HasValue(this.TargetProperty)) this.Ctrl.targetProperty = this.TargetProperty ; break;
            case "EnableBlending": if (this.HasValue(this.EnableBlending)) this.Ctrl.enableBlending = this.EnableBlending; break;
        }
    }

    ClearCtrl(): void {
        if (!this.HasValue(this.Ctrl)) return;

        this.bjsCtrl.dispose();
        this.Ctrl = null;
    }

    CreateCtrl(): void {
        this.ClearCtrl();

        this.Ctrl = new BABYLON.Animation(this.Name, this.TargetProperty, this.FPS, this.DataType, this.LoopMode);
        this.Ctrl.setKeys(this.KeyFrames.GetArray());
        this.Parent.Parent.Ctrl.animations.push(this.Ctrl);
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            (parent as Animations).Animations.add(this);
            return true;
        }
        return false;
    }
}
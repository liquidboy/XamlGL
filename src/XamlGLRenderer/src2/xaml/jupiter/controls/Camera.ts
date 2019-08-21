import { UIElement } from "../UIElement";
import { Scene } from "./Core";
import { DIContainer } from "../../Core";

export class Camera extends UIElement {
    private _sceneName: string;
    private _target: BABYLON.Vector3;
    private _type: string;
    private _alpha: number;
    private _beta: number;
    private _radius: number;
    private _lowerBetaLimit: number;
    private _upperBetaLimit: number;
    private _lowerRadiusLimit: number;
    private _fov: number;
    private _minz: number;
    private _maxz: number;
    private _panningSensibility: number;

    get SceneName(): string { return this._sceneName; }
    get Target(): BABYLON.Vector3 { return this._target; }
    get Type(): string { return this._type; }
    get Alpha(): number { return this._alpha; }
    get Beta(): number { return this._beta; }
    get Radius(): number { return this._radius; }
    get LowerBetaLimit(): number { return this._lowerBetaLimit; }
    get UpperBetaLimit(): number { return this._upperBetaLimit; }
    get LowerRadiusLimit(): number { return this._lowerRadiusLimit; }
    get FOV(): number { return this._fov; }
    get MinZ(): number { return this._minz; }
    get MaxZ(): number { return this._maxz; }
    get PanningSensibility(): number { return this._panningSensibility; }

    set SceneName(value: string) { this._sceneName = value; }
    set Target(value: BABYLON.Vector3) { this._target = value; }
    set Type(value: string) { this._type = value; }
    set Alpha(value: number) { this._alpha = value; }
    set Beta(value: number) { this._beta = value; }
    set Radius(value: number) { this._radius = value; }
    set LowerBetaLimit(value: number) { this._lowerBetaLimit = value; }
    set UpperBetaLimit(value: number) { this._upperBetaLimit = value; }
    set LowerRadiusLimit(value: number) { this._lowerRadiusLimit = value; }
    set FOV(value: number) { this._fov = value; }
    set MinZ(value: number) { this._minz = value; }
    set MaxZ(value: number) { this._maxz = value; }
    set PanningSensibility(value: number) { this._panningSensibility = value; }

    public Initialize(): void {
        let canvas: HTMLCanvasElement = DIContainer.get("rootCanvas") as HTMLCanvasElement;
        let scene = this.VT.Get(this.SceneName) as Scene;
        if (this.Type === "FreeCamera") {
            this.Ctrl = new BABYLON.FreeCamera(this.Name, this.Position, scene.Ctrl);
            this.RefreshCtrlProperty("Target");
            this.RefreshCtrlProperty("FOV");
            this.RefreshCtrlProperty("MinZ");
            this.RefreshCtrlProperty("MaxZ");
            this.Ctrl.attachControl(canvas, true);
        }
        else if (this.Type === "UniversalCamera") {
            this.Ctrl = new BABYLON.UniversalCamera(this.Name, this.Position, scene.Ctrl);
            (this.Ctrl as BABYLON.UniversalCamera).setTarget(this.Target);
            this.Ctrl.attachControl(canvas, true);
        }
        else if (this.Type === "ArcRotateCamera") {
            this.Ctrl = new BABYLON.ArcRotateCamera(this.Name, this.Alpha, this.Beta, this.Radius, this.Target, scene.Ctrl); // need to do this here because RefreshCtrlProperty uses this.Ctrl
            this.RefreshCtrlProperty("LowerBetaLimit");
            this.RefreshCtrlProperty("UpperBetaLimit");
            this.RefreshCtrlProperty("LowerRadiusLimit");
            this.RefreshCtrlProperty("PanningSensibility");
            this.RefreshCtrlProperty("Position");
            this.Ctrl.attachControl(canvas, true, true);
        }
        
        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);

        this.UpdatePropertyByNode(node, "Scene", "SceneName");
        this.UpdatePropertyByNodeAndFunction(node, "Target", "Target", this.ConvertToNewBabylonObject);
        this.UpdatePropertyByNode(node, "Type", "Type");
        this.UpdatePropertyByNodeAndFunction(node, "Alpha", "Alpha", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "AlphaCalculated", "Alpha", eval);
        this.UpdatePropertyByNodeAndFunction(node, "Beta", "Beta", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "BetaCalculated", "Beta", eval);
        this.UpdatePropertyByNodeAndFunction(node, "Radius", "Radius", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "LowerBetaLimit", "LowerBetaLimit", eval);
        this.UpdatePropertyByNodeAndFunction(node, "UpperBetaLimit", "UpperBetaLimit", eval);
        this.UpdatePropertyByNodeAndFunction(node, "LowerRadiusLimit", "LowerRadiusLimit", eval);
        this.UpdatePropertyByNodeAndFunction(node, "FOV", "FOV", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "MinZ", "MinZ", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "MaxZ", "MaxZ", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "PanningSensibility", "PanningSensibility", parseFloat);
    }

    public SetValue(propertyName: string, value: any): void {
        switch (propertyName) {
            case "Target": this.UpdatePropertyByValue(propertyName, value, this.ConvertToNewBabylonObject); break;
            case "FOV": this.UpdatePropertyByValue(propertyName, value, parseFloat); break;
            case "MinZ": this.UpdatePropertyByValue(propertyName, value, parseFloat); break;
            case "MaxZ": this.UpdatePropertyByValue(propertyName, value, parseFloat); break;
            case "LowerBetaLimit": this.UpdatePropertyByValue(propertyName, value, eval); break;
            case "UpperBetaLimit": this.UpdatePropertyByValue(propertyName, value, eval); break;
            case "LowerRadiusLimit": this.UpdatePropertyByValue(propertyName, value, eval); break;
            case "PanningSensibility": this.UpdatePropertyByValue(propertyName, value, parseFloat); break;
            case "Position": this.UpdatePropertyByValue(propertyName, value, null); break;
        }
        this.RefreshCtrlProperty(propertyName);
    }

    private RefreshCtrlProperty(propertyName: string): void {
        switch (propertyName) {
            case "Target": if (this.HasValue(this.Target)) this.GetFreeCamera(this.Ctrl).setTarget(this.Target); break;
            case "FOV": if (this.HasValue(this.FOV)) this.GetFreeCamera(this.Ctrl).fov = this.FOV; break;
            case "MinZ": if (this.HasValue(this.MinZ)) this.GetFreeCamera(this.Ctrl).minZ = this.MinZ; break;
            case "MaxZ": if (this.HasValue(this.MaxZ)) this.GetFreeCamera(this.Ctrl).maxZ = this.MaxZ; break;
            case "LowerBetaLimit": if (this.HasValue(this.LowerBetaLimit)) this.GetArcCamera().lowerBetaLimit = this.LowerBetaLimit; break;
            case "UpperBetaLimit": if (this.HasValue(this.UpperBetaLimit)) this.GetArcCamera().upperBetaLimit = this.UpperBetaLimit; break;
            case "LowerRadiusLimit": if (this.HasValue(this.LowerRadiusLimit)) this.GetArcCamera().lowerRadiusLimit = this.LowerRadiusLimit; break;
            case "PanningSensibility": if (this.HasValue(this.PanningSensibility)) this.GetArcCamera().panningSensibility = this.PanningSensibility; break;
            case "Position": if (this.HasValue(this.Position)) this.GetArcCamera().position = this.Position; break;
        }
    }

    private GetFreeCamera(camera: BABYLON.Camera): BABYLON.FreeCamera{ return camera as BABYLON.FreeCamera; }
    private GetArcCamera(): BABYLON.ArcRotateCamera { return this.Ctrl as BABYLON.ArcRotateCamera; }
}
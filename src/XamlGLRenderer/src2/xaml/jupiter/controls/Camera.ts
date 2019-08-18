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
        if (this._type === "FreeCamera") {
            this.Ctrl = new BABYLON.FreeCamera(this.Name, this.Position, scene.Ctrl);
            if (this.HasValue(this.Target)) this.GetFreeCamera(this.Ctrl).setTarget(this.Target);
            if (this.HasValue(this.FOV)) this.GetFreeCamera(this.Ctrl).fov = this.FOV;
            if (this.HasValue(this.MinZ)) this.GetFreeCamera(this.Ctrl).minZ = this.MinZ;
            if (this.HasValue(this.MaxZ)) this.GetFreeCamera(this.Ctrl).maxZ = this.MaxZ;
            this.Ctrl.attachControl(canvas, true);
        }
        else if (this._type === "UniversalCamera") {
            this.Ctrl = new BABYLON.UniversalCamera(this.Name, this.Position, scene.Ctrl);
            (this.Ctrl as BABYLON.UniversalCamera).setTarget(this._target);
            this.Ctrl.attachControl(canvas, true);
        }
        else if (this._type === "ArcRotateCamera") {
            let arcCamera: BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera(this.Name, this._alpha, this._beta, this._radius,
                this._target, scene.Ctrl);
            if (this.HasValue(this.LowerBetaLimit)) arcCamera.lowerBetaLimit = this.LowerBetaLimit;
            if (this.HasValue(this.UpperBetaLimit)) arcCamera.upperBetaLimit = this.UpperBetaLimit;
            if (this.HasValue(this.LowerRadiusLimit)) arcCamera.lowerRadiusLimit = this.LowerRadiusLimit;
            if (this.HasValue(this.PanningSensibility)) arcCamera.panningSensibility = this.PanningSensibility;
            if (this.HasValue(this.Position)) arcCamera.position = this.Position;
            arcCamera.attachControl(canvas, true, true);
            this.Ctrl = arcCamera;
        }
        
        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);

        this.SetValueFromNode(node, "Scene", "SceneName");
        try { this._target = eval(`new BABYLON.${node.attributes["Target"].value};`); } catch (e) { }
        this.SetValueFromNode(node, "Type", "Type");

        this.SetFnValueFromNode(node, "Alpha", "Alpha", parseFloat);
        this.SetFnValueFromNode(node, "AlphaCalculated", "Alpha", eval);
        
        this.SetFnValueFromNode(node, "Beta", "Beta", parseFloat);
        this.SetFnValueFromNode(node, "BetaCalculated", "Beta", eval);
        
        this.SetFnValueFromNode(node, "Radius", "Radius", parseFloat);

        this.SetFnValueFromNode(node, "LowerBetaLimit", "LowerBetaLimit", eval);
        this.SetFnValueFromNode(node, "UpperBetaLimit", "UpperBetaLimit", eval);
        this.SetFnValueFromNode(node, "LowerRadiusLimit", "LowerRadiusLimit", eval);
        
        this.SetFnValueFromNode(node, "FOV", "FOV", parseFloat);
        this.SetFnValueFromNode(node, "MinZ", "MinZ", parseFloat);
        this.SetFnValueFromNode(node, "MaxZ", "MaxZ", parseFloat);
        this.SetFnValueFromNode(node, "PanningSensibility", "PanningSensibility", parseFloat);
    }


    private GetFreeCamera(camera: BABYLON.Camera): BABYLON.FreeCamera{
        return camera as BABYLON.FreeCamera;
    }
}
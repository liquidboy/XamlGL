import { UIElement } from "../UIElement";
import { Scene } from "./Core";
import { DIContainer } from "../../Core";

export class Camera extends UIElement {
    private _camera: BABYLON.Camera;

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

    get Camera(): BABYLON.Camera { return this._camera; }
    get SceneName(): string { return this._sceneName; }
    get Target(): BABYLON.Vector3 { return this._target; }
    get Type(): string { return this._type; }
    get Alpha(): number { return this._alpha; }
    get Beta(): number { return this._beta; }
    get Radius(): number { return this._radius; }
    get lowerBetaLimit(): number { return this._lowerBetaLimit; }
    get upperBetaLimit(): number { return this._upperBetaLimit; }
    get lowerRadiusLimit(): number { return this._lowerRadiusLimit; }
    get FOV(): number { return this._fov; }
    get MinZ(): number { return this._minz; }
    get MaxZ(): number { return this._maxz; }

    public Initialize(): void {
        let canvas: HTMLCanvasElement = DIContainer.get("rootCanvas") as HTMLCanvasElement;
        let scene = this.VT.Get(this.SceneName) as Scene;
        if (this._type === "FreeCamera") {
            this._camera = new BABYLON.FreeCamera(this.Name, this.Position, scene.Scene);
            if (this._target !== undefined) this.GetFreeCamera(this._camera).setTarget(this._target);
            if (this.FOV !== undefined) this.GetFreeCamera(this._camera).fov = this.FOV;
            if (this.MinZ !== undefined) this.GetFreeCamera(this._camera).minZ = this.MinZ;
            if (this.MaxZ !== undefined) this.GetFreeCamera(this._camera).maxZ = this.MaxZ;
        }
        else if (this._type === "UniversalCamera") {
            this._camera = new BABYLON.UniversalCamera(this.Name, this.Position, scene.Scene);
            (this._camera as BABYLON.UniversalCamera).setTarget(this._target);
        }
        else if (this._type === "ArcRotateCamera") {
            let arcCampera = new BABYLON.ArcRotateCamera(this.Name, this._alpha, this._beta, this._radius,
                this._target, scene.Scene);
            if (this._lowerBetaLimit) arcCampera.lowerBetaLimit = this._lowerBetaLimit;
            if (this._upperBetaLimit) arcCampera.upperBetaLimit = this._upperBetaLimit;
            if (this._lowerRadiusLimit) arcCampera.lowerRadiusLimit = this._lowerRadiusLimit;
            this._camera = arcCampera;
        }
        
        this._camera.attachControl(canvas, true);
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._sceneName = node.attributes["Scene"].value; } catch (e) { }
        try { this._target = eval(`new BABYLON.${node.attributes["Target"].value};`); } catch (e) { }
        try { this._type = node.attributes["Type"].value; } catch (e) { }
        try { this._alpha = parseFloat(node.attributes["Alpha"].value); } catch (e) { }
        try { this._beta = parseFloat(node.attributes["Beta"].value); } catch (e) { }
        try { this._radius = parseFloat(node.attributes["Radius"].value); } catch (e) { }
        try { this._lowerBetaLimit = eval(`${node.attributes["LowerBetaLimit"].value};`); } catch (e) { }
        try { this._upperBetaLimit = eval(`${node.attributes["UpperBetaLimit"].value};`); } catch (e) { }
        try { this._lowerRadiusLimit = eval(`${node.attributes["LowerRadiusLimit"].value};`); } catch (e) { }
        try { this._fov = parseFloat(node.attributes["FOV"].value); } catch (e) { }
        try { this._minz= parseFloat(node.attributes["MinZ"].value); } catch (e) { }
        try { this._maxz = parseFloat(node.attributes["MaxZ"].value); } catch (e) { }
    }


    private GetFreeCamera(camera: BABYLON.Camera): BABYLON.FreeCamera{
        return camera as BABYLON.FreeCamera;
    }
}
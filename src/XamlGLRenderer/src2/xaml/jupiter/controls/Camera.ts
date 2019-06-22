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
    private _lowerBetaLimit: number = 0.1;
    private _upperBetaLimit: number = (Math.PI / 2) * 0.99;
    private _lowerRadiusLimit: number = 150;

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

    public Initialize(): void {
        let canvas: HTMLCanvasElement = DIContainer.get("rootCanvas") as HTMLCanvasElement;
        let scene = this.VT.Get(this.SceneName) as Scene;
        if (this._type === "FreeCamera") {
            this._camera = new BABYLON.FreeCamera(this.Name, this.Position, scene.Scene);
            (this._camera as BABYLON.FreeCamera).setTarget(this._target);
        }
        else if (this._type === "UniversalCamera") {
            this._camera = new BABYLON.UniversalCamera(this.Name, this.Position, scene.Scene);
            (this._camera as BABYLON.UniversalCamera).setTarget(this._target);
        }
        else if (this._type === "ArcRotateCamera") {
            let arcCampera = new BABYLON.ArcRotateCamera(this.Name, 0, 0.8, 100, this._target, scene.Scene);
            arcCampera.lowerBetaLimit = this._lowerBetaLimit;
            arcCampera.upperBetaLimit = this._upperBetaLimit;
            arcCampera.lowerRadiusLimit = this._lowerRadiusLimit;
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
    }
}
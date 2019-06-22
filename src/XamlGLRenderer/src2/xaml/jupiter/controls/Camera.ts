import { UIElement } from "../UIElement";
import { Scene } from "./Core";

export class Camera extends UIElement {
    private _camera: BABYLON.Camera;

    private _sceneName: string;
    private _position: BABYLON.Vector3;
    private _target: BABYLON.Vector3;
    private _type: string;
    private _alpha: number;
    private _beta: number;
    private _radius: number;

    get SceneName(): string { return this._sceneName; }
    get Position(): BABYLON.Vector3 { return this._position; }
    get Target(): BABYLON.Vector3 { return this._target; }
    get Type(): string { return this._type; }
    get Alpha(): number { return this._alpha; }
    get Beta(): number { return this._beta; }
    get Radius(): number { return this._radius; }

    public InitializeCamera(scene: Scene, canvas: any): void {
        if (this._type === "FreeCamera") {
            this._camera = new BABYLON.FreeCamera(this.Name, this._position, scene.Scene);
            (this._camera as BABYLON.FreeCamera).setTarget(this._target);
        }
        else if (this._type === "UniversalCamera") {
            this._camera = new BABYLON.UniversalCamera(this.Name, this._position, scene.Scene);
            (this._camera as BABYLON.UniversalCamera).setTarget(this._target);
        }
        else if (this._type === "ArcRotateCamera") this._camera = new BABYLON.ArcRotateCamera(this.Name, 0, 0.8, 100, this._target, scene.Scene);
        
        this._camera.attachControl(canvas, true);
    }

    public LoadFromNode(node: any): void {
        try { this._sceneName = node.attributes["Scene"].value; } catch (e) { }
        try { this._target = eval(`new BABYLON.${node.attributes["Target"].value};`); } catch (e) { }
        try { this._type = node.attributes["Type"].value; } catch (e) { }
        try { this._alpha = parseFloat(node.attributes["Alpha"].value); } catch (e) { }
        try { this._beta = parseFloat(node.attributes["Beta"].value); } catch (e) { }
        try { this._radius = parseFloat(node.attributes["Radius"].value); } catch (e) { }
        try { this._position = eval(`new BABYLON.${node.attributes["Position"].value};`); } catch (e) { }
    }
}
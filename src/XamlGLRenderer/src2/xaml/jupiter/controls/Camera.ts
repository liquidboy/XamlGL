import { UIElement } from "../UIElement";
import { Scene } from "./Core";

export class Camera extends UIElement {
    private _camera: BABYLON.FreeCamera;

    private _sceneName: string;
    get SceneName(): string { return this._sceneName; }

    private _position: BABYLON.Vector3;
    get Position(): BABYLON.Vector3 { return this._position; }

    private _target: BABYLON.Vector3;
    get Target(): BABYLON.Vector3 { return this._target; }

    public Initialize(scene: Scene, canvas: any): void {
        this._camera = new BABYLON.FreeCamera('freeCamera', this._position, scene.Scene);
        this._camera.setTarget(this._target);
        this._camera.attachControl(canvas, true);
    }

    public LoadFromNode(node: any): void {
        try {
            this._sceneName = node.attributes["Scene"].value;
            this._position = eval(`new BABYLON.${node.attributes["Position"].value};`);
            this._target = eval(`new BABYLON.${node.attributes["Target"].value};`);
        }
        catch { }
    }
}
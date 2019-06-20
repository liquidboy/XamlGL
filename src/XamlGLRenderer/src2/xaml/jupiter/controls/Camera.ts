import { UIElement } from "../UIElement";
import { Scene } from "./Core";

export class Camera extends UIElement {
    private _camera: BABYLON.FreeCamera;

    public Initialize(scene: Scene, canvas: any): void {
        this._camera = new BABYLON.FreeCamera('freeCamera', new BABYLON.Vector3(0, 5, -10), scene.Scene);
        this._camera.setTarget(BABYLON.Vector3.Zero());
        this._camera.attachControl(canvas, true);
    }
}
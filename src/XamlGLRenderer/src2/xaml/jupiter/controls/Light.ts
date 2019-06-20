import { UIElement } from "../UIElement";
import { Scene } from "./Core";

export class Light extends UIElement {
    private _light: BABYLON.Light;

    private _sceneName: string;
    get SceneName(): string { return this._sceneName; }

    public Initialize(scene: Scene): void {
        this._light = new BABYLON.HemisphericLight('skyLight', new BABYLON.Vector3(0, 1, 0), scene.Scene);
    }

    public LoadFromNode(node: any): void {
        try {
            this._sceneName = node.attributes["Scene"].value;
        }
        catch { }
    }
}
import { UIElement } from "../UIElement";
import { Scene } from "./Core";

export class Material extends UIElement {
    private _material: BABYLON.Material;
    get Material() { return this._material;}

    private _sceneName: string;
    get SceneName() { return this._sceneName; }

    private _wireframe: boolean;
    get Wireframe() { return this._wireframe; }

    public Initialize(scene: Scene): void {
        this._material = new BABYLON.StandardMaterial(this.Name, scene.Scene);
    }

    public LoadFromNode(node: any): void {
        try {
            this._sceneName = node.attributes["Scene"].value;
            this._wireframe = node.attributes["Wireframe"].value as boolean;
        }
        catch { }
    }
}
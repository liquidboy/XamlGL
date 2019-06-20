import { UIElement } from "../UIElement";
import { Scene } from "./Core";

export class Ground extends UIElement {
    private _mesh: BABYLON.Mesh;

    private _sceneName: string;
    get SceneName(): string { return this._sceneName; }

    public Initialize(scene: Scene): void {
        this._mesh = BABYLON.MeshBuilder.CreateGround(this.Name, { width: 6, height: 6, subdivisions: 2 }, scene.Scene);
    }

    public LoadFromNode(node: any): void {
        try {
            this._sceneName = node.attributes["Scene"].value;
        }
        catch { }
    }
}
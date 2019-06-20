import { UIElement } from "../UIElement";
import { Scene, Material } from "./Core";

export class Sphere extends UIElement {
    private _mesh: BABYLON.Mesh;

    private _sceneName: string;
    get SceneName() { return this._sceneName; }

    private _materialName: string;
    get MaterialName() { return this._materialName; }

    public InitializeWithMaterial(scene: Scene, material: Material): void {
        this._mesh = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, scene.Scene);
        this._mesh.position.y = 1; //not a magic number, but half or our diameter and height
        this._mesh.material = material.Material;
    }

    public LoadFromNode(node: any): void {
        try {
            this._sceneName = node.attributes["Scene"].value;
            this._materialName = node.attributes["Material"].value;
        }
        catch { }
    }
}
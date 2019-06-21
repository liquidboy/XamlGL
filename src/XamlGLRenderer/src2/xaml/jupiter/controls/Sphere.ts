import { UIElement } from "../UIElement";
import { Scene, Material } from "./Core";
import { MeshNormalLines } from "../../extensions/MeshNormalLines";

export class Sphere extends UIElement {
    private _mesh: BABYLON.Mesh;

    private _sceneName: string;
    get SceneName(): string { return this._sceneName; }

    private _materialName: string;
    get MaterialName(): string { return this._materialName; }

    private _showNormalLines: boolean;
    get ShowNormalLines(): boolean { return this._showNormalLines; }

    public InitializeWithMaterial(scene: Scene, material: Material): void {
        this._mesh = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, scene.Scene);
        this._mesh.position.y = 1; //not a magic number, but half or our diameter and height
        this._mesh.material = material.Material;

        if(this._showNormalLines) MeshNormalLines.Install(scene, this._mesh);
    }

    public LoadFromNode(node: any): void {
        try {
            this._sceneName = node.attributes["Scene"].value;
            this._materialName = node.attributes["Material"].value;
            this._showNormalLines = node.attributes["ShowNormalLines"].value.toLowerCase() === 'true';
        }
        catch { }
    }
}
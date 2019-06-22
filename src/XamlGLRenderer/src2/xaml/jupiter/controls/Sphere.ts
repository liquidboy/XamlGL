import { UIElement } from "../UIElement";
import { Scene, Material } from "./Core";
import { MeshNormalLines } from "../../behaviors/MeshNormalLines";

export class Sphere extends UIElement {
    private _mesh: BABYLON.Mesh;

    private _sceneName: string;
    private _materialName: string;
    private _showNormalLines: boolean;
    private _segments: number;
    private _diameter: number;

    get SceneName(): string { return this._sceneName; }
    get MaterialName(): string { return this._materialName; }
    get ShowNormalLines(): boolean { return this._showNormalLines; }
    get Segments(): number { return this._segments; }
    get Diameter(): number { return this._diameter; }    

    public InitializeWithMaterial(scene: Scene, material: Material): void {
        this._mesh = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: this._segments, diameter: this._diameter }, scene.Scene);
        this._mesh.position = this.Position;
        this._mesh.material = material.Material;

        if(this._showNormalLines) MeshNormalLines.Install(scene, this._mesh);
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._sceneName = node.attributes["Scene"].value; } catch (e) { }
        try { this._materialName = node.attributes["Material"].value; } catch (e) { }
        try { this._showNormalLines = node.attributes["ShowNormalLines"].value.toLowerCase() === 'true'; } catch (e) { }
        try { this._segments = parseInt(node.attributes["Segments"].value); } catch (e) { }
        try { this._diameter = parseFloat(node.attributes["Diameter"].value); } catch (e) { }
    }
}
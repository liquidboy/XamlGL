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

    private _segments: number;
    get Segments(): number { return this._segments; }

    private _diameter: number;
    get Diameter(): number { return this._diameter; }

    public InitializeWithMaterial(scene: Scene, material: Material): void {
        this._mesh = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: this._segments, diameter: this._diameter }, scene.Scene);
        this._mesh.position.y = 1; //not a magic number, but half or our diameter and height
        this._mesh.material = material.Material;

        if(this._showNormalLines) MeshNormalLines.Install(scene, this._mesh);
    }

    public LoadFromNode(node: any): void {
        try { this._sceneName = node.attributes["Scene"].value; } catch (e) { }
        try { this._materialName = node.attributes["Material"].value; } catch (e) { }
        try { this._showNormalLines = node.attributes["ShowNormalLines"].value.toLowerCase() === 'true'; } catch (e) { }
        try { this._segments = parseInt(node.attributes["Segments"].value); } catch (e) { }
        try { this._diameter = parseFloat(node.attributes["Diameter"].value); } catch (e) { }
    }
}
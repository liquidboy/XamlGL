import { UIElement } from "../UIElement";
import { Scene, Material } from "./Core";
import { MeshNormalLines } from "../../behaviors/MeshNormalLines";

export class Sphere extends UIElement {
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

    set SceneName(value: string) { this._sceneName = value; }
    set MaterialName(value: string) { this._materialName = value; }
    set ShowNormalLines(value: boolean) { this._showNormalLines = value; }
    set Segments(value: number) { this._segments = value; }
    set Diameter(value: number) { this._diameter = value; }    

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;
        let material: Material = this.VT.Get(this.MaterialName) as Material;

        this.Ctrl = BABYLON.Mesh.CreateSphere(this.Name, this.Segments, this.Diameter, scene.Ctrl);
        //this._mesh = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: this._segments, diameter: this._diameter }, scene.Scene);
        if (this.HasValue(this.Position)) this.Ctrl.position = this.Position;
        if (this.HasValue(material)) this.Ctrl.material = material.Ctrl;

        if (this.HasValue(this.ShowNormalLines) && this.ShowNormalLines) MeshNormalLines.Install(scene, this.Ctrl);
        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);

        this.UpdatePropertyByNode(node, "Scene", "SceneName");
        this.UpdatePropertyByNode(node, "Material", "MaterialName");
        this.UpdatePropertyByNodeAndFunction(node, "ShowNormalLines", "ShowNormalLines", this.ConvertToBoolean);
        this.UpdatePropertyByNodeAndFunction(node, "Segments", "Segments", parseInt);
        this.UpdatePropertyByNodeAndFunction(node, "Diameter", "Diameter", parseFloat);

    }
}
﻿import { UIElement } from "../UIElement";
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
        if (this.Position !== undefined) this.Ctrl.position = this.Position;
        if (material !== undefined) this.Ctrl.material = material.Ctrl;

        if (this._showNormalLines) MeshNormalLines.Install(scene, this.Ctrl);
        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);

        if (node.hasAttribute("Scene")) this.SetValue("SceneName", node.attributes["Scene"].value);
        if (node.hasAttribute("Material")) this.SetValue("MaterialName", node.attributes["Material"].value);
        if (node.hasAttribute("ShowNormalLines")) this.SetValue("ShowNormalLines", node.attributes["ShowNormalLines"].value.toLowerCase() === 'true');
        if (node.hasAttribute("Segments")) this.SetValue("Segments", parseInt(node.attributes["Segments"].value));
        if (node.hasAttribute("Diameter")) this.SetValue("Diameter", parseFloat(node.attributes["Diameter"].value));
    }
}
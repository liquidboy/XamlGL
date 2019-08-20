import { UIElement } from "../UIElement";
import { Scene } from "./Core";
import { Material } from "./Material";

export class Ground extends UIElement {
    private _sceneName: string;
    private _width: number;
    private _height: number;
    private _subdivisions: number;
    private _materialName: string;

    get SceneName(): string { return this._sceneName; }
    get Width(): number { return this._width; }
    get Height(): number { return this._height; }
    get SubDivisions(): number { return this._subdivisions; }
    get MaterialName(): string { return this._materialName; }

    set SceneName(value: string) { this._sceneName = value; }
    set Width(value: number) { this._width = value; }
    set Height(value: number) { this._height = value; }
    set SubDivisions(value: number) { this._subdivisions = value; }
    set MaterialName(value: string) { this._materialName = value; }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;
        let material: Material = this.VT.Get(this.MaterialName) as Material;

        //this._mesh = BABYLON.MeshBuilder.CreateGround(this.Name, { width: this._width, height: this._height, subdivisions: this._subdivisions }, scene.Scene);
        this.Ctrl = BABYLON.Mesh.CreateGround(this.Name, this._width, this._height, this._subdivisions, scene.Ctrl, false);
        if (material && material.Ctrl) this.Ctrl.material = material.Ctrl;
        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        this.UpdatePropertyByNode(node, "Scene", "SceneName");
        this.UpdatePropertyByNode(node, "Material", "MaterialName");
        this.UpdatePropertyByNodeAndFunction(node, "Width", "Width", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "Height", "Height", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "SubDivisions", "SubDivisions", parseInt);
    }
}
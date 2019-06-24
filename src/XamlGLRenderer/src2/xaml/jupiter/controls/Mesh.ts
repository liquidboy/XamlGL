import { UIElement } from "../UIElement";
import { Scene } from "./Core";
import { Material } from "./Material";

export class Mesh extends UIElement {
    private _mesh: BABYLON.Mesh;

    private _sceneName: string;
    private _width: number;
    private _height: number;
    private _subdivisions: number;
    private _materialName: string;

    get Mesh(): BABYLON.Mesh { return this._mesh; }
    get SceneName(): string { return this._sceneName; }
    get Width(): number { return this._width; }
    get Height(): number { return this._height; }
    get SubDivisions(): number { return this._subdivisions; }
    get MaterialName(): string { return this._materialName; }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;
        let material: Material = this.VT.Get(this.MaterialName) as Material;

        this._mesh = new BABYLON.Mesh(this.Name, scene.Scene);
        if (material && material.Material) this._mesh.material = material.Material;
        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._sceneName = node.attributes["Scene"].value; } catch { }
        try { this._width = parseFloat(node.attributes["Width"].value); } catch { }
        try { this._height = parseFloat(node.attributes["Height"].value); } catch { }
        try { this._subdivisions = parseInt(node.attributes["SubDivisions"].value); } catch { }
        try { this._materialName = node.attributes["Material"].value; } catch { }
    }
}
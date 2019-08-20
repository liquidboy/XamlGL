import { UIElement } from "../UIElement";
import { Scene } from "./Core";
import { Material } from "./Material";

export class Mesh extends UIElement {
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
        
        this.Ctrl = new BABYLON.Mesh(this.Name, scene.Ctrl);
        if (this.HasValue(this.MaterialName)) {
            let material: Material = this.VT.Get(this.MaterialName) as Material;
            if (material && material.Ctrl) this.Ctrl.material = material.Ctrl;
        }
        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        this.UpdatePropertyByNode(node, "Scene", "SceneName");
        this.UpdatePropertyByNodeAndFunction(node, "Width", "Width", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "Height", "Height", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "SubDivisions", "SubDivisions", parseInt);
        this.UpdatePropertyByNode(node, "Material", "MaterialName");
    }
}
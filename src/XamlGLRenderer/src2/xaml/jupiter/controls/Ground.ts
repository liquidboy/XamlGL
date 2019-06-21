import { UIElement } from "../UIElement";
import { Scene } from "./Core";

export class Ground extends UIElement {
    private _mesh: BABYLON.Mesh;

    private _sceneName: string;
    private _width: number;
    private _height: number;
    private _subdivisions: number;

    get SceneName(): string { return this._sceneName; }
    get Width(): number { return this._width; }
    get Height(): number { return this._height; }
    get SubDivisions(): number { return this._subdivisions; }

    public Initialize(scene: Scene): void {
        this._mesh = BABYLON.MeshBuilder.CreateGround(this.Name, { width: this._width, height: this._height, subdivisions: this._subdivisions }, scene.Scene);
    }

    public LoadFromNode(node: any): void {
        try { this._sceneName = node.attributes["Scene"].value; } catch { }
        try { this._width = parseFloat(node.attributes["Width"].value); } catch { }
        try { this._height = parseFloat(node.attributes["Height"].value); } catch { }
        try { this._subdivisions = parseInt(node.attributes["SubDivisions"].value); } catch { }
    }
}
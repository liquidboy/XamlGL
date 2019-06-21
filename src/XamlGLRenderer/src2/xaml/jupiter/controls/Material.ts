import { UIElement } from "../UIElement";
import { Scene } from "./Core";

export class Material extends UIElement {
    private _material: BABYLON.Material;
    get Material(): BABYLON.Material { return this._material;}

    private _sceneName: string;
    get SceneName(): string { return this._sceneName; }

    private _wireframe: boolean;
    get Wireframe(): boolean { return this._wireframe; }

    private _diffuseColor: BABYLON.Color3;
    get DiffuseColor(): BABYLON.Color3 { return this._diffuseColor; }

    public Initialize(scene: Scene): void {
        this._material = new BABYLON.StandardMaterial(this.Name, scene.Scene);
        this._material.wireframe = this._wireframe;
        if (this._diffuseColor !== undefined) (this._material as BABYLON.StandardMaterial).diffuseColor = this._diffuseColor;
    }

    public LoadFromNode(node: any): void {
        try { this._sceneName = node.attributes["Scene"].value; } catch (e) { }
        try { this._wireframe = node.attributes["Wireframe"].value.toLowerCase() === 'true'; } catch (e) { }
        try { this._diffuseColor = eval(`new BABYLON.${node.attributes["DiffuseColor"].value};`); } catch (e) { }
    }
}
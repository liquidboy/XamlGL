import { UIElement } from "../UIElement";
import { Scene } from "./Core";

export class Material extends UIElement {
    private _material: BABYLON.Material;
    private _sceneName: string;
    private _wireframe: boolean;
    private _diffuseColor: BABYLON.Color3;
    private _specularColor: BABYLON.Color3;
    private _emissiveColor: BABYLON.Color3;

    get Material(): BABYLON.Material { return this._material; }
    get SceneName(): string { return this._sceneName; }
    get Wireframe(): boolean { return this._wireframe; }
    get DiffuseColor(): BABYLON.Color3 { return this._diffuseColor; }
    get SpecularColor(): BABYLON.Color3 { return this._specularColor; }
    get EmissiveColor(): BABYLON.Color3 { return this._emissiveColor; }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;

        this._material = new BABYLON.StandardMaterial(this.Name, scene.Scene);
        this._material.wireframe = this._wireframe;
        if (this._diffuseColor !== undefined) (this._material as BABYLON.StandardMaterial).diffuseColor = this._diffuseColor;
        if (this._specularColor !== undefined) (this._material as BABYLON.StandardMaterial).specularColor = this._specularColor;
        if (this._emissiveColor !== undefined) (this._material as BABYLON.StandardMaterial).emissiveColor = this._emissiveColor;
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._sceneName = node.attributes["Scene"].value; } catch (e) { }
        try { this._wireframe = node.attributes["Wireframe"].value.toLowerCase() === 'true'; } catch (e) { }
        try { this._diffuseColor = eval(this.cleanBabylonColor3Attribute(node.attributes["DiffuseColor"].value)); } catch (e) { }
        try { this._specularColor = eval(this.cleanBabylonColor3Attribute(node.attributes["SpecularColor"].value)); } catch (e) { }
        try { this._emissiveColor = eval(this.cleanBabylonColor3Attribute(node.attributes["EmissiveColor"].value)); } catch (e) { }
    }

    private cleanBabylonColor3Attribute(color3: string): string {
        if (color3.includes("Color3.")) return `BABYLON.${color3};`;
        return `new BABYLON.${color3};`;
    }
}
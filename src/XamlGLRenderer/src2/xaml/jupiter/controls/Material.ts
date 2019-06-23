import { UIElement } from "../UIElement";
import { Scene } from "./Core";
import { Texture } from "./Texture";

export class Material extends UIElement {
    private _material: BABYLON.Material;
    private _sceneName: string;
    private _wireframe: boolean;
    private _diffuseColor: BABYLON.Color3;
    private _specularColor: BABYLON.Color3;
    private _emissiveColor: BABYLON.Color3;
    private _disableLighting: boolean;
    private _backFaceCulling: boolean;
    private _reflectionTextureName: string;

    get Material(): BABYLON.Material { return this._material; }
    get SceneName(): string { return this._sceneName; }
    get Wireframe(): boolean { return this._wireframe; }
    get DiffuseColor(): BABYLON.Color3 { return this._diffuseColor; }
    get SpecularColor(): BABYLON.Color3 { return this._specularColor; }
    get EmissiveColor(): BABYLON.Color3 { return this._emissiveColor; }
    get DisableLighting(): boolean { return this._disableLighting; }
    get BackFaceCulling(): boolean { return this._backFaceCulling; }
    get ReflectionTextureName(): string { return this._reflectionTextureName; }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;

        this._material = new BABYLON.StandardMaterial(this.Name, scene.Scene);
        this._material.wireframe = this._wireframe;
        if (this._diffuseColor !== undefined) this.GetStandardMaterial(this._material).diffuseColor  = this._diffuseColor;
        if (this._specularColor !== undefined) this.GetStandardMaterial(this._material).specularColor = this._specularColor;
        if (this._emissiveColor !== undefined) this.GetStandardMaterial(this._material).emissiveColor = this._emissiveColor;
        if (this._disableLighting !== undefined) this.GetStandardMaterial(this._material).disableLighting = this._disableLighting;
        if (this._backFaceCulling !== undefined) this.GetStandardMaterial(this._material).backFaceCulling = this._backFaceCulling;
        if (this._reflectionTextureName !== undefined) {
            let rt: Texture = this.VT.Get(this.ReflectionTextureName) as Texture;
            if (rt.Texture !== undefined && rt.Texture.isReadyOrNotBlocking)
                this.GetStandardMaterial(this._material).reflectionTexture = rt.Texture;
        };
        
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._sceneName = node.attributes["Scene"].value; } catch (e) { }
        try { this._wireframe = node.attributes["Wireframe"].value.toLowerCase() === 'true'; } catch (e) { }
        try { this._diffuseColor = eval(this.cleanBabylonColor3Attribute(node.attributes["DiffuseColor"].value)); } catch (e) { }
        try { this._specularColor = eval(this.cleanBabylonColor3Attribute(node.attributes["SpecularColor"].value)); } catch (e) { }
        try { this._emissiveColor = eval(this.cleanBabylonColor3Attribute(node.attributes["EmissiveColor"].value)); } catch (e) { }
        try { this._reflectionTextureName = node.attributes["ReflectionTexture"].value; } catch (e) { }
        try { this._disableLighting = node.attributes["DisableLighting"].value.toLowerCase() === 'true'; } catch (e) { }
        try { this._backFaceCulling = node.attributes["BackFaceCulling"].value.toLowerCase() === 'true'; } catch (e) { }
    }

    private cleanBabylonColor3Attribute(color3: string): string {
        if (color3.includes("Color3.")) return `BABYLON.${color3};`;
        return `new BABYLON.${color3};`;
    }

    private GetStandardMaterial(material: BABYLON.Material): BABYLON.StandardMaterial{
        return material as BABYLON.StandardMaterial;
    }
}
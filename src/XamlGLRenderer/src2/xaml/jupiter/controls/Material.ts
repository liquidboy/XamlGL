import { UIElement } from "../UIElement";
import { Scene } from "./Core";
import { Texture } from "./Texture";
import 'babylonjs-materials';

export class Material extends UIElement {
    private _material: BABYLON.Material;
    private _sceneName: string;
    private _type: string;
    private _wireframe: boolean;
    private _diffuseColor: BABYLON.Color3;
    private _specularColor: BABYLON.Color3;
    private _emissiveColor: BABYLON.Color3;
    private _disableLighting: boolean;
    private _backFaceCulling: boolean;
    private _reflectionTextureName: string;
    private _shaderPath: any;
    private _options: any;

    get Material(): BABYLON.Material { return this._material; }
    get SceneName(): string { return this._sceneName; }
    get Type(): string { return this._type; }
    get Wireframe(): boolean { return this._wireframe; }
    get DiffuseColor(): BABYLON.Color3 { return this._diffuseColor; }
    get SpecularColor(): BABYLON.Color3 { return this._specularColor; }
    get EmissiveColor(): BABYLON.Color3 { return this._emissiveColor; }
    get DisableLighting(): boolean { return this._disableLighting; }
    get BackFaceCulling(): boolean { return this._backFaceCulling; }
    get ReflectionTextureName(): string { return this._reflectionTextureName; }
    get ShaderPath(): any { return this._shaderPath; }
    get Options(): any { return this._options; }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;
        if (this.Type === "StandardMaterial") {
            this._material = new BABYLON.StandardMaterial(this.Name, scene.Scene);
            this._material.wireframe = this._wireframe;
            if (this._diffuseColor !== undefined) this.GetStandardMaterial(this._material).diffuseColor = this._diffuseColor;
            if (this._specularColor !== undefined) this.GetStandardMaterial(this._material).specularColor = this._specularColor;
            if (this._emissiveColor !== undefined) this.GetStandardMaterial(this._material).emissiveColor = this._emissiveColor;
            if (this._disableLighting !== undefined) this.GetStandardMaterial(this._material).disableLighting = this._disableLighting;
            if (this._backFaceCulling !== undefined) this.GetStandardMaterial(this._material).backFaceCulling = this._backFaceCulling;
            if (this._reflectionTextureName !== undefined) {
                let rt: Texture = this.VT.Get(this.ReflectionTextureName) as Texture;
                if (rt.Texture !== undefined && rt.Texture.isReadyOrNotBlocking)
                    this.GetStandardMaterial(this._material).reflectionTexture = rt.Texture;
            };
        } else if (this.Type === "ShaderMaterial") {
            this._material = new BABYLON.ShaderMaterial("cloud", scene.Scene, this.ShaderPath, this.Options);
        } else if (this.Type === "GridMaterial") {
            this._material= new BABYLON.GridMaterial(this.Name, scene.Scene);            
        }
        
        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._sceneName = node.attributes["Scene"].value; } catch (e) { }
        try { this._type= node.attributes["Type"].value; } catch (e) { }
        try { this._wireframe = node.attributes["Wireframe"].value.toLowerCase() === 'true'; } catch (e) { }
        try { this._diffuseColor = eval(this.cleanBabylonColor3Attribute(node.attributes["DiffuseColor"].value)); } catch (e) { }
        try { this._specularColor = eval(this.cleanBabylonColor3Attribute(node.attributes["SpecularColor"].value)); } catch (e) { }
        try { this._emissiveColor = eval(this.cleanBabylonColor3Attribute(node.attributes["EmissiveColor"].value)); } catch (e) { }
        try { this._reflectionTextureName = node.attributes["ReflectionTexture"].value; } catch (e) { }
        try { this._disableLighting = node.attributes["DisableLighting"].value.toLowerCase() === 'true'; } catch (e) { }
        try { this._backFaceCulling = node.attributes["BackFaceCulling"].value.toLowerCase() === 'true'; } catch (e) { }
        try { this._shaderPath = this.CleanJSONObject(node.attributes["ShaderPath"].value); } catch (e) { }
        try { this._options = this.CleanJSONObject(node.attributes["Options"].value); } catch (e) { }
    }

    private CleanJSONObject(stringToClean: string): any {
        var cleanString = stringToClean.replace(/`/g, "\"")
        var newObject = JSON.parse(cleanString);
        return newObject;
    }

    private cleanBabylonColor3Attribute(color3: string): string {
        if (color3.includes("Color3.")) return `BABYLON.${color3};`;
        return `new BABYLON.${color3};`;
    }

    private GetStandardMaterial(material: BABYLON.Material): BABYLON.StandardMaterial{
        return material as BABYLON.StandardMaterial;
    }
}
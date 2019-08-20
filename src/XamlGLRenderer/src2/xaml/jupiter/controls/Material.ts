import { UIElement } from "../UIElement";
import { Scene } from "./Core";
import { Texture } from "./Texture";
import 'babylonjs-materials';

export class Material extends UIElement {
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

    set SceneName(value: string) { this._sceneName = value; }
    set Type(value: string) { this._type = value; }
    set Wireframe(value: boolean) { this._wireframe = value; }
    set DiffuseColor(value: BABYLON.Color3) { this._diffuseColor = value; }
    set SpecularColor(value: BABYLON.Color3) { this._specularColor = value; }
    set EmissiveColor(value: BABYLON.Color3) { this._emissiveColor = value; }
    set DisableLighting(value: boolean) { this._disableLighting = value; }
    set BackFaceCulling(value: boolean) { this._backFaceCulling = value; }
    set ReflectionTextureName(value: string) { this._reflectionTextureName = value; }
    set ShaderPath(value: any) { this._shaderPath = value; }
    set Options(value: any) { this._options = value; }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;
        if (this.Type === "StandardMaterial") {
            this.Ctrl = new BABYLON.StandardMaterial(this.Name, scene.Ctrl);
            if (this.HasValue(this.Wireframe)) this.Ctrl.wireframe = this.Wireframe;
            if (this.HasValue(this.DiffuseColor)) this.GetStandardMaterial(this.Ctrl).diffuseColor = this.DiffuseColor;
            if (this.HasValue(this.SpecularColor)) this.GetStandardMaterial(this.Ctrl).specularColor = this.SpecularColor;
            if (this.HasValue(this.EmissiveColor)) this.GetStandardMaterial(this.Ctrl).emissiveColor = this.EmissiveColor;
            if (this.HasValue(this.DisableLighting)) this.GetStandardMaterial(this.Ctrl).disableLighting = this.DisableLighting;
            if (this.HasValue(this.BackFaceCulling)) this.GetStandardMaterial(this.Ctrl).backFaceCulling = this.BackFaceCulling;
            if (this.HasValue(this.ReflectionTextureName)) {
                let rt: Texture = this.VT.Get(this.ReflectionTextureName) as Texture;
                if (rt.Ctrl !== undefined && rt.Ctrl.isReadyOrNotBlocking)
                    this.Ctrl.reflectionTexture = rt.Ctrl;
                    //this.GetStandardMaterial(this.Ctrl).reflectionTexture = rt.Ctrl;
            };
        } else if (this.Type === "ShaderMaterial") {
            this.Ctrl = new BABYLON.ShaderMaterial("cloud", scene.Ctrl, this.ShaderPath, this.Options);
        } else if (this.Type === "GridMaterial") {
            this.Ctrl = new BABYLON.GridMaterial(this.Name, scene.Ctrl);            
        }
        
        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        this.UpdatePropertyByNode(node, "Scene", "SceneName");
        this.UpdatePropertyByNode(node, "Type", "Type");
        this.UpdatePropertyByNodeAndFunction(node, "Wireframe", "Wireframe", this.ConvertToBoolean);
        
        this.UpdatePropertyByNodeAndFunction(node, "DiffuseColor", "DiffuseColor", this.CleanBabylonColor3Attribute);
        this.UpdatePropertyByNodeAndFunction(node, "SpecularColor", "SpecularColor", this.CleanBabylonColor3Attribute);
        this.UpdatePropertyByNodeAndFunction(node, "EmissiveColor", "EmissiveColor", this.CleanBabylonColor3Attribute);
        
        this.UpdatePropertyByNode(node, "ReflectionTexture", "ReflectionTextureName");

        this.UpdatePropertyByNodeAndFunction(node, "DisableLighting", "DisableLighting", this.ConvertToBoolean);
        this.UpdatePropertyByNodeAndFunction(node, "BackFaceCulling", "BackFaceCulling", this.ConvertToBoolean);

        this.UpdatePropertyByNodeAndFunction(node, "ShaderPath", "ShaderPath", this.CleanJSONObject);
        this.UpdatePropertyByNodeAndFunction(node, "Options", "Options", this.CleanJSONObject);
    }

    private CleanJSONObject(stringToClean: string): any {
        var cleanString = stringToClean.replace(/`/g, "\"")
        var newObject = JSON.parse(cleanString);
        return newObject;
    }

    private GetStandardMaterial(material: BABYLON.Material): BABYLON.StandardMaterial{
        return material as BABYLON.StandardMaterial;
    }
}
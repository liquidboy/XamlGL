import { UIElement } from "../UIElement";
import { Scene } from "./Core";

export class Light extends UIElement {
    private _light: BABYLON.Light;
    private _sceneName: string;
    private _direction: BABYLON.Vector3;
    private _type: string;
    private _diffuseColor: BABYLON.Color3;
    private _specularColor: BABYLON.Color3;
    private _intensity: number;

    get Light(): BABYLON.Light { return this._light; }
    get SceneName(): string { return this._sceneName; }
    get Direction(): BABYLON.Vector3 { return this._direction; }
    get Type(): string { return this._type; }
    get DiffuseColor(): BABYLON.Color3 { return this._diffuseColor; }
    get SpecularColor(): BABYLON.Color3 { return this._specularColor; }
    get Intensity(): number { return this._intensity; }
    
    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;

        if (this._type === "HemisphericLight") this._light = new BABYLON.HemisphericLight(this.Name, this._direction, scene.Scene);
        else if (this._type === "PointLight") {
            let pl: BABYLON.Light = new BABYLON.PointLight(this.Name, this._direction, scene.Scene);
            if (this._diffuseColor) pl.diffuse = this._diffuseColor; 
            if (this._specularColor) pl.specular = this._specularColor;
            if (this._intensity) pl.intensity = this._intensity;
            this._light = pl;
        } else if (this._type === "DirectionalLight") {
            let pl: BABYLON.Light = new BABYLON.DirectionalLight(this.Name, this._direction, scene.Scene);
            if (this._diffuseColor) pl.diffuse = this._diffuseColor;
            if (this._specularColor) pl.specular = this._specularColor;
            this._light = pl;
        } 
        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._sceneName = node.attributes["Scene"].value; } catch { }
        try { this._direction = eval(`new BABYLON.${node.attributes["Direction"].value};`); } catch (e) { }
        try { this._type = node.attributes["Type"].value; } catch (e) { }
        try { this._diffuseColor = eval(this.cleanBabylonColor3Attribute(node.attributes["DiffuseColor"].value)); } catch (e) { }
        try { this._specularColor = eval(this.cleanBabylonColor3Attribute(node.attributes["SpecularColor"].value)); } catch (e) { }
        try { this._intensity= parseFloat(node.attributes["Intensity"].value); } catch (e) { }
    }

    private cleanBabylonColor3Attribute(color3: string): string {
        if (color3.includes("Color3.")) return `BABYLON.${color3};`;
        return `new BABYLON.${color3};`;
    }
}
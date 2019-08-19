import { UIElement } from "../UIElement";
import { Scene } from "./Core";

export class Light extends UIElement {
    private _sceneName: string;
    private _direction: BABYLON.Vector3; // = BABYLON.Vector3.Zero(); //defaults to zero
    private _type: string;
    private _diffuseColor: BABYLON.Color3;
    private _specularColor: BABYLON.Color3;
    private _intensity: number;

    get SceneName(): string { return this._sceneName; }
    get Direction(): BABYLON.Vector3 { return this._direction; }
    get Type(): string { return this._type; }
    get DiffuseColor(): BABYLON.Color3 { return this._diffuseColor; }
    get SpecularColor(): BABYLON.Color3 { return this._specularColor; }
    get Intensity(): number { return this._intensity; }

    set SceneName(value: string) { this._sceneName = value; }
    set Direction(value: BABYLON.Vector3) { this._direction = value; }
    set Type(value: string) { this._type = value; }
    set DiffuseColor(value: BABYLON.Color3) { this._diffuseColor = value; }
    set SpecularColor(value: BABYLON.Color3) { this._specularColor = value; }
    set Intensity(value: number) { this._intensity = value; }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;

        if (this._type === "HemisphericLight") {
            let pl: BABYLON.HemisphericLight  = new BABYLON.HemisphericLight(this.Name, this._direction, scene.Ctrl);
            if (this.HasValue(this.Intensity)) pl.intensity = this.Intensity;
            this.Ctrl = pl;
        } else if (this._type === "PointLight") {
            let pl: BABYLON.Light = new BABYLON.PointLight(this.Name, this._direction, scene.Ctrl);
            if (this.HasValue(this.DiffuseColor)) pl.diffuse = this.DiffuseColor; 
            if (this.HasValue(this.SpecularColor)) pl.specular = this.SpecularColor;
            if (this.HasValue(this.Intensity)) pl.intensity = this.Intensity;
            this.Ctrl = pl;
        } else if (this._type === "DirectionalLight") {
            let pl: BABYLON.Light = new BABYLON.DirectionalLight(this.Name, this._direction, scene.Ctrl);
            if (this.HasValue(this.DiffuseColor)) pl.diffuse = this.DiffuseColor;
            if (this.HasValue(this.SpecularColor)) pl.specular = this.SpecularColor;
            this.Ctrl = pl;
        } 

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        this.UpdatePropertyByNode(node, "Scene", "SceneName");
        try { this._direction = eval(`new BABYLON.${node.attributes["Direction"].value};`); } catch (e) { }
        this.UpdatePropertyByNode(node, "Type", "Type");

        this.UpdatePropertyByNodeAndFunction(node, "DiffuseColor", "DiffuseColor", this.CleanBabylonColor3Attribute);
        this.UpdatePropertyByNodeAndFunction(node, "SpecularColor", "SpecularColor", this.CleanBabylonColor3Attribute);
        //try { this._diffuseColor = eval(this.cleanBabylonColor3Attribute(node.attributes["DiffuseColor"].value)); } catch (e) { }
        //try { this._specularColor = eval(this.cleanBabylonColor3Attribute(node.attributes["SpecularColor"].value)); } catch (e) { }


        this.UpdatePropertyByNodeAndFunction(node, "Intensity", "Intensity", parseFloat);
    }

    //private cleanBabylonColor3Attribute(color3: string): string {
    //    if (color3.includes("Color3.")) return `BABYLON.${color3};`;
    //    return `new BABYLON.${color3};`;
    //}
}
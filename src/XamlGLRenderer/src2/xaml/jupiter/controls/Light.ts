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

        if (this.Type === "HemisphericLight") {
            this.Ctrl = new BABYLON.HemisphericLight(this.Name, this.Direction, scene.Ctrl);
            this.RefreshCtrlProperty("Intensity");
        } else if (this.Type === "PointLight") {
            this.Ctrl = new BABYLON.PointLight(this.Name, this.Direction, scene.Ctrl);
            this.RefreshCtrlProperty("DiffuseColor");
            this.RefreshCtrlProperty("SpecularColor");
            this.RefreshCtrlProperty("Intensity");
        } else if (this.Type === "DirectionalLight") {
            this.Ctrl = new BABYLON.DirectionalLight(this.Name, this.Direction, scene.Ctrl);
            this.RefreshCtrlProperty("DiffuseColor");
            this.RefreshCtrlProperty("SpecularColor");
        } 

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        this.UpdatePropertyByNode(node, "Scene", "SceneName");
        this.UpdatePropertyByNodeAndFunction(node, "Direction", "Direction", this.ConvertToBabylonObject);
        this.UpdatePropertyByNode(node, "Type", "Type");
        this.UpdatePropertyByNodeAndFunction(node, "DiffuseColor", "DiffuseColor", this.CleanBabylonColor3Attribute);
        this.UpdatePropertyByNodeAndFunction(node, "SpecularColor", "SpecularColor", this.CleanBabylonColor3Attribute);
        this.UpdatePropertyByNodeAndFunction(node, "Intensity", "Intensity", parseFloat);
    }

    public SetValue(propertyName: string, value: any): void {
        switch (propertyName) {
            case "Direction": this.UpdatePropertyByValue(propertyName, value, this.ConvertToBabylonObject); break;
            case "DiffuseColor": this.UpdatePropertyByValue(propertyName, value, this.CleanBabylonColor3Attribute); break;
            case "SpecularColor": this.UpdatePropertyByValue(propertyName, value, this.CleanBabylonColor3Attribute); break;
            case "Intensity": this.UpdatePropertyByValue(propertyName, value, parseFloat); break;
        }
        this.RefreshCtrlProperty(propertyName);
    }

    private RefreshCtrlProperty(propertyName: string): void {
        switch (propertyName) {
            case "Direction": 
                if (this.HasValue(this.Direction)) {
                    if (this.Type === "HemisphericLight") (this.Ctrl as BABYLON.HemisphericLight).setDirectionToTarget(this.Direction);
                    else if (this.Type === "PointLight") (this.Ctrl as BABYLON.PointLight).setDirectionToTarget(this.Direction);
                    else if (this.Type === "DirectionalLight") (this.Ctrl as BABYLON.DirectionalLight).setDirectionToTarget(this.Direction);
                }
                break;
            case "DiffuseColor":
                if (this.HasValue(this.DiffuseColor)) {
                    if (this.Type === "HemisphericLight") (this.Ctrl as BABYLON.HemisphericLight).diffuse = this.DiffuseColor;
                    else if (this.Type === "PointLight") (this.Ctrl as BABYLON.PointLight).diffuse = this.DiffuseColor;
                    else if (this.Type === "DirectionalLight") (this.Ctrl as BABYLON.DirectionalLight).diffuse = this.DiffuseColor;
                }
                break;
            case "SpecularColor": 
                if (this.HasValue(this.SpecularColor)) {
                    if (this.Type === "HemisphericLight") (this.Ctrl as BABYLON.HemisphericLight).specular = this.SpecularColor;
                    else if (this.Type === "PointLight") (this.Ctrl as BABYLON.PointLight).specular = this.SpecularColor;
                    else if (this.Type === "DirectionalLight") (this.Ctrl as BABYLON.DirectionalLight).specular = this.SpecularColor;
                }
                break;
            case "Intensity": 
                if (this.HasValue(this.Intensity)) {
                    if (this.Type === "HemisphericLight") (this.Ctrl as BABYLON.HemisphericLight).intensity = this.Intensity;
                    else if (this.Type === "PointLight") (this.Ctrl as BABYLON.PointLight).intensity = this.Intensity;
                    else if (this.Type === "DirectionalLight") (this.Ctrl as BABYLON.DirectionalLight).intensity = this.Intensity;
                }
                break;
        }
    }
}
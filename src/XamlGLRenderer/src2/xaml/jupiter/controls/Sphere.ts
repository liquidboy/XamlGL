import { UIElement } from "../UIElement";
import { Scene, Material } from "./Core";
import { MeshNormalLines } from "../../behaviors/MeshNormalLines";
import { ISetValue } from "./ISetValue";

export class Sphere extends UIElement implements ISetValue {
    private _scene: Scene;
    private _normalLines: BABYLON.LinesMesh;

    private _sceneName: string;
    private _materialName: string;
    private _showNormalLines: boolean;
    private _segments: number;
    private _diameter: number;
    private _rotationQuaternion: BABYLON.Quaternion;

    get SceneName(): string { return this._sceneName; }
    get MaterialName(): string { return this._materialName; }
    get ShowNormalLines(): boolean { return this._showNormalLines; }
    get Segments(): number { return this._segments; }
    get Diameter(): number { return this._diameter; }
    get RotationQuaternion(): BABYLON.Quaternion { return this._rotationQuaternion; }

    set SceneName(value: string) { this._sceneName = value; }
    set MaterialName(value: string) { this._materialName = value; }
    set ShowNormalLines(value: boolean) { this._showNormalLines = value; }
    set Segments(value: number) { this._segments = value; }
    set Diameter(value: number) { this._diameter = value; }    
    set RotationQuaternion(value: BABYLON.Quaternion) { this._rotationQuaternion = value; }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;
        this._scene = scene;
        
        this.CreateCtrl();
        //this.Ctrl = BABYLON.Mesh.CreateSphere(this.Name, this.Segments, this.Diameter, scene.Ctrl);
        ////this._mesh = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: this._segments, diameter: this._diameter }, scene.Scene);

        //if (this.HasValue(this.Position)) this.Ctrl.position = this.Position;
        this.RefreshCtrlProperty("Position");

        //let material: Material = this.VT.Get(this.MaterialName) as Material;
        //if (this.HasValue(material)) this.Ctrl.material = material.Ctrl;
        this.RefreshCtrlProperty("MaterialName");

        //if (this.HasValue(this.RotationQuaternion)) this.Ctrl.rotationQuaternion = this.RotationQuaternion;
        this.RefreshCtrlProperty("RotationQuaternion");

        //if (this.HasValue(this.Enabled)) this.Ctrl.setEnabled(this.Enabled);

        //if (this.HasValue(this.ShowNormalLines) && this.ShowNormalLines) MeshNormalLines.Install(scene, this.Ctrl);

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);

        this.UpdatePropertyByNode(node, "Scene", "SceneName");
        this.UpdatePropertyByNode(node, "Material", "MaterialName");
        this.UpdatePropertyByNodeAndFunction(node, "ShowNormalLines", "ShowNormalLines", this.ConvertToBoolean);
        this.UpdatePropertyByNodeAndFunction(node, "Segments", "Segments", parseInt);
        this.UpdatePropertyByNodeAndFunction(node, "Diameter", "Diameter", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "RotationQuaternion", "RotationQuaternion", this.ConvertToNewBabylonObject);
    }

    SetValue(propertyName: string, value: any): void {
        switch (propertyName) {
            case "Segments": this.UpdatePropertyByValue(propertyName, value, parseInt); break;
            case "Diameter": this.UpdatePropertyByValue(propertyName, value, parseFloat); break;
            case "ShowNormalLines": this.UpdatePropertyByValue(propertyName, value, this.ConvertToBoolean); break;
            case "RotationQuaternion": this.UpdatePropertyByValue(propertyName, value, this.ConvertToNewBabylonObject); break;
            case "Type": this.UpdatePropertyByValue(propertyName, value, null); break;
            case "MaterialName": this.UpdatePropertyByValue(propertyName, value, null); break;
            default: return;
        }
        this.RefreshCtrlProperty(propertyName);
    }

    RefreshCtrlProperty(propertyName: string): void {
        switch (propertyName) {
            case "Segments": if (this.HasValue(this.Segments)) this.CreateCtrl(); break;
            case "Diameter": if (this.HasValue(this.Diameter)) this.CreateCtrl(); break;
            case "Position": if (this.HasValue(this.Position)) this.Ctrl.position = this.Position; break;
            case "MaterialName": if (this.HasValue(this.MaterialName)) {
                let material: Material = this.VT.Get(this.MaterialName) as Material;
                this.Ctrl.material = material.Ctrl;
                break;
            }
            case "RotationQuaternion": if (this.HasValue(this.RotationQuaternion)) this.Ctrl.rotationQuaternion = this.RotationQuaternion; break;
            case "ShowNormalLines": if (this.HasValue(this.ShowNormalLines)) this.CreateCtrl(); break;
        }
    }

    ClearCtrl(): void {
        if (!this.HasValue(this.Ctrl)) return;

        if (this.HasValue(this._normalLines)) {
            this._normalLines.dispose();
            this._normalLines = null;
        }

        this.bjsCtrl.dispose();
        this.Ctrl = null;
    }

    CreateCtrl(): void {
        this.ClearCtrl();
        if (!this.HasValue(this._scene)) return;
        this.Ctrl = BABYLON.Mesh.CreateSphere(this.Name, this.Segments, this.Diameter, this._scene.Ctrl);

        if (this.HasValue(this.ShowNormalLines) && this.ShowNormalLines) {
            this._normalLines = MeshNormalLines.Install(this._scene, this.Ctrl);
        }
    }
}
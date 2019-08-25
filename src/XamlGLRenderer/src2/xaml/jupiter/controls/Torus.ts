import { Scene, Material } from "./Core";
import { MeshNormalLines } from "../../behaviors/MeshNormalLines";
import { AnimatableUIElement } from "../AnimatableUIElement";
import { Animation } from "./Animation";
import { KeyFrames } from "./KeyFrames";

export class Torus extends AnimatableUIElement {
    private _scene: Scene;

    private _sceneName: string;
    private _materialName: string;
    private _showNormalLines: boolean;
    private _diameter: number;
    private _thickness: number;
    private _tesselation: number;
    
    get SceneName(): string { return this._sceneName; }
    get MaterialName(): string { return this._materialName; }
    get ShowNormalLines(): boolean { return this._showNormalLines; }
    get Diameter(): number { return this._diameter; }
    get Thickness(): number { return this._thickness; }
    get Tesselation(): number { return this._tesselation; }

    set SceneName(value: string) { this._sceneName = value; }
    set MaterialName(value: string) { this._materialName = value; }
    set ShowNormalLines(value: boolean) { this._showNormalLines = value; }
    set Diameter(value: number) { this._diameter = value; }
    set Thickness(value: number) { this._thickness = value; }
    set Tesselation(value: number) { this._tesselation = value; }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;
        let material: Material = this.VT.Get(this.MaterialName) as Material;
        this._scene = scene;

        //this.Ctrl = BABYLON.Mesh.CreateTorus(this.Name, this._diameter, this._thickness, this._tesselation, scene.Ctrl);
        //this.Ctrl.material = material.Ctrl;
        //this.Ctrl.position = this.Position;

        this.CreateTorus();

        if (this.Animations && this.Animations.Animations)
            this.Animations.Animations.forEach((animation: Animation) => {
                var animationBox = new BABYLON.Animation(animation.Name, animation.TargetProperty, animation.FPS,
                    animation.DataType, animation.LoopMode);
                animationBox.setKeys(animation.KeyFrames.GetArray());
                this.Ctrl.animations.push(animationBox);
            });
        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);

        this.UpdatePropertyByNode(node, "Scene", "SceneName");
        this.UpdatePropertyByNode(node, "Material", "MaterialName");
        this.UpdatePropertyByNodeAndFunction(node, "ShowNormalLines", "ShowNormalLines", this.ConvertToBoolean);
        this.UpdatePropertyByNodeAndFunction(node, "Diameter", "Diameter", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "Thickness", "Thickness", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "Tesselation", "Tesselation", parseFloat);
    }

    public SetValue(propertyName: string, value: any): void {
        switch (propertyName) {
            case "Diameter": 
            case "Thickness": 
            case "Tesselation": this.UpdatePropertyByValue(propertyName, value, parseFloat); break;
            case "ShowNormalLines": this.UpdatePropertyByValue(propertyName, value, this.ConvertToBoolean); break;
        }
        this.RefreshCtrlProperty(propertyName);
    }

    private RefreshCtrlProperty(propertyName: string): void {
        switch (propertyName) {
            case "Diameter": if (this.HasValue(this.Diameter)) this.CreateTorus(); break;
            case "Thickness": if (this.HasValue(this.Thickness)) this.CreateTorus(); break;
            case "Tesselation": if (this.HasValue(this.Tesselation)) this.CreateTorus(); break;
            case "ShowNormalLines": if (this.HasValue(this.ShowNormalLines)) this.CreateTorus(); break;
        }
    }

    private ClearCtrl(): void {
        if (!this.HasValue(this.Ctrl)) return;

        this.bjsCtrl.dispose();
        this.Ctrl = null;
    }

    private CreateTorus(): void {
        if (!this.HasValue(this.MaterialName)) return;
        if (!this.HasValue(this._scene)) return;

        this.ClearCtrl();

        let material: Material = this.VT.Get(this.MaterialName) as Material;
        this.Ctrl = BABYLON.Mesh.CreateTorus(this.Name, this._diameter, this._thickness, this._tesselation, this._scene.Ctrl);
        this.Ctrl.material = material.Ctrl;
        this.Ctrl.position = this.Position;

        if (this.HasValue(this.ShowNormalLines) && this.ShowNormalLines) MeshNormalLines.Install(this._scene, this.Ctrl);
    }

    StartAnimation(): void {
        if (this.Animations && this.Animations.Animations)
            this.Animations.Animations.forEach((animation: Animation) => {
                this._scene.Ctrl.beginAnimation(this.Ctrl, 1, 100, true);
            });
    }

    StopAnimation(): void {
        if (this.Animations && this.Animations.Animations)
            this.Animations.Animations.forEach((animation: Animation) => {
                this._scene.Ctrl.stopAnimation(this.Ctrl);
            });
    }
}
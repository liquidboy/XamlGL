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

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;
        let material: Material = this.VT.Get(this.MaterialName) as Material;

        this._scene = scene;
        this.Ctrl = BABYLON.Mesh.CreateTorus(this.Name, this._diameter, this._thickness, this._tesselation, scene.Ctrl);
        this.Ctrl.material = material.Ctrl;
        this.Ctrl.position = this.Position;
        if (this._showNormalLines) MeshNormalLines.Install(scene, this.Ctrl);

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
        try { this._sceneName = node.attributes["Scene"].value; } catch (e) { }
        try { this._materialName = node.attributes["Material"].value; } catch (e) { }
        try { this._showNormalLines = node.attributes["ShowNormalLines"].value.toLowerCase() === 'true'; } catch (e) { }
        try { this._diameter = parseFloat(node.attributes["Diameter"].value); } catch (e) { }
        try { this._thickness = parseFloat(node.attributes["Thickness"].value); } catch (e) { }
        try { this._tesselation = parseFloat(node.attributes["Tesselation"].value); } catch (e) { }
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
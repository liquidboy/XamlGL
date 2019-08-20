import { Scene, Material } from "./Core";
import { MeshNormalLines } from "../../behaviors/MeshNormalLines";
import { AnimatableUIElement } from "../AnimatableUIElement";
import { Animation } from "./Animation";

export class Disc extends AnimatableUIElement {
    private _scene: Scene;
    private _sceneName: string;
    private _materialName: string;
    private _showNormalLines: boolean;
    private _radius: number;
    private _tessellation: number;
    private _sideOrientation: any;
    private _updatable: boolean;

    get SceneName(): string { return this._sceneName; }
    get MaterialName(): string { return this._materialName; }
    get ShowNormalLines(): boolean { return this._showNormalLines; }
    get Radius(): number { return this._radius; }
    get Tessellation(): number { return this._tessellation; }
    get Updateable(): boolean { return this._updatable; }
    get SideOrientation(): number { return this._sideOrientation; }

    set SceneName(value: string) { this._sceneName = value; }
    set MaterialName(value: string) { this._materialName = value; }
    set ShowNormalLines(value: boolean) { this._showNormalLines = value; }
    set Radius(value: number) { this._radius = value; }
    set Tessellation(value: number) { this._tessellation = value; }
    set Updateable(value: boolean) { this._updatable = value; }
    set SideOrientation(value: number) { this._sideOrientation = value; }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;
        this._scene = scene;

        this.Ctrl = BABYLON.MeshBuilder.CreateDisc(this.Name, { tessellation: this.Tessellation, sideOrientation: this.SideOrientation }, scene.Ctrl);

        if (this.HasValue(this.MaterialName)) {
            let material: Material = this.VT.Get(this.MaterialName) as Material;
            if (material.Ctrl) this.Ctrl.material = material.Ctrl;
        }
        //if (this._mesh && this.Position) this._mesh.position = this.Position;
        if (this.Ctrl && this.HasValue(this.ShowNormalLines) && this.ShowNormalLines) MeshNormalLines.Install(scene, this.Ctrl);

        if (this.Ctrl && this.Animations && this.Animations.Animations)
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
        this.UpdatePropertyByNodeAndFunction(node, "Radius", "Radius", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "Tessellation", "Tessellation", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "SideOrientation", "SideOrientation", eval);
        this.UpdatePropertyByNodeAndFunction(node, "Updateable", "Updateable", this.ConvertToBoolean);
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
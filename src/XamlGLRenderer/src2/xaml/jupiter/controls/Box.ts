import { Scene, Material } from "./Core";
import { MeshNormalLines } from "../../behaviors/MeshNormalLines";
import { AnimatableUIElement } from "../AnimatableUIElement";
import { Animation } from "./Animation";
import { KeyFrames } from "./KeyFrames";

export class Box extends AnimatableUIElement {
    private _scene: Scene;
    private _sceneName: string;
    private _materialName: string;
    private _showNormalLines: boolean;
    private _width: number;
    private _infiniteDistance: boolean;

    get SceneName(): string { return this._sceneName; }
    get MaterialName(): string { return this._materialName; }
    get ShowNormalLines(): boolean { return this._showNormalLines; }
    get Width(): number { return this._width; }
    get InfiniteDistance(): boolean { return this._infiniteDistance; }

    public Initialize(): void {
        this._scene = this.VT.Get(this.SceneName) as Scene;
        this.Ctrl = BABYLON.Mesh.CreateBox(this.Name, this._width, this._scene.Ctrl);

        if (this.MaterialName !== undefined) {
            let material: Material = this.VT.Get(this.MaterialName) as Material;
            if (material && material.Ctrl) this.Ctrl.material = material.Ctrl;
        }
        if (this.Position != undefined) this.Ctrl.position = this.Position;
        if (this.InfiniteDistance !== undefined) this.Ctrl.infiniteDistance = this._infiniteDistance;
        if (this._showNormalLines !== undefined && this._showNormalLines) MeshNormalLines.Install(this._scene, this.Ctrl);
        if (this.IsVisible !== undefined) this.Ctrl.isVisible = this.IsVisible;

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
        try { this._width = parseFloat(node.attributes["Width"].value); } catch (e) { }
        try { this._infiniteDistance = node.attributes["InfiniteDistance"].value.toLowerCase() === 'true'; } catch (e) { }
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
import { Scene, Material } from "./Core";
import { MeshNormalLines } from "../../behaviors/MeshNormalLines";
import { AnimatableUIElement } from "../AnimatableUIElement";
import { Animation } from "./Animation";
import { KeyFrames } from "./KeyFrames";

export class Box extends AnimatableUIElement {
    private _mesh: BABYLON.Mesh;
    private _scene: Scene;

    private _sceneName: string;
    private _materialName: string;
    private _showNormalLines: boolean;
    private _width: number;
    private _infiniteDistance: boolean;

    get Mesh(): BABYLON.Mesh { return this._mesh; }
    get SceneName(): string { return this._sceneName; }
    get MaterialName(): string { return this._materialName; }
    get ShowNormalLines(): boolean { return this._showNormalLines; }
    get Width(): number { return this._width; }
    get InfiniteDistance(): boolean { return this._infiniteDistance; }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;
        let material: Material = this.VT.Get(this.MaterialName) as Material;

        this._scene = this.VT.Get(this.SceneName) as Scene;
        this._mesh = BABYLON.Mesh.CreateBox(this.Name, this._width, scene.Scene);
        if (material && material.Material) this._mesh.material = material.Material;
        if (this.Position != undefined) this._mesh.position = this.Position;
        if (this.InfiniteDistance !== undefined) this._mesh.infiniteDistance = this._infiniteDistance;
        if (this._showNormalLines !== undefined && this._showNormalLines) MeshNormalLines.Install(scene, this._mesh);

        if (this.Animations && this.Animations.Animations)
            this.Animations.Animations.forEach((animation: Animation) => {
                var animationBox = new BABYLON.Animation(animation.Name, animation.TargetProperty, animation.FPS,
                    animation.DataType, animation.LoopMode);
                animationBox.setKeys(animation.KeyFrames.GetArray());
                this._mesh.animations.push(animationBox);
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
                this._scene.Scene.beginAnimation(this._mesh, 1, 100, true);
            });
    }

    StopAnimation(): void {
        if (this.Animations && this.Animations.Animations)
            this.Animations.Animations.forEach((animation: Animation) => {
                this._scene.Scene.stopAnimation(this._mesh);
            });
    }
}
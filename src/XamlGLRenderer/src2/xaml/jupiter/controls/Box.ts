﻿import { Scene, Material } from "./Core";
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
    private _position: BABYLON.Vector3;
    
    get SceneName(): string { return this._sceneName; }
    get MaterialName(): string { return this._materialName; }
    get ShowNormalLines(): boolean { return this._showNormalLines; }
    get Width(): number { return this._width; }
    get Position(): BABYLON.Vector3{ return this._position; }

    public InitializeWithMaterial(scene: Scene, material: Material): void {
        this._scene = scene;
        this._mesh = BABYLON.Mesh.CreateBox(this.Name, this._width, scene.Scene);
        this._mesh.material = material.Material;
        if (this._position !== undefined) this._mesh.position = this._position;
        if (this._showNormalLines) MeshNormalLines.Install(scene, this._mesh);

        if (this.Animations && this.Animations.Animations)
            this.Animations.Animations.forEach((animation: Animation) => {
                var animationBox = new BABYLON.Animation(animation.Name, animation.TargetProperty, animation.FPS,
                    animation.DataType, animation.LoopMode);
                animationBox.setKeys(animation.KeyFrames.GetArray());
                this._mesh.animations.push(animationBox);
            });
    }

    public LoadFromNode(node: any): void {
        try { this._sceneName = node.attributes["Scene"].value; } catch (e) { }
        try { this._materialName = node.attributes["Material"].value; } catch (e) { }
        try { this._showNormalLines = node.attributes["ShowNormalLines"].value.toLowerCase() === 'true'; } catch (e) { }
        try { this._position = eval(`new BABYLON.${node.attributes["Position"].value};`); } catch (e) { }
        try { this._width = parseFloat(node.attributes["Width"].value); } catch (e) { }
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
﻿import { Scene, Material } from "./Core";
import { MeshNormalLines } from "../../behaviors/MeshNormalLines";
import { AnimatableUIElement } from "../AnimatableUIElement";
import { Animation } from "./Animation";
import { KeyFrames } from "./KeyFrames";
import { Texture } from "./Texture";
import { UIElement } from "../UIElement";

export class Box extends AnimatableUIElement {
    private _scene: Scene;
    private _sceneName: string;
    private _materialName: string;
    private _addToRenderList: string;
    private _showNormalLines: boolean;
    private _width: number;
    private _infiniteDistance: boolean;
    private _scaling: BABYLON.Vector3;
    private _rotationQuaternion: BABYLON.Quaternion;

    get SceneName(): string { return this._sceneName; }
    get MaterialName(): string { return this._materialName; }
    get AddToRenderList(): string { return this._addToRenderList; }
    get ShowNormalLines(): boolean { return this._showNormalLines; }
    get Width(): number { return this._width; }
    get InfiniteDistance(): boolean { return this._infiniteDistance; }
    get Scaling(): BABYLON.Vector3 { return this._scaling; }
    get RotationQuaternion(): BABYLON.Quaternion { return this._rotationQuaternion; }

    set SceneName(value: string) { this._sceneName = value; }
    set MaterialName(value: string) { this._materialName = value; }
    set AddToRenderList(value: string) { this._addToRenderList = value; }
    set ShowNormalLines(value: boolean) { this._showNormalLines = value; }
    set Width(value: number) { this._width = value; }
    set InfiniteDistance(value: boolean) { this._infiniteDistance = value; }
    set Scaling(value: BABYLON.Vector3) { this._scaling = value; }
    set RotationQuaternion(value: BABYLON.Quaternion) { this._rotationQuaternion = value; }

    public Initialize(): void {
        this._scene = this.VT.Get(this.SceneName) as Scene;
        this.Ctrl = BABYLON.Mesh.CreateBox(this.Name, this.Width, this._scene.Ctrl);

        if (this.HasValue(this.MaterialName)) {
            let material: Material = this.VT.Get(this.MaterialName) as Material;
            if (material && material.Ctrl) this.Ctrl.material = material.Ctrl;
        }
        if (this.HasValue(this.Position)) this.Ctrl.position = this.Position;
        if (this.HasValue(this.InfiniteDistance)) this.Ctrl.infiniteDistance = this.InfiniteDistance;
        if (this.HasValue(this.ShowNormalLines) && this.ShowNormalLines) MeshNormalLines.Install(this._scene, this.Ctrl);
        if (this.HasValue(this.Scaling)) this.Ctrl.scaling = this.Scaling;
        if (this.HasValue(this.IsVisible)) this.Ctrl.isVisible = this.IsVisible;
        if (this.HasValue(this.AddToRenderList) && this.Ctrl !== undefined) {
            let tex: Texture = this.VT.FindByName(this.AddToRenderList);
            (tex.Ctrl as BABYLON.MirrorTexture).renderList.push(this.Ctrl);
        }
        if (this.HasValue(this.Enabled)) this.Ctrl.setEnabled(this.Enabled);
        if (this.HasValue(this.RotationQuaternion)) this.Ctrl.rotationQuaternion = this.RotationQuaternion;

        this.InitializeAnimation();
        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        this.UpdatePropertyByNode(node, "Scene", "SceneName");
        this.UpdatePropertyByNode(node, "Material", "MaterialName");
        this.UpdatePropertyByNodeAndFunction(node, "ShowNormalLines", "ShowNormalLines", this.ConvertToBoolean);
        this.UpdatePropertyByNode(node, "Width", "Width");
        this.UpdatePropertyByNodeAndFunction(node, "InfiniteDistance", "InfiniteDistance", this.ConvertToBoolean);
        this.UpdatePropertyByNodeAndFunction(node, "Scaling", "Scaling", this.ConvertToNewBabylonObject);
        this.UpdatePropertyByNode(node, "AddToRenderList", "AddToRenderList");
        this.UpdatePropertyByNodeAndFunction(node, "RotationQuaternion", "RotationQuaternion", this.ConvertToNewBabylonObject);
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
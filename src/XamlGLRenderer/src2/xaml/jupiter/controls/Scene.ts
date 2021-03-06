﻿import { UIElement } from "../UIElement";
import { Camera, Light } from "./Core";
import { SceneMouseWheelZoom } from "../../behaviors/SceneMouseWheelZoom";
import { MoveSelectedMesh } from "../../behaviors/MoveSelectedMesh";
import { Ground } from "./Ground";
import { DIContainer } from "../../Core";
import { CustomScript } from "../../behaviors/CustomScript";

export class Scene extends UIElement {
    private _groundName: string;
    private _cameraName: string;
    private _lightName: string;
    private _clearColor: BABYLON.Color3;

    get GroundName(): string { return this._groundName; }
    get CameraName(): string { return this._cameraName; }
    get LightName(): string { return this._lightName; }
    get ClearColor(): BABYLON.Color3 { return this._clearColor; }

    set GroundName(value: string) { this._groundName = value; }
    set CameraName(value: string) { this._cameraName = value; }
    set LightName(value: string) { this._lightName = value; }
    set ClearColor(value: BABYLON.Color3) { this._clearColor = value; }

    constructor() {
        super();
    }

    public Initialize(): void {
        let engine: BABYLON.Engine = DIContainer.get("rootEngine") as BABYLON.Engine;
        let canvas: HTMLCanvasElement = DIContainer.get("rootCanvas") as HTMLCanvasElement;

        this.Ctrl = new BABYLON.Scene(engine);

        this.RefreshCtrlProperty("ClearColor");

        SceneMouseWheelZoom.Install(this);
        new MoveSelectedMesh().Install(this, canvas, this.GroundName, this.CameraName);

        engine.runRenderLoop(() => {
            this.Ctrl.render();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);

        this.UpdatePropertyByNode(node, "Camera", "CameraName");
        this.UpdatePropertyByNode(node, "Light", "LightName");
        this.UpdatePropertyByNode(node, "Ground", "GroundName");
        this.UpdatePropertyByNodeAndFunction(node, "ClearColor", "ClearColor", this.CleanBabylonColor3Attribute);
    }

    public SetValue(propertyName: string, value: any): void {
        switch (propertyName) {
            case "ClearColor": this.UpdatePropertyByValue(propertyName, value, this.CleanBabylonColor3Attribute); break;
        }
        this.RefreshCtrlProperty(propertyName);
    }

    private RefreshCtrlProperty(propertyName: string): void {
        switch (propertyName) {
            case "ClearColor": if (this.HasValue(this.ClearColor)) this.Ctrl.clearColor = this.ConvertColor3ToColor4(this.ClearColor); break;
        }
    }
}
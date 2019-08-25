import { Scene } from "./Core";
import { UIElement } from "../Core";
import 'babylonjs-gui';
import { Plane } from "./Plane";
import { reflectionFunction } from "babylonjs/Shaders/ShadersInclude/reflectionFunction";
import { ISetValue } from "./ISetValue";

export class Texture extends UIElement implements ISetValue {
    private _scene: Scene;

    private _sceneName: string;
    private _rootUrl: string;
    private _type: string;
    private _coordinatesMode: number;
    private _options: string;
    private _generatingMipMaps: boolean;
    private _idealHeight: number;
    private _size: number;
    private _level: number;
    private _mirrorPlane: BABYLON.Plane;

    get SceneName(): string { return this._sceneName; }
    get RootUrl(): string { return this._rootUrl; }
    get Type(): string { return this._type; }
    get CoordinatesMode(): number { return this._coordinatesMode; }
    get Options(): string { return this._options; }
    get GeneratingMipMaps(): boolean { return this._generatingMipMaps; }
    get IdealHeight(): number { return this._idealHeight; }
    get Size(): number { return this._size; }
    get Level(): number { return this._level; }
    get MirrorPlane(): BABYLON.Plane { return this._mirrorPlane; }

    set SceneName(value: string) { this._sceneName = value; }
    set RootUrl(value: string) { this._rootUrl = value; }
    set Type(value: string) { this._type = value; }
    set CoordinatesMode(value: number) { this._coordinatesMode = value; }
    set Options(value: string) { this._options = value; }
    set GeneratingMipMaps(value: boolean) { this._generatingMipMaps = value; }
    set IdealHeight(value: number) { this._idealHeight = value; }
    set Size(value: number) { this._size = value; }
    set Level(value: number) { this._level = value; }
    set MirrorPlane(value: BABYLON.Plane) { this._mirrorPlane = value; }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;
        this._scene = scene;

        this.CreateCtrl();

        this.RefreshCtrlProperty("CoordinatesMode");

        this.ChildrenGUIs.forEach((key: string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        this.UpdatePropertyByNode(node, "Scene", "SceneName");
        this.UpdatePropertyByNode(node, "RootUrl", "RootUrl");
        this.UpdatePropertyByNode(node, "Type", "Type");
        this.UpdatePropertyByNode(node, "Options", "Options");
        this.UpdatePropertyByNodeAndFunction(node, "CoordinatesMode", "CoordinatesMode", this.ConvertToBabylonObject);
        this.UpdatePropertyByNodeAndFunction(node, "GeneratingMipMaps", "GeneratingMipMaps", this.ConvertToBoolean);
        this.UpdatePropertyByNodeAndFunction(node, "IdealHeight", "IdealHeight", parseInt);
        this.UpdatePropertyByNodeAndFunction(node, "Size", "Size", parseInt);
        this.UpdatePropertyByNodeAndFunction(node, "Level", "Level", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "MirrorPlane", "MirrorPlane", this.ConvertToNewBabylonObject);
    }

    public SetValue(propertyName: string, value: any): void {
        switch (propertyName) {
            case "IdealHeight":
            case "Size":
                this.UpdatePropertyByValue(propertyName, value, parseInt); break;
            case "GeneratingMipMaps": this.UpdatePropertyByValue(propertyName, value, this.ConvertToBoolean); break;
            case "Level": this.UpdatePropertyByValue(propertyName, value, parseFloat); break;
            case "MirrorPlane": this.UpdatePropertyByValue(propertyName, value, this.ConvertToNewBabylonObject); break;
            case "Type": this.UpdatePropertyByValue(propertyName, value, null); break;
            default: return;
        }
        this.RefreshCtrlProperty(propertyName);
    }
    public RefreshCtrlProperty(propertyName: string): void {
        switch (propertyName) {
            case "IdealHeight": break;
            case "Type": if (this.HasValue(this.Type)) this.CreateCtrl(); break;
            case "Size": if (this.HasValue(this.Size)) this.CreateCtrl(); break;
            case "MirrorPlane": if (this.HasValue(this.MirrorPlane)) this.GetReflectionTexture().mirrorPlane = this.MirrorPlane; break;
            case "Level": if (this.HasValue(this.Level)) this.GetReflectionTexture().level = this.Level; break;
            case "GeneratingMipMaps": if (this.HasValue(this.GeneratingMipMaps)) this.CreateCtrl(); break;
            case "CoordinatesMode": if (this.HasValue(this.CoordinatesMode)) this.Ctrl.coordinatesMode = this.CoordinatesMode; break;
        }
    }
    public ClearCtrl(): void {
        if (!this.HasValue(this.Ctrl)) return;

        this.bjsCtrl.dispose();
        this.Ctrl = null;
    }
    public CreateCtrl(): void {
        this.ClearCtrl();

        if (this._type === "CubeTexture") {
            if (!this.HasValue(this._scene)) return;
            this.Ctrl = new BABYLON.CubeTexture(this.RootUrl, this._scene.Ctrl);
        } else if (this._type === "DynamicTexture") {
            if (!this.HasValue(this._scene)) return;
            //this._texture = new BABYLON.DynamicTexture(this.Name, this.Options, scene.Scene, this.GeneratingMipMaps);
            this.Ctrl = new BABYLON.DynamicTexture(this.Name, 512, this._scene.Ctrl, this.GeneratingMipMaps);
        } else if (this._type === "Texture") {
            if (!this.HasValue(this._scene)) return;
            this.Ctrl = new BABYLON.Texture(this.RootUrl, this._scene.Ctrl);
        } else if (this._type === "AdvancedDynamicTexture") {
            if (this.Parent instanceof Plane) {
                this.Ctrl = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(this.Parent.Ctrl);
            }
            else {
                this.Ctrl = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(this.Name);
                //this.Ctrl.layer.layerMask = 2;   <-- from sample 10, checkbox
            }
        } else if (this._type === "MirrorTexture") {
            if (!this.HasValue(this._scene)) return;
            let reflectionTexture = new BABYLON.MirrorTexture(this.Name, this.Size, this._scene.Ctrl, this.GeneratingMipMaps);
            reflectionTexture.mirrorPlane = this.MirrorPlane;
            reflectionTexture.level = this.Level;
            this.Ctrl = reflectionTexture;
        }
    }

    private GetReflectionTexture(): BABYLON.MirrorTexture {
        return this.Ctrl as BABYLON.MirrorTexture;
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);
            return true;
        }
        return false;
    }
}
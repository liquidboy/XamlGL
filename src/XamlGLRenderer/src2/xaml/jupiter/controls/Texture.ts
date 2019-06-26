import { Scene, Material } from "./Core";
import { MeshNormalLines } from "../../behaviors/MeshNormalLines";
import { AnimatableUIElement } from "../AnimatableUIElement";
import { Animation } from "./Animation";
import { KeyFrames } from "./KeyFrames";
import { UIElement } from "../Core";
import 'babylonjs-gui';

export class Texture extends UIElement {
    private _texture: BABYLON.BaseTexture;
    private _sceneName: string;
    private _rootUrl: string;
    private _type: string;
    private _coordinatesMode: number;
    private _options: string;
    private _generatingMipMaps: boolean;

    get Texture(): BABYLON.BaseTexture { return this._texture; }
    get SceneName(): string { return this._sceneName; }
    get RootUrl(): string { return this._rootUrl; }
    get Type(): string { return this._type; }
    get CoordinatesMode(): number { return this._coordinatesMode; }
    get Options(): string { return this._options; }
    get GeneratingMipMaps(): boolean { return this._generatingMipMaps; }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;

        if (this._type === "CubeTexture") {
            this._texture = new BABYLON.CubeTexture(this.RootUrl, scene.Scene);
        } else if (this._type === "DynamicTexture") {
            //this._texture = new BABYLON.DynamicTexture(this.Name, this.Options, scene.Scene, this.GeneratingMipMaps);
            this._texture = new BABYLON.DynamicTexture(this.Name, 512, scene.Scene, this.GeneratingMipMaps);
        } else if (this._type === "Texture") {
            this._texture = new BABYLON.Texture(this.RootUrl, scene.Scene);
        } else if (this._type === "AdvancedDynamicTexture") {
            this._texture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(this.Name);
        }

        if (this._texture !== undefined) {
            if (this._coordinatesMode !== undefined) this._texture.coordinatesMode = this._coordinatesMode;
        }
        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._sceneName = node.attributes["Scene"].value; } catch { }
        try { this._rootUrl = node.attributes["RootUrl"].value; } catch { }
        try { this._type = node.attributes["Type"].value; } catch { }
        try { this._options = node.attributes["Options"].value; } catch { }
        try { this._coordinatesMode = eval(`BABYLON.${node.attributes["CoordinatesMode"].value};`); } catch (e) { }
        try { this._generatingMipMaps = node.attributes["GeneratingMipMaps"].value.toLowerCase() === 'true'; } catch (e) { }
    }
}
import { Scene, Material } from "./Core";
import { MeshNormalLines } from "../../behaviors/MeshNormalLines";
import { AnimatableUIElement } from "../AnimatableUIElement";
import { Animation } from "./Animation";
import { KeyFrames } from "./KeyFrames";
import { UIElement } from "../Core";

export class Texture extends UIElement {
    private _texture: BABYLON.BaseTexture;
    private _sceneName: string;
    private _rootUrl: string;
    private _coordinatesMode: number;


    get Texture(): BABYLON.BaseTexture { return this._texture; }
    get SceneName(): string { return this._sceneName; }
    get RootUrl(): string { return this._rootUrl; }
    get CoordinatesMode(): number { return this._coordinatesMode; }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;

        this._texture = new BABYLON.CubeTexture(this.RootUrl, scene.Scene);

        if (this._coordinatesMode !== undefined) this._texture.coordinatesMode = this._coordinatesMode;
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._sceneName = node.attributes["Scene"].value; } catch { }
        try { this._rootUrl = node.attributes["RootUrl"].value; } catch { }
        try { this._coordinatesMode = eval(`BABYLON.${node.attributes["CoordinatesMode"].value};`); } catch (e) { }
    }
}
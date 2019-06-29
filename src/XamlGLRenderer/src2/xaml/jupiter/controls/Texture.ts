import { Scene } from "./Core";
import { UIElement } from "../Core";
import 'babylonjs-gui';
import { Plane } from "./Plane";

export class Texture extends UIElement {
    private _sceneName: string;
    private _rootUrl: string;
    private _type: string;
    private _coordinatesMode: number;
    private _options: string;
    private _generatingMipMaps: boolean;

    get SceneName(): string { return this._sceneName; }
    get RootUrl(): string { return this._rootUrl; }
    get Type(): string { return this._type; }
    get CoordinatesMode(): number { return this._coordinatesMode; }
    get Options(): string { return this._options; }
    get GeneratingMipMaps(): boolean { return this._generatingMipMaps; }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;

        if (this._type === "CubeTexture") {
            this.Ctrl = new BABYLON.CubeTexture(this.RootUrl, scene.Ctrl);
        } else if (this._type === "DynamicTexture") {
            //this._texture = new BABYLON.DynamicTexture(this.Name, this.Options, scene.Scene, this.GeneratingMipMaps);
            this.Ctrl = new BABYLON.DynamicTexture(this.Name, 512, scene.Ctrl, this.GeneratingMipMaps);
        } else if (this._type === "Texture") {
            this.Ctrl = new BABYLON.Texture(this.RootUrl, scene.Ctrl);
        } else if (this._type === "AdvancedDynamicTexture") {
            if (this.Parent instanceof Plane) {
                this.Ctrl = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(this.Parent.Ctrl);
            }
            else this.Ctrl = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(this.Name);
        }

        if (this.Ctrl !== undefined) {
            if (this._coordinatesMode !== undefined) this.Ctrl.coordinatesMode = this._coordinatesMode;
        }

        this.ChildrenGUIs.forEach((key: string, child: UIElement) => {
            child.Initialize();
        });

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

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);
            return true;
        }
        return false;
    }
}
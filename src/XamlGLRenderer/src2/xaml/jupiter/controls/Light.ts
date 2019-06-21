import { UIElement } from "../UIElement";
import { Scene } from "./Core";

export class Light extends UIElement {
    private _light: BABYLON.Light;

    private _sceneName: string;
    private _direction: BABYLON.Vector3;
    private _type: string;

    get SceneName(): string { return this._sceneName; }
    get Direction(): BABYLON.Vector3 { return this._direction; }
    get Type(): string { return this._type; }

    public Initialize(scene: Scene): void {
        if (this._type === "HemisphericLight") this._light = new BABYLON.HemisphericLight(this.Name, this._direction, scene.Scene);
        else if (this._type === "PointLight") this._light = new BABYLON.PointLight(this.Name, this._direction, scene.Scene);
    }

    public LoadFromNode(node: any): void {
        try { this._sceneName = node.attributes["Scene"].value; } catch { }
        try { this._direction = eval(`new BABYLON.${node.attributes["Direction"].value};`); } catch (e) { }
        try { this._type = node.attributes["Type"].value; } catch (e) { }
    }
}
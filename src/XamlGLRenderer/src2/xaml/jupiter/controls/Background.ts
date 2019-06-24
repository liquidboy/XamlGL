import { UIElement } from "../Core";
import { Scene, Texture } from "./Core";

export class Background extends UIElement {
    private _layer: BABYLON.Layer;
    private _sceneName: string;
    private _imgUrl: string = null;
    private _textureName: string;

    get Layer(): BABYLON.Layer { return this._layer; }
    get SceneName(): string { return this._sceneName; }
    get ImageUrl(): string { return this._imgUrl; }
    get TextureName(): string { return this._textureName; }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;

        this._layer = new BABYLON.Layer(this.Name, this._imgUrl, scene.Scene);
        if (this.TextureName) {
            let texture: Texture = this.VT.Get(this.TextureName) as Texture;
            this._layer.texture = texture.Texture as BABYLON.Texture;
        }
        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._sceneName = node.attributes["Scene"].value; } catch (e) { }
        try { this._imgUrl = node.attributes["ImgUrl"].value; } catch (e) { }
        try { this._textureName = node.attributes["Texture"].value; } catch (e) { }
    }
}
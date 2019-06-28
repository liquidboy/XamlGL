import { UIElement } from "../Core";
import { Scene, Texture } from "./Core";

export class Background extends UIElement {
    private _sceneName: string;
    private _imgUrl: string = null;
    private _textureName: string;

    get SceneName(): string { return this._sceneName; }
    get ImageUrl(): string { return this._imgUrl; }
    get TextureName(): string { return this._textureName; }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;

        this.Ctrl = new BABYLON.Layer(this.Name, this._imgUrl, scene.Ctrl);
        if (this.TextureName) {
            let texture: Texture = this.VT.Get(this.TextureName) as Texture;
            this.Ctrl.texture = texture.Ctrl as BABYLON.Texture;
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
import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";

export class ParticleSystem extends UIElement {
    private _childParticles: LinkedDictionary<string, ParticleSystemShape>;
    private _sceneName: string;
    private _updateable: boolean = false;

    get Children(): LinkedDictionary<string, ParticleSystemShape> { return this._childParticles; }
    get SceneName(): string { return this._sceneName; }
    get Updateable(): boolean { return this._updateable; }

    constructor() {
        super();
        this._childParticles = new LinkedDictionary();
    }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;

        this.Ctrl = new BABYLON.SolidParticleSystem(this.Name, scene.Ctrl, { updatable: this.Updateable });

        this.Children.forEach((key:string, child: ParticleSystemShape) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._sceneName = node.attributes["Scene"].value; } catch { }
        try { this._updateable = node.attributes["Updateable"].value.toLowerCase() === 'true'; } catch (e) { }
    }
}
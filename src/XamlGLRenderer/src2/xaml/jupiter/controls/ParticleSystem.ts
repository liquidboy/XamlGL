import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";

export class ParticleSystem extends UIElement {
    private _childParticles: LinkedDictionary<string, ParticleSystemShape>;
    private _sceneName: string;
    private _updateable: boolean = false;
    private _type: string;
    private _capacity: number;

    get Children(): LinkedDictionary<string, ParticleSystemShape> { return this._childParticles; }
    get SceneName(): string { return this._sceneName; }
    get Updateable(): boolean { return this._updateable; }
    get Type(): string { return this._type; }
    get Capacity(): number { return this._capacity; }

    constructor() {
        super();
        this._childParticles = new LinkedDictionary();
    }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;

        if (this.Type === "SolidParticleSystem") {
            this.Ctrl = new BABYLON.SolidParticleSystem(this.Name, scene.Ctrl, { updatable: this.Updateable });
        } else if (this.Type === "ParticleSystem") {
            // Emitters
            var emitter0 = BABYLON.Mesh.CreateBox("emitter0", 0.1, scene.Ctrl);
            emitter0.isVisible = false;

            // Particles
            this.Ctrl = new BABYLON.ParticleSystem(this.Name, this.Capacity, scene.Ctrl);
            this.Ctrl.particleTexture = new BABYLON.Texture("/assets/textures/flare.png", scene.Ctrl);
            this.Ctrl.minAngularSpeed = -0.5;
            this.Ctrl.maxAngularSpeed = 0.5;
            this.Ctrl.minSize = 0.1;
            this.Ctrl.maxSize = 0.5;
            this.Ctrl.minLifeTime = 0.5;
            this.Ctrl.maxLifeTime = 2.0;
            this.Ctrl.minEmitPower = 0.5;
            this.Ctrl.maxEmitPower = 4.0;
            this.Ctrl.emitter = emitter0;
            this.Ctrl.emitRate = 400;
            this.Ctrl.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
            this.Ctrl.minEmitBox = new BABYLON.Vector3(0, 0, 0);
            this.Ctrl.maxEmitBox = new BABYLON.Vector3(0, 0, 0);
            this.Ctrl.direction1 = new BABYLON.Vector3(-1, 1, -1);
            this.Ctrl.direction2 = new BABYLON.Vector3(1, 1, 1);
            this.Ctrl.color1 = new BABYLON.Color3(1, 0, 0);
            this.Ctrl.color2 = new BABYLON.Color3(0, 1, 1);
            this.Ctrl.gravity = new BABYLON.Vector3(0, -2.0, 0);
            this.Ctrl.start();
        }
        

        this.Children.forEach((key:string, child: ParticleSystemShape) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._sceneName = node.attributes["Scene"].value; } catch { }
        try { this._updateable = node.attributes["Updateable"].value.toLowerCase() === 'true'; } catch (e) { }
        try { this._type = node.attributes["Type"].value; } catch { }
        try { this._capacity = parseInt(node.attributes["Capacity"].value); } catch { }
    }
}
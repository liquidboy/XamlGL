import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape, Mesh } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";

export class ParticleSystem extends UIElement {
    private _childParticles: LinkedDictionary<string, ParticleSystemShape>;
    private _sceneName: string;
    private _updateable: boolean = false;
    private _type: string;
    private _capacity: number;
    private _particleTexture: string;
    private _minAngularSpeed: number;
    private _maxAngularSpeed: number;
    private _minSize: number;
    private _maxSize: number;
    private _minLifeTime: number;
    private _maxLifeTime: number;
    private _minEmitPower: number;
    private _maxEmitPower: number;
    private _emitterName:string;
    private _emitRate: number;
    private _updateSpeed: number;
    private _blendMode: number;
    private _emitter: BABYLON.Vector3;
    private _minEmitBox: BABYLON.Vector3;
    private _maxEmitBox: BABYLON.Vector3;
    private _direction1: BABYLON.Vector3;
    private _direction2: BABYLON.Vector3;
    private _color1: BABYLON.Color3 | BABYLON.Color4;
    private _color2: BABYLON.Color3 | BABYLON.Color4;
    private _colorDead: BABYLON.Color4;
    private _gravity: BABYLON.Vector3;
    private _autoStart: boolean = true;

    get Children(): LinkedDictionary<string, ParticleSystemShape> { return this._childParticles; }
    get SceneName(): string { return this._sceneName; }
    get Updateable(): boolean { return this._updateable; }
    get Type(): string { return this._type; }
    get Capacity(): number { return this._capacity; }
    get ParticleTexture(): string { return this._particleTexture; }
    get MinAngularSpeed(): number { return this._minAngularSpeed; }
    get MaxAngularSpeed(): number { return this._maxAngularSpeed; }
    get MinSize(): number { return this._minSize; }
    get MaxSize(): number { return this._maxSize; }
    get MinLifeTime(): number { return this._minLifeTime; }
    get MaxLifeTime(): number { return this._maxLifeTime; }
    get MinEmitPower(): number { return this._minEmitPower; }
    get MaxEmitPower(): number { return this._maxEmitPower; }
    get EmitterName(): string { return this._emitterName; }
    get EmitRate(): number { return this._emitRate; }
    get UpdateSpeed(): number { return this._updateSpeed; }
    get BlendMode(): number { return this._blendMode; }
    get MinEmitBox(): BABYLON.Vector3 { return this._minEmitBox; }
    get MaxEmitBox(): BABYLON.Vector3 { return this._maxEmitBox; }
    get Direction1(): BABYLON.Vector3 { return this._direction1; }
    get Direction2(): BABYLON.Vector3 { return this._direction2; }
    get Color1(): BABYLON.Color3 | BABYLON.Color4 { return this._color1; }
    get Color2(): BABYLON.Color3 | BABYLON.Color4 { return this._color2; }
    get ColorDead(): BABYLON.Color4 { return this._colorDead; }
    get Gravity(): BABYLON.Vector3 { return this._gravity; }
    get AutoStart(): boolean { return this._autoStart; }
    get Emitter(): BABYLON.Vector3 { return this._emitter; }

    constructor() {
        super();
        this._childParticles = new LinkedDictionary();
    }

    public Initialize(): void {
        let scene: Scene = this.VT.Get(this.SceneName) as Scene;

        if (this.Type === "SolidParticleSystem") {
            this.Ctrl = new BABYLON.SolidParticleSystem(this.Name, scene.Ctrl, { updatable: this.Updateable });
        } else if (this.Type === "ParticleSystem") {
            this.Ctrl = new BABYLON.ParticleSystem(this.Name, this.Capacity, scene.Ctrl);
            this.Ctrl.particleTexture = new BABYLON.Texture(this.ParticleTexture, scene.Ctrl);
            if (this.MinAngularSpeed !== undefined) this.Ctrl.minAngularSpeed = this.MinAngularSpeed;
            if (this.MaxAngularSpeed !== undefined) this.Ctrl.maxAngularSpeed = this.MaxAngularSpeed;
            if (this.MinSize !== undefined) this.Ctrl.minSize = this.MinSize;
            if (this.MaxSize !== undefined) this.Ctrl.maxSize = this.MaxSize;
            if (this.MinLifeTime !== undefined) this.Ctrl.minLifeTime = this.MinLifeTime;
            if (this.MaxLifeTime !== undefined) this.Ctrl.maxLifeTime = this.MaxLifeTime;
            if (this.MinEmitPower !== undefined) this.Ctrl.minEmitPower = this.MinEmitPower;
            if (this.MaxEmitPower !== undefined) this.Ctrl.maxEmitPower = this.MaxEmitPower;
            if (this.EmitRate !== undefined) this.Ctrl.emitRate = this.EmitRate;
            if (this.BlendMode !== undefined) this.Ctrl.blendMode = this.BlendMode;
            if (this.MinEmitBox !== undefined) this.Ctrl.minEmitBox = this.MinEmitBox;
            if (this.MaxEmitBox !== undefined) this.Ctrl.maxEmitBox = this.MaxEmitBox;
            if (this.Direction1 !== undefined) this.Ctrl.direction1 = this.Direction1;
            if (this.Direction2 !== undefined) this.Ctrl.direction2 = this.Direction2;
            if (this.Color1 !== undefined) this.Ctrl.color1 = this.Color1;
            if (this.Color2 !== undefined) this.Ctrl.color2 = this.Color2;
            if (this.ColorDead !== undefined) this.Ctrl.colorDead = this.ColorDead;
            if (this.Gravity !== undefined) this.Ctrl.gravity = this.Gravity;
            if (this.UpdateSpeed !== undefined) this.Ctrl.updateSpeed = this.UpdateSpeed;


            if (this.Emitter !== undefined || this.EmitterName !== undefined)
                this.Ctrl.emitter = this.EmitterName !== undefined ? this.VT.Get(this.EmitterName).Ctrl : this.Emitter;
            //if (this.Emitter !== undefined && this.EmitterName === undefined) this.Ctrl.emitter = this.Emitter;
            //if (this.EmitterName !== undefined && this.Emitter === undefined) this.Ctrl.emitter = this.VT.Get(this.EmitterName).Ctrl;

            //console.log(this.Ctrl);

            if (this.AutoStart !== undefined && this.AutoStart === true) {
                //console.log("autostarted the particlesystem");
                this.Ctrl.start();
            }
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
        try { this._capacity = parseInt(node.attributes["Capacity"].value); } catch {}
        try { this._particleTexture = node.attributes["ParticleTexture"].value; } catch { }
        try { this._minAngularSpeed = parseFloat(node.attributes["MinAngularSpeed"].value); } catch { }
        try { this._maxAngularSpeed = parseFloat(node.attributes["MaxAngularSpeed"].value); } catch { }
        try { this._minSize = parseFloat(node.attributes["MinSize"].value); } catch { }
        try { this._maxSize = parseFloat(node.attributes["MaxSize"].value); } catch { }
        try { this._minLifeTime = parseFloat(node.attributes["MinLifeTime"].value); } catch { }
        try { this._maxLifeTime = parseFloat(node.attributes["MaxLifeTime"].value); } catch { }
        try { this._minEmitPower = parseFloat(node.attributes["MinEmitPower"].value); } catch { }
        try { this._maxEmitPower = parseFloat(node.attributes["MaxEmitPower"].value); } catch { }        
        try { this._emitRate = parseInt(node.attributes["EmitRate"].value); } catch { }
        try { this._blendMode = eval(`BABYLON.${node.attributes["BlendMode"].value};`); } catch (e) { }
        try { this._minEmitBox = eval(`new BABYLON.${node.attributes["MinEmitBox"].value};`); } catch (e) { }
        try { this._maxEmitBox = eval(`new BABYLON.${node.attributes["MaxEmitBox"].value};`); } catch (e) { }
        try { this._direction1 = eval(`new BABYLON.${node.attributes["Direction1"].value};`); } catch (e) { }
        try { this._direction2 = eval(`new BABYLON.${node.attributes["Direction2"].value};`); } catch (e) { }
        try { this._color1 = eval(`new BABYLON.${node.attributes["Color1"].value};`); } catch (e) { }
        try { this._color2 = eval(`new BABYLON.${node.attributes["Color2"].value};`); } catch (e) { }
        try { this._colorDead = eval(`new BABYLON.${node.attributes["ColorDead"].value};`); } catch (e) { }
        try { this._gravity = eval(`new BABYLON.${node.attributes["Gravity"].value};`); } catch (e) { }
        try { this._updateSpeed = parseFloat(node.attributes["UpdateSpeed"].value); } catch { }
        try { this._autoStart = node.attributes["AutoStart"].value.toLowerCase() === 'true'; } catch (e) { }

        try { this._emitterName = node.attributes["EmitterName"].value; } catch { }
        try { this._emitter = eval(`new BABYLON.${node.attributes["Emitter"].value};`); } catch (e) { }

    }
}
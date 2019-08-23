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

    set Children(value: LinkedDictionary<string, ParticleSystemShape>) { this._childParticles = value; }
    set SceneName(value: string) { this._sceneName = value; }
    set Updateable(value: boolean) { this._updateable = value; }
    set Type(value: string) { this._type = value; }
    set Capacity(value: number) { this._capacity = value; }
    set ParticleTexture(value: string) { this._particleTexture = value; }
    set MinAngularSpeed(value: number) { this._minAngularSpeed = value; }
    set MaxAngularSpeed(value: number) { this._maxAngularSpeed = value; }
    set MinSize(value: number) { this._minSize = value; }
    set MaxSize(value: number) { this._maxSize = value; }
    set MinLifeTime(value: number) { this._minLifeTime = value; }
    set MaxLifeTime(value: number) { this._maxLifeTime = value; }
    set MinEmitPower(value: number) { this._minEmitPower = value; }
    set MaxEmitPower(value: number) { this._maxEmitPower = value; }
    set EmitterName(value: string) { this._emitterName = value; }
    set EmitRate(value: number) { this._emitRate = value; }
    set UpdateSpeed(value: number) { this._updateSpeed = value; }
    set BlendMode(value: number) { this._blendMode = value; }
    set MinEmitBox(value: BABYLON.Vector3) { this._minEmitBox = value; }
    set MaxEmitBox(value: BABYLON.Vector3) { this._maxEmitBox = value; }
    set Direction1(value: BABYLON.Vector3) { this._direction1 = value; }
    set Direction2(value: BABYLON.Vector3) { this._direction2 = value; }
    set Color1(value: BABYLON.Color3 | BABYLON.Color4) { this._color1 = value; }
    set Color2(value: BABYLON.Color3 | BABYLON.Color4) { this._color2 = value; }
    set ColorDead(value: BABYLON.Color4) { this._colorDead = value; }
    set Gravity(value: BABYLON.Vector3) { this._gravity = value; }
    set AutoStart(value: boolean) { this._autoStart = value; }
    set Emitter(value: BABYLON.Vector3) { this._emitter = value; }

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
            if (this.HasValue(this.MinAngularSpeed)) this.Ctrl.minAngularSpeed = this.MinAngularSpeed;
            if (this.HasValue(this.MaxAngularSpeed)) this.Ctrl.maxAngularSpeed = this.MaxAngularSpeed;
            if (this.HasValue(this.MinSize)) this.Ctrl.minSize = this.MinSize;
            if (this.HasValue(this.MaxSize)) this.Ctrl.maxSize = this.MaxSize;
            if (this.HasValue(this.MinLifeTime)) this.Ctrl.minLifeTime = this.MinLifeTime;
            if (this.HasValue(this.MaxLifeTime)) this.Ctrl.maxLifeTime = this.MaxLifeTime;
            if (this.HasValue(this.MinEmitPower)) this.Ctrl.minEmitPower = this.MinEmitPower;
            if (this.HasValue(this.MaxEmitPower)) this.Ctrl.maxEmitPower = this.MaxEmitPower;
            if (this.HasValue(this.EmitRate)) this.Ctrl.emitRate = this.EmitRate;
            if (this.HasValue(this.BlendMode)) this.Ctrl.blendMode = this.BlendMode;
            if (this.HasValue(this.MinEmitBox)) this.Ctrl.minEmitBox = this.MinEmitBox;
            if (this.HasValue(this.MaxEmitBox)) this.Ctrl.maxEmitBox = this.MaxEmitBox;
            if (this.HasValue(this.Direction1)) this.Ctrl.direction1 = this.Direction1;
            if (this.HasValue(this.Direction2)) this.Ctrl.direction2 = this.Direction2;
            if (this.HasValue(this.Color1)) this.Ctrl.color1 = this.Color1;
            if (this.HasValue(this.Color2)) this.Ctrl.color2 = this.Color2;
            if (this.HasValue(this.ColorDead)) this.Ctrl.colorDead = this.ColorDead;
            if (this.HasValue(this.Gravity)) this.Ctrl.gravity = this.Gravity;
            if (this.HasValue(this.UpdateSpeed)) this.Ctrl.updateSpeed = this.UpdateSpeed;


            if (this.HasValue(this.Emitter) || this.HasValue(this.EmitterName))
                this.Ctrl.emitter = this.HasValue(this.EmitterName) ? this.VT.Get(this.EmitterName).Ctrl : this.Emitter;
            
            //console.log(this.Ctrl);

            if (this.HasValue(this.AutoStart) && this.AutoStart === true) {
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
        this.UpdatePropertyByNode(node, "Scene", "SceneName");
        this.UpdatePropertyByNodeAndFunction(node, "Updateable", "Updateable", this.ConvertToBoolean);
        this.UpdatePropertyByNode(node, "Type", "Type");
        this.UpdatePropertyByNodeAndFunction(node, "Capacity", "Capacity", parseInt);
        this.UpdatePropertyByNode(node, "ParticleTexture", "ParticleTexture");

        this.UpdatePropertyByNodeAndFunction(node, "MinAngularSpeed", "MinAngularSpeed", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "MaxAngularSpeed", "MaxAngularSpeed", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "MinSize", "MinSize", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "MaxSize", "MaxSize", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "MinLifeTime", "MinLifeTime", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "MaxLifeTime", "MaxLifeTime", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "MinEmitPower", "MinEmitPower", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "MaxEmitPower", "MaxEmitPower", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "EmitRate", "EmitRate", parseInt);

        this.UpdatePropertyByNodeAndFunction(node, "BlendMode", "BlendMode", this.ConvertToBabylonObject);
        this.UpdatePropertyByNodeAndFunction(node, "MinEmitBox", "MinEmitBox", this.ConvertToNewBabylonObject);
        this.UpdatePropertyByNodeAndFunction(node, "MaxEmitBox", "MaxEmitBox", this.ConvertToNewBabylonObject);
        this.UpdatePropertyByNodeAndFunction(node, "Direction1", "Direction1", this.ConvertToNewBabylonObject);
        this.UpdatePropertyByNodeAndFunction(node, "Direction2", "Direction2", this.ConvertToNewBabylonObject);
        this.UpdatePropertyByNodeAndFunction(node, "Color1", "Color1", this.ConvertToNewBabylonObject);
        this.UpdatePropertyByNodeAndFunction(node, "Color2", "Color2", this.ConvertToNewBabylonObject);
        this.UpdatePropertyByNodeAndFunction(node, "ColorDead", "ColorDead", this.ConvertToNewBabylonObject);
        this.UpdatePropertyByNodeAndFunction(node, "Gravity", "Gravity", this.ConvertToNewBabylonObject);
        this.UpdatePropertyByNodeAndFunction(node, "UpdateSpeed", "UpdateSpeed", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "AutoStart", "AutoStart", this.ConvertToBoolean);

        this.UpdatePropertyByNode(node, "EmitterName", "EmitterName");
        this.UpdatePropertyByNodeAndFunction(node, "Emitter", "Emitter", this.ConvertToNewBabylonObject);

    }
}
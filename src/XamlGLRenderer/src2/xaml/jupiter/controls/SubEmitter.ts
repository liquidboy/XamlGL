import { UIElement } from "../UIElement";
import { DIContainer } from "../../Core";

export class SubEmitter extends UIElement {

    private _type: string ;
    private _particleSystemName: string;
    private _particleCount: number;
    private _sceneName: string;
    private _inheritDirection: boolean;
    private _inheritedVelocityAmount: number;
    
    get Type(): string { return this._type; }
    get ParticleSystemName(): string { return this._particleSystemName; }
    get ParticleCount(): number { return this._particleCount; }
    get SceneName(): string { return this._sceneName; }
    get InheritDirection(): boolean { return this._inheritDirection; }
    get InheritedVelocityAmount(): number { return this._inheritedVelocityAmount; }

    set Type(value: string) { this._type = value; }
    set ParticleSystemName(value: string) { this._particleSystemName = value; }
    set ParticleCount(value: number) { this._particleCount = value; }
    set SceneName(value: string) { this._sceneName = value; }
    set InheritDirection(value: boolean) { this._inheritDirection = value; }
    set InheritedVelocityAmount(value: number) { this._inheritedVelocityAmount = value; }

    constructor() {
        super();
    }

    public Initialize(): void {
        //console.log("subemitter initialize start " + this.Name);

        let scene = this.VT.FindByName(this.SceneName);
        if (this.HasValue(this.ParticleSystemName)) {
            let particleSystem = this.VT.FindByName(this.ParticleSystemName);
            this.Ctrl = new BABYLON.SubEmitter(particleSystem.Ctrl);
        } else if (this.HasValue(this.ParticleCount)) {
            this.Ctrl = new BABYLON.SubEmitter(new BABYLON.ParticleSystem(`ps${this.Name}`, this.ParticleCount, scene.Ctrl));
        }
        this.Ctrl.type = this.Type;
        this.Ctrl.inheritDirection = this.InheritDirection;
        if(this.HasValue(this.InheritedVelocityAmount)) this.Ctrl.inheritedVelocityAmount = this.InheritedVelocityAmount;

        //console.log("subemitter initialize end " + this.Name);
        //console.log(this.Ctrl);
        //console.log("subemitter postinitialize start " + this.Name);
        this.PostInitialize();
        //console.log("subemitter postinitialize end " + this.Name);
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        this.UpdatePropertyByNodeAndFunction(node, "Type", "Type", this.ConvertToBabylonObject);
        this.UpdatePropertyByNode(node, "Scene", "SceneName");
        this.UpdatePropertyByNode(node, "ParticleSystem", "ParticleSystemName");
        this.UpdatePropertyByNodeAndFunction(node, "ParticleCount", "ParticleCount", parseInt);
        this.UpdatePropertyByNodeAndFunction(node, "InheritedVelocityAmount", "InheritedVelocityAmount", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "InheritDirection", "InheritDirection", this.ConvertToBoolean);
    }
}
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
    
    constructor() {
        super();
    }

    public Initialize(): void {
        //console.log("subemitter initialize start " + this.Name);

        let scene = this.VT.FindByName(this.SceneName);
        if (this.ParticleSystemName !== undefined) {
            let particleSystem = this.VT.FindByName(this.ParticleSystemName);
            this.Ctrl = new BABYLON.SubEmitter(particleSystem.Ctrl);
        } else if (this.ParticleCount !== undefined) {
            this.Ctrl = new BABYLON.SubEmitter(new BABYLON.ParticleSystem(`ps${this.Name}`, this.ParticleCount, scene.Ctrl));
        }
        this.Ctrl.type = this.Type;
        this.Ctrl.inheritDirection = this.InheritDirection;
        if(this.InheritedVelocityAmount !== undefined) this.Ctrl.inheritedVelocityAmount = this.InheritedVelocityAmount;

        //console.log("subemitter initialize end " + this.Name);
        //console.log(this.Ctrl);
        //console.log("subemitter postinitialize start " + this.Name);
        this.PostInitialize();
        //console.log("subemitter postinitialize end " + this.Name);
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._type = eval("BABYLON." + node.attributes["Type"].value); } catch { }
        try { this._particleSystemName = node.attributes["ParticleSystem"].value; } catch { }
        try { this._particleCount= parseInt(node.attributes["ParticleCount"].value); } catch { }   
        try { this._sceneName = node.attributes["Scene"].value; } catch { }
        try { this._inheritDirection = node.attributes["InheritDirection"].value.toLowerCase() === 'true'; } catch (e) { }
        try { this._inheritedVelocityAmount = parseFloat(node.attributes["InheritedVelocityAmount"].value); } catch { }   
    }
}
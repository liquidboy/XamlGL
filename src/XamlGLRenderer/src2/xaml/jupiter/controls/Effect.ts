import { UIElement } from "../UIElement";
import { DIContainer } from "../../Core";

export class Effect extends UIElement {
    private _uniformNames: any;

    get UniformNames(): any { return this._uniformNames; }

    constructor() {
        super();
    }

    public Initialize(): void {
        let engine: BABYLON.Engine = DIContainer.get("rootEngine") as BABYLON.Engine;
        this.Ctrl = engine.createEffectForParticles(this.Name, this.UniformNames, [""], "");
    }

    public LoadFromNode(node: any): void {
        try { this._uniformNames = eval(this.CleanJSONObject(node.attributes["UniformNames"].value)); } catch (e) { }

        super.LoadFromNode(node);
    }

    private CleanJSONObject(stringToClean: string): any {
        var cleanString = stringToClean.replace(/`/g, "\"")
        var newObject = JSON.parse(cleanString);
        return newObject;
    }
}
import { UIElement } from "../../UIElement";
import { Scene, ParticleSystemShape, Mesh } from "../Core";
import { LinkedDictionary } from "../../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"
import { ISetValue } from "../ISetValue";

export class Line extends UIElement implements ISetValue {

    private _lineWidth: number;
    private _alpha: number;
    private _dash: number[];
    private _meshName: string;
    private _connectedControlName: string;

    get Dash(): number[] { return this._dash; }
    get LineWidth(): number { return this._lineWidth; }
    get Alpha(): number { return this._alpha ; }
    get MeshName(): string { return this._meshName; }
    get ConnectedControlName(): string { return this._connectedControlName; }


    set Dash(value: number[]) { this._dash = value; }
    set LineWidth(value: number) { this._lineWidth = value; }
    set Alpha(value: number) { this._alpha = value; }
    set MeshName(value: string) { this._meshName = value; }
    set ConnectedControlName(value: string) { this._connectedControlName = value; }


    constructor() {
        super();
    }

    public Initialize(): void {
        let mesh: Mesh = this.VT.Get(this.MeshName) as Mesh;
        let connecteControl: any = this.VT.Get(this.ConnectedControlName);

        this.CreateCtrl();

        this.SetValue("Alpha", 0.5);
        this.SetValue("LineWidth", 5);
        this.SetValue("Dash", [5, 10]);

        (this.Parent as any).Ctrl.addControl(this.Ctrl);

        this.Ctrl.linkWithMesh(mesh.Ctrl);
        this.Ctrl.connectedControl = connecteControl.Ctrl;

        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);

        try { this._dash = eval(node.attributes["Dash"].value); } catch { }
        try { this._meshName = node.attributes["Mesh"].value; } catch { }
        try { this._alpha = parseFloat(node.attributes["Alpha"].value); } catch { }
        try { this._lineWidth = parseFloat(node.attributes["LineWidth"].value); } catch { }
        //try { this._meshName = node.attributes["Mesh"].value; } catch { }
        try { this._connectedControlName = node.attributes["ConnectedControl"].value; } catch { }

    }

    SetValue(propertyName: string, value: any): void {
        switch (propertyName) {
            case "Mesh":
            case "ConnectedControl": this.UpdatePropertyByValue(propertyName, value, null); break;
            case "Alpha": 
            case "LineWidth": this.UpdatePropertyByValue(propertyName, value, parseFloat); break;
            case "Dash": this.UpdatePropertyByValue(propertyName, value, eval); break;
            default: return;
        }
        this.RefreshCtrlProperty(propertyName);
    }

    RefreshCtrlProperty(propertyName: string): void {
        switch (propertyName) {
            case "Dash": if (this.HasValue(this.Dash)) this.Ctrl.dash = this.Dash; break;
            case "Alpha": if (this.HasValue(this.Alpha)) this.Ctrl.alpha = this.Alpha; break;
            case "LineWidth": if (this.HasValue(this.LineWidth)) this.Ctrl.lineWidth = this.LineWidth; break;
        }
    }

    ClearCtrl(): void {
        if (!this.HasValue(this.Ctrl)) return;

        this.bjsCtrl.dispose();
        this.Ctrl = null;
    }

    CreateCtrl(): void {
        this.ClearCtrl();
        this.Ctrl = new BABYLON.GUI.Line();
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);            
            return true;
        }
        return false;
    }
}
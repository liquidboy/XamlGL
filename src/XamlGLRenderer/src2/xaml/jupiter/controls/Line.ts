import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape, Mesh } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"

export class Line extends UIElement {
    private _ctrl: BABYLON.GUI.Line;
    private _lineWidth: number;
    private _alpha: number;
    private _dash: number[];
    private _meshName: string;
    private _connectedControlName: string;

    get Ctrl(): BABYLON.GUI.Line { return this._ctrl; }
    get Dash(): number[] { return this._dash; }
    get LineWidth(): number { return this._lineWidth; }
    get Alpha(): number { return this._alpha ; }
    get MeshName(): string { return this._meshName; }
    get ConnectedControlName(): string { return this._connectedControlName; }

    constructor() {
        super();
    }

    public Initialize(): void {
        let mesh: Mesh = this.VT.Get(this.MeshName) as Mesh;
        let connecteControl: any = this.VT.Get(this.ConnectedControlName);

        this._ctrl = new BABYLON.GUI.Line();
        this._ctrl.alpha = 0.5;
        this._ctrl.lineWidth = 5;
        this._ctrl.dash = [5, 10];
        
        (this.Parent as any).Texture.addControl(this._ctrl);

        this._ctrl.linkWithMesh(mesh.Mesh);
        this._ctrl.connectedControl = connecteControl.Ctrl;

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
        try { this._meshName = node.attributes["Mesh"].value; } catch { }
        try { this._connectedControlName = node.attributes["ConnectedControl"].value; } catch { }

    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);            
            return true;
        }
        return false;
    }
}
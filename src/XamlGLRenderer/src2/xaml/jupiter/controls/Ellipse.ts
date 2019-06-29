import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"
import { Mesh } from "./Mesh";


export class Ellipse extends UIElement {
    private _width: string | number;
    private _height: string | number;
    private _thickness: number;
    private _color: string;
    private _background: string;
    private _meshName: string;

    get Color(): string { return this._color; }
    get Background(): string { return this._background; }
    get Thickness(): number { return this._thickness; }
    get Width(): string | number { return this._width ; }
    get Height(): string | number { return this._height; }
    get MeshName(): string { return this._meshName; }

    constructor() {
        super();
    }

    public Initialize(): void {
        this.Ctrl = new BABYLON.GUI.Ellipse();
        this.Ctrl.width = this.Width;
        this.Ctrl.height = this.Height;
        this.Ctrl.color = this.Color;
        this.Ctrl.background = this.Background;
        if(this.Thickness !== undefined) this.Ctrl.thickness = this.Thickness;
        //this.Ctrl.paddingTop = this.;
        //this.Ctrl.paddingBottom = "2px";

        (this.Parent as any).Ctrl.addControl(this.Ctrl);

        if (this.MeshName !== undefined) {
            let mesh = this.VT.Get(this.MeshName) as Mesh;
            this.Ctrl.linkWithMesh(mesh.Ctrl);
        }

        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._color = node.attributes["Color"].value; } catch { }
        try { this._background = node.attributes["Background"].value; } catch { }
        try { this._width = node.attributes["Width"].value; } catch { }
        try { this._height = node.attributes["Height"].value; } catch { }
        try { this._thickness = parseFloat(node.attributes["Thickness"].value); } catch { }
        try { this._meshName = node.attributes["Mesh"].value; } catch { }
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);            
            return true;
        }
        return false;
    }
}
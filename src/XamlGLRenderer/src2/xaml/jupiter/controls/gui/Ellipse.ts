import { UIElement } from "../../UIElement";
import { Scene, ParticleSystemShape } from "../Core";
import { LinkedDictionary } from "../../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"
import { Mesh } from "../Mesh";
import { ISetValue } from "../ISetValue";


export class Ellipse extends UIElement implements ISetValue {

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

    set Color(value: string) { this._color = value; }
    set Background(value: string) { this._background = value; }
    set Thickness(value: number) { this._thickness = value; }
    set Width(value: string | number) { this._width = value; }
    set Height(value: string | number) { this._height = value; }
    set MeshName(value: string) { this._meshName = value; }

    constructor() {
        super();
    }

    public Initialize(): void {
        this.CreateCtrl();

        this.RefreshCtrlProperty("Width");
        this.RefreshCtrlProperty("Height");
        this.RefreshCtrlProperty("Color");
        this.RefreshCtrlProperty("Background");
        this.RefreshCtrlProperty("Thickness");
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
        
        this.UpdatePropertyByNode(node, "Color", "Color");
        this.UpdatePropertyByNode(node, "Background", "Background");
        this.UpdatePropertyByNode(node, "Width", "Width");
        this.UpdatePropertyByNode(node, "Height", "Height");
        this.UpdatePropertyByNodeAndFunction(node, "Thickness", "Thickness", parseFloat);
        this.UpdatePropertyByNode(node, "Mesh", "Mesh");
    }

    SetValue(propertyName: string, value: any): void {
        switch (propertyName) {
            case "Height":
            case "Width":
            case "Background":
            case "Color": this.UpdatePropertyByValue(propertyName, value, null); break;
            case "Thickness": this.UpdatePropertyByValue(propertyName, value, parseFloat); break;
            default: return;
        }
        this.RefreshCtrlProperty(propertyName);
    }

    RefreshCtrlProperty(propertyName: string): void {
        switch (propertyName) {
            case "Height": if (this.HasValue(this.Height)) this.Ctrl.height = this.Height; break;
            case "Width": if (this.HasValue(this.Width)) this.Ctrl.width = this.Width; break;
            case "Color": if (this.HasValue(this.Color)) this.Ctrl.color = this.Color; break;
            case "Background": if (this.HasValue(this.Background)) this.Ctrl.background = this.Background; break;
            case "Thickness": if (this.HasValue(this.Thickness)) this.Ctrl.thickness = this.Thickness; break;
        }
    }
    ClearCtrl(): void {
        if (!this.HasValue(this.Ctrl)) return;

        this.bjsCtrl.dispose();
        this.Ctrl = null;
    }
    CreateCtrl(): void {
        this.ClearCtrl();
        this.Ctrl = new BABYLON.GUI.Ellipse();
    }
    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);            
            return true;
        }
        return false;
    }
}
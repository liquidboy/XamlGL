import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"

export class Ellipse extends UIElement {
    private _width: string | number;
    private _height: string | number;
    private _thickness: number;
    private _color: string;

    get Color(): string { return this._color; }
    get Thickness(): number { return this._thickness; }
    get Width(): string | number { return this._width ; }
    get Height(): string | number { return this._height; }

    constructor() {
        super();
    }

    public Initialize(): void {
        this.Ctrl = new BABYLON.GUI.Ellipse();
        this.Ctrl.width = this.Width;
        this.Ctrl.color = this.Color;
        this.Ctrl.thickness = this.Thickness;
        this.Ctrl.height = this.Height;
        //this.Ctrl.paddingTop = this.;
        //this.Ctrl.paddingBottom = "2px";

        (this.Parent as any).Ctrl.addControl(this.Ctrl);

        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._color = node.attributes["Color"].value; } catch { }
        try { this._width = node.attributes["Width"].value; } catch { }
        try { this._height = node.attributes["Height"].value; } catch { }
        try { this._thickness = parseFloat(node.attributes["Thickness"].value); } catch { }
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);            
            return true;
        }
        return false;
    }
}
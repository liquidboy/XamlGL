import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"

export class StackPanel extends UIElement {
    private _width: number;
    private _top: string | number;
    private _rotation: number;
    private _horizontalAlignment: number;
    private _verticalAlignment: number;
    
    get Rotation(): number { return this._rotation; }
    get Width(): number { return this._width; }
    get Top(): string | number { return this._top; }
    get HorizontalAlignment(): number { return this._horizontalAlignment; }
    get VerticalAlignment(): number { return this._verticalAlignment; }

    constructor() {
        super();
    }

    public Initialize(): void {
        this.Ctrl = new BABYLON.GUI.StackPanel();  
        if (this.Width !== undefined) this.Ctrl.width = this.Width;
        if (this.Top !== undefined) this.Ctrl.top = this.Top;
        if (this.Rotation !== undefined) this.Ctrl.rotation = this.Rotation;
        if (this.HorizontalAlignment !== undefined) this.Ctrl.horizontalAlignment = this.HorizontalAlignment;
        if (this.VerticalAlignment !== undefined) this.Ctrl.verticalAlignment = this.VerticalAlignment;
        (this.Parent as any).Ctrl.addControl(this.Ctrl);

        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._width = node.attributes["Width"].value; } catch { }
        try { this._top = node.attributes["Top"].value; } catch { }
        try { this._rotation = parseFloat(node.attributes["Rotation"].value); } catch { }
        try { this._horizontalAlignment = eval(node.attributes["HorizontalAlignment"].value); } catch { }
        try { this._verticalAlignment = eval(node.attributes["VerticalAlignment"].value); } catch { }
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);
            return true;
        }
        return false;
    }
}
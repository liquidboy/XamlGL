import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"

export class StackPanel extends UIElement {
    private _width: number;
    private _rotation: number;
    private _horizontalAlignment: number;
    
    get Rotation(): number { return this._rotation; }
    get Width(): number { return this._width ; }
    get HorizontalAlignment(): number { return this._horizontalAlignment; }

    constructor() {
        super();
    }

    public Initialize(): void {
        this.Ctrl = new BABYLON.GUI.StackPanel();  
        this.Ctrl.width = this.Width;
        this.Ctrl.rotation = this.Rotation;
        this.Ctrl.horizontalAlignment = this.HorizontalAlignment;
        (this.Parent as any).Ctrl.addControl(this.Ctrl);

        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._width = parseFloat(node.attributes["Width"].value); } catch { }
        try { this._rotation = parseFloat(node.attributes["Rotation"].value); } catch { }
        try { this._horizontalAlignment = eval(node.attributes["HorizontalAlignment"].value); } catch { }
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);
            return true;
        }
        return false;
    }
}
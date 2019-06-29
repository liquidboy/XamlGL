import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"

export class StackPanel extends UIElement {

    private _height: string | number;
    private _width: string | number;
    private _top: string | number;
    private _rotation: number;
    private _isVertical: boolean;
    private _fontSize: string;
    private _paddingRight: string;
    private _horizontalAlignment: number;
    private _verticalAlignment: number;
    
    get Rotation(): number { return this._rotation; }
    get Height(): string | number { return this._height; }
    get Width(): string | number { return this._width; }
    get IsVertical(): boolean { return this._isVertical; }
    get Top(): string | number { return this._top; }
    get PaddingRight(): string | number { return this._paddingRight; }
    get FontSize(): string  { return this._fontSize; }
    get HorizontalAlignment(): number { return this._horizontalAlignment; }
    get VerticalAlignment(): number { return this._verticalAlignment; }

    constructor() {
        super();
    }

    public Initialize(): void {
        this.Ctrl = new BABYLON.GUI.StackPanel(this.Name);  

        if (this.Height !== undefined) this.Ctrl.height = this.Height;
        if (this.Width !== undefined) this.Ctrl.width = this.Width;
        if (this.Top !== undefined) this.Ctrl.top = this.Top;
        if (this.Rotation !== undefined) this.Ctrl.rotation = this.Rotation;
        if (this.HorizontalAlignment !== undefined) this.Ctrl.horizontalAlignment = this.HorizontalAlignment;
        if (this.VerticalAlignment !== undefined) this.Ctrl.verticalAlignment = this.VerticalAlignment;
        if (this.FontSize !== undefined) this.Ctrl.fontSize = this.FontSize;
        if (this.PaddingRight !== undefined) this.Ctrl.paddingRight = this.PaddingRight;
        if (this.IsVertical !== undefined) this.Ctrl.isVertical = this.IsVertical;

        this.Parent.Ctrl.addControl(this.Ctrl);

        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._height = node.attributes["Height"].value; } catch { }
        try { this._width = node.attributes["Width"].value; } catch { }
        try { this._top = node.attributes["Top"].value; } catch { }
        try { this._rotation = parseFloat(node.attributes["Rotation"].value); } catch { }
        try { this._horizontalAlignment = eval(node.attributes["HorizontalAlignment"].value); } catch { }
        try { this._verticalAlignment = eval(node.attributes["VerticalAlignment"].value); } catch { }
        try { this._fontSize = node.attributes["FontSize"].value; } catch { }
        try { this._paddingRight = node.attributes["PaddingRight"].value; } catch { }
        try { this._isVertical= node.attributes["IsVertical"].value.toLowerCase() === 'true'; } catch (e) { }
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);
            return true;
        }
        return false;
    }
}
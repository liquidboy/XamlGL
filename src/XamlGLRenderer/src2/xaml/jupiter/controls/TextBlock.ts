import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"

export class TextBlock extends UIElement {
    private _height: number | string;
    private _width: number | string;
    private _fontSize: number;
    private _content: string;
    private _color: string;
    private _textHorizontalAlignment: number;
    
    get Height(): number | string { return this._height; }
    get Width(): number | string { return this._height; }
    get FontSize(): number  { return this._fontSize; }
    get Content(): string { return this._content; }
    get Color(): string { return this._color; }
    get TextHorizontalAlignment(): number { return this._textHorizontalAlignment; }

    constructor() {
        super();
    }

    public Initialize(): void {
        this.Ctrl = new BABYLON.GUI.TextBlock(this.Name);  
        if (this.Height !== undefined) this.Ctrl.height = this.Height;
        if (this.Width !== undefined) this.Ctrl.width = this.Width;
        if (this.FontSize !== undefined) this.Ctrl.fontSize = this.FontSize;
        if (this.Color !== undefined) this.Ctrl.color = this.Color;
        if (this.TextHorizontalAlignment !== undefined) this.Ctrl.textHorizontalAlignment = this.TextHorizontalAlignment;
        this.Ctrl.text = this.Content;

        (this.Parent as any).Ctrl.addControl(this.Ctrl);
        
        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._height = node.attributes["Height"].value; } catch { }
        try { this._width = node.attributes["Width"].value; } catch { }
        try { this._fontSize = parseFloat(node.attributes["FontSize"].value); } catch { }
        try { this._content = node.attributes["Content"].value; } catch { }
        try { this._color = node.attributes["Color"].value; } catch { }
        try { this._textHorizontalAlignment = eval(node.attributes["TextHorizontalAlignment"].value); } catch { }
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);
            return true;
        }
        return false;
    }
}
import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"

export class TextBlock extends UIElement {
    private _height: number | string;
    private _fontSize: number;
    private _content: string;
    
    get Height(): number | string { return this._height; }
    get FontSize(): number  { return this._fontSize; }

    get Content(): string { return this._content; }

    constructor() {
        super();
    }

    public Initialize(): void {
        this.Ctrl = new BABYLON.GUI.TextBlock(this.Name);  
        this.Ctrl.height = this.Height;
        this.Ctrl.fontSize = this.FontSize;
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
        try { this._fontSize = parseFloat(node.attributes["FontSize"].value); } catch { }
        try { this._content = node.attributes["Content"].value; } catch { }
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);
            return true;
        }
        return false;
    }
}
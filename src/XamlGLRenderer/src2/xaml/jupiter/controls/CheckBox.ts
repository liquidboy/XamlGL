import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"

export class CheckBox extends UIElement {
    private _width: number | string;
    private _height: number | string;
    private _color: string;
    private _background: string;
    private _fontSize: number;
    private _content: string;
    private _isChecked: boolean;
    private _headerSize: number | string;
    private _headerHeight: number | string;
    
    get Width(): number | string { return this._width; };
    get Height(): number | string { return this._height; };
    get Color(): string { return this._color; };
    get Background(): string { return this._background; };
    get FontSize(): number { return this._fontSize; };
    get Content(): string { return this._content; };
    get IsChecked(): boolean { return this._isChecked; };
    get HeaderSize(): number | string { return this._headerSize; };
    get HeaderHeight(): number | string { return this._headerHeight; };

    constructor() {
        super();
    }

    public Initialize(): void {
        this.Ctrl = new BABYLON.GUI.Checkbox();
        this.Ctrl.width = this.Width;
        this.Ctrl.height = this.Height;
        this.Ctrl.color = this.Color;
        this.Ctrl.isChecked = this.IsChecked;
        if (this.Background !== undefined) this.Ctrl.background = this.Background;

        var header = BABYLON.GUI.Control.AddHeader(this.Ctrl, this.Content, this.HeaderSize, { isHorizontal: true, controlFirst: true });
        header.color = this.Color;
        header.height = this.HeaderHeight;
        header.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        header.children[1].fontSize = this.FontSize;
        header.children[1].onPointerDownObservable.add(() => {
            this.Ctrl.isChecked = !this.Ctrl.isChecked;
        });

        (this.Parent as any).Ctrl.addControl(header);
        
        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._height = node.attributes["Height"].value; } catch { }
        try { this._width = node.attributes["Width"].value; } catch { }
        try { this._color = node.attributes["Color"].value; } catch { }
        try { this._background = node.attributes["Background"].value; } catch { }
        try { this._fontSize = parseFloat(node.attributes["FontSize"].value); } catch { }
        try { this._content = node.attributes["Content"].value; } catch { }
        try { this._headerSize = node.attributes["HeaderSize"].value; } catch { }
        try { this._isChecked = node.attributes["IsChecked"].value.toLowerCase() === 'true'; } catch (e) { }
        try { this._headerHeight = node.attributes["HeaderHeight"].value; } catch { }
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);
            return true;
        }
        return false;
    }
}
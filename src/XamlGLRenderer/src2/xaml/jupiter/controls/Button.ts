import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape, Event } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"
import { CustomScript } from "../../behaviors/CustomScript";

export class Button extends UIElement {
    private _content: string;
    private _width: string | number;
    private _height: string | number;
    private _cornerRadius: number;
    private _fontSize: number;
    private _color: string;
    private _background: string;

    get Content(): string { return this._content; }
    get Color(): string { return this._color; }
    get Background(): string { return this._background; }
    get CornerRadius(): number { return this._cornerRadius; }
    get Width(): string | number { return this._width ; }
    get Height(): string | number { return this._height; }
    get FontSize(): number { return this._fontSize; }

    constructor() {
        super();
    }

    public Initialize(): void {
        this.Ctrl = BABYLON.GUI.Button.CreateSimpleButton(this.Name, this.Content);
        this.Ctrl.width = this.Width;
        this.Ctrl.height = this.Height;
        this.Ctrl.color = this.Color;
        this.Ctrl.cornerRadius = this.CornerRadius;
        this.Ctrl.background = this.Background;
        if (this.FontSize !== undefined) this.Ctrl.fontSize = this.FontSize;
        (this.Parent as any).Ctrl.addControl(this.Ctrl);

        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        if (this.ChildrenEvents.size() > 0) {
            this.ChildrenEvents.forEach((key: string, value: Event) => {
                try { this.Ctrl[key].add(CustomScript.InstallRet(this.VT, this.DI, value.Code)); } catch(e) { }
            });  
        } 

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._content = node.attributes["Content"].value; } catch { }
        try { this._color = node.attributes["Color"].value; } catch { }
        try { this._background = node.attributes["Background"].value; } catch { }
        try { this._width = parseFloat(node.attributes["Width"].value); } catch { }
        try { this._height = node.attributes["Height"].value; } catch { }
        try { this._cornerRadius = node.attributes["CornerRadius"].value; } catch { }
        try { this._fontSize = parseFloat(node.attributes["FontSize"].value); } catch { }
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);            
            return true;
        }
        return false;
    }
}
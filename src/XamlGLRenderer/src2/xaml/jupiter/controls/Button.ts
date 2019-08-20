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

    set Content(value: string) { this._content = value; }
    set Color(value: string) { this._color = value; }
    set Background(value: string) { this._background = value; }
    set CornerRadius(value: number) { this._cornerRadius = value; }
    set Width(value: string | number) { this._width = value; }
    set Height(value: string | number) { this._height = value; }
    set FontSize(value: number) { this._fontSize = value; }

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
        if ( this.HasValue(this.FontSize)) this.Ctrl.fontSize = this.FontSize;
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
        this.UpdatePropertyByNode(node, "Content", "Content");
        this.UpdatePropertyByNode(node, "Color", "Color");
        this.UpdatePropertyByNode(node, "Background", "Background");
        this.UpdatePropertyByNode(node, "Width", "Width");
        this.UpdatePropertyByNode(node, "Height", "Height");
        this.UpdatePropertyByNodeAndFunction(node, "CornerRadius", "CornerRadius", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "FontSize", "FontSize", parseFloat);
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);            
            return true;
        }
        return false;
    }
}
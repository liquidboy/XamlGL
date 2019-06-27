import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape, Event } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"
import { CustomScript } from "../../behaviors/CustomScript";

export class Button extends UIElement {
    private _ctrl: BABYLON.GUI.Button;
    private _content: string;
    private _width: any;
    private _height: any;
    private _cornerRadius: number;
    private _color: string;
    private _background: string;

    get Ctrl(): BABYLON.GUI.Button { return this._ctrl; }
    get Content(): string { return this._content; }
    get Color(): string { return this._color; }
    get Background(): string { return this._background; }
    get CornerRadius(): number { return this._cornerRadius; }
    get Width(): any { return this._width ; }
    get Height(): any { return this._height; }

    constructor() {
        super();
    }

    public Initialize(): void {
        this._ctrl = BABYLON.GUI.Button.CreateSimpleButton(this.Name, this.Content);
        this._ctrl.width = this.Width;
        this._ctrl.height = this.Height;
        this._ctrl.color = this.Color;
        this._ctrl.cornerRadius = this.CornerRadius;
        this._ctrl.background = this.Background;
        (this.Parent as any).Ctrl.addControl(this._ctrl);

        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        if (this.ChildrenEvents.size() > 0) {
            this.ChildrenEvents.forEach((key: string, value: Event) => {
                try { this._ctrl[key].add(CustomScript.InstallRet(this.VT, this.DI, value.Code)); } catch(e) { }
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
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);            
            return true;
        }
        return false;
    }
}
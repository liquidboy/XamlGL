import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"

export class Button extends UIElement {
    private _button: BABYLON.GUI.Button;
    private _children: LinkedDictionary<string, UIElement>;
    private _content: string;
    private _width: any;
    private _height: any;
    private _cornerRadius: number;
    private _color: string;
    private _background: string;

    get Button(): BABYLON.GUI.Button { return this._button; }
    get Children(): LinkedDictionary<string, UIElement> { return this._children; }
    get Content(): string { return this._content; }
    get Color(): string { return this._color; }
    get Background(): string { return this._background; }
    get CornerRadius(): number { return this._cornerRadius; }
    get Width(): any { return this._width ; }
    get Height(): any { return this._height; }

    constructor() {
        super();
        this._children = new LinkedDictionary();
    }

    public Initialize(): void {
        this._button = BABYLON.GUI.Button.CreateSimpleButton(this.Name, this.Content);
        this._button.width = this.Width;
        this._button.height = this.Height;
        this._button.color = this.Color;
        this._button.cornerRadius = this.CornerRadius;
        this._button.background = this.Background;
        (this.Parent as any).StackPanel.addControl(this._button);

        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._content = node.attributes["Content"].value; } catch { }
        try { this._color = node.attributes["Color"].value; } catch { }
        try { this._background = node.attributes["Background"].value; } catch { }
        try { this._width = node.attributes["Width"].value; } catch { }
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
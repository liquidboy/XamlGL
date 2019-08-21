import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"

export class Plane extends UIElement {
    private _size: number;
    private _meshName: string;
    private _sceneName: string;
    
    get Size(): number { return this._size; }
    get MeshName(): string { return this._meshName; }
    get SceneName(): string { return this._sceneName; }

    set Size(value: number) { this._size = value; }
    set MeshName(value: string) { this._meshName = value; }
    set SceneName(value: string) { this._sceneName = value; }

    constructor() {
        super();
    }

    public Initialize(): void {
        if (this.HasValue(this.SceneName)) {
            let scene = this.VT.FindByName(this.SceneName);
            this.Ctrl = BABYLON.Mesh.CreatePlane(this.Name, this.Size, scene.Ctrl);  
            this.Ctrl.Size = this.Size;
            this.Ctrl.position = this.Position;

            if (this.HasValue(this.MeshName)) {
                let mesh = this.VT.FindByName(this.MeshName);
                this.Ctrl.parent = mesh.Ctrl;
            }
        }

        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        this.UpdatePropertyByNodeAndFunction(node, "Size", "Size", parseFloat);
        this.UpdatePropertyByNode(node, "Mesh", "MeshName");
        this.UpdatePropertyByNode(node, "Scene", "SceneName");
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);
            return true;
        }
        return false;
    }
}
import { UIElement } from "../UIElement";
import { Camera, Light } from "./Core";
import { SceneMouseWheelZoom } from "../../behaviors/SceneMouseWheelZoom";
import { MoveSelectedMesh } from "../../behaviors/MoveSelectedMesh";
import { Ground } from "./Ground";
import { DIContainer } from "../../Core";

export class Scene extends UIElement {
    

    private _scene: BABYLON.Scene;
    private _groundName: string;
    private _cameraName: string;
    private _lightName: string;
    private _clearColor: BABYLON.Color3;

    get Scene(): BABYLON.Scene { return this._scene; }
    get GroundName(): string { return this._groundName; }
    get CameraName(): string { return this._cameraName; }
    get LightName(): string { return this._lightName; }
    get ClearColor(): BABYLON.Color3 { return this._clearColor; }

    constructor() {
        super();
    }

    public Initialize(): void {
        let engine: BABYLON.Engine = DIContainer.get("rootEngine") as BABYLON.Engine;
        let canvas: HTMLCanvasElement = DIContainer.get("rootCanvas") as HTMLCanvasElement;

        this._scene = new BABYLON.Scene(engine);
        
        if (this._clearColor) this._scene.clearColor = this.convertColor3ToColor4(this._clearColor);

        SceneMouseWheelZoom.Install(this);
        new MoveSelectedMesh().Install(this, canvas, this.GroundName, this.CameraName);
        
        engine.runRenderLoop(() => {
            this._scene.render();
        });
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._cameraName = node.attributes["Camera"].value; } catch(e) { }
        try { this._lightName = node.attributes["Light"].value; } catch (e) { }
        try { this._groundName = node.attributes["Ground"].value; } catch (e) { }
        try { this._clearColor = eval(this.cleanBabylonColor3Attribute(node.attributes["ClearColor"].value)); } catch (e) { }
    }

    private cleanBabylonColor3Attribute(color3: string): string {
        if (color3.includes("Color3.")) return `BABYLON.${color3};`;
        return `new BABYLON.${color3};`;
    }

    private convertColor3ToColor4(color: BABYLON.Color3): BABYLON.Color4 {
        return new BABYLON.Color4(color.r, color.g, color.b, 1);
    }
}
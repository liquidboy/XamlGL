import { UIElement } from "../UIElement";
import { Camera, Light } from "./Core";
import { SceneMouseWheelZoom } from "../../behaviors/SceneMouseWheelZoom";
import { MoveSelectedMesh } from "../../behaviors/MoveSelectedMesh";
import { Ground } from "./Ground";
import { DIContainer } from "../../Core";
import { CustomScript } from "../../behaviors/CustomScript";

export class Scene extends UIElement {
    private _groundName: string;
    private _cameraName: string;
    private _lightName: string;
    private _clearColor: BABYLON.Color3;

    get GroundName(): string { return this._groundName; }
    get CameraName(): string { return this._cameraName; }
    get LightName(): string { return this._lightName; }
    get ClearColor(): BABYLON.Color3 { return this._clearColor; }

    set GroundName(value: string) { this._groundName = value; }
    set CameraName(value: string) { this._cameraName = value; }
    set LightName(value: string) { this._lightName = value; }
    set ClearColor(value: BABYLON.Color3) { this._clearColor = value; }

    constructor() {
        super();
    }

    public Initialize(): void {
        let engine: BABYLON.Engine = DIContainer.get("rootEngine") as BABYLON.Engine;
        let canvas: HTMLCanvasElement = DIContainer.get("rootCanvas") as HTMLCanvasElement;

        this.Ctrl = new BABYLON.Scene(engine);
        
        if (this.HasValue(this.ClearColor)) this.Ctrl.clearColor = this.convertColor3ToColor4(this.ClearColor);

        SceneMouseWheelZoom.Install(this);
        new MoveSelectedMesh().Install(this, canvas, this.GroundName, this.CameraName);

        engine.runRenderLoop(() => {
            this.Ctrl.render();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);

        if (node.hasAttribute("Camera")) this.SetValue("CameraName", node.attributes["Camera"].value);
        if (node.hasAttribute("Light")) this.SetValue("LightName", node.attributes["Light"].value);
        if (node.hasAttribute("Ground")) this.SetValue("GroundName", node.attributes["Ground"].value);
        if (node.hasAttribute("ClearColor")) this.SetValue("ClearColor", this.cleanBabylonColor3Attribute(node.attributes["ClearColor"].value));
    }

    private cleanBabylonColor3Attribute(color3: string): any {
        return (color3.includes("Color3.")) ? eval(`BABYLON.${color3};`) : eval(`new BABYLON.${color3};`);
    }

    private convertColor3ToColor4(color: BABYLON.Color3): BABYLON.Color4 {
        return new BABYLON.Color4(color.r, color.g, color.b, 1);
    }

}
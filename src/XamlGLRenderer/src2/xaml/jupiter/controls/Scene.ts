import { UIElement } from "../UIElement";
import { Camera, Light } from "./Core";
import { FrameworkElement } from "../FrameworkElement";

export class Scene extends UIElement {
    private _camera: Camera;
    private _light: Light;

    private _scene: BABYLON.Scene;
    private _cameraName: string;
    private _lightName: string;

    get Scene(): BABYLON.Scene { return this._scene; }
    get CameraName(): string { return this._cameraName; }
    get LightName(): string { return this._lightName; }

    constructor() {
        super();
    }

    public Initialize(engine: BABYLON.Engine, canvas: any, camera: UIElement, light: UIElement): void {
        this._scene = new BABYLON.Scene(engine);
        this._camera = camera as Camera;
        this._light = light as Light;

        engine.runRenderLoop(() => {
            this._scene.render();
        });
    }

    public LoadFromNode(node: any): void {
        try { this._cameraName = node.attributes["Camera"].value; } catch(e) { }
        try { this._lightName = node.attributes["Light"].value; } catch (e) { }
    }
}
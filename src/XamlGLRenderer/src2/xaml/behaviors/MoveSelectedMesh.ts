import { Scene, Camera, Ground } from "../jupiter/controls/Core";
import { DIContainer } from "../Core";
import { VisualTree } from "../../services/VisualTree";

export class MoveSelectedMesh {
    private scene: Scene;
    private ground: Ground;
    private camera: Camera;
    private canvas: any;
    private startingPoint: any;
    private currentMesh: BABYLON.AbstractMesh;

    constructor() {

    }

    public Install(scene: Scene, canvas: any, groundName: string, cameraName: string): void {
        let vt: VisualTree = DIContainer.get(VisualTree);
        this.canvas = canvas;
        this.ground = vt.Get(groundName) as Ground;
        this.camera = vt.Get(cameraName) as Camera;
        this.scene = scene;

        canvas.addEventListener("pointerdown", (evt) => { this.onPointerDown(evt); }, false);
        canvas.addEventListener("pointerup", () => { this.onPointerUp(); }, false);
        canvas.addEventListener("pointermove", (evt) => { this.onPointerMove(evt); }, false);

        scene.Scene.onDispose = function () {
            canvas.removeEventListener("pointerdown", this.onPointerDown);
            canvas.removeEventListener("pointerup", this.onPointerUp);
            canvas.removeEventListener("pointermove", this.onPointerMove);
        }
    }

    private getGroundPosition(): BABYLON.Vector3 {
        // Use a predicate to get position on the ground
        var pickinfo = this.scene.Scene.pick(this.scene.Scene.pointerX, this.scene.Scene.pointerY,
            (mesh) => { return mesh == this.ground.Mesh; });
        if (pickinfo.hit) return pickinfo.pickedPoint;

        return null;
    }

    private onPointerDown(evt: any): void {
        if (evt.button !== 0) return;

        // check if we are under a mesh
        var pickInfo = this.scene.Scene.pick(this.scene.Scene.pointerX, this.scene.Scene.pointerY,
            (mesh) => { return mesh !== this.ground.Mesh; });
        if (pickInfo.hit) {
            this.currentMesh = pickInfo.pickedMesh;
            this.startingPoint = this.getGroundPosition();

            if (this.startingPoint) { // we need to disconnect camera from canvas
                setTimeout(() => {
                    this.camera.Camera.detachControl(this.canvas);
                }, 0);
            }
        }
    }

    private onPointerUp(): void {
        if (this.startingPoint) {
            this.camera.Camera.attachControl(this.canvas, true);
            this.startingPoint = null;
            return;
        }
    }

    private onPointerMove(evt: any): void {
        if (!this.startingPoint) return;
        
        var current = this.getGroundPosition();

        if (!current) return;
        
        var diff = current.subtract(this.startingPoint);
        this.currentMesh.position.addInPlace(diff);

        this.startingPoint = current;
    }
}

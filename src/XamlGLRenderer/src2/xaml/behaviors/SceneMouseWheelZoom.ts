import { Scene } from "../jupiter/controls/Core";

export class SceneMouseWheelZoom {

    constructor() {

    }

    public static Install(scene: Scene): void {
        //Wire up Mouse wheel 
        scene.Scene.onPrePointerObservable.add((pointerInfo: any, eventState: any) => {
            // console.log(pointerInfo);
            var event = pointerInfo.event;
            var delta = 0;

            if (event.wheelDelta) delta = event.wheelDelta;
            else if (event.detail) delta = -event.detail;

            if (delta) {
                // console.log(delta);
                var dir = scene.Scene.activeCamera.getDirection(BABYLON.Axis.Z);
                // console.log("dir: ", dir);
                if (delta > 0) scene.Scene.activeCamera.position.addInPlace(dir);
                else scene.Scene.activeCamera.position.subtractInPlace(dir);
            }
        }, BABYLON.PointerEventTypes.POINTERWHEEL, false);
    }
}

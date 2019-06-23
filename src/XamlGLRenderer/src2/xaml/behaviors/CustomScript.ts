import { Scene, Light, Sphere } from "../jupiter/controls/Core";
import { UIElement } from "../jupiter/Core";
import { VisualTree } from "../Core";
import { PointLight } from "babylonjs";

export class CustomScript {

    constructor() {

    }

    public static Install(vt: VisualTree, code: string): void {
        //https://stackoverflow.com/questions/13906161/javascript-pass-eval-variables
        ////eval(vt.ParseScript(code));
        eval(code);
    }

}

import { VisualTree } from "../Core";
import { Container } from "inversify";

export class CustomScript {

    constructor() {

    }

    //important : any param injected here wil be available as is in the eval'd script code
    public static Install(vt: VisualTree, di: Container, code: string): void {
        //https://stackoverflow.com/questions/13906161/javascript-pass-eval-variables
        ////eval(vt.ParseScript(code));
        eval(code);
    }

    public static InstallRet(vt: VisualTree, di: Container, code: string): any {
        return eval(code);
    }
}

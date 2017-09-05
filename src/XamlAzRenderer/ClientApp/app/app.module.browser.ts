import * as clamp from 'clamp';
import * as mat4 from 'gl-mat4';
import * as createTexture from 'gl-texture2d';
import { AppModuleShared } from './app.module.shared';

export class AppModule {

    public TestClamp(): Number {
        var t = clamp(0.65, 0, 1.0);
        return t;
    }

    public TestMat4(): void {
        let projection = mat4.create();
        let canvasWidth: number = 400;
        let canvasHeight: number = 400;
        mat4.ortho(projection, 0, canvasWidth, canvasHeight, 0, -1.0, 1.0)
    }

    public TestCreateTexture(): void {
        let ct = createTexture(null, null);
    }

    constructor() {
        console.log(this.TestClamp());
        this.TestMat4();
        this.TestCreateTexture();
    }
}
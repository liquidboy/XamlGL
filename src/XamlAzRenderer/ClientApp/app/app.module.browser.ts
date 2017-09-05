import * as clamp  from 'clamp';
import { AppModuleShared } from './app.module.shared';

export class AppModule {

    public Test(): Number {
        var t = clamp(0.65, 0, 1.0);
        return t;
    }

    constructor() {
        console.log(this.Test());
    }
}
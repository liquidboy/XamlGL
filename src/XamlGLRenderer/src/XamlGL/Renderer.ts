/// <reference path="../../typings/globals/pixi.js/index.d.ts" />
/// <reference path="../../typings/globals/jquery/index.d.ts" />
/// <reference path="../../typings/globals/rivets/index.d.ts" />

export class Renderer {

    constructor() {

    }

    public Test(): void {
        console.log(PIXI.VERSION);
        rivets.bind($("#test"), { model: PIXI });
    }
}

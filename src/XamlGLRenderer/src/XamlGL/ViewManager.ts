/// <reference path="../../typings/globals/pixi.js/index.d.ts" />
/// <reference path="../../typings/globals/jquery/index.d.ts" />
/// <reference path="../../typings/globals/rivets/index.d.ts" />

export class ViewManager {

    constructor() {

    }

    public static RenderView(view: string, model: any): void {
        console.log(PIXI);

        $.get("/views/" + view).done((data) => {
            $("#content").html(data);
            rivets.bind($(".pixi-test"), { model: model });
        });
        
    }
}

/// <reference path="../../typings/globals/rivets/index.d.ts" />

import * as XamlGLCore from './../XamlGL/Core';

export class XamlApp {
    
    constructor(element: HTMLElement) {
    
    }

    Start() {
        this.Configure();
    
        var url = document.body.getAttribute("xamlgl-app");

        if (!url) {
            console.warn("No application specified.");
            return;
        }

        let xm = new XamlGLCore.Renderer();
        xm.Start();
        
    }

    Stop() {
        
    }

    Configure() {

        rivets.configure({
            prefix: 'rv',
            preloadData: true,
            rootInterface: '.',
            templateDelimiters: ['{', '}'],
            handler: function (target, event, binding) {
                this.call(target, event, binding.view.models)
            }
        });
    }
    
}

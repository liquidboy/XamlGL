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

        let renderer = new XamlGLCore.Renderer();
        renderer.Start();

        let xm = XamlGLCore.XamlReader.LoadUri("/xaml/rectangle-shape.xap", (el) => { console.log(xm.rootElement); });

    }

    Stop() {
        
    }

    Configure() {
        XamlGLCore.ViewManager.Configure("content");

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

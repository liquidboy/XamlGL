System.register("XamlGL/Renderer", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Renderer;
    return {
        setters:[],
        execute: function() {
            Renderer = class Renderer {
                constructor() {
                }
                Test() {
                    console.log(PIXI);
                    rivets.bind($("#test"), { model: PIXI });
                }
            };
            exports_1("Renderer", Renderer);
        }
    }
});
System.register("XamlGL/Core", ["XamlGL/Renderer"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_2(exports);
    }
    return {
        setters:[
            function (Renderer_1_1) {
                exportStar_1(Renderer_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("Bootstrap/XamlApp", ["XamlGL/Core"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var XamlGLCore;
    var XamlApp;
    return {
        setters:[
            function (XamlGLCore_1) {
                XamlGLCore = XamlGLCore_1;
            }],
        execute: function() {
            XamlApp = class XamlApp {
                constructor(element) {
                    this.element = element;
                    this.element.innerHTML += "The time is: ";
                    this.span = document.createElement('span');
                    this.element.appendChild(this.span);
                    this.span.innerText = new Date().toUTCString();
                }
                Start() {
                    this.Configure();
                    this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
                    var url = document.body.getAttribute("xamlgl-app");
                    if (!url) {
                        console.warn("No application specified.");
                        return;
                    }
                    let xm = new XamlGLCore.Renderer();
                    xm.Test();
                }
                Stop() {
                    clearTimeout(this.timerToken);
                }
                Configure() {
                    rivets.configure({
                        prefix: 'rv',
                        preloadData: true,
                        rootInterface: '.',
                        templateDelimiters: ['{', '}'],
                        handler: function (target, event, binding) {
                            this.call(target, event, binding.view.models);
                        }
                    });
                }
            };
            exports_3("XamlApp", XamlApp);
        }
    }
});
//# sourceMappingURL=allsrc.js.map
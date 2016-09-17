System.register("XamlGL/ViewManager", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ViewManager;
    return {
        setters:[],
        execute: function() {
            ViewManager = class ViewManager {
                constructor() {
                }
                static RenderView(view, model) {
                    console.log(PIXI);
                    $.get(`/views/${view}.html`).done((data) => {
                        $("#content").html(data);
                        rivets.bind($(`.${view}`), { model: model });
                    });
                }
            };
            exports_1("ViewManager", ViewManager);
        }
    }
});
System.register("XamlGL/Renderer", ["XamlGL/ViewManager"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var ViewManager_1;
    var Renderer;
    return {
        setters:[
            function (ViewManager_1_1) {
                ViewManager_1 = ViewManager_1_1;
            }],
        execute: function() {
            Renderer = class Renderer {
                constructor() {
                }
                Start() {
                    console.log(PIXI);
                    ViewManager_1.ViewManager.RenderView("pixi-home", PIXI);
                }
            };
            exports_2("Renderer", Renderer);
        }
    }
});
System.register("XamlGL/Core", ["XamlGL/Renderer", "XamlGL/ViewManager"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_3(exports);
    }
    return {
        setters:[
            function (Renderer_1_1) {
                exportStar_1(Renderer_1_1);
            },
            function (ViewManager_2_1) {
                exportStar_1(ViewManager_2_1);
            }],
        execute: function() {
        }
    }
});
System.register("Bootstrap/XamlApp", ["XamlGL/Core"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
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
                            this.call(target, event, binding.view.models);
                        }
                    });
                }
            };
            exports_4("XamlApp", XamlApp);
        }
    }
});
//# sourceMappingURL=allsrc.js.map
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
                static Configure(contentId) {
                    this.ContentElementId = contentId;
                    this._isReady = true;
                }
                static RenderView(view, model, done) {
                    if (!this._isReady) {
                        console.warn("ViewManager: you tried to render a view BUT the ViewManager was not ready!");
                        return;
                    }
                    let jqContent = $(`#${this.ContentElementId}`);
                    $.get(`/views/${view}.html`).done((data) => {
                        jqContent.html(data);
                        rivets.bind($(`.${view}`), { model: model });
                        if (done)
                            done.call(this, jqContent);
                    });
                }
            };
            ViewManager._isReady = false;
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
                    ViewManager_1.ViewManager.RenderView("pixi-home", PIXI, (jqView) => {
                        this.InitPixi(jqView.find(".pixi-canvas"));
                    });
                }
                InitPixi(pixiHostElement) {
                    this._stage = new PIXI.Container();
                    this._renderer = PIXI.autoDetectRenderer(512, 512, {
                        antialias: false,
                        transparent: false,
                        resolution: 1
                    });
                    this._renderer.view.style.border = "1px solid lightgray";
                    this._renderer.backgroundColor = 0xf9f9f9;
                    pixiHostElement.append(this._renderer.view);
                    PIXI.loader
                        .add("assets/silverlight_anims.jpg")
                        .load(this.LoadingAnimation.bind(this))
                        .load(this.LoadAppDomain);
                }
                Resize(w, h) {
                    this._renderer.autoResize = true;
                    this._renderer.resize(w, h);
                }
                LoadingAnimation() {
                    let rect = new PIXI.Rectangle(0, 0, 165, 165);
                    let texture = PIXI.loader.resources["assets/silverlight_anims.jpg"].texture;
                    texture.frame = rect;
                    let blueDots = new PIXI.Sprite(texture);
                    blueDots.x = 170;
                    blueDots.y = 170;
                    this._stage.addChild(blueDots);
                    this._renderer.render(this._stage);
                }
                LoadAppDomain() { }
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
                    XamlGLCore.ViewManager.Configure("content");
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
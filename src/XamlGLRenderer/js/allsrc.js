System.register("XamlGL/Renderer", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Renderer, RendererFactory;
    return {
        setters:[],
        execute: function() {
            Renderer = class Renderer {
                constructor(width, height, antialias, transparent) {
                    this._stage = new PIXI.Container();
                    this._renderer = RendererFactory.GetRenderer(width, height, antialias, transparent);
                }
                get PixiStage() { return this._stage; }
                get PixiRenderer() { return this._renderer; }
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
                LoadAppDomain() {
                }
            };
            exports_1("Renderer", Renderer);
            RendererFactory = class RendererFactory {
                static GetRenderer(width, height, antialias, transparent) {
                    this._renderer = PIXI.autoDetectRenderer(width, height, {
                        antialias: antialias,
                        transparent: transparent,
                        resolution: 1
                    });
                    return this._renderer;
                }
            };
            exports_1("RendererFactory", RendererFactory);
        }
    }
});
System.register("XamlGL/VisualTree", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var VisualTree, VisualTreeNode;
    return {
        setters:[],
        execute: function() {
            VisualTree = class VisualTree {
                constructor() {
                }
            };
            exports_2("VisualTree", VisualTree);
            VisualTreeNode = class VisualTreeNode {
                constructor(Name) {
                    this.Name = Name;
                }
            };
        }
    }
});
System.register("XamlGL/Window", ["XamlGL/Renderer", "XamlGL/VisualTree"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Renderer_1, VisualTree_1;
    var Window;
    return {
        setters:[
            function (Renderer_1_1) {
                Renderer_1 = Renderer_1_1;
            },
            function (VisualTree_1_1) {
                VisualTree_1 = VisualTree_1_1;
            }],
        execute: function() {
            Window = class Window {
                constructor(width, height, antialias, transparent) {
                    this._renderer = new Renderer_1.Renderer(width, height, antialias, transparent);
                    this.InitializeShell();
                    this.InitializeVisualTree();
                }
                get Renderer() { return this._renderer; }
                InitializeShell() {
                    this._renderer.PixiRenderer.view.style.border = "1px solid lightgray";
                    this._renderer.PixiRenderer.backgroundColor = 0xf9f9f9;
                }
                InitializeVisualTree() {
                    this._visualTree = new VisualTree_1.VisualTree();
                }
                Resize(w, h) {
                    this._renderer.PixiRenderer.autoResize = true;
                    this._renderer.PixiRenderer.resize(w, h);
                }
                ResizeFullWindow() {
                    this._renderer.PixiRenderer.view.style.position = "absolute";
                    this._renderer.PixiRenderer.view.style.display = "block";
                    this._renderer.PixiRenderer.view.style.border = "0";
                    this._renderer.PixiRenderer.autoResize = true;
                    this._renderer.PixiRenderer.resize(window.innerWidth, window.innerHeight);
                }
                set IsLoading(value) {
                    if (value) {
                        PIXI.loader
                            .add("assets/silverlight_anims.jpg")
                            .load(this.Renderer.LoadingAnimation.bind(this.Renderer))
                            .load(this.Renderer.LoadAppDomain);
                    }
                }
            };
            exports_3("Window", Window);
        }
    }
});
System.register("XamlGL/ViewManager", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
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
            exports_4("ViewManager", ViewManager);
        }
    }
});
System.register("XamlGL/AppDomain", ["XamlGL/Window", "XamlGL/ViewManager"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Window_1, ViewManager_1;
    var AppDomain;
    return {
        setters:[
            function (Window_1_1) {
                Window_1 = Window_1_1;
            },
            function (ViewManager_1_1) {
                ViewManager_1 = ViewManager_1_1;
            }],
        execute: function() {
            AppDomain = class AppDomain {
                Start() {
                    console.log(PIXI);
                    ViewManager_1.ViewManager.RenderView("pixi-home", PIXI, (jqView) => {
                        this.InitPixi(jqView.find(".pixi-canvas"));
                    });
                }
                InitPixi(pixiHostElement) {
                    this._window = new Window_1.Window(512, 512, false, false);
                    pixiHostElement.append(this._window.Renderer.PixiRenderer.view);
                    this._window.IsLoading = true;
                }
            };
            exports_5("AppDomain", AppDomain);
        }
    }
});
System.register("XamlGL/Reader/XamlMarkup", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var parser, XamlMarkup;
    return {
        setters:[],
        execute: function() {
            parser = new DOMParser();
            XamlMarkup = class XamlMarkup {
                constructor() {
                }
                LoadRootViaUri(uri, done) {
                    $.get(uri).done((data) => {
                        if (done)
                            done.call(this, data);
                    });
                }
                LoadRoot(data, done) {
                    var doc = parser.parseFromString(data, "text/xml");
                    if (done) {
                        this.rootElement = doc.documentElement;
                        done.call(this, doc.documentElement);
                    }
                }
            };
            exports_6("XamlMarkup", XamlMarkup);
        }
    }
});
System.register("XamlGL/Reader/XamlReader", ["XamlGL/Reader/XamlMarkup"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var XamlMarkup_1;
    var XamlReader;
    return {
        setters:[
            function (XamlMarkup_1_1) {
                XamlMarkup_1 = XamlMarkup_1_1;
            }],
        execute: function() {
            XamlReader = class XamlReader {
                static LoadUri(uri, done) {
                    if (!this._xm)
                        this._xm = new XamlMarkup_1.XamlMarkup();
                    this._xm.LoadRootViaUri(uri, (data) => {
                        if (done) {
                            this._xm.LoadRoot(data, (xamlDom) => { if (done)
                                done.call(this); });
                        }
                    });
                    return this._xm;
                }
            };
            exports_7("XamlReader", XamlReader);
        }
    }
});
System.register("XamlGL/Reader/XamlParser", [], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var XamlParser;
    return {
        setters:[],
        execute: function() {
            XamlParser = class XamlParser {
                constructor() {
                }
            };
            exports_8("XamlParser", XamlParser);
        }
    }
});
System.register("XamlGL/Core", ["XamlGL/AppDomain", "XamlGL/VisualTree", "XamlGL/Window", "XamlGL/Renderer", "XamlGL/ViewManager", "XamlGL/Reader/XamlReader", "XamlGL/Reader/XamlParser", "XamlGL/Reader/XamlMarkup"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_9(exports);
    }
    return {
        setters:[
            function (AppDomain_1_1) {
                exportStar_1(AppDomain_1_1);
            },
            function (VisualTree_2_1) {
                exportStar_1(VisualTree_2_1);
            },
            function (Window_2_1) {
                exportStar_1(Window_2_1);
            },
            function (Renderer_2_1) {
                exportStar_1(Renderer_2_1);
            },
            function (ViewManager_2_1) {
                exportStar_1(ViewManager_2_1);
            },
            function (XamlReader_1_1) {
                exportStar_1(XamlReader_1_1);
            },
            function (XamlParser_1_1) {
                exportStar_1(XamlParser_1_1);
            },
            function (XamlMarkup_2_1) {
                exportStar_1(XamlMarkup_2_1);
            }],
        execute: function() {
        }
    }
});
System.register("XamlGL/Controls/LoadingBalls", [], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var LoadingBalls;
    return {
        setters:[],
        execute: function() {
            LoadingBalls = class LoadingBalls {
                constructor() {
                }
            };
            exports_10("LoadingBalls", LoadingBalls);
        }
    }
});
System.register("Bootstrap/XamlApp", ["XamlGL/Core"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var XamlGLCore;
    var XamlApp;
    return {
        setters:[
            function (XamlGLCore_1) {
                XamlGLCore = XamlGLCore_1;
            }],
        execute: function() {
            XamlApp = class XamlApp {
                Start() {
                    this.Configure();
                    let url = document.body.getAttribute("xamlgl-app");
                    if (!url) {
                        console.warn("No application specified.");
                        return;
                    }
                    let app = new XamlGLCore.AppDomain();
                    app.Start();
                    let xm = XamlGLCore.XamlReader.LoadUri("/xaml/rectangle-shape.xap", (el) => { console.log(xm.rootElement); });
                }
                Configure() {
                    XamlGLCore.ViewManager.Configure("content");
                    rivets.configure({
                        prefix: "rv",
                        preloadData: true,
                        rootInterface: ".",
                        templateDelimiters: ["{", "}"],
                        handler: function (target, event, binding) {
                            this.call(target, event, binding.view.models);
                        }
                    });
                }
            };
            exports_11("XamlApp", XamlApp);
        }
    }
});
//# sourceMappingURL=allsrc.js.map
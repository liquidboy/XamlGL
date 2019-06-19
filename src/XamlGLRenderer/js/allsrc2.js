System.register("Xaml/Reader/XamlMarkup", [], function (exports_1, context_1) {
    "use strict";
    var parser, XamlMarkup;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
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
            exports_1("XamlMarkup", XamlMarkup);
        }
    };
});
System.register("Xaml/App", [], function (exports_2, context_2) {
    "use strict";
    var App;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            App = class App {
                constructor() {
                }
                Start(xaml, canvasElement) {
                    this.xamlMarkup = xaml;
                    this.canvas = document.getElementById(canvasElement);
                    this.engine = new BABYLON.Engine(this.canvas, true);
                    window.addEventListener("resize", () => {
                        this.engine.resize();
                    });
                    this.CreateScene();
                    this.Run();
                }
                CreateScene() {
                    this.scene = new BABYLON.Scene(this.engine);
                    this.camera = new BABYLON.FreeCamera('freeCamera', new BABYLON.Vector3(0, 5, -10), this.scene);
                    this.camera.setTarget(BABYLON.Vector3.Zero());
                    this.camera.attachControl(this.canvas, true);
                    this.light = new BABYLON.HemisphericLight('skyLight', new BABYLON.Vector3(0, 1, 0), this.scene);
                    let sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, this.scene);
                    sphere.position.y = 1;
                    sphere.material = new BABYLON.StandardMaterial("material", this.scene);
                    sphere.material.wireframe = true;
                    this.ShowNormals(sphere, 0.25, new BABYLON.Color3(1, 0, 0), this.scene);
                    let ground = BABYLON.MeshBuilder.CreateGround('groundPlane', { width: 6, height: 6, subdivisions: 2 }, this.scene);
                    this.scene.onPrePointerObservable.add((pointerInfo, eventState) => {
                        var event = pointerInfo.event;
                        var delta = 0;
                        if (event.wheelDelta) {
                            delta = event.wheelDelta;
                        }
                        else if (event.detail) {
                            delta = -event.detail;
                        }
                        if (delta) {
                            console.log(delta);
                            var dir = this.scene.activeCamera.getDirection(BABYLON.Axis.Z);
                            if (delta > 0)
                                this.scene.activeCamera.position.addInPlace(dir);
                            else
                                this.scene.activeCamera.position.subtractInPlace(dir);
                        }
                    }, BABYLON.PointerEventTypes.POINTERWHEEL, false);
                }
                Run() {
                    this.engine.runRenderLoop(() => {
                        this.scene.render();
                    });
                }
                ShowNormals(mesh, size, color, sc) {
                    var normals = mesh.getVerticesData(BABYLON.VertexBuffer.NormalKind);
                    var positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
                    color = color || BABYLON.Color3.White();
                    size = size || 1;
                    var lines = [];
                    for (var i = 0; i < normals.length; i += 3) {
                        var v1 = BABYLON.Vector3.FromArray(positions, i);
                        var v2 = v1.add(BABYLON.Vector3.FromArray(normals, i).scaleInPlace(size));
                        lines.push([v1.add(mesh.position), v2.add(mesh.position)]);
                    }
                    var normalLines = BABYLON.MeshBuilder.CreateLineSystem("normalLines", { lines: lines }, sc);
                    normalLines.color = color;
                    return normalLines;
                }
            };
            exports_2("App", App);
        }
    };
});
System.register("Xaml/Reader/XamlReader", ["Xaml/Reader/XamlMarkup"], function (exports_3, context_3) {
    "use strict";
    var XamlMarkup_1, XamlReader;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (XamlMarkup_1_1) {
                XamlMarkup_1 = XamlMarkup_1_1;
            }
        ],
        execute: function () {
            XamlReader = class XamlReader {
                static LoadUri(uri, done) {
                    if (!this._xm) {
                        this._xm = new XamlMarkup_1.XamlMarkup();
                    }
                    this._xm.LoadRootViaUri(uri, (data) => {
                        if (done) {
                            this._xm.LoadRoot(data, (xamlDom) => {
                                if (done) {
                                    done.call(this);
                                }
                            });
                        }
                    });
                    return this._xm;
                }
            };
            exports_3("XamlReader", XamlReader);
        }
    };
});
System.register("Xaml/Core", ["Xaml/App", "Xaml/Reader/XamlReader", "Xaml/Reader/XamlMarkup"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_4(exports);
    }
    return {
        setters: [
            function (App_1_1) {
                exportStar_1(App_1_1);
            },
            function (XamlReader_1_1) {
                exportStar_1(XamlReader_1_1);
            },
            function (XamlMarkup_2_1) {
                exportStar_1(XamlMarkup_2_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("bootstrap/XamlApp", ["Xaml/Core"], function (exports_5, context_5) {
    "use strict";
    var XamlGLCore, XamlApp;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (XamlGLCore_1) {
                XamlGLCore = XamlGLCore_1;
            }
        ],
        execute: function () {
            XamlApp = class XamlApp {
                Start(canvasElement) {
                    this.Configure();
                    let xaml = this.parseQueryString(location.search).xaml;
                    if (!xaml) {
                        console.warn("No application specified.");
                        return;
                    }
                    let xm = XamlGLCore.XamlReader.LoadUri(`/xaml/${xaml}`, (el) => {
                        console.log(xm.rootElement);
                        let app = new XamlGLCore.App();
                        app.Start(xm, canvasElement);
                    });
                }
                Configure() {
                }
                parseQueryString(url) {
                    var urlParams = {};
                    url.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function ($0, $1, $2, $3) {
                        return urlParams[$1] = $3;
                    });
                    return urlParams;
                }
            };
            exports_5("XamlApp", XamlApp);
        }
    };
});
//# sourceMappingURL=allsrc2.js.map
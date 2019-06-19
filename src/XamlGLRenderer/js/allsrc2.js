System.register("XamlApp", [], function (exports_1, context_1) {
    "use strict";
    var XamlApp;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            XamlApp = class XamlApp {
                Start() {
                    console.warn("XamlApp.Start");
                }
            };
            exports_1("XamlApp", XamlApp);
        }
    };
});
//# sourceMappingURL=allsrc2.js.map
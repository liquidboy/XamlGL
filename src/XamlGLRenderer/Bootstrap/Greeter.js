(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './../XamlGL/src/Core'], factory);
    }
})(function (require, exports) {
    "use strict";
    const XamlGLCore = require('./../XamlGL/src/Core');
    class Greeter {
        constructor(element) {
            alert(222);
            this.element = element;
            this.element.innerHTML += "The time is: ";
            this.span = document.createElement('span');
            this.element.appendChild(this.span);
            this.span.innerText = new Date().toUTCString();
        }
        start() {
            this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
            this.bootstrap();
        }
        stop() {
            clearTimeout(this.timerToken);
        }
        bootstrap() {
            var url = document.body.getAttribute("xamlgl-app");
            if (!url) {
                console.warn("No application specified.");
                return;
            }
            let xm = new XamlGLCore.Renderer();
            xm.Test();
        }
    }
    exports.Greeter = Greeter;
});
//# sourceMappingURL=Greeter.js.map
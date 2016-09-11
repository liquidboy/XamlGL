
(function (global: any) {
    if (global.Promise && typeof global.Promise.prototype.tap !== "function") {
        global.Promise.prototype.tap = XamlGL.PromiseImpl.prototype.tap;
    }
})(this);
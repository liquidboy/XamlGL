var XamlGLApp = (function () {
    function XamlGLApp(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    XamlGLApp.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    XamlGLApp.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return XamlGLApp;
}());
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new XamlGLApp(el);
    greeter.start();
};
//# sourceMappingURL=app.js.map
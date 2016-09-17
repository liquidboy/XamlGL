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
                    alert("Test");
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
            };
            exports_3("XamlApp", XamlApp);
        }
    }
});
class Expression {
    constructor(nodeType) {
        this.nodeType = nodeType;
    }
    Accept(visitor) {
        throw new Error("not implemented");
    }
    static Constant(value) {
        return new ConstantExpression(value);
    }
    static Parameter(name) {
        return new ParameterExpression(name);
    }
    static Condition(test, ifTrue, ifFalse) {
        return new ConditionalExpression(test, ifTrue, ifFalse);
    }
    static Add(left, right) {
        return new BinaryExpression(ExpressionType.Add, left, right);
    }
    static Subtract(left, right) {
        return new BinaryExpression(ExpressionType.Subtract, left, right);
    }
    static Multiply(left, right) {
        return new BinaryExpression(ExpressionType.Multiply, left, right);
    }
    static Divide(left, right) {
        return new BinaryExpression(ExpressionType.Divide, left, right);
    }
    static Modulo(left, right) {
        return new BinaryExpression(ExpressionType.Modulo, left, right);
    }
    static And(left, right) {
        return new BinaryExpression(ExpressionType.And, left, right);
    }
    static AndAlso(left, right) {
        return new BinaryExpression(ExpressionType.AndAlso, left, right);
    }
    static Or(left, right) {
        return new BinaryExpression(ExpressionType.Or, left, right);
    }
    static OrElse(left, right) {
        return new BinaryExpression(ExpressionType.OrElse, left, right);
    }
    static ExclusiveOr(left, right) {
        return new BinaryExpression(ExpressionType.ExclusiveOr, left, right);
    }
    static Equal(left, right) {
        return new BinaryExpression(ExpressionType.Equal, left, right);
    }
    static NotEqual(left, right) {
        return new BinaryExpression(ExpressionType.NotEqual, left, right);
    }
    static LessThan(left, right) {
        return new BinaryExpression(ExpressionType.LessThan, left, right);
    }
    static LessThanOrEqual(left, right) {
        return new BinaryExpression(ExpressionType.LessThanOrEqual, left, right);
    }
    static GreaterThan(left, right) {
        return new BinaryExpression(ExpressionType.GreaterThan, left, right);
    }
    static GreaterThanOrEqual(left, right) {
        return new BinaryExpression(ExpressionType.GreaterThanOrEqual, left, right);
    }
    static LeftShift(left, right) {
        return new BinaryExpression(ExpressionType.LeftShift, left, right);
    }
    static RightShift(left, right) {
        return new BinaryExpression(ExpressionType.RightShift, left, right);
    }
    static Not(operand) {
        return new UnaryExpression(ExpressionType.Not, operand);
    }
    static UnaryPlus(operand) {
        return new UnaryExpression(ExpressionType.UnaryPlus, operand);
    }
    static Negate(operand) {
        return new UnaryExpression(ExpressionType.Negate, operand);
    }
    static OnesComplement(operand) {
        return new UnaryExpression(ExpressionType.OnesComplement, operand);
    }
    static Lambda(body, ...parameters) {
        return new LambdaExpression(body, parameters);
    }
    static Invoke(expression, ...args) {
        return new InvocationExpression(expression, args);
    }
    static New(typeName, ...args) {
        return new NewExpression(typeName, args);
    }
    static Call(obj, methodName, ...args) {
        return new CallExpression(obj, methodName, args);
    }
    static Member(obj, memberName) {
        return new MemberExpression(obj, memberName);
    }
    static Index(obj, ...args) {
        return new IndexExpression(obj, args);
    }
}
class ExpressionVisitor {
    Visit(node) {
        if (node === null) {
            return null;
        }
        return node.Accept(this);
    }
    VisitConstant(node) {
        return node;
    }
    VisitParameter(node) {
        return node;
    }
    VisitBinary(node) {
        return node.Update(this.Visit(node.left), this.Visit(node.right));
    }
    VisitUnary(node) {
        return node.Update(this.Visit(node.operand));
    }
    VisitConditional(node) {
        return node.Update(this.Visit(node.test), this.Visit(node.ifTrue), this.Visit(node.ifFalse));
    }
    VisitLambda(node) {
        return node.Update(this.Visit(node.body), this.VisitMany(node.parameters));
    }
    VisitInvoke(node) {
        return node.Update(this.Visit(node.expression), this.VisitMany(node.args));
    }
    VisitCall(node) {
        return node.Update(this.Visit(node.obj), this.VisitMany(node.args));
    }
    VisitNew(node) {
        return node.Update(this.VisitMany(node.args));
    }
    VisitMember(node) {
        return node.Update(this.Visit(node.obj));
    }
    VisitIndex(node) {
        return node.Update(this.Visit(node.obj), this.VisitMany(node.args));
    }
    VisitMany(nodes) {
        var res = new Array(nodes.length);
        for (var i = 0; i < nodes.length; i++) {
            var oldNode = nodes[i];
            var newNode = this.Visit(oldNode);
            res[i] = newNode;
        }
        return res;
    }
}
class ConstantExpression extends Expression {
    constructor(value) {
        super(ExpressionType.Constant);
        this._value = value;
    }
    get value() {
        return this._value;
    }
    Accept(visitor) {
        return visitor.VisitConstant(this);
    }
}
class ParameterExpression extends Expression {
    constructor(name) {
        super(ExpressionType.Parameter);
        this._name = name;
    }
    get name() {
        return this._name;
    }
    Accept(visitor) {
        return visitor.VisitParameter(this);
    }
}
class UnaryExpression extends Expression {
    constructor(nodeType, operand) {
        super(nodeType);
        this._operand = operand;
    }
    get operand() {
        return this._operand;
    }
    Accept(visitor) {
        return visitor.VisitUnary(this);
    }
    Update(operand) {
        if (operand !== this._operand) {
            return new UnaryExpression(this.nodeType, operand);
        }
        return this;
    }
}
class BinaryExpression extends Expression {
    constructor(nodeType, left, right) {
        super(nodeType);
        this._left = left;
        this._right = right;
    }
    get left() {
        return this._left;
    }
    get right() {
        return this._right;
    }
    Accept(visitor) {
        return visitor.VisitBinary(this);
    }
    Update(left, right) {
        if (left !== this._left || right !== this._right) {
            return new BinaryExpression(this.nodeType, left, right);
        }
        return this;
    }
}
class ConditionalExpression extends Expression {
    constructor(test, ifTrue, ifFalse) {
        super(ExpressionType.Condition);
        this._test = test;
        this._ifTrue = ifTrue;
        this._ifFalse = ifFalse;
    }
    get test() {
        return this._test;
    }
    get ifTrue() {
        return this._ifTrue;
    }
    get ifFalse() {
        return this._ifTrue;
    }
    Accept(visitor) {
        return visitor.VisitConditional(this);
    }
    Update(test, ifTrue, ifFalse) {
        if (test !== this._test || ifTrue !== this._ifTrue || ifFalse !== this._ifFalse) {
            return new ConditionalExpression(test, ifTrue, ifFalse);
        }
        return this;
    }
}
class LambdaExpression extends Expression {
    constructor(body, parameters) {
        super(ExpressionType.Lambda);
        this._body = body;
        this._parameters = parameters;
    }
    get body() {
        return this._body;
    }
    get parameters() {
        return this._parameters;
    }
    Accept(visitor) {
        return visitor.VisitLambda(this);
    }
    Update(body, parameters) {
        if (body !== this._body || parameters !== this._parameters) {
            return new LambdaExpression(body, parameters);
        }
        return this;
    }
    Compile() {
        var comp = new LambdaCompiler();
        comp.Visit(this);
        var code = comp.code;
        code = code.replace(/\"/g, "\\\""); // TODO: more escape sequences
        code = "new Function(\"return " + code + ";\")";
        code = code.replace(/\r?\n|\r/g, "");
        alert(code);
        return eval(code)();
    }
}
class InvocationExpression extends Expression {
    constructor(expression, args) {
        super(ExpressionType.Invoke);
        this._expression = expression;
        this._args = args;
    }
    get expression() {
        return this._expression;
    }
    get args() {
        return this._args;
    }
    Accept(visitor) {
        return visitor.VisitInvoke(this);
    }
    Update(expression, args) {
        if (expression !== this._expression || args !== this._args) {
            return new InvocationExpression(expression, args);
        }
        return this;
    }
}
class CallExpression extends Expression {
    constructor(expression, methodName, args) {
        super(ExpressionType.Call);
        this._expression = expression;
        this._method = methodName;
        this._args = args;
    }
    get obj() {
        return this._expression;
    }
    get method() {
        return this._method;
    }
    get args() {
        return this._args;
    }
    Accept(visitor) {
        return visitor.VisitCall(this);
    }
    Update(expression, args) {
        if (expression !== this._expression || args !== this._args) {
            return new CallExpression(expression, this._method, args);
        }
        return this;
    }
}
class IndexExpression extends Expression {
    constructor(expression, args) {
        super(ExpressionType.Index);
        this._expression = expression;
        this._args = args;
    }
    get obj() {
        return this._expression;
    }
    get args() {
        return this._args;
    }
    Accept(visitor) {
        return visitor.VisitIndex(this);
    }
    Update(expression, args) {
        if (expression !== this._expression || args !== this._args) {
            return new IndexExpression(expression, args);
        }
        return this;
    }
}
class NewExpression extends Expression {
    constructor(typeName, args) {
        super(ExpressionType.New);
        this._type = typeName;
        this._args = args;
    }
    get type() {
        return this._type;
    }
    get args() {
        return this._args;
    }
    Accept(visitor) {
        return visitor.VisitNew(this);
    }
    Update(args) {
        if (args !== this._args) {
            return new NewExpression(this._type, args);
        }
        return this;
    }
}
class MemberExpression extends Expression {
    constructor(obj, memberName) {
        super(ExpressionType.Member);
        this._obj = obj;
        this._member = memberName;
    }
    get obj() {
        return this._obj;
    }
    get member() {
        return this._member;
    }
    Accept(visitor) {
        return visitor.VisitMember(this);
    }
    Update(obj) {
        if (obj !== this._obj) {
            return new MemberExpression(obj, this._member);
        }
        return this;
    }
}
class LambdaCompiler extends ExpressionVisitor {
    constructor() {
        super();
        this._stack = new Array();
    }
    get code() {
        if (this._stack.length != 1)
            throw new Error("invalid code generation");
        return this._stack[0];
    }
    VisitConstant(node) {
        var value = "";
        if (typeof node.value == "string") {
            value = "\"" + node.value + "\""; // TODO: escape characters
        }
        else if (node.value instanceof Array) {
            value = JSON.stringify(node.value);
        }
        else if (node.value === undefined) {
            value = "undefined";
        }
        else {
            value = node.value.toString(); // TODO
        }
        this._stack.push(value);
        return node;
    }
    VisitUnary(node) {
        this.Visit(node.operand);
        var o = this._stack.pop();
        var i = "";
        switch (node.nodeType) {
            case ExpressionType.Negate:
                i = "-";
                break;
            case ExpressionType.UnaryPlus:
                i = "+";
                break;
            case ExpressionType.Not:
                i = "!";
                break;
            case ExpressionType.OnesComplement:
                i = "~";
                break;
        }
        var res = "(" + i + "" + o + ")";
        this._stack.push(res);
        return node;
    }
    VisitBinary(node) {
        this.Visit(node.left);
        this.Visit(node.right);
        var r = this._stack.pop();
        var l = this._stack.pop();
        var i = "";
        switch (node.nodeType) {
            case ExpressionType.Add:
                i = "+";
                break;
            case ExpressionType.Subtract:
                i = "-";
                break;
            case ExpressionType.Multiply:
                i = "*";
                break;
            case ExpressionType.Divide:
                i = "/";
                break;
            case ExpressionType.Modulo:
                i = "%";
                break;
            case ExpressionType.And:
                i = "&";
                break;
            case ExpressionType.Or:
                i = "|";
                break;
            case ExpressionType.AndAlso:
                i = "&&";
                break;
            case ExpressionType.OrElse:
                i = "||";
                break;
            case ExpressionType.ExclusiveOr:
                i = "^";
                break;
            case ExpressionType.Equal:
                i = "===";
                break;
            case ExpressionType.NotEqual:
                i = "!==";
                break;
            case ExpressionType.LessThan:
                i = "<";
                break;
            case ExpressionType.LessThanOrEqual:
                i = "<=";
                break;
            case ExpressionType.GreaterThan:
                i = ">";
                break;
            case ExpressionType.GreaterThanOrEqual:
                i = ">=";
                break;
            case ExpressionType.LeftShift:
                i = "<<";
                break;
            case ExpressionType.RightShift:
                i = ">>";
                break;
        }
        var res = "(" + l + " " + i + " " + r + ")";
        this._stack.push(res);
        return node;
    }
    VisitConditional(node) {
        this.Visit(node.test);
        this.Visit(node.ifTrue);
        this.Visit(node.ifFalse);
        var f = this._stack.pop();
        var t = this._stack.pop();
        var c = this._stack.pop();
        var res = "(" + c + " ? " + t + " : " + f + ")";
        this._stack.push(res);
        return node;
    }
    VisitParameter(node) {
        this._stack.push(node.name);
        return node;
    }
    VisitLambda(node) {
        this.VisitMany(node.parameters);
        this.Visit(node.body);
        var body = this._stack.pop();
        var n = node.parameters.length;
        var args = new Array(n);
        for (var i = 0; i < n; i++) {
            args[n - i - 1] = this._stack.pop();
        }
        var allArgs = args.join(", ");
        var res = "function(" + allArgs + ") { return " + body + "; }";
        this._stack.push(res);
        return node;
    }
    VisitInvoke(node) {
        this.Visit(node.expression);
        this.VisitMany(node.args);
        var n = node.args.length;
        var args = new Array(n);
        for (var i = 0; i < n; i++) {
            args[n - i - 1] = this._stack.pop();
        }
        var argList = args.join(", ");
        var func = this._stack.pop();
        var res = func + "(" + argList + ")";
        this._stack.push(res);
        return node;
    }
    VisitCall(node) {
        var res = "";
        if (node.obj !== null) {
            this.Visit(node.obj);
            res = this._stack.pop() + ".";
        }
        this.VisitMany(node.args);
        var n = node.args.length;
        var args = new Array(n);
        for (var i = 0; i < n; i++) {
            args[n - i - 1] = this._stack.pop();
        }
        var argList = args.join(", ");
        res += node.method + "(" + argList + ")";
        this._stack.push(res);
        return node;
    }
    VisitNew(node) {
        this.VisitMany(node.args);
        var n = node.args.length;
        var args = new Array(n);
        for (var i = 0; i < n; i++) {
            args[n - i - 1] = this._stack.pop();
        }
        var argList = args.join(", ");
        var res = "new " + node.type + "(" + argList + ")";
        this._stack.push(res);
        return node;
    }
    VisitMember(node) {
        var res = "";
        if (node.obj !== null) {
            this.Visit(node.obj);
            res = this._stack.pop() + ".";
        }
        res += node.member;
        this._stack.push(res);
        return node;
    }
    VisitIndex(node) {
        this.Visit(node.obj);
        var res = this._stack.pop();
        this.VisitMany(node.args);
        var n = node.args.length;
        var args = new Array(n);
        for (var i = 0; i < n; i++) {
            args[n - i - 1] = this._stack.pop();
        }
        var argList = args.join(", ");
        res += "[" + argList + "]";
        this._stack.push(res);
        return node;
    }
}
class FreeVariableScanner extends ExpressionVisitor {
    constructor() {
        super();
        this._stack = new Array();
        this._result = new Array();
    }
    get result() {
        return this._result;
    }
    VisitParameter(node) {
        var found = false;
        for (var i = this._stack.length - 1; i >= 0; i--) {
            if (this._stack[i].indexOf(node) >= 0) {
                found = true;
                break;
            }
        }
        if (!found) {
            this._result.push(node);
        }
        return node;
    }
    VisitLambda(node) {
        this._stack.push(node.parameters);
        this.Visit(node.body);
        this._stack.pop();
        return node;
    }
}
var ExpressionType;
(function (ExpressionType) {
    ExpressionType[ExpressionType["Constant"] = 0] = "Constant";
    ExpressionType[ExpressionType["Parameter"] = 1] = "Parameter";
    ExpressionType[ExpressionType["Lambda"] = 2] = "Lambda";
    ExpressionType[ExpressionType["Add"] = 3] = "Add";
    ExpressionType[ExpressionType["Subtract"] = 4] = "Subtract";
    ExpressionType[ExpressionType["Multiply"] = 5] = "Multiply";
    ExpressionType[ExpressionType["Divide"] = 6] = "Divide";
    ExpressionType[ExpressionType["Modulo"] = 7] = "Modulo";
    ExpressionType[ExpressionType["And"] = 8] = "And";
    ExpressionType[ExpressionType["Or"] = 9] = "Or";
    ExpressionType[ExpressionType["AndAlso"] = 10] = "AndAlso";
    ExpressionType[ExpressionType["OrElse"] = 11] = "OrElse";
    ExpressionType[ExpressionType["ExclusiveOr"] = 12] = "ExclusiveOr";
    ExpressionType[ExpressionType["Equal"] = 13] = "Equal";
    ExpressionType[ExpressionType["NotEqual"] = 14] = "NotEqual";
    ExpressionType[ExpressionType["LessThan"] = 15] = "LessThan";
    ExpressionType[ExpressionType["LessThanOrEqual"] = 16] = "LessThanOrEqual";
    ExpressionType[ExpressionType["GreaterThan"] = 17] = "GreaterThan";
    ExpressionType[ExpressionType["GreaterThanOrEqual"] = 18] = "GreaterThanOrEqual";
    ExpressionType[ExpressionType["LeftShift"] = 19] = "LeftShift";
    ExpressionType[ExpressionType["RightShift"] = 20] = "RightShift";
    ExpressionType[ExpressionType["Invoke"] = 21] = "Invoke";
    ExpressionType[ExpressionType["Not"] = 22] = "Not";
    ExpressionType[ExpressionType["Negate"] = 23] = "Negate";
    ExpressionType[ExpressionType["UnaryPlus"] = 24] = "UnaryPlus";
    ExpressionType[ExpressionType["OnesComplement"] = 25] = "OnesComplement";
    ExpressionType[ExpressionType["Condition"] = 26] = "Condition";
    ExpressionType[ExpressionType["New"] = 27] = "New";
    ExpressionType[ExpressionType["Call"] = 28] = "Call";
    ExpressionType[ExpressionType["Member"] = 29] = "Member";
    ExpressionType[ExpressionType["Index"] = 30] = "Index";
})(ExpressionType || (ExpressionType = {}));
class Binder extends ExpressionVisitor {
    constructor(resources) {
        super();
        this._stack = new Array();
        this._resources = resources;
    }
    VisitParameter(node) {
        var found = false;
        for (var i = this._stack.length - 1; i >= 0; i--) {
            if (this._stack[i].indexOf(node) >= 0) {
                found = true;
                break;
            }
        }
        if (!found) {
            return Expression.Constant(this._resources[node.name]);
        }
        return node;
    }
    VisitLambda(node) {
        this._stack.push(node.parameters);
        this.Visit(node.body);
        this._stack.pop();
        return node;
    }
}
var resources = {
    "my://xs": [1, 2, 3, 4, 5],
    "my://ss": ["bar", "foo", "qux"],
    "rx://operators/filter": function (xs, f) { return xs.filter(f); },
    "rx://operators/map": function (xs, f) { return xs.map(f); },
};
var x = Expression.Parameter("x");
var f1 = Expression.Invoke(Expression.Parameter("rx://operators/map"), Expression.Invoke(Expression.Parameter("rx://operators/filter"), Expression.Parameter("my://xs"), Expression.Lambda(Expression.Equal(Expression.Modulo(x, Expression.Constant(2)), Expression.Constant(0)), x)), Expression.Lambda(Expression.Multiply(x, x), x));
var f2 = Expression.Invoke(Expression.Parameter("rx://operators/map"), Expression.Parameter("my://ss"), Expression.Lambda(Expression.Call(x, "substring", Expression.Constant(1)), x));
var binder = new Binder(resources);
var b1 = Expression.Lambda(binder.Visit(f1));
var c1 = b1.Compile();
var r1 = c1();
alert(r1.join(", "));
var b2 = Expression.Lambda(binder.Visit(f2));
var c2 = b2.Compile();
var r2 = c2();
alert(r2.join(", "));
// Tests for RxJS-Async TypeScript definitions
// Tests by Igor Oleinikov <https://github.com/Igorbek>
/// <reference path="rx.async.d.ts" />
var Rx;
(function (Rx) {
    var Tests;
    (function (Tests) {
        var Async;
        (function (Async) {
            var obsNum;
            var obsStr;
            var sch;
            function start() {
                obsNum = Rx.Observable.start(() => 10, obsStr, sch);
                obsNum = Rx.Observable.start(() => 10, obsStr);
                obsNum = Rx.Observable.start(() => 10);
            }
            function toAsync() {
                obsNum = Rx.Observable.toAsync(() => 1, sch)();
                obsNum = Rx.Observable.toAsync((a1) => a1)(1);
                obsStr = Rx.Observable.toAsync((a1, a2) => a1 + a2.toFixed(0))("", 1);
                obsStr = Rx.Observable.toAsync((a1, a2, a3) => a1 + a2.toFixed(0) + a3.toDateString())("", 1, new Date());
                obsStr = Rx.Observable.toAsync((a1, a2, a3, a4) => a1 + a2.toFixed(0) + a3.toDateString() + (a4 ? 1 : 0))("", 1, new Date(), false);
            }
            function fromCallback() {
                // 0 arguments
                var func0;
                obsNum = Rx.Observable.fromCallback(func0)();
                obsNum = Rx.Observable.fromCallback(func0, obsStr)();
                obsNum = Rx.Observable.fromCallback(func0, obsStr, (results) => results[0])();
                // 1 argument
                var func1;
                obsNum = Rx.Observable.fromCallback(func1)("");
                obsNum = Rx.Observable.fromCallback(func1, {})("");
                obsNum = Rx.Observable.fromCallback(func1, {}, (results) => results[0])("");
                // 2 arguments
                var func2;
                obsStr = Rx.Observable.fromCallback(func2)(1, "");
                obsStr = Rx.Observable.fromCallback(func2, {})(1, "");
                obsStr = Rx.Observable.fromCallback(func2, {}, (results) => results[0])(1, "");
                // 3 arguments
                var func3;
                obsStr = Rx.Observable.fromCallback(func3)(1, "", true);
                obsStr = Rx.Observable.fromCallback(func3, {})(1, "", true);
                obsStr = Rx.Observable.fromCallback(func3, {}, (results) => results[0])(1, "", true);
                // multiple results
                var func0m;
                obsNum = Rx.Observable.fromCallback(func0m, obsStr, (results) => results[0])();
                var func1m;
                obsNum = Rx.Observable.fromCallback(func1m, obsStr, (results) => results[0])("");
                var func2m;
                obsStr = Rx.Observable.fromCallback(func2m, obsStr, (results) => results[0])("", 10);
            }
            function toPromise() {
                var promiseImpl;
                Rx.config.Promise = promiseImpl;
                var p = obsNum.toPromise(promiseImpl);
                p = obsNum.toPromise();
                p = p.then(x => x);
                p = p.then(x => p);
                p = p.then(undefined, reason => 10);
                p = p.then(undefined, reason => p);
                var ps = p.then(undefined, reason => "error");
                ps = p.then(x => "");
                ps = p.then(x => ps);
            }
            function startAsync() {
                var o = Rx.Observable.startAsync(() => null);
            }
        })(Async = Tests.Async || (Tests.Async = {}));
    })(Tests = Rx.Tests || (Rx.Tests = {}));
})(Rx || (Rx = {}));
// Tests for RxJS-BackPressure TypeScript definitions
// Tests by Igor Oleinikov <https://github.com/Igorbek>
///<reference path="rx.d.ts" />
///<reference path="rx.backpressure.d.ts" />
function testPausable() {
    var o;
    var pauser = new Rx.Subject();
    var p = o.pausable(pauser);
    p = o.pausableBuffered(pauser);
}
function testControlled() {
    var o;
    var c = o.controlled();
    var d = c.request();
    d = c.request(5);
}
//# sourceMappingURL=all.js.map
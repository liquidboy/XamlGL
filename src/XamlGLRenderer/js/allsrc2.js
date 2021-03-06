var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("Xaml/reader/XamlMarkup", [], function (exports_1, context_1) {
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
                        this.rawData = data;
                        this.rootElement = doc.documentElement;
                        done.call(this, doc.documentElement);
                    }
                }
                get RawData() { return this.rawData; }
                get RootElement() { return this.rootElement; }
            };
            exports_1("XamlMarkup", XamlMarkup);
        }
    };
});
System.register("Xaml/jupiter/IDependencyObject", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Xaml/jupiter/DependencyObject", [], function (exports_3, context_3) {
    "use strict";
    var DependencyObject;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            DependencyObject = class DependencyObject {
            };
            exports_3("DependencyObject", DependencyObject);
        }
    };
});
System.register("Xaml/jupiter/IUIElement", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Xaml/DataTypes/Guid", [], function (exports_5, context_5) {
    "use strict";
    var Guid;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            Guid = class Guid {
                static newGuid() {
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
                }
            };
            exports_5("Guid", Guid);
        }
    };
});
System.register("Xaml/jupiter/controls/ISetValue", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Xaml/jupiter/controls/Animation", ["Xaml/jupiter/UIElement", "Xaml/jupiter/controls/Core"], function (exports_7, context_7) {
    "use strict";
    var UIElement_1, Core_1, Animation;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (UIElement_1_1) {
                UIElement_1 = UIElement_1_1;
            },
            function (Core_1_1) {
                Core_1 = Core_1_1;
            }
        ],
        execute: function () {
            Animation = class Animation extends UIElement_1.UIElement {
                constructor() {
                    super();
                    this._keyFrames = new Core_1.KeyFrames();
                }
                get KeyFrames() { return this._keyFrames; }
                get DataType() { return this._dataType; }
                get LoopMode() { return this._loopMode; }
                get EnableBlending() { return this._enableBlending; }
                get TargetProperty() { return this._targetProperty; }
                get FPS() { return this._fps; }
                set KeyFrames(value) { this._keyFrames = value; }
                set DataType(value) { this._dataType = value; }
                set LoopMode(value) { this._loopMode = value; }
                set EnableBlending(value) { this._enableBlending = value; }
                set TargetProperty(value) { this._targetProperty = value; }
                set FPS(value) { this._fps = value; }
                Initialize() {
                    this.CreateCtrl();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "TargetProperty", "TargetProperty");
                    this.UpdatePropertyByNodeAndFunction(node, "EnableBlending", "EnableBlending", this.ConvertToBoolean);
                    this.UpdatePropertyByNodeAndFunction(node, "FPS", "FPS", parseInt);
                    this.UpdatePropertyByNodeAndFunction(node, "DataType", "DataType", eval);
                    this.UpdatePropertyByNodeAndFunction(node, "LoopMode", "LoopMode", eval);
                }
                SetValue(propertyName, value) {
                    switch (propertyName) {
                        case "TargetProperty":
                            this.UpdatePropertyByValue(propertyName, value, null);
                            break;
                        case "EnableBlending":
                            this.UpdatePropertyByValue(propertyName, value, this.ConvertToBoolean);
                            break;
                        case "FPS":
                            this.UpdatePropertyByValue(propertyName, value, parseInt);
                            break;
                        case "DataType":
                        case "LoopMode":
                            this.UpdatePropertyByValue(propertyName, value, eval);
                            break;
                    }
                    this.RefreshCtrlProperty(propertyName);
                }
                RefreshCtrlProperty(propertyName) {
                    switch (propertyName) {
                        case "LoopMode":
                            if (this.HasValue(this.LoopMode))
                                this.Ctrl.loopMode = this.LoopMode;
                            break;
                        case "DataType":
                            if (this.HasValue(this.DataType))
                                this.Ctrl.dataType = this.DataType;
                            break;
                        case "FPS":
                            if (this.HasValue(this.FPS))
                                this.Ctrl.framePerSecond = this.FPS;
                            break;
                        case "TargetProperty":
                            if (this.HasValue(this.TargetProperty))
                                this.Ctrl.targetProperty = this.TargetProperty;
                            break;
                        case "EnableBlending":
                            if (this.HasValue(this.EnableBlending))
                                this.Ctrl.enableBlending = this.EnableBlending;
                            break;
                    }
                }
                ClearCtrl() {
                    if (!this.HasValue(this.Ctrl))
                        return;
                    this.bjsCtrl.dispose();
                    this.Ctrl = null;
                }
                CreateCtrl() {
                    this.ClearCtrl();
                    this.Ctrl = new BABYLON.Animation(this.Name, this.TargetProperty, this.FPS, this.DataType, this.LoopMode);
                    this.Ctrl.setKeys(this.KeyFrames.GetArray());
                    this.Parent.Parent.Ctrl.animations.push(this.Ctrl);
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.Animations.add(this);
                        return true;
                    }
                    return false;
                }
            };
            exports_7("Animation", Animation);
        }
    };
});
System.register("libs/typescript-collections/src/lib/util", [], function (exports_8, context_8) {
    "use strict";
    var _hasOwnProperty, has;
    var __moduleName = context_8 && context_8.id;
    function defaultCompare(a, b) {
        if (a < b) {
            return -1;
        }
        else if (a === b) {
            return 0;
        }
        else {
            return 1;
        }
    }
    exports_8("defaultCompare", defaultCompare);
    function defaultEquals(a, b) {
        return a === b;
    }
    exports_8("defaultEquals", defaultEquals);
    function defaultToString(item) {
        if (item === null) {
            return 'COLLECTION_NULL';
        }
        else if (isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        }
        else if (isString(item)) {
            return '$s' + item;
        }
        else {
            return '$o' + item.toString();
        }
    }
    exports_8("defaultToString", defaultToString);
    function makeString(item, join = ',') {
        if (item === null) {
            return 'COLLECTION_NULL';
        }
        else if (isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        }
        else if (isString(item)) {
            return item.toString();
        }
        else {
            let toret = '{';
            let first = true;
            for (const prop in item) {
                if (has(item, prop)) {
                    if (first) {
                        first = false;
                    }
                    else {
                        toret = toret + join;
                    }
                    toret = toret + prop + ':' + item[prop];
                }
            }
            return toret + '}';
        }
    }
    exports_8("makeString", makeString);
    function isFunction(func) {
        return (typeof func) === 'function';
    }
    exports_8("isFunction", isFunction);
    function isUndefined(obj) {
        return (typeof obj) === 'undefined';
    }
    exports_8("isUndefined", isUndefined);
    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    exports_8("isString", isString);
    function reverseCompareFunction(compareFunction) {
        if (!isFunction(compareFunction)) {
            return function (a, b) {
                if (a < b) {
                    return 1;
                }
                else if (a === b) {
                    return 0;
                }
                else {
                    return -1;
                }
            };
        }
        else {
            return function (d, v) {
                return compareFunction(d, v) * -1;
            };
        }
    }
    exports_8("reverseCompareFunction", reverseCompareFunction);
    function compareToEquals(compareFunction) {
        return function (a, b) {
            return compareFunction(a, b) === 0;
        };
    }
    exports_8("compareToEquals", compareToEquals);
    return {
        setters: [],
        execute: function () {
            _hasOwnProperty = Object.prototype.hasOwnProperty;
            exports_8("has", has = function (obj, prop) {
                return _hasOwnProperty.call(obj, prop);
            });
        }
    };
});
System.register("libs/typescript-collections/src/lib/arrays", ["libs/typescript-collections/src/lib/util"], function (exports_9, context_9) {
    "use strict";
    var util;
    var __moduleName = context_9 && context_9.id;
    function indexOf(array, item, equalsFunction) {
        const equals = equalsFunction || util.defaultEquals;
        const length = array.length;
        for (let i = 0; i < length; i++) {
            if (equals(array[i], item)) {
                return i;
            }
        }
        return -1;
    }
    exports_9("indexOf", indexOf);
    function lastIndexOf(array, item, equalsFunction) {
        const equals = equalsFunction || util.defaultEquals;
        const length = array.length;
        for (let i = length - 1; i >= 0; i--) {
            if (equals(array[i], item)) {
                return i;
            }
        }
        return -1;
    }
    exports_9("lastIndexOf", lastIndexOf);
    function contains(array, item, equalsFunction) {
        return indexOf(array, item, equalsFunction) >= 0;
    }
    exports_9("contains", contains);
    function remove(array, item, equalsFunction) {
        const index = indexOf(array, item, equalsFunction);
        if (index < 0) {
            return false;
        }
        array.splice(index, 1);
        return true;
    }
    exports_9("remove", remove);
    function frequency(array, item, equalsFunction) {
        const equals = equalsFunction || util.defaultEquals;
        const length = array.length;
        let freq = 0;
        for (let i = 0; i < length; i++) {
            if (equals(array[i], item)) {
                freq++;
            }
        }
        return freq;
    }
    exports_9("frequency", frequency);
    function equals(array1, array2, equalsFunction) {
        const equals = equalsFunction || util.defaultEquals;
        if (array1.length !== array2.length) {
            return false;
        }
        const length = array1.length;
        for (let i = 0; i < length; i++) {
            if (!equals(array1[i], array2[i])) {
                return false;
            }
        }
        return true;
    }
    exports_9("equals", equals);
    function copy(array) {
        return array.concat();
    }
    exports_9("copy", copy);
    function swap(array, i, j) {
        if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
            return false;
        }
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return true;
    }
    exports_9("swap", swap);
    function toString(array) {
        return '[' + array.toString() + ']';
    }
    exports_9("toString", toString);
    function forEach(array, callback) {
        for (const ele of array) {
            if (callback(ele) === false) {
                return;
            }
        }
    }
    exports_9("forEach", forEach);
    return {
        setters: [
            function (util_1) {
                util = util_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("libs/typescript-collections/src/lib/Dictionary", ["libs/typescript-collections/src/lib/util"], function (exports_10, context_10) {
    "use strict";
    var util, Dictionary;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (util_2) {
                util = util_2;
            }
        ],
        execute: function () {
            Dictionary = class Dictionary {
                constructor(toStrFunction) {
                    this.table = {};
                    this.nElements = 0;
                    this.toStr = toStrFunction || util.defaultToString;
                }
                getValue(key) {
                    const pair = this.table['$' + this.toStr(key)];
                    if (util.isUndefined(pair)) {
                        return undefined;
                    }
                    return pair.value;
                }
                setValue(key, value) {
                    if (util.isUndefined(key) || util.isUndefined(value)) {
                        return undefined;
                    }
                    let ret;
                    const k = '$' + this.toStr(key);
                    const previousElement = this.table[k];
                    if (util.isUndefined(previousElement)) {
                        this.nElements++;
                        ret = undefined;
                    }
                    else {
                        ret = previousElement.value;
                    }
                    this.table[k] = {
                        key: key,
                        value: value
                    };
                    return ret;
                }
                remove(key) {
                    const k = '$' + this.toStr(key);
                    const previousElement = this.table[k];
                    if (!util.isUndefined(previousElement)) {
                        delete this.table[k];
                        this.nElements--;
                        return previousElement.value;
                    }
                    return undefined;
                }
                keys() {
                    const array = [];
                    for (const name in this.table) {
                        if (util.has(this.table, name)) {
                            const pair = this.table[name];
                            array.push(pair.key);
                        }
                    }
                    return array;
                }
                values() {
                    const array = [];
                    for (const name in this.table) {
                        if (util.has(this.table, name)) {
                            const pair = this.table[name];
                            array.push(pair.value);
                        }
                    }
                    return array;
                }
                forEach(callback) {
                    for (const name in this.table) {
                        if (util.has(this.table, name)) {
                            const pair = this.table[name];
                            const ret = callback(pair.key, pair.value);
                            if (ret === false) {
                                return;
                            }
                        }
                    }
                }
                containsKey(key) {
                    return !util.isUndefined(this.getValue(key));
                }
                clear() {
                    this.table = {};
                    this.nElements = 0;
                }
                size() {
                    return this.nElements;
                }
                isEmpty() {
                    return this.nElements <= 0;
                }
                toString() {
                    let toret = '{';
                    this.forEach((k, v) => {
                        toret += `\n\t${k} : ${v}`;
                    });
                    return toret + '\n}';
                }
            };
            exports_10("default", Dictionary);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Set", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/arrays", "libs/typescript-collections/src/lib/Dictionary"], function (exports_11, context_11) {
    "use strict";
    var util, arrays, Dictionary_1, Set;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (util_3) {
                util = util_3;
            },
            function (arrays_1) {
                arrays = arrays_1;
            },
            function (Dictionary_1_1) {
                Dictionary_1 = Dictionary_1_1;
            }
        ],
        execute: function () {
            Set = class Set {
                constructor(toStringFunction) {
                    this.dictionary = new Dictionary_1.default(toStringFunction);
                }
                contains(element) {
                    return this.dictionary.containsKey(element);
                }
                add(element) {
                    if (this.contains(element) || util.isUndefined(element)) {
                        return false;
                    }
                    else {
                        this.dictionary.setValue(element, element);
                        return true;
                    }
                }
                intersection(otherSet) {
                    const set = this;
                    this.forEach(function (element) {
                        if (!otherSet.contains(element)) {
                            set.remove(element);
                        }
                        return true;
                    });
                }
                union(otherSet) {
                    const set = this;
                    otherSet.forEach(function (element) {
                        set.add(element);
                        return true;
                    });
                }
                difference(otherSet) {
                    const set = this;
                    otherSet.forEach(function (element) {
                        set.remove(element);
                        return true;
                    });
                }
                isSubsetOf(otherSet) {
                    if (this.size() > otherSet.size()) {
                        return false;
                    }
                    let isSub = true;
                    this.forEach(function (element) {
                        if (!otherSet.contains(element)) {
                            isSub = false;
                            return false;
                        }
                        return true;
                    });
                    return isSub;
                }
                remove(element) {
                    if (!this.contains(element)) {
                        return false;
                    }
                    else {
                        this.dictionary.remove(element);
                        return true;
                    }
                }
                forEach(callback) {
                    this.dictionary.forEach(function (k, v) {
                        return callback(v);
                    });
                }
                toArray() {
                    return this.dictionary.values();
                }
                isEmpty() {
                    return this.dictionary.isEmpty();
                }
                size() {
                    return this.dictionary.size();
                }
                clear() {
                    this.dictionary.clear();
                }
                toString() {
                    return arrays.toString(this.toArray());
                }
            };
            exports_11("default", Set);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Bag", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/Set"], function (exports_12, context_12) {
    "use strict";
    var util, Dictionary_2, Set_1, Bag;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (util_4) {
                util = util_4;
            },
            function (Dictionary_2_1) {
                Dictionary_2 = Dictionary_2_1;
            },
            function (Set_1_1) {
                Set_1 = Set_1_1;
            }
        ],
        execute: function () {
            Bag = class Bag {
                constructor(toStrFunction) {
                    this.toStrF = toStrFunction || util.defaultToString;
                    this.dictionary = new Dictionary_2.default(this.toStrF);
                    this.nElements = 0;
                }
                add(element, nCopies = 1) {
                    if (util.isUndefined(element) || nCopies <= 0) {
                        return false;
                    }
                    if (!this.contains(element)) {
                        const node = {
                            value: element,
                            copies: nCopies
                        };
                        this.dictionary.setValue(element, node);
                    }
                    else {
                        this.dictionary.getValue(element).copies += nCopies;
                    }
                    this.nElements += nCopies;
                    return true;
                }
                count(element) {
                    if (!this.contains(element)) {
                        return 0;
                    }
                    else {
                        return this.dictionary.getValue(element).copies;
                    }
                }
                contains(element) {
                    return this.dictionary.containsKey(element);
                }
                remove(element, nCopies = 1) {
                    if (util.isUndefined(element) || nCopies <= 0) {
                        return false;
                    }
                    if (!this.contains(element)) {
                        return false;
                    }
                    else {
                        const node = this.dictionary.getValue(element);
                        if (nCopies > node.copies) {
                            this.nElements -= node.copies;
                        }
                        else {
                            this.nElements -= nCopies;
                        }
                        node.copies -= nCopies;
                        if (node.copies <= 0) {
                            this.dictionary.remove(element);
                        }
                        return true;
                    }
                }
                toArray() {
                    const a = [];
                    const values = this.dictionary.values();
                    for (const node of values) {
                        const element = node.value;
                        const copies = node.copies;
                        for (let j = 0; j < copies; j++) {
                            a.push(element);
                        }
                    }
                    return a;
                }
                toSet() {
                    const toret = new Set_1.default(this.toStrF);
                    const elements = this.dictionary.values();
                    for (const ele of elements) {
                        const value = ele.value;
                        toret.add(value);
                    }
                    return toret;
                }
                forEach(callback) {
                    this.dictionary.forEach(function (k, v) {
                        const value = v.value;
                        const copies = v.copies;
                        for (let i = 0; i < copies; i++) {
                            if (callback(value) === false) {
                                return false;
                            }
                        }
                        return true;
                    });
                }
                size() {
                    return this.nElements;
                }
                isEmpty() {
                    return this.nElements === 0;
                }
                clear() {
                    this.nElements = 0;
                    this.dictionary.clear();
                }
            };
            exports_12("default", Bag);
        }
    };
});
System.register("libs/typescript-collections/src/lib/LinkedList", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/arrays"], function (exports_13, context_13) {
    "use strict";
    var util, arrays, LinkedList;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [
            function (util_5) {
                util = util_5;
            },
            function (arrays_2) {
                arrays = arrays_2;
            }
        ],
        execute: function () {
            LinkedList = class LinkedList {
                constructor() {
                    this.firstNode = null;
                    this.lastNode = null;
                    this.nElements = 0;
                }
                add(item, index) {
                    if (util.isUndefined(index)) {
                        index = this.nElements;
                    }
                    if (index < 0 || index > this.nElements || util.isUndefined(item)) {
                        return false;
                    }
                    const newNode = this.createNode(item);
                    if (this.nElements === 0) {
                        this.firstNode = newNode;
                        this.lastNode = newNode;
                    }
                    else if (index === this.nElements) {
                        this.lastNode.next = newNode;
                        this.lastNode = newNode;
                    }
                    else if (index === 0) {
                        newNode.next = this.firstNode;
                        this.firstNode = newNode;
                    }
                    else {
                        const prev = this.nodeAtIndex(index - 1);
                        newNode.next = prev.next;
                        prev.next = newNode;
                    }
                    this.nElements++;
                    return true;
                }
                first() {
                    if (this.firstNode !== null) {
                        return this.firstNode.element;
                    }
                    return undefined;
                }
                last() {
                    if (this.lastNode !== null) {
                        return this.lastNode.element;
                    }
                    return undefined;
                }
                elementAtIndex(index) {
                    const node = this.nodeAtIndex(index);
                    if (node === null) {
                        return undefined;
                    }
                    return node.element;
                }
                indexOf(item, equalsFunction) {
                    const equalsF = equalsFunction || util.defaultEquals;
                    if (util.isUndefined(item)) {
                        return -1;
                    }
                    let currentNode = this.firstNode;
                    let index = 0;
                    while (currentNode !== null) {
                        if (equalsF(currentNode.element, item)) {
                            return index;
                        }
                        index++;
                        currentNode = currentNode.next;
                    }
                    return -1;
                }
                contains(item, equalsFunction) {
                    return (this.indexOf(item, equalsFunction) >= 0);
                }
                remove(item, equalsFunction) {
                    const equalsF = equalsFunction || util.defaultEquals;
                    if (this.nElements < 1 || util.isUndefined(item)) {
                        return false;
                    }
                    let previous = null;
                    let currentNode = this.firstNode;
                    while (currentNode !== null) {
                        if (equalsF(currentNode.element, item)) {
                            if (currentNode === this.firstNode) {
                                this.firstNode = this.firstNode.next;
                                if (currentNode === this.lastNode) {
                                    this.lastNode = null;
                                }
                            }
                            else if (currentNode === this.lastNode) {
                                this.lastNode = previous;
                                previous.next = currentNode.next;
                                currentNode.next = null;
                            }
                            else {
                                previous.next = currentNode.next;
                                currentNode.next = null;
                            }
                            this.nElements--;
                            return true;
                        }
                        previous = currentNode;
                        currentNode = currentNode.next;
                    }
                    return false;
                }
                clear() {
                    this.firstNode = null;
                    this.lastNode = null;
                    this.nElements = 0;
                }
                equals(other, equalsFunction) {
                    const eqF = equalsFunction || util.defaultEquals;
                    if (!(other instanceof LinkedList)) {
                        return false;
                    }
                    if (this.size() !== other.size()) {
                        return false;
                    }
                    return this.equalsAux(this.firstNode, other.firstNode, eqF);
                }
                equalsAux(n1, n2, eqF) {
                    while (n1 !== null) {
                        if (!eqF(n1.element, n2.element)) {
                            return false;
                        }
                        n1 = n1.next;
                        n2 = n2.next;
                    }
                    return true;
                }
                removeElementAtIndex(index) {
                    if (index < 0 || index >= this.nElements) {
                        return undefined;
                    }
                    let element;
                    if (this.nElements === 1) {
                        element = this.firstNode.element;
                        this.firstNode = null;
                        this.lastNode = null;
                    }
                    else {
                        const previous = this.nodeAtIndex(index - 1);
                        if (previous === null) {
                            element = this.firstNode.element;
                            this.firstNode = this.firstNode.next;
                        }
                        else if (previous.next === this.lastNode) {
                            element = this.lastNode.element;
                            this.lastNode = previous;
                        }
                        if (previous !== null) {
                            element = previous.next.element;
                            previous.next = previous.next.next;
                        }
                    }
                    this.nElements--;
                    return element;
                }
                forEach(callback) {
                    let currentNode = this.firstNode;
                    while (currentNode !== null) {
                        if (callback(currentNode.element) === false) {
                            break;
                        }
                        currentNode = currentNode.next;
                    }
                }
                reverse() {
                    let previous = null;
                    let current = this.firstNode;
                    let temp = null;
                    while (current !== null) {
                        temp = current.next;
                        current.next = previous;
                        previous = current;
                        current = temp;
                    }
                    temp = this.firstNode;
                    this.firstNode = this.lastNode;
                    this.lastNode = temp;
                }
                toArray() {
                    const array = [];
                    let currentNode = this.firstNode;
                    while (currentNode !== null) {
                        array.push(currentNode.element);
                        currentNode = currentNode.next;
                    }
                    return array;
                }
                size() {
                    return this.nElements;
                }
                isEmpty() {
                    return this.nElements <= 0;
                }
                toString() {
                    return arrays.toString(this.toArray());
                }
                nodeAtIndex(index) {
                    if (index < 0 || index >= this.nElements) {
                        return null;
                    }
                    if (index === (this.nElements - 1)) {
                        return this.lastNode;
                    }
                    let node = this.firstNode;
                    for (let i = 0; i < index; i++) {
                        node = node.next;
                    }
                    return node;
                }
                createNode(item) {
                    return {
                        element: item,
                        next: null
                    };
                }
            };
            exports_13("default", LinkedList);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Heap", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/arrays"], function (exports_14, context_14) {
    "use strict";
    var collections, arrays, Heap;
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [
            function (collections_1) {
                collections = collections_1;
            },
            function (arrays_3) {
                arrays = arrays_3;
            }
        ],
        execute: function () {
            Heap = class Heap {
                constructor(compareFunction) {
                    this.data = [];
                    this.compare = compareFunction || collections.defaultCompare;
                }
                leftChildIndex(nodeIndex) {
                    return (2 * nodeIndex) + 1;
                }
                rightChildIndex(nodeIndex) {
                    return (2 * nodeIndex) + 2;
                }
                parentIndex(nodeIndex) {
                    return Math.floor((nodeIndex - 1) / 2);
                }
                minIndex(leftChild, rightChild) {
                    if (rightChild >= this.data.length) {
                        if (leftChild >= this.data.length) {
                            return -1;
                        }
                        else {
                            return leftChild;
                        }
                    }
                    else {
                        if (this.compare(this.data[leftChild], this.data[rightChild]) <= 0) {
                            return leftChild;
                        }
                        else {
                            return rightChild;
                        }
                    }
                }
                siftUp(index) {
                    let parent = this.parentIndex(index);
                    while (index > 0 && this.compare(this.data[parent], this.data[index]) > 0) {
                        arrays.swap(this.data, parent, index);
                        index = parent;
                        parent = this.parentIndex(index);
                    }
                }
                siftDown(nodeIndex) {
                    let min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
                    while (min >= 0 && this.compare(this.data[nodeIndex], this.data[min]) > 0) {
                        arrays.swap(this.data, min, nodeIndex);
                        nodeIndex = min;
                        min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
                    }
                }
                peek() {
                    if (this.data.length > 0) {
                        return this.data[0];
                    }
                    else {
                        return undefined;
                    }
                }
                add(element) {
                    if (collections.isUndefined(element)) {
                        return undefined;
                    }
                    this.data.push(element);
                    this.siftUp(this.data.length - 1);
                    return true;
                }
                removeRoot() {
                    if (this.data.length > 0) {
                        const obj = this.data[0];
                        this.data[0] = this.data[this.data.length - 1];
                        this.data.splice(this.data.length - 1, 1);
                        if (this.data.length > 0) {
                            this.siftDown(0);
                        }
                        return obj;
                    }
                    return undefined;
                }
                contains(element) {
                    const equF = collections.compareToEquals(this.compare);
                    return arrays.contains(this.data, element, equF);
                }
                size() {
                    return this.data.length;
                }
                isEmpty() {
                    return this.data.length <= 0;
                }
                clear() {
                    this.data.length = 0;
                }
                forEach(callback) {
                    arrays.forEach(this.data, callback);
                }
            };
            exports_14("default", Heap);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Queue", ["libs/typescript-collections/src/lib/LinkedList"], function (exports_15, context_15) {
    "use strict";
    var LinkedList_1, Queue;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [
            function (LinkedList_1_1) {
                LinkedList_1 = LinkedList_1_1;
            }
        ],
        execute: function () {
            Queue = class Queue {
                constructor() {
                    this.list = new LinkedList_1.default();
                }
                enqueue(elem) {
                    return this.list.add(elem);
                }
                add(elem) {
                    return this.list.add(elem);
                }
                dequeue() {
                    if (this.list.size() !== 0) {
                        const el = this.list.first();
                        this.list.removeElementAtIndex(0);
                        return el;
                    }
                    return undefined;
                }
                peek() {
                    if (this.list.size() !== 0) {
                        return this.list.first();
                    }
                    return undefined;
                }
                size() {
                    return this.list.size();
                }
                contains(elem, equalsFunction) {
                    return this.list.contains(elem, equalsFunction);
                }
                isEmpty() {
                    return this.list.size() <= 0;
                }
                clear() {
                    this.list.clear();
                }
                forEach(callback) {
                    this.list.forEach(callback);
                }
            };
            exports_15("default", Queue);
        }
    };
});
System.register("libs/typescript-collections/src/lib/BSTree", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/Queue"], function (exports_16, context_16) {
    "use strict";
    var util, Queue_1, BSTree;
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [
            function (util_6) {
                util = util_6;
            },
            function (Queue_1_1) {
                Queue_1 = Queue_1_1;
            }
        ],
        execute: function () {
            BSTree = class BSTree {
                constructor(compareFunction) {
                    this.root = null;
                    this.compare = compareFunction || util.defaultCompare;
                    this.nElements = 0;
                }
                add(element) {
                    if (util.isUndefined(element)) {
                        return false;
                    }
                    if (this.insertNode(this.createNode(element)) !== null) {
                        this.nElements++;
                        return true;
                    }
                    return false;
                }
                clear() {
                    this.root = null;
                    this.nElements = 0;
                }
                isEmpty() {
                    return this.nElements === 0;
                }
                size() {
                    return this.nElements;
                }
                contains(element) {
                    if (util.isUndefined(element)) {
                        return false;
                    }
                    return this.searchNode(this.root, element) !== null;
                }
                remove(element) {
                    const node = this.searchNode(this.root, element);
                    if (node === null) {
                        return false;
                    }
                    this.removeNode(node);
                    this.nElements--;
                    return true;
                }
                inorderTraversal(callback) {
                    this.inorderTraversalAux(this.root, callback, {
                        stop: false
                    });
                }
                preorderTraversal(callback) {
                    this.preorderTraversalAux(this.root, callback, {
                        stop: false
                    });
                }
                postorderTraversal(callback) {
                    this.postorderTraversalAux(this.root, callback, {
                        stop: false
                    });
                }
                levelTraversal(callback) {
                    this.levelTraversalAux(this.root, callback);
                }
                minimum() {
                    if (this.isEmpty()) {
                        return undefined;
                    }
                    return this.minimumAux(this.root).element;
                }
                maximum() {
                    if (this.isEmpty()) {
                        return undefined;
                    }
                    return this.maximumAux(this.root).element;
                }
                forEach(callback) {
                    this.inorderTraversal(callback);
                }
                toArray() {
                    const array = [];
                    this.inorderTraversal(function (element) {
                        array.push(element);
                        return true;
                    });
                    return array;
                }
                height() {
                    return this.heightAux(this.root);
                }
                searchNode(node, element) {
                    let cmp = null;
                    while (node !== null && cmp !== 0) {
                        cmp = this.compare(element, node.element);
                        if (cmp < 0) {
                            node = node.leftCh;
                        }
                        else if (cmp > 0) {
                            node = node.rightCh;
                        }
                    }
                    return node;
                }
                transplant(n1, n2) {
                    if (n1.parent === null) {
                        this.root = n2;
                    }
                    else if (n1 === n1.parent.leftCh) {
                        n1.parent.leftCh = n2;
                    }
                    else {
                        n1.parent.rightCh = n2;
                    }
                    if (n2 !== null) {
                        n2.parent = n1.parent;
                    }
                }
                removeNode(node) {
                    if (node.leftCh === null) {
                        this.transplant(node, node.rightCh);
                    }
                    else if (node.rightCh === null) {
                        this.transplant(node, node.leftCh);
                    }
                    else {
                        const y = this.minimumAux(node.rightCh);
                        if (y.parent !== node) {
                            this.transplant(y, y.rightCh);
                            y.rightCh = node.rightCh;
                            y.rightCh.parent = y;
                        }
                        this.transplant(node, y);
                        y.leftCh = node.leftCh;
                        y.leftCh.parent = y;
                    }
                }
                inorderTraversalAux(node, callback, signal) {
                    if (node === null || signal.stop) {
                        return;
                    }
                    this.inorderTraversalAux(node.leftCh, callback, signal);
                    if (signal.stop) {
                        return;
                    }
                    signal.stop = callback(node.element) === false;
                    if (signal.stop) {
                        return;
                    }
                    this.inorderTraversalAux(node.rightCh, callback, signal);
                }
                levelTraversalAux(node, callback) {
                    const queue = new Queue_1.default();
                    if (node !== null) {
                        queue.enqueue(node);
                    }
                    while (!queue.isEmpty()) {
                        node = queue.dequeue();
                        if (callback(node.element) === false) {
                            return;
                        }
                        if (node.leftCh !== null) {
                            queue.enqueue(node.leftCh);
                        }
                        if (node.rightCh !== null) {
                            queue.enqueue(node.rightCh);
                        }
                    }
                }
                preorderTraversalAux(node, callback, signal) {
                    if (node === null || signal.stop) {
                        return;
                    }
                    signal.stop = callback(node.element) === false;
                    if (signal.stop) {
                        return;
                    }
                    this.preorderTraversalAux(node.leftCh, callback, signal);
                    if (signal.stop) {
                        return;
                    }
                    this.preorderTraversalAux(node.rightCh, callback, signal);
                }
                postorderTraversalAux(node, callback, signal) {
                    if (node === null || signal.stop) {
                        return;
                    }
                    this.postorderTraversalAux(node.leftCh, callback, signal);
                    if (signal.stop) {
                        return;
                    }
                    this.postorderTraversalAux(node.rightCh, callback, signal);
                    if (signal.stop) {
                        return;
                    }
                    signal.stop = callback(node.element) === false;
                }
                minimumAux(node) {
                    while (node.leftCh !== null) {
                        node = node.leftCh;
                    }
                    return node;
                }
                maximumAux(node) {
                    while (node.rightCh !== null) {
                        node = node.rightCh;
                    }
                    return node;
                }
                heightAux(node) {
                    if (node === null) {
                        return -1;
                    }
                    return Math.max(this.heightAux(node.leftCh), this.heightAux(node.rightCh)) + 1;
                }
                insertNode(node) {
                    let parent = null;
                    let position = this.root;
                    let cmp = null;
                    while (position !== null) {
                        cmp = this.compare(node.element, position.element);
                        if (cmp === 0) {
                            return null;
                        }
                        else if (cmp < 0) {
                            parent = position;
                            position = position.leftCh;
                        }
                        else {
                            parent = position;
                            position = position.rightCh;
                        }
                    }
                    node.parent = parent;
                    if (parent === null) {
                        this.root = node;
                    }
                    else if (this.compare(node.element, parent.element) < 0) {
                        parent.leftCh = node;
                    }
                    else {
                        parent.rightCh = node;
                    }
                    return node;
                }
                createNode(element) {
                    return {
                        element: element,
                        leftCh: null,
                        rightCh: null,
                        parent: null
                    };
                }
            };
            exports_16("default", BSTree);
        }
    };
});
System.register("libs/typescript-collections/src/lib/LinkedDictionary", ["libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/util"], function (exports_17, context_17) {
    "use strict";
    var Dictionary_3, util, LinkedDictionaryPair, LinkedDictionary;
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [
            function (Dictionary_3_1) {
                Dictionary_3 = Dictionary_3_1;
            },
            function (util_7) {
                util = util_7;
            }
        ],
        execute: function () {
            LinkedDictionaryPair = class LinkedDictionaryPair {
                constructor(key, value) {
                    this.key = key;
                    this.value = value;
                }
                unlink() {
                    this.prev.next = this.next;
                    this.next.prev = this.prev;
                }
            };
            LinkedDictionary = class LinkedDictionary extends Dictionary_3.default {
                constructor(toStrFunction) {
                    super(toStrFunction);
                    this.head = new LinkedDictionaryPair(null, null);
                    this.tail = new LinkedDictionaryPair(null, null);
                    this.head.next = this.tail;
                    this.tail.prev = this.head;
                }
                appendToTail(entry) {
                    const lastNode = this.tail.prev;
                    lastNode.next = entry;
                    entry.prev = lastNode;
                    entry.next = this.tail;
                    this.tail.prev = entry;
                }
                getLinkedDictionaryPair(key) {
                    if (util.isUndefined(key)) {
                        return undefined;
                    }
                    const k = '$' + this.toStr(key);
                    const pair = (this.table[k]);
                    return pair;
                }
                getValue(key) {
                    const pair = this.getLinkedDictionaryPair(key);
                    if (!util.isUndefined(pair)) {
                        return pair.value;
                    }
                    return undefined;
                }
                remove(key) {
                    const pair = this.getLinkedDictionaryPair(key);
                    if (!util.isUndefined(pair)) {
                        super.remove(key);
                        pair.unlink();
                        return pair.value;
                    }
                    return undefined;
                }
                clear() {
                    super.clear();
                    this.head.next = this.tail;
                    this.tail.prev = this.head;
                }
                replace(oldPair, newPair) {
                    const k = '$' + this.toStr(newPair.key);
                    newPair.next = oldPair.next;
                    newPair.prev = oldPair.prev;
                    this.remove(oldPair.key);
                    newPair.prev.next = newPair;
                    newPair.next.prev = newPair;
                    this.table[k] = newPair;
                    ++this.nElements;
                }
                setValue(key, value) {
                    if (util.isUndefined(key) || util.isUndefined(value)) {
                        return undefined;
                    }
                    const existingPair = this.getLinkedDictionaryPair(key);
                    const newPair = new LinkedDictionaryPair(key, value);
                    const k = '$' + this.toStr(key);
                    if (!util.isUndefined(existingPair)) {
                        this.replace(existingPair, newPair);
                        return existingPair.value;
                    }
                    else {
                        this.appendToTail(newPair);
                        this.table[k] = newPair;
                        ++this.nElements;
                        return undefined;
                    }
                }
                keys() {
                    const array = [];
                    this.forEach((key, value) => {
                        array.push(key);
                    });
                    return array;
                }
                values() {
                    const array = [];
                    this.forEach((key, value) => {
                        array.push(value);
                    });
                    return array;
                }
                forEach(callback) {
                    let crawlNode = this.head.next;
                    while (crawlNode.next != null) {
                        const ret = callback(crawlNode.key, crawlNode.value);
                        if (ret === false) {
                            return;
                        }
                        crawlNode = crawlNode.next;
                    }
                }
            };
            exports_17("default", LinkedDictionary);
        }
    };
});
System.register("libs/typescript-collections/src/lib/MultiDictionary", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/arrays"], function (exports_18, context_18) {
    "use strict";
    var util, Dictionary_4, arrays, MultiDictionary;
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [
            function (util_8) {
                util = util_8;
            },
            function (Dictionary_4_1) {
                Dictionary_4 = Dictionary_4_1;
            },
            function (arrays_4) {
                arrays = arrays_4;
            }
        ],
        execute: function () {
            MultiDictionary = class MultiDictionary {
                constructor(toStrFunction, valuesEqualsFunction, allowDuplicateValues = false) {
                    this.dict = new Dictionary_4.default(toStrFunction);
                    this.equalsF = valuesEqualsFunction || util.defaultEquals;
                    this.allowDuplicate = allowDuplicateValues;
                }
                getValue(key) {
                    const values = this.dict.getValue(key);
                    if (util.isUndefined(values)) {
                        return [];
                    }
                    return arrays.copy(values);
                }
                setValue(key, value) {
                    if (util.isUndefined(key) || util.isUndefined(value)) {
                        return false;
                    }
                    if (!this.containsKey(key)) {
                        this.dict.setValue(key, [value]);
                        return true;
                    }
                    const array = this.dict.getValue(key);
                    if (!this.allowDuplicate) {
                        if (arrays.contains(array, value, this.equalsF)) {
                            return false;
                        }
                    }
                    array.push(value);
                    return true;
                }
                remove(key, value) {
                    if (util.isUndefined(value)) {
                        const v = this.dict.remove(key);
                        return !util.isUndefined(v);
                    }
                    const array = this.dict.getValue(key);
                    if (arrays.remove(array, value, this.equalsF)) {
                        if (array.length === 0) {
                            this.dict.remove(key);
                        }
                        return true;
                    }
                    return false;
                }
                keys() {
                    return this.dict.keys();
                }
                values() {
                    const values = this.dict.values();
                    const array = [];
                    for (const v of values) {
                        for (const w of v) {
                            array.push(w);
                        }
                    }
                    return array;
                }
                containsKey(key) {
                    return this.dict.containsKey(key);
                }
                clear() {
                    this.dict.clear();
                }
                size() {
                    return this.dict.size();
                }
                isEmpty() {
                    return this.dict.isEmpty();
                }
            };
            exports_18("default", MultiDictionary);
        }
    };
});
System.register("libs/typescript-collections/src/lib/FactoryDictionary", ["libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/util"], function (exports_19, context_19) {
    "use strict";
    var Dictionary_5, util, FactoryDictionary;
    var __moduleName = context_19 && context_19.id;
    return {
        setters: [
            function (Dictionary_5_1) {
                Dictionary_5 = Dictionary_5_1;
            },
            function (util_9) {
                util = util_9;
            }
        ],
        execute: function () {
            FactoryDictionary = class FactoryDictionary extends Dictionary_5.default {
                constructor(defaultFactoryFunction, toStrFunction) {
                    super(toStrFunction);
                    this.defaultFactoryFunction = defaultFactoryFunction;
                }
                setDefault(key, defaultValue) {
                    const currentValue = super.getValue(key);
                    if (util.isUndefined(currentValue)) {
                        this.setValue(key, defaultValue);
                        return defaultValue;
                    }
                    return currentValue;
                }
                getValue(key) {
                    return this.setDefault(key, this.defaultFactoryFunction());
                }
            };
            exports_19("default", FactoryDictionary);
        }
    };
});
System.register("libs/typescript-collections/src/lib/PriorityQueue", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/Heap"], function (exports_20, context_20) {
    "use strict";
    var util, Heap_1, PriorityQueue;
    var __moduleName = context_20 && context_20.id;
    return {
        setters: [
            function (util_10) {
                util = util_10;
            },
            function (Heap_1_1) {
                Heap_1 = Heap_1_1;
            }
        ],
        execute: function () {
            PriorityQueue = class PriorityQueue {
                constructor(compareFunction) {
                    this.heap = new Heap_1.default(util.reverseCompareFunction(compareFunction));
                }
                enqueue(element) {
                    return this.heap.add(element);
                }
                add(element) {
                    return this.heap.add(element);
                }
                dequeue() {
                    if (this.heap.size() !== 0) {
                        const el = this.heap.peek();
                        this.heap.removeRoot();
                        return el;
                    }
                    return undefined;
                }
                peek() {
                    return this.heap.peek();
                }
                contains(element) {
                    return this.heap.contains(element);
                }
                isEmpty() {
                    return this.heap.isEmpty();
                }
                size() {
                    return this.heap.size();
                }
                clear() {
                    this.heap.clear();
                }
                forEach(callback) {
                    this.heap.forEach(callback);
                }
            };
            exports_20("default", PriorityQueue);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Stack", ["libs/typescript-collections/src/lib/LinkedList"], function (exports_21, context_21) {
    "use strict";
    var LinkedList_2, Stack;
    var __moduleName = context_21 && context_21.id;
    return {
        setters: [
            function (LinkedList_2_1) {
                LinkedList_2 = LinkedList_2_1;
            }
        ],
        execute: function () {
            Stack = class Stack {
                constructor() {
                    this.list = new LinkedList_2.default();
                }
                push(elem) {
                    return this.list.add(elem, 0);
                }
                add(elem) {
                    return this.list.add(elem, 0);
                }
                pop() {
                    return this.list.removeElementAtIndex(0);
                }
                peek() {
                    return this.list.first();
                }
                size() {
                    return this.list.size();
                }
                contains(elem, equalsFunction) {
                    return this.list.contains(elem, equalsFunction);
                }
                isEmpty() {
                    return this.list.isEmpty();
                }
                clear() {
                    this.list.clear();
                }
                forEach(callback) {
                    this.list.forEach(callback);
                }
            };
            exports_21("default", Stack);
        }
    };
});
System.register("libs/typescript-collections/src/lib/MultiRootTree", [], function (exports_22, context_22) {
    "use strict";
    var Direction, MultiRootTree;
    var __moduleName = context_22 && context_22.id;
    return {
        setters: [],
        execute: function () {
            (function (Direction) {
                Direction[Direction["BEFORE"] = 0] = "BEFORE";
                Direction[Direction["AFTER"] = 1] = "AFTER";
                Direction[Direction["INSIDE_AT_END"] = 2] = "INSIDE_AT_END";
                Direction[Direction["INSIDE_AT_START"] = 3] = "INSIDE_AT_START";
            })(Direction || (Direction = {}));
            MultiRootTree = class MultiRootTree {
                constructor(rootIds = [], nodes = {}) {
                    this.rootIds = rootIds;
                    this.nodes = nodes;
                    this.initRootIds();
                    this.initNodes();
                }
                initRootIds() {
                    for (let rootId of this.rootIds) {
                        this.createEmptyNodeIfNotExist(rootId);
                    }
                }
                initNodes() {
                    for (let nodeKey in this.nodes) {
                        if (this.nodes.hasOwnProperty(nodeKey)) {
                            for (let nodeListItem of this.nodes[nodeKey]) {
                                this.createEmptyNodeIfNotExist(nodeListItem);
                            }
                        }
                    }
                }
                createEmptyNodeIfNotExist(nodeKey) {
                    if (!this.nodes[nodeKey]) {
                        this.nodes[nodeKey] = [];
                    }
                }
                getRootIds() {
                    let clone = this.rootIds.slice();
                    return clone;
                }
                getNodes() {
                    let clone = {};
                    for (let nodeKey in this.nodes) {
                        if (this.nodes.hasOwnProperty(nodeKey)) {
                            clone[nodeKey] = this.nodes[nodeKey].slice();
                        }
                    }
                    return clone;
                }
                getObject() {
                    return {
                        rootIds: this.getRootIds(),
                        nodes: this.getNodes(),
                    };
                }
                toObject() {
                    return this.getObject();
                }
                flatten() {
                    const _this = this;
                    let extraPropsObject = [];
                    for (let i = 0; i < this.rootIds.length; i++) {
                        const rootId = this.rootIds[i];
                        extraPropsObject.push({
                            id: rootId,
                            level: 0,
                            hasParent: false,
                            childrenCount: undefined,
                        });
                        traverse(rootId, this.nodes, extraPropsObject, 0);
                    }
                    for (let o of extraPropsObject) {
                        o.childrenCount = countChildren(o.id);
                    }
                    return extraPropsObject;
                    function countChildren(id) {
                        if (!_this.nodes[id]) {
                            return 0;
                        }
                        else {
                            const childrenCount = _this.nodes[id].length;
                            return childrenCount;
                        }
                    }
                    function traverse(startId, nodes, returnArray, level = 0) {
                        if (!startId || !nodes || !returnArray || !nodes[startId]) {
                            return;
                        }
                        level++;
                        let idsList = nodes[startId];
                        for (let i = 0; i < idsList.length; i++) {
                            let id = idsList[i];
                            returnArray.push({ id, level, hasParent: true });
                            traverse(id, nodes, returnArray, level);
                        }
                        level--;
                    }
                }
                moveIdBeforeId(moveId, beforeId) {
                    return this.moveId(moveId, beforeId, Direction.BEFORE);
                }
                moveIdAfterId(moveId, afterId) {
                    return this.moveId(moveId, afterId, Direction.AFTER);
                }
                moveIdIntoId(moveId, insideId, atStart = true) {
                    if (atStart) {
                        return this.moveId(moveId, insideId, Direction.INSIDE_AT_START);
                    }
                    else {
                        return this.moveId(moveId, insideId, Direction.INSIDE_AT_END);
                    }
                }
                deleteId(id) {
                    this.rootDeleteId(id);
                    this.nodeAndSubNodesDelete(id);
                    this.nodeRefrencesDelete(id);
                }
                insertIdBeforeId(beforeId, insertId) {
                    let foundRootIdIndex = this.findRootId(beforeId);
                    if (foundRootIdIndex > -1) {
                        this.insertIdIntoRoot(insertId, foundRootIdIndex);
                    }
                    for (let nodeKey in this.nodes) {
                        if (this.nodes.hasOwnProperty(nodeKey)) {
                            let foundNodeIdIndex = this.findNodeId(nodeKey, beforeId);
                            if (foundNodeIdIndex > -1) {
                                this.insertIdIntoNode(nodeKey, insertId, foundNodeIdIndex);
                            }
                        }
                    }
                }
                insertIdAfterId(belowId, insertId) {
                    let foundRootIdIndex = this.findRootId(belowId);
                    if (foundRootIdIndex > -1) {
                        this.insertIdIntoRoot(insertId, foundRootIdIndex + 1);
                    }
                    for (let nodeKey in this.nodes) {
                        if (this.nodes.hasOwnProperty(nodeKey)) {
                            let foundNodeIdIndex = this.findNodeId(nodeKey, belowId);
                            if (foundNodeIdIndex > -1) {
                                this.insertIdIntoNode(nodeKey, insertId, foundNodeIdIndex + 1);
                            }
                        }
                    }
                }
                insertIdIntoId(insideId, insertId) {
                    this.nodeInsertAtEnd(insideId, insertId);
                    this.nodes[insertId] = [];
                }
                insertIdIntoRoot(id, position) {
                    if (position === undefined) {
                        this.rootInsertAtEnd(id);
                    }
                    else {
                        if (position < 0) {
                            const length = this.rootIds.length;
                            this.rootIds.splice((position + length + 1), 0, id);
                        }
                        else {
                            this.rootIds.splice(position, 0, id);
                        }
                    }
                    this.nodes[id] = this.nodes[id] || [];
                }
                insertIdIntoNode(nodeKey, id, position) {
                    this.nodes[nodeKey] = this.nodes[nodeKey] || [];
                    this.nodes[id] = this.nodes[id] || [];
                    if (position === undefined) {
                        this.nodeInsertAtEnd(nodeKey, id);
                    }
                    else {
                        if (position < 0) {
                            const length = this.nodes[nodeKey].length;
                            this.nodes[nodeKey].splice((position + length + 1), 0, id);
                        }
                        else {
                            this.nodes[nodeKey].splice(position, 0, id);
                        }
                    }
                }
                moveId(moveId, beforeId, direction) {
                    let sourceId = moveId;
                    const sourceRootIndex = this.findRootId(sourceId);
                    let sourceNodeKey;
                    let sourceNodeIdIndex;
                    if (this.nodes[beforeId]) {
                        sourceNodeKey = beforeId;
                    }
                    for (let nodeKey in this.nodes) {
                        if (this.nodes.hasOwnProperty(nodeKey)) {
                            sourceNodeIdIndex = this.findNodeId(nodeKey, beforeId);
                            break;
                        }
                    }
                    let targetId = beforeId;
                    let targetRootIndex = this.findRootId(targetId);
                    let targetNodeKey;
                    let targetNodeIdIndex;
                    if (this.nodes[beforeId]) {
                        targetNodeKey = beforeId;
                    }
                    for (let nodeKey in this.nodes) {
                        if (this.nodes.hasOwnProperty(nodeKey)) {
                            targetNodeIdIndex = this.findNodeId(nodeKey, beforeId);
                            break;
                        }
                    }
                    if (sourceRootIndex > -1) {
                        if (targetRootIndex > -1) {
                            this.rootDelete(sourceRootIndex);
                            if (targetRootIndex > sourceRootIndex) {
                                targetRootIndex--;
                            }
                            else {
                            }
                            switch (direction) {
                                case Direction.BEFORE:
                                    this.insertIdIntoRoot(sourceId, targetRootIndex);
                                    break;
                                case Direction.AFTER:
                                    this.insertIdIntoRoot(sourceId, targetRootIndex + 1);
                                    break;
                                case Direction.INSIDE_AT_START:
                                    this.nodeInsertAtStart(targetId, sourceId);
                                    break;
                                case Direction.INSIDE_AT_END:
                                    this.nodeInsertAtEnd(targetId, sourceId);
                                    break;
                            }
                        }
                        else {
                            this.rootDelete(sourceRootIndex);
                            for (let nodeKey in this.nodes) {
                                if (this.nodes.hasOwnProperty(nodeKey)) {
                                    let index = this.findNodeId(nodeKey, targetId);
                                    if (index > -1) {
                                        switch (direction) {
                                            case Direction.BEFORE:
                                                this.insertIdIntoNode(nodeKey, sourceId, index);
                                                break;
                                            case Direction.AFTER:
                                                this.insertIdIntoNode(nodeKey, sourceId, index + 1);
                                                break;
                                            case Direction.INSIDE_AT_START:
                                                this.nodeInsertAtStart(targetId, sourceId);
                                                break;
                                            case Direction.INSIDE_AT_END:
                                                this.nodeInsertAtEnd(targetId, sourceId);
                                                break;
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        if (targetRootIndex > -1) {
                            for (let nodeKey in this.nodes) {
                                if (this.nodes.hasOwnProperty(nodeKey)) {
                                    let index = this.findNodeId(nodeKey, sourceId);
                                    if (index > -1) {
                                        this.nodeDeleteAtIndex(nodeKey, index);
                                        break;
                                    }
                                }
                            }
                            switch (direction) {
                                case Direction.BEFORE:
                                    this.insertIdIntoRoot(sourceId, targetRootIndex);
                                    break;
                                case Direction.AFTER:
                                    this.insertIdIntoRoot(sourceId, targetRootIndex + 1);
                                    break;
                                case Direction.INSIDE_AT_START:
                                    this.nodeInsertAtStart(targetId, sourceId);
                                    break;
                                case Direction.INSIDE_AT_END:
                                    this.nodeInsertAtEnd(targetId, sourceId);
                                    break;
                            }
                        }
                        else {
                            for (let nodeKey in this.nodes) {
                                if (this.nodes.hasOwnProperty(nodeKey)) {
                                    let index = this.findNodeId(nodeKey, sourceId);
                                    if (index > -1) {
                                        this.nodeDeleteAtIndex(nodeKey, index);
                                        break;
                                    }
                                }
                            }
                            for (let nodeKey in this.nodes) {
                                if (this.nodes.hasOwnProperty(nodeKey)) {
                                    let index = this.findNodeId(nodeKey, targetId);
                                    if (index > -1) {
                                        switch (direction) {
                                            case Direction.BEFORE:
                                                this.insertIdIntoNode(nodeKey, sourceId, index);
                                                break;
                                            case Direction.AFTER:
                                                this.insertIdIntoNode(nodeKey, sourceId, index + 1);
                                                break;
                                            case Direction.INSIDE_AT_START:
                                                this.nodeInsertAtStart(targetId, sourceId);
                                                break;
                                            case Direction.INSIDE_AT_END:
                                                this.nodeInsertAtEnd(targetId, sourceId);
                                                break;
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                swapArrayElements(arr, indexA, indexB) {
                    var temp = arr[indexA];
                    arr[indexA] = arr[indexB];
                    arr[indexB] = temp;
                    return arr;
                }
                ;
                rootDeleteId(id) {
                    let index = this.findRootId(id);
                    if (index > -1) {
                        this.rootDelete(index);
                    }
                }
                nodeAndSubNodesDelete(nodeKey) {
                    let toDeleteLater = [];
                    for (let i = 0; i < this.nodes[nodeKey].length; i++) {
                        let id = this.nodes[nodeKey][i];
                        this.nodeAndSubNodesDelete(id);
                        toDeleteLater.push(nodeKey);
                    }
                    this.nodeDelete(nodeKey);
                    for (let i = 0; i < toDeleteLater.length; i++) {
                        this.nodeDelete(toDeleteLater[i]);
                    }
                }
                nodeRefrencesDelete(id) {
                    for (let nodeKey in this.nodes) {
                        if (this.nodes.hasOwnProperty(nodeKey)) {
                            for (let i = 0; i < this.nodes[nodeKey].length; i++) {
                                let targetId = this.nodes[nodeKey][i];
                                if (targetId === id) {
                                    this.nodeDeleteAtIndex(nodeKey, i);
                                }
                            }
                        }
                    }
                }
                nodeDelete(nodeKey) {
                    delete this.nodes[nodeKey];
                }
                findRootId(id) {
                    return this.rootIds.indexOf(id);
                }
                findNodeId(nodeKey, id) {
                    return this.nodes[nodeKey].indexOf(id);
                }
                findNode(nodeKey) {
                    return this.nodes[nodeKey];
                }
                nodeInsertAtStart(nodeKey, id) {
                    this.nodes[nodeKey].unshift(id);
                }
                nodeInsertAtEnd(nodeKey, id) {
                    this.nodes[nodeKey].push(id);
                }
                rootDelete(index) {
                    this.rootIds.splice(index, 1);
                }
                nodeDeleteAtIndex(nodeKey, index) {
                    this.nodes[nodeKey].splice(index, 1);
                }
                rootInsertAtStart(id) {
                    this.rootIds.unshift(id);
                }
                rootInsertAtEnd(id) {
                    this.rootIds.push(id);
                }
            };
            exports_22("default", MultiRootTree);
        }
    };
});
System.register("libs/typescript-collections/src/lib/index", ["libs/typescript-collections/src/lib/arrays", "libs/typescript-collections/src/lib/Bag", "libs/typescript-collections/src/lib/BSTree", "libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/Heap", "libs/typescript-collections/src/lib/LinkedDictionary", "libs/typescript-collections/src/lib/LinkedList", "libs/typescript-collections/src/lib/MultiDictionary", "libs/typescript-collections/src/lib/FactoryDictionary", "libs/typescript-collections/src/lib/Queue", "libs/typescript-collections/src/lib/PriorityQueue", "libs/typescript-collections/src/lib/Set", "libs/typescript-collections/src/lib/Stack", "libs/typescript-collections/src/lib/MultiRootTree", "libs/typescript-collections/src/lib/util"], function (exports_23, context_23) {
    "use strict";
    var _arrays, arrays, _util, util;
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [
            function (_arrays_1) {
                _arrays = _arrays_1;
            },
            function (Bag_1_1) {
                exports_23({
                    "Bag": Bag_1_1["default"]
                });
            },
            function (BSTree_1_1) {
                exports_23({
                    "BSTree": BSTree_1_1["default"]
                });
            },
            function (Dictionary_6_1) {
                exports_23({
                    "Dictionary": Dictionary_6_1["default"]
                });
            },
            function (Heap_2_1) {
                exports_23({
                    "Heap": Heap_2_1["default"]
                });
            },
            function (LinkedDictionary_1_1) {
                exports_23({
                    "LinkedDictionary": LinkedDictionary_1_1["default"]
                });
            },
            function (LinkedList_3_1) {
                exports_23({
                    "LinkedList": LinkedList_3_1["default"]
                });
            },
            function (MultiDictionary_1_1) {
                exports_23({
                    "MultiDictionary": MultiDictionary_1_1["default"]
                });
            },
            function (FactoryDictionary_1_1) {
                exports_23({
                    "FactoryDictionary": FactoryDictionary_1_1["default"]
                });
                exports_23({
                    "DefaultDictionary": FactoryDictionary_1_1["default"]
                });
            },
            function (Queue_2_1) {
                exports_23({
                    "Queue": Queue_2_1["default"]
                });
            },
            function (PriorityQueue_1_1) {
                exports_23({
                    "PriorityQueue": PriorityQueue_1_1["default"]
                });
            },
            function (Set_2_1) {
                exports_23({
                    "Set": Set_2_1["default"]
                });
            },
            function (Stack_1_1) {
                exports_23({
                    "Stack": Stack_1_1["default"]
                });
            },
            function (MultiRootTree_1_1) {
                exports_23({
                    "MultiRootTree": MultiRootTree_1_1["default"]
                });
            },
            function (_util_1) {
                _util = _util_1;
            }
        ],
        execute: function () {
            exports_23("arrays", arrays = _arrays);
            exports_23("util", util = _util);
        }
    };
});
System.register("Xaml/jupiter/controls/AnimationCollection", ["libs/typescript-collections/src/lib/index"], function (exports_24, context_24) {
    "use strict";
    var lib_1, AnimationCollection;
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [
            function (lib_1_1) {
                lib_1 = lib_1_1;
            }
        ],
        execute: function () {
            AnimationCollection = class AnimationCollection extends lib_1.LinkedList {
            };
            exports_24("AnimationCollection", AnimationCollection);
        }
    };
});
System.register("Xaml/jupiter/UIElementCollection", ["libs/typescript-collections/src/lib/index"], function (exports_25, context_25) {
    "use strict";
    var index_1, UIElementCollection;
    var __moduleName = context_25 && context_25.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            UIElementCollection = class UIElementCollection extends index_1.LinkedDictionary {
            };
            exports_25("UIElementCollection", UIElementCollection);
        }
    };
});
System.register("Xaml/jupiter/controls/IAnimationsElement", [], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Xaml/jupiter/IAnimatableElement", [], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Xaml/jupiter/AnimatableUIElement", ["Xaml/jupiter/Core"], function (exports_28, context_28) {
    "use strict";
    var Core_2, AnimatableUIElement;
    var __moduleName = context_28 && context_28.id;
    return {
        setters: [
            function (Core_2_1) {
                Core_2 = Core_2_1;
            }
        ],
        execute: function () {
            AnimatableUIElement = class AnimatableUIElement extends Core_2.UIElement {
                constructor() {
                    super();
                }
                get Animations() { return this._animations; }
                set Animations(value) { this._animations = value; }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                }
                InitializeAnimation() {
                    if (this.Animations && this.Animations.Animations)
                        this.Animations.Animations.forEach((animation) => {
                            animation.Initialize();
                        });
                }
                StartAnimation() { }
                StopAnimation() { }
            };
            exports_28("AnimatableUIElement", AnimatableUIElement);
        }
    };
});
System.register("Xaml/jupiter/IChildrensElement", [], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Xaml/jupiter/IFrameworkElement", [], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Xaml/jupiter/IScript", [], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Xaml/jupiter/Core", ["Xaml/jupiter/AnimatableUIElement", "Xaml/jupiter/DependencyObject", "Xaml/jupiter/FrameworkElement", "Xaml/jupiter/UIElement", "Xaml/jupiter/UIElementCollection"], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_32(exports);
    }
    return {
        setters: [
            function (AnimatableUIElement_1_1) {
                exportStar_1(AnimatableUIElement_1_1);
            },
            function (DependencyObject_1_1) {
                exportStar_1(DependencyObject_1_1);
            },
            function (FrameworkElement_1_1) {
                exportStar_1(FrameworkElement_1_1);
            },
            function (UIElement_2_1) {
                exportStar_1(UIElement_2_1);
            },
            function (UIElementCollection_1_1) {
                exportStar_1(UIElementCollection_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("Xaml/jupiter/controls/Animations", ["Xaml/jupiter/UIElement", "Xaml/jupiter/controls/Core"], function (exports_33, context_33) {
    "use strict";
    var UIElement_3, Core_3, Animations;
    var __moduleName = context_33 && context_33.id;
    return {
        setters: [
            function (UIElement_3_1) {
                UIElement_3 = UIElement_3_1;
            },
            function (Core_3_1) {
                Core_3 = Core_3_1;
            }
        ],
        execute: function () {
            Animations = class Animations extends UIElement_3.UIElement {
                constructor() {
                    super();
                    this._animations = new Core_3.AnimationCollection();
                }
                get Animations() { return this._animations; }
                set Animations(value) { this._animations = value; }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.Animations = this;
                        return true;
                    }
                    return false;
                }
            };
            exports_33("Animations", Animations);
        }
    };
});
System.register("Xaml/jupiter/controls/Background", ["Xaml/jupiter/Core"], function (exports_34, context_34) {
    "use strict";
    var Core_4, Background;
    var __moduleName = context_34 && context_34.id;
    return {
        setters: [
            function (Core_4_1) {
                Core_4 = Core_4_1;
            }
        ],
        execute: function () {
            Background = class Background extends Core_4.UIElement {
                constructor() {
                    super(...arguments);
                    this._imgUrl = null;
                }
                get SceneName() { return this._sceneName; }
                get ImageUrl() { return this._imgUrl; }
                get TextureName() { return this._textureName; }
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    this.Ctrl = new BABYLON.Layer(this.Name, this._imgUrl, scene.Ctrl);
                    if (this.TextureName) {
                        let texture = this.VT.Get(this.TextureName);
                        this.Ctrl.texture = texture.Ctrl;
                    }
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                    }
                    catch (e) { }
                    try {
                        this._imgUrl = node.attributes["ImgUrl"].value;
                    }
                    catch (e) { }
                    try {
                        this._textureName = node.attributes["Texture"].value;
                    }
                    catch (e) { }
                }
            };
            exports_34("Background", Background);
        }
    };
});
System.register("Xaml/behaviors/MeshNormalLines", [], function (exports_35, context_35) {
    "use strict";
    var MeshNormalLines;
    var __moduleName = context_35 && context_35.id;
    return {
        setters: [],
        execute: function () {
            MeshNormalLines = class MeshNormalLines {
                constructor() {
                }
                static Install(scene, mesh) {
                    return this.ShowNormals(mesh, 0.25, new BABYLON.Color3(1, 0, 0), scene.Ctrl);
                }
                static ShowNormals(mesh, size, color, sc) {
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
            exports_35("MeshNormalLines", MeshNormalLines);
        }
    };
});
System.register("Xaml/jupiter/controls/KeyFrame", ["Xaml/jupiter/Core"], function (exports_36, context_36) {
    "use strict";
    var Core_5, KeyFrame;
    var __moduleName = context_36 && context_36.id;
    return {
        setters: [
            function (Core_5_1) {
                Core_5 = Core_5_1;
            }
        ],
        execute: function () {
            KeyFrame = class KeyFrame extends Core_5.UIElement {
                constructor() {
                    super();
                }
                get Frame() { return this._frame; }
                get Value() { return this._value; }
                set Frame(value) { this._frame = value; }
                set Value(value) { this._value = value; }
                LoadFromNode(node) {
                    this.UpdatePropertyByNodeAndFunction(node, "Frame", "Frame", parseInt);
                    this.UpdatePropertyByNodeAndFunction(node, "Value", "Value", parseFloat);
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.KeyFrames.add(this);
                        return true;
                    }
                    return false;
                }
            };
            exports_36("KeyFrame", KeyFrame);
        }
    };
});
System.register("Xaml/jupiter/controls/KeyFrames", ["Xaml/jupiter/UIElement", "Xaml/jupiter/controls/Core"], function (exports_37, context_37) {
    "use strict";
    var UIElement_4, Core_6, KeyFrames;
    var __moduleName = context_37 && context_37.id;
    return {
        setters: [
            function (UIElement_4_1) {
                UIElement_4 = UIElement_4_1;
            },
            function (Core_6_1) {
                Core_6 = Core_6_1;
            }
        ],
        execute: function () {
            KeyFrames = class KeyFrames extends UIElement_4.UIElement {
                constructor() {
                    super();
                    this._keyFrames = new Core_6.KeyFrameCollection();
                }
                get KeyFrames() { return this._keyFrames; }
                set KeyFrames(value) { this._keyFrames = value; }
                LoadFromNode(node) {
                }
                GetArray() {
                    var keys = [];
                    this._keyFrames.forEach((kf) => {
                        keys.push({
                            frame: kf.Frame,
                            value: kf.Value
                        });
                    });
                    return keys;
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.KeyFrames = this;
                        return true;
                    }
                    return false;
                }
            };
            exports_37("KeyFrames", KeyFrames);
        }
    };
});
System.register("Xaml/jupiter/controls/Plane", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_38, context_38) {
    "use strict";
    var UIElement_5, Plane;
    var __moduleName = context_38 && context_38.id;
    return {
        setters: [
            function (UIElement_5_1) {
                UIElement_5 = UIElement_5_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            Plane = class Plane extends UIElement_5.UIElement {
                constructor() {
                    super();
                }
                get Size() { return this._size; }
                get MeshName() { return this._meshName; }
                get SceneName() { return this._sceneName; }
                set Size(value) { this._size = value; }
                set MeshName(value) { this._meshName = value; }
                set SceneName(value) { this._sceneName = value; }
                Initialize() {
                    if (this.HasValue(this.SceneName)) {
                        let scene = this.VT.FindByName(this.SceneName);
                        this.Ctrl = BABYLON.Mesh.CreatePlane(this.Name, this.Size, scene.Ctrl);
                        this.Ctrl.Size = this.Size;
                        this.Ctrl.position = this.Position;
                        if (this.HasValue(this.MeshName)) {
                            let mesh = this.VT.FindByName(this.MeshName);
                            this.Ctrl.parent = mesh.Ctrl;
                        }
                    }
                    this.ChildrenGUIs.forEach((key, child) => {
                        child.Initialize();
                    });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNodeAndFunction(node, "Size", "Size", parseFloat);
                    this.UpdatePropertyByNode(node, "Mesh", "MeshName");
                    this.UpdatePropertyByNode(node, "Scene", "SceneName");
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_38("Plane", Plane);
        }
    };
});
System.register("Xaml/jupiter/controls/Texture", ["Xaml/jupiter/Core", "babylonjs-gui", "Xaml/jupiter/controls/Plane"], function (exports_39, context_39) {
    "use strict";
    var Core_7, Plane_1, Texture;
    var __moduleName = context_39 && context_39.id;
    return {
        setters: [
            function (Core_7_1) {
                Core_7 = Core_7_1;
            },
            function (_2) {
            },
            function (Plane_1_1) {
                Plane_1 = Plane_1_1;
            }
        ],
        execute: function () {
            Texture = class Texture extends Core_7.UIElement {
                get SceneName() { return this._sceneName; }
                get RootUrl() { return this._rootUrl; }
                get Type() { return this._type; }
                get CoordinatesMode() { return this._coordinatesMode; }
                get Options() { return this._options; }
                get GeneratingMipMaps() { return this._generatingMipMaps; }
                get IdealHeight() { return this._idealHeight; }
                get Size() { return this._size; }
                get Level() { return this._level; }
                get MirrorPlane() { return this._mirrorPlane; }
                set SceneName(value) { this._sceneName = value; }
                set RootUrl(value) { this._rootUrl = value; }
                set Type(value) { this._type = value; }
                set CoordinatesMode(value) { this._coordinatesMode = value; }
                set Options(value) { this._options = value; }
                set GeneratingMipMaps(value) { this._generatingMipMaps = value; }
                set IdealHeight(value) { this._idealHeight = value; }
                set Size(value) { this._size = value; }
                set Level(value) { this._level = value; }
                set MirrorPlane(value) { this._mirrorPlane = value; }
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    this._scene = scene;
                    this.CreateCtrl();
                    this.RefreshCtrlProperty("CoordinatesMode");
                    this.ChildrenGUIs.forEach((key, child) => {
                        child.Initialize();
                    });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Scene", "SceneName");
                    this.UpdatePropertyByNode(node, "RootUrl", "RootUrl");
                    this.UpdatePropertyByNode(node, "Type", "Type");
                    this.UpdatePropertyByNode(node, "Options", "Options");
                    this.UpdatePropertyByNodeAndFunction(node, "CoordinatesMode", "CoordinatesMode", this.ConvertToBabylonObject);
                    this.UpdatePropertyByNodeAndFunction(node, "GeneratingMipMaps", "GeneratingMipMaps", this.ConvertToBoolean);
                    this.UpdatePropertyByNodeAndFunction(node, "IdealHeight", "IdealHeight", parseInt);
                    this.UpdatePropertyByNodeAndFunction(node, "Size", "Size", parseInt);
                    this.UpdatePropertyByNodeAndFunction(node, "Level", "Level", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "MirrorPlane", "MirrorPlane", this.ConvertToNewBabylonObject);
                }
                SetValue(propertyName, value) {
                    switch (propertyName) {
                        case "IdealHeight":
                        case "Size":
                            this.UpdatePropertyByValue(propertyName, value, parseInt);
                            break;
                        case "GeneratingMipMaps":
                            this.UpdatePropertyByValue(propertyName, value, this.ConvertToBoolean);
                            break;
                        case "Level":
                            this.UpdatePropertyByValue(propertyName, value, parseFloat);
                            break;
                        case "MirrorPlane":
                            this.UpdatePropertyByValue(propertyName, value, this.ConvertToNewBabylonObject);
                            break;
                        case "Type":
                            this.UpdatePropertyByValue(propertyName, value, null);
                            break;
                        default: return;
                    }
                    this.RefreshCtrlProperty(propertyName);
                }
                RefreshCtrlProperty(propertyName) {
                    switch (propertyName) {
                        case "IdealHeight": break;
                        case "Type":
                            if (this.HasValue(this.Type))
                                this.CreateCtrl();
                            break;
                        case "Size":
                            if (this.HasValue(this.Size))
                                this.CreateCtrl();
                            break;
                        case "MirrorPlane":
                            if (this.HasValue(this.MirrorPlane))
                                this.GetReflectionTexture().mirrorPlane = this.MirrorPlane;
                            break;
                        case "Level":
                            if (this.HasValue(this.Level))
                                this.GetReflectionTexture().level = this.Level;
                            break;
                        case "GeneratingMipMaps":
                            if (this.HasValue(this.GeneratingMipMaps))
                                this.CreateCtrl();
                            break;
                        case "CoordinatesMode":
                            if (this.HasValue(this.CoordinatesMode))
                                this.Ctrl.coordinatesMode = this.CoordinatesMode;
                            break;
                    }
                }
                ClearCtrl() {
                    if (!this.HasValue(this.Ctrl))
                        return;
                    this.bjsCtrl.dispose();
                    this.Ctrl = null;
                }
                CreateCtrl() {
                    this.ClearCtrl();
                    if (this._type === "CubeTexture") {
                        if (!this.HasValue(this._scene))
                            return;
                        this.Ctrl = new BABYLON.CubeTexture(this.RootUrl, this._scene.Ctrl);
                    }
                    else if (this._type === "DynamicTexture") {
                        if (!this.HasValue(this._scene))
                            return;
                        this.Ctrl = new BABYLON.DynamicTexture(this.Name, 512, this._scene.Ctrl, this.GeneratingMipMaps);
                    }
                    else if (this._type === "Texture") {
                        if (!this.HasValue(this._scene))
                            return;
                        this.Ctrl = new BABYLON.Texture(this.RootUrl, this._scene.Ctrl);
                    }
                    else if (this._type === "AdvancedDynamicTexture") {
                        if (this.Parent instanceof Plane_1.Plane) {
                            this.Ctrl = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(this.Parent.Ctrl);
                        }
                        else {
                            this.Ctrl = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(this.Name);
                        }
                    }
                    else if (this._type === "MirrorTexture") {
                        if (!this.HasValue(this._scene))
                            return;
                        let reflectionTexture = new BABYLON.MirrorTexture(this.Name, this.Size, this._scene.Ctrl, this.GeneratingMipMaps);
                        reflectionTexture.mirrorPlane = this.MirrorPlane;
                        reflectionTexture.level = this.Level;
                        this.Ctrl = reflectionTexture;
                    }
                }
                GetReflectionTexture() {
                    return this.Ctrl;
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_39("Texture", Texture);
        }
    };
});
System.register("Xaml/jupiter/controls/Box", ["Xaml/behaviors/MeshNormalLines", "Xaml/jupiter/AnimatableUIElement"], function (exports_40, context_40) {
    "use strict";
    var MeshNormalLines_1, AnimatableUIElement_2, Box;
    var __moduleName = context_40 && context_40.id;
    return {
        setters: [
            function (MeshNormalLines_1_1) {
                MeshNormalLines_1 = MeshNormalLines_1_1;
            },
            function (AnimatableUIElement_2_1) {
                AnimatableUIElement_2 = AnimatableUIElement_2_1;
            }
        ],
        execute: function () {
            Box = class Box extends AnimatableUIElement_2.AnimatableUIElement {
                get SceneName() { return this._sceneName; }
                get MaterialName() { return this._materialName; }
                get AddToRenderList() { return this._addToRenderList; }
                get ShowNormalLines() { return this._showNormalLines; }
                get Width() { return this._width; }
                get InfiniteDistance() { return this._infiniteDistance; }
                get Scaling() { return this._scaling; }
                get RotationQuaternion() { return this._rotationQuaternion; }
                set SceneName(value) { this._sceneName = value; }
                set MaterialName(value) { this._materialName = value; }
                set AddToRenderList(value) { this._addToRenderList = value; }
                set ShowNormalLines(value) { this._showNormalLines = value; }
                set Width(value) { this._width = value; }
                set InfiniteDistance(value) { this._infiniteDistance = value; }
                set Scaling(value) { this._scaling = value; }
                set RotationQuaternion(value) { this._rotationQuaternion = value; }
                Initialize() {
                    this._scene = this.VT.Get(this.SceneName);
                    this.Ctrl = BABYLON.Mesh.CreateBox(this.Name, this.Width, this._scene.Ctrl);
                    if (this.HasValue(this.MaterialName)) {
                        let material = this.VT.Get(this.MaterialName);
                        if (material && material.Ctrl)
                            this.Ctrl.material = material.Ctrl;
                    }
                    if (this.HasValue(this.Position))
                        this.Ctrl.position = this.Position;
                    if (this.HasValue(this.InfiniteDistance))
                        this.Ctrl.infiniteDistance = this.InfiniteDistance;
                    if (this.HasValue(this.ShowNormalLines) && this.ShowNormalLines)
                        MeshNormalLines_1.MeshNormalLines.Install(this._scene, this.Ctrl);
                    if (this.HasValue(this.Scaling))
                        this.Ctrl.scaling = this.Scaling;
                    if (this.HasValue(this.IsVisible))
                        this.Ctrl.isVisible = this.IsVisible;
                    if (this.HasValue(this.AddToRenderList) && this.Ctrl !== undefined) {
                        let tex = this.VT.FindByName(this.AddToRenderList);
                        tex.Ctrl.renderList.push(this.Ctrl);
                    }
                    if (this.HasValue(this.Enabled))
                        this.Ctrl.setEnabled(this.Enabled);
                    if (this.HasValue(this.RotationQuaternion))
                        this.Ctrl.rotationQuaternion = this.RotationQuaternion;
                    this.InitializeAnimation();
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Scene", "SceneName");
                    this.UpdatePropertyByNode(node, "Material", "MaterialName");
                    this.UpdatePropertyByNodeAndFunction(node, "ShowNormalLines", "ShowNormalLines", this.ConvertToBoolean);
                    this.UpdatePropertyByNode(node, "Width", "Width");
                    this.UpdatePropertyByNodeAndFunction(node, "InfiniteDistance", "InfiniteDistance", this.ConvertToBoolean);
                    this.UpdatePropertyByNodeAndFunction(node, "Scaling", "Scaling", this.ConvertToNewBabylonObject);
                    this.UpdatePropertyByNode(node, "AddToRenderList", "AddToRenderList");
                    this.UpdatePropertyByNodeAndFunction(node, "RotationQuaternion", "RotationQuaternion", this.ConvertToNewBabylonObject);
                }
                StartAnimation() {
                    if (this.Animations && this.Animations.Animations)
                        this.Animations.Animations.forEach((animation) => {
                            this._scene.Ctrl.beginAnimation(this.Ctrl, 1, 100, true);
                        });
                }
                StopAnimation() {
                    if (this.Animations && this.Animations.Animations)
                        this.Animations.Animations.forEach((animation) => {
                            this._scene.Ctrl.stopAnimation(this.Ctrl);
                        });
                }
            };
            exports_40("Box", Box);
        }
    };
});
System.register("Xaml/jupiter/controls/Camera", ["Xaml/jupiter/UIElement", "Xaml/Core"], function (exports_41, context_41) {
    "use strict";
    var UIElement_6, Core_8, Camera;
    var __moduleName = context_41 && context_41.id;
    return {
        setters: [
            function (UIElement_6_1) {
                UIElement_6 = UIElement_6_1;
            },
            function (Core_8_1) {
                Core_8 = Core_8_1;
            }
        ],
        execute: function () {
            Camera = class Camera extends UIElement_6.UIElement {
                get SceneName() { return this._sceneName; }
                get Target() { return this._target; }
                get Type() { return this._type; }
                get Alpha() { return this._alpha; }
                get Beta() { return this._beta; }
                get Radius() { return this._radius; }
                get LowerBetaLimit() { return this._lowerBetaLimit; }
                get UpperBetaLimit() { return this._upperBetaLimit; }
                get LowerRadiusLimit() { return this._lowerRadiusLimit; }
                get FOV() { return this._fov; }
                get MinZ() { return this._minz; }
                get MaxZ() { return this._maxz; }
                get PanningSensibility() { return this._panningSensibility; }
                set SceneName(value) { this._sceneName = value; }
                set Target(value) { this._target = value; }
                set Type(value) { this._type = value; }
                set Alpha(value) { this._alpha = value; }
                set Beta(value) { this._beta = value; }
                set Radius(value) { this._radius = value; }
                set LowerBetaLimit(value) { this._lowerBetaLimit = value; }
                set UpperBetaLimit(value) { this._upperBetaLimit = value; }
                set LowerRadiusLimit(value) { this._lowerRadiusLimit = value; }
                set FOV(value) { this._fov = value; }
                set MinZ(value) { this._minz = value; }
                set MaxZ(value) { this._maxz = value; }
                set PanningSensibility(value) { this._panningSensibility = value; }
                Initialize() {
                    let canvas = Core_8.DIContainer.get("rootCanvas");
                    let scene = this.VT.Get(this.SceneName);
                    if (this.Type === "FreeCamera") {
                        this.Ctrl = new BABYLON.FreeCamera(this.Name, this.Position, scene.Ctrl);
                        this.RefreshCtrlProperty("Target");
                        this.RefreshCtrlProperty("FOV");
                        this.RefreshCtrlProperty("MinZ");
                        this.RefreshCtrlProperty("MaxZ");
                        this.Ctrl.attachControl(canvas, true);
                    }
                    else if (this.Type === "UniversalCamera") {
                        this.Ctrl = new BABYLON.UniversalCamera(this.Name, this.Position, scene.Ctrl);
                        this.Ctrl.setTarget(this.Target);
                        this.Ctrl.attachControl(canvas, true);
                    }
                    else if (this.Type === "ArcRotateCamera") {
                        this.Ctrl = new BABYLON.ArcRotateCamera(this.Name, this.Alpha, this.Beta, this.Radius, this.Target, scene.Ctrl);
                        this.RefreshCtrlProperty("LowerBetaLimit");
                        this.RefreshCtrlProperty("UpperBetaLimit");
                        this.RefreshCtrlProperty("LowerRadiusLimit");
                        this.RefreshCtrlProperty("PanningSensibility");
                        this.RefreshCtrlProperty("Position");
                        this.Ctrl.attachControl(canvas, true, true);
                    }
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Scene", "SceneName");
                    this.UpdatePropertyByNodeAndFunction(node, "Target", "Target", this.ConvertToNewBabylonObject);
                    this.UpdatePropertyByNode(node, "Type", "Type");
                    this.UpdatePropertyByNodeAndFunction(node, "Alpha", "Alpha", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "AlphaCalculated", "Alpha", eval);
                    this.UpdatePropertyByNodeAndFunction(node, "Beta", "Beta", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "BetaCalculated", "Beta", eval);
                    this.UpdatePropertyByNodeAndFunction(node, "Radius", "Radius", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "LowerBetaLimit", "LowerBetaLimit", eval);
                    this.UpdatePropertyByNodeAndFunction(node, "UpperBetaLimit", "UpperBetaLimit", eval);
                    this.UpdatePropertyByNodeAndFunction(node, "LowerRadiusLimit", "LowerRadiusLimit", eval);
                    this.UpdatePropertyByNodeAndFunction(node, "FOV", "FOV", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "MinZ", "MinZ", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "MaxZ", "MaxZ", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "PanningSensibility", "PanningSensibility", parseFloat);
                }
                SetValue(propertyName, value) {
                    switch (propertyName) {
                        case "Target":
                            this.UpdatePropertyByValue(propertyName, value, this.ConvertToNewBabylonObject);
                            break;
                        case "FOV":
                            this.UpdatePropertyByValue(propertyName, value, parseFloat);
                            break;
                        case "MinZ":
                            this.UpdatePropertyByValue(propertyName, value, parseFloat);
                            break;
                        case "MaxZ":
                            this.UpdatePropertyByValue(propertyName, value, parseFloat);
                            break;
                        case "LowerBetaLimit":
                            this.UpdatePropertyByValue(propertyName, value, eval);
                            break;
                        case "UpperBetaLimit":
                            this.UpdatePropertyByValue(propertyName, value, eval);
                            break;
                        case "LowerRadiusLimit":
                            this.UpdatePropertyByValue(propertyName, value, eval);
                            break;
                        case "PanningSensibility":
                            this.UpdatePropertyByValue(propertyName, value, parseFloat);
                            break;
                        case "Position":
                            this.UpdatePropertyByValue(propertyName, value, null);
                            break;
                    }
                    this.RefreshCtrlProperty(propertyName);
                }
                RefreshCtrlProperty(propertyName) {
                    switch (propertyName) {
                        case "Target":
                            if (this.HasValue(this.Target))
                                this.GetFreeCamera(this.Ctrl).setTarget(this.Target);
                            break;
                        case "FOV":
                            if (this.HasValue(this.FOV))
                                this.GetFreeCamera(this.Ctrl).fov = this.FOV;
                            break;
                        case "MinZ":
                            if (this.HasValue(this.MinZ))
                                this.GetFreeCamera(this.Ctrl).minZ = this.MinZ;
                            break;
                        case "MaxZ":
                            if (this.HasValue(this.MaxZ))
                                this.GetFreeCamera(this.Ctrl).maxZ = this.MaxZ;
                            break;
                        case "LowerBetaLimit":
                            if (this.HasValue(this.LowerBetaLimit))
                                this.GetArcCamera().lowerBetaLimit = this.LowerBetaLimit;
                            break;
                        case "UpperBetaLimit":
                            if (this.HasValue(this.UpperBetaLimit))
                                this.GetArcCamera().upperBetaLimit = this.UpperBetaLimit;
                            break;
                        case "LowerRadiusLimit":
                            if (this.HasValue(this.LowerRadiusLimit))
                                this.GetArcCamera().lowerRadiusLimit = this.LowerRadiusLimit;
                            break;
                        case "PanningSensibility":
                            if (this.HasValue(this.PanningSensibility))
                                this.GetArcCamera().panningSensibility = this.PanningSensibility;
                            break;
                        case "Position":
                            if (this.HasValue(this.Position))
                                this.GetArcCamera().position = this.Position;
                            break;
                    }
                }
                GetFreeCamera(camera) { return camera; }
                GetArcCamera() { return this.Ctrl; }
            };
            exports_41("Camera", Camera);
        }
    };
});
System.register("Xaml/jupiter/controls/Disc", ["Xaml/behaviors/MeshNormalLines", "Xaml/jupiter/AnimatableUIElement"], function (exports_42, context_42) {
    "use strict";
    var MeshNormalLines_2, AnimatableUIElement_3, Disc;
    var __moduleName = context_42 && context_42.id;
    return {
        setters: [
            function (MeshNormalLines_2_1) {
                MeshNormalLines_2 = MeshNormalLines_2_1;
            },
            function (AnimatableUIElement_3_1) {
                AnimatableUIElement_3 = AnimatableUIElement_3_1;
            }
        ],
        execute: function () {
            Disc = class Disc extends AnimatableUIElement_3.AnimatableUIElement {
                get SceneName() { return this._sceneName; }
                get MaterialName() { return this._materialName; }
                get ShowNormalLines() { return this._showNormalLines; }
                get Radius() { return this._radius; }
                get Tessellation() { return this._tessellation; }
                get Updateable() { return this._updatable; }
                get SideOrientation() { return this._sideOrientation; }
                set SceneName(value) { this._sceneName = value; }
                set MaterialName(value) { this._materialName = value; }
                set ShowNormalLines(value) { this._showNormalLines = value; }
                set Radius(value) { this._radius = value; }
                set Tessellation(value) { this._tessellation = value; }
                set Updateable(value) { this._updatable = value; }
                set SideOrientation(value) { this._sideOrientation = value; }
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    this._scene = scene;
                    this.Ctrl = BABYLON.MeshBuilder.CreateDisc(this.Name, { tessellation: this.Tessellation, sideOrientation: this.SideOrientation }, scene.Ctrl);
                    if (this.HasValue(this.MaterialName)) {
                        let material = this.VT.Get(this.MaterialName);
                        if (material.Ctrl)
                            this.Ctrl.material = material.Ctrl;
                    }
                    if (this.Ctrl && this.HasValue(this.ShowNormalLines) && this.ShowNormalLines)
                        MeshNormalLines_2.MeshNormalLines.Install(scene, this.Ctrl);
                    this.InitializeAnimation();
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Scene", "SceneName");
                    this.UpdatePropertyByNode(node, "Material", "MaterialName");
                    this.UpdatePropertyByNodeAndFunction(node, "ShowNormalLines", "ShowNormalLines", this.ConvertToBoolean);
                    this.UpdatePropertyByNodeAndFunction(node, "Radius", "Radius", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "Tessellation", "Tessellation", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "SideOrientation", "SideOrientation", eval);
                    this.UpdatePropertyByNodeAndFunction(node, "Updateable", "Updateable", this.ConvertToBoolean);
                }
                StartAnimation() {
                    if (this.Animations && this.Animations.Animations)
                        this.Animations.Animations.forEach((animation) => {
                            this._scene.Ctrl.beginAnimation(this.Ctrl, 1, 100, true);
                        });
                }
                StopAnimation() {
                    if (this.Animations && this.Animations.Animations)
                        this.Animations.Animations.forEach((animation) => {
                            this._scene.Ctrl.stopAnimation(this.Ctrl);
                        });
                }
            };
            exports_42("Disc", Disc);
        }
    };
});
System.register("Xaml/jupiter/controls/Effect", ["Xaml/jupiter/UIElement", "Xaml/Core"], function (exports_43, context_43) {
    "use strict";
    var UIElement_7, Core_9, Effect;
    var __moduleName = context_43 && context_43.id;
    return {
        setters: [
            function (UIElement_7_1) {
                UIElement_7 = UIElement_7_1;
            },
            function (Core_9_1) {
                Core_9 = Core_9_1;
            }
        ],
        execute: function () {
            Effect = class Effect extends UIElement_7.UIElement {
                constructor() {
                    super();
                }
                get UniformNames() { return this._uniformNames; }
                Initialize() {
                    let engine = Core_9.DIContainer.get("rootEngine");
                    this.Ctrl = engine.createEffectForParticles(this.Name, this.UniformNames, [""], "");
                }
                LoadFromNode(node) {
                    try {
                        this._uniformNames = eval(this.CleanJSONObject(node.attributes["UniformNames"].value));
                    }
                    catch (e) { }
                    super.LoadFromNode(node);
                }
                CleanJSONObject(stringToClean) {
                    var cleanString = stringToClean.replace(/`/g, "\"");
                    var newObject = JSON.parse(cleanString);
                    return newObject;
                }
            };
            exports_43("Effect", Effect);
        }
    };
});
System.register("Xaml/jupiter/controls/Event", ["Xaml/jupiter/UIElement"], function (exports_44, context_44) {
    "use strict";
    var UIElement_8, Event;
    var __moduleName = context_44 && context_44.id;
    return {
        setters: [
            function (UIElement_8_1) {
                UIElement_8 = UIElement_8_1;
            }
        ],
        execute: function () {
            Event = class Event extends UIElement_8.UIElement {
                constructor() {
                    super();
                }
                get EventName() { return this._eventName; }
                Initialize() {
                }
                LoadFromNode(node) {
                    try {
                        this._eventName = node.attributes["EventName"].value;
                    }
                    catch (e) { }
                    try {
                        let parser = new DOMParser();
                        let scriptFound = parser.parseFromString(node.innerHTML, "text/html");
                        this.Code = node.childNodes[1].wholeText;
                        this.HasScript = true;
                    }
                    catch (e) { }
                    super.LoadFromNode(node);
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        if (this.HasScript) {
                            parent.ChildrenEvents.setValue(this.EventName, this);
                        }
                        return true;
                    }
                    return false;
                }
            };
            exports_44("Event", Event);
        }
    };
});
System.register("Xaml/jupiter/controls/Material", ["Xaml/jupiter/UIElement", "babylonjs-materials"], function (exports_45, context_45) {
    "use strict";
    var UIElement_9, Material;
    var __moduleName = context_45 && context_45.id;
    return {
        setters: [
            function (UIElement_9_1) {
                UIElement_9 = UIElement_9_1;
            },
            function (_3) {
            }
        ],
        execute: function () {
            Material = class Material extends UIElement_9.UIElement {
                get SceneName() { return this._sceneName; }
                get Type() { return this._type; }
                get Wireframe() { return this._wireframe; }
                get DiffuseColor() { return this._diffuseColor; }
                get SpecularColor() { return this._specularColor; }
                get EmissiveColor() { return this._emissiveColor; }
                get DisableLighting() { return this._disableLighting; }
                get BackFaceCulling() { return this._backFaceCulling; }
                get ReflectionTextureName() { return this._reflectionTextureName; }
                get ShaderPath() { return this._shaderPath; }
                get Options() { return this._options; }
                set SceneName(value) { this._sceneName = value; }
                set Type(value) { this._type = value; }
                set Wireframe(value) { this._wireframe = value; }
                set DiffuseColor(value) { this._diffuseColor = value; }
                set SpecularColor(value) { this._specularColor = value; }
                set EmissiveColor(value) { this._emissiveColor = value; }
                set DisableLighting(value) { this._disableLighting = value; }
                set BackFaceCulling(value) { this._backFaceCulling = value; }
                set ReflectionTextureName(value) { this._reflectionTextureName = value; }
                set ShaderPath(value) { this._shaderPath = value; }
                set Options(value) { this._options = value; }
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    if (this.Type === "StandardMaterial") {
                        this.Ctrl = new BABYLON.StandardMaterial(this.Name, scene.Ctrl);
                        this.RefreshCtrlProperty("Wireframe");
                        this.RefreshCtrlProperty("DiffuseColor");
                        this.RefreshCtrlProperty("SpecularColor");
                        this.RefreshCtrlProperty("EmissiveColor");
                        this.RefreshCtrlProperty("DisableLighting");
                        this.RefreshCtrlProperty("BackFaceCulling");
                        if (this.HasValue(this.ReflectionTextureName)) {
                            let rt = this.VT.Get(this.ReflectionTextureName);
                            if (rt.Ctrl !== undefined && rt.Ctrl.isReadyOrNotBlocking)
                                this.Ctrl.reflectionTexture = rt.Ctrl;
                        }
                        ;
                    }
                    else if (this.Type === "ShaderMaterial") {
                        this.Ctrl = new BABYLON.ShaderMaterial("cloud", scene.Ctrl, this.ShaderPath, this.Options);
                    }
                    else if (this.Type === "GridMaterial") {
                        this.Ctrl = new BABYLON.GridMaterial(this.Name, scene.Ctrl);
                    }
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Scene", "SceneName");
                    this.UpdatePropertyByNode(node, "Type", "Type");
                    this.UpdatePropertyByNodeAndFunction(node, "Wireframe", "Wireframe", this.ConvertToBoolean);
                    this.UpdatePropertyByNodeAndFunction(node, "DiffuseColor", "DiffuseColor", this.CleanBabylonColor3Attribute);
                    this.UpdatePropertyByNodeAndFunction(node, "SpecularColor", "SpecularColor", this.CleanBabylonColor3Attribute);
                    this.UpdatePropertyByNodeAndFunction(node, "EmissiveColor", "EmissiveColor", this.CleanBabylonColor3Attribute);
                    this.UpdatePropertyByNode(node, "ReflectionTexture", "ReflectionTextureName");
                    this.UpdatePropertyByNodeAndFunction(node, "DisableLighting", "DisableLighting", this.ConvertToBoolean);
                    this.UpdatePropertyByNodeAndFunction(node, "BackFaceCulling", "BackFaceCulling", this.ConvertToBoolean);
                    this.UpdatePropertyByNodeAndFunction(node, "ShaderPath", "ShaderPath", this.CleanJSONObject);
                    this.UpdatePropertyByNodeAndFunction(node, "Options", "Options", this.CleanJSONObject);
                }
                SetValue(propertyName, value) {
                    switch (propertyName) {
                        case "DiffuseColor":
                        case "SpecularColor":
                        case "EmissiveColor":
                            this.UpdatePropertyByValue(propertyName, value, this.CleanBabylonColor3Attribute);
                            break;
                        case "Wireframe":
                        case "DisableLighting":
                        case "BackFaceCulling":
                            this.UpdatePropertyByValue(propertyName, value, this.ConvertToBoolean);
                            break;
                        default: return;
                    }
                    this.RefreshCtrlProperty(propertyName);
                }
                RefreshCtrlProperty(propertyName) {
                    switch (propertyName) {
                        case "Wireframe":
                            if (this.HasValue(this.Wireframe))
                                this.Ctrl.wireframe = this.Wireframe;
                            break;
                        case "DiffuseColor":
                            if (this.HasValue(this.DiffuseColor))
                                this.GetStandardMaterial(this.Ctrl).diffuseColor = this.DiffuseColor;
                            break;
                        case "SpecularColor":
                            if (this.HasValue(this.SpecularColor))
                                this.GetStandardMaterial(this.Ctrl).specularColor = this.SpecularColor;
                            break;
                        case "EmissiveColor":
                            if (this.HasValue(this.EmissiveColor))
                                this.GetStandardMaterial(this.Ctrl).emissiveColor = this.EmissiveColor;
                            break;
                        case "DisableLighting":
                            if (this.HasValue(this.DisableLighting))
                                this.GetStandardMaterial(this.Ctrl).disableLighting = this.DisableLighting;
                            break;
                        case "BackFaceCulling":
                            if (this.HasValue(this.BackFaceCulling))
                                this.GetStandardMaterial(this.Ctrl).backFaceCulling = this.BackFaceCulling;
                            break;
                    }
                }
                CleanJSONObject(stringToClean) {
                    var cleanString = stringToClean.replace(/`/g, "\"");
                    var newObject = JSON.parse(cleanString);
                    return newObject;
                }
                GetStandardMaterial(material) {
                    return material;
                }
            };
            exports_45("Material", Material);
        }
    };
});
System.register("Xaml/jupiter/controls/Ground", ["Xaml/jupiter/UIElement"], function (exports_46, context_46) {
    "use strict";
    var UIElement_10, Ground;
    var __moduleName = context_46 && context_46.id;
    return {
        setters: [
            function (UIElement_10_1) {
                UIElement_10 = UIElement_10_1;
            }
        ],
        execute: function () {
            Ground = class Ground extends UIElement_10.UIElement {
                get SceneName() { return this._sceneName; }
                get Width() { return this._width; }
                get Height() { return this._height; }
                get SubDivisions() { return this._subdivisions; }
                get MaterialName() { return this._materialName; }
                set SceneName(value) { this._sceneName = value; }
                set Width(value) { this._width = value; }
                set Height(value) { this._height = value; }
                set SubDivisions(value) { this._subdivisions = value; }
                set MaterialName(value) { this._materialName = value; }
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    let material = this.VT.Get(this.MaterialName);
                    this.Ctrl = BABYLON.Mesh.CreateGround(this.Name, this._width, this._height, this._subdivisions, scene.Ctrl, false);
                    if (this.HasValue(this.MaterialName) && material && material.Ctrl)
                        this.Ctrl.material = material.Ctrl;
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Scene", "SceneName");
                    this.UpdatePropertyByNode(node, "Material", "MaterialName");
                    this.UpdatePropertyByNodeAndFunction(node, "Width", "Width", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "Height", "Height", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "SubDivisions", "SubDivisions", parseInt);
                }
            };
            exports_46("Ground", Ground);
        }
    };
});
System.register("Xaml/behaviors/CustomScript", [], function (exports_47, context_47) {
    "use strict";
    var CustomScript;
    var __moduleName = context_47 && context_47.id;
    return {
        setters: [],
        execute: function () {
            CustomScript = class CustomScript {
                constructor() {
                }
                static Install(vt, di, code) {
                    eval(code);
                }
                static InstallRet(vt, di, code) {
                    return eval(code);
                }
                static InstallWithThis(vt, di, code) {
                    eval(code).bind(vt);
                }
            };
            exports_47("CustomScript", CustomScript);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/Button", ["Xaml/jupiter/UIElement", "babylonjs-gui", "Xaml/behaviors/CustomScript"], function (exports_48, context_48) {
    "use strict";
    var UIElement_11, CustomScript_1, Button;
    var __moduleName = context_48 && context_48.id;
    return {
        setters: [
            function (UIElement_11_1) {
                UIElement_11 = UIElement_11_1;
            },
            function (_4) {
            },
            function (CustomScript_1_1) {
                CustomScript_1 = CustomScript_1_1;
            }
        ],
        execute: function () {
            Button = class Button extends UIElement_11.UIElement {
                constructor() {
                    super();
                }
                get Content() { return this._content; }
                get Color() { return this._color; }
                get Background() { return this._background; }
                get CornerRadius() { return this._cornerRadius; }
                get Width() { return this._width; }
                get Height() { return this._height; }
                get FontSize() { return this._fontSize; }
                set Content(value) { this._content = value; }
                set Color(value) { this._color = value; }
                set Background(value) { this._background = value; }
                set CornerRadius(value) { this._cornerRadius = value; }
                set Width(value) { this._width = value; }
                set Height(value) { this._height = value; }
                set FontSize(value) { this._fontSize = value; }
                Initialize() {
                    this.Ctrl = BABYLON.GUI.Button.CreateSimpleButton(this.Name, this.Content);
                    this.Ctrl.width = this.Width;
                    this.Ctrl.height = this.Height;
                    this.Ctrl.color = this.Color;
                    this.Ctrl.cornerRadius = this.CornerRadius;
                    this.Ctrl.background = this.Background;
                    if (this.HasValue(this.FontSize))
                        this.Ctrl.fontSize = this.FontSize;
                    this.Parent.Ctrl.addControl(this.Ctrl);
                    this.ChildrenGUIs.forEach((key, child) => {
                        child.Initialize();
                    });
                    if (this.ChildrenEvents.size() > 0) {
                        this.ChildrenEvents.forEach((key, value) => {
                            try {
                                this.Ctrl[key].add(CustomScript_1.CustomScript.InstallRet(this.VT, this.DI, value.Code));
                            }
                            catch (e) { }
                        });
                    }
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Content", "Content");
                    this.UpdatePropertyByNode(node, "Color", "Color");
                    this.UpdatePropertyByNode(node, "Background", "Background");
                    this.UpdatePropertyByNode(node, "Width", "Width");
                    this.UpdatePropertyByNode(node, "Height", "Height");
                    this.UpdatePropertyByNodeAndFunction(node, "CornerRadius", "CornerRadius", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "FontSize", "FontSize", parseFloat);
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_48("Button", Button);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/CheckBox", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_49, context_49) {
    "use strict";
    var UIElement_12, CheckBox;
    var __moduleName = context_49 && context_49.id;
    return {
        setters: [
            function (UIElement_12_1) {
                UIElement_12 = UIElement_12_1;
            },
            function (_5) {
            }
        ],
        execute: function () {
            CheckBox = class CheckBox extends UIElement_12.UIElement {
                constructor() {
                    super();
                }
                get Width() { return this._width; }
                get Height() { return this._height; }
                get Color() { return this._color; }
                get Background() { return this._background; }
                get FontSize() { return this._fontSize; }
                get Content() { return this._content; }
                get IsChecked() { return this._isChecked; }
                get HeaderSize() { return this._headerSize; }
                get HeaderHeight() { return this._headerHeight; }
                get HorizontalAlignment() { return this._horizontalAlignment; }
                set Width(value) { this._width = value; }
                set Height(value) { this._height = value; }
                set Color(value) { this._color = value; }
                set Background(value) { this._background = value; }
                set FontSize(value) { this._fontSize = value; }
                set Content(value) { this._content = value; }
                set IsChecked(value) { this._isChecked = value; }
                set HeaderSize(value) { this._headerSize = value; }
                set HeaderHeight(value) { this._headerHeight = value; }
                set HorizontalAlignment(value) { this._horizontalAlignment = value; }
                Initialize() {
                    this.CreateCtrl();
                    this.RefreshCtrlProperty("Width");
                    this.RefreshCtrlProperty("Height");
                    this.RefreshCtrlProperty("Color");
                    this.RefreshCtrlProperty("IsChecked");
                    this.RefreshCtrlProperty("Background");
                    this.CreateCtrlRelated();
                    this.Parent.Ctrl.addControl(this._header);
                    this.ChildrenGUIs.forEach((key, child) => {
                        child.Initialize();
                    });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Width", "Width");
                    this.UpdatePropertyByNode(node, "Height", "Height");
                    this.UpdatePropertyByNode(node, "Color", "Color");
                    this.UpdatePropertyByNode(node, "Background", "Background");
                    this.UpdatePropertyByNodeAndFunction(node, "FontSize", "FontSize", parseFloat);
                    this.UpdatePropertyByNode(node, "Content", "Content");
                    this.UpdatePropertyByNode(node, "HeaderSize", "HeaderSize");
                    this.UpdatePropertyByNodeAndFunction(node, "IsChecked", "IsChecked", this.ConvertToBoolean);
                    this.UpdatePropertyByNode(node, "HeaderHeight", "HeaderHeight");
                    this.UpdatePropertyByNodeAndFunction(node, "HorizontalAlignment", "HorizontalAlignment", eval);
                }
                SetValue(propertyName, value) {
                    switch (propertyName) {
                        case "Height":
                        case "Width":
                        case "Color":
                        case "Content":
                        case "HeaderHeight":
                        case "HeaderSize":
                        case "Background":
                            this.UpdatePropertyByValue(propertyName, value, null);
                            break;
                        case "IsChecked":
                            this.UpdatePropertyByValue(propertyName, value, this.ConvertToBoolean);
                            break;
                        case "FontSize":
                            this.UpdatePropertyByValue(propertyName, value, parseFloat);
                            break;
                        case "HorizontalAlignment":
                            this.UpdatePropertyByValue(propertyName, value, eval);
                            break;
                        default: return;
                    }
                    this.RefreshCtrlProperty(propertyName);
                }
                RefreshCtrlProperty(propertyName) {
                    switch (propertyName) {
                        case "Height":
                            if (this.HasValue(this.Height))
                                this.Ctrl.height = this.Height;
                            break;
                        case "Width":
                            if (this.HasValue(this.Width))
                                this.Ctrl.width = this.Width;
                            break;
                        case "Color":
                            if (this.HasValue(this.Color)) {
                                this.Ctrl.color = this.Color;
                                if (this.HasValue(this._header)) {
                                    this._header.color = this.Color;
                                }
                            }
                            break;
                        case "Background":
                            if (this.HasValue(this.Background))
                                this.Ctrl.background = this.Background;
                            break;
                        case "IsChecked":
                            if (this.HasValue(this.IsChecked) && this.HasValue(this.IsChecked))
                                this.Ctrl.isChecked = this.IsChecked;
                            break;
                        case "HeaderSize":
                            if (this.HasValue(this.HeaderSize))
                                this._header.size = this.HeaderSize;
                            break;
                        case "HeaderHeight":
                            if (this.HasValue(this.HeaderHeight))
                                this._header.height = this.HeaderHeight;
                            break;
                        case "FontSize":
                            if (this.HasValue(this.FontSize))
                                this._header.children[1].fontSize = this.FontSize;
                            break;
                        case "HorizontalAlignment":
                            if (this.HasValue(this.HorizontalAlignment))
                                this._header.horizontalAlignment = this.HorizontalAlignment;
                            break;
                    }
                }
                ClearCtrl() {
                    if (!this.HasValue(this.Ctrl))
                        return;
                    this.bjsCtrl.dispose();
                    this.Ctrl = null;
                    this._header.dispose();
                    this._header = null;
                }
                CreateCtrl() {
                    this.ClearCtrl();
                    this.Ctrl = new BABYLON.GUI.Checkbox();
                }
                CreateCtrlRelated() {
                    this._header = BABYLON.GUI.Control.AddHeader(this.Ctrl, this.Content, this.HeaderSize, { isHorizontal: true, controlFirst: true });
                    this.RefreshCtrlProperty("Color");
                    this.RefreshCtrlProperty("HeaderHeight");
                    this.RefreshCtrlProperty("HorizontalAlignment");
                    this.RefreshCtrlProperty("FontSize");
                    this._header.children[1].onPointerDownObservable.add(() => {
                        this.Ctrl.isChecked = !this.Ctrl.isChecked;
                    });
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_49("CheckBox", CheckBox);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/Code", ["Xaml/jupiter/UIElement"], function (exports_50, context_50) {
    "use strict";
    var UIElement_13, Code;
    var __moduleName = context_50 && context_50.id;
    return {
        setters: [
            function (UIElement_13_1) {
                UIElement_13 = UIElement_13_1;
            }
        ],
        execute: function () {
            Code = class Code extends UIElement_13.UIElement {
                constructor() {
                    super();
                }
                Initialize() {
                }
                LoadFromNode(node) {
                    try {
                        let parser = new DOMParser();
                        if (node.childNodes.length === 1) {
                            let scriptFound = parser.parseFromString(node.innerHTML, "text/html");
                            this.Code = scriptFound.body.innerText;
                        }
                        else {
                            this.Code = node.childNodes[1].wholeText;
                        }
                        this.HasCode = true;
                    }
                    catch (e) { }
                    super.LoadFromNode(node);
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        if (this.HasCode) {
                            parent.HasCode = true;
                            parent.Code = this.Code;
                        }
                        return true;
                    }
                    return false;
                }
            };
            exports_50("Code", Code);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/ColorPicker", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_51, context_51) {
    "use strict";
    var UIElement_14, ColorPicker;
    var __moduleName = context_51 && context_51.id;
    return {
        setters: [
            function (UIElement_14_1) {
                UIElement_14 = UIElement_14_1;
            },
            function (_6) {
            }
        ],
        execute: function () {
            ColorPicker = class ColorPicker extends UIElement_14.UIElement {
                constructor() {
                    super();
                }
                get Height() { return this._height; }
                get Width() { return this._width; }
                get Value() { return this._value; }
                get HorizontalAlignment() { return this._horizontalAlignment; }
                set Height(value) { this._height = value; }
                set Width(value) { this._width = value; }
                set Value(value) { this._value = value; }
                set HorizontalAlignment(value) { this._horizontalAlignment = value; }
                Initialize() {
                    this.CreateCtrl();
                    this.RefreshCtrlProperty("Height");
                    this.RefreshCtrlProperty("Width");
                    this.RefreshCtrlProperty("Value");
                    this.RefreshCtrlProperty("HorizontalAlignment");
                    this.Parent.Ctrl.addControl(this.Ctrl);
                    this.ChildrenGUIs.forEach((key, child) => {
                        child.Initialize();
                    });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Width", "Width");
                    this.UpdatePropertyByNode(node, "Height", "Height");
                    this.UpdatePropertyByNode(node, "Value", "Value");
                    this.UpdatePropertyByNodeAndFunction(node, "HorizontalAlignment", "HorizontalAlignment", eval);
                }
                SetValue(propertyName, value) {
                    switch (propertyName) {
                        case "Height":
                        case "Width":
                        case "Value":
                            this.UpdatePropertyByValue(propertyName, value, null);
                            break;
                        case "HorizontalAlignment":
                            this.UpdatePropertyByValue(propertyName, value, eval);
                            break;
                        default: return;
                    }
                    this.RefreshCtrlProperty(propertyName);
                }
                RefreshCtrlProperty(propertyName) {
                    switch (propertyName) {
                        case "Height":
                            if (this.HasValue(this.Height))
                                this.Ctrl.height = this.Height;
                            break;
                        case "Width":
                            if (this.HasValue(this.Width))
                                this.Ctrl.width = this.Width;
                            break;
                        case "Value":
                            if (this.HasValue(this.Value))
                                this.Ctrl.value = this.Value;
                            break;
                        case "HorizontalAlignment":
                            if (this.HasValue(this.HorizontalAlignment))
                                this.Ctrl.horizontalAlignment = this.HorizontalAlignment;
                            break;
                    }
                }
                ClearCtrl() {
                    if (!this.HasValue(this.Ctrl))
                        return;
                    this.bjsCtrl.dispose();
                    this.Ctrl = null;
                }
                CreateCtrl() {
                    this.ClearCtrl();
                    this.Ctrl = new BABYLON.GUI.ColorPicker(this.Name);
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_51("ColorPicker", ColorPicker);
        }
    };
});
System.register("Xaml/jupiter/controls/Mesh", ["Xaml/jupiter/UIElement"], function (exports_52, context_52) {
    "use strict";
    var UIElement_15, Mesh;
    var __moduleName = context_52 && context_52.id;
    return {
        setters: [
            function (UIElement_15_1) {
                UIElement_15 = UIElement_15_1;
            }
        ],
        execute: function () {
            Mesh = class Mesh extends UIElement_15.UIElement {
                get SceneName() { return this._sceneName; }
                get Width() { return this._width; }
                get Height() { return this._height; }
                get SubDivisions() { return this._subdivisions; }
                get MaterialName() { return this._materialName; }
                set SceneName(value) { this._sceneName = value; }
                set Width(value) { this._width = value; }
                set Height(value) { this._height = value; }
                set SubDivisions(value) { this._subdivisions = value; }
                set MaterialName(value) { this._materialName = value; }
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    this.Ctrl = new BABYLON.Mesh(this.Name, scene.Ctrl);
                    if (this.HasValue(this.MaterialName)) {
                        let material = this.VT.Get(this.MaterialName);
                        if (material && material.Ctrl)
                            this.Ctrl.material = material.Ctrl;
                    }
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Scene", "SceneName");
                    this.UpdatePropertyByNodeAndFunction(node, "Width", "Width", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "Height", "Height", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "SubDivisions", "SubDivisions", parseInt);
                    this.UpdatePropertyByNode(node, "Material", "MaterialName");
                }
            };
            exports_52("Mesh", Mesh);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/Ellipse", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_53, context_53) {
    "use strict";
    var UIElement_16, Ellipse;
    var __moduleName = context_53 && context_53.id;
    return {
        setters: [
            function (UIElement_16_1) {
                UIElement_16 = UIElement_16_1;
            },
            function (_7) {
            }
        ],
        execute: function () {
            Ellipse = class Ellipse extends UIElement_16.UIElement {
                constructor() {
                    super();
                }
                get Color() { return this._color; }
                get Background() { return this._background; }
                get Thickness() { return this._thickness; }
                get Width() { return this._width; }
                get Height() { return this._height; }
                get MeshName() { return this._meshName; }
                set Color(value) { this._color = value; }
                set Background(value) { this._background = value; }
                set Thickness(value) { this._thickness = value; }
                set Width(value) { this._width = value; }
                set Height(value) { this._height = value; }
                set MeshName(value) { this._meshName = value; }
                Initialize() {
                    this.CreateCtrl();
                    this.RefreshCtrlProperty("Width");
                    this.RefreshCtrlProperty("Height");
                    this.RefreshCtrlProperty("Color");
                    this.RefreshCtrlProperty("Background");
                    this.RefreshCtrlProperty("Thickness");
                    this.Parent.Ctrl.addControl(this.Ctrl);
                    if (this.MeshName !== undefined) {
                        let mesh = this.VT.Get(this.MeshName);
                        this.Ctrl.linkWithMesh(mesh.Ctrl);
                    }
                    this.ChildrenGUIs.forEach((key, child) => {
                        child.Initialize();
                    });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Color", "Color");
                    this.UpdatePropertyByNode(node, "Background", "Background");
                    this.UpdatePropertyByNode(node, "Width", "Width");
                    this.UpdatePropertyByNode(node, "Height", "Height");
                    this.UpdatePropertyByNodeAndFunction(node, "Thickness", "Thickness", parseFloat);
                    this.UpdatePropertyByNode(node, "Mesh", "Mesh");
                }
                SetValue(propertyName, value) {
                    switch (propertyName) {
                        case "Height":
                        case "Width":
                        case "Background":
                        case "Color":
                            this.UpdatePropertyByValue(propertyName, value, null);
                            break;
                        case "Thickness":
                            this.UpdatePropertyByValue(propertyName, value, parseFloat);
                            break;
                        default: return;
                    }
                    this.RefreshCtrlProperty(propertyName);
                }
                RefreshCtrlProperty(propertyName) {
                    switch (propertyName) {
                        case "Height":
                            if (this.HasValue(this.Height))
                                this.Ctrl.height = this.Height;
                            break;
                        case "Width":
                            if (this.HasValue(this.Width))
                                this.Ctrl.width = this.Width;
                            break;
                        case "Color":
                            if (this.HasValue(this.Color))
                                this.Ctrl.color = this.Color;
                            break;
                        case "Background":
                            if (this.HasValue(this.Background))
                                this.Ctrl.background = this.Background;
                            break;
                        case "Thickness":
                            if (this.HasValue(this.Thickness))
                                this.Ctrl.thickness = this.Thickness;
                            break;
                    }
                }
                ClearCtrl() {
                    if (!this.HasValue(this.Ctrl))
                        return;
                    this.bjsCtrl.dispose();
                    this.Ctrl = null;
                }
                CreateCtrl() {
                    this.ClearCtrl();
                    this.Ctrl = new BABYLON.GUI.Ellipse();
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_53("Ellipse", Ellipse);
        }
    };
});
System.register("Xaml/jupiter/controls/Panel", ["Xaml/jupiter/FrameworkElement", "Xaml/jupiter/UIElementCollection"], function (exports_54, context_54) {
    "use strict";
    var FrameworkElement_2, UIElementCollection_2, Panel;
    var __moduleName = context_54 && context_54.id;
    return {
        setters: [
            function (FrameworkElement_2_1) {
                FrameworkElement_2 = FrameworkElement_2_1;
            },
            function (UIElementCollection_2_1) {
                UIElementCollection_2 = UIElementCollection_2_1;
            }
        ],
        execute: function () {
            Panel = class Panel extends FrameworkElement_2.FrameworkElement {
                constructor() {
                    super();
                    this._offsetX = 0;
                    this._offsetY = 0;
                    this._children = new UIElementCollection_2.UIElementCollection();
                }
                get Children() { return this._children; }
                get Background() { return this._background; }
                get Foreground() { return this._foreground; }
                get OffsetX() { return this._offsetX; }
                get OffsetY() { return this._offsetY; }
                set Children(value) { this._children = value; }
                set Background(value) { this._background = value; }
                set Foreground(value) { this._foreground = value; }
                set OffsetX(value) { this._offsetX = value; }
                set OffsetY(value) { this._offsetY = value; }
            };
            exports_54("Panel", Panel);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/Grid", ["Xaml/jupiter/controls/Panel"], function (exports_55, context_55) {
    "use strict";
    var Panel_1, Grid;
    var __moduleName = context_55 && context_55.id;
    return {
        setters: [
            function (Panel_1_1) {
                Panel_1 = Panel_1_1;
            }
        ],
        execute: function () {
            Grid = class Grid extends Panel_1.Panel {
            };
            exports_55("Grid", Grid);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/Line", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_56, context_56) {
    "use strict";
    var UIElement_17, Line;
    var __moduleName = context_56 && context_56.id;
    return {
        setters: [
            function (UIElement_17_1) {
                UIElement_17 = UIElement_17_1;
            },
            function (_8) {
            }
        ],
        execute: function () {
            Line = class Line extends UIElement_17.UIElement {
                constructor() {
                    super();
                }
                get Dash() { return this._dash; }
                get LineWidth() { return this._lineWidth; }
                get Alpha() { return this._alpha; }
                get MeshName() { return this._meshName; }
                get ConnectedControlName() { return this._connectedControlName; }
                set Dash(value) { this._dash = value; }
                set LineWidth(value) { this._lineWidth = value; }
                set Alpha(value) { this._alpha = value; }
                set MeshName(value) { this._meshName = value; }
                set ConnectedControlName(value) { this._connectedControlName = value; }
                Initialize() {
                    let mesh = this.VT.Get(this.MeshName);
                    let connecteControl = this.VT.Get(this.ConnectedControlName);
                    this.CreateCtrl();
                    this.SetValue("Alpha", 0.5);
                    this.SetValue("LineWidth", 5);
                    this.SetValue("Dash", [5, 10]);
                    this.Parent.Ctrl.addControl(this.Ctrl);
                    this.Ctrl.linkWithMesh(mesh.Ctrl);
                    this.Ctrl.connectedControl = connecteControl.Ctrl;
                    this.ChildrenGUIs.forEach((key, child) => {
                        child.Initialize();
                    });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    try {
                        this._dash = eval(node.attributes["Dash"].value);
                    }
                    catch (_a) { }
                    try {
                        this._meshName = node.attributes["Mesh"].value;
                    }
                    catch (_b) { }
                    try {
                        this._alpha = parseFloat(node.attributes["Alpha"].value);
                    }
                    catch (_c) { }
                    try {
                        this._lineWidth = parseFloat(node.attributes["LineWidth"].value);
                    }
                    catch (_d) { }
                    try {
                        this._connectedControlName = node.attributes["ConnectedControl"].value;
                    }
                    catch (_e) { }
                }
                SetValue(propertyName, value) {
                    switch (propertyName) {
                        case "Mesh":
                        case "ConnectedControl":
                            this.UpdatePropertyByValue(propertyName, value, null);
                            break;
                        case "Alpha":
                        case "LineWidth":
                            this.UpdatePropertyByValue(propertyName, value, parseFloat);
                            break;
                        case "Dash":
                            this.UpdatePropertyByValue(propertyName, value, eval);
                            break;
                        default: return;
                    }
                    this.RefreshCtrlProperty(propertyName);
                }
                RefreshCtrlProperty(propertyName) {
                    switch (propertyName) {
                        case "Dash":
                            if (this.HasValue(this.Dash))
                                this.Ctrl.dash = this.Dash;
                            break;
                        case "Alpha":
                            if (this.HasValue(this.Alpha))
                                this.Ctrl.alpha = this.Alpha;
                            break;
                        case "LineWidth":
                            if (this.HasValue(this.LineWidth))
                                this.Ctrl.lineWidth = this.LineWidth;
                            break;
                    }
                }
                ClearCtrl() {
                    if (!this.HasValue(this.Ctrl))
                        return;
                    this.bjsCtrl.dispose();
                    this.Ctrl = null;
                }
                CreateCtrl() {
                    this.ClearCtrl();
                    this.Ctrl = new BABYLON.GUI.Line();
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_56("Line", Line);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/RadioButton", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_57, context_57) {
    "use strict";
    var UIElement_18, RadioButton;
    var __moduleName = context_57 && context_57.id;
    return {
        setters: [
            function (UIElement_18_1) {
                UIElement_18 = UIElement_18_1;
            },
            function (_9) {
            }
        ],
        execute: function () {
            RadioButton = class RadioButton extends UIElement_18.UIElement {
                constructor() {
                    super();
                }
                get Width() { return this._width; }
                ;
                get Height() { return this._height; }
                ;
                get Color() { return this._color; }
                ;
                get Background() { return this._background; }
                ;
                get FontSize() { return this._fontSize; }
                ;
                get Content() { return this._content; }
                ;
                get HeaderSize() { return this._headerSize; }
                ;
                get HeaderHeight() { return this._headerHeight; }
                ;
                set Width(value) { this._width = value; }
                ;
                set Height(value) { this._height = value; }
                ;
                set Color(value) { this._color = value; }
                ;
                set Background(value) { this._background = value; }
                ;
                set FontSize(value) { this._fontSize = value; }
                ;
                set Content(value) { this._content = value; }
                ;
                set HeaderSize(value) { this._headerSize = value; }
                ;
                set HeaderHeight(value) { this._headerHeight = value; }
                ;
                Initialize() {
                    this.CreateCtrl();
                    this.CreateCtrlRelated();
                    this.Parent.Ctrl.addControl(this._header);
                    this.ChildrenGUIs.forEach((key, child) => {
                        child.Initialize();
                    });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    try {
                        this._height = node.attributes["Height"].value;
                    }
                    catch (_a) { }
                    try {
                        this._width = node.attributes["Width"].value;
                    }
                    catch (_b) { }
                    try {
                        this._color = node.attributes["Color"].value;
                    }
                    catch (_c) { }
                    try {
                        this._background = node.attributes["Background"].value;
                    }
                    catch (_d) { }
                    try {
                        this._fontSize = parseFloat(node.attributes["FontSize"].value);
                    }
                    catch (_e) { }
                    try {
                        this._content = node.attributes["Content"].value;
                    }
                    catch (_f) { }
                    try {
                        this._headerSize = node.attributes["HeaderSize"].value;
                    }
                    catch (_g) { }
                    try {
                        this._headerHeight = node.attributes["HeaderHeight"].value;
                    }
                    catch (_h) { }
                }
                SetValue(propertyName, value) {
                    switch (propertyName) {
                        case "Height":
                        case "Width":
                        case "Color":
                        case "Background":
                        case "HeaderSize":
                        case "HeaderHeight":
                        case "Content":
                            this.UpdatePropertyByValue(propertyName, value, null);
                            break;
                        case "FontSize":
                            this.UpdatePropertyByValue(propertyName, value, parseFloat);
                            break;
                        default: return;
                    }
                    this.RefreshCtrlProperty(propertyName);
                }
                RefreshCtrlProperty(propertyName) {
                    switch (propertyName) {
                        case "Height":
                            if (this.HasValue(this.Height))
                                this.Ctrl.height = this.Height;
                            break;
                        case "Width":
                            if (this.HasValue(this.Width))
                                this.Ctrl.width = this.Width;
                            break;
                        case "Color":
                            if (this.HasValue(this.Color))
                                this.Ctrl.color = this.Color;
                            break;
                        case "Background":
                            if (this.HasValue(this.Background))
                                this.Ctrl.background = this.Background;
                            break;
                        case "HeaderHeight":
                            if (this.HasValue(this.HeaderHeight) && this.HasValue(this._header))
                                this._header.height = this.HeaderHeight;
                            break;
                        case "FontSize":
                            if (this.HasValue(this.FontSize) && this.HasValue(this._header))
                                this._header.children[1].fontSize = this.FontSize;
                            break;
                    }
                }
                ClearCtrl() {
                    if (!this.HasValue(this.Ctrl))
                        return;
                    this.bjsCtrl.dispose();
                    this.Ctrl = null;
                    this._header.dispose();
                    this._header = null;
                }
                CreateCtrl() {
                    this.ClearCtrl();
                    this.Ctrl = new BABYLON.GUI.RadioButton();
                    this.RefreshCtrlProperty("Height");
                    this.RefreshCtrlProperty("Width");
                    this.RefreshCtrlProperty("Color");
                    this.RefreshCtrlProperty("Background");
                }
                CreateCtrlRelated() {
                    this._header = BABYLON.GUI.Control.AddHeader(this.Ctrl, this.Content, this.HeaderSize, { isHorizontal: true, controlFirst: true });
                    this.RefreshCtrlProperty("HeaderHeight");
                    this.RefreshCtrlProperty("FontSize");
                    this._header.children[1].onPointerDownObservable.add(() => {
                        this.Ctrl.isChecked = !this.Ctrl.isChecked;
                    });
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_57("RadioButton", RadioButton);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/Resources", ["Xaml/jupiter/UIElement", "Xaml/jupiter/Core"], function (exports_58, context_58) {
    "use strict";
    var UIElement_19, Core_10, Resources;
    var __moduleName = context_58 && context_58.id;
    return {
        setters: [
            function (UIElement_19_1) {
                UIElement_19 = UIElement_19_1;
            },
            function (Core_10_1) {
                Core_10 = Core_10_1;
            }
        ],
        execute: function () {
            Resources = class Resources extends UIElement_19.UIElement {
                constructor() {
                    super();
                    this._resources = new Core_10.UIElementCollection();
                }
                get Resources() { return this._resources; }
                set Resources(value) { this._resources = value; }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                }
            };
            exports_58("Resources", Resources);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/Resource", ["Xaml/jupiter/UIElement"], function (exports_59, context_59) {
    "use strict";
    var UIElement_20, Resource;
    var __moduleName = context_59 && context_59.id;
    return {
        setters: [
            function (UIElement_20_1) {
                UIElement_20 = UIElement_20_1;
            }
        ],
        execute: function () {
            Resource = class Resource extends UIElement_20.UIElement {
                constructor() {
                    super();
                }
                Initialize() {
                }
                LoadFromNode(node) {
                    try {
                        let parser = new DOMParser();
                        if (node.childNodes.length === 1) {
                            let scriptFound = parser.parseFromString(node.innerHTML, "text/html");
                            this.Code = scriptFound.body.innerText;
                        }
                        else {
                            this.Code = node.childNodes[1].wholeText;
                        }
                        this.HasCode = true;
                    }
                    catch (e) { }
                    super.LoadFromNode(node);
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        if (this.HasCode) {
                            parent.HasCode = true;
                            parent.Code = this.Code;
                        }
                        return true;
                    }
                    return false;
                }
            };
            exports_59("Resource", Resource);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/StackPanel", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_60, context_60) {
    "use strict";
    var UIElement_21, StackPanel;
    var __moduleName = context_60 && context_60.id;
    return {
        setters: [
            function (UIElement_21_1) {
                UIElement_21 = UIElement_21_1;
            },
            function (_10) {
            }
        ],
        execute: function () {
            StackPanel = class StackPanel extends UIElement_21.UIElement {
                constructor() {
                    super();
                }
                get Rotation() { return this._rotation; }
                get Height() { return this._height; }
                get Width() { return this._width; }
                get IsVertical() { return this._isVertical; }
                get Top() { return this._top; }
                get PaddingRight() { return this._paddingRight; }
                get FontSize() { return this._fontSize; }
                get HorizontalAlignment() { return this._horizontalAlignment; }
                get VerticalAlignment() { return this._verticalAlignment; }
                set Rotation(value) { this._rotation = value; }
                set Height(value) { this._height = value; }
                set Width(value) { this._width = value; }
                set IsVertical(value) { this._isVertical = value; }
                set Top(value) { this._top = value; }
                set PaddingRight(value) { this._paddingRight = value; }
                set FontSize(value) { this._fontSize = value; }
                set HorizontalAlignment(value) { this._horizontalAlignment = value; }
                set VerticalAlignment(value) { this._verticalAlignment = value; }
                Initialize() {
                    this.CreateCtrl();
                    this.RefreshCtrlProperty("Height");
                    if (this.Width !== undefined)
                        this.Ctrl.width = this.Width;
                    else if (this.Parent instanceof StackPanel && this.Parent.Width !== undefined)
                        this.Ctrl.width = this.Parent.Width;
                    this.RefreshCtrlProperty("Top");
                    this.RefreshCtrlProperty("Rotation");
                    this.RefreshCtrlProperty("HorizontalAlignment");
                    this.RefreshCtrlProperty("VerticalAlignment");
                    this.RefreshCtrlProperty("FontSize");
                    this.RefreshCtrlProperty("PaddingRight");
                    this.RefreshCtrlProperty("IsVertical");
                    this.Parent.Ctrl.addControl(this.Ctrl);
                    this.ChildrenGUIs.forEach((key, child) => {
                        child.Initialize();
                    });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Height", "Height");
                    this.UpdatePropertyByNode(node, "Width", "Width");
                    this.UpdatePropertyByNode(node, "Top", "Top");
                    this.UpdatePropertyByNodeAndFunction(node, "Rotation", "Rotation", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "HorizontalAlignment", "HorizontalAlignment", eval);
                    this.UpdatePropertyByNodeAndFunction(node, "VerticalAlignment", "VerticalAlignment", eval);
                    this.UpdatePropertyByNode(node, "FontSize", "FontSize");
                    this.UpdatePropertyByNode(node, "PaddingRight", "PaddingRight");
                    this.UpdatePropertyByNodeAndFunction(node, "IsVertical", "IsVertical", this.ConvertToBoolean);
                }
                SetValue(propertyName, value) {
                    switch (propertyName) {
                        case "Height":
                        case "Width":
                        case "Top":
                        case "PaddingRight":
                        case "FontSize":
                            this.UpdatePropertyByValue(propertyName, value, null);
                            break;
                        case "Rotation":
                            this.UpdatePropertyByValue(propertyName, value, parseFloat);
                            break;
                        case "HorizontalAlignment":
                        case "VerticalAlignment":
                            this.UpdatePropertyByValue(propertyName, value, eval);
                            break;
                        case "IsVertical":
                            this.UpdatePropertyByValue(propertyName, value, this.ConvertToBoolean);
                            break;
                        default: return;
                    }
                    this.RefreshCtrlProperty(propertyName);
                }
                RefreshCtrlProperty(propertyName) {
                    switch (propertyName) {
                        case "Height":
                            if (this.HasValue(this.Height))
                                this.Ctrl.height = this.Height;
                            break;
                        case "Width":
                            if (this.HasValue(this.Width))
                                this.Ctrl.width = this.Width;
                            break;
                        case "Top":
                            if (this.HasValue(this.Top))
                                this.Ctrl.color = this.Top;
                            break;
                        case "PaddingRight":
                            if (this.HasValue(this.PaddingRight))
                                this.Ctrl.paddingRight = this.PaddingRight;
                            break;
                        case "FontSize":
                            if (this.HasValue(this.FontSize))
                                this.Ctrl.fontSize = this.FontSize;
                            break;
                        case "Rotation":
                            if (this.HasValue(this.Rotation))
                                this.Ctrl.rotation = this.Rotation;
                            break;
                        case "HorizontalAlignment":
                            if (this.HasValue(this.HorizontalAlignment))
                                this.Ctrl.horizontalAlignment = this.HorizontalAlignment;
                            break;
                        case "VerticalAlignment":
                            if (this.HasValue(this.VerticalAlignment))
                                this.Ctrl.verticalAlignment = this.VerticalAlignment;
                            break;
                        case "IsVertical":
                            if (this.HasValue(this.IsVertical))
                                this.Ctrl.isVertical = this.IsVertical;
                            break;
                    }
                }
                ClearCtrl() {
                    if (!this.HasValue(this.Ctrl))
                        return;
                    this.bjsCtrl.dispose();
                    this.Ctrl = null;
                }
                CreateCtrl() {
                    this.ClearCtrl();
                    this.Ctrl = new BABYLON.GUI.StackPanel(this.Name);
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_60("StackPanel", StackPanel);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/TextBlock", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_61, context_61) {
    "use strict";
    var UIElement_22, TextBlock;
    var __moduleName = context_61 && context_61.id;
    return {
        setters: [
            function (UIElement_22_1) {
                UIElement_22 = UIElement_22_1;
            },
            function (_11) {
            }
        ],
        execute: function () {
            TextBlock = class TextBlock extends UIElement_22.UIElement {
                constructor() {
                    super();
                }
                get Height() { return this._height; }
                get Width() { return this._height; }
                get FontSize() { return this._fontSize; }
                get Content() { return this._content; }
                get Color() { return this._color; }
                get TextHorizontalAlignment() { return this._textHorizontalAlignment; }
                set Height(value) { this._height = value; }
                set Width(value) { this._height = value; }
                set FontSize(value) { this._fontSize = value; }
                set Content(value) { this._content = value; }
                set Color(value) { this._color = value; }
                set TextHorizontalAlignment(value) { this._textHorizontalAlignment = value; }
                Initialize() {
                    this.CreateCtrl();
                    this.RefreshCtrlProperty("Width");
                    this.RefreshCtrlProperty("Height");
                    this.RefreshCtrlProperty("Color");
                    this.RefreshCtrlProperty("FontSize");
                    this.RefreshCtrlProperty("TextHorizontalAlignment");
                    this.RefreshCtrlProperty("Content");
                    this.Parent.Ctrl.addControl(this.Ctrl);
                    this.ChildrenGUIs.forEach((key, child) => {
                        child.Initialize();
                    });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Height", "Height");
                    this.UpdatePropertyByNode(node, "Width", "Width");
                    this.UpdatePropertyByNodeAndFunction(node, "FontSize", "FontSize", parseFloat);
                    this.UpdatePropertyByNode(node, "Content", "Content");
                    this.UpdatePropertyByNode(node, "Color", "Color");
                    this.UpdatePropertyByNodeAndFunction(node, "TextHorizontalAlignment", "TextHorizontalAlignment", eval);
                }
                SetValue(propertyName, value) {
                    switch (propertyName) {
                        case "Height":
                        case "Width":
                        case "Content":
                        case "Color":
                            this.UpdatePropertyByValue(propertyName, value, null);
                            break;
                        case "FontSize":
                            this.UpdatePropertyByValue(propertyName, value, parseFloat);
                            break;
                        case "TextHorizontalAlignment":
                            this.UpdatePropertyByValue(propertyName, value, eval);
                            break;
                        default: return;
                    }
                    this.RefreshCtrlProperty(propertyName);
                }
                RefreshCtrlProperty(propertyName) {
                    switch (propertyName) {
                        case "Height":
                            if (this.HasValue(this.Height))
                                this.Ctrl.height = this.Height;
                            break;
                        case "Width":
                            if (this.HasValue(this.Width))
                                this.Ctrl.width = this.Width;
                            break;
                        case "Color":
                            if (this.HasValue(this.Color))
                                this.Ctrl.color = this.Color;
                            break;
                        case "Content":
                            if (this.HasValue(this.Content))
                                this.Ctrl.text = this.Content;
                            break;
                        case "FontSize":
                            if (this.HasValue(this.FontSize))
                                this.Ctrl.fontSize = this.FontSize;
                            break;
                        case "TextHorizontalAlignment":
                            if (this.HasValue(this.TextHorizontalAlignment))
                                this.Ctrl.textHorizontalAlignment = this.TextHorizontalAlignment;
                            break;
                    }
                }
                ClearCtrl() {
                    if (!this.HasValue(this.Ctrl))
                        return;
                    this.bjsCtrl.dispose();
                    this.Ctrl = null;
                }
                CreateCtrl() {
                    this.ClearCtrl();
                    this.Ctrl = new BABYLON.GUI.TextBlock(this.Name);
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_61("TextBlock", TextBlock);
        }
    };
});
System.register("Xaml/jupiter/controls/KeyFrameCollection", ["libs/typescript-collections/src/lib/index"], function (exports_62, context_62) {
    "use strict";
    var lib_2, KeyFrameCollection;
    var __moduleName = context_62 && context_62.id;
    return {
        setters: [
            function (lib_2_1) {
                lib_2 = lib_2_1;
            }
        ],
        execute: function () {
            KeyFrameCollection = class KeyFrameCollection extends lib_2.LinkedList {
            };
            exports_62("KeyFrameCollection", KeyFrameCollection);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/Label", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_63, context_63) {
    "use strict";
    var UIElement_23, Label;
    var __moduleName = context_63 && context_63.id;
    return {
        setters: [
            function (UIElement_23_1) {
                UIElement_23 = UIElement_23_1;
            },
            function (_12) {
            }
        ],
        execute: function () {
            Label = class Label extends UIElement_23.UIElement {
                constructor() {
                    super();
                }
                get Text() { return this._text; }
                get Foreground() { return this._foreground; }
                get Background() { return this._background; }
                get Thickness() { return this._thickness; }
                get Alpha() { return this._alpha; }
                get CornerRadius() { return this._cornerRadius; }
                get Width() { return this._width; }
                get Height() { return this._height; }
                get MeshName() { return this._meshName; }
                get LinkOffsetY() { return this._linkOffsetY; }
                get Top() { return this._top; }
                get VerticalAlignment() { return this._verticalAlignment; }
                get ZIndex() { return this._zIndex; }
                set Text(value) { this._text = value; }
                set Foreground(value) { this._foreground = value; }
                set Background(value) { this._background = value; }
                set Thickness(value) { this._thickness = value; }
                set Alpha(value) { this._alpha = value; }
                set CornerRadius(value) { this._cornerRadius = value; }
                set Width(value) { this._width = value; }
                set Height(value) { this._height = value; }
                set MeshName(value) { this._meshName = value; }
                set LinkOffsetY(value) { this._linkOffsetY = value; }
                set Top(value) { this._top = value; }
                set VerticalAlignment(value) { this._verticalAlignment = value; }
                set ZIndex(value) { this._zIndex = value; }
                Initialize() {
                    this.CreateCtrl();
                    this.RefreshCtrlProperty("Background");
                    this.RefreshCtrlProperty("Height");
                    this.RefreshCtrlProperty("Alpha");
                    this.RefreshCtrlProperty("Width");
                    this.RefreshCtrlProperty("CornerRadius");
                    this.RefreshCtrlProperty("Thickness");
                    this.RefreshCtrlProperty("LinkOffsetY");
                    this.RefreshCtrlProperty("Top");
                    if (this.VerticalAlignment !== undefined)
                        this.Ctrl.verticalAlignment = this.VerticalAlignment;
                    this.RefreshCtrlProperty("ZIndex");
                    this.Parent.Ctrl.addControl(this.Ctrl);
                    if (this.MeshName !== undefined) {
                        let mesh = this.VT.Get(this.MeshName);
                        this.Ctrl.linkWithMesh(mesh.Ctrl);
                    }
                    this.RefreshCtrlProperty("Text");
                    this.RefreshCtrlProperty("Foreground");
                    this.ChildrenGUIs.forEach((key, child) => {
                        child.Initialize();
                    });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Foreground", "Foreground");
                    this.UpdatePropertyByNode(node, "Background", "Background");
                    this.UpdatePropertyByNode(node, "Width", "Width");
                    this.UpdatePropertyByNode(node, "Height", "Height");
                    this.UpdatePropertyByNodeAndFunction(node, "Thickness", "Thickness", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "Alpha", "Alpha", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "CornerRadius", "CornerRadius", parseFloat);
                    this.UpdatePropertyByNode(node, "LinkOffsetY", "LinkOffsetY");
                    this.UpdatePropertyByNodeAndFunction(node, "LinkOffsetY", "LinkOffsetY", parseFloat);
                    this.UpdatePropertyByNode(node, "Mesh", "Mesh");
                    this.UpdatePropertyByNode(node, "Text", "Text");
                    this.UpdatePropertyByNode(node, "Top", "Top");
                    this.UpdatePropertyByNodeAndFunction(node, "VerticalAlignment", "VerticalAlignment", eval);
                    this.UpdatePropertyByNodeAndFunction(node, "ZIndex", "ZIndex", parseFloat);
                }
                SetValue(propertyName, value) {
                    switch (propertyName) {
                        case "Height":
                        case "Width":
                        case "Foreground":
                        case "Background":
                        case "Mesh":
                        case "Text":
                        case "Top":
                            this.UpdatePropertyByValue(propertyName, value, null);
                            break;
                        case "Alpha":
                        case "CornerRadius":
                        case "LinkOffsetY":
                        case "Thickness":
                        case "ZIndex":
                            this.UpdatePropertyByValue(propertyName, value, parseFloat);
                            break;
                        default: return;
                    }
                    this.RefreshCtrlProperty(propertyName);
                }
                RefreshCtrlProperty(propertyName) {
                    switch (propertyName) {
                        case "Height":
                            if (this.HasValue(this.Height))
                                this.Ctrl.height = this.Height;
                            break;
                        case "Width":
                            if (this.HasValue(this.Width))
                                this.Ctrl.width = this.Width;
                            break;
                        case "Foreground":
                            if (this.HasValue(this.Foreground))
                                this._textBlock.color = this.Foreground;
                            break;
                        case "Background":
                            if (this.HasValue(this.Background))
                                this.Ctrl.background = this.Background;
                            break;
                        case "Text":
                            if (this.HasValue(this.Text))
                                this._textBlock.text = this.Text;
                            break;
                        case "Top":
                            if (this.HasValue(this.Top))
                                this.Ctrl.top = this.Top;
                            break;
                        case "Alpha":
                            if (this.HasValue(this.Alpha))
                                this.Ctrl.alpha = this.Alpha;
                            break;
                        case "CornerRadius":
                            if (this.HasValue(this.CornerRadius))
                                this.Ctrl.cornerRadius = this.CornerRadius;
                            break;
                        case "LinkOffsetY":
                            if (this.HasValue(this.LinkOffsetY))
                                this.Ctrl.linkOffsetY = this.LinkOffsetY;
                            break;
                        case "Thickness":
                            if (this.HasValue(this.Thickness))
                                this.Ctrl.thickness = this.Thickness;
                            break;
                        case "ZIndex":
                            if (this.HasValue(this.ZIndex))
                                this.Ctrl.zIndex = this.ZIndex;
                            break;
                    }
                }
                ClearCtrl() {
                    if (!this.HasValue(this.Ctrl))
                        return;
                    if (!this.HasValue(this._textBlock)) {
                        this._textBlock.dispose();
                        this._textBlock = null;
                    }
                    this.bjsCtrl.dispose();
                    this.Ctrl = null;
                }
                CreateCtrl() {
                    this.ClearCtrl();
                    this.Ctrl = new BABYLON.GUI.Rectangle(this.Name);
                    this._textBlock = new BABYLON.GUI.TextBlock();
                    this.Ctrl.addControl(this._textBlock);
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_63("Label", Label);
        }
    };
});
System.register("Xaml/jupiter/controls/Light", ["Xaml/jupiter/UIElement"], function (exports_64, context_64) {
    "use strict";
    var UIElement_24, Light;
    var __moduleName = context_64 && context_64.id;
    return {
        setters: [
            function (UIElement_24_1) {
                UIElement_24 = UIElement_24_1;
            }
        ],
        execute: function () {
            Light = class Light extends UIElement_24.UIElement {
                get SceneName() { return this._sceneName; }
                get Direction() { return this._direction; }
                get Type() { return this._type; }
                get DiffuseColor() { return this._diffuseColor; }
                get SpecularColor() { return this._specularColor; }
                get Intensity() { return this._intensity; }
                set SceneName(value) { this._sceneName = value; }
                set Direction(value) { this._direction = value; }
                set Type(value) { this._type = value; }
                set DiffuseColor(value) { this._diffuseColor = value; }
                set SpecularColor(value) { this._specularColor = value; }
                set Intensity(value) { this._intensity = value; }
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    if (this.Type === "HemisphericLight") {
                        this.Ctrl = new BABYLON.HemisphericLight(this.Name, this.Direction, scene.Ctrl);
                        this.RefreshCtrlProperty("Intensity");
                    }
                    else if (this.Type === "PointLight") {
                        this.Ctrl = new BABYLON.PointLight(this.Name, this.Direction, scene.Ctrl);
                        this.RefreshCtrlProperty("DiffuseColor");
                        this.RefreshCtrlProperty("SpecularColor");
                        this.RefreshCtrlProperty("Intensity");
                    }
                    else if (this.Type === "DirectionalLight") {
                        this.Ctrl = new BABYLON.DirectionalLight(this.Name, this.Direction, scene.Ctrl);
                        this.RefreshCtrlProperty("DiffuseColor");
                        this.RefreshCtrlProperty("SpecularColor");
                    }
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Scene", "SceneName");
                    this.UpdatePropertyByNodeAndFunction(node, "Direction", "Direction", this.ConvertToNewBabylonObject);
                    this.UpdatePropertyByNode(node, "Type", "Type");
                    this.UpdatePropertyByNodeAndFunction(node, "DiffuseColor", "DiffuseColor", this.CleanBabylonColor3Attribute);
                    this.UpdatePropertyByNodeAndFunction(node, "SpecularColor", "SpecularColor", this.CleanBabylonColor3Attribute);
                    this.UpdatePropertyByNodeAndFunction(node, "Intensity", "Intensity", parseFloat);
                }
                SetValue(propertyName, value) {
                    switch (propertyName) {
                        case "Direction":
                            this.UpdatePropertyByValue(propertyName, value, this.ConvertToNewBabylonObject);
                            break;
                        case "DiffuseColor":
                            this.UpdatePropertyByValue(propertyName, value, this.CleanBabylonColor3Attribute);
                            break;
                        case "SpecularColor":
                            this.UpdatePropertyByValue(propertyName, value, this.CleanBabylonColor3Attribute);
                            break;
                        case "Intensity":
                            this.UpdatePropertyByValue(propertyName, value, parseFloat);
                            break;
                    }
                    this.RefreshCtrlProperty(propertyName);
                }
                RefreshCtrlProperty(propertyName) {
                    switch (propertyName) {
                        case "Direction":
                            if (this.HasValue(this.Direction)) {
                                if (this.Type === "HemisphericLight")
                                    this.Ctrl.setDirectionToTarget(this.Direction);
                                else if (this.Type === "PointLight")
                                    this.Ctrl.setDirectionToTarget(this.Direction);
                                else if (this.Type === "DirectionalLight")
                                    this.Ctrl.setDirectionToTarget(this.Direction);
                            }
                            break;
                        case "DiffuseColor":
                            if (this.HasValue(this.DiffuseColor)) {
                                if (this.Type === "HemisphericLight")
                                    this.Ctrl.diffuse = this.DiffuseColor;
                                else if (this.Type === "PointLight")
                                    this.Ctrl.diffuse = this.DiffuseColor;
                                else if (this.Type === "DirectionalLight")
                                    this.Ctrl.diffuse = this.DiffuseColor;
                            }
                            break;
                        case "SpecularColor":
                            if (this.HasValue(this.SpecularColor)) {
                                if (this.Type === "HemisphericLight")
                                    this.Ctrl.specular = this.SpecularColor;
                                else if (this.Type === "PointLight")
                                    this.Ctrl.specular = this.SpecularColor;
                                else if (this.Type === "DirectionalLight")
                                    this.Ctrl.specular = this.SpecularColor;
                            }
                            break;
                        case "Intensity":
                            if (this.HasValue(this.Intensity)) {
                                if (this.Type === "HemisphericLight")
                                    this.Ctrl.intensity = this.Intensity;
                                else if (this.Type === "PointLight")
                                    this.Ctrl.intensity = this.Intensity;
                                else if (this.Type === "DirectionalLight")
                                    this.Ctrl.intensity = this.Intensity;
                            }
                            break;
                    }
                }
            };
            exports_64("Light", Light);
        }
    };
});
System.register("Xaml/jupiter/controls/ParticleSystem", ["Xaml/jupiter/UIElement", "libs/typescript-collections/src/lib/index"], function (exports_65, context_65) {
    "use strict";
    var UIElement_25, lib_3, ParticleSystem;
    var __moduleName = context_65 && context_65.id;
    return {
        setters: [
            function (UIElement_25_1) {
                UIElement_25 = UIElement_25_1;
            },
            function (lib_3_1) {
                lib_3 = lib_3_1;
            }
        ],
        execute: function () {
            ParticleSystem = class ParticleSystem extends UIElement_25.UIElement {
                constructor() {
                    super();
                    this._updateable = false;
                    this._autoStart = true;
                    this._childParticles = new lib_3.LinkedDictionary();
                }
                get Children() { return this._childParticles; }
                get SceneName() { return this._sceneName; }
                get Updateable() { return this._updateable; }
                get Type() { return this._type; }
                get Capacity() { return this._capacity; }
                get ParticleTexture() { return this._particleTexture; }
                get MinAngularSpeed() { return this._minAngularSpeed; }
                get MaxAngularSpeed() { return this._maxAngularSpeed; }
                get MinSize() { return this._minSize; }
                get MaxSize() { return this._maxSize; }
                get MinLifeTime() { return this._minLifeTime; }
                get MaxLifeTime() { return this._maxLifeTime; }
                get MinEmitPower() { return this._minEmitPower; }
                get MaxEmitPower() { return this._maxEmitPower; }
                get EmitterName() { return this._emitterName; }
                get EmitRate() { return this._emitRate; }
                get UpdateSpeed() { return this._updateSpeed; }
                get BlendMode() { return this._blendMode; }
                get MinEmitBox() { return this._minEmitBox; }
                get MaxEmitBox() { return this._maxEmitBox; }
                get Direction1() { return this._direction1; }
                get Direction2() { return this._direction2; }
                get Color1() { return this._color1; }
                get Color2() { return this._color2; }
                get ColorDead() { return this._colorDead; }
                get Gravity() { return this._gravity; }
                get AutoStart() { return this._autoStart; }
                get Emitter() { return this._emitter; }
                set Children(value) { this._childParticles = value; }
                set SceneName(value) { this._sceneName = value; }
                set Updateable(value) { this._updateable = value; }
                set Type(value) { this._type = value; }
                set Capacity(value) { this._capacity = value; }
                set ParticleTexture(value) { this._particleTexture = value; }
                set MinAngularSpeed(value) { this._minAngularSpeed = value; }
                set MaxAngularSpeed(value) { this._maxAngularSpeed = value; }
                set MinSize(value) { this._minSize = value; }
                set MaxSize(value) { this._maxSize = value; }
                set MinLifeTime(value) { this._minLifeTime = value; }
                set MaxLifeTime(value) { this._maxLifeTime = value; }
                set MinEmitPower(value) { this._minEmitPower = value; }
                set MaxEmitPower(value) { this._maxEmitPower = value; }
                set EmitterName(value) { this._emitterName = value; }
                set EmitRate(value) { this._emitRate = value; }
                set UpdateSpeed(value) { this._updateSpeed = value; }
                set BlendMode(value) { this._blendMode = value; }
                set MinEmitBox(value) { this._minEmitBox = value; }
                set MaxEmitBox(value) { this._maxEmitBox = value; }
                set Direction1(value) { this._direction1 = value; }
                set Direction2(value) { this._direction2 = value; }
                set Color1(value) { this._color1 = value; }
                set Color2(value) { this._color2 = value; }
                set ColorDead(value) { this._colorDead = value; }
                set Gravity(value) { this._gravity = value; }
                set AutoStart(value) { this._autoStart = value; }
                set Emitter(value) { this._emitter = value; }
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    if (this.Type === "SolidParticleSystem") {
                        this.Ctrl = new BABYLON.SolidParticleSystem(this.Name, scene.Ctrl, { updatable: this.Updateable });
                    }
                    else if (this.Type === "ParticleSystem") {
                        this.Ctrl = new BABYLON.ParticleSystem(this.Name, this.Capacity, scene.Ctrl);
                        this.Ctrl.particleTexture = new BABYLON.Texture(this.ParticleTexture, scene.Ctrl);
                        if (this.HasValue(this.MinAngularSpeed))
                            this.Ctrl.minAngularSpeed = this.MinAngularSpeed;
                        if (this.HasValue(this.MaxAngularSpeed))
                            this.Ctrl.maxAngularSpeed = this.MaxAngularSpeed;
                        if (this.HasValue(this.MinSize))
                            this.Ctrl.minSize = this.MinSize;
                        if (this.HasValue(this.MaxSize))
                            this.Ctrl.maxSize = this.MaxSize;
                        if (this.HasValue(this.MinLifeTime))
                            this.Ctrl.minLifeTime = this.MinLifeTime;
                        if (this.HasValue(this.MaxLifeTime))
                            this.Ctrl.maxLifeTime = this.MaxLifeTime;
                        if (this.HasValue(this.MinEmitPower))
                            this.Ctrl.minEmitPower = this.MinEmitPower;
                        if (this.HasValue(this.MaxEmitPower))
                            this.Ctrl.maxEmitPower = this.MaxEmitPower;
                        if (this.HasValue(this.EmitRate))
                            this.Ctrl.emitRate = this.EmitRate;
                        if (this.HasValue(this.BlendMode))
                            this.Ctrl.blendMode = this.BlendMode;
                        if (this.HasValue(this.MinEmitBox))
                            this.Ctrl.minEmitBox = this.MinEmitBox;
                        if (this.HasValue(this.MaxEmitBox))
                            this.Ctrl.maxEmitBox = this.MaxEmitBox;
                        if (this.HasValue(this.Direction1))
                            this.Ctrl.direction1 = this.Direction1;
                        if (this.HasValue(this.Direction2))
                            this.Ctrl.direction2 = this.Direction2;
                        if (this.HasValue(this.Color1))
                            this.Ctrl.color1 = this.Color1;
                        if (this.HasValue(this.Color2))
                            this.Ctrl.color2 = this.Color2;
                        if (this.HasValue(this.ColorDead))
                            this.Ctrl.colorDead = this.ColorDead;
                        if (this.HasValue(this.Gravity))
                            this.Ctrl.gravity = this.Gravity;
                        if (this.HasValue(this.UpdateSpeed))
                            this.Ctrl.updateSpeed = this.UpdateSpeed;
                        if (this.HasValue(this.Emitter) || this.HasValue(this.EmitterName))
                            this.Ctrl.emitter = this.HasValue(this.EmitterName) ? this.VT.Get(this.EmitterName).Ctrl : this.Emitter;
                        if (this.HasValue(this.AutoStart) && this.AutoStart === true) {
                            this.Ctrl.start();
                        }
                    }
                    this.Children.forEach((key, child) => {
                        child.Initialize();
                    });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Scene", "SceneName");
                    this.UpdatePropertyByNodeAndFunction(node, "Updateable", "Updateable", this.ConvertToBoolean);
                    this.UpdatePropertyByNode(node, "Type", "Type");
                    this.UpdatePropertyByNodeAndFunction(node, "Capacity", "Capacity", parseInt);
                    this.UpdatePropertyByNode(node, "ParticleTexture", "ParticleTexture");
                    this.UpdatePropertyByNodeAndFunction(node, "MinAngularSpeed", "MinAngularSpeed", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "MaxAngularSpeed", "MaxAngularSpeed", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "MinSize", "MinSize", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "MaxSize", "MaxSize", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "MinLifeTime", "MinLifeTime", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "MaxLifeTime", "MaxLifeTime", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "MinEmitPower", "MinEmitPower", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "MaxEmitPower", "MaxEmitPower", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "EmitRate", "EmitRate", parseInt);
                    this.UpdatePropertyByNodeAndFunction(node, "BlendMode", "BlendMode", this.ConvertToBabylonObject);
                    this.UpdatePropertyByNodeAndFunction(node, "MinEmitBox", "MinEmitBox", this.ConvertToNewBabylonObject);
                    this.UpdatePropertyByNodeAndFunction(node, "MaxEmitBox", "MaxEmitBox", this.ConvertToNewBabylonObject);
                    this.UpdatePropertyByNodeAndFunction(node, "Direction1", "Direction1", this.ConvertToNewBabylonObject);
                    this.UpdatePropertyByNodeAndFunction(node, "Direction2", "Direction2", this.ConvertToNewBabylonObject);
                    this.UpdatePropertyByNodeAndFunction(node, "Color1", "Color1", this.ConvertToNewBabylonObject);
                    this.UpdatePropertyByNodeAndFunction(node, "Color2", "Color2", this.ConvertToNewBabylonObject);
                    this.UpdatePropertyByNodeAndFunction(node, "ColorDead", "ColorDead", this.ConvertToNewBabylonObject);
                    this.UpdatePropertyByNodeAndFunction(node, "Gravity", "Gravity", this.ConvertToNewBabylonObject);
                    this.UpdatePropertyByNodeAndFunction(node, "UpdateSpeed", "UpdateSpeed", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "AutoStart", "AutoStart", this.ConvertToBoolean);
                    this.UpdatePropertyByNode(node, "EmitterName", "EmitterName");
                    this.UpdatePropertyByNodeAndFunction(node, "Emitter", "Emitter", this.ConvertToNewBabylonObject);
                }
            };
            exports_65("ParticleSystem", ParticleSystem);
        }
    };
});
System.register("Xaml/jupiter/controls/ParticleSystemShape", ["Xaml/jupiter/UIElement"], function (exports_66, context_66) {
    "use strict";
    var UIElement_26, ParticleSystemShape;
    var __moduleName = context_66 && context_66.id;
    return {
        setters: [
            function (UIElement_26_1) {
                UIElement_26 = UIElement_26_1;
            }
        ],
        execute: function () {
            ParticleSystemShape = class ParticleSystemShape extends UIElement_26.UIElement {
                constructor() {
                    super();
                }
                get SceneName() { return this._sceneName; }
                get MeshName() { return this._meshName; }
                get NB() { return this._nb; }
                set SceneName(value) { this._sceneName = value; }
                set MeshName(value) { this._meshName = value; }
                set NB(value) { this._nb = value; }
                Initialize() {
                    let ps = this.Parent;
                    let mesh = this.VT.Get(this.MeshName);
                    if (this.ChildrenEvents.size() > 0) {
                        let options = {};
                        if (this.ChildrenEvents.containsKey("positionFunction")) {
                            try {
                                options["positionFunction"] = eval(this.ChildrenEvents.getValue("positionFunction").Code);
                            }
                            catch (_a) { }
                        }
                        if (this.ChildrenEvents.containsKey("vertexFunction")) {
                            try {
                                options["vertexFunction"] = eval(this.ChildrenEvents.getValue("vertexFunction").Code);
                            }
                            catch (_b) { }
                        }
                        ps.Ctrl.addShape(mesh.Ctrl, this.NB, options);
                    }
                    else if (this.HasScript) {
                        let posFn = eval(this.Code);
                        ps.Ctrl.addShape(mesh.Ctrl, this.NB, { positionFunction: posFn });
                    }
                    let newMesh = ps.Ctrl.buildMesh();
                    mesh.Ctrl.dispose();
                }
                LoadFromNode(node) {
                    this.UpdatePropertyByNode(node, "Scene", "SceneName");
                    this.UpdatePropertyByNode(node, "Mesh", "MeshName");
                    this.UpdatePropertyByNodeAndFunction(node, "NB", "NB", parseInt);
                    try {
                        let parser = new DOMParser();
                        let scriptFound = parser.parseFromString(node.innerHTML, "text/html");
                        this.Code = node.childNodes[1].wholeText;
                        this.HasScript = true;
                    }
                    catch (e) { }
                    super.LoadFromNode(node);
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        if (this.HasScript) {
                            let ps = parent;
                            ps.Children.setValue(this.Name, this);
                        }
                        return true;
                    }
                    return false;
                }
            };
            exports_66("ParticleSystemShape", ParticleSystemShape);
        }
    };
});
System.register("Xaml/behaviors/SceneMouseWheelZoom", [], function (exports_67, context_67) {
    "use strict";
    var SceneMouseWheelZoom;
    var __moduleName = context_67 && context_67.id;
    return {
        setters: [],
        execute: function () {
            SceneMouseWheelZoom = class SceneMouseWheelZoom {
                constructor() {
                }
                static Install(scene) {
                    scene.Ctrl.onPrePointerObservable.add((pointerInfo, eventState) => {
                        var event = pointerInfo.event;
                        var delta = 0;
                        if (event.wheelDelta)
                            delta = event.wheelDelta;
                        else if (event.detail)
                            delta = -event.detail;
                        if (delta) {
                            var dir = scene.Ctrl.activeCamera.getDirection(BABYLON.Axis.Z);
                            if (delta > 0)
                                scene.Ctrl.activeCamera.position.addInPlace(dir);
                            else
                                scene.Ctrl.activeCamera.position.subtractInPlace(dir);
                        }
                    }, BABYLON.PointerEventTypes.POINTERWHEEL, false);
                }
            };
            exports_67("SceneMouseWheelZoom", SceneMouseWheelZoom);
        }
    };
});
System.register("services/VisualTree", ["inversify", "libs/typescript-collections/src/lib/index"], function (exports_68, context_68) {
    "use strict";
    var inversify_1, lib_4, VisualTree;
    var __moduleName = context_68 && context_68.id;
    return {
        setters: [
            function (inversify_1_1) {
                inversify_1 = inversify_1_1;
            },
            function (lib_4_1) {
                lib_4 = lib_4_1;
            }
        ],
        execute: function () {
            VisualTree = class VisualTree {
                constructor() {
                    this._flatList = new lib_4.Dictionary();
                }
                Add(key, value) {
                    if (key === undefined || key === null) {
                        return;
                    }
                    this._flatList.setValue(key, value);
                }
                FindByName(key) { return this.Get(key); }
                Get(key) { return this._flatList.getValue(key); }
                ParseScript(codeTemplate) {
                    let finalCode = codeTemplate;
                    this._flatList.forEach((k, v) => {
                        finalCode += `var ${k}`;
                    });
                    return "";
                }
            };
            VisualTree = __decorate([
                inversify_1.injectable(),
                __metadata("design:paramtypes", [])
            ], VisualTree);
            exports_68("VisualTree", VisualTree);
        }
    };
});
System.register("Xaml/behaviors/MoveSelectedMesh", ["Xaml/Core", "services/VisualTree"], function (exports_69, context_69) {
    "use strict";
    var Core_11, VisualTree_1, MoveSelectedMesh;
    var __moduleName = context_69 && context_69.id;
    return {
        setters: [
            function (Core_11_1) {
                Core_11 = Core_11_1;
            },
            function (VisualTree_1_1) {
                VisualTree_1 = VisualTree_1_1;
            }
        ],
        execute: function () {
            MoveSelectedMesh = class MoveSelectedMesh {
                constructor() {
                }
                Install(scene, canvas, groundName, cameraName) {
                    let vt = Core_11.DIContainer.get(VisualTree_1.VisualTree);
                    this.canvas = canvas;
                    this.ground = vt.Get(groundName);
                    this.camera = vt.Get(cameraName);
                    this.scene = scene;
                    canvas.addEventListener("pointerdown", (evt) => { this.onPointerDown(evt); }, false);
                    canvas.addEventListener("pointerup", () => { this.onPointerUp(); }, false);
                    canvas.addEventListener("pointermove", (evt) => { this.onPointerMove(evt); }, false);
                    scene.Ctrl.onDispose = function () {
                        canvas.removeEventListener("pointerdown", this.onPointerDown);
                        canvas.removeEventListener("pointerup", this.onPointerUp);
                        canvas.removeEventListener("pointermove", this.onPointerMove);
                    };
                }
                getGroundPosition() {
                    var pickinfo = this.scene.Ctrl.pick(this.scene.Ctrl.pointerX, this.scene.Ctrl.pointerY, (mesh) => { return mesh == this.ground.Ctrl; });
                    if (pickinfo.hit)
                        return pickinfo.pickedPoint;
                    return null;
                }
                onPointerDown(evt) {
                    if (evt.button !== 0)
                        return;
                    if (this.ground === undefined || this.ground === null)
                        return;
                    var pickInfo = this.scene.Ctrl.pick(this.scene.Ctrl.pointerX, this.scene.Ctrl.pointerY, (mesh) => { return mesh !== this.ground.Ctrl; });
                    if (pickInfo.hit) {
                        this.currentMesh = pickInfo.pickedMesh;
                        this.startingPoint = this.getGroundPosition();
                        if (this.startingPoint) {
                            setTimeout(() => {
                                this.camera.Ctrl.detachControl(this.canvas);
                            }, 0);
                        }
                    }
                }
                onPointerUp() {
                    if (this.startingPoint) {
                        this.camera.Ctrl.attachControl(this.canvas, true);
                        this.startingPoint = null;
                        return;
                    }
                }
                onPointerMove(evt) {
                    if (!this.startingPoint)
                        return;
                    var current = this.getGroundPosition();
                    if (!current)
                        return;
                    var diff = current.subtract(this.startingPoint);
                    this.currentMesh.position.addInPlace(diff);
                    this.startingPoint = current;
                }
            };
            exports_69("MoveSelectedMesh", MoveSelectedMesh);
        }
    };
});
System.register("Xaml/jupiter/controls/Scene", ["Xaml/jupiter/UIElement", "Xaml/behaviors/SceneMouseWheelZoom", "Xaml/behaviors/MoveSelectedMesh", "Xaml/Core"], function (exports_70, context_70) {
    "use strict";
    var UIElement_27, SceneMouseWheelZoom_1, MoveSelectedMesh_1, Core_12, Scene;
    var __moduleName = context_70 && context_70.id;
    return {
        setters: [
            function (UIElement_27_1) {
                UIElement_27 = UIElement_27_1;
            },
            function (SceneMouseWheelZoom_1_1) {
                SceneMouseWheelZoom_1 = SceneMouseWheelZoom_1_1;
            },
            function (MoveSelectedMesh_1_1) {
                MoveSelectedMesh_1 = MoveSelectedMesh_1_1;
            },
            function (Core_12_1) {
                Core_12 = Core_12_1;
            }
        ],
        execute: function () {
            Scene = class Scene extends UIElement_27.UIElement {
                constructor() {
                    super();
                }
                get GroundName() { return this._groundName; }
                get CameraName() { return this._cameraName; }
                get LightName() { return this._lightName; }
                get ClearColor() { return this._clearColor; }
                set GroundName(value) { this._groundName = value; }
                set CameraName(value) { this._cameraName = value; }
                set LightName(value) { this._lightName = value; }
                set ClearColor(value) { this._clearColor = value; }
                Initialize() {
                    let engine = Core_12.DIContainer.get("rootEngine");
                    let canvas = Core_12.DIContainer.get("rootCanvas");
                    this.Ctrl = new BABYLON.Scene(engine);
                    this.RefreshCtrlProperty("ClearColor");
                    SceneMouseWheelZoom_1.SceneMouseWheelZoom.Install(this);
                    new MoveSelectedMesh_1.MoveSelectedMesh().Install(this, canvas, this.GroundName, this.CameraName);
                    engine.runRenderLoop(() => {
                        this.Ctrl.render();
                    });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Camera", "CameraName");
                    this.UpdatePropertyByNode(node, "Light", "LightName");
                    this.UpdatePropertyByNode(node, "Ground", "GroundName");
                    this.UpdatePropertyByNodeAndFunction(node, "ClearColor", "ClearColor", this.CleanBabylonColor3Attribute);
                }
                SetValue(propertyName, value) {
                    switch (propertyName) {
                        case "ClearColor":
                            this.UpdatePropertyByValue(propertyName, value, this.CleanBabylonColor3Attribute);
                            break;
                    }
                    this.RefreshCtrlProperty(propertyName);
                }
                RefreshCtrlProperty(propertyName) {
                    switch (propertyName) {
                        case "ClearColor":
                            if (this.HasValue(this.ClearColor))
                                this.Ctrl.clearColor = this.ConvertColor3ToColor4(this.ClearColor);
                            break;
                    }
                }
            };
            exports_70("Scene", Scene);
        }
    };
});
System.register("Xaml/jupiter/controls/Script", ["Xaml/jupiter/UIElement"], function (exports_71, context_71) {
    "use strict";
    var UIElement_28, Script;
    var __moduleName = context_71 && context_71.id;
    return {
        setters: [
            function (UIElement_28_1) {
                UIElement_28 = UIElement_28_1;
            }
        ],
        execute: function () {
            Script = class Script extends UIElement_28.UIElement {
                constructor() {
                    super();
                }
                Initialize() {
                }
                LoadFromNode(node) {
                    try {
                        let parser = new DOMParser();
                        let scriptFound = parser.parseFromString(node.innerHTML, "text/html");
                        this.Code = scriptFound.body.innerText;
                        this.HasScript = true;
                    }
                    catch (e) { }
                    super.LoadFromNode(node);
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        if (this.HasScript) {
                            parent.HasScript = true;
                            parent.Code = this.Code;
                        }
                        return true;
                    }
                    return false;
                }
            };
            exports_71("Script", Script);
        }
    };
});
System.register("Xaml/jupiter/controls/ShadersStore", ["Xaml/jupiter/UIElement"], function (exports_72, context_72) {
    "use strict";
    var UIElement_29, ShadersStore;
    var __moduleName = context_72 && context_72.id;
    return {
        setters: [
            function (UIElement_29_1) {
                UIElement_29 = UIElement_29_1;
            }
        ],
        execute: function () {
            ShadersStore = class ShadersStore extends UIElement_29.UIElement {
                constructor() {
                    super();
                }
                Initialize() {
                    BABYLON.Effect.ShadersStore[this.Name] = this.Code;
                }
                LoadFromNode(node) {
                    try {
                        let parser = new DOMParser();
                        let scriptFound = parser.parseFromString(node.innerHTML, "text/html");
                        this.Code = scriptFound.body.innerText;
                    }
                    catch (e) { }
                    super.LoadFromNode(node);
                }
            };
            exports_72("ShadersStore", ShadersStore);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/Slider", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_73, context_73) {
    "use strict";
    var UIElement_30, Slider;
    var __moduleName = context_73 && context_73.id;
    return {
        setters: [
            function (UIElement_30_1) {
                UIElement_30 = UIElement_30_1;
            },
            function (_13) {
            }
        ],
        execute: function () {
            Slider = class Slider extends UIElement_30.UIElement {
                constructor() {
                    super();
                }
                get Height() { return this._height; }
                get Width() { return this._width; }
                get Min() { return this._min; }
                get Max() { return this._max; }
                get Value() { return this._value; }
                get Color() { return this._color; }
                get Background() { return this._background; }
                get HorizontalAlignment() { return this._horizontalAlignment; }
                set Height(value) { this._height = value; }
                set Width(value) { this._width = value; }
                set Min(value) { this._min = value; }
                set Max(value) { this._max = value; }
                set Value(value) { this._value = value; }
                set Color(value) { this._color = value; }
                set Background(value) { this._background = value; }
                set HorizontalAlignment(value) { this._horizontalAlignment = value; }
                Initialize() {
                    this.CreateCtrl();
                    this.RefreshCtrlProperty("Height");
                    this.RefreshCtrlProperty("Width");
                    this.RefreshCtrlProperty("Minimum");
                    this.RefreshCtrlProperty("Maximum");
                    this.RefreshCtrlProperty("Value");
                    this.RefreshCtrlProperty("Color");
                    this.RefreshCtrlProperty("Background");
                    this.RefreshCtrlProperty("HorizontalAlignment");
                    this.Ctrl.text = this.Value;
                    this.Parent.Ctrl.addControl(this.Ctrl);
                    this.ChildrenGUIs.forEach((key, child) => {
                        child.Initialize();
                    });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Width", "Width");
                    this.UpdatePropertyByNode(node, "Height", "Height");
                    this.UpdatePropertyByNodeAndFunction(node, "Minimum", "Min", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "Minimum", "Min", eval);
                    this.UpdatePropertyByNodeAndFunction(node, "Maximum", "Max", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "Maximum", "Max", eval);
                    this.UpdatePropertyByNode(node, "Value", "Value");
                    this.UpdatePropertyByNode(node, "Color", "Color");
                    this.UpdatePropertyByNode(node, "Background", "Background");
                    this.UpdatePropertyByNodeAndFunction(node, "HorizontalAlignment", "HorizontalAlignment", eval);
                }
                SetValue(propertyName, value) {
                    switch (propertyName) {
                        case "Height":
                        case "Width":
                        case "Color":
                        case "Background":
                        case "Value":
                            this.UpdatePropertyByValue(propertyName, value, null);
                            break;
                        case "HorizontalAlignment":
                            this.UpdatePropertyByValue(propertyName, value, eval);
                            break;
                        case "Minimum":
                            this.UpdatePropertyByValue("Min", value, parseFloat);
                            this.UpdatePropertyByValue("Min", value, eval);
                            break;
                        case "Maximum":
                            this.UpdatePropertyByValue("Max", value, parseFloat);
                            this.UpdatePropertyByValue("Max", value, eval);
                            break;
                        default: return;
                    }
                    this.RefreshCtrlProperty(propertyName);
                }
                RefreshCtrlProperty(propertyName) {
                    switch (propertyName) {
                        case "Height":
                            if (this.HasValue(this.Height))
                                this.Ctrl.height = this.Height;
                            break;
                        case "Width":
                            if (this.HasValue(this.Width))
                                this.Ctrl.width = this.Width;
                            break;
                        case "Minimum":
                            if (this.HasValue(this.Min))
                                this.Ctrl.minimum = this.Min;
                            break;
                        case "Maximum":
                            if (this.HasValue(this.Max))
                                this.Ctrl.maximum = this.Max;
                            break;
                        case "Value":
                            if (this.HasValue(this.Value))
                                this.Ctrl.value = this.Value;
                            break;
                        case "Color":
                            if (this.HasValue(this.Color))
                                this.Ctrl.color = this.Color;
                            break;
                        case "Background":
                            if (this.HasValue(this.Background))
                                this.Ctrl.background = this.Background;
                            break;
                        case "HorizontalAlignment":
                            if (this.HasValue(this.HorizontalAlignment))
                                this.Ctrl.horizontalAlignment = this.HorizontalAlignment;
                            break;
                    }
                }
                ClearCtrl() {
                    if (!this.HasValue(this.Ctrl))
                        return;
                    this.bjsCtrl.dispose();
                    this.Ctrl = null;
                }
                CreateCtrl() {
                    this.ClearCtrl();
                    this.Ctrl = new BABYLON.GUI.Slider(this.Name);
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_73("Slider", Slider);
        }
    };
});
System.register("Xaml/jupiter/controls/Sphere", ["Xaml/jupiter/UIElement", "Xaml/behaviors/MeshNormalLines"], function (exports_74, context_74) {
    "use strict";
    var UIElement_31, MeshNormalLines_3, Sphere;
    var __moduleName = context_74 && context_74.id;
    return {
        setters: [
            function (UIElement_31_1) {
                UIElement_31 = UIElement_31_1;
            },
            function (MeshNormalLines_3_1) {
                MeshNormalLines_3 = MeshNormalLines_3_1;
            }
        ],
        execute: function () {
            Sphere = class Sphere extends UIElement_31.UIElement {
                get SceneName() { return this._sceneName; }
                get MaterialName() { return this._materialName; }
                get ShowNormalLines() { return this._showNormalLines; }
                get Segments() { return this._segments; }
                get Diameter() { return this._diameter; }
                get RotationQuaternion() { return this._rotationQuaternion; }
                set SceneName(value) { this._sceneName = value; }
                set MaterialName(value) { this._materialName = value; }
                set ShowNormalLines(value) { this._showNormalLines = value; }
                set Segments(value) { this._segments = value; }
                set Diameter(value) { this._diameter = value; }
                set RotationQuaternion(value) { this._rotationQuaternion = value; }
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    this._scene = scene;
                    this.CreateCtrl();
                    this.RefreshCtrlProperty("Position");
                    this.RefreshCtrlProperty("MaterialName");
                    this.RefreshCtrlProperty("RotationQuaternion");
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Scene", "SceneName");
                    this.UpdatePropertyByNode(node, "Material", "MaterialName");
                    this.UpdatePropertyByNodeAndFunction(node, "ShowNormalLines", "ShowNormalLines", this.ConvertToBoolean);
                    this.UpdatePropertyByNodeAndFunction(node, "Segments", "Segments", parseInt);
                    this.UpdatePropertyByNodeAndFunction(node, "Diameter", "Diameter", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "RotationQuaternion", "RotationQuaternion", this.ConvertToNewBabylonObject);
                }
                SetValue(propertyName, value) {
                    switch (propertyName) {
                        case "Segments":
                            this.UpdatePropertyByValue(propertyName, value, parseInt);
                            break;
                        case "Diameter":
                            this.UpdatePropertyByValue(propertyName, value, parseFloat);
                            break;
                        case "ShowNormalLines":
                            this.UpdatePropertyByValue(propertyName, value, this.ConvertToBoolean);
                            break;
                        case "RotationQuaternion":
                            this.UpdatePropertyByValue(propertyName, value, this.ConvertToNewBabylonObject);
                            break;
                        case "Type":
                            this.UpdatePropertyByValue(propertyName, value, null);
                            break;
                        case "MaterialName":
                            this.UpdatePropertyByValue(propertyName, value, null);
                            break;
                        default: return;
                    }
                    this.RefreshCtrlProperty(propertyName);
                }
                RefreshCtrlProperty(propertyName) {
                    switch (propertyName) {
                        case "Segments":
                            if (this.HasValue(this.Segments))
                                this.CreateCtrl();
                            break;
                        case "Diameter":
                            if (this.HasValue(this.Diameter))
                                this.CreateCtrl();
                            break;
                        case "Position":
                            if (this.HasValue(this.Position))
                                this.Ctrl.position = this.Position;
                            break;
                        case "MaterialName": if (this.HasValue(this.MaterialName)) {
                            let material = this.VT.Get(this.MaterialName);
                            this.Ctrl.material = material.Ctrl;
                            break;
                        }
                        case "RotationQuaternion":
                            if (this.HasValue(this.RotationQuaternion))
                                this.Ctrl.rotationQuaternion = this.RotationQuaternion;
                            break;
                        case "ShowNormalLines":
                            if (this.HasValue(this.ShowNormalLines))
                                this.CreateCtrl();
                            break;
                    }
                }
                ClearCtrl() {
                    if (!this.HasValue(this.Ctrl))
                        return;
                    if (this.HasValue(this._normalLines)) {
                        this._normalLines.dispose();
                        this._normalLines = null;
                    }
                    this.bjsCtrl.dispose();
                    this.Ctrl = null;
                }
                CreateCtrl() {
                    this.ClearCtrl();
                    if (!this.HasValue(this._scene))
                        return;
                    this.Ctrl = BABYLON.Mesh.CreateSphere(this.Name, this.Segments, this.Diameter, this._scene.Ctrl);
                    if (this.HasValue(this.ShowNormalLines) && this.ShowNormalLines) {
                        this._normalLines = MeshNormalLines_3.MeshNormalLines.Install(this._scene, this.Ctrl);
                    }
                }
            };
            exports_74("Sphere", Sphere);
        }
    };
});
System.register("Xaml/jupiter/controls/SubEmitter", ["Xaml/jupiter/UIElement"], function (exports_75, context_75) {
    "use strict";
    var UIElement_32, SubEmitter;
    var __moduleName = context_75 && context_75.id;
    return {
        setters: [
            function (UIElement_32_1) {
                UIElement_32 = UIElement_32_1;
            }
        ],
        execute: function () {
            SubEmitter = class SubEmitter extends UIElement_32.UIElement {
                constructor() {
                    super();
                }
                get Type() { return this._type; }
                get ParticleSystemName() { return this._particleSystemName; }
                get ParticleCount() { return this._particleCount; }
                get SceneName() { return this._sceneName; }
                get InheritDirection() { return this._inheritDirection; }
                get InheritedVelocityAmount() { return this._inheritedVelocityAmount; }
                set Type(value) { this._type = value; }
                set ParticleSystemName(value) { this._particleSystemName = value; }
                set ParticleCount(value) { this._particleCount = value; }
                set SceneName(value) { this._sceneName = value; }
                set InheritDirection(value) { this._inheritDirection = value; }
                set InheritedVelocityAmount(value) { this._inheritedVelocityAmount = value; }
                Initialize() {
                    let scene = this.VT.FindByName(this.SceneName);
                    if (this.HasValue(this.ParticleSystemName)) {
                        let particleSystem = this.VT.FindByName(this.ParticleSystemName);
                        this.Ctrl = new BABYLON.SubEmitter(particleSystem.Ctrl);
                    }
                    else if (this.HasValue(this.ParticleCount)) {
                        this.Ctrl = new BABYLON.SubEmitter(new BABYLON.ParticleSystem(`ps${this.Name}`, this.ParticleCount, scene.Ctrl));
                    }
                    this.Ctrl.type = this.Type;
                    this.Ctrl.inheritDirection = this.InheritDirection;
                    if (this.HasValue(this.InheritedVelocityAmount))
                        this.Ctrl.inheritedVelocityAmount = this.InheritedVelocityAmount;
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNodeAndFunction(node, "Type", "Type", this.ConvertToBabylonObject);
                    this.UpdatePropertyByNode(node, "Scene", "SceneName");
                    this.UpdatePropertyByNode(node, "ParticleSystem", "ParticleSystemName");
                    this.UpdatePropertyByNodeAndFunction(node, "ParticleCount", "ParticleCount", parseInt);
                    this.UpdatePropertyByNodeAndFunction(node, "InheritedVelocityAmount", "InheritedVelocityAmount", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "InheritDirection", "InheritDirection", this.ConvertToBoolean);
                }
            };
            exports_75("SubEmitter", SubEmitter);
        }
    };
});
System.register("Xaml/jupiter/controls/Torus", ["Xaml/behaviors/MeshNormalLines", "Xaml/jupiter/AnimatableUIElement"], function (exports_76, context_76) {
    "use strict";
    var MeshNormalLines_4, AnimatableUIElement_4, Torus;
    var __moduleName = context_76 && context_76.id;
    return {
        setters: [
            function (MeshNormalLines_4_1) {
                MeshNormalLines_4 = MeshNormalLines_4_1;
            },
            function (AnimatableUIElement_4_1) {
                AnimatableUIElement_4 = AnimatableUIElement_4_1;
            }
        ],
        execute: function () {
            Torus = class Torus extends AnimatableUIElement_4.AnimatableUIElement {
                get SceneName() { return this._sceneName; }
                get MaterialName() { return this._materialName; }
                get ShowNormalLines() { return this._showNormalLines; }
                get Diameter() { return this._diameter; }
                get Thickness() { return this._thickness; }
                get Tesselation() { return this._tesselation; }
                set SceneName(value) { this._sceneName = value; }
                set MaterialName(value) { this._materialName = value; }
                set ShowNormalLines(value) { this._showNormalLines = value; }
                set Diameter(value) { this._diameter = value; }
                set Thickness(value) { this._thickness = value; }
                set Tesselation(value) { this._tesselation = value; }
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    this._scene = scene;
                    this.CreateCtrl();
                    this.InitializeAnimation();
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    this.UpdatePropertyByNode(node, "Scene", "SceneName");
                    this.UpdatePropertyByNode(node, "Material", "MaterialName");
                    this.UpdatePropertyByNodeAndFunction(node, "ShowNormalLines", "ShowNormalLines", this.ConvertToBoolean);
                    this.UpdatePropertyByNodeAndFunction(node, "Diameter", "Diameter", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "Thickness", "Thickness", parseFloat);
                    this.UpdatePropertyByNodeAndFunction(node, "Tesselation", "Tesselation", parseFloat);
                }
                SetValue(propertyName, value) {
                    switch (propertyName) {
                        case "Diameter":
                        case "Thickness":
                        case "Tesselation":
                            this.UpdatePropertyByValue(propertyName, value, parseFloat);
                            break;
                        case "ShowNormalLines":
                            this.UpdatePropertyByValue(propertyName, value, this.ConvertToBoolean);
                            break;
                    }
                    this.RefreshCtrlProperty(propertyName);
                }
                RefreshCtrlProperty(propertyName) {
                    switch (propertyName) {
                        case "Diameter":
                            if (this.HasValue(this.Diameter))
                                this.CreateCtrl();
                            break;
                        case "Thickness":
                            if (this.HasValue(this.Thickness))
                                this.CreateCtrl();
                            break;
                        case "Tesselation":
                            if (this.HasValue(this.Tesselation))
                                this.CreateCtrl();
                            break;
                        case "ShowNormalLines":
                            if (this.HasValue(this.ShowNormalLines))
                                this.CreateCtrl();
                            break;
                    }
                }
                ClearCtrl() {
                    if (!this.HasValue(this.Ctrl))
                        return;
                    if (this.HasValue(this._normalLines)) {
                        this._normalLines.dispose();
                        this._normalLines = null;
                    }
                    this.bjsCtrl.dispose();
                    this.Ctrl = null;
                }
                CreateCtrl() {
                    if (!this.HasValue(this.MaterialName))
                        return;
                    if (!this.HasValue(this._scene))
                        return;
                    this.ClearCtrl();
                    let material = this.VT.Get(this.MaterialName);
                    this.Ctrl = BABYLON.Mesh.CreateTorus(this.Name, this._diameter, this._thickness, this._tesselation, this._scene.Ctrl);
                    this.Ctrl.material = material.Ctrl;
                    this.Ctrl.position = this.Position;
                    if (this.HasValue(this.ShowNormalLines) && this.ShowNormalLines) {
                        this._normalLines = MeshNormalLines_4.MeshNormalLines.Install(this._scene, this.Ctrl);
                    }
                }
                StartAnimation() {
                    if (this.Animations && this.Animations.Animations)
                        this.Animations.Animations.forEach((animation) => {
                            this._scene.Ctrl.beginAnimation(this.Ctrl, 1, 100, true);
                        });
                }
                StopAnimation() {
                    if (this.Animations && this.Animations.Animations)
                        this.Animations.Animations.forEach((animation) => {
                            this._scene.Ctrl.stopAnimation(this.Ctrl);
                        });
                }
            };
            exports_76("Torus", Torus);
        }
    };
});
System.register("Xaml/jupiter/controls/Core", ["Xaml/jupiter/controls/Animation", "Xaml/jupiter/controls/AnimationCollection", "Xaml/jupiter/controls/Animations", "Xaml/jupiter/controls/Background", "Xaml/jupiter/controls/Box", "Xaml/jupiter/controls/Camera", "Xaml/jupiter/controls/Disc", "Xaml/jupiter/controls/Effect", "Xaml/jupiter/controls/Event", "Xaml/jupiter/controls/Ground", "Xaml/jupiter/controls/gui/Button", "Xaml/jupiter/controls/gui/CheckBox", "Xaml/jupiter/controls/gui/Code", "Xaml/jupiter/controls/gui/ColorPicker", "Xaml/jupiter/controls/gui/Ellipse", "Xaml/jupiter/controls/gui/Grid", "Xaml/jupiter/controls/gui/Line", "Xaml/jupiter/controls/gui/RadioButton", "Xaml/jupiter/controls/gui/Resources", "Xaml/jupiter/controls/gui/Resource", "Xaml/jupiter/controls/gui/StackPanel", "Xaml/jupiter/controls/gui/TextBlock", "Xaml/jupiter/controls/KeyFrame", "Xaml/jupiter/controls/KeyFrameCollection", "Xaml/jupiter/controls/KeyFrames", "Xaml/jupiter/controls/gui/Label", "Xaml/jupiter/controls/Light", "Xaml/jupiter/controls/Mesh", "Xaml/jupiter/controls/ParticleSystem", "Xaml/jupiter/controls/ParticleSystemShape", "Xaml/jupiter/controls/Plane", "Xaml/jupiter/controls/Panel", "Xaml/jupiter/controls/Scene", "Xaml/jupiter/controls/Script", "Xaml/jupiter/controls/ShadersStore", "Xaml/jupiter/controls/gui/Slider", "Xaml/jupiter/controls/Sphere", "Xaml/jupiter/controls/SubEmitter", "Xaml/jupiter/controls/Texture", "Xaml/jupiter/controls/Torus", "Xaml/jupiter/controls/Material"], function (exports_77, context_77) {
    "use strict";
    var __moduleName = context_77 && context_77.id;
    function exportStar_2(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_77(exports);
    }
    return {
        setters: [
            function (Animation_1_1) {
                exportStar_2(Animation_1_1);
            },
            function (AnimationCollection_1_1) {
                exportStar_2(AnimationCollection_1_1);
            },
            function (Animations_1_1) {
                exportStar_2(Animations_1_1);
            },
            function (Background_1_1) {
                exportStar_2(Background_1_1);
            },
            function (Box_1_1) {
                exportStar_2(Box_1_1);
            },
            function (Camera_1_1) {
                exportStar_2(Camera_1_1);
            },
            function (Disc_1_1) {
                exportStar_2(Disc_1_1);
            },
            function (Effect_1_1) {
                exportStar_2(Effect_1_1);
            },
            function (Event_1_1) {
                exportStar_2(Event_1_1);
            },
            function (Ground_1_1) {
                exportStar_2(Ground_1_1);
            },
            function (Button_1_1) {
                exportStar_2(Button_1_1);
            },
            function (CheckBox_1_1) {
                exportStar_2(CheckBox_1_1);
            },
            function (Code_1_1) {
                exportStar_2(Code_1_1);
            },
            function (ColorPicker_1_1) {
                exportStar_2(ColorPicker_1_1);
            },
            function (Ellipse_1_1) {
                exportStar_2(Ellipse_1_1);
            },
            function (Grid_1_1) {
                exportStar_2(Grid_1_1);
            },
            function (Line_1_1) {
                exportStar_2(Line_1_1);
            },
            function (RadioButton_1_1) {
                exportStar_2(RadioButton_1_1);
            },
            function (Resources_1_1) {
                exportStar_2(Resources_1_1);
            },
            function (Resource_1_1) {
                exportStar_2(Resource_1_1);
            },
            function (StackPanel_1_1) {
                exportStar_2(StackPanel_1_1);
            },
            function (TextBlock_1_1) {
                exportStar_2(TextBlock_1_1);
            },
            function (KeyFrame_1_1) {
                exportStar_2(KeyFrame_1_1);
            },
            function (KeyFrameCollection_1_1) {
                exportStar_2(KeyFrameCollection_1_1);
            },
            function (KeyFrames_1_1) {
                exportStar_2(KeyFrames_1_1);
            },
            function (Label_1_1) {
                exportStar_2(Label_1_1);
            },
            function (Light_1_1) {
                exportStar_2(Light_1_1);
            },
            function (Mesh_1_1) {
                exportStar_2(Mesh_1_1);
            },
            function (ParticleSystem_1_1) {
                exportStar_2(ParticleSystem_1_1);
            },
            function (ParticleSystemShape_1_1) {
                exportStar_2(ParticleSystemShape_1_1);
            },
            function (Plane_2_1) {
                exportStar_2(Plane_2_1);
            },
            function (Panel_2_1) {
                exportStar_2(Panel_2_1);
            },
            function (Scene_1_1) {
                exportStar_2(Scene_1_1);
            },
            function (Script_1_1) {
                exportStar_2(Script_1_1);
            },
            function (ShadersStore_1_1) {
                exportStar_2(ShadersStore_1_1);
            },
            function (Slider_1_1) {
                exportStar_2(Slider_1_1);
            },
            function (Sphere_1_1) {
                exportStar_2(Sphere_1_1);
            },
            function (SubEmitter_1_1) {
                exportStar_2(SubEmitter_1_1);
            },
            function (Texture_1_1) {
                exportStar_2(Texture_1_1);
            },
            function (Torus_1_1) {
                exportStar_2(Torus_1_1);
            },
            function (Material_1_1) {
                exportStar_2(Material_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("Xaml/jupiter/IRender", [], function (exports_78, context_78) {
    "use strict";
    var __moduleName = context_78 && context_78.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("helpers/ContainerHelper", ["inversify", "Xaml/Core"], function (exports_79, context_79) {
    "use strict";
    var inversify_2, Core_13, ContainerHelper;
    var __moduleName = context_79 && context_79.id;
    return {
        setters: [
            function (inversify_2_1) {
                inversify_2 = inversify_2_1;
            },
            function (Core_13_1) {
                Core_13 = Core_13_1;
            }
        ],
        execute: function () {
            ContainerHelper = class ContainerHelper {
                constructor() {
                }
                GetSharedWorker() {
                    return Core_13.DIContainer.get(Core_13.SharedWorker);
                }
            };
            ContainerHelper = __decorate([
                inversify_2.injectable(),
                __metadata("design:paramtypes", [])
            ], ContainerHelper);
            exports_79("ContainerHelper", ContainerHelper);
        }
    };
});
System.register("Xaml/jupiter/UIElement", ["Xaml/jupiter/DependencyObject", "Xaml/DataTypes/Guid", "services/VisualTree", "Xaml/Core", "Xaml/behaviors/CustomScript", "libs/typescript-collections/src/lib/index", "helpers/ContainerHelper"], function (exports_80, context_80) {
    "use strict";
    var DependencyObject_2, Guid_1, VisualTree_2, Core_14, CustomScript_2, lib_5, ContainerHelper_1, UIElement;
    var __moduleName = context_80 && context_80.id;
    return {
        setters: [
            function (DependencyObject_2_1) {
                DependencyObject_2 = DependencyObject_2_1;
            },
            function (Guid_1_1) {
                Guid_1 = Guid_1_1;
            },
            function (VisualTree_2_1) {
                VisualTree_2 = VisualTree_2_1;
            },
            function (Core_14_1) {
                Core_14 = Core_14_1;
            },
            function (CustomScript_2_1) {
                CustomScript_2 = CustomScript_2_1;
            },
            function (lib_5_1) {
                lib_5 = lib_5_1;
            },
            function (ContainerHelper_1_1) {
                ContainerHelper_1 = ContainerHelper_1_1;
            }
        ],
        execute: function () {
            UIElement = class UIElement extends DependencyObject_2.DependencyObject {
                constructor() {
                    super();
                    this._isDirty = true;
                    this._hasScript = false;
                    this._hasCode = false;
                    this.VT = Core_14.DIContainer.get(VisualTree_2.VisualTree);
                    this.DI = Core_14.DIContainer;
                    this.UpdateProperty = (property, value) => { this[property] = value; };
                    this.HasValue = (property) => { return (property !== null && property !== undefined) ? true : false; };
                    this.CleanBabylonColor3Attribute = (color3) => { return (color3.includes("Color3.")) ? eval(`BABYLON.${color3};`) : eval(`new BABYLON.${color3};`); };
                    this.ConvertColor3ToColor4 = (color) => { return new BABYLON.Color4(color.r, color.g, color.b, 1); };
                    this.ConvertToBoolean = (value) => { return value.toLowerCase() === 'true' ? true : false; };
                    this.ConvertToNewBabylonObject = (value) => { return eval(`new BABYLON.${value};`); };
                    this.ConvertToBabylonObject = (value) => { return eval(`BABYLON.${value};`); };
                    this.UpdatePropertyByNode = (node, nodeAttributeName, propertyName) => {
                        if (node.hasAttribute(nodeAttributeName))
                            this.UpdatePropertyByValue(propertyName, node.attributes[nodeAttributeName].value, null);
                    };
                    this.UpdatePropertyByNodeAndFunction = (node, nodeAttributeName, propertyName, valueConverterFn) => {
                        if (node.hasAttribute(nodeAttributeName))
                            this.UpdatePropertyByValue(propertyName, node.attributes[nodeAttributeName].value, valueConverterFn);
                    };
                    this.UpdatePropertyByValue = (propertyName, value, valueConverterFunction) => {
                        if (valueConverterFunction === null || valueConverterFunction === undefined)
                            this.UpdateProperty(propertyName, value);
                        else
                            this.UpdateProperty(propertyName, valueConverterFunction(value));
                    };
                    this._uniqueId = Guid_1.Guid.newGuid();
                    this._childEvents = new lib_5.LinkedDictionary();
                    this._childGuis = new lib_5.LinkedDictionary();
                }
                get Ctrl() { return this._ctrl; }
                get IsVisible() { return this._isVisible; }
                get IsDirty() { return this._isDirty; }
                get UniqueID() { return this._uniqueId; }
                get Name() { return this._name; }
                get Position() { return this._position; }
                get Code() { return this._code; }
                get HasScript() { return this._hasScript; }
                get HasCode() { return this._hasCode; }
                get ChildrenEvents() { return this._childEvents; }
                get ChildrenGUIs() { return this._childGuis; }
                get bjsCtrl() { return this._ctrl; }
                get Enabled() { return this._enabled; }
                set Ctrl(value) { this._ctrl = value; }
                set IsVisible(value) { this._isVisible = value; }
                set IsDirty(value) { this._isDirty = value; }
                set UniqueID(value) { this._uniqueId = value; }
                set Code(value) { this._code = value; }
                set HasScript(value) { this._hasScript = value; }
                set HasCode(value) { this._hasCode = value; }
                set Name(value) { this._name = value; this.VT.Add(value, this); }
                set Position(value) { this._position = value; }
                set Enabled(value) { this._enabled = value; }
                TrySetParent(parent) {
                    if (parent == null)
                        return false;
                    this.Parent = parent;
                    return true;
                }
                LoadFromNode(node) {
                    try {
                        this._position = eval(`new BABYLON.${node.attributes["Position"].value};`);
                    }
                    catch (e) { }
                    try {
                        this._isVisible = node.attributes["IsVisible"].value.toLowerCase() === 'true';
                    }
                    catch (e) { }
                    this.UpdatePropertyByNodeAndFunction(node, "Enabled", "Enabled", this.ConvertToBoolean);
                }
                Initialize() {
                }
                PostInitialize() {
                    if (this.HasScript || this.HasCode) {
                        try {
                            if (this.HasCode) {
                                function evalInContext(js, context) { return function () { return eval(js); }.call(context); }
                                let ctx = this;
                                ctx["VisualTreeHelper"] = this.VT;
                                ctx["Container"] = this.DI;
                                ctx["ContainerHelper"] = this.DI.get(ContainerHelper_1.ContainerHelper);
                                evalInContext(this.Code, ctx);
                            }
                            else
                                CustomScript_2.CustomScript.Install(this.VT, this.DI, this.Code);
                        }
                        catch (e) {
                            var found = e;
                        }
                    }
                }
            };
            exports_80("UIElement", UIElement);
        }
    };
});
System.register("Xaml/jupiter/FrameworkElement", ["Xaml/jupiter/UIElement"], function (exports_81, context_81) {
    "use strict";
    var UIElement_33, FrameworkElement;
    var __moduleName = context_81 && context_81.id;
    return {
        setters: [
            function (UIElement_33_1) {
                UIElement_33 = UIElement_33_1;
            }
        ],
        execute: function () {
            FrameworkElement = class FrameworkElement extends UIElement_33.UIElement {
                constructor() {
                    super();
                }
                get Width() { return this._width; }
                get Height() { return this._height; }
                set Width(value) { this._width = value; }
                set Height(value) { this._height = value; }
            };
            exports_81("FrameworkElement", FrameworkElement);
        }
    };
});
System.register("Xaml/reader/XamlParser", ["Xaml/jupiter/controls/Core"], function (exports_82, context_82) {
    "use strict";
    var _controls, Core_15, XamlParser;
    var __moduleName = context_82 && context_82.id;
    return {
        setters: [
            function (_controls_1) {
                _controls = _controls_1;
                Core_15 = _controls_1;
            }
        ],
        execute: function () {
            XamlParser = class XamlParser {
                static XamlMarkupToUIElement(xaml) {
                    let nnn = new _controls.Panel();
                    return this.ProcessRoot(xaml.RootElement);
                }
                static ProcessRoot(el) {
                    let col = el.childNodes;
                    for (let x = 0; x < col.length; x++) {
                        let child = col.item(x);
                        let el = this.ProcessNode(child, null);
                        if (el !== null && !(el instanceof Core_15.Resources)) {
                            return el;
                        }
                    }
                }
                static ProcessNode(el, parent) {
                    let nodeAsAFrameWorkElement = this.GetFrameworkElementByNode(el);
                    if (nodeAsAFrameWorkElement != null) {
                        nodeAsAFrameWorkElement.TrySetParent(parent);
                    }
                    if (nodeAsAFrameWorkElement != null && el != null && el.childNodes != null && el.childNodes.length > 0) {
                        this.ProcessNodeWithChildren(nodeAsAFrameWorkElement, el.childNodes);
                    }
                    return nodeAsAFrameWorkElement;
                }
                static ProcessNodeWithChildren(root, nodeCollection) {
                    if (!nodeCollection) {
                        return;
                    }
                    for (let x = 0; x < nodeCollection.length; x++) {
                        let node = nodeCollection.item(x);
                        let newFE = this.ProcessNode(node, root);
                        if (newFE !== null) {
                            if ('Children' in root)
                                root.Children.setValue(newFE.Name, newFE);
                        }
                    }
                }
                static GetFrameworkElementByNode(node) {
                    if (node.nodeName === "#text")
                        return null;
                    try {
                        let newObject = eval(`new _controls.${node.nodeName}();`);
                        if (this.HasAttribute(node, "x:Name"))
                            newObject.Name = this.TryGetAttribute(node, "x:Name");
                        else
                            newObject.Name = newObject.UniqueID;
                        if ('LoadFromNode' in newObject)
                            newObject.LoadFromNode(node);
                        return newObject;
                    }
                    catch (ex) {
                        return this.GetFrameworkElementByNodeFromResources(node);
                    }
                    return null;
                }
                static GetFrameworkElementByNodeFromResources(node) {
                    return null;
                }
                static HasAttribute(node, attributeName) {
                    try {
                        return (node.attributes[attributeName].value !== null);
                    }
                    catch (_a) { }
                    return false;
                }
                static TryGetAttribute(node, attributeName) {
                    try {
                        return node.attributes[attributeName].value;
                    }
                    catch (_a) { }
                    return null;
                }
            };
            exports_82("XamlParser", XamlParser);
        }
    };
});
System.register("services/SharedWorker", ["inversify", "services/VisualTree", "Xaml/Core"], function (exports_83, context_83) {
    "use strict";
    var inversify_3, VisualTree_3, Core_16, SharedWorker, Topics;
    var __moduleName = context_83 && context_83.id;
    return {
        setters: [
            function (inversify_3_1) {
                inversify_3 = inversify_3_1;
            },
            function (VisualTree_3_1) {
                VisualTree_3 = VisualTree_3_1;
            },
            function (Core_16_1) {
                Core_16 = Core_16_1;
            }
        ],
        execute: function () {
            SharedWorker = class SharedWorker {
                constructor() {
                    this.Init();
                }
                Init() {
                    try {
                        TabUtils.OnBroadcastMessage("storage-event", (topicStr, data) => {
                            if (topicStr !== "") {
                                let topic = Topics[topicStr];
                                switch (topic) {
                                    case Topics.ReloadTabs:
                                        window.location.reload(false);
                                        break;
                                    case Topics.RefreshVisualTree:
                                        let vt = Core_16.DIContainer.get(VisualTree_3.VisualTree);
                                        var foundItem = vt.FindByName(this.CleanData(data.ClassXName));
                                        foundItem.SetValue(data.Attribute, this.CleanData(data.Value));
                                }
                            }
                        });
                    }
                    catch (e) { }
                }
                CleanData(value) {
                    return value.replace('"', '').replace('"', '');
                }
                RaiseTopic(topic, data) {
                    try {
                        TabUtils.BroadcastMessageToAllTabs("storage-event", "", "");
                        TabUtils.BroadcastMessageToAllTabs("storage-event", Topics[topic], data);
                    }
                    catch (e) { }
                }
                AnonymousFunctionWorker(funcObj) {
                    var blobURL = URL.createObjectURL(new Blob(['(',
                        funcObj.toString(),
                        ')()'], {
                        type: 'application/javascript'
                    })), worker = new Worker(blobURL);
                    URL.revokeObjectURL(blobURL);
                    return worker;
                }
            };
            SharedWorker = __decorate([
                inversify_3.injectable(),
                __metadata("design:paramtypes", [])
            ], SharedWorker);
            exports_83("SharedWorker", SharedWorker);
            (function (Topics) {
                Topics[Topics["RefreshVisualTree"] = 0] = "RefreshVisualTree";
                Topics[Topics["ReloadTabs"] = 1] = "ReloadTabs";
            })(Topics || (Topics = {}));
            exports_83("Topics", Topics);
        }
    };
});
System.register("Xaml/App", ["Xaml/reader/XamlParser", "Xaml/jupiter/Core", "Xaml/jupiter/controls/Core", "services/VisualTree", "services/SharedWorker", "Xaml/Core", "helpers/ContainerHelper"], function (exports_84, context_84) {
    "use strict";
    var XamlParser_1, Core_17, Core_18, VisualTree_4, SharedWorker_1, Core_19, ContainerHelper_2, App;
    var __moduleName = context_84 && context_84.id;
    return {
        setters: [
            function (XamlParser_1_1) {
                XamlParser_1 = XamlParser_1_1;
            },
            function (Core_17_1) {
                Core_17 = Core_17_1;
            },
            function (Core_18_1) {
                Core_18 = Core_18_1;
            },
            function (VisualTree_4_1) {
                VisualTree_4 = VisualTree_4_1;
            },
            function (SharedWorker_1_1) {
                SharedWorker_1 = SharedWorker_1_1;
            },
            function (Core_19_1) {
                Core_19 = Core_19_1;
            },
            function (ContainerHelper_2_1) {
                ContainerHelper_2 = ContainerHelper_2_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor() {
                }
                Start(xaml, canvasElement, displayMode) {
                    this.InitializeDIContainerCore();
                    if (displayMode == Core_19.DisplayMode.CodeMode)
                        return;
                    this.xamlMarkup = xaml;
                    let _canvas = document.getElementById(canvasElement);
                    let _engine = new BABYLON.Engine(_canvas, true);
                    window.addEventListener("resize", () => {
                        _engine.resize();
                    });
                    this.InitializeDIContainerXaml(_canvas, _engine);
                    this.BuildVisualTree();
                    this.RenderScene();
                }
                InitializeDIContainerCore() {
                    Core_19.DIContainer.bind(SharedWorker_1.SharedWorker).to(SharedWorker_1.SharedWorker).inSingletonScope();
                    Core_19.DIContainer.bind(ContainerHelper_2.ContainerHelper).to(ContainerHelper_2.ContainerHelper).inSingletonScope();
                }
                InitializeDIContainerXaml(rootCanvas, rootEngine) {
                    Core_19.DIContainer.bind(VisualTree_4.VisualTree).to(VisualTree_4.VisualTree).inSingletonScope();
                    Core_19.DIContainer.bind("rootCanvas").toConstantValue(rootCanvas);
                    Core_19.DIContainer.bind("rootEngine").toConstantValue(rootEngine);
                }
                BuildVisualTree() {
                    this._rootElement = XamlParser_1.XamlParser.XamlMarkupToUIElement(this.xamlMarkup);
                }
                RenderScene() {
                    if (this._rootElement instanceof Core_18.Panel) {
                        let vt = this._rootElement;
                        if (vt.Children)
                            this.InitializeChildren(vt.Children);
                        if (vt.Children)
                            this.AnimateChildren(vt.Children);
                    }
                }
                AnimateChildren(col) {
                    col.forEach((k, v) => {
                        if (v instanceof Core_17.AnimatableUIElement) {
                            let animateableCHild = v;
                            animateableCHild.StartAnimation();
                        }
                    });
                }
                InitializeChildren(col) {
                    col.forEach((k, v) => {
                        v.Initialize();
                        if (v instanceof Core_18.Panel) {
                            let childWithChildren = v;
                            if (childWithChildren.Children.size() > 0) {
                                this.InitializeChildren(childWithChildren.Children);
                            }
                            ;
                        }
                    });
                }
            };
            exports_84("App", App);
        }
    };
});
System.register("Xaml/reader/XamlReader", ["Xaml/reader/XamlMarkup"], function (exports_85, context_85) {
    "use strict";
    var XamlMarkup_1, XamlReader;
    var __moduleName = context_85 && context_85.id;
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
            exports_85("XamlReader", XamlReader);
        }
    };
});
System.register("services/CodeEditor", ["inversify", "Xaml/Core"], function (exports_86, context_86) {
    "use strict";
    var inversify_4, Core_20, CodeEditor;
    var __moduleName = context_86 && context_86.id;
    return {
        setters: [
            function (inversify_4_1) {
                inversify_4 = inversify_4_1;
            },
            function (Core_20_1) {
                Core_20 = Core_20_1;
            }
        ],
        execute: function () {
            CodeEditor = class CodeEditor {
                constructor() {
                }
                static ConfigureEditor(codeEditorElement, string, data, worker) {
                    let codeEditorEl = document.getElementById(codeEditorElement);
                    let editor = monaco.editor.create(codeEditorEl);
                    let xamlModel = monaco.editor.createModel(data, "html");
                    editor.setModel(xamlModel);
                    xamlModel.onDidChangeContent((e) => {
                        console.log(e);
                    });
                    editor.onDidChangeCursorPosition((e) => {
                        let valueUnderPosition = this.GetValueAtPosition(xamlModel, e.position);
                        console.log(valueUnderPosition);
                        worker.RaiseTopic(Core_20.Topics.RefreshVisualTree, valueUnderPosition);
                    });
                }
                static GetValueAtPosition(xamlModel, position) {
                    let valueObj = this.getValueAtPosition(xamlModel, position);
                    if (valueObj.tokenType === "attribute.value.html") {
                        let typeObj = this.findTagAtPosition(xamlModel, "attribute.name.html", position);
                        let classObj = this.findTagAtPosition(xamlModel, "tag.html", position);
                        let xName = this.findXNameAttribute(xamlModel, classObj.tokenLinePosition, classObj.associatedAttributeNameTokenIndex);
                        return {
                            IsValue: true,
                            Value: valueObj.tokenText,
                            Attribute: typeObj.tokenText,
                            Class: classObj.tokenText,
                            ClassXName: xName
                        };
                    }
                    return {
                        IsValue: false
                    };
                }
                static ConfigureEditorLink(xamlCodeEditorLinkElement) {
                    let aXamlCodeEditorLink = document.getElementById(xamlCodeEditorLinkElement);
                    aXamlCodeEditorLink.href = `${location.search}&d=1`;
                }
                static findXNameAttribute(model, lineToStartFrom, positionOnLineToStartFrom) {
                    let data = this.getTokensAtLine(lineToStartFrom, model);
                    let dataLength = data.tokens1.length;
                    for (let i = positionOnLineToStartFrom; i <= dataLength - 1; i++) {
                        let t = data.tokens1[i];
                        if (t.type === "attribute.name.html") {
                            let tokenText = this.getTokenText(model, lineToStartFrom, i, data);
                            if (tokenText === "x") {
                                let found = true;
                                let j = i;
                                j++;
                                j++;
                                if (j > dataLength - 1)
                                    break;
                                let x = data.tokens1[j];
                                if (x.type === "attribute.name.html") {
                                    let tokenTextX = this.getTokenText(model, lineToStartFrom, j, data);
                                    if (tokenTextX === "Name") {
                                        let found2 = true;
                                        j++;
                                        j++;
                                        if (j > dataLength - 1)
                                            break;
                                        x = data.tokens1[j];
                                        if (x.type === "attribute.value.html") {
                                            return this.getTokenText(model, lineToStartFrom, j, data);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return null;
                }
                static findTagAtPosition(model, typeToSearchFor, position) {
                    let lineNumber = position.lineNumber;
                    let column = position.column;
                    return this.findTagAtLineColumn(model, typeToSearchFor, lineNumber, column);
                }
                static findTagAtLineColumn(model, typeToSearchFor, lineNumber, column) {
                    let data = this.getTokensAtLine(lineNumber, model);
                    let dataLength = data.tokens1.length;
                    let tokenIndex = this.getTokenIndex(data, column);
                    let tokenType = data.tokens1[tokenIndex].type;
                    let associatedAttributeNameTokenIndex = null;
                    let associatedAttributeNameToken = null;
                    if (tokenType === typeToSearchFor) {
                        associatedAttributeNameTokenIndex = tokenIndex;
                        associatedAttributeNameToken = data.tokens1[tokenIndex];
                    }
                    else {
                        for (let i = tokenIndex - 1; i >= 0; i--) {
                            let t = data.tokens1[i];
                            if (t.type === typeToSearchFor) {
                                associatedAttributeNameToken = t;
                                associatedAttributeNameTokenIndex = i;
                                break;
                            }
                        }
                    }
                    if (associatedAttributeNameToken === null)
                        return this.findTagAtLineColumn(model, typeToSearchFor, lineNumber - 1, column);
                    let tokenText = this.getTokenText(model, lineNumber, associatedAttributeNameTokenIndex, data);
                    return {
                        associatedAttributeNameToken: associatedAttributeNameToken,
                        associatedAttributeNameTokenIndex: associatedAttributeNameTokenIndex,
                        tokenText: tokenText,
                        tokenType: associatedAttributeNameToken.type,
                        tokenLinePosition: lineNumber
                    };
                }
                static getTokenIndex(data, column) {
                    let dataLength = data.tokens1.length;
                    let tokenIndex = 0;
                    for (let i = dataLength - 1; i >= 0; i--) {
                        let t = data.tokens1[i];
                        if (column - 1 >= t.offset) {
                            tokenIndex = i;
                            break;
                        }
                    }
                    return tokenIndex;
                }
                static getTokenText(model, lineNumber, index, data) {
                    let lineContent = model.getLineContent(lineNumber);
                    let dataLength = data.tokens1.length;
                    let tokenText = '';
                    if (index < dataLength) {
                        let tokenStartIndex = data.tokens1[index].offset;
                        let tokenEndIndex = index + 1 < dataLength ? data.tokens1[index + 1].offset : lineContent.length;
                        tokenText = lineContent.substring(tokenStartIndex, tokenEndIndex);
                    }
                    return tokenText;
                }
                static getValueAtPosition(model, position) {
                    let data = this.getTokensAtLine(position.lineNumber, model);
                    let dataLength = data.tokens1.length;
                    let tokenIndex = this.getTokenIndex(data, position.column);
                    let tokenType = data.tokens1[tokenIndex].type;
                    return {
                        tokenType: tokenType,
                        tokenText: this.getTokenText(model, position.lineNumber, tokenIndex, data)
                    };
                }
                static getTokensAtLine(lineNumber, model) {
                    let tokenizationSupport = model._tokens.tokenizationSupport;
                    let state = tokenizationSupport.getInitialState();
                    for (let i = 1; i < lineNumber; i++) {
                        let tokenizationResult = tokenizationSupport.tokenize(model.getLineContent(i), state, 0);
                        state = tokenizationResult.endState;
                    }
                    let stateBeforeLine = state;
                    let tokenizationResult1 = tokenizationSupport.tokenize(model.getLineContent(lineNumber), stateBeforeLine, 0);
                    let tokenizationResult2 = tokenizationSupport.tokenize2(model.getLineContent(lineNumber), stateBeforeLine, 0);
                    return {
                        startState: stateBeforeLine,
                        tokens1: tokenizationResult1.tokens,
                        tokens2: tokenizationResult2.tokens,
                        endState: tokenizationResult1.endState
                    };
                }
                static getAttributeNameAtPosition(model, position) {
                    let data = this.getTokensAtLine(position.lineNumber, model);
                    let dataLength = data.tokens1.length;
                    let token1Index = 0;
                    for (let i = dataLength - 1; i >= 0; i--) {
                        let t = data.tokens1[i];
                        if (position.column - 1 >= t.offset) {
                            token1Index = i;
                            break;
                        }
                    }
                    let associatedAttributeNameTokenIndex = null;
                    let associatedAttributeNameToken = null;
                    for (let i = token1Index - 1; i >= 0; i--) {
                        let t = data.tokens1[i];
                        if (t.type === "attribute.name.html") {
                            associatedAttributeNameToken = t;
                            associatedAttributeNameTokenIndex = i;
                            break;
                        }
                    }
                    if (associatedAttributeNameTokenIndex !== null)
                        associatedAttributeNameToken = data.tokens1[associatedAttributeNameTokenIndex];
                    if (associatedAttributeNameToken === null)
                        return "[error not found]";
                    let lineContent;
                    if (associatedAttributeNameTokenIndex >= 0) {
                        lineContent = model.getLineContent(position.lineNumber);
                    }
                    else {
                        lineContent = model.getLineContent(position.lineNumber - 1);
                    }
                    let tokenText = '';
                    if (associatedAttributeNameTokenIndex < dataLength) {
                        let tokenStartIndex = data.tokens1[associatedAttributeNameTokenIndex].offset;
                        let tokenEndIndex = associatedAttributeNameTokenIndex + 1 < dataLength ? data.tokens1[associatedAttributeNameTokenIndex + 1].offset : lineContent.length;
                        tokenText = lineContent.substring(tokenStartIndex, tokenEndIndex);
                    }
                    return tokenText;
                }
            };
            CodeEditor = __decorate([
                inversify_4.injectable(),
                __metadata("design:paramtypes", [])
            ], CodeEditor);
            exports_86("CodeEditor", CodeEditor);
        }
    };
});
System.register("Xaml/Core", ["Xaml/App", "Xaml/reader/XamlReader", "Xaml/reader/XamlParser", "Xaml/reader/XamlMarkup", "services/VisualTree", "services/CodeEditor", "services/SharedWorker", "Xaml/jupiter/controls/Core", "inversify", "Xaml/DataTypes/Guid"], function (exports_87, context_87) {
    "use strict";
    var _controls, inversify_5, Controls, DIContainer, DisplayMode;
    var __moduleName = context_87 && context_87.id;
    var exportedNames_1 = {
        "Controls": true,
        "DIContainer": true,
        "DisplayMode": true
    };
    function exportStar_3(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_87(exports);
    }
    return {
        setters: [
            function (App_1_1) {
                exportStar_3(App_1_1);
            },
            function (XamlReader_1_1) {
                exportStar_3(XamlReader_1_1);
            },
            function (XamlParser_2_1) {
                exportStar_3(XamlParser_2_1);
            },
            function (XamlMarkup_2_1) {
                exportStar_3(XamlMarkup_2_1);
            },
            function (VisualTree_5_1) {
                exportStar_3(VisualTree_5_1);
            },
            function (CodeEditor_1_1) {
                exportStar_3(CodeEditor_1_1);
            },
            function (SharedWorker_2_1) {
                exportStar_3(SharedWorker_2_1);
            },
            function (_controls_2) {
                _controls = _controls_2;
            },
            function (inversify_5_1) {
                inversify_5 = inversify_5_1;
            },
            function (Guid_2_1) {
                exportStar_3(Guid_2_1);
            }
        ],
        execute: function () {
            exports_87("Controls", Controls = _controls);
            exports_87("DIContainer", DIContainer = new inversify_5.Container());
            (function (DisplayMode) {
                DisplayMode[DisplayMode["RenderMode"] = 0] = "RenderMode";
                DisplayMode[DisplayMode["CodeMode"] = 1] = "CodeMode";
            })(DisplayMode || (DisplayMode = {}));
            exports_87("DisplayMode", DisplayMode);
        }
    };
});
System.register("bootstrap/XamlApp", ["reflect-metadata", "Xaml/Core"], function (exports_88, context_88) {
    "use strict";
    var XamlGLCore, XamlApp;
    var __moduleName = context_88 && context_88.id;
    return {
        setters: [
            function (_14) {
            },
            function (XamlGLCore_1) {
                XamlGLCore = XamlGLCore_1;
            }
        ],
        execute: function () {
            XamlApp = class XamlApp {
                Start(renderElement, renderDetailsLayerElement, editorElement, editorLinkElement) {
                    this.Configure();
                    let xaml = this.parseQueryString(location.search).xaml;
                    if (!xaml) {
                        console.warn("No application specified.");
                        return;
                    }
                    let xm = XamlGLCore.XamlReader.LoadUri(`/xaml/${xaml}`, (el) => {
                        console.log(xm.RootElement);
                        let displayModeAsString = this.parseQueryString(location.search).d;
                        let displayMode = XamlGLCore.DisplayMode.RenderMode;
                        if (displayModeAsString !== undefined)
                            displayMode = parseInt(displayModeAsString);
                        let app = new XamlGLCore.App();
                        app.Start(xm, renderElement, displayMode);
                        let worker = XamlGLCore.DIContainer.get(XamlGLCore.SharedWorker);
                        XamlGLCore.CodeEditor.ConfigureEditorLink(editorLinkElement);
                        if (displayMode === XamlGLCore.DisplayMode.CodeMode) {
                            this.HideRenderStack(renderElement, renderDetailsLayerElement);
                            XamlGLCore.CodeEditor.ConfigureEditor(editorElement, editorLinkElement, xm.RawData, worker);
                        }
                    });
                }
                HideRenderStack(canvasElement, canvasDetailsLayerElement) {
                    let canvasEl = document.getElementById(canvasElement);
                    let canvasDetailsLayerEl = document.getElementById(canvasDetailsLayerElement);
                    canvasEl.style.display = "none";
                    canvasDetailsLayerEl.style.display = "none";
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
            exports_88("XamlApp", XamlApp);
        }
    };
});
//# sourceMappingURL=allsrc2.js.map
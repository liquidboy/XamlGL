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
                        this.rootElement = doc.documentElement;
                        done.call(this, doc.documentElement);
                    }
                }
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
System.register("Xaml/jupiter/controls/Animation", ["Xaml/jupiter/UIElement", "Xaml/jupiter/controls/Core"], function (exports_6, context_6) {
    "use strict";
    var UIElement_1, Core_1, Animation;
    var __moduleName = context_6 && context_6.id;
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
                get KeyFrames() { return this._keyFrames; }
                get DataType() { return this._dataType; }
                get LoopMode() { return this._loopMode; }
                get EnableBlending() { return this._enableBlending; }
                get TargetProperty() { return this._targetProperty; }
                get FPS() { return this._fps; }
                set KeyFrames(value) { this._keyFrames = value; }
                constructor() {
                    super();
                    this._keyFrames = new Core_1.KeyFrames();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    try {
                        this._targetProperty = node.attributes["TargetProperty"].value;
                    }
                    catch (_a) { }
                    try {
                        this._dataType = eval(`${node.attributes["DataType"].value}`);
                    }
                    catch (e) { }
                    try {
                        this._loopMode = eval(`${node.attributes["LoopMode"].value}`);
                    }
                    catch (e) { }
                    try {
                        this._enableBlending = node.attributes["EnableBlending"].value.toLowerCase() === 'true';
                    }
                    catch (e) { }
                    try {
                        this._fps = parseInt(node.attributes["FPS"].value);
                    }
                    catch (_b) { }
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.Animations.add(this);
                        return true;
                    }
                    return false;
                }
            };
            exports_6("Animation", Animation);
        }
    };
});
System.register("libs/typescript-collections/src/lib/util", [], function (exports_7, context_7) {
    "use strict";
    var _hasOwnProperty, has;
    var __moduleName = context_7 && context_7.id;
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
    exports_7("defaultCompare", defaultCompare);
    function defaultEquals(a, b) {
        return a === b;
    }
    exports_7("defaultEquals", defaultEquals);
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
    exports_7("defaultToString", defaultToString);
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
    exports_7("makeString", makeString);
    function isFunction(func) {
        return (typeof func) === 'function';
    }
    exports_7("isFunction", isFunction);
    function isUndefined(obj) {
        return (typeof obj) === 'undefined';
    }
    exports_7("isUndefined", isUndefined);
    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    exports_7("isString", isString);
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
    exports_7("reverseCompareFunction", reverseCompareFunction);
    function compareToEquals(compareFunction) {
        return function (a, b) {
            return compareFunction(a, b) === 0;
        };
    }
    exports_7("compareToEquals", compareToEquals);
    return {
        setters: [],
        execute: function () {
            _hasOwnProperty = Object.prototype.hasOwnProperty;
            exports_7("has", has = function (obj, prop) {
                return _hasOwnProperty.call(obj, prop);
            });
        }
    };
});
System.register("libs/typescript-collections/src/lib/arrays", ["libs/typescript-collections/src/lib/util"], function (exports_8, context_8) {
    "use strict";
    var util;
    var __moduleName = context_8 && context_8.id;
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
    exports_8("indexOf", indexOf);
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
    exports_8("lastIndexOf", lastIndexOf);
    function contains(array, item, equalsFunction) {
        return indexOf(array, item, equalsFunction) >= 0;
    }
    exports_8("contains", contains);
    function remove(array, item, equalsFunction) {
        const index = indexOf(array, item, equalsFunction);
        if (index < 0) {
            return false;
        }
        array.splice(index, 1);
        return true;
    }
    exports_8("remove", remove);
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
    exports_8("frequency", frequency);
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
    exports_8("equals", equals);
    function copy(array) {
        return array.concat();
    }
    exports_8("copy", copy);
    function swap(array, i, j) {
        if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
            return false;
        }
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return true;
    }
    exports_8("swap", swap);
    function toString(array) {
        return '[' + array.toString() + ']';
    }
    exports_8("toString", toString);
    function forEach(array, callback) {
        for (const ele of array) {
            if (callback(ele) === false) {
                return;
            }
        }
    }
    exports_8("forEach", forEach);
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
System.register("libs/typescript-collections/src/lib/Dictionary", ["libs/typescript-collections/src/lib/util"], function (exports_9, context_9) {
    "use strict";
    var util, Dictionary;
    var __moduleName = context_9 && context_9.id;
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
            exports_9("default", Dictionary);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Set", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/arrays", "libs/typescript-collections/src/lib/Dictionary"], function (exports_10, context_10) {
    "use strict";
    var util, arrays, Dictionary_1, Set;
    var __moduleName = context_10 && context_10.id;
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
            exports_10("default", Set);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Bag", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/Set"], function (exports_11, context_11) {
    "use strict";
    var util, Dictionary_2, Set_1, Bag;
    var __moduleName = context_11 && context_11.id;
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
            exports_11("default", Bag);
        }
    };
});
System.register("libs/typescript-collections/src/lib/LinkedList", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/arrays"], function (exports_12, context_12) {
    "use strict";
    var util, arrays, LinkedList;
    var __moduleName = context_12 && context_12.id;
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
            exports_12("default", LinkedList);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Heap", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/arrays"], function (exports_13, context_13) {
    "use strict";
    var collections, arrays, Heap;
    var __moduleName = context_13 && context_13.id;
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
            exports_13("default", Heap);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Queue", ["libs/typescript-collections/src/lib/LinkedList"], function (exports_14, context_14) {
    "use strict";
    var LinkedList_1, Queue;
    var __moduleName = context_14 && context_14.id;
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
            exports_14("default", Queue);
        }
    };
});
System.register("libs/typescript-collections/src/lib/BSTree", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/Queue"], function (exports_15, context_15) {
    "use strict";
    var util, Queue_1, BSTree;
    var __moduleName = context_15 && context_15.id;
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
            exports_15("default", BSTree);
        }
    };
});
System.register("libs/typescript-collections/src/lib/LinkedDictionary", ["libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/util"], function (exports_16, context_16) {
    "use strict";
    var Dictionary_3, util, LinkedDictionaryPair, LinkedDictionary;
    var __moduleName = context_16 && context_16.id;
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
            exports_16("default", LinkedDictionary);
        }
    };
});
System.register("libs/typescript-collections/src/lib/MultiDictionary", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/arrays"], function (exports_17, context_17) {
    "use strict";
    var util, Dictionary_4, arrays, MultiDictionary;
    var __moduleName = context_17 && context_17.id;
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
            exports_17("default", MultiDictionary);
        }
    };
});
System.register("libs/typescript-collections/src/lib/FactoryDictionary", ["libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/util"], function (exports_18, context_18) {
    "use strict";
    var Dictionary_5, util, FactoryDictionary;
    var __moduleName = context_18 && context_18.id;
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
            exports_18("default", FactoryDictionary);
        }
    };
});
System.register("libs/typescript-collections/src/lib/PriorityQueue", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/Heap"], function (exports_19, context_19) {
    "use strict";
    var util, Heap_1, PriorityQueue;
    var __moduleName = context_19 && context_19.id;
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
            exports_19("default", PriorityQueue);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Stack", ["libs/typescript-collections/src/lib/LinkedList"], function (exports_20, context_20) {
    "use strict";
    var LinkedList_2, Stack;
    var __moduleName = context_20 && context_20.id;
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
            exports_20("default", Stack);
        }
    };
});
System.register("libs/typescript-collections/src/lib/MultiRootTree", [], function (exports_21, context_21) {
    "use strict";
    var Direction, MultiRootTree;
    var __moduleName = context_21 && context_21.id;
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
            exports_21("default", MultiRootTree);
        }
    };
});
System.register("libs/typescript-collections/src/lib/index", ["libs/typescript-collections/src/lib/arrays", "libs/typescript-collections/src/lib/Bag", "libs/typescript-collections/src/lib/BSTree", "libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/Heap", "libs/typescript-collections/src/lib/LinkedDictionary", "libs/typescript-collections/src/lib/LinkedList", "libs/typescript-collections/src/lib/MultiDictionary", "libs/typescript-collections/src/lib/FactoryDictionary", "libs/typescript-collections/src/lib/Queue", "libs/typescript-collections/src/lib/PriorityQueue", "libs/typescript-collections/src/lib/Set", "libs/typescript-collections/src/lib/Stack", "libs/typescript-collections/src/lib/MultiRootTree", "libs/typescript-collections/src/lib/util"], function (exports_22, context_22) {
    "use strict";
    var _arrays, arrays, _util, util;
    var __moduleName = context_22 && context_22.id;
    return {
        setters: [
            function (_arrays_1) {
                _arrays = _arrays_1;
            },
            function (Bag_1_1) {
                exports_22({
                    "Bag": Bag_1_1["default"]
                });
            },
            function (BSTree_1_1) {
                exports_22({
                    "BSTree": BSTree_1_1["default"]
                });
            },
            function (Dictionary_6_1) {
                exports_22({
                    "Dictionary": Dictionary_6_1["default"]
                });
            },
            function (Heap_2_1) {
                exports_22({
                    "Heap": Heap_2_1["default"]
                });
            },
            function (LinkedDictionary_1_1) {
                exports_22({
                    "LinkedDictionary": LinkedDictionary_1_1["default"]
                });
            },
            function (LinkedList_3_1) {
                exports_22({
                    "LinkedList": LinkedList_3_1["default"]
                });
            },
            function (MultiDictionary_1_1) {
                exports_22({
                    "MultiDictionary": MultiDictionary_1_1["default"]
                });
            },
            function (FactoryDictionary_1_1) {
                exports_22({
                    "FactoryDictionary": FactoryDictionary_1_1["default"]
                });
                exports_22({
                    "DefaultDictionary": FactoryDictionary_1_1["default"]
                });
            },
            function (Queue_2_1) {
                exports_22({
                    "Queue": Queue_2_1["default"]
                });
            },
            function (PriorityQueue_1_1) {
                exports_22({
                    "PriorityQueue": PriorityQueue_1_1["default"]
                });
            },
            function (Set_2_1) {
                exports_22({
                    "Set": Set_2_1["default"]
                });
            },
            function (Stack_1_1) {
                exports_22({
                    "Stack": Stack_1_1["default"]
                });
            },
            function (MultiRootTree_1_1) {
                exports_22({
                    "MultiRootTree": MultiRootTree_1_1["default"]
                });
            },
            function (_util_1) {
                _util = _util_1;
            }
        ],
        execute: function () {
            exports_22("arrays", arrays = _arrays);
            exports_22("util", util = _util);
        }
    };
});
System.register("Xaml/jupiter/controls/AnimationCollection", ["libs/typescript-collections/src/lib/index"], function (exports_23, context_23) {
    "use strict";
    var lib_1, AnimationCollection;
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [
            function (lib_1_1) {
                lib_1 = lib_1_1;
            }
        ],
        execute: function () {
            AnimationCollection = class AnimationCollection extends lib_1.LinkedList {
            };
            exports_23("AnimationCollection", AnimationCollection);
        }
    };
});
System.register("Xaml/jupiter/UIElementCollection", ["libs/typescript-collections/src/lib/index"], function (exports_24, context_24) {
    "use strict";
    var index_1, UIElementCollection;
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            UIElementCollection = class UIElementCollection extends index_1.LinkedDictionary {
            };
            exports_24("UIElementCollection", UIElementCollection);
        }
    };
});
System.register("Xaml/jupiter/controls/IAnimationsElement", [], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Xaml/jupiter/IAnimatableElement", [], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Xaml/jupiter/AnimatableUIElement", ["Xaml/jupiter/Core"], function (exports_27, context_27) {
    "use strict";
    var Core_2, AnimatableUIElement;
    var __moduleName = context_27 && context_27.id;
    return {
        setters: [
            function (Core_2_1) {
                Core_2 = Core_2_1;
            }
        ],
        execute: function () {
            AnimatableUIElement = class AnimatableUIElement extends Core_2.UIElement {
                get Animations() { return this._animations; }
                set Animations(value) { this._animations = value; }
                constructor() {
                    super();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                }
                StartAnimation() { }
                StopAnimation() { }
            };
            exports_27("AnimatableUIElement", AnimatableUIElement);
        }
    };
});
System.register("Xaml/jupiter/IChildrensElement", [], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Xaml/jupiter/IFrameworkElement", [], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Xaml/jupiter/IScript", [], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Xaml/jupiter/Core", ["Xaml/jupiter/AnimatableUIElement", "Xaml/jupiter/DependencyObject", "Xaml/jupiter/FrameworkElement", "Xaml/jupiter/UIElement", "Xaml/jupiter/UIElementCollection"], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_31(exports);
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
System.register("Xaml/jupiter/controls/Animations", ["Xaml/jupiter/UIElement", "Xaml/jupiter/controls/Core"], function (exports_32, context_32) {
    "use strict";
    var UIElement_3, Core_3, Animations;
    var __moduleName = context_32 && context_32.id;
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
                get Animations() { return this._animations; }
                set Animations(value) { this._animations = value; }
                constructor() {
                    super();
                    this._animations = new Core_3.AnimationCollection();
                }
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
            exports_32("Animations", Animations);
        }
    };
});
System.register("Xaml/jupiter/controls/Background", ["Xaml/jupiter/Core"], function (exports_33, context_33) {
    "use strict";
    var Core_4, Background;
    var __moduleName = context_33 && context_33.id;
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
            exports_33("Background", Background);
        }
    };
});
System.register("Xaml/behaviors/MeshNormalLines", [], function (exports_34, context_34) {
    "use strict";
    var MeshNormalLines;
    var __moduleName = context_34 && context_34.id;
    return {
        setters: [],
        execute: function () {
            MeshNormalLines = class MeshNormalLines {
                constructor() {
                }
                static Install(scene, mesh) {
                    this.ShowNormals(mesh, 0.25, new BABYLON.Color3(1, 0, 0), scene.Ctrl);
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
            exports_34("MeshNormalLines", MeshNormalLines);
        }
    };
});
System.register("Xaml/jupiter/controls/KeyFrame", ["Xaml/jupiter/Core"], function (exports_35, context_35) {
    "use strict";
    var Core_5, KeyFrame;
    var __moduleName = context_35 && context_35.id;
    return {
        setters: [
            function (Core_5_1) {
                Core_5 = Core_5_1;
            }
        ],
        execute: function () {
            KeyFrame = class KeyFrame extends Core_5.UIElement {
                get Frame() { return this._frame; }
                get Value() { return this._value; }
                constructor() {
                    super();
                }
                LoadFromNode(node) {
                    try {
                        this._frame = parseInt(node.attributes["Frame"].value);
                    }
                    catch (_a) { }
                    try {
                        this._value = parseFloat(node.attributes["Value"].value);
                    }
                    catch (_b) { }
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.KeyFrames.add(this);
                        return true;
                    }
                    return false;
                }
            };
            exports_35("KeyFrame", KeyFrame);
        }
    };
});
System.register("Xaml/jupiter/controls/KeyFrames", ["Xaml/jupiter/UIElement", "Xaml/jupiter/controls/Core"], function (exports_36, context_36) {
    "use strict";
    var UIElement_4, Core_6, KeyFrames;
    var __moduleName = context_36 && context_36.id;
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
                get KeyFrames() { return this._keyFrames; }
                set KeyFrames(value) { this._keyFrames = value; }
                constructor() {
                    super();
                    this._keyFrames = new Core_6.KeyFrameCollection();
                }
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
            exports_36("KeyFrames", KeyFrames);
        }
    };
});
System.register("Xaml/jupiter/controls/Plane", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_37, context_37) {
    "use strict";
    var UIElement_5, Plane;
    var __moduleName = context_37 && context_37.id;
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
                get Size() { return this._size; }
                get MeshName() { return this._meshName; }
                get SceneName() { return this._sceneName; }
                constructor() {
                    super();
                }
                Initialize() {
                    if (this.SceneName !== undefined) {
                        let scene = this.VT.FindByName(this.SceneName);
                        this.Ctrl = BABYLON.Mesh.CreatePlane(this.Name, this.Size, scene.Ctrl);
                        this.Ctrl.Size = this.Size;
                        this.Ctrl.position = this.Position;
                        if (this.MeshName !== undefined) {
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
                    try {
                        this._size = parseFloat(node.attributes["Size"].value);
                    }
                    catch (_a) { }
                    try {
                        this._meshName = node.attributes["Mesh"].value;
                    }
                    catch (_b) { }
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                    }
                    catch (_c) { }
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_37("Plane", Plane);
        }
    };
});
System.register("Xaml/jupiter/controls/Texture", ["Xaml/jupiter/Core", "babylonjs-gui", "Xaml/jupiter/controls/Plane"], function (exports_38, context_38) {
    "use strict";
    var Core_7, Plane_1, Texture;
    var __moduleName = context_38 && context_38.id;
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
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    if (this._type === "CubeTexture") {
                        this.Ctrl = new BABYLON.CubeTexture(this.RootUrl, scene.Ctrl);
                    }
                    else if (this._type === "DynamicTexture") {
                        this.Ctrl = new BABYLON.DynamicTexture(this.Name, 512, scene.Ctrl, this.GeneratingMipMaps);
                    }
                    else if (this._type === "Texture") {
                        this.Ctrl = new BABYLON.Texture(this.RootUrl, scene.Ctrl);
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
                        let reflectionTexture = new BABYLON.MirrorTexture(this.Name, this.Size, scene.Ctrl, this.GeneratingMipMaps);
                        reflectionTexture.mirrorPlane = this.MirrorPlane;
                        reflectionTexture.level = this.Level;
                        this.Ctrl = reflectionTexture;
                    }
                    if (this.Ctrl !== undefined) {
                        if (this._coordinatesMode !== undefined)
                            this.Ctrl.coordinatesMode = this._coordinatesMode;
                    }
                    this.ChildrenGUIs.forEach((key, child) => {
                        child.Initialize();
                    });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                    }
                    catch (_a) { }
                    try {
                        this._rootUrl = node.attributes["RootUrl"].value;
                    }
                    catch (_b) { }
                    try {
                        this._type = node.attributes["Type"].value;
                    }
                    catch (_c) { }
                    try {
                        this._options = node.attributes["Options"].value;
                    }
                    catch (_d) { }
                    try {
                        this._coordinatesMode = eval(`BABYLON.${node.attributes["CoordinatesMode"].value};`);
                    }
                    catch (e) { }
                    try {
                        this._generatingMipMaps = node.attributes["GeneratingMipMaps"].value.toLowerCase() === 'true';
                    }
                    catch (e) { }
                    try {
                        this._idealHeight = parseInt(node.attributes["IdealHeight"].value);
                    }
                    catch (_e) { }
                    try {
                        this._size = parseInt(node.attributes["Size"].value);
                    }
                    catch (_f) { }
                    try {
                        this._level = parseFloat(node.attributes["Level"].value);
                    }
                    catch (_g) { }
                    try {
                        this._mirrorPlane = eval(`new BABYLON.${node.attributes["MirrorPlane"].value};`);
                    }
                    catch (e) { }
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_38("Texture", Texture);
        }
    };
});
System.register("Xaml/jupiter/controls/Box", ["Xaml/behaviors/MeshNormalLines", "Xaml/jupiter/AnimatableUIElement"], function (exports_39, context_39) {
    "use strict";
    var MeshNormalLines_1, AnimatableUIElement_2, Box;
    var __moduleName = context_39 && context_39.id;
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
                Initialize() {
                    this._scene = this.VT.Get(this.SceneName);
                    this.Ctrl = BABYLON.Mesh.CreateBox(this.Name, this._width, this._scene.Ctrl);
                    if (this.MaterialName !== undefined) {
                        let material = this.VT.Get(this.MaterialName);
                        if (material && material.Ctrl)
                            this.Ctrl.material = material.Ctrl;
                    }
                    if (this.Position != undefined)
                        this.Ctrl.position = this.Position;
                    if (this.InfiniteDistance !== undefined)
                        this.Ctrl.infiniteDistance = this._infiniteDistance;
                    if (this._showNormalLines !== undefined && this._showNormalLines)
                        MeshNormalLines_1.MeshNormalLines.Install(this._scene, this.Ctrl);
                    if (this.Scaling !== undefined)
                        this.Ctrl.scaling = this.Scaling;
                    if (this.IsVisible !== undefined)
                        this.Ctrl.isVisible = this.IsVisible;
                    if (this.AddToRenderList !== undefined && this.Ctrl !== undefined) {
                        let tex = this.VT.FindByName(this.AddToRenderList);
                        tex.Ctrl.renderList.push(this.Ctrl);
                    }
                    if (this.Animations && this.Animations.Animations)
                        this.Animations.Animations.forEach((animation) => {
                            var animationBox = new BABYLON.Animation(animation.Name, animation.TargetProperty, animation.FPS, animation.DataType, animation.LoopMode);
                            animationBox.setKeys(animation.KeyFrames.GetArray());
                            this.Ctrl.animations.push(animationBox);
                        });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                    }
                    catch (e) { }
                    try {
                        this._materialName = node.attributes["Material"].value;
                    }
                    catch (e) { }
                    try {
                        this._showNormalLines = node.attributes["ShowNormalLines"].value.toLowerCase() === 'true';
                    }
                    catch (e) { }
                    try {
                        this._width = parseFloat(node.attributes["Width"].value);
                    }
                    catch (e) { }
                    try {
                        this._infiniteDistance = node.attributes["InfiniteDistance"].value.toLowerCase() === 'true';
                    }
                    catch (e) { }
                    try {
                        this._scaling = eval(`new BABYLON.${node.attributes["Scaling"].value};`);
                    }
                    catch (e) { }
                    try {
                        this._addToRenderList = node.attributes["AddToRenderList"].value;
                    }
                    catch (e) { }
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
            exports_39("Box", Box);
        }
    };
});
System.register("Xaml/behaviors/CustomScript", [], function (exports_40, context_40) {
    "use strict";
    var CustomScript;
    var __moduleName = context_40 && context_40.id;
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
            exports_40("CustomScript", CustomScript);
        }
    };
});
System.register("Xaml/jupiter/controls/Button", ["Xaml/jupiter/UIElement", "babylonjs-gui", "Xaml/behaviors/CustomScript"], function (exports_41, context_41) {
    "use strict";
    var UIElement_6, CustomScript_1, Button;
    var __moduleName = context_41 && context_41.id;
    return {
        setters: [
            function (UIElement_6_1) {
                UIElement_6 = UIElement_6_1;
            },
            function (_3) {
            },
            function (CustomScript_1_1) {
                CustomScript_1 = CustomScript_1_1;
            }
        ],
        execute: function () {
            Button = class Button extends UIElement_6.UIElement {
                get Content() { return this._content; }
                get Color() { return this._color; }
                get Background() { return this._background; }
                get CornerRadius() { return this._cornerRadius; }
                get Width() { return this._width; }
                get Height() { return this._height; }
                get FontSize() { return this._fontSize; }
                constructor() {
                    super();
                }
                Initialize() {
                    this.Ctrl = BABYLON.GUI.Button.CreateSimpleButton(this.Name, this.Content);
                    this.Ctrl.width = this.Width;
                    this.Ctrl.height = this.Height;
                    this.Ctrl.color = this.Color;
                    this.Ctrl.cornerRadius = this.CornerRadius;
                    this.Ctrl.background = this.Background;
                    if (this.FontSize !== undefined)
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
                    try {
                        this._content = node.attributes["Content"].value;
                    }
                    catch (_a) { }
                    try {
                        this._color = node.attributes["Color"].value;
                    }
                    catch (_b) { }
                    try {
                        this._background = node.attributes["Background"].value;
                    }
                    catch (_c) { }
                    try {
                        this._width = parseFloat(node.attributes["Width"].value);
                    }
                    catch (_d) { }
                    try {
                        this._height = node.attributes["Height"].value;
                    }
                    catch (_e) { }
                    try {
                        this._cornerRadius = node.attributes["CornerRadius"].value;
                    }
                    catch (_f) { }
                    try {
                        this._fontSize = parseFloat(node.attributes["FontSize"].value);
                    }
                    catch (_g) { }
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_41("Button", Button);
        }
    };
});
System.register("Xaml/jupiter/controls/Camera", ["Xaml/jupiter/UIElement", "Xaml/Core"], function (exports_42, context_42) {
    "use strict";
    var UIElement_7, Core_8, Camera;
    var __moduleName = context_42 && context_42.id;
    return {
        setters: [
            function (UIElement_7_1) {
                UIElement_7 = UIElement_7_1;
            },
            function (Core_8_1) {
                Core_8 = Core_8_1;
            }
        ],
        execute: function () {
            Camera = class Camera extends UIElement_7.UIElement {
                get SceneName() { return this._sceneName; }
                get Target() { return this._target; }
                get Type() { return this._type; }
                get Alpha() { return this._alpha; }
                get Beta() { return this._beta; }
                get Radius() { return this._radius; }
                get lowerBetaLimit() { return this._lowerBetaLimit; }
                get upperBetaLimit() { return this._upperBetaLimit; }
                get lowerRadiusLimit() { return this._lowerRadiusLimit; }
                get FOV() { return this._fov; }
                get MinZ() { return this._minz; }
                get MaxZ() { return this._maxz; }
                get PanningSensibility() { return this._panningSensibility; }
                Initialize() {
                    let canvas = Core_8.DIContainer.get("rootCanvas");
                    let scene = this.VT.Get(this.SceneName);
                    if (this._type === "FreeCamera") {
                        this.Ctrl = new BABYLON.FreeCamera(this.Name, this.Position, scene.Ctrl);
                        if (this._target !== undefined)
                            this.GetFreeCamera(this.Ctrl).setTarget(this._target);
                        if (this.FOV !== undefined)
                            this.GetFreeCamera(this.Ctrl).fov = this.FOV;
                        if (this.MinZ !== undefined)
                            this.GetFreeCamera(this.Ctrl).minZ = this.MinZ;
                        if (this.MaxZ !== undefined)
                            this.GetFreeCamera(this.Ctrl).maxZ = this.MaxZ;
                        this.Ctrl.attachControl(canvas, true);
                    }
                    else if (this._type === "UniversalCamera") {
                        this.Ctrl = new BABYLON.UniversalCamera(this.Name, this.Position, scene.Ctrl);
                        this.Ctrl.setTarget(this._target);
                        this.Ctrl.attachControl(canvas, true);
                    }
                    else if (this._type === "ArcRotateCamera") {
                        let arcCamera = new BABYLON.ArcRotateCamera(this.Name, this._alpha, this._beta, this._radius, this._target, scene.Ctrl);
                        if (this._lowerBetaLimit !== undefined)
                            arcCamera.lowerBetaLimit = this._lowerBetaLimit;
                        if (this._upperBetaLimit !== undefined)
                            arcCamera.upperBetaLimit = this._upperBetaLimit;
                        if (this._lowerRadiusLimit !== undefined)
                            arcCamera.lowerRadiusLimit = this._lowerRadiusLimit;
                        if (this._panningSensibility !== undefined)
                            arcCamera.panningSensibility = this._panningSensibility;
                        if (this.Position !== undefined)
                            arcCamera.position = this.Position;
                        arcCamera.attachControl(canvas, true, true);
                        this.Ctrl = arcCamera;
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
                        this._target = eval(`new BABYLON.${node.attributes["Target"].value};`);
                    }
                    catch (e) { }
                    try {
                        this._type = node.attributes["Type"].value;
                    }
                    catch (e) { }
                    try {
                        this._alpha = parseFloat(node.attributes["Alpha"].value);
                    }
                    catch (e) { }
                    try {
                        this._alpha = eval(node.attributes["AlphaCalculated"].value);
                    }
                    catch (e) { }
                    try {
                        this._beta = parseFloat(node.attributes["Beta"].value);
                    }
                    catch (e) { }
                    try {
                        this._beta = eval(node.attributes["BetaCalculated"].value);
                    }
                    catch (e) { }
                    try {
                        this._radius = parseFloat(node.attributes["Radius"].value);
                    }
                    catch (e) { }
                    try {
                        this._lowerBetaLimit = eval(`${node.attributes["LowerBetaLimit"].value};`);
                    }
                    catch (e) { }
                    try {
                        this._upperBetaLimit = eval(`${node.attributes["UpperBetaLimit"].value};`);
                    }
                    catch (e) { }
                    try {
                        this._lowerRadiusLimit = eval(`${node.attributes["LowerRadiusLimit"].value};`);
                    }
                    catch (e) { }
                    try {
                        this._fov = parseFloat(node.attributes["FOV"].value);
                    }
                    catch (e) { }
                    try {
                        this._minz = parseFloat(node.attributes["MinZ"].value);
                    }
                    catch (e) { }
                    try {
                        this._maxz = parseFloat(node.attributes["MaxZ"].value);
                    }
                    catch (e) { }
                    try {
                        this._panningSensibility = parseFloat(node.attributes["PanningSensibility"].value);
                    }
                    catch (e) { }
                }
                GetFreeCamera(camera) {
                    return camera;
                }
            };
            exports_42("Camera", Camera);
        }
    };
});
System.register("Xaml/jupiter/controls/Disc", ["Xaml/behaviors/MeshNormalLines", "Xaml/jupiter/AnimatableUIElement"], function (exports_43, context_43) {
    "use strict";
    var MeshNormalLines_2, AnimatableUIElement_3, Disc;
    var __moduleName = context_43 && context_43.id;
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
                get SideOrientation() { return this._sideOrieantation; }
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    this._scene = scene;
                    this.Ctrl = BABYLON.MeshBuilder.CreateDisc(this.Name, { tessellation: this.Tessellation, sideOrientation: this.SideOrientation }, scene.Ctrl);
                    if (this.MaterialName) {
                        let material = this.VT.Get(this.MaterialName);
                        if (material.Ctrl)
                            this.Ctrl.material = material.Ctrl;
                    }
                    if (this.Ctrl && this._showNormalLines)
                        MeshNormalLines_2.MeshNormalLines.Install(scene, this.Ctrl);
                    if (this.Ctrl && this.Animations && this.Animations.Animations)
                        this.Animations.Animations.forEach((animation) => {
                            var animationBox = new BABYLON.Animation(animation.Name, animation.TargetProperty, animation.FPS, animation.DataType, animation.LoopMode);
                            animationBox.setKeys(animation.KeyFrames.GetArray());
                            this.Ctrl.animations.push(animationBox);
                        });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                    }
                    catch (e) { }
                    try {
                        this._materialName = node.attributes["Material"].value;
                    }
                    catch (e) { }
                    try {
                        this._showNormalLines = node.attributes["ShowNormalLines"].value.toLowerCase() === 'true';
                    }
                    catch (e) { }
                    try {
                        this._radius = parseFloat(node.attributes["Radius"].value);
                    }
                    catch (e) { }
                    try {
                        this._tessellation = parseFloat(node.attributes["Tessellation"].value);
                    }
                    catch (e) { }
                    try {
                        this._sideOrieantation = eval(node.attributes["SideOrientation"].value);
                    }
                    catch (e) { }
                    try {
                        this._updatable = node.attributes["Updateable"].value.toLowerCase() === 'true';
                    }
                    catch (e) { }
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
            exports_43("Disc", Disc);
        }
    };
});
System.register("Xaml/jupiter/controls/Effect", ["Xaml/jupiter/UIElement", "Xaml/Core"], function (exports_44, context_44) {
    "use strict";
    var UIElement_8, Core_9, Effect;
    var __moduleName = context_44 && context_44.id;
    return {
        setters: [
            function (UIElement_8_1) {
                UIElement_8 = UIElement_8_1;
            },
            function (Core_9_1) {
                Core_9 = Core_9_1;
            }
        ],
        execute: function () {
            Effect = class Effect extends UIElement_8.UIElement {
                get UniformNames() { return this._uniformNames; }
                constructor() {
                    super();
                }
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
            exports_44("Effect", Effect);
        }
    };
});
System.register("Xaml/jupiter/controls/Event", ["Xaml/jupiter/UIElement"], function (exports_45, context_45) {
    "use strict";
    var UIElement_9, Event;
    var __moduleName = context_45 && context_45.id;
    return {
        setters: [
            function (UIElement_9_1) {
                UIElement_9 = UIElement_9_1;
            }
        ],
        execute: function () {
            Event = class Event extends UIElement_9.UIElement {
                get EventName() { return this._eventName; }
                constructor() {
                    super();
                }
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
            exports_45("Event", Event);
        }
    };
});
System.register("Xaml/jupiter/controls/Panel", ["Xaml/jupiter/FrameworkElement", "Xaml/jupiter/UIElementCollection"], function (exports_46, context_46) {
    "use strict";
    var FrameworkElement_2, UIElementCollection_2, Panel;
    var __moduleName = context_46 && context_46.id;
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
            exports_46("Panel", Panel);
        }
    };
});
System.register("Xaml/jupiter/controls/Grid", ["Xaml/jupiter/controls/Panel"], function (exports_47, context_47) {
    "use strict";
    var Panel_1, Grid;
    var __moduleName = context_47 && context_47.id;
    return {
        setters: [
            function (Panel_1_1) {
                Panel_1 = Panel_1_1;
            }
        ],
        execute: function () {
            Grid = class Grid extends Panel_1.Panel {
            };
            exports_47("Grid", Grid);
        }
    };
});
System.register("Xaml/jupiter/controls/Material", ["Xaml/jupiter/UIElement", "babylonjs-materials"], function (exports_48, context_48) {
    "use strict";
    var UIElement_10, Material;
    var __moduleName = context_48 && context_48.id;
    return {
        setters: [
            function (UIElement_10_1) {
                UIElement_10 = UIElement_10_1;
            },
            function (_4) {
            }
        ],
        execute: function () {
            Material = class Material extends UIElement_10.UIElement {
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
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    if (this.Type === "StandardMaterial") {
                        this.Ctrl = new BABYLON.StandardMaterial(this.Name, scene.Ctrl);
                        if (this._wireframe !== undefined)
                            this.Ctrl.wireframe = this._wireframe;
                        if (this._diffuseColor !== undefined)
                            this.GetStandardMaterial(this.Ctrl).diffuseColor = this._diffuseColor;
                        if (this._specularColor !== undefined)
                            this.GetStandardMaterial(this.Ctrl).specularColor = this._specularColor;
                        if (this._emissiveColor !== undefined)
                            this.GetStandardMaterial(this.Ctrl).emissiveColor = this._emissiveColor;
                        if (this._disableLighting !== undefined)
                            this.GetStandardMaterial(this.Ctrl).disableLighting = this._disableLighting;
                        if (this._backFaceCulling !== undefined)
                            this.GetStandardMaterial(this.Ctrl).backFaceCulling = this._backFaceCulling;
                        if (this._reflectionTextureName !== undefined) {
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
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                    }
                    catch (e) { }
                    try {
                        this._reflectionTextureName = node.attributes["ReflectionTexture"].value;
                    }
                    catch (e) { }
                    try {
                        this._type = node.attributes["Type"].value;
                    }
                    catch (e) { }
                    try {
                        this._wireframe = node.attributes["Wireframe"].value.toLowerCase() === 'true';
                    }
                    catch (e) { }
                    try {
                        this._diffuseColor = eval(this.cleanBabylonColor3Attribute(node.attributes["DiffuseColor"].value));
                    }
                    catch (e) { }
                    try {
                        this._specularColor = eval(this.cleanBabylonColor3Attribute(node.attributes["SpecularColor"].value));
                    }
                    catch (e) { }
                    try {
                        this._emissiveColor = eval(this.cleanBabylonColor3Attribute(node.attributes["EmissiveColor"].value));
                    }
                    catch (e) { }
                    try {
                        this._reflectionTextureName = node.attributes["ReflectionTexture"].value;
                    }
                    catch (e) { }
                    try {
                        this._disableLighting = node.attributes["DisableLighting"].value.toLowerCase() === 'true';
                    }
                    catch (e) { }
                    try {
                        this._backFaceCulling = node.attributes["BackFaceCulling"].value.toLowerCase() === 'true';
                    }
                    catch (e) { }
                    try {
                        this._shaderPath = this.CleanJSONObject(node.attributes["ShaderPath"].value);
                    }
                    catch (e) { }
                    try {
                        this._options = this.CleanJSONObject(node.attributes["Options"].value);
                    }
                    catch (e) { }
                }
                CleanJSONObject(stringToClean) {
                    var cleanString = stringToClean.replace(/`/g, "\"");
                    var newObject = JSON.parse(cleanString);
                    return newObject;
                }
                cleanBabylonColor3Attribute(color3) {
                    if (color3.includes("Color3."))
                        return `BABYLON.${color3};`;
                    return `new BABYLON.${color3};`;
                }
                GetStandardMaterial(material) {
                    return material;
                }
            };
            exports_48("Material", Material);
        }
    };
});
System.register("Xaml/jupiter/controls/Ground", ["Xaml/jupiter/UIElement"], function (exports_49, context_49) {
    "use strict";
    var UIElement_11, Ground;
    var __moduleName = context_49 && context_49.id;
    return {
        setters: [
            function (UIElement_11_1) {
                UIElement_11 = UIElement_11_1;
            }
        ],
        execute: function () {
            Ground = class Ground extends UIElement_11.UIElement {
                get SceneName() { return this._sceneName; }
                get Width() { return this._width; }
                get Height() { return this._height; }
                get SubDivisions() { return this._subdivisions; }
                get MaterialName() { return this._materialName; }
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    let material = this.VT.Get(this.MaterialName);
                    this.Ctrl = BABYLON.Mesh.CreateGround(this.Name, this._width, this._height, this._subdivisions, scene.Ctrl, false);
                    if (material && material.Ctrl)
                        this.Ctrl.material = material.Ctrl;
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                    }
                    catch (_a) { }
                    try {
                        this._width = parseFloat(node.attributes["Width"].value);
                    }
                    catch (_b) { }
                    try {
                        this._height = parseFloat(node.attributes["Height"].value);
                    }
                    catch (_c) { }
                    try {
                        this._subdivisions = parseInt(node.attributes["SubDivisions"].value);
                    }
                    catch (_d) { }
                    try {
                        this._materialName = node.attributes["Material"].value;
                    }
                    catch (_e) { }
                }
            };
            exports_49("Ground", Ground);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/CheckBox", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_50, context_50) {
    "use strict";
    var UIElement_12, CheckBox;
    var __moduleName = context_50 && context_50.id;
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
                get IsChecked() { return this._isChecked; }
                ;
                get HeaderSize() { return this._headerSize; }
                ;
                get HeaderHeight() { return this._headerHeight; }
                ;
                constructor() {
                    super();
                }
                Initialize() {
                    this.Ctrl = new BABYLON.GUI.Checkbox();
                    this.Ctrl.width = this.Width;
                    this.Ctrl.height = this.Height;
                    this.Ctrl.color = this.Color;
                    this.Ctrl.isChecked = this.IsChecked;
                    if (this.Background !== undefined)
                        this.Ctrl.background = this.Background;
                    var header = BABYLON.GUI.Control.AddHeader(this.Ctrl, this.Content, this.HeaderSize, { isHorizontal: true, controlFirst: true });
                    header.color = this.Color;
                    header.height = this.HeaderHeight;
                    header.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    header.children[1].fontSize = this.FontSize;
                    header.children[1].onPointerDownObservable.add(() => {
                        this.Ctrl.isChecked = !this.Ctrl.isChecked;
                    });
                    this.Parent.Ctrl.addControl(header);
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
                        this._isChecked = node.attributes["IsChecked"].value.toLowerCase() === 'true';
                    }
                    catch (e) { }
                    try {
                        this._headerHeight = node.attributes["HeaderHeight"].value;
                    }
                    catch (_h) { }
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_50("CheckBox", CheckBox);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/Code", ["Xaml/jupiter/UIElement"], function (exports_51, context_51) {
    "use strict";
    var UIElement_13, Code;
    var __moduleName = context_51 && context_51.id;
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
            exports_51("Code", Code);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/ColorPicker", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_52, context_52) {
    "use strict";
    var UIElement_14, ColorPicker;
    var __moduleName = context_52 && context_52.id;
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
                get Height() { return this._height; }
                get Width() { return this._width; }
                get Value() { return this._value; }
                get HorizontalAlignment() { return this._horizontalAlignment; }
                constructor() {
                    super();
                }
                Initialize() {
                    this.Ctrl = new BABYLON.GUI.ColorPicker(this.Name);
                    this.Ctrl.height = this.Height;
                    this.Ctrl.width = this.Width;
                    if (this.Value !== undefined)
                        this.Ctrl.value = this.Value;
                    this.Ctrl.horizontalAlignment = this.HorizontalAlignment;
                    this.Parent.Ctrl.addControl(this.Ctrl);
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
                        this._value = node.attributes["Value"].value;
                    }
                    catch (_c) { }
                    try {
                        this._horizontalAlignment = eval(node.attributes["HorizontalAlignment"].value);
                    }
                    catch (_d) { }
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_52("ColorPicker", ColorPicker);
        }
    };
});
System.register("Xaml/jupiter/controls/Mesh", ["Xaml/jupiter/UIElement"], function (exports_53, context_53) {
    "use strict";
    var UIElement_15, Mesh;
    var __moduleName = context_53 && context_53.id;
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
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    this.Ctrl = new BABYLON.Mesh(this.Name, scene.Ctrl);
                    if (this.MaterialName !== undefined) {
                        let material = this.VT.Get(this.MaterialName);
                        if (material && material.Ctrl)
                            this.Ctrl.material = material.Ctrl;
                    }
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                    }
                    catch (_a) { }
                    try {
                        this._width = parseFloat(node.attributes["Width"].value);
                    }
                    catch (_b) { }
                    try {
                        this._height = parseFloat(node.attributes["Height"].value);
                    }
                    catch (_c) { }
                    try {
                        this._subdivisions = parseInt(node.attributes["SubDivisions"].value);
                    }
                    catch (_d) { }
                    try {
                        this._materialName = node.attributes["Material"].value;
                    }
                    catch (_e) { }
                }
            };
            exports_53("Mesh", Mesh);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/Ellipse", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_54, context_54) {
    "use strict";
    var UIElement_16, Ellipse;
    var __moduleName = context_54 && context_54.id;
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
                get Color() { return this._color; }
                get Background() { return this._background; }
                get Thickness() { return this._thickness; }
                get Width() { return this._width; }
                get Height() { return this._height; }
                get MeshName() { return this._meshName; }
                constructor() {
                    super();
                }
                Initialize() {
                    this.Ctrl = new BABYLON.GUI.Ellipse();
                    this.Ctrl.width = this.Width;
                    this.Ctrl.height = this.Height;
                    this.Ctrl.color = this.Color;
                    this.Ctrl.background = this.Background;
                    if (this.Thickness !== undefined)
                        this.Ctrl.thickness = this.Thickness;
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
                    try {
                        this._color = node.attributes["Color"].value;
                    }
                    catch (_a) { }
                    try {
                        this._background = node.attributes["Background"].value;
                    }
                    catch (_b) { }
                    try {
                        this._width = node.attributes["Width"].value;
                    }
                    catch (_c) { }
                    try {
                        this._height = node.attributes["Height"].value;
                    }
                    catch (_d) { }
                    try {
                        this._thickness = parseFloat(node.attributes["Thickness"].value);
                    }
                    catch (_e) { }
                    try {
                        this._meshName = node.attributes["Mesh"].value;
                    }
                    catch (_f) { }
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_54("Ellipse", Ellipse);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/Line", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_55, context_55) {
    "use strict";
    var UIElement_17, Line;
    var __moduleName = context_55 && context_55.id;
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
                get Dash() { return this._dash; }
                get LineWidth() { return this._lineWidth; }
                get Alpha() { return this._alpha; }
                get MeshName() { return this._meshName; }
                get ConnectedControlName() { return this._connectedControlName; }
                constructor() {
                    super();
                }
                Initialize() {
                    let mesh = this.VT.Get(this.MeshName);
                    let connecteControl = this.VT.Get(this.ConnectedControlName);
                    this.Ctrl = new BABYLON.GUI.Line();
                    this.Ctrl.alpha = 0.5;
                    this.Ctrl.lineWidth = 5;
                    this.Ctrl.dash = [5, 10];
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
                        this._meshName = node.attributes["Mesh"].value;
                    }
                    catch (_e) { }
                    try {
                        this._connectedControlName = node.attributes["ConnectedControl"].value;
                    }
                    catch (_f) { }
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_55("Line", Line);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/RadioButton", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_56, context_56) {
    "use strict";
    var UIElement_18, RadioButton;
    var __moduleName = context_56 && context_56.id;
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
                constructor() {
                    super();
                }
                Initialize() {
                    this.Ctrl = new BABYLON.GUI.RadioButton();
                    this.Ctrl.width = this.Width;
                    this.Ctrl.height = this.Height;
                    this.Ctrl.color = this.Color;
                    this.Ctrl.background = this.Background;
                    var header = BABYLON.GUI.Control.AddHeader(this.Ctrl, this.Content, this.HeaderSize, { isHorizontal: true, controlFirst: true });
                    header.height = this.HeaderHeight;
                    header.children[1].fontSize = this.FontSize;
                    header.children[1].onPointerDownObservable.add(() => {
                        this.Ctrl.isChecked = !this.Ctrl.isChecked;
                    });
                    this.Parent.Ctrl.addControl(header);
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
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_56("RadioButton", RadioButton);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/Resources", ["Xaml/jupiter/UIElement", "Xaml/jupiter/Core"], function (exports_57, context_57) {
    "use strict";
    var UIElement_19, Core_10, Resources;
    var __moduleName = context_57 && context_57.id;
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
                get Resources() { return this._resources; }
                set Resources(value) { this._resources = value; }
                constructor() {
                    super();
                    this._resources = new Core_10.UIElementCollection();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                }
            };
            exports_57("Resources", Resources);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/Resource", ["Xaml/jupiter/UIElement"], function (exports_58, context_58) {
    "use strict";
    var UIElement_20, Resource;
    var __moduleName = context_58 && context_58.id;
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
            exports_58("Resource", Resource);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/StackPanel", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_59, context_59) {
    "use strict";
    var UIElement_21, StackPanel;
    var __moduleName = context_59 && context_59.id;
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
                get Rotation() { return this._rotation; }
                get Height() { return this._height; }
                get Width() { return this._width; }
                get IsVertical() { return this._isVertical; }
                get Top() { return this._top; }
                get PaddingRight() { return this._paddingRight; }
                get FontSize() { return this._fontSize; }
                get HorizontalAlignment() { return this._horizontalAlignment; }
                get VerticalAlignment() { return this._verticalAlignment; }
                constructor() {
                    super();
                }
                Initialize() {
                    let sp = new BABYLON.GUI.StackPanel(this.Name);
                    if (this.Height !== undefined)
                        sp.height = this.Height;
                    if (this.Width !== undefined)
                        sp.width = this.Width;
                    else if (this.Parent instanceof StackPanel && this.Parent.Width !== undefined)
                        sp.width = this.Parent.Width;
                    if (this.Top !== undefined)
                        sp.top = this.Top;
                    if (this.Rotation !== undefined)
                        sp.rotation = this.Rotation;
                    if (this.HorizontalAlignment !== undefined)
                        sp.horizontalAlignment = this.HorizontalAlignment;
                    if (this.VerticalAlignment !== undefined)
                        sp.verticalAlignment = this.VerticalAlignment;
                    if (this.FontSize !== undefined)
                        sp.fontSize = this.FontSize;
                    if (this.PaddingRight !== undefined)
                        sp.paddingRight = this.PaddingRight;
                    if (this.IsVertical !== undefined)
                        sp.isVertical = this.IsVertical;
                    this.Ctrl = sp;
                    this.Parent.Ctrl.addControl(this.Ctrl);
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
                        this._top = node.attributes["Top"].value;
                    }
                    catch (_c) { }
                    try {
                        this._rotation = parseFloat(node.attributes["Rotation"].value);
                    }
                    catch (_d) { }
                    try {
                        this._horizontalAlignment = eval(node.attributes["HorizontalAlignment"].value);
                    }
                    catch (_e) { }
                    try {
                        this._verticalAlignment = eval(node.attributes["VerticalAlignment"].value);
                    }
                    catch (_f) { }
                    try {
                        this._fontSize = node.attributes["FontSize"].value;
                    }
                    catch (_g) { }
                    try {
                        this._paddingRight = node.attributes["PaddingRight"].value;
                    }
                    catch (_h) { }
                    try {
                        this._isVertical = node.attributes["IsVertical"].value.toLowerCase() === 'true';
                    }
                    catch (e) { }
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_59("StackPanel", StackPanel);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/TextBlock", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_60, context_60) {
    "use strict";
    var UIElement_22, TextBlock;
    var __moduleName = context_60 && context_60.id;
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
                get Height() { return this._height; }
                get Width() { return this._height; }
                get FontSize() { return this._fontSize; }
                get Content() { return this._content; }
                get Color() { return this._color; }
                get TextHorizontalAlignment() { return this._textHorizontalAlignment; }
                constructor() {
                    super();
                }
                Initialize() {
                    this.Ctrl = new BABYLON.GUI.TextBlock(this.Name);
                    if (this.Height !== undefined)
                        this.Ctrl.height = this.Height;
                    if (this.Width !== undefined)
                        this.Ctrl.width = this.Width;
                    if (this.FontSize !== undefined)
                        this.Ctrl.fontSize = this.FontSize;
                    if (this.Color !== undefined)
                        this.Ctrl.color = this.Color;
                    if (this.TextHorizontalAlignment !== undefined)
                        this.Ctrl.textHorizontalAlignment = this.TextHorizontalAlignment;
                    this.Ctrl.text = this.Content;
                    this.Parent.Ctrl.addControl(this.Ctrl);
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
                        this._fontSize = parseFloat(node.attributes["FontSize"].value);
                    }
                    catch (_c) { }
                    try {
                        this._content = node.attributes["Content"].value;
                    }
                    catch (_d) { }
                    try {
                        this._color = node.attributes["Color"].value;
                    }
                    catch (_e) { }
                    try {
                        this._textHorizontalAlignment = eval(node.attributes["TextHorizontalAlignment"].value);
                    }
                    catch (_f) { }
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_60("TextBlock", TextBlock);
        }
    };
});
System.register("Xaml/jupiter/controls/KeyFrameCollection", ["libs/typescript-collections/src/lib/index"], function (exports_61, context_61) {
    "use strict";
    var lib_2, KeyFrameCollection;
    var __moduleName = context_61 && context_61.id;
    return {
        setters: [
            function (lib_2_1) {
                lib_2 = lib_2_1;
            }
        ],
        execute: function () {
            KeyFrameCollection = class KeyFrameCollection extends lib_2.LinkedList {
            };
            exports_61("KeyFrameCollection", KeyFrameCollection);
        }
    };
});
System.register("Xaml/jupiter/controls/gui/Label", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_62, context_62) {
    "use strict";
    var UIElement_23, Label;
    var __moduleName = context_62 && context_62.id;
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
                constructor() {
                    super();
                }
                Initialize() {
                    this.Ctrl = new BABYLON.GUI.Rectangle(this.Name);
                    this.Ctrl.background = this.Background;
                    this.Ctrl.height = this.Height;
                    this.Ctrl.alpha = this.Alpha;
                    this.Ctrl.width = this.Width;
                    this.Ctrl.cornerRadius = this.CornerRadius;
                    this.Ctrl.thickness = this.Thickness;
                    this.Ctrl.linkOffsetY = this.LinkOffsetY;
                    if (this.Top !== undefined)
                        this.Ctrl.top = this.Top;
                    if (this.VerticalAlignment !== undefined)
                        this.Ctrl.verticalAlignment = this.VerticalAlignment;
                    if (this.ZIndex !== undefined)
                        this.Ctrl.zIndex = this.ZIndex;
                    this.Parent.Ctrl.addControl(this.Ctrl);
                    if (this.MeshName !== undefined) {
                        let mesh = this.VT.Get(this.MeshName);
                        this.Ctrl.linkWithMesh(mesh.Ctrl);
                    }
                    let text1 = new BABYLON.GUI.TextBlock();
                    text1.text = this.Text;
                    text1.color = this.Foreground;
                    this.Ctrl.addControl(text1);
                    this.ChildrenGUIs.forEach((key, child) => {
                        child.Initialize();
                    });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    try {
                        this._foreground = node.attributes["Foreground"].value;
                    }
                    catch (_a) { }
                    try {
                        this._background = node.attributes["Background"].value;
                    }
                    catch (_b) { }
                    try {
                        this._width = node.attributes["Width"].value;
                    }
                    catch (_c) { }
                    try {
                        this._height = node.attributes["Height"].value;
                    }
                    catch (_d) { }
                    try {
                        this._thickness = parseFloat(node.attributes["Thickness"].value);
                    }
                    catch (_e) { }
                    try {
                        this._alpha = parseFloat(node.attributes["Alpha"].value);
                    }
                    catch (_f) { }
                    try {
                        this._cornerRadius = parseFloat(node.attributes["CornerRadius"].value);
                    }
                    catch (_g) { }
                    try {
                        this._linkOffsetY = node.attributes["LinkOffsetY"].value;
                    }
                    catch (_h) { }
                    try {
                        this._linkOffsetY = parseFloat(node.attributes["LinkOffsetY"].value);
                    }
                    catch (_j) { }
                    try {
                        this._meshName = node.attributes["Mesh"].value;
                    }
                    catch (_k) { }
                    try {
                        this._text = node.attributes["Text"].value;
                    }
                    catch (_l) { }
                    try {
                        this._top = node.attributes["Top"].value;
                    }
                    catch (_m) { }
                    try {
                        this._verticalAlignment = eval(node.attributes["VerticalAlignment"].value);
                    }
                    catch (_o) { }
                    try {
                        this._zIndex = parseFloat(node.attributes["ZIndex"].value);
                    }
                    catch (_p) { }
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_62("Label", Label);
        }
    };
});
System.register("Xaml/jupiter/controls/Light", ["Xaml/jupiter/UIElement"], function (exports_63, context_63) {
    "use strict";
    var UIElement_24, Light;
    var __moduleName = context_63 && context_63.id;
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
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    if (this._type === "HemisphericLight") {
                        let pl = new BABYLON.HemisphericLight(this.Name, this._direction, scene.Ctrl);
                        if (this._intensity !== undefined)
                            pl.intensity = this._intensity;
                        this.Ctrl = pl;
                    }
                    else if (this._type === "PointLight") {
                        let pl = new BABYLON.PointLight(this.Name, this._direction, scene.Ctrl);
                        if (this._diffuseColor !== undefined)
                            pl.diffuse = this._diffuseColor;
                        if (this._specularColor !== undefined)
                            pl.specular = this._specularColor;
                        if (this._intensity !== undefined)
                            pl.intensity = this._intensity;
                        this.Ctrl = pl;
                    }
                    else if (this._type === "DirectionalLight") {
                        let pl = new BABYLON.DirectionalLight(this.Name, this._direction, scene.Ctrl);
                        if (this._diffuseColor !== undefined)
                            pl.diffuse = this._diffuseColor;
                        if (this._specularColor !== undefined)
                            pl.specular = this._specularColor;
                        this.Ctrl = pl;
                    }
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                    }
                    catch (_a) { }
                    try {
                        this._direction = eval(`new BABYLON.${node.attributes["Direction"].value};`);
                    }
                    catch (e) { }
                    try {
                        this._type = node.attributes["Type"].value;
                    }
                    catch (e) { }
                    try {
                        this._diffuseColor = eval(this.cleanBabylonColor3Attribute(node.attributes["DiffuseColor"].value));
                    }
                    catch (e) { }
                    try {
                        this._specularColor = eval(this.cleanBabylonColor3Attribute(node.attributes["SpecularColor"].value));
                    }
                    catch (e) { }
                    try {
                        this._intensity = parseFloat(node.attributes["Intensity"].value);
                    }
                    catch (e) { }
                }
                cleanBabylonColor3Attribute(color3) {
                    if (color3.includes("Color3."))
                        return `BABYLON.${color3};`;
                    return `new BABYLON.${color3};`;
                }
            };
            exports_63("Light", Light);
        }
    };
});
System.register("Xaml/jupiter/controls/ParticleSystem", ["Xaml/jupiter/UIElement", "libs/typescript-collections/src/lib/index"], function (exports_64, context_64) {
    "use strict";
    var UIElement_25, lib_3, ParticleSystem;
    var __moduleName = context_64 && context_64.id;
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
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    if (this.Type === "SolidParticleSystem") {
                        this.Ctrl = new BABYLON.SolidParticleSystem(this.Name, scene.Ctrl, { updatable: this.Updateable });
                    }
                    else if (this.Type === "ParticleSystem") {
                        this.Ctrl = new BABYLON.ParticleSystem(this.Name, this.Capacity, scene.Ctrl);
                        this.Ctrl.particleTexture = new BABYLON.Texture(this.ParticleTexture, scene.Ctrl);
                        if (this.MinAngularSpeed !== undefined)
                            this.Ctrl.minAngularSpeed = this.MinAngularSpeed;
                        if (this.MaxAngularSpeed !== undefined)
                            this.Ctrl.maxAngularSpeed = this.MaxAngularSpeed;
                        if (this.MinSize !== undefined)
                            this.Ctrl.minSize = this.MinSize;
                        if (this.MaxSize !== undefined)
                            this.Ctrl.maxSize = this.MaxSize;
                        if (this.MinLifeTime !== undefined)
                            this.Ctrl.minLifeTime = this.MinLifeTime;
                        if (this.MaxLifeTime !== undefined)
                            this.Ctrl.maxLifeTime = this.MaxLifeTime;
                        if (this.MinEmitPower !== undefined)
                            this.Ctrl.minEmitPower = this.MinEmitPower;
                        if (this.MaxEmitPower !== undefined)
                            this.Ctrl.maxEmitPower = this.MaxEmitPower;
                        if (this.EmitRate !== undefined)
                            this.Ctrl.emitRate = this.EmitRate;
                        if (this.BlendMode !== undefined)
                            this.Ctrl.blendMode = this.BlendMode;
                        if (this.MinEmitBox !== undefined)
                            this.Ctrl.minEmitBox = this.MinEmitBox;
                        if (this.MaxEmitBox !== undefined)
                            this.Ctrl.maxEmitBox = this.MaxEmitBox;
                        if (this.Direction1 !== undefined)
                            this.Ctrl.direction1 = this.Direction1;
                        if (this.Direction2 !== undefined)
                            this.Ctrl.direction2 = this.Direction2;
                        if (this.Color1 !== undefined)
                            this.Ctrl.color1 = this.Color1;
                        if (this.Color2 !== undefined)
                            this.Ctrl.color2 = this.Color2;
                        if (this.ColorDead !== undefined)
                            this.Ctrl.colorDead = this.ColorDead;
                        if (this.Gravity !== undefined)
                            this.Ctrl.gravity = this.Gravity;
                        if (this.UpdateSpeed !== undefined)
                            this.Ctrl.updateSpeed = this.UpdateSpeed;
                        if (this.Emitter !== undefined || this.EmitterName !== undefined)
                            this.Ctrl.emitter = this.EmitterName !== undefined ? this.VT.Get(this.EmitterName).Ctrl : this.Emitter;
                        if (this.AutoStart !== undefined && this.AutoStart === true) {
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
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                    }
                    catch (_a) { }
                    try {
                        this._updateable = node.attributes["Updateable"].value.toLowerCase() === 'true';
                    }
                    catch (e) { }
                    try {
                        this._type = node.attributes["Type"].value;
                    }
                    catch (_b) { }
                    try {
                        this._capacity = parseInt(node.attributes["Capacity"].value);
                    }
                    catch (_c) { }
                    try {
                        this._particleTexture = node.attributes["ParticleTexture"].value;
                    }
                    catch (_d) { }
                    try {
                        this._minAngularSpeed = parseFloat(node.attributes["MinAngularSpeed"].value);
                    }
                    catch (_e) { }
                    try {
                        this._maxAngularSpeed = parseFloat(node.attributes["MaxAngularSpeed"].value);
                    }
                    catch (_f) { }
                    try {
                        this._minSize = parseFloat(node.attributes["MinSize"].value);
                    }
                    catch (_g) { }
                    try {
                        this._maxSize = parseFloat(node.attributes["MaxSize"].value);
                    }
                    catch (_h) { }
                    try {
                        this._minLifeTime = parseFloat(node.attributes["MinLifeTime"].value);
                    }
                    catch (_j) { }
                    try {
                        this._maxLifeTime = parseFloat(node.attributes["MaxLifeTime"].value);
                    }
                    catch (_k) { }
                    try {
                        this._minEmitPower = parseFloat(node.attributes["MinEmitPower"].value);
                    }
                    catch (_l) { }
                    try {
                        this._maxEmitPower = parseFloat(node.attributes["MaxEmitPower"].value);
                    }
                    catch (_m) { }
                    try {
                        this._emitRate = parseInt(node.attributes["EmitRate"].value);
                    }
                    catch (_o) { }
                    try {
                        this._blendMode = eval(`BABYLON.${node.attributes["BlendMode"].value};`);
                    }
                    catch (e) { }
                    try {
                        this._minEmitBox = eval(`new BABYLON.${node.attributes["MinEmitBox"].value};`);
                    }
                    catch (e) { }
                    try {
                        this._maxEmitBox = eval(`new BABYLON.${node.attributes["MaxEmitBox"].value};`);
                    }
                    catch (e) { }
                    try {
                        this._direction1 = eval(`new BABYLON.${node.attributes["Direction1"].value};`);
                    }
                    catch (e) { }
                    try {
                        this._direction2 = eval(`new BABYLON.${node.attributes["Direction2"].value};`);
                    }
                    catch (e) { }
                    try {
                        this._color1 = eval(`new BABYLON.${node.attributes["Color1"].value};`);
                    }
                    catch (e) { }
                    try {
                        this._color2 = eval(`new BABYLON.${node.attributes["Color2"].value};`);
                    }
                    catch (e) { }
                    try {
                        this._colorDead = eval(`new BABYLON.${node.attributes["ColorDead"].value};`);
                    }
                    catch (e) { }
                    try {
                        this._gravity = eval(`new BABYLON.${node.attributes["Gravity"].value};`);
                    }
                    catch (e) { }
                    try {
                        this._updateSpeed = parseFloat(node.attributes["UpdateSpeed"].value);
                    }
                    catch (_p) { }
                    try {
                        this._autoStart = node.attributes["AutoStart"].value.toLowerCase() === 'true';
                    }
                    catch (e) { }
                    try {
                        this._emitterName = node.attributes["EmitterName"].value;
                    }
                    catch (_q) { }
                    try {
                        this._emitter = eval(`new BABYLON.${node.attributes["Emitter"].value};`);
                    }
                    catch (e) { }
                }
            };
            exports_64("ParticleSystem", ParticleSystem);
        }
    };
});
System.register("Xaml/jupiter/controls/ParticleSystemShape", ["Xaml/jupiter/UIElement"], function (exports_65, context_65) {
    "use strict";
    var UIElement_26, ParticleSystemShape;
    var __moduleName = context_65 && context_65.id;
    return {
        setters: [
            function (UIElement_26_1) {
                UIElement_26 = UIElement_26_1;
            }
        ],
        execute: function () {
            ParticleSystemShape = class ParticleSystemShape extends UIElement_26.UIElement {
                get SceneName() { return this._sceneName; }
                get MeshName() { return this._meshName; }
                get NB() { return this._nb; }
                constructor() {
                    super();
                }
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
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                    }
                    catch (e) { }
                    try {
                        this._meshName = node.attributes["Mesh"].value;
                    }
                    catch (e) { }
                    try {
                        this._nb = parseInt(node.attributes["NB"].value);
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
                            let ps = parent;
                            ps.Children.setValue(this.Name, this);
                        }
                        return true;
                    }
                    return false;
                }
            };
            exports_65("ParticleSystemShape", ParticleSystemShape);
        }
    };
});
System.register("Xaml/behaviors/SceneMouseWheelZoom", [], function (exports_66, context_66) {
    "use strict";
    var SceneMouseWheelZoom;
    var __moduleName = context_66 && context_66.id;
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
            exports_66("SceneMouseWheelZoom", SceneMouseWheelZoom);
        }
    };
});
System.register("services/VisualTree", ["inversify", "libs/typescript-collections/src/lib/index"], function (exports_67, context_67) {
    "use strict";
    var inversify_1, lib_4, VisualTree;
    var __moduleName = context_67 && context_67.id;
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
            exports_67("VisualTree", VisualTree);
        }
    };
});
System.register("Xaml/behaviors/MoveSelectedMesh", ["Xaml/Core", "services/VisualTree"], function (exports_68, context_68) {
    "use strict";
    var Core_11, VisualTree_1, MoveSelectedMesh;
    var __moduleName = context_68 && context_68.id;
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
            exports_68("MoveSelectedMesh", MoveSelectedMesh);
        }
    };
});
System.register("Xaml/jupiter/controls/Scene", ["Xaml/jupiter/UIElement", "Xaml/behaviors/SceneMouseWheelZoom", "Xaml/behaviors/MoveSelectedMesh", "Xaml/Core"], function (exports_69, context_69) {
    "use strict";
    var UIElement_27, SceneMouseWheelZoom_1, MoveSelectedMesh_1, Core_12, Scene;
    var __moduleName = context_69 && context_69.id;
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
                get GroundName() { return this._groundName; }
                get CameraName() { return this._cameraName; }
                get LightName() { return this._lightName; }
                get ClearColor() { return this._clearColor; }
                constructor() {
                    super();
                }
                Initialize() {
                    let engine = Core_12.DIContainer.get("rootEngine");
                    let canvas = Core_12.DIContainer.get("rootCanvas");
                    this.Ctrl = new BABYLON.Scene(engine);
                    if (this._clearColor)
                        this.Ctrl.clearColor = this.convertColor3ToColor4(this._clearColor);
                    SceneMouseWheelZoom_1.SceneMouseWheelZoom.Install(this);
                    new MoveSelectedMesh_1.MoveSelectedMesh().Install(this, canvas, this.GroundName, this.CameraName);
                    engine.runRenderLoop(() => {
                        this.Ctrl.render();
                    });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    try {
                        this._cameraName = node.attributes["Camera"].value;
                    }
                    catch (e) { }
                    try {
                        this._lightName = node.attributes["Light"].value;
                    }
                    catch (e) { }
                    try {
                        this._groundName = node.attributes["Ground"].value;
                    }
                    catch (e) { }
                    try {
                        this._clearColor = eval(this.cleanBabylonColor3Attribute(node.attributes["ClearColor"].value));
                    }
                    catch (e) { }
                }
                cleanBabylonColor3Attribute(color3) {
                    if (color3.includes("Color3."))
                        return `BABYLON.${color3};`;
                    return `new BABYLON.${color3};`;
                }
                convertColor3ToColor4(color) {
                    return new BABYLON.Color4(color.r, color.g, color.b, 1);
                }
            };
            exports_69("Scene", Scene);
        }
    };
});
System.register("Xaml/jupiter/controls/Script", ["Xaml/jupiter/UIElement"], function (exports_70, context_70) {
    "use strict";
    var UIElement_28, Script;
    var __moduleName = context_70 && context_70.id;
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
            exports_70("Script", Script);
        }
    };
});
System.register("Xaml/jupiter/controls/ShadersStore", ["Xaml/jupiter/UIElement"], function (exports_71, context_71) {
    "use strict";
    var UIElement_29, ShadersStore;
    var __moduleName = context_71 && context_71.id;
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
            exports_71("ShadersStore", ShadersStore);
        }
    };
});
System.register("Xaml/jupiter/controls/Slider", ["Xaml/jupiter/UIElement", "babylonjs-gui"], function (exports_72, context_72) {
    "use strict";
    var UIElement_30, Slider;
    var __moduleName = context_72 && context_72.id;
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
                get Height() { return this._height; }
                get Width() { return this._width; }
                get Min() { return this._min; }
                get Max() { return this._max; }
                get Value() { return this._value; }
                get Color() { return this._color; }
                get Background() { return this._background; }
                get HorizontalAlignment() { return this._horizontalAlignment; }
                constructor() {
                    super();
                }
                Initialize() {
                    this.Ctrl = new BABYLON.GUI.Slider(this.Name);
                    this.Ctrl.height = this.Height;
                    this.Ctrl.width = this.Width;
                    this.Ctrl.minimum = this.Min;
                    this.Ctrl.maximum = this.Max;
                    this.Ctrl.value = this.Value;
                    if (this.Color !== undefined)
                        this.Ctrl.color = this.Color;
                    if (this.Background !== undefined)
                        this.Ctrl.background = this.Background;
                    if (this.HorizontalAlignment !== undefined)
                        this.Ctrl.horizontalAlignment = this.HorizontalAlignment;
                    this.Ctrl.text = this.Value;
                    this.Parent.Ctrl.addControl(this.Ctrl);
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
                        this._min = parseFloat(node.attributes["Minimum"].value);
                    }
                    catch (_c) { }
                    try {
                        this._max = parseFloat(node.attributes["Maximum"].value);
                    }
                    catch (_d) { }
                    try {
                        this._value = node.attributes["Value"].value;
                    }
                    catch (_e) { }
                    try {
                        this._color = node.attributes["Color"].value;
                    }
                    catch (_f) { }
                    try {
                        this._background = node.attributes["Background"].value;
                    }
                    catch (_g) { }
                    try {
                        this._horizontalAlignment = eval(node.attributes["HorizontalAlignment"].value);
                    }
                    catch (_h) { }
                }
                TrySetParent(parent) {
                    if (super.TrySetParent(parent)) {
                        parent.ChildrenGUIs.setValue(this.Name, this);
                        return true;
                    }
                    return false;
                }
            };
            exports_72("Slider", Slider);
        }
    };
});
System.register("Xaml/jupiter/controls/Sphere", ["Xaml/jupiter/UIElement", "Xaml/behaviors/MeshNormalLines"], function (exports_73, context_73) {
    "use strict";
    var UIElement_31, MeshNormalLines_3, Sphere;
    var __moduleName = context_73 && context_73.id;
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
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    let material = this.VT.Get(this.MaterialName);
                    this.Ctrl = BABYLON.Mesh.CreateSphere(this.Name, this.Segments, this.Diameter, scene.Ctrl);
                    if (this.Position !== undefined)
                        this.Ctrl.position = this.Position;
                    if (material !== undefined)
                        this.Ctrl.material = material.Ctrl;
                    if (this._showNormalLines)
                        MeshNormalLines_3.MeshNormalLines.Install(scene, this.Ctrl);
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                    }
                    catch (e) { }
                    try {
                        this._materialName = node.attributes["Material"].value;
                    }
                    catch (e) { }
                    try {
                        this._showNormalLines = node.attributes["ShowNormalLines"].value.toLowerCase() === 'true';
                    }
                    catch (e) { }
                    try {
                        this._segments = parseInt(node.attributes["Segments"].value);
                    }
                    catch (e) { }
                    try {
                        this._diameter = parseFloat(node.attributes["Diameter"].value);
                    }
                    catch (e) { }
                }
            };
            exports_73("Sphere", Sphere);
        }
    };
});
System.register("Xaml/jupiter/controls/SubEmitter", ["Xaml/jupiter/UIElement"], function (exports_74, context_74) {
    "use strict";
    var UIElement_32, SubEmitter;
    var __moduleName = context_74 && context_74.id;
    return {
        setters: [
            function (UIElement_32_1) {
                UIElement_32 = UIElement_32_1;
            }
        ],
        execute: function () {
            SubEmitter = class SubEmitter extends UIElement_32.UIElement {
                get Type() { return this._type; }
                get ParticleSystemName() { return this._particleSystemName; }
                get ParticleCount() { return this._particleCount; }
                get SceneName() { return this._sceneName; }
                get InheritDirection() { return this._inheritDirection; }
                get InheritedVelocityAmount() { return this._inheritedVelocityAmount; }
                constructor() {
                    super();
                }
                Initialize() {
                    let scene = this.VT.FindByName(this.SceneName);
                    if (this.ParticleSystemName !== undefined) {
                        let particleSystem = this.VT.FindByName(this.ParticleSystemName);
                        this.Ctrl = new BABYLON.SubEmitter(particleSystem.Ctrl);
                    }
                    else if (this.ParticleCount !== undefined) {
                        this.Ctrl = new BABYLON.SubEmitter(new BABYLON.ParticleSystem(`ps${this.Name}`, this.ParticleCount, scene.Ctrl));
                    }
                    this.Ctrl.type = this.Type;
                    this.Ctrl.inheritDirection = this.InheritDirection;
                    if (this.InheritedVelocityAmount !== undefined)
                        this.Ctrl.inheritedVelocityAmount = this.InheritedVelocityAmount;
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    try {
                        this._type = eval("BABYLON." + node.attributes["Type"].value);
                    }
                    catch (_a) { }
                    try {
                        this._particleSystemName = node.attributes["ParticleSystem"].value;
                    }
                    catch (_b) { }
                    try {
                        this._particleCount = parseInt(node.attributes["ParticleCount"].value);
                    }
                    catch (_c) { }
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                    }
                    catch (_d) { }
                    try {
                        this._inheritDirection = node.attributes["InheritDirection"].value.toLowerCase() === 'true';
                    }
                    catch (e) { }
                    try {
                        this._inheritedVelocityAmount = parseFloat(node.attributes["InheritedVelocityAmount"].value);
                    }
                    catch (_e) { }
                }
            };
            exports_74("SubEmitter", SubEmitter);
        }
    };
});
System.register("Xaml/jupiter/controls/Torus", ["Xaml/behaviors/MeshNormalLines", "Xaml/jupiter/AnimatableUIElement"], function (exports_75, context_75) {
    "use strict";
    var MeshNormalLines_4, AnimatableUIElement_4, Torus;
    var __moduleName = context_75 && context_75.id;
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
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    let material = this.VT.Get(this.MaterialName);
                    this._scene = scene;
                    this.Ctrl = BABYLON.Mesh.CreateTorus(this.Name, this._diameter, this._thickness, this._tesselation, scene.Ctrl);
                    this.Ctrl.material = material.Ctrl;
                    this.Ctrl.position = this.Position;
                    if (this._showNormalLines)
                        MeshNormalLines_4.MeshNormalLines.Install(scene, this.Ctrl);
                    if (this.Animations && this.Animations.Animations)
                        this.Animations.Animations.forEach((animation) => {
                            var animationBox = new BABYLON.Animation(animation.Name, animation.TargetProperty, animation.FPS, animation.DataType, animation.LoopMode);
                            animationBox.setKeys(animation.KeyFrames.GetArray());
                            this.Ctrl.animations.push(animationBox);
                        });
                    this.PostInitialize();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                    }
                    catch (e) { }
                    try {
                        this._materialName = node.attributes["Material"].value;
                    }
                    catch (e) { }
                    try {
                        this._showNormalLines = node.attributes["ShowNormalLines"].value.toLowerCase() === 'true';
                    }
                    catch (e) { }
                    try {
                        this._diameter = parseFloat(node.attributes["Diameter"].value);
                    }
                    catch (e) { }
                    try {
                        this._thickness = parseFloat(node.attributes["Thickness"].value);
                    }
                    catch (e) { }
                    try {
                        this._tesselation = parseFloat(node.attributes["Tesselation"].value);
                    }
                    catch (e) { }
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
            exports_75("Torus", Torus);
        }
    };
});
System.register("Xaml/jupiter/controls/Core", ["Xaml/jupiter/controls/Animation", "Xaml/jupiter/controls/AnimationCollection", "Xaml/jupiter/controls/Animations", "Xaml/jupiter/controls/Background", "Xaml/jupiter/controls/Box", "Xaml/jupiter/controls/Button", "Xaml/jupiter/controls/Camera", "Xaml/jupiter/controls/Disc", "Xaml/jupiter/controls/Effect", "Xaml/jupiter/controls/Event", "Xaml/jupiter/controls/Grid", "Xaml/jupiter/controls/Ground", "Xaml/jupiter/controls/gui/CheckBox", "Xaml/jupiter/controls/gui/Code", "Xaml/jupiter/controls/gui/ColorPicker", "Xaml/jupiter/controls/gui/Ellipse", "Xaml/jupiter/controls/gui/Line", "Xaml/jupiter/controls/gui/RadioButton", "Xaml/jupiter/controls/gui/Resources", "Xaml/jupiter/controls/gui/Resource", "Xaml/jupiter/controls/gui/StackPanel", "Xaml/jupiter/controls/gui/TextBlock", "Xaml/jupiter/controls/KeyFrame", "Xaml/jupiter/controls/KeyFrameCollection", "Xaml/jupiter/controls/KeyFrames", "Xaml/jupiter/controls/gui/Label", "Xaml/jupiter/controls/Light", "Xaml/jupiter/controls/Mesh", "Xaml/jupiter/controls/ParticleSystem", "Xaml/jupiter/controls/ParticleSystemShape", "Xaml/jupiter/controls/Plane", "Xaml/jupiter/controls/Panel", "Xaml/jupiter/controls/Scene", "Xaml/jupiter/controls/Script", "Xaml/jupiter/controls/ShadersStore", "Xaml/jupiter/controls/Slider", "Xaml/jupiter/controls/Sphere", "Xaml/jupiter/controls/SubEmitter", "Xaml/jupiter/controls/Texture", "Xaml/jupiter/controls/Torus", "Xaml/jupiter/controls/Material"], function (exports_76, context_76) {
    "use strict";
    var __moduleName = context_76 && context_76.id;
    function exportStar_2(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_76(exports);
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
            function (Button_1_1) {
                exportStar_2(Button_1_1);
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
            function (Grid_1_1) {
                exportStar_2(Grid_1_1);
            },
            function (Ground_1_1) {
                exportStar_2(Ground_1_1);
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
System.register("Xaml/jupiter/IRender", [], function (exports_77, context_77) {
    "use strict";
    var __moduleName = context_77 && context_77.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Xaml/jupiter/UIElement", ["Xaml/jupiter/DependencyObject", "Xaml/DataTypes/Guid", "services/VisualTree", "Xaml/Core", "Xaml/behaviors/CustomScript", "libs/typescript-collections/src/lib/index"], function (exports_78, context_78) {
    "use strict";
    var DependencyObject_2, Guid_1, VisualTree_2, Core_13, CustomScript_2, lib_5, UIElement;
    var __moduleName = context_78 && context_78.id;
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
            function (Core_13_1) {
                Core_13 = Core_13_1;
            },
            function (CustomScript_2_1) {
                CustomScript_2 = CustomScript_2_1;
            },
            function (lib_5_1) {
                lib_5 = lib_5_1;
            }
        ],
        execute: function () {
            UIElement = class UIElement extends DependencyObject_2.DependencyObject {
                constructor() {
                    super();
                    this._isDirty = true;
                    this._hasScript = false;
                    this._hasCode = false;
                    this.VT = Core_13.DIContainer.get(VisualTree_2.VisualTree);
                    this.DI = Core_13.DIContainer;
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
                set Ctrl(value) { this._ctrl = value; }
                set IsVisible(value) { this._isVisible = value; }
                set IsDirty(value) { this._isDirty = value; }
                set UniqueID(value) { this._uniqueId = value; }
                set Code(value) { this._code = value; }
                set HasScript(value) { this._hasScript = value; }
                set HasCode(value) { this._hasCode = value; }
                set Name(value) { this._name = value; this.VT.Add(value, this); }
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
            exports_78("UIElement", UIElement);
        }
    };
});
System.register("Xaml/jupiter/FrameworkElement", ["Xaml/jupiter/UIElement"], function (exports_79, context_79) {
    "use strict";
    var UIElement_33, FrameworkElement;
    var __moduleName = context_79 && context_79.id;
    return {
        setters: [
            function (UIElement_33_1) {
                UIElement_33 = UIElement_33_1;
            }
        ],
        execute: function () {
            FrameworkElement = class FrameworkElement extends UIElement_33.UIElement {
                get Width() { return this._width; }
                get Height() { return this._height; }
                set Width(value) { this._width = value; }
                set Height(value) { this._height = value; }
                constructor() {
                    super();
                }
            };
            exports_79("FrameworkElement", FrameworkElement);
        }
    };
});
System.register("Xaml/reader/XamlParser", ["Xaml/jupiter/controls/Core"], function (exports_80, context_80) {
    "use strict";
    var _controls, Core_14, XamlParser;
    var __moduleName = context_80 && context_80.id;
    return {
        setters: [
            function (_controls_1) {
                _controls = _controls_1;
                Core_14 = _controls_1;
            }
        ],
        execute: function () {
            XamlParser = class XamlParser {
                static XamlMarkupToUIElement(xaml) {
                    let nnn = new _controls.Panel();
                    return this.ProcessRoot(xaml.rootElement);
                }
                static ProcessRoot(el) {
                    let col = el.childNodes;
                    for (let x = 0; x < col.length; x++) {
                        let child = col.item(x);
                        let el = this.ProcessNode(child, null);
                        if (el !== null && !(el instanceof Core_14.Resources)) {
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
            exports_80("XamlParser", XamlParser);
        }
    };
});
System.register("Xaml/App", ["Xaml/reader/XamlParser", "Xaml/jupiter/Core", "Xaml/jupiter/controls/Core", "services/VisualTree", "Xaml/Core"], function (exports_81, context_81) {
    "use strict";
    var XamlParser_1, Core_15, Core_16, VisualTree_3, Core_17, App;
    var __moduleName = context_81 && context_81.id;
    return {
        setters: [
            function (XamlParser_1_1) {
                XamlParser_1 = XamlParser_1_1;
            },
            function (Core_15_1) {
                Core_15 = Core_15_1;
            },
            function (Core_16_1) {
                Core_16 = Core_16_1;
            },
            function (VisualTree_3_1) {
                VisualTree_3 = VisualTree_3_1;
            },
            function (Core_17_1) {
                Core_17 = Core_17_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor() {
                }
                Start(xaml, canvasElement) {
                    this.xamlMarkup = xaml;
                    let _canvas = document.getElementById(canvasElement);
                    let _engine = new BABYLON.Engine(_canvas, true);
                    window.addEventListener("resize", () => {
                        _engine.resize();
                    });
                    this.InitializeDIContainer(_canvas, _engine);
                    this.BuildVisualTree();
                    this.RenderScene();
                }
                InitializeDIContainer(rootCanvas, rootEngine) {
                    Core_17.DIContainer.bind(VisualTree_3.VisualTree).to(VisualTree_3.VisualTree).inSingletonScope();
                    Core_17.DIContainer.bind("rootCanvas").toConstantValue(rootCanvas);
                    Core_17.DIContainer.bind("rootEngine").toConstantValue(rootEngine);
                }
                BuildVisualTree() {
                    this._rootElement = XamlParser_1.XamlParser.XamlMarkupToUIElement(this.xamlMarkup);
                }
                RenderScene() {
                    if (this._rootElement instanceof Core_16.Panel) {
                        let vt = this._rootElement;
                        if (vt.Children)
                            this.InitializeChildren(vt.Children);
                        if (vt.Children)
                            this.AnimateChildren(vt.Children);
                    }
                }
                AnimateChildren(col) {
                    col.forEach((k, v) => {
                        if (v instanceof Core_15.AnimatableUIElement) {
                            let animateableCHild = v;
                            animateableCHild.StartAnimation();
                        }
                    });
                }
                InitializeChildren(col) {
                    col.forEach((k, v) => {
                        v.Initialize();
                        if (v instanceof Core_16.Panel) {
                            let childWithChildren = v;
                            if (childWithChildren.Children.size() > 0) {
                                this.InitializeChildren(childWithChildren.Children);
                            }
                            ;
                        }
                    });
                }
            };
            exports_81("App", App);
        }
    };
});
System.register("Xaml/reader/XamlReader", ["Xaml/reader/XamlMarkup"], function (exports_82, context_82) {
    "use strict";
    var XamlMarkup_1, XamlReader;
    var __moduleName = context_82 && context_82.id;
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
            exports_82("XamlReader", XamlReader);
        }
    };
});
System.register("Xaml/Core", ["Xaml/App", "Xaml/reader/XamlReader", "Xaml/reader/XamlParser", "Xaml/reader/XamlMarkup", "services/VisualTree", "Xaml/jupiter/controls/Core", "inversify", "Xaml/DataTypes/Guid"], function (exports_83, context_83) {
    "use strict";
    var _controls, inversify_2, Controls, DIContainer;
    var __moduleName = context_83 && context_83.id;
    var exportedNames_1 = {
        "Controls": true,
        "DIContainer": true
    };
    function exportStar_3(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_83(exports);
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
            function (VisualTree_4_1) {
                exportStar_3(VisualTree_4_1);
            },
            function (_controls_2) {
                _controls = _controls_2;
            },
            function (inversify_2_1) {
                inversify_2 = inversify_2_1;
            },
            function (Guid_2_1) {
                exportStar_3(Guid_2_1);
            }
        ],
        execute: function () {
            exports_83("Controls", Controls = _controls);
            exports_83("DIContainer", DIContainer = new inversify_2.Container());
        }
    };
});
System.register("bootstrap/XamlApp", ["reflect-metadata", "Xaml/Core"], function (exports_84, context_84) {
    "use strict";
    var XamlGLCore, XamlApp;
    var __moduleName = context_84 && context_84.id;
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
            exports_84("XamlApp", XamlApp);
        }
    };
});
//# sourceMappingURL=allsrc2.js.map
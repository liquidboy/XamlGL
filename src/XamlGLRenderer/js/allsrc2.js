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
System.register("Xaml/jupiter/UIElement", ["Xaml/jupiter/DependencyObject", "Xaml/DataTypes/Guid"], function (exports_6, context_6) {
    "use strict";
    var DependencyObject_1, Guid_1, UIElement;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (DependencyObject_1_1) {
                DependencyObject_1 = DependencyObject_1_1;
            },
            function (Guid_1_1) {
                Guid_1 = Guid_1_1;
            }
        ],
        execute: function () {
            UIElement = class UIElement extends DependencyObject_1.DependencyObject {
                constructor() {
                    super();
                    this._isDirty = true;
                    this._uniqueId = Guid_1.Guid.newGuid();
                }
                get IsVisible() { return this._isVisible; }
                get IsDirty() { return this._isDirty; }
                get UniqueID() { return this._uniqueId; }
                get Name() { return this._name; }
                set IsVisible(value) { this._isVisible = value; }
                set IsDirty(value) { this._isDirty = value; }
                set UniqueID(value) { this._uniqueId = value; }
                set Name(value) { this._name = value; }
                LoadFromNode(node) { }
            };
            exports_6("UIElement", UIElement);
        }
    };
});
System.register("Xaml/jupiter/IFrameworkElement", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Xaml/jupiter/FrameworkElement", ["Xaml/jupiter/UIElement"], function (exports_8, context_8) {
    "use strict";
    var UIElement_1, FrameworkElement;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (UIElement_1_1) {
                UIElement_1 = UIElement_1_1;
            }
        ],
        execute: function () {
            FrameworkElement = class FrameworkElement extends UIElement_1.UIElement {
                get Width() { return this._width; }
                get Height() { return this._height; }
                get Parent() { return this._parent; }
                set Width(value) { this._width = value; }
                set Height(value) { this._height = value; }
                set Parent(value) { this._parent = value; }
                constructor() {
                    super();
                }
            };
            exports_8("FrameworkElement", FrameworkElement);
        }
    };
});
System.register("Xaml/jupiter/controls/Camera", ["Xaml/jupiter/UIElement"], function (exports_9, context_9) {
    "use strict";
    var UIElement_2, Camera;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (UIElement_2_1) {
                UIElement_2 = UIElement_2_1;
            }
        ],
        execute: function () {
            Camera = class Camera extends UIElement_2.UIElement {
                get SceneName() { return this._sceneName; }
                get Position() { return this._position; }
                get Target() { return this._target; }
                Initialize(scene, canvas) {
                    this._camera = new BABYLON.FreeCamera('freeCamera', this._position, scene.Scene);
                    this._camera.setTarget(this._target);
                    this._camera.attachControl(canvas, true);
                }
                LoadFromNode(node) {
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                        this._position = eval(`new BABYLON.${node.attributes["Position"].value};`);
                        this._target = eval(`new BABYLON.${node.attributes["Target"].value};`);
                    }
                    catch (_a) { }
                }
            };
            exports_9("Camera", Camera);
        }
    };
});
System.register("libs/typescript-collections/src/lib/util", [], function (exports_10, context_10) {
    "use strict";
    var _hasOwnProperty, has;
    var __moduleName = context_10 && context_10.id;
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
    exports_10("defaultCompare", defaultCompare);
    function defaultEquals(a, b) {
        return a === b;
    }
    exports_10("defaultEquals", defaultEquals);
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
    exports_10("defaultToString", defaultToString);
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
    exports_10("makeString", makeString);
    function isFunction(func) {
        return (typeof func) === 'function';
    }
    exports_10("isFunction", isFunction);
    function isUndefined(obj) {
        return (typeof obj) === 'undefined';
    }
    exports_10("isUndefined", isUndefined);
    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    exports_10("isString", isString);
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
    exports_10("reverseCompareFunction", reverseCompareFunction);
    function compareToEquals(compareFunction) {
        return function (a, b) {
            return compareFunction(a, b) === 0;
        };
    }
    exports_10("compareToEquals", compareToEquals);
    return {
        setters: [],
        execute: function () {
            _hasOwnProperty = Object.prototype.hasOwnProperty;
            exports_10("has", has = function (obj, prop) {
                return _hasOwnProperty.call(obj, prop);
            });
        }
    };
});
System.register("libs/typescript-collections/src/lib/arrays", ["libs/typescript-collections/src/lib/util"], function (exports_11, context_11) {
    "use strict";
    var util;
    var __moduleName = context_11 && context_11.id;
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
    exports_11("indexOf", indexOf);
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
    exports_11("lastIndexOf", lastIndexOf);
    function contains(array, item, equalsFunction) {
        return indexOf(array, item, equalsFunction) >= 0;
    }
    exports_11("contains", contains);
    function remove(array, item, equalsFunction) {
        const index = indexOf(array, item, equalsFunction);
        if (index < 0) {
            return false;
        }
        array.splice(index, 1);
        return true;
    }
    exports_11("remove", remove);
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
    exports_11("frequency", frequency);
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
    exports_11("equals", equals);
    function copy(array) {
        return array.concat();
    }
    exports_11("copy", copy);
    function swap(array, i, j) {
        if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
            return false;
        }
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return true;
    }
    exports_11("swap", swap);
    function toString(array) {
        return '[' + array.toString() + ']';
    }
    exports_11("toString", toString);
    function forEach(array, callback) {
        for (const ele of array) {
            if (callback(ele) === false) {
                return;
            }
        }
    }
    exports_11("forEach", forEach);
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
System.register("libs/typescript-collections/src/lib/Dictionary", ["libs/typescript-collections/src/lib/util"], function (exports_12, context_12) {
    "use strict";
    var util, Dictionary;
    var __moduleName = context_12 && context_12.id;
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
            exports_12("default", Dictionary);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Set", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/arrays", "libs/typescript-collections/src/lib/Dictionary"], function (exports_13, context_13) {
    "use strict";
    var util, arrays, Dictionary_1, Set;
    var __moduleName = context_13 && context_13.id;
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
            exports_13("default", Set);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Bag", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/Set"], function (exports_14, context_14) {
    "use strict";
    var util, Dictionary_2, Set_1, Bag;
    var __moduleName = context_14 && context_14.id;
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
            exports_14("default", Bag);
        }
    };
});
System.register("libs/typescript-collections/src/lib/LinkedList", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/arrays"], function (exports_15, context_15) {
    "use strict";
    var util, arrays, LinkedList;
    var __moduleName = context_15 && context_15.id;
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
            exports_15("default", LinkedList);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Heap", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/arrays"], function (exports_16, context_16) {
    "use strict";
    var collections, arrays, Heap;
    var __moduleName = context_16 && context_16.id;
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
            exports_16("default", Heap);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Queue", ["libs/typescript-collections/src/lib/LinkedList"], function (exports_17, context_17) {
    "use strict";
    var LinkedList_1, Queue;
    var __moduleName = context_17 && context_17.id;
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
            exports_17("default", Queue);
        }
    };
});
System.register("libs/typescript-collections/src/lib/BSTree", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/Queue"], function (exports_18, context_18) {
    "use strict";
    var util, Queue_1, BSTree;
    var __moduleName = context_18 && context_18.id;
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
            exports_18("default", BSTree);
        }
    };
});
System.register("libs/typescript-collections/src/lib/LinkedDictionary", ["libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/util"], function (exports_19, context_19) {
    "use strict";
    var Dictionary_3, util, LinkedDictionaryPair, LinkedDictionary;
    var __moduleName = context_19 && context_19.id;
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
            exports_19("default", LinkedDictionary);
        }
    };
});
System.register("libs/typescript-collections/src/lib/MultiDictionary", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/arrays"], function (exports_20, context_20) {
    "use strict";
    var util, Dictionary_4, arrays, MultiDictionary;
    var __moduleName = context_20 && context_20.id;
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
            exports_20("default", MultiDictionary);
        }
    };
});
System.register("libs/typescript-collections/src/lib/FactoryDictionary", ["libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/util"], function (exports_21, context_21) {
    "use strict";
    var Dictionary_5, util, FactoryDictionary;
    var __moduleName = context_21 && context_21.id;
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
            exports_21("default", FactoryDictionary);
        }
    };
});
System.register("libs/typescript-collections/src/lib/PriorityQueue", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/Heap"], function (exports_22, context_22) {
    "use strict";
    var util, Heap_1, PriorityQueue;
    var __moduleName = context_22 && context_22.id;
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
            exports_22("default", PriorityQueue);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Stack", ["libs/typescript-collections/src/lib/LinkedList"], function (exports_23, context_23) {
    "use strict";
    var LinkedList_2, Stack;
    var __moduleName = context_23 && context_23.id;
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
            exports_23("default", Stack);
        }
    };
});
System.register("libs/typescript-collections/src/lib/MultiRootTree", [], function (exports_24, context_24) {
    "use strict";
    var Direction, MultiRootTree;
    var __moduleName = context_24 && context_24.id;
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
            exports_24("default", MultiRootTree);
        }
    };
});
System.register("libs/typescript-collections/src/lib/index", ["libs/typescript-collections/src/lib/arrays", "libs/typescript-collections/src/lib/Bag", "libs/typescript-collections/src/lib/BSTree", "libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/Heap", "libs/typescript-collections/src/lib/LinkedDictionary", "libs/typescript-collections/src/lib/LinkedList", "libs/typescript-collections/src/lib/MultiDictionary", "libs/typescript-collections/src/lib/FactoryDictionary", "libs/typescript-collections/src/lib/Queue", "libs/typescript-collections/src/lib/PriorityQueue", "libs/typescript-collections/src/lib/Set", "libs/typescript-collections/src/lib/Stack", "libs/typescript-collections/src/lib/MultiRootTree", "libs/typescript-collections/src/lib/util"], function (exports_25, context_25) {
    "use strict";
    var _arrays, arrays, _util, util;
    var __moduleName = context_25 && context_25.id;
    return {
        setters: [
            function (_arrays_1) {
                _arrays = _arrays_1;
            },
            function (Bag_1_1) {
                exports_25({
                    "Bag": Bag_1_1["default"]
                });
            },
            function (BSTree_1_1) {
                exports_25({
                    "BSTree": BSTree_1_1["default"]
                });
            },
            function (Dictionary_6_1) {
                exports_25({
                    "Dictionary": Dictionary_6_1["default"]
                });
            },
            function (Heap_2_1) {
                exports_25({
                    "Heap": Heap_2_1["default"]
                });
            },
            function (LinkedDictionary_1_1) {
                exports_25({
                    "LinkedDictionary": LinkedDictionary_1_1["default"]
                });
            },
            function (LinkedList_3_1) {
                exports_25({
                    "LinkedList": LinkedList_3_1["default"]
                });
            },
            function (MultiDictionary_1_1) {
                exports_25({
                    "MultiDictionary": MultiDictionary_1_1["default"]
                });
            },
            function (FactoryDictionary_1_1) {
                exports_25({
                    "FactoryDictionary": FactoryDictionary_1_1["default"]
                });
                exports_25({
                    "DefaultDictionary": FactoryDictionary_1_1["default"]
                });
            },
            function (Queue_2_1) {
                exports_25({
                    "Queue": Queue_2_1["default"]
                });
            },
            function (PriorityQueue_1_1) {
                exports_25({
                    "PriorityQueue": PriorityQueue_1_1["default"]
                });
            },
            function (Set_2_1) {
                exports_25({
                    "Set": Set_2_1["default"]
                });
            },
            function (Stack_1_1) {
                exports_25({
                    "Stack": Stack_1_1["default"]
                });
            },
            function (MultiRootTree_1_1) {
                exports_25({
                    "MultiRootTree": MultiRootTree_1_1["default"]
                });
            },
            function (_util_1) {
                _util = _util_1;
            }
        ],
        execute: function () {
            exports_25("arrays", arrays = _arrays);
            exports_25("util", util = _util);
        }
    };
});
System.register("Xaml/jupiter/UIElementCollection", ["libs/typescript-collections/src/lib/index"], function (exports_26, context_26) {
    "use strict";
    var index_1, UIElementCollection;
    var __moduleName = context_26 && context_26.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            UIElementCollection = class UIElementCollection extends index_1.LinkedDictionary {
            };
            exports_26("UIElementCollection", UIElementCollection);
        }
    };
});
System.register("Xaml/jupiter/controls/Panel", ["Xaml/jupiter/FrameworkElement", "Xaml/jupiter/UIElementCollection"], function (exports_27, context_27) {
    "use strict";
    var FrameworkElement_1, UIElementCollection_1, Panel;
    var __moduleName = context_27 && context_27.id;
    return {
        setters: [
            function (FrameworkElement_1_1) {
                FrameworkElement_1 = FrameworkElement_1_1;
            },
            function (UIElementCollection_1_1) {
                UIElementCollection_1 = UIElementCollection_1_1;
            }
        ],
        execute: function () {
            Panel = class Panel extends FrameworkElement_1.FrameworkElement {
                constructor() {
                    super();
                    this._offsetX = 0;
                    this._offsetY = 0;
                    this._children = new UIElementCollection_1.UIElementCollection();
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
            exports_27("Panel", Panel);
        }
    };
});
System.register("Xaml/jupiter/controls/Grid", ["Xaml/jupiter/controls/Panel"], function (exports_28, context_28) {
    "use strict";
    var Panel_1, Grid;
    var __moduleName = context_28 && context_28.id;
    return {
        setters: [
            function (Panel_1_1) {
                Panel_1 = Panel_1_1;
            }
        ],
        execute: function () {
            Grid = class Grid extends Panel_1.Panel {
            };
            exports_28("Grid", Grid);
        }
    };
});
System.register("Xaml/jupiter/controls/Ground", ["Xaml/jupiter/UIElement"], function (exports_29, context_29) {
    "use strict";
    var UIElement_3, Ground;
    var __moduleName = context_29 && context_29.id;
    return {
        setters: [
            function (UIElement_3_1) {
                UIElement_3 = UIElement_3_1;
            }
        ],
        execute: function () {
            Ground = class Ground extends UIElement_3.UIElement {
                get SceneName() { return this._sceneName; }
                Initialize(scene) {
                    this._mesh = BABYLON.MeshBuilder.CreateGround(this.Name, { width: 6, height: 6, subdivisions: 2 }, scene.Scene);
                }
                LoadFromNode(node) {
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                    }
                    catch (_a) { }
                }
            };
            exports_29("Ground", Ground);
        }
    };
});
System.register("Xaml/jupiter/controls/Light", ["Xaml/jupiter/UIElement"], function (exports_30, context_30) {
    "use strict";
    var UIElement_4, Light;
    var __moduleName = context_30 && context_30.id;
    return {
        setters: [
            function (UIElement_4_1) {
                UIElement_4 = UIElement_4_1;
            }
        ],
        execute: function () {
            Light = class Light extends UIElement_4.UIElement {
                get SceneName() { return this._sceneName; }
                Initialize(scene) {
                    this._light = new BABYLON.HemisphericLight('skyLight', new BABYLON.Vector3(0, 1, 0), scene.Scene);
                }
                LoadFromNode(node) {
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                    }
                    catch (_a) { }
                }
            };
            exports_30("Light", Light);
        }
    };
});
System.register("Xaml/jupiter/controls/Scene", ["Xaml/jupiter/UIElement"], function (exports_31, context_31) {
    "use strict";
    var UIElement_5, Scene;
    var __moduleName = context_31 && context_31.id;
    return {
        setters: [
            function (UIElement_5_1) {
                UIElement_5 = UIElement_5_1;
            }
        ],
        execute: function () {
            Scene = class Scene extends UIElement_5.UIElement {
                get Scene() { return this._scene; }
                get CameraName() { return this._cameraName; }
                get LightName() { return this._lightName; }
                constructor() {
                    super();
                }
                Initialize(engine, canvas, camera, light) {
                    this._scene = new BABYLON.Scene(engine);
                    this._camera = camera;
                    this._light = light;
                    engine.runRenderLoop(() => {
                        this._scene.render();
                    });
                }
                LoadFromNode(node) {
                    try {
                        this._cameraName = node.attributes["Camera"].value;
                        this._lightName = node.attributes["Light"].value;
                    }
                    catch (_a) { }
                }
            };
            exports_31("Scene", Scene);
        }
    };
});
System.register("Xaml/jupiter/controls/Sphere", ["Xaml/jupiter/UIElement"], function (exports_32, context_32) {
    "use strict";
    var UIElement_6, Sphere;
    var __moduleName = context_32 && context_32.id;
    return {
        setters: [
            function (UIElement_6_1) {
                UIElement_6 = UIElement_6_1;
            }
        ],
        execute: function () {
            Sphere = class Sphere extends UIElement_6.UIElement {
                get SceneName() { return this._sceneName; }
                get MaterialName() { return this._materialName; }
                InitializeWithMaterial(scene, material) {
                    this._mesh = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, scene.Scene);
                    this._mesh.position.y = 1;
                    this._mesh.material = material.Material;
                }
                LoadFromNode(node) {
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                        this._materialName = node.attributes["Material"].value;
                    }
                    catch (_a) { }
                }
            };
            exports_32("Sphere", Sphere);
        }
    };
});
System.register("Xaml/jupiter/controls/Material", ["Xaml/jupiter/UIElement"], function (exports_33, context_33) {
    "use strict";
    var UIElement_7, Material;
    var __moduleName = context_33 && context_33.id;
    return {
        setters: [
            function (UIElement_7_1) {
                UIElement_7 = UIElement_7_1;
            }
        ],
        execute: function () {
            Material = class Material extends UIElement_7.UIElement {
                get Material() { return this._material; }
                get SceneName() { return this._sceneName; }
                get Wireframe() { return this._wireframe; }
                Initialize(scene) {
                    this._material = new BABYLON.StandardMaterial(this.Name, scene.Scene);
                    this._material.wireframe = this._wireframe;
                }
                LoadFromNode(node) {
                    try {
                        this._sceneName = node.attributes["Scene"].value;
                        this._wireframe = node.attributes["Wireframe"].value.toLowerCase() === 'true';
                    }
                    catch (_a) { }
                }
            };
            exports_33("Material", Material);
        }
    };
});
System.register("Xaml/jupiter/controls/Core", ["Xaml/jupiter/controls/Camera", "Xaml/jupiter/controls/Grid", "Xaml/jupiter/controls/Ground", "Xaml/jupiter/controls/Light", "Xaml/jupiter/controls/Panel", "Xaml/jupiter/controls/Scene", "Xaml/jupiter/controls/Sphere", "Xaml/jupiter/controls/Material"], function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_34(exports);
    }
    return {
        setters: [
            function (Camera_1_1) {
                exportStar_1(Camera_1_1);
            },
            function (Grid_1_1) {
                exportStar_1(Grid_1_1);
            },
            function (Ground_1_1) {
                exportStar_1(Ground_1_1);
            },
            function (Light_1_1) {
                exportStar_1(Light_1_1);
            },
            function (Panel_2_1) {
                exportStar_1(Panel_2_1);
            },
            function (Scene_1_1) {
                exportStar_1(Scene_1_1);
            },
            function (Sphere_1_1) {
                exportStar_1(Sphere_1_1);
            },
            function (Material_1_1) {
                exportStar_1(Material_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("Xaml/reader/XamlParser", ["Xaml/jupiter/controls/Core"], function (exports_35, context_35) {
    "use strict";
    var _controls, XamlParser;
    var __moduleName = context_35 && context_35.id;
    return {
        setters: [
            function (_controls_1) {
                _controls = _controls_1;
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
                        if (el !== null) {
                            return el;
                        }
                    }
                }
                static ProcessNode(el, parent) {
                    let nodeAsAFrameWorkElement = this.GetFrameworkElementByNode(el);
                    if (nodeAsAFrameWorkElement != null) {
                        nodeAsAFrameWorkElement.Parent = parent;
                    }
                    if (nodeAsAFrameWorkElement != null && nodeAsAFrameWorkElement instanceof _controls.Panel && el != null && el.childNodes != null && el.childNodes.length > 0) {
                        this.ProcessCollectionNodes(nodeAsAFrameWorkElement, el.childNodes);
                    }
                    return nodeAsAFrameWorkElement;
                }
                static ProcessCollectionNodes(root, col) {
                    if (!col) {
                        return;
                    }
                    for (let x = 0; x < col.length; x++) {
                        let node = col.item(x);
                        let newFE = this.ProcessNode(node, root);
                        if (newFE !== null) {
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
                        newObject.LoadFromNode(node);
                        return newObject;
                    }
                    catch (ex) {
                        console.log(`could not find class ${node.nodeName}`);
                    }
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
            exports_35("XamlParser", XamlParser);
        }
    };
});
System.register("Xaml/jupiter/Core", ["Xaml/jupiter/DependencyObject", "Xaml/jupiter/FrameworkElement", "Xaml/jupiter/UIElement", "Xaml/jupiter/UIElementCollection"], function (exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    function exportStar_2(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_36(exports);
    }
    return {
        setters: [
            function (DependencyObject_2_1) {
                exportStar_2(DependencyObject_2_1);
            },
            function (FrameworkElement_2_1) {
                exportStar_2(FrameworkElement_2_1);
            },
            function (UIElement_8_1) {
                exportStar_2(UIElement_8_1);
            },
            function (UIElementCollection_2_1) {
                exportStar_2(UIElementCollection_2_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("Xaml/App", ["Xaml/reader/XamlParser", "Xaml/jupiter/controls/Core"], function (exports_37, context_37) {
    "use strict";
    var XamlParser_1, Core_1, App;
    var __moduleName = context_37 && context_37.id;
    return {
        setters: [
            function (XamlParser_1_1) {
                XamlParser_1 = XamlParser_1_1;
            },
            function (Core_1_1) {
                Core_1 = Core_1_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor() {
                }
                Start(xaml, canvasElement) {
                    this.xamlMarkup = xaml;
                    this._canvas = document.getElementById(canvasElement);
                    this._engine = new BABYLON.Engine(this._canvas, true);
                    window.addEventListener("resize", () => {
                        this._engine.resize();
                    });
                    this.BuildVisualTree();
                    this.RenderScene();
                }
                BuildVisualTree() {
                    this._rootElement = XamlParser_1.XamlParser.XamlMarkupToUIElement(this.xamlMarkup);
                }
                RenderScene() {
                    let vt = this._rootElement;
                    vt.Children.forEach((k, v) => {
                        if (v instanceof Core_1.Scene) {
                            let s = v;
                            s.Initialize(this._engine, this._canvas, vt.Children.getValue(s.CameraName), vt.Children.getValue(s.LightName));
                        }
                        else if (v instanceof Core_1.Camera) {
                            let c = v;
                            c.Initialize(vt.Children.getValue(c.SceneName), this._canvas);
                        }
                        else {
                            let o = v;
                            if (o.Initialize != null)
                                o.Initialize(vt.Children.getValue(o.SceneName));
                            if (o.InitializeWithMaterial != null)
                                o.InitializeWithMaterial(vt.Children.getValue(o.SceneName), vt.Children.getValue(o.MaterialName));
                        }
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
            exports_37("App", App);
        }
    };
});
System.register("Xaml/reader/XamlReader", ["Xaml/reader/XamlMarkup"], function (exports_38, context_38) {
    "use strict";
    var XamlMarkup_1, XamlReader;
    var __moduleName = context_38 && context_38.id;
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
            exports_38("XamlReader", XamlReader);
        }
    };
});
System.register("Xaml/Core", ["Xaml/App", "Xaml/reader/XamlReader", "Xaml/reader/XamlParser", "Xaml/reader/XamlMarkup", "Xaml/jupiter/controls/Core", "Xaml/DataTypes/Guid"], function (exports_39, context_39) {
    "use strict";
    var _controls, Controls;
    var __moduleName = context_39 && context_39.id;
    var exportedNames_1 = {
        "Controls": true
    };
    function exportStar_3(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_39(exports);
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
            function (_controls_2) {
                _controls = _controls_2;
            },
            function (Guid_2_1) {
                exportStar_3(Guid_2_1);
            }
        ],
        execute: function () {
            exports_39("Controls", Controls = _controls);
        }
    };
});
System.register("bootstrap/XamlApp", ["Xaml/Core"], function (exports_40, context_40) {
    "use strict";
    var XamlGLCore, XamlApp;
    var __moduleName = context_40 && context_40.id;
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
            exports_40("XamlApp", XamlApp);
        }
    };
});
//# sourceMappingURL=allsrc2.js.map
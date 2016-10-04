System.register("XamlGL/Jupiter/IDependencyObject", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/Jupiter/DependencyObject", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var DependencyObject;
    return {
        setters:[],
        execute: function() {
            DependencyObject = class DependencyObject {
            };
            exports_2("DependencyObject", DependencyObject);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/IRenderer", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/Events/IEventArgs", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/Events/IEvent", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/Jupiter/IFrameworkElement", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/Jupiter/Platform/IPlatform", [], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/Jupiter/IUIElement", [], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/Jupiter/UIElement", ["XamlGL/Jupiter/DependencyObject"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var DependencyObject_1;
    var UIElement;
    return {
        setters:[
            function (DependencyObject_1_1) {
                DependencyObject_1 = DependencyObject_1_1;
            }],
        execute: function() {
            UIElement = class UIElement extends DependencyObject_1.DependencyObject {
                get IsVisible() { return this._isVisible; }
                get IsDirty() { return this._isDirty; }
                get Platform() { return this._platform; }
                set IsVisible(value) { this._isVisible = value; }
                set IsDirty(value) { this._isDirty = value; }
                set Platform(value) { this._platform = value; }
            };
            exports_9("UIElement", UIElement);
        }
    }
});
System.register("XamlGL/Events/EventDispatcher", [], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var EventDispatcher;
    return {
        setters:[],
        execute: function() {
            EventDispatcher = class EventDispatcher {
                constructor() {
                    this._subscriptions = new Array();
                }
                subscribe(fn) {
                    if (fn) {
                        this._subscriptions.push(fn);
                    }
                }
                unsubscribe(fn) {
                    let i = this._subscriptions.indexOf(fn);
                    if (i > -1) {
                        this._subscriptions.splice(i, 1);
                    }
                }
                dispatch(sender, args) {
                    for (let handler of this._subscriptions) {
                        handler(sender, args);
                    }
                }
            };
            exports_10("EventDispatcher", EventDispatcher);
        }
    }
});
System.register("XamlGL/Jupiter/FrameworkElement", ["XamlGL/Jupiter/UIElement", "XamlGL/Events/EventDispatcher"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var UIElement_1, EventDispatcher_1;
    var FrameworkElement;
    return {
        setters:[
            function (UIElement_1_1) {
                UIElement_1 = UIElement_1_1;
            },
            function (EventDispatcher_1_1) {
                EventDispatcher_1 = EventDispatcher_1_1;
            }],
        execute: function() {
            FrameworkElement = class FrameworkElement extends UIElement_1.UIElement {
                constructor(...args) {
                    super(...args);
                    this._propertyChanged = new EventDispatcher_1.EventDispatcher();
                    this._focusChanged = new EventDispatcher_1.EventDispatcher();
                }
                get Width() { return this._width; }
                get Height() { return this._height; }
                get Renderer() { return this._renderer; }
                set Width(value) { this._width = value; }
                set Height(value) { this._height = value; }
                set Renderer(value) { this._renderer = value; }
                get PropertyChanged() { return this._propertyChanged; }
                get FocusChanged() { return this._focusChanged; }
            };
            exports_11("FrameworkElement", FrameworkElement);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/IControlRenderer", [], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/Jupiter/Control", ["XamlGL/Jupiter/FrameworkElement"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var FrameworkElement_1;
    var Control;
    return {
        setters:[
            function (FrameworkElement_1_1) {
                FrameworkElement_1 = FrameworkElement_1_1;
            }],
        execute: function() {
            Control = class Control extends FrameworkElement_1.FrameworkElement {
            };
            exports_13("Control", Control);
        }
    }
});
System.register("XamlGL/Jupiter/UserControl", ["XamlGL/Jupiter/Control"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var Control_1;
    var UserControl;
    return {
        setters:[
            function (Control_1_1) {
                Control_1 = Control_1_1;
            }],
        execute: function() {
            UserControl = class UserControl extends Control_1.Control {
            };
            exports_14("UserControl", UserControl);
        }
    }
});
System.register("XamlGL/Jupiter/Page", ["XamlGL/Jupiter/UserControl", "XamlGL/Events/EventDispatcher"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var UserControl_1, EventDispatcher_2;
    var Page;
    return {
        setters:[
            function (UserControl_1_1) {
                UserControl_1 = UserControl_1_1;
            },
            function (EventDispatcher_2_1) {
                EventDispatcher_2 = EventDispatcher_2_1;
            }],
        execute: function() {
            Page = class Page extends UserControl_1.UserControl {
                constructor(...args) {
                    super(...args);
                    this._contentChanged = new EventDispatcher_2.EventDispatcher();
                }
                get Content() { return this._content; }
                get ContentChanged() { return this._contentChanged; }
                set Content(value) {
                    this._content = value;
                    this._contentChanged.dispatch(this, null);
                }
            };
            exports_15("Page", Page);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/IPlatformPage", [], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/DataTypes/Guid", [], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var Guid;
    return {
        setters:[],
        execute: function() {
            Guid = class Guid {
                static newGuid() {
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
                }
            };
            exports_17("Guid", Guid);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/util", [], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var _hasOwnProperty, has;
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
    exports_18("defaultCompare", defaultCompare);
    function defaultEquals(a, b) {
        return a === b;
    }
    exports_18("defaultEquals", defaultEquals);
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
    exports_18("defaultToString", defaultToString);
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
    exports_18("makeString", makeString);
    function isFunction(func) {
        return (typeof func) === 'function';
    }
    exports_18("isFunction", isFunction);
    function isUndefined(obj) {
        return (typeof obj) === 'undefined';
    }
    exports_18("isUndefined", isUndefined);
    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    exports_18("isString", isString);
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
    exports_18("reverseCompareFunction", reverseCompareFunction);
    function compareToEquals(compareFunction) {
        return function (a, b) {
            return compareFunction(a, b) === 0;
        };
    }
    exports_18("compareToEquals", compareToEquals);
    return {
        setters:[],
        execute: function() {
            _hasOwnProperty = Object.prototype.hasOwnProperty;
            exports_18("has", has = function (obj, prop) {
                return _hasOwnProperty.call(obj, prop);
            });
        }
    }
});
System.register("Libs/typescript-collections/src/lib/arrays", ["Libs/typescript-collections/src/lib/util"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var util;
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
    exports_19("indexOf", indexOf);
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
    exports_19("lastIndexOf", lastIndexOf);
    function contains(array, item, equalsFunction) {
        return indexOf(array, item, equalsFunction) >= 0;
    }
    exports_19("contains", contains);
    function remove(array, item, equalsFunction) {
        const index = indexOf(array, item, equalsFunction);
        if (index < 0) {
            return false;
        }
        array.splice(index, 1);
        return true;
    }
    exports_19("remove", remove);
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
    exports_19("frequency", frequency);
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
    exports_19("equals", equals);
    function copy(array) {
        return array.concat();
    }
    exports_19("copy", copy);
    function swap(array, i, j) {
        if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
            return false;
        }
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return true;
    }
    exports_19("swap", swap);
    function toString(array) {
        return '[' + array.toString() + ']';
    }
    exports_19("toString", toString);
    function forEach(array, callback) {
        for (const ele of array) {
            if (callback(ele) === false) {
                return;
            }
        }
    }
    exports_19("forEach", forEach);
    return {
        setters:[
            function (util_1) {
                util = util_1;
            }],
        execute: function() {
        }
    }
});
System.register("Libs/typescript-collections/src/lib/Dictionary", ["Libs/typescript-collections/src/lib/util"], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var util;
    var Dictionary;
    return {
        setters:[
            function (util_2) {
                util = util_2;
            }],
        execute: function() {
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
            exports_20("default", Dictionary);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/Set", ["Libs/typescript-collections/src/lib/util", "Libs/typescript-collections/src/lib/arrays", "Libs/typescript-collections/src/lib/Dictionary"], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var util, arrays, Dictionary_1;
    var Set;
    return {
        setters:[
            function (util_3) {
                util = util_3;
            },
            function (arrays_1) {
                arrays = arrays_1;
            },
            function (Dictionary_1_1) {
                Dictionary_1 = Dictionary_1_1;
            }],
        execute: function() {
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
            exports_21("default", Set);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/Bag", ["Libs/typescript-collections/src/lib/util", "Libs/typescript-collections/src/lib/Dictionary", "Libs/typescript-collections/src/lib/Set"], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var util, Dictionary_2, Set_1;
    var Bag;
    return {
        setters:[
            function (util_4) {
                util = util_4;
            },
            function (Dictionary_2_1) {
                Dictionary_2 = Dictionary_2_1;
            },
            function (Set_1_1) {
                Set_1 = Set_1_1;
            }],
        execute: function() {
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
            exports_22("default", Bag);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/LinkedList", ["Libs/typescript-collections/src/lib/util", "Libs/typescript-collections/src/lib/arrays"], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var util, arrays;
    var LinkedList;
    return {
        setters:[
            function (util_5) {
                util = util_5;
            },
            function (arrays_2) {
                arrays = arrays_2;
            }],
        execute: function() {
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
            exports_23("default", LinkedList);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/Heap", ["Libs/typescript-collections/src/lib/util", "Libs/typescript-collections/src/lib/arrays"], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var collections, arrays;
    var Heap;
    return {
        setters:[
            function (collections_1) {
                collections = collections_1;
            },
            function (arrays_3) {
                arrays = arrays_3;
            }],
        execute: function() {
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
            exports_24("default", Heap);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/Queue", ["Libs/typescript-collections/src/lib/LinkedList"], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var LinkedList_1;
    var Queue;
    return {
        setters:[
            function (LinkedList_1_1) {
                LinkedList_1 = LinkedList_1_1;
            }],
        execute: function() {
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
            exports_25("default", Queue);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/BSTree", ["Libs/typescript-collections/src/lib/util", "Libs/typescript-collections/src/lib/Queue"], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var util, Queue_1;
    var BSTree;
    return {
        setters:[
            function (util_6) {
                util = util_6;
            },
            function (Queue_1_1) {
                Queue_1 = Queue_1_1;
            }],
        execute: function() {
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
            exports_26("default", BSTree);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/LinkedDictionary", ["Libs/typescript-collections/src/lib/Dictionary", "Libs/typescript-collections/src/lib/util"], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var Dictionary_3, util;
    var LinkedDictionaryPair, LinkedDictionary;
    return {
        setters:[
            function (Dictionary_3_1) {
                Dictionary_3 = Dictionary_3_1;
            },
            function (util_7) {
                util = util_7;
            }],
        execute: function() {
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
            exports_27("default", LinkedDictionary);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/MultiDictionary", ["Libs/typescript-collections/src/lib/util", "Libs/typescript-collections/src/lib/Dictionary", "Libs/typescript-collections/src/lib/arrays"], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var util, Dictionary_4, arrays;
    var MultiDictionary;
    return {
        setters:[
            function (util_8) {
                util = util_8;
            },
            function (Dictionary_4_1) {
                Dictionary_4 = Dictionary_4_1;
            },
            function (arrays_4) {
                arrays = arrays_4;
            }],
        execute: function() {
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
            exports_28("default", MultiDictionary);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/FactoryDictionary", ["Libs/typescript-collections/src/lib/Dictionary", "Libs/typescript-collections/src/lib/util"], function(exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var Dictionary_5, util;
    var FactoryDictionary;
    return {
        setters:[
            function (Dictionary_5_1) {
                Dictionary_5 = Dictionary_5_1;
            },
            function (util_9) {
                util = util_9;
            }],
        execute: function() {
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
            exports_29("default", FactoryDictionary);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/PriorityQueue", ["Libs/typescript-collections/src/lib/util", "Libs/typescript-collections/src/lib/Heap"], function(exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var util, Heap_1;
    var PriorityQueue;
    return {
        setters:[
            function (util_10) {
                util = util_10;
            },
            function (Heap_1_1) {
                Heap_1 = Heap_1_1;
            }],
        execute: function() {
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
            exports_30("default", PriorityQueue);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/Stack", ["Libs/typescript-collections/src/lib/LinkedList"], function(exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var LinkedList_2;
    var Stack;
    return {
        setters:[
            function (LinkedList_2_1) {
                LinkedList_2 = LinkedList_2_1;
            }],
        execute: function() {
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
            exports_31("default", Stack);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/MultiRootTree", [], function(exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var Direction, MultiRootTree;
    return {
        setters:[],
        execute: function() {
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
            exports_32("default", MultiRootTree);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/index", ["Libs/typescript-collections/src/lib/arrays", "Libs/typescript-collections/src/lib/Bag", "Libs/typescript-collections/src/lib/BSTree", "Libs/typescript-collections/src/lib/Dictionary", "Libs/typescript-collections/src/lib/Heap", "Libs/typescript-collections/src/lib/LinkedDictionary", "Libs/typescript-collections/src/lib/LinkedList", "Libs/typescript-collections/src/lib/MultiDictionary", "Libs/typescript-collections/src/lib/FactoryDictionary", "Libs/typescript-collections/src/lib/Queue", "Libs/typescript-collections/src/lib/PriorityQueue", "Libs/typescript-collections/src/lib/Set", "Libs/typescript-collections/src/lib/Stack", "Libs/typescript-collections/src/lib/MultiRootTree", "Libs/typescript-collections/src/lib/util"], function(exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var _arrays, _util;
    var arrays, util;
    return {
        setters:[
            function (_arrays_1) {
                _arrays = _arrays_1;
            },
            function (Bag_1_1) {
                exports_33({
                    "Bag": Bag_1_1["default"]
                });
            },
            function (BSTree_1_1) {
                exports_33({
                    "BSTree": BSTree_1_1["default"]
                });
            },
            function (Dictionary_6_1) {
                exports_33({
                    "Dictionary": Dictionary_6_1["default"]
                });
            },
            function (Heap_2_1) {
                exports_33({
                    "Heap": Heap_2_1["default"]
                });
            },
            function (LinkedDictionary_1_1) {
                exports_33({
                    "LinkedDictionary": LinkedDictionary_1_1["default"]
                });
            },
            function (LinkedList_3_1) {
                exports_33({
                    "LinkedList": LinkedList_3_1["default"]
                });
            },
            function (MultiDictionary_1_1) {
                exports_33({
                    "MultiDictionary": MultiDictionary_1_1["default"]
                });
            },
            function (FactoryDictionary_1_1) {
                exports_33({
                    "FactoryDictionary": FactoryDictionary_1_1["default"]
                });
                exports_33({
                    "DefaultDictionary": FactoryDictionary_1_1["default"]
                });
            },
            function (Queue_2_1) {
                exports_33({
                    "Queue": Queue_2_1["default"]
                });
            },
            function (PriorityQueue_1_1) {
                exports_33({
                    "PriorityQueue": PriorityQueue_1_1["default"]
                });
            },
            function (Set_2_1) {
                exports_33({
                    "Set": Set_2_1["default"]
                });
            },
            function (Stack_1_1) {
                exports_33({
                    "Stack": Stack_1_1["default"]
                });
            },
            function (MultiRootTree_1_1) {
                exports_33({
                    "MultiRootTree": MultiRootTree_1_1["default"]
                });
            },
            function (_util_1) {
                _util = _util_1;
            }],
        execute: function() {
            exports_33("arrays", arrays = _arrays);
            exports_33("util", util = _util);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Renderer", ["XamlGL/DataTypes/Guid", "Libs/typescript-collections/src/lib/index"], function(exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var Guid_1, index_1;
    var Renderer, RendererFactory, RendererResource;
    return {
        setters:[
            function (Guid_1_1) {
                Guid_1 = Guid_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }],
        execute: function() {
            Renderer = class Renderer {
                constructor(width, height, antialias, transparent, htmlCanvasHost) {
                    this._uniqueId = Guid_1.Guid.newGuid();
                    this._resourceIds = new index_1.Dictionary();
                    this._stage = new PIXI.Container();
                    this._renderer = RendererFactory.GetRenderer(width, height, antialias, transparent);
                    htmlCanvasHost.append(this.PixiRenderer.view);
                }
                get UniqueID() { return this.UniqueID; }
                get PixiStage() { return this._stage; }
                get PixiRenderer() { return this._renderer; }
                set Border(value) { this.PixiRenderer.view.style.border = value; }
                set BackgroundColor(value) { this.PixiRenderer.backgroundColor = value; }
                Resize(width, height) {
                    this.PixiRenderer.autoResize = true;
                    this.PixiRenderer.resize(width, height);
                }
                ResizeFull() {
                    this.PixiRenderer.view.style.position = "absolute";
                    this.PixiRenderer.view.style.display = "block";
                    this.PixiRenderer.view.style.border = "0";
                    this.Resize(window.innerWidth, window.innerHeight);
                }
                ShowLoading(x, y, width, height) {
                    let resource = this._resourceIds.getValue("loading");
                    if (resource.Sprite === null) {
                        let resourceId = resource.Url;
                        let rect = new PIXI.Rectangle(0, 0, width, height);
                        let texture = PIXI.loader.resources[resourceId].texture;
                        texture.frame = rect;
                        resource.Sprite = new PIXI.Sprite(texture);
                    }
                    resource.Sprite.x = x;
                    resource.Sprite.y = y;
                    this._stage.addChild(resource.Sprite);
                    this._renderer.render(this._stage);
                }
                HideLoading() {
                    let resource = this._resourceIds.getValue("loading");
                    if (resource.Sprite !== null) {
                        this._stage.removeChild(resource.Sprite);
                        this._renderer.render(this._stage);
                    }
                }
                InitializeLoadingResource(url) {
                    this._resourceIds.setValue("loading", new RendererResource(url));
                    return this.LoadResourceImage(url);
                }
                LoadResourceImage(url) {
                    return PIXI.loader.add(url);
                }
            };
            exports_34("Renderer", Renderer);
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
            exports_34("RendererFactory", RendererFactory);
            RendererResource = class RendererResource {
                constructor(Url) {
                    this.Url = Url;
                    this.Sprite = null;
                }
            };
            exports_34("RendererResource", RendererResource);
        }
    }
});
System.register("XamlGL/Jupiter/UIElementCollection", ["Libs/typescript-collections/src/lib/index"], function(exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var index_2;
    var UIElementCollection;
    return {
        setters:[
            function (index_2_1) {
                index_2 = index_2_1;
            }],
        execute: function() {
            UIElementCollection = class UIElementCollection extends index_2.LinkedList {
            };
            exports_35("UIElementCollection", UIElementCollection);
        }
    }
});
System.register("XamlGL/Controls/Panel", ["XamlGL/Jupiter/FrameworkElement", "XamlGL/Jupiter/UIElementCollection", "XamlGL/Events/EventDispatcher"], function(exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var FrameworkElement_2, UIElementCollection_1, EventDispatcher_3;
    var Panel;
    return {
        setters:[
            function (FrameworkElement_2_1) {
                FrameworkElement_2 = FrameworkElement_2_1;
            },
            function (UIElementCollection_1_1) {
                UIElementCollection_1 = UIElementCollection_1_1;
            },
            function (EventDispatcher_3_1) {
                EventDispatcher_3 = EventDispatcher_3_1;
            }],
        execute: function() {
            Panel = class Panel extends FrameworkElement_2.FrameworkElement {
                constructor() {
                    super();
                    this._childAdded = new EventDispatcher_3.EventDispatcher();
                    this._childRemoved = new EventDispatcher_3.EventDispatcher();
                    this._children = new UIElementCollection_1.UIElementCollection();
                }
                get Children() { return this._children; }
                get Background() { return this._background; }
                get ChildAdded() { return this._childAdded; }
                get ChildRemoved() { return this._childRemoved; }
                set Children(value) { this._children = value; }
                set Background(value) { this._background = value; }
            };
            exports_36("Panel", Panel);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Controls/BaseRenderer", ["XamlGL/Controls/Panel", "XamlGL/Events/EventDispatcher"], function(exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var Panel_1, EventDispatcher_4;
    var BaseRenderer;
    return {
        setters:[
            function (Panel_1_1) {
                Panel_1 = Panel_1_1;
            },
            function (EventDispatcher_4_1) {
                EventDispatcher_4 = EventDispatcher_4_1;
            }],
        execute: function() {
            BaseRenderer = class BaseRenderer {
                constructor() {
                    this._elementChanged = new EventDispatcher_4.EventDispatcher();
                }
                get Element() { return this._element; }
                get ElementChanged() { return this._elementChanged; }
                set Element(value) {
                    this._element = value;
                    this._element.Renderer = this;
                    console.log(this._element);
                    this._element.PropertyChanged.subscribe(this.OnPropertyChanged);
                    this._element.FocusChanged.subscribe(this.OnFocusChanged);
                    if (value instanceof Panel_1.Panel) {
                        console.log("BaseRenderer.Element : value was a panel");
                        let castPanel = this._element;
                        castPanel.ChildAdded.subscribe(this.OnChildAdded);
                        castPanel.ChildRemoved.subscribe(this.OnChildRemoved);
                    }
                    else {
                        console.log("BaseRenderer.Element : value was a native element");
                    }
                }
                OnPropertyChanged() {
                    console.log("Platform.OnPropertyChanged");
                }
                OnFocusChanged() {
                    console.log("Platform.OnFocusChanged");
                }
                OnChildAdded() {
                    console.log("Platform.OnChildAdded");
                }
                OnChildRemoved() {
                    console.log("Platform.OnChildRemoved");
                }
            };
            exports_37("BaseRenderer", BaseRenderer);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Controls/DefaultRenderer", ["XamlGL/Jupiter/Platform/WebGL/Controls/BaseRenderer"], function(exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var BaseRenderer_1;
    var DefaultRenderer;
    return {
        setters:[
            function (BaseRenderer_1_1) {
                BaseRenderer_1 = BaseRenderer_1_1;
            }],
        execute: function() {
            DefaultRenderer = class DefaultRenderer extends BaseRenderer_1.BaseRenderer {
            };
            exports_38("DefaultRenderer", DefaultRenderer);
        }
    }
});
System.register("XamlGL/DataTypes/Thickness", [], function(exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var Thickness;
    return {
        setters:[],
        execute: function() {
            Thickness = class Thickness {
            };
            exports_39("Thickness", Thickness);
        }
    }
});
System.register("XamlGL/DataTypes/CornerRadius", [], function(exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    var CornerRadius;
    return {
        setters:[],
        execute: function() {
            CornerRadius = class CornerRadius {
                constructor(radius) {
                    this.TopLeft = radius && radius.TopLeft ? radius.TopLeft : radius;
                    this.TopRight = radius && radius.TopRight ? radius.TopRight : radius;
                    this.BottomRight = radius && radius.BottomRight ? radius.BottomRight : radius;
                    this.BottomLeft = radius && radius.BottomLeft ? radius.BottomLeft : radius;
                }
            };
            exports_40("CornerRadius", CornerRadius);
        }
    }
});
System.register("XamlGL/Controls/Grid", ["XamlGL/Controls/Panel"], function(exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var Panel_2;
    var Grid;
    return {
        setters:[
            function (Panel_2_1) {
                Panel_2 = Panel_2_1;
            }],
        execute: function() {
            Grid = class Grid extends Panel_2.Panel {
                get BorderThickness() { return this._borderThickness; }
                get BorderBrush() { return this._borderBrush; }
                get CornerRadius() { return this._cornerRadius; }
                set BorderThickness(value) { this._borderThickness = value; }
                set BorderBrush(value) { this._borderBrush = value; }
                set CornerRadius(value) { this._cornerRadius = value; }
            };
            exports_41("Grid", Grid);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Controls/GridRenderer", ["XamlGL/Jupiter/Platform/WebGL/Controls/BaseRenderer"], function(exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var BaseRenderer_2;
    var GridRenderer;
    return {
        setters:[
            function (BaseRenderer_2_1) {
                BaseRenderer_2 = BaseRenderer_2_1;
            }],
        execute: function() {
            GridRenderer = class GridRenderer extends BaseRenderer_2.BaseRenderer {
            };
            exports_42("GridRenderer", GridRenderer);
        }
    }
});
System.register("XamlGL/Jupiter/DebugSettings", [], function(exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var DebugSettings;
    return {
        setters:[],
        execute: function() {
            DebugSettings = class DebugSettings {
            };
            exports_43("DebugSettings", DebugSettings);
        }
    }
});
System.register("XamlGL/Jupiter/ApplicationTheme", [], function(exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    var ApplicationTheme;
    return {
        setters:[],
        execute: function() {
            ApplicationTheme = class ApplicationTheme {
            };
            exports_44("ApplicationTheme", ApplicationTheme);
        }
    }
});
System.register("XamlGL/Jupiter/ResourceDictionary", [], function(exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var ResourceDictionary;
    return {
        setters:[],
        execute: function() {
            ResourceDictionary = class ResourceDictionary {
            };
            exports_45("ResourceDictionary", ResourceDictionary);
        }
    }
});
System.register("XamlGL/Events/EventList", ["XamlGL/Events/EventDispatcher"], function(exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    var EventDispatcher_5;
    var EventList;
    return {
        setters:[
            function (EventDispatcher_5_1) {
                EventDispatcher_5 = EventDispatcher_5_1;
            }],
        execute: function() {
            EventList = class EventList {
                constructor() {
                    this._events = {};
                }
                get(name) {
                    let event = this._events[name];
                    if (event) {
                        return event;
                    }
                    event = new EventDispatcher_5.EventDispatcher();
                    this._events[name] = event;
                    return event;
                }
                remove(name) {
                    this._events[name] = null;
                }
            };
            exports_46("EventList", EventList);
        }
    }
});
System.register("XamlGL/Jupiter/Application", ["XamlGL/DataTypes/Guid", "XamlGL/Events/EventList"], function(exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    var Guid_2, EventList_1;
    var Application, ActivatedEventArgs, LaunchActivatedEventArgs, ApplicationEventArgs;
    return {
        setters:[
            function (Guid_2_1) {
                Guid_2 = Guid_2_1;
            },
            function (EventList_1_1) {
                EventList_1 = EventList_1_1;
            }],
        execute: function() {
            Application = class Application {
                constructor() {
                    this._events = new EventList_1.EventList();
                    this._sessionId = Guid_2.Guid.newGuid();
                }
                get SessionID() { return this._sessionId; }
                get ResourceDictionary() { return this._resourceDictionary; }
                get ApplicationTheme() { return this._applicationTheme; }
                get DebugSettings() { return this._debugSettings; }
                get EnteredBackground() { return this._events.get("EnteredBackground"); }
                get LeavingBackground() { return this._events.get("LeavingBackground"); }
                get Resuming() { return this._events.get("Resuming"); }
                get Suspending() { return this._events.get("Suspending"); }
                get UnhandledException() { return this._events.get("UnhandledException"); }
                get OnActivated() { return this._events.get("OnActivated"); }
                get OnLaunched() { return this._events.get("OnLaunched"); }
                SetupApplication() {
                    this.dispatch("OnActivated");
                    setTimeout(() => { this.dispatch("OnLaunched"); }, 3000);
                }
                dispatch(name) {
                    this._events.get(name).dispatch(this, new ApplicationEventArgs(this.SessionID));
                }
            };
            exports_47("Application", Application);
            ActivatedEventArgs = class ActivatedEventArgs {
                constructor(SessionID) {
                    this.SessionID = SessionID;
                }
            };
            exports_47("ActivatedEventArgs", ActivatedEventArgs);
            LaunchActivatedEventArgs = class LaunchActivatedEventArgs {
                constructor(SessionID) {
                    this.SessionID = SessionID;
                }
            };
            exports_47("LaunchActivatedEventArgs", LaunchActivatedEventArgs);
            ApplicationEventArgs = class ApplicationEventArgs {
                constructor(SessionID) {
                    this.SessionID = SessionID;
                }
            };
            exports_47("ApplicationEventArgs", ApplicationEventArgs);
        }
    }
});
System.register("XamlGL/Jupiter/ImageSource", ["XamlGL/Jupiter/DependencyObject"], function(exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    var DependencyObject_2;
    var ImageSource;
    return {
        setters:[
            function (DependencyObject_2_1) {
                DependencyObject_2 = DependencyObject_2_1;
            }],
        execute: function() {
            ImageSource = class ImageSource extends DependencyObject_2.DependencyObject {
            };
            exports_48("ImageSource", ImageSource);
        }
    }
});
System.register("XamlGL/Jupiter/Stretch", [], function(exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    var Stretch;
    return {
        setters:[],
        execute: function() {
            (function (Stretch) {
                Stretch[Stretch["None"] = 0] = "None";
                Stretch[Stretch["Fill"] = 1] = "Fill";
                Stretch[Stretch["Uniform"] = 2] = "Uniform";
                Stretch[Stretch["UniformToFill"] = 3] = "UniformToFill";
            })(Stretch || (Stretch = {}));
            exports_49("Stretch", Stretch);
        }
    }
});
System.register("XamlGL/Jupiter/IView", [], function(exports_50, context_50) {
    "use strict";
    var __moduleName = context_50 && context_50.id;
    var HorizontalAlignment, VerticalAlignment;
    return {
        setters:[],
        execute: function() {
            (function (HorizontalAlignment) {
                HorizontalAlignment[HorizontalAlignment["Left"] = 0] = "Left";
                HorizontalAlignment[HorizontalAlignment["Center"] = 1] = "Center";
                HorizontalAlignment[HorizontalAlignment["Right"] = 2] = "Right";
                HorizontalAlignment[HorizontalAlignment["Stretch"] = 3] = "Stretch";
            })(HorizontalAlignment || (HorizontalAlignment = {}));
            exports_50("HorizontalAlignment", HorizontalAlignment);
            (function (VerticalAlignment) {
                VerticalAlignment[VerticalAlignment["Top"] = 0] = "Top";
                VerticalAlignment[VerticalAlignment["Center"] = 1] = "Center";
                VerticalAlignment[VerticalAlignment["Bottom"] = 2] = "Bottom";
                VerticalAlignment[VerticalAlignment["Stretch"] = 3] = "Stretch";
            })(VerticalAlignment || (VerticalAlignment = {}));
            exports_50("VerticalAlignment", VerticalAlignment);
        }
    }
});
System.register("XamlGL/Jupiter/View", ["XamlGL/Jupiter/FrameworkElement"], function(exports_51, context_51) {
    "use strict";
    var __moduleName = context_51 && context_51.id;
    var FrameworkElement_3;
    var View;
    return {
        setters:[
            function (FrameworkElement_3_1) {
                FrameworkElement_3 = FrameworkElement_3_1;
            }],
        execute: function() {
            View = class View extends FrameworkElement_3.FrameworkElement {
                get HorizontalAlignment() { return this._horizontalAlignment; }
                get VerticalAlignment() { return this._verticalAlignment; }
                get Margin() { return this._margin; }
                set HorizontalAlignment(value) { this._horizontalAlignment = value; }
                set VerticalAlignment(value) { this._verticalAlignment = value; }
                set Margin(value) { this._margin = value; }
            };
            exports_51("View", View);
        }
    }
});
System.register("XamlGL/Jupiter/Media/BitmapSource", ["XamlGL/Jupiter/ImageSource"], function(exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    var ImageSource_1;
    var BitmapSource;
    return {
        setters:[
            function (ImageSource_1_1) {
                ImageSource_1 = ImageSource_1_1;
            }],
        execute: function() {
            BitmapSource = class BitmapSource extends ImageSource_1.ImageSource {
            };
            exports_52("BitmapSource", BitmapSource);
        }
    }
});
System.register("XamlGL/Jupiter/Media/BitmapImage", ["XamlGL/Jupiter/Media/BitmapSource"], function(exports_53, context_53) {
    "use strict";
    var __moduleName = context_53 && context_53.id;
    var BitmapSource_1;
    var BitmapImage;
    return {
        setters:[
            function (BitmapSource_1_1) {
                BitmapSource_1 = BitmapSource_1_1;
            }],
        execute: function() {
            BitmapImage = class BitmapImage extends BitmapSource_1.BitmapSource {
                constructor(uri) {
                    super();
                    this._uri = uri;
                }
                get Uri() { return this._uri; }
                set Uri(value) { this._uri = value; }
            };
            exports_53("BitmapImage", BitmapImage);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/IImageRenderer", [], function(exports_54, context_54) {
    "use strict";
    var __moduleName = context_54 && context_54.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/Controls/Image", ["XamlGL/Jupiter/Core"], function(exports_55, context_55) {
    "use strict";
    var __moduleName = context_55 && context_55.id;
    var Jupiter;
    var Image;
    return {
        setters:[
            function (Jupiter_1) {
                Jupiter = Jupiter_1;
            }],
        execute: function() {
            Image = class Image extends Jupiter.View {
                get Source() { return this._source; }
                get NineGrid() { return this._nineGrid; }
                get Stretch() { return this._stretch; }
                set Source(value) { this._source = value; }
                set NineGrid(value) { this._nineGrid = value; }
                set Stretch(value) { this._stretch = value; }
            };
            exports_55("Image", Image);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Controls/ImageRenderer", ["XamlGL/Jupiter/Platform/WebGL/Controls/BaseRenderer"], function(exports_56, context_56) {
    "use strict";
    var __moduleName = context_56 && context_56.id;
    var BaseRenderer_3;
    var ImageRenderer;
    return {
        setters:[
            function (BaseRenderer_3_1) {
                BaseRenderer_3 = BaseRenderer_3_1;
            }],
        execute: function() {
            ImageRenderer = class ImageRenderer extends BaseRenderer_3.BaseRenderer {
            };
            exports_56("ImageRenderer", ImageRenderer);
        }
    }
});
System.register("XamlGL/Controls/Rectangle", ["XamlGL/Controls/Panel"], function(exports_57, context_57) {
    "use strict";
    var __moduleName = context_57 && context_57.id;
    var Panel_3;
    var Rectangle;
    return {
        setters:[
            function (Panel_3_1) {
                Panel_3 = Panel_3_1;
            }],
        execute: function() {
            Rectangle = class Rectangle extends Panel_3.Panel {
                get BorderThickness() { return this._borderThickness; }
                get BorderBrush() { return this._borderBrush; }
                get CornerRadius() { return this._cornerRadius; }
                set BorderThickness(value) { this._borderThickness = value; }
                set BorderBrush(value) { this._borderBrush = value; }
                set CornerRadius(value) { this._cornerRadius = value; }
            };
            exports_57("Rectangle", Rectangle);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Controls/RectangleRenderer", ["XamlGL/Jupiter/Platform/WebGL/Controls/BaseRenderer"], function(exports_58, context_58) {
    "use strict";
    var __moduleName = context_58 && context_58.id;
    var BaseRenderer_4;
    var RectangleRenderer;
    return {
        setters:[
            function (BaseRenderer_4_1) {
                BaseRenderer_4 = BaseRenderer_4_1;
            }],
        execute: function() {
            RectangleRenderer = class RectangleRenderer extends BaseRenderer_4.BaseRenderer {
            };
            exports_58("RectangleRenderer", RectangleRenderer);
        }
    }
});
System.register("XamlGL/Utils/RendererHelper", ["XamlGL/Jupiter/Platform/WebGL/Controls/DefaultRenderer", "XamlGL/Controls/Grid", "XamlGL/Jupiter/Platform/WebGL/Controls/GridRenderer", "XamlGL/Controls/Image", "XamlGL/Jupiter/Platform/WebGL/Controls/ImageRenderer", "XamlGL/Controls/Rectangle", "XamlGL/Jupiter/Platform/WebGL/Controls/RectangleRenderer"], function(exports_59, context_59) {
    "use strict";
    var __moduleName = context_59 && context_59.id;
    var DefaultRenderer_1, Grid_1, GridRenderer_1, Image_1, ImageRenderer_1, Rectangle_1, RectangleRenderer_1;
    var RendererHelper;
    return {
        setters:[
            function (DefaultRenderer_1_1) {
                DefaultRenderer_1 = DefaultRenderer_1_1;
            },
            function (Grid_1_1) {
                Grid_1 = Grid_1_1;
            },
            function (GridRenderer_1_1) {
                GridRenderer_1 = GridRenderer_1_1;
            },
            function (Image_1_1) {
                Image_1 = Image_1_1;
            },
            function (ImageRenderer_1_1) {
                ImageRenderer_1 = ImageRenderer_1_1;
            },
            function (Rectangle_1_1) {
                Rectangle_1 = Rectangle_1_1;
            },
            function (RectangleRenderer_1_1) {
                RectangleRenderer_1 = RectangleRenderer_1_1;
            }],
        execute: function() {
            RendererHelper = class RendererHelper {
                static FrameworkElementToRenderer(element) {
                    if (element instanceof Grid_1.Grid) {
                        return new GridRenderer_1.GridRenderer();
                    }
                    else if (element instanceof Image_1.Image) {
                        return new ImageRenderer_1.ImageRenderer();
                    }
                    else if (element instanceof Rectangle_1.Rectangle) {
                        return new RectangleRenderer_1.RectangleRenderer();
                    }
                    else {
                        return new DefaultRenderer_1.DefaultRenderer();
                    }
                }
            };
            exports_59("RendererHelper", RendererHelper);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Platform", ["XamlGL/Jupiter/Platform/WebGL/Renderer", "XamlGL/Controls/Panel", "XamlGL/Utils/RendererHelper"], function(exports_60, context_60) {
    "use strict";
    var __moduleName = context_60 && context_60.id;
    var Renderer_1, Panel_4, RendererHelper_1;
    var Platform;
    return {
        setters:[
            function (Renderer_1_1) {
                Renderer_1 = Renderer_1_1;
            },
            function (Panel_4_1) {
                Panel_4 = Panel_4_1;
            },
            function (RendererHelper_1_1) {
                RendererHelper_1 = RendererHelper_1_1;
            }],
        execute: function() {
            Platform = class Platform {
                constructor(width, height, antialias, transparent, htmlCanvasHost) {
                    this._godRenderer = new Renderer_1.Renderer(width, height, antialias, transparent, htmlCanvasHost);
                    console.log("Platform:constructor");
                }
                get Renderer() { return this._godRenderer; }
                SetCurrent(content) {
                    console.log("Platform:SetCurrent  ====================== ");
                    content.Platform = this;
                    let fe = this.CreateControlRenderer(content);
                    fe.Element = content;
                    if (content instanceof Panel_4.Panel) {
                        let panel = content;
                        panel.Children.forEach((x) => {
                            this.SetCurrent.call(this, x);
                        });
                    }
                }
                CreateControlRenderer(element) {
                    return RendererHelper_1.RendererHelper.FrameworkElementToRenderer(element);
                }
            };
            exports_60("Platform", Platform);
        }
    }
});
System.register("XamlGL/Reader/XamlMarkup", [], function(exports_61, context_61) {
    "use strict";
    var __moduleName = context_61 && context_61.id;
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
            exports_61("XamlMarkup", XamlMarkup);
        }
    }
});
System.register("XamlGL/Utils/XamlHelper", ["XamlGL/Controls/Grid", "XamlGL/Controls/Image", "XamlGL/Controls/Panel", "XamlGL/Controls/Rectangle"], function(exports_62, context_62) {
    "use strict";
    var __moduleName = context_62 && context_62.id;
    var Grid_2, Image_2, Panel_5, Rectangle_2;
    var XamlHelper;
    return {
        setters:[
            function (Grid_2_1) {
                Grid_2 = Grid_2_1;
            },
            function (Image_2_1) {
                Image_2 = Image_2_1;
            },
            function (Panel_5_1) {
                Panel_5 = Panel_5_1;
            },
            function (Rectangle_2_1) {
                Rectangle_2 = Rectangle_2_1;
            }],
        execute: function() {
            XamlHelper = class XamlHelper {
                static XamlMarkupToUIElement(xaml) {
                    let ret = this.ProcessHTMLElement(xaml.rootElement);
                    return ret;
                }
                static ProcessCollection(col) {
                    for (let x = 0; x < col.length; x++) {
                        let child = col.item(x);
                        return this.ProcessElement(child);
                    }
                }
                static ProcessCollectionNodes(rootPanel, col) {
                    for (let x = 0; x < col.length; x++) {
                        let node = col.item(x);
                        let newFE = this.ProcessNode(node);
                        if (newFE !== null) {
                            rootPanel.Children.add(newFE);
                        }
                    }
                    return rootPanel;
                }
                static ProcessNode(el) {
                    return this.GetFrameworkElementByNode(el);
                }
                static ProcessElement(el) {
                    let container = this.GetFrameworkElementByElement(el);
                    if (container !== null && container instanceof Panel_5.Panel) {
                        return this.ProcessCollectionNodes(container, el.childNodes);
                    }
                }
                static ProcessHTMLElement(el) {
                    return this.ProcessCollection(el.children);
                }
                static GetFrameworkElementByElement(el) {
                    if (el.nodeName === "Grid") {
                        let grid = new Grid_2.Grid();
                        return grid;
                    }
                    return null;
                }
                static GetFrameworkElementByNode(node) {
                    if (node.nodeName === "Rectangle") {
                        let rect = new Rectangle_2.Rectangle();
                        rect.Width = Number.parseInt(node.attributes.getNamedItem("Width").value);
                        rect.Height = Number.parseInt(node.attributes.getNamedItem("Height").value);
                        rect.Background = "Red";
                        return rect;
                    }
                    else if (node.nodeName === "Image") {
                        let img = new Image_2.Image();
                        img.Source = node.attributes.getNamedItem("Source").value;
                        img.Width = Number.parseInt(node.attributes.getNamedItem("Width").value);
                        img.Height = Number.parseInt(node.attributes.getNamedItem("Height").value);
                        return img;
                    }
                    return null;
                }
            };
            exports_62("XamlHelper", XamlHelper);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/PlatformPage", ["XamlGL/Jupiter/Page", "XamlGL/Jupiter/Platform/WebGL/Platform", "XamlGL/Events/EventList", "XamlGL/Utils/XamlHelper"], function(exports_63, context_63) {
    "use strict";
    var __moduleName = context_63 && context_63.id;
    var Page_1, Platform_1, EventList_2, XamlHelper_1;
    var PlatformPage, WindowEventArgs;
    return {
        setters:[
            function (Page_1_1) {
                Page_1 = Page_1_1;
            },
            function (Platform_1_1) {
                Platform_1 = Platform_1_1;
            },
            function (EventList_2_1) {
                EventList_2 = EventList_2_1;
            },
            function (XamlHelper_1_1) {
                XamlHelper_1 = XamlHelper_1_1;
            }],
        execute: function() {
            PlatformPage = class PlatformPage extends Page_1.Page {
                constructor(width, height, antialias, transparent, htmlCanvasHost, xaml) {
                    super();
                    this._events = new EventList_2.EventList();
                    this.ContentChanged.subscribe(this.DoContentChanged);
                    this.Width = width;
                    this.Height = height;
                    this._antialias = antialias;
                    this._transparent = transparent;
                    this._htmlCanvasHost = htmlCanvasHost;
                    this._xaml = xaml;
                    this.Platform = this.CreatePlatform();
                    this.Content = XamlHelper_1.XamlHelper.XamlMarkupToUIElement(xaml);
                    this.InitializeShell();
                }
                get Activated() { return this._events.get("Activated"); }
                get Closed() { return this._events.get("Closed"); }
                get SizeChanged() { return this._events.get("SizeChanged"); }
                get VisibilityChanged() { return this._events.get("VisibilityChanged"); }
                CreatePlatform() {
                    return new Platform_1.Platform(this.Width, this.Height, this._antialias, this._transparent, this._htmlCanvasHost);
                }
                InitializeShell() {
                    this.Platform.Renderer.Border = "1px solid lightgray";
                    this.Platform.Renderer.BackgroundColor = 0xf9f9f9;
                }
                Resize(width, height) {
                    this.Platform.Renderer.Resize(width, height);
                }
                ResizeFullWindow() {
                    this.Platform.Renderer.ResizeFull();
                }
                DoContentChanged(obj, ea) {
                    console.log("PlatformPage.DoContentChanged");
                    let pp = obj;
                    pp.Platform.SetCurrent(pp.Content);
                }
                set IsLoading(value) {
                    if (value) {
                        this.Platform.Renderer.InitializeLoadingResource("assets/silverlight_anims.jpg")
                            .load(() => {
                            this.Platform.Renderer.ShowLoading(160, 160, 165, 165);
                            this.Activate();
                        });
                    }
                    else {
                        this.Platform.Renderer.HideLoading();
                    }
                }
                dispatch(name) {
                    this._events.get(name).dispatch(this, new WindowEventArgs());
                }
                Activate() { this.dispatch("Activated"); }
                Close() { this.dispatch("Closed"); }
                SetTitleBar(value) {
                }
            };
            exports_63("PlatformPage", PlatformPage);
            WindowEventArgs = class WindowEventArgs {
            };
            exports_63("WindowEventArgs", WindowEventArgs);
        }
    }
});
System.register("XamlGL/Jupiter/Core", ["XamlGL/Jupiter/Application", "XamlGL/Jupiter/ApplicationTheme", "XamlGL/Jupiter/Control", "XamlGL/Jupiter/DebugSettings", "XamlGL/Jupiter/DependencyObject", "XamlGL/Jupiter/FrameworkElement", "XamlGL/Jupiter/ImageSource", "XamlGL/Jupiter/Page", "XamlGL/Jupiter/ResourceDictionary", "XamlGL/Jupiter/Stretch", "XamlGL/Jupiter/UIElement", "XamlGL/Jupiter/UIElementCollection", "XamlGL/Jupiter/UserControl", "XamlGL/Jupiter/View", "XamlGL/Jupiter/Media/BitmapImage", "XamlGL/Jupiter/Media/BitmapSource", "XamlGL/Jupiter/Platform/WebGL/Platform", "XamlGL/Jupiter/Platform/WebGL/Renderer", "XamlGL/Jupiter/Platform/WebGL/PlatformPage", "XamlGL/Jupiter/IView"], function(exports_64, context_64) {
    "use strict";
    var __moduleName = context_64 && context_64.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_64(exports);
    }
    return {
        setters:[
            function (Application_1_1) {
                exportStar_1(Application_1_1);
            },
            function (ApplicationTheme_1_1) {
                exportStar_1(ApplicationTheme_1_1);
            },
            function (Control_2_1) {
                exportStar_1(Control_2_1);
            },
            function (DebugSettings_1_1) {
                exportStar_1(DebugSettings_1_1);
            },
            function (DependencyObject_3_1) {
                exportStar_1(DependencyObject_3_1);
            },
            function (FrameworkElement_4_1) {
                exportStar_1(FrameworkElement_4_1);
            },
            function (ImageSource_2_1) {
                exportStar_1(ImageSource_2_1);
            },
            function (Page_2_1) {
                exportStar_1(Page_2_1);
            },
            function (ResourceDictionary_1_1) {
                exportStar_1(ResourceDictionary_1_1);
            },
            function (Stretch_1_1) {
                exportStar_1(Stretch_1_1);
            },
            function (UIElement_2_1) {
                exportStar_1(UIElement_2_1);
            },
            function (UIElementCollection_2_1) {
                exportStar_1(UIElementCollection_2_1);
            },
            function (UserControl_2_1) {
                exportStar_1(UserControl_2_1);
            },
            function (View_1_1) {
                exportStar_1(View_1_1);
            },
            function (BitmapImage_1_1) {
                exportStar_1(BitmapImage_1_1);
            },
            function (BitmapSource_2_1) {
                exportStar_1(BitmapSource_2_1);
            },
            function (Platform_2_1) {
                exportStar_1(Platform_2_1);
            },
            function (Renderer_2_1) {
                exportStar_1(Renderer_2_1);
            },
            function (PlatformPage_1_1) {
                exportStar_1(PlatformPage_1_1);
            },
            function (IView_1_1) {
                exportStar_1(IView_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("XamlGL/ViewManager", [], function(exports_65, context_65) {
    "use strict";
    var __moduleName = context_65 && context_65.id;
    var ViewManager;
    return {
        setters:[],
        execute: function() {
            ViewManager = class ViewManager {
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
                        if (done) {
                            done.call(this, jqContent);
                        }
                    });
                }
            };
            ViewManager._isReady = false;
            exports_65("ViewManager", ViewManager);
        }
    }
});
System.register("XamlGL/App", ["XamlGL/Jupiter/Platform/WebGL/PlatformPage", "XamlGL/ViewManager", "XamlGL/Jupiter/Application"], function(exports_66, context_66) {
    "use strict";
    var __moduleName = context_66 && context_66.id;
    var PlatformPage_2, ViewManager_1, Application_2;
    var App;
    return {
        setters:[
            function (PlatformPage_2_1) {
                PlatformPage_2 = PlatformPage_2_1;
            },
            function (ViewManager_1_1) {
                ViewManager_1 = ViewManager_1_1;
            },
            function (Application_2_1) {
                Application_2 = Application_2_1;
            }],
        execute: function() {
            App = class App extends Application_2.Application {
                constructor() {
                    super();
                    this.OnLaunched.subscribe(this.Launched.bind(this));
                    this.OnActivated.subscribe(this.Activated.bind(this));
                }
                Start(xaml) {
                    console.log(PIXI);
                    ViewManager_1.ViewManager.RenderView("pixi-home", PIXI, (jqView) => {
                        this._jqView = jqView;
                        this.SetupWindow(jqView.find(".pixi-canvas"), xaml);
                        this.SetupApplication();
                    });
                }
                Activated() {
                    this._platformPage.IsLoading = true;
                }
                Launched() {
                    this._platformPage.IsLoading = false;
                }
                SetupWindow(htmlCanvasHost, xaml) {
                    this._platformPage = new PlatformPage_2.PlatformPage(512, 512, false, false, htmlCanvasHost, xaml);
                }
            };
            exports_66("App", App);
        }
    }
});
System.register("XamlGL/VisualTree", ["Libs/typescript-collections/src/lib/index"], function(exports_67, context_67) {
    "use strict";
    var __moduleName = context_67 && context_67.id;
    var Collections;
    var VisualTree, VisualTreeNode;
    return {
        setters:[
            function (Collections_1) {
                Collections = Collections_1;
            }],
        execute: function() {
            VisualTree = class VisualTree {
                constructor() {
                    this._children = new Collections.LinkedList();
                }
                get Children() { return this._children; }
            };
            exports_67("VisualTree", VisualTree);
            VisualTreeNode = class VisualTreeNode {
                constructor(Name = null, ID = null) {
                    this.Name = Name;
                    this.ID = ID;
                }
                get Children() { return this._children; }
            };
            exports_67("VisualTreeNode", VisualTreeNode);
        }
    }
});
System.register("XamlGL/Reader/XamlReader", ["XamlGL/Reader/XamlMarkup"], function(exports_68, context_68) {
    "use strict";
    var __moduleName = context_68 && context_68.id;
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
            exports_68("XamlReader", XamlReader);
        }
    }
});
System.register("XamlGL/Reader/XamlParser", [], function(exports_69, context_69) {
    "use strict";
    var __moduleName = context_69 && context_69.id;
    var XamlParser;
    return {
        setters:[],
        execute: function() {
            XamlParser = class XamlParser {
                constructor() {
                }
            };
            exports_69("XamlParser", XamlParser);
        }
    }
});
System.register("XamlGL/Controls/Control", ["XamlGL/Jupiter/FrameworkElement"], function(exports_70, context_70) {
    "use strict";
    var __moduleName = context_70 && context_70.id;
    var FrameworkElement_5;
    var Control;
    return {
        setters:[
            function (FrameworkElement_5_1) {
                FrameworkElement_5 = FrameworkElement_5_1;
            }],
        execute: function() {
            Control = class Control extends FrameworkElement_5.FrameworkElement {
            };
            exports_70("Control", Control);
        }
    }
});
System.register("XamlGL/Controls/ContentControl", ["XamlGL/Controls/Control"], function(exports_71, context_71) {
    "use strict";
    var __moduleName = context_71 && context_71.id;
    var Control_3;
    var ContentControl;
    return {
        setters:[
            function (Control_3_1) {
                Control_3 = Control_3_1;
            }],
        execute: function() {
            ContentControl = class ContentControl extends Control_3.Control {
            };
            exports_71("ContentControl", ContentControl);
        }
    }
});
System.register("XamlGL/Controls/Frame", ["XamlGL/Controls/ContentControl"], function(exports_72, context_72) {
    "use strict";
    var __moduleName = context_72 && context_72.id;
    var ContentControl_1;
    var Frame;
    return {
        setters:[
            function (ContentControl_1_1) {
                ContentControl_1 = ContentControl_1_1;
            }],
        execute: function() {
            Frame = class Frame extends ContentControl_1.ContentControl {
            };
            exports_72("Frame", Frame);
        }
    }
});
System.register("XamlGL/Controls/LoadingBalls", [], function(exports_73, context_73) {
    "use strict";
    var __moduleName = context_73 && context_73.id;
    var LoadingBalls;
    return {
        setters:[],
        execute: function() {
            LoadingBalls = class LoadingBalls {
                constructor() {
                }
            };
            exports_73("LoadingBalls", LoadingBalls);
        }
    }
});
System.register("XamlGL/Controls/Core", ["XamlGL/Controls/ContentControl", "XamlGL/Controls/Control", "XamlGL/Controls/Frame", "XamlGL/Controls/Grid", "XamlGL/Controls/Image", "XamlGL/Controls/LoadingBalls", "XamlGL/Controls/Panel", "XamlGL/Controls/Rectangle"], function(exports_74, context_74) {
    "use strict";
    var __moduleName = context_74 && context_74.id;
    function exportStar_2(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_74(exports);
    }
    return {
        setters:[
            function (ContentControl_2_1) {
                exportStar_2(ContentControl_2_1);
            },
            function (Control_4_1) {
                exportStar_2(Control_4_1);
            },
            function (Frame_1_1) {
                exportStar_2(Frame_1_1);
            },
            function (Grid_3_1) {
                exportStar_2(Grid_3_1);
            },
            function (Image_3_1) {
                exportStar_2(Image_3_1);
            },
            function (LoadingBalls_1_1) {
                exportStar_2(LoadingBalls_1_1);
            },
            function (Panel_6_1) {
                exportStar_2(Panel_6_1);
            },
            function (Rectangle_3_1) {
                exportStar_2(Rectangle_3_1);
            }],
        execute: function() {
        }
    }
});
System.register("XamlGL/Events/Core", ["XamlGL/Events/EventList", "XamlGL/Events/EventDispatcher"], function(exports_75, context_75) {
    "use strict";
    var __moduleName = context_75 && context_75.id;
    function exportStar_3(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_75(exports);
    }
    return {
        setters:[
            function (EventList_3_1) {
                exportStar_3(EventList_3_1);
            },
            function (EventDispatcher_6_1) {
                exportStar_3(EventDispatcher_6_1);
            }],
        execute: function() {
        }
    }
});
System.register("XamlGL/Core", ["XamlGL/App", "XamlGL/VisualTree", "XamlGL/ViewManager", "XamlGL/Reader/XamlReader", "XamlGL/Reader/XamlParser", "XamlGL/Reader/XamlMarkup", "XamlGL/Controls/Core", "XamlGL/Events/Core", "XamlGL/DataTypes/Guid", "XamlGL/DataTypes/Thickness", "XamlGL/DataTypes/CornerRadius"], function(exports_76, context_76) {
    "use strict";
    var __moduleName = context_76 && context_76.id;
    var _controls, _events;
    var Controls, Events;
    var exportedNames_1 = {
        'Controls': true,
        'Events': true
    };
    function exportStar_4(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_76(exports);
    }
    return {
        setters:[
            function (App_1_1) {
                exportStar_4(App_1_1);
            },
            function (VisualTree_1_1) {
                exportStar_4(VisualTree_1_1);
            },
            function (ViewManager_2_1) {
                exportStar_4(ViewManager_2_1);
            },
            function (XamlReader_1_1) {
                exportStar_4(XamlReader_1_1);
            },
            function (XamlParser_1_1) {
                exportStar_4(XamlParser_1_1);
            },
            function (XamlMarkup_2_1) {
                exportStar_4(XamlMarkup_2_1);
            },
            function (_controls_1) {
                _controls = _controls_1;
            },
            function (_events_1) {
                _events = _events_1;
            },
            function (Guid_3_1) {
                exportStar_4(Guid_3_1);
            },
            function (Thickness_1_1) {
                exportStar_4(Thickness_1_1);
            },
            function (CornerRadius_1_1) {
                exportStar_4(CornerRadius_1_1);
            }],
        execute: function() {
            exports_76("Controls", Controls = _controls);
            exports_76("Events", Events = _events);
        }
    }
});
System.register("Bootstrap/XamlApp", ["XamlGL/Core"], function(exports_77, context_77) {
    "use strict";
    var __moduleName = context_77 && context_77.id;
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
                    let xm = XamlGLCore.XamlReader.LoadUri("/xaml/rectangle-shape.xap", (el) => { console.log(xm.rootElement); });
                    let app = new XamlGLCore.App();
                    app.Start(xm);
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
            exports_77("XamlApp", XamlApp);
        }
    }
});
System.register("Tests/TestBase", ["Libs/typescript-collections/src/lib/index"], function(exports_78, context_78) {
    "use strict";
    var __moduleName = context_78 && context_78.id;
    var Collections;
    var TestBase;
    return {
        setters:[
            function (Collections_2) {
                Collections = Collections_2;
            }],
        execute: function() {
            TestBase = class TestBase {
                constructor(TestSet) {
                    this.TestSet = TestSet;
                    this._results = new Collections.LinkedList();
                }
                LogResult(result) {
                    this._results.add(result);
                }
                GetResults() {
                    let runningResults = `[${this.TestSet}]\n\r`;
                    this._results.forEach((x) => { runningResults += x + "\n\r"; });
                    return runningResults;
                }
                BeginUnitTest(unitTestName) {
                    this.LogResult(`[STARTED ${Date.now}] ${unitTestName}`);
                }
                EndUnitTest(unitTestName) {
                    this.LogResult(`[ENDED ${Date.now}] ${unitTestName}`);
                }
                ShouldBeTrue(scope, test) {
                    let result = (test === true);
                    if (result === true) {
                        this.LogResult(`${scope} [passed]`);
                    }
                    else {
                        this.LogResult(`${scope} [failed]`);
                    }
                }
            };
            exports_78("TestBase", TestBase);
        }
    }
});
System.register("Tests/XamlGL/VisualTree", ["XamlGL/Core", "Tests/TestBase"], function(exports_79, context_79) {
    "use strict";
    var __moduleName = context_79 && context_79.id;
    var XamlGL, TestBase_1;
    var Tests;
    return {
        setters:[
            function (XamlGL_1) {
                XamlGL = XamlGL_1;
            },
            function (TestBase_1_1) {
                TestBase_1 = TestBase_1_1;
            }],
        execute: function() {
            Tests = class Tests extends TestBase_1.TestBase {
                constructor() {
                    super("VisualTree");
                }
                Run() {
                    this.test001("VisualTree should have a children collection that can accept VisualTreeNode");
                    return this.GetResults();
                }
                test001(testDescription) {
                    this.BeginUnitTest(testDescription);
                    let vt = new XamlGL.VisualTree();
                    this.ShouldBeTrue("has children", vt.Children !== null);
                    vt.Children.add(new XamlGL.VisualTreeNode("test001"));
                    this.ShouldBeTrue("adding VisualTreeNode element", vt.Children.size() === 1);
                    this.ShouldBeTrue("added element saved Name successfully", vt.Children.first().Name === "test001");
                    this.EndUnitTest(testDescription);
                }
            };
            exports_79("Tests", Tests);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Controls/Core", ["XamlGL/Jupiter/Platform/WebGL/Controls/DefaultRenderer", "XamlGL/Jupiter/Platform/WebGL/Controls/GridRenderer", "XamlGL/Jupiter/Platform/WebGL/Controls/ImageRenderer", "XamlGL/Jupiter/Platform/WebGL/Controls/RectangleRenderer"], function(exports_80, context_80) {
    "use strict";
    var __moduleName = context_80 && context_80.id;
    function exportStar_5(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_80(exports);
    }
    return {
        setters:[
            function (DefaultRenderer_2_1) {
                exportStar_5(DefaultRenderer_2_1);
            },
            function (GridRenderer_2_1) {
                exportStar_5(GridRenderer_2_1);
            },
            function (ImageRenderer_2_1) {
                exportStar_5(ImageRenderer_2_1);
            },
            function (RectangleRenderer_2_1) {
                exportStar_5(RectangleRenderer_2_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=allsrc.js.map
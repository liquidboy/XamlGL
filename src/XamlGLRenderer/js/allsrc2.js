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
System.register("libs/typescript-collections/src/lib/util", [], function (exports_6, context_6) {
    "use strict";
    var _hasOwnProperty, has;
    var __moduleName = context_6 && context_6.id;
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
    exports_6("defaultCompare", defaultCompare);
    function defaultEquals(a, b) {
        return a === b;
    }
    exports_6("defaultEquals", defaultEquals);
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
    exports_6("defaultToString", defaultToString);
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
    exports_6("makeString", makeString);
    function isFunction(func) {
        return (typeof func) === 'function';
    }
    exports_6("isFunction", isFunction);
    function isUndefined(obj) {
        return (typeof obj) === 'undefined';
    }
    exports_6("isUndefined", isUndefined);
    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    exports_6("isString", isString);
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
    exports_6("reverseCompareFunction", reverseCompareFunction);
    function compareToEquals(compareFunction) {
        return function (a, b) {
            return compareFunction(a, b) === 0;
        };
    }
    exports_6("compareToEquals", compareToEquals);
    return {
        setters: [],
        execute: function () {
            _hasOwnProperty = Object.prototype.hasOwnProperty;
            exports_6("has", has = function (obj, prop) {
                return _hasOwnProperty.call(obj, prop);
            });
        }
    };
});
System.register("libs/typescript-collections/src/lib/arrays", ["libs/typescript-collections/src/lib/util"], function (exports_7, context_7) {
    "use strict";
    var util;
    var __moduleName = context_7 && context_7.id;
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
    exports_7("indexOf", indexOf);
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
    exports_7("lastIndexOf", lastIndexOf);
    function contains(array, item, equalsFunction) {
        return indexOf(array, item, equalsFunction) >= 0;
    }
    exports_7("contains", contains);
    function remove(array, item, equalsFunction) {
        const index = indexOf(array, item, equalsFunction);
        if (index < 0) {
            return false;
        }
        array.splice(index, 1);
        return true;
    }
    exports_7("remove", remove);
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
    exports_7("frequency", frequency);
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
    exports_7("equals", equals);
    function copy(array) {
        return array.concat();
    }
    exports_7("copy", copy);
    function swap(array, i, j) {
        if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
            return false;
        }
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return true;
    }
    exports_7("swap", swap);
    function toString(array) {
        return '[' + array.toString() + ']';
    }
    exports_7("toString", toString);
    function forEach(array, callback) {
        for (const ele of array) {
            if (callback(ele) === false) {
                return;
            }
        }
    }
    exports_7("forEach", forEach);
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
System.register("libs/typescript-collections/src/lib/Dictionary", ["libs/typescript-collections/src/lib/util"], function (exports_8, context_8) {
    "use strict";
    var util, Dictionary;
    var __moduleName = context_8 && context_8.id;
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
            exports_8("default", Dictionary);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Set", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/arrays", "libs/typescript-collections/src/lib/Dictionary"], function (exports_9, context_9) {
    "use strict";
    var util, arrays, Dictionary_1, Set;
    var __moduleName = context_9 && context_9.id;
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
            exports_9("default", Set);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Bag", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/Set"], function (exports_10, context_10) {
    "use strict";
    var util, Dictionary_2, Set_1, Bag;
    var __moduleName = context_10 && context_10.id;
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
            exports_10("default", Bag);
        }
    };
});
System.register("libs/typescript-collections/src/lib/LinkedList", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/arrays"], function (exports_11, context_11) {
    "use strict";
    var util, arrays, LinkedList;
    var __moduleName = context_11 && context_11.id;
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
            exports_11("default", LinkedList);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Heap", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/arrays"], function (exports_12, context_12) {
    "use strict";
    var collections, arrays, Heap;
    var __moduleName = context_12 && context_12.id;
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
            exports_12("default", Heap);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Queue", ["libs/typescript-collections/src/lib/LinkedList"], function (exports_13, context_13) {
    "use strict";
    var LinkedList_1, Queue;
    var __moduleName = context_13 && context_13.id;
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
            exports_13("default", Queue);
        }
    };
});
System.register("libs/typescript-collections/src/lib/BSTree", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/Queue"], function (exports_14, context_14) {
    "use strict";
    var util, Queue_1, BSTree;
    var __moduleName = context_14 && context_14.id;
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
            exports_14("default", BSTree);
        }
    };
});
System.register("libs/typescript-collections/src/lib/LinkedDictionary", ["libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/util"], function (exports_15, context_15) {
    "use strict";
    var Dictionary_3, util, LinkedDictionaryPair, LinkedDictionary;
    var __moduleName = context_15 && context_15.id;
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
            exports_15("default", LinkedDictionary);
        }
    };
});
System.register("libs/typescript-collections/src/lib/MultiDictionary", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/arrays"], function (exports_16, context_16) {
    "use strict";
    var util, Dictionary_4, arrays, MultiDictionary;
    var __moduleName = context_16 && context_16.id;
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
            exports_16("default", MultiDictionary);
        }
    };
});
System.register("libs/typescript-collections/src/lib/FactoryDictionary", ["libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/util"], function (exports_17, context_17) {
    "use strict";
    var Dictionary_5, util, FactoryDictionary;
    var __moduleName = context_17 && context_17.id;
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
            exports_17("default", FactoryDictionary);
        }
    };
});
System.register("libs/typescript-collections/src/lib/PriorityQueue", ["libs/typescript-collections/src/lib/util", "libs/typescript-collections/src/lib/Heap"], function (exports_18, context_18) {
    "use strict";
    var util, Heap_1, PriorityQueue;
    var __moduleName = context_18 && context_18.id;
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
            exports_18("default", PriorityQueue);
        }
    };
});
System.register("libs/typescript-collections/src/lib/Stack", ["libs/typescript-collections/src/lib/LinkedList"], function (exports_19, context_19) {
    "use strict";
    var LinkedList_2, Stack;
    var __moduleName = context_19 && context_19.id;
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
            exports_19("default", Stack);
        }
    };
});
System.register("libs/typescript-collections/src/lib/MultiRootTree", [], function (exports_20, context_20) {
    "use strict";
    var Direction, MultiRootTree;
    var __moduleName = context_20 && context_20.id;
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
            exports_20("default", MultiRootTree);
        }
    };
});
System.register("libs/typescript-collections/src/lib/index", ["libs/typescript-collections/src/lib/arrays", "libs/typescript-collections/src/lib/Bag", "libs/typescript-collections/src/lib/BSTree", "libs/typescript-collections/src/lib/Dictionary", "libs/typescript-collections/src/lib/Heap", "libs/typescript-collections/src/lib/LinkedDictionary", "libs/typescript-collections/src/lib/LinkedList", "libs/typescript-collections/src/lib/MultiDictionary", "libs/typescript-collections/src/lib/FactoryDictionary", "libs/typescript-collections/src/lib/Queue", "libs/typescript-collections/src/lib/PriorityQueue", "libs/typescript-collections/src/lib/Set", "libs/typescript-collections/src/lib/Stack", "libs/typescript-collections/src/lib/MultiRootTree", "libs/typescript-collections/src/lib/util"], function (exports_21, context_21) {
    "use strict";
    var _arrays, arrays, _util, util;
    var __moduleName = context_21 && context_21.id;
    return {
        setters: [
            function (_arrays_1) {
                _arrays = _arrays_1;
            },
            function (Bag_1_1) {
                exports_21({
                    "Bag": Bag_1_1["default"]
                });
            },
            function (BSTree_1_1) {
                exports_21({
                    "BSTree": BSTree_1_1["default"]
                });
            },
            function (Dictionary_6_1) {
                exports_21({
                    "Dictionary": Dictionary_6_1["default"]
                });
            },
            function (Heap_2_1) {
                exports_21({
                    "Heap": Heap_2_1["default"]
                });
            },
            function (LinkedDictionary_1_1) {
                exports_21({
                    "LinkedDictionary": LinkedDictionary_1_1["default"]
                });
            },
            function (LinkedList_3_1) {
                exports_21({
                    "LinkedList": LinkedList_3_1["default"]
                });
            },
            function (MultiDictionary_1_1) {
                exports_21({
                    "MultiDictionary": MultiDictionary_1_1["default"]
                });
            },
            function (FactoryDictionary_1_1) {
                exports_21({
                    "FactoryDictionary": FactoryDictionary_1_1["default"]
                });
                exports_21({
                    "DefaultDictionary": FactoryDictionary_1_1["default"]
                });
            },
            function (Queue_2_1) {
                exports_21({
                    "Queue": Queue_2_1["default"]
                });
            },
            function (PriorityQueue_1_1) {
                exports_21({
                    "PriorityQueue": PriorityQueue_1_1["default"]
                });
            },
            function (Set_2_1) {
                exports_21({
                    "Set": Set_2_1["default"]
                });
            },
            function (Stack_1_1) {
                exports_21({
                    "Stack": Stack_1_1["default"]
                });
            },
            function (MultiRootTree_1_1) {
                exports_21({
                    "MultiRootTree": MultiRootTree_1_1["default"]
                });
            },
            function (_util_1) {
                _util = _util_1;
            }
        ],
        execute: function () {
            exports_21("arrays", arrays = _arrays);
            exports_21("util", util = _util);
        }
    };
});
System.register("Xaml/jupiter/UIElementCollection", ["libs/typescript-collections/src/lib/index"], function (exports_22, context_22) {
    "use strict";
    var index_1, UIElementCollection;
    var __moduleName = context_22 && context_22.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            UIElementCollection = class UIElementCollection extends index_1.LinkedDictionary {
            };
            exports_22("UIElementCollection", UIElementCollection);
        }
    };
});
System.register("Xaml/jupiter/controls/Animation", ["Xaml/jupiter/UIElement", "Xaml/jupiter/controls/Core"], function (exports_23, context_23) {
    "use strict";
    var UIElement_1, Core_1, Animation;
    var __moduleName = context_23 && context_23.id;
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
            };
            exports_23("Animation", Animation);
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
System.register("Xaml/jupiter/controls/Animations", ["Xaml/jupiter/UIElement", "Xaml/jupiter/controls/Core"], function (exports_25, context_25) {
    "use strict";
    var UIElement_2, Core_2, Animations;
    var __moduleName = context_25 && context_25.id;
    return {
        setters: [
            function (UIElement_2_1) {
                UIElement_2 = UIElement_2_1;
            },
            function (Core_2_1) {
                Core_2 = Core_2_1;
            }
        ],
        execute: function () {
            Animations = class Animations extends UIElement_2.UIElement {
                get Animations() { return this._animations; }
                set Animations(value) { this._animations = value; }
                constructor() {
                    super();
                    this._animations = new Core_2.AnimationCollection();
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                }
            };
            exports_25("Animations", Animations);
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
    var Core_3, AnimatableUIElement;
    var __moduleName = context_27 && context_27.id;
    return {
        setters: [
            function (Core_3_1) {
                Core_3 = Core_3_1;
            }
        ],
        execute: function () {
            AnimatableUIElement = class AnimatableUIElement extends Core_3.UIElement {
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
System.register("Xaml/jupiter/IRender", [], function (exports_30, context_30) {
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
            function (UIElement_3_1) {
                exportStar_1(UIElement_3_1);
            },
            function (UIElementCollection_1_1) {
                exportStar_1(UIElementCollection_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("Xaml/behaviors/MeshNormalLines", [], function (exports_33, context_33) {
    "use strict";
    var MeshNormalLines;
    var __moduleName = context_33 && context_33.id;
    return {
        setters: [],
        execute: function () {
            MeshNormalLines = class MeshNormalLines {
                constructor() {
                }
                static Install(scene, mesh) {
                    this.ShowNormals(mesh, 0.25, new BABYLON.Color3(1, 0, 0), scene.Scene);
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
            exports_33("MeshNormalLines", MeshNormalLines);
        }
    };
});
System.register("Xaml/jupiter/controls/KeyFrame", ["Xaml/jupiter/Core"], function (exports_34, context_34) {
    "use strict";
    var Core_4, KeyFrame;
    var __moduleName = context_34 && context_34.id;
    return {
        setters: [
            function (Core_4_1) {
                Core_4 = Core_4_1;
            }
        ],
        execute: function () {
            KeyFrame = class KeyFrame extends Core_4.UIElement {
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
            };
            exports_34("KeyFrame", KeyFrame);
        }
    };
});
System.register("Xaml/jupiter/controls/KeyFrames", ["Xaml/jupiter/UIElement", "Xaml/jupiter/controls/Core"], function (exports_35, context_35) {
    "use strict";
    var UIElement_4, Core_5, KeyFrames;
    var __moduleName = context_35 && context_35.id;
    return {
        setters: [
            function (UIElement_4_1) {
                UIElement_4 = UIElement_4_1;
            },
            function (Core_5_1) {
                Core_5 = Core_5_1;
            }
        ],
        execute: function () {
            KeyFrames = class KeyFrames extends UIElement_4.UIElement {
                get KeyFrames() { return this._keyFrames; }
                set KeyFrames(value) { this._keyFrames = value; }
                constructor() {
                    super();
                    this._keyFrames = new Core_5.KeyFrameCollection();
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
            };
            exports_35("KeyFrames", KeyFrames);
        }
    };
});
System.register("Xaml/jupiter/controls/Box", ["Xaml/behaviors/MeshNormalLines", "Xaml/jupiter/AnimatableUIElement"], function (exports_36, context_36) {
    "use strict";
    var MeshNormalLines_1, AnimatableUIElement_2, Box;
    var __moduleName = context_36 && context_36.id;
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
                get ShowNormalLines() { return this._showNormalLines; }
                get Width() { return this._width; }
                get InfiniteDistance() { return this._infiniteDistance; }
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    let material = this.VT.Get(this.MaterialName);
                    this._scene = this.VT.Get(this.SceneName);
                    this._mesh = BABYLON.Mesh.CreateBox(this.Name, this._width, scene.Scene);
                    this._mesh.material = material.Material;
                    if (this.Position != undefined)
                        this._mesh.position = this.Position;
                    if (this.InfiniteDistance !== undefined)
                        this._mesh.infiniteDistance = this._infiniteDistance;
                    if (this._showNormalLines !== undefined && this._showNormalLines)
                        MeshNormalLines_1.MeshNormalLines.Install(scene, this._mesh);
                    if (this.Animations && this.Animations.Animations)
                        this.Animations.Animations.forEach((animation) => {
                            var animationBox = new BABYLON.Animation(animation.Name, animation.TargetProperty, animation.FPS, animation.DataType, animation.LoopMode);
                            animationBox.setKeys(animation.KeyFrames.GetArray());
                            this._mesh.animations.push(animationBox);
                        });
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
                }
                StartAnimation() {
                    if (this.Animations && this.Animations.Animations)
                        this.Animations.Animations.forEach((animation) => {
                            this._scene.Scene.beginAnimation(this._mesh, 1, 100, true);
                        });
                }
                StopAnimation() {
                    if (this.Animations && this.Animations.Animations)
                        this.Animations.Animations.forEach((animation) => {
                            this._scene.Scene.stopAnimation(this._mesh);
                        });
                }
            };
            exports_36("Box", Box);
        }
    };
});
System.register("Xaml/jupiter/controls/Camera", ["Xaml/jupiter/UIElement", "Xaml/Core"], function (exports_37, context_37) {
    "use strict";
    var UIElement_5, Core_6, Camera;
    var __moduleName = context_37 && context_37.id;
    return {
        setters: [
            function (UIElement_5_1) {
                UIElement_5 = UIElement_5_1;
            },
            function (Core_6_1) {
                Core_6 = Core_6_1;
            }
        ],
        execute: function () {
            Camera = class Camera extends UIElement_5.UIElement {
                get Camera() { return this._camera; }
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
                Initialize() {
                    let canvas = Core_6.DIContainer.get("rootCanvas");
                    let scene = this.VT.Get(this.SceneName);
                    if (this._type === "FreeCamera") {
                        this._camera = new BABYLON.FreeCamera(this.Name, this.Position, scene.Scene);
                        if (this._target !== undefined)
                            this.GetFreeCamera(this._camera).setTarget(this._target);
                        if (this.FOV !== undefined)
                            this.GetFreeCamera(this._camera).fov = this.FOV;
                        if (this.MinZ !== undefined)
                            this.GetFreeCamera(this._camera).minZ = this.MinZ;
                        if (this.MaxZ !== undefined)
                            this.GetFreeCamera(this._camera).maxZ = this.MaxZ;
                    }
                    else if (this._type === "UniversalCamera") {
                        this._camera = new BABYLON.UniversalCamera(this.Name, this.Position, scene.Scene);
                        this._camera.setTarget(this._target);
                    }
                    else if (this._type === "ArcRotateCamera") {
                        let arcCampera = new BABYLON.ArcRotateCamera(this.Name, this._alpha, this._beta, this._radius, this._target, scene.Scene);
                        if (this._lowerBetaLimit)
                            arcCampera.lowerBetaLimit = this._lowerBetaLimit;
                        if (this._upperBetaLimit)
                            arcCampera.upperBetaLimit = this._upperBetaLimit;
                        if (this._lowerRadiusLimit)
                            arcCampera.lowerRadiusLimit = this._lowerRadiusLimit;
                        this._camera = arcCampera;
                    }
                    this._camera.attachControl(canvas, true);
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
                        this._beta = parseFloat(node.attributes["Beta"].value);
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
                }
                GetFreeCamera(camera) {
                    return camera;
                }
            };
            exports_37("Camera", Camera);
        }
    };
});
System.register("Xaml/jupiter/controls/Panel", ["Xaml/jupiter/FrameworkElement", "Xaml/jupiter/UIElementCollection"], function (exports_38, context_38) {
    "use strict";
    var FrameworkElement_2, UIElementCollection_2, Panel;
    var __moduleName = context_38 && context_38.id;
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
            exports_38("Panel", Panel);
        }
    };
});
System.register("Xaml/jupiter/controls/Grid", ["Xaml/jupiter/controls/Panel"], function (exports_39, context_39) {
    "use strict";
    var Panel_1, Grid;
    var __moduleName = context_39 && context_39.id;
    return {
        setters: [
            function (Panel_1_1) {
                Panel_1 = Panel_1_1;
            }
        ],
        execute: function () {
            Grid = class Grid extends Panel_1.Panel {
            };
            exports_39("Grid", Grid);
        }
    };
});
System.register("Xaml/jupiter/controls/Texture", ["Xaml/jupiter/Core"], function (exports_40, context_40) {
    "use strict";
    var Core_7, Texture;
    var __moduleName = context_40 && context_40.id;
    return {
        setters: [
            function (Core_7_1) {
                Core_7 = Core_7_1;
            }
        ],
        execute: function () {
            Texture = class Texture extends Core_7.UIElement {
                get Texture() { return this._texture; }
                get SceneName() { return this._sceneName; }
                get RootUrl() { return this._rootUrl; }
                get Type() { return this._type; }
                get CoordinatesMode() { return this._coordinatesMode; }
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    if (this._type === "CubeTexture") {
                        this._texture = new BABYLON.CubeTexture(this.RootUrl, scene.Scene);
                    }
                    else if (this._type === "DynamicTexture") {
                        this._texture = new BABYLON.DynamicTexture(this.Name, 512, scene.Scene, true);
                    }
                    if (this._texture !== undefined) {
                        if (this._coordinatesMode !== undefined)
                            this._texture.coordinatesMode = this._coordinatesMode;
                    }
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
                        this._coordinatesMode = eval(`BABYLON.${node.attributes["CoordinatesMode"].value};`);
                    }
                    catch (e) { }
                }
            };
            exports_40("Texture", Texture);
        }
    };
});
System.register("Xaml/jupiter/controls/Material", ["Xaml/jupiter/UIElement"], function (exports_41, context_41) {
    "use strict";
    var UIElement_6, Material;
    var __moduleName = context_41 && context_41.id;
    return {
        setters: [
            function (UIElement_6_1) {
                UIElement_6 = UIElement_6_1;
            }
        ],
        execute: function () {
            Material = class Material extends UIElement_6.UIElement {
                get Material() { return this._material; }
                get SceneName() { return this._sceneName; }
                get Wireframe() { return this._wireframe; }
                get DiffuseColor() { return this._diffuseColor; }
                get SpecularColor() { return this._specularColor; }
                get EmissiveColor() { return this._emissiveColor; }
                get DisableLighting() { return this._disableLighting; }
                get BackFaceCulling() { return this._backFaceCulling; }
                get ReflectionTextureName() { return this._reflectionTextureName; }
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    this._material = new BABYLON.StandardMaterial(this.Name, scene.Scene);
                    this._material.wireframe = this._wireframe;
                    if (this._diffuseColor !== undefined)
                        this.GetStandardMaterial(this._material).diffuseColor = this._diffuseColor;
                    if (this._specularColor !== undefined)
                        this.GetStandardMaterial(this._material).specularColor = this._specularColor;
                    if (this._emissiveColor !== undefined)
                        this.GetStandardMaterial(this._material).emissiveColor = this._emissiveColor;
                    if (this._disableLighting !== undefined)
                        this.GetStandardMaterial(this._material).disableLighting = this._disableLighting;
                    if (this._backFaceCulling !== undefined)
                        this.GetStandardMaterial(this._material).backFaceCulling = this._backFaceCulling;
                    if (this._reflectionTextureName !== undefined) {
                        let rt = this.VT.Get(this.ReflectionTextureName);
                        if (rt.Texture !== undefined && rt.Texture.isReadyOrNotBlocking)
                            this.GetStandardMaterial(this._material).reflectionTexture = rt.Texture;
                    }
                    ;
                }
                LoadFromNode(node) {
                    super.LoadFromNode(node);
                    try {
                        this._sceneName = node.attributes["Scene"].value;
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
            exports_41("Material", Material);
        }
    };
});
System.register("Xaml/jupiter/controls/Ground", ["Xaml/jupiter/UIElement"], function (exports_42, context_42) {
    "use strict";
    var UIElement_7, Ground;
    var __moduleName = context_42 && context_42.id;
    return {
        setters: [
            function (UIElement_7_1) {
                UIElement_7 = UIElement_7_1;
            }
        ],
        execute: function () {
            Ground = class Ground extends UIElement_7.UIElement {
                get Mesh() { return this._mesh; }
                get SceneName() { return this._sceneName; }
                get Width() { return this._width; }
                get Height() { return this._height; }
                get SubDivisions() { return this._subdivisions; }
                get MaterialName() { return this._materialName; }
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    let material = this.VT.Get(this.MaterialName);
                    this._mesh = BABYLON.Mesh.CreateGround(this.Name, this._width, this._height, this._subdivisions, scene.Scene, false);
                    if (material && material.Material)
                        this._mesh.material = material.Material;
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
            exports_42("Ground", Ground);
        }
    };
});
System.register("Xaml/jupiter/controls/KeyFrameCollection", ["libs/typescript-collections/src/lib/index"], function (exports_43, context_43) {
    "use strict";
    var lib_2, KeyFrameCollection;
    var __moduleName = context_43 && context_43.id;
    return {
        setters: [
            function (lib_2_1) {
                lib_2 = lib_2_1;
            }
        ],
        execute: function () {
            KeyFrameCollection = class KeyFrameCollection extends lib_2.LinkedList {
            };
            exports_43("KeyFrameCollection", KeyFrameCollection);
        }
    };
});
System.register("Xaml/jupiter/controls/Light", ["Xaml/jupiter/UIElement"], function (exports_44, context_44) {
    "use strict";
    var UIElement_8, Light;
    var __moduleName = context_44 && context_44.id;
    return {
        setters: [
            function (UIElement_8_1) {
                UIElement_8 = UIElement_8_1;
            }
        ],
        execute: function () {
            Light = class Light extends UIElement_8.UIElement {
                get Light() { return this._light; }
                get SceneName() { return this._sceneName; }
                get Direction() { return this._direction; }
                get Type() { return this._type; }
                get DiffuseColor() { return this._diffuseColor; }
                get SpecularColor() { return this._specularColor; }
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    if (this._type === "HemisphericLight")
                        this._light = new BABYLON.HemisphericLight(this.Name, this._direction, scene.Scene);
                    else if (this._type === "PointLight") {
                        let pl = new BABYLON.PointLight(this.Name, this._direction, scene.Scene);
                        if (this._diffuseColor)
                            pl.diffuse = this._diffuseColor;
                        if (this._specularColor)
                            pl.specular = this._specularColor;
                        this._light = pl;
                    }
                    else if (this._type === "DirectionalLight") {
                        let pl = new BABYLON.DirectionalLight(this.Name, this._direction, scene.Scene);
                        if (this._diffuseColor)
                            pl.diffuse = this._diffuseColor;
                        if (this._specularColor)
                            pl.specular = this._specularColor;
                        this._light = pl;
                    }
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
                }
                cleanBabylonColor3Attribute(color3) {
                    if (color3.includes("Color3."))
                        return `BABYLON.${color3};`;
                    return `new BABYLON.${color3};`;
                }
            };
            exports_44("Light", Light);
        }
    };
});
System.register("Xaml/behaviors/SceneMouseWheelZoom", [], function (exports_45, context_45) {
    "use strict";
    var SceneMouseWheelZoom;
    var __moduleName = context_45 && context_45.id;
    return {
        setters: [],
        execute: function () {
            SceneMouseWheelZoom = class SceneMouseWheelZoom {
                constructor() {
                }
                static Install(scene) {
                    scene.Scene.onPrePointerObservable.add((pointerInfo, eventState) => {
                        var event = pointerInfo.event;
                        var delta = 0;
                        if (event.wheelDelta)
                            delta = event.wheelDelta;
                        else if (event.detail)
                            delta = -event.detail;
                        if (delta) {
                            var dir = scene.Scene.activeCamera.getDirection(BABYLON.Axis.Z);
                            if (delta > 0)
                                scene.Scene.activeCamera.position.addInPlace(dir);
                            else
                                scene.Scene.activeCamera.position.subtractInPlace(dir);
                        }
                    }, BABYLON.PointerEventTypes.POINTERWHEEL, false);
                }
            };
            exports_45("SceneMouseWheelZoom", SceneMouseWheelZoom);
        }
    };
});
System.register("services/VisualTree", ["inversify", "libs/typescript-collections/src/lib/index"], function (exports_46, context_46) {
    "use strict";
    var inversify_1, lib_3, VisualTree;
    var __moduleName = context_46 && context_46.id;
    return {
        setters: [
            function (inversify_1_1) {
                inversify_1 = inversify_1_1;
            },
            function (lib_3_1) {
                lib_3 = lib_3_1;
            }
        ],
        execute: function () {
            VisualTree = class VisualTree {
                constructor() {
                    this._flatList = new lib_3.Dictionary();
                }
                Add(key, value) {
                    if (key === undefined || key === null) {
                        return;
                    }
                    this._flatList.setValue(key, value);
                }
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
            exports_46("VisualTree", VisualTree);
        }
    };
});
System.register("Xaml/behaviors/MoveSelectedMesh", ["Xaml/Core", "services/VisualTree"], function (exports_47, context_47) {
    "use strict";
    var Core_8, VisualTree_1, MoveSelectedMesh;
    var __moduleName = context_47 && context_47.id;
    return {
        setters: [
            function (Core_8_1) {
                Core_8 = Core_8_1;
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
                    let vt = Core_8.DIContainer.get(VisualTree_1.VisualTree);
                    this.canvas = canvas;
                    this.ground = vt.Get(groundName);
                    this.camera = vt.Get(cameraName);
                    this.scene = scene;
                    canvas.addEventListener("pointerdown", (evt) => { this.onPointerDown(evt); }, false);
                    canvas.addEventListener("pointerup", () => { this.onPointerUp(); }, false);
                    canvas.addEventListener("pointermove", (evt) => { this.onPointerMove(evt); }, false);
                    scene.Scene.onDispose = function () {
                        canvas.removeEventListener("pointerdown", this.onPointerDown);
                        canvas.removeEventListener("pointerup", this.onPointerUp);
                        canvas.removeEventListener("pointermove", this.onPointerMove);
                    };
                }
                getGroundPosition() {
                    var pickinfo = this.scene.Scene.pick(this.scene.Scene.pointerX, this.scene.Scene.pointerY, (mesh) => { return mesh == this.ground.Mesh; });
                    if (pickinfo.hit)
                        return pickinfo.pickedPoint;
                    return null;
                }
                onPointerDown(evt) {
                    if (evt.button !== 0)
                        return;
                    if (this.ground === undefined || this.ground === null)
                        return;
                    var pickInfo = this.scene.Scene.pick(this.scene.Scene.pointerX, this.scene.Scene.pointerY, (mesh) => { return mesh !== this.ground.Mesh; });
                    if (pickInfo.hit) {
                        this.currentMesh = pickInfo.pickedMesh;
                        this.startingPoint = this.getGroundPosition();
                        if (this.startingPoint) {
                            setTimeout(() => {
                                this.camera.Camera.detachControl(this.canvas);
                            }, 0);
                        }
                    }
                }
                onPointerUp() {
                    if (this.startingPoint) {
                        this.camera.Camera.attachControl(this.canvas, true);
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
            exports_47("MoveSelectedMesh", MoveSelectedMesh);
        }
    };
});
System.register("Xaml/behaviors/CustomScript", [], function (exports_48, context_48) {
    "use strict";
    var CustomScript;
    var __moduleName = context_48 && context_48.id;
    return {
        setters: [],
        execute: function () {
            CustomScript = class CustomScript {
                constructor() {
                }
                static Install(vt, code) {
                    eval(code);
                }
            };
            exports_48("CustomScript", CustomScript);
        }
    };
});
System.register("Xaml/jupiter/controls/Scene", ["Xaml/jupiter/UIElement", "Xaml/behaviors/SceneMouseWheelZoom", "Xaml/behaviors/MoveSelectedMesh", "Xaml/Core", "Xaml/behaviors/CustomScript"], function (exports_49, context_49) {
    "use strict";
    var UIElement_9, SceneMouseWheelZoom_1, MoveSelectedMesh_1, Core_9, CustomScript_1, Scene;
    var __moduleName = context_49 && context_49.id;
    return {
        setters: [
            function (UIElement_9_1) {
                UIElement_9 = UIElement_9_1;
            },
            function (SceneMouseWheelZoom_1_1) {
                SceneMouseWheelZoom_1 = SceneMouseWheelZoom_1_1;
            },
            function (MoveSelectedMesh_1_1) {
                MoveSelectedMesh_1 = MoveSelectedMesh_1_1;
            },
            function (Core_9_1) {
                Core_9 = Core_9_1;
            },
            function (CustomScript_1_1) {
                CustomScript_1 = CustomScript_1_1;
            }
        ],
        execute: function () {
            Scene = class Scene extends UIElement_9.UIElement {
                get Scene() { return this._scene; }
                get GroundName() { return this._groundName; }
                get CameraName() { return this._cameraName; }
                get LightName() { return this._lightName; }
                get ClearColor() { return this._clearColor; }
                constructor() {
                    super();
                }
                Initialize() {
                    let engine = Core_9.DIContainer.get("rootEngine");
                    let canvas = Core_9.DIContainer.get("rootCanvas");
                    this._scene = new BABYLON.Scene(engine);
                    if (this._clearColor)
                        this._scene.clearColor = this.convertColor3ToColor4(this._clearColor);
                    SceneMouseWheelZoom_1.SceneMouseWheelZoom.Install(this);
                    new MoveSelectedMesh_1.MoveSelectedMesh().Install(this, canvas, this.GroundName, this.CameraName);
                    if (this.HasScript) {
                        try {
                            CustomScript_1.CustomScript.Install(this.VT, this.Code);
                        }
                        catch (e) {
                            var found = e;
                        }
                    }
                    engine.runRenderLoop(() => {
                        this._scene.render();
                    });
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
            exports_49("Scene", Scene);
        }
    };
});
System.register("Xaml/jupiter/controls/Script", ["Xaml/jupiter/UIElement"], function (exports_50, context_50) {
    "use strict";
    var UIElement_10, Script;
    var __moduleName = context_50 && context_50.id;
    return {
        setters: [
            function (UIElement_10_1) {
                UIElement_10 = UIElement_10_1;
            }
        ],
        execute: function () {
            Script = class Script extends UIElement_10.UIElement {
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
            };
            exports_50("Script", Script);
        }
    };
});
System.register("Xaml/jupiter/controls/Sphere", ["Xaml/jupiter/UIElement", "Xaml/behaviors/MeshNormalLines"], function (exports_51, context_51) {
    "use strict";
    var UIElement_11, MeshNormalLines_2, Sphere;
    var __moduleName = context_51 && context_51.id;
    return {
        setters: [
            function (UIElement_11_1) {
                UIElement_11 = UIElement_11_1;
            },
            function (MeshNormalLines_2_1) {
                MeshNormalLines_2 = MeshNormalLines_2_1;
            }
        ],
        execute: function () {
            Sphere = class Sphere extends UIElement_11.UIElement {
                get Mesh() { return this._mesh; }
                get SceneName() { return this._sceneName; }
                get MaterialName() { return this._materialName; }
                get ShowNormalLines() { return this._showNormalLines; }
                get Segments() { return this._segments; }
                get Diameter() { return this._diameter; }
                Initialize() {
                    let scene = this.VT.Get(this.SceneName);
                    let material = this.VT.Get(this.MaterialName);
                    this._mesh = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: this._segments, diameter: this._diameter }, scene.Scene);
                    this._mesh.position = this.Position;
                    this._mesh.material = material.Material;
                    if (this._showNormalLines)
                        MeshNormalLines_2.MeshNormalLines.Install(scene, this._mesh);
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
            exports_51("Sphere", Sphere);
        }
    };
});
System.register("Xaml/jupiter/controls/Torus", ["Xaml/behaviors/MeshNormalLines", "Xaml/jupiter/AnimatableUIElement"], function (exports_52, context_52) {
    "use strict";
    var MeshNormalLines_3, AnimatableUIElement_3, Torus;
    var __moduleName = context_52 && context_52.id;
    return {
        setters: [
            function (MeshNormalLines_3_1) {
                MeshNormalLines_3 = MeshNormalLines_3_1;
            },
            function (AnimatableUIElement_3_1) {
                AnimatableUIElement_3 = AnimatableUIElement_3_1;
            }
        ],
        execute: function () {
            Torus = class Torus extends AnimatableUIElement_3.AnimatableUIElement {
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
                    this._mesh = BABYLON.Mesh.CreateTorus(this.Name, this._diameter, this._thickness, this._tesselation, scene.Scene);
                    this._mesh.material = material.Material;
                    this._mesh.position = this.Position;
                    if (this._showNormalLines)
                        MeshNormalLines_3.MeshNormalLines.Install(scene, this._mesh);
                    if (this.Animations && this.Animations.Animations)
                        this.Animations.Animations.forEach((animation) => {
                            var animationBox = new BABYLON.Animation(animation.Name, animation.TargetProperty, animation.FPS, animation.DataType, animation.LoopMode);
                            animationBox.setKeys(animation.KeyFrames.GetArray());
                            this._mesh.animations.push(animationBox);
                        });
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
                            this._scene.Scene.beginAnimation(this._mesh, 1, 100, true);
                        });
                }
                StopAnimation() {
                    if (this.Animations && this.Animations.Animations)
                        this.Animations.Animations.forEach((animation) => {
                            this._scene.Scene.stopAnimation(this._mesh);
                        });
                }
            };
            exports_52("Torus", Torus);
        }
    };
});
System.register("Xaml/jupiter/controls/Core", ["Xaml/jupiter/controls/Animation", "Xaml/jupiter/controls/AnimationCollection", "Xaml/jupiter/controls/Animations", "Xaml/jupiter/controls/Box", "Xaml/jupiter/controls/Camera", "Xaml/jupiter/controls/Grid", "Xaml/jupiter/controls/Ground", "Xaml/jupiter/controls/KeyFrame", "Xaml/jupiter/controls/KeyFrameCollection", "Xaml/jupiter/controls/KeyFrames", "Xaml/jupiter/controls/Light", "Xaml/jupiter/controls/Panel", "Xaml/jupiter/controls/Scene", "Xaml/jupiter/controls/Script", "Xaml/jupiter/controls/Sphere", "Xaml/jupiter/controls/Texture", "Xaml/jupiter/controls/Torus", "Xaml/jupiter/controls/Material"], function (exports_53, context_53) {
    "use strict";
    var __moduleName = context_53 && context_53.id;
    function exportStar_2(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_53(exports);
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
            function (Box_1_1) {
                exportStar_2(Box_1_1);
            },
            function (Camera_1_1) {
                exportStar_2(Camera_1_1);
            },
            function (Grid_1_1) {
                exportStar_2(Grid_1_1);
            },
            function (Ground_1_1) {
                exportStar_2(Ground_1_1);
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
            function (Light_1_1) {
                exportStar_2(Light_1_1);
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
            function (Sphere_1_1) {
                exportStar_2(Sphere_1_1);
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
System.register("Xaml/jupiter/controls/IAnimationsElement", [], function (exports_54, context_54) {
    "use strict";
    var __moduleName = context_54 && context_54.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Xaml/jupiter/UIElement", ["Xaml/jupiter/DependencyObject", "Xaml/DataTypes/Guid", "services/VisualTree", "Xaml/Core"], function (exports_55, context_55) {
    "use strict";
    var DependencyObject_2, Guid_1, VisualTree_2, Core_10, UIElement;
    var __moduleName = context_55 && context_55.id;
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
            function (Core_10_1) {
                Core_10 = Core_10_1;
            }
        ],
        execute: function () {
            UIElement = class UIElement extends DependencyObject_2.DependencyObject {
                constructor() {
                    super();
                    this._isDirty = true;
                    this._position = new BABYLON.Vector3(0, 0, 0);
                    this._hasScript = false;
                    this.VT = Core_10.DIContainer.get(VisualTree_2.VisualTree);
                    this._uniqueId = Guid_1.Guid.newGuid();
                }
                get Parent() { return this._parent; }
                get IsVisible() { return this._isVisible; }
                get IsDirty() { return this._isDirty; }
                get UniqueID() { return this._uniqueId; }
                get Name() { return this._name; }
                get Position() { return this._position; }
                get Code() { return this._code; }
                get HasScript() { return this._hasScript; }
                set Parent(value) { this._parent = value; }
                set IsVisible(value) { this._isVisible = value; }
                set IsDirty(value) { this._isDirty = value; }
                set UniqueID(value) { this._uniqueId = value; }
                set Name(value) { this._name = value; this.VT.Add(value, this); }
                set Code(value) { this._code = value; }
                set HasScript(value) { this._hasScript = value; }
                LoadFromNode(node) {
                    try {
                        this._position = eval(`new BABYLON.${node.attributes["Position"].value};`);
                    }
                    catch (e) { }
                }
                Initialize() { }
            };
            exports_55("UIElement", UIElement);
        }
    };
});
System.register("Xaml/jupiter/FrameworkElement", ["Xaml/jupiter/UIElement"], function (exports_56, context_56) {
    "use strict";
    var UIElement_12, FrameworkElement;
    var __moduleName = context_56 && context_56.id;
    return {
        setters: [
            function (UIElement_12_1) {
                UIElement_12 = UIElement_12_1;
            }
        ],
        execute: function () {
            FrameworkElement = class FrameworkElement extends UIElement_12.UIElement {
                get Width() { return this._width; }
                get Height() { return this._height; }
                set Width(value) { this._width = value; }
                set Height(value) { this._height = value; }
                constructor() {
                    super();
                }
            };
            exports_56("FrameworkElement", FrameworkElement);
        }
    };
});
System.register("Xaml/reader/XamlParser", ["Xaml/jupiter/controls/Core", "Xaml/jupiter/Core"], function (exports_57, context_57) {
    "use strict";
    var _controls, Core_11, Core_12, XamlParser;
    var __moduleName = context_57 && context_57.id;
    return {
        setters: [
            function (_controls_1) {
                _controls = _controls_1;
                Core_12 = _controls_1;
            },
            function (Core_11_1) {
                Core_11 = Core_11_1;
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
                    if (nodeAsAFrameWorkElement != null && parent != null) {
                        nodeAsAFrameWorkElement.Parent = parent;
                        if (nodeAsAFrameWorkElement instanceof Core_12.Animations && parent instanceof Core_11.AnimatableUIElement)
                            parent.Animations = nodeAsAFrameWorkElement;
                        if (nodeAsAFrameWorkElement instanceof Core_12.KeyFrames && parent instanceof Core_12.Animation)
                            parent.KeyFrames = nodeAsAFrameWorkElement;
                        if (nodeAsAFrameWorkElement instanceof Core_12.Animation && parent instanceof Core_12.Animations)
                            parent.Animations.add(nodeAsAFrameWorkElement);
                        if (nodeAsAFrameWorkElement instanceof Core_12.KeyFrame && parent instanceof Core_12.KeyFrames)
                            parent.KeyFrames.add(nodeAsAFrameWorkElement);
                        if (nodeAsAFrameWorkElement instanceof Core_12.Script && nodeAsAFrameWorkElement.HasScript) {
                            parent.HasScript = true;
                            parent.Code = nodeAsAFrameWorkElement.Code;
                        }
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
                        if ('LoadFromNode' in newObject)
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
            exports_57("XamlParser", XamlParser);
        }
    };
});
System.register("Xaml/App", ["Xaml/reader/XamlParser", "Xaml/jupiter/Core", "Xaml/jupiter/controls/Core", "services/VisualTree", "Xaml/Core"], function (exports_58, context_58) {
    "use strict";
    var XamlParser_1, Core_13, Core_14, VisualTree_3, Core_15, App;
    var __moduleName = context_58 && context_58.id;
    return {
        setters: [
            function (XamlParser_1_1) {
                XamlParser_1 = XamlParser_1_1;
            },
            function (Core_13_1) {
                Core_13 = Core_13_1;
            },
            function (Core_14_1) {
                Core_14 = Core_14_1;
            },
            function (VisualTree_3_1) {
                VisualTree_3 = VisualTree_3_1;
            },
            function (Core_15_1) {
                Core_15 = Core_15_1;
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
                    Core_15.DIContainer.bind(VisualTree_3.VisualTree).to(VisualTree_3.VisualTree).inSingletonScope();
                    Core_15.DIContainer.bind("rootCanvas").toConstantValue(rootCanvas);
                    Core_15.DIContainer.bind("rootEngine").toConstantValue(rootEngine);
                }
                BuildVisualTree() {
                    this._rootElement = XamlParser_1.XamlParser.XamlMarkupToUIElement(this.xamlMarkup);
                }
                RenderScene() {
                    if (this._rootElement instanceof Core_14.Panel) {
                        let vt = this._rootElement;
                        if (vt.Children)
                            this.InitializeChildren(vt.Children);
                        if (vt.Children)
                            this.AnimateChildren(vt.Children);
                    }
                }
                AnimateChildren(col) {
                    col.forEach((k, v) => {
                        if (v instanceof Core_13.AnimatableUIElement) {
                            let animateableCHild = v;
                            animateableCHild.StartAnimation();
                        }
                    });
                }
                InitializeChildren(col) {
                    col.forEach((k, v) => {
                        v.Initialize();
                        if (v instanceof Core_14.Panel) {
                            let childWithChildren = v;
                            if (childWithChildren.Children.size() > 0) {
                                this.InitializeChildren(childWithChildren.Children);
                            }
                            ;
                        }
                    });
                }
            };
            exports_58("App", App);
        }
    };
});
System.register("Xaml/reader/XamlReader", ["Xaml/reader/XamlMarkup"], function (exports_59, context_59) {
    "use strict";
    var XamlMarkup_1, XamlReader;
    var __moduleName = context_59 && context_59.id;
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
            exports_59("XamlReader", XamlReader);
        }
    };
});
System.register("Xaml/Core", ["Xaml/App", "Xaml/reader/XamlReader", "Xaml/reader/XamlParser", "Xaml/reader/XamlMarkup", "services/VisualTree", "Xaml/jupiter/controls/Core", "inversify", "Xaml/DataTypes/Guid"], function (exports_60, context_60) {
    "use strict";
    var _controls, inversify_2, Controls, DIContainer;
    var __moduleName = context_60 && context_60.id;
    var exportedNames_1 = {
        "Controls": true,
        "DIContainer": true
    };
    function exportStar_3(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_60(exports);
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
            exports_60("Controls", Controls = _controls);
            exports_60("DIContainer", DIContainer = new inversify_2.Container());
        }
    };
});
System.register("bootstrap/XamlApp", ["reflect-metadata", "Xaml/Core"], function (exports_61, context_61) {
    "use strict";
    var XamlGLCore, XamlApp;
    var __moduleName = context_61 && context_61.id;
    return {
        setters: [
            function (_1) {
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
            exports_61("XamlApp", XamlApp);
        }
    };
});
//# sourceMappingURL=allsrc2.js.map
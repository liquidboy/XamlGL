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
System.register("XamlGL/Events/IEventArgs", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/Events/IEvent", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/Jupiter/Platform/IRenderer", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/Jupiter/Platform/IControlRenderer", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/DataTypes/Thickness", [], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var Thickness;
    return {
        setters:[],
        execute: function() {
            Thickness = class Thickness {
                constructor(value) {
                    this.Left = value;
                    this.Top = value;
                    this.Right = value;
                    this.Bottom = value;
                }
            };
            exports_7("Thickness", Thickness);
        }
    }
});
System.register("XamlGL/DataTypes/HorizontalAlignment", [], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var HorizontalAlignment;
    return {
        setters:[],
        execute: function() {
            (function (HorizontalAlignment) {
                HorizontalAlignment[HorizontalAlignment["Left"] = 0] = "Left";
                HorizontalAlignment[HorizontalAlignment["Center"] = 1] = "Center";
                HorizontalAlignment[HorizontalAlignment["Right"] = 2] = "Right";
                HorizontalAlignment[HorizontalAlignment["Stretch"] = 3] = "Stretch";
            })(HorizontalAlignment || (HorizontalAlignment = {}));
            exports_8("HorizontalAlignment", HorizontalAlignment);
        }
    }
});
System.register("XamlGL/DataTypes/VerticalAlignment", [], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var VerticalAlignment;
    return {
        setters:[],
        execute: function() {
            (function (VerticalAlignment) {
                VerticalAlignment[VerticalAlignment["Top"] = 0] = "Top";
                VerticalAlignment[VerticalAlignment["Center"] = 1] = "Center";
                VerticalAlignment[VerticalAlignment["Bottom"] = 2] = "Bottom";
                VerticalAlignment[VerticalAlignment["Stretch"] = 3] = "Stretch";
            })(VerticalAlignment || (VerticalAlignment = {}));
            exports_9("VerticalAlignment", VerticalAlignment);
        }
    }
});
System.register("XamlGL/Jupiter/IFrameworkElement", [], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/Jupiter/Platform/IPlatform", [], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/Jupiter/IUIElement", [], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/DataTypes/Guid", [], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
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
            exports_13("Guid", Guid);
        }
    }
});
System.register("XamlGL/Jupiter/UIElement", ["XamlGL/Jupiter/DependencyObject", "XamlGL/DataTypes/Guid"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var DependencyObject_1, Guid_1;
    var UIElement;
    return {
        setters:[
            function (DependencyObject_1_1) {
                DependencyObject_1 = DependencyObject_1_1;
            },
            function (Guid_1_1) {
                Guid_1 = Guid_1_1;
            }],
        execute: function() {
            UIElement = class UIElement extends DependencyObject_1.DependencyObject {
                constructor() {
                    super();
                    this._isDirty = true;
                    this._uniqueId = Guid_1.Guid.newGuid();
                }
                get IsVisible() { return this._isVisible; }
                get IsDirty() { return this._isDirty; }
                get Platform() { return this._platform; }
                get UniqueID() { return this._uniqueId; }
                set IsVisible(value) { this._isVisible = value; }
                set IsDirty(value) { this._isDirty = value; }
                set Platform(value) { this._platform = value; }
                set UniqueID(value) { this._uniqueId = value; }
            };
            exports_14("UIElement", UIElement);
        }
    }
});
System.register("XamlGL/Events/EventDispatcher", [], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
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
            exports_15("EventDispatcher", EventDispatcher);
        }
    }
});
System.register("XamlGL/DataTypes/DockPosition", [], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var DockPosition;
    return {
        setters:[],
        execute: function() {
            (function (DockPosition) {
                DockPosition[DockPosition["Left"] = 0] = "Left";
                DockPosition[DockPosition["Top"] = 1] = "Top";
                DockPosition[DockPosition["Right"] = 2] = "Right";
                DockPosition[DockPosition["Bottom"] = 3] = "Bottom";
            })(DockPosition || (DockPosition = {}));
            exports_16("DockPosition", DockPosition);
        }
    }
});
System.register("XamlGL/Jupiter/FrameworkElement", ["XamlGL/Jupiter/UIElement", "XamlGL/Events/EventDispatcher", "XamlGL/DataTypes/Thickness", "XamlGL/DataTypes/DockPosition"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var UIElement_1, EventDispatcher_1, Thickness_1, DockPosition_1;
    var FrameworkElement;
    return {
        setters:[
            function (UIElement_1_1) {
                UIElement_1 = UIElement_1_1;
            },
            function (EventDispatcher_1_1) {
                EventDispatcher_1 = EventDispatcher_1_1;
            },
            function (Thickness_1_1) {
                Thickness_1 = Thickness_1_1;
            },
            function (DockPosition_1_1) {
                DockPosition_1 = DockPosition_1_1;
            }],
        execute: function() {
            FrameworkElement = class FrameworkElement extends UIElement_1.UIElement {
                constructor() {
                    super();
                    this._hasToolTip = false;
                    this._tooltipDockPosition = DockPosition_1.DockPosition.Top;
                    this._isTooltipVisible = false;
                    this._propertyChanged = new EventDispatcher_1.EventDispatcher();
                    this._focusChanged = new EventDispatcher_1.EventDispatcher();
                    this.Margin = new Thickness_1.Thickness(0);
                    this.IsTooltipVisible = false;
                }
                get Width() { return this._width; }
                get Height() { return this._height; }
                get Margin() { return this._margin; }
                get Renderer() { return this._renderer; }
                get HorizontalAlignment() { return this._horizontalAlignment; }
                get VerticalAlignment() { return this._verticalAlignment; }
                get Parent() { return this._parent; }
                get CalculatedX() { return this._calculatedX; }
                get CalculatedY() { return this._calculatedY; }
                get CalculatedWidth() { return this._calculatedWidth; }
                get CalculatedHeight() { return this._calculatedHeight; }
                get BlurAmount() { return this._blurAmount; }
                get HasToolTip() { return this._hasToolTip; }
                get TooltipDockPosition() { return this._tooltipDockPosition; }
                get IsTooltipVisible() { return this._isTooltipVisible; }
                set Width(value) { this._width = value; }
                set Height(value) { this._height = value; }
                set Margin(value) { this._margin = value; }
                set Renderer(value) { this._renderer = value; }
                set HorizontalAlignment(value) { this._horizontalAlignment = value; }
                set VerticalAlignment(value) { this._verticalAlignment = value; }
                set Parent(value) { this._parent = value; }
                set CalculatedX(value) { this._calculatedX = value; }
                set CalculatedY(value) { this._calculatedY = value; }
                set CalculatedWidth(value) { this._calculatedWidth = value; }
                set CalculatedHeight(value) { this._calculatedHeight = value; }
                set BlurAmount(value) { this._blurAmount = value; }
                set HasToolTip(value) { this._hasToolTip = value; }
                set TooltipDockPosition(value) { this._tooltipDockPosition = value; }
                set IsTooltipVisible(value) { this._isTooltipVisible = value; }
                get PropertyChanged() { return this._propertyChanged; }
                get FocusChanged() { return this._focusChanged; }
            };
            exports_17("FrameworkElement", FrameworkElement);
        }
    }
});
System.register("XamlGL/Jupiter/Control", ["XamlGL/Jupiter/FrameworkElement"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
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
            exports_18("Control", Control);
        }
    }
});
System.register("XamlGL/Jupiter/UserControl", ["XamlGL/Jupiter/Control"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
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
            exports_19("UserControl", UserControl);
        }
    }
});
System.register("XamlGL/Jupiter/Page", ["XamlGL/Jupiter/UserControl", "XamlGL/Events/EventDispatcher"], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
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
                constructor() {
                    super(...arguments);
                    this._contentChanged = new EventDispatcher_2.EventDispatcher();
                }
                get Content() { return this._content; }
                get ContentChanged() { return this._contentChanged; }
                set Content(value) {
                    this._content = value;
                    this._contentChanged.dispatch(this, null);
                }
            };
            exports_20("Page", Page);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/IPlatformPage", [], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("Libs/typescript-collections/src/lib/util", [], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
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
    exports_22("defaultCompare", defaultCompare);
    function defaultEquals(a, b) {
        return a === b;
    }
    exports_22("defaultEquals", defaultEquals);
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
    exports_22("defaultToString", defaultToString);
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
    exports_22("makeString", makeString);
    function isFunction(func) {
        return (typeof func) === 'function';
    }
    exports_22("isFunction", isFunction);
    function isUndefined(obj) {
        return (typeof obj) === 'undefined';
    }
    exports_22("isUndefined", isUndefined);
    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    exports_22("isString", isString);
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
    exports_22("reverseCompareFunction", reverseCompareFunction);
    function compareToEquals(compareFunction) {
        return function (a, b) {
            return compareFunction(a, b) === 0;
        };
    }
    exports_22("compareToEquals", compareToEquals);
    return {
        setters:[],
        execute: function() {
            _hasOwnProperty = Object.prototype.hasOwnProperty;
            exports_22("has", has = function (obj, prop) {
                return _hasOwnProperty.call(obj, prop);
            });
        }
    }
});
System.register("Libs/typescript-collections/src/lib/arrays", ["Libs/typescript-collections/src/lib/util"], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
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
    exports_23("indexOf", indexOf);
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
    exports_23("lastIndexOf", lastIndexOf);
    function contains(array, item, equalsFunction) {
        return indexOf(array, item, equalsFunction) >= 0;
    }
    exports_23("contains", contains);
    function remove(array, item, equalsFunction) {
        const index = indexOf(array, item, equalsFunction);
        if (index < 0) {
            return false;
        }
        array.splice(index, 1);
        return true;
    }
    exports_23("remove", remove);
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
    exports_23("frequency", frequency);
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
    exports_23("equals", equals);
    function copy(array) {
        return array.concat();
    }
    exports_23("copy", copy);
    function swap(array, i, j) {
        if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
            return false;
        }
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return true;
    }
    exports_23("swap", swap);
    function toString(array) {
        return '[' + array.toString() + ']';
    }
    exports_23("toString", toString);
    function forEach(array, callback) {
        for (const ele of array) {
            if (callback(ele) === false) {
                return;
            }
        }
    }
    exports_23("forEach", forEach);
    return {
        setters:[
            function (util_1) {
                util = util_1;
            }],
        execute: function() {
        }
    }
});
System.register("Libs/typescript-collections/src/lib/Dictionary", ["Libs/typescript-collections/src/lib/util"], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
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
            exports_24("default", Dictionary);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/Set", ["Libs/typescript-collections/src/lib/util", "Libs/typescript-collections/src/lib/arrays", "Libs/typescript-collections/src/lib/Dictionary"], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
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
            exports_25("default", Set);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/Bag", ["Libs/typescript-collections/src/lib/util", "Libs/typescript-collections/src/lib/Dictionary", "Libs/typescript-collections/src/lib/Set"], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
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
            exports_26("default", Bag);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/LinkedList", ["Libs/typescript-collections/src/lib/util", "Libs/typescript-collections/src/lib/arrays"], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
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
            exports_27("default", LinkedList);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/Heap", ["Libs/typescript-collections/src/lib/util", "Libs/typescript-collections/src/lib/arrays"], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
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
            exports_28("default", Heap);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/Queue", ["Libs/typescript-collections/src/lib/LinkedList"], function(exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
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
            exports_29("default", Queue);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/BSTree", ["Libs/typescript-collections/src/lib/util", "Libs/typescript-collections/src/lib/Queue"], function(exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
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
            exports_30("default", BSTree);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/LinkedDictionary", ["Libs/typescript-collections/src/lib/Dictionary", "Libs/typescript-collections/src/lib/util"], function(exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
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
            exports_31("default", LinkedDictionary);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/MultiDictionary", ["Libs/typescript-collections/src/lib/util", "Libs/typescript-collections/src/lib/Dictionary", "Libs/typescript-collections/src/lib/arrays"], function(exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
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
            exports_32("default", MultiDictionary);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/FactoryDictionary", ["Libs/typescript-collections/src/lib/Dictionary", "Libs/typescript-collections/src/lib/util"], function(exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
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
            exports_33("default", FactoryDictionary);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/PriorityQueue", ["Libs/typescript-collections/src/lib/util", "Libs/typescript-collections/src/lib/Heap"], function(exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
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
            exports_34("default", PriorityQueue);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/Stack", ["Libs/typescript-collections/src/lib/LinkedList"], function(exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
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
            exports_35("default", Stack);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/MultiRootTree", [], function(exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
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
            exports_36("default", MultiRootTree);
        }
    }
});
System.register("Libs/typescript-collections/src/lib/index", ["Libs/typescript-collections/src/lib/arrays", "Libs/typescript-collections/src/lib/Bag", "Libs/typescript-collections/src/lib/BSTree", "Libs/typescript-collections/src/lib/Dictionary", "Libs/typescript-collections/src/lib/Heap", "Libs/typescript-collections/src/lib/LinkedDictionary", "Libs/typescript-collections/src/lib/LinkedList", "Libs/typescript-collections/src/lib/MultiDictionary", "Libs/typescript-collections/src/lib/FactoryDictionary", "Libs/typescript-collections/src/lib/Queue", "Libs/typescript-collections/src/lib/PriorityQueue", "Libs/typescript-collections/src/lib/Set", "Libs/typescript-collections/src/lib/Stack", "Libs/typescript-collections/src/lib/MultiRootTree", "Libs/typescript-collections/src/lib/util"], function(exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var _arrays, _util;
    var arrays, util;
    return {
        setters:[
            function (_arrays_1) {
                _arrays = _arrays_1;
            },
            function (Bag_1_1) {
                exports_37({
                    "Bag": Bag_1_1["default"]
                });
            },
            function (BSTree_1_1) {
                exports_37({
                    "BSTree": BSTree_1_1["default"]
                });
            },
            function (Dictionary_6_1) {
                exports_37({
                    "Dictionary": Dictionary_6_1["default"]
                });
            },
            function (Heap_2_1) {
                exports_37({
                    "Heap": Heap_2_1["default"]
                });
            },
            function (LinkedDictionary_1_1) {
                exports_37({
                    "LinkedDictionary": LinkedDictionary_1_1["default"]
                });
            },
            function (LinkedList_3_1) {
                exports_37({
                    "LinkedList": LinkedList_3_1["default"]
                });
            },
            function (MultiDictionary_1_1) {
                exports_37({
                    "MultiDictionary": MultiDictionary_1_1["default"]
                });
            },
            function (FactoryDictionary_1_1) {
                exports_37({
                    "FactoryDictionary": FactoryDictionary_1_1["default"]
                });
                exports_37({
                    "DefaultDictionary": FactoryDictionary_1_1["default"]
                });
            },
            function (Queue_2_1) {
                exports_37({
                    "Queue": Queue_2_1["default"]
                });
            },
            function (PriorityQueue_1_1) {
                exports_37({
                    "PriorityQueue": PriorityQueue_1_1["default"]
                });
            },
            function (Set_2_1) {
                exports_37({
                    "Set": Set_2_1["default"]
                });
            },
            function (Stack_1_1) {
                exports_37({
                    "Stack": Stack_1_1["default"]
                });
            },
            function (MultiRootTree_1_1) {
                exports_37({
                    "MultiRootTree": MultiRootTree_1_1["default"]
                });
            },
            function (_util_1) {
                _util = _util_1;
            }],
        execute: function() {
            exports_37("arrays", arrays = _arrays);
            exports_37("util", util = _util);
        }
    }
});
System.register("XamlGL/Utils/ConsoleHelper", [], function(exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var ConsoleHelper;
    return {
        setters:[],
        execute: function() {
            ConsoleHelper = class ConsoleHelper {
                static LogSectionHeader(title) {
                    console.log("\u005F".repeat(title.length));
                    console.log(title);
                    console.log("\u203E".repeat(title.length));
                }
                static LogSection(title) {
                    console.log("\u2212\u2212\u2212\u2282" + " " + title + " " + "\u2283\u2212\u2212\u2212");
                }
                static Log(title) {
                    console.log("\u2609 " + title);
                }
                static LogPad(title, padding) {
                    let uc = "\u2609 ";
                    if (padding === 5) {
                        uc = "\u22EF ";
                    }
                    console.log(" ".repeat(padding) + uc + title);
                }
            };
            exports_38("ConsoleHelper", ConsoleHelper);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Renderer", ["XamlGL/DataTypes/Guid", "Libs/typescript-collections/src/lib/index", "XamlGL/Utils/ConsoleHelper", "XamlGL/Events/EventDispatcher"], function(exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var Guid_2, index_1, ConsoleHelper_1, EventDispatcher_3;
    var Renderer, RendererFactory, RendererResource;
    return {
        setters:[
            function (Guid_2_1) {
                Guid_2 = Guid_2_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (ConsoleHelper_1_1) {
                ConsoleHelper_1 = ConsoleHelper_1_1;
            },
            function (EventDispatcher_3_1) {
                EventDispatcher_3 = EventDispatcher_3_1;
            }],
        execute: function() {
            Renderer = class Renderer {
                constructor(width, height, antialias, transparent, htmlCanvasHost) {
                    this._draw = new EventDispatcher_3.EventDispatcher();
                    this._pointerPressed = new EventDispatcher_3.EventDispatcher();
                    this._pointerReleased = new EventDispatcher_3.EventDispatcher();
                    this._pointerTapped = new EventDispatcher_3.EventDispatcher();
                    this._loadingBackground = null;
                    this._loadingText = null;
                    ConsoleHelper_1.ConsoleHelper.Log("Renderer.constructor");
                    this._uniqueId = Guid_2.Guid.newGuid();
                    this._resourceIds = new index_1.Dictionary();
                    this._stage = new PIXI.Container();
                    this._renderer = RendererFactory.GetRenderer(width, height, antialias, transparent);
                    htmlCanvasHost.append(this.PixiRenderer.view);
                    this.InitializeTink();
                    this.RenderLoop.call(this);
                }
                get UniqueID() { return this.UniqueID; }
                get PixiStage() { return this._stage; }
                get Pointer() { return this._tinkPointer; }
                get PixiRenderer() { return this._renderer; }
                get Draw() { return this._draw; }
                get PointerPressed() { return this._pointerPressed; }
                get PointerReleased() { return this._pointerReleased; }
                get PointerTapped() { return this._pointerTapped; }
                set Border(value) { this.PixiRenderer.view.style.border = value; }
                set BackgroundColor(value) { this.PixiRenderer.backgroundColor = value; }
                Resize(width, height) {
                    this.PixiRenderer.autoResize = true;
                    this.PixiRenderer.resize(width, height);
                }
                ResizeFull() {
                    this.ResizeFullWidth(window.innerHeight);
                }
                ResizeFullWidth(height) {
                    this.PixiRenderer.view.style.position = "absolute";
                    this.PixiRenderer.view.style.display = "block";
                    this.PixiRenderer.view.style.border = "0";
                    this.Resize(window.innerWidth, height);
                    document.body.style.overflow = "hidden";
                    let win = window;
                    let pp = win.PlatformPage;
                    pp.Width = window.innerWidth;
                    pp.Height = height;
                }
                InitializeResource(key, url) {
                    let rr = this._resourceIds.getValue(key);
                    if (rr === undefined) {
                        this._resourceIds.setValue(key, new RendererResource(url));
                        return this.LoadResourceImage(url);
                    }
                    else {
                        return null;
                    }
                }
                InitializeTink() {
                    this._tink = new TinkLib(PIXI, this.PixiRenderer.view);
                    this._tinkPointer = this._tink.makePointer();
                    this._tinkPointer.visible = true;
                    this._tinkPointer.press = () => this._pointerPressed.dispatch(this, null);
                    this._tinkPointer.release = () => this._pointerReleased.dispatch(this, null);
                    this._tinkPointer.tap = () => this._pointerTapped.dispatch(this, null);
                }
                LoadResourceImage(url) {
                    return PIXI.loader.add(url);
                }
                LoadResource(key, container, x, y, width, height) {
                    let resource = this._resourceIds.getValue(key);
                    if (resource.Sprite === null) {
                        let resourceId = resource.Url;
                        let rect = new PIXI.Rectangle(0, 0, width, height);
                        let texture = PIXI.loader.resources[resourceId].texture;
                        texture.frame = rect;
                        resource.Sprite = new PIXI.Sprite(texture);
                    }
                    resource.Sprite.x = x;
                    resource.Sprite.y = y;
                    container.addChild(resource.Sprite);
                }
                ShowResource(key, container, x, y, width, height) {
                    this.LoadResource(key, container, x, y, width, height);
                    this._renderer.render(container);
                }
                HideResource(key, container) {
                    let resource = this._resourceIds.getValue(key);
                    if (resource.Sprite !== null) {
                        container.removeChild(resource.Sprite);
                        this._renderer.render(container);
                    }
                }
                ShowLoading() {
                    if (this._loadingBackground === null) {
                        this._loadingBackground = new PIXI.Graphics();
                        this._loadingBackground.beginFill(0xF9F9F9);
                        this._loadingBackground.drawRect(0, 0, this._stage.width, this._stage.height);
                        this._loadingBackground.endFill();
                        this._stage.addChild(this._loadingBackground);
                    }
                    if (this._loadingText === null) {
                        this._loadingText = new PIXI.Text("loading...", { font: "20px sans-serif", fill: "black" });
                        this._loadingText.position.set(((this._stage.width - 90) / 2), (((this._stage.height - 22) / 2) + 90));
                        this._stage.addChild(this._loadingText);
                    }
                    this.ShowResource("loading", this._stage, ((this._stage.width - 165) / 2), ((this._stage.height - 165) / 2), 165, 165);
                }
                HideLoading() {
                    if (this._loadingBackground !== null) {
                        this._stage.removeChild(this._loadingBackground);
                        this._loadingBackground = null;
                    }
                    if (this._loadingText !== null) {
                        this._stage.removeChild(this._loadingText);
                        this._loadingText = null;
                    }
                    this.HideResource("loading", this._stage);
                }
                InitializeLoadingResource(url) {
                    return this.InitializeResource("loading", url);
                }
                RenderLoop() {
                    this._tink.update();
                    this._draw.dispatch(this, null);
                    this._renderer.render(this.PixiStage);
                    window.requestAnimationFrame(this.RenderLoop.bind(this));
                }
            };
            exports_39("Renderer", Renderer);
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
            exports_39("RendererFactory", RendererFactory);
            RendererResource = class RendererResource {
                constructor(Url) {
                    this.Url = Url;
                    this.Sprite = null;
                }
            };
            exports_39("RendererResource", RendererResource);
        }
    }
});
System.register("XamlGL/Jupiter/UIElementCollection", ["Libs/typescript-collections/src/lib/index"], function(exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
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
            exports_40("UIElementCollection", UIElementCollection);
        }
    }
});
System.register("XamlGL/Controls/Panel", ["XamlGL/Jupiter/FrameworkElement", "XamlGL/Jupiter/UIElementCollection", "XamlGL/Events/EventDispatcher"], function(exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var FrameworkElement_2, UIElementCollection_1, EventDispatcher_4;
    var Panel;
    return {
        setters:[
            function (FrameworkElement_2_1) {
                FrameworkElement_2 = FrameworkElement_2_1;
            },
            function (UIElementCollection_1_1) {
                UIElementCollection_1 = UIElementCollection_1_1;
            },
            function (EventDispatcher_4_1) {
                EventDispatcher_4 = EventDispatcher_4_1;
            }],
        execute: function() {
            Panel = class Panel extends FrameworkElement_2.FrameworkElement {
                constructor() {
                    super();
                    this._childAdded = new EventDispatcher_4.EventDispatcher();
                    this._childRemoved = new EventDispatcher_4.EventDispatcher();
                    this._children = new UIElementCollection_1.UIElementCollection();
                }
                get Children() { return this._children; }
                get Background() { return this._background; }
                get Foreground() { return this._foreground; }
                get ChildAdded() { return this._childAdded; }
                get ChildRemoved() { return this._childRemoved; }
                set Children(value) { this._children = value; }
                set Background(value) { this._background = value; }
                set Foreground(value) { this._foreground = value; }
            };
            exports_41("Panel", Panel);
        }
    }
});
System.register("XamlGL/DataTypes/Point", [], function(exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var Point;
    return {
        setters:[],
        execute: function() {
            Point = class Point {
                constructor(x, y) {
                    this.X = x;
                    this.Y = y;
                }
            };
            exports_42("Point", Point);
        }
    }
});
System.register("XamlGL/DataTypes/CornerRadius", [], function(exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var CornerRadius;
    return {
        setters:[],
        execute: function() {
            CornerRadius = class CornerRadius {
                constructor(radius) {
                    this.TopLeft = radius;
                    this.TopRight = radius;
                    this.BottomRight = radius;
                    this.BottomLeft = radius;
                }
            };
            exports_43("CornerRadius", CornerRadius);
        }
    }
});
System.register("XamlGL/DataTypes/Orientation", [], function(exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    var Orientation;
    return {
        setters:[],
        execute: function() {
            (function (Orientation) {
                Orientation[Orientation["Vertical"] = 0] = "Vertical";
                Orientation[Orientation["Horizontal"] = 1] = "Horizontal";
            })(Orientation || (Orientation = {}));
            exports_44("Orientation", Orientation);
        }
    }
});
System.register("XamlGL/Controls/StackPanel", ["XamlGL/Controls/Panel"], function(exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var Panel_1;
    var StackPanel;
    return {
        setters:[
            function (Panel_1_1) {
                Panel_1 = Panel_1_1;
            }],
        execute: function() {
            StackPanel = class StackPanel extends Panel_1.Panel {
                constructor() {
                    super(...arguments);
                    this._currentItemRenderXY = 0;
                }
                get BorderThickness() { return this._borderThickness; }
                get BorderBrush() { return this._borderBrush; }
                get CornerRadius() { return this._cornerRadius; }
                get CurrentItemRenderXY() { return this._currentItemRenderXY; }
                get Orientation() { return this._orientation; }
                set BorderThickness(value) { this._borderThickness = value; }
                set BorderBrush(value) { this._borderBrush = value; }
                set CornerRadius(value) { this._cornerRadius = value; }
                set CurrentItemRenderXY(value) { this._currentItemRenderXY = value; }
                set Orientation(value) { this._orientation = value; }
            };
            exports_45("StackPanel", StackPanel);
        }
    }
});
System.register("XamlGL/Controls/ToolTip", ["XamlGL/Controls/Panel", "XamlGL/DataTypes/Thickness", "XamlGL/DataTypes/CornerRadius", "XamlGL/DataTypes/HorizontalAlignment", "XamlGL/DataTypes/VerticalAlignment", "XamlGL/DataTypes/DockPosition"], function(exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    var Panel_2, Thickness_2, CornerRadius_1, HorizontalAlignment_1, VerticalAlignment_1, DockPosition_2;
    var ToolTip;
    return {
        setters:[
            function (Panel_2_1) {
                Panel_2 = Panel_2_1;
            },
            function (Thickness_2_1) {
                Thickness_2 = Thickness_2_1;
            },
            function (CornerRadius_1_1) {
                CornerRadius_1 = CornerRadius_1_1;
            },
            function (HorizontalAlignment_1_1) {
                HorizontalAlignment_1 = HorizontalAlignment_1_1;
            },
            function (VerticalAlignment_1_1) {
                VerticalAlignment_1 = VerticalAlignment_1_1;
            },
            function (DockPosition_2_1) {
                DockPosition_2 = DockPosition_2_1;
            }],
        execute: function() {
            ToolTip = class ToolTip extends Panel_2.Panel {
                constructor() {
                    super();
                    this.BorderThickness = new Thickness_2.Thickness(0);
                    this.BorderBrush = "#FFFFFFFF";
                    this.HorizontalAlignment = HorizontalAlignment_1.HorizontalAlignment.Center;
                    this.VerticalAlignment = VerticalAlignment_1.VerticalAlignment.Center;
                    this.Background = "#FFFFFFFF";
                    this.Margin = new Thickness_2.Thickness(0);
                    this.CornerRadius = new CornerRadius_1.CornerRadius(0);
                    this.DockPosition = DockPosition_2.DockPosition.Top;
                }
                get BorderThickness() { return this._borderThickness; }
                get BorderBrush() { return this._borderBrush; }
                get CornerRadius() { return this._cornerRadius; }
                get DockPosition() { return this._dockPosition; }
                set BorderThickness(value) { this._borderThickness = value; }
                set BorderBrush(value) { this._borderBrush = value; }
                set CornerRadius(value) { this._cornerRadius = value; }
                set DockPosition(value) { this._dockPosition = value; }
                ShowToolTip(pointerX, pointerY, width, height, dockPosition) {
                    this.Width = this.CalculatedWidth = width;
                    this.Height = this.CalculatedHeight = height;
                    this.Margin.Left = pointerX;
                    this.Margin.Top = pointerY;
                    this.CornerRadius = new CornerRadius_1.CornerRadius(1);
                    this.DockPosition = dockPosition;
                }
            };
            exports_46("ToolTip", ToolTip);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Controls/BaseRenderer", ["XamlGL/DataTypes/HorizontalAlignment", "XamlGL/DataTypes/VerticalAlignment", "XamlGL/DataTypes/Point", "XamlGL/Controls/Panel", "XamlGL/Events/EventDispatcher", "XamlGL/Utils/ConsoleHelper", "XamlGL/Controls/StackPanel", "XamlGL/DataTypes/Orientation", "XamlGL/Controls/ToolTip"], function(exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    var HorizontalAlignment_2, VerticalAlignment_2, Point_1, Panel_3, EventDispatcher_5, ConsoleHelper_2, StackPanel_1, Orientation_1, ToolTip_1;
    var BaseRenderer;
    return {
        setters:[
            function (HorizontalAlignment_2_1) {
                HorizontalAlignment_2 = HorizontalAlignment_2_1;
            },
            function (VerticalAlignment_2_1) {
                VerticalAlignment_2 = VerticalAlignment_2_1;
            },
            function (Point_1_1) {
                Point_1 = Point_1_1;
            },
            function (Panel_3_1) {
                Panel_3 = Panel_3_1;
            },
            function (EventDispatcher_5_1) {
                EventDispatcher_5 = EventDispatcher_5_1;
            },
            function (ConsoleHelper_2_1) {
                ConsoleHelper_2 = ConsoleHelper_2_1;
            },
            function (StackPanel_1_1) {
                StackPanel_1 = StackPanel_1_1;
            },
            function (Orientation_1_1) {
                Orientation_1 = Orientation_1_1;
            },
            function (ToolTip_1_1) {
                ToolTip_1 = ToolTip_1_1;
            }],
        execute: function() {
            BaseRenderer = class BaseRenderer {
                constructor() {
                    this._tooltip = null;
                    this._elementChanged = new EventDispatcher_5.EventDispatcher();
                    this._scale = 1;
                }
                get Element() { return this._element; }
                get ElementChanged() { return this._elementChanged; }
                get ParentWidth() {
                    if (this._element.Parent !== null) {
                        return this._element.Parent.Width === 0 ? this._element.Parent.CalculatedWidth : this._element.Parent.Width;
                    }
                    return null;
                }
                get ParentHeight() {
                    if (this._element.Parent !== null) {
                        return this._element.Parent.Height === 0 ? this._element.Parent.CalculatedHeight : this._element.Parent.Height;
                    }
                    return null;
                }
                get PixiElement() { return this._pixiElement; }
                get Scale() { return this._scale; }
                set Element(value) {
                    if (value === null && this._element instanceof Panel_3.Panel) {
                        let castPanel = this._element;
                        castPanel.ChildAdded.unsubscribe(this.OnChildAdded);
                        castPanel.ChildRemoved.unsubscribe(this.OnChildRemoved);
                        this._element.Renderer = null;
                        this._element.PropertyChanged.unsubscribe(this.OnPropertyChanged);
                        this._element.FocusChanged.unsubscribe(this.OnFocusChanged);
                        this._element = null;
                        return;
                    }
                    this._element = value;
                    this._element.Renderer = this;
                    this._element.PropertyChanged.subscribe(this.OnPropertyChanged);
                    this._element.FocusChanged.subscribe(this.OnFocusChanged);
                    if (value instanceof Panel_3.Panel) {
                        let castPanel = this._element;
                        castPanel.ChildAdded.subscribe(this.OnChildAdded);
                        castPanel.ChildRemoved.subscribe(this.OnChildRemoved);
                    }
                    else {
                    }
                }
                set PixiElement(value) { this._pixiElement = value; }
                set Scale(value) { this._scale = value; }
                OnPropertyChanged() {
                    ConsoleHelper_2.ConsoleHelper.Log("Platform.OnPropertyChanged");
                }
                OnFocusChanged() {
                    ConsoleHelper_2.ConsoleHelper.Log("Platform.OnFocusChanged");
                }
                OnChildAdded() {
                    ConsoleHelper_2.ConsoleHelper.Log("Platform.OnChildAdded");
                }
                OnChildRemoved() {
                    ConsoleHelper_2.ConsoleHelper.Log("Platform.OnChildRemoved");
                }
                Draw() {
                }
                Clear() {
                }
                CalculateYHeight(backingControl) {
                    if (backingControl.Height !== null && backingControl.Height > 0) {
                        this.Element.CalculatedHeight = backingControl.Height;
                        if (backingControl.VerticalAlignment === VerticalAlignment_2.VerticalAlignment.Bottom) {
                            this.Element.CalculatedY = this.ParentHeight - backingControl.Height;
                        }
                        else if (backingControl.VerticalAlignment === VerticalAlignment_2.VerticalAlignment.Center) {
                            this.Element.CalculatedY = (this.Element.Parent.CalculatedHeight - backingControl.Height) / 2;
                        }
                        else if (backingControl.VerticalAlignment === VerticalAlignment_2.VerticalAlignment.Stretch) {
                            this.Element.CalculatedHeight = this.ParentHeight;
                            this.Element.CalculatedY = 0;
                        }
                        else if (backingControl.VerticalAlignment === VerticalAlignment_2.VerticalAlignment.Top) {
                            this.Element.CalculatedY = 0;
                        }
                    }
                    else {
                        if (backingControl.VerticalAlignment === VerticalAlignment_2.VerticalAlignment.Stretch) {
                            this.Element.CalculatedHeight = this.ParentHeight;
                            this.Element.CalculatedY = 0;
                        }
                        else if (backingControl.VerticalAlignment === VerticalAlignment_2.VerticalAlignment.Top) {
                            this.Element.CalculatedY = 0;
                        }
                    }
                }
                CalculateXWidth(backingControl) {
                    if (backingControl.Width !== null && backingControl.Width > 0) {
                        this.Element.CalculatedWidth = backingControl.Width;
                        this.Element.CalculatedX = 0;
                        if (backingControl.HorizontalAlignment === HorizontalAlignment_2.HorizontalAlignment.Left) {
                            this.Element.CalculatedX = 0;
                        }
                        else if (backingControl.HorizontalAlignment === HorizontalAlignment_2.HorizontalAlignment.Right) {
                            this.Element.CalculatedX = this.ParentWidth - backingControl.Width;
                        }
                        else if (backingControl.HorizontalAlignment === HorizontalAlignment_2.HorizontalAlignment.Stretch) {
                            this.Element.CalculatedWidth = this.ParentWidth;
                            this.Element.CalculatedX = this.ParentWidth - backingControl.Width;
                        }
                        else if (backingControl.HorizontalAlignment === HorizontalAlignment_2.HorizontalAlignment.Center) {
                            this.Element.CalculatedX = (this.Element.Parent.CalculatedWidth - backingControl.Width) / 2;
                        }
                    }
                    else {
                        if (backingControl.HorizontalAlignment === HorizontalAlignment_2.HorizontalAlignment.Stretch) {
                            this.Element.CalculatedWidth = this.ParentWidth;
                            this.Element.CalculatedX = 0;
                        }
                        else if (backingControl.HorizontalAlignment === HorizontalAlignment_2.HorizontalAlignment.Left) {
                            this.Element.CalculatedX = 0;
                        }
                    }
                }
                UpdateCalculatedValuesUsingMargin(backingControl) {
                    if (backingControl.Margin !== null || backingControl.Margin !== undefined) {
                        if (backingControl.HorizontalAlignment === HorizontalAlignment_2.HorizontalAlignment.Left) {
                            this.Element.CalculatedX += this.Element.Margin.Left;
                        }
                        else if (backingControl.HorizontalAlignment === HorizontalAlignment_2.HorizontalAlignment.Right) {
                            this.Element.CalculatedX -= this.Element.Margin.Right;
                        }
                        else if (backingControl.HorizontalAlignment === HorizontalAlignment_2.HorizontalAlignment.Stretch) {
                            this.Element.CalculatedX += this.Element.Margin.Left;
                            this.Element.CalculatedWidth -= (this.Element.Margin.Right + this.Element.Margin.Left);
                        }
                        else if (backingControl.HorizontalAlignment === HorizontalAlignment_2.HorizontalAlignment.Center) {
                            this.Element.CalculatedX += this.Element.Margin.Left;
                            this.Element.CalculatedWidth -= (this.Element.Margin.Right + this.Element.Margin.Left);
                        }
                        if (backingControl.VerticalAlignment === VerticalAlignment_2.VerticalAlignment.Top) {
                            this.Element.CalculatedY += this.Element.Margin.Top;
                        }
                        else if (backingControl.VerticalAlignment === VerticalAlignment_2.VerticalAlignment.Bottom) {
                            this.Element.CalculatedY -= this.Element.Margin.Bottom;
                        }
                        else if (backingControl.VerticalAlignment === VerticalAlignment_2.VerticalAlignment.Stretch) {
                            this.Element.CalculatedY += this.Element.Margin.Top;
                            this.Element.CalculatedHeight -= (this.Element.Margin.Top + this.Element.Margin.Bottom);
                        }
                        else if (backingControl.VerticalAlignment === VerticalAlignment_2.VerticalAlignment.Center) {
                            this.Element.CalculatedY += this.Element.Margin.Top;
                        }
                    }
                }
                CalculateCurrentAvailableSlot() {
                    let parentXStart = 0;
                    let parentYStart = 0;
                    if (this.Element.Parent instanceof StackPanel_1.StackPanel) {
                        let sp = this.Element.Parent;
                        if (sp.Orientation === Orientation_1.Orientation.Horizontal) {
                            parentXStart += sp.CurrentItemRenderXY;
                        }
                        else {
                            parentYStart += sp.CurrentItemRenderXY;
                        }
                    }
                    return new Point_1.Point(parentXStart, parentYStart);
                }
                IncrementNextAvailableSlot() {
                    if (this.Element.Parent instanceof StackPanel_1.StackPanel) {
                        let sp = this.Element.Parent;
                        if (sp.Orientation === Orientation_1.Orientation.Horizontal) {
                            sp.CurrentItemRenderXY += this.Element.CalculatedWidth
                                + ((this.Element.Margin === undefined) ? 0 : (this.Element.Margin.Right + this.Element.Margin.Left));
                        }
                        else {
                            sp.CurrentItemRenderXY += this.Element.CalculatedHeight
                                + ((this.Element.Margin === undefined) ? 0 : (this.Element.Margin.Top + this.Element.Margin.Bottom));
                        }
                    }
                }
                GeneralShowTooltip(position, backgroundColor, x, y, width, height) {
                    if (this._tooltip === null) {
                        this._tooltip = new ToolTip_1.ToolTip();
                    }
                    let buttonParent = this.Element.Parent;
                    this._tooltip.ShowToolTip(x, y, width, height, position);
                    this._tooltip.Background = backgroundColor;
                    if (this.Element.Parent instanceof Panel_3.Panel) {
                        buttonParent.Platform.SetCurrent(this._tooltip, buttonParent);
                        buttonParent.Platform.Draw(this._tooltip);
                    }
                }
                GeneralHideTooltip() {
                    if (this._tooltip !== null || this._tooltip !== undefined) {
                        let buttonParent = this.Element.Parent;
                        this._tooltip.Renderer.Clear();
                        buttonParent.Platform.UnsetCurrent(this._tooltip, buttonParent);
                        this._tooltip = null;
                    }
                }
            };
            exports_47("BaseRenderer", BaseRenderer);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Controls/DefaultRenderer", ["XamlGL/Jupiter/Platform/WebGL/Controls/BaseRenderer", "XamlGL/Utils/ConsoleHelper"], function(exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    var BaseRenderer_1, ConsoleHelper_3;
    var DefaultRenderer;
    return {
        setters:[
            function (BaseRenderer_1_1) {
                BaseRenderer_1 = BaseRenderer_1_1;
            },
            function (ConsoleHelper_3_1) {
                ConsoleHelper_3 = ConsoleHelper_3_1;
            }],
        execute: function() {
            DefaultRenderer = class DefaultRenderer extends BaseRenderer_1.BaseRenderer {
                Draw() {
                    super.Draw();
                    ConsoleHelper_3.ConsoleHelper.Log("DefaultRenderer.Draw");
                    let defaultEl = super.Element;
                    if (!defaultEl.IsDirty) {
                        return;
                    }
                    defaultEl.IsDirty = false;
                }
            };
            exports_48("DefaultRenderer", DefaultRenderer);
        }
    }
});
System.register("XamlGL/Controls/Grid", ["XamlGL/Controls/Panel"], function(exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    var Panel_4;
    var Grid;
    return {
        setters:[
            function (Panel_4_1) {
                Panel_4 = Panel_4_1;
            }],
        execute: function() {
            Grid = class Grid extends Panel_4.Panel {
                get BorderThickness() { return this._borderThickness; }
                get BorderBrush() { return this._borderBrush; }
                get CornerRadius() { return this._cornerRadius; }
                set BorderThickness(value) { this._borderThickness = value; }
                set BorderBrush(value) { this._borderBrush = value; }
                set CornerRadius(value) { this._cornerRadius = value; }
            };
            exports_49("Grid", Grid);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Controls/GridRenderer", ["XamlGL/Jupiter/Platform/WebGL/Controls/BaseRenderer", "XamlGL/Utils/ConsoleHelper", "XamlGL/utils/RendererHelper"], function(exports_50, context_50) {
    "use strict";
    var __moduleName = context_50 && context_50.id;
    var BaseRenderer_2, ConsoleHelper_4, RendererHelper_1;
    var GridRenderer;
    return {
        setters:[
            function (BaseRenderer_2_1) {
                BaseRenderer_2 = BaseRenderer_2_1;
            },
            function (ConsoleHelper_4_1) {
                ConsoleHelper_4 = ConsoleHelper_4_1;
            },
            function (RendererHelper_1_1) {
                RendererHelper_1 = RendererHelper_1_1;
            }],
        execute: function() {
            GridRenderer = class GridRenderer extends BaseRenderer_2.BaseRenderer {
                Draw() {
                    super.Draw();
                    ConsoleHelper_4.ConsoleHelper.Log("GridRenderer.Draw");
                    let gridEl = super.Element;
                    let containerGrid = new PIXI.Container();
                    this.PixiElement = containerGrid;
                    if (!gridEl.IsDirty) {
                        return;
                    }
                    this.CalculateYHeight(gridEl);
                    this.CalculateXWidth(gridEl);
                    this.UpdateCalculatedValuesUsingMargin(gridEl);
                    let parentXYStart = this.CalculateCurrentAvailableSlot();
                    containerGrid.position.set(this.Element.CalculatedX + parentXYStart.X, this.Element.CalculatedY + parentXYStart.Y);
                    if (gridEl.Background !== undefined) {
                        let widthToUse = (gridEl.Width === null || gridEl.Width === 0) ? this.ParentWidth : gridEl.Width;
                        let heightToUse = (gridEl.Height === null || gridEl.Height === 0) ? this.ParentHeight : gridEl.Height;
                        if (this.Element.CalculatedHeight > 0 && heightToUse > this.Element.CalculatedHeight) {
                            heightToUse = this.Element.CalculatedHeight;
                        }
                        if (this.Element.CalculatedWidth > 0 && widthToUse > this.Element.CalculatedWidth) {
                            widthToUse = this.Element.CalculatedWidth;
                        }
                        let rectangle = new PIXI.Graphics();
                        rectangle.beginFill(RendererHelper_1.RendererHelper.HashToColorNumber(gridEl.Background));
                        rectangle.drawRect(0, 0, widthToUse, heightToUse);
                        rectangle.endFill();
                        containerGrid.addChild(rectangle);
                    }
                    this.IncrementNextAvailableSlot();
                    if (super.Element.Parent.Renderer === undefined) {
                        super.Element.Platform.Renderer.PixiStage.addChild(containerGrid);
                    }
                    else {
                        if (super.Element.Parent.Renderer.PixiElement && super.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                            let parentContainer = super.Element.Parent.Renderer.PixiElement;
                            parentContainer.addChild(containerGrid);
                        }
                    }
                    this.Element.Platform.Renderer.Draw.subscribe((r, args) => {
                        if (this.Element && this.Element.Parent && this.Element.Parent.Renderer) {
                            let scale = this.Element.Parent.Renderer.Scale;
                            if (scale !== undefined) {
                                containerGrid.scale.set(scale, scale);
                            }
                        }
                    });
                    gridEl.IsDirty = false;
                }
                Clear() {
                    ConsoleHelper_4.ConsoleHelper.Log("GridRenderer.Clear");
                    if (this.Element.Parent.Renderer === undefined) {
                        this.Element.Platform.Renderer.PixiStage.removeChild(this.PixiElement);
                    }
                    else {
                        if (this.Element.Parent.Renderer.PixiElement && this.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                            let parentContainer = this.Element.Parent.Renderer.PixiElement;
                            parentContainer.removeChild(this.PixiElement);
                        }
                    }
                }
            };
            exports_50("GridRenderer", GridRenderer);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Controls/StackPanelRenderer", ["XamlGL/Jupiter/Platform/WebGL/Controls/BaseRenderer", "XamlGL/Utils/ConsoleHelper", "XamlGL/utils/RendererHelper"], function(exports_51, context_51) {
    "use strict";
    var __moduleName = context_51 && context_51.id;
    var BaseRenderer_3, ConsoleHelper_5, RendererHelper_2;
    var StackPanelRenderer;
    return {
        setters:[
            function (BaseRenderer_3_1) {
                BaseRenderer_3 = BaseRenderer_3_1;
            },
            function (ConsoleHelper_5_1) {
                ConsoleHelper_5 = ConsoleHelper_5_1;
            },
            function (RendererHelper_2_1) {
                RendererHelper_2 = RendererHelper_2_1;
            }],
        execute: function() {
            StackPanelRenderer = class StackPanelRenderer extends BaseRenderer_3.BaseRenderer {
                Draw() {
                    super.Draw();
                    ConsoleHelper_5.ConsoleHelper.Log("StackPanelRenderer.Draw");
                    let gridEl = super.Element;
                    let containerGrid = new PIXI.Container();
                    super.PixiElement = containerGrid;
                    if (!gridEl.IsDirty) {
                        return;
                    }
                    this.CalculateYHeight(gridEl);
                    this.CalculateXWidth(gridEl);
                    this.UpdateCalculatedValuesUsingMargin(gridEl);
                    containerGrid.position.set(this.Element.CalculatedX, this.Element.CalculatedY);
                    containerGrid.height = super.Element.CalculatedHeight;
                    containerGrid.width = super.Element.CalculatedWidth;
                    if (gridEl.Background !== undefined) {
                        let rectangle = new PIXI.Graphics();
                        rectangle.beginFill(RendererHelper_2.RendererHelper.HashToColorNumber(gridEl.Background));
                        rectangle.drawRect(0, 0, super.Element.CalculatedWidth, super.Element.CalculatedHeight);
                        rectangle.endFill();
                        containerGrid.addChild(rectangle);
                    }
                    if (super.Element.Parent.Renderer === undefined) {
                        super.Element.Platform.Renderer.PixiStage.addChild(containerGrid);
                    }
                    else {
                        if (super.Element.Parent.Renderer.PixiElement && super.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                            let parentContainer = super.Element.Parent.Renderer.PixiElement;
                            parentContainer.addChild(containerGrid);
                        }
                    }
                    gridEl.IsDirty = false;
                }
                Clear() {
                    ConsoleHelper_5.ConsoleHelper.Log("StackPanelRenderer.Clear");
                    if (this.Element.Parent.Renderer === undefined) {
                        this.Element.Platform.Renderer.PixiStage.removeChild(this.PixiElement);
                    }
                    else {
                        if (this.Element.Parent.Renderer.PixiElement && this.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                            let parentContainer = this.Element.Parent.Renderer.PixiElement;
                            parentContainer.removeChild(this.PixiElement);
                        }
                    }
                }
            };
            exports_51("StackPanelRenderer", StackPanelRenderer);
        }
    }
});
System.register("XamlGL/Jupiter/DebugSettings", [], function(exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    var DebugSettings;
    return {
        setters:[],
        execute: function() {
            DebugSettings = class DebugSettings {
            };
            exports_52("DebugSettings", DebugSettings);
        }
    }
});
System.register("XamlGL/Jupiter/ApplicationTheme", [], function(exports_53, context_53) {
    "use strict";
    var __moduleName = context_53 && context_53.id;
    var ApplicationTheme;
    return {
        setters:[],
        execute: function() {
            ApplicationTheme = class ApplicationTheme {
            };
            exports_53("ApplicationTheme", ApplicationTheme);
        }
    }
});
System.register("XamlGL/Jupiter/ResourceDictionary", [], function(exports_54, context_54) {
    "use strict";
    var __moduleName = context_54 && context_54.id;
    var ResourceDictionary;
    return {
        setters:[],
        execute: function() {
            ResourceDictionary = class ResourceDictionary {
            };
            exports_54("ResourceDictionary", ResourceDictionary);
        }
    }
});
System.register("XamlGL/Events/EventList", ["XamlGL/Events/EventDispatcher"], function(exports_55, context_55) {
    "use strict";
    var __moduleName = context_55 && context_55.id;
    var EventDispatcher_6;
    var EventList;
    return {
        setters:[
            function (EventDispatcher_6_1) {
                EventDispatcher_6 = EventDispatcher_6_1;
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
                    event = new EventDispatcher_6.EventDispatcher();
                    this._events[name] = event;
                    return event;
                }
                remove(name) {
                    this._events[name] = null;
                }
            };
            exports_55("EventList", EventList);
        }
    }
});
System.register("XamlGL/Jupiter/Application", ["XamlGL/DataTypes/Guid", "XamlGL/Events/EventList"], function(exports_56, context_56) {
    "use strict";
    var __moduleName = context_56 && context_56.id;
    var Guid_3, EventList_1;
    var Application, ActivatedEventArgs, LaunchActivatedEventArgs, ApplicationEventArgs;
    return {
        setters:[
            function (Guid_3_1) {
                Guid_3 = Guid_3_1;
            },
            function (EventList_1_1) {
                EventList_1 = EventList_1_1;
            }],
        execute: function() {
            Application = class Application {
                constructor() {
                    this._events = new EventList_1.EventList();
                    this._sessionId = Guid_3.Guid.newGuid();
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
                    setTimeout(() => { this.dispatch("OnLaunched"); }, 1000);
                }
                dispatch(name) {
                    this._events.get(name).dispatch(this, new ApplicationEventArgs(this.SessionID));
                }
            };
            exports_56("Application", Application);
            ActivatedEventArgs = class ActivatedEventArgs {
                constructor(SessionID) {
                    this.SessionID = SessionID;
                }
            };
            exports_56("ActivatedEventArgs", ActivatedEventArgs);
            LaunchActivatedEventArgs = class LaunchActivatedEventArgs {
                constructor(SessionID) {
                    this.SessionID = SessionID;
                }
            };
            exports_56("LaunchActivatedEventArgs", LaunchActivatedEventArgs);
            ApplicationEventArgs = class ApplicationEventArgs {
                constructor(SessionID) {
                    this.SessionID = SessionID;
                }
            };
            exports_56("ApplicationEventArgs", ApplicationEventArgs);
        }
    }
});
System.register("XamlGL/Jupiter/ImageSource", ["XamlGL/Jupiter/DependencyObject"], function(exports_57, context_57) {
    "use strict";
    var __moduleName = context_57 && context_57.id;
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
            exports_57("ImageSource", ImageSource);
        }
    }
});
System.register("XamlGL/Jupiter/Stretch", [], function(exports_58, context_58) {
    "use strict";
    var __moduleName = context_58 && context_58.id;
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
            exports_58("Stretch", Stretch);
        }
    }
});
System.register("XamlGL/Jupiter/IView", [], function(exports_59, context_59) {
    "use strict";
    var __moduleName = context_59 && context_59.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/Jupiter/View", ["XamlGL/Jupiter/FrameworkElement"], function(exports_60, context_60) {
    "use strict";
    var __moduleName = context_60 && context_60.id;
    var FrameworkElement_3;
    var View;
    return {
        setters:[
            function (FrameworkElement_3_1) {
                FrameworkElement_3 = FrameworkElement_3_1;
            }],
        execute: function() {
            View = class View extends FrameworkElement_3.FrameworkElement {
            };
            exports_60("View", View);
        }
    }
});
System.register("XamlGL/Jupiter/Media/BitmapSource", ["XamlGL/Jupiter/ImageSource"], function(exports_61, context_61) {
    "use strict";
    var __moduleName = context_61 && context_61.id;
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
            exports_61("BitmapSource", BitmapSource);
        }
    }
});
System.register("XamlGL/Jupiter/Media/BitmapImage", ["XamlGL/Jupiter/Media/BitmapSource"], function(exports_62, context_62) {
    "use strict";
    var __moduleName = context_62 && context_62.id;
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
            exports_62("BitmapImage", BitmapImage);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/IImageRenderer", [], function(exports_63, context_63) {
    "use strict";
    var __moduleName = context_63 && context_63.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("XamlGL/Jupiter/Core", ["XamlGL/Jupiter/Application", "XamlGL/Jupiter/ApplicationTheme", "XamlGL/Jupiter/Control", "XamlGL/Jupiter/DebugSettings", "XamlGL/Jupiter/DependencyObject", "XamlGL/Jupiter/FrameworkElement", "XamlGL/Jupiter/ImageSource", "XamlGL/Jupiter/Page", "XamlGL/Jupiter/ResourceDictionary", "XamlGL/Jupiter/Stretch", "XamlGL/Jupiter/UIElement", "XamlGL/Jupiter/UIElementCollection", "XamlGL/Jupiter/UserControl", "XamlGL/Jupiter/View", "XamlGL/Jupiter/Media/BitmapImage", "XamlGL/Jupiter/Media/BitmapSource", "XamlGL/Jupiter/Platform/WebGL/Platform", "XamlGL/Jupiter/Platform/WebGL/Renderer", "XamlGL/Jupiter/Platform/WebGL/PlatformPage"], function(exports_64, context_64) {
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
            function (Page_1_1) {
                exportStar_1(Page_1_1);
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
            function (Platform_1_1) {
                exportStar_1(Platform_1_1);
            },
            function (Renderer_1_1) {
                exportStar_1(Renderer_1_1);
            },
            function (PlatformPage_1_1) {
                exportStar_1(PlatformPage_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("XamlGL/Controls/Image", ["XamlGL/Jupiter/Core"], function(exports_65, context_65) {
    "use strict";
    var __moduleName = context_65 && context_65.id;
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
                get SourceUrl() { return this._sourceUrl; }
                get NineGrid() { return this._nineGrid; }
                get Stretch() { return this._stretch; }
                set Source(value) { this._source = value; }
                set SourceUrl(value) { this._sourceUrl = value; }
                set NineGrid(value) { this._nineGrid = value; }
                set Stretch(value) { this._stretch = value; }
            };
            exports_65("Image", Image);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Controls/ImageRenderer", ["XamlGL/Jupiter/Platform/WebGL/Controls/BaseRenderer", "XamlGL/Utils/ConsoleHelper"], function(exports_66, context_66) {
    "use strict";
    var __moduleName = context_66 && context_66.id;
    var BaseRenderer_4, ConsoleHelper_6;
    var ImageRenderer;
    return {
        setters:[
            function (BaseRenderer_4_1) {
                BaseRenderer_4 = BaseRenderer_4_1;
            },
            function (ConsoleHelper_6_1) {
                ConsoleHelper_6 = ConsoleHelper_6_1;
            }],
        execute: function() {
            ImageRenderer = class ImageRenderer extends BaseRenderer_4.BaseRenderer {
                Draw() {
                    super.Draw();
                    ConsoleHelper_6.ConsoleHelper.Log("ImagetRenderer.Draw");
                    let imageEl = super.Element;
                    let imageContainer = null;
                    if (!imageEl.IsDirty) {
                        return;
                    }
                    if (this.PixiElement === undefined) {
                        imageContainer = new PIXI.Container();
                        this.PixiElement = imageContainer;
                    }
                    else {
                        imageContainer = this.PixiElement;
                    }
                    this.CalculateYHeight(imageEl);
                    this.CalculateXWidth(imageEl);
                    this.UpdateCalculatedValuesUsingMargin(imageEl);
                    super.Element.Platform.Renderer.InitializeResource(imageEl.UniqueID, imageEl.SourceUrl)
                        .load((loader, object) => {
                        let parentXYStart = this.CalculateCurrentAvailableSlot();
                        super.Element.Platform.Renderer.LoadResource(imageEl.UniqueID, imageContainer, super.Element.CalculatedX + parentXYStart.X, super.Element.CalculatedY + parentXYStart.Y, super.Element.CalculatedWidth, super.Element.CalculatedHeight);
                        this.IncrementNextAvailableSlot();
                        let parentContainer = super.Element.Parent.Renderer.PixiElement;
                        parentContainer.addChild(imageContainer);
                    });
                    imageEl.IsDirty = false;
                }
                Clear() {
                    ConsoleHelper_6.ConsoleHelper.Log("ImageRenderer.Clear");
                    if (this.PixiElement !== undefined) {
                        let parentContainer = super.Element.Parent.Renderer.PixiElement;
                        parentContainer.removeChild(this.PixiElement);
                        this.PixiElement = null;
                    }
                }
            };
            exports_66("ImageRenderer", ImageRenderer);
        }
    }
});
System.register("XamlGL/Controls/Rectangle", ["XamlGL/Controls/Panel", "XamlGL/DataTypes/Thickness", "XamlGL/DataTypes/CornerRadius", "XamlGL/DataTypes/HorizontalAlignment", "XamlGL/DataTypes/VerticalAlignment"], function(exports_67, context_67) {
    "use strict";
    var __moduleName = context_67 && context_67.id;
    var Panel_5, Thickness_3, CornerRadius_2, HorizontalAlignment_3, VerticalAlignment_3;
    var Rectangle;
    return {
        setters:[
            function (Panel_5_1) {
                Panel_5 = Panel_5_1;
            },
            function (Thickness_3_1) {
                Thickness_3 = Thickness_3_1;
            },
            function (CornerRadius_2_1) {
                CornerRadius_2 = CornerRadius_2_1;
            },
            function (HorizontalAlignment_3_1) {
                HorizontalAlignment_3 = HorizontalAlignment_3_1;
            },
            function (VerticalAlignment_3_1) {
                VerticalAlignment_3 = VerticalAlignment_3_1;
            }],
        execute: function() {
            Rectangle = class Rectangle extends Panel_5.Panel {
                constructor() {
                    super();
                    this.BorderThickness = new Thickness_3.Thickness(0);
                    this.BorderBrush = "#FFFFFFFF";
                    this.HorizontalAlignment = HorizontalAlignment_3.HorizontalAlignment.Center;
                    this.VerticalAlignment = VerticalAlignment_3.VerticalAlignment.Center;
                    this.Background = "#FFFFFFFF";
                    this.Margin = new Thickness_3.Thickness(0);
                    this.CornerRadius = new CornerRadius_2.CornerRadius(0);
                }
                get BorderThickness() { return this._borderThickness; }
                get BorderBrush() { return this._borderBrush; }
                get CornerRadius() { return this._cornerRadius; }
                set BorderThickness(value) { this._borderThickness = value; }
                set BorderBrush(value) { this._borderBrush = value; }
                set CornerRadius(value) { this._cornerRadius = value; }
            };
            exports_67("Rectangle", Rectangle);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Controls/RectangleRenderer", ["XamlGL/Jupiter/Platform/WebGL/Controls/BaseRenderer", "XamlGL/Utils/ConsoleHelper", "XamlGL/utils/RendererHelper"], function(exports_68, context_68) {
    "use strict";
    var __moduleName = context_68 && context_68.id;
    var BaseRenderer_5, ConsoleHelper_7, RendererHelper_3;
    var RectangleRenderer;
    return {
        setters:[
            function (BaseRenderer_5_1) {
                BaseRenderer_5 = BaseRenderer_5_1;
            },
            function (ConsoleHelper_7_1) {
                ConsoleHelper_7 = ConsoleHelper_7_1;
            },
            function (RendererHelper_3_1) {
                RendererHelper_3 = RendererHelper_3_1;
            }],
        execute: function() {
            RectangleRenderer = class RectangleRenderer extends BaseRenderer_5.BaseRenderer {
                Draw() {
                    super.Draw();
                    ConsoleHelper_7.ConsoleHelper.Log("RectangleRenderer.Draw");
                    let rectEl = super.Element;
                    if (!rectEl.IsDirty) {
                        return;
                    }
                    this.CalculateYHeight(rectEl);
                    this.CalculateXWidth(rectEl);
                    this.UpdateCalculatedValuesUsingMargin(rectEl);
                    let rectangle = new PIXI.Graphics();
                    rectangle.lineStyle(rectEl.BorderThickness.Left, RendererHelper_3.RendererHelper.HashToColorNumber(rectEl.BorderBrush), 1);
                    rectangle.beginFill(RendererHelper_3.RendererHelper.HashToColorNumber(rectEl.Background));
                    rectangle.drawRect(0, 0, super.Element.Width, super.Element.Height);
                    rectangle.endFill();
                    rectangle.x = rectEl.Margin.Left;
                    rectangle.y = rectEl.Margin.Top;
                    this.Element.Platform.Renderer.PixiStage.addChild(rectangle);
                    rectEl.IsDirty = false;
                }
                Clear() {
                    ConsoleHelper_7.ConsoleHelper.Log("RectangleRenderer.Clear");
                    if (this.PixiElement !== undefined) {
                        this.Element.Platform.Renderer.PixiStage.removeChild(this.PixiElement);
                        this.PixiElement = null;
                    }
                }
            };
            exports_68("RectangleRenderer", RectangleRenderer);
        }
    }
});
System.register("XamlGL/DataTypes/TextWrapping", [], function(exports_69, context_69) {
    "use strict";
    var __moduleName = context_69 && context_69.id;
    var TextWrapping;
    return {
        setters:[],
        execute: function() {
            (function (TextWrapping) {
                TextWrapping[TextWrapping["NoWrap"] = 1] = "NoWrap";
                TextWrapping[TextWrapping["Wrap"] = 2] = "Wrap";
                TextWrapping[TextWrapping["WrapWholeWords"] = 3] = "WrapWholeWords";
            })(TextWrapping || (TextWrapping = {}));
            exports_69("TextWrapping", TextWrapping);
        }
    }
});
System.register("XamlGL/DataTypes/TextWrappingAlign", [], function(exports_70, context_70) {
    "use strict";
    var __moduleName = context_70 && context_70.id;
    var TextWrappingAlign;
    return {
        setters:[],
        execute: function() {
            (function (TextWrappingAlign) {
                TextWrappingAlign[TextWrappingAlign["Left"] = 1] = "Left";
                TextWrappingAlign[TextWrappingAlign["Center"] = 2] = "Center";
                TextWrappingAlign[TextWrappingAlign["Right"] = 3] = "Right";
            })(TextWrappingAlign || (TextWrappingAlign = {}));
            exports_70("TextWrappingAlign", TextWrappingAlign);
        }
    }
});
System.register("XamlGL/Controls/TextBlock", ["XamlGL/Jupiter/Core", "XamlGL/DataTypes/TextWrapping", "XamlGL/DataTypes/TextWrappingAlign"], function(exports_71, context_71) {
    "use strict";
    var __moduleName = context_71 && context_71.id;
    var Jupiter, TextWrapping_1, TextWrappingAlign_1;
    var TextBlock;
    return {
        setters:[
            function (Jupiter_2) {
                Jupiter = Jupiter_2;
            },
            function (TextWrapping_1_1) {
                TextWrapping_1 = TextWrapping_1_1;
            },
            function (TextWrappingAlign_1_1) {
                TextWrappingAlign_1 = TextWrappingAlign_1_1;
            }],
        execute: function() {
            TextBlock = class TextBlock extends Jupiter.View {
                constructor() {
                    super(...arguments);
                    this._textWrapping = TextWrapping_1.TextWrapping.NoWrap;
                    this._textWrappingAlign = TextWrappingAlign_1.TextWrappingAlign.Left;
                }
                get Text() { return this._text; }
                get Stretch() { return this._stretch; }
                get Color() { return this._color; }
                get FontSize() { return this._fontSize; }
                get FontFamily() { return this._fontFamily; }
                get TextWrapping() { return this._textWrapping; }
                get TextWrappingAlign() { return this._textWrappingAlign; }
                set Text(value) { this._text = value; }
                set Stretch(value) { this._stretch = value; }
                set Color(value) { this._color = value; }
                set FontSize(value) { this._fontSize = value; }
                set FontFamily(value) { this._fontFamily = value; }
                set TextWrapping(value) { this._textWrapping = value; }
                set TextWrappingAlign(value) { this._textWrappingAlign = value; }
            };
            exports_71("TextBlock", TextBlock);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Controls/TextBlockRenderer", ["XamlGL/Jupiter/Platform/WebGL/Controls/BaseRenderer", "XamlGL/Utils/ConsoleHelper", "XamlGL/DataTypes/HorizontalAlignment", "XamlGL/DataTypes/VerticalAlignment", "XamlGL/DataTypes/TextWrapping", "XamlGL/DataTypes/TextWrappingAlign"], function(exports_72, context_72) {
    "use strict";
    var __moduleName = context_72 && context_72.id;
    var BaseRenderer_6, ConsoleHelper_8, HorizontalAlignment_4, VerticalAlignment_4, TextWrapping_2, TextWrappingAlign_2;
    var TextBlockRenderer;
    return {
        setters:[
            function (BaseRenderer_6_1) {
                BaseRenderer_6 = BaseRenderer_6_1;
            },
            function (ConsoleHelper_8_1) {
                ConsoleHelper_8 = ConsoleHelper_8_1;
            },
            function (HorizontalAlignment_4_1) {
                HorizontalAlignment_4 = HorizontalAlignment_4_1;
            },
            function (VerticalAlignment_4_1) {
                VerticalAlignment_4 = VerticalAlignment_4_1;
            },
            function (TextWrapping_2_1) {
                TextWrapping_2 = TextWrapping_2_1;
            },
            function (TextWrappingAlign_2_1) {
                TextWrappingAlign_2 = TextWrappingAlign_2_1;
            }],
        execute: function() {
            TextBlockRenderer = class TextBlockRenderer extends BaseRenderer_6.BaseRenderer {
                Draw() {
                    super.Draw();
                    ConsoleHelper_8.ConsoleHelper.Log("TextBlockRenderer.Draw");
                    let textEl = super.Element;
                    if (!textEl.IsDirty) {
                        return;
                    }
                    let parentContainer = super.Element.Parent.Renderer.PixiElement;
                    let text = new PIXI.Text(textEl.Text, {
                        font: `${textEl.FontSize}px ${textEl.FontFamily}`,
                        fill: textEl.Color,
                        wordWrap: (textEl.TextWrapping === TextWrapping_2.TextWrapping.Wrap) ? true : false,
                        wordWrapWidth: textEl.Width,
                        align: TextWrappingAlign_2.TextWrappingAlign[textEl.TextWrappingAlign].toLowerCase()
                    });
                    this.CalculateYHeight(textEl);
                    if (textEl.Height !== null && textEl.Height > 0) {
                    }
                    else {
                        if (textEl.VerticalAlignment === VerticalAlignment_4.VerticalAlignment.Bottom) {
                            this.Element.CalculatedY = this.Element.Parent.CalculatedHeight - text.height;
                        }
                        else if (textEl.VerticalAlignment === VerticalAlignment_4.VerticalAlignment.Center) {
                            this.Element.CalculatedY = (this.Element.Parent.CalculatedHeight - text.height) / 2;
                        }
                    }
                    this.CalculateXWidth(textEl);
                    if (textEl.Width !== null && textEl.Width > 0) {
                    }
                    else {
                        if (textEl.HorizontalAlignment === HorizontalAlignment_4.HorizontalAlignment.Right) {
                            this.Element.CalculatedX = this.Element.Parent.CalculatedWidth - text.width;
                        }
                        else if (textEl.HorizontalAlignment === HorizontalAlignment_4.HorizontalAlignment.Center) {
                            this.Element.CalculatedX = (this.Element.Parent.CalculatedWidth - text.width) / 2;
                        }
                    }
                    this.UpdateCalculatedValuesUsingMargin(textEl);
                    let parentXYStart = this.CalculateCurrentAvailableSlot();
                    text.position.set(this.Element.CalculatedX + parentXYStart.X, this.Element.CalculatedY + parentXYStart.Y);
                    parentContainer.addChild(text);
                    this.Element.CalculatedHeight = text.height;
                    this.Element.CalculatedWidth = text.width;
                    this.IncrementNextAvailableSlot();
                    textEl.IsDirty = false;
                }
                Clear() {
                    ConsoleHelper_8.ConsoleHelper.Log("TextBlockRenderer.Clear");
                    let containerMain = null;
                    let pc = this.Element.Parent.Renderer.PixiElement;
                    if (this.PixiElement !== undefined) {
                        containerMain = this.PixiElement;
                        pc.removeChild(this.PixiElement);
                        this.PixiElement = null;
                    }
                }
            };
            exports_72("TextBlockRenderer", TextBlockRenderer);
        }
    }
});
System.register("XamlGL/Controls/Button", ["XamlGL/Controls/Panel"], function(exports_73, context_73) {
    "use strict";
    var __moduleName = context_73 && context_73.id;
    var Panel_6;
    var Button;
    return {
        setters:[
            function (Panel_6_1) {
                Panel_6 = Panel_6_1;
            }],
        execute: function() {
            Button = class Button extends Panel_6.Panel {
                get BorderThickness() { return this._borderThickness; }
                get BorderBrush() { return this._borderBrush; }
                get CornerRadius() { return this._cornerRadius; }
                get ClickStr() { return this._clickStr; }
                set BorderThickness(value) { this._borderThickness = value; }
                set BorderBrush(value) { this._borderBrush = value; }
                set CornerRadius(value) { this._cornerRadius = value; }
                set ClickStr(value) { this._clickStr = value; }
            };
            exports_73("Button", Button);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Controls/ButtonRenderer", ["XamlGL/Jupiter/Platform/WebGL/Controls/BaseRenderer", "XamlGL/Utils/ConsoleHelper", "XamlGL/utils/RendererHelper", "XamlGL/DataTypes/DockPosition"], function(exports_74, context_74) {
    "use strict";
    var __moduleName = context_74 && context_74.id;
    var BaseRenderer_7, ConsoleHelper_9, RendererHelper_4, DockPosition_3;
    var ButtonRenderer;
    return {
        setters:[
            function (BaseRenderer_7_1) {
                BaseRenderer_7 = BaseRenderer_7_1;
            },
            function (ConsoleHelper_9_1) {
                ConsoleHelper_9 = ConsoleHelper_9_1;
            },
            function (RendererHelper_4_1) {
                RendererHelper_4 = RendererHelper_4_1;
            },
            function (DockPosition_3_1) {
                DockPosition_3 = DockPosition_3_1;
            }],
        execute: function() {
            ButtonRenderer = class ButtonRenderer extends BaseRenderer_7.BaseRenderer {
                constructor() {
                    super(...arguments);
                    this._blurToUse = 0;
                    this._isPressed = false;
                }
                Draw() {
                    super.Draw();
                    ConsoleHelper_9.ConsoleHelper.Log("ButtonRenderer.Draw");
                    let buttonEl = super.Element;
                    let containerGrid = null;
                    if (this.PixiElement !== undefined) {
                        containerGrid = this.PixiElement;
                    }
                    else {
                        containerGrid = new PIXI.Container();
                        this.PixiElement = containerGrid;
                    }
                    if (!buttonEl.IsDirty) {
                        return;
                    }
                    this.CalculateYHeight(buttonEl);
                    this.CalculateXWidth(buttonEl);
                    this.UpdateCalculatedValuesUsingMargin(buttonEl);
                    containerGrid.height = this.Element.CalculatedHeight;
                    containerGrid.width = this.Element.CalculatedWidth;
                    let background = null;
                    let blurFilter = null;
                    if (buttonEl.Background !== undefined) {
                        let widthToUse = (buttonEl.Width === null || buttonEl.Width === 0) ? this.ParentWidth : buttonEl.Width;
                        let heightToUse = (buttonEl.Height === null || buttonEl.Height === 0) ? this.ParentHeight : buttonEl.Height;
                        background = new PIXI.Graphics();
                        if (buttonEl.BorderThickness !== null && buttonEl.BorderThickness.Left > 0) {
                            background.lineStyle(buttonEl.BorderThickness.Left, RendererHelper_4.RendererHelper.HashToColorNumber(buttonEl.BorderBrush), 1);
                        }
                        background.beginFill(RendererHelper_4.RendererHelper.HashToColorNumber(buttonEl.Background), 1);
                        if (buttonEl.CornerRadius.TopLeft > 0) {
                            background.drawRoundedRect(0, 0, widthToUse, heightToUse, buttonEl.CornerRadius.TopLeft);
                        }
                        else {
                            background.drawRect(0, 0, widthToUse, heightToUse);
                        }
                        background.boundsPadding = buttonEl.BlurAmount * 2;
                        background.endFill();
                        var texture = background.generateTexture(this.Element.Platform.Renderer.PixiRenderer);
                        var backgroundSprite = new PIXI.Sprite(texture);
                        backgroundSprite.anchor.set(0.5, 0.5);
                        backgroundSprite.setTransform(buttonEl.Width / 2, buttonEl.Height / 2);
                        if (buttonEl.BlurAmount > 0) {
                            blurFilter = new PIXI.filters.BlurFilter();
                            this._blurToUse = buttonEl.BlurAmount;
                            blurFilter.blur = 0;
                            backgroundSprite.filters = [blurFilter];
                        }
                        let parentXYStart = this.CalculateCurrentAvailableSlot();
                        containerGrid.position.set(this.Element.CalculatedX + parentXYStart.X, this.Element.CalculatedY + parentXYStart.Y);
                        containerGrid.addChild(backgroundSprite);
                        this.IncrementNextAvailableSlot();
                    }
                    let parentContainer = null;
                    if (this.Element.Parent.Renderer === undefined) {
                        this.Element.Platform.Renderer.PixiStage.addChild(containerGrid);
                    }
                    else {
                        if (this.Element.Parent.Renderer.PixiElement && this.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                            parentContainer = this.Element.Parent.Renderer.PixiElement;
                            parentContainer.addChild(containerGrid);
                        }
                    }
                    this.Element.Platform.Renderer.Draw.subscribe((r, args) => {
                        if (r.Pointer.hitTestSprite(containerGrid)) {
                            backgroundSprite.alpha = 1;
                            this.Scale = this._isPressed ? 0.98 : 1.02;
                            this._blurToUse = buttonEl.BlurAmount;
                            this.ShowTooltip(r, buttonEl, parentContainer, containerGrid);
                        }
                        else {
                            backgroundSprite.alpha = 0.95;
                            this.Scale = 1.0;
                            this._blurToUse = 1.0;
                            this.HideTooltip(buttonEl);
                        }
                        if (buttonEl.BlurAmount > 0) {
                            blurFilter.blur = this._blurToUse;
                        }
                        backgroundSprite.scale.set(this.Scale, this.Scale);
                    });
                    this.Element.Platform.Renderer.PointerTapped.subscribe((r, args) => {
                        if (r.Pointer.hitTestSprite(containerGrid)) {
                            ConsoleHelper_9.ConsoleHelper.Log("ButtonRenderer.Draw.Tapped");
                        }
                    });
                    this.Element.Platform.Renderer.PointerPressed.subscribe((r, args) => {
                        if (r.Pointer.hitTestSprite(containerGrid)) {
                            this._isPressed = true;
                        }
                    });
                    this.Element.Platform.Renderer.PointerReleased.subscribe((r, args) => {
                        if (r.Pointer.hitTestSprite(containerGrid)) {
                            this._isPressed = false;
                        }
                    });
                    buttonEl.IsDirty = false;
                }
                ShowTooltip(r, buttonEl, parentContainer, containerGrid) {
                    if (!buttonEl.HasToolTip || buttonEl.IsTooltipVisible) {
                        return;
                    }
                    buttonEl.IsTooltipVisible = true;
                    let tooltipHeight = 80;
                    let tooltipWidth = 120;
                    let topStart = 0;
                    let leftStart = 0;
                    if (buttonEl.TooltipDockPosition === DockPosition_3.DockPosition.Top) {
                        topStart = parentContainer.y + containerGrid.position.y - tooltipHeight - 20;
                        leftStart = parentContainer.x + containerGrid.position.x - ((tooltipWidth - buttonEl.Width) / 2);
                    }
                    else if (buttonEl.TooltipDockPosition === DockPosition_3.DockPosition.Bottom) {
                        topStart = parentContainer.y + containerGrid.position.y + buttonEl.Height + 10;
                        leftStart = parentContainer.x + containerGrid.position.x - ((tooltipWidth - buttonEl.Width) / 2);
                    }
                    else if (buttonEl.TooltipDockPosition === DockPosition_3.DockPosition.Left) {
                        topStart = parentContainer.y + containerGrid.position.y + ((buttonEl.Height - tooltipHeight) / 2);
                        leftStart = parentContainer.x + containerGrid.position.x - tooltipWidth - 15;
                    }
                    else if (buttonEl.TooltipDockPosition === DockPosition_3.DockPosition.Right) {
                        topStart = parentContainer.y + containerGrid.position.y + ((buttonEl.Height - tooltipHeight) / 2);
                        leftStart = parentContainer.x + containerGrid.position.x + buttonEl.Width + 15;
                    }
                    if (buttonEl.HasToolTip) {
                        this.GeneralShowTooltip(buttonEl.TooltipDockPosition, "#FFff7300", leftStart, topStart, tooltipWidth, tooltipHeight);
                    }
                    else {
                        eval(buttonEl.ClickStr);
                    }
                }
                HideTooltip(buttonEl) {
                    if (!buttonEl.HasToolTip || !buttonEl.IsTooltipVisible) {
                        return;
                    }
                    this.GeneralHideTooltip();
                    buttonEl.IsTooltipVisible = false;
                }
                Clear() {
                    ConsoleHelper_9.ConsoleHelper.Log("ButtonRenderer.Clear");
                    let containerMain = null;
                    if (this.PixiElement !== undefined) {
                        containerMain = this.PixiElement;
                        this.Element.Platform.Renderer.PixiStage.removeChild(containerMain);
                    }
                }
            };
            exports_74("ButtonRenderer", ButtonRenderer);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Controls/ToolTipRenderer", ["XamlGL/Jupiter/Platform/WebGL/Controls/BaseRenderer", "XamlGL/DataTypes/DockPosition", "XamlGL/Utils/ConsoleHelper", "XamlGL/utils/RendererHelper"], function(exports_75, context_75) {
    "use strict";
    var __moduleName = context_75 && context_75.id;
    var BaseRenderer_8, DockPosition_4, ConsoleHelper_10, RendererHelper_5;
    var ToolTipRenderer;
    return {
        setters:[
            function (BaseRenderer_8_1) {
                BaseRenderer_8 = BaseRenderer_8_1;
            },
            function (DockPosition_4_1) {
                DockPosition_4 = DockPosition_4_1;
            },
            function (ConsoleHelper_10_1) {
                ConsoleHelper_10 = ConsoleHelper_10_1;
            },
            function (RendererHelper_5_1) {
                RendererHelper_5 = RendererHelper_5_1;
            }],
        execute: function() {
            ToolTipRenderer = class ToolTipRenderer extends BaseRenderer_8.BaseRenderer {
                Draw() {
                    super.Draw();
                    ConsoleHelper_10.ConsoleHelper.Log("ToolTipRenderer.Draw");
                    let rectEl = super.Element;
                    if (!rectEl.IsDirty) {
                        return;
                    }
                    this.CalculateYHeight(rectEl);
                    this.CalculateXWidth(rectEl);
                    this.UpdateCalculatedValuesUsingMargin(rectEl);
                    let containerMain = null;
                    if (this.PixiElement === undefined) {
                        containerMain = new PIXI.Container();
                        containerMain.x = rectEl.Margin.Left;
                        containerMain.y = rectEl.Margin.Top;
                        this.PixiElement = containerMain;
                    }
                    else {
                        containerMain = this.PixiElement;
                    }
                    let container = new PIXI.Container();
                    container.x = 0;
                    container.y = 5;
                    let rectangle = new PIXI.Graphics();
                    rectangle.lineStyle(rectEl.BorderThickness.Left, RendererHelper_5.RendererHelper.HashToColorNumber(rectEl.BorderBrush), 1);
                    rectangle.beginFill(RendererHelper_5.RendererHelper.HashToColorNumber(rectEl.Background));
                    rectangle.drawRoundedRect(0, 0, this.Element.Width, this.Element.Height, rectEl.CornerRadius.BottomLeft);
                    rectangle.endFill();
                    rectangle.boundsPadding = 5;
                    container.addChild(rectangle);
                    var triangle = new PIXI.Graphics();
                    triangle.beginFill(RendererHelper_5.RendererHelper.HashToColorNumber(rectEl.Background));
                    if (rectEl.DockPosition === DockPosition_4.DockPosition.Top) {
                        triangle.drawPolygon([0, 12, -12, 0, 12, 0]);
                        triangle.y = this.Element.Height;
                        triangle.x = this.Element.Width / 2;
                    }
                    else if (rectEl.DockPosition === DockPosition_4.DockPosition.Bottom) {
                        triangle.drawPolygon([0, -12, -12, 0, 12, 0]);
                        triangle.y = 0;
                        triangle.x = this.Element.Width / 2;
                    }
                    else if (rectEl.DockPosition === DockPosition_4.DockPosition.Right) {
                        triangle.drawPolygon([-12, 0, 0, -12, 0, 12]);
                        triangle.y = this.Element.Height / 2;
                        triangle.x = 0;
                    }
                    else if (rectEl.DockPosition === DockPosition_4.DockPosition.Left) {
                        triangle.drawPolygon([12, 0, 0, -12, 0, 12]);
                        triangle.y = this.Element.Height / 2;
                        triangle.x = this.Element.Width;
                    }
                    triangle.endFill();
                    triangle.boundsPadding = 5;
                    container.addChild(triangle);
                    containerMain.addChild(container);
                    let container2 = new PIXI.Container();
                    container2.x = 0;
                    container2.y = 0;
                    let rectangle2 = new PIXI.Graphics();
                    rectangle2.lineStyle(rectEl.BorderThickness.Left, RendererHelper_5.RendererHelper.HashToColorNumber(rectEl.BorderBrush), 1);
                    rectangle2.beginFill(RendererHelper_5.RendererHelper.HashToColorNumber("#FFFFFFFF"));
                    if (rectEl.DockPosition === DockPosition_4.DockPosition.Top) {
                        rectangle2.drawRoundedRect(0, 5, super.Element.Width, super.Element.Height - 5, rectEl.CornerRadius.BottomLeft);
                    }
                    else if (rectEl.DockPosition === DockPosition_4.DockPosition.Bottom) {
                        rectangle2.drawRoundedRect(0, 10, super.Element.Width, super.Element.Height - 5, rectEl.CornerRadius.BottomLeft);
                    }
                    else if (rectEl.DockPosition === DockPosition_4.DockPosition.Right) {
                        rectangle2.drawRoundedRect(5, 5, super.Element.Width, super.Element.Height, rectEl.CornerRadius.BottomLeft);
                    }
                    else if (rectEl.DockPosition === DockPosition_4.DockPosition.Left) {
                        rectangle2.drawRoundedRect(-5, 5, super.Element.Width, super.Element.Height, rectEl.CornerRadius.BottomLeft);
                    }
                    rectangle2.endFill();
                    rectangle2.boundsPadding = 5;
                    container2.addChild(rectangle2);
                    var triangle2 = new PIXI.Graphics();
                    triangle2.beginFill(RendererHelper_5.RendererHelper.HashToColorNumber("#FFFFFFFF"));
                    if (rectEl.DockPosition === DockPosition_4.DockPosition.Top) {
                        triangle2.drawPolygon([0, 12, -12, 0, 12, 0]);
                        triangle2.x = this.Element.Width / 2;
                        triangle2.y = this.Element.Height;
                    }
                    else if (rectEl.DockPosition === DockPosition_4.DockPosition.Bottom) {
                        triangle2.drawPolygon([0, -12, -12, 0, 12, 0]);
                        triangle2.x = this.Element.Width / 2;
                        triangle2.y = 12;
                    }
                    else if (rectEl.DockPosition === DockPosition_4.DockPosition.Right) {
                        triangle2.drawPolygon([-12, 0, 0, -12, 0, 12]);
                        triangle2.x = 7;
                        triangle2.y = (this.Element.Height / 2) + 5;
                    }
                    else if (rectEl.DockPosition === DockPosition_4.DockPosition.Left) {
                        triangle2.drawPolygon([12, 0, 0, -12, 0, 12]);
                        triangle2.x = this.Element.Width - 6;
                        triangle2.y = (this.Element.Height / 2) + 5;
                    }
                    triangle2.endFill();
                    triangle2.boundsPadding = 5;
                    container2.addChild(triangle2);
                    containerMain.addChild(container2);
                    var dropShadowFilter = new PIXI.filters.BlurFilter();
                    dropShadowFilter.blur = 0.5;
                    containerMain.filters = [dropShadowFilter];
                    this.Element.Platform.Renderer.PixiStage.addChild(containerMain);
                    rectEl.IsDirty = false;
                }
                Clear() {
                    ConsoleHelper_10.ConsoleHelper.Log("ToolTipRenderer.Clear");
                    let containerMain = null;
                    if (this.PixiElement !== undefined) {
                        containerMain = this.PixiElement;
                        this.Element.Platform.Renderer.PixiStage.removeChild(containerMain);
                        this.PixiElement = null;
                    }
                }
            };
            exports_75("ToolTipRenderer", ToolTipRenderer);
        }
    }
});
System.register("XamlGL/Jupiter/Shape", ["XamlGL/Jupiter/FrameworkElement"], function(exports_76, context_76) {
    "use strict";
    var __moduleName = context_76 && context_76.id;
    var FrameworkElement_5;
    var Shape;
    return {
        setters:[
            function (FrameworkElement_5_1) {
                FrameworkElement_5 = FrameworkElement_5_1;
            }],
        execute: function() {
            Shape = class Shape extends FrameworkElement_5.FrameworkElement {
                constructor() {
                    super();
                    this.Fill = "#FFFFFFFF";
                    this.Stroke = "#FF000000";
                    this.StrokeThickness = 1;
                }
                get Fill() { return this._fill; }
                get Stroke() { return this._stroke; }
                get StrokeThickness() { return this._strokeThickness; }
                set Fill(value) { this._fill = value; }
                set Stroke(value) { this._stroke = value; }
                set StrokeThickness(value) { this._strokeThickness = value; }
            };
            exports_76("Shape", Shape);
        }
    }
});
System.register("XamlGL/Controls/Path", ["XamlGL/Jupiter/Shape"], function(exports_77, context_77) {
    "use strict";
    var __moduleName = context_77 && context_77.id;
    var Shape_1;
    var Path;
    return {
        setters:[
            function (Shape_1_1) {
                Shape_1 = Shape_1_1;
            }],
        execute: function() {
            Path = class Path extends Shape_1.Shape {
                constructor() {
                    super();
                    this._data = "";
                    this._scale = 1;
                    this._isSmooth = false;
                }
                get Data() { return this._data; }
                get Scale() { return this._scale; }
                get IsSmooth() { return this._isSmooth; }
                set Data(value) { this._data = value; }
                set Scale(value) { this._scale = value; }
                set IsSmooth(value) { this._isSmooth = value; }
            };
            exports_77("Path", Path);
        }
    }
});
System.register("XamlGL/Jupiter/Geometry", ["XamlGL/Jupiter/DependencyObject", "XamlGL/DataTypes/Guid"], function(exports_78, context_78) {
    "use strict";
    var __moduleName = context_78 && context_78.id;
    var DependencyObject_4, Guid_4;
    var Geometry;
    return {
        setters:[
            function (DependencyObject_4_1) {
                DependencyObject_4 = DependencyObject_4_1;
            },
            function (Guid_4_1) {
                Guid_4 = Guid_4_1;
            }],
        execute: function() {
            Geometry = class Geometry extends DependencyObject_4.DependencyObject {
                constructor() {
                    super();
                    this._uniqueId = Guid_4.Guid.newGuid();
                }
                get UniqueID() { return this._uniqueId; }
                set UniqueID(value) { this._uniqueId = value; }
            };
            exports_78("Geometry", Geometry);
        }
    }
});
System.register("XamlGL/DataTypes/FillRule", [], function(exports_79, context_79) {
    "use strict";
    var __moduleName = context_79 && context_79.id;
    var FillRule;
    return {
        setters:[],
        execute: function() {
            (function (FillRule) {
                FillRule[FillRule["EvenOdd"] = 0] = "EvenOdd";
                FillRule[FillRule["Nonzero"] = 1] = "Nonzero";
            })(FillRule || (FillRule = {}));
            exports_79("FillRule", FillRule);
        }
    }
});
System.register("XamlGL/Controls/PathSegment", ["XamlGL/Jupiter/DependencyObject"], function(exports_80, context_80) {
    "use strict";
    var __moduleName = context_80 && context_80.id;
    var DependencyObject_5;
    var PathSegment;
    return {
        setters:[
            function (DependencyObject_5_1) {
                DependencyObject_5 = DependencyObject_5_1;
            }],
        execute: function() {
            PathSegment = class PathSegment extends DependencyObject_5.DependencyObject {
            };
            exports_80("PathSegment", PathSegment);
        }
    }
});
System.register("XamlGL/Controls/PathSegmentCollection", ["Libs/typescript-collections/src/lib/index"], function(exports_81, context_81) {
    "use strict";
    var __moduleName = context_81 && context_81.id;
    var index_3;
    var PathSegmentCollection;
    return {
        setters:[
            function (index_3_1) {
                index_3 = index_3_1;
            }],
        execute: function() {
            PathSegmentCollection = class PathSegmentCollection extends index_3.LinkedList {
            };
            exports_81("PathSegmentCollection", PathSegmentCollection);
        }
    }
});
System.register("XamlGL/Controls/PathFigure", ["XamlGL/Controls/PathSegmentCollection"], function(exports_82, context_82) {
    "use strict";
    var __moduleName = context_82 && context_82.id;
    var PathSegmentCollection_1;
    var PathFigure;
    return {
        setters:[
            function (PathSegmentCollection_1_1) {
                PathSegmentCollection_1 = PathSegmentCollection_1_1;
            }],
        execute: function() {
            PathFigure = class PathFigure {
                constructor() {
                    this._segments = new PathSegmentCollection_1.PathSegmentCollection();
                }
                get IsClosed() { return this._isClosed; }
                get IsFilled() { return this._isFilled; }
                get Segments() { return this._segments; }
                get StartPoint() { return this._startPoint; }
                set IsClosed(value) { this._isClosed = value; }
                set IsFilled(value) { this._isFilled = value; }
                set Segments(value) { this._segments = value; }
                set StartPoint(value) { this._startPoint = value; }
            };
            exports_82("PathFigure", PathFigure);
        }
    }
});
System.register("XamlGL/Controls/PathFigureCollection", ["Libs/typescript-collections/src/lib/index"], function(exports_83, context_83) {
    "use strict";
    var __moduleName = context_83 && context_83.id;
    var index_4;
    var PathFigureCollection;
    return {
        setters:[
            function (index_4_1) {
                index_4 = index_4_1;
            }],
        execute: function() {
            PathFigureCollection = class PathFigureCollection extends index_4.LinkedList {
            };
            exports_83("PathFigureCollection", PathFigureCollection);
        }
    }
});
System.register("XamlGL/Controls/PathGeometry", ["XamlGL/Jupiter/Geometry", "XamlGL/Controls/PathFigureCollection"], function(exports_84, context_84) {
    "use strict";
    var __moduleName = context_84 && context_84.id;
    var Geometry_1, PathFigureCollection_1;
    var PathGeometry;
    return {
        setters:[
            function (Geometry_1_1) {
                Geometry_1 = Geometry_1_1;
            },
            function (PathFigureCollection_1_1) {
                PathFigureCollection_1 = PathFigureCollection_1_1;
            }],
        execute: function() {
            PathGeometry = class PathGeometry extends Geometry_1.Geometry {
                constructor() {
                    super(...arguments);
                    this._figures = new PathFigureCollection_1.PathFigureCollection();
                }
                get Figures() { return this._figures; }
                get FillRule() { return this._fillRule; }
                set Figures(value) { this._figures = value; }
                set FillRule(value) { this._fillRule = value; }
            };
            exports_84("PathGeometry", PathGeometry);
        }
    }
});
System.register("XamlGL/Controls/LineSegment", ["XamlGL/Controls/PathSegment"], function(exports_85, context_85) {
    "use strict";
    var __moduleName = context_85 && context_85.id;
    var PathSegment_1;
    var LineSegment;
    return {
        setters:[
            function (PathSegment_1_1) {
                PathSegment_1 = PathSegment_1_1;
            }],
        execute: function() {
            LineSegment = class LineSegment extends PathSegment_1.PathSegment {
                get Point() { return this._point; }
                set Point(value) { this._point = value; }
            };
            exports_85("LineSegment", LineSegment);
        }
    }
});
System.register("XamlGL/Controls/BezierSegment", ["XamlGL/Controls/PathSegment"], function(exports_86, context_86) {
    "use strict";
    var __moduleName = context_86 && context_86.id;
    var PathSegment_2;
    var BezierSegment;
    return {
        setters:[
            function (PathSegment_2_1) {
                PathSegment_2 = PathSegment_2_1;
            }],
        execute: function() {
            BezierSegment = class BezierSegment extends PathSegment_2.PathSegment {
                get Point1() { return this._point1; }
                get Point2() { return this._point2; }
                get Point3() { return this._point3; }
                set Point1(value) { this._point1 = value; }
                set Point2(value) { this._point2 = value; }
                set Point3(value) { this._point3 = value; }
            };
            exports_86("BezierSegment", BezierSegment);
        }
    }
});
System.register("XamlGL/Controls/QuadraticBezierSegment", ["XamlGL/Controls/PathSegment"], function(exports_87, context_87) {
    "use strict";
    var __moduleName = context_87 && context_87.id;
    var PathSegment_3;
    var QuadraticBezierSegment;
    return {
        setters:[
            function (PathSegment_3_1) {
                PathSegment_3 = PathSegment_3_1;
            }],
        execute: function() {
            QuadraticBezierSegment = class QuadraticBezierSegment extends PathSegment_3.PathSegment {
                get Point1() { return this._point1; }
                get Point2() { return this._point2; }
                set Point1(value) { this._point1 = value; }
                set Point2(value) { this._point2 = value; }
            };
            exports_87("QuadraticBezierSegment", QuadraticBezierSegment);
        }
    }
});
System.register("XamlGL/DataTypes/SweepDirection", [], function(exports_88, context_88) {
    "use strict";
    var __moduleName = context_88 && context_88.id;
    var SweepDirection;
    return {
        setters:[],
        execute: function() {
            (function (SweepDirection) {
                SweepDirection[SweepDirection["Counterclockwise"] = 0] = "Counterclockwise";
                SweepDirection[SweepDirection["Clockwise"] = 1] = "Clockwise";
            })(SweepDirection || (SweepDirection = {}));
            exports_88("SweepDirection", SweepDirection);
        }
    }
});
System.register("XamlGL/DataTypes/Size", [], function(exports_89, context_89) {
    "use strict";
    var __moduleName = context_89 && context_89.id;
    var Size;
    return {
        setters:[],
        execute: function() {
            Size = class Size {
                constructor(h, w) {
                    this.Height = h;
                    this.Width = w;
                }
            };
            exports_89("Size", Size);
        }
    }
});
System.register("XamlGL/Controls/ArcSegment", ["XamlGL/Controls/PathSegment"], function(exports_90, context_90) {
    "use strict";
    var __moduleName = context_90 && context_90.id;
    var PathSegment_4;
    var ArcSegment;
    return {
        setters:[
            function (PathSegment_4_1) {
                PathSegment_4 = PathSegment_4_1;
            }],
        execute: function() {
            ArcSegment = class ArcSegment extends PathSegment_4.PathSegment {
                get Point() { return this._point; }
                get IsLargeArc() { return this._isLargeArc; }
                get RotationAngle() { return this._rotationAngle; }
                get SweepDirection() { return this._sweepDirection; }
                get Size() { return this._size; }
                set Point(value) { this._point = value; }
                set IsLargeArc(value) { this._isLargeArc = value; }
                set RotationAngle(value) { this._rotationAngle = value; }
                set SweepDirection(value) { this._sweepDirection = value; }
                set Size(value) { this._size = value; }
            };
            exports_90("ArcSegment", ArcSegment);
        }
    }
});
System.register("XamlGL/utils/MiniPathLanguageHelper", ["XamlGL/Controls/PathGeometry", "XamlGL/Controls/PathFigure", "XamlGL/Controls/LineSegment", "XamlGL/Controls/BezierSegment", "XamlGL/Controls/QuadraticBezierSegment", "XamlGL/Controls/ArcSegment", "XamlGL/DataTypes/FillRule", "XamlGL/DataTypes/SweepDirection", "XamlGL/DataTypes/Size", "XamlGL/Utils/ConsoleHelper"], function(exports_91, context_91) {
    "use strict";
    var __moduleName = context_91 && context_91.id;
    var PathGeometry_1, PathFigure_1, LineSegment_1, BezierSegment_1, QuadraticBezierSegment_1, ArcSegment_1, FillRule_1, SweepDirection_1, Size_1, ConsoleHelper_11;
    var MiniPathLanguageHelper;
    return {
        setters:[
            function (PathGeometry_1_1) {
                PathGeometry_1 = PathGeometry_1_1;
            },
            function (PathFigure_1_1) {
                PathFigure_1 = PathFigure_1_1;
            },
            function (LineSegment_1_1) {
                LineSegment_1 = LineSegment_1_1;
            },
            function (BezierSegment_1_1) {
                BezierSegment_1 = BezierSegment_1_1;
            },
            function (QuadraticBezierSegment_1_1) {
                QuadraticBezierSegment_1 = QuadraticBezierSegment_1_1;
            },
            function (ArcSegment_1_1) {
                ArcSegment_1 = ArcSegment_1_1;
            },
            function (FillRule_1_1) {
                FillRule_1 = FillRule_1_1;
            },
            function (SweepDirection_1_1) {
                SweepDirection_1 = SweepDirection_1_1;
            },
            function (Size_1_1) {
                Size_1 = Size_1_1;
            },
            function (ConsoleHelper_11_1) {
                ConsoleHelper_11 = ConsoleHelper_11_1;
            }],
        execute: function() {
            MiniPathLanguageHelper = class MiniPathLanguageHelper {
                static parse(path, context) {
                    let _pathGeometry = null;
                    this._pathString = path;
                    this._pathLength = path.length;
                    this._curIndex = 0;
                    this._secondLastPoint = [0, 0];
                    this._lastPoint = [0, 0];
                    this._lastStart = [0, 0];
                    this._figureStarted = false;
                    let first = true;
                    let last_cmd = " ";
                    while (this.ReadToken()) {
                        let cmd = this._token;
                        if (first) {
                            if ((cmd !== "M") && (cmd !== "m") && (cmd !== "f") && (cmd !== "F")) {
                                this.ThrowBadToken();
                            }
                            first = false;
                        }
                        switch (cmd) {
                            case "f":
                            case "F":
                                _pathGeometry = new PathGeometry_1.PathGeometry();
                                let _num = this.ReadNumber(!this.AllowComma);
                                _pathGeometry.FillRule = _num === 0 ? FillRule_1.FillRule.EvenOdd : FillRule_1.FillRule.Nonzero;
                                break;
                            case "m":
                            case "M":
                                this._lastPoint = this.ReadPoint(cmd, !this.AllowComma);
                                this._figure = new PathFigure_1.PathFigure();
                                this._figure.StartPoint = this._lastPoint;
                                this._figure.IsFilled = this.IsFilled;
                                this._figure.IsClosed = !this.IsClosed;
                                context.moveTo(this._lastPoint[0], this._lastPoint[1]);
                                ConsoleHelper_11.ConsoleHelper.LogPad("M " + this._lastPoint[0] + " " + this._lastPoint[1], 5);
                                this._figureStarted = true;
                                this._lastStart = this._lastPoint;
                                while (this.IsNumber(this.AllowComma)) {
                                    this._lastPoint = this.ReadPoint(cmd, !this.AllowComma);
                                    let _lineSegment = new LineSegment_1.LineSegment();
                                    _lineSegment.Point = this._lastPoint;
                                    this._figure.Segments.add(_lineSegment);
                                    context.lineTo(this._lastPoint[0], this._lastPoint[1]);
                                    ConsoleHelper_11.ConsoleHelper.LogPad("L " + this._lastPoint[0] + " " + this._lastPoint[1], 5);
                                    last_cmd = "L";
                                }
                                break;
                            case "l":
                            case "L":
                            case "h":
                            case "H":
                            case "v":
                            case "V":
                                this.EnsureFigure();
                                do {
                                    switch (cmd) {
                                        case "l":
                                            this._lastPoint = this.ReadPoint(cmd, !this.AllowComma);
                                            break;
                                        case "L":
                                            this._lastPoint = this.ReadPoint(cmd, !this.AllowComma);
                                            break;
                                        case "h":
                                            this._lastPoint[0] += this.ReadNumber(!this.AllowComma);
                                            break;
                                        case "H":
                                            this._lastPoint[0] = this.ReadNumber(!this.AllowComma);
                                            break;
                                        case "v":
                                            this._lastPoint[1] += this.ReadNumber(!this.AllowComma);
                                            break;
                                        case "V":
                                            this._lastPoint[1] = this.ReadNumber(!this.AllowComma);
                                            break;
                                    }
                                    let _lineSegment = new LineSegment_1.LineSegment();
                                    _lineSegment.Point = this._lastPoint;
                                    this._figure.Segments.add(_lineSegment);
                                    context.lineTo(this._lastPoint[0], this._lastPoint[1]);
                                    ConsoleHelper_11.ConsoleHelper.LogPad("L " + this._lastPoint[0] + " " + this._lastPoint[1], 5);
                                } while (this.IsNumber(this.AllowComma));
                                last_cmd = "L";
                                break;
                            case "c":
                            case "C":
                            case "s":
                            case "S":
                                this.EnsureFigure();
                                do {
                                    let p;
                                    if ((cmd === "s") || (cmd === "S")) {
                                        if (last_cmd === "C") {
                                            p = this.Reflect();
                                        }
                                        else {
                                            p = this._lastPoint;
                                        }
                                        this._secondLastPoint = this.ReadPoint(cmd, !this.AllowComma);
                                    }
                                    else {
                                        p = this.ReadPoint(cmd, !this.AllowComma);
                                        this._secondLastPoint = this.ReadPoint(cmd, this.AllowComma);
                                    }
                                    this._lastPoint = this.ReadPoint(cmd, this.AllowComma);
                                    let _bizierSegment = new BezierSegment_1.BezierSegment();
                                    _bizierSegment.Point1 = p;
                                    _bizierSegment.Point2 = this._secondLastPoint;
                                    _bizierSegment.Point3 = this._lastPoint;
                                    this._figure.Segments.add(_bizierSegment);
                                    context.bezierCurveTo(_bizierSegment.Point1[0], _bizierSegment.Point1[1], _bizierSegment.Point2[0], _bizierSegment.Point2[1], _bizierSegment.Point3[0], _bizierSegment.Point3[1]);
                                    ConsoleHelper_11.ConsoleHelper.LogPad("B " + _bizierSegment.Point1[0] + " " + _bizierSegment.Point1[1] + " " +
                                        _bizierSegment.Point2[0] + " " +
                                        _bizierSegment.Point2[1] + " " + _bizierSegment.Point3[0] + " " + _bizierSegment.Point3[1], 5);
                                    last_cmd = "C";
                                } while (this.IsNumber(this.AllowComma));
                                break;
                            case "q":
                            case "Q":
                            case "t":
                            case "T":
                                this.EnsureFigure();
                                do {
                                    if ((cmd === "t") || (cmd === "T")) {
                                        if (last_cmd === "Q") {
                                            this._secondLastPoint = this.Reflect();
                                        }
                                        else {
                                            this._secondLastPoint = this._lastPoint;
                                        }
                                        this._lastPoint = this.ReadPoint(cmd, !this.AllowComma);
                                    }
                                    else {
                                        this._secondLastPoint = this.ReadPoint(cmd, !this.AllowComma);
                                        this._lastPoint = this.ReadPoint(cmd, this.AllowComma);
                                    }
                                    let _quadraticBezierSegment = new QuadraticBezierSegment_1.QuadraticBezierSegment();
                                    _quadraticBezierSegment.Point1 = this._secondLastPoint;
                                    _quadraticBezierSegment.Point2 = this._lastPoint;
                                    this._figure.Segments.add(_quadraticBezierSegment);
                                    context.quadraticCurveTo(_quadraticBezierSegment.Point1[0], _quadraticBezierSegment.Point1[1], _quadraticBezierSegment.Point2[0], _quadraticBezierSegment.Point2[1]);
                                    ConsoleHelper_11.ConsoleHelper.LogPad("B " + _quadraticBezierSegment.Point1[0] + " " + _quadraticBezierSegment.Point1[1] + " " +
                                        _quadraticBezierSegment.Point2[0] + " " + _quadraticBezierSegment.Point2[1], 5);
                                    last_cmd = "Q";
                                } while (this.IsNumber(this.AllowComma));
                                break;
                            case "a":
                            case "A":
                                this.EnsureFigure();
                                do {
                                    let w = this.ReadNumber(!this.AllowComma);
                                    let h = this.ReadNumber(this.AllowComma);
                                    let rotation = this.ReadNumber(this.AllowComma);
                                    let large = this.ReadBool();
                                    let sweep = this.ReadBool();
                                    this._lastPoint = this.ReadPoint(cmd, this.AllowComma);
                                    let _arcSegment = new ArcSegment_1.ArcSegment();
                                    _arcSegment.Point = this._lastPoint;
                                    _arcSegment.Size = new Size_1.Size(w, h);
                                    _arcSegment.RotationAngle = rotation;
                                    _arcSegment.IsLargeArc = large;
                                    _arcSegment.SweepDirection = sweep ? SweepDirection_1.SweepDirection.Clockwise : SweepDirection_1.SweepDirection.Counterclockwise;
                                    this._figure.Segments.add(_arcSegment);
                                    context.arcTo(this._lastPoint[0], this._lastPoint[1], this._lastPoint[0] + w, this._lastPoint[1] + h, rotation);
                                    ConsoleHelper_11.ConsoleHelper.LogPad("A " + this._lastPoint[0] + " " + this._lastPoint[1] + " "
                                        + (this._lastPoint[0] + w) + " " + (this._lastPoint[1] + h) + " " + rotation, 5);
                                } while (this.IsNumber(this.AllowComma));
                                last_cmd = "A";
                                break;
                            case "z":
                            case "Z":
                                this.EnsureFigure();
                                this._figure.IsClosed = this.IsClosed;
                                this._figureStarted = false;
                                last_cmd = "Z";
                                this._lastPoint = this._lastStart;
                                context.lineTo(this._lastPoint[0], this._lastPoint[1]);
                                ConsoleHelper_11.ConsoleHelper.LogPad("Z ", 5);
                                break;
                            default:
                                this.ThrowBadToken();
                                break;
                        }
                        if (null != this._figure) {
                            if (this._figure.IsClosed) {
                                if (null == _pathGeometry) {
                                    _pathGeometry = new PathGeometry_1.PathGeometry();
                                }
                                _pathGeometry.Figures.add(this._figure);
                                this._figure = null;
                                first = true;
                            }
                        }
                    }
                    if (null != this._figure) {
                        if (null == _pathGeometry) {
                            _pathGeometry = new PathGeometry_1.PathGeometry();
                        }
                        if (!_pathGeometry.Figures.contains(this._figure)) {
                            _pathGeometry.Figures.add(this._figure);
                        }
                    }
                    return _pathGeometry;
                }
                static SkipDigits(signAllowed) {
                    if (signAllowed && this.More() && ((this._pathString[this._curIndex] === "-") || this._pathString[this._curIndex] === "+")) {
                        this._curIndex++;
                    }
                    while (this.More() && (this._pathString[this._curIndex] >= "0") && (this._pathString[this._curIndex] <= "9")) {
                        this._curIndex++;
                    }
                }
                static ReadBool() {
                    this.SkipWhiteSpace(this.AllowComma);
                    if (this.More()) {
                        this._token = this._pathString[this._curIndex++];
                        if (this._token === "0") {
                            return false;
                        }
                        else if (this._token === "1") {
                            return true;
                        }
                    }
                    this.ThrowBadToken();
                    return false;
                }
                static Reflect() {
                    return [2 * this._lastPoint[0] - this._secondLastPoint[0],
                        2 * this._lastPoint[1] - this._secondLastPoint[1]];
                }
                static EnsureFigure() {
                    if (!this._figureStarted) {
                        this._figure = new PathFigure_1.PathFigure();
                        this._figure.StartPoint = this._lastStart;
                        this._figureStarted = true;
                    }
                }
                static ReadNumber(allowComma) {
                    if (!this.IsNumber(allowComma)) {
                        this.ThrowBadToken();
                    }
                    let simple = true;
                    let start = this._curIndex;
                    if (this.More() && ((this._pathString[this._curIndex] === "-") || this._pathString[this._curIndex] === "+")) {
                        this._curIndex++;
                    }
                    if (this.More() && (this._pathString[this._curIndex] === "I")) {
                        this._curIndex = Math.min(this._curIndex + 8, this._pathLength);
                        simple = false;
                    }
                    else if (this.More() && (this._pathString[this._curIndex] === "N")) {
                        this._curIndex = Math.min(this._curIndex + 3, this._pathLength);
                        simple = false;
                    }
                    else {
                        this.SkipDigits(!this.AllowSign);
                        if (this.More() && (this._pathString[this._curIndex] === ".")) {
                            simple = false;
                            this._curIndex++;
                            this.SkipDigits(!this.AllowSign);
                        }
                        if (this.More() && ((this._pathString[this._curIndex] === "E") || (this._pathString[this._curIndex] === "e"))) {
                            simple = false;
                            this._curIndex++;
                            this.SkipDigits(this.AllowSign);
                        }
                    }
                    if (simple && (this._curIndex <= (start + 8))) {
                        let sign = 1;
                        if (this._pathString[start] === "+") {
                            start++;
                        }
                        else if (this._pathString[start] === "-") {
                            start++;
                            sign = -1;
                        }
                        let value = 0;
                        while (start < this._curIndex) {
                            value = value * 10 + parseFloat(this._pathString[start]);
                            start++;
                        }
                        return value * sign;
                    }
                    else {
                        let subString = this._pathString.substr(start, this._curIndex - start);
                        return parseFloat(subString);
                    }
                }
                static IsNumber(allowComma) {
                    let commaMet = this.SkipWhiteSpace(allowComma);
                    if (this.More()) {
                        this._token = this._pathString[this._curIndex];
                        if ((this._token === ".") || (this._token === "-") || (this._token === "+") || ((this._token >= "0") && (this._token <= "9"))
                            || (this._token === "I")
                            || (this._token === "N")) {
                            return true;
                        }
                    }
                    if (commaMet) {
                        this.ThrowBadToken();
                    }
                    return false;
                }
                static ReadPoint(cmd, allowcomma) {
                    let x = this.ReadNumber(this.AllowComma);
                    let y = this.ReadNumber(this.AllowComma);
                    if (cmd >= "a") {
                        x += this._lastPoint[0];
                        y += this._lastPoint[1];
                    }
                    return [x, y];
                }
                static ReadToken() {
                    this.SkipWhiteSpace(!this.AllowComma);
                    if (this.More()) {
                        this._token = this._pathString[this._curIndex++];
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                static More() {
                    return this._curIndex < this._pathLength;
                }
                static SkipWhiteSpace(allowComma) {
                    let commaMet = false;
                    while (this.More()) {
                        let ch = this._pathString[this._curIndex];
                        switch (ch) {
                            case " ":
                            case "\n":
                            case "\r":
                            case "\t":
                                break;
                            case ",":
                                if (allowComma) {
                                    commaMet = true;
                                    allowComma = false;
                                }
                                else {
                                    this.ThrowBadToken();
                                }
                                break;
                            default:
                                if (((ch > " ") && (ch <= "z")) || !(ch === " ")) {
                                    return commaMet;
                                }
                                break;
                        }
                        this._curIndex++;
                    }
                    return commaMet;
                }
                static ThrowBadToken() {
                }
            };
            MiniPathLanguageHelper.AllowSign = true;
            MiniPathLanguageHelper.AllowComma = true;
            MiniPathLanguageHelper.IsFilled = true;
            MiniPathLanguageHelper.IsClosed = true;
            MiniPathLanguageHelper._figure = null;
            exports_91("MiniPathLanguageHelper", MiniPathLanguageHelper);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Controls/PathRenderer", ["XamlGL/Jupiter/Platform/WebGL/Controls/BaseRenderer", "XamlGL/Utils/ConsoleHelper", "XamlGL/utils/RendererHelper", "XamlGL/utils/MiniPathLanguageHelper"], function(exports_92, context_92) {
    "use strict";
    var __moduleName = context_92 && context_92.id;
    var BaseRenderer_9, ConsoleHelper_12, RendererHelper_6, MiniPathLanguageHelper_1;
    var PathRenderer;
    return {
        setters:[
            function (BaseRenderer_9_1) {
                BaseRenderer_9 = BaseRenderer_9_1;
            },
            function (ConsoleHelper_12_1) {
                ConsoleHelper_12 = ConsoleHelper_12_1;
            },
            function (RendererHelper_6_1) {
                RendererHelper_6 = RendererHelper_6_1;
            },
            function (MiniPathLanguageHelper_1_1) {
                MiniPathLanguageHelper_1 = MiniPathLanguageHelper_1_1;
            }],
        execute: function() {
            PathRenderer = class PathRenderer extends BaseRenderer_9.BaseRenderer {
                Draw() {
                    super.Draw();
                    ConsoleHelper_12.ConsoleHelper.Log("PathRenderer.Draw");
                    let pathEl = super.Element;
                    let parentContainer = super.Element.Parent.Renderer.PixiElement;
                    if (!pathEl.IsDirty) {
                        return;
                    }
                    this.CalculateYHeight(pathEl);
                    this.CalculateXWidth(pathEl);
                    this.UpdateCalculatedValuesUsingMargin(pathEl);
                    let polygonGraphics = new PIXI.Graphics();
                    polygonGraphics.beginFill(RendererHelper_6.RendererHelper.HashToColorNumber(pathEl.Fill), pathEl.Fill.length > 0 ? 1 : 0);
                    polygonGraphics.lineStyle(pathEl.StrokeThickness, RendererHelper_6.RendererHelper.HashToColorNumber(pathEl.Stroke));
                    MiniPathLanguageHelper_1.MiniPathLanguageHelper.parse(pathEl.Data, polygonGraphics);
                    polygonGraphics.scale = new PIXI.Point(pathEl.Scale, pathEl.Scale);
                    polygonGraphics.endFill();
                    let parentXYStart = this.CalculateCurrentAvailableSlot();
                    polygonGraphics.x = this.Element.CalculatedX + parentXYStart.X;
                    polygonGraphics.y = this.Element.CalculatedY + parentXYStart.Y;
                    parentContainer.addChild(polygonGraphics);
                    if (pathEl.IsSmooth) {
                        let blurFilter = new PIXI.filters.BlurFilter();
                        blurFilter.blur = 1;
                        polygonGraphics.boundsPadding = pathEl.Width + 2;
                        polygonGraphics.filters = [blurFilter];
                    }
                    this.Element.Platform.Renderer.PixiRenderer.render(parentContainer);
                    this.IncrementNextAvailableSlot();
                    pathEl.IsDirty = false;
                }
            };
            exports_92("PathRenderer", PathRenderer);
        }
    }
});
System.register("XamlGL/Controls/ToggleButton", ["XamlGL/Controls/Button", "XamlGL/Events/EventDispatcher"], function(exports_93, context_93) {
    "use strict";
    var __moduleName = context_93 && context_93.id;
    var Button_1, EventDispatcher_7;
    var ToggleButton;
    return {
        setters:[
            function (Button_1_1) {
                Button_1 = Button_1_1;
            },
            function (EventDispatcher_7_1) {
                EventDispatcher_7 = EventDispatcher_7_1;
            }],
        execute: function() {
            ToggleButton = class ToggleButton extends Button_1.Button {
                constructor() {
                    super(...arguments);
                    this._IsChecked = false;
                    this._IsThreeState = false;
                    this._checked = new EventDispatcher_7.EventDispatcher();
                    this._unchecked = new EventDispatcher_7.EventDispatcher();
                    this._indeterminate = new EventDispatcher_7.EventDispatcher();
                }
                get IsChecked() { return this._IsChecked; }
                get IsThreeState() { return this._IsThreeState; }
                get Checked() { return this._checked; }
                get Unchecked() { return this._unchecked; }
                get Indeterminate() { return this._indeterminate; }
                set IsChecked(value) { this._IsChecked = value; }
                set IsThreeState(value) { this._IsThreeState = value; }
            };
            exports_93("ToggleButton", ToggleButton);
        }
    }
});
System.register("XamlGL/Controls/CheckBox", ["XamlGL/Controls/ToggleButton", "XamlGL/DataTypes/Thickness"], function(exports_94, context_94) {
    "use strict";
    var __moduleName = context_94 && context_94.id;
    var ToggleButton_1, Thickness_4;
    var CheckBox;
    return {
        setters:[
            function (ToggleButton_1_1) {
                ToggleButton_1 = ToggleButton_1_1;
            },
            function (Thickness_4_1) {
                Thickness_4 = Thickness_4_1;
            }],
        execute: function() {
            CheckBox = class CheckBox extends ToggleButton_1.ToggleButton {
                constructor() {
                    super();
                    this._checkedPath = "M29.403992,0L32,3.5860286 8.3720093,21.479001 5.7740173,17.895017 5.776001,17.893002 0,9.9110087 3.5079956,7.2570179 9.2829895,15.23602z";
                    this._uncheckedPath = "M1.7000008,1.6999989L1.7000008,30.299999 30.300015,30.299999 30.300015,1.6999989z M0,0L32.000016,0 32.000016,31.999999 0,31.999999z";
                    this._checkedPadding = new Thickness_4.Thickness(0);
                    this._checkedPadding.Left = 1;
                    this._checkedPadding.Top = 5;
                }
                get CheckedPath() { return this._checkedPath; }
                get UncheckedPath() { return this._uncheckedPath; }
                get CheckedPadding() { return this._checkedPadding; }
                set CheckedPath(value) { this._checkedPath = value; }
                set UncheckedPath(value) { this._uncheckedPath = value; }
                set CheckedPadding(value) { this._checkedPadding = value; }
            };
            exports_94("CheckBox", CheckBox);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Controls/CheckBoxRenderer", ["XamlGL/Jupiter/Platform/WebGL/Controls/BaseRenderer", "XamlGL/Utils/ConsoleHelper", "XamlGL/utils/RendererHelper", "XamlGL/utils/MiniPathLanguageHelper"], function(exports_95, context_95) {
    "use strict";
    var __moduleName = context_95 && context_95.id;
    var BaseRenderer_10, ConsoleHelper_13, RendererHelper_7, MiniPathLanguageHelper_2;
    var CheckBoxRenderer;
    return {
        setters:[
            function (BaseRenderer_10_1) {
                BaseRenderer_10 = BaseRenderer_10_1;
            },
            function (ConsoleHelper_13_1) {
                ConsoleHelper_13 = ConsoleHelper_13_1;
            },
            function (RendererHelper_7_1) {
                RendererHelper_7 = RendererHelper_7_1;
            },
            function (MiniPathLanguageHelper_2_1) {
                MiniPathLanguageHelper_2 = MiniPathLanguageHelper_2_1;
            }],
        execute: function() {
            CheckBoxRenderer = class CheckBoxRenderer extends BaseRenderer_10.BaseRenderer {
                Draw() {
                    super.Draw();
                    ConsoleHelper_13.ConsoleHelper.Log("CheckBoxRenderer.Draw");
                    let checkboxEl = this.Element;
                    let containerGrid = null;
                    if (this.PixiElement === undefined) {
                        containerGrid = new PIXI.Container();
                        this.PixiElement = containerGrid;
                    }
                    else {
                        containerGrid = this.PixiElement;
                    }
                    if (!checkboxEl.IsDirty) {
                        return;
                    }
                    this.CalculateYHeight(checkboxEl);
                    this.CalculateXWidth(checkboxEl);
                    this.UpdateCalculatedValuesUsingMargin(checkboxEl);
                    containerGrid.height = this.Element.CalculatedHeight;
                    containerGrid.width = this.Element.CalculatedWidth;
                    let bottomGraphicsLayer = new PIXI.Graphics();
                    bottomGraphicsLayer.beginFill(RendererHelper_7.RendererHelper.HashToColorNumber("#FFFFFFFF"), 0.5);
                    bottomGraphicsLayer.lineStyle(2, RendererHelper_7.RendererHelper.HashToColorNumber("#FFFFFFFF"), 0.8);
                    MiniPathLanguageHelper_2.MiniPathLanguageHelper.parse(checkboxEl.UncheckedPath, bottomGraphicsLayer);
                    bottomGraphicsLayer.endFill();
                    let topGraphicsLayer = new PIXI.Graphics();
                    topGraphicsLayer.beginFill(RendererHelper_7.RendererHelper.HashToColorNumber(checkboxEl.Foreground), 1);
                    MiniPathLanguageHelper_2.MiniPathLanguageHelper.parse(checkboxEl.CheckedPath, topGraphicsLayer);
                    topGraphicsLayer.alpha = checkboxEl.IsChecked ? 1 : 0;
                    topGraphicsLayer.endFill();
                    let parentXYStart = this.CalculateCurrentAvailableSlot();
                    bottomGraphicsLayer.x = 0;
                    bottomGraphicsLayer.y = 0;
                    topGraphicsLayer.x = checkboxEl.CheckedPadding.Left;
                    topGraphicsLayer.y = checkboxEl.CheckedPadding.Top;
                    containerGrid.position.set(this.Element.CalculatedX + parentXYStart.X, this.Element.CalculatedY + parentXYStart.Y + this.Element.Parent.Margin.Top);
                    containerGrid.addChild(bottomGraphicsLayer);
                    containerGrid.addChild(topGraphicsLayer);
                    this.IncrementNextAvailableSlot();
                    let parentContainer = null;
                    if (this.Element.Parent.Renderer === undefined) {
                        this.Element.Platform.Renderer.PixiStage.addChild(containerGrid);
                    }
                    else {
                        if (this.Element.Parent.Renderer.PixiElement && this.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                            parentContainer = this.Element.Parent.Renderer.PixiElement;
                            parentContainer.addChild(containerGrid);
                        }
                    }
                    this.Element.Platform.Renderer.PointerTapped.subscribe((r, args) => {
                        if (r.Pointer.hitTestSprite(containerGrid)) {
                            ConsoleHelper_13.ConsoleHelper.Log("CheckBoxRenderer.PointerTapped");
                            checkboxEl.IsChecked = !checkboxEl.IsChecked;
                            topGraphicsLayer.alpha = checkboxEl.IsChecked ? 1 : 0;
                        }
                    });
                    checkboxEl.IsDirty = false;
                }
                Clear() {
                    ConsoleHelper_13.ConsoleHelper.Log("CheckBoxRenderer.Clear");
                    let containerMain = null;
                    if (this.PixiElement !== undefined) {
                        containerMain = this.PixiElement;
                        this.Element.Platform.Renderer.PixiStage.removeChild(containerMain);
                        this.PixiElement = null;
                    }
                }
            };
            exports_95("CheckBoxRenderer", CheckBoxRenderer);
        }
    }
});
System.register("XamlGL/utils/RendererHelper", ["XamlGL/Jupiter/Platform/WebGL/Controls/DefaultRenderer", "XamlGL/Controls/Grid", "XamlGL/Jupiter/Platform/WebGL/Controls/GridRenderer", "XamlGL/Controls/StackPanel", "XamlGL/Jupiter/Platform/WebGL/Controls/StackPanelRenderer", "XamlGL/Controls/Image", "XamlGL/Jupiter/Platform/WebGL/Controls/ImageRenderer", "XamlGL/Controls/Rectangle", "XamlGL/Jupiter/Platform/WebGL/Controls/RectangleRenderer", "XamlGL/Controls/Panel", "XamlGL/Utils/ConsoleHelper", "XamlGL/Controls/TextBlock", "XamlGL/Jupiter/Platform/WebGL/Controls/TextBlockRenderer", "XamlGL/Controls/Button", "XamlGL/Jupiter/Platform/WebGL/Controls/ButtonRenderer", "XamlGL/Controls/ToolTip", "XamlGL/Jupiter/Platform/WebGL/Controls/ToolTipRenderer", "XamlGL/Controls/Path", "XamlGL/Jupiter/Platform/WebGL/Controls/PathRenderer", "XamlGL/Controls/CheckBox", "XamlGL/Jupiter/Platform/WebGL/Controls/CheckBoxRenderer"], function(exports_96, context_96) {
    "use strict";
    var __moduleName = context_96 && context_96.id;
    var DefaultRenderer_1, Grid_1, GridRenderer_1, StackPanel_2, StackPanelRenderer_1, Image_1, ImageRenderer_1, Rectangle_1, RectangleRenderer_1, Panel_7, ConsoleHelper_14, TextBlock_1, TextBlockRenderer_1, Button_2, ButtonRenderer_1, ToolTip_2, ToolTipRenderer_1, Path_1, PathRenderer_1, CheckBox_1, CheckBoxRenderer_1;
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
            function (StackPanel_2_1) {
                StackPanel_2 = StackPanel_2_1;
            },
            function (StackPanelRenderer_1_1) {
                StackPanelRenderer_1 = StackPanelRenderer_1_1;
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
            },
            function (Panel_7_1) {
                Panel_7 = Panel_7_1;
            },
            function (ConsoleHelper_14_1) {
                ConsoleHelper_14 = ConsoleHelper_14_1;
            },
            function (TextBlock_1_1) {
                TextBlock_1 = TextBlock_1_1;
            },
            function (TextBlockRenderer_1_1) {
                TextBlockRenderer_1 = TextBlockRenderer_1_1;
            },
            function (Button_2_1) {
                Button_2 = Button_2_1;
            },
            function (ButtonRenderer_1_1) {
                ButtonRenderer_1 = ButtonRenderer_1_1;
            },
            function (ToolTip_2_1) {
                ToolTip_2 = ToolTip_2_1;
            },
            function (ToolTipRenderer_1_1) {
                ToolTipRenderer_1 = ToolTipRenderer_1_1;
            },
            function (Path_1_1) {
                Path_1 = Path_1_1;
            },
            function (PathRenderer_1_1) {
                PathRenderer_1 = PathRenderer_1_1;
            },
            function (CheckBox_1_1) {
                CheckBox_1 = CheckBox_1_1;
            },
            function (CheckBoxRenderer_1_1) {
                CheckBoxRenderer_1 = CheckBoxRenderer_1_1;
            }],
        execute: function() {
            RendererHelper = class RendererHelper {
                static FrameworkElementToRenderer(element) {
                    if (element instanceof Grid_1.Grid) {
                        return new GridRenderer_1.GridRenderer();
                    }
                    else if (element instanceof ToolTip_2.ToolTip) {
                        return new ToolTipRenderer_1.ToolTipRenderer();
                    }
                    else if (element instanceof StackPanel_2.StackPanel) {
                        return new StackPanelRenderer_1.StackPanelRenderer();
                    }
                    else if (element instanceof Image_1.Image) {
                        return new ImageRenderer_1.ImageRenderer();
                    }
                    else if (element instanceof Rectangle_1.Rectangle) {
                        return new RectangleRenderer_1.RectangleRenderer();
                    }
                    else if (element instanceof TextBlock_1.TextBlock) {
                        return new TextBlockRenderer_1.TextBlockRenderer();
                    }
                    else if (element instanceof CheckBox_1.CheckBox) {
                        return new CheckBoxRenderer_1.CheckBoxRenderer();
                    }
                    else if (element instanceof Button_2.Button) {
                        return new ButtonRenderer_1.ButtonRenderer();
                    }
                    else if (element instanceof Path_1.Path) {
                        return new PathRenderer_1.PathRenderer();
                    }
                    else {
                        return new DefaultRenderer_1.DefaultRenderer();
                    }
                }
                static DrawPanel(panel, processChildren) {
                    ConsoleHelper_14.ConsoleHelper.Log("RendererHelper.DrawPanel");
                    panel.Renderer.Draw();
                    if (processChildren) {
                        panel.Children.forEach((uielement) => {
                            if (uielement instanceof Panel_7.Panel) {
                                this.DrawPanel(uielement, processChildren);
                            }
                            else {
                                ConsoleHelper_14.ConsoleHelper.Log("??");
                            }
                        });
                    }
                }
                static HashToColorNumber(hashedColor) {
                    return Number.parseInt("0x" + hashedColor.substring(3, 9));
                }
            };
            exports_96("RendererHelper", RendererHelper);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Platform", ["XamlGL/Jupiter/Platform/WebGL/Renderer", "XamlGL/Controls/Panel", "XamlGL/utils/RendererHelper", "XamlGL/Utils/ConsoleHelper"], function(exports_97, context_97) {
    "use strict";
    var __moduleName = context_97 && context_97.id;
    var Renderer_2, Panel_8, RendererHelper_8, ConsoleHelper_15;
    var Platform;
    return {
        setters:[
            function (Renderer_2_1) {
                Renderer_2 = Renderer_2_1;
            },
            function (Panel_8_1) {
                Panel_8 = Panel_8_1;
            },
            function (RendererHelper_8_1) {
                RendererHelper_8 = RendererHelper_8_1;
            },
            function (ConsoleHelper_15_1) {
                ConsoleHelper_15 = ConsoleHelper_15_1;
            }],
        execute: function() {
            Platform = class Platform {
                constructor(width, height, antialias, transparent, htmlCanvasHost) {
                    this._godRenderer = new Renderer_2.Renderer(width, height, antialias, transparent, htmlCanvasHost);
                    ConsoleHelper_15.ConsoleHelper.Log("Platform:constructor");
                }
                get Renderer() { return this._godRenderer; }
                SetCurrent(content, parent) {
                    content.Platform = this;
                    content.Parent = parent;
                    let fe = this.CreateControlRenderer(content);
                    fe.Element = content;
                    if (content instanceof Panel_8.Panel) {
                        let panel = content;
                        panel.Children.forEach((x) => {
                            this.SetCurrent.call(this, x, content);
                        });
                    }
                }
                UnsetCurrent(content, parent) {
                    if (content instanceof Panel_8.Panel) {
                        let panel = content;
                        panel.Children.forEach((x) => {
                            this.UnsetCurrent.call(this, x, content);
                        });
                    }
                    if (content.Renderer.Element) {
                        content.Renderer.Element = null;
                    }
                    if (content.Renderer) {
                        content.Renderer = null;
                    }
                    content.Parent = null;
                    content.Platform = null;
                }
                DrawAll(content) {
                    content.Renderer.Draw();
                    if (content instanceof Panel_8.Panel) {
                        let panel = content;
                        panel.Children.forEach((x) => {
                            this.DrawAll(x);
                        });
                    }
                }
                Draw(content) {
                    ConsoleHelper_15.ConsoleHelper.LogSectionHeader("Platform:Draw");
                    RendererHelper_8.RendererHelper.DrawPanel(content, false);
                }
                CreateControlRenderer(element) {
                    return RendererHelper_8.RendererHelper.FrameworkElementToRenderer(element);
                }
            };
            exports_97("Platform", Platform);
        }
    }
});
System.register("XamlGL/Reader/XamlMarkup", [], function(exports_98, context_98) {
    "use strict";
    var __moduleName = context_98 && context_98.id;
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
            exports_98("XamlMarkup", XamlMarkup);
        }
    }
});
System.register("XamlGL/Reader/XamlParser", ["XamlGL/Controls/Grid", "XamlGL/Controls/ToolTip", "XamlGL/Controls/Button", "XamlGL/Controls/StackPanel", "XamlGL/Controls/Image", "XamlGL/Controls/CheckBox", "XamlGL/Controls/Panel", "XamlGL/Controls/TextBlock", "XamlGL/Controls/Path", "XamlGL/Controls/Rectangle", "XamlGL/DataTypes/Thickness", "XamlGL/DataTypes/HorizontalAlignment", "XamlGL/DataTypes/VerticalAlignment", "XamlGL/DataTypes/CornerRadius", "XamlGL/DataTypes/Orientation", "XamlGL/DataTypes/TextWrapping", "XamlGL/DataTypes/TextWrappingAlign", "XamlGL/DataTypes/DockPosition", "XamlGL/Utils/ConsoleHelper"], function(exports_99, context_99) {
    "use strict";
    var __moduleName = context_99 && context_99.id;
    var Grid_2, ToolTip_3, Button_3, StackPanel_3, Image_2, CheckBox_2, Panel_9, TextBlock_2, Path_2, Rectangle_2, Thickness_5, HorizontalAlignment_5, VerticalAlignment_5, CornerRadius_3, Orientation_2, TextWrapping_3, TextWrappingAlign_3, DockPosition_5, ConsoleHelper_16;
    var XamlParser;
    return {
        setters:[
            function (Grid_2_1) {
                Grid_2 = Grid_2_1;
            },
            function (ToolTip_3_1) {
                ToolTip_3 = ToolTip_3_1;
            },
            function (Button_3_1) {
                Button_3 = Button_3_1;
            },
            function (StackPanel_3_1) {
                StackPanel_3 = StackPanel_3_1;
            },
            function (Image_2_1) {
                Image_2 = Image_2_1;
            },
            function (CheckBox_2_1) {
                CheckBox_2 = CheckBox_2_1;
            },
            function (Panel_9_1) {
                Panel_9 = Panel_9_1;
            },
            function (TextBlock_2_1) {
                TextBlock_2 = TextBlock_2_1;
            },
            function (Path_2_1) {
                Path_2 = Path_2_1;
            },
            function (Rectangle_2_1) {
                Rectangle_2 = Rectangle_2_1;
            },
            function (Thickness_5_1) {
                Thickness_5 = Thickness_5_1;
            },
            function (HorizontalAlignment_5_1) {
                HorizontalAlignment_5 = HorizontalAlignment_5_1;
            },
            function (VerticalAlignment_5_1) {
                VerticalAlignment_5 = VerticalAlignment_5_1;
            },
            function (CornerRadius_3_1) {
                CornerRadius_3 = CornerRadius_3_1;
            },
            function (Orientation_2_1) {
                Orientation_2 = Orientation_2_1;
            },
            function (TextWrapping_3_1) {
                TextWrapping_3 = TextWrapping_3_1;
            },
            function (TextWrappingAlign_3_1) {
                TextWrappingAlign_3 = TextWrappingAlign_3_1;
            },
            function (DockPosition_5_1) {
                DockPosition_5 = DockPosition_5_1;
            },
            function (ConsoleHelper_16_1) {
                ConsoleHelper_16 = ConsoleHelper_16_1;
            }],
        execute: function() {
            XamlParser = class XamlParser {
                static XamlMarkupToUIElement(xaml) {
                    ConsoleHelper_16.ConsoleHelper.Log("XamlHelper.XamlMarkupToUIElement");
                    let ret = this.ProcessRoot(xaml.rootElement);
                    return ret;
                }
                static ProcessRoot(el) {
                    let col = el.childNodes;
                    for (let x = 0; x < col.length; x++) {
                        let child = col.item(x);
                        let el = this.ProcessRootNode(child);
                        if (el !== null) {
                            return el;
                        }
                    }
                }
                static ProcessRootNode(el) {
                    let newFE = this.GetFrameworkElementByNode(el);
                    if (newFE !== null && newFE instanceof Panel_9.Panel) {
                        return this.ProcessCollectionNodes(newFE, el.childNodes);
                    }
                    return null;
                }
                static ProcessCollectionNodes(rootPanel, col) {
                    if (!col) {
                        return null;
                    }
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
                    let newFE = this.GetFrameworkElementByNode(el);
                    if (newFE instanceof Panel_9.Panel) {
                        return this.ProcessCollectionNodes(newFE, el.childNodes);
                    }
                    else {
                        return newFE;
                    }
                }
                static GetFrameworkElementByNode(node) {
                    if (node.nodeName === "Rectangle") {
                        let rect = new Rectangle_2.Rectangle();
                        rect.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
                        rect.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
                        rect.Background = node.attributes.getNamedItem("Fill").value;
                        rect.BorderBrush = node.attributes.getNamedItem("Stroke").value;
                        rect.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
                        let stokeThickness = this.StringToNumber(node.attributes.getNamedItem("StrokeThickness"));
                        rect.BorderThickness = new Thickness_5.Thickness(stokeThickness);
                        return rect;
                    }
                    else if (node.nodeName === "Image") {
                        let img = new Image_2.Image();
                        img.SourceUrl = node.attributes.getNamedItem("Source").value;
                        img.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
                        img.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
                        img.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
                        img.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
                        img.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
                        return img;
                    }
                    else if (node.nodeName === "Grid") {
                        let grid = new Grid_2.Grid();
                        grid.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
                        grid.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
                        grid.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
                        grid.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
                        grid.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
                        if (node.attributes.getNamedItem("Background") !== null) {
                            grid.Background = node.attributes.getNamedItem("Background").value;
                        }
                        return grid;
                    }
                    else if (node.nodeName === "StackPanel") {
                        let stackpanel = new StackPanel_3.StackPanel();
                        stackpanel.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
                        stackpanel.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
                        stackpanel.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
                        stackpanel.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
                        stackpanel.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
                        stackpanel.Orientation = this.StringToOrientation(node.attributes.getNamedItem("Orientation"));
                        if (node.attributes.getNamedItem("Background") !== null) {
                            stackpanel.Background = node.attributes.getNamedItem("Background").value;
                        }
                        return stackpanel;
                    }
                    else if (node.nodeName === "Text") {
                        let text = new TextBlock_2.TextBlock();
                        text.Text = node.attributes.getNamedItem("Text").value;
                        text.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
                        text.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
                        text.Color = node.attributes.getNamedItem("Color").value;
                        text.FontSize = this.StringToNumber(node.attributes.getNamedItem("FontSize"));
                        text.FontFamily = node.attributes.getNamedItem("FontFamily").value;
                        text.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
                        text.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
                        text.TextWrapping = this.StringToTextWrapping(node.attributes.getNamedItem("TextWrapping"));
                        text.TextWrappingAlign = this.StringToTextWrappingAlign(node.attributes.getNamedItem("TextWrappingAlign"));
                        return text;
                    }
                    else if (node.nodeName === "Button") {
                        let button = new Button_3.Button();
                        button.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
                        button.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
                        button.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
                        button.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
                        button.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
                        if (node.attributes.getNamedItem("Background") !== null) {
                            button.Background = node.attributes.getNamedItem("Background").value;
                        }
                        button.BorderBrush = node.attributes.getNamedItem("Stroke").value;
                        let stokeThickness = this.StringToNumber(node.attributes.getNamedItem("StrokeThickness"));
                        button.BorderThickness = new Thickness_5.Thickness(stokeThickness);
                        button.CornerRadius = this.StringToCornerRadius(node.attributes.getNamedItem("CornerRadius"));
                        button.BlurAmount = this.StringToNumber(node.attributes.getNamedItem("BlurAmount"));
                        button.ClickStr = this.StringToEmpty(node.attributes.getNamedItem("Click"));
                        button.HasToolTip = this.StringToBoolean(node.attributes.getNamedItem("HasToolTip"));
                        button.TooltipDockPosition = this.StringToDockPosition(node.attributes.getNamedItem("TooltipDockPosition"));
                        return button;
                    }
                    else if (node.nodeName === "ToolTip") {
                        let tooltip = new ToolTip_3.ToolTip();
                        tooltip.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
                        tooltip.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
                        tooltip.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
                        tooltip.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
                        tooltip.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
                        if (node.attributes.getNamedItem("Background") !== null) {
                            tooltip.Background = node.attributes.getNamedItem("Background").value;
                        }
                        return tooltip;
                    }
                    else if (node.nodeName === "Path") {
                        let path = new Path_2.Path();
                        path.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
                        path.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
                        path.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
                        path.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
                        if (node.attributes.getNamedItem("Scale")) {
                            path.Scale = this.StringToNumberFloat(node.attributes.getNamedItem("Scale"));
                        }
                        path.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
                        path.Data = node.attributes.getNamedItem("Data").value;
                        path.Stroke = node.attributes.getNamedItem("Stroke").value;
                        path.StrokeThickness = this.StringToNumber(node.attributes.getNamedItem("StrokeThickness"));
                        if (node.attributes.getNamedItem("Fill")) {
                            path.Fill = node.attributes.getNamedItem("Fill").value;
                        }
                        else {
                            path.Fill = "";
                        }
                        if (node.attributes.getNamedItem("IsSmooth")) {
                            path.IsSmooth = this.StringToBoolean(node.attributes.getNamedItem("IsSmooth"));
                        }
                        return path;
                    }
                    else if (node.nodeName === "CheckBox") {
                        let cb = new CheckBox_2.CheckBox();
                        cb.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
                        cb.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
                        cb.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
                        cb.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
                        cb.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
                        if (node.attributes.getNamedItem("Foreground")) {
                            cb.Foreground = node.attributes.getNamedItem("Foreground").value;
                        }
                        if (node.attributes.getNamedItem("CheckedPath")) {
                            cb.CheckedPath = node.attributes.getNamedItem("CheckedPath").value;
                        }
                        if (node.attributes.getNamedItem("UncheckedPath")) {
                            cb.UncheckedPath = node.attributes.getNamedItem("UncheckedPath").value;
                        }
                        if (node.attributes.getNamedItem("CheckedPadding")) {
                            cb.CheckedPadding = this.StringToThickness(node.attributes.getNamedItem("CheckedPadding"));
                        }
                        return cb;
                    }
                    return null;
                }
                static StringToThickness(attr) {
                    if (attr === null) {
                        return new Thickness_5.Thickness(0);
                    }
                    let margin = new Thickness_5.Thickness(0);
                    let parts = attr.value.split(",");
                    margin.Left = Number.parseInt(parts[0]);
                    margin.Top = Number.parseInt(parts[1]);
                    margin.Right = Number.parseInt(parts[2]);
                    margin.Bottom = Number.parseInt(parts[3]);
                    return margin;
                }
                static StringToCornerRadius(attr) {
                    if (attr === null) {
                        return new CornerRadius_3.CornerRadius(0);
                    }
                    if (attr.value.indexOf(",") > 0) {
                        let radius = new CornerRadius_3.CornerRadius(0);
                        let parts = attr.value.split(",");
                        radius.BottomLeft = Number.parseInt(parts[0]);
                        radius.TopLeft = Number.parseInt(parts[1]);
                        radius.TopRight = Number.parseInt(parts[2]);
                        radius.BottomLeft = Number.parseInt(parts[3]);
                        return radius;
                    }
                    else {
                        return new CornerRadius_3.CornerRadius(Number.parseInt(attr.value));
                    }
                }
                static StringToHorizontalAlignment(attr) {
                    if (attr === null) {
                        return HorizontalAlignment_5.HorizontalAlignment.Stretch;
                    }
                    if (attr.value === "Left") {
                        return HorizontalAlignment_5.HorizontalAlignment.Left;
                    }
                    else if (attr.value === "Center") {
                        return HorizontalAlignment_5.HorizontalAlignment.Center;
                    }
                    else if (attr.value === "Right") {
                        return HorizontalAlignment_5.HorizontalAlignment.Right;
                    }
                    else if (attr.value === "Stretch") {
                        return HorizontalAlignment_5.HorizontalAlignment.Stretch;
                    }
                }
                static StringToNumber(attr) {
                    if (attr === null) {
                        return 0;
                    }
                    return Number.parseInt(attr.value);
                }
                static StringToNumberFloat(attr) {
                    if (attr === null) {
                        return 0;
                    }
                    return Number.parseFloat(attr.value);
                }
                static StringToBoolean(attr) {
                    if (attr === null) {
                        return false;
                    }
                    if (attr.value.toLowerCase() === "true") {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                static StringToEmpty(attr) {
                    if (attr === null) {
                        return "";
                    }
                    return attr.value;
                }
                static StringToVerticalAlignment(attr) {
                    if (attr === null) {
                        return VerticalAlignment_5.VerticalAlignment.Stretch;
                    }
                    if (attr.value === "Bottom") {
                        return VerticalAlignment_5.VerticalAlignment.Bottom;
                    }
                    else if (attr.value === "Center") {
                        return VerticalAlignment_5.VerticalAlignment.Center;
                    }
                    else if (attr.value === "Top") {
                        return VerticalAlignment_5.VerticalAlignment.Top;
                    }
                    else if (attr.value === "Stretch") {
                        return VerticalAlignment_5.VerticalAlignment.Stretch;
                    }
                }
                static StringToOrientation(attr) {
                    if (attr === null) {
                        return Orientation_2.Orientation.Horizontal;
                    }
                    if (attr.value === "Horizontal") {
                        return Orientation_2.Orientation.Horizontal;
                    }
                    else if (attr.value === "Vertical") {
                        return Orientation_2.Orientation.Vertical;
                    }
                }
                static StringToTextWrapping(attr) {
                    if (attr === null) {
                        return TextWrapping_3.TextWrapping.NoWrap;
                    }
                    if (attr.value === "NoWrap") {
                        return TextWrapping_3.TextWrapping.NoWrap;
                    }
                    else if (attr.value === "WrapWholeWords") {
                        return TextWrapping_3.TextWrapping.WrapWholeWords;
                    }
                    else if (attr.value === "Wrap") {
                        return TextWrapping_3.TextWrapping.Wrap;
                    }
                }
                static StringToTextWrappingAlign(attr) {
                    if (attr === null) {
                        return TextWrappingAlign_3.TextWrappingAlign.Left;
                    }
                    if (attr.value === "Left") {
                        return TextWrappingAlign_3.TextWrappingAlign.Left;
                    }
                    else if (attr.value === "Center") {
                        return TextWrappingAlign_3.TextWrappingAlign.Center;
                    }
                    else if (attr.value === "Right") {
                        return TextWrappingAlign_3.TextWrappingAlign.Right;
                    }
                }
                static StringToDockPosition(attr) {
                    if (attr === null) {
                        return DockPosition_5.DockPosition.Top;
                    }
                    if (attr.value === "Left") {
                        return DockPosition_5.DockPosition.Left;
                    }
                    else if (attr.value === "Top") {
                        return DockPosition_5.DockPosition.Top;
                    }
                    else if (attr.value === "Right") {
                        return DockPosition_5.DockPosition.Right;
                    }
                    else if (attr.value === "Bottom") {
                        return DockPosition_5.DockPosition.Bottom;
                    }
                }
            };
            exports_99("XamlParser", XamlParser);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/PlatformPage", ["XamlGL/Jupiter/Page", "XamlGL/Jupiter/Platform/WebGL/Platform", "XamlGL/Events/EventList", "XamlGL/Reader/XamlParser", "XamlGL/Utils/ConsoleHelper"], function(exports_100, context_100) {
    "use strict";
    var __moduleName = context_100 && context_100.id;
    var Page_2, Platform_2, EventList_2, XamlParser_1, ConsoleHelper_17;
    var PlatformPage, WindowEventArgs;
    return {
        setters:[
            function (Page_2_1) {
                Page_2 = Page_2_1;
            },
            function (Platform_2_1) {
                Platform_2 = Platform_2_1;
            },
            function (EventList_2_1) {
                EventList_2 = EventList_2_1;
            },
            function (XamlParser_1_1) {
                XamlParser_1 = XamlParser_1_1;
            },
            function (ConsoleHelper_17_1) {
                ConsoleHelper_17 = ConsoleHelper_17_1;
            }],
        execute: function() {
            PlatformPage = class PlatformPage extends Page_2.Page {
                constructor(width, height, antialias, transparent, htmlCanvasHost, xaml) {
                    super();
                    this._events = new EventList_2.EventList();
                    let win = window;
                    win.PlatformPage = this;
                    this.ContentChanged.subscribe(this.DoContentChanged.bind(this));
                    this.Width = width;
                    this.Height = height;
                    this._antialias = antialias;
                    this._transparent = transparent;
                    this._htmlCanvasHost = htmlCanvasHost;
                    this._xaml = xaml;
                    this.Platform = this.CreatePlatform();
                    if (xaml.rootElement.hasAttribute("ShellType")) {
                        let shellType = xaml.rootElement.getAttribute("ShellType");
                        if (shellType === "FullWidth") {
                            let shellHeight = Number.parseInt(xaml.rootElement.getAttribute("ShellHeight"));
                            this.Height = shellHeight;
                            this.ResizeBanner(this.Height);
                        }
                        else if (shellType === "FullWindow") {
                            this.ResizeFullWindow();
                        }
                        else if (shellType === "Fixed") {
                            let shellWidth = Number.parseInt(xaml.rootElement.getAttribute("ShellWidth"));
                            let shellHeight = Number.parseInt(xaml.rootElement.getAttribute("ShellHeight"));
                            this.Width = shellWidth;
                            this.Height = shellHeight;
                            this.Resize(this.Width, this.Height);
                        }
                    }
                    this.Content = XamlParser_1.XamlParser.XamlMarkupToUIElement(xaml);
                    this.InitializeShell();
                }
                get Activated() { return this._events.get("Activated"); }
                get Closed() { return this._events.get("Closed"); }
                get SizeChanged() { return this._events.get("SizeChanged"); }
                get VisibilityChanged() { return this._events.get("VisibilityChanged"); }
                CreatePlatform() {
                    return new Platform_2.Platform(this.Width, this.Height, this._antialias, this._transparent, this._htmlCanvasHost);
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
                ResizeBanner(height) {
                    this.Platform.Renderer.ResizeFullWidth(height);
                }
                DoContentChanged(obj, ea) {
                    ConsoleHelper_17.ConsoleHelper.Log("PlatformPage.DoContentChanged");
                    let pp = obj;
                    pp.Platform.SetCurrent(pp.Content, this);
                    ConsoleHelper_17.ConsoleHelper.LogSectionHeader("DrawAll");
                    pp.Platform.DrawAll(pp.Content);
                }
                set IsLoading(value) {
                    if (value) {
                        this.Platform.Renderer.InitializeLoadingResource("assets/silverlight_anims.jpg")
                            .load(() => {
                            this.Platform.Renderer.ShowLoading();
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
            exports_100("PlatformPage", PlatformPage);
            WindowEventArgs = class WindowEventArgs {
            };
            exports_100("WindowEventArgs", WindowEventArgs);
        }
    }
});
System.register("XamlGL/ViewManager", [], function(exports_101, context_101) {
    "use strict";
    var __moduleName = context_101 && context_101.id;
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
                    $.get(`/views/${view}.html?v=2`).done((data) => {
                        jqContent.html(data);
                        rivets.bind($(`.${view}`), { model: model });
                        if (done) {
                            done.call(this, jqContent);
                        }
                    });
                }
            };
            ViewManager._isReady = false;
            exports_101("ViewManager", ViewManager);
        }
    }
});
System.register("XamlGL/App", ["XamlGL/Jupiter/Platform/WebGL/PlatformPage", "XamlGL/ViewManager", "XamlGL/Jupiter/Application"], function(exports_102, context_102) {
    "use strict";
    var __moduleName = context_102 && context_102.id;
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
                    this._platformPage = new PlatformPage_2.PlatformPage(512, 512, true, false, htmlCanvasHost, xaml);
                }
            };
            exports_102("App", App);
        }
    }
});
System.register("XamlGL/VisualTree", ["Libs/typescript-collections/src/lib/index"], function(exports_103, context_103) {
    "use strict";
    var __moduleName = context_103 && context_103.id;
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
            exports_103("VisualTree", VisualTree);
            VisualTreeNode = class VisualTreeNode {
                constructor(Name = null, ID = null) {
                    this.Name = Name;
                    this.ID = ID;
                }
                get Children() { return this._children; }
            };
            exports_103("VisualTreeNode", VisualTreeNode);
        }
    }
});
System.register("XamlGL/Reader/XamlReader", ["XamlGL/Reader/XamlMarkup"], function(exports_104, context_104) {
    "use strict";
    var __moduleName = context_104 && context_104.id;
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
            exports_104("XamlReader", XamlReader);
        }
    }
});
System.register("XamlGL/Controls/Control", ["XamlGL/Jupiter/FrameworkElement"], function(exports_105, context_105) {
    "use strict";
    var __moduleName = context_105 && context_105.id;
    var FrameworkElement_6;
    var Control;
    return {
        setters:[
            function (FrameworkElement_6_1) {
                FrameworkElement_6 = FrameworkElement_6_1;
            }],
        execute: function() {
            Control = class Control extends FrameworkElement_6.FrameworkElement {
            };
            exports_105("Control", Control);
        }
    }
});
System.register("XamlGL/Controls/ContentControl", ["XamlGL/Controls/Control"], function(exports_106, context_106) {
    "use strict";
    var __moduleName = context_106 && context_106.id;
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
            exports_106("ContentControl", ContentControl);
        }
    }
});
System.register("XamlGL/Controls/Frame", ["XamlGL/Controls/ContentControl"], function(exports_107, context_107) {
    "use strict";
    var __moduleName = context_107 && context_107.id;
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
            exports_107("Frame", Frame);
        }
    }
});
System.register("XamlGL/Controls/LoadingBalls", [], function(exports_108, context_108) {
    "use strict";
    var __moduleName = context_108 && context_108.id;
    var LoadingBalls;
    return {
        setters:[],
        execute: function() {
            LoadingBalls = class LoadingBalls {
                constructor() {
                }
            };
            exports_108("LoadingBalls", LoadingBalls);
        }
    }
});
System.register("XamlGL/Controls/Core", ["XamlGL/Controls/ContentControl", "XamlGL/Controls/Control", "XamlGL/Controls/Frame", "XamlGL/Controls/Grid", "XamlGL/Controls/Image", "XamlGL/Controls/LoadingBalls", "XamlGL/Controls/Panel", "XamlGL/Controls/Rectangle", "XamlGL/Controls/TextBlock"], function(exports_109, context_109) {
    "use strict";
    var __moduleName = context_109 && context_109.id;
    function exportStar_2(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_109(exports);
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
            function (Panel_10_1) {
                exportStar_2(Panel_10_1);
            },
            function (Rectangle_3_1) {
                exportStar_2(Rectangle_3_1);
            },
            function (TextBlock_3_1) {
                exportStar_2(TextBlock_3_1);
            }],
        execute: function() {
        }
    }
});
System.register("XamlGL/Events/Core", ["XamlGL/Events/EventList", "XamlGL/Events/EventDispatcher"], function(exports_110, context_110) {
    "use strict";
    var __moduleName = context_110 && context_110.id;
    function exportStar_3(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_110(exports);
    }
    return {
        setters:[
            function (EventList_3_1) {
                exportStar_3(EventList_3_1);
            },
            function (EventDispatcher_8_1) {
                exportStar_3(EventDispatcher_8_1);
            }],
        execute: function() {
        }
    }
});
System.register("XamlGL/Core", ["XamlGL/App", "XamlGL/VisualTree", "XamlGL/ViewManager", "XamlGL/Reader/XamlReader", "XamlGL/Reader/XamlParser", "XamlGL/Reader/XamlMarkup", "XamlGL/Controls/Core", "XamlGL/Events/Core", "XamlGL/DataTypes/Guid", "XamlGL/DataTypes/Thickness", "XamlGL/DataTypes/CornerRadius"], function(exports_111, context_111) {
    "use strict";
    var __moduleName = context_111 && context_111.id;
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
        exports_111(exports);
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
            function (XamlParser_2_1) {
                exportStar_4(XamlParser_2_1);
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
            function (Guid_5_1) {
                exportStar_4(Guid_5_1);
            },
            function (Thickness_6_1) {
                exportStar_4(Thickness_6_1);
            },
            function (CornerRadius_4_1) {
                exportStar_4(CornerRadius_4_1);
            }],
        execute: function() {
            exports_111("Controls", Controls = _controls);
            exports_111("Events", Events = _events);
        }
    }
});
System.register("Bootstrap/XamlApp", ["XamlGL/Core"], function(exports_112, context_112) {
    "use strict";
    var __moduleName = context_112 && context_112.id;
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
                    let xaml = this.parseQueryString(location.search).xaml;
                    if (!xaml) {
                        console.warn("No application specified.");
                        return;
                    }
                    let xm = XamlGLCore.XamlReader.LoadUri(`/xaml/${xaml}`, (el) => {
                        console.log(xm.rootElement);
                        let app = new XamlGLCore.App();
                        app.Start(xm);
                    });
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
                parseQueryString(url) {
                    var urlParams = {};
                    url.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function ($0, $1, $2, $3) {
                        return urlParams[$1] = $3;
                    });
                    return urlParams;
                }
            };
            exports_112("XamlApp", XamlApp);
        }
    }
});
System.register("Tests/TestBase", ["Libs/typescript-collections/src/lib/index"], function(exports_113, context_113) {
    "use strict";
    var __moduleName = context_113 && context_113.id;
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
            exports_113("TestBase", TestBase);
        }
    }
});
System.register("Tests/XamlGL/VisualTree", ["XamlGL/Core", "Tests/TestBase"], function(exports_114, context_114) {
    "use strict";
    var __moduleName = context_114 && context_114.id;
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
            exports_114("Tests", Tests);
        }
    }
});
System.register("XamlGL/Jupiter/IconElement", ["XamlGL/Jupiter/FrameworkElement"], function(exports_115, context_115) {
    "use strict";
    var __moduleName = context_115 && context_115.id;
    var FrameworkElement_7;
    var IconElement;
    return {
        setters:[
            function (FrameworkElement_7_1) {
                FrameworkElement_7 = FrameworkElement_7_1;
            }],
        execute: function() {
            IconElement = class IconElement extends FrameworkElement_7.FrameworkElement {
                constructor() {
                    super();
                    this.Foreground = "#FFFFFFFF";
                }
                get Foreground() { return this._foreground; }
                set Foreground(value) { this._foreground = value; }
            };
            exports_115("IconElement", IconElement);
        }
    }
});
System.register("XamlGL/Controls/PathIcon", ["XamlGL/Jupiter/IconElement"], function(exports_116, context_116) {
    "use strict";
    var __moduleName = context_116 && context_116.id;
    var IconElement_1;
    var PathIcon;
    return {
        setters:[
            function (IconElement_1_1) {
                IconElement_1 = IconElement_1_1;
            }],
        execute: function() {
            PathIcon = class PathIcon extends IconElement_1.IconElement {
                constructor() {
                    super();
                    this.Foreground = "";
                }
                get Geometry() { return this._geometry; }
                set Geometry(value) { this._geometry = value; }
            };
            exports_116("PathIcon", PathIcon);
        }
    }
});
System.register("XamlGL/Jupiter/Platform/WebGL/Controls/Core", ["XamlGL/Jupiter/Platform/WebGL/Controls/DefaultRenderer", "XamlGL/Jupiter/Platform/WebGL/Controls/GridRenderer", "XamlGL/Jupiter/Platform/WebGL/Controls/ImageRenderer", "XamlGL/Jupiter/Platform/WebGL/Controls/RectangleRenderer"], function(exports_117, context_117) {
    "use strict";
    var __moduleName = context_117 && context_117.id;
    function exportStar_5(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_117(exports);
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
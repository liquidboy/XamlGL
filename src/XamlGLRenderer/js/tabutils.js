﻿/*
Jitbit TabUtils - helper for multiple browser tabs. version 1.0

https://github.com/jitbit/TabUtils

- executing "interlocked" function call - only once per multiple tabs
- broadcasting a message to all tabs (including the current one) with some message "data"
- handling a broadcasted message

MIT license: https://github.com/jitbit/TabUtils/blob/master/LICENSE
*/

var TabUtils = new (function () {

    var keyPrefix = "_tabutils_"; //just a unique id for key-naming

    //runs code only once in multiple tabs
    //the lock holds for 4 seconds (in case the function is async and returns right away, for example, an ajax call intiated)
    //then it is cleared
    this.CallOnce = function (lockname, fn) {

        if (!window.localStorage) { //no local storage. old browser. screw it, just run the function
            fn();
            return;
        }

        var localStorageKey = keyPrefix + lockname;

        //add random delay to "serialize" two calls, in case called literally simultaniously
        setTimeout(function () {

            if (localStorage.getItem(localStorageKey) === null) { //no lock found yet
                localStorage.setItem(localStorageKey, "1");

                fn();

                //cleanup - release the lock after 4 seconds and on window unload (just in case user closed the window while the lock is still held)
                setTimeout(function () { localStorage.removeItem(localStorageKey); }, 3000);
                $(window).unload(function () { localStorage.removeItem(localStorageKey); });
            }
            else
                return; //call already runs... return
        }, Math.random() * 50);
    }

    this.BroadcastMessageToAllTabs = function (messageId, eventData1, eventData2, includeCurrentTab) {
        //console.log("tabutils:BroadcastMessageToAllTabs:" + messageId )
        if (!window.localStorage) return; //no local storage. old browser

        //this triggers 'storage' event for all other tabs except the current tab
        let key = keyPrefix + "event" + messageId;
        localStorage.setItem(key + "_data", JSON.stringify(eventData2));
        localStorage.setItem(key, eventData1);

        //now we also need to manually execute handler in the current tab too, because current tab does not get 'storage' events
        if (includeCurrentTab && includeCurrentTab === true) {
            try { handlers[messageId](eventData1, eventData2); } //"try" in case handler not found
            catch (x) { }
        }
    }

    var handlers = {};

    this.OnBroadcastMessage = function (messageId, fn) {
        if (!window.localStorage) return; //no local storage. old browser

        //first register a handler for "storage" event that we trigger above
        $(window).on('storage', function (ev) {
            let key = keyPrefix + "event" + messageId;
            if (ev.originalEvent.key != key) return; // ignore other keys
            let topic = ev.originalEvent.newValue;
            if (topic === "") return;
            //console.log(ev);
            let data = this.localStorage.getItem(ev.originalEvent.key + "_data");
            fn(topic, JSON.parse(data));
        });

        //second, add callback function to the local array so we can access it directly
        handlers[messageId] = fn;
    }
})();

import { EventDispatcher } from "./EventDispatcher"

/** Storage class for multiple events that are accessible by name.
 * Events are automatically created. */
export class EventList<TSender, TArgs> {

    private _events: { [name: string]: EventDispatcher<TSender, TArgs>; } = {};

    get(name: string): EventDispatcher<TSender, TArgs> {

        let event = this._events[name];

        if (event) {
            return event;
        }

        event = new EventDispatcher<TSender, TArgs>();
        this._events[name] = event;
        return event;
    }

    remove(name: string): void {
        this._events[name] = null;
    }
}


// https://keestalkstech.com/2016/03/strongly-typed-events-in-typescript-using-an-event-list-part-3/
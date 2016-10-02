import { DebugSettings } from "./DebugSettings";
import { ApplicationTheme } from "./ApplicationTheme";
import { ResourceDictionary } from "./ResourceDictionary";
import { Guid } from "./../DataTypes/Guid";
import { EventList } from "./../Events/EventList";
import { IEventArgs } from "./../Events/IEventArgs";
import { IEvent } from "./../Events/IEvent";

export class Application {

    //properties
    private _sessionId: string;
    private _resourceDictionary: ResourceDictionary;
    private _applicationTheme: ApplicationTheme;
    private _debugSettings: DebugSettings;

    get SessionID(): string { return this._sessionId; }
    get ResourceDictionary(): ResourceDictionary { return this._resourceDictionary; }
    get ApplicationTheme(): ApplicationTheme { return this._applicationTheme; }
    get DebugSettings(): DebugSettings { return this._debugSettings; }

    //events
    private _events: EventList<Application, ApplicationEventArgs> = new EventList<Application, ApplicationEventArgs>();

    get EnteredBackground(): IEvent<Application, ApplicationEventArgs> { return this._events.get('EnteredBackground'); }
    get LeavingBackground(): IEvent<Application, ApplicationEventArgs> { return this._events.get('LeavingBackground'); }
    get Resuming(): IEvent<Application, ApplicationEventArgs> { return this._events.get('Resuming'); }
    get Suspending(): IEvent<Application, ApplicationEventArgs> { return this._events.get('Suspending'); }
    get UnhandledException(): IEvent<Application, ApplicationEventArgs> { return this._events.get('UnhandledException'); }



    constructor() {
        this._sessionId = Guid.newGuid();
    }

    private dispatch(name: string) {
        this._events.get(name).dispatch( this, new ApplicationEventArgs(this.SessionID) );
    }



}

export class ApplicationEventArgs implements IEventArgs {
    constructor(public SessionID: string) { }
}

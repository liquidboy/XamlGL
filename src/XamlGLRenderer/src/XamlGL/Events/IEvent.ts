export interface IEvent<TSender, TArgs> {

    subscribe(fn: (sender: TSender, args: TArgs) => void): void;

    unsubscribe(fn: (sender: TSender, args: TArgs) => void): void;
}


// https://keestalkstech.com/2016/03/strongly-typed-event-handlers-in-typescript-part-1/
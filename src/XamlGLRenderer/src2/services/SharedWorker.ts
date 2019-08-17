import { injectable } from "inversify";

declare var TabUtils: any;

@injectable()
export class SharedWorker {

    constructor() {

    }

    public Init() {
        try {
            // console.log("SharedWorker:init");
            TabUtils.OnBroadcastMessage("storage-event", (topicStr: string, data: any) => {
                if (topicStr !== "") {
                    let topic: Topics = Topics[topicStr];
                    //console.log("SharedWorker:listen:post " + topicStr);
                    //console.log("SharedWorker:listen:postdata");
                    //console.log(data);

                    // note: ideally this will bubble up a pubsub message and logic not be found in this class. (at moment this doesnt work cause ALL tabs get message, including initiating tab)
                    switch (topic) {
                        case Topics.ReloadTabs:
                            window.location.reload(false);
                            break;
                        case Topics.RefreshVisualTree:
                            console.log(data);
                            // this.pubSub.publish(Topics.RefreshUserInfo);
                    }
                }
            });
        } catch (e) { }

    }

    public RaiseTopic(topic: Topics, data: any): void {
        //console.log("SharedWorker:raiseTopic");
        try {
            TabUtils.BroadcastMessageToAllTabs("storage-event", "", ""); // this clears existing call to ensure we trigger an update across all listeners
            TabUtils.BroadcastMessageToAllTabs("storage-event", Topics[topic], data);
        } catch (e) { }
    }

}


export enum Topics {
    RefreshVisualTree,
    ReloadTabs
}

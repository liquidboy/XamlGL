import { injectable } from "inversify";
import { VisualTree } from "./VisualTree";
import { DIContainer } from "../Xaml/Core";

declare var TabUtils: any;

@injectable()
export class SharedWorker {

    constructor() {
        this.Init();
    }

    private Init() {
        
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
                            let vt: VisualTree = DIContainer.get<VisualTree>(VisualTree);
                            //console.log(vt);
                            //console.log(data);
                            var foundItem = vt.FindByName(this.CleanData(data.ClassXName));
                            //console.log(foundItem);
                            foundItem.ChangeValue(data.Attribute, this.CleanData(data.Value));
                            // this.pubSub.publish(Topics.RefreshUserInfo);
                    }
                }
            });
        } catch (e) { }

    }

    private CleanData(value: string): string {
        return value.replace('"', '').replace('"', '');
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

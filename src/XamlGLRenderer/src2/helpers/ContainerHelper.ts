import { injectable } from  "inversify";
import { Dictionary } from "../libs/typescript-collections/src/lib";
import { UIElement } from "../Xaml/jupiter/Core";
import { DIContainer, DisplayMode, SharedWorker } from "./../xaml/Core";

@injectable()
export class ContainerHelper {
    
    constructor() {
        
    }

    public GetSharedWorker(): SharedWorker {
        return DIContainer.get(SharedWorker);
    }
}
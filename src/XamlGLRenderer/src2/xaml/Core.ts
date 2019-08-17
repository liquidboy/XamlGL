export * from "./App";
export * from "./reader/XamlReader";
export * from "./reader/XamlParser";
export * from "./reader/XamlMarkup";

export * from "../services/VisualTree";
export * from "../services/CodeEditor";
export * from "../services/SharedWorker";

import * as _controls from "./jupiter/controls/Core";
import { Container } from "inversify";
import { SharedWorker, Topics } from "../services/SharedWorker";

export let Controls: any = _controls;

export * from "./datatypes/Guid";

export const DIContainer = new Container();
export const Worker = new SharedWorker();

export enum DisplayMode { RenderMode = 0, CodeMode }

export * from "./App";
export * from "./reader/XamlReader";
export * from "./reader/XamlParser";
export * from "./reader/XamlMarkup";

export * from "../services/VisualTree";

import * as _controls from "./jupiter/controls/Core";
import { Container } from "inversify";
export let Controls: any = _controls;

export * from "./datatypes/Guid";

export const DIContainer = new Container();
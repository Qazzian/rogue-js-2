import { createRoot } from "react-dom/client";
import GameComponents from "./GameComponents";

import "./index.css";
import React from "react";

const container = document.getElementById("App") as HTMLElement;
const root = createRoot(container);
root.render(React.createElement(GameComponents));

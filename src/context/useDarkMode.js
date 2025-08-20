import {useContext} from "react";
import {DarkModeContext} from "./DarkModeContext.js";

export const useDarkMode = () => useContext(DarkModeContext);
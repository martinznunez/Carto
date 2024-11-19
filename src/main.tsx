/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React from "react";

import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";

import Router from "./routes/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
);

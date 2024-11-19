import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {FlowBoardLayout, PageNotFound} from "../components";
import {ROUTES} from "./constants";
import React from "react";
import {Map} from "../modules/map";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <FlowBoardLayout />,
  },
  {
    path: ROUTES.MAP,
    element: <Map />,
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {FlowBoardLayout, PageNotFound} from "../components";
import {ROUTES} from "./constants";
import React from "react";
import {Map} from "../modules/map";
import {MapConnectionsProvider} from "../context/MapConnectionsContext";

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
  return (
    <MapConnectionsProvider>
      <RouterProvider router={router} />
    </MapConnectionsProvider>
  );
};

export default Router;

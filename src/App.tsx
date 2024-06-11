import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./app.css";
import { GridHorizontal } from "./examples/grid-horizontal";
import { GridVertical } from "./examples/grid-vertical";
import { MasonryHorizontal } from "./examples/masonry-horizontal";
import { MasonryVertical } from "./examples/masonry-vertical";
import { Layout } from "./layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/horizontal",
        element: <GridHorizontal />,
      },
      {
        path: "/",
        element: <GridVertical />,
      },
      {
        path: "/vertical",
        element: <GridVertical />,
      },
      {
        path: "/horizontal-masonry",
        element: <MasonryHorizontal />,
      },
      {
        path: "/vertical-masonry",
        element: <MasonryVertical />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home";
import ListFoods from "./Pages/ListFoods";
import CreateFood from "./Pages/CreateFood";
import UpdateFood from "./Pages/UpdateFood";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Recipe from "./Pages/Recipe";
import Favourites from "./Pages/Favourites";
import Vote from "./Pages/Vote"

import Protected from "./Components/Protected";
import GuestsOnly from "./Components/GuestsOnly";
import AuthProvider from "./Context/AuthProvider";

import "./index.css";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/foods",
        element: (
          <Protected>
            <ListFoods/>
          </Protected>
        ),
      },
      {
        path: "/vote",
        element: (
          <Protected>
            <Vote/>
          </Protected>
        ),
      },
      {
        path: "/favorites",
        element: (
          <Protected>
            <Favourites/>
          </Protected>
        ),
      },
      
      {
        path: "/food/:id",
        element: (
          <Protected>
            <Recipe />
          </Protected>
        ),
      },
      {
        path: "/create",
        element: (
          <Protected>
            <CreateFood />
          </Protected>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <Protected>
            <UpdateFood />
          </Protected>
        ),
      },
      {
        path: "/sign-in",
        element: (
          <GuestsOnly>
            <SignIn />
          </GuestsOnly>
        ),
      },
      {
        path: "/sign-up",
        element: (
          <GuestsOnly>
            <SignUp />
          </GuestsOnly>
        ),
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

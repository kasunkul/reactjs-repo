import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { LoginLayout } from "./layouts";
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import EditPost from "./views/EditPost";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import Login from "./views/Login";

import { getToken } from './utils/auth';

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/task-list" />
  },
  {
    path: "/add-new-task",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/edit-task",
    layout: DefaultLayout,
    component: EditPost
  },
  {
    path: "/task-list",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/login",
    layout: LoginLayout,
    component: Login
  }

  
];

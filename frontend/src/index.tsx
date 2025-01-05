import { Router } from "@solidjs/router";
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import "./index.css";

const root = document.getElementById("root");

const routes = [
    {
        path: "/",
        component: lazy(() => import("./App")),
    },
    {
        path: "/auth/login",
        component: lazy(() => import("./routes/auth/login")),
    },
    {
        path: "/auth/signup",
        component: lazy(() => import("./routes/auth/signup")),
    },
];

if (root) {
    render(() => <Router>{routes}</Router>, root);
} else throw new Error("Wrapper not found");

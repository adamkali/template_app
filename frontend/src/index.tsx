import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";
import "./index.css";
import App from "./App";
import LoginPage from "./routes/auth/login";
import SignUpPage from "./routes/auth/signup";
import RootLayout from "./components/Navbar";

const root = document.getElementById("root");

if (root) {
    render(() => (
        <Router root={RootLayout}>
            <Route path="/" component={() => <App />} />
            <Route path="/auth">
                <Route path="/login" component={() => <LoginPage />} />
                <Route path="/signup" component={() => <SignUpPage />} />
            </Route>
        </Router>
    ), root);
} else throw new Error("Wrapper not found");

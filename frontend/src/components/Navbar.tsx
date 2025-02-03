import { Component, createEffect, createSignal, Show } from "solid-js";
import { LoginResponse } from "@/responses";
import useCookies from "@/libs/cookie";
import { A, RouteSectionProps, useLocation } from "@solidjs/router";

const RootLayout: Component<RouteSectionProps<unknown>> = (params) => {
    const { getUser, removeUser } = useCookies();
    const [getUserValue, _] = createSignal<LoginResponse | null>(getUser());
    const someUser = () =>
        getUserValue() &&
        getUserValue()?.token !== null &&
        getUserValue()?.token !== undefined;

    const username = () => getUserValue()?.name ?? "Unknown";
    const location = useLocation();
    createEffect(() => {
        console.log({
            "There is a user logged in": someUser,
            "They are at": { ...location },
        });
    });

    return (
        <div class="flex flex-col justify-center items-center">
            <Show
                when={someUser()}
                fallback={<UnauthenticatedNavbar removeUser={removeUser} />}
            >
                <AuthenticatedNavbar removeUser={removeUser} username={username} />
            </Show>
            {params.children}
        </div>
    );
};

const UnauthenticatedNavbar = (_: {
    removeUser: () => void;
}) => {
    return (
        <header class="navbar bg-base-100 w-full justify-between">
            <div class="flex flex-row space-x-8">
                <A href="/auth/login">Login</A>
                <A href="/auth/signup">Signup</A>
            </div>
            <div class="flex-none">
                <details class="dropdown">
                    <summary class="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            class="inline-block h-5 w-5 stroke-current"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                            ></path>
                        </svg>
                    </summary>
                </details>
            </div>
        </header>
    );
};

const AuthenticatedNavbar = (params: {
    username: () => string
    removeUser: () => void;
}) => {
    return (
        <header class="navbar bg-base-100 w-full justify-between">
            <div class="flex flex-row space-x-8">
                <A href="/">Welcome</A>
                <A href="/info">What is this?</A>
            </div>
            <div class="flex-none">
                <details class="dropdown">
                    <summary class="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            class="inline-block h-5 w-5 stroke-current"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                            ></path>
                        </svg>
                        <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 -translate-x-32 shadow">
                            <li>
                                <span class="text-sm text-primary-content font-bold">{params.username()}</span>
                            </li>
                            <li>
                                <button
                                    onClick={params.removeUser}
                                    class="btn btn-neutral text-lg"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </summary>
                </details>
            </div>
        </header>
    );
};

export default RootLayout;

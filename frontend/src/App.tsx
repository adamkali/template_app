import { A } from "@solidjs/router";
import useCookies from "@/libs/cookie";
import { createEffect, createMemo, createSignal, Show } from "solid-js";
import { copyToClipboard } from "./libs/clipboard";


// create a framework for myself.

const App = () => {
	const { getUser, removeUser } = useCookies();
	const [getCopied, setCopied] = createSignal<boolean>(false);

	const tokenDisplay = createMemo(() => {
		const truncatedInput = getUser()?.token?.slice(0, 10);
		const hasMoreChars = getUser()?.token?.length ?? 11 > 11;
		const lastTenChars = hasMoreChars ? getUser()?.token?.slice(-10) : "";
		return `${truncatedInput}...${lastTenChars}`;
	});

	const handleClick = async () => {
		await copyToClipboard({
			value: getUser()?.token,
			message: "Token Copied to clipboard",
		});
		setCopied(true);
	};

	createEffect(() => {
		let timeoutId: number;
		if (getCopied() === true) {
			timeoutId = setInterval(() => {
				setCopied(false);
			}, 2000); // Run every 3 seconds
		}
		return () => {
			clearInterval(timeoutId);
		};
	});

	const Authenticated = () => {
		return (
			<div class="flex flex-col justify-center items-center">
				<header class="navbar bg-base-100 w-full justify-between">
					<div class="flex flex-row space-x-8">
						<A href="/">Welcome</A>
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
							<ul class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 -translate-x-32 shadow">
								<li>
									<button onClick={removeUser}class="btn btn-neutral text-lg">Logout</button>
								</li>
							</ul>
						</details>
					</div>
				</header>
				<div class="flex flex-col card bg-base-200 w-2/3 h-2/3 shadow-xl my-auto p-12 space-y-2">
					<figure>
						<img src="https://loco.rs/icon.svg" width="260px" alt="LocoRS" />
					</figure>
					<div class="card-title items-center text-4xl text-primary text-center pt-4">
						Welcome {getUser()?.name} to a LocoRS Made App
					</div>
					<div class="card-body flex flex-col space-y-4">
						<div class="flex flex-row space-x-2 items-center justify-between">
							<span>Your Token is:</span>
							<div class="divider-horizontal divider-primary"></div>
							<button class="btn btn-link" onClick={handleClick}>
								{tokenDisplay()}
							</button>
						</div>
						<div class="flex flex-row space-x-2 justify-center">
							<span>
								You are
								<Show
									when={getUser()?.isVerified ?? false}
									fallback={<b> not </b>}
								>
									<span> </span>
								</Show>
								Verified
							</span>
						</div>
					</div>
				</div>
				<footer class="flex flex-row justify-end">
					<Show when={getCopied()}>
						<div class="toast">
							<div class="alert alert-info">
								<span>Your token has been copied.</span>
							</div>
						</div>
					</Show>
				</footer>
			</div>
		);
	};

	const Unauthenticated = () => {
		return (
			<div class="navbar bg-base-100">
				<div class="flex flex-row space-x-8">
					<A href="/auth/login">Login</A>
					<A href="/auth/signup">Signup</A>
				</div>
				<div class="flex-none">
					<button class="btn btn-square btn-ghost">
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
					</button>
				</div>
				<div class="flex flex-col card bg-base-200 w-2/3 h-2/3 shadow-xl my-auto p-12 space-y-2">
					<figure>
						<img src="https://loco.rs/icon.svg" width="260px" alt="LocoRS" />
					</figure>
					<div class="card-title items-center text-4xl text-primary text-center pt-4">
						Welcome to a LocoRS Made App for You!
					</div>
					<div class="card-body flex flex-col space-y-4">
						<div class="flex flex-row space-x-2 items-center justify-between">
                            You must login to continue.
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<Show when={getUser() !== null} fallback={<Unauthenticated />}>
			<Authenticated />
		</Show>
	);
};

export default App;

import { A } from "@solidjs/router";
import useCookies from "@/libs/cookie";
import { createEffect, createMemo, createSignal, Show } from "solid-js";
import { copyToClipboard } from "./libs/clipboard";


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
			<div class="flex flex-col justify-center items-center">
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

import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { AuthApi, RegisterParams } from "@/api";

type RegisterError = {
	key: string;
	error: string | undefined;
};

const SignUpPage = () => {
	const [getUsername, setUsername] = createSignal<string>();
	const [getEmail, setEmail] = createSignal<string>();
	const [getPassword, setPassword] = createSignal<string>();
	const [getVerifyPassword, setVerifyPassword] = createSignal<string>();

	const [getRegisterErrors, setRegisterErrors] = createSignal<
		Array<RegisterError>
	>([
		{
			key: "mismatchedPasswords",
			error: undefined,
		},
		{
			key: "userEmailError",
			error: undefined,
		},
		{
			key: "usernameError",
			error: undefined,
		},
	]);

	createEffect(() => {
		if (getPassword() !== getVerifyPassword()) {
			setRegisterErrors((errs) =>
				errs.map((err) => {
					if (err.key === "mismatchedPasswords") {
						err.error = "Your Passwords Do not match";
					}
					return err;
				}),
			);
		}
		if (getUsername() === undefined) {
			setRegisterErrors((errs) =>
				errs.map((err) => {
					if (err.key === "usernameError") {
						err.error = "Please set Your username";
					}
					return err;
				}),
			);
		}
		if (getEmail() === undefined) {
			setRegisterErrors((errs) =>
				errs.map((err) => {
					if (err.key === "emailError") {
						err.error = "Please set Your email";
					}
					return err;
				}),
			);
		}
        console.log(getRegisterErrors())
	});

    const areRegisterErrors = createMemo(() => {
        let any = false
        
        getRegisterErrors().forEach((err) => {
            if (err.error !== undefined) {
                any = true
            }
        })
        return any;
    })

	const handleCLick = async () => {
		try {
			const registerParams = {
                name: getUsername(),
				email: getEmail(),
				password: getPassword(),
			} as RegisterParams;
			const auth = new AuthApi();
			await auth.register({ registerParams });
			window.location.href = "/auth/login";
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const SignUpButton = () => {
		return (
			<div class="card-actions flex flex-row justify-evenly items-center space-x-8">
				<div class="w-32 flex flex-col text-sm">
					<For each={getRegisterErrors()}>
						{(registerError) => {
							if (registerError.error !== undefined) {
								return (
									<div role="alert" class="alert alert-error">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6 shrink-0 stroke-current"
											fill="none"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										<span>{registerError.error}</span>
									</div>
								);
							}
						}}
					</For>
				</div>
				<button class="btn btn-primary w-32" onClick={handleCLick}>
					Sign Up
				</button>
			</div>
		);
	};

	const SignUpDisabledButton = () => {
		return (
			<div class="card-actions flex flex-row justify-evenly items-center space-x-8">
				<div class="w-32"></div>
				<button class="btn btn-disabled w-32">Sign Up</button>;
			</div>
		);
	};

	return (
		<div class="flex flex-1 justify-center align-middle w-full min-h-svh">
			<div class="flex flex-col card bg-base-200 w-2/3 h-2/3 shadow-xl my-auto p-12">
				<div class="card-title items-center text-4xl">Login</div>
				<div class="card-body flex flex-col space-y-4">
					<div class="flex flex-row justify-evenly items-center space-x-8 w-full">
						<label for="username" id="username-label" class="text-2xl w-1/2">
							eMail Address
						</label>
						<input
							id="username"
							type="email"
							placeholder="FooBar"
							class="input input-bordered w-1/2 max-w-xs"
							value={getEmail() ?? ""}
							onChange={(e) => setEmail(e.currentTarget.value)}
						/>
					</div>
					<div class="flex flex-row justify-evenly items-center space-x-8 w-full">
						<label for="username" id="username-label" class="text-2xl w-1/2">
							Username
						</label>
						<input
							id="username"
							type="text"
							placeholder="Type here"
							class="input input-bordered w-1/2 max-w-xs"
							value={getUsername() ?? ""}
							onChange={(e) => setUsername(e.currentTarget.value)}
						/>
					</div>
					<div class="flex flex-row justify-evenly items-center space-x-8 w-full">
						<label for="passward" id="passward-label" class="text-2xl w-1/2">
							Password
						</label>
						<input
							id="passward"
							type="password"
							class="input input-bordered w-1/2 max-w-xs"
							value={getPassword() ?? ""}
							onChange={(e) => setPassword(e.currentTarget.value)}
						/>
					</div>
					<div class="flex flex-row justify-evenly items-center space-x-8 w-full">
						<label
							for="verify-passward"
							id="verify-passward-label"
							class="text-2xl w-1/2"
						>
							Verify Password
						</label>
						<input
							id="verify-passward"
							type="password"
							class="input input-bordered w-1/2 max-w-xs"
							value={getVerifyPassword() ?? ""}
							onChange={(e) => setVerifyPassword(e.currentTarget.value)}
						/>
					</div>
					<div class="flex flex-row justify-end items-center w-full"></div>
				</div>
				<div class="card-actions flex flex-row justify-evenly items-center space-x-8">
					<div class="w-32"></div>
					<Show when={areRegisterErrors()} fallback={<SignUpDisabledButton />}>
						<SignUpButton />
					</Show>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;

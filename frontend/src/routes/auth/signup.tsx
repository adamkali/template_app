import { createSignal } from "solid-js";
import { AuthApi, RegisterRequest } from "@/api";

const SignUpPage = () => {
	const [getUsername, setUsername] = createSignal<string>();
	const [getEmail, setEmail] = createSignal<string>();
	const [getPassword, setPassword] = createSignal<string>();
	const [getVerifyPassword, setVerifyPassword] = createSignal<string>();


	const handleCLick = async () => {
		try {
			const registerParams = { body: {
                name: getUsername(),
				email: getEmail(),
				password: getPassword(),
			}} as RegisterRequest;
            console.log({...registerParams});
			const auth = new AuthApi();
			await auth.register(registerParams);
			window.location.href = "/auth/login";
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const SignUpButton = () => {
		return (
			<div class="card-actions flex flex-row justify-evenly items-center space-x-8">
				<div class="w-32 flex flex-col text-sm">
				</div>
				<button class="btn btn-primary w-32" onClick={handleCLick}>
					Sign Up
				</button>
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
                    <SignUpButton />
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;

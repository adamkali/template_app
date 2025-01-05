import { createSignal } from "solid-js";
import { AuthApi, LoginParams, LoginResponse } from "@/api";
import useCookies from "@/libs/cookie";

const LoginPage = () => {
	const [getUsername, setUsername] = createSignal<string>();
	const [getPassword, setPassword] = createSignal<string>();
    const {createUser} = useCookies();
   
    const handleCLick = async () => {
        const loginParams = {
            email: getUsername() ?? "",
            password: getPassword() ?? "",
        } as LoginParams
        const auth = new AuthApi()
        const response = await auth.login({ loginParams })
        if (response.data && response.successful) {
            const data = response.data as LoginResponse;
            createUser(data);
            if (response.nextLink) {
                window.location.href = response.nextLink
            }
        } else throw new Error(response.message ?? "OOPS")
    }

	return (
		<div class="flex flex-1 justify-center align-middle w-full min-h-svh">
			<div class="flex flex-col card bg-base-200 w-2/3 h-2/3 shadow-xl my-auto p-12">
				<div class="card-title items-center text-4xl">Login</div>
				<div class="card-body flex flex-col space-y-4">
					<div class="flex flex-row justify-evenly items-center space-x-8 w-full">
						<label for="username" id="username-label" class="text-2xl">
							Username
						</label>
						<input
							id="username"
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full max-w-xs"
                            value={getUsername()}
                            onChange={(e) => setUsername(e.currentTarget.value)}
						/>
					</div>
					<div class="flex flex-row justify-evenly items-center space-x-8 w-full">
						<label for="passward" id="passward-label" class="text-2xl">
							Password
						</label>
						<input
							id="passward"
							type="password"
							class="input input-bordered w-full max-w-xs"
                            value={getPassword()}
                            onChange={(e) => setPassword(e.currentTarget.value)}
						/>
					</div>
					<div class="flex flex-row justify-end items-center w-full"></div>
				</div>
				<div class="card-actions flex flex-row justify-evenly items-center space-x-8">
					<div class="w-32"></div>
					<button class="btn btn-primary w-32" onClick={handleCLick}>Login</button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;

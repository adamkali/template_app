import { AuthApi, AuthApiLoginRequest, AuthApiRegisterRequest } from "@/api"

function createAuthAPI(): AuthApi {
    let auth: AuthApi;
    if (import.meta.env.MODE === "development") {
        auth = new AuthApi(undefined,"https://ks.kalilarosa.xyz");
    } else {
        auth = new AuthApi(undefined, "http://localhost:5150");
    }
    return auth;
}

async function createLogin(requestParameters: AuthApiLoginRequest) {
    return (await createAuthAPI().login(requestParameters)).data
}

async function createSignUp(requestParameters: AuthApiRegisterRequest) {
    return (await createAuthAPI().register(requestParameters)).data
}

export {
    createLogin,
    createSignUp,
}

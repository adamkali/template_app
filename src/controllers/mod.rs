pub mod auth;

use auth::{ForgotParams, ResetParams, VerifyParams};
use utoipa::{
    openapi::security::{HttpAuthScheme, HttpBuilder, SecurityScheme},
    Modify, OpenApi,
};

use crate::views::{
    auth::{CurrentResponse, LoginResponse},
    DetailedResponse
};

#[derive(OpenApi)]
#[openapi(
    info(
        title = "OpenAPI doc for template_app",
        license(name = "apache 2.0")
    ),
    servers(
        (url= "http://localhost:5150/api")
    ),
    paths(
        // auth controller
        auth::register,
        auth::verify,
        auth::login,
        auth::forgot,
        auth::reset,
        auth::current,
    ),
    components(schemas(
        DetailedResponse<LoginResponse>,
        DetailedResponse<CurrentResponse>,
        LoginResponse,
        CurrentResponse,
        VerifyParams, ForgotParams, ResetParams
    )),
)]
pub struct OpenAPI;

pub struct SecurityAddon;
impl Modify for SecurityAddon {
    fn modify(&self, openapi: &mut utoipa::openapi::OpenApi) {
        openapi.components = Some(
            utoipa::openapi::ComponentsBuilder::new()
                .security_scheme(
                    "api_jwt_token",
                    SecurityScheme::Http(
                        HttpBuilder::new()
                            .scheme(HttpAuthScheme::Bearer)
                            .bearer_format("JWT")
                            .build(),
                    ),
                )
                .build(),
        )
    }
}

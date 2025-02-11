pub mod auth;
pub mod profile;

use auth::{ForgotParams, ResetParams, VerifyParams};
use profile::UploadProfilePic;
use utoipa::{
    openapi::security::{ HttpAuthScheme, HttpBuilder, SecurityScheme},
    Modify, OpenApi,
};

use crate::views::{
    auth::{CurrentResponse, LoginResponse},
    profile::GetProfileData,
    DetailedResponse,
};

#[derive(OpenApi)]
#[openapi(
    info(
        title = "OpenAPI doc for template_app",
        license(name = "apache 2.0", identifier = "apache-2.0"),
        version = "0.1.0"
    ),
    paths(
        // auth controller
        auth::register,
        auth::verify,
        auth::login,
        auth::forgot,
        auth::reset,
        auth::current,
        // profile controller
        profile::upload_profile_picture,
        profile::get_profile
    ),
    components(schemas(
        DetailedResponse<LoginResponse>,
        DetailedResponse<CurrentResponse>,
        DetailedResponse<String>,
        DetailedResponse<GetProfileData>,
        VerifyParams, ForgotParams, ResetParams,
        UploadProfilePic
    )),
)]
pub struct OpenAPI;

pub struct SecurityAddon;
impl Modify for SecurityAddon {
    fn modify(&self, openapi: &mut utoipa::openapi::OpenApi) {
        if let Some(components) = openapi.components.as_mut() {
            let jwt = HttpBuilder::new().scheme(HttpAuthScheme::Bearer).bearer_format("JWT").build();
            components.add_security_scheme(
                "authorization",
                SecurityScheme::Http(jwt),
            )
        }
    }
}

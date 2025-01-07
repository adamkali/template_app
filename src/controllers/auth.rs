use axum::debug_handler;
use loco_rs::prelude::*;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use crate::{
    mailers::auth::AuthMailer,
    models::{
        _entities::users,
        users::{LoginParams, RegisterParams},
    },
    views::{
        auth::{CurrentResponse, LoginResponse}, DetailedResponse,
    },
};


#[derive(Debug, Deserialize, Serialize, ToSchema)]
pub struct VerifyParams {
    pub token: String,
}

#[derive(Debug, Deserialize, Serialize, ToSchema)]
pub struct ForgotParams {
    pub email: String,
}

#[derive(Debug, Deserialize, Serialize, ToSchema)]
pub struct ResetParams {
    pub token: String,
    pub password: String,
}

/// Register function creates a new user with the given parameters and sends a
/// welcome email to the user
#[utoipa::path(
    post,
    path="/auth/register",
    responses(
        (status=200, description = "Registered successfully", body=DetailedResponse<String>)
    ),
    request_body=RegisterParams,
)]
#[debug_handler]
async fn register(
    State(ctx): State<AppContext>,
    Json(params): Json<RegisterParams>,
) -> Result<Response> {
    let res = users::Model::create_with_password(&ctx.db, &params).await;

    let user = match res {
        Ok(user) => user,
        Err(err) => {
            tracing::info!(
                message = err.to_string(),
                user_email = &params.email,
                "could not register user",
            );
            return format::json(());
            }
    };

    let user = user
        .into_active_model()
        .set_email_verification_sent(&ctx.db)
        .await?;

    AuthMailer::send_welcome(&ctx, &user).await?;
    
    let mut response =DetailedResponse::new(Some("Registered"));
    response.next_link("/auth/verify").successful().json()
}

/// Verify register user. if the user not verified his email, he can't login to
/// the system.
#[utoipa::path(
    post,
    path="/auth/verify",
    responses(
        (status=200, description = "Verified successfully")
    ),
    request_body(
        content_type = "application/json",
        content = VerifyParams
    )
)]
#[debug_handler]
pub async fn verify(
    State(ctx): State<AppContext>,
    Json(params): Json<VerifyParams>,
) -> Result<Response> {
    let user = users::Model::find_by_verification_token(&ctx.db, &params.token).await?;

    if user.email_verified_at.is_some() {
        tracing::info!(pid = user.pid.to_string(), "user already verified");
    } else {
        let active_model = user.into_active_model();
        let user = active_model.verified(&ctx.db).await?;
        tracing::info!(pid = user.pid.to_string(), "user verified");
    }

    format::json(())
}

/// In case the user forgot his password  this endpoints generate a forgot token
/// and send email to the user. In case the email not found in our DB, we are
/// returning a valid request for for security reasons (not exposing users DB
/// list).
#[utoipa::path(
    post,
    path="/auth/forgot",
    responses(
        (status=200, description = "An email was sent")
    ),
    request_body(
        content_type = "application/json",
        content = ForgotParams
    )
)]
#[debug_handler]
pub async fn forgot(
    State(ctx): State<AppContext>,
    Json(params): Json<ForgotParams>,
) -> Result<Response> {
    let Ok(user) = users::Model::find_by_email(&ctx.db, &params.email).await else {
        // we don't want to expose our users email. if the email is invalid we still
        // returning success to the caller
        return format::json(());
    };

    let user = user
        .into_active_model()
        .set_forgot_password_sent(&ctx.db)
        .await?;

    AuthMailer::forgot_password(&ctx, &user).await?;

    format::json(())
}

/// reset user password by the given parameters
#[utoipa::path(
    post,
    path="/auth/reset",
    responses(
        (status=200, description = "An email was sent")
    ),
    request_body(
        content_type = "application/json",
        content = ResetParams
    )
)]
#[debug_handler]
pub async fn reset(
    State(ctx): State<AppContext>,
    Json(params): Json<ResetParams>,
) -> Result<Response> {
    let Ok(user) = users::Model::find_by_reset_token(&ctx.db, &params.token).await else {
        // we don't want to expose our users email. if the email is invalid we still
        // returning success to the caller
        tracing::info!("reset token not found");

        return format::json(());
    };
    user.into_active_model()
        .reset_password(&ctx.db, &params.password)
        .await?;

    format::json(())
}

/// Creates a user login and returns a token
#[utoipa::path(
    post,
    path="/auth/login",
    responses(
        (status=200, description = "An email was sent", body=DetailedResponse<LoginResponse>),
        (status=401, description = "An email was sent", body=DetailedResponse<LoginResponse>)
    ),
    request_body(
        content_type = "application/json",
        content = LoginParams
    )
)]
#[debug_handler]
pub async fn login(
    State(ctx): State<AppContext>,
    Json(params): Json<LoginParams>,
) -> Result<Response> {
    let user = users::Model::find_by_email(&ctx.db, &params.email).await?;

    let valid = user.verify_password(&params.password);

    if !valid {
        return DetailedResponse::<LoginResponse>::fail(
            401,
            None,
            Error::Unauthorized("Login Credentials are incorrect.".to_string()),
        )
        .json();
    }

    let jwt_secret = ctx.config.get_jwt_config()?;

    let token = user
        .generate_jwt(&jwt_secret.secret, &jwt_secret.expiration)
        .or_else(|_| unauthorized("unauthorized!"))?;

    DetailedResponse::ok(LoginResponse::new(&user, &token), Some("/".to_string())).json()
}

#[utoipa::path(
    get,
    path="/auth/current",
    responses(
        (status=200, description = "An email was sent", body=DetailedResponse<CurrentResponse>),
        (status=401, description = "An email was sent", body=DetailedResponse<CurrentResponse>)
    ),
    security(
        ("api_jwt_token" = [])
    )
)]
#[debug_handler]
pub async fn current(auth: auth::JWT, State(ctx): State<AppContext>) -> Result<Response> {
    let user = users::Model::find_by_pid(&ctx.db, &auth.claims.pid).await?;
    DetailedResponse::ok(CurrentResponse::new(&user), None).json()
}

pub fn routes() -> Routes {
    Routes::new()
        .prefix("/api/auth")
        .add("/register", post(register))
        .add("/verify", post(verify))
        .add("/login", post(login))
        .add("/forgot", post(forgot))
        .add("/reset", post(reset))
        .add("/current", get(current))
}

use axum::{debug_handler, extract::State, response::Response, Json};
use loco_rs::prelude::*;
use loco_rs::{Error, Result};
use minio::s3::args::GetObjectArgs;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use crate::common::Settings;
use crate::models::_entities::profiles;
use crate::models::users;
use crate::storages::minio::MinIO;
use crate::views::profile::GetProfileData;
use crate::views::DetailedResponse;

#[derive(Debug, Deserialize, Serialize, ToSchema)]
pub struct UploadProfilePic {
    pub filename: String,
}

#[utoipa::path(
    post,
    path="/api/profile",
    responses(
        (status=200, description = "Registered successfully", body=DetailedResponse<String>),
        (status=401, description = "Not authenticated", body=DetailedResponse<String>),
        (status=500, description = "Internal server error", body=DetailedResponse<String>)
    ),
    request_body(
        content_type = "application/json",
        content = UploadProfilePic
    ),
    security(
        ("authorization" = [])
    )
)]
#[debug_handler]
async fn upload_profile_picture(
    auth: auth::JWT,
    State(ctx): State<AppContext>,
    Json(params): Json<UploadProfilePic>,
) -> Result<Response> {
    // get the current authenticated user
    if let Err(err) = users::Model::find_by_pid(&ctx.db, &auth.claims.pid).await {
        return DetailedResponse::<String>::fail(
            401,
            Some("/auth/login".to_string()),
            Error::wrap(err),
        )
        .json();
    }

    // update the profile picture location in the database
    match profiles::Model::update_profile_pic(
        &ctx.db,
        &Uuid::parse_str(&auth.claims.pid).unwrap(),
        &params.filename,
    )
    .await
    {
        Ok(_) => DetailedResponse::ok("None".to_string(), None)
            .successful()
            .json(),
        Err(err) => DetailedResponse::<String>::fail(304, None, Error::wrap(err)).json(),
    }
}

#[utoipa::path(
    get,
    path="/api/profile",
    responses(
        (status=200, description = "Registered successfully", body=DetailedResponse<GetProfileData>),
        (status=401, description = "Not authenticated", body=DetailedResponse<GetProfileData>),
        (status=500, description = "Internal server error", body=DetailedResponse<GetProfileData>)
    ),
    security(
        ("authorization" = [])
    )
)]
#[debug_handler]
async fn get_profile(auth: auth::JWT, State(ctx): State<AppContext>) -> Result<Response> {
    if let Err(err) = users::Model::find_by_pid(&ctx.db, &auth.claims.pid).await {
        return DetailedResponse::<String>::fail(
            401,
            Some("/auth/login".to_string()),
            Error::wrap(err),
        ).into()
    }

    let mut response: DetailedResponse<GetProfileData> =
        match profiles::Model::get_profile(&ctx.db, &Uuid::parse_str(&auth.claims.pid).unwrap())
            .await
        {
            Ok(data) => DetailedResponse::new(Some(data.into())),
            Err(err) => {
                return DetailedResponse::<GetProfileData>::fail(404, None, Error::wrap(err)).json()
            }
        };

    let settings = Settings::from_json(&ctx.config.settings.unwrap())?;
    let minio_client = match MinIO::new(settings.minio_config) {
        Ok(minio_cli) => minio_cli,
        Err(err) => return response.wrap(err).json()
    };
    let args = match GetObjectArgs::new(&auth.claims.pid, "profilePic") {
        Err(error) => return response.wrap(error).json(),
        Ok(args) => args,
    };
    match minio_client
        .client
        .get_object(&args)
        .await
        .map_err(Error::wrap)
    {
        Ok(s3_response) => {
            let mut data = response.data.unwrap().clone();
            data.profile_picture_url = Some(s3_response.url().to_string());
            response.data = Some(data);
        },
        Err(error) => return response.wrap(error).json(),
    }
    response.successful().json()
}

pub fn routes() -> Routes {
    Routes::new()
        .prefix("/api/profile")
        .add("/", post(upload_profile_picture))
        .add("/", get(get_profile))
}

use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use uuid::Uuid;

use crate::models::_entities::profiles;

#[derive(Debug, Deserialize, Serialize, ToSchema, Clone)]
pub struct GetProfileData {
    pub user_pid: Uuid,
    pub profile_picture_url: Option<String>,
    pub description: Option<String>,
}

impl From<profiles::Model> for GetProfileData {
    fn from(value: profiles::Model) -> Self {
        GetProfileData {
            user_pid: value.user_pid,
            profile_picture_url: None,
            description: value.description,
        }
    }
}


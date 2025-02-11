use minio::s3::creds::Provider;
use serde::{Deserialize, Serialize};
use loco_rs::Result;
use loco_rs::Error;

#[derive(Serialize, Deserialize, Default, Debug)]
pub struct Settings {
    pub minio_config: MinioConfig,
}

#[derive(Serialize, Deserialize, Default, Debug, Clone)]
pub struct MinioConfig {
    pub uri: String,
    pub access_key: String,
    pub secret_key: String
}

impl Provider for MinioConfig {
    fn fetch(&self) -> minio::s3::creds::Credentials {
        minio::s3::creds::Credentials {
            access_key: self.access_key.clone(),
            secret_key: self.secret_key.clone(),
            session_token: None,
        }
    }
}

impl Settings {
    pub fn from_json(json_value: &serde_json::Value) -> Result<Self> {
        let mut settings = Settings::default();
        let binding = json_value.clone();
        let minio_config_json: Option<&serde_json::Value> = binding.get("minio_config");
        if let Some(minio_config_value) = minio_config_json {
            let minio_config =  serde_json::from_value(minio_config_value.clone()).map_err(Error::wrap)?;
            settings.minio_config = minio_config;
        } else {
            return Err(loco_rs::Error::Message("MinioConfig".to_string()));
        }
        Ok(settings)
    }
}


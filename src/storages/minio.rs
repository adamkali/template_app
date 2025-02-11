use loco_rs::Error;
use loco_rs::Result;
use minio::s3::args::ListBucketsArgs;
use minio::s3::{
    client::{Client, ClientBuilder},
    http::BaseUrl,
};

use crate::common::MinioConfig;

#[derive(Debug)]
pub struct MinIO {
    pub client: Client,
    pub config: MinioConfig,
}

impl MinIO {
    pub fn new(config: MinioConfig) -> Result<MinIO> {
        let base_url = config.uri.clone().parse::<BaseUrl>().map_err(Error::wrap)?;
        let client = ClientBuilder::new(base_url)
            .provider(Some(Box::new(config.clone())))
            .build()
            .map_err(Error::wrap)?;
        Ok(MinIO { client, config })
    }

    pub async fn success(&self) -> Result<()> {
        tracing::debug!("MinIO -> {}", self.config.uri);
        let args: ListBucketsArgs = ListBucketsArgs { extra_headers: None, extra_query_params: None };
        match self.client.list_buckets(&args).await {
            Ok(_) => {
                tracing::debug!("MinIO::list_buckets succeeded");
                tracing::info!("MinIO successfully wired into the server.");
                Ok(())
            }
            Err(err) => {
                tracing::error!("MinIO::list_buckets FAILED");
                Err(Error::wrap(err))
            }
        }
    }
}


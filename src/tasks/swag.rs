//! This task implements creating the open_api doc for
//! generated types in the `frontend/src/api` directory
//!
//! # Example
//!
//! Run the task with the following command:
//! ```sh
//! cargo run task
//! ```
//!
//! To override existing data and reset the data structure, use the following
//! command with the `refresh:true` argument:
//! ```sh
//! cargo run task gen_api
//! ```

use loco_rs::prelude::*;
use std::{
    fs::{self, File},
    io::{BufWriter, Write},
};
use tokio::process::Command;
use utoipa::OpenApi;

use crate::controllers::OpenAPI;

#[allow(clippy::module_name_repetitions)]
pub struct GenSwagger;
#[async_trait]
impl Task for GenSwagger {
    fn task(&self) -> TaskInfo {
        TaskInfo {
            name: "swag".to_string(),
            detail: "Generates an OpenAPI doc and runs the openapi-generator-cli. Check `frontend/src/api` for the output".to_string(),
        }
    }

    async fn run(&self, _app_context: &AppContext, _vars: &task::Vars) -> Result<()> {
        let file = File::create("open_api.json")?;
        let output_dir = "./frontend/src/api";
        let mut writer = BufWriter::new(file);
        let prett_json = OpenAPI::openapi();
        serde_json::to_writer(&mut writer, &prett_json)?;
        tracing::info!("Open API Doc Written");
        writer.flush()?;

        fs::create_dir_all(output_dir).unwrap_or_else(|_| {
            tracing::warn!("Directory {} does not exist. Creating it...", output_dir);
            fs::create_dir_all(output_dir).unwrap_or_else(|err| tracing::error!("{}", err));
        });

        let mut fut = match Command::new("openapi-generator-cli")
            .arg("generate")
            .arg("-g")
            .arg("typescript-axios")
            .arg("-o")
            .arg(output_dir)
            .arg("-i")
            .arg("open_api.json")
            .arg("--skip-validate-spec")
            .arg("--additional-properties=supportsES6=true,useSingleRequestParameter=true")
            .spawn() {
                Ok(future_res) => future_res,
                Err(err) => {
                    tracing::error!("{:?}",err);
                    return Err(loco_rs::Error::IO(err))
                }
            };
        

        match fut.wait().await {
            Ok(exit_status) => {
                if exit_status.success() {
                    return Ok(());
                } else {
                    tracing::warn!("The generator failed: {}", exit_status.to_string());
                    return Ok(());
                }
            }
            Err(err) => {
                tracing::error!("{}", err);
                return Err(err.into());
            }
        }
    }
}

pub mod auth;
pub mod profile;

use axum::http;
use loco_rs::prelude::format::json;
use loco_rs::prelude::Response;
use loco_rs::prelude::Result;

use serde::Serialize;
use utoipa::ToSchema;

#[derive(Debug, Serialize, ToSchema, Clone)]
pub struct DetailedResponse<DataType: Clone>
where
    DataType: Serialize,
{
    pub data: Option<DataType>,
    successful: bool,
    status_code: u16,
    message: Option<String>,
    next_link: Option<String>,
}

impl<DataType> DetailedResponse<DataType>
where
    DataType: Serialize + Clone,
{
    pub fn new(data: Option<DataType>) -> DetailedResponse<DataType> {
        DetailedResponse::<DataType> {
            data,
            status_code: 500,
            successful: false,
            message: None,
            next_link: None,
        }
    }

    pub fn fail(
        status_code: u16,
        next_link: Option<String>,
        err: loco_rs::Error,
    ) -> DetailedResponse<DataType> {
        let mut response = DetailedResponse::new(None);
        response.message = Some(format!("{}: {}", status_code, err));
        response.next_link = next_link;
        response.status_code = status_code;
        response
    }

    pub fn ok(data: DataType, next_link: Option<String>) -> DetailedResponse<DataType> {
        let mut response = DetailedResponse::new(Some(data));
        response.message = Some("OK".to_string());
        response.successful = true;
        response.status_code = 200;
        response.next_link = next_link;
        response
    }

    pub fn next_link(&mut self, next_link: &str) -> Self {
        self.next_link = Some(next_link.to_string());
        self.clone()
    }

    pub fn successful(&mut self) -> Self {
        self.successful = true;
        self.clone()
    }

    pub fn wrap(
        &mut self,
        err: impl std::error::Error + std::marker::Send + std::marker::Sync + 'static,
    ) -> Self {
        let error_standard: loco_rs::Error = loco_rs::Error::wrap(err);
        self.message = Some(format!(
            "{}: {}",
            http::status::StatusCode::INTERNAL_SERVER_ERROR,
            error_standard
        ));
        self.status_code =http::status::StatusCode::INTERNAL_SERVER_ERROR.into();
        self.clone()
    }

    pub fn wrap_int(
        &mut self,
        err: impl std::error::Error + std::marker::Send + std::marker::Sync + 'static,
        status_code: u16,
    ) -> Self {
        let error_standard: loco_rs::Error = loco_rs::Error::wrap(err);
        let status = http::status::StatusCode::from_u16(status_code)
                .unwrap_or(http::status::StatusCode::INTERNAL_SERVER_ERROR);
        self.message = Some(format!(
            "{}: {}",
            status,
            error_standard
        ));
        self.status_code = status.into();
        self.clone()
    }

    pub fn wrap_status_code(
        &mut self,
        err: impl std::error::Error + std::marker::Send + std::marker::Sync + 'static,
        status_code: http::status::StatusCode,
    ) -> Self {
        let error_standard: loco_rs::Error = loco_rs::Error::wrap(err);
        self.message = Some(format!("{}: {}", status_code, error_standard));
        self.status_code = status_code.into();
        self.clone()
    }

    pub fn json(&self) -> Result<Response> {
        json(self)
    }
}

// README!: Add types here
//
impl<DataType> From<DetailedResponse<DataType>> for Result<Response> 
where
    DataType: Serialize + Clone,
{
    fn from(val: DetailedResponse<DataType>) -> Self {
        val.json()
    }
}

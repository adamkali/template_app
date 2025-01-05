pub mod auth;

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
    data: Option<DataType>,
    successful: bool,
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
            successful: false,
            message: None,
            next_link: None,
        }
    }

    pub fn fail(
        status_code: u16,
        next_link: Option<String>,
        err: impl std::error::Error,
    ) -> DetailedResponse<DataType> {
        let mut response = DetailedResponse::new(None);
        response.message = Some(format!("{}: {}", status_code, err));
        response.next_link = next_link;
        response
    }

    pub fn ok(data: DataType, next_link: Option<String>) -> DetailedResponse<DataType> {
        let mut response = DetailedResponse::new(Some(data));
        response.message = Some("OK".to_string());
        response.successful = true;
        response.next_link = next_link;
        response
    }
    
    pub fn next_link(& mut self, next_link: &str) -> Self {
        self.next_link = Some(next_link.to_string());
        self.clone()
    }

    pub fn successful(& mut self) -> Self {
        self.successful = true;
        self.clone()
    }


    pub fn json(&self) -> Result<Response> {
        json(self)
    }
}

// README!: Add types here

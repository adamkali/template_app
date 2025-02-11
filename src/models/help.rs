use sea_orm::entity::prelude::*;
use super::_entities::help::{ActiveModel, Entity};
pub type Help = Entity;

impl ActiveModelBehavior for ActiveModel {
    // extend activemodel below (keep comment for generators)
}

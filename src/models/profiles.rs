use super::_entities::profiles::{self, ActiveModel, Entity};
use loco_rs::model::{self, ModelError, ModelResult};
use sea_orm::{entity::prelude::*, ActiveValue, IntoActiveModel, TransactionTrait};
pub type Profiles = Entity;

impl ActiveModelBehavior for ActiveModel {
    // extend activemodel below (keep comment for generators)
}

impl super::_entities::profiles::Model {
    pub async fn create(db: &DatabaseConnection, user_pid: &Uuid) -> ModelResult<Self> {
        let txn = db.begin().await?;

        let profile = super::_entities::profiles::ActiveModel {
            user_pid: sea_orm::ActiveValue::Set(*user_pid),
            ..Default::default()
        }
        .insert(&txn)
        .await?;

        txn.commit().await?;

        Ok(profile)
    }

    pub async fn update_profile_pic(
        db: &DatabaseConnection,
        user_pid: &Uuid,
        filename: &str,
    ) -> ModelResult<Self> {
        let txn = db.begin().await?;

       let profile =  match profiles::Entity::find()
            .filter(
                model::query::condition()
                    .eq(profiles::Column::UserPid, *user_pid)
                    .build(),
            )
            .one(&txn)
            .await?
        {
            None => return Err(ModelError::EntityNotFound {}),
            Some(profile_old) => {
                let profile = profiles::ActiveModel {
                    profile_file_name: ActiveValue::set(Some(filename.to_string())),
                    ..profile_old.into_active_model()
                }
                .insert(&txn)
                .await?;
                profile
            }
        };

        txn.commit().await?;
        Ok(profile)
    }

    pub async fn get_profile(db: &DatabaseConnection, user_pid: &Uuid) -> ModelResult<Self> {
        let profile = profiles::Entity::find()
            .filter(
                model::query::condition()
                    .eq(profiles::Column::UserPid, *user_pid)
                    .build(),
            )
            .one(db)
            .await?;
        profile.ok_or_else(|| ModelError::EntityNotFound)
    }
}

use loco_rs::cli;
use template_app::app::App;
use migration::Migrator;

#[tokio::main]
async fn main() -> loco_rs::Result<()> {
    
    dotenvy::dotenv().expect("Could not read env vars");
    
    cli::main::<App, Migrator>().await
}

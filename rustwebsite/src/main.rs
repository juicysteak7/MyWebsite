#[macro_use] extern crate rocket;

use rocket::fs::{FileServer, NamedFile};
use std::path::{Path, PathBuf};

#[get("/")]
async fn index() -> Option<NamedFile> {
    NamedFile::open("frontend/static/index.html").await.ok()
}

#[get("/<file..>", rank = 2)]
async fn static_files(file: PathBuf) -> Option<NamedFile> {
    let path = Path::new("frontend/static/").join(file);
    println!("{path:?}");
    NamedFile::open(path).await.ok()
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index, static_files])
        .mount("/frontend/static", FileServer::from("frontend/static"))
}
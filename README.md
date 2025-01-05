# A LocoRS template app 🚂 (Solid Flavor)

A quick note on what this is: This is a starter template project meant to be an ergonomic kitchen sink. 

This also holds a tutorial to show you how to set up automated CI/CD for testing, migrations to a database, and then deploying a docker stack on a remote/home server. It should show you how to get started on a personal project and show you some good practices. Since i was using this generic dns name setup from [this youtube video](https://www.youtube.com/watch?v=fuZoxuBiL9o) as a baseline. This is the Solid Flavor of this starter repository.

## Install 

```bash
git clone https://github.com/adamkali/locors_template_app.git <project_name>
```

## Setup

```bash
cd <project_name>
chmod +x rename.sh
rename.sh . <project_name>
```

## LocoRS 

[Loco](https://loco.rs) is a web and API framework running on Rust.

This is the **SaaS starter** which includes a `User` model and authentication based on JWT.
It also include configuration sections that help you pick either a frontend or a server-side template set up for your fullstack server.


### Quick Start

```sh
$ cargo loco start
Finished dev [unoptimized + debuginfo] target(s) in 21.63s
    Running `target/debug/myapp start`

    :
    :
    :

controller/app_routes.rs:203: [Middleware] Adding log trace id

                      ▄     ▀
                                 ▀  ▄
                  ▄       ▀     ▄  ▄ ▄▀
                                    ▄ ▀▄▄
                        ▄     ▀    ▀  ▀▄▀█▄
                                          ▀█▄
▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄▄▄ ▀▀█
 ██████  █████   ███ █████   ███ █████   ███ ▀█
 ██████  █████   ███ █████   ▀▀▀ █████   ███ ▄█▄
 ██████  █████   ███ █████       █████   ███ ████▄
 ██████  █████   ███ █████   ▄▄▄ █████   ███ █████
 ██████  █████   ███  ████   ███ █████   ███ ████▀
   ▀▀▀██▄ ▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀ ██▀
       ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
                https://loco.rs

environment: development
   database: automigrate
     logger: debug
compilation: debug
      modes: server

listening on http://localhost:5150
```

### Full Stack Serving

You can check your [configuration](config/development.yaml) to pick either frontend setup or server-side rendered template, and activate the relevant configuration sections.


### Getting help

Check out [a quick tour](https://loco.rs/docs/getting-started/tour/) or [the complete guide](https://loco.rs/docs/getting-started/guide/).

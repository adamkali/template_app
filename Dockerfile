FROM rust:1.81-bookworm AS builder

WORKDIR /usr/src/
COPY . .
RUN cargo build --release

FROM debian:bookworm
WORKDIR /usr/app

COPY --from=builder /usr/src/frontend/dist /usr/app/frontend/dist
COPY --from=builder /usr/src/frontend/dist/index.html /usr/app/frontend/dist/index.html
COPY --from=builder /usr/src/assets /usr/app/assets
COPY --from=builder /usr/src/target/release/template_app-cli /usr/app/template_app-cli

RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list; \
apt-get -y update; apt-get -y install curl; \
rm -rf /var/lib/apt/lists/*

EXPOSE 5150

CMD ["/usr/app/template_app-cli", "start", "-e", "production"]

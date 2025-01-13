FROM rust:1.80-slim as builder

WORKDIR /usr/src/

COPY . .

RUN cargo build --release

FROM debian:bookworm

WORKDIR /usr/app

COPY --from=builder /usr/src/frontend/dist /usr/app/frontend/dist
COPY --from=builder /usr/src/frontend/dist/index.html /usr/app/frontend/dist/index.html
COPY --from=builder /usr/src/assets /usr/app/assets
COPY --from=builder /usr/src/config /usr/app/config
COPY --from=builder /usr/src/target/release/template_app-cli /usr/app/template_app-cli

EXPOSE 5150
RUN apt-get update && apt-get install -y curl

CMD ["/usr/app/template_app-cli", "start", "-e", "production"]
# CMD ["curl" "-X", "GET", "http://localhost:5150"]
